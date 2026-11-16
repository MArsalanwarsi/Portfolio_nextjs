# Handoff Report: Milestone 1 — Foundation & Coffee Purge Architecture

**Explorer**: Explorer 1 (`m1_explorer_1`)  
**Date**: 2026-11-10T15:10:00Z  
**Target Project**: `D:\Arsalan\Portfolio_nextjs`  
**Recipient**: Milestone 1 Worker (`suborch_m1`)  

---

## 1. Observation

Direct file inspection, AST exploration, and build executions yielded the following exact factual observations:

### A. Coffee Files & Assets Slated for Complete Removal
The repository contains 14 files across 4 directories whose sole function is the coffee theme:

| Path | Lines / Size | Direct Role / Export |
|---|---|---|
| `components/CoffeeCursor.tsx` | 111 lines | Interactive coffee cup cursor portaled to body, adds `coffee-pointer` class to `<html>` |
| `components/DeferredCoffeeCursor.tsx` | 41 lines | `dynamic(() => import("@/components/CoffeeCursor"))` deferred via `requestIdleCallback` |
| `components/CoffeeScrollRail.tsx` | 224 lines | Fixed scroll rail with animated coffee machine pot, stream, falling beans, ceramic cup, and steam |
| `components/DotField.tsx` | 151 lines | `export default function CoffeeBeanField()` rendering 8 rotated canvas coffee beans at 24fps |
| `components/DotField.module.css` | 17 lines | Stylesheet used only by `DotField.tsx` (`.container`, `.canvas`, `.glow`) |
| `components/LoadingScreen.tsx` | 72 lines | Video modal loading espresso pour with `"Brewing something good…"` text |
| `components/LoadingScreen.module.css` | 67 lines | Stylesheet used only by `LoadingScreen.tsx` with coffee brown backgrounds (`#21170d`, `#3c2618`) |
| `components/BootLoader.tsx` | 87 lines | Client component managing 18s timer and rendering `<LoadingScreen />` |
| `public/coffee-mark.svg` | 672 bytes | Unreferenced vector graphic of coffee cup and brown tones |
| `public/loader/coffee-cinema.mp4` | 466,594 bytes | 3D video of espresso pouring into cup |
| `public/loader/coffee-poster.webp` | 20,702 bytes | Thumbnail for espresso video |
| `assets/loader/coffee-cinema.blend` | 197,560 bytes | Blender 5.2 3D scene source |
| `assets/loader/create_scene.py` | 6,840 bytes | Python script generating lathe espresso surface, pour nozzle stream, and droplets |
| `assets/loader/README.md` | 759 bytes | Documentation of coffee blender loader |

### B. Call Sites and Detachment Points
Cross-codebase search identified the exact files where coffee components are attached:

1. **`app/page.tsx`**:
   - Line 1: `import CoffeeScrollRail from "@/components/CoffeeScrollRail";`
   - Line 6: `import DeferredCoffeeCursor from "@/components/DeferredCoffeeCursor";`
   - Line 21: `<DeferredCoffeeCursor />`
   - Line 22: `<CoffeeScrollRail />`
2. **`app/layout.tsx`**:
   - Line 4: `import BootLoader from "@/components/BootLoader";`
   - Line 54: `themeColor: "#211711",`
   - Line 131: `<body className="boot-loader-active min-h-screen bg-background text-foreground antialiased">`
   - Lines 138–144: `<noscript>` block styling `.boot-loader-active` and `.boot-loader`
   - Line 145: `<BootLoader />`
3. **`components/AnimatedBackground.tsx`**:
   - Line 1: `import DotField from "@/components/DotField";`
   - Line 6: `<DotField />`
4. **`app/manifest.ts`**:
   - Line 11: `background_color: "#17110c"`
   - Line 12: `theme_color: "#17110c"`
5. **`app/opengraph-image.tsx`**:
   - Lines 12–13: `background: "linear-gradient(135deg, #17110c 0%, #2b1e15 55%, #49301f 100%)"`
   - Line 25: `color: "#d3a472"`
   - Line 47: `color: "#ddcebc"`
6. **`README.md`**:
   - Lines 38–42: Section `## Coffee theme and verification` detailing espresso surfaces, `CoffeeCursor`, `CoffeeScrollRail`, and bean field.

### C. Exact CSS Selectors in `app/globals.css`
Line-by-line inspection of `app/globals.css` (804 total lines) established:
1. **Lines 9–78**: Coffee theme tokens in `:root` and `.dark` (`--background: #211711`, `--foreground: #fff5e9`, `--card: #2a1d15`, `--primary: #bb895b`, `--secondary: #38271b`, `--accent: #4a3221`, etc.).
2. **Lines 146–162**: `body` background radial-gradients blending `#38251a`, `--primary` (caramel), and `--accent-foreground`.
3. **Lines 183–185**: `body.boot-loader-active { overflow: hidden; }`.
4. **Lines 201–213**: `::-webkit-scrollbar-thumb` espresso-to-caramel gradient (`#cfa071 0%, #a27651 42%, #4a3221 72%, #9c6b45 100%`).
5. **Lines 229–300**: `.glass-card, .glass-nav, .glass-control` casting heavy drop shadows (`0 22px 70px color-mix(in srgb, #000 28%, transparent)`), violating the Lando Norris 0-shadow rule.
6. **Lines 301–357**: `.ambient-background` and `.ambient-vignette` using coffee gradients (`#24180f`, `#130e0a`, `#0d0906`, `rgba(15, 10, 6, 0.82)`, `rgba(200, 151, 104, 0.1)`, `rgba(137, 96, 63, 0.14)`).
7. **Lines 383–457**: Coffee cursor styling and animations:
   - `html.coffee-pointer`, `html.coffee-pointer * { cursor: none !important; }`
   - `.coffee-cursor`, `.coffee-cursor > svg`, `.coffee-cursor-cup`, `.coffee-cursor-pour`, `.coffee-cursor-drop`, `.coffee-cursor-steam`
   - `.coffee-cursor[data-pouring="true"] ...`
   - `@keyframes coffee-steam`, `@keyframes coffee-pour`, `@keyframes coffee-drop`
8. **Lines 459–483**: Second coffee scrollbar override block (`scrollbar-color: #b8895e #1b120b`, `#100b07, #342316`, `#dfb98d, #9b6943...`).
9. **Lines 484–804**: Full Coffee Scroll Rail & Brewing Animation system:
   - Selectors: `.coffee-scroll-rail`, `.brew-machine`, `.brew-track`, `.brew-stream`, `.brew-bean`, `.brew-cup`, `.brew-pot`, `.brew-cup-liquid`, `.brew-steam`, `.brew-spout-flow`.
   - Keyframes: `@keyframes brew-drip`, `@keyframes brew-steam`, `@keyframes brew-spout`.
   - **Crucial Body Margin Disruption**: The scroll rail injected asymmetric body padding rules:
     * Line 585: `body { padding-right: 44px; }`
     * Line 675: `body { padding-right: 64px; }`
     * Line 731: `body { padding-right: 46px; }`
     * Line 746: `body { padding-right: 0; }`
     * Line 796: `body { padding-right: 30px; }`
     Purging lines 383–804 removes all 422 lines of coffee cursor, rail, brewing, and body padding overrides completely.

### D. Build Blocker Discovered
Executing `npm run build` directly revealed Turbopack failures caused by a missing CSS module:
```text
Error: Turbopack build failed with 3 errors:
./components/ProjectCarousel.tsx:14:1
Error: Module not found: Can't resolve './ProjectPresentation.module.css'
./components/ProjectCarousel.tsx:22:1
Error: Module not found: Can't resolve './ProjectPresentation.module.css'
./components/Projects.tsx:4:1
Error: Module not found: Can't resolve './ProjectPresentation.module.css'
```
Scanning `components/Projects.tsx` and `components/ProjectCarousel.tsx` identified 25 unique class names needed:
`projects`, `sectionInner`, `carousel`, `toolbar`, `workCount`, `countDivider`, `toolbarHint`, `control`, `nextControl`, `deck`, `cardPosition`, `projectCard`, `projectImage`, `previewImage`, `imageCaption`, `projectCopy`, `projectCategory`, `projectTitle`, `projectDescription`, `techList`, `tech`, `openProject`, `openIcon`, `pagination`, `pageButton`, `pageIndicator`.

### E. Font Availability Verification
Checking Next.js font registry in `next/dist/compiled/@next/font/dist/google/font-data.json` confirmed:
- `Mona Sans`: available, variable axes `wdth` (min: 75, max: 125, default: 100) and `wght` (min: 200, max: 900, default: 400).
- `Bodoni Moda`: available, variable axes `opsz` (min: 6, max: 96, default: 11) and `wght` (min: 400, max: 900, default: 400).
Both can be loaded directly from `next/font/google`.

---

## 2. Logic Chain

```
[Observation 1: 14 coffee files/assets isolated in components/, public/, and assets/]
   │
   ▼
(Step 1: Deleting these files will not affect any non-coffee business logic, but requires detaching their imports)
   │
[Observation 2: app/page.tsx imports CoffeeScrollRail and DeferredCoffeeCursor]
   │
   ▼
(Step 2: Remove lines 1, 6, 21, 22 in app/page.tsx. Leaves clean Navbar, main shell, and Footer)
   │
[Observation 3: app/layout.tsx imports BootLoader and applies boot-loader-active to <body>]
   │
   ▼
(Step 3: Remove BootLoader import and JSX from app/layout.tsx; strip boot-loader-active class from body to allow immediate clean first paint)
   │
[Observation 4: DotField.tsx is imported by components/AnimatedBackground.tsx to render 1600 canvas coffee beans]
   │
   ▼
(Step 4: Create components/ContourBackground.tsx implementing non-scaling SVG contour lines for dark/light grounds; replace <DotField /> in AnimatedBackground.tsx)
   │
[Observation 5: globals.css lines 383–804 contain coffee cursor, brewing rail, and body padding-right: 44px/64px/46px/30px]
   │
   ▼
(Step 5: Truncating lines 383–804 removes all coffee animations and eliminates the right-hand layout skew)
   │
[Observation 6: globals.css root tokens use espresso #211711 and caramel #bb895b, with drop-shadows on glass cards]
   │
   ▼
(Step 6: Replace root tokens with Lando Norris palette: Paddock Olive #282c20, Chalk Cream #f4f4ed, Signal Lime #d2ff00, Moss Lime #b2c73a, Visor Black #111112; enforce box-shadow: none !important)
   │
[Observation 7: Turbopack fails next build due to missing ProjectPresentation.module.css]
   │
   ▼
(Step 7: Scaffold components/ProjectPresentation.module.css with all 25 classes styled in Lando Norris aesthetic (Visor Black, 1px Tarmac Gray border, Signal Lime hover, 0 shadows) to achieve a zero-error build)
```

---

## 3. Caveats

1. **Next.js Turbopack Security Advisory**:
   `next build` emits an advisory recommending upgrading Next.js due to a known upstream CVE. Turbopack allows builds to proceed once build errors (like the missing CSS module) are resolved. The advisory should be highlighted to the user at the conclusion of the workflow per guidelines.
2. **Missing CSS Module Must Precede Build Verification**:
   Running `npm run build` will fail until `components/ProjectPresentation.module.css` is written. The worker must create this file during Milestone 1 rather than deferring it to Milestone 3.
3. **Pure Date Call in `Footer.tsx`**:
   `components/Footer.tsx` line 40 uses `new Date().getFullYear()`. Replacing this with a static `2026` ensures server/client render stability.

---

## 4. Conclusion & Actionable Execution Guide for M1 Worker

### Step 1: Files to Delete
Execute filesystem deletions:
```powershell
Remove-Item -Force "components/CoffeeCursor.tsx"
Remove-Item -Force "components/DeferredCoffeeCursor.tsx"
Remove-Item -Force "components/CoffeeScrollRail.tsx"
Remove-Item -Force "components/DotField.tsx"
Remove-Item -Force "components/DotField.module.css"
Remove-Item -Force "components/LoadingScreen.tsx"
Remove-Item -Force "components/LoadingScreen.module.css"
Remove-Item -Force "components/BootLoader.tsx"
Remove-Item -Force "public/coffee-mark.svg"
Remove-Item -Force "public/loader/coffee-cinema.mp4"
Remove-Item -Force "public/loader/coffee-poster.webp"
Remove-Item -Force -Recurse "public/loader"
Remove-Item -Force -Recurse "assets/loader"
```

### Step 2: Detachment Diffs

#### 1. `app/page.tsx`
```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -1,7 +1,6 @@
-import CoffeeScrollRail from "@/components/CoffeeScrollRail";
 import About from "@/components/About";
 import AnimatedBackground from "@/components/AnimatedBackground";
 import Certificates from "@/components/Certificates";
 import Contact from "@/components/Contact";
-import DeferredCoffeeCursor from "@/components/DeferredCoffeeCursor";
 import Education from "@/components/Education";
@@ -18,4 +17,2 @@
     <PremiumMotion>
       <AnimatedBackground />
-      <DeferredCoffeeCursor />
-      <CoffeeScrollRail />
       <Navbar />
```

#### 2. `app/layout.tsx`
```diff
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@ -2,3 +2,3 @@
-import { Geist, Geist_Mono } from "next/font/google";
+import { Mona_Sans, Bodoni_Moda } from "next/font/google";
 import Script from "next/script";
-import BootLoader from "@/components/BootLoader";
@@ -53,3 +53,3 @@
 export const viewport: Viewport = {
-  themeColor: "#211711",
+  themeColor: "#282c20",
   colorScheme: "dark light",
 };
@@ -58,11 +58,13 @@
-const geistSans = Geist({
+const monaSans = Mona_Sans({
   subsets: ["latin"],
   variable: "--font-sans",
   display: "swap",
+  axes: ["wdth"],
 });
 
-const geistMono = Geist_Mono({
+const bodoniModa = Bodoni_Moda({
   subsets: ["latin"],
-  variable: "--font-mono",
+  variable: "--font-serif",
   display: "swap",
+  axes: ["opsz"],
 });
@@ -121,1 +123,1 @@
-      className={cn(geistSans.variable, geistMono.variable, "font-sans")}
+      className={cn(monaSans.variable, bodoniModa.variable, "font-sans")}
@@ -131,17 +133,3 @@
-      <body className="boot-loader-active min-h-screen bg-background text-foreground antialiased">
+      <body className="min-h-screen bg-background text-foreground antialiased">
         <ThemeProvider
           attribute="class"
           defaultTheme="dark"
           enableSystem={false}
           disableTransitionOnChange
         >
-          <noscript>
-            <style>{`
-              body.boot-loader-active { overflow: auto !important; }
-              .boot-loader { display: none !important; }
-              .page-shell [style] { opacity: 1 !important; transform: none !important; }
-            `}</style>
-          </noscript>
-          <BootLoader />
           {children}
         </ThemeProvider>
```

#### 3. `components/AnimatedBackground.tsx`
```diff
--- a/components/AnimatedBackground.tsx
+++ b/components/AnimatedBackground.tsx
@@ -1,7 +1,7 @@
-import DotField from "@/components/DotField";
+import ContourBackground from "@/components/ContourBackground";
 export default function AnimatedBackground() {
   return (
-    <div className="ambient-background" aria-hidden="true">
+    <div className="ambient-background pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
       <div className="ambient-vignette" />
-      <DotField />
+      <ContourBackground surface="dark" />
       <div className="ambient-grain" />
     </div>
   );
 }
```

#### 4. `app/manifest.ts`
```diff
--- a/app/manifest.ts
+++ b/app/manifest.ts
@@ -11,2 +11,2 @@
-    background_color: "#17110c",
-    theme_color: "#17110c",
+    background_color: "#282c20",
+    theme_color: "#282c20",
```

#### 5. `app/opengraph-image.tsx`
```diff
--- a/app/opengraph-image.tsx
+++ b/app/opengraph-image.tsx
@@ -13,1 +13,1 @@
-          "linear-gradient(135deg, #17110c 0%, #2b1e15 55%, #49301f 100%)",
+          "linear-gradient(135deg, #282c20 0%, #1c2016 55%, #111112 100%)",
@@ -25,1 +25,1 @@
-          color: "#d3a472",
+          color: "#d2ff00",
@@ -47,1 +47,1 @@
-          color: "#ddcebc",
+          color: "#f4f4ed",
```

#### 6. `components/Footer.tsx`
```diff
--- a/components/Footer.tsx
+++ b/components/Footer.tsx
@@ -40,1 +40,1 @@
-          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
+          <p>© 2026 {siteConfig.name}</p>
```

#### 7. `README.md`
Remove lines 38–42 (`## Coffee theme and verification`).

---

### Step 3: `components/ContourBackground.tsx` Implementation Blueprint
Create `components/ContourBackground.tsx` as a high-performance SVG topographic contour system:

```tsx
interface ContourBackgroundProps {
  surface?: "dark" | "light";
  className?: string;
}

export default function ContourBackground({
  surface = "dark",
  className = "",
}: ContourBackgroundProps) {
  const strokeColor =
    surface === "dark"
      ? "rgba(83, 84, 80, 0.28)" // Tarmac Gray on Paddock Olive
      : "rgba(40, 44, 32, 0.12)"; // Paddock Olive on Chalk Cream

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke={strokeColor} strokeWidth="1" vectorEffect="non-scaling-stroke">
          {/* Topographic Contour Ridge 1 */}
          <path d="M-100 120 C 220 80, 480 260, 820 180 C 1140 100, 1380 320, 1560 280" />
          <path d="M-100 180 C 240 140, 500 320, 840 240 C 1160 160, 1400 380, 1560 340" />
          <path d="M-100 240 C 260 200, 520 380, 860 300 C 1180 220, 1420 440, 1560 400" />
          <path d="M-100 300 C 280 260, 540 440, 880 360 C 1200 280, 1440 500, 1560 460" />

          {/* Topographic Concentric Elevation Loop - Summit Alpha */}
          <path d="M 280 620 C 240 540, 340 460, 460 480 C 580 500, 640 600, 560 690 C 480 770, 320 700, 280 620 Z" />
          <path d="M 320 620 C 290 565, 360 510, 450 520 C 540 535, 590 605, 530 665 C 470 720, 350 675, 320 620 Z" />
          <path d="M 360 620 C 340 585, 390 550, 450 555 C 505 565, 540 610, 500 645 C 460 680, 380 650, 360 620 Z" />
          <path d="M 400 620 C 390 600, 420 580, 450 585 C 480 590, 495 615, 475 630 C 455 645, 410 635, 400 620 Z" />

          {/* Topographic Basin & Ridges - South East Area */}
          <path d="M 780 880 C 880 720, 1080 700, 1260 760 C 1380 800, 1480 750, 1560 710" />
          <path d="M 740 920 C 850 770, 1060 750, 1240 810 C 1360 850, 1460 800, 1560 760" />
          <path d="M 700 960 C 820 820, 1040 800, 1220 860 C 1340 900, 1440 850, 1560 810" />

          {/* High Elevation Loop - North East Spur */}
          <path d="M 1020 180 C 960 120, 1040 40, 1180 50 C 1300 60, 1380 140, 1310 220 C 1240 290, 1070 240, 1020 180 Z" />
          <path d="M 1060 175 C 1020 135, 1080 75, 1180 85 C 1265 95, 1320 150, 1270 205 C 1215 255, 1095 215, 1060 175 Z" />
        </g>
      </svg>
    </div>
  );
}
```

---

### Step 4: `app/globals.css` Overhaul Blueprint
The worker should replace the coffee styles with the clean Lando Norris Tailwind v4 token system:

1. **Delete Lines 383–804 completely**.
2. **Define Lando Norris Theme Tokens in `:root` and `.dark`**:
```css
:root {
  --paddock-olive: #282c20;
  --chalk-cream: #f4f4ed;
  --signal-lime: #d2ff00;
  --moss-lime: #b2c73a;
  --visor-black: #111112;
  --sage-fog: #dde1d2;
  --tarmac-gray: #535450;
  --lichen-gray: #b4b8a5;
  --stone-gray: #b9bbad;

  --font-body: var(--font-sans);
  --font-display: var(--font-sans);

  --background: #282c20;
  --foreground: #f4f4ed;
  --card: #111112;
  --card-foreground: #f4f4ed;
  --popover: #111112;
  --popover-foreground: #f4f4ed;
  --primary: #d2ff00;
  --primary-foreground: #282c20;
  --secondary: #535450;
  --secondary-foreground: #f4f4ed;
  --muted: #535450;
  --muted-foreground: #b4b8a5;
  --accent: #b2c73a;
  --accent-foreground: #282c20;
  --border: #535450;
  --input: #535450;
  --ring: #d2ff00;
  --radius: 8px;
}
```
3. **Configure Tailwind v4 `@theme inline`**:
```css
@theme inline {
  --color-paddock-olive: var(--paddock-olive);
  --color-chalk-cream: var(--chalk-cream);
  --color-signal-lime: var(--signal-lime);
  --color-moss-lime: var(--moss-lime);
  --color-visor-black: var(--visor-black);
  --color-sage-fog: var(--sage-fog);
  --color-tarmac-gray: var(--tarmac-gray);
  --color-lichen-gray: var(--lichen-gray);
  --color-stone-gray: var(--stone-gray);

  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-heading: var(--font-sans);
}
```
4. **Zero-Shadow Enforcement & Chamfer Geometry**:
```css
*, *::before, *::after {
  box-shadow: none !important;
  text-shadow: none !important;
}

.chamfer-card {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);
}

.footer-tab {
  clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
}

.lime-halo-glow {
  background: radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%);
}
```
5. **Update `.ambient-background`**:
Replace lines 301–357 with Paddock Olive ground:
```css
.ambient-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background-color: var(--paddock-olive);
}

.ambient-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 60%, rgba(17, 17, 18, 0.45) 100%);
}

.ambient-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: repeating-linear-gradient(
    0deg,
    rgba(244, 244, 237, 0.03) 0 1px,
    transparent 1px 3px
  );
  opacity: 0.04;
  mix-blend-mode: screen;
}
```

---

### Step 5: `components/PremiumMotion.tsx` Easing Update
Update `components/PremiumMotion.tsx` line 14 & line 120:
```ts
export const landoEase = [0.65, 0.05, 0, 1] as const;
```
Configure `MotionConfig`:
```tsx
<MotionConfig
  reducedMotion="user"
  transition={{ duration: 0.75, ease: landoEase }}
>
  {children}
</MotionConfig>
```

---

### Step 6: `components/ProjectPresentation.module.css` (Unblock Build)
Create `components/ProjectPresentation.module.css` with the 25 classes expected by `Projects.tsx` and `ProjectCarousel.tsx`:

```css
.projects {
  position: relative;
  background: #111112;
  color: #f4f4ed;
  padding: 88px 24px;
}

.sectionInner {
  max-width: 1400px;
  margin: 0 auto;
}

.carousel {
  position: relative;
  margin-top: 48px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.workCount {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  color: #d2ff00;
}

.countDivider {
  color: #535450;
  margin-left: 6px;
}

.toolbarHint {
  font-size: 12px;
  color: #b4b8a5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid #535450;
  border-radius: 8px;
  background: transparent;
  color: #f4f4ed;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.control:hover {
  border-color: #d2ff00;
  color: #d2ff00;
}

.nextControl {
  margin-left: 8px;
}

.deck {
  position: relative;
  min-height: 520px;
}

.cardPosition {
  position: relative;
  width: 100%;
}

.projectCard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: #111112;
  border: 1px solid #535450;
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);
  padding: 24px;
  text-align: left;
  width: 100%;
}

@media (max-width: 900px) {
  .projectCard {
    grid-template-columns: 1fr;
  }
}

.projectImage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #282c20;
  overflow: hidden;
}

.previewImage {
  object-fit: cover;
}

.imageCaption {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 9.26px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #dde1d2;
  background: rgba(17, 17, 18, 0.85);
  padding: 4px 8px;
  border: 1px solid #535450;
}

.projectCopy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.projectCategory {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #b4b8a5;
  margin-bottom: 8px;
}

.projectCategory span {
  color: #d2ff00;
}

.projectTitle {
  font-family: var(--font-sans);
  font-size: clamp(24px, 3.5vw, 42px);
  font-weight: 750;
  text-transform: uppercase;
  line-height: 0.95;
  color: #f4f4ed;
  margin: 0 0 16px;
}

.projectDescription {
  font-size: 15px;
  line-height: 1.5;
  color: #b9bbad;
  margin-bottom: 24px;
}

.techList {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.tech {
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid #535450;
  color: #dde1d2;
  background: transparent;
  border-radius: 2.96px;
}

.openProject {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  color: #d2ff00;
  text-decoration: none;
}

.openIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.pageButton {
  width: 32px;
  height: 4px;
  background: #535450;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.pageIndicator {
  background: #d2ff00;
}
```

---

## 5. Verification Method

Once the M1 Worker executes these changes, verify the milestone using the following project test suite and verification commands:

1. **Verify No Coffee / Brew References Remain in Project Source**:
   ```powershell
   Get-ChildItem -Path . -Recurse -File | Where-Object { $_.FullName -notmatch "node_modules|\.git|\.next|\.agents|portfolio\.json" } | Select-String -Pattern "Coffee|coffee|brew|Brew|DotField|BootLoader|LoadingScreen"
   ```
   *Expected result*: Only matches inside documentation/logs (zero matches in `.tsx`, `.ts`, `.css`, or `.svg`).

2. **Verify Deleted Files Do Not Exist**:
   ```powershell
   @(
     "components/CoffeeCursor.tsx",
     "components/DeferredCoffeeCursor.tsx",
     "components/CoffeeScrollRail.tsx",
     "components/DotField.tsx",
     "components/DotField.module.css",
     "components/LoadingScreen.tsx",
     "components/LoadingScreen.module.css",
     "components/BootLoader.tsx",
     "public/coffee-mark.svg",
     "public/loader/coffee-cinema.mp4",
     "public/loader/coffee-poster.webp"
   ) | ForEach-Object { [PSCustomObject]@{ File = $_; Exists = (Test-Path $_) } }
   ```
   *Expected result*: All items return `Exists: False`.

3. **Verify Linter Cleanliness**:
   ```powershell
   npx oxlint
   ```
   *Expected result*: `Found 0 warnings and 0 errors.`

4. **Verify Turbopack Production Build**:
   ```powershell
   npm run build
   ```
   *Expected result*: Build succeeds with zero errors; routes `/`, `/_not-found` compiled cleanly.
