# Case Studies Update - Moderator Acceptance Record

**Date:** 2026-10-23
**Moderator:** Frank McGuire
**Decision:** Accepted by Moderator override of the standard MOD-W gates.

## Process deviation

This change was implemented without an active `STEP-XX.md`, a Development Team plan pause, a Tech Lead review, or a QA pass. The Moderator reviewed the content decisions in conversation (version table, label option A, Cleveland Institute of Art dates, one-line publications entry) and explicitly overrode the standard gates and accepted the result.

## Scope accepted

- Removed the Prismatic case study.
- Added Brand UI, IDP-Align, Continuous Alignment Verification (CAV), React Design Patterns, and Academic and Training Experience.
- Updated Bio-Align, Angular Design Patterns, and AGV Fleet Management Simulator descriptions, technologies, and links (Angular Design Patterns gains its repository link, resolving the `mod-w/QA.md` content observation).
- Ordered projects by initial commit date, newest first; employment summaries and the Academic and Training card follow.
- MOD-W excluded from case studies (it has its own section).
- Added MOD-W version to each project via `modwRelevance`: v5.0.1 (Brand UI, IDP-Align), v2.1.0 (Bio-Align, from the repo's `mod-w/MOD-W.md`), early MOD-W (React Design Patterns, Angular Design Patterns, MQTT-Align, AGV; first commits predate v1.0.0), not built under MOD-W (CAV).
- Added `academic-training` classification and `education-summary` status values and labels to `case-study.model.ts`.
- Added "mentoring" to the Case Studies section intro.

## Superseded documents

`mod-w/PRODUCT.md` (section 14 launch set, AC5) and the Step 03/04 notes on Prismatic describe the earlier case-study set. They are superseded by this record and were not edited; the Product Owner may fold this into a future PRODUCT.md revision.

## Verification

- `npm run build`: pass.
- `npm test`: pass (23 files, 145 tests).
- `npm run test:e2e`: 53 passed, 1 skipped (54). Run before the final intro and role text edits; unit tests were re-run after them.

## Open items

- Confirm that React Design Patterns, Angular Design Patterns, MQTT-Align, and AGV were built under early MOD-W (inferred from dates).
- Brand UI and IDP-Align status remains `public-repository`; `public-demo` is an option now that live links exist.

---

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/mod-w
