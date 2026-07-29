import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CaseStudy } from '../content/case-study.model';
import { CaseStudiesContentService } from '../content/case-studies-content.service';
import { ContentLoadState } from '../content/content-load-state.model';
import { ModwContent } from '../content/modw-content.model';
import { ModwContentService } from '../content/modw-content.service';
import { PortfolioPageComponent } from './portfolio-page.component';

const READY_CASE_STUDIES: ContentLoadState<CaseStudy[]> = {
  status: 'ready',
  data: [
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
  ],
  error: null,
};

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

const READY_MODW: ContentLoadState<ModwContent> = {
  status: 'ready',
  data: MODW_CONTENT,
  error: null,
};

function createFixture() {
  TestBed.configureTestingModule({
    imports: [PortfolioPageComponent],
    providers: [
      { provide: CaseStudiesContentService, useValue: { state: signal(READY_CASE_STUDIES) } },
      { provide: ModwContentService, useValue: { state: signal(READY_MODW) } },
    ],
  });

  const fixture = TestBed.createComponent(PortfolioPageComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('PortfolioPageComponent', () => {
  it('renders every configured MOD-W principle from the runtime content', () => {
    const el = createFixture();

    for (const principle of MODW_CONTENT.principles) {
      expect(el.querySelector(`[data-testid="modw-principle-${principle.id}"]`)).toBeTruthy();
    }
  });

  it('renders the MOD-W repository and consulting CTAs from the runtime content', () => {
    const el = createFixture();

    expect(el.querySelector('[data-testid="modw-repository-cta"]')?.getAttribute('href')).toBe(
      MODW_CONTENT.repositoryHref,
    );
    expect(el.querySelector('[data-testid="modw-contact-cta"]')?.getAttribute('href')).toBe(
      MODW_CONTENT.consultingHref,
    );
  });

  it('renders nav, hero, engagement, and case-studies sections in composition', () => {
    const el = createFixture();

    expect(el.querySelector('[data-testid="nav-primary"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="hero-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="engagement-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="work-section"]')).toBeTruthy();
  });

  it('exposes the canonical work and modw anchor ids for nav targets', () => {
    const el = createFixture();

    expect(el.querySelector('#work')).toBeTruthy();
    expect(el.querySelector('#modw')).toBeTruthy();
    expect(el.querySelector('main#top')).toBeTruthy();
  });

  it('renders exactly one h1 across the whole shell', () => {
    const el = createFixture();

    expect(el.querySelectorAll('h1')).toHaveLength(1);
  });
});
