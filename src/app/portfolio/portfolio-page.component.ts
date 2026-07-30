import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealOnScrollDirective } from '../shared/reveal-on-scroll.directive';
import { AboutSectionComponent } from './about-section/about-section.component';
import { CaseStudiesSectionComponent } from './case-studies-section/case-studies-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { EngagementSectionComponent } from './engagement-section/engagement-section.component';
import { FooterComponent } from './footer/footer.component';
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
    AboutSectionComponent,
    ContactSectionComponent,
    FooterComponent,
    RevealOnScrollDirective,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {}
