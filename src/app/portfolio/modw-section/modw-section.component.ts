import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModwContentService } from '../../content/modw-content.service';

@Component({
  selector: 'app-modw-section',
  templateUrl: './modw-section.component.html',
  styleUrl: './modw-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModwSectionComponent {
  protected readonly modwContent = inject(ModwContentService);
}
