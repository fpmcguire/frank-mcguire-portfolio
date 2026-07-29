import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModwContentService } from '../content/modw-content.service';
import { CaseStudiesSectionComponent } from './case-studies-section/case-studies-section.component';
import { EngagementSectionComponent } from './engagement-section/engagement-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-portfolio-page',
  imports: [NavComponent, HeroSectionComponent, EngagementSectionComponent, CaseStudiesSectionComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  protected readonly modwContent = inject(ModwContentService);
}
