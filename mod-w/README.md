# Handoff: Frank McGuire Portfolio (MOD-W Prototype Ceremony)

## Overview
Dark-theme, single-page portfolio for Frank McGuire — senior frontend engineer + freelance consultant, with MOD-W (his AI-assisted dev workflow) as a credibility pillar. Built via the MOD-W v4 Prototype Ceremony (Designer + Prototyper role).

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** — clickable prototypes showing intended look, layout, and behavior. They are **not production code to copy directly**. The task is to **recreate these designs in Angular v21.1.0** (the target repo at `frank-mcguire-portfolio`), using idiomatic Angular patterns (standalone components, signals, etc.) — not by importing this HTML/CSS/JS wholesale.

Per MOD-W, this prototype is advisory input; the Tech Lead independently authors `ARCHITECTURE.md` and may override anything the prototype implies. `mod-w/ARCHITECTURE-NOTES.md` (included) is the Designer's advisory input to that step — not a constraint.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and component states are intentional and specified below — recreate pixel-close using Angular + CSS (no CSS framework required; plain component-scoped CSS or a design-token stylesheet works). Body copy throughout is **lorem ipsum placeholder** — do not treat as final content.

## Two Directions Included
Both share one design system (tokens/components below); only the hero composition differs.
- **`prototype/index.html` — Editorial Left (PRIMARY, chosen direction).** Build this one.
- **`prototype/technical-hud.html` — Technical HUD (alternate, kept for reference only).** Not required for build; its bordered "status panel" component may be reused elsewhere (e.g. About or a future dashboard) if useful.
- A bottom-center "direction switcher" pill on both pages is a **prototype-only comparison aid** — do not build it into production.

## Screens / Views (Editorial Left — `index.html`)

### 1. Nav (sticky)
- Fixed top bar: left brand wordmark "FRANK·McGUIRE", right side: pill nav (Home/Work/MOD-W/About/Contact, active item white capsule) + a persistent "Get in touch" primary button + hamburger toggle (mobile, <900px) opening a full-screen `.mobile-menu`.

### 2. Hero — Editorial Left
- Left-aligned column, max-width 680px: eyebrow availability badge (dot + "AVAILABLE — FULL-TIME & FREELANCE"), oversized name `h1` ("Frank McGuire", Space Grotesk weight 400, `clamp(56px,9vw,124px)`, line-height 0.92, letter-spacing -0.015em), lead paragraph (Space Grotesk 300, `clamp(18–24px)`), two CTAs ("View Case Studies →" primary, "The MOD-W Method" ghost).
- Right side: offset decorative dotted concentric rings (SVG) + soft glow, positioned ~top:50%/right:-60px, 620×620, opacity 0.42 — purely atmospheric, non-interactive.
- Below the fold of the hero: a compact mono **availability strip** — 5 items (Full-time: OPEN, Freelance: OPEN, Location: REMOTE/EU, Stack: ANGULAR·VUE·REACT, MOD-W: AUTHOR), separated by a hairline top border, "OPEN" values in accent teal.
- Background: fixed signature **right-half radial gradient** (see Design Tokens) + a faint masked line grid — both `position:fixed`, sit behind all content.

### 3. Value Proposition ("01 — How I Engage")
- Section head (index label, `h2`, supporting lorem paragraph) + 3-column value cards: FULL-TIME / FREELANCE / ADVISORY, each with a small mono label, `h3`, and short lorem paragraph.

### 4. Case Studies ("02 — Selected Work")
- 6 bordered project cards in a responsive grid (3-col desktop → 1-col mobile): index number, project-type mono tag, title, lorem description, small tag chips, arrow icon. First card ("MQTT-Align") has a `proprietary` visual variant (subtle distinction, e.g. dashed tag or lock icon — see prototype for exact treatment). Cards are full-card links; hover raises border opacity.

### 5. MOD-W Pillar ("03 — Methodology")
- One large **chamfered panel** (clipped top-right corner via `clip-path`) with a two-column layout: left = pillar description + two CTAs ("Read the methodology →", "Training & consulting"); right = 4 numbered principles (role separation, cross-model validation, human moderation gate, small reviewable steps), each with a mono index, `h4`, and lorem sentence, separated by hairline rules.

### 6. About ("04 — About")
- Two-column: section head left, body copy (2 lorem paragraphs) + a metadata list (Experience/Frameworks/Focus/Based in) right.

### 7. Contact ("05 — Contact")
- Heading + lead, then **two parallel contact paths** side by side (Full-time / Freelance), each with an eyebrow tag, `h3`, lorem paragraph, and a `mailto:` CTA button. Below: a row of plain text links (LinkedIn ↗, GitHub ↗, email address).

### 8. Footer
- Simple bar: copyright left, "BUILT WITH MOD-W · ANGULAR v21" right, both small mono uppercase.

## Interactions & Behavior
- **Scroll-spy nav:** active pill updates to the section currently in view (see `app.js`).
- **Reveal-on-scroll:** elements with `.reveal` fade/slide in once on intersection (IntersectionObserver, one-shot, respects `prefers-reduced-motion` — skip animation entirely if set).
- **Mobile menu:** hamburger toggles a full-screen overlay nav; closes on link click or explicit close button.
- **Hover states:** cards raise border opacity (~0.12→0.28); primary buttons get a soft teal glow + 1px lift; nav links brighten from muted to full white.
- **No client-side routing** — single page, anchor-link (`#section`) navigation only.

## State Management
None beyond UI-local state (mobile menu open/closed, active nav section via scroll position). No forms, no data fetching — this is a static content page. If Angular signals are used, a single `activeSection` signal driven by an IntersectionObserver (or CDK ScrollSpy-equivalent) covers the nav.

## Design Tokens
**Colors**
- `--bg`: `#08080A` (canvas)
- `--panel`: `#000000` (card fill)
- `--border`: `rgba(255,255,255,0.12)` / `--border-strong`: `rgba(255,255,255,0.30)` (hover)
- `--text`: `#F4F4F5` / `--muted`: `#8C8C93` / `--faint`: `#54545A`
- `--accent`: `#63CDDC` (crystal/blue teal) — `--accent-rgb: 99,205,220` for alpha compositing
- `--warn`: `#F5B14C` (reserved — status/proprietary use only, not decorative)

**Background — signature right-half radial gradient** (fixed layer, behind content):
```css
background:
  radial-gradient(58% 72% at 78% 48%, rgba(170,200,210,0.11), rgba(8,8,10,0) 60%),
  radial-gradient(40% 52% at 82% 44%, rgba(99,205,220,0.055), rgba(8,8,10,0) 55%);
```
Anchored right-of-center (78–82% x, ~48% y) so it lights the right side while the left-aligned hero copy stays high-contrast. Keep intensity low — atmosphere, not a spotlight.

**Typography**
- Display: **Space Grotesk** (300/400/500/600/700) — headings, hero name
- Body: **Hanken Grotesk** (300/400/500) — paragraphs
- Mono: **JetBrains Mono** (400/500/700) — labels, tags, index numbers, availability strip

**Borders / shape**
- Hairline `1px solid var(--border)` everywhere; raises to `var(--border-strong)` on hover
- Cards: soft-rounded rects (~11–14px radius)
- MOD-W panel + Technical-HUD panel only: **chamfered** (clipped top-right corner) via `clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)`

**Spacing scale:** an `--s1…--s10` step scale is defined in `styles.css` (see `:root`) — reuse those steps rather than inventing new spacing values.

Full token list, component states (default/hover/active/disabled/empty), and rationale for every choice: see `mod-w/DESIGN-SPEC.md` (included).

## Assets
No image assets — everything is CSS/SVG (gradients, dotted rings, chamfer clip-paths) and Google-fonts type. Fonts loaded via Google Fonts CDN in the prototype; **recommend self-hosting + subsetting** in production for LCP (noted in `ARCHITECTURE-NOTES.md`).

## Screenshots
`screenshots/` contains reference captures: `editorial-left-hero.png`, `editorial-left-work.png` (case studies + MOD-W + about + contact), `editorial-left-contact.png`, and `technical-hud-full.png` / `-work.png` / `-modw.png` for the alternate direction.

## Files in this bundle
- `prototype/index.html` — Editorial Left, the direction to build
- `prototype/technical-hud.html` — Technical HUD alternate (reference only)
- `prototype/styles.css` — all design tokens + component + layout CSS for both directions
- `prototype/app.js` — nav scroll-spy, mobile menu, reveal-on-scroll
- `prototype/README.md` — original non-production disclaimer from the Prototype Ceremony
- `mod-w/DESIGN-SPEC.md` — full design spec: tokens, component states, layouts, interaction notes, domain-language proposals, open questions
- `mod-w/ARCHITECTURE-NOTES.md` — Designer's advisory notes to the Tech Lead (performance, structure, content-model observations)

## Open Questions (carried from DESIGN-SPEC — resolve before/during build)
- Authoritative case-study roster: the 6 projects shown vs. the fuller `PRODUCT.md` list (Cavalieri Align, PAKi, travel-IT, Kaufland, etc.)
- Case-study interaction depth: flat cards (as built) vs. expand-to-detail — flat was chosen for v1
- Exact contact mechanism: `mailto:` links (as built) vs. a contact form
- All body copy is placeholder lorem ipsum pending Frank's real content
