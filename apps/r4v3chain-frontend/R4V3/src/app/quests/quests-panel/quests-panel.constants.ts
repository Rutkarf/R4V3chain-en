import type { DailyQuestDefinition } from './quests-catalog.model';

export type { DailyQuestDefinition };

export const QUESTS_STORAGE_KEY = 'r4v3_quests_state_v1';

/** Local fallback — prefer `GET /api/quests/catalog` (Phase Q). */

/** Quests whose progress is validated server-side (no POST /progress). */
export const SERVER_HOOKED_QUEST_IDS = new Set([
  'daily-login',
  'faucet-claim',
  'explore-blocks',
  'swap-tokens',
]);

export const CURRENT_MISSION = {
  id: 'network-guardian',
  title: 'Network guardian',
  description: 'Keep the network healthy by completing daily and weekly tasks.',
  rewardMts: 1,
  rewardXp: 150,
  progressTarget: 100,
} as const;

export const WEEKLY_REWARD = {
  rewardMts: 1,
  xpBoostPercent: 20,
} as const;

/** @deprecated Local fallback — prefer QuestsPanelService.getDailyQuests(). */
export const DAILY_QUESTS: readonly DailyQuestDefinition[] = [
  {
    id: 'daily-login',
    title: 'Daily login',
    description: 'Sign in to the app',
    target: 1,
    rewardMts: 1,
    rewardXp: 10,
    action: 'login',
  },
  {
    id: 'faucet-claim',
    title: 'Faucet claim',
    description: 'Claim from the faucet',
    target: 1,
    rewardMts: 1,
    rewardXp: 15,
    action: 'faucet',
  },
  {
    id: 'explore-blocks',
    title: 'Explore blocks',
    description: 'Open a block detail in the explorer',
    target: 5,
    rewardMts: 1,
    rewardXp: 20,
    action: 'explore-blocks',
  },
  {
    id: 'swap-tokens',
    title: 'Swap tokens',
    description: 'Swap a Laboratory token (excluding standard BTC/ETH pairs) via the exchange panel',
    target: 10,
    rewardMts: 1,
    rewardXp: 25,
    action: 'swap',
  },
];
