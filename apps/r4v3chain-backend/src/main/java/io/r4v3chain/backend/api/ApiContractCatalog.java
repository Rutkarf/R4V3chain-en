package io.r4v3chain.backend.api;

import io.r4v3chain.backend.config.ApiRoutes;

import java.util.List;

/**
 * Phase AA — native API contract catalog (maintained in-repo, no OpenAPI/Swagger).
 */
public final class ApiContractCatalog {

    private ApiContractCatalog() {
    }

    public static ApiContractV1Response build() {
        return new ApiContractV1Response(
                "0.17.0",
                "v1",
                "application/problem+json",
                "Legacy /api/* routes remain active with Deprecation headers.",
                List.of(
                        endpoint("GET", ApiRoutes.OPS_SNAPSHOT_V1, true, "Native observability snapshot (ADMIN, admin panel)"),
                        endpoint("GET", ApiRoutes.ADMIN_STATUS_V1, false, "Admin panel status (seed configured?)"),
                        endpoint("POST", ApiRoutes.ADMIN_UNLOCK_V1, false, "Unlock admin panel via 24-word seed"),
                        endpoint("GET", ApiRoutes.ADMIN_EXPORT_V1, true, "Export evidence pack json|txt|csv (header X-Admin-Unlock-Token)"),
                        endpoint("GET", ApiRoutes.CHAIN_CONFIG_V1, false, "Native EVM-compatible chain metadata"),
                        endpoint("POST", ApiRoutes.WALLETS_GENERATE_EVM_V1, false, "Generate secp256k1 wallet (dev/demo)"),
                        endpoint("GET", ApiRoutes.HEALTH_V1, false, "Health and product flags"),
                        endpoint("GET", ApiRoutes.CONTRACT_V1, false, "This contract catalog"),
                        endpoint("POST", ApiRoutes.AUTH_REGISTER_V1, false, "User registration"),
                        endpoint("POST", ApiRoutes.AUTH_LOGIN_V1, false, "Login (identifier + password)"),
                        endpoint("POST", ApiRoutes.AUTH_REFRESH_V1, false, "Renew access token (refreshToken)"),
                        endpoint("POST", ApiRoutes.AUTH_LOGOUT_V1, true, "Bearer session logout"),
                        endpoint("GET", ApiRoutes.AUTH_ME_V1, true, "Current user profile"),
                        endpoint("PUT", ApiRoutes.AUTH_LINK_WALLET_V1, true, "Link a wallet to the account"),
                        endpoint("GET", ApiRoutes.BLOCKCHAIN_CHAIN_V1, false, "Full chain"),
                        endpoint("GET", ApiRoutes.BLOCKCHAIN_STATS_V1, false, "Blockchain statistics"),
                        endpoint("GET", ApiRoutes.BLOCKCHAIN_VALID_V1, false, "Chain validity"),
                        endpoint("GET", ApiRoutes.BLOCKCHAIN_BLOCKS_V1, false, "List of blocks"),
                        endpoint("GET", ApiRoutes.BLOCKCHAIN_BLOCKS_LATEST_V1, false, "Latest block"),
                        endpoint("GET", ApiRoutes.BLOCKCHAIN_PENDING_V1, false, "Pending transactions"),
                        endpoint("GET", ApiRoutes.EXPLORER_SEARCH_V1, false, "Explorer search (param q)"),
                        endpoint("GET", ApiRoutes.EXPLORER_BLOCKS_V1, false, "Filtered blocks (wallet, from, to, limit)")
                )
        );
    }

    private static ApiContractEndpoint endpoint(
            String method,
            String path,
            boolean authRequired,
            String description
    ) {
        return new ApiContractEndpoint(method, path, authRequired, description);
    }
}
