import { TestBed } from '@angular/core/testing';

import { ANALYTICS_CONFIG, AnalyticsConfig } from '../analytics.config';
import { AnalyticsConsentService } from '../analytics-consent.service';
import { AnalyticsConsentBannerComponent } from './analytics-consent-banner.component';

const TEST_CONFIG: AnalyticsConfig = {
  measurementId: 'G-TEST12345',
  consentStorageKey: 'test.consent-banner.analytics-consent.v1',
  consentVersion: 1,
};

function createFixture() {
  TestBed.configureTestingModule({
    imports: [AnalyticsConsentBannerComponent],
    providers: [{ provide: ANALYTICS_CONFIG, useValue: TEST_CONFIG }],
  });
  const fixture = TestBed.createComponent(AnalyticsConsentBannerComponent);
  fixture.detectChanges();
  return fixture;
}

describe('AnalyticsConsentBannerComponent', () => {
  afterEach(() => {
    localStorage.removeItem(TEST_CONFIG.consentStorageKey);
    document.querySelectorAll('script[data-ga-script]').forEach((el) => el.remove());
  });

  it('renders with the required test ids and accessible controls when consent is unknown', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="analytics-consent-banner"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="analytics-consent-title"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="analytics-consent-summary"]')).toBeTruthy();

    const accept = el.querySelector('[data-testid="analytics-consent-accept"]');
    const reject = el.querySelector('[data-testid="analytics-consent-reject"]');
    expect(accept?.textContent?.trim()).toBe('Accept');
    expect(reject?.textContent?.trim()).toBe('Reject');
  });

  it('reserves a clearly marked Privacy Policy placeholder since no URL is approved yet', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    const placeholder = el.querySelector('[data-testid="analytics-consent-privacy-placeholder"]');
    expect(placeholder?.textContent).toContain('Privacy Policy');
    expect(placeholder?.textContent).toContain('coming soon');
    // Not a working link yet: no approved Privacy Policy / Datenschutzerklaerung
    // URL exists, and a dead href would be worse than a marked placeholder.
    expect(el.querySelector('a')).toBeNull();
  });

  it('hides after accepting', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('[data-testid="analytics-consent-accept"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="analytics-consent-banner"]')).toBeNull();
  });

  it('hides after rejecting', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('[data-testid="analytics-consent-reject"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="analytics-consent-banner"]')).toBeNull();
  });

  it('persists the choice through AnalyticsConsentService', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;
    const consent = TestBed.inject(AnalyticsConsentService);

    (el.querySelector('[data-testid="analytics-consent-accept"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(consent.state()).toBe('accepted');
  });

  it('reopens when settings are opened, even after a decision was made', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;
    const consent = TestBed.inject(AnalyticsConsentService);

    consent.accept();
    fixture.detectChanges();
    expect(el.querySelector('[data-testid="analytics-consent-banner"]')).toBeNull();

    consent.openSettings();
    fixture.detectChanges();
    expect(el.querySelector('[data-testid="analytics-consent-banner"]')).toBeTruthy();
  });
});
