import { TestBed } from '@angular/core/testing';

import { ANALYTICS_CONFIG } from './analytics.config';
import { AnalyticsConsentService } from './analytics-consent.service';

const TEST_CONFIG = {
  measurementId: 'G-TEST12345',
  consentStorageKey: 'test.analytics-consent.v1',
  consentVersion: 1 as const,
};

function createService(): AnalyticsConsentService {
  TestBed.configureTestingModule({
    providers: [{ provide: ANALYTICS_CONFIG, useValue: TEST_CONFIG }],
  });
  return TestBed.inject(AnalyticsConsentService);
}

describe('AnalyticsConsentService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.removeItem(TEST_CONFIG.consentStorageKey);
  });

  it('starts as unknown when no consent is stored', () => {
    const service = createService();

    expect(service.state()).toBe('unknown');
  });

  it('reads a valid accepted record on construction', () => {
    localStorage.setItem(
      TEST_CONFIG.consentStorageKey,
      JSON.stringify({ version: 1, state: 'accepted', decidedAt: '2026-01-01T00:00:00.000Z' }),
    );

    const service = createService();

    expect(service.state()).toBe('accepted');
  });

  it('reads a valid rejected record on construction', () => {
    localStorage.setItem(
      TEST_CONFIG.consentStorageKey,
      JSON.stringify({ version: 1, state: 'rejected', decidedAt: '2026-01-01T00:00:00.000Z' }),
    );

    const service = createService();

    expect(service.state()).toBe('rejected');
  });

  it('treats a malformed record as unknown', () => {
    localStorage.setItem(TEST_CONFIG.consentStorageKey, JSON.stringify({ nonsense: true }));

    const service = createService();

    expect(service.state()).toBe('unknown');
  });

  it('treats invalid JSON as unknown', () => {
    localStorage.setItem(TEST_CONFIG.consentStorageKey, '{not json');

    const service = createService();

    expect(service.state()).toBe('unknown');
  });

  it('treats an old-version record as unknown', () => {
    localStorage.setItem(
      TEST_CONFIG.consentStorageKey,
      JSON.stringify({ version: 0, state: 'accepted', decidedAt: '2026-01-01T00:00:00.000Z' }),
    );

    const service = createService();

    expect(service.state()).toBe('unknown');
  });

  it('persists accepted consent and updates state', () => {
    const service = createService();

    service.accept();

    expect(service.state()).toBe('accepted');
    const stored = JSON.parse(localStorage.getItem(TEST_CONFIG.consentStorageKey) ?? '{}');
    expect(stored.state).toBe('accepted');
  });

  it('persists rejected consent and updates state', () => {
    const service = createService();

    service.reject();

    expect(service.state()).toBe('rejected');
    const stored = JSON.parse(localStorage.getItem(TEST_CONFIG.consentStorageKey) ?? '{}');
    expect(stored.state).toBe('rejected');
  });

  it('supports withdrawing accepted consent to rejected', () => {
    const service = createService();

    service.accept();
    expect(service.state()).toBe('accepted');

    service.reject();
    expect(service.state()).toBe('rejected');
  });

  it('supports re-accepting after a rejection', () => {
    const service = createService();

    service.reject();
    service.accept();

    expect(service.state()).toBe('accepted');
  });

  it('opens and closes settings, and closes settings automatically on a new decision', () => {
    const service = createService();

    service.openSettings();
    expect(service.isSettingsOpen()).toBe(true);

    service.accept();
    expect(service.isSettingsOpen()).toBe(false);
  });

  it('does not crash when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', undefined);

    let service!: AnalyticsConsentService;
    expect(() => {
      service = createService();
    }).not.toThrow();
    expect(service.state()).toBe('unknown');

    expect(() => service.accept()).not.toThrow();
    expect(service.state()).toBe('accepted');
  });

  it('does not crash when localStorage access throws', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('storage blocked');
      },
    });

    try {
      let service!: AnalyticsConsentService;
      expect(() => {
        service = createService();
      }).not.toThrow();
      expect(service.state()).toBe('unknown');

      expect(() => service.accept()).not.toThrow();
      expect(service.state()).toBe('accepted');
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(globalThis, 'localStorage', originalDescriptor);
      }
    }
  });
});
