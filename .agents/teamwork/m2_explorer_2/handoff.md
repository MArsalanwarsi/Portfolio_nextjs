# Handoff Report: Milestone 2 — Assembling Hero Section & Topographic Contour Canvas

**Explorer Agent**: `m2_explorer_2` (Milestone 2 Explorer 2)  
**Target Milestone**: Milestone 2 — Navigation, Hero & Manifesto  
**Focus Area**: Assembling Hero Section (`components/Hero.tsx`), Topographic Contour Ground (`components/ContourBackground.tsx`), Centered Portrait Reveal, Bottom-Left Active Sprint Ticket, and Scroll Parallax Inset Card Transformation.  
**Reference Artifact**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_2\proposed_Hero.tsx`

---

## Executive Summary
Existing `components/Hero.tsx` is an obsolete 2-column conventional portfolio layout featuring multi-tag badges, metrics boxes with shadows (`shadow-sm` on line 158), and a side profile card. This directly contradicts the Lando Norris design specification: a full-viewport Chalk Cream (`#f4f4ed`) ground laced with fine contour lines, a solitary centered chest-up portrait cut-out, an inset 18.52px bottom-left Active Sprint ticket with a chamfered notched tab and live pulsating status dot, and a smooth scroll parallax behavior where the hero scales into an inset card over the Paddock Olive (`#282c20`) body canvas. An end-to-end technical implementation plan and a fully typed, linted reference component (`proposed_Hero.tsx`) have been synthesized and verified.

---

## 1. Observation

### 1.1 Existing `components/Hero.tsx` Code Inspection
Inspection of `components/Hero.tsx` reveals:
- **Layout**: Lines 24-25 use an asymmetric two-column grid:
  ```tsx
  <section id="home" className="relative px-4 pb-14 pt-28 sm:px-6 lg:pt-32">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
  ```
- **Content Clutter**: Left column contains `siteConfig.availability` badge (line 27), role/specialization tags (line 38), `h1` name (line 50), description (line 54), focus area tags (line 60), buttons (lines 71-97), social icons (lines 100-148), and a 3-column metric grid (lines 150-168).
- **Elevation Violation**: Line 158 contains `shadow-sm`:
  ```tsx
  className="rounded-lg border border-border/70 bg-card/70 px-3 py-3 shadow-sm"
  ```
  This violates the core Lando Norris elevation rule: *"There is no cast shadow anywhere. Depth comes from tonal switches... and scroll parallax."*
- **Portrait Isolation**: Right column wraps `ProfilePortrait` inside a card (lines 171-192), instead of being the hero's monumental centered cut-out anchor.

### 1.2 Topographic Contour Canvas (`components/ContourBackground.tsx`)
Inspection of `components/ContourBackground.tsx` lines 10-15:
```tsx
const strokeColor =
  surface === "dark"
    ? "rgba(83, 84, 80, 0.28)" // Tarmac Gray on Paddock Olive
    : "rgba(40, 44, 32, 0.12)"; // Paddock Olive on Chalk Cream
```
- Line 27 specifies non-scaling 1px stroke:
  ```tsx
  <g stroke={strokeColor} strokeWidth="1" vectorEffect="non-scaling-stroke">
  ```
- Lines 28-48 define SVG contour paths across a `viewBox="0 0 1440 900"`.
- When called with `surface="light"`, it accurately renders the required `rgba(40, 44, 32, 0.12)` tone on `#f4f4ed`.

### 1.3 Portrait Assets in `public/`
Direct inspection of `public/` shows:
- `public/header-photo.webp`: 67,876 bytes (WebP optimized format).
- `public/header-photo.png`: 1,969,628 bytes, 1254x1254 px square source image.
- `public/profile-photo.svg`: 3,306 bytes, vector fallback containing an stylized portrait slot.
- In `data/portfolio.json` lines 38-43:
  ```json
  "portrait": {
    "src": "/header-photo.webp",
    "fallbackSrc": "/profile-photo.svg",
    "alt": "Portrait of Muhammad Arsalan Warsi",
    "initials": "AW"
  }
  ```

### 1.4 Framer Motion & Animation Infrastructure (`components/PremiumMotion.tsx`)
Inspection of `components/PremiumMotion.tsx`:
- Line 14: `export const landoEase = [0.65, 0.05, 0, 1] as const;`
- Line 15-18: `export const landoTransition = { duration: 0.75, ease: landoEase } as const;`
- Line 123: `LazyMotion features={domMax} strict`
  * **Critical constraint**: Because `strict` mode is enabled in `LazyMotion`, all animated DOM primitives inside client components must use `m.div`, `m.section`, `m.aside` instead of `motion.*`, otherwise Framer Motion throws an explicit runtime error.

### 1.5 Design System Tokens (`app/globals.css`)
- Lines 13-14: `--paddock-olive: #282c20; --chalk-cream: #f4f4ed;`
- Line 15: `--signal-lime: #d2ff00;`
- Line 16: `--moss-lime: #b2c73a;`
- Line 238-241:
  ```css
  *, *::before, *::after {
    box-shadow: none !important;
    text-shadow: none !important;
  }
  ```
- Line 177: `--radius-badge: 2.96px;`

---

## 2. Logic Chain

### 2.1 Why the Current Hero Must Be Completely Replaced
1. **Observation**: `components/Hero.tsx` currently displays an old-fashioned resume-style grid with heavy text blocks, buttons, and `shadow-sm`.
2. **Requirement**: The Lando Norris style reference (ORIGINAL_REQUEST.md line 93-96) explicitly mandates:
   > *"Assembling Helmet Hero: A full-viewport Chalk Cream #f4f4ed ground with contour lines and a centred chest-up 3D portrait whose wireframe helmet and livery visor bands slide into place. No headline: the floating chrome and a Next Race ticket at 18.52px inset frame it. On scroll it shrinks to an inset card over Paddock Olive #282c20."*
3. **Inference**: All body text, action buttons, and metric grids must be excised from `Hero.tsx`. The navigation links and contact action belong exclusively to `ChromeNav.tsx` (top-right), the statement belongs to `Manifesto.tsx` (below hero), and the metrics belong to downstream sections. `Hero.tsx` must be a pure, high-impact aesthetic portal.

### 2.2 Mechanism for the Smooth Scroll Parallax Inset Card Transformation
1. **Observation**: As the user scrolls from the hero into the manifesto, the hero must shrink into an inset card over Paddock Olive (`#282c20`).
2. **Architectural Choice**:
   - The outer section (`<section id="home">`) has a scroll track height of `140vh` and a background of `bg-paddock-olive` (`#282c20`).
   - Inside the outer section, a sticky viewport card (`<m.div className="sticky top-0 h-[100dvh] w-full bg-chalk-cream overflow-hidden">`) pins to the top of the viewport.
   - Using Framer Motion's `useScroll({ target: containerRef, offset: ["start start", "end end"] })`:
     * As `scrollYProgress` goes from `0` to `0.75`:
       - `scale`: transforms from `1.0` down to `0.935`.
       - `borderRadius`: transforms from `0px` to `18.52px`.
     * As the card scales down, the outer `#282c20` Paddock Olive ground emerges on all four margins, transforming the full-viewport hero into an inset card.
     * When `scrollYProgress` crosses `1.0`, the page naturally scrolls down, presenting `Manifesto.tsx` (which is also set on `#282c20` Paddock Olive ground).
3. **Reduced Motion Adaptation**:
   - If `useReducedMotion()` returns true, `scale` is locked to `1` and `borderRadius` is locked to `0px`, guaranteeing zero vestibular distress.

### 2.3 Centred Portrait Cut-out Reveal
1. **Observation**: Asset `/header-photo.webp` is a high-resolution portrait.
2. **Presentation**:
   - Centered horizontally, anchored vertically at the lower third (`h-[68vh] sm:h-[74vh] max-h-[720px] max-w-[540px]`).
   - Image rendered via Next.js `<Image fill priority className="object-contain object-bottom drop-shadow-none" />`.
3. **Motion Reveal**:
   - Framer Motion variant with `duration: 0.75` and `ease: [0.65, 0.05, 0, 1]`:
     ```tsx
     initial={{ opacity: 0, y: 36, scale: 0.96 }}
     animate={{ opacity: 1, y: 0, scale: 1 }}
     transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}
     ```
   - Enhanced with subtle hairline reticle guides (`[RETICLE // AW-01]`, `[GRID // 100%]`) framing the top of the cut-out in `text-paddock-olive/25 font-mono text-[9.26px]`, establishing technical blueprint aesthetics.

### 2.4 Active Sprint / Next Milestone Ticket Design
1. **Observation**: The Lando Norris reference features a "Next Race Ticket" inset bottom-left. For Muhammad Arsalan Warsi, this is adapted to an "Active Sprint Status Ticket".
2. **Dimensional & Position Specifications**:
   - Inset: Inset 18.52px bottom-left (`bottom-4 left-4 sm:bottom-[18.52px] sm:left-[18.52px]`).
   - Width: `w-[270px] sm:w-[300px]`.
   - Card radius: `0px` (`rounded-none`).
   - Border: `1px solid rgba(40, 44, 32, 0.35)` (`border-paddock-olive/35`).
   - Background: `bg-chalk-cream/95 backdrop-blur-[2px]`.
3. **Notched Tab Anatomy**:
   - Top-left attached tab using CSS polygon notch:
     `[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]`
   - Background: `bg-paddock-olive` (`#282c20`).
   - Text: `ACTIVE SPRINT` in `text-[9.26px] font-sans font-medium uppercase tracking-[0.16em] text-chalk-cream`.
   - Indicator accent: `w-1.5 h-1.5 rounded-full bg-signal-lime`.
4. **Hierarchical Content**:
   - Architecture schematic: 1px hairline SVG circuit glyph representing MERN request cycle (`Client ⇄ Node ⇄ DB`).
   - Primary Track: `MERN / FULL-STACK DEV` (Mona Sans 14.81px font-extrabold uppercase, tight tracking).
   - Affiliation: `APTECH LEARNING ASSOCIATE` (Mona Sans 11.11px font-semibold uppercase).
   - 1px divider: `h-px w-full bg-paddock-olive/20`.
   - Meta: `SINCE 2023 · KARACHI, PK` (Mona Sans 9.26px uppercase tracking-[0.1em]).
   - Live Status Badge: `OPEN TO WORK` in `rounded-[2.96px]` border with pulsating Signal Lime (`#d2ff00`) / Moss Lime (`#b2c73a`) dot.

### 2.5 Zero Cast Shadow Enforcement
1. **Observation**: Any CSS box-shadow ruins the tactile motorsport blueprint aesthetic.
2. **Implementation Guarantee**:
   - Pure hairline outlines (`border-paddock-olive/35`, `border-paddock-olive/25`).
   - The live status dot uses CSS `animate-ping` (opacity + scale transform), avoiding any glowing box-shadow or drop-shadow filter.
   - All `shadow-*` utility classes are prohibited.

---

## 3. Caveats
1. **Dynamic Viewport Height**: On mobile browsers, standard `100vh` can cause layout displacement when toolbars expand or retract. The proposed design uses `100dvh` (`h-[100dvh]`) to ensure rock-solid sticky parallax behavior across iOS Safari and Android Chrome.
2. **Page-Level Sticky Hierarchy**: `app/page.tsx` must ensure `<main className="page-shell">` does not have `overflow: hidden` on parent elements that would break `sticky top-0`. (In `app/globals.css`, `overflow-x: hidden` is on `body`, which is standard and safe, while `.page-shell` has `position: relative; z-index: 2`).
3. **Coordinate Precision**: The coordinates `24.8607° N, 67.0011° E` represent Karachi, Pakistan (Arsalan Warsi's actual location per `data/portfolio.json`).

---

## 4. Conclusion & Technical Implementation Plan

### 4.1 Component Architecture Map
```
components/Hero.tsx
└── <section ref={containerRef} className="relative w-full h-[140vh] bg-paddock-olive">
    └── <m.div style={{ scale: heroScale, borderRadius: heroRadius }} className="sticky top-0 h-[100dvh] w-full bg-chalk-cream">
        ├── <ContourBackground surface="light" className="opacity-95" />
        ├── <div className="ambient-vignette-top" />
        ├── <m.div style={{ y: portraitY }} className="centred-portrait-cutout">
        │   ├── <Image src="/header-photo.webp" priority className="object-contain object-bottom" />
        │   └── Technical hairline brackets [RETICLE // AW-01]
        ├── <m.aside className="active-sprint-ticket bottom-left">
        │   ├── Notched tab [clip-path] carrying "ACTIVE SPRINT"
        │   └── Ticket body (1px border, MERN flow circuit, "MERN / FULL-STACK DEV", "APTECH LEARNING ASSOCIATE", divider, "SINCE 2023 · KARACHI, PK", "OPEN TO WORK" pulse badge)
        └── <div className="telemetry-marker bottom-right">
            └── "COORD // 24.8607° N 67.0011° E" + "SCROLL TO ENGAGE ↓"
```

### 4.2 Exact Token & Utility Class Specifications

| Element | Specification | Tailwind / CSS Utility |
|---|---|---|
| Section Track | 140vh scroll track on Paddock Olive | `relative w-full h-[140vh] bg-paddock-olive text-paddock-olive` |
| Viewport Card | Sticky 100dvh Chalk Cream ground | `sticky top-0 h-[100dvh] w-full overflow-hidden bg-chalk-cream` |
| Parallax Scale | Transform from 1.0 to 0.935 | `useTransform(scrollYProgress, [0, 0.75], [1, 0.935])` |
| Parallax Radius | Transform from 0px to 18.52px | `useTransform(scrollYProgress, [0, 0.5], ["0px", "18.52px"])` |
| Contour Overlay | 1px non-scaling stroke on light ground | `<ContourBackground surface="light" className="opacity-95" />` |
| Portrait Reveal | 0.75s cubic-bezier(0.65, 0.05, 0, 1) | `transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}` |
| Ticket Inset | 18.52px from bottom and left | `absolute bottom-4 left-4 sm:bottom-[18.52px] sm:left-[18.52px] z-20` |
| Ticket Width | Narrow outlined card (270-300px) | `w-[270px] sm:w-[300px]` |
| Notched Tab | 45° chamfered right notch | `[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]` |
| Tab Label | 9.26px uppercase tracking-[0.16em] | `text-[9.26px] font-sans font-medium uppercase tracking-[0.16em]` |
| Primary Title | Mona Sans 14.81px bold uppercase | `font-sans font-extrabold text-[14.81px] tracking-tight leading-tight` |
| Role Label | Mona Sans 11.11px semibold | `font-sans font-semibold text-[11.11px] tracking-normal` |
| Status Badge | 2.96px radius with Signal Lime dot | `border border-paddock-olive/25 rounded-[2.96px] bg-chalk-cream` |
| Live Pulse Dot | Ping opacity/scale animation | `animate-ping bg-signal-lime`, `ring-1 ring-moss-lime` |
| Cast Shadows | Absolute Zero | `box-shadow: none !important` |

### 4.3 Reference Implementation File
The complete, tested reference implementation has been created at:
`D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_2\proposed_Hero.tsx`

---

## 5. Verification Method

To independently verify this plan and the proposed implementation:

1. **Lint Check**:
   Execute oxlint against the proposed component:
   ```powershell
   npx oxlint .agents/teamwork/m2_explorer_2/proposed_Hero.tsx
   ```
   *Expected result*: 0 warnings, 0 errors.

2. **TypeScript Compilation Check**:
   Execute TypeScript compilation to verify typing:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected result*: Exits with code 0.

3. **DOM & Asset Verification**:
   Inspect the following files:
   - `public/header-photo.webp` (exists, verified 67,876 bytes).
   - `components/ContourBackground.tsx` (verified `surface="light"` stroke color `rgba(40, 44, 32, 0.12)`).
   - `app/globals.css` (verified zero box-shadow rule, CSS variables `--chalk-cream` and `--paddock-olive`).

4. **Invalidation Conditions**:
   - If any `shadow-*` class is added to `Hero.tsx`.
   - If `motion.div` is used instead of `m.div` under `LazyMotion strict`.
   - If the easing curve departs from `cubic-bezier(0.65, 0.05, 0, 1)`.
   - If the Active Sprint ticket is moved from the bottom-left 18.52px inset.
