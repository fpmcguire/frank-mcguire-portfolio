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

const READY_MODW: ContentLoadState<ModwContent> = {
  status: 'ready',
  data: {
    eyebrow: '03 — Methodology',
    title: 'Moderated AI Development Workflow (MOD-W)',
    summary: 'Summary.',
    problem: 'Problem statement.',
    coreIdea: 'Core idea.',
    repositoryCta: {
      label: 'View the MOD-W repository',
      href: 'https://github.com/fpmcguire/moderated-ai-development-workflow',
    },
    consultingCta: { label: 'Discuss MOD-W consulting or training', href: '#contact' },
    principles: [{ id: 'role-separation', title: 'Role separation', summary: 'Summary.' }],
    roles: [{ id: 'moderator', label: 'Moderator', responsibility: 'Responsibility.' }],
    projectEvidence: [{ id: 'mqtt-align', label: 'MQTT-Align', summary: 'Summary.' }],
  },
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
  it('renders nav, hero, engagement, case-studies, modw, about, contact, and footer in composition', () => {
    const el = createFixture();

    expect(el.querySelector('[data-testid="nav-primary"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="hero-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="engagement-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="work-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="modw-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="about-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="contact-section"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="footer"]')).toBeTruthy();
  });

  it('exposes the canonical work, modw, about, and contact anchor ids for nav targets', () => {
    const el = createFixture();

    expect(el.querySelector('#work')).toBeTruthy();
    expect(el.querySelector('#modw')).toBeTruthy();
    expect(el.querySelector('#about')).toBeTruthy();
    expect(el.querySelector('#contact')).toBeTruthy();
    expect(el.querySelector('main#top')).toBeTruthy();
  });

  it('replaces the STEP-02 placeholder divs with real About/Contact content', () => {
    const el = createFixture();

    expect(el.querySelector('#about')?.tagName.toLowerCase()).toBe('section');
    expect(el.querySelector('#contact')?.tagName.toLowerCase()).toBe('section');
  });

  it('renders exactly one h1 across the whole shell', () => {
    const el = createFixture();

    expect(el.querySelectorAll('h1')).toHaveLength(1);
  });
});
