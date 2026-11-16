# Handoff Report — Explorer 3: Design System & Technical Infrastructure Survey

- **Agent**: Explorer 3 (Design System Explorer)
- **State Folder**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\explorer_survey_3`
- **Date**: 2026-11-10T14:52:00Z
- **Target Spec**: Lando Norris Style Reference (`ORIGINAL_REQUEST.md`)

---

## 1. Observation

### 1.1 Package & Tooling Infrastructure
From direct inspection of `D:\Arsalan\Portfolio_nextjs\package.json`:
- **Next.js**: `^16.4.0` (Turbopack by default for `next dev` and `next build`).
- **React**: `^19.3.0` & `react-dom: ^19.3.0`.
- **Tailwind CSS**: `^4.3.3` with `@tailwindcss/postcss: ^4.3.3` (PostCSS-based Tailwind v4 engine).
- **Framer Motion**: `^12.43.0` (modern `LazyMotion`, `domMax`, `MotionConfig`, `m.div`).
- **Base UI**: `@base-ui/react: ^1.8.0` (accessible headless component primitives).
- **Icons**: `lucide-react: ^1.52.0`.
- **Linter**: `oxlint: ^1.87.0` configured in `scripts.lint`.
- **TypeScript**: `^6.0.3`, configured in `tsconfig.json` with `"paths": { "@/*": ["./*"] }`.
- **Node Engine**: `>=22.0.0` (verified active runtime: Node `v24.20.0`).
- **App Directory Structure**: Located at the project root `D:\Arsalan\Portfolio_nextjs\app` (NOT `src/app`).

### 1.2 Current Build Status & Pre-existing Issues
Executing `npm run build` directly revealed:
1. **Next.js Advisory / Security Warning**:
   ```
   ▲ Next.js 16.4.0 (Turbopack)
   ✓ Running next.config.ts took 91ms
     Creating an optimized production build ...
   ⨯ Your version of Next.js is affected by a known security vulnerability.
   **We strongly recommend you upgrade Next.js.**
   This command stopped to show the upgrade recommendation. Retry the same command to continue the original task.
   ```
2. **Missing Module Build Failure**:
   ```
   > Build error occurred
   Error: Turbopack build failed with 3 errors:
   ./components/ProjectCarousel.tsx:14:1
   Error: Module not found: Can't resolve './ProjectPresentation.module.css'
   ./components/ProjectCarousel.tsx:22:1
   Error: Module not found: Can't resolve './ProjectPresentation.module.css'
   ./components/Projects.tsx:4:1
   Error: Module not found: Can't resolve './ProjectPresentation.module.css'
   ```
   Inspection confirmed that `components/ProjectPresentation.module.css` does not exist on disk, causing a fatal build stoppage.

### 1.3 Tailwind CSS v4 Configuration
Direct inspection of `postcss.config.mjs` and `app/globals.css`:
- `postcss.config.mjs`:
  ```javascript
  const config = {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  export default config;
  ```
- There is **no** `tailwind.config.js` or `tailwind.config.ts`.
- `app/globals.css` lines 1–2:
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  ```
- Lines 80–123 feature an `@theme inline` block defining CSS variable mappings for colors, radii, and fonts.
- Lines 9–78 define coffee-centric `:root` and `.dark` variables (`--background: #211711;`, `--foreground: #fff5e9;`, `--primary: #bb895b;`, `--accent: #4a3221;`, etc.).
- Lines 229–299 define glassmorphism classes (`.glass-card`, `.glass-nav`, `.glass-control`) with heavy box shadows (`0 22px 70px ...`, `0 24px 90px ...`).
- Lines 382–804 define over 420 lines of coffee-specific CSS (`.coffee-pointer`, `.coffee-cursor`, `.coffee-scroll-rail`, `.brew-machine`, `.brew-pot`, `.brew-cup`, etc.).

### 1.4 Font Loading Verification in Next.js 16.4
Inspection of `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`:
- **`Mona Sans`**:
  ```json
  {
    "weights": ["200", "300", "400", "500", "600", "700", "800", "900", "variable"],
    "styles": ["normal", "italic"],
    "axes": [
      { "tag": "wdth", "min": 75, "max": 125, "defaultValue": 100 },
      { "tag": "wght", "min": 200, "max": 900, "defaultValue": 400 }
    ],
    "subsets": ["latin", "latin-ext", "vietnamese"]
  }
  ```
  Verified: `Mona_Sans` is natively supported in `next/font/google` and directly supports the `wdth` axis (75–125), satisfying the Lando Norris requirement (`"wdth" 93`).
- **`Bodoni Moda`** (Brier substitute):
  ```json
  {
    "weights": ["400", "500", "600", "700", "800", "900", "variable"],
    "styles": ["normal", "italic"],
    "axes": [
      { "tag": "opsz", "min": 6, "max": 96, "defaultValue": 11 },
      { "tag": "wght", "min": 400, "max": 900, "defaultValue": 400 }
    ],
    "subsets": ["latin", "latin-ext", "math", "symbols"]
  }
  ```
  Verified: `Bodoni_Moda` is natively supported in `next/font/google` with optical size `opsz` axis and weights 400–900.
- Current font implementation in `app/layout.tsx` (lines 2, 58–68):
  Imports `Geist` and `Geist_Mono` instead of `Mona_Sans` and `Bodoni_Moda`.

### 1.5 Framer Motion Configuration
Direct inspection of `components/PremiumMotion.tsx`:
- Line 14: `const premiumEase = [0.22, 1, 0.36, 1] as const;`
- Lines 117–124:
  ```tsx
  <LazyMotion features={domMax} strict>
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.62, ease: premiumEase }}
    >
      {children}
    </MotionConfig>
  </LazyMotion>
  ```
- The Lando Norris style reference mandates:
  `cubic-bezier(0.65, 0.05, 0, 1)` with `0.75s` duration across reveals, clip-path wipes, and transitions.

### 1.6 Existing Lando Norris Implementation Seeds
Inspection of `components/Chrome.module.css`:
- Contains preliminary implementations of:
  - Colors: `#282c20` (Paddock Olive), `#f4f4ed` (Chalk Cream), `#d2ff00` (Signal Lime), `#b2c73a` (Moss Lime), `#535450` (Tarmac Gray), `#b4b8a5` (Lichen Gray).
  - Floating chrome bar, wordmark (`Arsalan` serif over `WARSI` heavy sans), monogram (`aw↗`), Signal Lime talk button, 55px square menu toggle with unequal lines.
  - Easing: `animation: menu-reveal .75s cubic-bezier(.65,.05,0,1);`
  - Footer tab chamfer: `clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%);`
  - Footer ground: `radial-gradient(ellipse at 50% 12%, #d2ff00 0%, #d2ff0080 13%, transparent 58%), #f4f4ed;`

---

## 2. Logic Chain

1. **Premise 1**: The user requires removing all coffee theme artifacts and applying the Lando Norris design specification cleanly across Next.js 16.4.0 and Tailwind CSS v4.
2. **Observation 1.3**: Current `app/globals.css` still contains coffee-brown color variables (`#211711`), glassmorphism drop shadows, and 420+ lines of coffee pouring/steaming/cup animations.
3. **Observation 1.4**: `next/font/google` contains exact entries for `Mona_Sans` (with `wdth` axis 75–125) and `Bodoni_Moda` (with `opsz` axis 6–96).
4. **Deduction 1**: In `app/layout.tsx`, replacing `Geist` and `Geist_Mono` with `Mona_Sans({ axes: ["wdth"], variable: "--font-sans" })` and `Bodoni_Moda({ axes: ["opsz"], variable: "--font-serif" })` will provide zero-layout-shift self-hosted font loading with native variable font support without any third-party font dependencies.
5. **Observation 1.3**: Tailwind CSS v4 does not read `tailwind.config.js`; it configures design tokens through `@theme` blocks directly in CSS.
6. **Deduction 2**: Defining Lando Norris colors (`--color-paddock: #282c20;`, `--color-chalk: #f4f4ed;`, `--color-signal-lime: #d2ff00;`, etc.) and typography inside `@theme` in `app/globals.css` will instantly expose classes like `bg-paddock`, `text-chalk`, `bg-signal-lime`, `text-moss-lime`, `border-tarmac`, `font-sans`, `font-serif`.
7. **Observation 1.5**: `components/PremiumMotion.tsx` uses `premiumEase = [0.22, 1, 0.36, 1]`. The Lando Norris spec explicitly requires `cubic-bezier(0.65, 0.05, 0, 1)` with `0.75s`.
8. **Deduction 3**: Updating `PremiumMotion.tsx` to use `landoEase = [0.65, 0.05, 0, 1]` with `0.75s` duration will propagate the exact athletic timing curve to all reveals, card lifts, and motion transitions across the entire site.
9. **Observation 1.2**: Turbopack currently fails the build on `components/ProjectCarousel.tsx` and `components/Projects.tsx` due to `Can't resolve './ProjectPresentation.module.css'`.
10. **Deduction 4**: The build will remain broken until `ProjectPresentation.module.css` is either created or the references are replaced with standard Tailwind v4 / module styling.

---

## 3. Caveats

1. **Pre-existing Build Failure**: The build error in `ProjectCarousel.tsx` is an existing regression from in-progress editing. Resolving it is a prerequisite for a clean `npm run build`.
2. **Next.js Security Upgrade Prompt**: Next.js 16.4.0 prints an advisory asking to run `next upgrade --agent=security`. As an explorer operating in read-only investigation mode, no package upgrades or source mutations were performed.
3. **Network font prefetching during build**: `next/font/google` downloads Google Font files during the initial Next.js build and caches them in `.next/cache`. If building in a restricted offline environment, pre-downloaded `.woff2` files using `next/font/local` would be needed as a fallback. However, network access is present in this environment.
4. **Browser support for font-variation-settings**: Modern browsers support `font-variation-settings: "wdth" 93, "wght" 660`. Standard fallback fonts (`system-ui, sans-serif`) ignore font-variation-settings gracefully.

---

## 4. Conclusion & Technical Recommendations

### 4.1 Tailwind CSS v4 Theme Architecture
In `app/globals.css`, purge lines 9–78 and 229–804. Replace with the following unified Tailwind v4 `@theme` and `:root` configuration:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant data-open (&:is([data-state="open"], [data-open]:not([data-open="false"])));
@custom-variant data-closed (&:is([data-state="closed"], [data-closed]:not([data-closed="false"])));
@custom-variant data-active (&:is([data-state="active"], [data-active]:not([data-active="false"])));

:root {
  /* Surface Tokens */
  --paddock-olive: #282c20;
  --chalk-cream: #f4f4ed;
  --signal-lime: #d2ff00;
  --moss-lime: #b2c73a;
  --visor-black: #111112;
  --sage-fog: #dde1d2;
  --tarmac-gray: #535450;
  --lichen-gray: #b4b8a5;
  --stone-gray: #b9bbad;

  /* Semantic UI Tokens (Default: Paddock Olive dark ground) */
  --background: var(--paddock-olive);
  --foreground: var(--chalk-cream);
  --card: var(--visor-black);
  --card-foreground: var(--chalk-cream);
  --popover: var(--visor-black);
  --popover-foreground: var(--chalk-cream);
  --primary: var(--signal-lime);
  --primary-foreground: var(--paddock-olive);
  --secondary: var(--moss-lime);
  --secondary-foreground: var(--paddock-olive);
  --muted: #313628;
  --muted-foreground: var(--lichen-gray);
  --accent: var(--moss-lime);
  --accent-foreground: var(--paddock-olive);
  --border: var(--tarmac-gray);
  --input: var(--tarmac-gray);
  --ring: var(--signal-lime);
  --radius: 8px;
}

/* Light Ground Override for Chalk Cream sections */
[data-surface="light"],
.surface-light {
  --background: var(--chalk-cream);
  --foreground: var(--paddock-olive);
  --card: var(--chalk-cream);
  --card-foreground: var(--paddock-olive);
  --muted: #e6e6dc;
  --muted-foreground: #535450;
  --border: rgba(40, 44, 32, 0.18);
}

/* Void Ground Override for Visor Black sections (Helmet / Product grids) */
[data-surface="void"],
.surface-void {
  --background: var(--visor-black);
  --foreground: var(--chalk-cream);
  --card: var(--visor-black);
  --card-foreground: var(--chalk-cream);
  --border: var(--tarmac-gray);
}

@theme {
  /* Font Families */
  --font-sans: var(--font-sans), system-ui, -apple-system, sans-serif;
  --font-serif: var(--font-serif), Georgia, serif;
  --font-display: var(--font-serif), Georgia, serif;

  /* Colors */
  --color-paddock: var(--paddock-olive);
  --color-chalk: var(--chalk-cream);
  --color-signal-lime: var(--signal-lime);
  --color-moss-lime: var(--moss-lime);
  --color-visor-black: var(--visor-black);
  --color-sage-fog: var(--sage-fog);
  --color-tarmac: var(--tarmac-gray);
  --color-lichen: var(--lichen-gray);
  --color-stone: var(--stone-gray);

  /* Semantic utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);

  /* Precise Radii */
  --radius-btn: 8px;
  --radius-nav: 8px;
  --radius-badge: 2.96px;
  --radius-indicator: 14px;
  --radius-card: 0px;

  /* Motion Curves */
  --ease-lando: cubic-bezier(0.65, 0.05, 0, 1);
  --duration-lando: 0.75s;
}
```

### 4.2 Elevation & Zero Shadows Rule
Strictly enforce:
```css
/* Zero cast shadows across entire site */
*,
*::before,
*::after {
  box-shadow: none !important;
  text-shadow: none !important;
}
```
All visual separation must rely on:
1. Ground contrast (`#282c20` Paddock Olive vs `#f4f4ed` Chalk Cream vs `#111112` Visor Black).
2. 1px `#535450` (Tarmac Gray) outlines.
3. Chamfered notched corners.
4. Parallax depth.

### 4.3 Chamfered Notches & Tab Geometries
```css
/* 1. Chamfered Corner Card (Bottom Right Notch) */
.chamfer-card {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    0 100%
  );
}

/* 2. Raised Inset Footer Tab */
.footer-tab {
  clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
}

/* 3. Lime Halo Gradient (Footer Glow) */
.lime-halo-glow {
  background: radial-gradient(
    circle at 50% -190%,
    rgba(210, 255, 0, 0) 68%,
    rgb(210, 255, 0) 83%
  );
}
```

### 4.4 Topographic Contour Line Overlay
Replace `DotField.tsx` (the coffee bean canvas animation) with a reusable vector contour overlay:
```tsx
// components/ContourBackground.tsx
export default function ContourBackground({ surface = "dark" }: { surface?: "dark" | "light" }) {
  const strokeColor = surface === "dark" ? "rgba(83, 84, 80, 0.28)" : "rgba(40, 44, 32, 0.12)";
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`topo-${surface}`} width="400" height="400" patternUnits="userSpaceOnUse">
          <path
            d="M0,100 C100,80 150,140 250,110 C350,80 380,120 400,100 M0,200 C80,180 180,240 270,190 C340,150 370,220 400,200 M0,300 C110,310 190,260 280,320 C350,360 380,280 400,300"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#topo-${surface})`} />
    </svg>
  );
}
```

### 4.5 Font Loading Specification for `app/layout.tsx`
```tsx
import { Mona_Sans, Bodoni_Moda } from "next/font/google";
import { cn } from "@/lib/utils";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["wdth"],
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const viewport: Viewport = {
  themeColor: "#282c20",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(monaSans.variable, bodoniModa.variable, "font-sans")}
    >
      <body className="min-h-screen bg-paddock text-chalk antialiased selection:bg-signal-lime selection:text-paddock">
        {children}
      </body>
    </html>
  );
}
```

### 4.6 Framer Motion Easing in `components/PremiumMotion.tsx`
```typescript
export const landoEase = [0.65, 0.05, 0, 1] as const;
export const landoDuration = 0.75;

export default function PremiumMotion({ children }: PremiumMotionProps) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: landoDuration, ease: landoEase }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

---

## 5. Verification Method

To independently verify these findings and implementations:

1. **Font Verification**:
   - Run:
     ```powershell
     node -e "const data = require('./node_modules/next/dist/compiled/@next/font/dist/google/font-data.json'); console.log('Mona Sans:', data['Mona Sans'].axes); console.log('Bodoni Moda:', data['Bodoni Moda'].axes);"
     ```
   - Confirms that `Mona Sans` supports the `wdth` axis and `Bodoni Moda` supports `opsz`.

2. **Tailwind v4 `@theme` Verification**:
   - Inspect `app/globals.css` after token injection.
   - Run `npx oxlint` to ensure CSS syntax validity.

3. **Build & Typecheck Verification**:
   - Create or patch the missing `components/ProjectPresentation.module.css` (or remove the dangling import in `ProjectCarousel.tsx`).
   - Run `npm run build`.
   - Invalidation condition: Build fails on missing fonts, invalid `@theme` directives, or broken CSS imports.

4. **Security Advisory Follow-up**:
   - Note Next.js recommendation: `next upgrade --agent=security`. Verify with user before executing.
