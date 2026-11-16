# Task Assignment: Milestone 1 Worker

## 2026-11-10T15:10:10Z

You are the Milestone 1 Worker (m1_worker_1) responsible for implementing Milestone 1: Foundation & Coffee Purge.
Working Directory: D:\Arsalan\Portfolio_nextjs
State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_worker_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

READ THESE DOCUMENTS FIRST BEFORE TOUCHING CODE:
1. Original Request: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md
2. Project Blueprint: D:\Arsalan\Portfolio_nextjs\PROJECT.md
3. Milestone Scope: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m1\SCOPE.md
4. Explorer 1 Handoff (Coffee purge & files): D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_explorer_1\handoff.md
5. Explorer 2 Handoff (Tailwind v4 tokens & layout fonts): D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_explorer_2\handoff.md
6. Explorer 3 Handoff (Build fixes, module CSS & motion): D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_explorer_3\handoff.md

FILE OWNERSHIP BOUNDARY (Exclusive to you):
- Delete:
  * `components/CoffeeCursor.tsx`
  * `components/DeferredCoffeeCursor.tsx`
  * `components/CoffeeScrollRail.tsx`
  * `components/DotField.tsx`
  * `components/DotField.module.css`
  * `components/LoadingScreen.tsx`
  * `components/LoadingScreen.module.css`
  * `components/BootLoader.tsx`
  * `public/coffee-mark.svg`
  * `public/loader/coffee-cinema.mp4`
  * `public/loader/coffee-poster.webp`
  * `public/loader/` directory
  * `assets/loader/` directory
- Create:
  * `components/ContourBackground.tsx` (topographic SVG contour lines with non-scaling strokes for dark/light surfaces per Explorer 1 report § Step 3)
  * `components/ProjectPresentation.module.css` (defining all 24 classes in Lando Norris aesthetic per Explorer 1 § Step 6 & Explorer 3 § 4.1)
- Modify:
  * `app/page.tsx`: Remove `CoffeeScrollRail` and `DeferredCoffeeCursor` imports and JSX instances.
  * `app/layout.tsx`: Remove `BootLoader` import/JSX, remove `boot-loader-active` from body, import and configure `Mona_Sans` (`variable: "--font-sans"`, `axes: ["wdth"]`) and `Bodoni_Moda` (`variable: "--font-serif"`, `axes: ["opsz"]`, `style: ["normal", "italic"]`), set viewport `themeColor: "#282c20"`.
  * `app/globals.css`: Replace coffee tokens and purge lines 383–804 completely (coffee cursor, scroll rail, brewing animations, and body padding offsets). Implement Lando Norris primitive palette (`#282c20` Paddock Olive, `#f4f4ed` Chalk Cream, `#d2ff00` Signal Lime, `#b2c73a` Moss Lime, `#111112` Visor Black, `#dde1d2` Sage Fog, `#535450` Tarmac Gray, `#b4b8a5` Lichen Gray, `#b9bbad` Stone Gray), semantic surface tokens, `@theme inline`, zero shadows rule `*, *::before, *::after { box-shadow: none !important; text-shadow: none !important; }`, `.chamfer-card`, `.footer-tab`, `.lime-halo-glow`, and font presets per Explorer 2 report § 4.1.
  * `components/AnimatedBackground.tsx`: Replace `DotField` with `ContourBackground surface="dark"`.
  * `components/PremiumMotion.tsx`: Export `landoEase = [0.65, 0.05, 0, 1] as const`, duration `0.75s`, apply to `MotionConfig` and primitives per Explorer 3 report § 4.3.
  * `components/ProjectMedia.tsx`: Replace `#17110c` with `#111112`, remove `shadow-2xl`, align easing curve to `[0.65, 0.05, 0, 1]` with `0.75s`.
  * `components/Footer.tsx`: Declare `const CURRENT_YEAR = 2026;` outside the component to eliminate the oxlint render purity warning, update footer tab to `AW / {CURRENT_YEAR}`, and copyright.
  * `app/manifest.ts`: Update `background_color` and `theme_color` to `#282c20`.
  * `app/opengraph-image.tsx`: Update background gradient and colors from coffee to Paddock Olive `#282c20` / Visor Black `#111112` / Signal Lime `#d2ff00` / Chalk Cream `#f4f4ed`.
  * `README.md`: Remove the coffee verification section.

EXECUTION & VERIFICATION REQUIREMENTS:
1. Carry out all file deletions, creations, and edits cleanly.
2. Run verification commands:
   - `npm run lint` -> must pass with 0 errors and 0 warnings.
   - `npm run build` -> must pass with 0 errors (`next build` with Turbopack).
   - Verify zero coffee references remain in project source code (`.tsx`, `.ts`, `.css`, `.svg`).
3. Document all changes, exact commands run, and build/test outputs in `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_worker_1\handoff.md`.
4. When finished, send a message to notify me via send_message.
