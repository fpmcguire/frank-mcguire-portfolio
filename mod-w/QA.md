## QA — STEP-01

### Summary

Pass with notes

### Acceptance check results

| Check | Result | Notes |
|-------|--------|-------|
| 1. Angular starter content no longer renders | Pass | `src/app/app.html:1-3` hosts only the skip link, `<app-portfolio-page />`, and `<router-outlet />`. `src/app/app.spec.ts` asserts `Congratulations! Your app is running.` is absent; `e2e/portfolio.spec.ts:3-10` asserts the same at `/`. |
| 2. Production portfolio shell renders at `/` | Pass | `src/app/portfolio/portfolio-page.component.html:1` renders `<main data-testid="portfolio-page">`; confirmed by `app.spec.ts` and `e2e/portfolio.spec.ts`. |
| 3. Runtime JSON files exist under `public/content/` | Pass | `public/content/case-studies.json` (7 entries) and `public/content/modw.json` (4 principles) both present and valid JSON. |
| 4. Case-study content loaded from `/content/case-studies.json` | Pass | `src/app/content/case-studies-content.service.ts` fetches `/content/case-studies.json` via `HttpClient` in the constructor and exposes a `state` signal. |
| 5. MOD-W content loaded from `/content/modw.json` | Pass | `src/app/content/modw-content.service.ts` fetches `/content/modw.json` the same way. |
| 6. Loading, empty, and error states exist for runtime content | Pass | `ContentLoadState<T>` (`content-load-state.model.ts`) is a 4-state discriminated union; `portfolio-page.component.html` branches on `status` via `@switch` for both sections with distinct `data-testid`s (`work-cards-loading/-empty/-error`, `modw-loading/-empty/-error`). |
| 7. Standalone components, signals, modern template control flow | Pass | No `@NgModule`; `PortfolioPageComponent`/`App` are standalone; `state` is a `signal()`; template uses `@switch`, `@case`, `@for`, `@if` exclusively — no `*ngIf`/`*ngFor` found in the changed files. |
| 8. No CV page, CV download, contact form, backend, CMS, or multi-page routes | Pass | `src/app/app.routes.ts` is unchanged (`export const routes: Routes = [];`). No new routes, forms, or backend calls beyond the two static JSON fetches. |
| 9. Tests cover successful loading and fixture variants (valid/empty/malformed/failed) | Pass | `case-studies-content.service.spec.ts` and `modw-content.service.spec.ts` each cover ready/empty/malformed/failed-request cases (4 tests each). `portfolio-page.component.spec.ts` covers ready/empty/error rendering plus principle and CTA rendering. |
| 10. `npm run build` passes | Pass | Reran independently: production build succeeds, no errors. |
| 11. Relevant unit/integration tests pass | Pass | Reran independently: 16/16 tests pass across 4 spec files. |
| 12. E2E starter test replaced and no longer asserts starter content | Pass | `e2e/example.spec.ts` deleted; `e2e/portfolio.spec.ts` added. Not rerun independently in this QA pass — see Verification note below. |

### Regressions or risks

None identified. This is the first production Step; there is no prior production behavior to regress. No changes were made outside `STEP-01.md`'s listed file areas.

### Manual checks required

- Full `npm run test:e2e` rerun (3 browsers) — already passed 9/9 in both the Dev Team build gate and the Tech Lead review (`REVIEW.md`); not rerun a third time in this QA pass to avoid a ~6 minute duplicate run. Recommend a final confirmation run before merge if the Moderator wants independent QA execution rather than citation.
- Mobile/responsive visual review — no viewport-specific behavior exists yet (single unstyled shell), so nothing to check visually until a later Step adds layout.
- Keyboard navigation and screen-reader pass — skip link, headings, and landmarks exist, but there is no interactive nav/menu yet to exercise.
- `prefers-reduced-motion` behavior — reset rule is in place (`src/styles.scss`) but there is no animation yet to verify against.

### Known limitations

1. Carried over from `REVIEW.md`: case-study cards use only item-specific `data-testid`s (`work-card-{id}`) with no shared generic `work-card` selector, while `mod-w/TESTING.md` documents both patterns. Not a defect for STEP-01; flagged for STEP-03 when the production card component is built.
2. The MOD-W section's `<h2 id="modw-heading">` only renders in the `ready` case (`portfolio-page.component.html:52`) — while loading/empty/error, the section has no heading element. No user-facing defect (there's no content to head), but worth a look when the section gets its final markup.
3. `modw-contact-cta` links to `#contact` (`public/content/modw.json`), which does not resolve to anything yet since the Contact section doesn't exist until a later Step. Expected given STEP-01 scope, not a defect — flagging so it isn't mistaken for a broken link later.
4. `CaseStudy.evidence` and `CaseStudy.technologies` are validated and loaded but not yet rendered in the minimal card markup (only title, summary, classification, and status show). Consistent with STEP-01's "not final card design" scope, but a later Step needs to surface these fields to fully satisfy `PRODUCT.md`'s case-study evidence requirements.
5. `mod-w/TESTING.md` specifies Angular Testing Library as the primary integration-test tool; it isn't installed, so tests use `TestBed` + `data-testid` queries instead. Functionally equivalent coverage — flagged by Dev Team, carried here for visibility.

### Verification

- `npm run build` — pass (rerun independently for this QA pass).
- `npm test` — pass, 16/16 tests across 4 files (rerun independently for this QA pass).
- `npm run test:e2e` — not rerun independently; citing two prior clean runs (Dev Team build gate: 9/9; Tech Lead review: 9/9 on rerun after one flaky Firefox connection failure on first attempt).

### Recommended next action

Proceed to Product Owner / Moderator acceptance validation for STEP-01. No blocking issues found.
