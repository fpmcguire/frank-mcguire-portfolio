## QA — STEP-04

### Summary

Pass with notes

### Acceptance check results

| Check | Result | Notes |
|-------|--------|-------|
| 1. MOD-W rendering owned by a dedicated section component | Pass | `modw-section.component.ts` injects `ModwContentService`; `portfolio-page.component.html` is now just `<app-modw-section />`. |
| 2. Section fetches/receives runtime JSON from `/content/modw.json` | Pass | `ModwContentService` (unchanged since STEP-01) still owns the fetch; `modw-content.service.spec.ts` fixture updated to the new shape, all 4 load-state tests pass. |
| 3. Template does not hardcode principle/role/evidence counts or CTA labels/hrefs | Pass | `modw-section.component.html:22-47` uses `@for` over `content.principles/roles/projectEvidence`; CTAs at lines 49-64 bind `content.repositoryCta`/`consultingCta`. |
| 4. JSON contract validated before typed content exposed | Pass | `isModwContent` in `modw-content.model.ts:70-87` validates every new field including nested `ModwCta`/`ModwRole`/`ModwProjectEvidence`; `modw-content.model.spec.ts` covers 10 valid/invalid shape cases. |
| 5. Section renders title, summary, problem, core idea, principles, roles, project evidence, repository CTA, consulting CTA | Pass | All 9 present in `modw-section.component.html`, each with its own testid. |
| 6-8. Principle/role/evidence count and order driven by JSON | Pass | All three use `@for ... track .id` with no literal counts; `modw-section.component.spec.ts` asserts per-item testids and container child counts. |
| 9. Repository CTA opens in new tab with `rel="noopener"` | Pass | `modw-section.component.html:50-57` — `target="_blank" rel="noopener"`; verified in unit spec and e2e (`href` matches, `target="_blank"` attribute present). |
| 10. Consulting CTA points to `#contact` | Pass | `public/content/modw.json` `consultingCta.href` = `"#contact"`. |
| 11. Loading/empty/error states non-blank and source-safe | Pass | Unchanged copy pattern from STEP-01, now owned by `modw-section.component.html`; all 3 states covered in its spec. |
| 12. Approved terminology used | Pass | `public/content/modw.json` uses "human-in-the-loop," "AI-assisted development," "methodology"/"workflow," and "viable coding, not vibe coding" as a supplement, not the sole explanation — confirmed by direct read of the production JSON, not just the diff. |
| 13. No prohibited claims | Pass | `modw-content.production.spec.ts` loads the real `public/content/modw.json` via `node:fs` and asserts none of 7 banned phrases appear anywhere in the JSON text — independently re-read this file to confirm it targets the actual production file, not a fixture copy. |
| 14-16. STEP-01/02/03 behavior preserved | Pass | Service specs, nav/hero/engagement specs, case-studies-section/case-study-card specs all untouched and passing (49 of the 63 total unit tests belong to unchanged prior-Step files). |
| 17. No out-of-scope features added | Pass | No routes, CMS, backend, CV, or Contact/About content added; `#about`/`#contact` still empty placeholders. |
| 18. Test coverage matches requirements | Pass | 10 new modw-section tests + 10 model-validation tests + 2 production-content tests = 22 new tests, plus e2e coverage for roles/evidence/CTAs. |
| 19-21. Build/tests/e2e pass | Pass | All reran independently below. |

### Regressions or risks

None found. All STEP-01/02/03 tests pass unmodified. One environment note: a chained `npm run build && npm test && npm run lint` run segfaulted during Node's process teardown in the Dev Team's own build gate, but only *after* printing a clean 63/63 pass — an immediate standalone rerun (twice, independently, in this QA pass) was clean with no crash both times. Treating this as tooling/environment noise, not a code defect, consistent with the Firefox/WebKit connection-flake pattern already logged in prior Steps' QA notes.

### Manual checks required

- Visual review of the MOD-W panel (flat bordered box, not the chamfer treatment — a documented, permitted scope decision) against `DESIGN-SPEC.md` §3.9.
- Responsive check of the 2-column principles/roles/project-evidence grid collapsing to 1 column at 640px (`modw-section.component.scss`) — CSS is in place, not visually confirmed.
- Read-through of the new MOD-W copy (problem statement, core idea, role descriptions) for tone against `PRODUCT.md` §8.3 ("confident but not inflated... practical, not manifesto-heavy") — automated tests check for prohibited phrases, not overall tone.

### Known limitations

1. **Carried over from Tech Lead review, confirmed on independent read:** `modw-section.component.spec.ts` lines 75, 86, and 97 use CSS class selectors (`.principles > li`, `.roles > li`, `.project-evidence > li`) for the three count assertions, instead of testid-prefix selectors. Each test also asserts item-specific `data-testid`s, so this doesn't mask any gap the way the STEP-03 `work-card` issue did — it's a minor selector-convention inconsistency, not a coverage hole. Per QA rules, not fixing this myself (implementation files are Development Team's to edit); flagging for the optional future cleanup Tech Lead already suggested.
2. `modw-contact-cta` was retired in favor of `modw-consulting-cta` (explicitly permitted by `STEP-04.md` §9). No external consumers exist yet, so this is a clean break, not a risk.
3. `#about`/`#contact` remain empty anchor placeholders (unchanged since STEP-02) — expected until STEP-07/STEP-08.
4. `tsconfig.spec.json` gained `"node"` in its `types` array (test-only file, not `tsconfig.app.json`) to support the production-content safety spec reading the real JSON via `node:fs`. Verified this is scoped to test compilation only and does not affect the production bundle (production build output unchanged in size/behavior).

### Verification

- `npm run build` — pass (rerun independently for this QA pass).
- `npm test` — pass, 63/63 tests across 12 files (rerun independently for this QA pass, twice, no segfault on either run).
- `npm run test:e2e` — pass, 24/24 across chromium/firefox/webkit (rerun independently for this QA pass, no flake).

### Recommended next action

Proceed to Product Owner / Moderator acceptance validation for STEP-04. No blocking issues found.
