import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GoogleAnalyticsService } from '../../analytics/google-analytics.service';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { HERO_CONTENT } from '../../content/static-profile.content';
import { ChamferPanelComponent } from '../../shared/chamfer-panel/chamfer-panel.component';

@Component({
  selector: 'app-hero-section',
  imports: [NonBreakingTermsPipe, ChamferPanelComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private readonly googleAnalytics = inject(GoogleAnalyticsService);

  protected readonly content = HERO_CONTENT;

  protected trackWorkCta(): void {
    this.googleAnalytics.trackEvent('contact_cta_click', {
      source: 'hero-work-cta',
      path: 'general',
    });
  }

  protected trackModwCta(): void {
    this.googleAnalytics.trackEvent('contact_cta_click', {
      source: 'hero-modw-cta',
      path: 'general',
    });
  }
}
