import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { HERO_CONTENT } from '../../content/static-profile.content';
import { ChamferPanelComponent } from '../../shared/chamfer-panel/chamfer-panel.component';

@Component({
  selector: 'app-hero-section',
  imports: [NonBreakingTermsPipe, ChamferPanelComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  protected readonly content = HERO_CONTENT;
}
