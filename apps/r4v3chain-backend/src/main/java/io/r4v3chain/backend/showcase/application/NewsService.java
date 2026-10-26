package io.r4v3chain.backend.showcase.application;

import io.r4v3chain.backend.blockchain.dto.PendingTransactionResponse;
import io.r4v3chain.backend.blockchain.model.Block;
import io.r4v3chain.backend.blockchain.application.BlockchainService;
import io.r4v3chain.backend.blockchain.application.PendingTransactionService;
import io.r4v3chain.backend.showcase.dto.NewsFeedResponse;
import io.r4v3chain.backend.showcase.dto.NewsItemResponse;
import io.r4v3chain.backend.showcase.model.NewsItem;
import io.r4v3chain.backend.showcase.model.NewsSource;
import io.r4v3chain.backend.showcase.news.store.NewsItemStore;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Service
public class NewsService {

    private static final int MAX_ITEMS = 60;
    private static final List<String> ALL_CATEGORIES = List.of(
            "Network", "R4V3", "Peers", "Ecosystem"
    );

    private final CopyOnWriteArrayList<NewsItem> items = new CopyOnWriteArrayList<>();
    private final BlockchainService blockchainService;
    private final PendingTransactionService pendingTransactionService;
    private final NewsItemStore newsItemStore;

    private volatile String lastFeaturedId;

    public NewsService(
            BlockchainService blockchainService,
            PendingTransactionService pendingTransactionService,
            NewsItemStore newsItemStore
    ) {
        this.blockchainService = blockchainService;
        this.pendingTransactionService = pendingTransactionService;
        this.newsItemStore = newsItemStore;
    }

    @PostConstruct
    public void seedEditorialNews() {
        List<NewsItem> persisted = newsItemStore.findAllPersisted();
        if (!persisted.isEmpty()) {
            items.clear();
            items.addAll(persisted);
            refreshChainNews();
            return;
        }

        Instant now = Instant.now();

        items.add(editorial(
                "editorial-1",
                "Network",
                "Welcome to R4V3 Explorer",
                "Explore the R4V3 chain in real time.",
                "R4V3 Explorer aggregates blocks, pending transactions, and network activity. "
                        + "Use the dock tabs to mine, browse the chain, and manage your peers.",
                now.minus(Duration.ofMinutes(2)),
                "NONE",
                null
        ));
        items.add(editorial(
                "editorial-2",
                "R4V3",
                "R4V3 volume up over 24h",
                "Increased activity on the R4V3 / CHF pair.",
                "The rates panel and swap let you track the native R4V3 token "
                        + "and simulate trades from the market banner.",
                now.minus(Duration.ofMinutes(14)),
                "NONE",
                null
        ));
        items.add(editorial(
                "editorial-3",
                "Peers",
                "Multi-node sync",
                "Connect peers to propagate the chain.",
                "Open the Peers panel in the bar to add nodes and sync "
                        + "your local blockchain copy with the network.",
                now.minus(Duration.ofHours(1)),
                "OPEN_PEERS",
                null
        ));
        items.add(editorial(
                "editorial-4",
                "Ecosystem",
                "Faucet live — claim R4V3 on the test network",
                "Get tokens to try out transactions.",
                "The faucet distributes test R4V3 to fund your wallet and experiment "
                        + "with sends, mining, and swaps risk-free.",
                now.minus(Duration.ofHours(3)),
                "OPEN_FAUCET",
                null
        ));
        items.add(editorial(
                "editorial-5",
                "Network",
                "Proof-of-work difficulty 4",
                "Every block follows the leading-zeros rule.",
                "Current difficulty requires block hashes to start with four zeros. "
                        + "Mine pending transactions to validate the chain.",
                now.minus(Duration.ofHours(5)),
                "OPEN_PENDING",
                null
        ));
        items.add(editorial(
                "editorial-6",
                "R4V3",
                "R4V3 ↔ lab token swap panel",
                "Simulate swaps from the left panel.",
                "The swap panel at the top of the screen converts between R4V3 and "
                        + "other assets with a real-time estimate.",
                now.minus(Duration.ofHours(8)),
                "OPEN_SWAP",
                null
        ));
        items.add(editorial(
                "editorial-7",
                "Ecosystem",
                "Lab — deploy a testnet token",
                "Create a custom asset on the R4V3 chain.",
                "The lab lets you configure a token, deploy it on the test network, and find it "
                        + "in the dedicated showcase tab.",
                now.minus(Duration.ofHours(12)),
                "NONE",
                null
        ));
        items.add(editorial(
                "editorial-8",
                "Network",
                "Explore mined blocks",
                "Browse history from the dock.",
                "Every mined block appears in the Blocks bar. Click a network news item to "
                        + "open the related block detail.",
                now.minus(Duration.ofHours(18)),
                "NONE",
                null
        ));
        items.add(editorial(
                "editorial-9",
                "Peers",
                "Live network status",
                "The NEWS banner reflects chain activity.",
                "Network events, mined blocks, and peers appear automatically "
                        + "in the NEWS feed with relative timestamps.",
                now.minus(Duration.ofHours(24)),
                "NONE",
                null
        ));

        List<NewsItem> editorialItems = items.stream()
                .filter(item -> item.getSource() == NewsSource.EDITORIAL)
                .toList();
        newsItemStore.saveAll(editorialItems);
        refreshChainNews();
    }

    public NewsFeedResponse getFeed(String category, String source, int limit, int offset) {
        refreshChainNews();

        List<NewsItem> sorted = items.stream()
                .sorted(Comparator.comparing(NewsItem::getPublishedAt).reversed())
                .filter(item -> matchesCategory(item, category))
                .filter(item -> matchesSource(item, source))
                .collect(Collectors.toList());

        int safeLimit = Math.max(1, Math.min(limit, MAX_ITEMS));
        int safeOffset = Math.max(0, offset);
        int totalCount = sorted.size();

        String featuredId = resolveFeaturedId(sorted);

        List<NewsItemResponse> page = sorted.stream()
                .skip(safeOffset)
                .limit(safeLimit)
                .map(item -> toResponse(item, item.getId().equals(featuredId)))
                .collect(Collectors.toList());

        boolean hasMore = safeOffset + page.size() < totalCount;

        return new NewsFeedResponse(
                "R4V3chain",
                buildLastTransactionLabel(),
                featuredId,
                page,
                ALL_CATEGORIES,
                buildLiveActivity(),
                Instant.now().toString(),
                totalCount,
                hasMore
        );
    }

    public Optional<NewsItemResponse> getById(String id) {
        refreshChainNews();

        return items.stream()
                .filter(item -> item.getId().equals(id))
                .findFirst()
                .map(item -> toResponse(item, item.getId().equals(lastFeaturedId)));
    }

    public synchronized void publishSwapEvent(String walletAddress, io.r4v3chain.backend.exchange.dto.ExchangeSwapResponse swap) {
        Instant now = Instant.now();
        String id = "swap-" + System.currentTimeMillis();
        String summary = swap.fromToken()
                + " → "
                + swap.toToken()
                + " · "
                + (swap.amountIn() != null ? swap.amountIn().stripTrailingZeros().toPlainString() : "0")
                + " → "
                + (swap.amountOut() != null ? swap.amountOut().stripTrailingZeros().toPlainString() : "0");

        List<String> previousSwapIds = items.stream()
                .filter(item -> item.getId().startsWith("swap-") && item.getId().length() > 20)
                .map(NewsItem::getId)
                .toList();
        items.removeIf(item -> previousSwapIds.contains(item.getId()));
        previousSwapIds.forEach(newsItemStore::deleteById);

        NewsItem swapItem = editorial(
                id,
                "R4V3",
                "Testnet swap executed",
                summary,
                "Wallet "
                        + truncate(walletAddress, 12)
                        + " swapped "
                        + (swap.amountIn() != null ? swap.amountIn().stripTrailingZeros().toPlainString() : "0")
                        + " "
                        + swap.fromToken()
                        + " for "
                        + (swap.amountOut() != null ? swap.amountOut().stripTrailingZeros().toPlainString() : "0")
                        + " "
                        + swap.toToken()
                        + " on the R4V3chainz testnet simulator.",
                now,
                "OPEN_SWAP",
                swap.toToken()
        );

        items.add(swapItem);
        newsItemStore.save(swapItem);

        lastFeaturedId = id;

        while (items.size() > MAX_ITEMS) {
            items.remove(items.size() - 1);
        }
    }

    public synchronized void refreshChainNews() {
        removeChainItems();

        Instant now = Instant.now();
        List<Block> blocks = blockchainService.getBlocks();

        if (!blocks.isEmpty()) {
            Block latest = blocks.get(blocks.size() - 1);
            String blockId = "chain-block-" + latest.getIndex();
            items.add(chainNews(
                    blockId,
                    "Network",
                    "Block #" + latest.getIndex() + " added to the chain",
                    "Hash " + truncate(latest.getHash(), 16),
                    "Block #" + latest.getIndex() + " was mined with hash "
                            + safe(latest.getHash()) + ". Nonce: " + latest.getNonce()
                            + ", difficulty: " + latest.getDifficulty() + ".",
                    now.minus(Duration.ofMinutes(1)),
                    "VIEW_BLOCK",
                    String.valueOf(latest.getIndex())
            ));
            lastFeaturedId = blockId;
        }

        List<PendingTransactionResponse> pending = pendingTransactionService.getPendingTransactions();

        if (!pending.isEmpty()) {
            PendingTransactionResponse latest = pending.get(0);
            items.add(chainNews(
                    "chain-pending-" + safe(latest.getId()),
                    "Network",
                    "Pending transaction: " + formatTx(latest),
                    "Waiting to be mined",
                    "Transaction from " + safe(latest.getFromAddress()) + " to "
                            + safe(latest.getToAddress()) + " for "
                            + (latest.getAmount() != null
                            ? latest.getAmount().stripTrailingZeros().toPlainString()
                            : "0")
                            + " R4V3. ID: " + safe(latest.getId()) + ".",
                    now.minus(Duration.ofSeconds(30)),
                    "VIEW_PENDING",
                    safe(latest.getId())
            ));
        }

        int peerHint = Math.min(3, Math.max(1, blocks.size()));
        items.add(chainNews(
                "chain-peers-" + blocks.size(),
                "Peers",
                peerHint + " node(s) can sync the chain",
                "Use the Peers panel to connect",
                "The chain has " + blocks.size() + " block(s). Connect "
                        + peerHint + " peer(s) or more to propagate blocks.",
                now.minus(Duration.ofMinutes(45)),
                "OPEN_PEERS",
                null
        ));

        if (lastFeaturedId == null && !items.isEmpty()) {
            lastFeaturedId = items.get(0).getId();
        }
    }

    private void removeChainItems() {
        items.removeIf(item -> item.getSource() == NewsSource.CHAIN);
    }

    private boolean matchesCategory(NewsItem item, String category) {
        if (category == null || category.isBlank() || "all".equalsIgnoreCase(category)) {
            return true;
        }
        return item.getCategory().equalsIgnoreCase(category);
    }

    private boolean matchesSource(NewsItem item, String source) {
        if (source == null || source.isBlank() || "all".equalsIgnoreCase(source)) {
            return true;
        }
        return item.getSource().name().equalsIgnoreCase(source);
    }

    private String resolveFeaturedId(List<NewsItem> sorted) {
        if (lastFeaturedId != null) {
            boolean exists = sorted.stream().anyMatch(item -> item.getId().equals(lastFeaturedId));
            if (exists) {
                return lastFeaturedId;
            }
        }

        return sorted.stream()
                .filter(item -> item.getSource() == NewsSource.CHAIN)
                .map(NewsItem::getId)
                .findFirst()
                .orElse(sorted.isEmpty() ? null : sorted.get(0).getId());
    }

    private String buildLiveActivity() {
        List<Block> blocks = blockchainService.getBlocks();
        if (!blocks.isEmpty()) {
            Block latest = blocks.get(blocks.size() - 1);
            return "Block #" + latest.getIndex() + " · chain active";
        }
        return "Chain waiting for first block";
    }

    private NewsItem editorial(
            String id,
            String category,
            String title,
            String summary,
            String body,
            Instant publishedAt,
            String actionType,
            String actionTarget
    ) {
        return new NewsItem(
                id,
                category,
                title,
                summary,
                body,
                publishedAt,
                NewsSource.EDITORIAL,
                actionType,
                actionTarget
        );
    }

    private NewsItem chainNews(
            String id,
            String category,
            String title,
            String summary,
            String body,
            Instant publishedAt,
            String actionType,
            String actionTarget
    ) {
        return new NewsItem(
                id,
                category,
                title,
                summary,
                body,
                publishedAt,
                NewsSource.CHAIN,
                actionType,
                actionTarget
        );
    }

    private NewsItemResponse toResponse(NewsItem item, boolean featured) {
        return new NewsItemResponse(
                item.getId(),
                item.getCategory(),
                item.getTitle(),
                item.getSummary(),
                item.getBody() != null ? item.getBody() : item.getSummary(),
                item.getPublishedAt().toString(),
                formatRelativeTime(item.getPublishedAt()),
                item.getSource().name(),
                item.getActionType() != null ? item.getActionType() : "NONE",
                item.getActionTarget(),
                featured
        );
    }

    private String buildLastTransactionLabel() {
        List<PendingTransactionResponse> pending = pendingTransactionService.getPendingTransactions();

        if (pending.isEmpty()) {
            return "No recent transactions";
        }

        return formatTx(pending.get(0));
    }

    private String formatTx(PendingTransactionResponse tx) {
        return safe(tx.getFromAddress())
                + " → "
                + safe(tx.getToAddress())
                + " : "
                + (tx.getAmount() != null ? tx.getAmount().stripTrailingZeros().toPlainString() : "0");
    }

    private String formatRelativeTime(Instant publishedAt) {
        Duration delta = Duration.between(publishedAt, Instant.now());
        long minutes = delta.toMinutes();

        if (minutes < 1) {
            return "just now";
        }
        if (minutes < 60) {
            return minutes + " min ago";
        }

        long hours = delta.toHours();
        if (hours < 24) {
            return hours + " h ago";
        }

        return delta.toDays() + " d ago";
    }

    private String truncate(String value, int max) {
        if (value == null || value.length() <= max) {
            return value != null ? value : "—";
        }
        return value.substring(0, max) + "…";
    }

    private String safe(String value) {
        return value == null ? "?" : value;
    }
}
