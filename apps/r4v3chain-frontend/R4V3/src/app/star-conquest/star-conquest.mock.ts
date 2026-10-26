import { familyFromCategory } from './star-conquest-families';
import type {
  StarQuest,
  StarQuestCategory,
  StarQuestFamily,
  StarQuestRarity,
  StarQuestStatus,
} from './star-conquest.model';

type QuestSeed = {
  id: string;
  title: string;
  category: StarQuestCategory;
  family?: StarQuestFamily;
  description: string;
  rewardM4T3R: number;
  rarity: StarQuestRarity;
  status: StarQuestStatus;
  connections: string[];
  /** u = horizontal ; v ignoré au layout (dérivé du gain). */
  slot: { u: number; v?: number; depth?: number };
  /** Racine interactive sous le floor (exactement 3). */
  underFloor?: boolean;
  /** Racine interactive sous app-graph (exactement 3, départ replié). */
  underGraph?: boolean;
};

/**
 * 15 Quests retirées du catalogue v50 → v35 (3 par axe famille / redondance).
 * Raisons : redondance produit, faible impact 250×550, ou couverture par une Quest retenue.
 */
export const STAR_CONQUEST_REMOVED_QUESTS: readonly {
  id: string;
  reason: string;
}[] = [
  {
    id: 'sc-navbar-ticker',
    reason: 'Impact faible à 250px ; collision visuelle avec CTA wallet — couvert par responsive + toasts.',
  },
  {
    id: 'sc-ux-empty',
    reason: 'Trop vague ; empty states absorbés par skeletons Swap et densités Showcase.',
  },
  {
    id: 'sc-a11y-live',
    reason: 'Redondant avec focus shell + feedback news ; fusionné dans sc-a11y-focus.',
  },
  {
    id: 'sc-showcase-news',
    reason: 'Badge news moins critique que Chat/DAO pour la conquête produit.',
  },
  {
    id: 'sc-showcase-tabs',
    reason: 'Mémoire d’onglet faible ROI vs interactions Showcase prioritaires.',
  },
  {
    id: 'sc-showcase-launch',
    reason: 'A11y launch formée dans sc-a11y-focus ; évite doublon formulaire.',
  },
  {
    id: 'sc-graph-token-search',
    reason: 'Inutilisable en densité réelle à 250px de large — priorité Graph alerts/chart.',
  },
  {
    id: 'sc-graph-health',
    reason: 'Fusionné dans sc-graph monitoring via sc-angular-layout + sc-dock-chain.',
  },
  {
    id: 'sc-dock-peers',
    reason: 'Priorité Dock = wallet / faucet / mempool / quests sync.',
  },
  {
    id: 'sc-angular-signals',
    reason: 'Audit meta non user-facing ; layout zones reste le levier Angular.',
  },
  {
    id: 'sc-swap-skeleton',
    reason: 'Couvert par piste Swap confirm + slippage (UX exchange).',
  },
  {
    id: 'sc-security-peers',
    reason: 'Niche ; auth + wallet mask + tx preview couvrent la surface critique.',
  },
  {
    id: 'sc-data-peers',
    reason: 'Redondant avec poll chain + rates ; budget network unifié.',
  },
  {
    id: 'sc-data-showcase-api',
    reason: 'Fallbacks Showcase absorbés par sc-backend-faucet + sc-data-rates.',
  },
  {
    id: 'sc-quality-lint',
    reason: 'Chore SCSS faible valeur conquête ; docs + tests restent prioritaires.',
  },
  {
    id: 'sc-three-drift',
    reason: 'Dérive absorbée par le graphe runtime ; remplacée par la carte Wigle live.',
  },
  {
    id: 'sc-m4t3r-estimate',
    reason: 'Estimate cosmétique remplacée par le pickup M4T3R sur la carte.',
  },
  {
    id: 'sc-performance-lists',
    reason: 'Virtualisation dock moins prioritaire que l’onglet Peers live.',
  },
  {
    id: 'sc-quality-docs',
    reason: 'README interne ; remplacé par la surface R4V3 / market produit.',
  },
];

/**
 * 35 Quests (7 × 5 familles) — board produit type GitHub Project.
 * Source de vérité : codebase + rendu https://r4v3chain.pages.dev (2026-08-21).
 * Colonnes : completed=Done · active=In Progress · available=Ready · locked=Blocked · future=Icebox.
 * Live CTA (Dock/Showcase) restent Ready jusqu’à action joueur.
 * Gains élevés → haut de zone interactive (layout runtime).
 */
const SEEDS: readonly QuestSeed[] = [
  // ——— Interface (7) ———
  {
    id: 'sc-responsive-250',
    title: 'Lock 250×550',
    category: 'responsive',
    family: 'interface',
    description:
      '[Done] Shell MVP zero-scroll : TARGET_VIEWPORT 250×550, vp-compact, tokens --ds-zone-* live sur r4v3chain.pages.dev.',
    rewardM4T3R: 220,
    rarity: 'legendary',
    status: 'completed',
    connections: ['sc-angular-layout', 'sc-a11y-focus', 'sc-three-floor-peek'],
    slot: { u: 0.52, depth: 0.15 },
  },
  {
    id: 'sc-angular-layout',
    title: 'Shell Zones Overlay',
    category: 'angular',
    family: 'interface',
    description:
      '[Done] Shell zones + SC panel/scanner without stealing Navbar/Swap/Dock/Graph — overlays shipped on pages.dev.',
    rewardM4T3R: 180,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-responsive-250', 'sc-three-floor-peek', 'sc-showcase-dao'],
    slot: { u: 0.78, depth: -0.2 },
  },
  {
    id: 'sc-swap-confirm',
    title: 'Confirm Swap HUD',
    category: 'swap',
    family: 'interface',
    description:
      '[Ready · live] Run a Laboratory swap. The star completes via the Dock swap-tokens quest (no magic claim).',
    rewardM4T3R: 140,
    rarity: 'epic',
    status: 'available',
    connections: ['sc-swap-slippage', 'sc-security-tx', 'sc-wallet-copy'],
    slot: { u: 0.22, depth: 0.25 },
  },
  {
    id: 'sc-swap-slippage',
    title: 'Slippage Control',
    category: 'swap',
    family: 'interface',
    description:
      '[In Progress] « Max slippage 0.5% » label live — remaining: remembered control + 16px strip (no picker yet).',
    rewardM4T3R: 95,
    rarity: 'rare',
    status: 'active',
    connections: ['sc-swap-confirm', 'sc-data-rates', 'sc-a11y-focus'],
    slot: { u: 0.12, depth: -0.15 },
  },
  {
    id: 'sc-showcase-chat',
    title: 'Showcase Chat Live',
    category: 'showcase',
    family: 'interface',
    description:
      '[Ready · live] Open Showcase Chat (SC CTA): 250px bubbles, accessible input — conquer via product navigation.',
    rewardM4T3R: 110,
    rarity: 'rare',
    status: 'available',
    connections: ['sc-showcase-dao', 'sc-a11y-focus', 'sc-wallet-copy'],
    slot: { u: 0.4, depth: 0.05 },
  },
  {
    id: 'sc-showcase-dao',
    title: 'DAO Vote Preview',
    category: 'showcase',
    family: 'interface',
    description:
      '[Done] Showcase DAO vote (drawer + summary) in a narrow column — shipped on pages.dev, zero 250px overflow.',
    rewardM4T3R: 125,
    rarity: 'rare',
    status: 'completed',
    connections: ['sc-showcase-chat', 'sc-backend-quests', 'sc-gamify-progress'],
    slot: { u: 0.68, depth: -0.3 },
  },
  {
    id: 'sc-a11y-focus',
    title: 'Focus Rings Shell',
    category: 'a11y',
    family: 'interface',
    description:
      '[Done] FocusTrapDirective + rings on drawers, Quest panel, scanner, Navbar/Swap/Dock — keyboard without traps.',
    rewardM4T3R: 70,
    rarity: 'common',
    status: 'completed',
    connections: ['sc-responsive-250', 'sc-showcase-chat', 'sc-tests-a11y'],
    slot: { u: 0.88, depth: 0.35 },
  },

  // ——— Three.js (7) ———
  {
    id: 'sc-three-raycast',
    title: 'Raycast Safe Zones',
    category: 'three',
    family: 'three',
    description:
      '[Done] Occlusion SC via elementFromPoint — ignore chrome Angular (Navbar/Swap/Dock/Graph) sur pages.dev.',
    rewardM4T3R: 200,
    rarity: 'legendary',
    status: 'completed',
    connections: ['sc-three-network', 'sc-three-occlusion', 'sc-responsive-250'],
    slot: { u: 0.3, depth: 0.4 },
  },
  {
    id: 'sc-three-network',
    title: 'Neural Link Glow',
    category: 'three',
    family: 'three',
    description:
      '[Done] Filaments double-brin + sparks — chaque lien = edge catalogue (35 stars, 5 galaxies).',
    rewardM4T3R: 160,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-three-raycast', 'sc-three-depth', 'sc-gamify-map'],
    slot: { u: 0.55, depth: -0.25 },
  },
  {
    id: 'sc-three-depth',
    title: 'Depth Layer Tune',
    category: 'three',
    family: 'three',
    description:
      '[Done] Couches far/mid/interactive/near + parallaxe (SC-UI-010) — maturity backlog clos.',
    rewardM4T3R: 150,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-three-network', 'sc-three-floor-peek', 'sc-three-fps'],
    slot: { u: 0.18, depth: 0.1 },
  },
  {
    id: 'sc-three-fps',
    title: 'Three FPS Cap',
    category: 'performance',
    family: 'three',
    description:
      '[Done] shouldAnimateWebGl + visibility pause — mobile constellation without drain (floor + SC host).',
    rewardM4T3R: 120,
    rarity: 'rare',
    status: 'completed',
    connections: ['sc-three-depth', 'sc-dock-peers', 'sc-three-floor-peek'],
    slot: { u: 0.72, depth: -0.1 },
  },
  {
    id: 'sc-three-floor-peek',
    title: 'Floor Peek Sync',
    category: 'three',
    family: 'three',
    description:
      '[Done] --floor-peek-height (220px token) synced Quests strip ↔ MetaVerseBB canvas.',
    rewardM4T3R: 85,
    rarity: 'rare',
    status: 'completed',
    connections: ['sc-angular-layout', 'sc-three-depth', 'sc-responsive-250', 'sc-map-wigle'],
    slot: { u: 0.45, depth: 0.2 },
    underFloor: true,
  },
  {
    id: 'sc-three-occlusion',
    title: 'Occlusion Scanner',
    category: 'three',
    family: 'three',
    description:
      '[Done] Off-screen scanner + reward labels — one row = one occluded Quest (shipped).',
    rewardM4T3R: 135,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-three-raycast', 'sc-gamify-map', 'sc-dock-quests'],
    slot: { u: 0.9, depth: -0.35 },
    underFloor: true,
  },
  {
    id: 'sc-map-wigle',
    title: 'Live Wigle Map',
    category: 'three',
    family: 'three',
    description:
      '[Done] Floor: Wigle WiFi + OSM footprints — MetaVerseBB anchor, zero orphan particles.',
    rewardM4T3R: 100,
    rarity: 'rare',
    status: 'completed',
    connections: ['sc-three-network', 'sc-three-depth', 'sc-three-raycast', 'sc-three-floor-peek'],
    slot: { u: 0.08, depth: 0.3 },
    underFloor: true,
  },

  // ——— Blockchain / M4T3R (7) ———
  {
    id: 'sc-wallet-copy',
    title: 'Wallet address copy',
    category: 'dock',
    family: 'blockchain',
    description:
      '[Ready · live] Copy wallet address (SC CTA → Dock wallet) — toast, without exposing secrets.',
    rewardM4T3R: 75,
    rarity: 'common',
    status: 'available',
    connections: ['sc-security-wallet', 'sc-dock-faucet', 'sc-map-pickup'],
    slot: { u: 0.25, depth: -0.05 },
  },
  {
    id: 'sc-dock-faucet',
    title: 'Faucet Rate Limit UX',
    category: 'dock',
    family: 'blockchain',
    description:
      '[Ready · live] Claim the faucet. Aligned with Dock faucet-claim (1 MTS + XP) — real action required.',
    rewardM4T3R: 90,
    rarity: 'rare',
    status: 'available',
    connections: ['sc-wallet-copy', 'sc-backend-faucet', 'sc-map-pickup'],
    slot: { u: 0.48, depth: 0.22 },
  },
  {
    id: 'sc-dock-mempool',
    title: 'Mempool Row Density',
    category: 'dock',
    family: 'blockchain',
    description:
      '[Ready · live] Open the densified mempool (250px dock strip) — SC CTA → transactions.',
    rewardM4T3R: 105,
    rarity: 'rare',
    status: 'available',
    connections: ['sc-dock-chain', 'sc-dock-peers', 'sc-data-chain'],
    slot: { u: 0.62, depth: -0.2 },
    underGraph: true,
  },
  {
    id: 'sc-dock-chain',
    title: 'Chain Composer Hint',
    category: 'dock',
    family: 'blockchain',
    description:
      '[Ready · live] Open a block detail — follows Dock explore-blocks (hash/nonce drawer).',
    rewardM4T3R: 115,
    rarity: 'rare',
    status: 'available',
    connections: ['sc-dock-mempool', 'sc-data-chain', 'sc-angular-layout'],
    slot: { u: 0.35, depth: 0.15 },
    underGraph: true,
  },
  {
    id: 'sc-security-wallet',
    title: 'Wallet key mask',
    category: 'security',
    family: 'blockchain',
    description:
      '[Done] maskedPublicKey / maskedPrivateKey + controlled reveal — no console leak on pages.dev.',
    rewardM4T3R: 170,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-wallet-copy', 'sc-security-tx', 'sc-security-auth'],
    slot: { u: 0.15, depth: -0.3 },
  },
  {
    id: 'sc-security-tx',
    title: 'Tx Preview Hash',
    category: 'security',
    family: 'blockchain',
    description:
      '[Blocked] Wallet confirm-send exists — unlock after swap + mask + pickup conquests (graph deps).',
    rewardM4T3R: 130,
    rarity: 'epic',
    status: 'locked',
    connections: ['sc-swap-confirm', 'sc-security-wallet', 'sc-map-pickup'],
    slot: { u: 0.82, depth: 0.05 },
  },
  {
    id: 'sc-map-pickup',
    title: 'M4T3R Map Pickup',
    category: 'gamification',
    family: 'blockchain',
    description:
      '[Done] Pickup FX + floor M4T3R cells (trail) — local preview, no faucet credit.',
    rewardM4T3R: 55,
    rarity: 'common',
    status: 'completed',
    connections: ['sc-gamify-map', 'sc-dock-faucet', 'sc-data-persist'],
    slot: { u: 0.7, depth: 0.4 },
  },

  // ——— Backend / data (7) ———
  {
    id: 'sc-backend-quests',
    title: 'Quests API Hook',
    category: 'backend',
    family: 'backend',
    description:
      '[Ready · hub live] Login + faucet + swap + Dock blocks complete the star. Spring SC API = Icebox.',
    rewardM4T3R: 190,
    rarity: 'legendary',
    status: 'available',
    connections: ['sc-data-persist', 'sc-dock-quests', 'sc-showcase-dao'],
    slot: { u: 0.28, depth: -0.15 },
  },
  {
    id: 'sc-backend-faucet',
    title: 'Faucet API Soft Fail',
    category: 'backend',
    family: 'backend',
    description:
      '[Done] 429/5xx faucet → non-leaky UX messages (FaucetRuntimeService) — shipped.',
    rewardM4T3R: 80,
    rarity: 'common',
    status: 'completed',
    connections: ['sc-dock-faucet', 'sc-security-auth', 'sc-data-rates'],
    slot: { u: 0.58, depth: 0.25 },
  },
  {
    id: 'sc-security-auth',
    title: 'Auth Drawer Hardening',
    category: 'security',
    family: 'backend',
    description:
      '[Ready · live] Sign in — follows Dock daily-login. No magic click on the star.',
    rewardM4T3R: 145,
    rarity: 'epic',
    status: 'available',
    connections: ['sc-admin-gate', 'sc-security-wallet', 'sc-backend-faucet'],
    slot: { u: 0.2, depth: 0.1 },
  },
  {
    id: 'sc-admin-gate',
    title: 'Admin Tab Gate',
    category: 'security',
    family: 'backend',
    description:
      '[Done] AuthService.isAdmin() gates the dock admin tab (app.ts) — zero guest UI leak.',
    rewardM4T3R: 155,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-security-auth', 'sc-dock-quests', 'sc-tests-unit'],
    slot: { u: 0.85, depth: -0.25 },
  },
  {
    id: 'sc-data-rates',
    title: 'Rate Cache Soft',
    category: 'data',
    family: 'backend',
    description:
      '[In Progress] Quote lock « Guaranteed rate 30s » live — remaining: soft-expire network cache anti-spam.',
    rewardM4T3R: 100,
    rarity: 'rare',
    status: 'active',
    connections: ['sc-swap-slippage', 'sc-data-chain', 'sc-backend-faucet'],
    slot: { u: 0.42, depth: -0.05 },
  },
  {
    id: 'sc-data-chain',
    title: 'Chain Poll Budget',
    category: 'data',
    family: 'backend',
    description:
      '[Done] Chain/mempool polling with 429 backoff + tab pause — mobile budgets shipped.',
    rewardM4T3R: 110,
    rarity: 'rare',
    status: 'completed',
    connections: ['sc-dock-chain', 'sc-data-rates', 'sc-three-fps'],
    slot: { u: 0.65, depth: 0.3 },
  },
  {
    id: 'sc-data-persist',
    title: 'Quest Local Persist',
    category: 'data',
    family: 'backend',
    description:
      '[Icebox] localStorage star-conquest-progress-v1 OK — Spring Boot SC sync not wired.',
    rewardM4T3R: 125,
    rarity: 'rare',
    status: 'future',
    connections: ['sc-backend-quests', 'sc-gamify-progress', 'sc-map-pickup'],
    slot: { u: 0.1, depth: 0.2 },
  },

  // ——— Quality / conquête (7) ———
  {
    id: 'sc-gamify-map',
    title: 'Conquest Select',
    category: 'gamification',
    family: 'quality',
    description:
      '[Done] 1 particle = 1 Quest → holographic panel. Halos/bloom = copies of the same card.',
    rewardM4T3R: 210,
    rarity: 'legendary',
    status: 'completed',
    connections: ['sc-three-network', 'sc-gamify-progress', 'sc-three-occlusion'],
    slot: { u: 0.5, depth: 0 },
  },
  {
    id: 'sc-gamify-progress',
    title: 'Progress Constellation',
    category: 'gamification',
    family: 'quality',
    description:
      '[Done] SC progress (claim + Dock live) hydrated on the graph + dock-quests-summary.',
    rewardM4T3R: 175,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-gamify-map', 'sc-dock-quests', 'sc-data-persist'],
    slot: { u: 0.33, depth: 0.35 },
  },
  {
    id: 'sc-dock-quests',
    title: 'Dock Quests Sync',
    category: 'gamification',
    family: 'quality',
    description:
      '[Done] STAR_CONQUEST_LIVE_LINKS ↔ Dock daily bridge (10 surfaces) — sync shipped.',
    rewardM4T3R: 140,
    rarity: 'epic',
    status: 'completed',
    connections: ['sc-gamify-progress', 'sc-backend-quests', 'sc-three-occlusion'],
    slot: { u: 0.6, depth: -0.15 },
    underGraph: true,
  },
  {
    id: 'sc-dock-peers',
    title: 'Dock Peers Live',
    category: 'gamification',
    family: 'quality',
    description:
      '[Ready · live] Open the Peers tab — network satellites orbit a Quest (SC CTA).',
    rewardM4T3R: 130,
    rarity: 'rare',
    status: 'available',
    connections: ['sc-dock-mempool', 'sc-three-fps', 'sc-tests-unit'],
    slot: { u: 0.2, depth: 0.2 },
  },
  {
    id: 'sc-tests-unit',
    title: 'Star Conquest Specs',
    category: 'tests',
    family: 'quality',
    description:
      '[Done] Specs: 35 Quests, 7/family, valid connections, live links, GitHub board columns.',
    rewardM4T3R: 90,
    rarity: 'rare',
    status: 'completed',
    connections: ['sc-admin-gate', 'sc-tests-a11y', 'sc-r4v3-market'],
    slot: { u: 0.4, depth: 0.1 },
  },
  {
    id: 'sc-tests-a11y',
    title: 'Axe Panel Smoke',
    category: 'tests',
    family: 'quality',
    description:
      '[Done] Quest panel + scanner a11y (dialog, focus trap, close, reward) — shell non-regression.',
    rewardM4T3R: 65,
    rarity: 'common',
    status: 'completed',
    connections: ['sc-a11y-focus', 'sc-tests-unit', 'sc-r4v3-market'],
    slot: { u: 0.92, depth: 0.25 },
  },
  {
    id: 'sc-r4v3-market',
    title: 'R4V3 Market',
    category: 'showcase',
    family: 'quality',
    description:
      '[Ready · live] Open the R4V3 market (chart + token) — product surface, no magic claim.',
    rewardM4T3R: 50,
    rarity: 'common',
    status: 'available',
    connections: ['sc-tests-unit', 'sc-map-pickup', 'sc-three-depth'],
    slot: { u: 0.15, depth: -0.1 },
  },
];

function buildQuest(seed: QuestSeed): StarQuest {
  const { family: familyOverride, underFloor, underGraph, ...rest } = seed;
  return {
    ...rest,
    family: familyOverride ?? familyFromCategory(seed.category),
    interactive: true,
    underFloor: underFloor === true,
    underGraph: underGraph === true,
    slot: {
      u: seed.slot.u,
      v: seed.slot.v ?? 0.5,
      depth: seed.slot.depth,
    },
    position: { x: 0, y: 0, z: 0 },
  };
}

export const STAR_CONQUEST_MOCK_QUESTS: readonly StarQuest[] = SEEDS.map(buildQuest);

export function starQuestById(
  id: string,
  catalog: readonly StarQuest[] = STAR_CONQUEST_MOCK_QUESTS
): StarQuest | undefined {
  return catalog.find((q) => q.id === id);
}

/** Taille actuelle du catalogue design — le runtime accepte N quêtes. */
export const STAR_CONQUEST_QUEST_COUNT = STAR_CONQUEST_MOCK_QUESTS.length;
export const STAR_CONQUEST_QUESTS_PER_FAMILY = 7;
