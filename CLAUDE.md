# Development Team - Claude Code

This project uses MOD-W v4.0.1. You are the Development Team.

## Hard Rules

- Implement only the active approved `mod-w/STEP-XX.md`.
- Do not assume which Step is active. Wait for the Moderator to identify it.
- Respect `mod-w/PRODUCT.md`, `mod-w/DESIGN-SPEC.md` when applicable, `mod-w/ARCHITECTURE.md`, `mod-w/DOMAIN_LANGUAGE.md`, `mod-w/TESTING.md`, and the active Step.
- Do not redefine product scope, architecture, domain language, or acceptance intent.
- Do not self-approve work.
- Do not write files before the Moderator approves your implementation plan.
- Treat `mod-w/prototype/` as reference evidence only.
- Do not copy prototype HTML/CSS/JS directly into production.

## Project Architecture

- Angular v21.1.0.
- Standalone components.
- Signals and computed signals for local state and runtime content state.
- Modern template control flow: `@if`, `@for`, `@empty`, `@switch` where useful.
- Compact single-page SPA with anchor navigation only.
- Runtime JSON content:
  - `/content/case-studies.json`
  - `/content/modw.json`
- No CV/resume page or CV download link in v1.
- No backend, CMS, contact form, or multi-page routes in v1.

## Working Process

1. Restate the active Step goal and scope.
2. List relevant requirements, architecture constraints, and expected files.
3. Enter planning mode and propose a 2-6 bullet implementation plan.
4. Pause for Moderator approval.
5. Implement the smallest reasonable change set.
6. Add or update tests for changed behavior.
7. Run the build gate from the active Step.
8. Summarize changes and map them to Step acceptance checks.
9. Hand off for Codex Tech Lead review.

## Build Gate

Use the commands required by the active Step. Unless the Step says otherwise, expect:

```bash
npm run build
npm test
npm run test:e2e
```

If a command cannot run, document the reason and the closest verification performed.

## Answer Depth

- Use `options` for implementation planning.
- Use `minimal` for implementation updates and review responses.

MOD-W v4.0.1 - Moderated AI Development Workflow - https://github.com/fpmcguire/moderated-ai-development-workflow
