import { TestBed } from '@angular/core/testing';

import { ENGAGEMENT_PATHS } from '../../content/engagement-paths.content';
import { EngagementSectionComponent } from './engagement-section.component';

function createFixture() {
  TestBed.configureTestingModule({ imports: [EngagementSectionComponent] });
  const fixture = TestBed.createComponent(EngagementSectionComponent);
  fixture.detectChanges();
  return fixture;
}

describe('EngagementSectionComponent', () => {
  it('renders full-time, freelance, and advisory engagement paths', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    for (const path of ENGAGEMENT_PATHS) {
      const tile = el.querySelector(`[data-testid="engagement-path-${path.id}"]`);
      expect(tile?.textContent).toContain(path.title);
      expect(tile?.textContent).toContain(path.description);
    }
  });

  it('gives full-time and freelance tiles equal visual weight', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;

    const fullTime = el.querySelector('[data-testid="engagement-path-full-time"]');
    const freelance = el.querySelector('[data-testid="engagement-path-freelance"]');

    expect(fullTime?.className).toBe(freelance?.className);
  });
});
