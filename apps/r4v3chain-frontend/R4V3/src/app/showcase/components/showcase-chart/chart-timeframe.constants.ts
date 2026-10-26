import { ChartRange } from '@showcase/models/showcase.model';

/** Granularité native fournie par CoinGecko (`/coins/{id}/market_chart`). */
export type CoingeckoGranularity = '5m' | '1h' | '1d';

export type ChartTimeframeCategory = 'interval' | 'period';

/** Intervals = granularité CG ; périodes = fenêtre temporelle CG. */
export type ChartTimeframeId =
  | '1d'
  | '24h'
  | '7d'
  | '30d'
  | '90d'
  | '1y'
  | 'ytd';

export interface ChartTimeframeOption {
  id: ChartTimeframeId;
  label: string;
  badge: string;
  category: ChartTimeframeCategory;
  apiRange: ChartRange;
  coingeckoGranularity: CoingeckoGranularity;
  /** Periods API compatibles (intervalles uniquement). */
  supportedApiRanges?: readonly ChartRange[];
}

export interface ChartTimeframeSection {
  title: string;
  options: readonly ChartTimeframeOption[];
}

/** Intervals alignés sur la granularité CoinGecko (pas d’interpolation). */
export const CHART_INTERVAL_OPTIONS: readonly ChartTimeframeOption[] = [
  {
    id: '1d',
    label: '1 day',
    badge: '1J',
    category: 'interval',
    apiRange: '365d',
    coingeckoGranularity: '1d',
    supportedApiRanges: ['365d'],
  },
];

/** Periods avec jeu de données CoinGecko direct (sans fenêtre synthétique). */
export const CHART_PERIOD_OPTIONS: readonly ChartTimeframeOption[] = [
  {
    id: '24h',
    label: '24 hours',
    badge: '24H',
    category: 'period',
    apiRange: '24h',
    coingeckoGranularity: '5m',
  },
  {
    id: '7d',
    label: '7 days',
    badge: '7J',
    category: 'period',
    apiRange: '7d',
    coingeckoGranularity: '1h',
  },
  {
    id: '30d',
    label: '1 month',
    badge: '1M',
    category: 'period',
    apiRange: '30d',
    coingeckoGranularity: '1h',
  },
  {
    id: '90d',
    label: '3 months',
    badge: '3M',
    category: 'period',
    apiRange: '90d',
    coingeckoGranularity: '1h',
  },
  {
    id: '1y',
    label: '1 year',
    badge: '1A',
    category: 'period',
    apiRange: '365d',
    coingeckoGranularity: '1d',
  },
  {
    id: 'ytd',
    label: 'Year to date',
    badge: 'YTD',
    category: 'period',
    apiRange: '365d',
    coingeckoGranularity: '1d',
  },
];

const TIMEFRAME_BY_ID = new Map<ChartTimeframeId, ChartTimeframeOption>(
  [...CHART_INTERVAL_OPTIONS, ...CHART_PERIOD_OPTIONS].map((option) => [option.id, option])
);

export function chartTimeframeById(id: ChartTimeframeId): ChartTimeframeOption {
  return TIMEFRAME_BY_ID.get(id) ?? TIMEFRAME_BY_ID.get('24h')!;
}

export function isIntervalId(id: ChartTimeframeId): boolean {
  return CHART_INTERVAL_OPTIONS.some((option) => option.id === id);
}

export function buildTimeframeMenuSections(activeApiRange: ChartRange): ChartTimeframeSection[] {
  const intervals = CHART_INTERVAL_OPTIONS.filter((option) =>
    option.supportedApiRanges?.includes(activeApiRange)
  );
  const sections: ChartTimeframeSection[] = [];

  if (intervals.length > 0) {
    sections.push({ title: 'Interval', options: intervals });
  }

  sections.push({ title: 'Period', options: CHART_PERIOD_OPTIONS });
  return sections;
}

export function defaultIntervalForRange(range: ChartRange): ChartTimeframeId {
  switch (range) {
    case '7d':
      return '7d';
    case '30d':
      return '30d';
    case '90d':
      return '90d';
    case '365d':
      return '1d';
    default:
      return '24h';
  }
}

/**
 * Granularité réelle CoinGecko selon `days` :
 * - days = 1  → ~1 point / 5 min
 * - 2–90 j    → ~1 point / heure
 * - > 90 j    → ~1 point / jour
 */
export const COINGECKO_GRANULARITY_HINT =
  'CoinGecko data: ~5 min (24 h), hourly (2–90 d), daily (> 90 d).';

export const CHART_AXIS_LABELS: Record<ChartTimeframeId, readonly string[]> = {
  '1d': ['T1', 'T2', 'T3', 'T4', '1A'],
  '24h': ['00h', '06h', '12h', '18h', '24h'],
  '7d': ['J1', 'J2', 'J3', 'J5', 'J7'],
  '30d': ['S1', 'S2', 'S3', 'S4', '30j'],
  '90d': ['M1', 'M2', 'M3', 'M4', '90j'],
  '1y': ['T1', 'T2', 'T3', 'T4', '1A'],
  ytd: ['Jan', 'Avr', 'Juil', 'Oct', 'Auj.'],
};

export function chartAxisLabelsForTimeframe(id: ChartTimeframeId): readonly string[] {
  return CHART_AXIS_LABELS[id] ?? CHART_AXIS_LABELS['24h'];
}

/** @deprecated Utiliser buildTimeframeMenuSections */
export const CHART_TIMEFRAME_SECTIONS: readonly ChartTimeframeSection[] = [
  { title: 'Interval', options: CHART_INTERVAL_OPTIONS },
  { title: 'Period', options: CHART_PERIOD_OPTIONS },
];
