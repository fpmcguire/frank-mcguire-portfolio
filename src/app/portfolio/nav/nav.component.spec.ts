import { TestBed } from '@angular/core/testing';

import { NAV_LINKS, SECTION_IDS } from '../../content/nav.model';
import { NavComponent } from './nav.component';

const renderText = (value: string): string => value.replaceAll('MOD-W', 'MOD\u2011W');

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
      expect(anchor?.textContent).toContain(renderText(link.label));
      expect(anchor?.getAttribute('href')).toBe(link.href);
    }
  });

  it('renders MOD-W with a non-breaking hyphen', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('MOD\u2011W');
    expect(el.textContent).not.toContain('MOD-W');
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

  it('defaults to Home active and sets up no scroll-spy when IntersectionObserver is unavailable', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.nav-links a.active')).toHaveLength(1);
    expect(el.querySelector('[data-testid="nav-link-top"]')?.classList.contains('active')).toBe(
      true,
    );
  });

  describe('active section state', () => {
    let capturedCallback: IntersectionObserverCallback | undefined;
    const observed: Element[] = [];
    let sectionElements: HTMLElement[] = [];

    class FakeIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        capturedCallback = callback;
      }
      observe(element: Element): void {
        observed.push(element);
      }
      unobserve(): void {
        return;
      }
      disconnect(): void {
        return;
      }
    }

    const TOP_SENTINEL_ID = 'hero-top-sentinel';

    beforeEach(() => {
      capturedCallback = undefined;
      observed.length = 0;
      sectionElements = [TOP_SENTINEL_ID, ...SECTION_IDS.filter((id) => id !== 'top')].map(
        (id) => {
          const section = document.createElement('div');
          section.id = id;
          document.body.appendChild(section);
          return section;
        },
      );
      vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    });

    afterEach(() => {
      for (const section of sectionElements) {
        section.remove();
      }
      vi.unstubAllGlobals();
    });

    it('marks the nav link for the most visible observed section as active', () => {
      const fixture = createFixture();
      fixture.detectChanges();

      const workSection = sectionElements.find((section) => section.id === 'work')!;
      capturedCallback?.(
        [
          {
            target: workSection,
            isIntersecting: true,
            intersectionRatio: 1,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      const workLink = el.querySelector('[data-testid="nav-link-work"]');
      expect(workLink?.classList.contains('active')).toBe(true);
      expect(workLink?.getAttribute('aria-current')).toBe('true');
      expect(el.querySelector('[data-testid="nav-link-about"]')?.classList.contains('active')).toBe(
        false,
      );
    });

    it('returns Home to active after scrolling away and back, using the bounded hero sentinel instead of main#top', () => {
      const fixture = createFixture();
      fixture.detectChanges();

      const workSection = sectionElements.find((section) => section.id === 'work')!;
      const topSentinel = sectionElements.find((section) => section.id === TOP_SENTINEL_ID)!;
      const el = fixture.nativeElement as HTMLElement;

      // Scroll away from Home: work becomes the most visible section.
      capturedCallback?.(
        [
          {
            target: workSection,
            isIntersecting: true,
            intersectionRatio: 1,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
      fixture.detectChanges();
      expect(el.querySelector('[data-testid="nav-link-work"]')?.classList.contains('active')).toBe(
        true,
      );

      // Scroll back up: the bounded hero sentinel re-enters and re-fires,
      // unlike main#top which would stay intersecting the whole time.
      capturedCallback?.(
        [
          {
            target: topSentinel,
            isIntersecting: true,
            intersectionRatio: 1,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
      fixture.detectChanges();

      expect(el.querySelector('[data-testid="nav-link-top"]')?.classList.contains('active')).toBe(
        true,
      );
      expect(el.querySelector('[data-testid="nav-link-work"]')?.classList.contains('active')).toBe(
        false,
      );
    });
  });
});
