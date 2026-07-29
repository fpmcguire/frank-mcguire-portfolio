import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ContentLoadState } from '../../content/content-load-state.model';
import { ModwContent } from '../../content/modw-content.model';
import { ModwContentService } from '../../content/modw-content.service';
import { ModwSectionComponent } from './modw-section.component';

const renderText = (value: string): string => value.replaceAll('MOD-W', 'MOD\u2011W');

const MODW_CONTENT: ModwContent = {
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
  principles: [
    { id: 'role-separation', title: 'Role separation', summary: 'Summary.' },
    { id: 'human-moderation', title: 'Human moderation', summary: 'Summary.' },
  ],
  roles: [
    { id: 'moderator', label: 'Moderator', responsibility: 'Responsibility.' },
    { id: 'tech-lead', label: 'Tech Lead', responsibility: 'Responsibility.' },
  ],
  projectEvidence: [
    { id: 'mqtt-align', label: 'MQTT-Align', summary: 'Evidence summary.' },
    { id: 'portfolio', label: 'This portfolio', summary: 'Evidence summary.' },
  ],
};

function createFixture(state: ContentLoadState<ModwContent>) {
  TestBed.configureTestingModule({
    imports: [ModwSectionComponent],
    providers: [{ provide: ModwContentService, useValue: { state: signal(state) } }],
  });

  const fixture = TestBed.createComponent(ModwSectionComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

const READY_STATE: ContentLoadState<ModwContent> = {
  status: 'ready',
  data: MODW_CONTENT,
  error: null,
};

describe('ModwSectionComponent', () => {
  it('renders the section heading, summary, problem, and core idea from runtime content', () => {
    const el = createFixture(READY_STATE);

    expect(el.querySelector('[data-testid="modw-section-heading"]')?.textContent).toContain(
      renderText(MODW_CONTENT.title),
    );
    expect(el.querySelector('[data-testid="modw-section-summary"]')?.textContent).toContain(
      MODW_CONTENT.summary,
    );
    expect(el.querySelector('[data-testid="modw-problem"]')?.textContent).toContain(
      MODW_CONTENT.problem,
    );
    expect(el.querySelector('[data-testid="modw-core-idea"]')?.textContent).toContain(
      MODW_CONTENT.coreIdea,
    );
  });

  it('renders every configured principle with no hardcoded count', () => {
    const el = createFixture(READY_STATE);

    for (const principle of MODW_CONTENT.principles) {
      expect(el.querySelector(`[data-testid="modw-principle-${principle.id}"]`)).toBeTruthy();
    }
    expect(el.querySelectorAll('.principles > li')).toHaveLength(MODW_CONTENT.principles.length);
  });

  it('renders every configured role with no hardcoded count', () => {
    const el = createFixture(READY_STATE);

    for (const role of MODW_CONTENT.roles) {
      expect(el.querySelector(`[data-testid="modw-role-${role.id}"]`)?.textContent).toContain(
        role.responsibility,
      );
    }
    expect(el.querySelectorAll('.roles > li')).toHaveLength(MODW_CONTENT.roles.length);
  });

  it('renders every configured project evidence item with no hardcoded count', () => {
    const el = createFixture(READY_STATE);

    for (const evidence of MODW_CONTENT.projectEvidence) {
      expect(
        el.querySelector(`[data-testid="modw-project-evidence-${evidence.id}"]`)?.textContent,
      ).toContain(evidence.summary);
    }
    expect(el.querySelectorAll('.project-evidence > li')).toHaveLength(
      MODW_CONTENT.projectEvidence.length,
    );
  });

  it('renders the repository CTA with the configured label/href and target=_blank rel=noopener', () => {
    const el = createFixture(READY_STATE);
    const cta = el.querySelector('[data-testid="modw-repository-cta"]');

    expect(cta?.textContent).toContain(renderText(MODW_CONTENT.repositoryCta.label));
    expect(cta?.getAttribute('href')).toBe(MODW_CONTENT.repositoryCta.href);
    expect(cta?.getAttribute('target')).toBe('_blank');
    expect(cta?.getAttribute('rel')).toBe('noopener');
  });

  it('renders the consulting CTA with the configured label/href', () => {
    const el = createFixture(READY_STATE);
    const cta = el.querySelector('[data-testid="modw-consulting-cta"]');

    expect(cta?.textContent).toContain(renderText(MODW_CONTENT.consultingCta.label));
    expect(cta?.getAttribute('href')).toBe(MODW_CONTENT.consultingCta.href);
  });

  it('renders calm, non-technical copy while loading', () => {
    const el = createFixture({ status: 'loading', data: null, error: null });

    expect(el.querySelector('[data-testid="modw-loading"]')).toBeTruthy();
  });

  it('renders calm, non-technical copy when empty', () => {
    const el = createFixture({
      status: 'empty',
      data: { ...MODW_CONTENT, principles: [] },
      error: null,
    });

    expect(el.querySelector('[data-testid="modw-empty"]')).toBeTruthy();
  });

  it('renders a source-safe error state on failure', () => {
    const el = createFixture({
      status: 'error',
      data: null,
      error: 'MOD-W content could not be loaded right now.',
    });

    expect(el.querySelector('[data-testid="modw-error"]')?.textContent).toContain(
      'MOD\u2011W content could not be loaded right now.',
    );
  });

  it('renders MOD-W with a non-breaking hyphen', () => {
    const el = createFixture(READY_STATE);

    expect(el.textContent).toContain('MOD\u2011W');
    expect(el.textContent).not.toContain('MOD-W');
  });
});
