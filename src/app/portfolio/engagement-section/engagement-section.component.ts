import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ENGAGEMENT_PATHS } from '../../content/engagement-paths.content';

@Component({
  selector: 'app-engagement-section',
  templateUrl: './engagement-section.component.html',
  styleUrl: './engagement-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngagementSectionComponent {
  protected readonly engagementPaths = ENGAGEMENT_PATHS;
}
