package io.r4v3chain.backend.product;

import io.r4v3chain.backend.config.ProductProperties;
import io.r4v3chain.backend.shared.exception.FeatureDisabledException;
import org.springframework.stereotype.Service;

@Service
public class ProductFeatureService {

    private final ProductProperties productProperties;

    public ProductFeatureService(ProductProperties productProperties) {
        this.productProperties = productProperties;
    }

    public void requireLegacyPrivateKey() {
        if (!productProperties.isAllowLegacyPrivateKey()) {
            throw new FeatureDisabledException(
                    "senderPrivateKey is disabled in commercial mode — use a client signature.");
        }
    }

    public void requireServerWalletCreate() {
        if (!productProperties.isAllowServerWalletCreate()) {
            throw new FeatureDisabledException(
                    "Server-side wallet creation is disabled — generate the wallet locally.");
        }
    }

    public void requireFaucet() {
        if (!productProperties.isFaucetEnabled()) {
            throw new FeatureDisabledException("The faucet is disabled.");
        }
    }
}
