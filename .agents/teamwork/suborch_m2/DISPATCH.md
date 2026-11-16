# DISPATCH: Milestone 2 Sub-Orchestrator (Navigation, Hero & Manifesto)

- Role: Sub-Orchestrator Milestone 2
- Working Directory: D:\Arsalan\Portfolio_nextjs
- State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m2
- Project Scope: D:\Arsalan\Portfolio_nextjs\PROJECT.md
- Original Request: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md

## Scope & Objective
Execute Milestone 2: Navigation, Hero & Manifesto.
1. **Floating Chrome Navigation (`components/Navbar.tsx` / `components/ChromeNav.tsx`)**:
   - Fixed layer inset 18.52px (`position: fixed; inset: 18.52px 18.52px auto 18.52px; z-index: 50;`).
   - Top-left: stacked wordmark — `Arsalan` (Bodoni Moda serif) over `WARSI` (heavy Mona Sans uppercase).
   - Center: `aw↗` monogram.
   - Top-right: Signal Lime (`#d2ff00`) CTA button (8px radius, Paddock Olive text "LET'S TALK ↗" or "CONTACT") beside a 55.5px square menu toggle with 2 unequal dashes.
   - Menu toggle opens a full-bleed numbered directory navigation dialog without box shadows, with smooth athletic transition.
2. **Topographic Contour Ground Canvas**:
   - Integrate `ContourBackground.tsx` cleanly across hero and alternating sections.
3. **Assembling Hero Section (`components/Hero.tsx`)**:
   - Full-viewport Chalk Cream (`#f4f4ed`) ground with fine contour lines.
   - Centred portrait cut-out from `/header-photo.webp` (using Framer Motion reveal with `cubic-bezier(0.65, 0.05, 0, 1)`).
   - Bottom-left Active Sprint / Next Milestone Ticket:
     * 9.26px uppercase "ACTIVE SPRINT"
     * "MERN / FULL-STACK DEV"
     * "APTECH LEARNING ASSOCIATE"
     * "SINCE 2023 · KARACHI, PK"
     * "OPEN TO WORK" live indicator badge (Signal Lime / Moss Lime)
   - On scroll, hero portrait smoothly scales/shrinks into an inset card over the Paddock Olive canvas.
4. **Mixed-Face Statement Block / Manifesto (`components/Manifesto.tsx` / `components/About.tsx`)**:
   - Paddock Olive (`#282c20`) background.
   - Centred heavy uppercase lines in Sage Fog (`#dde1d2`) Mona Sans Variable (tight tracking, compressed line-height).
   - Swapping inline emotional accent words into Moss Lime (`#b2c73a`) Bodoni Moda serif 700:
     e.g., "BUILDING SCALABLE FULL-STACK PRODUCTS WITH UNCOMPROMISING [PRECISION] AND PRODUCTION [SPEED]."
   - Brier/Bodoni Moda callout quote with small Signal Lime (`#d2ff00`) signature scribble.
5. **Quality & Integrity Standards**:
   - Zero cast shadows.
   - 8px radius on buttons; 0px radius on cards with chamfers where appropriate.
   - Run linter (`npm run lint`) and build (`npm run build`) via workers.
   - Follow iteration loop: Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate check.

## 2026-11-11T17:13:06Z
**From Parent (90c00ba6-7763-4f5b-aeb5-9760561ec640)**:
Server restart and quota reset complete. Quota is fully restored and execution environment is live. Please read your state in `progress.md` and `GATE_STATUS.md`, resume your Iteration 2 workflow, and proceed with Worker implementation and verification. Resume Milestone 2 orchestration immediately and report when complete.

