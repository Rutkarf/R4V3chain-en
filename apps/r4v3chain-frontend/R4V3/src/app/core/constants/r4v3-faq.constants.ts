import {
  R4v3FaqCategory,
  R4v3FaqCategoryId,
  R4v3FaqEntry,
  R4v3FaqHighlight,
} from '@showcase/models/r4v3-faq.model';

export const R4V3_FAQ_CATEGORIES: readonly R4v3FaqCategory[] = [
  { id: 'essentiel', label: 'Essentials', icon: '◆' },
  { id: 'utilisation', label: 'Usage', icon: '→' },
  { id: 'stabilite', label: 'Stability', icon: '≡' },
  { id: 'ecosysteme', label: 'Ecosystem', icon: '◎' },
  { id: 'evolution', label: 'Evolution', icon: '↗' },
] as const;

export const R4V3_FAQ_HIGHLIGHTS: readonly R4v3FaqHighlight[] = [
  {
    id: 'peg-chf',
    label: 'CHF',
    detail: 'Parity anchor shown in the app',
    icon: '₣',
  },
  {
    id: 'utility',
    label: 'Utility coin',
    detail: 'Native currency to pay, swap, and launch on R4V3chain',
    icon: '⚡',
  },
  {
    id: 'speed',
    label: 'Fast',
    detail: 'Near-instant testnet transactions',
    icon: '⏱',
  },
  {
    id: 'transparent',
    label: 'Transparent',
    detail: 'White paper and documented mechanisms',
    icon: '◉',
  },
] as const;

export const R4V3_FAQ_ENTRIES: readonly R4v3FaqEntry[] = [
  {
    id: 'what-is-r4v3',
    categoryId: 'essentiel',
    title: 'What is R4V3?',
    summary: 'The native stable token of R4V3chain, designed as the ecosystem’s reference currency.',
    body: `R4V3 is the native token of R4V3chain. It is the reference currency in the app: price display, Laboratory swaps, testnet faucet, and network interactions.

Unlike Laboratory tokens (PXD, NVFI, etc.), R4V3 is not a speculative memecoin: it is a utility coin meant to be understood quickly and used day-to-day in the ecosystem.`,
    popular: true,
    tags: ['native', 'utility', 'r4v3chain'],
  },
  {
    id: 'peg-chf',
    categoryId: 'essentiel',
    title: 'Why is R4V3 worth 1 Swiss franc?',
    summary: 'Pedagogical parity at 1 CHF to simplify reading amounts in the interface.',
    body: `In R4V3chain, R4V3 is presented with a reference parity of **1 R4V3 = 1 Swiss franc** (CHF).

This is not a regulated financial promise: it is a display anchor that lets you read amounts without mental conversion. On testnet, this parity makes demos, Laboratory swaps, and value comparisons between tokens easier.

The chart and R4V3 hub show this reference so every user immediately grasps the order of magnitude of an amount.`,
    popular: true,
    isNew: true,
    updatedAt: '2026-07-01',
    tags: ['peg', 'chf', 'parity'],
  },
  {
    id: 'role-r4v3chain',
    categoryId: 'essentiel',
    title: 'What is R4V3 used for on R4V3chain?',
    summary: 'Pay fees, swap, fund the faucet, and serve as the Laboratory quote.',
    body: `R4V3 fills several complementary roles:

• **Native currency** — default unit of account in the interface
• **Laboratory quote** — launched tokens are quoted vs R4V3
• **Swap** — exchange R4V3 ↔ Laboratory tokens via the Exchange panel
• **Testnet faucet** — get R4V3 to try the app without friction
• **Chart reference** — base for reading pairs and trends

In short: R4V3 is the economic entry point of the R4V3chain ecosystem.`,
    popular: true,
    tags: ['usage', 'launchlab', 'swap'],
  },
  {
    id: 'get-r4v3',
    categoryId: 'utilisation',
    title: 'How do I get R4V3?',
    summary: 'Via the testnet faucet or by receiving tokens after a swap.',
    body: `On the R4V3chain testnet environment, the easiest way to get R4V3 is the in-app **faucet**.

You can also receive some after a swap from a Laboratory token, or via demo flows provided in the ecosystem.

Sign in or create a testnet wallet, open the faucet, and request a credit. Amounts shown as **m4t3r** in the exchange panel are the micro-unit of R4V3.`,
    actionType: 'OPEN_FAUCET',
    actionLabel: 'Open the faucet',
    tags: ['faucet', 'get', 'testnet'],
  },
  {
    id: 'use-r4v3',
    categoryId: 'utilisation',
    title: 'How do I use R4V3?',
    summary: 'Swap, view the chart, explore Laboratory pairs.',
    body: `Once credited, you can:

1. **View** the R4V3 chart and Laboratory pairs
2. **Swap** via the Exchange panel (R4V3 → token or reverse)
3. **Select** R4V3 in the navbar to sync chart and swap
4. **Follow** network activity in the other showcase tabs

The UI is designed so selecting R4V3 in the navbar opens the token + swap context directly.`,
    actionType: 'OPEN_SWAP',
    actionLabel: 'Open the swap',
    tags: ['swap', 'chart', 'navbar'],
  },
  {
    id: 'm4t3r-unit',
    categoryId: 'utilisation',
    title: 'What is m4t3r?',
    summary: 'The smallest displayed unit of R4V3 in the exchange panel.',
    body: `**m4t3r** is the UI label for the R4V3 micro-unit in the Exchange panel — aligned with the faucet and testnet balances.

Showing amounts in m4t3r lets you enter very small quantities without scientific notation, while keeping R4V3 as the main symbol elsewhere in the app (navbar, chart, Laboratory pairs).`,
    tags: ['m4t3r', 'unit', 'exchange'],
  },
  {
    id: 'swap-launchlab',
    categoryId: 'utilisation',
    title: 'How do I exchange R4V3 for a Laboratory token?',
    summary: 'Select an R4V3 → PXD (or other) pair in the Exchange panel.',
    body: `The swap is **unidirectional by default**: R4V3 is the source, the Laboratory token the destination.

1. Open the Exchange panel under the chart
2. Choose the Laboratory token (PXD, NVFI, LAB3, ORB…)
3. Enter an amount in m4t3r
4. Confirm the swap

You can also select a Laboratory token from the navbar: the chart and swap sync automatically.`,
    actionType: 'OPEN_SWAP',
    actionLabel: 'Go to swap',
    tags: ['launchlab', 'exchange', 'pxd'],
  },
  {
    id: 'stability-mechanism',
    categoryId: 'stabilite',
    title: 'How does R4V3 stability work?',
    summary: 'Pedagogical peg mechanism and constant 1 CHF display on testnet.',
    body: `On testnet, R4V3 “stability” is **pedagogical**: the interface keeps a display parity at 1 CHF to avoid visual volatility in demos.

The mechanism relies on:
• a **display anchor** (1 R4V3 = 1 Swiss franc)
• **Laboratory quotes** expressed vs R4V3
• a **white paper** describing the intended model

This is not a regulated mainnet stablecoin: it is a testnet utility token designed to stay predictable in the UX.`,
    tags: ['stability', 'peg', 'testnet'],
  },
  {
    id: 'peg-explained',
    categoryId: 'stabilite',
    title: 'How does the peg work?',
    summary: 'Fixed 1 CHF reference for display, distinct from volatile Laboratory tokens.',
    body: `The R4V3 **peg** (anchor) means the app presents the token as worth **1 Swiss franc** by reference.

Laboratory tokens, by contrast, fluctuate relative to R4V3 based on testnet activity and demo scenarios. This split makes it clear:
• R4V3 = stable unit of reading
• Laboratory tokens = experimental assets

The R4V3 chart reflects that stability; Laboratory charts show relative dynamics.`,
    popular: true,
    tags: ['peg', 'chf', 'launchlab'],
  },
  {
    id: 'guarantees',
    categoryId: 'stabilite',
    title: 'What guarantees exist?',
    summary: 'Documentary transparency and a testnet environment — no financial guarantee.',
    body: `R4V3chain testnet is a demonstration environment. Guarantees cover **transparency** and **education**, not financial coverage:

• White paper accessible from the R4V3 hub
• Mechanisms described in this FAQ
• Open code and APIs for inspection
• No yield promise or regulated parity

For any use beyond testnet, consult the official documentation and project updates.`,
    actionType: 'OPEN_WHITEPAPER',
    actionLabel: 'Read the white paper',
    tags: ['guarantees', 'white paper', 'transparency'],
  },
  {
    id: 'advantages',
    categoryId: 'ecosysteme',
    title: 'What are the benefits for users?',
    summary: 'Simplicity, predictable amounts, Laboratory access, and fast onboarding.',
    body: `• **Readability** — 1 R4V3 = 1 CHF, no surprises on order of magnitude
• **Onboarding** — faucet + built-in FAQ to start without external docs
• **Interoperability** — direct swap with Laboratory tokens
• **UI consistency** — navbar, chart, and exchange stay in sync
• **Scalability** — information hub kept up to date with the ecosystem

R4V3 is designed to reduce cognitive friction, not to promise speculative gains.`,
    tags: ['benefits', 'ux', 'onboarding'],
  },
  {
    id: 'security',
    categoryId: 'ecosysteme',
    title: 'Is R4V3 secure?',
    summary: 'Testnet wallet best practices; never treat testnet as a real asset.',
    body: `On testnet, security follows the same principles as any crypto wallet:

• Never share your private key or seed phrase
• Use strong passwords for your R4V3chain account
• Treat testnet R4V3 as demo tokens with no real value
• Verify URLs and the authenticity of the application

Transactions are traceable on-chain in the built-in explorer. For a full audit, refer to the white paper and source repository.`,
    tags: ['security', 'wallet', 'testnet'],
  },
  {
    id: 'roadmap',
    categoryId: 'evolution',
    title: 'What is coming next?',
    summary: 'Evolving FAQ, richer Laboratory, and ongoing official documentation.',
    body: `The R4V3 hub is built to evolve with the ecosystem:

• New questions added from user feedback
• Stronger integration with Laboratory and the chart
• Official documentation (white paper) kept current
• Future option to administer FAQs via API

This FAQ replaces the old technical panel: the goal is a living information center, not a static docs page.`,
    isNew: true,
    updatedAt: '2026-07-17',
    tags: ['roadmap', 'faq', 'evolution'],
  },
  {
    id: 'whitepaper',
    categoryId: 'evolution',
    title: 'Where can I read the white paper?',
    summary: 'Available via the document icon in the R4V3 hub or as a .txt download.',
    body: `The R4V3 white paper is available from the hub (document icon at the top right) and can be downloaded as text.

It complements this FAQ with technical context, the token model, and the long-term vision of R4V3chain. Read it to go deeper beyond the quick answers.`,
    actionType: 'OPEN_WHITEPAPER',
    actionLabel: 'Open the white paper',
    tags: ['white paper', 'documentation'],
  },
] as const;

export function r4v3FaqCategoryLabel(categoryId: R4v3FaqCategoryId): string {
  return R4V3_FAQ_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}

export function r4v3FaqCategoryIcon(categoryId: R4v3FaqCategoryId): string {
  return R4V3_FAQ_CATEGORIES.find((c) => c.id === categoryId)?.icon ?? '·';
}
