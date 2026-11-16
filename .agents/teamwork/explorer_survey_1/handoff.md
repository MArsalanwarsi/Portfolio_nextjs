# Survey Handoff Report: Coffee Theme Inventory & Component Hierarchy Mapping

**Explorer**: Explorer 1 (Coffee Theme Explorer)  
**Date**: 2026-11-10T14:55:00Z  
**Target Project**: `D:\Arsalan\Portfolio_nextjs`  
**State Folder**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\explorer_survey_1`  

---

## 1. Observation

Direct code examination and search commands revealed the full inventory of coffee-themed components, styling rules, assets, and hierarchy links across the project:

### A. Dedicated Coffee Components & References
1. **`components/CoffeeCursor.tsx`** (Lines 1–111):
   - Implements a custom interactive coffee cup cursor portaled to `document.body` (line 109).
   - Injects `document.documentElement.classList.add("coffee-pointer")` (line 39), which sets `cursor: none !important` via `globals.css` lines 383–385.
   - Contains coffee SVG elements: `.coffee-cursor-steam` (`#efdbbf`, line 63), `.coffee-cursor-cup` (`#382416`, `#efdbbf`, `#0a0603`, lines 71–90), `.coffee-cursor-pour` (`#c89768`, line 95), `.coffee-cursor-drop` (`#c89768`, line 101).
   - Sets `element.dataset.pouring = "true"` and tilts the cup by `-38deg` on hover over clickable controls (lines 27–33).

2. **`components/DeferredCoffeeCursor.tsx`** (Lines 1–41):
   - Dynamically imports `CoffeeCursor` (`const CoffeeCursor = dynamic(() => import("@/components/CoffeeCursor"), { ssr: false });`, line 6).
   - Defers rendering via `requestIdleCallback` (1200ms) or `setTimeout` (800ms) on `(hover: hover) and (pointer: fine)` screens.
   - Imported and rendered in `app/page.tsx` line 6 & line 21.

3. **`components/CoffeeScrollRail.tsx`** (Lines 1–224):
   - Fixed vertical scroll rail (`className="coffee-scroll-rail"`, line 45) that tracks page scroll and updates CSS variable `--brew-progress` (line 16).
   - Features SVG glass coffee pot (`.brew-machine`, `.brew-pot`, lines 47–96) with `<linearGradient id="brew-glass">` and `<linearGradient id="brew-coffee">`.
   - Features dripping stream `<span className="brew-stream" />` (line 171) and ceramic coffee cup `<div className="brew-cup">` with rising liquid level `<rect className="brew-cup-liquid" fill="#251208">` and steam ribbons `.brew-steam` (lines 173–221).
   - Custom draggable track (`role="slider"`, `aria-label="Scroll page — coffee brewing progress"`, line 110).
   - Imported and rendered in `app/page.tsx` line 1 & line 22.

4. **`components/DotField.tsx`** (Lines 1–151):
   - Function declaration: `export default function CoffeeBeanField()` (line 6).
   - Uses an HTML5 canvas to rasterize and float 8 rotating sprites of coffee beans:
     ```ts
     // Lines 34-46
     brush.ellipse(0, 0, 4.5, 6.5, 0, 0, Math.PI * 2);
     brush.fillStyle = "rgba(164, 108, 62, .22)";
     brush.fill();
     brush.strokeStyle = "rgba(216, 170, 116, .2)";
     brush.stroke();
     brush.moveTo(0, -5);
     brush.bezierCurveTo(-3, -2, 3, 2, 0, 5);
     brush.strokeStyle = "rgba(22, 11, 5, .85)";
     ```
   - Imported and rendered inside `components/AnimatedBackground.tsx` line 1 & line 6 (`<DotField />`).

5. **`components/LoadingScreen.tsx` & `LoadingScreen.module.css`** (Lines 1–72 & 1–67):
   - Fullscreen loading dialog with `aria-label="Coffee introduction"` (line 37).
   - HTML5 video loading espresso pour video:
     - `poster="/loader/coffee-poster.webp"` (line 48)
     - `src="/loader/coffee-cinema.mp4"` (line 54)
   - Status text: `<output>Brewing something good…</output>` (line 60).
   - CSS styling in `LoadingScreen.module.css`: coffee background `#21170d` (line 15), text `#f8ebd8` (line 16), button `#3c2618` (line 46), outline `#7c4827` (line 50).
   - Loaded by `components/BootLoader.tsx`, which is rendered in `app/layout.tsx` line 145.

### B. Coffee Assets in Public and Assets Directories
1. **`public/coffee-mark.svg`**: Unreferenced asset containing a coffee cup icon and brown background (`#20160f`, `#8c6341`, `#e5bf94`, `#120c07`, `#cfa071`).
2. **`public/loader/coffee-cinema.mp4`**: 3D espresso pour video rendered from Blender.
3. **`public/loader/coffee-poster.webp`**: Video thumbnail showing espresso pour.
4. **`assets/loader/coffee-cinema.blend`**: Blender 5.2 source scene.
5. **`assets/loader/create_scene.py`**: Python script building lathe espresso surface, pour nozzle stream, espresso droplets, steam ribbons, and steam rim light in Blender.
6. **`assets/loader/README.md`**: Explains coffee cinema loader architecture.
7. **`public/profile-photo.svg`**: Vector portrait using coffee palette `#F4EBDD`, `#E0D1BF`, warm coffee glow `#BA6B42`, `#1A120D`, `#CAB49B`, `#B49574`, `#D8C2A7`.

### C. Stylesheet Coffee Rules (`app/globals.css`)
1. **Root & Dark Coffee Tokens (Lines 9–78)**:
   - Root:
     - `--background: #211711` (dark roast espresso)
     - `--foreground: #fff5e9` (creamy froth)
     - `--card: #2a1d15` (roasted coffee bean)
     - `--primary: #bb895b` (caramel / brewed coffee)
     - `--primary-foreground: #1c120b` (espresso)
     - `--secondary: #38271b` (mocha)
     - `--secondary-foreground: #edd9bd` (latte cream)
     - `--muted: #32231a`
     - `--accent: #4a3221`
     - `--accent-foreground: #dfb98d`
     - `--border: rgba(239, 213, 180, 0.14)`
     - `--ring: #c89768`
   - Dark:
     - `--background: #130e0a`
     - `--card: #20160f`
     - `--primary: #cfa071`
     - `--secondary: #2b1e15`
     - `--accent: #3b291c`
2. **Body & Ambient Backgrounds (Lines 146–163, 301–357)**:
   - Gradients blending `#38251a`, `rgba(200, 151, 104, 0.1)`, `rgba(137, 96, 63, 0.14)`, `#24180f`, `#130e0a`, `#0d0906`, `rgba(15, 10, 6, 0.82)`.
3. **Scrollbar Thumb Coffee Gradient (Lines 204–213, 460–483)**:
   - `linear-gradient(180deg, #cfa071 0%, #a27651 42%, #4a3221 72%, #9c6b45 100%)` and `scrollbar-color: #b8895e #1b120b`.
4. **Coffee Cursor Selectors & Keyframes (Lines 383–456, 594–596)**:
   - `html.coffee-pointer`, `.coffee-cursor`, `.coffee-cursor-cup`, `.coffee-cursor-pour`, `.coffee-cursor-drop`, `.coffee-cursor-steam`, `@keyframes coffee-steam`, `@keyframes coffee-pour`, `@keyframes coffee-drop`.
5. **Coffee Scroll Rail Selectors & Keyframes (Lines 484–575, 588–592, 599–602, 604–804)**:
   - `.coffee-scroll-rail`, `.brew-machine`, `.brew-track`, `.brew-stream`, `.brew-bean`, `.brew-cup`, `.brew-cup-liquid`, `.brew-steam`, `.brew-pot`, `.brew-spout-flow`.
   - `@keyframes brew-drip`, `@keyframes brew-steam`, `@keyframes brew-spout`.
   - Crucial layout offset rules to remove:
     - Line 585: `body { padding-right: 44px; }`
     - Line 675: `body { padding-right: 64px; }`
     - Line 731: `body { padding-right: 46px; }`
     - Line 796: `body { padding-right: 30px; }`
     (These paddings pushed body content leftward to prevent overlap with the coffee rail).
6. **Card Elevation & Frosted Glass (Lines 229–300)**:
   - `.glass-card`, `.glass-nav`, `.glass-control` enforce heavy drop shadows (`0 22px 70px color-mix(in srgb, #000 28%, transparent)`) and blurs (`backdrop-filter: blur(20px)`), conflicting with the Lando Norris 0-shadow specification.

### D. App Layout & Metadata Files
1. **`app/layout.tsx`**:
   - Line 54: `themeColor: "#211711"`
   - Line 145: `<BootLoader />`
2. **`app/manifest.ts`**:
   - Line 11: `background_color: "#17110c"`
   - Line 12: `theme_color: "#17110c"`
3. **`app/opengraph-image.tsx` & `app/twitter-image.tsx`**:
   - Lines 12–13: `background: "linear-gradient(135deg, #17110c 0%, #2b1e15 55%, #49301f 100%)"`
   - Lines 25, 47: `#d3a472`, `#ddcebc`
4. **`README.md`**:
   - Lines 38–42: Section "## Coffee theme and verification".

### E. Discovered Code Anomaly
- In `components/Projects.tsx` (line 4) and `components/ProjectCarousel.tsx` (line 22):
  Both files contain `import styles from "./ProjectPresentation.module.css";`. However, **`components/ProjectPresentation.module.css` does NOT exist in the repository**. This causes potential build failures if not addressed during the rewrite phase.

---

## 2. Logic Chain

```
[Observation: CoffeeCursor, DeferredCoffeeCursor, CoffeeScrollRail, DotField, LoadingScreen, assets/loader/*, public/loader/*]
    │
    ▼ (Inference 1: Coffee theme footprint is split into isolated components, background canvas, loader, and stylesheet)
[Observation: globals.css has 420+ lines (lines 383-804) dedicated exclusively to coffee cursor, brewing rail, and body padding offsets]
    │
    ▼ (Inference 2: Removing coffee rail requires removing body padding-right rules, otherwise the page will have an asymmetric 44-64px right margin)
[Observation: globals.css root tokens define espresso background (#211711, #130e0a) and caramel primary (#bb895b, #cfa071)]
    │
    ▼ (Inference 3: Replacing theme with Lando Norris requires remapping root tokens to Paddock Olive #282c20, Chalk Cream #f4f4ed, Signal Lime #d2ff00, Moss Lime #b2c73a, Visor Black #111112)
[Observation: app/page.tsx renders <DeferredCoffeeCursor /> and <CoffeeScrollRail />]
    │
    ▼ (Inference 4: Deleting CoffeeCursor.tsx, DeferredCoffeeCursor.tsx, and CoffeeScrollRail.tsx will cleanly disconnect all coffee cursor/rail features from the page tree without breaking child components)
[Observation: DotField.tsx is actually CoffeeBeanField drawing rasterized coffee beans on an HTML canvas]
    │
    ▼ (Inference 5: DotField.tsx must be replaced with a topographic contour line generator or clean SVG contour canvas per Lando Norris design spec)
[Observation: LoadingScreen.tsx plays coffee-cinema.mp4 with 'Brewing something good...']
    │
    ▼ (Inference 6: LoadingScreen.tsx & BootLoader.tsx can either be replaced with an athletic assembling helmet / monogram intro or streamlined to eliminate the coffee video)
```

---

## 3. Full Component Hierarchy Mapping

The complete hierarchy of the application was mapped by tracing imports from `app/layout.tsx` down to primitive components:

```text
RootLayout (app/layout.tsx)
├── Metadata & JSON-LD Script (Schema: Person, WebSite, ProfilePage)
└── <body> (className="boot-loader-active ...")
    ├── ThemeProvider (components/ThemeProvider.tsx [next-themes])
    │   ├── <noscript> style fallback
    │   ├── BootLoader (components/BootLoader.tsx)
    │   │   └── LoadingScreen (components/LoadingScreen.tsx)
    │   │       ├── <dialog> (.loader)
    │   │       ├── <video> (/loader/coffee-cinema.mp4, poster /loader/coffee-poster.webp)
    │   │       └── <div className={styles.footer}>
    │   │           ├── <output> "Brewing something good…"
    │   │           └── <button> "Skip intro ↗"
    │   │
    │   └── Home (app/page.tsx)
    │       └── PremiumMotion (components/PremiumMotion.tsx [LazyMotion, MotionConfig])
    │           ├── AnimatedBackground (components/AnimatedBackground.tsx)
    │           │   ├── <div className="ambient-background">
    │           │   ├── <div className="ambient-vignette">
    │           │   ├── DotField (components/DotField.tsx [CoffeeBeanField canvas])
    │           │   └── <div className="ambient-grain">
    │           │
    │           ├── DeferredCoffeeCursor (components/DeferredCoffeeCursor.tsx) [TO REMOVE]
    │           │   └── CoffeeCursor (components/CoffeeCursor.tsx -> createPortal) [TO REMOVE]
    │           │
    │           ├── CoffeeScrollRail (components/CoffeeScrollRail.tsx) [TO REMOVE]
    │           │   ├── <svg className="brew-machine"> (brew-pot, brew-spout-flow)
    │           │   ├── <div className="brew-track"> (<span className="brew-stream" />)
    │           │   └── <div className="brew-cup"> (<svg>: brew-steam, brew-cup-liquid)
    │           │
    │           ├── Navbar (components/Navbar.tsx)
    │           │   ├── <header className={styles.chrome}>
    │           │   │   ├── <a className={styles.wordmark}> ("Arsalan WARSI")
    │           │   │   ├── <a className={styles.monogram}> ("aw↗")
    │           │   │   └── <div className={styles.navActions}>
    │           │   │       ├── <a className={styles.talk}> ("Let's talk ↗")
    │           │   │       └── <button className={styles.menuButton}> (two-dash toggle)
    │           │   └── <dialog id="site-navigation" className={styles.menu}>
    │           │       ├── <div className={styles.menuTop}>
    │           │       ├── <div className={styles.menuContent}>
    │           │       │   ├── <div className={styles.menuIntro}>
    │           │       │   └── <nav className={styles.menuLinks}> (navLinks mapping)
    │           │       └── <div className={styles.menuBottom}>
    │           │
    │           ├── <main className="page-shell">
    │           │   ├── Hero (components/Hero.tsx)
    │           │   │   ├── Reveal, Stagger, StaggerItem (PremiumMotion)
    │           │   │   ├── Badge, Button (components/ui)
    │           │   │   ├── LiftCard -> Card -> CardContent (components/ui/card)
    │           │   │   └── ProfilePortrait (components/ProfilePortrait.tsx)
    │           │   │
    │           │   ├── About (components/About.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   ├── LiftCard -> Card (Intro badge, headline, description)
    │           │   │   └── LiftCard -> Card (4 Highlights grid: Code2, Layers, Palette, Zap)
    │           │   │
    │           │   ├── Experience (components/Experience.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   └── LiftCard -> Timeline Articles -> Card -> Badge (experience items)
    │           │   │
    │           │   ├── Education (components/Education.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   └── LiftCard -> Card -> Badge (degree, institution, results)
    │           │   │
    │           │   ├── Skills (components/Skills.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   ├── Stagger -> StaggerItem (stack highlights)
    │           │   │   └── LiftCard -> Card -> Badge (Frontend, Backend, Database, Tools)
    │           │   │
    │           │   ├── Projects (components/Projects.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   └── ProjectCarousel (components/ProjectCarousel.tsx)
    │           │   │       ├── Toolbar (<p className={styles.workCount}>, controls)
    │           │   │       ├── Deck (stacked m.button project cards with Image)
    │           │   │       │   └── ProjectMedia (components/ProjectMedia.tsx -> fullscreen modal)
    │           │   │       └── Pagination controls
    │           │   │
    │           │   ├── Certificates (components/Certificates.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   └── LiftCard -> Card -> Badge (certificate items)
    │           │   │
    │           │   ├── Stats (components/Stats.tsx)
    │           │   │   ├── SectionHeader (components/SectionHeader.tsx)
    │           │   │   └── LiftCard -> Card (Metric value + label cards)
    │           │   │
    │           │   └── Contact (components/Contact.tsx)
    │           │       ├── SectionHeader (components/SectionHeader.tsx)
    │           │       ├── LiftCard -> Card (Availability card)
    │           │       ├── LiftCard -> Card -> ContactForm (components/ContactForm.tsx)
    │           │       └── Contact Links Grid (GitHub, LinkedIn, Website, Email, Phone, Resume)
    │           │
    │           └── Footer (components/Footer.tsx)
    │               └── <footer className={styles.footerGround} data-surface="dark">
    │                   └── <div className={styles.footerPanel}>
    │                       ├── <div className={styles.footerTab}> ("AW /")
    │                       ├── <div className={styles.footerTop}>
    │                       ├── <div className={styles.footerStatement}> ("Have something in mind? / Let's build it")
    │                       ├── <div className={styles.footerColumns}>
    │                       └── <div className={styles.footerBottom}>
    │
    └── Google Analytics Script (lazyOnload)
```

### Unused / Orphan Components
- `components/ThemeToggle.tsx` (not imported anywhere)
- `components/MobileNav.tsx` (not imported anywhere)
- `components/ui/navigation-menu.tsx` (not imported anywhere)
- `components/ui/avatar.tsx` (only imported by unused `MobileNav.tsx`)
- `components/ui/sheet.tsx` (only imported by unused `MobileNav.tsx`)

---

## 4. Caveats

1. **Missing Module CSS**: `components/Projects.tsx` and `components/ProjectCarousel.tsx` currently import `./ProjectPresentation.module.css` which does not exist on disk. Any implementer agent must create this file or replace the import with inline Tailwind classes or a valid module.
2. **Read-Only Investigation**: No source files were modified during this survey. All findings reflect the exact state on disk.
3. **Data Content**: `data/portfolio.json` contains no coffee references. It contains legitimate profile data (projects, experiences, skills) with project preview gradients that can be retained or mapped to the new palette.

---

## 5. Conclusion & Actionable Replacement Plan

To completely eradicate the coffee theme and prepare for the Lando Norris design system, the downstream agents should execute the following scoped actions:

| Action Category | Target Files | Specific Operation |
|---|---|---|
| **Direct Deletion** | `components/CoffeeCursor.tsx`<br>`components/DeferredCoffeeCursor.tsx`<br>`components/CoffeeScrollRail.tsx`<br>`public/coffee-mark.svg`<br>`public/loader/coffee-cinema.mp4`<br>`public/loader/coffee-poster.webp`<br>`assets/loader/` (entire directory) | Delete files from filesystem. |
| **Component Detachment** | `app/page.tsx` | Remove `import CoffeeScrollRail` and `import DeferredCoffeeCursor`; remove `<DeferredCoffeeCursor />` and `<CoffeeScrollRail />` JSX tags. |
| **Canvas Replacement** | `components/DotField.tsx`<br>`components/AnimatedBackground.tsx` | Replace `CoffeeBeanField` canvas particles with fine topographic contour lines SVG/Canvas overlay on Paddock Olive / Chalk Cream grounds. |
| **Loader Overhaul** | `components/LoadingScreen.tsx`<br>`components/LoadingScreen.module.css`<br>`components/BootLoader.tsx` | Remove espresso video & "Brewing something good..." text; replace with race-suit / topographic wireframe loader or streamlined reveal. |
| **Stylesheet Purge** | `app/globals.css` | Delete lines 383–804 (coffee cursor, scroll rail, brewing animations, body padding offsets); replace root tokens with Lando Norris palette; remove `.glass-card` box shadows; set button/card border radiuses to 8px/0px. |
| **Metadata & OG Image** | `app/layout.tsx`<br>`app/manifest.ts`<br>`app/opengraph-image.tsx`<br>`README.md` | Update `themeColor` to `#282c20`, manifest background to `#282c20`, OG image gradient to Olive/Lime, and remove coffee verification docs in README. |
| **Missing CSS Fix** | `components/ProjectPresentation.module.css` | Create the missing module stylesheet for `ProjectCarousel` and `Projects` styled per Lando Norris cards (Visor Black, 1px Tarmac Gray border, 0px radius, chamfered notches). |

---

## 6. Verification Method

To verify these findings independently:
1. Search coffee references:
   ```powershell
   Get-ChildItem -Path "D:\Arsalan\Portfolio_nextjs" -Recurse -File | Where-Object { $_.FullName -notmatch "node_modules|\.git|\.next|\.agents" } | Select-String -Pattern "coffee|brew|bean"
   ```
2. Check missing CSS module:
   ```powershell
   Test-Path "D:\Arsalan\Portfolio_nextjs\components\ProjectPresentation.module.css"
   # Output: False
   ```
3. Inspect `globals.css` lines 383–804 to observe all `.coffee-cursor`, `.coffee-scroll-rail`, and `.brew-*` definitions.
4. Verify `DotField.tsx` lines 6 & 34–46 for the `CoffeeBeanField` and canvas bean rendering.
