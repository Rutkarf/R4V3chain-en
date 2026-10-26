import { Injectable, computed, signal } from '@angular/core';

import { AppLocale, LocaleKey, nextLocale, translate } from './locale.messages';

const STORAGE_KEY = 'r4v3chain.locale';

/** UI is English-only on this fork. */
export function detectAppLocale(
  _languages: readonly string[] | undefined,
  _language: string | undefined,
): AppLocale {
  return 'en';
}

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly localeSignal = signal<AppLocale>(this.readStoredLocale());

  readonly locale = this.localeSignal.asReadonly();
  readonly localeLabel = computed(() => 'EN');

  t(key: LocaleKey): string {
    return translate(this.locale(), key);
  }

  toggle(): void {
    const next = nextLocale(this.locale());
    this.localeSignal.set(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }

  private readStoredLocale(): AppLocale {
    localStorage.setItem(STORAGE_KEY, 'en');
    document.documentElement.lang = 'en';
    return 'en';
  }
}
