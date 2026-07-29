# STEP-01 - Production App Foundation and Runtime Content Contracts

**Status:** Approved by Moderator on 2026-07-29  
**Development Team interface:** Claude Code  
**Tech Lead:** Codex  
**Architecture:** `mod-w/ARCHITECTURE.md`, approved by Moderator on 2026-07-29

---

## 1. Goal

Replace the generated Angular starter surface with a production-ready foundation for the portfolio SPA, including runtime JSON content contracts for Case Studies and MOD-W.

This Step establishes the app structure, content loading pattern, base styling tokens, and first tests. It does not need to complete all portfolio sections or final visual fidelity.

---

## 2. Scope

### In Scope

- Remove the generated Angular starter page from the rendered app.
- Create the top-level portfolio page/component structure.
- Add global design tokens and base page styles needed for future sections.
- Add runtime JSON files:
  - `public/content/case-studies.json`
  - `public/content/modw.json`
- Treat those JSON files as the local UI development content and deployable runtime content source.
- Add TypeScript models for:
  - `CaseStudy`
  - `ModwContent`
  - `ModwPrinciple`
  - `ContentLoadState<T>`
- Add content loading services for runtime JSON.
- Add test fixtures or inline fixture data for valid, empty, and malformed runtime content paths.
- Render a minimal production shell proving runtime content can load.
- Use Angular v21 standalone components, signals, and modern template control flow.
- Follow `ARCHITECTURE.md` TypeScript standards, including literal unions, `as const`, `satisfies`, `readonly`, `unknown` over `any`, and runtime JSON validation before exposing typed content.
- Add or replace tests for the foundation and runtime content loading.

### Out of Scope

- Full Editorial Left visual fidelity.
- Final hero copy/layout.
- Final Case Study card design.
- Final MOD-W chamfered panel design.
- About section content.
- Contact section content.
- Footer polish.
- CV/resume page.
- CV/resume download link.
- Contact form or backend.
- Multi-page routing.

---

## 3. Requirements Mapping

Product requirements:

- FR3 - MOD-W as major pillar.
- FR4 - Case-study evidence.
- FR6 - Project classification.
- FR7 - Source-safe claims.
- FR11 - Compact SPA structure.
- NFR3 - Performance.
- NFR5 - Maintainability.
- NFR6 - Trustworthiness.
- NFR7 - MOD-W validation compatibility.

Product acceptance checks prepared by this Step:

- AC3 - MOD-W major pillar.
- AC4 - MOD-W accuracy.
- AC5 - Case-study evidence.
- AC6 - Project classification clarity.
- AC8 - Source-safe claims.
- AC12 - No hidden scope.
- AC13 - Compact SPA acceptance.

This Step prepares these checks through architecture and content plumbing. Later Steps complete the user-facing acceptance.

Design references:

- `DESIGN-SPEC.md` section 1 - Visual Identity.
- `DESIGN-SPEC.md` section 3 - Component Library.
- `DESIGN-SPEC.md` section 4 - Screen Layouts.
- `DESIGN-SPEC.md` section 6 - Component-Step Mapping.

No formal Design IDs are present in `DESIGN-SPEC.md`.

---

## 4. Likely Affected Files

Expected production files:

```text
src/styles.scss
src/app/app.ts
src/app/app.html
src/app/app.scss
src/app/app.config.ts
src/app/app.spec.ts
src/app/content/*
src/app/portfolio/*
public/content/case-studies.json
public/content/modw.json
e2e/example.spec.ts or e2e/portfolio.spec.ts
```

The Development Team may adjust exact file names if the architecture remains intact.

---

## 5. Implementation Guidance

- Keep the foundation simple.
- Prefer `HttpClient` with `provideHttpClient()` for runtime JSON loading.
- Expose loading state through signals.
- Validate minimal runtime JSON shape before rendering it as ready.
- Render calm fallback text for loading, empty, and error states.
- Use `@if`, `@for`, and `@empty`; do not use `*ngIf` or `*ngFor`.
- Avoid TypeScript `enum`; use string literal unions for JSON-backed values.
- Keep fetched JSON as `unknown` until type guards or assertion functions validate it.
- Do not use `as CaseStudy` or `as ModwContent` to bypass validation.
- Do not introduce routing beyond the existing empty route configuration.
- Do not copy prototype HTML/CSS/JS into production.
- Do not hardcode the number of case-study cards in a template.
- Keep initial JSON copy source-safe and conservative if final copy is not approved.
- Keep intentionally malformed or failure-case fixtures out of `public/content/`; those belong in tests or test helpers.

---

## 6. Runtime JSON Minimum Content

`public/content/case-studies.json` must include at least the required launch set placeholders or source-safe initial entries for:

- Cavalieri Align / MQTT-Align
- AGV Fleet Management Simulator
- Prismatic
- Angular Design Patterns
- PAKi
- travel-IT
- Kaufland

`public/content/modw.json` must include:

- MOD-W title.
- Source-safe summary.
- repository href.
- consulting/contact href.
- at least four principles:
  - role separation
  - document-centered steps
  - human moderation
  - review and validation

---

## 7. Reference Implementation Disposition

Prototype files reviewed:

- `mod-w/prototype/index.html`
- `mod-w/prototype/technical-hud.html`
- `mod-w/prototype/styles.css`
- `mod-w/prototype/app.js`

Disposition: **Adopt with modifications**.

Accepted prototype assumptions:

- Angular production should follow the Editorial Left direction.
- SPA sections map to Home, Case Studies, MOD-W, About, Contact.
- Design tokens should be implemented as CSS custom properties.
- Runtime interactions are local and minimal.

Modified prototype assumptions:

- Case Studies and MOD-W content are runtime JSON, not hardcoded HTML.
- Case-study roster follows `PRODUCT.md`, not the prototype card set.
- Contact email follows `PRODUCT.md`.
- Production uses Angular signals and modern template flow.

Rejected prototype assumptions:

- Prototype direction switcher.
- Copying prototype source into `src/`.
- Trending Repos as default launch card.

Mandatory divergence from prototype:

- No direct import or copy of prototype HTML/CSS/JS.
- Runtime JSON loading must be implemented for Case Studies and MOD-W.

---

## 8. Acceptance Checks

The Step is acceptable when:

1. The Angular starter content no longer renders.
2. A production portfolio shell renders at `/`.
3. Runtime JSON files exist under `public/content/`.
4. Case-study content is loaded from `/content/case-studies.json`.
5. MOD-W content is loaded from `/content/modw.json`.
6. Loading, empty, and error states exist for runtime content.
7. The implementation uses Angular standalone components, signals, and modern template control flow.
8. The implementation does not add a CV page, CV download link, contact form, backend, CMS, or multi-page routes.
9. Tests cover successful runtime content loading and fixture variants for failure/invalid-content paths.
10. `npm run build` passes.
11. Relevant unit/integration tests pass.
12. Relevant E2E starter test is replaced or updated so it no longer asserts Angular starter content.

---

## 9. Test Expectations

Minimum tests:

- Component/integration test that the portfolio shell renders.
- Content service test or integration test for successful case-study JSON loading.
- Content service test or integration test for successful MOD-W JSON loading.
- Test fixture coverage for valid, empty, malformed, and failed-load runtime content behavior.
- E2E smoke test that `/` renders the production shell and not the Angular starter page.

Follow selector guidance in `mod-w/TESTING.md`.

---

## 10. Build Gate

Development Team must run:

```bash
npm run build
npm test
npm run test:e2e
```

If `npm run test:e2e` cannot run because of local browser/dev-server constraints, document the blocker and run the closest available verification.

---

## 11. Recommended Next Action

Moderator approves `STEP-01.md`, then assigns it to Claude Code Development Team for implementation.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
