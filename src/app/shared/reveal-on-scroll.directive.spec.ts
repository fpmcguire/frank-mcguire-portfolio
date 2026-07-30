import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

@Component({
  standalone: true,
  imports: [RevealOnScrollDirective],
  template: `<section appRevealOnScroll data-testid="revealed-host">Content</section>`,
})
class TestHostComponent {}

function noop(): void {
  return;
}

function stubMatchMedia(reducedMotion: boolean): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reducedMotion && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: noop,
    removeEventListener: noop,
  }));
}

describe('RevealOnScrollDirective', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('keeps content present and visible when IntersectionObserver is unavailable (no-JS / test environments)', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector(
      '[data-testid="revealed-host"]',
    ) as HTMLElement;

    expect(host.textContent).toContain('Content');
    expect(host.classList.contains('reveal')).toBe(true);
    expect(host.classList.contains('reveal-active')).toBe(false);
    expect(host.classList.contains('reveal-visible')).toBe(true);
  });

  it('marks content revealed immediately under reduced motion, without waiting for intersection', () => {
    class FakeIntersectionObserver {
      observe = noop;
      unobserve = noop;
      disconnect = noop;
    }
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    stubMatchMedia(true);

    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector(
      '[data-testid="revealed-host"]',
    ) as HTMLElement;

    expect(host.classList.contains('reveal-active')).toBe(false);
    expect(host.classList.contains('reveal-visible')).toBe(true);
  });

  it('opts into the reveal animation and only marks visible once the shared observer reports intersection', () => {
    let capturedCallback: IntersectionObserverCallback | undefined;
    class FakeIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        capturedCallback = callback;
      }
      observe = noop;
      unobserve = noop;
      disconnect = noop;
    }
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    stubMatchMedia(false);

    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector(
      '[data-testid="revealed-host"]',
    ) as HTMLElement;

    expect(host.textContent).toContain('Content');
    expect(host.classList.contains('reveal-active')).toBe(true);
    expect(host.classList.contains('reveal-visible')).toBe(false);

    capturedCallback?.(
      [{ target: host, isIntersecting: true } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    fixture.detectChanges();

    expect(host.classList.contains('reveal-visible')).toBe(true);
  });
});
