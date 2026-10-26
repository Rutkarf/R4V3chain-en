package io.r4v3chain.backend.auth.application;

import io.r4v3chain.backend.auth.mail.AuthMailer;
import io.r4v3chain.backend.auth.model.UserAccount;
import io.r4v3chain.backend.auth.security.TotpAuthenticator;
import io.r4v3chain.backend.auth.store.UserAccountStore;
import io.r4v3chain.backend.auth.dto.TotpSetupResponse;
import io.r4v3chain.backend.auth.jwt.NativeJwtService;
import io.r4v3chain.backend.config.AuthProperties;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AccountFactorService {

    private static final long EMAIL_TTL_MS = 15 * 60 * 1000L;
    private static final int MAX_ATTEMPTS = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserAccountStore userAccountStore;
    private final NativeJwtService nativeJwtService;
    private final AuthProperties authProperties;
    private final AuthMailer authMailer;
    private final Map<String, PendingEmail> pendingEmails = new ConcurrentHashMap<>();

    public AccountFactorService(
            UserAccountStore userAccountStore,
            NativeJwtService nativeJwtService,
            AuthProperties authProperties,
            AuthMailer authMailer
    ) {
        this.userAccountStore = userAccountStore;
        this.nativeJwtService = nativeJwtService;
        this.authProperties = authProperties;
        this.authMailer = authMailer;
    }

    public String issueEmailCode(UserAccount account) {
        if (!authMailer.isConfigured()) {
            throw new AuthException(
                    503,
                    "Email sending is not configured. Set R4V3CHAIN_MAIL_HOST, R4V3CHAIN_MAIL_USERNAME, and R4V3CHAIN_MAIL_PASSWORD."
            );
        }
        dropPendingFor(account.getId());
        String code = "%06d".formatted(RANDOM.nextInt(1_000_000));
        String verificationId = UUID.randomUUID().toString();
        pendingEmails.put(verificationId, new PendingEmail(
                account.getId(),
                hashCode(account.getId(), code),
                System.currentTimeMillis() + EMAIL_TTL_MS
        ));
        authMailer.sendVerificationCode(account.getEmail(), account.getUsername(), code);
        return verificationId;
    }

    public UserAccount consumeEmailCode(String verificationId, String code) {
        PendingEmail pending = pendingEmails.get(verificationId);
        if (pending == null || pending.expiresAt < System.currentTimeMillis()) {
            pendingEmails.remove(verificationId);
            throw new AuthException(401, "Code expired or unknown. Request a new one.");
        }
        if (pending.attempts >= MAX_ATTEMPTS) {
            pendingEmails.remove(verificationId);
            throw new AuthException(429, "Trop de tentatives. Demandez un nouveau code.");
        }
        pending.attempts++;
        if (!MessageDigest.isEqual(pending.codeHash, hashCode(pending.userId, code))) {
            throw new AuthException(401, "Invalid confirmation code");
        }
        pendingEmails.remove(verificationId);
        return userAccountStore.findById(pending.userId)
                .orElseThrow(() -> new AuthException(404, "User not found"));
    }

    public String resendEmailCode(String verificationId) {
        return issueEmailCode(pendingAccount(verificationId));
    }

    public UserAccount pendingAccount(String verificationId) {
        PendingEmail pending = pendingEmails.get(verificationId);
        if (pending == null) {
            throw new AuthException(400, "Confirmation request not found. Register again.");
        }
        return userAccountStore.findById(pending.userId)
                .orElseThrow(() -> new AuthException(404, "User not found"));
    }

    public String issueTotpChallenge(String userId) {
        return nativeJwtService.createChallengeToken(userId, "totp", 300);
    }

    public UserAccount consumeTotpChallenge(String challengeToken, String code) {
        String userId = nativeJwtService.parseChallenge(challengeToken, "totp")
                .orElseThrow(() -> new AuthException(401, "2FA verification expired. Sign in again."));
        UserAccount account = userAccountStore.findById(userId)
                .orElseThrow(() -> new AuthException(401, "2FA verification expired. Sign in again."));
        if (!account.isTotpEnabled() || !TotpAuthenticator.matches(account.getTotpSecret(), code)) {
            throw new AuthException(401, "Invalid authentication code");
        }
        return account;
    }

    public TotpSetupResponse beginTotpSetup(UserAccount account) {
        if (account.isTotpEnabled()) {
            throw new AuthException(409, "Two-factor authentication is already enabled");
        }
        String secret = TotpAuthenticator.generateSecret();
        userAccountStore.updateTotp(account.getId(), secret, false);
        return new TotpSetupResponse(secret, TotpAuthenticator.otpauthUrl(account.getEmail(), secret));
    }

    public UserAccount enableTotp(UserAccount account, String code) {
        UserAccount current = userAccountStore.findById(account.getId())
                .orElseThrow(() -> new AuthException(404, "User not found"));
        if (current.getTotpSecret() == null || current.getTotpSecret().isBlank()) {
            throw new AuthException(400, "Generate an authenticator key first");
        }
        if (!TotpAuthenticator.matches(current.getTotpSecret(), code)) {
            throw new AuthException(401, "Invalid authentication code");
        }
        return userAccountStore.updateTotp(current.getId(), current.getTotpSecret(), true);
    }

    public UserAccount disableTotp(UserAccount account, String code) {
        UserAccount current = userAccountStore.findById(account.getId())
                .orElseThrow(() -> new AuthException(404, "User not found"));
        if (!current.isTotpEnabled() || !TotpAuthenticator.matches(current.getTotpSecret(), code)) {
            throw new AuthException(401, "Invalid authentication code");
        }
        return userAccountStore.updateTotp(current.getId(), null, false);
    }

    public boolean emailVerificationRequired() {
        return authProperties.isEmailVerificationRequired();
    }

    public boolean mailConfigured() {
        return authMailer.isConfigured();
    }

    private void dropPendingFor(String userId) {
        pendingEmails.entrySet().removeIf(entry -> entry.getValue().userId.equals(userId));
    }

    private byte[] hashCode(String userId, String code) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String material = authProperties.getJwtSecret() + ":" + userId + ":" + code;
            return digest.digest(material.getBytes(StandardCharsets.UTF_8));
        } catch (Exception exception) {
            throw new AuthException(500, "Unable to protect email code");
        }
    }

    private static final class PendingEmail {
        private final String userId;
        private final byte[] codeHash;
        private final long expiresAt;
        private int attempts;

        private PendingEmail(String userId, byte[] codeHash, long expiresAt) {
            this.userId = userId;
            this.codeHash = codeHash;
            this.expiresAt = expiresAt;
        }
    }
}
