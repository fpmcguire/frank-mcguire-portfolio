# Roadmap - Frank McGuire Portfolio

**Status:** Approved through STEP-07 by Moderator on 2026-07-30
**Tech Lead:** Codex
**Architecture:** `mod-w/ARCHITECTURE.md`, updated for analytics scope on 2026-07-30

---

## Roadmap Principles

- Keep each Step small, coherent, and reviewable.
- Preserve the compact SPA scope.
- Follow the approved architecture and domain language.
- Implement the Editorial Left design direction without copying prototype code verbatim.
- Keep Case Studies and MOD-W content runtime-editable through JSON.
- Replace generated Angular starter code as soon as production shell work begins.
- Keep Google Analytics consent-gated and dependency-light.
- Do not let analytics work change the compact SPA structure or conversion content.

---

## Step Sequence

### STEP-01 - Production App Foundation and Runtime Content Contracts

Create the Angular production foundation:

- replace the generated starter page,
- establish app shell and portfolio page,
- add design tokens/base styles,
- add runtime JSON files for Case Studies and MOD-W as local/deployable UI content fixtures,
- add content models and loading services,
- add initial tests for content loading, fixture variants, and shell rendering.

Primary purpose: make the repo ready for production sections without implementing full visual fidelity.

### STEP-02 - Navigation, Hero, and Engagement Paths

Implement first-screen structure:

- sticky nav with anchor links,
- mobile menu,
- hero section,
- availability strip,
- engagement path tiles.

Primary purpose: satisfy first-screen clarity and equal full-time/freelance positioning.

### STEP-03 - Case Studies Runtime Section

Implement Case Studies from `/content/case-studies.json`:

- JSON-driven card count,
- classification/status display,
- loading/empty/error states,
- card links where approved.

Primary purpose: establish project evidence and source-safe classification.

### STEP-04 - MOD-W Runtime Section

Implement MOD-W section from `/content/modw.json`:

- runtime title, summary, CTAs, and principles,
- approved MOD-W terminology,
- prohibited-claim safeguards in tests.

Primary purpose: make MOD-W a major pillar without hardcoded copy.

### STEP-05 - About, Contact, and Footer

Implement remaining static sections:

- compact About narrative,
- full-time and freelance Contact paths,
- email, LinkedIn, GitHub links,
- footer attribution.

Primary purpose: complete the SPA content path and conversion points.

### STEP-06 - Visual Fidelity, Responsive Layout, and Accessibility Pass

Bring the implementation close to the approved Editorial Left design:

- responsive desktop/tablet/mobile layout,
- focus states,
- reduced-motion behavior,
- reveal-on-scroll progressive enhancement,
- background/ring/chamfer polish.

Primary purpose: align implementation with design intent and accessibility expectations.

### STEP-07 - Consent-Gated Google Analytics and GDPR Popup

Implement the approved analytics scope:

- add analytics config with approved measurement id `G-MD06T4XGJJ`,
- add consent state model and versioned local persistence,
- add German / EU GDPR-oriented consent popup,
- add visible privacy / cookie settings control,
- dynamically load and initialize Google Analytics only after accepted consent,
- track approved basic events where feasible,
- prevent future tracking after reject or withdrawal,
- add integration and E2E coverage for consent-gated behavior.

Primary purpose: collect basic usage analytics without tracking visitors before consent or compromising the portfolio experience.

### STEP-08 - Launch Validation and Content Review

Final validation Step:

- replace any placeholder copy,
- confirm privacy / consent wording and final Google Analytics account settings,
- verify source-safe claims,
- verify no analytics tracking occurs before consent,
- run build/test/E2E gates,
- perform manual visual and accessibility review,
- prepare for Tech Lead review, QA, Product Owner validation, and Moderator launch decision.

Primary purpose: prove the site is ready for release under MOD-W gates.

---

## Deferred Scope

Do not include these in first implementation:

- CV/resume page.
- downloadable CV/resume link.
- contact form or backend.
- CMS/admin interface.
- blog.
- multi-page routes.
- standalone Services page.
- custom analytics dashboard.
- non-consented analytics tracking.
- Google Analytics advertising features, Google Signals, or optional data sharing unless Moderator explicitly approves them.
- multilingual portfolio content beyond the analytics consent UI.

---

## Current Active Step

`STEP-01.md` is complete and tagged `mod-w-step-01`.

`STEP-02.md` is complete and tagged `mod-w-step-02`.

`STEP-03.md` is complete and tagged `mod-w-step-03`.

`STEP-04.md` is complete and tagged `mod-w-step-04`.

`STEP-05.md` is complete and tagged `mod-w-step-05`.

`STEP-06.md` is complete and tagged `mod-w-step-06`.

`STEP-07.md` is complete and tagged `mod-w-step-07`.

Next planned Step: `STEP-08.md` - Launch Validation and Content Review.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
