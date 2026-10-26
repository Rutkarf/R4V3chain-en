package io.r4v3chain.backend.config;

import org.springframework.core.env.Environment;

import java.util.Locale;
import java.util.Set;

/**
 * Phase AH — règles de robustesse des secrets en prod/staging/commercial.
 */
final class ProductionSecretPolicy {

    static final int MIN_JWT_SECRET_LENGTH = 32;
    static final int MIN_ACTUATOR_TOKEN_LENGTH = 24;
    static final int MIN_DATABASE_PASSWORD_LENGTH = 16;

    private static final Set<String> WEAK_VALUES = Set.of(
            "",
            "change-me",
            "r4v3chain",
            "password",
            "password123",
            "dev-only-change-in-prod",
            "local-docker-jwt-secret-change-me-in-prod",
            "local-docker-actuator-token"
    );

    private ProductionSecretPolicy() {}

    static final String SHIPPED_ADMIN_SEED_SHA256 =
            "3c7af8f4a99c61e08acb2bb85b972eb022db4ec432c1e338cb6be24abb2c8d9f";

    static void validate(Environment environment) {
        validateJwtSecret(environment.getProperty("r4v3chain.auth.jwt-secret", "").trim());
        validateActuatorToken(environment.getProperty("r4v3chain.ops.actuator-token", "").trim());
        validateDatabasePassword(resolveDatabasePassword(environment));
        validateAdminSeed(environment.getProperty("r4v3chain.admin.seed-sha256", "").trim());
    }

    private static void validateAdminSeed(String seedSha256) {
        if (SHIPPED_ADMIN_SEED_SHA256.equalsIgnoreCase(seedSha256)) {
            throw new IllegalStateException(
                    "prod/staging/commercial profile: R4V3CHAIN_ADMIN_SEED_SHA256 required "
                            + "(replace the value shipped in the base file).");
        }
    }

    private static String resolveDatabasePassword(Environment environment) {
        String databasePassword = environment.getProperty("DATABASE_PASSWORD", "").trim();
        if (!databasePassword.isBlank()) {
            return databasePassword;
        }

        return environment.getProperty("spring.datasource.password", "").trim();
    }

    private static void validateJwtSecret(String jwtSecret) {
        if (isWeak(jwtSecret) || jwtSecret.length() < MIN_JWT_SECRET_LENGTH) {
            throw new IllegalStateException(
                    "prod/staging/commercial profile: R4V3CHAIN_JWT_SECRET required "
                            + "(≥ "
                            + MIN_JWT_SECRET_LENGTH
                            + " characters, strong secret, ≠ change-me / r4v3chain).");
        }
    }

    private static void validateActuatorToken(String actuatorToken) {
        if (isWeak(actuatorToken) || actuatorToken.length() < MIN_ACTUATOR_TOKEN_LENGTH) {
            throw new IllegalStateException(
                    "prod/staging/commercial profile: R4V3CHAIN_ACTUATOR_TOKEN required "
                            + "(≥ "
                            + MIN_ACTUATOR_TOKEN_LENGTH
                            + " characters, ≠ change-me).");
        }
    }

    private static void validateDatabasePassword(String databasePassword) {
        if (isWeak(databasePassword) || databasePassword.length() < MIN_DATABASE_PASSWORD_LENGTH) {
            throw new IllegalStateException(
                    "prod/staging/commercial profile: DATABASE_PASSWORD / POSTGRES_PASSWORD required "
                            + "(≥ "
                            + MIN_DATABASE_PASSWORD_LENGTH
                            + " characters, ≠ r4v3chain / change-me).");
        }
    }

    private static boolean isWeak(String value) {
        if (value.isBlank()) {
            return true;
        }

        String normalized = value.trim().toLowerCase(Locale.ROOT);
        return WEAK_VALUES.contains(normalized);
    }
}
