# Testing - Frank McGuire Portfolio

**Status:** Approved by Moderator on 2026-07-29

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
- MOD-W section renders content from the runtime JSON file.

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
| Case studies heading | `work-section-heading` |
| Case studies lead | `work-section-lead` |
| Case-study grid | `work-card-grid` |
| Case-study card (generic, every card) | `work-card` |
| Case-study card by id (host element) | `work-card-{id}` |
| Case-study project type | `work-card-{id}-project-type` |
| Case-study classification | `work-card-{id}-classification` |
| Case-study status | `work-card-{id}-status` |
| Case-study role | `work-card-{id}-role` |
| Case-study evidence | `work-card-{id}-evidence` |
| Case-study technologies | `work-card-{id}-technologies` |
| Case-study MOD-W relevance | `work-card-{id}-modw-relevance` |
| Case-study link | `work-card-{id}-link` |
| Case-study loading state | `work-cards-loading` |
| Case-study empty state | `work-cards-empty` |
| Case-study error state | `work-cards-error` |
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

**Resolved (STEP-03):** earlier Steps carried a "could fix later" gap between a documented generic `work-card` selector and the item-specific `work-card-{id}` values actually rendered — only the latter existed. STEP-03 closes this by providing both, on two different elements of the same card: `CaseStudyCardComponent`'s host element carries `data-testid="work-card-{id}"` (via an Angular `host` binding driven by the required `caseStudy` input), and the component's internal `<article>` carries the literal `data-testid="work-card"`. Query `work-card` for "one element per rendered card" (e.g. `querySelectorAll('[data-testid="work-card"]')`); query `work-card-{id}` for a specific card or to assert grid order (the grid's direct children are the card hosts).

---

## Runtime JSON Content Contracts

Case-study and MOD-W section content are driven by project-owned external JSON files that can be edited without recompiling the Angular app.

Recommended sources:

```text
public/content/case-studies.json
public/content/modw.json
```

Case-study architecture expectations:

- The template must not hardcode the number of case-study cards.
- Each case-study item must include a stable `id`.
- Card rendering must use the JSON order unless a documented display-order field is introduced.
- The app fetches the JSON at runtime from `/content/case-studies.json`.
- The JSON file is copied as a static asset and can be updated independently of TypeScript recompilation.
- The app must provide a non-blank loading state while the file is loading.
- The app must provide a source-safe error state if the file is missing or malformed.
- Tests should fail if required launch case studies are removed without updating the Product/Step artifacts.
- Tests should verify that every JSON item renders a card with classification/status visible to users.

MOD-W architecture expectations:

- The app fetches MOD-W content at runtime from `/content/modw.json`.
- The MOD-W section must not hardcode principle count or CTA labels in the template.
- The JSON must preserve source-safe MOD-W terminology from `PRODUCT.md`.
- The app must provide a non-blank loading state while MOD-W content is loading.
- The app must provide a source-safe error state if the file is missing or malformed.
- Tests should verify that every configured MOD-W principle renders.
- Tests should verify that prohibited MOD-W claims are not rendered.

Local UI development data:

- `public/content/case-studies.json` and `public/content/modw.json` are the editable local content used by the running app.
- These files also represent the deployable static content source.
- They should contain source-safe, valid JSON only.

Test fixture data:

- Valid, empty, malformed, and failed-load cases should be represented in specs or test helpers.
- Do not place intentionally broken fixture files under `public/content/`.
- Do not add a fake API or mock server for v1 unless a later Step changes the architecture.

Suggested case-study fields:

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

Suggested MOD-W fields:

```typescript
interface ModwContent {
  eyebrow: string;
  title: string;
  summary: string;
  repositoryHref: string;
  consultingHref: string;
  principles: ModwPrinciple[];
}

interface ModwPrinciple {
  id: string;
  title: string;
  summary: string;
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
| `src/app/app.spec.ts` | App creates and renders the production portfolio shell (starter content gone) | Integration |
| `src/app/content/case-studies-content.service.spec.ts` | Ready/empty/error states for `/content/case-studies.json` loading | Integration |
| `src/app/content/modw-content.service.spec.ts` | Ready/empty/error states for `/content/modw.json` loading | Integration |
| `src/app/portfolio/portfolio-page.component.spec.ts` | MOD-W principle and CTA rendering, nav/hero/engagement/case-studies-section composition, `work`/`modw` anchor ids, single `h1` | Integration |
| `src/app/portfolio/nav/nav.component.spec.ts` | Required nav labels and hrefs, contact CTA, mobile menu open/close, menu closes on link click | Integration |
| `src/app/portfolio/hero-section/hero-section.component.spec.ts` | First-screen identity/positioning terms, single `h1`, CTA hrefs, availability strip content | Integration |
| `src/app/portfolio/engagement-section/engagement-section.component.spec.ts` | Full-time/freelance/advisory tiles render, full-time and freelance share equal visual weight | Integration |
| `src/app/portfolio/case-studies-section/case-studies-section.component.spec.ts` | JSON-driven card count with no hardcoded number, mandatory launch ids present, JSON order preserved, loading/empty/error copy | Integration |
| `src/app/portfolio/case-study-card/case-study-card.component.spec.ts` | Host `work-card-{id}` testid, all fields render, human-readable classification/status labels, evidence bullets, technology chips, MOD-W relevance and link shown/omitted correctly | Integration |
| `e2e/portfolio.spec.ts` | Production shell renders, all mandatory launch Case Study titles visible, card field rendering, MOD-W runtime content loads, first-screen clarity, anchor nav, mobile menu open/close at `/` | E2E |

STEP-01 replaced the Angular starter placeholders (`src/app/app.spec.ts` starter assertions, `e2e/example.spec.ts`) with the tests above. STEP-02 added the nav/hero/engagement specs and extended `portfolio-page.component.spec.ts` and `e2e/portfolio.spec.ts`. STEP-03 extracted Case Studies rendering into dedicated `case-studies-section`/`case-study-card` components and specs, trimming the now-duplicated case-study detail assertions out of `portfolio-page.component.spec.ts`.

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
