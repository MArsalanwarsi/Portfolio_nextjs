## 2026-11-10T15:48:14Z

You are the Worker agent (teamwork_worker) for Milestone 2: Navigation, Hero & Manifesto.
Your State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_worker_1
Workspace Directory: D:\Arsalan\Portfolio_nextjs

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Mandatory Documents to Read First:
- D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md
- D:\Arsalan\Portfolio_nextjs\PROJECT.md
- D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m2\SCOPE.md
- D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_1\handoff.md
- D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_2\handoff.md
- D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_2\proposed_Hero.tsx
- D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_3\handoff.md

### Exclusive Write Ownership:
You own and may write ONLY to these files:
1. `components/Navbar.tsx`
2. `components/Chrome.module.css`
3. `components/Hero.tsx`
4. `components/Manifesto.tsx`
5. `components/About.tsx`
6. `components/MobileNav.tsx`
7. `app/page.tsx`
DO NOT modify any other project files without orchestrator permission.

### Implementation Tasks:
1. **Floating Chrome Navigation (`components/Navbar.tsx` & `components/Chrome.module.css`)**:
   - Fixed layer inset 18.52px (`position: fixed; inset: 18.52px 18.52px auto 18.52px; z-index: 50;`) with zero cast shadow (`box-shadow: none !important;`).
   - Top-left stacked wordmark: "Arsalan" (Bodoni Moda serif display) over "WARSI" (heavy Mona Sans uppercase).
   - Center: "aw↗" monogram badge.
   - Top-right action controls:
     * Signal Lime (`#d2ff00`) CTA button ("LET'S TALK ↗", 8px radius, Paddock Olive text, 55.5px height).
     * 55.5px square menu toggle button with 2 unequal dashes (1px Paddock Olive outline on transparent fill on light ground; solid Chalk Cream fill with Paddock Olive glyph on dark ground).
   - Full-bleed numbered directory navigation dialog (01 // PROJECTS, 02 // ABOUT, 03 // SKILLS, 04 // TIMELINE, 05 // CONTACT) with athletic transition `cubic-bezier(0.65, 0.05, 0, 1)`.
   - Implement exactly per `m2_explorer_1/handoff.md`.

2. **Assembling Hero Section (`components/Hero.tsx`)**:
   - Full-viewport Chalk Cream (`#f4f4ed`) ground laced with fine contour lines via `<ContourBackground surface="light" />`.
   - Centred portrait cut-out from `/header-photo.webp` with Framer Motion reveal using `cubic-bezier(0.65, 0.05, 0, 1)` (0.75s) using `m.div` (strict `LazyMotion` compatible) and technical hairline reticles.
   - Bottom-left Active Sprint ticket (inset 18.52px, notched tab `ACTIVE SPRINT`, MERN architecture circuit SVG, `MERN / FULL-STACK DEV`, `APTECH LEARNING ASSOCIATE`, `SINCE 2023 · KARACHI, PK`, live `OPEN TO WORK` status badge with pulsating Signal Lime dot, zero cast shadow).
   - Smooth scroll parallax: Sticky 100dvh viewport card inside 140vh section scales down (1.0 -> 0.935) and curves corners (0px -> 18.52px) on scroll, revealing Paddock Olive (`#282c20`) body canvas underneath before entering Manifesto.
   - Use the verified reference implementation from `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_2\proposed_Hero.tsx`.

3. **Mixed-Face Statement Block / Manifesto (`components/Manifesto.tsx` & `components/About.tsx`)**:
   - Ground: Paddock Olive (`#282c20`) background canvas with `data-surface="dark"` and `<ContourBackground surface="dark" />`.
   - Centered heavy uppercase headline in Sage Fog (`#dde1d2`) Mona Sans Variable ("wdth" 93, "wght" 660, 0.9 line-height, -0.93px tracking) with inline Bodoni Moda serif 700 accent words in Moss Lime (`#b2c73a`, 0.83 line-height, -2.78px tracking, `inline-block align-baseline`).
   - Personal callout quote in Bodoni Moda 22.22px/400 lowercase at 0.94 line-height and +0.74px tracking in Chalk Cream with 2 words bolded to 700.
   - Signal Lime (`#d2ff00`) signature scribble SVG placed precisely 18.52px below the quote.
   - 3 square-cornered captioned story fragments (9.26px caps, 1px Tarmac Gray borders, 0 shadow).
   - Re-export `Manifesto` in `About.tsx` (`export { default } from "./Manifesto"`) for backward compatibility.
   - Implement per `m2_explorer_3/handoff.md`.

4. **Retire `components/MobileNav.tsx`**:
   - Safely remove or replace `MobileNav.tsx` so no legacy coffee tokens (`shadow-[0_0_34px_rgba(200,151,104,0.18)]`) remain in the codebase.

5. **Page Assembly in `app/page.tsx`**:
   - Integrate `Navbar`, `Hero`, and `Manifesto` seamlessly, maintaining clean surface transition detection.

6. **Build & Test Verification**:
   Execute and document passing results for:
   - `npm run lint` (`oxlint --deny-warnings`)
   - `npx tsc --noEmit`
   - `npm test`
   - `npm run build`

7. Deliver your self-contained handoff report to `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_worker_1\handoff.md` and notify parent via `send_message`.
