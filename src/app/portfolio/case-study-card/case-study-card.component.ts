import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { GoogleAnalyticsService } from '../../analytics/google-analytics.service';
import {
  CASE_STUDY_CLASSIFICATION_LABELS,
  CASE_STUDY_STATUS_LABELS,
  CaseStudy,
} from '../../content/case-study.model';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';

export type CaseStudyLinkType = 'product' | 'repository' | 'legacy';

@Component({
  selector: 'app-case-study-card',
  imports: [NonBreakingTermsPipe],
  templateUrl: './case-study-card.component.html',
  styleUrl: './case-study-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-testid]': "'work-card-' + caseStudy().id",
  },
})
export class CaseStudyCardComponent {
  private readonly googleAnalytics = inject(GoogleAnalyticsService);

  readonly caseStudy = input.required<CaseStudy>();

  protected readonly classificationLabel = computed(
    () => CASE_STUDY_CLASSIFICATION_LABELS[this.caseStudy().classification],
  );
  protected readonly statusLabel = computed(
    () => CASE_STUDY_STATUS_LABELS[this.caseStudy().status],
  );

  protected trackLinkClick(linkType: CaseStudyLinkType): void {
    this.googleAnalytics.trackEvent('case_study_link_click', {
      caseStudyId: this.caseStudy().id,
      linkType,
    });
  }
}
