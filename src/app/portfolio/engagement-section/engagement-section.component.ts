import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ENGAGEMENT_PATHS } from '../../content/engagement-paths.content';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-engagement-section',
  imports: [NonBreakingTermsPipe, SectionHeaderComponent],
  templateUrl: './engagement-section.component.html',
  styleUrl: './engagement-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngagementSectionComponent {
  protected readonly engagementPaths = ENGAGEMENT_PATHS;
}
