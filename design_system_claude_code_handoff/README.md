# Handoff: Portfolio Website — Build Package for Claude Code

A complete package for building a **personal product-design portfolio website** from the
"Portfolio Design System." Hand this folder to Claude Code and it has everything needed: the token
source of truth, the component CSS, a working reference prototype, and the specs below.

---

## Overview

A minimal, **typography-driven** portfolio. The entire aesthetic rests on one idea: let type and a
near-white-cream / warm-black palette do the work. No chromatic accent. Full **light and dark mode**.
Responsive from phone to wide desktop. Subtle, smooth motion.

The site has two page types:
1. **Landing page** — global nav is a top header (wordmark + a 3-way **button switcher**:
   Work / About / Lab) + theme toggle. **No side navigation.** Content sits in a centered column.
2. **Case-study page** — reached from the Work view. **This** is where the vertical left **side
   navigation** lives (sticky, full-height, numbered in-page sections, a "← All work" back link).

---

## About the design files

The files in `reference-prototype/` are a **design reference created in HTML/React-via-Babel** — a
prototype showing intended look and behavior, **not production code to copy directly**. The Babel
in-browser setup is for previewing only.

**Your task:** recreate these designs in the target codebase's environment using its established
patterns. If no codebase exists yet, **Next.js + React + plain CSS (or CSS Modules) is the
recommended choice** — this system is CSS-variable-first and does not need a CSS framework. Port
`colors_and_type.css` verbatim as the token layer (it is framework-agnostic and production-ready),
then rebuild the components idiomatically.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, and interactions are final. Recreate the UI
pixel-accurately. The two CSS files (`design-system/colors_and_type.css` and `design-system/kit.css`)
are clean enough to use as-is; the `.jsx` files show structure and behavior to reimplement.

---

## Design tokens — `design-system/colors_and_type.css`

This file is the **source of truth** and is production-ready. Use it unchanged. Highlights:

### Color (warm neutrals only — no chromatic accent)
| Token | Light | Dark |
|---|---|---|
| `--bg` (page) | `#FDFCFA` (cream-50, almost white) | `#0E0D0A` (ink-950) |
| `--bg-elevated` | `#FDFCFA` (cards read via hairline border) | `#1B1915` (ink-850) |
| `--bg-sunken` | `#F5F1E8` (cream-100) | `#0A0907` |
| `--fg` | `#14120D` (ink-900) | `#F2EDE1` (paper-100) |
| `--fg-muted` | `#706B5E` (ink-500) | `#98927F` (paper-300) |
| `--fg-faint` | `#A8A18E` (ink-300) | `#635E51` (paper-500) |
| `--border` | `rgba(20,18,13,.12)` | `rgba(242,237,225,.14)` |
| `--border-strong` | `rgba(20,18,13,.28)` | `rgba(242,237,225,.30)` |
| `--accent` / `--on-accent` | ink `#14120D` / cream | paper `#F2EDE1` / ink |

Theme is set via `data-theme="light|dark"` on `<html>`; tokens flip automatically. There is also a
`prefers-color-scheme` fallback when no attribute is present. **Nothing is pure #000/#FFF** — keep
the warmth.

### Type
- Sans: **Geist**; Mono: **Geist Mono** (Google Fonts CDN; self-host for production).
- Contrast comes from **scale + weight + family**, never a second display face.
- Scale (fluid `clamp`): display up to ~104px / h1 / h2 / h3 / body-lg 20px / body 17px / small 15px
  / label 12px.
- The **mono, uppercase, `0.18em`-tracked label** is the signature accent (eyebrows, tags, captions,
  metrics).
- Semantic classes `.ds-display .ds-h1 .ds-h2 .ds-h3 .ds-body-lg .ds-body .ds-small .ds-label` are
  provided.

### Spacing — 8px base with 4px half-steps
`--space-1:4 · 2:8 · 3:12 · 4:16 · 5:24 · 6:32 · 7:48 · 8:64 · 9:96 · 10:128` (px).

### Radii
`--radius-xs:2 · sm:4 · md:8 · lg:14 · pill:999`. Mostly square / 8px; pills for buttons/tags/switcher.

### Shadows (soft, warm; used sparingly — system is flat)
`--shadow-sm/md/lg`. Cards normally use a hairline border and **no** shadow.

### Motion
`--ease-out: cubic-bezier(0.22,1,0.36,1)`, `--ease-in-out: cubic-bezier(0.65,0,0.35,1)`.
Durations `--dur-fast:140ms · base:240ms · slow:460ms`. Entrance motion must rest fully visible
(never start at opacity 0). Respect `prefers-reduced-motion`.

### Layout
`--measure:64ch` (prose), `--content-max:1200px`, `--sidenav-w:220px`. Landing column ~940px.

---

## Components — `design-system/kit.css` + `reference-prototype/components-*.jsx`

All required components exist. Recreate each with the exact classes/specs:

| Component | File / class | Notes |
|---|---|---|
| **Intro / hero** | `Intro` · `.pf-intro` | Mono eyebrow, display title with a `--fg-faint` muted clause, lead sub, mono meta `<dl>`. |
| **Tags** | `Tags` · `.pf-tag` | Mono uppercase pills, hairline border; `.pf-tag--solid` = ink fill. |
| **Button switcher** | `Switcher` · `.pf-switcher` | Segmented pill with a **sliding thumb** (`--accent`). Measures the active button's offset/width; remeasure on resize + `document.fonts.ready`; disable the slide transition on first paint so it doesn't animate from zero. Global nav on landing. |
| **Side navigation** | `SideNav` · `.pf-sidenav` | Vertical, sticky, full-height, `220px`. Numbered links (`01`, `02`…), active state, theme toggle + meta in footer, optional "← All work" back link. **Case-study pages only.** |
| **Top header** | `TopHeader` · `.pf-header` | Landing global nav: wordmark + switcher + theme toggle, sticky, blurred translucent bg. |
| **Full-page visual** | `FullVisual` · `.pf-visual-full` | Full-width image region, `--radius-lg`, hairline, mono caption row. Uses `image-slot.js` placeholder. |
| **Inline visual** | `InlineVisual` · `.pf-visual-inline` | 2-col image + text; `reverse` flips order; collapses to 1-col under 720px. |
| **Section header** | `SectionHeader` · `.pf-section-header` | Eyebrow + title on a hairline baseline, optional right-aligned action. |
| **Paragraphs / prose** | `Prose` · `.pf-prose` | 64ch measure, `.pf-lead` for 20px lead, underlined links. |
| **Metrics** | `Metrics` · `.pf-metrics` | Big-number grid split by hairlines; `tnum`; superscript units. |
| **Timeline** | `Timeline` · `.pf-timeline` | Year column + body (title, mono role, description). Hairline rows. |
| **Action buttons** | `ActionButton(s)` · `.pf-btn` | `--primary` (ink fill), `--ghost` (hairline), `--text` (arrow slides on hover). Pill radius. Press scales to 0.97. |
| **Mobile dropdown** | `MobileNav` · `.pf-topbar` + `.pf-dropdown` | Under 880px: sticky topbar + fullscreen blurred dropdown with large numbered links. **Gate `backdrop-filter` to the open state only.** |
| **TL;DR** | `Tldr` · `.pf-tldr` | Elevated card, ink "TL;DR" badge, summary + diamond-bullet key points. |

---

## Interactions & behavior

- **Theme toggle** — flips `data-theme` on `<html>`, persists to `localStorage["pf-theme"]`, applied
  before first paint (inline script in `<head>`) to avoid flash. Cross-fades over 460ms.
- **Switcher** — swaps the landing view (Work / About / Lab); scrolls to top on change.
- **Open case study** — Work view's "Read case study" / "Read the full case study" buttons route to
  the case-study page (`page: 'home' | 'case'` state). "← All work" returns.
- **Side nav active state** (case-study only) — `IntersectionObserver` with
  `rootMargin: "-20% 0px -70% 0px"` highlights the section in view; clicking a link smooth-scrolls
  with a 32px top offset.
- **Mobile dropdown** — locks body scroll while open; closes on link select.
- **Hover** — text links: underline strengthens; ghost buttons fill `--bg-sunken` + border to full
  ink; primary drops to 0.88 opacity; tags/icon-buttons darken border. No color shifts.
- **Press** — buttons scale 0.97, icon buttons 0.94 (140ms).

## State

- `theme: 'light' | 'dark'` (persisted)
- `view: 'work' | 'about' | 'lab'` (landing)
- `page: 'home' | 'case'` (router)
- `active: <sectionId>` (case-study side-nav highlight, derived from scroll)

## Responsive

- ≥ 880px: landing top header; case-study `220px` side nav + fluid main.
- < 880px: both collapse to the sticky topbar + fullscreen dropdown. Prose capped 64ch. Inline
  visuals stack under 720px; metrics grid auto-fits to 150px min columns.

## Assets

- **Fonts:** Geist + Geist Mono via Google Fonts CDN (`<link>` in `index.html`). **Self-host for
  production.**
- **Icons:** Lucide-*style* inline SVG (24×24, 1.75px stroke, round caps, `currentColor`) in the
  `Icon` component. For production, install the real [`lucide-react`](https://lucide.dev) package —
  same visual language. Set used: sun, moon, menu, close, arrow-right, arrow-up-right, arrow-left,
  arrow-down.
- **Images:** none shipped. Visual sections use `image-slot.js` placeholders awaiting real project
  imagery. Replace with the client's real screenshots/case photos.
- **Logo:** none — the brand mark is the **name set in Geist Semibold** with role beneath.
- All placeholder copy ("Mara Vance", "Ferrous") must be replaced with the real person/projects.

## Files in this package

```
claude_code_handoff/
├── README.md                      ← you are here (the build brief)
├── design-system/
│   ├── colors_and_type.css        ← TOKEN SOURCE OF TRUTH (use verbatim)
│   ├── kit.css                    ← component styles (clean, reusable)
│   └── SYSTEM.md                  ← full design-system doc: content & visual foundations, iconography
└── reference-prototype/           ← working HTML/React reference (preview only — open index.html)
    ├── index.html
    ├── app.jsx                    ← routing + the three landing views + case-study page
    ├── components-nav.jsx         ← Icon, ThemeToggle, SideNav, TopHeader, MobileNav, Switcher
    ├── components-content.jsx     ← Intro, SectionHeader, Prose, Tags, FullVisual, InlineVisual, Metrics, Timeline, Tldr, ActionButton(s)
    ├── kit.css · colors_and_type.css · image-slot.js
```

Open `reference-prototype/index.html` in a browser to see the target. Read `design-system/SYSTEM.md`
for the full rationale (content voice, visual foundations, iconography).
