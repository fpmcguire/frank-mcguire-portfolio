## QA — STEP-03

### Summary

Pass with notes

### Acceptance check results

| Check | Result | Notes |
|-------|--------|-------|
| 1. Case Studies rendering owned by a dedicated section component | Pass | `case-studies-section.component.ts` injects `CaseStudiesContentService` and owns the `@switch` over load state; `portfolio-page.component.html:7` is now just `<app-case-studies-section />`. |
| 2. Individual cards rendered by a dedicated presentational card component | Pass | `case-study-card.component.ts` — `input.required<CaseStudy>()`, no injected services, no data fetching. |
| 3. Section fetches/receives runtime JSON from `/content/case-studies.json` | Pass | `CaseStudiesContentService` (unchanged from STEP-01) still owns the fetch; verified via `case-studies-content.service.spec.ts` (untouched, still passing). |
| 4. Template does not hardcode card count | Pass | `case-studies-section.component.html:16-20` uses `@for` over `caseStudiesContent.state().data`; `case-studies-section.component.spec.ts` asserts count via `[data-testid="work-card"]` length, not a literal number. |
| 5. Mandatory launch set represented, including Bio-Align | Pass | `public/content/case-studies.json` — confirmed `bio-align` entry present (personal-project / public-repository), plus mqtt-align, agv-fleet-simulator, angular-design-patterns, paki, travel-it, kaufland. |
| 6. Each JSON item renders one card in JSON order | Pass | `case-studies-section.component.spec.ts` "preserves JSON order when rendering cards" asserts host testid order matches source array order. |
| 7. Cards display title, project type, role, summary, classification, status, evidence, technologies | Pass | All 8 fields present in `case-study-card.component.html`; each covered by a distinct assertion in `case-study-card.component.spec.ts`. |
| 8. MOD-W relevance renders when present, omitted cleanly when absent | Pass | `@if (study.modwRelevance; as modwRelevance)` at `case-study-card.component.html:37`; both branches tested. |
| 9. Public links render only when href present | Pass | `@if (study.href; as href)` at `case-study-card.component.html:46`, `target="_blank" rel="noopener"`; both branches tested. |
| 10. Classification/status distinctions clear to visitors | Pass | `CASE_STUDY_CLASSIFICATION_LABELS`/`CASE_STUDY_STATUS_LABELS` in `case-study.model.ts` render human-readable text ("Private / Proprietary") instead of raw enum values ("private-proprietary") — TS `Record<Union, string>` makes the mapping exhaustive by construction. |
| 11. Loading/empty/error states remain non-blank and source-safe | Pass | Unchanged copy from STEP-01, now owned by `case-studies-section.component.html`; all 3 states covered in its spec. |
| 12. Generic `work-card` and item-specific `work-card-{id}` selectors both available | Pass (after Tech Lead round-trip) | Confirmed both are real, on two different elements of the same card: host `data-testid="work-card-{id}"` via Angular `host` binding, internal `<article data-testid="work-card">` at `case-study-card.component.html:3`. Independently re-verified by reading the current file, not just trusting the diff. |
| 13. Existing STEP-01 runtime loading tests still pass | Pass | `case-studies-content.service.spec.ts` and `modw-content.service.spec.ts` untouched and passing. |
| 14. Existing STEP-02 nav/hero/engagement behavior still works | Pass | `nav.component.spec.ts`, `hero-section.component.spec.ts` untouched and passing; e2e nav/mobile-menu tests still pass. |
| 15. Engagement heading no longer says "two" while rendering three paths | Pass | `engagement-section.component.html:2` now reads "Ways to work together." |
| 16. No routes, detail pages, CMS/admin, backend, CV, contact form added | Pass | Confirmed no new routes; `#about`/`#contact` remain empty anchor placeholders, unchanged from STEP-02. |
| 17. Tests cover count, mandatory presence, classification/status, evidence, links, load states, preserved nav/hero | Pass | 43 unit/integration tests across 9 files + 21 e2e tests. |
| 18. `npm run build` passes | Pass | Reran independently. |
| 19. Relevant unit/integration tests pass | Pass | Reran independently: 43/43. |
| 20. Relevant E2E tests pass | Pass | Reran independently: 21/21 across chromium/firefox/webkit, no flake this run. |

### Regressions or risks

None found. All STEP-01/STEP-02 tests pass unmodified in behavior (only the case-study detail assertions were relocated out of `portfolio-page.component.spec.ts` into the new dedicated specs, per this Step's explicit extraction goal — not a coverage loss, confirmed by reading both old and new spec files).

One process note, not a code regression: the first implementation pass shipped with only `work-card-{id}` and edited `mod-w/TESTING.md` to redefine the generic-selector requirement away instead of implementing it — correctly caught by Tech Lead review and fixed in the round-trip. Independently reconfirmed the fix is real (not just re-trusting the stated summary): read `case-study-card.component.html` directly and confirmed both `work-card` (literal, on `<article>`) and `work-card-{id}` (host binding) exist as separate attributes on separate elements.

### Manual checks required

- Visual review of the new card design against `DESIGN-SPEC.md` §3.7 (flat card, restrained borders) — structurally present, pixel fidelity not visually verified.
- Confirm Bio-Align's placeholder copy ("A personal project exploring frontend architecture and interface patterns for data-driven applications") is acceptable, or supply real source-safe copy — flagged again below.
- Responsive grid check (3/2/1 columns) at actual breakpoints — CSS is in place (`case-studies-section.component.scss`) but not visually confirmed at 980px/640px.

### Known limitations

1. **Bio-Align and Prismatic copy is conservative, generic placeholder text**, not sourced from real project details (no verified information was available). Flagged consistently since STEP-01 for AGV/Prismatic; now also applies to Bio-Align. Moderator should supply or approve final copy before public launch.
2. Cards omit the decorative numeric index (e.g. "01"/"02") seen in the prototype — not required by `STEP-03.md` §7 and explicitly within "visual polish beyond the production case-study card and grid needs of this Step" (out of scope).
3. `#about`/`#contact` remain empty anchor placeholders (STEP-02 carryover, unchanged this Step) — expected until STEP-07/STEP-08.
4. Local Playwright e2e has shown intermittent Firefox/WebKit `NS_ERROR_CONNECTION_REFUSED` flakes in prior Steps' QA passes; this run (21/21) had none, but it's an environmental pattern worth continuing to watch, not something this Step's code can fix.

### Verification

- `npm run build` — pass (rerun independently for this QA pass).
- `npm test` — pass, 43/43 tests across 9 files (rerun independently for this QA pass).
- `npm run test:e2e` — pass, 21/21 across chromium/firefox/webkit (rerun independently for this QA pass, no flake).

### Recommended next action

Proceed to Product Owner / Moderator acceptance validation for STEP-03. No blocking issues found. Suggest the Moderator review/approve the Bio-Align and Prismatic placeholder copy before public launch.
