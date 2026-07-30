import { TestBed } from '@angular/core/testing';

import { SectionHeaderComponent } from './section-header.component';

function createFixture(inputs: Partial<Record<string, unknown>>) {
  TestBed.configureTestingModule({ imports: [SectionHeaderComponent] });
  const fixture = TestBed.createComponent(SectionHeaderComponent);
  for (const [key, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(key, value);
  }
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('SectionHeaderComponent', () => {
  it('renders the heading with the configured id and test id', () => {
    const el = createFixture({ heading: 'Case Studies', headingId: 'work-section-heading' });

    const heading = el.querySelector('h2');
    expect(heading?.textContent).toContain('Case Studies');
    expect(heading?.id).toBe('work-section-heading');
  });

  it('omits the eyebrow and lead when not provided', () => {
    const el = createFixture({ heading: 'Ways to work together.', headingId: 'engagement-heading' });

    expect(el.querySelector('.eyebrow')).toBeNull();
    expect(el.querySelector('.lead')).toBeNull();
  });

  it('renders an optional eyebrow and lead with a non-breaking MOD-W hyphen', () => {
    const el = createFixture({
      heading: 'Moderated AI Development Workflow (MOD-W)',
      headingId: 'modw-section-heading',
      eyebrow: '03 — Methodology',
      lead: 'Built with MOD-W.',
    });

    expect(el.querySelector('.eyebrow')?.textContent).toContain('03 — Methodology');
    expect(el.textContent).toContain('MOD‑W');
    expect(el.textContent).not.toContain('MOD-W');
  });
});
