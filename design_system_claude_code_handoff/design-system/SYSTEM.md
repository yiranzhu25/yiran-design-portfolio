# Portfolio Design System

A minimal, typography-driven design system for a **personal product-design portfolio website**.
The whole system rests on one idea: **let type and a black-on-cream palette do the work.** No
chromatic accents, no decoration — hierarchy comes from scale, weight, and the interplay between a
neutral sans and a monospace voice. Ships with full **light and dark modes** and is responsive from
phone to wide desktop.

> **Provenance / sources.** This system was authored from a written brief, not an existing codebase
> or Figma file. There were **no source assets, repos, or design files** provided — everything here
> (tokens, components, the demo portfolio "Mara Vance") is original scaffolding built to the brief.
> When you have the real person's name, copy, projects, and images, swap them in; the structure is
> built to receive them.

---

## What's in here (index / manifest)

| File | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, manifest |
| `SKILL.md` | Agent-Skill front-matter so this folder works as a Claude Skill |
| `colors_and_type.css` | **The source of truth.** All design tokens: palette, light/dark themes, type scale, spacing, radii, motion, plus semantic `.ds-*` classes |
| `preview/` | Small static cards that populate the Design System tab (type, color, spacing, components) |
| `ui_kits/portfolio/` | The portfolio UI kit — interactive recreation of the site |
| `assets/` | Brand/visual assets (currently none — see Iconography + Caveats) |

### UI kit: `ui_kits/portfolio/`
| File | Role |
|---|---|
| `index.html` | Interactive demo — side nav, switcher (Work/About/Lab), hero, full site, dark toggle |
| `kit.css` | Component styles, all built on the tokens |
| `components-nav.jsx` | `Icon`, `ThemeToggle`, `SideNav` (case-study pages), `TopHeader` (landing global nav), `MobileNav` (topbar + dropdown), `Switcher` |
| `components-content.jsx` | `Eyebrow`, `SectionHeader`, `Prose`, `Tags`, `Intro`, `FullVisual`, `InlineVisual`, `Metrics`, `Timeline`, `Tldr`, `ActionButton(s)` |
| `app.jsx` | Wires it all into a working portfolio: landing (header + switcher, no side nav) and a case-study page (with side nav) |
| `image-slot.js` | Drag-and-drop image placeholder for the visual sections |

---

## Brand context

A portfolio for an independent **product designer** (placeholder identity: *Mara Vance, Product
Designer, San Francisco*). The audience is hiring managers, founders, and peers skimming on the way
to a decision. The site has to feel **considered, quiet, and confident** — the design itself is the
proof of taste, so it under-designs on purpose. Think editorial print meets a developer tool: lots
of white (cream) space, big confident headlines, monospace captions, hairline rules instead of
boxes.

The brief named the required building blocks: an **intro section**, **tags**, a **button switcher**
used as global navigation, a **vertical left side navigation**, a **full-page visual section**, an
**inline visual section**, a **section header**, **paragraphs**, **metrics**, a **timeline**,
**action buttons**, a **mobile dropdown menu**, and a **TL;DR section**. All of these exist as
components in the UI kit and as cards in `preview/`.

---

## CONTENT FUNDAMENTALS

How copy is written across the portfolio.

- **Voice — first person, plain, a little dry.** "I design calm interfaces for complex products."
  The designer speaks as *I*; the reader is *you* only in calls to action ("Get in touch").
- **Confident, not boastful.** State outcomes plainly and let numbers carry the weight ("cutting
  time-to-insight by more than half") rather than adjectives ("amazing", "world-class").
- **Sentence case everywhere** for headings and body. The **only** uppercase is the monospace
  eyebrow/label treatment (e.g. `PORTFOLIO · 2026`, `SELECTED WORK`), and it's always tracked wide.
- **Short and scannable.** Lead sentence does the explaining; supporting line adds one idea.
  Paragraphs are 2–4 sentences. The **TL;DR** block exists precisely so a skimmer never has to read
  the long version.
- **Numerals and symbols stay terse.** `54%`, `40+`, `2.1M`, `0→1`, `2024`. Use the real `→` arrow,
  `·` middot as a separator, and `&` sparingly. Superscript units (`%`, `+`, `M`, `/5`) on metrics.
- **No emoji. No exclamation points.** Punctuation is calm. Em dashes are welcome for asides.
- **Labels read like a filing system:** `01 — Selected Work`, `Case 01`, `Principle 02`. Numbering
  is part of the visual language, not just structure.
- **Vibe:** *the quiet craft of making hard things feel obvious.* Self-aware, low-ego, precise.

Example copy that's on-brand:
> **PORTFOLIO · 2026**
> I design calm interfaces for *complex products.*
> Product designer focused on developer tools, data systems, and the quiet craft of making hard
> things feel obvious.

---

## VISUAL FOUNDATIONS

- **Color.** Two anchors: warm near-black ink (`#14120D`) and a warm near-white page (`#FDFCFA`).
  Everything else is a warm-neutral step between them. **No chromatic accent** — the foreground
  *is* the accent (buttons, the switcher thumb, the TL;DR badge are simply ink-on-cream or
  cream-on-ink). Dark mode inverts to warm black (`#0E0D0A`) with paper-white text (`#F2EDE1`).
  Nothing is pure `#000`/`#FFF`; everything carries a little warmth.
- **Type.** Sans = **Geist**; mono = **Geist Mono**. Contrast is generated by **scale + weight +
  family**, never by adding faces. Display headlines run up to ~104px at 600 weight with tight
  `-0.035em` tracking; body is 17px/1.62 at a 64ch measure; the mono label is 12px uppercase tracked
  `0.18em`. That sans↔mono tension is the system's signature.
- **Backgrounds.** Flat cream or flat ink. **No gradients, no textures, no patterns, no imagery in
  the chrome.** Imagery appears only inside dedicated visual sections (full-bleed or inline), framed
  by a hairline and a soft radius.
- **Imagery treatment.** Real project work goes in `image-slot` placeholders. Intended look: clean
  product shots / UI captures, neutral and uncropped-feeling, on the cream. No heavy filters; let
  the work read true. Captions are monospace, uppercase, faint.
- **Spacing.** 8px base scale with 4px half-steps (`--space-1`…`--space-10`). Sections breathe —
  `--space-9` (96px) between major sections. Generous vertical rhythm is doing the "minimal" work.
- **Borders.** Hairlines, not boxes. `1px` at ~12% ink opacity (`--border`); a stronger ~28%
  variant for interactive outlines. Section dividers, the side-nav edge, metric grids, and the
  timeline are all built from single hairlines rather than filled containers.
- **Cards.** Rare and quiet. The TL;DR block and metric grid are the only "cards": a hairline
  border, `--radius-lg` (14px), `--bg-elevated` fill, **no shadow** by default. The system is flat;
  shadows (`--shadow-sm/md/lg`, soft and warm) exist as tokens but are used sparingly — e.g. a
  floating menu — never to decorate static content.
- **Corner radii.** Restrained: most rectangles are square or `--radius-md` (8px). Pills
  (`--radius-pill`) are reserved for buttons, tags, and the switcher. Big visuals use
  `--radius-lg` (14px).
- **Motion.** *Subtle and smooth.* Custom ease-out `cubic-bezier(0.22,1,0.36,1)`; durations 140 /
  240 / 460ms. The switcher thumb slides; views slide-up gently on change; theme cross-fades over
  460ms. **Resting states are always fully visible** — entrance motion never starts at opacity 0
  (so it degrades gracefully and survives capture). `prefers-reduced-motion` disables it all.
- **Hover states.** Text links: ink underline appears/strengthens. Ghost buttons: fill with
  `--bg-sunken` + border darkens to full ink. Primary button: drops to `0.88` opacity. Tags &
  icon buttons: border darkens. No color shifts (there's no color to shift to) — only
  opacity/border/fill.
- **Press states.** Buttons scale to `0.97`; icon buttons to `0.94`. Quick (140ms), tactile.
- **Transparency & blur.** Used in exactly one place: the **mobile topbar/dropdown** uses a
  `backdrop-filter: blur` over a `color-mix` of the background — and only while open. Desktop chrome
  is fully opaque. (Note: backdrop-filter is gated to the open state on purpose; leaving it mounted
  while invisible creates a full-viewport compositing layer.)
- **Layout rules.** The **landing page has no side nav** — global navigation is the top header
  (wordmark + button switcher + theme toggle), and content sits in a centered column (~940px).
  The **vertical `220px` side nav is reserved for case-study pages**, where it sticks full-height
  and anchors in-page sections (Overview, Problem, Process, Impact, Reflection) with a “← All work”
  back link. Below `880px` both collapse to a sticky top bar with a fullscreen dropdown. Readable
  prose is capped at `64ch`.

---

## ICONOGRAPHY

- **Minimal line icons, Lucide style.** The system uses a tiny hand-picked set drawn to
  [Lucide](https://lucide.dev)'s conventions: `24×24` viewBox, **1.75px stroke**, round caps and
  joins, `currentColor` fill so they inherit text color and adapt to light/dark automatically.
- **The set is intentionally small:** `sun` / `moon` (theme toggle), `menu` / `close` (mobile),
  `arrow-right` / `arrow-up-right` / `arrow-down` (links & CTAs). A portfolio needs almost no icons —
  restraint is the point. Icons are accents on actions, never decoration.
- **Implementation.** Inline SVG via the `Icon` component in `components-nav.jsx` (the paths follow
  Lucide). If you need more glyphs, pull them straight from Lucide (CDN: `https://unpkg.com/lucide`)
  to keep stroke weight and style consistent — **do not** mix in a second icon style.
  > Substitution flag: these are *Lucide-style* paths authored inline, not the official Lucide
  > package. Swap to the real Lucide set if you want pixel-exact parity.
- **No emoji. No unicode pictographs** as UI icons (one `☰` appears in a static preview card only).
  Separators use `·` (middot) and the real arrow `→` in prose; those are typographic, not icons.
- **Logo / wordmark.** There is no graphic logo — the brand mark **is the name set in Geist
  Semibold** with the role beneath it in regular weight (see `preview/comp-sidenav.html`). This is
  deliberate: a typographic wordmark keeps the system font-only and dependency-free.

---

## Caveats & substitutions

- **Fonts are loaded from Google Fonts CDN** (Geist + Geist Mono), not self-hosted `.ttf`/`.woff2`
  in a `fonts/` folder. For an offline/production build, self-host them. *Flagged for the user.*
- **Geist** was chosen as a clean, modern, non-Inter sans per the brief. If you'd prefer more
  editorial character (e.g. a grotesk like Schibsted Grotesk), it swaps cleanly via `--font-sans`.
- **No real images, logo, name, or project copy** were provided — all content is placeholder
  ("Mara Vance" / "Ferrous"). Visual sections use drag-and-drop `image-slot`s waiting for real work.
- **Icons are Lucide-style inline SVG**, not the official package (see Iconography).
