import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { NAV_LINKS } from '../../content/nav.model';
import { NonBreakingTermsPipe } from '../../content/non-breaking-terms.pipe';

@Component({
  selector: 'app-nav',
  imports: [NonBreakingTermsPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly navLinks = NAV_LINKS;
  protected readonly isMobileMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
