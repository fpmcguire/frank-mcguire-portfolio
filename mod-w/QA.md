## QA — STEP-02

### Summary

Pass with notes

### Acceptance check results

| Check | Result | Notes |
|-------|--------|-------|
| 1. Page renders a production nav component | Pass | `src/app/portfolio/portfolio-page.component.html:1` renders `<app-nav />`; `nav.component.html:1` renders `<nav data-testid="nav-primary">`. |
| 2. Nav uses anchor links, not page routes | Pass | `nav.model.ts:10-16` — all 5 `NAV_LINKS` are `#`-hrefs. `app.routes.ts` unchanged (`export const routes: Routes = [];`). |
| 3. Mobile menu can open and close through accessible controls | Pass | `nav.component.html:12-22` toggle has `aria-expanded`/`aria-controls`/dynamic `aria-label`; menu (`nav.component.html:25-39`) has a labelled close button and closes on link click. `nav.component.spec.ts` covers open/close/close-on-link-click; `e2e/portfolio.spec.ts:52-61` exercises the same flow in a real browser at mobile viewport. |
| 4. Hero renders name and Senior Frontend Engineer / Frontend Consultant positioning | Pass | `static-profile.content.ts` `HERO_CONTENT.name` = "Frank McGuire"; `lead` states "Senior Frontend Engineer and Frontend Consultant...". Rendered at `hero-section.component.html:6-7`. |
| 5. First-screen includes Angular, TypeScript, Germany/EU, full-time, freelance signals | Pass | `HERO_CONTENT.lead` names Angular/TypeScript/Vue/React; `availability` array includes Full-time, Freelance, and "Germany · Remote / EU" location. Verified in `hero-section.component.spec.ts` and `e2e/portfolio.spec.ts:27-41`. |
| 6. Availability strip renders full-time, freelance, location, stack, MOD-W authorship | Pass | `HERO_CONTENT.availability` has exactly these 5 entries (`static-profile.content.ts:24-30`), rendered via `@for` at `hero-section.component.html:18-25`. |
| 7. Engagement tiles render full-time/freelance/advisory with equal visual weight for full-time/freelance | Pass | `engagement-paths.content.ts` defines all 3; `engagement-section.component.html:6` applies the same `.tile` class to every tile — confirmed identical `className` for full-time vs. freelance in `engagement-section.component.spec.ts`. |
| 8. Standalone components, signals, modern template control flow | Pass | No `@NgModule`; `isMobileMenuOpen` is a `signal()`; templates use `@for`/`@if` only — no `*ngFor`/`*ngIf` found in new files. |
| 9. Existing Case Studies/MOD-W runtime behavior still works | Pass | `portfolio-page.component.html:7,42` sections unchanged apart from added `id` attributes; all 6 STEP-01 content-loading tests in `portfolio-page.component.spec.ts` still pass unmodified. |
| 10. No CV/resume, CV download, contact form, backend, CMS, or multi-page routes | Pass | Confirmed no new routes, forms, or backend calls; `#about`/`#contact` are empty anchor placeholders only (`portfolio-page.component.html:81-82`), not content sections. |
| 11. Tests cover nav, mobile menu, hero, engagement, preserved runtime content | Pass | `nav.component.spec.ts` (6 tests), `hero-section.component.spec.ts` (4 tests), `engagement-section.component.spec.ts` (2 tests), plus preserved/extended `portfolio-page.component.spec.ts` (9 tests, 6 original + 3 new). |
| 12. `npm run build` passes | Pass | Reran independently: production build succeeds. |
| 13. Relevant unit/integration tests pass | Pass | Reran independently: 31/31 tests across 7 files. |
| 14. Relevant E2E tests pass or blocker documented | Pass | See Verification — 17/18 on first independent run (1 Firefox connection-refused flake), 18/18 and 6/6 on isolated Firefox rerun. Same flake class already documented in `REVIEW.md`; not a code defect. |

### Regressions or risks

None found in application behavior. All 6 pre-existing STEP-01 tests in `portfolio-page.component.spec.ts` pass unmodified, and the STEP-01 e2e assertions (starter gone, Case Studies load, MOD-W loads) still pass. The only "failure" observed was the known local Playwright/dev-server connection flake on Firefox (see Verification), not a functional regression.

### Manual checks required

- Visual review against the Editorial Left prototype (`mod-w/prototype/index.html`) — component structure and testids are recreated per spec, but pixel-level fidelity is explicitly out of scope for STEP-02 and hasn't been visually compared.
- Keyboard-only pass through nav → mobile toggle → mobile menu → close, and tab order into the hero CTAs — automated tests click by testid/role but don't verify tab order.
- Screen reader spot-check of the hero eyebrow/availability strip and nav mobile toggle's dynamic `aria-label`/`aria-expanded`.
- Confirm the availability strip's "Open" wording for Full-time/Freelance is acceptable copy — `PRODUCT.md` §9.2 leaves "Available immediately" wording pending Moderator confirmation; this Step avoids that exact phrase and uses generic "Open," but the Moderator should confirm this reads as intended.

### Known limitations

1. Carried over from `REVIEW.md`/STEP-01: `work-card` generic vs. `work-card-{id}` specific selector convention gap in `mod-w/TESTING.md` — deferred to STEP-03 with the production Case Study cards.
2. Scroll-spy (active nav-link highlighting on scroll) is not implemented — explicitly deferrable per `STEP-02.md` §2, not a defect. `ARCHITECTURE.md` §5 recommends `activeSection` via `IntersectionObserver`; worth revisiting in a later Step.
3. `#about` and `#contact` are empty, unlabeled anchor targets (`portfolio-page.component.html:81-82`) — nav links to them scroll to an empty spot until STEP-07/STEP-08 add real content, per `STEP-02.md` §5's explicit instruction to add minimal anchor targets only.
4. The mobile menu does not repeat the "Get in touch" contact CTA (only the 5 nav links) — not required by `STEP-02.md`, just noting the asymmetry with desktop nav for future polish.
5. Local Playwright e2e runs intermittently hit `NS_ERROR_CONNECTION_REFUSED` on Firefox/WebKit against the `ng serve` dev server (one occurrence in this QA pass, two in the Tech Lead's review). Every occurrence has cleared on immediate rerun. Environmental/dev-server-timing flake, not an application defect — flagging in case it's worth stabilizing the `webServer` readiness check in `playwright.config.ts` in a later Step.

### Verification

- `npm run build` — pass (rerun independently for this QA pass).
- `npm test` — pass, 31/31 tests across 7 files (rerun independently for this QA pass).
- `npm run test:e2e` — 17/18 on first independent full run (1 Firefox `NS_ERROR_CONNECTION_REFUSED` on the anchor-nav test); isolated Firefox-only rerun passed 6/6. Consistent with the same flake class the Tech Lead documented in `REVIEW.md` (their first run: 6/6 chromium, Firefox/WebKit connection-refused; rerun: 18/18). No test failed twice.

### Recommended next action

Proceed to Product Owner / Moderator acceptance validation for STEP-02. No blocking issues found. Suggest the Moderator confirm the availability-strip "Open" wording per the manual-check note above.
