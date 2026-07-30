import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GoogleAnalyticsService } from '../../analytics/google-analytics.service';
import { ModwContentService } from '../../content/modw-content.service';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { ChamferPanelComponent } from '../../shared/chamfer-panel/chamfer-panel.component';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-modw-section',
  imports: [NonBreakingTermsPipe, ChamferPanelComponent, SectionHeaderComponent],
  templateUrl: './modw-section.component.html',
  styleUrl: './modw-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModwSectionComponent {
  private readonly googleAnalytics = inject(GoogleAnalyticsService);

  protected readonly modwContent = inject(ModwContentService);

  protected trackRepositoryCta(): void {
    this.googleAnalytics.trackEvent('modw_repository_click', { source: 'modw-repository-cta' });
  }

  protected trackConsultingCta(): void {
    this.googleAnalytics.trackEvent('contact_cta_click', {
      source: 'modw-consulting-cta',
      path: 'general',
    });
  }
}
