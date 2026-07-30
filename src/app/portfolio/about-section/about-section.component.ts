import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ABOUT_CONTENT } from '../../content/about.content';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-about-section',
  imports: [NonBreakingTermsPipe, SectionHeaderComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  protected readonly content = ABOUT_CONTENT;
}
