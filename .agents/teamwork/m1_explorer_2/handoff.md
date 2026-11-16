# Handoff Report — Explorer 2: Tailwind CSS v4 Tokens, Google Fonts & Elevation Rules

- **Agent**: Explorer 2 (Tailwind & Font Explorer)
- **Role**: Read-only Investigation & Architectural Specification
- **Milestone**: Milestone 1 — Foundation & Coffee Purge
- **Target Worker**: Worker 2 (Foundation & Design Tokens Worker)
- **State Folder**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_explorer_2`
- **Date**: 2026-11-10T15:10:00Z

---

## 1. Observation

### 1.1 Existing `app/globals.css` Structure & Contamination
Direct inspection of `app/globals.css` (804 total lines) revealed:
1. **Coffee Palette in `:root` and `.dark`** (Lines 9–78):
   - `:root` declares warm brown/caramel hex values:
     `--background: #211711;` (line 12), `--foreground: #fff5e9;` (line 13), `--card: #2a1d15;` (line 14), `--primary: #bb895b;` (line 18), `--secondary: #38271b;` (line 20), `--muted: #32231a;` (line 22), `--accent: #4a3221;` (line 24), `--border: rgba(239, 213, 180, 0.14);` (line 27), `--ring: #c89768;` (line 29).
   - `.dark` declares deeper roast brown tones:
     `--background: #130e0a;` (line 47), `--card: #20160f;` (line 49), `--primary: #cfa071;` (line 53), `--accent: #3b291c;` (line 59).
2. **Current `@theme inline` Block** (Lines 80–123):
   - Maps standard CSS variables (`--color-background: var(--background);`, `--color-foreground: var(--foreground);`, `--radius-lg: var(--radius);`, etc.).
   - Lacks any Lando Norris primitive palette tokens (`--color-paddock`, `--color-chalk`, `--color-signal-lime`, `--color-moss-lime`, `--color-visor-black`, `--color-sage-fog`, `--color-tarmac`, `--color-lichen`, `--color-stone`).
   - Lacks custom radii: `--radius-btn: 8px;`, `--radius-badge: 2.96px;`, `--radius-indicator: 14px;`, `--radius-card: 0px;`.
   - Lacks Lando motion curve: `--ease-lando: cubic-bezier(0.65, 0.05, 0, 1);`, `--duration-lando: 0.75s;`.
3. **Coffee Hardcoding in `@layer base` & Scrollbars** (Lines 146–162, 204–213):
   - `body` background specifies multiple coffee radial/linear gradients:
     `linear-gradient(180deg, color-mix(in srgb, var(--background) 82%, #38251a 18%) 0%, var(--background) 34rem)`
   - `::-webkit-scrollbar-thumb` applies a 4-stop coffee roast gradient:
     `background: linear-gradient(180deg, #cfa071 0%, #a27651 42%, #4a3221 72%, #9c6b45 100%);`
4. **Heavy Cast Shadows in Glass Utilities** (Lines 229–299):
   - `.glass-card`, `.glass-nav`, `.glass-control` enforce heavy multi-layer box shadows:
     ```css
     box-shadow:
       0 22px 70px color-mix(in srgb, #000 28%, transparent),
       0 0 34px color-mix(in srgb, var(--primary) 10%, transparent),
       inset 0 1px 0 color-mix(in srgb, white 16%, transparent);
     ```
   - `.dark .glass-card` uses `0 24px 90px color-mix(in srgb, #000 64%, transparent)`.
   - Directly violates the Lando Norris "Zero Cast Shadows" rule: *"nothing carries a shadow"*, *"box-shadow: none !important"*.
5. **Over 420 Lines of Coffee Animation CSS** (Lines 382–804):
   - Classes include: `html.coffee-pointer`, `.coffee-cursor`, `.coffee-cursor-cup`, `.coffee-cursor-pour`, `.coffee-cursor-drop`, `.coffee-cursor-steam`, `.coffee-scroll-rail`, `.brew-machine`, `.brew-track`, `.brew-stream`, `.brew-cup`, `.brew-pot`, `.brew-spout-flow`.

### 1.2 Existing Font Loading in `app/layout.tsx`
Direct inspection of `app/layout.tsx` (165 lines) revealed:
1. **Current Font Imports** (Lines 2, 58–68):
   ```typescript
   import { Geist, Geist_Mono } from "next/font/google";
   ...
   const geistSans = Geist({
     subsets: ["latin"],
     variable: "--font-sans",
     display: "swap",
   });

   const geistMono = Geist_Mono({
     subsets: ["latin"],
     variable: "--font-mono",
     display: "swap",
   });
   ```
2. **Current Viewport Theme Color** (Lines 53–56):
   ```typescript
   export const viewport: Viewport = {
     themeColor: "#211711", // Coffee brown
     colorScheme: "dark light",
   };
   ```
3. **HTML Tag Class Injection** (Line 121):
   `className={cn(geistSans.variable, geistMono.variable, "font-sans")}`

### 1.3 `next/font/google` Capability Verification
Direct inspection of `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` and `index.d.ts`:
1. **`Mona_Sans`**:
   - `weights`: `["200", "300", "400", "500", "600", "700", "800", "900", "variable"]`
   - `styles`: `["normal", "italic"]`
   - `axes`: `[{ "tag": "wdth", "min": 75, "max": 125, "defaultValue": 100 }, { "tag": "wght", "min": 200, "max": 900, "defaultValue": 400 }]`
   - `subsets`: `["latin", "latin-ext", "vietnamese"]`
   - Verified TypeScript signature: `axes?: 'wdth'[]`.
   - Exactly matches Lando Norris requirement: Mona Sans narrowed with `"wdth" 93` and `"wght" 660–750`.
2. **`Bodoni_Moda`**:
   - `weights`: `["400", "500", "600", "700", "800", "900", "variable"]`
   - `styles`: `["normal", "italic"]`
   - `axes`: `[{ "tag": "opsz", "min": 6, "max": 96, "defaultValue": 11 }, { "tag": "wght", "min": 400, "max": 900, "defaultValue": 400 }]`
   - `subsets`: `["latin", "latin-ext", "math", "symbols"]`
   - Verified TypeScript signature: `axes?: 'opsz'[]`, `style?: 'normal' | 'italic' | Array<'normal' | 'italic'>`.
   - Exactly matches Lando Norris Brier substitute display serif with optical sizing (`opsz`).

### 1.4 PostCSS & Tailwind CSS v4 Processing Test
An automated compilation test of the proposed replacement CSS was executed through `@tailwindcss/postcss` (version 4.3.3) and `postcss`:
- Result: **Compilation succeeded with 0 errors**.
- Output size: 105,679 bytes.
- Generated utility classes: `.bg-paddock`, `.bg-signal-lime`, `.text-moss-lime`, `.border-tarmac`, `.chamfer-card`, `.footer-tab`, `.lime-halo-glow`, and font variations.

---

## 2. Logic Chain

1. **Premise 1**: The user and project specifications require the complete elimination of the coffee theme and the full adoption of the Lando Norris design system (`ORIGINAL_REQUEST.md`, `PROJECT.md`).
2. **Observation 1.1**: `app/globals.css` currently defines coffee brown colors, coffee scrollbar gradients, heavy drop shadows, and 420+ lines of coffee animations.
3. **Deduction 1**: Purging lines 9–78, 146–162, 204–213, and 382–804 from `app/globals.css` immediately removes all coffee styling artifacts from the codebase.
4. **Observation 1.1 & 1.4**: Tailwind CSS v4 utilizes pure CSS `@theme inline` blocks to synthesize utility classes from custom CSS properties.
5. **Deduction 2**: Defining the 9 Lando Norris colors (`paddock-olive`, `chalk-cream`, `signal-lime`, `moss-lime`, `visor-black`, `sage-fog`, `tarmac-gray`, `lichen-gray`, `stone-gray`) both in `:root` and in `@theme inline` exposes utility classes (e.g., `bg-paddock`, `text-chalk`, `bg-signal-lime`, `text-moss-lime`, `border-tarmac`) natively without a JavaScript config file.
6. **Premise 2**: The site alternates between Paddock Olive dark ground, Chalk Cream light ground, and Visor Black product void.
7. **Deduction 3**: Defining semantic surface tokens on `:root` (dark default), `[data-surface="light"]` (cream canvas, dark olive text), and `[data-surface="void"]` (visor black canvas, cream text) enables automatic, declarative surface switching across sections via standard Tailwind tokens (`bg-background text-foreground border-border`).
8. **Observation 1.1 (Item 4)**: The style reference mandates: *"nothing carries a shadow"*, *"box-shadow: none !important"*.
9. **Deduction 4**: Implementing `*, *::before, *::after { box-shadow: none !important; text-shadow: none !important; }` and stripping `box-shadow` declarations from `.glass-card`, `.glass-nav`, and `.glass-control` enforces complete elevation flatness across all existing and newly authored components.
10. **Observation 1.2 & 1.3**: `app/layout.tsx` imports `Geist` and `Geist_Mono`, while `next/font/google` natively provides `Mona_Sans` with `axes: ["wdth"]` and `Bodoni_Moda` with `axes: ["opsz"]`.
11. **Deduction 5**: In `app/layout.tsx`, replacing `Geist` with `Mona_Sans` (`variable: "--font-sans"`, `axes: ["wdth"]`) and `Bodoni_Moda` (`variable: "--font-serif"`, `axes: ["opsz"]`, `style: ["normal", "italic"]`) configures the exact typography pairing mandated by the design spec with zero runtime network delay and optimal variable font rendering.

---

## 3. Caveats

1. **Pre-existing Build Failure in `ProjectCarousel.tsx`**: As noted in the survey, `npm run build` fails because `components/ProjectPresentation.module.css` is missing. Worker 1 or Worker 2 will need to ensure this missing CSS module is created or its dangling import is cleaned so `npm run build` succeeds.
2. **Next.js Security Notice**: Next.js 16.4.0 emits an advisory regarding a security update. In accordance with read-only rules, no package version changes are made in this milestone.
3. **Browser Fallback for Variable Font Axes**: Browsers that do not support variable font axes (`"wdth" 93`) will fall back to standard width sans-serif smoothly.

---

## 4. Conclusion & Actionable Worker Specifications

### 4.1 Specification for `app/globals.css`
Worker 2 must replace the contents of `app/globals.css` with the following comprehensive, tested stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant data-open (&:is([data-state="open"], [data-open]:not([data-open="false"])));
@custom-variant data-closed (&:is([data-state="closed"], [data-closed]:not([data-closed="false"])));
@custom-variant data-active (&:is([data-state="active"], [data-active]:not([data-active="false"])));
@custom-variant dark (&:is(.dark *));

:root {
  /* ==========================================================================
     Lando Norris Primitive Color Palette
     ========================================================================== */
  --paddock-olive: #282c20;
  --chalk-cream: #f4f4ed;
  --signal-lime: #d2ff00;
  --moss-lime: #b2c73a;
  --visor-black: #111112;
  --sage-fog: #dde1d2;
  --tarmac-gray: #535450;
  --lichen-gray: #b4b8a5;
  --stone-gray: #b9bbad;

  /* ==========================================================================
     Default Semantic UI Tokens (Dark Ground Canvas: Paddock Olive)
     ========================================================================== */
  --surface: var(--paddock-olive);
  --surface-foreground: var(--chalk-cream);
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
  --destructive: #fb7185;
  --border: var(--tarmac-gray);
  --input: var(--tarmac-gray);
  --ring: var(--signal-lime);
  --radius: 8px;

  /* Navigation & Chrome */
  --sidebar: var(--paddock-olive);
  --sidebar-foreground: var(--chalk-cream);
  --sidebar-primary: var(--signal-lime);
  --sidebar-primary-foreground: var(--paddock-olive);
  --sidebar-accent: var(--moss-lime);
  --sidebar-accent-foreground: var(--paddock-olive);
  --sidebar-border: var(--tarmac-gray);
  --sidebar-ring: var(--signal-lime);
}

/* ============================================================================
   Semantic Surface Overrides: Light Ground (Chalk Cream Sections)
   ============================================================================ */
[data-surface="light"],
.surface-light {
  --surface: var(--chalk-cream);
  --surface-foreground: var(--paddock-olive);
  --background: var(--chalk-cream);
  --foreground: var(--paddock-olive);
  --card: var(--chalk-cream);
  --card-foreground: var(--paddock-olive);
  --popover: var(--chalk-cream);
  --popover-foreground: var(--paddock-olive);
  --primary: var(--signal-lime);
  --primary-foreground: var(--paddock-olive);
  --secondary: var(--moss-lime);
  --secondary-foreground: var(--paddock-olive);
  --muted: #e6e6dc;
  --muted-foreground: var(--tarmac-gray);
  --border: rgba(40, 44, 32, 0.18);
  --input: rgba(40, 44, 32, 0.22);
  --ring: var(--signal-lime);
}

/* ============================================================================
   Semantic Surface Overrides: Void Ground (Visor Black Showcase / Product Sections)
   ============================================================================ */
[data-surface="void"],
.surface-void {
  --surface: var(--visor-black);
  --surface-foreground: var(--chalk-cream);
  --background: var(--visor-black);
  --foreground: var(--chalk-cream);
  --card: var(--visor-black);
  --card-foreground: var(--chalk-cream);
  --popover: var(--visor-black);
  --popover-foreground: var(--chalk-cream);
  --primary: var(--signal-lime);
  --primary-foreground: var(--paddock-olive);
  --secondary: var(--moss-lime);
  --secondary-foreground: var(--paddock-olive);
  --muted: #1c1c1e;
  --muted-foreground: var(--stone-gray);
  --border: var(--tarmac-gray);
  --input: var(--tarmac-gray);
  --ring: var(--signal-lime);
}

/* Dark class synchronization */
.dark {
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
}

/* ============================================================================
   Tailwind CSS v4 Inline Theme Definitions
   ============================================================================ */
@theme inline {
  /* Lando Norris Colors (both short and verbose aliases) */
  --color-paddock: var(--paddock-olive);
  --color-paddock-olive: var(--paddock-olive);
  --color-chalk: var(--chalk-cream);
  --color-chalk-cream: var(--chalk-cream);
  --color-signal-lime: var(--signal-lime);
  --color-moss-lime: var(--moss-lime);
  --color-visor-black: var(--visor-black);
  --color-sage-fog: var(--sage-fog);
  --color-tarmac: var(--tarmac-gray);
  --color-tarmac-gray: var(--tarmac-gray);
  --color-lichen: var(--lichen-gray);
  --color-lichen-gray: var(--lichen-gray);
  --color-stone: var(--stone-gray);
  --color-stone-gray: var(--stone-gray);

  /* Semantic UI Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Font Families */
  --font-sans: var(--font-sans), system-ui, -apple-system, sans-serif;
  --font-serif: var(--font-serif), Georgia, serif;
  --font-display: var(--font-serif), Georgia, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Lando Precise Radii */
  --radius-btn: 8px;
  --radius-nav: 8px;
  --radius-badge: 2.96px;
  --radius-indicator: 14px;
  --radius-card: 0px;

  /* Derived Radii */
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: calc(var(--radius) * 0.75);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.5);
  --radius-2xl: calc(var(--radius) * 2);

  /* Motion Curves */
  --ease-lando: cubic-bezier(0.65, 0.05, 0, 1);
  --duration-lando: 0.75s;
}

/* ============================================================================
   Base Layer & Typography
   ============================================================================ */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--tarmac-gray) var(--paddock-olive);
  }

  body {
    @apply bg-background text-foreground;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: var(--font-sans), sans-serif;
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  img,
  svg {
    display: block;
  }

  [id] {
    scroll-margin-top: 6rem;
  }
}

/* ============================================================================
   ZERO CAST SHADOWS (Lando Norris Elevation Mandate)
   ============================================================================ */
*,
*::before,
*::after {
  box-shadow: none !important;
  text-shadow: none !important;
}

/* Highlighter Ink Selection */
::selection {
  background: var(--signal-lime);
  color: var(--paddock-olive);
}

/* Precise Minimal Scrollbars */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--paddock-olive);
}

::-webkit-scrollbar-thumb {
  background: var(--tarmac-gray);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--lichen-gray);
}

/* ============================================================================
   Glassmorphism Flat Redefinition (Zero Cast Shadows, 1px Tarmac Border)
   ============================================================================ */
.glass-card,
.glass-nav,
.glass-control {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 90%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.glass-control {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 90%, transparent);
}

.dark .glass-card,
.dark .glass-nav,
.dark .glass-control {
  border-color: var(--border);
  background: color-mix(in srgb, var(--card) 90%, transparent);
}

/* ============================================================================
   Ambient Ground (Clean Neutral Base)
   ============================================================================ */
.ambient-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: var(--background);
}

.ambient-vignette {
  z-index: 1;
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    rgba(210, 255, 0, 0.03),
    transparent 70%
  );
}

.ambient-grain {
  z-index: 2;
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background: repeating-linear-gradient(
    0deg,
    var(--foreground) 0 1px,
    transparent 1px 3px
  );
  mix-blend-mode: overlay;
}

.page-shell {
  position: relative;
  z-index: 2;
}

/* ============================================================================
   Chamfer Notch & Elevation Utilities
   ============================================================================ */
/* 1. Chamfered Corner Card (Bottom-Right Notch for Helmet / Showcase Cards) */
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

/* 3. Lime Halo Glow (Radial Glow rising behind Inset Footer Panel) */
.lime-halo-glow {
  background: radial-gradient(
    circle at 50% -190%,
    rgba(210, 255, 0, 0) 68%,
    rgb(210, 255, 0) 83%
  );
}

/* ============================================================================
   OpenType Mona Sans & Bodoni Moda Variation Presets
   ============================================================================ */
.font-statement {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 660;
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -0.01em;
}

.font-title {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 750;
  text-transform: uppercase;
  line-height: 0.89;
  letter-spacing: -0.03em;
}

.font-serif-accent {
  font-family: var(--font-serif), Georgia, serif;
  color: var(--moss-lime);
  font-weight: 700;
  letter-spacing: -0.025em;
}

/* ============================================================================
   Accessibility: Reduced Motion
   ============================================================================ */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

### 4.2 Specification for `app/layout.tsx`
Worker 2 must apply the following exact modifications to `app/layout.tsx`:

#### 1. Update Google Font Import (Line 2)
```typescript
// Replace:
import { Geist, Geist_Mono } from "next/font/google";

// With:
import { Mona_Sans, Bodoni_Moda } from "next/font/google";
```

#### 2. Update Viewport Theme Color (Lines 53–56)
```typescript
// Replace:
export const viewport: Viewport = {
  themeColor: "#211711",
  colorScheme: "dark light",
};

// With:
export const viewport: Viewport = {
  themeColor: "#282c20",
  colorScheme: "dark light",
};
```

#### 3. Update Font Instantiations (Lines 58–68)
```typescript
// Replace:
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// With:
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
```

#### 4. Update Root Layout Class Names (Line 121)
```tsx
// Replace:
<html
  lang="en"
  data-scroll-behavior="smooth"
  suppressHydrationWarning
  className={cn(geistSans.variable, geistMono.variable, "font-sans")}
>

// With:
<html
  lang="en"
  data-scroll-behavior="smooth"
  suppressHydrationWarning
  className={cn(monaSans.variable, bodoniModa.variable, "font-sans")}
>
```

#### 5. Update Body Tag Classes (Line 131)
```tsx
// Replace:
<body className="boot-loader-active min-h-screen bg-background text-foreground antialiased">

// With:
<body className="boot-loader-active min-h-screen bg-background text-foreground antialiased selection:bg-signal-lime selection:text-paddock">
```

---

### 4.3 Summary of Utilities and Presets Provided

| Utility / Token | Value / Definition | Target Usage |
|-----------------|--------------------|--------------|
| `bg-paddock` / `text-paddock` | `#282c20` | Body ground, manifesto canvas, inset footer panel |
| `bg-chalk` / `text-chalk` | `#f4f4ed` | Hero, teaser, store, and social light grounds |
| `bg-signal-lime` | `#d2ff00` | 8px Store & CTA buttons, live toggles, selection |
| `text-moss-lime` | `#b2c73a` | Serif accent words inside dark uppercase statements |
| `bg-visor-black` | `#111112` | Project showcase void cells, helmet grid |
| `text-sage-fog` | `#dde1d2` | Mona Sans uppercase statement words on olive |
| `border-tarmac` | `#535450` | 1px card outlines, contour lines, dividers |
| `text-lichen` | `#b4b8a5` | Caption pills, meta labels, secondary copy |
| `text-stone` | `#b9bbad` | Supporting teaser paragraphs |
| `.chamfer-card` | `polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)` | Project showcase tiles, helmet cards |
| `.footer-tab` | `polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)` | Center raised tab on inset footer panel |
| `.lime-halo-glow` | `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)` | Glowing ground beneath inset footer |
| `*, *::before, *::after` | `box-shadow: none !important; text-shadow: none !important;` | Universal zero-shadow elevation rule |

---

## 5. Verification Method

To independently verify the implementation after Worker 2 applies the changes:

1. **Verify CSS Compilation**:
   Run:
   ```powershell
   node -e "const postcss = require('postcss'); const tailwind = require('@tailwindcss/postcss'); const fs = require('fs'); const css = fs.readFileSync('app/globals.css', 'utf8'); postcss([tailwind()]).process(css, { from: 'app/globals.css' }).then(r => console.log('Tailwind v4 OK. Bytes:', r.css.length)).catch(e => { console.error(e); process.exit(1); });"
   ```
   *Expected outcome*: Outputs `Tailwind v4 OK` with ~100KB+ compiled CSS.
   *Invalidation condition*: Throws a CSS syntax error or unrecognized directive.

2. **Verify Google Font Variable Exports**:
   Run:
   ```powershell
   node -e "const fontData = require('./node_modules/next/dist/compiled/@next/font/dist/google/font-data.json'); if (!fontData['Mona Sans'] || !fontData['Bodoni Moda']) { console.error('Missing fonts'); process.exit(1); } console.log('Fonts Verified:', Object.keys(fontData).filter(f => f.includes('Mona') || f.includes('Bodoni')));"
   ```
   *Expected outcome*: Outputs `Fonts Verified: [ 'Bodoni Moda', 'Bodoni Moda SC', 'Mona Sans' ]`.

3. **Verify Zero Shadows Rule**:
   Run:
   ```powershell
   git grep -n "box-shadow: none !important" app/globals.css
   ```
   *Expected outcome*: Finds the rule at the designated line in `app/globals.css`.

4. **Linter & Type Check**:
   Run:
   ```powershell
   npm run lint
   ```
   *Expected outcome*: `oxlint` passes without token or syntax errors.
