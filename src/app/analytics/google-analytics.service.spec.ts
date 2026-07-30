import { TestBed } from '@angular/core/testing';

import { ANALYTICS_CONFIG, AnalyticsConfig } from './analytics.config';
import { AnalyticsConsentService } from './analytics-consent.service';
import { GoogleAnalyticsService } from './google-analytics.service';

const TEST_CONFIG: AnalyticsConfig = {
  measurementId: 'G-TEST12345',
  consentStorageKey: 'test.google-analytics.analytics-consent.v1',
  consentVersion: 1,
};

interface TestWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

function createServices(config: AnalyticsConfig = TEST_CONFIG) {
  TestBed.configureTestingModule({
    providers: [{ provide: ANALYTICS_CONFIG, useValue: config }],
  });
  const consent = TestBed.inject(AnalyticsConsentService);
  const ga = TestBed.inject(GoogleAnalyticsService);
  return { consent, ga };
}

function dataLayer(): unknown[] {
  return ((window as TestWindow).dataLayer ?? []) as unknown[];
}

function normalizeDataLayerEntry(entry: unknown): unknown[] | null {
  if (Array.isArray(entry)) {
    return entry;
  }

  if (
    typeof entry === 'object' &&
    entry !== null &&
    'length' in entry &&
    typeof (entry as { length: unknown }).length === 'number'
  ) {
    return Array.from(entry as ArrayLike<unknown>);
  }

  return null;
}

function eventCalls(name: string): unknown[][] {
  return dataLayer()
    .map(normalizeDataLayerEntry)
    .filter(
      (entry): entry is unknown[] => entry !== null && entry[0] === 'event' && entry[1] === name,
    );
}

function expireTestCookies(): void {
  for (const name of ['_ga', '_ga_ABC123']) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }
}

describe('GoogleAnalyticsService', () => {
  afterEach(() => {
    localStorage.removeItem(TEST_CONFIG.consentStorageKey);
    document.querySelectorAll('script[data-ga-script]').forEach((el) => el.remove());
    delete (window as TestWindow).dataLayer;
    delete (window as TestWindow).gtag;
    expireTestCookies();
  });

  it('does not inject the GA script before consent is accepted', () => {
    createServices();
    TestBed.tick();

    expect(document.head.querySelector('script[data-ga-script]')).toBeNull();
  });

  it('no-ops and injects nothing when the measurement id is empty', () => {
    const { consent } = createServices({ ...TEST_CONFIG, measurementId: '' });

    consent.accept();
    TestBed.tick();

    expect(document.head.querySelector('script[data-ga-script]')).toBeNull();
  });

  it('injects the GA script exactly once after consent is accepted', () => {
    const { consent } = createServices();

    consent.accept();
    TestBed.tick();

    const scripts = document.head.querySelectorAll('script[data-ga-script]');
    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute('src')).toContain(TEST_CONFIG.measurementId);
  });

  it('sends exactly one initial page-view after consent is accepted', () => {
    const { consent } = createServices();

    consent.accept();
    TestBed.tick();

    expect(eventCalls('page_view')).toHaveLength(1);
  });

  it('does not send tracked events before consent is accepted', () => {
    const { ga } = createServices();

    ga.trackEvent('section_navigation', { section: 'work' });

    expect(dataLayer()).toHaveLength(0);
  });

  it('sends approved events after consent is accepted', () => {
    const { consent, ga } = createServices();

    consent.accept();
    TestBed.tick();
    ga.trackEvent('section_navigation', { section: 'work' });

    const calls = eventCalls('section_navigation');
    expect(calls).toHaveLength(1);
    expect(calls[0][2]).toEqual({ section: 'work' });
  });

  it('stops sending events after consent is withdrawn', () => {
    const { consent, ga } = createServices();

    consent.accept();
    TestBed.tick();
    consent.reject();
    TestBed.tick();

    const before = dataLayer().length;
    ga.trackEvent('section_navigation', { section: 'work' });

    expect(dataLayer()).toHaveLength(before);
  });

  it('attempts to remove first-party GA cookies on withdrawal', () => {
    document.cookie = '_ga=GA1.2.123; path=/';
    document.cookie = '_ga_ABC123=GS1.1.456; path=/';
    const { consent } = createServices();

    consent.accept();
    TestBed.tick();
    consent.reject();
    TestBed.tick();

    expect(document.cookie).not.toContain('_ga=GA1.2.123');
    expect(document.cookie).not.toContain('_ga_ABC123=GS1.1.456');
  });
});
