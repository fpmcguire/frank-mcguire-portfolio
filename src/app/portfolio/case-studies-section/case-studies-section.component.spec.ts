import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CaseStudy } from '../../content/case-study.model';
import { CaseStudiesContentService } from '../../content/case-studies-content.service';
import { ContentLoadState } from '../../content/content-load-state.model';
import { CaseStudiesSectionComponent } from './case-studies-section.component';

const MANDATORY_LAUNCH_IDS = [
  'mqtt-align',
  'agv-fleet-simulator',
  'bio-align',
  'angular-design-patterns',
  'paki',
  'travel-it',
  'kaufland',
];

const CASE_STUDIES: CaseStudy[] = MANDATORY_LAUNCH_IDS.map((id) => ({
  id,
  title: id,
  projectType: 'Type',
  classification: 'personal-project',
  status: 'public-repository',
  role: 'Frontend Engineer',
  summary: 'Summary.',
  evidence: ['Evidence.'],
  technologies: ['Angular'],
}));

function createFixture(state: ContentLoadState<CaseStudy[]>) {
  TestBed.configureTestingModule({
    imports: [CaseStudiesSectionComponent],
    providers: [{ provide: CaseStudiesContentService, useValue: { state: signal(state) } }],
  });

  const fixture = TestBed.createComponent(CaseStudiesSectionComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

function gridCardHosts(el: HTMLElement): Element[] {
  const grid = el.querySelector('[data-testid="work-card-grid"]');
  return Array.from(grid?.children ?? []);
}

describe('CaseStudiesSectionComponent', () => {
  it('renders one generic work-card per configured case study, with no hardcoded count', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null });

    expect(el.querySelectorAll('[data-testid="work-card"]')).toHaveLength(CASE_STUDIES.length);
  });

  it('renders every mandatory launch case study id', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null });

    for (const id of MANDATORY_LAUNCH_IDS) {
      expect(el.querySelector(`[data-testid="work-card-${id}"]`)).toBeTruthy();
    }
  });

  it('preserves JSON order when rendering cards', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null });
    const cards = gridCardHosts(el);

    expect(cards.map((card) => card.getAttribute('data-testid'))).toEqual(
      MANDATORY_LAUNCH_IDS.map((id) => `work-card-${id}`),
    );
  });

  it('renders calm, non-technical copy while loading', () => {
    const el = createFixture({ status: 'loading', data: null, error: null });

    expect(el.querySelector('[data-testid="work-cards-loading"]')).toBeTruthy();
  });

  it('renders calm, non-technical copy when empty', () => {
    const el = createFixture({ status: 'empty', data: [], error: null });

    expect(el.querySelector('[data-testid="work-cards-empty"]')?.textContent).toContain(
      'coming soon',
    );
  });

  it('renders a source-safe error state on failure', () => {
    const el = createFixture({
      status: 'error',
      data: null,
      error: 'Case studies could not be loaded right now.',
    });

    expect(el.querySelector('[data-testid="work-cards-error"]')?.textContent).toContain(
      'Case studies could not be loaded right now.',
    );
  });
});
