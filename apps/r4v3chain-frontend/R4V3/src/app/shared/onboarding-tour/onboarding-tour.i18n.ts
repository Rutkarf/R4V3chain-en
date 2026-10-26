import type { AppLocale } from '@core/i18n/locale.messages';

export interface OnboardingStepCopy {
  readonly title: string;
  readonly body: string;
}

export interface OnboardingUiCopy {
  readonly kicker: string;
  readonly skip: string;
  readonly back: string;
  readonly next: string;
  readonly ok: string;
  readonly pausedHint: string;
  readonly replay: string;
}

export const ONBOARDING_UI_COPY: Record<AppLocale, OnboardingUiCopy> = {
  en: {
    kicker: 'Tutorial',
    skip: 'Skip',
    back: 'Back',
    next: 'Next',
    ok: 'OK',
    pausedHint: 'Close the drawer to continue.',
    replay: 'Replay tutorial',
  },
};

export const ONBOARDING_STEP_COPY: Record<
  AppLocale,
  Record<string, OnboardingStepCopy>
> = {
  en: {
    'network-status': {
      title: 'LED and Activity',
      body: 'Orange LED: Anonymous. Green LED: Connected. Red LED: Unavailable.',
    },
    register: {
      title: 'Register',
      body: 'Create your account here to use the blockchain and much more! D.Y.O.R',
    },
    login: {
      title: 'Sign in',
      body: 'If you already have an account, sign in here.',
    },
    'brand-crypto': {
      title: 'Active token',
      body: 'Choose the token shown in the hub here — it syncs the chart and the exchange.',
    },
    bandeau: {
      title: 'Network pulse',
      body: 'This live info strip on the blockchain hub can scrub forward and back while you hold the click.\nClick any of these components for more detail.',
    },
    'collapse-panels': {
      title: 'Collapse / expand',
      body: 'These chevrons collapse or open each panel — useful to free up the screen.',
    },
    'dock-overview': {
      title: 'Bar',
      body: 'The bottom bar groups wallet, faucet, quests, and the chain explorer.',
    },
    'dock-admin': {
      title: 'Administration',
      body: 'Operations panel — reserved for authorized accounts.',
    },
    'dock-chain': {
      title: 'Chain',
      body: 'Block explorer and the R4V3chain.',
    },
    'dock-transactions': {
      title: 'Transactions',
      body: 'Queue and composer — follow in-flight transactions and prepare your own.',
    },
    'dock-peers': {
      title: 'Peers',
      body: 'Nodes connected to the network — peer health and presence.',
    },
    swap: {
      title: 'Swap',
      body: 'Here you convert your R4V3 into a lab token: pick the pair, amount, then Swap.',
    },
    'exchange-max': {
      title: 'Maximum amount',
      body: 'Max fills the available balance in one click — handy before you swap.',
    },
    'exchange-cta': {
      title: 'Swap button',
      body: 'When the amount is ready, start the conversion here.',
    },
    'showcase-tabs': {
      title: 'Hub tabs',
      body: 'Chat, organization, lab, market, R4V3… switch tabs to explore the whole hub.',
    },
    'showcase-chat': {
      title: 'Chat',
      body: 'The Chat tab to talk and follow community activity.',
    },
    'showcase-dao': {
      title: 'D.A.O',
      body: 'News and governance for the DAO ecosystem.',
    },
    'showcase-labz': {
      title: 'Lab',
      body: 'Lab: projects and tokens launched on the hub.',
    },
    'showcase-market': {
      title: 'Market',
      body: 'Token market view — readings and trends.',
    },
    'showcase-tours': {
      title: 'News',
      body: 'The hub news feed — updates and announcements.',
    },
    'showcase-r4v3': {
      title: 'R4V3 hub',
      body: 'The R4V3 hub: whitepaper, wiki and Q&A, plus full context for the native token.',
    },
    'peg-chf': {
      title: '1 R4V3 = 1 CHF',
      body: 'Reference peg shown here — a simple reading of amounts in francs.',
    },
    'pillar-chf': {
      title: 'CHF pillar',
      body: 'Reference peg shown in real time — a simple reading of amounts.',
    },
    'pillar-fast': {
      title: 'Fast pillar',
      body: 'Near-instant test-network transactions for swaps, the faucet, and transfers.',
    },
    'pillar-utility': {
      title: 'Utility pillar',
      body: 'Native currency of the ecosystem — pivot for the lab, the chart, and the exchange.',
    },
    'pillar-transparent': {
      title: 'Transparent pillar',
      body: 'Whitepaper, traceability, and documented governance — nothing in a gray zone.',
    },
    'pillar-secure': {
      title: 'Secure pillar',
      body: 'Wallet best practices and test-network protocol — caution first.',
    },
    'pillar-ecosystem': {
      title: 'Ecosystem pillar',
      body: 'Lab, exchange, and hub connected around R4V3.',
    },
    whitepaper: {
      title: 'Whitepaper',
      body: 'The official project document — open it for the thesis, tokenomics, and protocol.',
    },
    wiki: {
      title: 'Wiki',
      body: 'The official R4V3 wiki — documentation and structured FAQ.',
    },
    'faq-community': {
      title: 'Community FAQ',
      body: 'Ask a question or read answers shared by the community.',
    },
    wallet: {
      title: 'Wallet',
      body: 'Your wallet: addresses, balances, send and receive.',
    },
    'wallet-create': {
      title: 'Create a wallet',
      body: 'Click here to create your wallet after registering — it is your vault on the chain.',
    },
    faucet: {
      title: 'Faucet',
      body: 'The faucet gives you free test-network tokens to experiment without risk.',
    },
    'faucet-claim': {
      title: 'Claim',
      body: 'Claim = collect your free drop when the cooldown is ready.',
    },
    quests: {
      title: 'Quests',
      body: 'Quests guide you step by step on the chain and unlock rewards — check the active mission.',
    },
    graph: {
      title: 'Chart',
      body: 'Live readings for common cryptocurrencies and R4V3 — read the market before you swap.',
    },
    arena: {
      title: 'MetaVerseBB',
      body: 'Eliminate to earn: take out players for a share of their faucet tokens.',
    },
    'star-conquest': {
      title: 'Star conquest',
      body: 'AI galaxy — advance the project through space quests.',
    },
    'logo-3d': {
      title: 'R4V3 logo',
      body: 'Five quick clicks on the logo restart the hub tutorial.',
    },
    park: {
      title: 'Replay tutorial',
      body: 'You can restart this guide anytime by clicking five times quickly on the R4V3 logo at the top left.',
    },
  },
};

export function onboardingUi(locale: AppLocale): OnboardingUiCopy {
  return ONBOARDING_UI_COPY[locale] ?? ONBOARDING_UI_COPY.en;
}

export function onboardingStepCopy(
  locale: AppLocale,
  stepId: string,
  fallback: OnboardingStepCopy,
): OnboardingStepCopy {
  return (
    ONBOARDING_STEP_COPY[locale]?.[stepId] ??
    ONBOARDING_STEP_COPY.en[stepId] ??
    fallback
  );
}
