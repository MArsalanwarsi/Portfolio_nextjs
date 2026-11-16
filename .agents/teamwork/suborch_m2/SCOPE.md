# Scope: Milestone 2 — Navigation, Hero & Manifesto

## Architecture
- **Framework**: Next.js 16.4.0 (Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 (`@theme` tokens in `app/globals.css`, zero cast shadows `box-shadow: none !important`)
- **Typography**: Next.js Google Fonts — `Mona_Sans` (variable `wdth` 93) and `Bodoni_Moda` (variable `opsz` display serif)
- **Motion**: Framer Motion (`cubic-bezier(0.65, 0.05, 0, 1)`, duration 0.75s) via `components/PremiumMotion.tsx`
- **Surfaces**:
  * Paddock Olive (`#282c20`): Dark ground for Manifesto
  * Chalk Cream (`#f4f4ed`): Light ground for Hero with contour lines
  * Signal Lime (`#d2ff00`): 8px radius CTA button, signature scribble, active indicator
  * Moss Lime (`#b2c73a`): Bodoni Moda serif accent words inside dark uppercase statements
  * Sage Fog (`#dde1d2`): Uppercase Mona Sans statement text on Paddock Olive

## Feature Inventory for Milestone 2
| # | Feature | Description | Milestone | Status |
|---|---------|-------------|-----------|--------|
| 1 | Topographic Contour Ground Canvas | Integrate `components/ContourBackground.tsx` cleanly across hero and sections | M2 | DONE |
| 2 | Floating Chrome Navigation | Inset 18.52px fixed layer with Arsalan WARSI wordmark, `aw` monogram, Signal Lime CTA, 55.5px square menu toggle, and full-bleed numbered directory | M2 | DONE |
| 3 | Assembling Hero & Sprint Ticket | Chalk Cream contour ground with portrait cut-out, active sprint ticket (Aptech, MERN, Open to Work), shrinking to card on scroll | M2 | DONE |
| 4 | Mixed-Face Statement Block / Manifesto | Manifesto headline in Sage Fog Mona Sans uppercase with Moss Lime Bodoni Moda serif accent words on Paddock Olive canvas, plus callout quote & signature scribble | M2 | DONE |

## Interface Contracts & Component Specifications

### 1. `ContourBackground.tsx`
- Signature: `ContourBackground({ surface?: "dark" | "light", className?: string })`
- Ground: renders non-scaling SVG contour lines with 1px stroke.
- Colors: `rgba(83, 84, 80, 0.28)` on dark ground; `rgba(40, 44, 32, 0.12)` on light ground.

### 2. `ChromeNav.tsx` / `Navbar.tsx`
- Role: Fixed site navigation layer inset 18.52px (`position: fixed; inset: 18.52px 18.52px auto 18.52px; z-index: 50;`).
- Visual: Zero background bar, zero drop shadows.
- Top-Left: Stacked wordmark — `Arsalan` (Bodoni Moda serif italic or display) over `WARSI` (heavy Mona Sans uppercase).
- Center: Centered `aw↗` monogram badge.
- Top-Right:
  * Signal Lime (`#d2ff00`) CTA button: 8px radius, height ~44-55.5px, Paddock Olive text "LET'S TALK ↗" (or "CONTACT"), Mona Sans 14.81px/800 or 18.52px/800 uppercase.
  * Square Menu Button: 55.5px square with 8px radius, two-dash glyph of unequal lengths.
- Navigation Dialog / Drawer:
  * Accessible full-bleed dialog opening smoothly without shadows.
  * Numbered directory links: 01 // PROJECTS, 02 // ABOUT, 03 // SKILLS, 04 // TIMELINE, 05 // CONTACT.
  * Smooth athletic transition with `cubic-bezier(0.65, 0.05, 0, 1)`.

### 3. `Hero.tsx`
- Ground: Full-viewport Chalk Cream (`#f4f4ed`) ground laced with fine contour lines from `ContourBackground`.
- Portrait Cut-out: Centered portrait cut-out from `/header-photo.webp` (with `/profile-photo.svg` fallback), Framer Motion reveal with `cubic-bezier(0.65, 0.05, 0, 1)` (0.75s).
- Bottom-Left Active Sprint Ticket:
  * Narrow outlined ticket inset 18.52px bottom-left.
  * 9.26px uppercase "ACTIVE SPRINT"
  * "MERN / FULL-STACK DEV"
  * "APTECH LEARNING ASSOCIATE"
  * "SINCE 2023 · KARACHI, PK"
  * Live status indicator badge: "OPEN TO WORK" with pulsating Signal Lime / Moss Lime dot.
- Scroll Behavior: On scroll, hero smoothly scales/shrinks into an inset card over the Paddock Olive canvas.

### 4. `Manifesto.tsx`
- Ground: Paddock Olive (`#282c20`) background.
- Headline Type: Centered heavy uppercase lines in Sage Fog (`#dde1d2`) Mona Sans Variable (tight tracking, compressed line-height).
- Accent Typography: Inline Moss Lime (`#b2c73a`) Bodoni Moda serif 700 accent words mid-line:
  e.g., "BUILDING SCALABLE FULL-STACK PRODUCTS WITH UNCOMPROMISING [PRECISION] AND REAL-WORLD [SPEED]."
- Personal Callout Quote:
  * Bodoni Moda serif quotation at 22.22px/400 lowercase at 0.94 line-height and +0.74px tracking.
  * Paired with small Signal Lime (`#d2ff00`) signature scribble 18.52px below.

## Code Layout & Write Boundaries
- Worker owns exclusively:
  * `components/Navbar.tsx` and/or `components/ChromeNav.tsx`
  * `components/MobileNav.tsx`
  * `components/Hero.tsx`
  * `components/Manifesto.tsx` (and `components/About.tsx` if refactored)
  * Integration into `app/page.tsx`
- Read-only reference:
  * `components/ContourBackground.tsx`
  * `components/PremiumMotion.tsx`
  * `data/portfolio.json` and `data/portfolio.ts`
  * `app/globals.css`
  * `app/layout.tsx`
