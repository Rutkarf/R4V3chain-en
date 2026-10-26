/** Hub tutorial steps after the intro. */
export type OnboardingTourStatus = 'idle' | 'running' | 'paused' | 'done' | 'skipped';

export type OnboardingTourSkipWhen =
  | 'authenticated'
  | 'showcase-off'
  | 'faucet-off'
  | 'sc-off';

export type OnboardingTourEnterAction =
  | 'none'
  | 'open-register'
  | 'open-login'
  | 'expand-showcase-r4v3'
  | 'expand-showcase-rv23'
  | 'expand-showcase-daonews'
  | 'expand-showcase-dao'
  | 'expand-showcase-market'
  | 'expand-showcase-tours'
  | 'expand-dock-wallet'
  | 'expand-dock-faucet'
  | 'expand-dock-quests'
  | 'expand-dock-chain'
  | 'expand-dock-peers'
  | 'expand-dock-transactions'
  | 'expand-chart'
  | 'collapse-chart'
  | 'scroll-floor'
  | 'park-logo'
  | 'finish-hub';

/** Token / bubble placement to avoid overlaps. */
export type OnboardingTourLayout =
  | 'default'
  | 'token-left'
  | 'token-right'
  | 'bubble-above'
  | 'bubble-below'
  | 'bubble-left'
  | 'bubble-right';

export interface OnboardingTourStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  /** Primary CSS selector for spotlight / token anchor. */
  readonly targetSelector?: string;
  /** Fallbacks if the primary target is missing. */
  readonly fallbackSelectors?: readonly string[];
  /**
   * Extra clear / clickable zones beyond the target
   * (menus, drawers — current step only, never sticky).
   */
  readonly revealSelectors?: readonly string[];
  /** Auto-advance if no interaction (ms). 0 = manual only (Next click). */
  readonly timeoutMs?: number;
  /** Let clicks pass through the spotlight hole (default true if target). */
  readonly interactive?: boolean;
  readonly enterAction?: OnboardingTourEnterAction;
  readonly skipWhen?: OnboardingTourSkipWhen;
  /**
   * Padding around the spotlight rect (px).
   * 0 = flush to the element (default).
   */
  readonly pad?: number;
  /**
   * Token position relative to the clear zone.
   * below (default) | above (e.g. arena).
   */
  readonly tokenAnchor?: 'below' | 'above';
  /** Anti-overlap placement for token / bubble. */
  readonly layout?: OnboardingTourLayout;
  /**
   * In addition to the spotlighted target (always kept clear),
   * re-apply the selector to every matching node.
   * Default = false: only the element actually shown stays clear.
   */
  readonly stickyClear?: boolean;
}

export const ONBOARDING_STORAGE_KEY = 'r4v3chain.onboarding.v1';

/**
 * Auto-advance between bubbles if the user does nothing.
 * 0 = disabled (tutorial paused — no auto scroll).
 */
export const ONBOARDING_AUTO_ADVANCE_MS = 0;

/**
 * User path:
 * Auth → token → LED → banner → hub → R4V3 → swap → wallet/faucet/quests → explorers → games → logo.
 * Each interactive step lets the user do the described action without leaving the tutorial;
 * `revealSelectors` only clears menus / drawers for the current step.
 */
export const ONBOARDING_TOUR_STEPS: readonly OnboardingTourStep[] = [
  {
    id: 'register',
    title: 'Register',
    body: 'Create your account here to use the blockchain and much more! D.Y.O.R',
    targetSelector: '[data-tour="register"]',
    fallbackSelectors: [
      '.navbar-auth-btn--register',
      '.navbar-auth-strip .navbar-auth-btn--register',
      'button.navbar-auth-btn--register',
    ],
    revealSelectors: ['.auth-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    skipWhen: 'authenticated',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: true,
  },
  {
    id: 'login',
    title: 'Sign in',
    body: 'If you already have an account, sign in here.',
    targetSelector: '[data-tour="login"]',
    fallbackSelectors: [
      '.navbar-auth-btn--login',
      '.navbar-auth-strip .navbar-auth-btn--login',
      'button.navbar-auth-btn--login',
    ],
    revealSelectors: ['.auth-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    skipWhen: 'authenticated',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: true,
  },
  {
    id: 'brand-crypto',
    title: 'Active token',
    body: 'Choose the token shown in the hub here — it syncs the chart and the exchange.',
    targetSelector: 'app-brand-crypto-select',
    fallbackSelectors: ['.navbar-brand-select'],
    revealSelectors: ['.token-select__menu'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: true,
  },
  {
    id: 'network-status',
    title: 'LED and Activity',
    body: 'Orange LED: Anonymous. Green LED: Connected. Red LED: Unavailable.',
    targetSelector: '.network-trust-chip',
    fallbackSelectors: [
      '[data-tour="network-status"]',
      'app-navbar-network-status',
      '.navbar-brand-row__network',
    ],
    revealSelectors: ['.nv-anchor-drawer--live'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: true,
  },
  {
    id: 'bandeau',
    title: 'Network pulse',
    body: 'This live info strip on the blockchain hub can scrub forward and back while you hold the click.\nClick any of these components for more detail.',
    targetSelector: 'app-bandeau-accueil',
    fallbackSelectors: ['.bandeau-accueil'],
    revealSelectors: ['.nv-anchor-drawer--ticker'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: true,
  },
  {
    id: 'collapse-panels',
    title: 'Collapse / expand',
    body: 'These chevrons collapse or open each panel — useful to free up the screen.',
    targetSelector: '.app-hub-showcase-block .panel-collapse-control',
    fallbackSelectors: [
      '.app-hub-showcase-block .collapsed-bar-actions__collapse',
      '.app-bottom-stack .panel-collapse-control',
      '.app-market-stack--rate .panel-collapse-control',
      '.panel-collapse-control',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'showcase-tabs',
    title: 'Hub tabs',
    body: 'Chat, organization, lab, market, R4V3… switch tabs to explore the whole hub.',
    targetSelector: 'app-showcase-tabs',
    fallbackSelectors: ['.app-hub-showcase-block .showcase-tabs'],
    revealSelectors: ['app-showcase-tabs'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'showcase-tours',
    title: 'News',
    body: 'The hub news feed — updates and announcements. Unread items are highlighted.',
    targetSelector: '#showcase-tab-tours',
    fallbackSelectors: ['[data-tab="tours"]'],
    revealSelectors: [
      '.showcase-panel__body',
      '#showcase-panel-body',
      'app-showcase-news',
      '.showcase-news',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-tours',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'showcase-chat',
    title: 'Chat',
    body: 'The Chat tab to talk and follow community activity.',
    targetSelector: '#showcase-tab-rv23',
    fallbackSelectors: ['[data-tab="rv23"]'],
    revealSelectors: [
      'app-showcase-chat',
      '.showcase-chat',
      '.showcase-chat__composer',
      '.showcase-chat__input',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-rv23',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'above',
    layout: 'bubble-above',
    stickyClear: false,
  },
  {
    id: 'showcase-dao',
    title: 'D.A.O',
    body: 'News and governance for the DAO ecosystem — open the R4V3 card.',
    targetSelector: '[data-dao-symbol="R4V3"]',
    fallbackSelectors: [
      '.showcase-dao__card[data-symbol="R4V3"]',
      '#showcase-tab-daonews',
      '[data-tab="daonews"]',
    ],
    revealSelectors: [
      '[data-dao-symbol="R4V3"]',
      '.dao-drawer',
      'app-showcase-dao-drawer',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-daonews',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'showcase-labz',
    title: 'Lab',
    body: 'Lab: open the R4V3 entry for native project detail.',
    targetSelector: '[data-launch-symbol="R4V3"]',
    fallbackSelectors: [
      '.showcase-launch__item[data-symbol="R4V3"]',
      '#showcase-tab-dao',
      '[data-tab="dao"]',
    ],
    revealSelectors: [
      '[data-launch-symbol="R4V3"]',
      '.launch-project-drawer',
      'app-showcase-launch-project-drawer',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-dao',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'showcase-market',
    title: 'Market',
    body: 'Token market view — open the R4V3 row for detail.',
    targetSelector: '.market-panel__row.is-pinned',
    fallbackSelectors: [
      '.market-panel__row[data-symbol="R4V3"]',
      '#showcase-tab-market',
      '[data-tab="market"]',
    ],
    revealSelectors: [
      '.market-panel__row.is-pinned',
      '.market-token-drawer',
      'app-market-token-drawer',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-market',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'showcase-r4v3',
    title: 'R4V3 hub',
    body: 'The R4V3 hub: whitepaper, wiki and Q&A, plus full context for the native token.',
    targetSelector: '#showcase-tab-r4v3',
    fallbackSelectors: ['[data-tab="r4v3"]'],
    revealSelectors: ['app-showcase-r4v3', '.showcase-view--r4v3'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'peg-chf',
    title: '1 R4V3 = 1 CHF',
    body: 'Reference peg shown here — a simple reading of amounts in francs.',
    targetSelector: '.showcase-r4v3__peg--hero',
    fallbackSelectors: ['.showcase-r4v3__peg-banner'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'pillar-chf',
    title: 'CHF pillar',
    body: 'Reference peg shown in real time — a simple reading of amounts.',
    targetSelector: '[data-pillar-id="peg-chf"]',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'pillar-fast',
    title: 'Fast pillar',
    body: 'Near-instant test-network transactions for swaps, the faucet, and transfers.',
    targetSelector: '[data-pillar-id="fast"]',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'pillar-utility',
    title: 'Utility pillar',
    body: 'Native currency of the ecosystem — pivot for the lab, the chart, and the exchange.',
    targetSelector: '[data-pillar-id="utility"]',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'pillar-transparent',
    title: 'Transparent pillar',
    body: 'Whitepaper, traceability, and documented governance — nothing in a gray zone.',
    targetSelector: '[data-pillar-id="transparent"]',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'pillar-secure',
    title: 'Secure pillar',
    body: 'Wallet best practices and test-network protocol — caution first.',
    targetSelector: '[data-pillar-id="secure"]',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'pillar-ecosystem',
    title: 'Ecosystem pillar',
    body: 'Lab, exchange, and hub connected around R4V3.',
    targetSelector: '[data-pillar-id="ecosystem"]',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'whitepaper',
    title: 'Whitepaper',
    body: 'The official project document — open it for the thesis, tokenomics, and protocol.',
    targetSelector: '.showcase-r4v3__wp-btn',
    fallbackSelectors: ['.r4v3-summary-bar__wp-btn'],
    revealSelectors: ['.showcase-r4v3__doc-feedback'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'wiki',
    title: 'Wiki',
    body: 'The official R4V3 wiki — documentation and structured FAQ.',
    targetSelector: '.showcase-r4v3__rail-btn--left',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'faq-community',
    title: 'Community FAQ',
    body: 'Ask a question or read answers shared by the community.',
    targetSelector: '.showcase-r4v3__section-link--community',
    revealSelectors: ['.r4v3-hub-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    enterAction: 'expand-showcase-r4v3',
    skipWhen: 'showcase-off',
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    layout: 'bubble-left',
    stickyClear: false,
  },
  {
    id: 'swap',
    title: 'Swap',
    body: 'Here you convert your R4V3 into a lab token: pick the pair, amount, then Swap.',
    targetSelector: 'app-exchange-panel',
    fallbackSelectors: ['.app-hub-swap-stack', '.exchange-panel'],
    revealSelectors: ['.exchange-panel', 'app-exchange-panel'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'exchange-max',
    title: 'Maximum amount',
    body: 'Max fills the available balance in one click — handy before you swap.',
    targetSelector: '.exchange-panel__max-btn',
    fallbackSelectors: ['.exchange-panel__amount-zone'],
    revealSelectors: [
      '.exchange-panel__amount-zone',
      '.exchange-panel__amount-input',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'exchange-cta',
    title: 'Swap button',
    body: 'When the amount is ready, start the conversion here.',
    targetSelector: '.exchange-panel__cta',
    revealSelectors: ['.exchange-panel__feedback'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'dock-overview',
    title: 'Bar',
    body: 'The bottom bar groups wallet, faucet, quests, and the chain explorer.',
    targetSelector: '.app-bottom-stack__tabs',
    fallbackSelectors: ['.app-bottom-stack'],
    revealSelectors: ['.app-bottom-stack__tabs'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'wallet',
    title: 'Wallet',
    body: 'Your wallet: addresses, balances, send and receive.',
    targetSelector: '[data-dock-tab="wallet"]',
    revealSelectors: ['app-wallet-panel', '.wallet-display'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-dock-wallet',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'wallet-create',
    title: 'Create a wallet',
    body: 'Click here to create your wallet after registering — it is your vault on the chain.',
    targetSelector: '.wallet-display__create-cta',
    fallbackSelectors: ['.wallet-summary-bar__create'],
    revealSelectors: ['.wallet-display__create-cta', '.auth-drawer'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    enterAction: 'expand-dock-wallet',
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'faucet',
    title: 'Faucet',
    body: 'The faucet gives you free test-network tokens to experiment without risk.',
    targetSelector: '[data-dock-tab="faucet"]',
    revealSelectors: ['app-faucet', '.faucet-panel'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-dock-faucet',
    skipWhen: 'faucet-off',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'faucet-claim',
    title: 'Claim',
    body: 'Claim = collect your free drop when the cooldown is ready.',
    targetSelector: '.faucet-panel__claim',
    fallbackSelectors: ['.faucet-summary-bar__claim'],
    revealSelectors: [
      '.faucet-panel__claim',
      '.faucet-panel__toast',
      '.faucet-panel__feedback',
      '.auth-drawer',
      '.wallet-display__create-cta',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    enterAction: 'expand-dock-faucet',
    skipWhen: 'faucet-off',
    interactive: true,
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'quests',
    title: 'Quests',
    body: 'Quests guide you step by step on the chain and unlock rewards — check the active mission.',
    targetSelector: '[data-dock-tab="quests"]',
    fallbackSelectors: ['app-quests-panel'],
    revealSelectors: ['.app-bottom-stack__panel--quests', 'app-quests-panel'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-dock-quests',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'dock-chain',
    title: 'Chain',
    body: 'Block explorer and the R4V3chain.',
    targetSelector: '[data-dock-tab="chain"]',
    revealSelectors: [
      '.app-bottom-stack__panel--chain',
      'app-block-detail-drawer',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-dock-chain',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'dock-transactions',
    title: 'Transactions',
    body: 'Queue and composer — follow in-flight transactions and prepare your own.',
    targetSelector: '[data-dock-tab="transactions"]',
    revealSelectors: [
      '.app-bottom-stack__panel--transactions',
      'app-transactions-dock',
      '.transactions-dock',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-dock-transactions',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'dock-peers',
    title: 'Peers',
    body: 'Nodes connected to the network — peer health and presence.',
    targetSelector: '[data-dock-tab="peers"]',
    revealSelectors: ['.app-bottom-stack__panel--peers'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-dock-peers',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'graph',
    title: 'Chart',
    body: 'Live readings for common cryptocurrencies and R4V3 — read the market before you swap.',
    targetSelector: '.app-market-stack--rate',
    fallbackSelectors: ['.app-market-card--rate', 'app-graph'],
    revealSelectors: ['app-graph', '.app-market-card--rate', '.rate-panel'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'expand-chart',
    pad: 2,
    tokenAnchor: 'below',
    layout: 'token-right',
    stickyClear: false,
  },
  {
    id: 'arena',
    title: 'MetaVerseBB',
    body: 'Eliminate to earn: take out players for a share of their faucet tokens.',
    targetSelector: '.arena-hud__strip',
    fallbackSelectors: ['app-three-floor', 'app-arena-hud'],
    revealSelectors: ['app-three-floor', 'app-arena-hud', '.arena-hud'],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'scroll-floor',
    pad: 2,
    tokenAnchor: 'above',
    stickyClear: false,
  },
  {
    id: 'star-conquest',
    title: 'Star conquest',
    body: 'AI galaxy — advance the project through space quests.',
    targetSelector: 'app-particle-background',
    fallbackSelectors: ['.sc-reward-label'],
    revealSelectors: [
      'app-star-quest-panel',
      'app-star-quest-scanner',
      '.sc-reward-label',
    ],
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    skipWhen: 'sc-off',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
  {
    id: 'park',
    title: 'Replay tutorial',
    body: 'You can restart this guide anytime by clicking five times quickly on the R4V3 logo at the top left.',
    targetSelector: '.logo-shell',
    timeoutMs: ONBOARDING_AUTO_ADVANCE_MS,
    interactive: true,
    enterAction: 'park-logo',
    pad: 2,
    tokenAnchor: 'below',
    stickyClear: false,
  },
] as const;

export interface SpotlightRect {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
}

/** Center pose (x/y) + size for intro → tutorial handoff. */
export interface TourEntryPose {
  readonly x: number;
  readonly y: number;
  readonly size: number;
}
