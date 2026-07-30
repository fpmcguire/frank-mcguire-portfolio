import { Injectable } from '@angular/core';

type RevealCallback = () => void;

/**
 * Backs every `RevealOnScrollDirective` instance with a single shared
 * IntersectionObserver instead of one observer per revealed element.
 */
@Injectable({ providedIn: 'root' })
export class RevealOnScrollService {
  private observer?: IntersectionObserver;
  private readonly callbacks = new WeakMap<Element, RevealCallback>();

  observe(element: Element, onRevealed: RevealCallback): void {
    if (typeof IntersectionObserver === 'undefined') {
      onRevealed();
      return;
    }

    this.callbacks.set(element, onRevealed);
    this.observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          this.callbacks.get(entry.target)?.();
          this.callbacks.delete(entry.target);
          this.observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observer?.unobserve(element);
  }
}
