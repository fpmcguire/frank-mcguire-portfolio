# Architecture - Frank McGuire Portfolio

**Status:** Approved by Moderator on 2026-07-29  
**Tech Lead:** Codex  
**Target stack:** Angular v21.1.0  
**Scope:** Compact single-page portfolio SPA, first implementation

---

## 1. Architecture Summary

Build the portfolio as a **static Angular single-page application with runtime-editable content islands**.

The app is mostly static presentation: hero, engagement paths, case studies, MOD-W explainer, about, contact, and footer. The two content areas expected to change most often without a rebuild are loaded from JSON files at runtime:

- Case Studies: `/content/case-studies.json`
- MOD-W section: `/content/modw.json`

The production implementation uses Angular v21 standalone components, signals for local and async view state, and modern template control flow (`@if`, `@for`, `@empty`, `@switch` where useful). Avoid legacy structural directives unless a library integration requires them.

Do not introduce NgRx, a CMS, a backend API, server-side contact handling, or multi-page routing for v1.

---

## 2. Authoritative Inputs

Primary product source:

- `mod-w/PRODUCT.md`

Design and prototype inputs:

- `mod-w/DESIGN-SPEC.md`
- `mod-w/prototype/README.md`
- `mod-w/prototype/index.html`
- `mod-w/prototype/technical-hud.html`
- `mod-w/prototype/styles.css`
- `mod-w/prototype/app.js`
- `mod-w/screenshots/*`

Advisory architecture input:

- `mod-w/ARCHITECTURE-NOTES.md`

Testing guidance:

- `mod-w/TESTING.md`

Note: `DESIGN-SPEC.md` is marked proposed pending Product Owner and Moderator approval. This architecture treats the Editorial Left direction as the target design input, subject to Moderator approval.

---

## 3. Core Decisions

### 3.1 Application Shape

- Implement as one compact SPA.
- Use anchor navigation, not page routes, for Home, Work, MOD-W, About, and Contact.
- Keep the first implementation English-only.
- Do not add a CV/resume page.
- Do not add a downloadable CV/resume link.
- Do not add a standalone Services page.
- Do not add a contact form.

### 3.2 Angular Style

- Use standalone components.
- Use signals for component state and runtime content loading state.
- Use computed signals for derived presentation state.
- Use Angular v21 template control flow:
  - `@for` for content collections.
  - `@if` for loading, error, optional links, and empty states.
  - `@empty` for empty collections.
  - `@switch` only for variant rendering that is clearer than conditional classes.
- Avoid RxJS in component code unless a future async integration requires streams.
- Keep components presentational unless they own local UI behavior.

### 3.3 Styling

- Use plain SCSS and CSS custom properties.
- Put global design tokens, base reset, font declarations, and body/page-level background tokens in `src/styles.scss`.
- Put component layout and component-specific states in component SCSS.
- No CSS framework.
- No Angular Material for v1.
- Preserve the approved minimalist dark visual direction: restrained, low clutter, no generic AI imagery.

### 3.4 Runtime Content

Case-study and MOD-W content must be editable without recompiling the Angular bundle.

Use static asset JSON files:

```text
public/content/case-studies.json
public/content/modw.json
```

Fetch at runtime:

```text
/content/case-studies.json
/content/modw.json
```

Each runtime content area must expose:

- `data` or domain-specific signal
- `isLoading`
- `error`

The UI must render non-blank loading, empty, and error states. Error copy must be source-safe and should not expose implementation details.

---

## 4. Proposed Source Layout

```text
src/app/
  app.config.ts
  app.html
  app.routes.ts
  app.scss
  app.ts

  content/
    case-study.model.ts
    modw-content.model.ts
    content-load-state.model.ts
    case-studies-content.service.ts
    modw-content.service.ts
    static-profile.content.ts
    engagement-paths.content.ts
    contact.content.ts

  shared/
    button-link/
    chamfer-panel/
    section-header/
    reveal-on-scroll.directive.ts

  portfolio/
    portfolio-page.component.ts
    nav/
    hero-section/
    engagement-section/
    case-studies-section/
    case-study-card/
    modw-section/
    about-section/
    contact-section/
    footer/

public/
  content/
    case-studies.json
    modw.json
```

The app is small enough that a deep feature/module hierarchy is not needed. Keep folders obvious and boring.

---

## 5. Component Boundaries

### App

Root Angular component. It should only host the portfolio page and any global shell concerns.

### Portfolio Page

Owns the single-page composition and section order. It wires together sections and shared page-level state where needed.

### Nav

Responsibilities:

- Anchor links.
- Active section indicator.
- Mobile menu open/closed state.
- Contact CTA.

Recommended state:

```typescript
readonly activeSection = signal<SectionId>('home');
readonly isMobileMenuOpen = signal(false);
```

Use `IntersectionObserver` or a small scroll-spy helper to update `activeSection`. Do not perform layout-heavy scroll work.

### Hero Section

Static profile/positioning content from typed local content config. Hero availability copy should avoid unresolved exact-immediate-availability claims unless Moderator approves final wording.

### Engagement Section

Static typed local content for full-time, freelance, and advisory/training paths. Do not create a standalone Services section or page.

### Case Studies Section

Fetches or receives runtime case-study content and renders cards using `@for`. The number of cards is determined by JSON content.

Responsibilities:

- Loading state.
- Error state.
- Empty state.
- Grid rendering.

It must clearly display each item's classification/status.

### Case Study Card

Pure presentational component. Receives one `CaseStudy`. It must not fetch data. It may render external anchors when `productUrl` or `repositoryUrl` is present, and a legacy single anchor when only `href` is present. External anchors must open in a new browser tab with `target="_blank"` and `rel="noopener"`.

### MOD-W Section

Fetches or receives runtime MOD-W content. Principle count, CTA labels, CTA hrefs, title, and summary come from JSON. The section must not describe MOD-W as an automation framework, autonomous agent framework, SaaS product, or replacement for engineering judgment.

### About Section

Static typed local content. Keep compact and narrative, not a full CV.

### Contact Section

Static typed local content. Use `mailto:` only in v1. Must support both full-time and freelance paths with equal prominence.

### Footer

Static metadata and MOD-W/Angular attribution.

---

## 6. Runtime Data Contracts

### CaseStudy

```typescript
export interface CaseStudy {
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
  productUrl?: string;
  repositoryUrl?: string;
}
```

Case-study JSON shape:

```json
[
  {
    "id": "mqtt-align",
    "title": "Cavalieri Align / MQTT-Align",
    "projectType": "SaaS",
    "classification": "independent-product",
    "status": "private-proprietary",
    "role": "Founder / Frontend Engineer",
    "summary": "Source-safe summary text.",
    "evidence": ["Source-safe evidence point."],
    "technologies": ["Angular", "TypeScript", "MQTT"],
    "modwRelevance": "Built through MOD-W steps.",
    "productUrl": "https://example.com/product",
    "repositoryUrl": "https://github.com/example/repository"
  }
]
```

Required launch content must include:

- Cavalieri Align / MQTT-Align
- AGV Fleet Management Simulator
- Prismatic
- Angular Design Patterns
- Professional experience highlights for PAKi, travel-IT, and Kaufland

React Design Patterns may be included only if it supports cross-framework credibility without distracting from Angular-first positioning. Trending Repos should be omitted in v1 unless Moderator approves a strategic reason.

### ModwContent

```typescript
export interface ModwContent {
  eyebrow: string;
  title: string;
  summary: string;
  repositoryHref: string;
  consultingHref: string;
  principles: ModwPrinciple[];
}

export interface ModwPrinciple {
  id: string;
  title: string;
  summary: string;
}
```

MOD-W JSON shape:

```json
{
  "eyebrow": "03 - Methodology",
  "title": "Moderated AI Development Workflow (MOD-W)",
  "summary": "Source-safe MOD-W summary text.",
  "repositoryHref": "https://github.com/fpmcguire/moderated-ai-development-workflow",
  "consultingHref": "#contact",
  "principles": [
    {
      "id": "role-separation",
      "title": "Role separation",
      "summary": "Short source-safe principle summary."
    }
  ]
}
```

---

## 7. Runtime Content Loading

Use Angular `HttpClient` or `fetch` wrapped by a small service. Prefer `HttpClient` if the implementation already provides it in `app.config.ts`; otherwise `fetch` is acceptable for these two static JSON files.

The JSON files under `public/content/` serve as the local UI development content and the deployable runtime content source. They are not throwaway mocks; they are editable static content files with the same shape production uses.

For tests, keep variant fixtures separate from deployable content:

- valid content fixture
- empty content fixture
- malformed content fixture
- failed-load behavior

These test fixtures may live inline in specs or under test helpers. Do not place intentionally malformed test data in `public/content/`.

Recommended service behavior:

- Fetch once on initialization.
- Validate minimal shape before exposing content.
- Expose signal-backed state.
- Log technical failures only to console in development if useful.
- Render user-facing fallback copy that is calm and non-technical.

Recommended state shape:

```typescript
type ContentLoadState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'ready'; data: T; error: null }
  | { status: 'empty'; data: T; error: null }
  | { status: 'error'; data: null; error: string };
```

The view should use `@if` branches for `loading`, `error`, and `ready`.

---

## 8. Routing and Navigation

Use anchor navigation only.

Canonical section ids:

```text
top
work
modw
about
contact
```

The Product requires navigation labels:

```text
Home
Case Studies
MOD-W
About
Contact
```

The prototype uses "Work" for the case-study nav label. Prefer "Case Studies" unless Moderator chooses the shorter label.

Do not add routes for `/work`, `/modw`, `/about`, `/contact`, `/resume`, or `/cv` in v1.

---

## 9. TypeScript Standards

Use strict, explicit TypeScript. The goal is to make content contracts and UI states hard to misuse without adding unnecessary abstraction.

Rules:

- Prefer literal unions over TypeScript `enum`.
- Use `as const` for canonical value lists.
- Derive union types from canonical constants when it prevents drift.
- Use `satisfies` for static TypeScript content/config objects.
- Use `readonly` for content models, config arrays, and values that should not mutate.
- Prefer `unknown` over `any`; narrow explicitly.
- Avoid `any`.
- Avoid type assertions such as `as CaseStudy` to silence errors.
- Avoid non-null assertions `!` unless the invariant is obvious, local, and documented by surrounding code.
- Use explicit return types on exported functions and public service methods.
- Keep runtime JSON as `unknown` until validated.
- Validate runtime JSON with small type guards or assertion functions before exposing typed content.
- Prefer discriminated unions for load states and meaningful UI variants.
- Name domain unions explicitly, for example `CaseStudyClassification`, `CaseStudyStatus`, and `SectionId`.
- Avoid optional fields when an empty array or empty string makes the rendering contract clearer.
- Make impossible states unrepresentable where reasonable.
- Keep Angular component inputs strongly typed and required when the component cannot render correctly without them.

Canonical constant pattern:

```typescript
export const CASE_STUDY_CLASSIFICATIONS = [
  'independent-product',
  'personal-project',
  'open-source',
  'professional-experience',
  'proprietary',
] as const;

export type CaseStudyClassification =
  (typeof CASE_STUDY_CLASSIFICATIONS)[number];
```

Static config pattern:

```typescript
export const CONTACT_PATHS = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'freelance', label: 'Freelance' },
] as const satisfies readonly ContactPath[];
```

Runtime JSON validation pattern:

```typescript
function isCaseStudy(value: unknown): value is CaseStudy {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isCaseStudyClassification(value.classification)
  );
}
```

Do not use `enum` for JSON-backed status/classification values. Runtime JSON should map to string literal unions.

---

## 10. Accessibility

Baseline requirements:

- Semantic page structure: `nav`, `header`, `main`, `section`, `footer`.
- One `h1`.
- Sequential headings.
- Skip link to main content.
- Visible focus states for all interactive elements.
- Keyboard-operable mobile menu.
- Mobile menu closes through explicit close button and section-link activation.
- Links with clear accessible names.
- `aria-hidden="true"` for decorative background/ring layers.
- Respect `prefers-reduced-motion`.
- Content visible by default; animation must not hide content in no-JS or pre-hydration states.

---

## 11. Performance

The page is content-static and low-risk.

Performance recommendations:

- Avoid heavy runtime dependencies.
- Keep animations CSS-only and cheap.
- Use no client-side charting, canvas, or 3D in v1.
- Preserve the fixed gradient/grid as CSS only; the grid is decorative and can be removed if it causes rendering cost.
- Self-host or otherwise carefully load fonts if LCP becomes a concern.
- Keep runtime JSON small and cache-friendly.

---

## 12. Testing Strategy

Follow `mod-w/TESTING.md`.

Minimum first implementation checks:

- Build succeeds.
- Starter tests are replaced.
- Case Studies section renders one card per item from `/content/case-studies.json`.
- MOD-W section renders from `/content/modw.json`.
- Runtime JSON loading, empty, and error states are covered by integration tests.
- E2E verifies first-screen clarity, anchor navigation, case-study rendering, contact paths, and mobile menu behavior.
- Manual visual review covers desktop and mobile screenshots against the Editorial Left prototype.
- Manual accessibility review covers keyboard navigation, focus visibility, readable text, and reduced motion.

Use `data-testid` conventions from `TESTING.md`.

---

## 13. Security and Source Safety

- No backend and no form submission in v1.
- External links must use `target="_blank"` with `rel="noopener"` where they open a new tab.
- Do not expose proprietary project details beyond approved wording.
- Use `fpmcguire@gmail.com` as the public email unless Product/Moderator updates the source.
- Avoid exact "available immediately" wording unless Moderator approves it near launch.
- Avoid CV/resume download links in v1.
- Runtime JSON content is trusted project content, but shape validation should prevent blank or broken rendering if malformed.

---

## 14. Decisions That Diverge From Prototype

1. **Runtime JSON for Case Studies and MOD-W**
   - Prototype hardcodes all card and MOD-W content in HTML.
   - Production loads both from `public/content/*.json` so Frank can update content without recompiling the app.

2. **No prototype direction switcher**
   - Prototype includes a bottom-center direction switcher.
   - Production omits it because Editorial Left is the chosen direction and the switcher is a prototype-only comparison aid.

3. **Case-study roster follows Product, not prototype**
   - Prototype includes React Design Patterns and Trending Repos.
   - Product requires the mandatory launch set and says Trending Repos should be omitted unless strategically justified.

4. **Contact email follows Product**
   - Prototype uses `frank@frank-mcguire.com`.
   - Product requires `fpmcguire@gmail.com`.

5. **No copied prototype code**
   - Prototype is plain HTML/CSS/JS evidence.
   - Production recreates the design using Angular components, signals, typed content boundaries, accessibility expectations, and tests.

6. **No CV page or download link**
   - Product excludes downloadable resume and full chronological resume page from first implementation.
   - Production keeps resume-like evidence inside About and Case Studies only.

---

## 15. Open Questions

1. Is `DESIGN-SPEC.md` approved as-is by Product Owner and Moderator?
2. Should the nav label be "Case Studies" per Product or "Work" per prototype?
3. What exact source-safe wording is approved for proprietary project summaries?
4. Should React Design Patterns be included in the launch JSON?
5. Are final LinkedIn, GitHub, and MOD-W repository URLs approved?
6. Should fonts be self-hosted in v1, or is external font loading acceptable for the first Step?

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
