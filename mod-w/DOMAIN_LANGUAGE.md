# Domain Language - Frank McGuire Portfolio

**Status:** Approved by Moderator on 2026-07-29  
**Tech Lead:** Codex  
**Applies to:** Product, architecture, implementation, tests, and review

---

## 1. Purpose

This document defines canonical terms for the Frank McGuire portfolio implementation. Development must use these terms consistently in production code, test names, `data-testid` values, JSON fields, and MOD-W artifacts.

When this document conflicts with prototype terminology, this document wins for implementation.

---

## 2. Product Terms

| Term | Definition | Usage |
| --- | --- | --- |
| Portfolio | The compact single-page website for Frank McGuire. | Product and page-level references. |
| Frank McGuire | The person represented by the portfolio. | User-facing identity and profile content. |
| Senior Frontend Engineer | Frank's primary full-time professional positioning. | Hero, recruiter-facing copy, contact path. |
| Frontend Consultant | Frank's freelance/B2B positioning. | Hero, engagement paths, contact path. |
| Full-time | Employment opportunity path. | Use as user-facing term and data id `full-time`. |
| Freelance | B2B contract opportunity path. | Use as user-facing term and data id `freelance`. |
| Advisory | MOD-W training, consulting, or setup support. | Secondary engagement path. Do not make it a standalone Services section in v1. |
| Contact Path | One conversion path in the Contact section. | Use for full-time and freelance cards. |
| Engagement Path | One way Frank can work with a visitor: full-time, freelance, or advisory. | Use for Home/engagement value tiles. |
| Case Study | A structured proof item showing project, experience, or methodology evidence. | User-facing section and JSON content. |
| Professional Experience Highlight | A case-study-like summary of employment work. | Use for PAKi, travel-IT, and Kaufland. |
| Project Classification | User-facing distinction between independent product, personal project, open source, professional experience, and proprietary work. | Required on case-study cards. |
| Project Status | User-facing publication/access status, such as public repository or private/proprietary. | Required on case-study cards. |

---

## 3. MOD-W Terms

| Term | Definition | Usage |
| --- | --- | --- |
| Moderated AI Development Workflow (MOD-W) | Full name on first mention. | First user-facing mention in MOD-W section or About. |
| MOD-W | Short name after first mention. | User-facing copy, code ids, test ids. |
| human-in-the-loop | Governance framing for MOD-W. | Use in MOD-W explanatory copy. |
| AI-assisted development | Preferred description of AI-supported engineering work. | Use instead of "AI automation". |
| methodology | Preferred noun for MOD-W. | Use in copy and headings. |
| workflow | Acceptable noun for MOD-W. | Use when describing process. |
| viable coding, not vibe coding | Optional tagline. | May be used, but never as the only explanation of MOD-W. |
| Moderator | Human final decision authority in MOD-W. | MOD-W explainer and internal artifacts. |
| Product Owner | MOD-W role responsible for product intent and acceptance validation. | MOD-W explainer and artifacts. |
| Tech Lead | MOD-W role responsible for architecture, roadmap, Step authoring, and technical review. | Internal artifacts and optional MOD-W explainer. |
| Development Team | MOD-W role responsible for implementing approved Steps. | Internal artifacts and optional MOD-W explainer. |
| QA / Tester | MOD-W role responsible for quality validation. | Internal artifacts and optional MOD-W explainer. |
| Step | A small, coherent, approved implementation unit in MOD-W. | Always capitalize when referring to MOD-W work units. |

Avoid these terms for MOD-W:

- AI agent automation framework
- autonomous coding system
- replaces developers
- guarantees quality
- AI automation
- platform, product, or SaaS when describing MOD-W

---

## 4. Technical Terms

| Term | Definition | Canonical code form |
| --- | --- | --- |
| Portfolio Page | The top-level production page component for the SPA. | `PortfolioPageComponent` |
| Runtime Content | Content loaded by the browser from static JSON under `public/content/`. | `RuntimeContent`, `ContentLoadState<T>` |
| Content Load State | The loading, ready, empty, or error state for runtime JSON. | `ContentLoadState<T>` |
| Case Studies Content Service | Service that loads `/content/case-studies.json`. | `CaseStudiesContentService` |
| MOD-W Content Service | Service that loads `/content/modw.json`. | `ModwContentService` |
| Case Study Card | Presentational component for one `CaseStudy`. | `CaseStudyCardComponent` |
| MOD-W Section | Section rendered from runtime MOD-W JSON. | `ModwSectionComponent` |
| Section Header | Shared section heading pattern. | `SectionHeaderComponent` |
| Chamfer Panel | Shared clipped-corner panel used for MOD-W and possible HUD surfaces. | `ChamferPanelComponent` |
| Reveal on Scroll | Progressive enhancement for section reveal animation. | `RevealOnScrollDirective` |
| Active Section | Current section id used by nav scroll-spy. | `activeSection` |
| Mobile Menu | Small-screen navigation overlay. | `isMobileMenuOpen` |

---

## 5. Runtime JSON Terms

### CaseStudy

Canonical type name: `CaseStudy`

Canonical fields:

- `id`
- `title`
- `projectType`
- `classification`
- `status`
- `role`
- `summary`
- `evidence`
- `technologies`
- `modwRelevance`
- `href`

Canonical classification values:

- `independent-product`
- `personal-project`
- `open-source`
- `professional-experience`
- `proprietary`

Canonical status values:

- `public-demo`
- `public-repository`
- `private-proprietary`
- `employment-summary`

### ModwContent

Canonical type name: `ModwContent`

Canonical fields:

- `eyebrow`
- `title`
- `summary`
- `repositoryHref`
- `consultingHref`
- `principles`

Canonical principle type name: `ModwPrinciple`

Canonical principle fields:

- `id`
- `title`
- `summary`

---

## 6. Ratified Prototype Terms

| Prototype term | Decision | Canonical term | Rationale |
| --- | --- | --- | --- |
| HUD Status Panel | Modified | Chamfer Panel / Availability Strip | HUD panel is not primary v1 hero, but chamfered panel technique remains reusable. |
| Engagement Path | Ratified | Engagement Path | Accurately models full-time, freelance, and advisory paths. |
| Case Study Card | Ratified | Case Study Card | Core repeated proof component. |
| Project Type | Modified | Project Type plus Project Classification and Project Status | Product requires public/private/employment distinctions beyond type. |
| MOD-W Pillar | Modified | MOD-W Section | "Section" fits the SPA architecture better than "Pillar" in code. |
| Availability Status | Modified | Availability Signal | Avoid over-modeling availability as a formal enum unless status behavior expands. |
| Proprietary | Ratified | Proprietary | Required for source-safe project classification. |

---

## 7. Naming Rules

- Use `modw` in code identifiers and test ids, not `mod-w`, where hyphens are not valid.
- Use `MOD-W` in user-facing copy.
- Use `work` as the section id for Case Studies to preserve short anchors.
- Prefer "Case Studies" as the nav label unless Moderator approves "Work".
- Use `full-time`, not `fulltime`, for user-facing data ids and test ids.
- Use `caseStudy` for a single item and `caseStudies` for collections.
- Use `runtime content` for JSON-loaded content, not CMS content.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
