import { R4v3HubPillar } from '@showcase/models/r4v3-hub.model';

export const R4V3_HUB_PILLARS: readonly R4v3HubPillar[] = [
  {
    id: 'peg-chf',
    label: 'CHF',
    detail: 'Reference parity shown in real time',
    icon: '₣',
    accent: 'cyan',
    drawerTitle: '1 R4V3 = 1 Swiss franc',
    drawerSummary:
      'R4V3 is presented with a pedagogical parity at 1 CHF to simplify reading amounts.',
    sections: [
      {
        title: 'Why CHF?',
        body: 'The Swiss franc offers a stable, familiar reference. On testnet, this parity lets you instantly grasp the order of magnitude of an amount without mental conversion.',
      },
      {
        title: 'Stability mechanism',
        body: 'The anchor is primarily a display mechanism: the hub, chart, and exchange panel sync the R4V3/CHF quote. Laboratory tokens remain expressed relative to R4V3.',
      },
      {
        title: 'Displayed guarantees',
        body: 'This is not a regulated financial promise. Transparency rests on the white paper, the official FAQ, and testnet traceability — not on a bank reserve.',
      },
    ],
  },
  {
    id: 'fast',
    label: 'Fast',
    detail: 'Near-instant testnet transactions',
    icon: '⏱',
    accent: 'green',
    drawerTitle: 'Speed & throughput',
    drawerSummary: 'R4V3 is optimized for smooth interactions in the R4V3chain app.',
    sections: [
      {
        title: 'Transaction time',
        body: 'On testnet, operations (faucet, swap, transfers) confirm in a few seconds. API latency is shown dynamically in the hub header.',
      },
      {
        title: 'Throughput',
        body: 'The demo network supports a continuous flow of Laboratory operations without a perceptible queue for the user.',
      },
      {
        title: 'Use cases',
        body: 'Swap R4V3 ↔ Laboratory, faucet credit, chart + exchange navigation: every action is designed to feel instant on the UX side.',
      },
    ],
  },
  {
    id: 'utility',
    label: 'Utility',
    detail: 'Native currency of the R4V3chain ecosystem',
    icon: '⚡',
    accent: 'magenta',
    drawerTitle: 'R4V3 utility coin',
    drawerSummary: 'R4V3 is not a memecoin: it is the app’s reference currency.',
    sections: [
      {
        title: 'What is it for?',
        body: 'Laboratory quote, swap, faucet, price display, and navbar ↔ chart ↔ exchange panel sync.',
      },
      {
        title: 'Where to use it?',
        body: 'Exchange panel (m4t3r), navbar selector, R4V3 chart, FAQ hub, and collapsed bar for quick access.',
      },
      {
        title: 'In the ecosystem',
        body: 'All Laboratory tokens (PXD, NVFI, LAB3, ORB) are quoted vs R4V3. It is the testnet economic pivot.',
      },
    ],
  },
  {
    id: 'transparent',
    label: 'Transparent',
    detail: 'White paper, traceability, and documented governance',
    icon: '◉',
    accent: 'gold',
    drawerTitle: 'Transparency & traceability',
    drawerSummary: 'Open documentation and mechanisms explained publicly.',
    sections: [
      {
        title: 'Documentation',
        body: 'Downloadable white paper, official FAQ, and interactive hub — three depth levels on the same topic.',
      },
      {
        title: 'Traceability',
        body: 'Testnet operations are viewable via the explorer and the ALL feed. No grey area on the origin of displayed data.',
      },
      {
        title: 'Governance',
        body: 'The community FAQ lets users ask questions; staff validates official answers.',
      },
    ],
  },
  {
    id: 'secure',
    label: 'Secure',
    detail: 'Wallet best practices and testnet protocol',
    icon: '🛡',
    accent: 'violet',
    drawerTitle: 'Protocol security',
    drawerSummary: 'Security principles for using R4V3 in a testnet environment.',
    sections: [
      {
        title: 'Protocol',
        body: 'R4V3chain testnet isolates demo funds from mainnet. Private keys stay under user control via the built-in wallet.',
      },
      {
        title: 'Wallet',
        body: 'Never share your seed phrase or private key. Use strong passwords for your app account.',
      },
      {
        title: 'Testnet',
        body: 'Testnet R4V3 has no real value. Treat it as demo tokens — security aims at good crypto hygiene.',
      },
    ],
  },
  {
    id: 'ecosystem',
    label: 'Ecosystem',
    detail: 'Laboratory, swap, and hub connected',
    icon: '◎',
    accent: 'blue',
    drawerTitle: 'R4V3 in the ecosystem',
    drawerSummary: 'The native token at the center of Laboratory, the chart, and the swap.',
    sections: [
      {
        title: 'Laboratory',
        body: 'Create and quote tokens vs R4V3. Navbar selection → automatic chart + exchange pair sync.',
      },
      {
        title: 'Hub & FAQ',
        body: 'This showcase centralizes official information and the community FAQ — complementary to the ALL feed and the chart.',
      },
      {
        title: 'Evolution',
        body: 'Architecture ready for an administrable FAQ, deep-links, and protocol notifications from the collapsed bar.',
      },
    ],
  },
] as const;

/** 3 columns × 2 info blocks (A–B | C–D | E–F). */
export const R4V3_HUB_PILLAR_COLUMNS: readonly (readonly R4v3HubPillar[])[] = [
  [R4V3_HUB_PILLARS[0], R4V3_HUB_PILLARS[1]],
  [R4V3_HUB_PILLARS[2], R4V3_HUB_PILLARS[3]],
  [R4V3_HUB_PILLARS[4], R4V3_HUB_PILLARS[5]],
];
