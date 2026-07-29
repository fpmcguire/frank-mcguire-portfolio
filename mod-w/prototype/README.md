# Prototype — Frank McGuire Portfolio

**Status:** Research artifact. **Non-authoritative.**

---

This folder contains a clickable prototype produced by the **Designer + Prototyper** role (Claude Design) during the Project Kickoff Prototype Ceremony.

## What this is

A working demonstration that the design works under realistic conditions. The prototype simulates the product's primary workflows, demonstrates every screen in `mod-w/DESIGN-SPEC.md` scope, and exists as evidence the design is buildable.

- **Direction:** **Editorial Left** (primary, `index.html`) — left-aligned identity, oversized light headline, offset right-half glow + dotted ring, compact mono availability strip. A **Technical HUD** alternate (`technical-hud.html`) keeps the bordered status-panel hero as a documented runner-up. Both share one design system. Single dark theme, hairline borders, crystal-teal accent, chamfered MOD-W/HUD panels.
- **Stack:** plain HTML + CSS + vanilla JS. **No framework, no production source imported.**
- **Files:** `index.html` / `technical-hud.html` (markup for the two directions), `styles.css` (design tokens + components + both hero variants), `app.js` (nav, scroll-spy, reveal-on-scroll). A bottom-center **direction switcher** toggles the two pages — a prototype-only affordance, not part of the production design.
- **Type:** Space Grotesk (display) · Hanken Grotesk (body) · JetBrains Mono (labels).
- **Background:** signature **right-half radial gradient** (see `DESIGN-SPEC.md §1.4a`).
- **Content:** structural labels are real; body copy is **lorem ipsum** pending Frank's text.

### Run it

Open `index.html` in any browser (Editorial Left — primary), or serve the folder statically. No build step. Use the bottom-center switcher (or open `technical-hud.html`) to view the alternate direction.

## What this is NOT

- **Not production code.** Do not import from this folder into `src/`.
- **Not architecturally canonical.** Patterns here are research output. The authoritative architecture lives in `mod-w/ARCHITECTURE.md`, authored by the Tech Lead.
- **Not a Reference Implementation by default.** A Reference Implementation status is granted only when the Tech Lead explicitly disposes of a specific prototype component in a `STEP-XX.md §"Reference Implementation"` block.

## How this folder is used downstream

1. The Tech Lead (Codex) reads this folder during Architecture Definition as one of the kickoff inputs.
2. The Tech Lead may reference specific files here in `STEP-XX.md` as a Reference Implementation with one of three dispositions: `Adopt as-is`, `Adopt with modifications`, or `Reject`.
3. The Development Team reads dispositions in `STEP-XX.md` and proceeds accordingly. The Dev Team does **not** read this folder directly.

## Lifecycle

- **Created:** During the Prototype Ceremony.
- **Frozen:** At the Architecture Handoff. Once `ARCHITECTURE.md` is approved, this folder is read-only.
- **Retained:** For the life of the project, as historical context.

---

MOD-W v4.0.0
