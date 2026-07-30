import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModwContentService } from '../../content/modw-content.service';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';
import { ChamferPanelComponent } from '../../shared/chamfer-panel/chamfer-panel.component';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';

@Component({
  selector: 'app-modw-section',
  imports: [NonBreakingTermsPipe, ChamferPanelComponent, SectionHeaderComponent],
  templateUrl: './modw-section.component.html',
  styleUrl: './modw-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModwSectionComponent {
  protected readonly modwContent = inject(ModwContentService);
}
