import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';

@Component({
  selector: 'app-section-header',
  imports: [NonBreakingTermsPipe],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.align-center]': "align() === 'center'",
    '[class.size-large]': "size() === 'large'",
  },
})
export class SectionHeaderComponent {
  readonly eyebrow = input<string>();
  readonly heading = input.required<string>();
  readonly headingId = input.required<string>();
  readonly headingTestId = input<string>();
  readonly lead = input<string>();
  readonly leadTestId = input<string>();
  readonly align = input<'left' | 'center'>('left');
  readonly size = input<'default' | 'large'>('default');
}
