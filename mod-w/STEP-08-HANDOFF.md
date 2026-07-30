# STEP-08 Development Team Handoff — Launch Validation

**Development Team interface:** Claude Code
**Step:** `mod-w/STEP-08.md`
**Status:** Ready for QA / Tech Lead re-check; three items below require Moderator decision before launch.

---

## 1. Launch Blockers Requiring Moderator Decision

None of these can be resolved by the Development Team per `STEP-08.md` §6 ("Do not invent legal text... Do not invent private project details") and §9 ("If final legal copy or Privacy Policy URL is not available, do not fake it. Document the blocker and keep the placeholder clearly marked."). No code changes are needed to resolve any of them beyond swapping in real values once approved — the app already handles both the placeholder and approved states correctly.

| # | Item | Status | What's needed |
|---|------|--------|----------------|
| 1 | Privacy Policy / Datenschutzerklärung URL | **BLOCKED** | No URL exists yet. The consent banner shows a clearly marked, non-clickable placeholder (`data-testid="analytics-consent-privacy-placeholder"`, text "Privacy Policy — link coming soon") instead of a dead link. Once a URL is approved, replace the placeholder `<p>` in `src/app/analytics/analytics-consent-banner/analytics-consent-banner.component.html` with a real `<a href>` and update the corresponding spec assertion. |
| 2 | Final consent-banner wording | **BLOCKED** | Current copy ("This site uses optional Google Analytics to understand portfolio usage. Nothing is tracked until you accept, and you can change your choice any time.") is the conservative placeholder wording from STEP-07's architecture guidance, not yet signed off as final/launch copy. Needs explicit Moderator approval, or German/bilingual wording if that's still the direction (`ARCHITECTURE.md` §15 open question). |
| 3 | GA4 property/account settings | **BLOCKED** | Advertising features, Google Signals, data sharing, and retention settings live in the GA4 account itself, outside this codebase, and must be confirmed by the Moderator directly in Google Analytics. The app code never enables these (`GoogleAnalyticsService` sends only `page_view` and the five approved custom events). |

---

## 2. Content / Legal / Analytics Changes Summary

- **Content review:** full scan of all user-facing content (`public/content/case-studies.json`, `public/content/modw.json`, `src/app/content/*.content.ts`, the consent banner, `src/index.html`, `README.md`) found no placeholder/lorem/TODO copy beyond the already-documented Privacy Policy placeholder above. No content changes were made — none were needed.
  - One non-blocking style observation, not fixed: `"Architecture walk-through available on request."` repeats verbatim across 4 professional-experience case studies (`mqtt-align`, `paki`, `travel-it`, `kaufland`). Reads as an intentional standard closer, not a defect — flagging for awareness only.
- **Analytics/privacy behavior:** unchanged from STEP-07. Re-verified this Step: no GA script in `src/index.html`, no GA script tag or tracking call fires before accepted consent, rejecting/withdrawing consent stops future tracking, the footer "Privacy / Cookie settings" control remains visible and keyboard-operable.
- **No SSR / server code was introduced.** `@angular/ssr` is not an app dependency; no `server.ts`, `main.server.ts`, `app.config.server.ts`, or `app.routes.server.ts` exist; `angular.json` has no server/prerender target; `src/app/app.routes.ts` remains an empty array.

---

## 3. Static Hosting Readiness

Full details are in `README.md` ("Deployment" section, added this Step). Summary:

- Target: InMotion Hosting shared hosting — static files only, no Node.js process, no SSR runtime.
- `npm run build` output verified to contain exactly: `index.html`, `favicon.ico`, `content/case-studies.json`, `content/modw.json`, one JS bundle, one CSS bundle. No server bundle.
- Verified against the same static-server setup used by `test:e2e` (`tools/static-server.mjs`, matching real static-host serving behavior): `/`, `/#work`, `/content/case-studies.json`, and `/content/modw.json` all resolve correctly (200 status, valid JSON).
- Anchor-only navigation (`#work`, `#modw`, `#about`, `#contact`) confirmed — no `.htaccess` SPA-fallback rewrite rule is needed, and none was added, per `STEP-08.md`'s "only if a concrete need is found" guidance.
- Root deployment (`https://www.frank-mcguire.com/`) assumed per `STEP-08.md` §7; no subdirectory `base href` change was made or is needed.

---

## 4. Manual Visual & Accessibility Review

Performed against a production build served through the same static-server path used in E2E (`node tools/static-server.mjs dist/frank-mcguire-portfolio/browser 4200`), using a headless-Chromium script. No console/page errors were observed in any check below. Screenshot evidence is committed under `mod-w/screenshots/step-08-*.png`.

### Desktop (1440×900) — `step-08-desktop-hero.png`
First-screen identity, positioning, CTAs, and availability strip all visible with no overlap. Nav pill "Home" correctly active by default. Consent banner renders as a bottom panel with equal-weight Accept/Reject controls; does not block interaction with the rest of the page (`pointer-events` scoped to the banner box only).

### Tablet (768×1000) — `step-08-tablet-hero.png`
Layout reflows correctly at the tablet breakpoint: availability strip wraps to two rows, gutters shrink appropriately, hero and consent banner both remain fully readable with no clipped text.

### Mobile (375×800) — `step-08-mobile-hero.png` and `step-08-mobile-menu-open.png`
Hero content stacks cleanly; hamburger nav toggle present. Mobile menu opens as a full-screen overlay with all five nav links, a close control, and the consent banner still visible/usable beneath it. Verified ≥44px touch targets carry over from STEP-06 (unchanged this Step).

### Footer / consent banner interplay — `step-08-desktop-footer-consent.png`
Contact section, profile links, and footer render correctly above the fixed consent banner. Note: while the banner is still showing (consent `unknown`), it can visually sit near/over the footer's "Cookie settings" link — not treated as an issue, since the banner itself already presents Accept/Reject at that point, and it hides once a decision is made, which un-obscures the footer control.

### Keyboard navigation and focus visibility — `step-08-consent-accept-focus.png`, `step-08-nav-link-focus.png`
Tab order from the skip link is correct and sequential: skip-link → Home/nav pills → nav Contact CTA → hero CTAs → case-study card links. Focus rings are clearly visible (teal outline, strong contrast against the dark background) on both the consent Accept button and nav links — confirmed with dedicated screenshots of each in a focused state.

### Reduced motion
Verified via Playwright's `reducedMotion: 'reduce'` emulation (also covered by the existing automated E2E test `reduced motion keeps hero, case-study, MOD-W, and contact content visible`): all content remains visible, no animation-dependent content, no console errors.

---

## 5. Final Test Results

```text
npm run build       → pass
npm run lint         → pass
npm test              → pass, 141/141 across 22 files
npm run test:e2e   → pass, 53/54 (1 documented WebKit-only skip: keyboard Tab order test,
                              WebKit does not include links in the default Tab order — a
                              platform behavior, not an app defect; carried since STEP-06)
```

No `mod-w/TESTING.md` changes were needed — no new selectors or test-state changes were introduced this Step.

---

## 6. Recommended Next Action

Tech Lead re-check, then QA pass, then Moderator decision on the three blockers in §1 before launch. Once those are resolved, the only remaining code change is swapping the Privacy Policy placeholder for a real link (and, if wording changes, updating the consent banner copy + its spec assertions) — no other launch work is anticipated.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
