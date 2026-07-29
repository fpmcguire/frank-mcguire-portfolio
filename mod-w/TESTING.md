# Testing - Frank McGuire Portfolio

> Testing guidance for the Angular portfolio implementation in MOD-W.

---

## Philosophy

**Pragmatic over perfect.** Tests should give confidence that the portfolio communicates the approved product intent, preserves source-safe content, and remains usable across core viewports.

- Test critical visitor flows and content contracts.
- Prefer integration tests for component rendering and data-driven content.
- Use E2E tests for the few journeys that must work before release.
- Do not chase coverage metrics.
- Do not test Angular framework behavior, simple signal reads, or CSS implementation details.
- Use visual/manual review for pixel polish, spacing, and typography.

---

## Test Distribution

| Type | Effort | Tool |
| --- | --- | --- |
| Integration | 50% | Vitest + Angular Testing Library |
| Unit | 20% | Vitest |
| E2E | 30% | Playwright |

For this portfolio, E2E has slightly higher value than usual because the main risk is whether visitors can scan, navigate, and convert.

---

## What We Test

### Unit Tests - Complex Logic Only

Write unit tests only for logic with real branching.

Worth testing:

```typescript
validateCaseStudyContent(caseStudies: CaseStudy[]): ValidationResult
sortCaseStudiesForDisplay(caseStudies: CaseStudy[]): CaseStudy[]
buildMailtoHref(contactPath: ContactPath): string
```

Not worth testing:

```typescript
// Simple getter or signal read
readonly caseStudies = signal(CASE_STUDIES);

// Angular DI wiring
// Static style token presence
// CSS class names used only for styling
```

### Integration Tests - Primary Component Coverage

Use Angular Testing Library where practical. Query by `data-testid`.

Write integration tests for:

- Case-study grid renders one card per JSON item.
- Required case-study classification/status labels render from data.
- Empty case-study data renders the approved empty state if such a state is introduced.
- Contact section renders both full-time and freelance paths.
- Contact CTAs use the approved public email.
- Nav/mobile menu state changes when interacted with.
- MOD-W principles render from the configured content.

Example:

```typescript
it('renders one case study card for each configured case study', async () => {
  await render(CaseStudiesSectionComponent, {
    componentInputs: { caseStudies: CASE_STUDIES },
  });

  expect(screen.getAllByTestId('work-card')).toHaveLength(CASE_STUDIES.length);
});
```

### E2E Tests - Critical Visitor Journeys

Keep E2E focused. Start with 3-5 release-blocking journeys.

Recommended launch E2E set:

1. Homepage loads and first screen communicates Frank's name, role, primary stack, Germany/EU signal, and full-time/freelance availability.
2. Anchor navigation reaches Work, MOD-W, About, and Contact sections.
3. Case Studies section renders the JSON-driven card set and required project classifications.
4. Contact section exposes full-time and freelance paths, approved email, LinkedIn, and GitHub.
5. Mobile nav opens, links work, and closes after navigation.

Optional later E2E checks:

- Reduced-motion preference does not hide reveal content.
- Basic keyboard tab order reaches nav, CTAs, cards, and contact links.
- Required recruiter keywords are visible in natural page text.

Skip E2E for:

- Every card hover state.
- Every button variation.
- Internal data-shape correctness.
- Edge cases already covered by integration tests.

---

## Selector Strategy

`data-testid` attributes are the primary selector for Vitest and Playwright.

```text
data-testid="{feature}-{component}-{element}-{modifier?}"
```

Rules:

- Always kebab-case.
- Specific enough to be unambiguous.
- Added as part of the implementation Step, not after tests fail.
- Do not use CSS classes, DOM structure, or text content as primary selectors when a stable test id is available.
- Add or update selector rows in this file in the same Step where elements are introduced.

Current project conventions:

| Element | `data-testid` |
| --- | --- |
| Page shell | `portfolio-page` |
| Skip link | `skip-link` |
| Primary nav | `nav-primary` |
| Nav link | `nav-link-{section}` |
| Contact nav CTA | `nav-contact-cta` |
| Mobile nav toggle | `nav-mobile-toggle` |
| Mobile menu | `nav-mobile-menu` |
| Mobile menu close | `nav-mobile-close` |
| Hero section | `hero-section` |
| Hero primary CTA | `hero-work-cta` |
| Hero MOD-W CTA | `hero-modw-cta` |
| Availability strip | `hero-availability-strip` |
| Engagement section | `engagement-section` |
| Engagement path | `engagement-path-{id}` |
| Case studies section | `work-section` |
| Case-study grid | `work-card-grid` |
| Case-study card | `work-card` |
| Case-study card by id | `work-card-{id}` |
| Case-study classification | `work-card-{id}-classification` |
| Case-study status | `work-card-{id}-status` |
| MOD-W section | `modw-section` |
| MOD-W principle | `modw-principle-{id}` |
| MOD-W repository CTA | `modw-repository-cta` |
| MOD-W contact CTA | `modw-contact-cta` |
| About section | `about-section` |
| Contact section | `contact-section` |
| Full-time contact path | `contact-path-full-time` |
| Freelance contact path | `contact-path-freelance` |
| Email link | `contact-email-link` |
| LinkedIn link | `contact-linkedin-link` |
| GitHub link | `contact-github-link` |
| Footer | `footer` |

---

## JSON Content Contract

Case-study card count and content are driven by a project-owned JSON object or array.

Recommended source:

```text
src/app/content/case-studies.json
```

Architecture expectations:

- The template must not hardcode the number of case-study cards.
- Each case-study item must include a stable `id`.
- Card rendering must use the JSON order unless a documented display-order field is introduced.
- Tests should fail if required launch case studies are removed without updating the Product/Step artifacts.
- Tests should verify that every JSON item renders a card with classification/status visible to users.

Suggested required fields:

```typescript
interface CaseStudy {
  id: string;
  title: string;
  projectType: string;
  classification:
    | 'independent-product'
    | 'personal-project'
    | 'open-source'
    | 'professional-experience'
    | 'proprietary';
  status:
    | 'public-demo'
    | 'public-repository'
    | 'private-proprietary'
    | 'employment-summary';
  role: string;
  summary: string;
  evidence: string[];
  technologies: string[];
  modwRelevance?: string;
  href?: string;
}
```

---

## Test File Placement

Tests live next to the files they test:

```text
case-studies-section.component.ts
case-studies-section.component.spec.ts

case-study-card.component.ts
case-study-card.component.spec.ts

case-study-content.ts
case-study-content.spec.ts
```

E2E tests live in `e2e/`:

```text
e2e/
  helpers.ts
  portfolio.spec.ts
```

---

## Naming Conventions

Test names should read as behavior.

Good:

```typescript
it('renders one card for each configured case study');
it('shows project classification on every case-study card');
it('keeps full-time and freelance contact paths equally visible');
it('opens the mobile menu and closes it after section navigation');
```

Avoid:

```typescript
it('sets activeSection signal');
it('calls toggleMenu');
it('applies card class');
```

---

## What We Do Not Test

| Skip | Why |
| --- | --- |
| Simple Angular input binding | Framework behavior |
| CSS class application for visual styling | Use visual review |
| Every hover/focus color | Use manual accessibility and visual review |
| Google font loading mechanics | Browser/platform concern |
| Trivial computed signals | No meaningful logic |
| Prototype direction switcher | Prototype-only, not production scope |

---

## Running Tests

```bash
npm test
npm run test:e2e
npm run test:e2e:ui
npm run build
```

If CI scripts are added later, document them here in the Step that introduces them.

---

## Current Test State

_Updated at the close of each Step._

| File | Tests | Type |
| --- | --- | --- |
| `src/app/app.spec.ts` | Generated Angular starter tests | Unit/integration placeholder |
| `e2e/example.spec.ts` | Generated starter-page E2E | E2E placeholder |

Both current tests target the Angular starter page and must be replaced when the first production portfolio Step is implemented.

---

## Decision Tree

```text
Should I write a test for this?
|
+-- Is it a critical visitor journey? -> E2E test
|
+-- Does it verify data-driven content rendering? -> Integration test
|
+-- Does it protect source-safe claims or required classifications? -> Integration test
|
+-- Is it complex pure logic with branching? -> Unit test
|
+-- Is it styling, simple wiring, or framework behavior? -> Skip
|
+-- Am I unsure what confidence this gives? -> Skip
```

---

MOD-W v4.0.0 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
