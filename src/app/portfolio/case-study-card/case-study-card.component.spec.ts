import { TestBed } from '@angular/core/testing';

import { CaseStudy } from '../../content/case-study.model';
import { CaseStudyCardComponent } from './case-study-card.component';

const BASE_CASE_STUDY: CaseStudy = {
  id: 'mqtt-align',
  title: 'Cavalieri Align / MQTT-Align',
  projectType: 'SaaS platform',
  classification: 'independent-product',
  status: 'private-proprietary',
  role: 'Founder / Frontend Engineer',
  summary: 'An independent SaaS product for real-time monitoring.',
  evidence: ['MVP vertical slice delivered in 3 weeks.', 'Architecture walk-through available on request.'],
  technologies: ['Angular', 'TypeScript', 'MQTT'],
  modwRelevance: 'Built through MOD-W steps.',
};

function createFixture(caseStudy: CaseStudy) {
  TestBed.configureTestingModule({ imports: [CaseStudyCardComponent] });
  const fixture = TestBed.createComponent(CaseStudyCardComponent);
  fixture.componentRef.setInput('caseStudy', caseStudy);
  fixture.detectChanges();
  return fixture;
}

describe('CaseStudyCardComponent', () => {
  it('exposes a work-card-{id} host testid', () => {
    const fixture = createFixture(BASE_CASE_STUDY);

    expect(fixture.nativeElement.getAttribute('data-testid')).toBe('work-card-mqtt-align');
  });

  it('exposes the generic work-card testid alongside the item-specific one', () => {
    const fixture = createFixture(BASE_CASE_STUDY);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="work-card"]')).toBeTruthy();
  });

  it('renders title, project type, role, and summary', () => {
    const fixture = createFixture(BASE_CASE_STUDY);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain(BASE_CASE_STUDY.title);
    expect(
      el.querySelector('[data-testid="work-card-mqtt-align-project-type"]')?.textContent,
    ).toContain(BASE_CASE_STUDY.projectType);
    expect(el.querySelector('[data-testid="work-card-mqtt-align-role"]')?.textContent).toContain(
      BASE_CASE_STUDY.role,
    );
    expect(el.textContent).toContain(BASE_CASE_STUDY.summary);
  });

  it('renders human-readable classification and status labels, not raw enum values', () => {
    const fixture = createFixture(BASE_CASE_STUDY);
    const el = fixture.nativeElement as HTMLElement;

    expect(
      el.querySelector('[data-testid="work-card-mqtt-align-classification"]')?.textContent,
    ).toBe('Independent Product');
    expect(el.querySelector('[data-testid="work-card-mqtt-align-status"]')?.textContent).toBe(
      'Private / Proprietary',
    );
  });

  it('renders one evidence bullet per configured evidence point', () => {
    const fixture = createFixture(BASE_CASE_STUDY);
    const evidenceList = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="work-card-mqtt-align-evidence"]',
    );

    expect(evidenceList?.querySelectorAll('li')).toHaveLength(BASE_CASE_STUDY.evidence.length);
    for (const point of BASE_CASE_STUDY.evidence) {
      expect(evidenceList?.textContent).toContain(point);
    }
  });

  it('renders one technology chip per configured technology', () => {
    const fixture = createFixture(BASE_CASE_STUDY);
    const technologies = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="work-card-mqtt-align-technologies"]',
    );

    expect(technologies?.querySelectorAll('.chip')).toHaveLength(
      BASE_CASE_STUDY.technologies.length,
    );
  });

  it('renders MOD-W relevance when present', () => {
    const fixture = createFixture(BASE_CASE_STUDY);
    const el = fixture.nativeElement as HTMLElement;

    expect(
      el.querySelector('[data-testid="work-card-mqtt-align-modw-relevance"]')?.textContent,
    ).toContain(BASE_CASE_STUDY.modwRelevance);
  });

  it('omits MOD-W relevance when absent', () => {
    const fixture = createFixture({ ...BASE_CASE_STUDY, modwRelevance: undefined });
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="work-card-mqtt-align-modw-relevance"]')).toBeNull();
  });

  it('renders a public-proof link with target=_blank and rel=noopener when href is present', () => {
    const fixture = createFixture({ ...BASE_CASE_STUDY, href: 'https://example.com/mqtt-align' });
    const link = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="work-card-mqtt-align-link"]',
    );

    expect(link?.getAttribute('href')).toBe('https://example.com/mqtt-align');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener');
  });

  it('does not render a link when href is absent', () => {
    const fixture = createFixture(BASE_CASE_STUDY);

    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        '[data-testid="work-card-mqtt-align-link"]',
      ),
    ).toBeNull();
  });
});
