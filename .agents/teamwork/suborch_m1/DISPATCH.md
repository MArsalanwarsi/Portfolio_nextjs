# DISPATCH: Milestone 1 Sub-Orchestrator (Foundation & Coffee Purge)

- Role: Sub-Orchestrator Milestone 1
- Working Directory: D:\Arsalan\Portfolio_nextjs
- State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m1
- Project Scope: D:\Arsalan\Portfolio_nextjs\PROJECT.md
- Original Request: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md

## Scope & Objective
Execute Milestone 1: Foundation & Coffee Purge.
1. Remove all coffee theme components, hooks, assets, and styling:
   - `components/CoffeeCursor.tsx`, `components/DeferredCoffeeCursor.tsx`, `components/CoffeeScrollRail.tsx`
   - `components/DotField.tsx` (canvas coffee bean animation)
   - `public/coffee-mark.svg`, `public/loader/` (`coffee-cinema.mp4`, `coffee-poster.webp`), `assets/loader/`
   - Purge 420+ lines of coffee styles, keyframes, and body padding offsets in `app/globals.css`
2. Configure Tailwind CSS v4 `@theme` and CSS variables with Lando Norris color palette:
   - Paddock Olive (`#282c20`), Chalk Cream (`#f4f4ed`), Signal Lime (`#d2ff00`), Moss Lime (`#b2c73a`), Visor Black (`#111112`), Sage Fog (`#dde1d2`), Tarmac Gray (`#535450`), Lichen Gray (`#b4b8a5`), Stone Gray (`#b9bbad`)
   - Strict Zero Box Shadows rule: `box-shadow: none !important;`
   - Chamfered notch clip-paths and Lime Halo Gradient
3. Configure Next.js Google Fonts in `app/layout.tsx`:
   - `Mona_Sans` (`variable: "--font-sans"`, `axes: ["wdth"]`)
   - `Bodoni_Moda` (`variable: "--font-serif"`, `axes: ["opsz"]`)
   - Viewport theme color `#282c20`
4. Update `components/PremiumMotion.tsx` with Lando Norris easing curve `cubic-bezier(0.65, 0.05, 0, 1)` and `0.75s` duration.
5. Fix broken CSS module imports (e.g. `ProjectPresentation.module.css` referenced in `ProjectCarousel.tsx` / `Projects.tsx`) and impure render function in `Footer.tsx`.
6. Follow the sub-orchestrator iteration loop: Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate check.
7. Deliver completion report in `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m1\handoff.md`.


## 2026-11-10T14:56:54Z
You are the Milestone 1 Sub-Orchestrator (suborch_m1).
Working Directory: D:\Arsalan\Portfolio_nextjs
State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m1
Project Blueprint: D:\Arsalan\Portfolio_nextjs\PROJECT.md
Original Request: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md
Dispatch Assignment: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m1\DISPATCH.md
Survey Reports:
- Explorer 1 (Coffee theme): D:\Arsalan\Portfolio_nextjs\.agents\teamwork\explorer_survey_1\handoff.md
- Explorer 3 (Tailwind v4 tokens & Google Fonts): D:\Arsalan\Portfolio_nextjs\.agents\teamwork\explorer_survey_3\handoff.md

Your scope is Milestone 1: Foundation & Coffee Purge:
1. Remove coffee theme components: CoffeeCursor.tsx, DeferredCoffeeCursor.tsx, CoffeeScrollRail.tsx, DotField.tsx, and coffee loader assets.
2. Purge 420+ lines of coffee styles, keyframes, and body padding-right rules in app/globals.css.
3. Implement Tailwind v4 @theme tokens (Paddock Olive #282c20, Chalk Cream #f4f4ed, Signal Lime #d2ff00, Moss Lime #b2c73a, Visor Black #111112, etc.), 0-shadows, and chamfer clip-paths.
4. Configure Mona_Sans and Bodoni_Moda in app/layout.tsx via next/font/google.
5. Configure cubic-bezier(0.65, 0.05, 0, 1) in components/PremiumMotion.tsx.
6. Fix broken CSS module imports (ProjectPresentation.module.css) and impure render calls in Footer.tsx.

Apply the sub-orchestrator procedure (Assess -> Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate).
Your parent is: 90c00ba6-7763-4f5b-aeb5-9760561ec640.
When completed, write your handoff report to D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m1\handoff.md and notify me via send_message.
