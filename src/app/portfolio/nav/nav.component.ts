import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';

import { GoogleAnalyticsService } from '../../analytics/google-analytics.service';
import { NAV_LINKS, SECTION_IDS, SectionId } from '../../content/nav.model';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';

@Component({
  selector: 'app-nav',
  imports: [NonBreakingTermsPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements AfterViewInit, OnDestroy {
  private readonly googleAnalytics = inject(GoogleAnalyticsService);

  protected readonly navLinks = NAV_LINKS;
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly activeSection = signal<SectionId>('top');

  private observer?: IntersectionObserver;

  /**
   * `main#top` spans the entire page and is preserved for the skip link and
   * `#top` anchor hrefs, so it cannot double as the scroll-spy target for
   * "Home" — it would stay intersecting for nearly the whole scroll range
   * and never re-fire when scrolling back up. The hero section is a real,
   * bounded "Home" surface, so it is observed instead for the `top` state.
   */
  private readonly topSentinelId = 'hero-top-sentinel';

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const sectionByElement = new Map<Element, SectionId>();
    const topSentinel = document.getElementById(this.topSentinelId);
    if (topSentinel) {
      sectionByElement.set(topSentinel, 'top');
    }
    for (const id of SECTION_IDS) {
      if (id === 'top') {
        continue;
      }
      const element = document.getElementById(id);
      if (element) {
        sectionByElement.set(element, id);
      }
    }

    if (sectionByElement.size === 0) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const sectionId = mostVisible && sectionByElement.get(mostVisible.target);
        if (sectionId) {
          this.activeSection.set(sectionId);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    for (const element of sectionByElement.keys()) {
      this.observer.observe(element);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  protected trackSectionNavigation(section: SectionId): void {
    this.googleAnalytics.trackEvent('section_navigation', { section });
  }

  protected trackContactCta(): void {
    this.googleAnalytics.trackEvent('contact_cta_click', {
      source: 'nav-contact-cta',
      path: 'general',
    });
  }
}
