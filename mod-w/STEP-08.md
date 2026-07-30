# STEP-08 - Launch Validation, Content Review, and Static Hosting Readiness

**Status:** Complete - approved by Moderator on 2026-07-31
**Development Team interface:** Claude Code
**Tech Lead:** Codex
**Architecture:** `mod-w/ARCHITECTURE.md`, updated for static InMotion shared-hosting scope on 2026-07-30
**Previous Step:** `STEP-07.md`, complete and tagged `mod-w-step-07`
**Tag:** `mod-w-step-08`

---

## 1. Goal

Prepare the portfolio for first public launch by validating final content, privacy / analytics consent readiness, static shared-hosting deployment readiness, accessibility, responsive behavior, source safety, and test gates.

This Step must not introduce major new product functionality. It is a launch hardening and verification Step.

The production hosting target is InMotion Hosting shared hosting, which does not support an Angular SSR Node.js runtime. The site must remain a static Angular SPA and deploy from the browser build output.

---

## 2. Angular SSR Check

Angular v21 does not require SSR by default for this project.

Official Angular guidance says:

- Angular applications are client-side rendered by default.
- Hybrid rendering / SSR is enabled by creating a project with `ng new --ssr` or adding SSR with `ng add @angular/ssr`.
- CSR is Angular's default rendering strategy.

Local repo check:

- `package.json` has no `@angular/ssr` dependency.
- `angular.json` uses `@angular/build:application` with `browser: "src/main.ts"` and no server entry.
- `src/app/app.routes.ts` is an empty route array.
- No `server.ts`, `src/main.server.ts`, `src/app/app.config.server.ts`, or `src/app/app.routes.server.ts` exists.
- `package-lock.json` mentions `@angular/ssr` only as an optional peer dependency of Angular tooling, not as an app dependency.

Conclusion for this Step: keep the app CSR/static. Do not add SSR, SSG/prerender routing, a Node server, or Angular server files.

---

## 3. Scope

### In Scope

- Replace remaining launch-blocking placeholder copy.
- Confirm final privacy / consent wording with Moderator.
- Replace the analytics consent Privacy Policy placeholder with an approved link if a URL is provided.
- Confirm Google Analytics account/property settings for launch.
- Confirm source-safe project, availability, and proprietary-work wording.
- Confirm static deployment output for InMotion shared hosting.
- Verify `dist/frank-mcguire-portfolio/browser/` contains the deployable site files.
- Verify runtime JSON files are present in the browser output.
- Add static-hosting deployment notes to README if needed.
- Add a `.htaccess` file only if a concrete static-hosting need is found and approved.
- Run build, unit/integration, and E2E gates.
- Perform manual desktop/tablet/mobile visual review.
- Perform manual keyboard/focus/reduced-motion accessibility review.
- Update `mod-w/TESTING.md` if any selectors, test commands, or verification state change.
- Produce implementation notes that QA and Moderator can use for launch decision.

### Out of Scope

- Angular SSR or Node.js server runtime.
- `@angular/ssr`, `@angular/platform-server`, server routes, `server.ts`, or `main.server.ts`.
- Multi-page Angular routes.
- Blog, CMS/admin, contact form, backend API, custom analytics dashboard, or GTM.
- New case-study detail pages or expanded project pages.
- CV/resume page or CV/resume download link.
- Legal drafting by the Development Team.
- Google Analytics advertising features, Google Signals, or optional data sharing unless Moderator explicitly approves them.
- Site-wide German translation.
- Major redesign or new visual concept.

---

## 4. Requirements Mapping

Product requirements:

- FR1 - Clear positioning.
- FR2 - Equal conversion paths.
- FR3 - MOD-W as major pillar.
- FR4 - Case-study evidence.
- FR5 - Contact path.
- FR6 - Project classification.
- FR7 - Source-safe claims.
- FR8 - Recruiter scanning.
- FR9 - Engineering credibility.
- FR10 - External validation.
- FR11 - Compact SPA structure.
- FR12 - Google Analytics tracking.
- FR13 - Consent-gated analytics.
- NFR2 - Accessibility.
- NFR3 - Performance.
- NFR4 - Mobile usability.
- NFR6 - Trustworthiness.
- NFR8 - Privacy and GDPR-aware behavior.

Product acceptance checks advanced by this Step:

- AC1 through AC17.

Architecture references:

- `ARCHITECTURE.md` section 3.1 - Application Shape.
- `ARCHITECTURE.md` section 7a - Analytics and Consent Configuration.
- `ARCHITECTURE.md` section 7b - Static Hosting and Deployment Target.
- `ARCHITECTURE.md` section 8 - Routing and Navigation.
- `ARCHITECTURE.md` section 10 - Accessibility.
- `ARCHITECTURE.md` section 11 - Performance.
- `ARCHITECTURE.md` section 13 - Security and Source Safety.

Testing references:

- `TESTING.md` E2E Tests - Critical Visitor Journeys.
- `TESTING.md` Selector Strategy.
- `TESTING.md` Current Test State.

---

## 5. Likely Affected Files

Expected files:

```text
README.md
mod-w/TESTING.md
public/content/case-studies.json
public/content/modw.json
src/app/analytics/analytics-consent-banner/*
src/app/content/*.content.ts
src/app/portfolio/**/*.html
src/app/portfolio/**/*.ts
e2e/portfolio.spec.ts
```

Possible files only if justified:

```text
public/.htaccess
public/robots.txt
public/sitemap.xml
src/index.html
```

Do not add SSR files:

```text
server.ts
src/main.server.ts
src/app/app.config.server.ts
src/app/app.routes.server.ts
```

---

## 6. Implementation Guidance

- Keep changes small, final-launch focused, and reversible.
- Prefer content and verification fixes over architecture changes.
- Preserve the compact SPA structure.
- Preserve anchor navigation.
- Preserve runtime JSON contracts.
- Preserve consent-gated analytics behavior.
- Do not introduce new dependencies unless a launch blocker requires it and Moderator approves.
- Do not invent legal text. Use Moderator-approved final wording or leave a documented blocker.
- Do not invent private project details.
- If a deployment helper is added, keep it static-hosting oriented.
- Do not make the app depend on InMotion-specific behavior in local development.

---

## 7. Static Hosting Requirements

Production build:

- `npm run build` must pass.
- The deployable browser files must exist under:

```text
dist/frank-mcguire-portfolio/browser/
```

Required output files:

```text
dist/frank-mcguire-portfolio/browser/index.html
dist/frank-mcguire-portfolio/browser/favicon.ico
dist/frank-mcguire-portfolio/browser/content/case-studies.json
dist/frank-mcguire-portfolio/browser/content/modw.json
```

Hosting assumptions:

- Upload the contents of `dist/frank-mcguire-portfolio/browser/` to the web root or target subdirectory.
- No Node.js process is required.
- No SSR server is required.
- No Angular server bundle should be deployed.
- Because the site uses hash fragments for section anchors, direct URLs such as `/#work` and `/#contact` should work on static hosting without rewrite rules.

If the site is deployed under a subdirectory, the Development Team must document the required `base href` decision before changing build config. The target URL currently remains `https://www.frank-mcguire.com/`, so root deployment is assumed.

---

## 8. Content Review Requirements

Review the rendered site and source content for:

- Frank McGuire name and role.
- Senior Frontend Engineer / Frontend Consultant positioning.
- Angular / TypeScript primary stack.
- Vue and React supporting experience.
- Germany-based location and work context.
- Equal full-time and freelance paths.
- Approved neutral availability wording.
- Public email address: `fpmcguire@gmail.com`.
- LinkedIn, GitHub, and MOD-W repository links.
- Case-study mandatory launch set.
- Project Classification and Project Status clarity on every Case Study.
- Proprietary project wording remains high-level and non-confidential.
- MOD-W is framed as methodology/workflow, not platform/framework/autonomous system.
- No unsupported productivity, employer-impact, or guarantee claims.
- No CV/resume page or download link.

If a claim cannot be verified against `PRODUCT.md`, `DOMAIN_LANGUAGE.md`, or Moderator-approved notes, soften it or document it as a launch blocker for Moderator decision.

---

## 9. Privacy and Analytics Review Requirements

The Development Team must confirm or document:

- Approved GA4 measurement id remains `G-MD06T4XGJJ`.
- GA script is not present in `src/index.html`.
- GA script is not loaded before accepted consent.
- Page-view and event tracking do not fire before accepted consent.
- Rejecting consent preserves the portfolio experience.
- Withdrawing consent stops future app-originated tracking calls.
- The Privacy / Cookie settings control remains visible and keyboard-operable.
- The consent prompt has clear Accept and Reject choices.
- The consent prompt has final Moderator-approved wording, or a documented blocker.
- Privacy Policy / Datenschutzerklaerung link replaces the placeholder if the URL is approved.
- Google Analytics advertising features, Google Signals, optional data sharing, and retention settings are confirmed by Moderator outside the codebase.

If final legal copy or Privacy Policy URL is not available, do not fake it. Document the blocker and keep the placeholder clearly marked.

---

## 10. Accessibility and Visual Review Requirements

Manual review must cover:

- Desktop width around 1440px.
- Tablet width around 768px.
- Mobile width around 375px.
- First-screen clarity.
- Section readability.
- No text overlap.
- Nav and mobile menu behavior.
- Consent banner layout on desktop and mobile.
- Footer Privacy / Cookie settings discoverability.
- Keyboard path through nav, CTAs, case-study links, contact links, and consent controls.
- Focus visibility.
- Reduced-motion behavior.
- Link and button accessible names.
- Color contrast for body, muted, CTA, and warning/proprietary text.

Record manual review notes in the Development Team handoff or in a durable artifact if QA / Moderator requests one.

---

## 11. Test Expectations

Run:

```bash
npm run build
npm test
npm run test:e2e
```

Add or update tests only where launch changes create a real regression risk.

Expected automated confidence:

- Existing unit/integration tests pass.
- Existing E2E portfolio journeys pass.
- Analytics consent E2E still proves no GA request before consent.
- Accepting analytics still loads the configured GA script through intercepted E2E requests.
- Withdrawing consent still prevents further tracked requests.
- Runtime JSON content still renders.

Static build output check:

- Confirm browser output contains `index.html`.
- Confirm browser output contains `/content/case-studies.json`.
- Confirm browser output contains `/content/modw.json`.
- Confirm no server deployment output is required for InMotion.

Optional local static-server check:

```bash
npm run build
node tools/static-server.mjs dist/frank-mcguire-portfolio/browser 4200
```

Then manually verify:

- `http://127.0.0.1:4200/`
- `http://127.0.0.1:4200/#work`
- `http://127.0.0.1:4200/content/case-studies.json`
- `http://127.0.0.1:4200/content/modw.json`

---

## 12. Acceptance Checks

The Step is acceptable when:

1. The app remains a compact static Angular SPA.
2. No Angular SSR, server runtime, or Node deployment requirement is added.
3. `@angular/ssr` is not added as an app dependency.
4. No `server.ts`, `main.server.ts`, or server app config is introduced.
5. The deployable output is confirmed as `dist/frank-mcguire-portfolio/browser/`.
6. Runtime JSON files are present in the browser output.
7. The site can be served by a static file server without SSR.
8. Root deployment for `https://www.frank-mcguire.com/` is documented, or any subdirectory deployment change is explicitly documented.
9. Remaining placeholder copy is replaced unless blocked by missing Moderator/legal input.
10. Privacy Policy / Datenschutzerklaerung placeholder is replaced with approved URL, or the missing URL is documented as a launch blocker.
11. Final consent wording is approved or documented as a launch blocker.
12. GA property settings are confirmed or documented as a launch blocker.
13. No GA script tag is present in `src/index.html`.
14. GA still does not load or send tracking before accepted consent.
15. Rejecting or withdrawing consent prevents future analytics tracking.
16. Source-safe case-study and proprietary wording is preserved.
17. MOD-W terminology follows `DOMAIN_LANGUAGE.md`.
18. No out-of-scope pages, routes, backend, CMS, contact form, CV/resume, or dashboard is added.
19. Desktop, tablet, and mobile manual visual checks pass or issues are documented.
20. Keyboard and reduced-motion manual checks pass or issues are documented.
21. `npm run build` passes.
22. `npm test` passes.
23. `npm run test:e2e` passes or a concrete blocker is documented with closest available verification.
24. `mod-w/TESTING.md` is updated if test state changes.
25. Development Team handoff clearly identifies any remaining launch blockers for Tech Lead, QA, Product Owner, and Moderator.

---

## 13. Build Gate

Development Team must run:

```bash
npm run build
npm test
npm run test:e2e
```

If a command fails, document:

- exact command,
- exact error,
- suspected cause,
- closest successful verification,
- whether CI or QA can cover the missing gate.

---

## 14. Handoff Notes

Development Team should return with:

- summary of content/legal/analytics changes,
- static hosting readiness notes,
- final test results,
- manual review notes,
- any launch blockers that require Moderator decision.

Tech Lead review will verify:

- scope stayed launch-focused,
- static hosting constraints were respected,
- SSR was not introduced,
- consent-gated analytics behavior remained intact,
- final content is source-safe,
- build/test/E2E and manual review evidence are sufficient.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
