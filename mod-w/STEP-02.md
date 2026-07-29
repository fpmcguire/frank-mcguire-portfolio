# STEP-02 - Navigation, Hero, and Engagement Paths

**Status:** Approved by Moderator on 2026-07-29  
**Development Team interface:** Claude Code  
**Tech Lead:** Codex  
**Architecture:** `mod-w/ARCHITECTURE.md`, approved by Moderator on 2026-07-29  
**Previous Step:** `STEP-01.md`, complete and tagged `mod-w-step-01`

---

## 1. Goal

Implement the first-screen portfolio structure: navigation, hero, availability strip, and engagement path tiles.

This Step should make the page immediately communicate Frank McGuire's identity, senior frontend positioning, Angular/TypeScript focus, Germany/EU signal, and equal full-time/freelance opportunity paths.

---

## 2. Scope

### In Scope

- Add a production navigation component.
- Add anchor navigation for the compact SPA.
- Add mobile menu open/close behavior.
- Add a hero section based on the Editorial Left prototype direction.
- Add an availability strip.
- Add engagement path tiles for:
  - full-time
  - freelance
  - advisory
- Add typed static content/config for hero, nav, availability, and engagement paths.
- Use Angular v21 standalone components, signals, computed signals where useful, and modern template control flow.
- Preserve the STEP-01 runtime Case Studies and MOD-W foundation.
- Add or update tests for nav, hero, mobile menu, and engagement path rendering.

### Out of Scope

- Final Case Study card design.
- Final MOD-W section design.
- About section final content.
- Contact section final content.
- Footer implementation.
- Full Editorial Left pixel-level fidelity.
- Reveal-on-scroll animation.
- Scroll-spy active-section behavior if it would make the Step too large.
- CV/resume page.
- CV/resume download link.
- Contact form or backend.
- Multi-page routes.

---

## 3. Requirements Mapping

Product requirements:

- FR1 - Clear positioning.
- FR2 - Equal conversion paths.
- FR5 - Contact path.
- FR8 - Recruiter scanning.
- FR11 - Compact SPA structure.
- NFR1 - Professional tone.
- NFR1a - Minimalist modern design.
- NFR2 - Accessibility.
- NFR4 - Mobile usability.
- NFR5 - Maintainability.

Product acceptance checks advanced by this Step:

- AC1 - First-screen clarity.
- AC2 - Equal full-time and freelance support.
- AC7 - Contact conversion.
- AC9 - Recruiter keyword visibility.
- AC11 - Mobile and accessibility review.
- AC12 - No hidden scope.
- AC13 - Compact SPA acceptance.
- AC14 - Minimalist modern design acceptance.

This Step should substantially satisfy AC1 and AC2. Later Contact, Case Studies, MOD-W, and final visual polish Steps complete the broader acceptance set.

Design references:

- `DESIGN-SPEC.md` section 1 - Visual Identity.
- `DESIGN-SPEC.md` section 2 - Accessibility Baseline.
- `DESIGN-SPEC.md` section 3.1 - Top Nav.
- `DESIGN-SPEC.md` section 3.2 - Button.
- `DESIGN-SPEC.md` section 3.6 - Value Tile.
- `DESIGN-SPEC.md` section 4 - Screen Layouts.
- `mod-w/prototype/index.html` - Editorial Left primary direction.
- `mod-w/prototype/styles.css` - token and component reference.

No formal Design IDs are present in `DESIGN-SPEC.md`.

---

## 4. Likely Affected Files

Expected production files:

```text
src/app/portfolio/portfolio-page.component.*
src/app/portfolio/nav/*
src/app/portfolio/hero-section/*
src/app/portfolio/engagement-section/*
src/app/content/static-profile.content.ts
src/app/content/engagement-paths.content.ts
src/app/content/nav.model.ts
src/app/content/engagement-path.model.ts
src/styles.scss
src/app/app.spec.ts
src/app/portfolio/**/*.spec.ts
e2e/portfolio.spec.ts
mod-w/TESTING.md
```

The Development Team may adjust exact file names if the approved architecture and domain language remain intact.

---

## 5. Implementation Guidance

- Keep this Step focused on first-screen and engagement-path behavior.
- Recreate the Editorial Left direction using Angular components; do not copy prototype code directly.
- Use typed static content/config for nav, hero copy, availability strip, and engagement paths.
- Use `as const`, `satisfies`, `readonly`, literal unions, and named domain types.
- Avoid TypeScript `enum`.
- Use `@for`, `@if`, and `@empty`; do not use `*ngFor` or `*ngIf`.
- Use signals for mobile menu state.
- Keep nav links as anchor links, not Angular routes.
- The canonical section ids remain:
  - `top`
  - `work`
  - `modw`
  - `about`
  - `contact`
- If About or Contact final sections are not implemented yet, add only minimal valid anchor targets or document why those nav links are deferred. Do not implement final About/Contact content in this Step.
- Preserve existing Case Studies and MOD-W runtime JSON loading behavior from STEP-01.
- Use source-safe wording. Do not use exact "available immediately" language.
- Use the public email only if a visible contact link appears: `fpmcguire@gmail.com`.

Recommended nav labels:

```text
Home
Case Studies
MOD-W
About
Contact
```

The prototype uses "Work"; prefer "Case Studies" unless Moderator explicitly chooses the shorter label.

---

## 6. Content Requirements

Hero must include:

- Frank McGuire.
- Senior Frontend Engineer / Frontend Consultant positioning.
- Germany-based or Wuppertal, Germany signal.
- Angular and TypeScript focus.
- Vue and React supporting credibility.
- Equal full-time and freelance availability signal.
- Primary CTA toward contact or case studies.
- Secondary CTA toward MOD-W or case studies.

Availability strip should include:

- Full-time path.
- Freelance path.
- Location / remote-EU signal.
- Stack signal.
- MOD-W authorship signal.

Engagement paths should include:

- Full-time: Senior Frontend Engineer.
- Freelance: Frontend Consultant.
- Advisory: MOD-W training / consulting / setup support.

Do not add detailed Services content or a standalone Services section.

---

## 7. Reference Implementation Disposition

Prototype files reviewed:

- `mod-w/prototype/index.html`
- `mod-w/prototype/styles.css`
- `mod-w/prototype/app.js`
- `mod-w/screenshots/editorial-left-hero.png`

Disposition: **Adopt with modifications**.

Accepted prototype assumptions:

- Editorial Left is the primary hero direction.
- Sticky top nav and mobile menu are appropriate.
- Hero should use left-aligned identity with restrained dark visual treatment.
- Availability strip supports equal full-time/freelance positioning.
- Engagement path tiles belong directly after the hero.

Modified prototype assumptions:

- Production nav label should prefer "Case Studies" over "Work" unless Moderator chooses otherwise.
- Production copy must come from source-safe typed content, not lorem ipsum.
- Production implementation uses Angular signals and modern template flow.
- Final visual polish can continue in STEP-06.

Rejected prototype assumptions:

- Prototype direction switcher.
- Prototype placeholder/lorem copy.
- Direct prototype HTML/CSS/JS copy.

Mandatory divergence from prototype:

- Do not import prototype JS for mobile menu or nav behavior.
- Do not use prototype contact email if any contact link appears.
- Do not add final About/Contact content in this Step.

---

## 8. Acceptance Checks

The Step is acceptable when:

1. The page renders a production nav component.
2. Nav uses anchor links, not page routes.
3. Mobile menu can open and close through accessible controls.
4. Hero renders Frank McGuire's name and Senior Frontend Engineer / Frontend Consultant positioning.
5. Hero or first-screen content includes Angular, TypeScript, Germany/EU, full-time, and freelance signals.
6. Availability strip renders full-time, freelance, location, stack, and MOD-W authorship signals.
7. Engagement path tiles render full-time, freelance, and advisory paths with equal visual weight for full-time and freelance.
8. The implementation uses Angular standalone components, signals, and modern template control flow.
9. Existing Case Studies and MOD-W runtime JSON behavior from STEP-01 still works.
10. The implementation does not add CV/resume page, CV download link, contact form, backend, CMS, or multi-page routes.
11. Tests cover nav rendering, mobile menu behavior, hero content, engagement path rendering, and preserved STEP-01 runtime content behavior.
12. `npm run build` passes.
13. Relevant unit/integration tests pass.
14. Relevant E2E tests pass or a blocker is documented with closest available verification.

---

## 9. Test Expectations

Minimum tests:

- Component/integration test that nav renders required labels.
- Component/integration test that mobile menu opens and closes.
- Component/integration test that hero renders required first-screen identity and positioning terms.
- Component/integration test that engagement paths include full-time, freelance, and advisory.
- E2E smoke test for first-screen clarity.
- E2E or integration coverage that STEP-01 runtime Case Studies and MOD-W content still loads.

Update `mod-w/TESTING.md` Current Test State in this Step.

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

## 11. Carryover Notes From STEP-01

The following are not STEP-02 blockers, but Development Team should avoid making them worse:

- `mod-w/TESTING.md` defines both generic `work-card` and item-specific `work-card-{id}` selectors. Full cleanup is expected in STEP-03 when production Case Study cards are implemented.
- `modw-contact-cta` currently links to `#contact`, but Contact final content is not implemented yet.
- Final Case Study evidence rendering is deferred to STEP-03.
- Final MOD-W section markup is deferred to STEP-04.

---

## 12. Recommended Next Action

Claude Code Development Team proceeds with implementation.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
