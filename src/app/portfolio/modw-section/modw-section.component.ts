import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModwContentService } from '../../content/modw-content.service';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';

@Component({
  selector: 'app-modw-section',
  imports: [NonBreakingTermsPipe],
  templateUrl: './modw-section.component.html',
  styleUrl: './modw-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModwSectionComponent {
  protected readonly modwContent = inject(ModwContentService);
}
