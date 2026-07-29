import { TestBed } from '@angular/core/testing';

import { NAV_LINKS } from '../../content/nav.model';
import { NavComponent } from './nav.component';

function createFixture() {
  TestBed.configureTestingModule({ imports: [NavComponent] });
  const fixture = TestBed.createComponent(NavComponent);
  fixture.detectChanges();
  return fixture;
}

describe('NavComponent', () => {
  it('renders the required nav labels', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    for (const link of NAV_LINKS) {
      const anchor = el.querySelector(`[data-testid="nav-link-${link.id}"]`);
      expect(anchor?.textContent).toContain(link.label);
      expect(anchor?.getAttribute('href')).toBe(link.href);
    }
  });

  it('renders a persistent contact CTA pointing to #contact', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="nav-contact-cta"]')?.getAttribute('href')).toBe(
      '#contact',
    );
  });

  it('does not render the mobile menu until the toggle is clicked', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="nav-mobile-menu"]')).toBeNull();
  });

  it('opens the mobile menu when the toggle is clicked', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('[data-testid="nav-mobile-toggle"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="nav-mobile-menu"]')).toBeTruthy();
  });

  it('closes the mobile menu when the close button is clicked', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('[data-testid="nav-mobile-toggle"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    (el.querySelector('[data-testid="nav-mobile-close"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="nav-mobile-menu"]')).toBeNull();
  });

  it('closes the mobile menu after a link inside it is clicked', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('[data-testid="nav-mobile-toggle"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    const mobileMenu = el.querySelector('[data-testid="nav-mobile-menu"]') as HTMLElement;
    (mobileMenu.querySelector('a') as HTMLAnchorElement).click();
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="nav-mobile-menu"]')).toBeNull();
  });
});
