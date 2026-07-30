# STEP-06 - Visual Fidelity, Responsive Layout, and Accessibility Pass

**Status:** Complete. Tech Lead review passed, QA passed, and Moderator approved QA on 2026-07-30. Tagged `mod-w-step-06`.  
**Development Team interface:** Claude Code  
**Tech Lead:** Codex  
**Architecture:** `mod-w/ARCHITECTURE.md`, approved by Moderator on 2026-07-29  
**Previous Step:** `STEP-05.md`, complete and tagged `mod-w-step-05`

---

## 1. Goal

Bring the implemented SPA close to the approved Editorial Left design direction and complete the first broad accessibility and responsive-layout pass.

This Step should refine the existing production sections without changing the product scope, content architecture, or visitor journey.

---

## 2. Scope

### In Scope

- Improve visual fidelity to the approved Editorial Left direction from `DESIGN-SPEC.md` and `mod-w/prototype/index.html`.
- Refine global background layers:
  - right-half radial bloom,
  - masked grid or equivalent low-cost technical texture,
  - decorative layers marked `aria-hidden="true"`.
- Polish section rhythm, gutters, max-widths, spacing, borders, card grids, and responsive breakpoints.
- Polish typography hierarchy across hero, section headings, cards, MOD-W, About, Contact, and Footer.
- Add or refine shared presentational primitives only if they reduce real duplication:
  - Section Header,
  - Chamfer Panel,
  - Reveal on Scroll directive,
  - shared button/card/chip styling helpers.
- Implement progressive-enhancement reveal-on-scroll behavior if it can be done without hiding content by default.
- Add or refine visible focus states for all interactive elements.
- Add or refine keyboard behavior for nav, mobile menu, CTAs, external links, and mailto links.
- Add or refine `prefers-reduced-motion` behavior:
  - no reveal animation,
  - no pulsing availability dot,
  - no smooth scroll.
- Ensure desktop, tablet, and mobile layouts match the compact SPA intent.
- Preserve source-safe copy, runtime JSON contracts, and existing test IDs.
- Add focused tests for any behavioral accessibility additions, such as scroll-spy, mobile-menu keyboard behavior, or reduced-motion visibility.
- Add E2E checks for reduced-motion visibility and basic keyboard navigation if practical.
- Update `mod-w/TESTING.md` Current Test State if test coverage or selectors change.

### Out of Scope

- New product content or rewritten positioning copy beyond small layout-safe copy adjustments.
- New sections.
- Multi-page routes or detail routes.
- Contact form.
- Backend API.
- CMS/admin UI.
- Blog/articles.
- Downloadable CV/resume link.
- Resume/CV page.
- Standalone Services page.
- Runtime JSON expansion for About, Contact, Footer, or visual settings.
- Analytics.
- SSR/prerender setup unless Moderator explicitly approves a scope change.
- Pixel-perfect copying of prototype HTML/CSS.
- Large dependency additions, CSS frameworks, Angular Material, charting, canvas, or 3D.

---

## 3. Requirements Mapping

Product requirements:

- FR1 - Clear positioning.
- FR2 - Equal conversion paths.
- FR3 - MOD-W as major pillar.
- FR4 - Case-study evidence.
- FR5 - Contact path.
- FR7 - Source-safe claims.
- FR8 - Recruiter scanning.
- FR9 - Engineering credibility.
- FR10 - External validation.
- FR11 - Compact SPA structure.
- NFR1 - Professional tone.
- NFR1a - Minimalist modern design.
- NFR2 - Accessibility.
- NFR3 - Performance.
- NFR4 - Mobile usability.
- NFR5 - Maintainability.
- NFR6 - Trustworthiness.
- NFR7 - MOD-W validation compatibility.

Product acceptance checks advanced by this Step:

- AC1 - First-screen clarity.
- AC2 - Equal full-time and freelance support.
- AC3 - MOD-W major pillar.
- AC5 - Case-study evidence.
- AC7 - Contact conversion.
- AC9 - Recruiter keyword visibility.
- AC10 - Engineering credibility.
- AC11 - Mobile and accessibility review.
- AC12 - No hidden scope.
- AC13 - Compact SPA acceptance.
- AC14 - Minimalist modern design acceptance.

This Step should substantially satisfy AC11 and AC14 while preserving the content/product checks already completed in STEP-01 through STEP-05.

Design references:

- `DESIGN-SPEC.md` section 1 - Visual Identity.
- `DESIGN-SPEC.md` section 1.4a - Background & Atmosphere.
- `DESIGN-SPEC.md` section 2 - Accessibility Baseline.
- `DESIGN-SPEC.md` section 3 - Component Library.
- `DESIGN-SPEC.md` section 4 - Screen Layouts.
- `DESIGN-SPEC.md` section 5 - Interaction Patterns.
- `DESIGN-SPEC.md` section 8 - Product Owner Resolution for v1.
- `mod-w/prototype/index.html` - Editorial Left primary direction.
- `mod-w/prototype/styles.css` - visual and responsive reference.
- `mod-w/ARCHITECTURE-NOTES.md` sections 1, 2, 3, and 6.

Artifact note:

`DESIGN-SPEC.md` section 6 contains an older proposed component-to-Step mapping from before `ROADMAP.md` existed. Treat that mapping as historical. The approved `ROADMAP.md` sequence is authoritative for this Step.

---

## 4. Likely Affected Files

Expected production files:

```text
src/styles.scss
src/app/app.html
src/app/app.scss
src/app/portfolio/portfolio-page.component.*
src/app/portfolio/nav/*
src/app/portfolio/hero-section/*
src/app/portfolio/engagement-section/*
src/app/portfolio/case-studies-section/*
src/app/portfolio/case-study-card/*
src/app/portfolio/modw-section/*
src/app/portfolio/about-section/*
src/app/portfolio/contact-section/*
src/app/portfolio/footer/*
src/app/shared/*
src/app/portfolio/**/*.spec.ts
e2e/portfolio.spec.ts
mod-w/TESTING.md
```

The Development Team may adjust exact file names if the approved architecture, domain language, and test selectors remain intact.

---

## 5. Implementation Guidance

- Keep this Step a polish and accessibility Step, not a content or feature expansion Step.
- Use Angular v21 standalone components and modern template control flow.
- Do not add NgModules.
- Do not add Angular routes.
- Preserve the compact SPA section order:
  - Home / Hero,
  - Engagement Paths,
  - Case Studies,
  - MOD-W,
  - About,
  - Contact,
  - Footer.
- Preserve canonical section ids:
  - `top`,
  - `work`,
  - `modw`,
  - `about`,
  - `contact`.
- Preserve current runtime JSON contracts for Case Studies and MOD-W.
- Preserve current `data-testid` values unless a documented testing update is necessary.
- Keep components presentational unless they own local UI behavior.
- Prefer scoped SCSS and CSS custom properties over new abstractions.
- Prefer shared styling classes or tiny shared components only when they remove meaningful duplication.
- Use the approved dark token set from `DESIGN-SPEC.md`.
- Avoid one-off color values where an existing token is appropriate.
- Keep text readable on every viewport; no overlapping cards, clipped labels, or hidden copy.
- Avoid hiding content behind JavaScript initialization.
- Do not use opacity-zero-by-default reveal patterns.
- Do not use heavy animation, generic AI imagery, decorative SVG illustrations, canvas, or 3D.
- Ensure decorative background elements do not intercept pointer events.
- Keep the page usable if decorative background layers are removed or fail to render.

---

## 6. Visual Requirements

Global page treatment:

- Use the near-black background and restrained teal accent from the design spec.
- Add fixed decorative background layers behind content:
  - a right-half radial bloom,
  - a subtle grid or equivalent technical texture.
- Ensure background layers are decorative, non-interactive, and hidden from assistive technology.
- Keep content above decorative layers with a predictable stacking model.
- Keep the left and center reading columns high-contrast.

Layout:

- Use a max-width near the approved `1200px` content width.
- Use responsive gutters:
  - desktop around `40px`,
  - tablet around `28px`,
  - mobile around `20px`.
- Use consistent section rhythm.
- Keep section top borders restrained and aligned with the dark visual system.
- Use the approved breakpoints as guidance:
  - desktop above `980px`,
  - tablet at or below `980px`,
  - mobile at or below `640px`.

Hero:

- Preserve Editorial Left as the primary hero direction.
- Keep Frank McGuire as the only `h1`.
- Keep identity, positioning, CTAs, and availability strip visible in the first screen.
- Add or refine the right-offset local bloom/ring treatment without obstructing content.
- Ensure the hero does not become a generic centered landing-page composition.

Nav:

- Keep nav sticky and compact.
- Preserve desktop pill navigation and mobile overlay behavior.
- Add active-section styling if implemented through a lightweight IntersectionObserver or equivalent.
- Keep nav links and contact CTA keyboard reachable.
- Ensure mobile menu controls have at least a 44px hit target.

Cards and panels:

- Refine card, engagement path, contact path, and case-study surfaces with restrained borders, hover/focus states, and stable spacing.
- Use amber only for proprietary/status semantics.
- Use chamfered treatment deliberately, primarily for MOD-W and any approved shared chamfer panel.
- Do not wrap cards inside decorative cards.
- Keep grids stable:
  - Case Studies 3-up to 2-up to 1-up,
  - Engagement 3-up to stacked,
  - Contact 2-up to stacked.

Typography:

- Preserve the approved display/body/mono type roles.
- Keep mono labels uppercase and small.
- Do not use faint text for body copy.
- Keep line lengths readable.
- Preserve `DOMAIN_LANGUAGE.md` non-breaking MOD-W rendering.

---

## 7. Accessibility Requirements

Semantic structure:

- Preserve semantic `nav`, `main`, `section`, and `footer`.
- Preserve the skip link and ensure it moves focus to useful page content.
- Preserve one `h1`.
- Keep headings sequential and scannable.

Focus and keyboard:

- Every interactive element must have a visible `:focus-visible` state.
- Focus state must be visible on:
  - desktop nav links,
  - mobile menu toggle,
  - mobile menu close button,
  - mobile menu links,
  - hero CTAs,
  - Case Study external links,
  - MOD-W CTAs,
  - Contact CTAs,
  - profile links.
- Mobile menu must remain keyboard operable.
- Mobile menu must close through:
  - explicit close button,
  - section-link activation.
- Do not introduce hover-only information.

Reduced motion:

- Respect `prefers-reduced-motion: reduce`.
- Disable reveal transitions under reduced motion.
- Disable availability-dot pulse under reduced motion.
- Disable smooth scrolling under reduced motion.
- Content must remain visible under reduced motion.

Decorative elements:

- Decorative background/ring layers must use `aria-hidden="true"` when represented in markup.
- Decorative layers must not receive focus.
- Decorative layers must not interfere with text contrast.

Responsive accessibility:

- All text must fit its container at mobile and desktop widths.
- Touch targets should be at least 44px where practical.
- Mobile menu content must not overlap the close button.
- Sticky nav must not obscure anchor targets; use `scroll-padding-top` or equivalent.

---

## 8. Reveal on Scroll Requirements

If reveal-on-scroll is implemented in this Step:

- Use a small `RevealOnScrollDirective` or similarly scoped helper.
- Use one IntersectionObserver pattern rather than per-frame scroll work.
- Content must be visible by default before JavaScript runs.
- JavaScript may opt elements into reveal animation after initialization.
- The directive must mark content as revealed immediately when reduced motion is active.
- The directive must not create blank sections in:
  - no-JS contexts,
  - pre-hydration,
  - test environments,
  - static screenshots.
- Do not make reveal animation required for understanding content.

If reveal-on-scroll is deferred:

- Document the deferral in the Development Team notes.
- Still complete reduced-motion and focus-state requirements.

---

## 9. Test IDs

Preserve existing selectors from `TESTING.md`.

New selectors are optional and should be added only when needed for stable behavioral tests. If added, update `mod-w/TESTING.md` in the same Step.

Possible new selectors:

```text
page-background
page-background-glow
page-background-grid
nav-link-{section}-active
```

Do not rename current selectors only to match prototype naming. `DOMAIN_LANGUAGE.md` and `TESTING.md` remain authoritative.

---

## 10. Acceptance Checks

The Step is acceptable when:

1. The site remains a compact single-page Angular SPA with no new routes.
2. The page preserves the section order and canonical anchor ids.
3. The page visually aligns more closely with the approved Editorial Left design direction.
4. Global background/ring/grid treatment is present, restrained, decorative, and non-interactive.
5. Background layers are hidden from assistive technology when represented in markup.
6. Desktop layout is reviewed at a wide viewport around 1280px or larger.
7. Tablet layout is reviewed at a viewport around 768px to 980px.
8. Mobile layout is reviewed at a viewport around 375px to 430px.
9. Case Study grid reflows from desktop multi-column to mobile single-column without overlap.
10. Engagement and Contact paths preserve equal full-time and freelance prominence across breakpoints.
11. Hero first-screen content remains visible and readable on mobile and desktop.
12. Sticky nav does not hide anchor targets after navigation.
13. Mobile menu remains keyboard operable and closes via close button and link activation.
14. Every interactive element has a visible focus state.
15. Reduced-motion mode keeps all content visible and suppresses non-essential animation.
16. Reveal-on-scroll, if implemented, is progressive enhancement and does not hide content by default.
17. No hover-only information is introduced.
18. Text contrast remains acceptable; faint text is not used for body copy.
19. Existing runtime JSON loading, empty, and error behavior still works.
20. Existing source-safe MOD-W and proprietary-project wording is preserved.
21. No contact form, backend, CMS, CV page, CV download link, blog, analytics, or standalone Services page is added.
22. Tests cover any new behavioral accessibility logic introduced in the Step.
23. E2E includes at least one reduced-motion visibility check or documents why it was covered manually instead.
24. E2E includes basic keyboard/mobile-menu coverage or preserves existing coverage with documented rationale.
25. `mod-w/TESTING.md` is updated if test state or selector conventions change.
26. `npm run build` passes.
27. `npm test` passes.
28. `npm run test:e2e` passes or a blocker is documented with closest available verification.
29. Manual visual review notes are recorded by the Development Team or QA for desktop, tablet, and mobile.
30. Manual accessibility review notes are recorded by the Development Team or QA for keyboard navigation, focus visibility, reduced motion, and readable text.

---

## 11. Test Expectations

Minimum automated tests:

- Preserve all existing unit, integration, and E2E tests from STEP-01 through STEP-05.
- Add component/integration tests only for behavior introduced in this Step, not for pure styling.
- If active nav state is implemented, test that the active section state can mark the expected nav link.
- If reveal-on-scroll is implemented, test that content is not hidden before activation and remains visible under reduced motion.
- If background layers are represented in Angular markup, test they are decorative and `aria-hidden`.
- Add or preserve E2E coverage that:
  - mobile menu opens and closes,
  - keyboard navigation reaches primary controls,
  - reduced-motion mode does not hide page content.

Manual review is required for:

- visual alignment to the Editorial Left prototype,
- desktop/tablet/mobile spacing,
- hover and focus polish,
- contrast and readability,
- reduced-motion behavior,
- no overlap or clipping across key viewports.

Do not write brittle tests for exact CSS colors, pixel positions, transition timings, or hover-only visual changes unless a real regression risk justifies it.

---

## 12. Build Gate

Development Team must run:

```bash
npm run build
npm test
npm run test:e2e
```

`npm run test:e2e` now builds first and serves the production build through `tools/static-server.mjs`. Treat this as the preferred local and CI E2E path for this static SPA.

If a local browser or OS permission issue prevents E2E execution, document:

- exact command,
- exact error,
- closest successful verification,
- whether CI is expected to cover the missing gate.

---

## 13. Carryover Notes

- STEP-07 owns final launch validation and content review.
- STEP-07 should verify final copy, source-safe claims, public URLs, and launch readiness.
- Font self-hosting is a performance improvement candidate. Include it in STEP-06 only if it stays small and does not distract from layout/accessibility polish.
- SSR/prerender remains out of scope unless Moderator approves a scope change.
- The `angular-design-patterns` content consistency note from QA remains a Moderator/Product content decision, not a STEP-06 visual polish requirement.
- Playwright CI was updated after STEP-05 to test the production build through a static server. Preserve that setup unless a better static deployment-equivalent path is introduced.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
