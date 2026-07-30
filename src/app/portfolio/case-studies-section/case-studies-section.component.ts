import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CaseStudiesContentService } from '../../content/case-studies-content.service';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { CaseStudyCardComponent } from '../case-study-card/case-study-card.component';

@Component({
  selector: 'app-case-studies-section',
  imports: [CaseStudyCardComponent, SectionHeaderComponent],
  templateUrl: './case-studies-section.component.html',
  styleUrl: './case-studies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesSectionComponent {
  protected readonly caseStudiesContent = inject(CaseStudiesContentService);

  protected readonly leadText =
    'Selected projects and professional experience evidencing frontend architecture, delivery, testing, and product judgment — several built with MOD-W.';
}
