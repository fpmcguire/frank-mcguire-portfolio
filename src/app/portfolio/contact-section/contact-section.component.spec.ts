import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticsService } from '../../analytics/google-analytics.service';
import { buildMailtoHref } from '../../content/contact-path.model';
import { CONTACT_CONTENT } from '../../content/contact.content';
import { ContactSectionComponent } from './contact-section.component';

function createFixture() {
  TestBed.configureTestingModule({ imports: [ContactSectionComponent] });
  const fixture = TestBed.createComponent(ContactSectionComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

function createFixtureWithMockAnalytics() {
  const trackEvent = vi.fn();
  TestBed.configureTestingModule({
    imports: [ContactSectionComponent],
    providers: [{ provide: GoogleAnalyticsService, useValue: { trackEvent } }],
  });
  const fixture = TestBed.createComponent(ContactSectionComponent);
  fixture.detectChanges();
  return { el: fixture.nativeElement as HTMLElement, trackEvent };
}

describe('ContactSectionComponent', () => {
  it('renders the canonical contact section id and heading', () => {
    const el = createFixture();

    expect(el.querySelector('section#contact')).toBeTruthy();
    expect(el.querySelector('[data-testid="contact-section-heading"]')?.textContent).toContain(
      CONTACT_CONTENT.title,
    );
  });

  it('renders full-time and freelance paths with equal visual weight', () => {
    const el = createFixture();

    const fullTime = el.querySelector('[data-testid="contact-path-full-time"]');
    const freelance = el.querySelector('[data-testid="contact-path-freelance"]');

    expect(fullTime).toBeTruthy();
    expect(freelance).toBeTruthy();
    expect(fullTime?.className).toBe(freelance?.className);
  });

  it('renders mailto CTAs built from the configured email and path', () => {
    const el = createFixture();

    for (const path of CONTACT_CONTENT.paths) {
      const cta = el.querySelector(`[data-testid="contact-${path.id}-cta"]`);
      expect(cta?.getAttribute('href')).toBe(buildMailtoHref(CONTACT_CONTENT.email, path));
    }
  });

  it('renders the email link without target/rel, and LinkedIn/GitHub with target=_blank rel=noopener', () => {
    const el = createFixture();

    const emailLink = el.querySelector('[data-testid="contact-email-link"]');
    expect(emailLink?.getAttribute('href')).toBe(`mailto:${CONTACT_CONTENT.email}`);
    expect(emailLink?.getAttribute('target')).toBeNull();
    expect(emailLink?.getAttribute('rel')).toBeNull();

    const linkedinLink = el.querySelector('[data-testid="contact-linkedin-link"]');
    expect(linkedinLink?.getAttribute('target')).toBe('_blank');
    expect(linkedinLink?.getAttribute('rel')).toBe('noopener');

    const githubLink = el.querySelector('[data-testid="contact-github-link"]');
    expect(githubLink?.getAttribute('target')).toBe('_blank');
    expect(githubLink?.getAttribute('rel')).toBe('noopener');
  });

  it('renders the optional inquiry guidance', () => {
    const el = createFixture();

    expect(el.querySelector('[data-testid="contact-guidance"]')?.textContent).toContain(
      CONTACT_CONTENT.guidance,
    );
  });

  it('tracks contact_cta_click with the matching path for each contact CTA', () => {
    const { el, trackEvent } = createFixtureWithMockAnalytics();

    for (const path of CONTACT_CONTENT.paths) {
      (el.querySelector(`[data-testid="contact-${path.id}-cta"]`) as HTMLAnchorElement).click();

      expect(trackEvent).toHaveBeenCalledWith('contact_cta_click', {
        source: `contact-${path.id}-cta`,
        path: path.id,
      });
    }
  });

  it('tracks outbound_profile_click for LinkedIn and GitHub but not for the email link', () => {
    const { el, trackEvent } = createFixtureWithMockAnalytics();

    (el.querySelector('[data-testid="contact-email-link"]') as HTMLAnchorElement).click();
    expect(trackEvent).not.toHaveBeenCalled();

    (el.querySelector('[data-testid="contact-linkedin-link"]') as HTMLAnchorElement).click();
    expect(trackEvent).toHaveBeenCalledWith('outbound_profile_click', { destination: 'linkedin' });

    (el.querySelector('[data-testid="contact-github-link"]') as HTMLAnchorElement).click();
    expect(trackEvent).toHaveBeenCalledWith('outbound_profile_click', { destination: 'github' });
  });
});
