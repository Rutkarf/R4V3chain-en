package io.r4v3chain.backend.quests.application;

import io.r4v3chain.backend.quests.dto.QuestCatalogResponse;
import io.r4v3chain.backend.quests.dto.QuestDailyTaskCatalogItem;
import io.r4v3chain.backend.quests.dto.QuestMissionCatalogItem;
import io.r4v3chain.backend.quests.dto.QuestWeeklyCatalogItem;

import java.util.List;

/**
 * Quest catalog UI metadata — single source aligned with the frontend.
 */
public final class QuestCatalogUi {

    public static final String MISSION_ID = "network-guardian";

    private QuestCatalogUi() {
    }

    public static QuestCatalogResponse buildCatalog() {
        List<QuestDailyTaskCatalogItem> dailyTasks = QuestCatalog.DAILY_QUESTS.stream()
                .map(definition -> new QuestDailyTaskCatalogItem(
                        definition.id(),
                        titleFor(definition.id()),
                        descriptionFor(definition.id()),
                        definition.target(),
                        definition.rewardMts(),
                        definition.rewardXp(),
                        actionFor(definition.id()),
                        QuestCatalog.isServerHooked(definition.id())
                ))
                .toList();

        QuestMissionCatalogItem mission = new QuestMissionCatalogItem(
                MISSION_ID,
                "Network guardian",
                "Keep the network healthy by completing daily and weekly tasks.",
                QuestCatalog.MISSION_REWARD_MTS,
                QuestCatalog.MISSION_REWARD_XP,
                100
        );

        QuestWeeklyCatalogItem weekly = new QuestWeeklyCatalogItem(
                QuestCatalog.WEEKLY_REWARD_MTS,
                20
        );

        return new QuestCatalogResponse(
                dailyTasks,
                mission,
                weekly,
                QuestCatalog.SERVER_HOOKED_TASK_IDS
        );
    }

    private static String titleFor(String taskId) {
        return switch (taskId) {
            case "daily-login" -> "Daily login";
            case "faucet-claim" -> "Faucet claim";
            case "explore-blocks" -> "Explore blocks";
            case "swap-tokens" -> "Swap tokens";
            default -> taskId;
        };
    }

    private static String descriptionFor(String taskId) {
        return switch (taskId) {
            case "daily-login" -> "Sign in to the app";
            case "faucet-claim" -> "Claim from the faucet";
            case "explore-blocks" -> "Open a block detail in the explorer";
            case "swap-tokens" ->
                    "Swap a lab token (outside standard BTC/ETH pairs) via the swap panel";
            default -> "";
        };
    }

    private static String actionFor(String taskId) {
        return switch (taskId) {
            case "daily-login" -> "login";
            case "faucet-claim" -> "faucet";
            case "explore-blocks" -> "explore-blocks";
            case "swap-tokens" -> "swap";
            default -> "none";
        };
    }
}
