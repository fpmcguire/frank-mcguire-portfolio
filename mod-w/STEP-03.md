# STEP-03 - Case Studies Runtime Section

**Status:** Complete. Approved by Moderator on 2026-07-29  
**Development Team interface:** Claude Code  
**Tech Lead:** Codex  
**Architecture:** `mod-w/ARCHITECTURE.md`, approved by Moderator on 2026-07-29  
**Previous Step:** `STEP-02.md`, complete and tagged `mod-w-step-02`

---

## 1. Goal

Implement the production Case Studies section from `/content/case-studies.json`.

This Step should make case studies a credible, scannable evidence section that proves Frank McGuire's senior frontend engineering depth, Angular/TypeScript focus, project classification clarity, and MOD-W practice without exposing proprietary detail.

---

## 2. Scope

### In Scope

- Extract the existing inline Case Studies markup into a dedicated `CaseStudiesSectionComponent`.
- Add a dedicated `CaseStudyCardComponent`.
- Render card count and order from runtime JSON only.
- Display each case study's:
  - title,
  - project type,
  - classification,
  - status,
  - role,
  - summary,
  - evidence points,
  - technologies,
  - MOD-W relevance when present,
  - link when present.
- Preserve loading, empty, and error states for runtime JSON.
- Improve card UI toward the approved flat Case Study Card design.
- Add stable generic and item-specific `data-testid` selectors.
- Update `/content/case-studies.json` so it includes the mandatory Product launch set.
- Add tests for the case-study section, card rendering, JSON-driven card count, classification/status clarity, evidence rendering, links, and source-safe copy.
- Update `mod-w/TESTING.md` Current Test State and selector notes.

### Out of Scope

- Case-study detail pages or Angular routes.
- Expand-in-place case-study detail panels.
- Filtering, sorting controls, search, or tabs.
- CMS/admin editing UI.
- Backend API.
- Contact section implementation.
- Final About section implementation.
- Final MOD-W section implementation.
- Visual polish beyond the production case-study card and grid needs of this Step.
- CV/resume page or CV download link.

---

## 3. Requirements Mapping

Product requirements:

- FR4 - Case-study evidence.
- FR6 - Project classification.
- FR7 - Source-safe claims.
- FR8 - Recruiter scanning.
- FR9 - Engineering credibility.
- FR11 - Compact SPA structure.
- NFR1 - Professional tone.
- NFR1a - Minimalist modern design.
- NFR2 - Accessibility.
- NFR5 - Maintainability.
- NFR6 - Trustworthiness.
- NFR7 - MOD-W validation compatibility.

Product acceptance checks advanced by this Step:

- AC5 - Case-study evidence.
- AC6 - Project classification clarity.
- AC8 - Source-safe claims.
- AC9 - Recruiter keyword visibility.
- AC10 - Engineering credibility.
- AC12 - No hidden scope.
- AC13 - Compact SPA acceptance.
- AC14 - Minimalist modern design acceptance.

This Step should substantially satisfy AC5 and AC6. Later MOD-W, Contact, About, and final visual polish Steps complete the broader acceptance set.

Design references:

- `DESIGN-SPEC.md` section 1 - Visual Identity.
- `DESIGN-SPEC.md` section 2 - Accessibility Baseline.
- `DESIGN-SPEC.md` section 3.2 - Button.
- `DESIGN-SPEC.md` section 3.5 - Chip.
- `DESIGN-SPEC.md` section 3.7 - Case Study Card.
- `DESIGN-SPEC.md` section 3.8 - Section Header.
- `DESIGN-SPEC.md` section 4 - Screen Layouts.
- `mod-w/prototype/index.html` - Editorial Left primary direction.
- `mod-w/prototype/styles.css` - card/grid styling reference.

No formal Design IDs are present in `DESIGN-SPEC.md`.

---

## 4. Likely Affected Files

Expected production files:

```text
public/content/case-studies.json
src/app/content/case-study.model.ts
src/app/content/case-studies-content.service.ts
src/app/portfolio/portfolio-page.component.*
src/app/portfolio/case-studies-section/*
src/app/portfolio/case-study-card/*
src/app/portfolio/engagement-section/engagement-section.component.html
src/app/portfolio/**/*.spec.ts
e2e/portfolio.spec.ts
mod-w/TESTING.md
```

The Development Team may adjust exact file names if the approved architecture and domain language remain intact.

---

## 5. Implementation Guidance

- Keep this Step focused on the Case Studies runtime section.
- Create presentational card components; do not fetch data inside individual cards.
- Keep runtime loading in `CaseStudiesContentService` unless a small facade is needed to simplify the section component.
- Preserve Angular v21 standalone components, signals, and modern template control flow.
- Use `@for`, `@if`, `@empty`, and `@switch` where they improve clarity.
- Do not use `*ngFor` or `*ngIf`.
- Use `as const`, `satisfies`, `readonly`, literal unions, and named domain types.
- Avoid TypeScript `enum`.
- Keep `CaseStudy` JSON-backed values as string literal unions.
- Do not hardcode the number of cards in TypeScript, templates, or tests.
- Preserve JSON order unless a documented `displayOrder` field is introduced.
- Use external links only for approved public proof and include `target="_blank"` with `rel="noopener"`.
- Cards for proprietary/private or employment-summary work may be non-links.
- Use source-safe wording for professional and proprietary projects.
- Do not add route links such as `/work/:slug`.
- Do not add final Contact content in this Step.

Carryover from STEP-02:

- Change the engagement section heading from "Two ways to work together." to wording that matches the three engagement paths, such as "Ways to work together." This is a small content correction and should not expand STEP-03 scope.

---

## 6. Content Requirements

The case-study JSON must include the mandatory Product launch set:

- Cavalieri Align / MQTT-Align.
- AGV Fleet Management Simulator.
- Bio-Align.
- Angular Design Patterns.
- Professional experience highlights for:
  - PAKi,
  - travel-IT,
  - Kaufland.

Current implementation note:

- `public/content/case-studies.json` currently includes Prismatic but not Bio-Align.
- Development must add Bio-Align.
- Prismatic may remain as an additional card only if its summary is source-safe and it does not distract from Angular-first positioning.
- React Design Patterns should remain out of v1 unless Moderator explicitly approves it for cross-framework credibility.
- Trending Repos remains out of v1.

Each card must clearly distinguish:

- `public-demo`,
- `public-repository`,
- `private-proprietary`,
- `employment-summary`,
- `independent-product`,
- `personal-project`,
- `open-source`,
- `professional-experience`,
- `proprietary`.

Approved source-safe patterns:

- MQTT-Align may mention "MVP vertical slice delivered in 3 weeks."
- Proprietary/private projects should use high-level wording and may use: "Architecture walk-through available on request."
- Professional experience summaries must not expose client-confidential details.
- Avoid exact "available immediately" wording.

---

## 7. UI Requirements

Case Studies section should include:

- Section eyebrow/index consistent with the design direction.
- `h2` heading: "Case Studies" or "Selected Case Studies".
- Short lead copy that frames the cards as evidence of frontend architecture, delivery, testing, and product judgment.
- Responsive grid:
  - 3 columns on wide screens,
  - 2 columns on tablet where appropriate,
  - 1 column on mobile.
- Flat cards with restrained borders, low clutter, and clear hierarchy.
- Classification/status badges or labels that are visible to users.
- Technology chips.
- Evidence points as concise bullets or compact proof lines.
- Optional MOD-W relevance line when present.
- Link treatment that distinguishes public proof from private/proprietary summaries.
- Loading state that is non-blank.
- Empty state that is calm and non-technical.
- Error state that is source-safe and non-technical.

Do not introduce card hover behavior that changes layout dimensions.

---

## 8. Test IDs

Use and reconcile these selectors:

```text
work-section
work-section-heading
work-section-lead
work-card-grid
work-card
work-card-{id}
work-card-{id}-project-type
work-card-{id}-classification
work-card-{id}-status
work-card-{id}-role
work-card-{id}-evidence
work-card-{id}-technologies
work-card-{id}-modw-relevance
work-card-{id}-link
work-cards-loading
work-cards-empty
work-cards-error
```

`work-card` should be a generic selector available on every rendered card, and `work-card-{id}` should remain available for item-specific assertions.

---

## 9. Acceptance Checks

The Step is acceptable when:

1. Case Studies rendering is owned by a dedicated section component.
2. Individual cards are rendered by a dedicated presentational card component.
3. The section fetches or receives runtime JSON content from `/content/case-studies.json`.
4. The template does not hardcode the number of case-study cards.
5. The mandatory Product launch set is represented, including Bio-Align.
6. Each JSON item renders one card in JSON order.
7. Each card displays title, project type, role, summary, classification, status, evidence, and technologies.
8. MOD-W relevance renders when present and is omitted cleanly when absent.
9. Public links render only when an approved `href` is present.
10. Classification/status language makes public, private/proprietary, professional employment, independent product, personal project, and open-source distinctions clear to visitors.
11. Loading, empty, and error states remain non-blank and source-safe.
12. The generic `work-card` selector and item-specific `work-card-{id}` selector are both available.
13. Existing STEP-01 runtime loading tests still pass.
14. Existing STEP-02 nav, hero, and engagement path behavior still works.
15. The engagement heading no longer says there are two ways while rendering three paths.
16. The implementation does not add routes, detail pages, CMS/admin, backend, CV/resume page, CV download link, or contact form.
17. Tests cover card count from data, required launch card presence, classification/status visibility, evidence rendering, optional link behavior, loading/empty/error states, and preserved nav/hero behavior.
18. `npm run build` passes.
19. Relevant unit/integration tests pass.
20. Relevant E2E tests pass or a blocker is documented with closest available verification.

---

## 10. Test Expectations

Minimum tests:

- Component/integration test that renders one generic `work-card` per configured case study.
- Component/integration test that required launch case-study ids render.
- Component/integration test that every card displays classification and status.
- Component/integration test that project type, role, evidence, and technologies render.
- Component/integration test that MOD-W relevance renders only when configured.
- Component/integration test that approved links render and missing links do not create empty anchors.
- Component/integration tests for loading, empty, and error states.
- E2E test that Case Studies loads from runtime JSON at `/`.
- E2E test that all mandatory launch case-study titles are visible.
- E2E or integration coverage that STEP-02 first-screen, nav, and mobile menu behavior still works.

Update `mod-w/TESTING.md` Current Test State in this Step.

---

## 11. Build Gate

Development Team must run:

```bash
npm run build
npm test
npm run test:e2e
```

If `npm run test:e2e` cannot run because of local browser/dev-server constraints, document the blocker and run the closest available verification.

---

## 12. Recommended Next Action

STEP-03 is complete. Proceed to STEP-04 planning.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
