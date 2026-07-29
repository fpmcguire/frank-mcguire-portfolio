import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HERO_CONTENT } from '../../content/static-profile.content';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  protected readonly content = HERO_CONTENT;
}
