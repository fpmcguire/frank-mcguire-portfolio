## QA — STEP-05

### Summary

Pass with notes

### Acceptance check results

| Check | Result | Notes |
|-------|--------|-------|
| 1. `PortfolioPageComponent` composes real About, Contact, Footer | Pass | `portfolio-page.component.html:11-15` — `<app-about-section />`, `<app-contact-section />` inside `<main>`, `<app-footer />` as a sibling after `</main>`. |
| 2. Placeholder `#about`/`#contact` divs removed | Pass | Confirmed by direct read — no `<div id="about">`/`<div id="contact">` remain; both ids now belong to real `<section>` elements. |
| 3. About uses canonical id `about` + `data-testid="about-section"` | Pass | `about-section.component.html:1`. |
| 4. Contact uses canonical id `contact` + `data-testid="contact-section"` | Pass | `contact-section.component.html:1`. |
| 5. Footer uses semantic `footer` + `data-testid="footer"` | Pass | `footer.component.html:1`. |
| 6. About copy compact, source-safe, not a chronological CV | Pass | `about.content.ts` — 3 narrative paragraphs + 4 meta rows, no dated employment history. |
| 7. About includes senior frontend, Germany, Angular/TypeScript, Vue/Nuxt/React, domains, mentoring/teaching, MOD-W | Pass | Verified by direct read of `about.content.ts` narrative — all signals present in paragraph 1 (stack/domains/Germany) and paragraphs 2-3 (teaching, MOD-W). |
| 8. Contact renders equal full-time/freelance paths | Pass | `contact-section.component.spec.ts:24-33` asserts identical `className` on both path tiles. |
| 9. Contact uses `fpmcguire@gmail.com` | Pass | `contact.content.ts` `EMAIL` const; used for both the visible profile link and every mailto CTA via `buildMailtoHref`. |
| 10. LinkedIn and GitHub links included | Pass | `contact.content.ts` `profileLinks` array, 3 entries (email/linkedin/github). |
| 11. External profile links use `target="_blank"` `rel="noopener"` | Pass | `contact-section.component.html:27-28` binds these conditionally on `link.external`; unit spec confirms LinkedIn/GitHub get them and email does not. |
| 12. Contact CTAs use `mailto:` only | Pass | No `<form>`, no fetch/HTTP call in either component. |
| 13. No hidden out-of-scope features | Pass | No routes, backend, CMS, CV page/download, scheduling widget. |
| 14. Nav anchors for About/Contact reach real sections | Pass | `e2e/portfolio.spec.ts:96-109` clicks `nav-link-about`/`nav-link-contact` and asserts URL + section visibility. |
| 15. Prior-step behavior + non-breaking MOD-W rendering preserved | Pass | All STEP-01–04 specs untouched and passing (55 of 85 total tests belong to unchanged prior files); About narrative and Footer attribution both correctly render the U+2011 hyphen — independently verified the actual codepoint, not just the visual glyph, by reading `about-section.component.spec.ts` and `footer.component.spec.ts` source. |
| 16. Tests cover About/Contact/Footer/composition | Pass | 4 new unit spec files + `buildMailtoHref` unit tests + extended `portfolio-page.component.spec.ts`. |
| 17. E2E covers About/Contact anchors, Contact links, Footer | Pass | 3 new e2e tests, all passing. |
| 18. `TESTING.md` updated | Pass | New selector rows added, Current Test State table current. |
| 19-21. Build/tests/e2e pass | Pass | All reran independently below. |

### Regressions or risks

None found. All 55 pre-existing tests from STEP-01–04 pass unmodified. One item carried from Tech Lead review, confirmed accurate on independent read: `contact-section.component.spec.ts:44-59` checks LinkedIn/GitHub `target`/`rel` attributes but never asserts their actual `href` values against `CONTACT_CONTENT.profileLinks` — only the e2e suite locks in the real URLs. The implementation itself binds `[href]="link.href"` directly from content (`contact-section.component.html:26`), so there's no functional gap, just a unit-test coverage gap the Tech Lead correctly flagged as non-blocking. Per QA rules, not fixing this myself.

### Manual checks required

- Visual review of the Contact path tiles and profile-links row against `DESIGN-SPEC.md` §3.11/§3.12 — structurally present, pixel fidelity not visually confirmed.
- Actual mailto behavior in a real mail client (does the pre-filled subject/body render correctly) — automated tests confirm the `href` string is correctly percent-encoded, not the client-side mail-app rendering.
- Read-through of About/Contact copy tone against `PRODUCT.md` §8.3 and the neutral availability wording requirement — confirmed the exact approved string ("Available for relevant full-time and freelance conversations.") is used verbatim in `contact.content.ts`, but overall tone is a judgment call for the Moderator.

### Known limitations

1. **Carried over from Tech Lead review, confirmed on independent read:** `contact-section.component.spec.ts` doesn't assert LinkedIn/GitHub href values directly (only `target`/`rel`) — e2e coverage fills the gap. Optional future cleanup, not fixed here per QA scope (implementation/test files are Development Team's to edit).
2. `STEP-05.md` §3 cites "`DESIGN-SPEC.md` section 5 - Content Policy Decisions" — actual §5 is "Interaction Patterns"; the Development Team correctly used §8 instead and flagged the mis-citation in their summary. Confirmed this is a doc-accuracy issue in `STEP-05.md`, not a QA finding against the implementation.
3. No runtime JSON for About/Contact/Footer (static `const` content only) — this is explicit STEP-05 scope, not a gap, but means content updates require a rebuild rather than a JSON edit, unlike Case Studies/MOD-W.

### Verification

- `npm run build` — pass (rerun independently for this QA pass).
- `npm test` — pass, 85/85 tests across 17 files (rerun independently for this QA pass).
- `npm run test:e2e` — pass, 30/30 across chromium/firefox/webkit (rerun independently for this QA pass, no flake).

### Recommended next action

Proceed to Product Owner / Moderator acceptance validation for STEP-05. No blocking issues found.

---

## QA — Case Study Product/Repository Links & MOD-W Designer + Prototyper Role (ad-hoc, post-STEP-05)

This change was applied directly to the working tree (not through a numbered `STEP-XX.md`), amending `PRODUCT.md`, `ARCHITECTURE.md`, and `DOMAIN_LANGUAGE.md` themselves alongside the implementation. No `REVIEW.md` entry exists for it yet. QA here validates the implementation against the now-current governing docs and general test/code quality, in the same spirit as a Step QA pass.

### Summary

Pass with notes

### What changed

- `CaseStudy` gained two optional fields, `productUrl` and `repositoryUrl`, alongside the existing `href` (`case-study.model.ts`). `ARCHITECTURE.md` and `DOMAIN_LANGUAGE.md` were amended to document them as canonical fields.
- `CaseStudyCardComponent` now renders a distinct "View product" link and "GitHub repo" link when `productUrl`/`repositoryUrl` are present, falling back to the legacy single "View project" link only when neither is set (`case-study-card.component.html:48-86`) — matches the updated `ARCHITECTURE.md` wording exactly ("may render external anchors when `productUrl` or `repositoryUrl` is present, and a legacy single anchor when only `href` is present").
- `public/content/case-studies.json` now carries real `productUrl`/`repositoryUrl` values for `agv-fleet-simulator`, `bio-align`, `angular-design-patterns`, and `prismatic` (the site owner's own domains, not fabricated).
- MOD-W gained a sixth role, **Designer + Prototyper** ("Creates advisory prototypes, design specs, and UX direction before implementation"), added to `public/content/modw.json` `roles`, `DOMAIN_LANGUAGE.md` §3, and `PRODUCT.md`'s required role model list. `modw.json`'s `summary` and the `role-separation` principle's `summary` were also lightly reworded to mention "design/prototyping."

### Findings

#### Must fix now

None.

#### Could fix later

None found beyond what's already logged against STEP-05's `contact-section` spec (unrelated to this change).

### Verification against updated governing docs

| Check | Result | Notes |
|-------|--------|-------|
| `productUrl`/`repositoryUrl` validated before typed exposure | Pass | `isCaseStudy` in `case-study.model.ts` checks both are `undefined \| string`; production `case-studies.json` loads through the existing `CaseStudiesContentService` validation path unchanged. |
| Product/repository links open in a new tab with `rel="noopener"` | Pass | `case-study-card.component.html:51-72` — both anchors have `target="_blank" rel="noopener"`; verified in `case-study-card.component.spec.ts` ("renders product and repository links...") and independently in `e2e/portfolio.spec.ts:53-67` against the real Bio-Align URLs (`https://frank-mcguire.com/bio-align/`, `https://github.com/fpmcguire/bio-align`) — read both the JSON and the e2e assertions side by side to confirm they match. |
| Legacy `href` still works when product/repository absent | Pass | `case-study-card.component.spec.ts` "renders a public-proof link... when href is present" (unchanged test, still passing) plus the new "prefers specific product and repository links over the legacy generic href" test, which confirms the fallback `@if` condition is mutually exclusive, not additive. |
| No card renders duplicate/conflicting links | Pass | Confirmed by reading the template's three `@if` blocks: product and repository render independently when present; legacy `href` is explicitly gated on `!study.productUrl && !study.repositoryUrl`, so a card never shows all three. |
| Card count/order still JSON-driven, no hardcoding | Pass | `case-studies-section.component.html`/`.spec.ts` untouched by this change — still `@for` over service data. |
| Designer + Prototyper role renders with no hardcoded role count | Pass | `modw-section.component.html` already used `@for (role of content.roles; ...)` with no literal count (from STEP-04) — the new 6th role required a JSON-only change, exactly validating that STEP-04 acceptance check 7 ("role count and order driven by JSON") holds up under real content evolution. Confirmed via `modw-content.production.spec.ts`'s new "includes the Designer + Prototyper role" test and `e2e/portfolio.spec.ts:77` (`modw-role-designer-prototyper` visible). |
| MOD-W role-model docs stay in sync (`PRODUCT.md`, `DOMAIN_LANGUAGE.md`, `modw.json`) | Pass | All three read and cross-checked directly — role list, id, and label match across all three sources (`designer-prototyper` / "Designer + Prototyper"). |
| No prohibited MOD-W claims introduced by the reworded summary/principle text | Pass | `modw-content.production.spec.ts`'s existing prohibited-phrase test still passes against the reworded JSON; independently re-read the new summary and principle text — "design/prototyping" framing doesn't introduce automation/SaaS/guarantee language. |
| Prior Step behavior preserved | Pass | Full suite: 88/88 unit tests (up from 85 — 3 new: 2 case-study-card link tests + 1 modw role test), 33/33 e2e (up from 30 — 1 new product/repository link test + 2 pre-existing tests renumbered by line shift), all rerun independently for this QA pass. |

### Regressions or risks

None found. All pre-existing STEP-01–05 tests pass unmodified in behavior.

One content-consistency observation, not a code defect: `angular-design-patterns` is classified `open-source` / `public-repository` but only carries a `productUrl` (a showcase page), no `repositoryUrl` (the actual GitHub source) — the other three product-linked cards (`agv-fleet-simulator`, `bio-align`, `prismatic`) all have both. This renders correctly either way (the component doesn't require both), but for an "open-source" / "public-repository" card specifically, visitors may expect a direct repository link. Flagging for the Moderator to confirm this is intentional, not fix myself.

### Manual checks required

- Visual review of the two-link layout (`View product` / `GitHub repo`) on cards that have both, at narrow viewports — CSS (`case-study-card.component.scss` `.links`) uses `flex-wrap`, not visually confirmed.
- Confirm the four real `frank-mcguire.com`/`github.com/fpmcguire` URLs actually resolve and point to the intended projects — this is live external content QA can't verify from the repo alone.

### Known limitations

1. `angular-design-patterns` missing a `repositoryUrl` despite `open-source`/`public-repository` classification — see content-consistency note above; Moderator call, not a code defect.
2. This change bypassed the normal Step-authoring flow (edited `PRODUCT.md`/`ARCHITECTURE.md`/`DOMAIN_LANGUAGE.md` and the implementation directly, no `STEP-06.md`, no Tech Lead `REVIEW.md` entry). Not a QA finding against code quality, but noting for the record since `mod-w/prompts/qa.md` frames QA as validating "a completed Step" — this validation instead targets the diff directly against the now-current docs.

### Verification

- `npm run build` — pass (rerun independently for this QA pass).
- `npm test` — pass, 88/88 tests across 17 files (rerun independently for this QA pass).
- `npm run test:e2e` — pass, 33/33 across chromium/firefox/webkit (rerun independently for this QA pass, no flake).

### Recommended next action

No blocking issues. Suggest the Moderator: (1) confirm whether `angular-design-patterns` should also get a `repositoryUrl`, and (2) decide whether this change should be retroactively documented as a Step for the project history, given it modified `PRODUCT.md`/`ARCHITECTURE.md`/`DOMAIN_LANGUAGE.md` directly.
