# DISPATCH: Explorer 1 (Projects Showcase Investigation)

- State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m3_explorer_1
- Project Blueprint: D:\Arsalan\Portfolio_nextjs\PROJECT.md
- Scope Document: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m3\SCOPE.md
- Original Request: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md
- Data Source: D:\Arsalan\Portfolio_nextjs\data\portfolio.json

## Focus & Objectives
1. Inspect existing project components:
   - `components/Projects.tsx`
   - `components/ProjectCard.tsx`
   - `components/ProjectCarousel.tsx`
   - Any css modules or styles
2. Check for missing files or broken references:
   - Note that `suborch_m2` and `explorer_survey_2` identified broken references to `./ProjectPresentation.module.css` and a residual `shadow-2xl` class on line 392 of `ProjectCarousel.tsx`.
3. Verify compliance with Milestone 3 Visor Black specifications:
   - Visor Black (`#111112`) neutral void ground
   - 1px Tarmac Gray (`#535450`) outline cards with square corners (0px radius)
   - Chamfered notch tab at bottom-right (`clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`)
   - Centred project preview image/SVG (all 16 SVGs in `public/projects/`)
   - Mona Sans 13.33px/600 Chalk Cream name + Signal Lime 13.33px/700 year/tech tag
   - Controls: 8px border radius, Signal Lime hooked return-arrow icons
   - ZERO box shadows anywhere
   - All 8 real projects from `data/portfolio.json`: GrowthRadar AI, Fitness Tracker, Sustainable Living, Warranty Flow, ThriftShoewear, Master Wood Works, ABC Mall, K-Medicos with live and GitHub links
4. Check test requirements in `tests/e2e/tier3-combinations/cross-feature-contracts.test.mjs` (especially T3-COMB-05).
5. Output detailed report to `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m3_explorer_1\handoff.md`.
