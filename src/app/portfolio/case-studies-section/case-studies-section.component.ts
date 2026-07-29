import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CaseStudiesContentService } from '../../content/case-studies-content.service';
import { CaseStudyCardComponent } from '../case-study-card/case-study-card.component';

@Component({
  selector: 'app-case-studies-section',
  imports: [CaseStudyCardComponent],
  templateUrl: './case-studies-section.component.html',
  styleUrl: './case-studies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesSectionComponent {
  protected readonly caseStudiesContent = inject(CaseStudiesContentService);
}
