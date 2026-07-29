# STEP-04 - MOD-W Runtime Section

**Status:** Complete. Approved by Moderator on 2026-07-29  
**Development Team interface:** Claude Code  
**Tech Lead:** Codex  
**Architecture:** `mod-w/ARCHITECTURE.md`, approved by Moderator on 2026-07-29  
**Previous Step:** `STEP-03.md`, complete and tagged `mod-w-step-03`

---

## 1. Goal

Implement the production MOD-W section from `/content/modw.json`.

This Step should make MOD-W a credible, concise methodology pillar that explains what it is, what problem it solves, how it works at a high level, and where visitors can learn more or start an adoption/training conversation.

---

## 2. Scope

### In Scope

- Extract the existing inline MOD-W markup into a dedicated `ModwSectionComponent`.
- Render MOD-W content from runtime JSON only.
- Preserve loading, empty, and error states for `/content/modw.json`.
- Expand the runtime JSON contract if needed to support:
  - title,
  - eyebrow,
  - summary,
  - problem statement,
  - core workflow idea,
  - principles,
  - role model summary,
  - practical project evidence,
  - repository CTA,
  - consulting/training CTA.
- Add or refine validation for the expanded MOD-W JSON shape.
- Add human-readable, source-safe copy in `public/content/modw.json`.
- Add tests for runtime rendering, principle count, CTA labels/hrefs, prohibited claims, and loading/empty/error states.
- Update `mod-w/TESTING.md` Current Test State and selector notes.
- Preserve existing STEP-01, STEP-02, and STEP-03 behavior.

### Out of Scope

- Duplicating full MOD-W documentation on the portfolio page.
- Embedded long-form MOD-W docs.
- Blog/articles.
- Case-study section changes beyond preserving existing behavior.
- About section final content.
- Contact section final content.
- Contact form or backend.
- CMS/admin editing UI.
- Multi-page routes.
- CV/resume page or CV download link.
- Final visual polish beyond the production MOD-W pillar needs of this Step.

---

## 3. Requirements Mapping

Product requirements:

- FR3 - MOD-W as major pillar.
- FR4 - Case-study evidence, where MOD-W connects back to project work.
- FR5 - Contact path, via MOD-W consulting/training CTA.
- FR7 - Source-safe claims.
- FR9 - Engineering credibility.
- FR10 - External validation.
- FR11 - Compact SPA structure.
- NFR1 - Professional tone.
- NFR1a - Minimalist modern design.
- NFR2 - Accessibility.
- NFR5 - Maintainability.
- NFR6 - Trustworthiness.
- NFR7 - MOD-W validation compatibility.

Product acceptance checks advanced by this Step:

- AC3 - MOD-W major pillar.
- AC4 - MOD-W accuracy.
- AC7 - Contact conversion, partially through the MOD-W CTA.
- AC8 - Source-safe claims.
- AC10 - Engineering credibility.
- AC12 - No hidden scope.
- AC13 - Compact SPA acceptance.
- AC14 - Minimalist modern design acceptance.

This Step should substantially satisfy AC3 and AC4. STEP-05 completes final Contact support.

Design references:

- `DESIGN-SPEC.md` section 1 - Visual Identity.
- `DESIGN-SPEC.md` section 2 - Accessibility Baseline.
- `DESIGN-SPEC.md` section 3.2 - Button.
- `DESIGN-SPEC.md` section 3.9 - MOD-W Pillar.
- `DESIGN-SPEC.md` section 4 - Screen Layouts.
- `mod-w/prototype/index.html` - Editorial Left primary direction.
- `mod-w/prototype/styles.css` - MOD-W/chamfer treatment reference.

No formal Design IDs are present in `DESIGN-SPEC.md`.

---

## 4. Likely Affected Files

Expected production files:

```text
public/content/modw.json
src/app/content/modw-content.model.ts
src/app/content/modw-content.service.ts
src/app/content/modw-content.service.spec.ts
src/app/portfolio/portfolio-page.component.*
src/app/portfolio/modw-section/*
src/app/portfolio/**/*.spec.ts
e2e/portfolio.spec.ts
mod-w/TESTING.md
```

The Development Team may adjust exact file names if the approved architecture and domain language remain intact.

---

## 5. Implementation Guidance

- Keep this Step focused on the MOD-W section.
- Follow the same extraction pattern used for STEP-03 Case Studies.
- Create a dedicated `ModwSectionComponent`; do not keep production MOD-W rendering inline in `PortfolioPageComponent`.
- Keep runtime loading in `ModwContentService` unless a small facade is needed to simplify the section component.
- Use Angular v21 standalone components, signals, and modern template control flow.
- Use `@for`, `@if`, `@empty`, and `@switch` where they improve clarity.
- Do not use `*ngFor` or `*ngIf`.
- Use `as const`, `satisfies`, `readonly`, literal unions, and named domain types where static config is introduced.
- Avoid TypeScript `enum`.
- Keep runtime JSON as `unknown` until validated.
- Do not hardcode principle count, CTA labels, CTA hrefs, role count, or evidence count in the template.
- Preserve JSON order unless a documented display-order field is introduced.
- External repository links must use `target="_blank"` and `rel="noopener"`.
- The consulting/training CTA may continue to point to `#contact` until STEP-05 implements final Contact content.
- Do not add routes such as `/modw`.
- Do not add final Contact content in this Step.

---

## 6. Content Requirements

The MOD-W section must explain, in concise page-level copy:

- MOD-W means Moderated AI Development Workflow.
- MOD-W is a human-in-the-loop governance methodology for AI-assisted software development.
- It addresses opaque AI code dumps, lost context, weak validation, and blurred responsibility.
- Its core idea is role separation, documents, review gates, cross-validation, and human Moderator approval.
- Its roles include Moderator, Product Owner, Tech Lead, Development Team, and QA / Tester.
- It is demonstrated through Frank's own Angular / SaaS projects.
- Visitors can read the GitHub repository or contact Frank about setup, training, or consulting.

Required terminology:

- Use "MOD-W" after first use of "Moderated AI Development Workflow (MOD-W)".
- Use "human-in-the-loop" when describing governance.
- Use "AI-assisted development", not "AI automation".
- Use "methodology" or "workflow", not "platform", "product", or "framework" when describing MOD-W.
- "viable coding, not vibe coding" may be used, but cannot be the only explanation.

Prohibited claims:

- Do not call MOD-W an "AI agent automation framework".
- Do not call it an "autonomous coding system".
- Do not imply it replaces developers.
- Do not imply it guarantees quality.
- Do not use unsupported productivity claims.
- Do not frame it as a SaaS product or company.

---

## 7. Runtime JSON Contract

The current minimal contract is:

```typescript
interface ModwContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly repositoryHref: string;
  readonly consultingHref: string;
  readonly principles: readonly ModwPrinciple[];
}
```

Development may expand this contract to support the required content without hardcoding copy in the template. Recommended expanded shape:

```typescript
interface ModwContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly problem: string;
  readonly coreIdea: string;
  readonly repositoryCta: ModwCta;
  readonly consultingCta: ModwCta;
  readonly principles: readonly ModwPrinciple[];
  readonly roles: readonly ModwRole[];
  readonly projectEvidence: readonly ModwProjectEvidence[];
}

interface ModwCta {
  readonly label: string;
  readonly href: string;
}

interface ModwPrinciple {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

interface ModwRole {
  readonly id: string;
  readonly label: string;
  readonly responsibility: string;
}

interface ModwProjectEvidence {
  readonly id: string;
  readonly label: string;
  readonly summary: string;
}
```

If the Development Team chooses a different shape, the same content and testability requirements must be preserved.

---

## 8. UI Requirements

MOD-W section should include:

- `section` with canonical id `modw`.
- Section eyebrow/index consistent with the design direction.
- `h2` heading from runtime JSON.
- Concise lead/summary from runtime JSON.
- A problem statement block.
- A core idea block.
- Principles rendered from JSON.
- Roles rendered from JSON.
- Project evidence rendered from JSON.
- Repository CTA rendered from JSON.
- Consulting/training CTA rendered from JSON.
- Loading state that is non-blank.
- Empty state that is calm and non-technical.
- Error state that is source-safe and non-technical.

Visual treatment:

- Use the approved MOD-W pillar direction: restrained, technical, and evidence-first.
- Chamfered treatment is appropriate for the MOD-W pillar if implemented cleanly.
- Keep content concise and scannable; do not turn the section into long documentation.
- Avoid visual metaphors that imply autonomous AI control or generic AI hype.
- Do not introduce layout shifts on hover or loading state changes.

---

## 9. Test IDs

Use and reconcile these selectors:

```text
modw-section
modw-section-heading
modw-section-summary
modw-problem
modw-core-idea
modw-principle-{id}
modw-role-{id}
modw-project-evidence-{id}
modw-repository-cta
modw-consulting-cta
modw-loading
modw-empty
modw-error
```

`modw-contact-cta` may remain as a compatibility alias if existing tests depend on it, but new STEP-04 tests should prefer `modw-consulting-cta`.

---

## 10. Acceptance Checks

The Step is acceptable when:

1. MOD-W rendering is owned by a dedicated section component.
2. The section fetches or receives runtime JSON content from `/content/modw.json`.
3. The template does not hardcode principle count, role count, evidence count, CTA labels, or CTA hrefs.
4. The JSON contract is validated before typed content is exposed.
5. The section renders title, summary, problem statement, core idea, principles, roles, project evidence, repository CTA, and consulting/training CTA.
6. Principle count and order are driven by JSON.
7. Role count and order are driven by JSON.
8. Project evidence count and order are driven by JSON.
9. Repository CTA opens the approved MOD-W repository in a new tab with `rel="noopener"`.
10. Consulting/training CTA points to `#contact` unless Moderator approves another target.
11. Loading, empty, and error states remain non-blank and source-safe.
12. MOD-W copy uses approved terminology: human-in-the-loop, AI-assisted development, methodology/workflow.
13. MOD-W copy does not describe MOD-W as an automation framework, autonomous agent framework, SaaS product, company, replacement for developers, or quality guarantee.
14. Existing STEP-01 runtime loading tests still pass.
15. Existing STEP-02 nav, hero, and engagement path behavior still works.
16. Existing STEP-03 Case Studies behavior still works.
17. The implementation does not add routes, detail pages, CMS/admin, backend, CV/resume page, CV download link, or contact form.
18. Tests cover MOD-W runtime rendering, principle/role/evidence rendering, CTA labels/hrefs, loading/empty/error states, prohibited claims, and preserved prior-step behavior.
19. `npm run build` passes.
20. Relevant unit/integration tests pass.
21. Relevant E2E tests pass or a blocker is documented with closest available verification.

---

## 11. Test Expectations

Minimum tests:

- Component/integration test that MOD-W section renders content from configured runtime state.
- Component/integration test that every configured principle renders.
- Component/integration test that every configured role renders.
- Component/integration test that every configured project evidence item renders.
- Component/integration test that repository and consulting/training CTAs use configured labels and hrefs.
- Component/integration tests for loading, empty, and error states.
- Unit or integration test that malformed expanded JSON is rejected.
- Unit or integration test that prohibited MOD-W claims are not rendered from production JSON.
- E2E test that MOD-W content loads from runtime JSON at `/`.
- E2E test that repository and consulting/training CTAs are visible.
- E2E or integration coverage that STEP-02 first-screen/nav and STEP-03 Case Studies behavior still works.

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

- `#contact` remains an anchor placeholder until STEP-05.
- Final About and Contact content remain out of scope.
- Bio-Align and Prismatic copy remains conservative and should be reviewed before public launch.
- Local Playwright has shown intermittent dev-server flakes in prior Steps; rerun once before treating a connection-only failure as an implementation blocker.

---

## 14. Recommended Next Action

STEP-04 is complete. Proceed to STEP-05 planning.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
