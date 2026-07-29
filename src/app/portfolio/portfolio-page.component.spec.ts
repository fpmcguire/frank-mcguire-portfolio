import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CaseStudy } from '../content/case-study.model';
import { CaseStudiesContentService } from '../content/case-studies-content.service';
import { ContentLoadState } from '../content/content-load-state.model';
import { ModwContent } from '../content/modw-content.model';
import { ModwContentService } from '../content/modw-content.service';
import { PortfolioPageComponent } from './portfolio-page.component';

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'mqtt-align',
    title: 'Cavalieri Align / MQTT-Align',
    projectType: 'SaaS platform',
    classification: 'independent-product',
    status: 'private-proprietary',
    role: 'Founder / Frontend Engineer',
    summary: 'Summary.',
    evidence: ['Evidence.'],
    technologies: ['Angular'],
  },
  {
    id: 'prismatic',
    title: 'Prismatic',
    projectType: 'Web application',
    classification: 'personal-project',
    status: 'public-repository',
    role: 'Frontend Engineer',
    summary: 'Summary.',
    evidence: ['Evidence.'],
    technologies: ['Angular'],
  },
];

const MODW_CONTENT: ModwContent = {
  eyebrow: '03 — Methodology',
  title: 'Moderated AI Development Workflow (MOD-W)',
  summary: 'Summary.',
  repositoryHref: 'https://github.com/fpmcguire/moderated-ai-development-workflow',
  consultingHref: '#contact',
  principles: [
    { id: 'role-separation', title: 'Role separation', summary: 'Summary.' },
    { id: 'human-moderation', title: 'Human moderation', summary: 'Summary.' },
  ],
};

function createFixture(
  caseStudiesState: ContentLoadState<CaseStudy[]>,
  modwState: ContentLoadState<ModwContent>,
) {
  TestBed.configureTestingModule({
    imports: [PortfolioPageComponent],
    providers: [
      { provide: CaseStudiesContentService, useValue: { state: signal(caseStudiesState) } },
      { provide: ModwContentService, useValue: { state: signal(modwState) } },
    ],
  });

  const fixture = TestBed.createComponent(PortfolioPageComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

const READY_MODW: ContentLoadState<ModwContent> = {
  status: 'ready',
  data: MODW_CONTENT,
  error: null,
};

describe('PortfolioPageComponent', () => {
  it('renders one case-study card for each configured case study', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    expect(el.querySelectorAll('[data-testid="work-card-grid"] > li')).toHaveLength(
      CASE_STUDIES.length,
    );
  });

  it('shows project classification and status on every case-study card', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    for (const caseStudy of CASE_STUDIES) {
      expect(
        el.querySelector(`[data-testid="work-card-${caseStudy.id}-classification"]`)?.textContent,
      ).toContain(caseStudy.classification);
      expect(
        el.querySelector(`[data-testid="work-card-${caseStudy.id}-status"]`)?.textContent,
      ).toContain(caseStudy.status);
    }
  });

  it('renders calm, non-technical copy when there are no case studies', () => {
    const el = createFixture({ status: 'empty', data: [], error: null }, READY_MODW);

    expect(el.querySelector('[data-testid="work-cards-empty"]')?.textContent).toContain(
      'coming soon',
    );
  });

  it('renders calm, non-technical copy when case studies fail to load', () => {
    const el = createFixture(
      { status: 'error', data: null, error: 'Case studies could not be loaded right now.' },
      READY_MODW,
    );

    expect(el.querySelector('[data-testid="work-cards-error"]')?.textContent).toContain(
      'Case studies could not be loaded right now.',
    );
  });

  it('renders every configured MOD-W principle from the runtime content', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    for (const principle of MODW_CONTENT.principles) {
      expect(el.querySelector(`[data-testid="modw-principle-${principle.id}"]`)).toBeTruthy();
    }
  });

  it('renders the MOD-W repository and consulting CTAs from the runtime content', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    expect(el.querySelector('[data-testid="modw-repository-cta"]')?.getAttribute('href')).toBe(
      MODW_CONTENT.repositoryHref,
    );
    expect(el.querySelector('[data-testid="modw-contact-cta"]')?.getAttribute('href')).toBe(
      MODW_CONTENT.consultingHref,
    );
  });

  it('renders the nav, hero, and engagement sections above the runtime content sections', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    expect(el.querySelector('[data-testid="nav-primary"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="hero-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="engagement-section"]')).toBeTruthy();
  });

  it('exposes the canonical work and modw anchor ids for nav targets', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    expect(el.querySelector('#work')).toBeTruthy();
    expect(el.querySelector('#modw')).toBeTruthy();
    expect(el.querySelector('main#top')).toBeTruthy();
  });

  it('renders exactly one h1 across the whole shell', () => {
    const el = createFixture({ status: 'ready', data: CASE_STUDIES, error: null }, READY_MODW);

    expect(el.querySelectorAll('h1')).toHaveLength(1);
  });
});
