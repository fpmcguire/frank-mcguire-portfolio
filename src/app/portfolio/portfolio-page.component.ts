import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CaseStudiesSectionComponent } from './case-studies-section/case-studies-section.component';
import { EngagementSectionComponent } from './engagement-section/engagement-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ModwSectionComponent } from './modw-section/modw-section.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-portfolio-page',
  imports: [
    NavComponent,
    HeroSectionComponent,
    EngagementSectionComponent,
    CaseStudiesSectionComponent,
    ModwSectionComponent,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {}
