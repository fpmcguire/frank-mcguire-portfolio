# Design Spec — Frank McGuire Portfolio

**Date:** June 13, 2026
**Designer:** Claude Design (Designer + Prototyper)
**Authored in:** CLAUDE_DESIGN
**Prototype:** `prototype/index.html` (Editorial Left — primary) · `prototype/technical-hud.html` (Technical HUD — alternate)

> **Status:** Approved by Product Owner and Moderator for v1 implementation and publication.

---

## Design Principles

- **Evidence-first.** Proof (case studies, the MOD-W method) leads; decoration follows. No hype.
- **Senior & minimal.** Near-monochrome, generous space, hairline structure. Restraint signals seniority.
- **Engineered, not flashy.** A "technical HUD" texture — mono labels, bordered panels, status readouts — earns its place by communicating, never as ornament.
- **Dual positioning, equal weight.** Full-time and freelance are surfaced together at every conversion point.
- **Accessible by default.** AA contrast, full keyboard path, visible focus, reduced-motion honored.

---

## 1. Visual Identity

### 1.1 Color Palette

Single dark theme (no light theme — confirmed by Moderator). Near-monochrome with one teal accent.

| Token             | Value                    | Role                                                        |
| ----------------- | ------------------------ | ----------------------------------------------------------- |
| `--bg`            | `#08080A`                | Page canvas (near-black, faint cool cast)                   |
| `--bg-2`          | `#050506`                | Inset panel fill (HUD / MOD-W interior)                     |
| `--panel`         | `#000000`                | Card fill (true black)                                      |
| `--panel-2`       | `#0B0B0D`                | Card fill on hover                                          |
| `--border`        | `rgba(255,255,255,0.12)` | Default hairline border                                     |
| `--border-soft`   | `rgba(255,255,255,0.07)` | Section dividers, tag outlines                              |
| `--border-strong` | `rgba(255,255,255,0.30)` | Hover border, ghost-button outline                          |
| `--text`          | `#F4F4F5`                | Primary text                                                |
| `--muted`         | `#8C8C93`                | Secondary text, descriptions                                |
| `--faint`         | `#54545A`                | Tertiary / decorative mono labels only                      |
| `--accent`        | `#63CDDC`                | Crystal/blue teal — links, active state, availability, CTAs |
| `--accent-rgb`    | `99, 205, 220`           | RGB channels for accent (glow/shadow alphas)                |
| `--accent-dim`    | `rgba(99,205,220,0.16)`  | Accent wash / focus ring                                    |
| `--warn`          | `#F5B14C`                | Amber — reserved for "proprietary" tag & status only        |

**Contrast (WCAG):** `--text` on `--bg` ≈ 17:1 (AAA). `--muted` on `--bg` ≈ 6.3:1 (AA for body). `--faint` ≈ 3.0:1 — **restricted to large/decorative mono labels, never body copy** (flagged in §8). `--accent` on `#04110f` button fill ≈ AA.

> **Options — accent color.** (A) **Crystal/blue teal `#63CDDC`** _(recommended — chosen)_: cooler, lower-chroma teal that leans blue/icy; reads technical/senior without the neon-mint glare. (B) Brighter mint-teal `#5EEAD4`: continuity with Frank's Bio-Align SaaS but more saturated. (C) Electric indigo `#7C8Cff`: cooler, more "product". (D) Fully monochrome (white-only accent): boldest/most austere, but weakens the dual-availability signal. Recommendation: **A**, with amber `--warn` held strictly in reserve for proprietary/status semantics.

### 1.2 Typography

| Role    | Family             | Weights                     | Usage                                                   |
| ------- | ------------------ | --------------------------- | ------------------------------------------------------- |
| Display | **Space Grotesk**  | 700 / 600 / 500 / 400 / 300 | Name, section titles, card/panel headings               |
| Body    | **Hanken Grotesk** | 300 / 400 / 500             | Paragraphs, leads, descriptions                         |
| Mono    | **JetBrains Mono** | 400 / 500 / 700             | Labels, section numbers, status readouts, tags, buttons |

**Type scale (px / clamp):**

| Element                                  | Size                                                            |
| ---------------------------------------- | --------------------------------------------------------------- |
| Hero name `h1` (Editorial Left, primary) | `clamp(56, 9vw, 124)`, weight 400, line 0.92, tracking -0.015em |
| Hero name `h1` (Technical HUD, alt)      | `clamp(48, 7vw, 92)`, weight 500, line 0.96, tracking -0.01em   |
| Contact `h2`                             | `clamp(38, 6vw, 72)`, weight 600                                |
| Section `h2`                             | `clamp(30, 4vw, 46)`, weight 600                                |
| Card `h3`                                | 23, weight 500                                                  |
| Lead paragraph                           | 17–18, weight 300                                               |
| Body                                     | 14–16, weight 300                                               |
| Mono label                               | 11–12, letter-spacing 0.20–0.26em, uppercase                    |

> **Display face — resolved.** The references read as a wide squared techno face. Chosen: **Space Grotesk** — a refined squared grotesque that stays crisp and elegant at large display sizes (the earlier Chakra Petch read too blocky at the ~124px hero). Large headlines are set **light** (weight 400–500) per the reference feel. Mono labels remain JetBrains Mono. Swap is a one-line `--display` change. _(Prior candidate Chakra Petch retained in history; rejected for blockiness at scale.)_

### 1.3 Spacing & Layout System

- **Base unit 8px.** Tokens `--s1`(4) … `--s10`(128).
- **Content max-width** `1200px`; **gutter** `40px` → `28px` (≤980) → `20px` (≤640).
- **Section rhythm:** `--s9` (96px) vertical padding, `--s7` on mobile; sections separated by `--border-soft` top rule.
- **Hero grid:** Editorial Left (primary) — left identity + availability strip, ring/glow offset right, single column ≤980. Technical HUD (alt) — `1.1fr / 0.9fr` (identity / HUD) → single column ≤980.
- **Card grid:** 3-up → 2-up (≤980) → 1-up (≤640).

### 1.4 Borders, Radius & Elevation

- **Borders are the primary visual language.** 1px hairlines; brighten to `--border-strong` on hover.
- **Two corner treatments, used deliberately:**
  - **Chamfered (clip-path, 24px; 32px on MOD-W)** — reserved for the **HUD status panel** and **MOD-W pillar** only (the "engineered" signature). Implemented as a 2-layer technique (`.chamfer` border layer + `.chamfer-in` inset fill).
  - **Soft-rounded (`--radius` 14px)** — all cards, value tiles, contact paths.
- **Elevation:** essentially flat. No drop shadows. Depth comes from border contrast + the fixed background glow. Only exception: teal **glow** on primary-button hover.

### 1.4a Background & Atmosphere _(signature — right-half radial gradient)_

The page canvas is `--bg` (`#08080A`, near-black with a faint cool cast). Over it sit **two fixed decorative layers** (`position:fixed; z-index:0`), behind all content (`z-index:1`):

1. **Right-half radial bloom (signature).** A single soft radial gradient anchored to the **right half** of the viewport, vertically centred — origin ≈ **`78% x / 48% y`**. It reads as a cool light source off to the right, deliberately leaving the **left / centre column calm and high-contrast** — which is exactly where the Editorial-Left hero identity and copy live. A second, smaller **accent-tinted** bloom (crystal-teal, ~5–6% alpha) nests just inside it for a faint chromatic lift. Implemented in `.bg-glow`:
   ```css
   .bg-glow {
     position: fixed;
     inset: 0;
     z-index: 0;
     pointer-events: none;
     background:
       radial-gradient(58% 72% at 78% 48%, rgba(170, 200, 210, 0.11), rgba(8, 8, 10, 0) 60%),
       radial-gradient(40% 52% at 82% 44%, rgba(99, 205, 220, 0.055), rgba(8, 8, 10, 0) 55%);
   }
   ```
   **Knobs:** origin `at X% Y%` (right-half = X ≈ 72–82%); ellipse radii (first `W% H%` pair); intensity (stop alpha); falloff (transparent stop %, larger = softer edge). Keep total intensity low — this is _atmosphere_, not a hero banner; it must never compete with text contrast.
2. **Masked grid.** A 64px line grid (`.bg-grid`) at ~3.5% opacity, radially masked so it fades at the edges. Purely decorative; safe to drop on low-end GPUs (see ARCHITECTURE-NOTES §1).

The Editorial-Left hero additionally carries a **local** bloom + concentric dotted ring (`.hero-b-glow` / `.hero-b-ring`) offset to the same right side, reinforcing the fixed background within the first viewport. Both honor `prefers-reduced-motion` (no animation) and are non-interactive.

> **Why right-half (not centered).** The original brief explored a centered glow; once **Editorial Left** was chosen the bloom moved **right** so the luminous area balances the left-anchored headline and the negative space reads as intentional composition rather than a symmetric "landing-page" wash. Documented per Moderator request.

### 1.5 Tone & Personality

Confident, precise, understated. Copy is declarative ("Two ways to work together."), labels are systematic (`01 — HOW I ENGAGE`). The interface should feel like an instrument panel built by someone who ships — not a marketing site.

---

## 2. Accessibility Baseline

- **WCAG AA** for all text (see §1.1 contrast notes; `--faint` restricted).
- **Keyboard:** every interactive element reachable & operable; logical DOM order matches visual order; skip-to-content recommended (see §8).
- **Visible focus:** required on all interactive elements: 2px `--accent` outline + `--accent-dim` ring, with no focus suppression and clear contrast on dark surfaces.
- **Motion:** `prefers-reduced-motion` disables reveal transitions, the availability-dot pulse, and smooth-scroll.
- **Semantics:** `<nav> <header> <main> <section> <footer>`, single `<h1>`, sequential headings, `aria-label` on the HUD and icon-only controls.
- **Targets:** ≥44px hit area on nav/CTA/mobile-toggle.

---

## 3. Component Library

`data-testid` convention (proposed): **`{feature}-{component}-{element}-{modifier?}`**

### 3.1 Top Nav (`nav`)

- **Purpose:** persistent wayfinding + always-visible Contact CTA.
- **Elements:** brand wordmark, pill nav (Home/Work/MOD-W/About/Contact), primary "Get in touch" CTA, mobile hamburger.
- **States:** link `default` / `hover` (→ `--text`) / `active` (white capsule, set by scroll-spy); nav `at-top` vs `scrolled` (blur backdrop always on); mobile `collapsed`.
- **testid:** `nav-pill-link-work`, `nav-pill-link-work-active`, `nav-cta-contact`, `nav-toggle-mobile`.

### 3.2 Button (`btn`)

- **Variants:** `primary` (teal fill), `ghost` (outline), `sm` (compact).
- **States:** default / hover (primary: lift + teal glow; ghost: border+text → teal) / focus (ring) / active / disabled (40% opacity, no pointer).
- **testid:** `{feature}-{action}-cta`, e.g. `work-view-cta`, `contact-fulltime-cta`.

### 3.3 HUD Status Panel (`hud`) _(chamfered — Technical HUD alternate)_

- **Purpose:** at-a-glance availability + stack + MOD-W link; the hero's proof object in the Technical HUD direction. In the chosen Editorial Left hero this role is filled by the compact availability strip; the panel is retained as a reusable component.
- **Elements:** header (STATUS + animated availability dot), status rows (full-time / freelance / location / response), core-stack chips, MOD-W footer link.
- **States:** `available` (default, teal OPEN) / `limited` (amber) / `unavailable` (muted, dot static) — driven by a single status value.
- **testid:** `hero-hud-status`, `hero-hud-row-fulltime`, `hero-hud-row-freelance`, `hero-hud-chip-angular`.

### 3.4 Status Row (`hud-row`)

- Label (mono) + value (mono). Value modifiers: `open` (teal) / default (white) / `muted`.

### 3.5 Chip (`chip`)

- Stack/tech token. States: default / hover (→ teal border+text). Non-interactive by default; if linked to filtered work, add focus state.

### 3.6 Value Tile (`value`)

- **Purpose:** the three engagement paths (full-time / freelance / advisory).
- Elements: mono category, `h3`, description. States: default / hover (optional border brighten).
- **testid:** `approach-value-fulltime`.

### 3.7 Case Study Card (`card`)

- **Purpose:** primary proof unit. Title · type · short blurb · stack tags · arrow.
- **Variants:** `default`, `proprietary` (amber corner tag, type hidden).
- **States:** `default` / `hover` (lift, border-strong, `--panel-2`, arrow → teal & nudges) / `focus` (ring) / **`loading`** (skeleton: shimmer blocks for title/desc/tags) / **`empty`** (grid shows a single "Case studies coming soon" tile) / **`error`** (grid shows "Couldn't load work — retry" with retry button).
- **testid:** `work-card-mqtt-align`, `work-card-mqtt-align-proprietary`, `work-cards-empty`, `work-cards-error`, `work-cards-loading`.

> **v1 decision — card depth.** Ship **flat cards with no per-project detail route** in first implementation. Cards may link to public proof when available, or remain non-navigating for proprietary/professional summaries. Expand-in-place and `/work/:slug` are explicitly deferred to a later roadmap step.

### 3.8 Section Header (`section-head`)

- Mono index (`02 — SELECTED WORK`, teal) + `h2` + optional lead. testid: `work-section-head`.

### 3.9 MOD-W Pillar (`modw`) _(chamfered, 32px)_

- **Purpose:** establish MOD-W credibility + consulting CTA.
- Elements: lede statement, numbered principles list, dual CTA (read methodology / training & consulting).
- States: principle rows default; CTAs per §3.2. testid: `modw-principle-01`, `modw-read-cta`, `modw-consulting-cta`.

### 3.10 About Meta Row (`about-meta .row`)

- Key (mono) / value pair. testid: `about-meta-experience`.

### 3.11 Contact Path Card (`path`)

- **Purpose:** the two conversion paths. Elements: availability tag, `h3`, blurb, CTA (mailto). States: default / hover (border-strong).
- **testid:** `contact-path-fulltime`, `contact-path-freelance`, `contact-fulltime-cta`.
- **Note:** v1 contact mechanism is locked to `mailto:` (no form in first implementation). If a form is later approved, add field states `default/focus/invalid/submitting/success/error` in a future scope change.

### 3.12 Footer (`footer`)

- Copyright + "built with MOD-W" line. Static.

### 3.13 Mobile Menu (`mobile-menu`)

- Fullscreen overlay; states `closed` (default) / `open`. Closes on link tap or ✕. testid: `nav-mobile-menu`, `nav-mobile-close`.

### 3.14 Background Layers (`bg-glow`, `bg-grid`)

- Decorative, `aria-hidden`, fixed, non-interactive.

---

## 4. Screen Layouts

Single-page SPA; anchor-linked sections. (Live demonstration: `prototype/index.html`.)

```
┌───────────────────────────────────────────────┐
│ NAV  brand ······· [pill nav]  [Get in touch]  │  sticky
├───────────────────────────────────────────────┤
│ HERO   identity (name, lead, CTAs)              │  Editorial Left (primary):
│        + availability strip (full-time/freelance/…)│  left-aligned, ring+glow right
├───────────────────────────────────────────────┤
│ 01 — VALUE PROP   [full-time][freelance][advis]│  3-up tiles
├───────────────────────────────────────────────┤
│ 02 — CASE STUDIES   [mandatory launch set, 3-up grid] │
├───────────────────────────────────────────────┤
│ 03 — MOD-W PILLAR  [chamfered panel: lede |    │
│                      principles + CTA]         │
├───────────────────────────────────────────────┤
│ 04 — ABOUT   header │ narrative + meta rows    │  0.8fr / 1.2fr
├───────────────────────────────────────────────┤
│ 05 — CONTACT   headline + [full-time][freelance]│  centered, 2-up
│                + links row                      │
├───────────────────────────────────────────────┤
│ FOOTER  © · built with MOD-W                    │
└───────────────────────────────────────────────┘
```

- **Hero (chosen — Editorial Left, `index.html`):** left-aligned identity (oversized light name, lead, CTAs) with offset dotted ring + glow on the right; a compact mono **availability strip** (full-time / freelance / location / stack / MOD-W) sits below, separated by a hairline rule. Single-column reflow ≤980.
- **Hero (alternate — Technical HUD, `technical-hud.html`):** identity left, **HUD Status Panel** (§3.3) right at `1.1fr / 0.9fr`; stacks ≤980. Documented as the runner-up direction; the HUD panel remains a reusable component and may optionally appear lower on the primary page.
- **Page-level states:** `loading` (case-study grid skeleton if data-driven; rest static), `empty`/`error` scoped to the work grid only (§3.7). No global error state — the page is content-static.
- **Responsive:** 3 breakpoints (`>980`, `≤980`, `≤640`). Pill nav → hamburger overlay ≤640.

---

## 5. Interaction Patterns

- **Anchor nav + scroll-spy:** clicking a pill smooth-scrolls; the active pill updates from scroll position (`scroll-padding-top` offsets the sticky nav).
- **Reveal-on-scroll:** sections fade/translate in via IntersectionObserver. **Progressive enhancement** — content is visible by default; the `.js` class (added by `app.js`) enables the hidden→reveal transition, so no-JS and crawler/screenshot contexts still render fully.
- **Hover:** cards lift + border brighten + arrow nudge; chips & ghost buttons shift to teal; primary button lifts with teal glow.
- **Availability dot:** 2.4s opacity pulse; disabled under reduced-motion.
- **Mobile menu:** hamburger opens fullscreen overlay; closes on selection.
- **Focus:** keyboard focus ring is required on all interactive elements per §2.

---

## 6. Component–Step Mapping

> No `ROADMAP.md` exists yet — the Tech Lead owns step sequencing. This is a **proposed** build order for reference only.

| Component                                       | Proposed Step | Notes                                  |
| ----------------------------------------------- | ------------- | -------------------------------------- |
| Tokens, fonts, layout shell, bg layers          | STEP-01       | Design system → Angular styles/tokens  |
| Nav + scroll-spy + mobile menu                  | STEP-02       | Routing anchors                        |
| Hero (Editorial Left) + availability strip      | STEP-03       | Status value model (single source)     |
| Hero HUD status panel (alternate)               | STEP-03       | Reusable component; status value model |
| Value prop tiles                                | STEP-04       |                                        |
| Case study cards + grid (+ loading/empty/error) | STEP-05       | Decide data source (static vs CMS)     |
| MOD-W pillar                                    | STEP-06       |                                        |
| About                                           | STEP-07       |                                        |
| Contact (mailto v1)                             | STEP-08       | Form is a later step if chosen         |
| Footer, a11y pass, reduced-motion, focus rings  | STEP-09       |                                        |

---

## 7. Domain Language Proposals

> Surfaced during prototyping. **Non-authoritative** — for Tech Lead to ratify / modify / reject in `DOMAIN_LANGUAGE.md` during Architecture Definition.

| Proposed term           | Form              | Definition                                           | Rationale                                                    | First appearance    |
| ----------------------- | ----------------- | ---------------------------------------------------- | ------------------------------------------------------------ | ------------------- |
| **HUD Status Panel**    | component         | The hero's bordered availability/stack readout panel | Distinct, reusable; central to dual-availability positioning | Hero                |
| **Engagement Path**     | concept/type      | One of {full-time, freelance, advisory}              | Encodes the equal-weight dual positioning as data            | Value prop, Contact |
| **Case Study Card**     | component         | A single proof unit (title/type/blurb/tags)          | Primary content type; likely a data model                    | Work                |
| **Project Type**        | enum              | {SaaS, Simulation, Product, Open Source, Tooling}    | Classifies work; used as card label/filter                   | Work cards          |
| **MOD-W Pillar**        | component/section | The methodology credibility block                    | Named section with its own CTA semantics                     | MOD-W               |
| **Availability Status** | enum              | {available, limited, unavailable}                    | Drives HUD dot + row colors from one value                   | Hero HUD            |
| **Proprietary**         | flag              | Marks a project whose details are restricted         | Governs the amber tag + hidden details                       | MQTT-Align card     |

---

## 8. Product Owner Resolution for v1

### 8.1 Scope locks applied

1. **Design system authority for v1:** §1 is canonical for this implementation unless a Moderator-approved design-system artifact replaces it.
2. **Display font:** keep **Space Grotesk** (resolved in §1.2).
3. **Authoritative case-study roster:** use the mandatory launch set from `PRODUCT.md`:

- Cavalieri Align / MQTT-Align
- AGV Fleet Management Simulator
- Bio-Align
- Angular Design Patterns
- Professional experience highlights for PAKi, travel-IT, Kaufland

4. **Case-study depth:** flat cards only in v1; detail routes are deferred.
5. **Contact mechanism:** `mailto:` in v1 (no form in first implementation).
6. **Focus treatment:** required and locked as defined in §2.
7. **Imagery:** optional and not required for v1 acceptance; type-first presentation remains valid.
8. **Copy readiness:** production pages must replace placeholder/lorem copy before implementation acceptance.

### 8.2 Publication wording (Moderator-approved)

1. **Proprietary boundaries:** use high-level disclosure only; do not publish client-confidential implementation details.
2. **Availability wording:** use the approved neutral phrasing in §8.4 and avoid exact immediate-availability claims unless re-approved at launch.

### 8.3 Content safety notes for implementers

1. Distinguish each case study as public demo, public repository, proprietary/private, professional employment work, or independent product work.
2. Keep MOD-W framing as methodology/workflow (not platform, framework, or autonomous automation claim).

### 8.4 Approved publication copy

Use the following wording as the v1 baseline.

1. **Proprietary/private project disclosure (default):**

- "This project includes proprietary components and client-confidential details. A high-level architecture and delivery walkthrough is available on request."

2. **Availability wording (default):**

- "Available for relevant full-time and freelance conversations."

3. **Optional contact guidance (default):**

- "For full-time roles, include role title and company. For freelance inquiries, include scope, timeline, stack, and engagement model."

---

MOD-W v4.0.0
