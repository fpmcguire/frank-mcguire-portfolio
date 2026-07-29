import { TestBed } from '@angular/core/testing';

import { HERO_CONTENT } from '../../content/static-profile.content';
import { HeroSectionComponent } from './hero-section.component';

const renderText = (value: string): string => value.replaceAll('MOD-W', 'MOD\u2011W');

function createFixture() {
  TestBed.configureTestingModule({ imports: [HeroSectionComponent] });
  const fixture = TestBed.createComponent(HeroSectionComponent);
  fixture.detectChanges();
  return fixture;
}

describe('HeroSectionComponent', () => {
  it('renders the required first-screen identity and positioning terms', () => {
    const fixture = createFixture();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Frank McGuire');
    expect(text).toContain('Angular');
    expect(text).toContain('TypeScript');
    expect(text).toContain('Germany');
    expect(text).toContain('Full-time');
    expect(text).toContain('Freelance');
  });

  it('renders exactly one h1', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('h1')).toHaveLength(1);
    expect(el.querySelector('h1')?.textContent).toContain(HERO_CONTENT.name);
  });

  it('renders the primary and secondary CTAs with their configured hrefs', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="hero-work-cta"]')?.getAttribute('href')).toBe(
      HERO_CONTENT.primaryCta.href,
    );
    expect(el.querySelector('[data-testid="hero-modw-cta"]')?.getAttribute('href')).toBe(
      HERO_CONTENT.secondaryCta.href,
    );
  });

  it('renders the availability strip with every configured signal', () => {
    const fixture = createFixture();
    const strip = (
      fixture.nativeElement as HTMLElement
    ).querySelector('[data-testid="hero-availability-strip"]');

    expect(strip).toBeTruthy();
    for (const item of HERO_CONTENT.availability) {
      expect(strip?.textContent).toContain(renderText(item.label));
      expect(strip?.textContent).toContain(renderText(item.value));
    }
  });

  it('renders MOD-W with a non-breaking hyphen', () => {
    const fixture = createFixture();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('MOD\u2011W');
    expect(text).not.toContain('MOD-W');
  });
});
