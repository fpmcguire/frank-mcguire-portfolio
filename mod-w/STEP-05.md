# STEP-05 - About, Contact, and Footer

**Status:** Complete. Approved by Moderator on 2026-07-30  
**Development Team interface:** Claude Code  
**Tech Lead:** Codex  
**Architecture:** `mod-w/ARCHITECTURE.md`, approved by Moderator on 2026-07-29  
**Previous Step:** `STEP-04.md`, complete and tagged `mod-w-step-04`

---

## 1. Goal

Implement the remaining production SPA sections: About, Contact, and Footer.

This Step should complete the visitor content path and conversion surface without adding routes, a contact backend, a resume/CV page, or a downloadable CV.

---

## 2. Scope

### In Scope

- Replace the placeholder `#about` and `#contact` anchors with production sections.
- Add a compact `AboutSectionComponent`.
- Add a `ContactSectionComponent` with equal full-time and freelance contact paths.
- Add a `FooterComponent`.
- Add static typed content for About, Contact, profile links, and footer metadata.
- Use `mailto:` links only for contact actions.
- Add visible email, LinkedIn, and GitHub links.
- Use the approved public email: `fpmcguire@gmail.com`.
- Use source-safe, approved availability wording.
- Preserve existing nav anchors and CTA targets.
- Preserve existing hero, engagement, Case Studies, and MOD-W behavior.
- Apply `DOMAIN_LANGUAGE.md` visible typography rules, including the non-breaking MOD-W hyphen rule.
- Add or update integration and E2E coverage for About, Contact, Footer, contact paths, links, and anchor navigation.
- Update `mod-w/TESTING.md` Current Test State and selector notes if implementation changes test coverage or selectors.

### Out of Scope

- Contact form.
- Backend API or server-side mail handling.
- Calendly or scheduling integration.
- Downloadable CV/resume link.
- Resume/CV page.
- Full chronological career history.
- Standalone Services page.
- Blog/articles.
- Multi-page routes.
- Runtime JSON for About/Contact/Footer content, unless Moderator explicitly changes architecture.
- Final visual polish, reveal animation, scroll-spy, and full accessibility pass beyond this Step's section needs.

---

## 3. Requirements Mapping

Product requirements:

- FR1 - Clear positioning.
- FR2 - Equal conversion paths.
- FR5 - Contact path.
- FR7 - Source-safe claims.
- FR8 - Recruiter scanning.
- FR10 - External validation.
- FR11 - Compact SPA structure.
- NFR1 - Professional tone.
- NFR1a - Minimalist modern design.
- NFR2 - Accessibility.
- NFR5 - Maintainability.
- NFR6 - Trustworthiness.
- NFR7 - MOD-W validation compatibility.

Product acceptance checks advanced by this Step:

- AC1 - First-screen clarity, preserved.
- AC2 - Equal full-time and freelance support.
- AC7 - Contact conversion.
- AC8 - Source-safe claims.
- AC9 - Recruiter keyword visibility.
- AC12 - No hidden scope.
- AC13 - Compact SPA acceptance.
- AC14 - Minimalist modern design acceptance.

This Step should substantially satisfy AC7 and strengthen AC2, AC8, and AC9. STEP-06 and STEP-07 complete visual/accessibility polish and launch validation.

Design references:

- `DESIGN-SPEC.md` section 1 - Visual Identity.
- `DESIGN-SPEC.md` section 2 - Accessibility Baseline.
- `DESIGN-SPEC.md` section 3.2 - Button.
- `DESIGN-SPEC.md` section 3.10 - About Meta Row.
- `DESIGN-SPEC.md` section 3.11 - Contact Path Card.
- `DESIGN-SPEC.md` section 3.12 - Footer.
- `DESIGN-SPEC.md` section 4 - Screen Layouts.
- `DESIGN-SPEC.md` section 5 - Content Policy Decisions.
- `mod-w/prototype/index.html` - Editorial Left primary direction.
- `mod-w/prototype/styles.css` - About/Contact/Footer visual reference.

No formal Design IDs are present in `DESIGN-SPEC.md`.

---

## 4. Likely Affected Files

Expected production files:

```text
src/app/content/contact.content.ts
src/app/content/about.content.ts
src/app/content/footer.content.ts
src/app/content/contact-path.model.ts
src/app/portfolio/portfolio-page.component.*
src/app/portfolio/about-section/*
src/app/portfolio/contact-section/*
src/app/portfolio/footer/*
src/app/portfolio/**/*.spec.ts
e2e/portfolio.spec.ts
mod-w/TESTING.md
```

The Development Team may adjust exact file names if the approved architecture and domain language remain intact.

---

## 5. Implementation Guidance

- Keep this Step focused on About, Contact, and Footer.
- Use Angular v21 standalone components, signals where local UI state is needed, and modern template control flow.
- Do not use `*ngFor` or `*ngIf`.
- Use static typed content for About, Contact, and Footer.
- Use `as const`, `satisfies`, `readonly`, literal unions, and named domain types for content config.
- Avoid TypeScript `enum`.
- Keep `PortfolioPageComponent` as composition only.
- Replace the existing empty placeholder divs with real components that own their canonical section ids.
- Do not add Angular routes for `/about`, `/contact`, `/resume`, or `/cv`.
- Do not add a form, API, or scheduling widget.
- Do not add a CV/resume download link.
- External LinkedIn and GitHub links must use `target="_blank"` and `rel="noopener"`.
- Contact CTAs should use `mailto:` links with source-safe subject/body defaults.
- Use `NonBreakingTermsPipe` or the shared presentation utility for visible copy that may include `MOD-W`.
- Keep About compact: narrative credibility, not a chronological CV.
- Keep Contact direct: two equal paths plus simple profile links.

---

## 6. Content Requirements

### About

The About section must include a concise career narrative covering:

- Frank McGuire as a senior frontend engineer based in Germany.
- 12+ years of modern frontend development.
- Angular and TypeScript as primary strengths.
- Supporting Vue, Nuxt, and React experience.
- Domains including logistics, travel, e-commerce, IoT / industrial automation, SaaS dashboards, and real-time systems.
- Earlier pioneering work in digital media, internet curricula, generative / computational design, mentoring, or teaching.
- Current disciplined AI-assisted development practice through MOD-W.

The About section must avoid:

- full chronological CV structure,
- downloadable CV/resume CTA,
- exact immediate availability wording,
- unsupported claims about employer outcomes or productivity.

### Contact

The Contact section must include:

- two equal contact paths:
  - full-time senior frontend roles,
  - freelance / B2B frontend consulting contracts,
- public email: `fpmcguire@gmail.com`,
- LinkedIn link,
- GitHub link,
- Germany / EU remote or hybrid signal,
- neutral availability wording:
  - "Available for relevant full-time and freelance conversations.",
- optional inquiry guidance:
  - "For full-time roles, include role title and company. For freelance inquiries, include scope, timeline, stack, and engagement model."

Recommended external links:

```text
LinkedIn: https://www.linkedin.com/in/frank-mcguire-06b6ba1
GitHub: https://github.com/fpmcguire
```

Use the Product-approved email even though prototypes contain an older `frank@frank-mcguire.com` address.

### Footer

The Footer must include:

- static copyright line,
- "built with MOD-W" or equivalent attribution,
- Angular attribution if included by existing content/design direction,
- no extra nav routes or hidden feature links.

Visible `MOD-W` text must use the non-breaking hyphen rendering rule from `DOMAIN_LANGUAGE.md`.

---

## 7. Static Content Contracts

Recommended shape:

```typescript
interface AboutContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly narrative: readonly string[];
  readonly meta: readonly AboutMetaItem[];
}

interface AboutMetaItem {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

interface ContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly email: string;
  readonly paths: readonly ContactPath[];
  readonly profileLinks: readonly ContactProfileLink[];
  readonly guidance: string;
}

interface ContactPath {
  readonly id: 'full-time' | 'freelance';
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly mailtoSubject: string;
  readonly mailtoBody: string;
}

interface ContactProfileLink {
  readonly id: 'email' | 'linkedin' | 'github';
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

interface FooterContent {
  readonly copyright: string;
  readonly attribution: string;
}
```

If the Development Team chooses a different shape, the same source-safe content and testability requirements must be preserved.

---

## 8. UI Requirements

About section:

- Use `section` with canonical id `about`.
- Include a visible heading.
- Include concise narrative paragraphs.
- Include a compact meta row/list for recruiter-scannable facts.
- Keep layout scannable on mobile and desktop.

Contact section:

- Use `section` with canonical id `contact`.
- Include a visible heading.
- Render full-time and freelance paths with equal prominence.
- Each contact path should include a mailto CTA.
- Include visible email, LinkedIn, and GitHub links.
- Keep contact guidance concise and optional.
- Do not include form fields.

Footer:

- Use semantic `footer`.
- Include `data-testid="footer"`.
- Keep content short and static.

Accessibility:

- Preserve one `h1` across the page.
- Keep headings sequential.
- Mailto and external links must have clear accessible names.
- Interactive elements must be keyboard reachable.
- Do not create hover-only information.

---

## 9. Test IDs

Use and reconcile these selectors:

```text
about-section
about-section-heading
about-section-narrative
about-meta-{id}
contact-section
contact-section-heading
contact-path-full-time
contact-path-freelance
contact-full-time-cta
contact-freelance-cta
contact-email-link
contact-linkedin-link
contact-github-link
contact-guidance
footer
```

Note: `TESTING.md` currently documents `contact-path-full-time` and `contact-path-freelance`; prefer these canonical ids over prototype-only `contact-path-fulltime`.

---

## 10. Acceptance Checks

The Step is acceptable when:

1. `PortfolioPageComponent` composes real About, Contact, and Footer components.
2. The placeholder `#about` and `#contact` divs are removed.
3. About section uses canonical id `about` and `data-testid="about-section"`.
4. Contact section uses canonical id `contact` and `data-testid="contact-section"`.
5. Footer uses semantic `footer` and `data-testid="footer"`.
6. About copy is compact, source-safe, and not a chronological CV.
7. About includes senior frontend, Germany, Angular/TypeScript, Vue/React/Nuxt, domain, mentoring/teaching, and MOD-W signals.
8. Contact includes equal full-time and freelance paths.
9. Contact uses `fpmcguire@gmail.com` for visible email and mailto links.
10. Contact includes LinkedIn and GitHub links.
11. External profile links open in a new tab with `rel="noopener"`.
12. Contact CTAs use `mailto:` only.
13. No contact form, backend, scheduling integration, CV page, CV download link, or new route is added.
14. Existing nav anchors for About and Contact reach the real sections.
15. Existing hero, engagement, Case Studies, MOD-W, runtime JSON, and non-breaking MOD-W rendering behavior still works.
16. Tests cover About rendering, Contact path rendering, contact hrefs, external link attributes, Footer rendering, and preserved page composition.
17. E2E covers Contact section links and anchor navigation through About and Contact.
18. `mod-w/TESTING.md` is updated if test state or selector conventions change.
19. `npm run build` passes.
20. Relevant unit/integration tests pass.
21. Relevant E2E tests pass or a blocker is documented with closest available verification.

---

## 11. Test Expectations

Minimum tests:

- Component/integration test that `PortfolioPageComponent` renders About, Contact, and Footer in composition.
- Component/integration test that About section renders required narrative/meta content.
- Component/integration test that Contact section renders full-time and freelance paths with equal prominence.
- Component/integration test that Contact CTAs use `mailto:fpmcguire@gmail.com`.
- Component/integration test that LinkedIn and GitHub links use configured hrefs, `target="_blank"`, and `rel="noopener"`.
- Component/integration test that Footer renders the approved attribution.
- E2E test that About and Contact anchors are reachable from nav.
- E2E test that final Contact section exposes email, LinkedIn, GitHub, and both contact paths.
- E2E or integration coverage that previous Step behavior still works.

Update `mod-w/TESTING.md` Current Test State in this Step.

---

## 12. Build Gate

Development Team must run:

```bash
npm run build
npm test
npm run test:e2e
```

If `npm run test:e2e` cannot run because of local browser/dev-server constraints, document the blocker and run the closest available verification.

---

## 13. Carryover Notes

- STEP-06 owns broader visual fidelity, responsive polish, focus states, reduced-motion behavior, and accessibility pass.
- STEP-07 owns final launch validation and content review.
- Resume/CV page and downloadable CV remain out of scope for first implementation.
- Contact form remains out of scope for first implementation.
- Exact proprietary project wording should remain conservative until final launch review.
- Local Playwright has shown intermittent dev-server flakes in prior Steps; rerun once before treating a connection-only failure as an implementation blocker.

---

## 14. Completion Notes

STEP-05 passed Tech Lead review, QA validation, and Moderator approval.

Verified closeout gates:

- `npm run build` - pass.
- `npm test` - pass, 88 tests across 17 files.
- `npm run test:e2e` - pass, 33 tests across Chromium, Firefox, and WebKit.

Recommended next action: proceed to STEP-06.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
