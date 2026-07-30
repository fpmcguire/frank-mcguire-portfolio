import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { AnalyticsConsentService } from '../analytics-consent.service';
import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
  selector: 'app-analytics-consent-banner',
  templateUrl: './analytics-consent-banner.component.html',
  styleUrl: './analytics-consent-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsConsentBannerComponent {
  protected readonly consent = inject(AnalyticsConsentService);

  /**
   * Injected only so this singleton is constructed as soon as the banner
   * mounts — its constructor effect reacts to consent state, which is what
   * loads GA for a returning visitor with already-accepted consent even
   * before they interact with anything on the page.
   */
  private readonly googleAnalytics = inject(GoogleAnalyticsService);

  protected readonly isVisible = computed(
    () => this.consent.state() === 'unknown' || this.consent.isSettingsOpen(),
  );

  protected accept(): void {
    this.consent.accept();
  }

  protected reject(): void {
    this.consent.reject();
  }
}
