# Architecture - Frank McGuire Portfolio

**Status:** Updated draft for Moderator-approved analytics scope on 2026-07-30
**Tech Lead:** Codex
**Target stack:** Angular v21, currently v21.2.x
**Scope:** Compact single-page portfolio SPA, first implementation

---

## 1. Architecture Summary

Build the portfolio as a **static Angular single-page application with runtime-editable content islands and consent-gated analytics**.

The app is mostly static presentation: hero, engagement paths, case studies, MOD-W explainer, about, contact, and footer. The two content areas expected to change most often without a rebuild are loaded from JSON files at runtime:

- Case Studies: `/content/case-studies.json`
- MOD-W section: `/content/modw.json`

The production implementation uses Angular v21 standalone components, signals for local and async view state, and modern template control flow (`@if`, `@for`, `@empty`, `@switch` where useful). Avoid legacy structural directives unless a library integration requires them.

Do not introduce NgRx, a CMS, a backend API, server-side contact handling, or multi-page routing for v1.

Google Analytics is in scope only after the visitor grants analytics consent. Do not add the Google Analytics script statically to `index.html`; the app must load and initialize it only through a small analytics service after consent is accepted.

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
- Keep the portfolio content English-only. The analytics consent popup is privacy / compliance UI and may use German, English, or concise bilingual wording once Moderator approves final copy.
- Do not add a CV/resume page.
- Do not add a downloadable CV/resume link.
- Do not add a standalone Services page.
- Do not add a contact form.
- Add Google Analytics only through consent-gated client-side initialization.
- Do not add analytics routes, a backend proxy, server-side tracking, or a custom analytics dashboard.
- Do not enable Google Analytics advertising features, Google Signals, or data-sharing behavior unless Moderator explicitly approves the launch settings.

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

  analytics/
    analytics.config.ts
    analytics-consent.model.ts
    analytics-consent.service.ts
    google-analytics.service.ts
    analytics-consent-banner/

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

Root Angular component. It should host the portfolio page and global shell concerns.

For analytics scope, App should mount the Analytics Consent Banner so consent UI is available independently of portfolio section rendering. Keep the banner outside content sections so rejecting analytics cannot affect the portfolio experience.

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

Footer may include a "Privacy / Cookie settings" control if that is the clearest persistent location for reopening analytics consent settings. If implemented there, it should call `AnalyticsConsentService.openSettings()` rather than owning consent state directly.

### Analytics Consent Banner

Global consent component rendered by App. It owns only consent UI, not analytics transport.

Responsibilities:

- Show first-visit analytics consent prompt when consent state is unknown.
- Offer equal, clear accept and reject controls.
- Avoid pre-checked options and misleading button hierarchy.
- Keep portfolio content usable while the prompt is visible.
- Provide or coordinate a persistent "Privacy / Cookie settings" control for changing consent later.
- Use Moderator-approved wording and language before publication.

Recommended state comes from `AnalyticsConsentService`:

```typescript
readonly consentState = computed(() => this.analyticsConsent.state());
readonly isSettingsOpen = computed(() => this.analyticsConsent.isSettingsOpen());
```

### Analytics Consent Service

Singleton service responsible for local consent state. It must not call Google Analytics directly.

Responsibilities:

- Read and write a versioned consent record in browser storage.
- Expose a signal-backed consent state: `unknown`, `accepted`, or `rejected`.
- Persist accept/reject decisions.
- Reopen settings on user request.
- Support withdrawal by changing accepted consent to rejected consent.
- Treat missing, malformed, expired, or old-version records as `unknown`.
- Guard all browser APIs (`window`, `localStorage`, `document`) so tests and non-browser contexts do not crash.

Recommended local storage key:

```text
frank-mcguire-portfolio.analytics-consent.v1
```

Recommended model:

```typescript
export type AnalyticsConsentState = 'unknown' | 'accepted' | 'rejected';

export interface AnalyticsConsentRecord {
  version: 1;
  state: Exclude<AnalyticsConsentState, 'unknown'>;
  decidedAt: string;
}
```

### Google Analytics Service

Singleton adapter for Google Analytics. Application code must not call `gtag` directly.

Responsibilities:

- Observe accepted/rejected consent state.
- Dynamically inject the GA4 script only after consent is accepted and a measurement id is configured.
- Initialize `dataLayer` / `gtag` only after consent is accepted.
- Send one initial page-view after consent is accepted.
- Track approved events through typed wrapper methods.
- Stop future tracking after consent is rejected or withdrawn.
- Best-effort delete first-party GA cookies when consent is withdrawn.
- No-op safely when no measurement id is configured.

Recommended public API:

```typescript
trackPageView(path: string, title: string): void;
trackEvent(eventName: AnalyticsEventName, params?: AnalyticsEventParams): void;
```

Approved v1 event names should be narrow and portfolio-specific:

```typescript
type AnalyticsEventName =
  | 'section_navigation'
  | 'contact_cta_click'
  | 'outbound_profile_click'
  | 'case_study_link_click'
  | 'modw_repository_click';
```

Do not make analytics calls from every component by default. Prefer tracking at stable interaction boundaries: nav links, contact CTAs, external profile/repository links, and approved case-study/MOD-W CTAs.

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

## 7a. Analytics and Consent Configuration

Google Analytics configuration is not runtime content. Keep it separate from `public/content/*.json`.

Use a small typed config or injection token:

```typescript
export interface AnalyticsConfig {
  measurementId: string;
  consentStorageKey: string;
  consentVersion: 1;
}
```

Recommended implementation:

- Store the measurement id in `src/app/analytics/analytics.config.ts`.
- Use the Moderator-supplied GA4 measurement id: `G-MD06T4XGJJ`.
- If `measurementId` is empty, the Google Analytics service must no-op even when consent is accepted.
- Do not put the GA script tag in `src/index.html`.
- Do not use a third-party Angular analytics wrapper for v1; a tiny local adapter is simpler, testable, and avoids extra dependency surface.
- Do not load Google Tag Manager unless Moderator explicitly changes the scope.

Consent persistence:

- Use localStorage for the consent record.
- Use a versioned key so copy or policy changes can trigger a fresh prompt.
- Do not store personal data in the consent record.
- The consent prompt must remain usable if localStorage is unavailable; in that case, the visitor may be prompted again on the next visit.

Withdrawal behavior:

- Rejecting or withdrawing consent must prevent future page-view and event tracking.
- If GA was already loaded, set future analytics calls to no-op.
- Best-effort remove known GA first-party cookies for the current host, including `_ga` and `_ga_<container-suffix>` patterns.
- Do not claim cookie deletion is legally complete in user-facing copy.

Tracking boundaries:

- Initial page-view after consent.
- Anchor navigation events for major sections where feasible.
- Contact CTA click events.
- External profile / repository click events.
- Case-study and MOD-W CTA click events.

Do not track:

- Email contents or generated mailto body text.
- Fine-grained scroll depth in v1.
- Keystrokes, pointer coordinates, form input, or any visitor-provided personal data.
- Rejected-consent users.

---

## 7b. Static Hosting and Deployment Target

The production deployment target is InMotion Hosting shared hosting. Treat this as a static-file hosting environment with no Node.js application server and no Angular SSR runtime.

Angular v21 supports client-side rendering (CSR), static site generation / prerendering (SSG), and server-side rendering (SSR), but CSR is Angular's default behavior. SSR / hybrid rendering is opt-in through Angular CLI `--ssr` or `ng add @angular/ssr`. This project must remain a CSR/static SPA for v1 unless the Moderator approves a future scope change.

Repository checks that should remain true for v1:

- `package.json` must not add `@angular/ssr` as an application dependency.
- No `server.ts`, `src/main.server.ts`, `src/app/app.config.server.ts`, or `src/app/app.routes.server.ts`.
- `angular.json` must not add server/prerender-only targets for the production deployment.
- `src/app/app.routes.ts` should remain empty unless a later Step approves page routes.
- Production deployment should upload the contents of `dist/frank-mcguire-portfolio/browser/`.

Because the app uses anchor navigation only, InMotion does not need Angular route rewrite support for `/work`, `/modw`, `/about`, or `/contact`; those are `#` anchors handled by the browser. If future page routes are approved, deployment must add shared-hosting rewrite support such as `.htaccess` fallback to `index.html`.

Runtime content files under `public/content/` are copied into the production browser output and must be uploaded with the rest of the static assets. The deployed site must serve:

```text
/content/case-studies.json
/content/modw.json
```

If InMotion serves JSON with an unexpected MIME type, the Development Team should document it and verify the browser still fetches the content correctly.

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
- Analytics consent prompt must be keyboard-operable and screen-reader understandable.
- Consent accept/reject controls must have clear accessible names and comparable visual weight.
- Reopening privacy / cookie settings must be possible by keyboard.
- The consent prompt must not trap focus unless implemented as a true modal dialog with a clear close/reject path. A non-blocking banner or panel is preferred for v1.

---

## 11. Performance

The page is content-static and low-risk.

Performance recommendations:

- Avoid heavy runtime dependencies.
- Keep animations CSS-only and cheap.
- Use no client-side charting, canvas, or 3D in v1.
- Load Google Analytics only after consent to avoid unnecessary third-party network cost for rejected-consent visitors.
- Keep analytics implementation local and dependency-light; no analytics UI package or cookie-consent framework unless a later Step justifies it.
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
- Analytics tests verify no GA script or event call before consent, GA initialization after accepted consent, no tracking after rejected/withdrawn consent, consent persistence, and the visible settings control.
- Manual visual review covers desktop and mobile screenshots against the Editorial Left prototype.
- Manual accessibility review covers keyboard navigation, focus visibility, readable text, and reduced motion.

Use `data-testid` conventions from `TESTING.md`.

---

## 13. Security and Source Safety

- No backend and no form submission in v1.
- No server-side analytics or analytics proxy in v1.
- Do not load Google Analytics before accepted consent.
- Do not collect visitor-provided personal data through analytics events.
- Do not track mailto body text, email contents, or any future form input.
- Do not enable Google Analytics advertising features, Google Signals, or extra data sharing without Moderator approval.
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

7. **Consent-gated analytics added after initial architecture approval**
   - Original architecture excluded analytics dashboard scope but did not include usage tracking.
   - Product now requires Google Analytics with German / EU GDPR-oriented consent.
   - Production adds consent-gated GA only; it still excludes a custom analytics dashboard and backend.

---

## 15. Open Questions

1. Is `DESIGN-SPEC.md` approved as-is by Product Owner and Moderator?
2. Should the nav label be "Case Studies" per Product or "Work" per prototype?
3. What exact source-safe wording is approved for proprietary project summaries?
4. Should React Design Patterns be included in the launch JSON?
5. Are final LinkedIn, GitHub, and MOD-W repository URLs approved?
6. Should fonts be self-hosted in v1, or is external font loading acceptable for the first Step?
7. What is the approved Privacy Policy / Datenschutzerklaerung URL?
8. Should the consent popup be German-only, English-only, or bilingual German / English?
9. Are Google Analytics advertising features, Google Signals, and optional data-sharing settings disabled for launch?
10. Should consent be re-requested after a fixed duration, or only when the consent version changes?

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
