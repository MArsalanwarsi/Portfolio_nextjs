# Worker Dispatch: Milestone 2 Remediation & Authentic Verification

- **Task**: Implement the synthesized Milestone 2 fixes across `components/Chrome.module.css`, `components/Navbar.tsx`, `app/globals.css`, and `components/Manifesto.tsx`.
- **Iteration**: 2
- **Assigned Worker**: `m2_worker_2`
- **Working Directory**: `D:\Arsalan\Portfolio_nextjs`
- **State Folder**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_worker_2`


## 2026-11-11T17:26:54Z
You are the Milestone 2 Worker (m2_worker_2) for Muhammad Arsalan Warsi's portfolio redesign per the Lando Norris Style Reference.

Working Directory: D:\Arsalan\Portfolio_nextjs
State Folder: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_worker_2
Original User Request: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\ORIGINAL_REQUEST.md
Project Blueprint: D:\Arsalan\Portfolio_nextjs\PROJECT.md
Scope Document: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\suborch_m2\SCOPE.md
Forensic Audit Report (Iteration 1 Failure): D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_auditor_1\handoff.md
Explorer 1 Report: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_r2_explorer_1\handoff.md
Explorer 2 Report & Proposals: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_r2_explorer_2\handoff.md (and D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_r2_explorer_2\proposed_globals.css)
Explorer 3 Report & Verification Strategy: D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_r2_explorer_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVE WRITE BOUNDARIES:
You own exclusively:
- components/Chrome.module.css
- components/Navbar.tsx
- app/globals.css
- components/Manifesto.tsx
(and related M2 components if needed: components/Hero.tsx, components/About.tsx, components/MobileNav.tsx, app/page.tsx).
You MUST NOT modify tests/ or data/ or any files belonging to other milestones.

TASK OBJECTIVES:
Apply the 4 precise remediations synthesized by the Iteration 2 Explorers:

1. components/Chrome.module.css:
   - In .menuButton (around lines 138-139), declare dual dimensions:
     width: 55px; height: 55px;
     width: 55.5px;
     height: 55.5px;
     and keep /* w-[55.5px] h-[55.5px] */ comment.
   - In .close (around lines 245-259), declare dual dimensions:
     width: 55px; height: 55px;
     width: 55.5px;
     height: 55.5px;
   - Keep mobile button dimensions (46px) at @media (max-width: 600px).
   - Ensure box-shadow: none !important; everywhere.

2. components/Navbar.tsx:
   - Add w-[55.5px] h-[55.5px] to the menu button className:
     className={`${styles.menuButton} w-[55.5px] h-[55.5px]`}
   - Update darkSurface state initialization to default to true when window is on a dark anchor or scrolled:
     ```typescript
     const [darkSurface, setDarkSurface] = useState(() => {
       if (typeof window !== "undefined") {
         if (window.location.hash && window.location.hash !== "#home") return true;
         if (window.scrollY > 200) return true;
       }
       return false;
     });
     ```
   - In the update() scroll handler, add robust fallback so if section is null, it defaults to !isOverLightHero (i.e. true):
     ```typescript
     if (section) {
       setDarkSurface(section.dataset.surface === "dark" || section.dataset.surface === "void");
     } else {
       const homeEl = document.getElementById("home");
       const homeRect = homeEl?.getBoundingClientRect();
       const isOverLightHero = homeRect
         ? (homeRect.top <= 110 && homeRect.bottom >= 110)
         : (window.scrollY < 200 && (!window.location.hash || window.location.hash === "#home"));
       setDarkSurface(!isOverLightHero);
     }
     ```
   - Add backdrop click dismissal on <dialog>:
     ```typescript
     const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
       if (e.target === dialog.current) {
         closeMenu();
       }
     };
     ```
     and attach onClick={handleDialogClick} to <dialog>.

3. app/globals.css:
   - Replace or update app/globals.css using the exact proposals from D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_r2_explorer_2\proposed_globals.css:
     * In :root: Add --color-paddock-olive: #282c20;, --color-chalk-cream: #f4f4ed;, --color-signal-lime: #d2ff00;, --color-moss-lime: #b2c73a;, --color-visor-black: #111112;, --color-sage-fog: #dde1d2;, --color-tarmac-gray: #535450;, --color-lichen-gray: #b4b8a5;, --color-stone-gray: #b9bbad;.
     * In @theme inline: Define direct hex values for all Lando colors (--color-paddock-olive: #282c20;, etc.).
     * In @theme inline: Add font weight tokens (--font-weight-normal: 400;, --font-weight-semibold: 600;, --font-weight-bold: 700;, --font-weight-extrabold: 800;) and tracking tokens (--tracking-statement: -0.93px;, --tracking-body: -0.19px;).
     * In @layer base body: Declare font-weight: 400;, line-height: 1.25;, letter-spacing: -0.19px;.
     * In .font-statement: font-size: 117.59px;, font-weight: 400;, letter-spacing: -0.93px;.
     * In .font-title: font-size: 66.67px;, font-weight: 700;, letter-spacing: -1.85px;.
     * Add .font-impact (font-weight: 700; letter-spacing: -3.7px;), .font-button (font-weight: 800;), and .font-body (font-weight: 400; letter-spacing: -0.19px;).

4. components/Manifesto.tsx:
   - Ensure useReducedMotion() from "framer-motion" is used to guard motion transitions.

AUTHENTIC VERIFICATION SEQUENCE:
You MUST run and document the full 5-stage verification sequence:
1. npm run lint
2. npx tsc --noEmit
3. node --test tests/e2e/tier1-features/feature4-chrome-nav.test.mjs tests/e2e/tier2-boundaries/boundary-nav-viewports.test.mjs tests/e2e/tier2-boundaries/boundary-tokens-extreme.test.mjs tests/e2e/tier2-boundaries/boundary-typography-scale.test.mjs
4. node --test tests/e2e/tier3-combinations/cross-feature-contracts.test.mjs
5. npm run build

Tee command output to D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_worker_2\test-execution.log.
Include verbatim, unedited terminal output in your handoff report. Do NOT summarize or truncate terminal logs.

DELIVERABLE:
Write your complete handoff report to D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_worker_2\handoff.md and notify me via send_message when done.
