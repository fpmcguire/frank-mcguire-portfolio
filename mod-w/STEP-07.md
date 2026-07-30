# STEP-07 - Consent-Gated Google Analytics and GDPR Popup

**Status:** Complete - approved by Moderator on 2026-07-30
**Development Team interface:** Claude Code
**Tech Lead:** Codex
**Architecture:** `mod-w/ARCHITECTURE.md`, updated for analytics scope on 2026-07-30
**Previous Step:** `STEP-06.md`, complete and tagged `mod-w-step-06`
**Tag:** `mod-w-step-07`

---

## 1. Goal

Add privacy-respecting Google Analytics tracking to the compact portfolio SPA, gated behind a German / EU GDPR-oriented consent popup.

This Step must collect basic usage signals only after explicit analytics consent. Rejecting or withdrawing consent must preserve the full portfolio experience and prevent future analytics tracking.

---

## 2. Scope

### In Scope

- Add an `analytics/` feature boundary under `src/app/`.
- Add typed analytics configuration using the Moderator-supplied GA4 measurement id.
- Add a consent state model with `unknown`, `accepted`, and `rejected` states.
- Persist a versioned consent record in localStorage.
- Treat missing, malformed, unavailable, expired, or old-version consent records as `unknown`.
- Add a global Analytics Consent Banner / popup mounted from App.
- Provide clear accept and reject choices with comparable visual weight.
- Keep the popup non-blocking so the portfolio remains usable.
- Add a visible Privacy / Cookie settings control so visitors can change or withdraw consent later.
- Dynamically load the GA4 script only after accepted consent and a configured measurement id.
- Initialize Google Analytics only after accepted consent.
- Send one initial page-view after accepted consent.
- Track approved basic portfolio events where feasible:
  - section navigation,
  - contact CTA clicks,
  - outbound profile clicks,
  - case-study link clicks,
  - MOD-W repository / consulting CTA clicks.
- Stop future tracking after rejection or withdrawal.
- Best-effort remove first-party GA cookies when consent is withdrawn.
- Add unit/integration tests for consent state and GA gating behavior.
- Add E2E coverage proving no GA request before consent and GA loading after consent with a test measurement id.
- Update `mod-w/TESTING.md` if new selectors or test state are introduced.

### Out of Scope

- Custom analytics dashboard.
- Server-side analytics.
- Backend proxy for analytics.
- Google Tag Manager.
- Google Analytics advertising features.
- Google Signals.
- Optional Google data sharing unless Moderator explicitly approves.
- Tracking before accepted consent.
- Tracking rejected-consent visitors.
- Fine-grained scroll-depth tracking.
- Keystroke, pointer coordinate, form-input, email-content, or mailto body tracking.
- Contact form.
- Privacy Policy / Datenschutzerklaerung legal copy authoring beyond placeholder/link support.
- Site-wide German translation or multilingual portfolio content.
- Third-party Angular analytics wrappers or cookie-consent packages unless the Development Team documents a compelling reason and gets Moderator approval.

---

## 3. Requirements Mapping

Product requirements:

- FR12 - Google Analytics tracking.
- FR13 - Consent-gated analytics.
- NFR2 - Accessibility.
- NFR3 - Performance.
- NFR5 - Maintainability.
- NFR6 - Trustworthiness.
- NFR8 - Privacy and GDPR-aware behavior.

Product acceptance checks advanced by this Step:

- AC12 - No hidden scope.
- AC15 - Analytics consent before tracking.
- AC16 - Consent choice quality.
- AC17 - Google Analytics verification.

Architecture references:

- `ARCHITECTURE.md` section 3.1 - Application Shape.
- `ARCHITECTURE.md` section 4 - Proposed Source Layout.
- `ARCHITECTURE.md` section 5 - Analytics Consent Banner, Analytics Consent Service, Google Analytics Service.
- `ARCHITECTURE.md` section 7a - Analytics and Consent Configuration.
- `ARCHITECTURE.md` section 10 - Accessibility.
- `ARCHITECTURE.md` section 11 - Performance.
- `ARCHITECTURE.md` section 13 - Security and Source Safety.

Testing references:

- `TESTING.md` Selector Strategy.
- `TESTING.md` E2E Tests - Critical Visitor Journeys.
- `TESTING.md` Current Test State.

---

## 4. Likely Affected Files

Expected production files:

```text
src/app/app.ts
src/app/app.html
src/app/app.spec.ts
src/app/analytics/analytics.config.ts
src/app/analytics/analytics-consent.model.ts
src/app/analytics/analytics-consent.service.ts
src/app/analytics/analytics-consent.service.spec.ts
src/app/analytics/google-analytics.service.ts
src/app/analytics/google-analytics.service.spec.ts
src/app/analytics/analytics-consent-banner/analytics-consent-banner.component.ts
src/app/analytics/analytics-consent-banner/analytics-consent-banner.component.html
src/app/analytics/analytics-consent-banner/analytics-consent-banner.component.scss
src/app/analytics/analytics-consent-banner/analytics-consent-banner.component.spec.ts
src/app/portfolio/nav/*
src/app/portfolio/contact-section/*
src/app/portfolio/case-study-card/*
src/app/portfolio/modw-section/*
src/app/portfolio/footer/*
e2e/portfolio.spec.ts
mod-w/TESTING.md
```

The Development Team may adjust exact file names if the approved architecture, domain language, and selectors remain intact.

---

## 5. Implementation Guidance

- Keep analytics isolated under `src/app/analytics/`.
- Do not put Google Analytics script tags in `src/index.html`.
- Do not call `gtag` directly from portfolio components.
- Use a `GoogleAnalyticsService` adapter for all GA script loading and event calls.
- Use an `AnalyticsConsentService` for consent state only; it must not own GA transport.
- Use Angular standalone components and signals.
- Guard browser globals so tests and non-browser execution do not crash.
- Use localStorage for consent persistence, not cookies.
- Use a versioned storage key, for example:

```text
frank-mcguire-portfolio.analytics-consent.v1
```

- Use the approved GA4 measurement id: `G-MD06T4XGJJ`.
- Keep no-op behavior when the measurement id is empty so tests and future environments remain safe.
- For tests, allow dependency injection or a test config to use a fake measurement id such as `G-TEST12345`.
- Preserve the compact SPA structure and section order.
- Preserve current runtime JSON contracts.
- Preserve current visual design language; the popup should feel native to the site.
- Do not let analytics work rewrite unrelated portfolio copy or layout.

Recommended model:

```typescript
export type AnalyticsConsentState = 'unknown' | 'accepted' | 'rejected';

export interface AnalyticsConsentRecord {
  version: 1;
  state: Exclude<AnalyticsConsentState, 'unknown'>;
  decidedAt: string;
}
```

Recommended analytics config:

```typescript
export interface AnalyticsConfig {
  measurementId: string;
  consentStorageKey: string;
  consentVersion: 1;
}
```

---

## 6. Consent UI Requirements

The consent UI should be a non-blocking popup, banner, or panel. A hard modal is not preferred for v1.

Required behavior:

- Show the popup when consent state is `unknown`.
- Do not show the popup after a valid accepted/rejected decision unless settings are reopened.
- Provide Accept and Reject controls.
- Persist both accepted and rejected choices.
- Provide a visible Privacy / Cookie settings control after the first decision.
- Allow accepted consent to be changed to rejected consent.
- Allow rejected consent to be changed to accepted consent.
- Do not block access to the portfolio content.
- Do not pre-check analytics consent.
- Do not make reject harder to find than accept.
- Do not use misleading wording such as "necessary analytics" for Google Analytics.

Content requirements:

- State that Google Analytics is optional.
- State that analytics helps understand portfolio usage.
- Link to, or reserve a clear placeholder for, Privacy Policy / Datenschutzerklaerung.
- Use Moderator-approved final wording before launch.

Language:

- Portfolio content remains English-only.
- Consent UI may be German, English, or bilingual German / English after Moderator approval.
- Until final wording is approved, use conservative placeholder text that is easy to replace.

Accessibility:

- Controls must be keyboard reachable.
- Controls must have clear accessible names.
- Focus state must be visible.
- If implemented as a dialog, it must have correct dialog semantics and a non-coercive close/reject path.
- Non-modal banner/panel is acceptable and preferred.

---

## 7. Google Analytics Requirements

GA loading:

- Do not load the GA script before accepted consent.
- Do not initialize `dataLayer` or `gtag` before accepted consent.
- Do not send a page-view before accepted consent.
- Dynamically inject the GA4 script after accepted consent only when a measurement id is configured.
- Prevent duplicate script injection.
- Send one initial page-view after successful initialization.

Withdrawal / rejection:

- If consent is rejected before GA loads, no GA script should be injected.
- If consent is withdrawn after GA loads, future tracking calls must no-op.
- Best-effort remove first-party GA cookies for the current host, including `_ga` and `_ga_*` names.
- Do not claim complete legal cookie deletion in UI copy.

Events:

- Use typed event names.
- Track only approved portfolio interactions.
- Do not track personal data.
- Do not include mailto generated body text or email contents in analytics params.
- Do not track rejected-consent visitors.

Recommended event names:

```typescript
type AnalyticsEventName =
  | 'section_navigation'
  | 'contact_cta_click'
  | 'outbound_profile_click'
  | 'case_study_link_click'
  | 'modw_repository_click';
```

Recommended event params:

```typescript
type AnalyticsEventParams = Readonly<Record<string, string | number | boolean>>;
```

---

## 8. Tracking Boundaries

Track these where feasible:

- Nav anchor activation:
  - `section_navigation`
  - params: section id / label.
- Hero, nav, and Contact CTAs:
  - `contact_cta_click`
  - params: source and path, such as `full-time`, `freelance`, or `general`.
- LinkedIn and GitHub profile links:
  - `outbound_profile_click`
  - params: destination.
- Case Study product/repository links:
  - `case_study_link_click`
  - params: case study id and link type.
- MOD-W repository CTA:
  - `modw_repository_click`
  - params: source.

Do not track:

- Passive scrolling.
- Pointer movement.
- Copy selection.
- Exact email subject or body.
- Anything typed by the visitor.

Keep tracking small. It is better to track fewer high-signal interactions than to spread analytics calls throughout presentation components.

---

## 9. Test IDs

Add stable selectors for consent UI:

```text
analytics-consent-banner
analytics-consent-title
analytics-consent-summary
analytics-consent-accept
analytics-consent-reject
analytics-consent-settings
analytics-consent-close
```

`analytics-consent-close` is optional if the design has no separate close control.

Preserve existing selectors from `TESTING.md`.

If the Development Team adds analytics-specific selectors or uses existing CTA selectors for event assertions, update `mod-w/TESTING.md` in the same Step.

---

## 10. Acceptance Checks

The Step is acceptable when:

1. The site remains a compact single-page Angular SPA with no new routes.
2. No GA script tag is present in `src/index.html`.
3. No Google Analytics script is loaded before accepted consent.
4. No page-view or event tracking occurs before accepted consent.
5. First-time visitors see a clear analytics consent popup/banner/panel.
6. The consent UI offers clear Accept and Reject choices with comparable visual weight.
7. Rejecting analytics preserves the full portfolio experience.
8. Accepting analytics persists consent locally.
9. Rejecting analytics persists consent locally.
10. A returning visitor with a valid consent record is not prompted again.
11. Missing, malformed, old-version, or unavailable storage does not crash the app.
12. A visible Privacy / Cookie settings control can reopen consent settings.
13. A visitor can withdraw accepted consent.
14. Withdrawing consent prevents future tracking calls.
15. Withdrawing consent best-effort removes first-party GA cookies.
16. If the measurement id is empty, accepting consent does not crash and does not inject GA.
17. With a test measurement id, accepting consent injects the GA4 script and sends one initial page-view.
18. Approved CTA/link analytics events fire only after accepted consent.
19. Rejected-consent visitors are not tracked.
20. Analytics events do not include personal data, mailto body text, or visitor-entered text.
21. Consent UI is keyboard operable.
22. Consent UI has clear accessible names and visible focus states.
23. Consent UI does not introduce layout overlap on desktop or mobile.
24. Portfolio content remains visible and usable while the consent UI is shown.
25. Google Analytics advertising features, Google Signals, and optional data sharing are not enabled in code.
26. No custom analytics dashboard, backend analytics proxy, GTM integration, contact form, or multilingual portfolio content is added.
27. `mod-w/TESTING.md` is updated if selectors or test state change.
28. `npm run build` passes.
29. `npm test` passes.
30. `npm run test:e2e` passes or a blocker is documented with closest available verification.

---

## 11. Test Expectations

Minimum unit/integration tests:

- `AnalyticsConsentService`:
  - starts as `unknown` without stored consent,
  - reads valid accepted/rejected records,
  - rejects malformed records as `unknown`,
  - treats old-version records as `unknown`,
  - persists accepted consent,
  - persists rejected consent,
  - supports withdrawal from accepted to rejected,
  - does not crash when localStorage is unavailable.
- `GoogleAnalyticsService`:
  - does not inject script before accepted consent,
  - no-ops when measurement id is empty,
  - injects script once after accepted consent with test config,
  - sends initial page-view after accepted consent,
  - does not send events before accepted consent,
  - sends approved events after accepted consent,
  - stops future events after withdrawal,
  - attempts GA cookie cleanup on withdrawal.
- `AnalyticsConsentBannerComponent`:
  - renders when consent is unknown,
  - hides after accept/reject,
  - renders accept and reject controls,
  - persists choices through service calls,
  - reopens through settings state,
  - includes required test ids and accessible labels.
- App shell:
  - mounts portfolio and consent banner without disturbing existing page composition.

Minimum E2E tests:

- Fresh visitor sees consent UI and no GA request/script before consent.
- Rejecting analytics hides the prompt and no GA request/script appears.
- Accepting analytics with a test measurement id loads GA.
- Reopening settings and withdrawing consent prevents future tracked events.
- Existing core portfolio E2E journey still passes.

E2E implementation note:

- For E2E, use a test-safe analytics config path, dependency injection, or build-time test constant so the test can assert GA script injection without using the production measurement id.
- Intercept network requests to `googletagmanager.com` / `google-analytics.com` where practical.
- Do not send real analytics from tests.

Manual review:

- Desktop and mobile consent UI layout.
- Keyboard navigation through popup/banner controls.
- Focus visibility.
- No content obstruction that prevents using the portfolio.
- Privacy / Cookie settings control discoverability.

---

## 12. Build Gate

Development Team must run:

```bash
npm run build
npm test
npm run test:e2e
```

If `npm run test:e2e` cannot run because of local browser or OS permission issues, document:

- exact command,
- exact error,
- closest successful verification,
- whether CI is expected to cover the missing gate.

---

## 13. Carryover Notes

- STEP-08 owns final launch validation and content review.
- The production GA4 measurement id is approved as `G-MD06T4XGJJ`.
- STEP-08 must confirm Privacy Policy / Datenschutzerklaerung URL and final consent wording before launch.
- STEP-08 must verify final GA account settings, including advertising features, Google Signals, data sharing, and retention.
- The GA4 measurement id is not a secret, but it must not be confused with private Google credentials.
- Do not commit service account keys, OAuth client secrets, or private Google account credentials.
- README and MOD-W docs currently have uncommitted changes outside this Step; Development Team must not overwrite them.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
