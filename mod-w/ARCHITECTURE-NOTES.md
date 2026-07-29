# Architecture Notes — Frank McGuire Portfolio

**Date:** June 13, 2026
**Author:** Designer + Prototyper (Claude Design)
**Status:** Advisory — input to Tech Lead Architecture Definition. **Not authoritative.**

---

> This document records observations from the Prototype Ceremony for the Tech Lead's consideration during Architecture Definition.
>
> It is **advisory**, not constraint. The Tech Lead has explicit authority to override anything here. Material divergences should be recorded in `ARCHITECTURE.md §"Decisions That Diverge From Prototype"` with rationale.
>
> **Target stack (per Moderator):** Angular v21.1.0. The prototype is plain HTML/CSS/JS and imports no framework — all framework mapping below is a *suggestion*, not a decision.

---

## 1. Streaming / Performance observations

- The page is **content-static**; there is no real-time data, streaming, or high-frequency rendering. Performance risk is low.
- The only continuous animation is the **availability-dot pulse** (CSS opacity, GPU-cheap) and **reveal-on-scroll** via a single `IntersectionObserver`. No `scroll` handler does layout work except a lightweight scroll-spy reading `offsetTop` — debounce/`requestAnimationFrame` it if it ever feels heavy, but it was fine unthrottled in the prototype.
- The **fixed background** is two `position:fixed` layers behind content: a **right-half radial gradient** (`.bg-glow`, the signature atmosphere — see DESIGN-SPEC §1.4a) plus a masked 64px grid (`.bg-grid`). Cheap, but the grid uses a `mask-image` radial — verify on low-end GPUs; it is purely decorative and safe to drop. In Angular these are best expressed as two fixed pseudo-layers or a single host-level component; the gradient values are design tokens, keep them in the theme, not inline.
- Fonts: 3 families (**Space Grotesk** display, **Hanken Grotesk** body, **JetBrains Mono** labels) from Google Fonts. Recommend **self-hosting + `font-display: swap`** and subsetting to control LCP and avoid third-party dependency. A no-JS first paint already shows all content (see §3).

---

## 2. Component composition patterns that worked

- A small set of **reusable primitives** carried the whole page: `Button` (primary/ghost/sm), `MonoLabel`, `Chip`, `SectionHeader`, `Card`, `Chamfer` wrapper. These map cleanly to Angular standalone components.
- The **`Chamfer` panel** is a 2-element technique (border layer + inset fill, both `clip-path`). Suggest encapsulating as a presentational component/directive (`<app-chamfer [size]="32">`) so the clip math lives in one place. It is used by exactly two features (HUD, MOD-W).
- **Section** structure is uniform (`section > .wrap > .section-head + body`). A layout wrapper component would remove repetition.
- The **HUD Status Panel** and **Case Study Card** are the two components most likely to be data-driven; everything else is largely static presentational markup.

---

## 3. State management patterns that worked

- The prototype has **almost no client state**. What exists:
  - **Active nav section** (scroll-spy) — derived from scroll position; in Angular, a signal computed from a scroll/IntersectionObserver source.
  - **Mobile menu open/closed** — a boolean; trivial signal.
  - **Reveal "in view"** — per-element, handled entirely by `IntersectionObserver`; no app state needed.
- **Progressive-enhancement note (important):** reveal animations are gated behind a `.js` class added by script at runtime. Content is **visible by default**; JS only opts INTO hiding-then-revealing. This keeps SSR / no-JS / crawler / screenshot output fully rendered. **Strongly recommend preserving this invariant** in the Angular build (relevant if Angular SSR / hydration is used — don't let hydration hide content before the observer attaches).
- **Availability status** wants to be a **single source of truth** (one enum value → drives the dot, the two OPEN rows, and their colors). Good candidate for a typed model / signal even though it's currently hardcoded.

---

## 4. Integration shapes surfaced during prototyping

- **Case studies** are the one clear data collection. Shape that emerged:
  ```
  CaseStudy {
    id, slug, index, title,
    type: 'SaaS'|'Simulation'|'Product'|'Open Source'|'Tooling',
    blurb, tags: string[],
    proprietary: boolean,
    href?: string
  }
  ```
  Source is undecided — static TS array, local markdown/JSON, or a CMS. The prototype hardcodes 6; the authoritative roster is an **open question** (see DESIGN-SPEC §8.3).
- **Availability status** → small typed object `{ fulltime, freelance, location, response, status }`.
- **Contact** is `mailto:` only in v1 — **no API**. If a form is chosen later, that introduces the only real backend integration (submission endpoint + validation).
- **MOD-W** links out to the GitHub repo — external link, no integration.

---

## 5. Open questions for the Tech Lead

- **Data source for case studies** — static array vs markdown/JSON vs CMS? Drives whether STEP-05 needs a content pipeline.
- **Routing model** — pure single-page with anchor scrolling (prototype), or Angular Router with fragment navigation? Detail routes (`/work/:slug`) are a possible later step (DESIGN-SPEC §3.7 options).
- **SSR / prerender** — for a portfolio, static prerender (SSG) is likely ideal for SEO/LCP. Confirm whether Angular SSR/hydration is in scope; if so, honor the no-JS-visible invariant (§3).
- **Status as config** — should availability be editable without a redeploy (e.g. a small JSON Frank can flip), or is hardcoded acceptable?
- **Theming tokens** — the design tokens (§1.1) should become CSS custom properties / Angular theme; confirm naming so `DOMAIN_LANGUAGE.md` and styles agree.
- **Analytics / form backend** — out of scope of the prototype; flag if needed.

---

## 6. Failed approaches (what we tried that did not work)

- **JS-gated reveal with content hidden by default** (`.reveal { opacity: 0 }` revealed by `IntersectionObserver`) — failed in any context that doesn't execute the app script (static capture / no-JS / pre-hydration): the entire page rendered blank below the nav. **Fix adopted:** invert the gate — visible by default, JS opts into the animation. The Tech Lead should keep this inversion under SSR/hydration.
- **`zoom` and JS-applied `transform: scale()` for fit-to-viewport** — not honored by the static rendering/capture path; irrelevant to production but noted because it shaped how the prototype is structured (native sizing, no scale hacks).
- **Heavy centered hero (explored Direction A)** — rejected: a symmetric centered wash read as a generic landing page and buried the dual full-time/freelance signal. **Two directions were carried forward as one shared system:** **Editorial Left** (chosen primary — left-anchored identity + mono availability strip, right-half background bloom) and **Technical HUD** (alternate — asymmetric `1.1fr/0.9fr` hero with a bordered status panel). The asymmetric/right-weighted composition in both is **intentional**, not incidental: content sits left, luminosity sits right. The Tech Lead can treat the HUD status panel as a reusable component regardless of which hero ships.

---

MOD-W v4.0.0
