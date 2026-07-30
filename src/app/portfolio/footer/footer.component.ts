import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FOOTER_CONTENT } from '../../content/footer.content';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { AnalyticsConsentService } from '../../analytics/analytics-consent.service';

@Component({
  selector: 'app-footer',
  imports: [NonBreakingTermsPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly content = FOOTER_CONTENT;

  private readonly analyticsConsent = inject(AnalyticsConsentService);

  protected openAnalyticsSettings(): void {
    this.analyticsConsent.openSettings();
  }
}
