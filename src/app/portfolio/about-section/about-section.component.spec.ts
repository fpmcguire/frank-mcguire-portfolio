import { TestBed } from '@angular/core/testing';

import { ABOUT_CONTENT } from '../../content/about.content';
import { AboutSectionComponent } from './about-section.component';

function createFixture() {
  TestBed.configureTestingModule({ imports: [AboutSectionComponent] });
  const fixture = TestBed.createComponent(AboutSectionComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('AboutSectionComponent', () => {
  it('renders the canonical about section id and heading', () => {
    const el = createFixture();

    expect(el.querySelector('section#about')).toBeTruthy();
    expect(el.querySelector('[data-testid="about-section-heading"]')?.textContent).toContain(
      ABOUT_CONTENT.title,
    );
  });

  it('renders every configured narrative paragraph', () => {
    const el = createFixture();
    const narrative = el.querySelector('[data-testid="about-section-narrative"]');

    expect(narrative?.querySelectorAll('p')).toHaveLength(ABOUT_CONTENT.narrative.length);
  });

  it('renders MOD-W in the narrative with a non-breaking hyphen', () => {
    const el = createFixture();

    expect(el.textContent).toContain(`MOD${'‑'}W`);
  });

  it('renders every configured meta row with label and value', () => {
    const el = createFixture();

    for (const item of ABOUT_CONTENT.meta) {
      const row = el.querySelector(`[data-testid="about-meta-${item.id}"]`);
      expect(row?.textContent).toContain(item.label);
      expect(row?.textContent).toContain(item.value);
    }
  });
});
