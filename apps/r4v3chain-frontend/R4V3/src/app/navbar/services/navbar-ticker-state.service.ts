import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, startWith, switchMap } from 'rxjs';
import { catchError, of } from 'rxjs';

import { BrandCryptoSelectionService } from './brand-crypto-selection.service';
import { BlockchainApiService, PendingTransaction } from '@blockchain/services/blockchain-api.service';
import { DockChainStateService } from '@dock/services/dock-chain-state.service';
import { formatDockRelativeTime } from '@core/utils/dock-time.util';

export interface NavbarTickerDrawerDetail {
  eyebrow: string;
  title: string;
  summary: string;
  bullets?: string[];
  metrics?: { label: string; value: string }[];
}

export interface NavbarTickerSegment {
  id: string;
  label: string;
  value: string;
  detail?: NavbarTickerDrawerDetail;
}

@Injectable({ providedIn: 'root' })
export class NavbarTickerStateService {
  private readonly api = inject(BlockchainApiService);
  private readonly brandCrypto = inject(BrandCryptoSelectionService);
  private readonly chainState = inject(DockChainStateService);

  readonly networkLabel = signal('R4V3CHAIN');
  readonly activeToken = signal('R4V3');
  readonly lastTransactionShort = signal('Loading…');
  readonly peersConnected = signal(0);
  readonly peersTotal = signal(0);
  readonly blockTip = signal<string | null>(null);
  readonly lastUpdatedAt = signal<number | null>(null);
  readonly loading = signal(true);

  readonly segments = computed((): NavbarTickerSegment[] => {
    const peersLabel =
      this.peersTotal() > 0
        ? `${this.peersConnected()}/${this.peersTotal()}`
        : String(this.peersConnected());

    const networkValue = this.networkLabel();
    const tokenValue = this.activeToken();
    const txValue = this.lastTransactionShort();
    const tip = this.blockTip();
    const ageLabel = this.updatedAgeLabel();

    const segments: NavbarTickerSegment[] = [
      {
        id: 'network',
        label: 'Network',
        value: networkValue,
        detail: {
          eyebrow: 'Infrastructure',
          title: networkValue,
          summary:
            'R4V3chain runs on a distributed network optimized for latency and node availability.',
          bullets: [
            'Consensus synced in real time with active peers.',
            'Launch planned for Q4 — early access via the R4V3 laboratory.',
            'Compatible with the explorer’s live feeds.',
          ],
          metrics: [
            { label: 'Network', value: 'R4V3chain peer-to-peer' },
            { label: 'Status', value: this.loading() ? 'Syncing…' : 'Operational' },
            { label: 'Updated', value: ageLabel },
          ],
        },
      },
      {
        id: 'token',
        label: 'Token',
        value: tokenValue,
        detail: {
          eyebrow: 'Selected asset',
          title: tokenValue,
          summary:
            'The active token drives the chart, exchange, and metrics shown in the market hub.',
          bullets: [
            'R4V3 — native token of the R4V3chain ecosystem.',
            'Laboratory tokens available in the adjacent dropdown.',
            'Rewards distributed to active network participants.',
          ],
          metrics: [
            { label: 'TVL', value: '12.4M' },
            { label: 'Launch', value: 'Q4 2026' },
            { label: 'Rewards', value: 'Active' },
          ],
        },
      },
      {
        id: 'tx',
        label: 'Tx',
        value: txValue,
        detail: {
          eyebrow: 'Queue',
          title: 'Latest transaction',
          summary:
            'Stream of transactions pending validation, updated via the node’s live channel.',
          bullets: [
            'Hash truncated in the ticker for compact readability.',
            'Open the Transactions bar for the full history.',
            'Automatic refresh on every network snapshot.',
          ],
          metrics: [{ label: 'Hash', value: txValue }],
        },
      },
      {
        id: 'peers',
        label: 'Peers',
        value: peersLabel,
        detail: {
          eyebrow: 'P2P topology',
          title: `${peersLabel} peers`,
          summary:
            'Number of nodes connected to the R4V3chain network, measured via peer stats.',
          bullets: [
            'Active peers help propagate blocks.',
            'Check the Peers bar for each connection’s detail.',
            'Automatic refresh every 30 seconds.',
          ],
          metrics: [
            { label: 'Connected', value: String(this.peersConnected()) },
            { label: 'Total', value: String(this.peersTotal() || this.peersConnected()) },
            { label: 'Updated', value: ageLabel },
          ],
        },
      },
    ];

    if (tip) {
      segments.push({
        id: 'tip',
        label: 'Block',
        value: tip,
        detail: {
          eyebrow: 'Chain',
          title: `Block ${tip}`,
          summary:
            'Index of the latest confirmed block on R4V3chain, refreshed every 5 seconds.',
          bullets: [
            'Chain tip synced with the Chain bar.',
            'Click a block in the explorer to open its detail.',
            'Local node progress indicator.',
          ],
          metrics: [{ label: 'Tip', value: tip }],
        },
      });
    }

    return segments;
  });

  readonly updatedAgeLabel = computed(() =>
    formatDockRelativeTime(this.lastUpdatedAt())
  );

  constructor() {
    effect(() => {
      this.activeToken.set(String(this.brandCrypto.selected()));
    });

    this.fetchBanner();
    this.listenLiveUpdates();

    interval(30_000)
      .pipe(
        startWith(0),
        switchMap(() => this.api.getPeerStats()),
        catchError(() => of(null)),
        takeUntilDestroyed()
      )
      .subscribe((stats) => {
        if (stats) {
          this.peersConnected.set(stats.active ?? 0);
          this.peersTotal.set(stats.total ?? stats.active ?? 0);
          this.lastUpdatedAt.set(Date.now());
        }
      });

    void this.chainState.load();
    interval(45_000)
      .pipe(startWith(0), takeUntilDestroyed())
      .subscribe(() => this.chainState.refresh());

    interval(5_000)
      .pipe(startWith(0), takeUntilDestroyed())
      .subscribe(() => {
        const tip = this.chainState.latestBlock();
        this.blockTip.set(tip ? `#${tip.index}` : null);
      });
  }

  refresh(): void {
    this.fetchBanner();
    this.chainState.refresh(true);
  }

  private fetchBanner(): void {
    this.loading.set(true);
    this.api
      .getBanner()
      .pipe(catchError(() => of(null)))
      .subscribe((data) => {
        if (data) {
          this.networkLabel.set(data.message1?.trim() || 'R4V3CHAIN');
          this.applyLatestTransactionLabel(
            data.lastTransactionShort ?? data.lastTransaction ?? null
          );
          if (typeof data.userCount === 'number' && data.userCount >= 0) {
            this.peersConnected.set(data.userCount);
          }
        } else {
          this.networkLabel.set('R4V3CHAIN');
          this.lastTransactionShort.set('No recent transaction');
        }
        this.loading.set(false);
        this.lastUpdatedAt.set(Date.now());
      });
  }

  private listenLiveUpdates(): void {
    this.api.connectLiveUpdates().pipe(takeUntilDestroyed()).subscribe({
      next: (message) => {
        if (message.type === 'pending-transactions') {
          this.applyLatestTransaction(message.data);
        }
        if (message.type === 'snapshot') {
          this.applyLatestTransaction(message.data.pendingTransactions);
        }
        this.lastUpdatedAt.set(Date.now());
      },
    });
  }

  private applyLatestTransaction(transactions: PendingTransaction[]): void {
    if (!transactions?.length) {
      this.lastTransactionShort.set('No recent transaction');
      return;
    }

    const latest = [...transactions].sort(
      (a, b) => (b.createdAt ?? b.timestamp ?? 0) - (a.createdAt ?? a.timestamp ?? 0)
    )[0];

    const hash =
      latest.hash ??
      latest.id ??
      latest.payload ??
      latest.data ??
      'Transaction';

    this.applyLatestTransactionLabel(hash);
  }

  private applyLatestTransactionLabel(value: string | null): void {
    if (!value?.trim()) {
      this.lastTransactionShort.set('No recent transaction');
      return;
    }

    const normalized = value.trim();
    this.lastTransactionShort.set(
      normalized.length > 24 ? `${normalized.slice(0, 24)}…` : normalized
    );
  }
}
