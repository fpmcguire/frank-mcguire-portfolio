import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CaseStudiesContentService } from '../content/case-studies-content.service';
import { ModwContentService } from '../content/modw-content.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  protected readonly caseStudiesContent = inject(CaseStudiesContentService);
  protected readonly modwContent = inject(ModwContentService);
}
