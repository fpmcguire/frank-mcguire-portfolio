import { Directive, ElementRef, OnDestroy, OnInit, inject, signal } from '@angular/core';

import { RevealOnScrollService } from './reveal-on-scroll.service';

function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Progressive-enhancement scroll reveal. Content carries only the base
 * `reveal` class by default and is fully visible — the hidden/animated state
 * is opted into only once JS decides to animate (`reveal-active`), never as
 * a CSS default, so no-JS, pre-hydration, and test environments always see
 * full content.
 */
@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
  host: {
    class: 'reveal',
    '[class.reveal-active]': 'active()',
    '[class.reveal-visible]': 'revealed()',
  },
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly revealOnScroll = inject(RevealOnScrollService);

  protected readonly active = signal(false);
  protected readonly revealed = signal(false);

  ngOnInit(): void {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.revealed.set(true);
      return;
    }

    this.active.set(true);
    this.revealOnScroll.observe(this.elementRef.nativeElement, () => this.revealed.set(true));
  }

  ngOnDestroy(): void {
    this.revealOnScroll.unobserve(this.elementRef.nativeElement);
  }
}
