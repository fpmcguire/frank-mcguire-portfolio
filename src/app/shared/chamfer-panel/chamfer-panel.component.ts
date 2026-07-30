import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-chamfer-panel',
  templateUrl: './chamfer-panel.component.html',
  styleUrl: './chamfer-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--chamfer.px]': 'size()',
  },
})
export class ChamferPanelComponent {
  readonly size = input<number>(32);
}
