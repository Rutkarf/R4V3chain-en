import { describe, expect, it } from 'vitest';

import { detectAppLocale } from './locale.service';
import { LocaleService } from './locale.service';

describe('detectAppLocale', () => {
  it('stays English regardless of browser language', () => {
    expect(detectAppLocale(['fr-CH', 'en'], 'fr-CH')).toBe('en');
    expect(detectAppLocale(['en-US'], 'en-US')).toBe('en');
    expect(detectAppLocale(['de-DE', 'ja'], 'de-DE')).toBe('en');
  });
});

describe('LocaleService', () => {
  it('shows English labels', () => {
    const service = new LocaleService();
    expect(service.localeLabel()).toBe('EN');
    expect(service.locale()).toBe('en');
    expect(service.t('dock.wallet')).toBe('Wallet');
  });
});
