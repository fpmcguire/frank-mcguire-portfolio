import { TestBed } from '@angular/core/testing';

import { FOOTER_CONTENT } from '../../content/footer.content';
import { AnalyticsConsentService } from '../../analytics/analytics-consent.service';
import { FooterComponent } from './footer.component';

function createFixture() {
  TestBed.configureTestingModule({ imports: [FooterComponent] });
  const fixture = TestBed.createComponent(FooterComponent);
  fixture.detectChanges();
  return fixture;
}

describe('FooterComponent', () => {
  it('renders a semantic footer with the required testid', () => {
    const el = createFixture().nativeElement as HTMLElement;

    expect(el.querySelector('footer[data-testid="footer"]')).toBeTruthy();
  });

  it('renders the copyright line', () => {
    const el = createFixture().nativeElement as HTMLElement;

    expect(el.textContent).toContain(FOOTER_CONTENT.copyright);
  });

  it('renders the MOD-W attribution with a non-breaking hyphen', () => {
    const el = createFixture().nativeElement as HTMLElement;

    expect(el.textContent).toContain(`MOD${'‑'}W`);
  });

  it('renders a Privacy / Cookie settings control', () => {
    const el = createFixture().nativeElement as HTMLElement;

    const control = el.querySelector('[data-testid="analytics-consent-settings"]');
    expect(control?.textContent).toContain('Privacy / Cookie settings');
  });

  it('opens analytics consent settings when the control is clicked', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;
    const consent = TestBed.inject(AnalyticsConsentService);

    (el.querySelector('[data-testid="analytics-consent-settings"]') as HTMLButtonElement).click();

    expect(consent.isSettingsOpen()).toBe(true);
  });
});
