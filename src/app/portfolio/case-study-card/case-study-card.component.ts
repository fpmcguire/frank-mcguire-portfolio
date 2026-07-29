import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import {
  CASE_STUDY_CLASSIFICATION_LABELS,
  CASE_STUDY_STATUS_LABELS,
  CaseStudy,
} from '../../content/case-study.model';

@Component({
  selector: 'app-case-study-card',
  templateUrl: './case-study-card.component.html',
  styleUrl: './case-study-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-testid]': "'work-card-' + caseStudy().id",
  },
})
export class CaseStudyCardComponent {
  readonly caseStudy = input.required<CaseStudy>();

  protected readonly classificationLabel = computed(
    () => CASE_STUDY_CLASSIFICATION_LABELS[this.caseStudy().classification],
  );
  protected readonly statusLabel = computed(
    () => CASE_STUDY_STATUS_LABELS[this.caseStudy().status],
  );
}
