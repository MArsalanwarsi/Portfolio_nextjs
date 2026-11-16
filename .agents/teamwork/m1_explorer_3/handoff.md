# Handoff Report — Explorer 3: Build Errors, Motion Curve & Component Cleanup

- **Agent**: Explorer 3 (Milestone 1 — Foundation & Coffee Purge)
- **State Folder**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m1_explorer_3`
- **Date**: 2026-11-10T15:10:00Z
- **Target Tasks**:
  1. Missing module `components/ProjectPresentation.module.css` (referenced in `components/ProjectCarousel.tsx` & `components/Projects.tsx`)
  2. Impure render call in `components/Footer.tsx` (`new Date().getFullYear()`) and hydration/purity audit
  3. Framer Motion transition curves in `components/PremiumMotion.tsx` (`cubic-bezier(0.65, 0.05, 0, 1)`, `0.75s`)
  4. Color alignment for Paddock Olive `#282c20` across `app/manifest.ts`, `components/ThemeProvider.tsx`, `app/layout.tsx`, and related files

---

## 1. Observation

### 1.1 Turbopack Fatal Build Failure (`ProjectPresentation.module.css`)
Running `npm run build` halts execution with exit code 1. Verbatim compiler output:
```
npm notice run frontend@0.1.0 build
npm notice run next build
▲ Next.js 16.4.0 (Turbopack)
✓ Running next.config.ts took 43ms

  Creating an optimized production build ...
⚠ Your version of Next.js is affected by a known security vulnerability. This command is continuing after the upgrade reminder.

> Build error occurred
Error: Turbopack build failed with 3 errors:
./components/ProjectCarousel.tsx:14:1
Error: Module not found: Can't resolve './ProjectPresentation.module.css'
  12 | import type { Project } from "@/data/portfolio";
  13 | import { cn } from "@/lib/utils";
> 14 | import styles from "./ProjectPresentation.module.css";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

./components/ProjectCarousel.tsx:22:1
Error: Module not found: Can't resolve './ProjectPresentation.module.css'
  20 | import type { Project } from "@/data/portfolio";
  21 | import { cn } from "@/lib/utils";
> 22 | import styles from "./ProjectPresentation.module.css";
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

./components/Projects.tsx:4:1
Error: Module not found: Can't resolve './ProjectPresentation.module.css'
  2 | import SectionHeader from "@/components/SectionHeader";
  3 | import { projectsContent } from "@/data/portfolio";
> 4 | import styles from "./ProjectPresentation.module.css";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

Inspection confirmed that the file `D:\Arsalan\Portfolio_nextjs\components\ProjectPresentation.module.css` does not exist on disk.

#### Complete Inventory of CSS Classes Consumed from `styles`:
Analysis of JSX in `components/Projects.tsx` and `components/ProjectCarousel.tsx` identified exactly 24 class references:

1. **In `components/Projects.tsx`**:
   - `styles.projects`: Line 8 — section element `<section id="projects" data-surface="dark" className={styles.projects}>`
   - `styles.sectionInner`: Line 9 — inner container `<div className={styles.sectionInner}>`

2. **In `components/ProjectCarousel.tsx`**:
   - `styles.carousel`: Line 175 — `<section className={styles.carousel}>`
   - `styles.toolbar`: Line 186 — `<div className={styles.toolbar}>`
   - `styles.workCount`: Line 187 — `<p className={styles.workCount} aria-live="off">`
   - `styles.countDivider`: Line 189 — `<span className={styles.countDivider}>/ ...</span>`
   - `styles.toolbarHint`: Line 190 — `<span className={styles.toolbarHint}>Selected builds · Drag to explore</span>`
   - `styles.control`: Lines 197, 212, 220 — control buttons for pause/play, previous, and next
   - `styles.nextControl`: Line 220 — modifier for next button
   - `styles.deck`: Line 229 — swipe/drag container `<div className={styles.deck}>`
   - `styles.cardPosition`: Line 280 — absolute positioned wrapper for slide offset
   - `styles.projectCard`: Line 287 — main interactive card `<m.button className={cn(styles.projectCard, ...)}>`
   - `styles.projectImage`: Line 315 — image frame `<span className={styles.projectImage}>`
   - `styles.previewImage`: Line 316 — `<Image className={styles.previewImage} ... />`
   - `styles.imageCaption`: Line 317 — `<span className={styles.imageCaption}>`
   - `styles.projectCopy`: Line 319 — right-side text block `<span className={styles.projectCopy}>`
   - `styles.projectCategory`: Line 320 — eyebrow label `<span className={styles.projectCategory}>`
   - `styles.projectTitle`: Line 323 — `<h3 className={styles.projectTitle}>`
   - `styles.projectDescription`: Line 327 — `<span className={styles.projectDescription}>`
   - `styles.techList`: Line 328 — `<span className={styles.techList}>`
   - `styles.tech`: Line 332 — individual tech badge `<span className={styles.tech}>`
   - `styles.openProject`: Line 339 — CTA link container `<span className={styles.openProject}>`
   - `styles.openIcon`: Line 340 — CTA circular arrow icon `<span className={styles.openIcon}>`
   - `styles.pagination`: Line 354 — dot indicator wrapper `<div className={styles.pagination}>`
   - `styles.pageButton`: Line 362 — pagination button `<button className={styles.pageButton}>`
   - `styles.pageIndicator`: Line 369 — indicator bar `<span className={cn(styles.pageIndicator, ...)}>`

---

### 1.2 Oxlint Purity Warning in `components/Footer.tsx`
Running `npm run lint` (`oxlint --deny-warnings`) halts execution with exit code 1. Verbatim output:
```
  ! react(purity): Cannot call impure function during render
    ,-[components/Footer.tsx:40:18]
 39 |         <div className={styles.footerBottom}>
 40 |           <p>© {new Date().getFullYear()} {siteConfig.name}</p>
    :                 ^^^^^|^^^^
    :                      `-- Cannot call impure function
 41 |           <p>Designed with intent. Built with Next.js.</p>
    `----
  help: `Date` is an impure function. Calling an impure function can produce unstable results that update unpredictably when the component re-renders
  note: React Compiler skipped optimizing this component or hook. Additional guidance: https://react.dev/reference/eslint-plugin-react-hooks/lints/purity

Found 1 warning and 0 errors.
```

Additional observations in `components/Footer.tsx`:
- Line 9: `<div className={styles.footerTab} aria-hidden="true">AW /</div>` is missing the year token. According to `PROJECT.md` line 34, the tab label must be `AW / 2026`.
- Direct call `new Date().getFullYear()` during render creates non-deterministic output across SSR and client hydration boundaries and disables React Compiler optimizations.

---

### 1.3 Framer Motion Transition Curves in `components/PremiumMotion.tsx`
Direct inspection of `components/PremiumMotion.tsx`:
- Line 14: `const premiumEase = [0.22, 1, 0.36, 1] as const;`
- Line 120: `transition={{ duration: 0.62, ease: premiumEase }}`
- Lines 171, 180 (`Reveal`): durations `0.26s` and `0.7s`
- Lines 250, 258 (`StaggerItem`): durations `0.22s` and `0.58s`
- Lines 304, 313, 317 (`LiftCard`): durations `0.26s`, `0.66s`, and `0.3s`
- Inspection of `components/ProjectMedia.tsx`:
  - Line 18: `const mediaEase = [0.22, 1, 0.36, 1] as const;`
  - Line 108: `transition={{ duration: 0.34, ease: mediaEase }}`

The Lando Norris design specification (`ORIGINAL_REQUEST.md` line 176 and `PROJECT.md` lines 7, 21) mandates:
- Easing curve: `cubic-bezier(0.65, 0.05, 0, 1)`
- Duration: `0.75s` across reveals, wipes, transforms, and card transitions.

---

### 1.4 Theme Alignment with `#282c20` (Paddock Olive)
Search across the codebase revealed multiple leftover coffee theme colors:
1. `app/manifest.ts` (lines 11–12):
   ```ts
   background_color: "#17110c",
   theme_color: "#17110c",
   ```
2. `app/layout.tsx` (line 54):
   ```ts
   export const viewport: Viewport = {
     themeColor: "#211711",
     colorScheme: "dark light",
   };
   ```
3. `app/globals.css` (lines 12 & 47):
   `:root` has `--background: #211711;` and `.dark` has `--background: #130e0a;`.
4. `app/opengraph-image.tsx` (line 13):
   `linear-gradient(135deg, #17110c 0%, #2b1e15 55%, #49301f 100%)` with `#d3a472` and `#ddcebc` text.
5. `components/ProjectMedia.tsx` (line 104):
   `bg-[#17110c] ... shadow-2xl`

---

## 2. Logic Chain

1. **Premise**: Turbopack cannot complete `next build` if any imported CSS module does not exist on disk.
2. **Observation 1.1**: `components/ProjectCarousel.tsx` and `components/Projects.tsx` import `./ProjectPresentation.module.css`, which is absent.
3. **Deduction 1**: Creating `components/ProjectPresentation.module.css` defining the 24 consumed classes styled according to the Lando Norris Visor Black `#111112` and Tarmac Gray `#535450` spec immediately resolves the fatal build error without requiring destructive changes to `ProjectCarousel.tsx`.
4. **Observation 1.2**: `oxlint --deny-warnings` treats any warning as an error. `components/Footer.tsx:40` calls `new Date()` inside render, triggering `react(purity)`.
5. **Deduction 2**: Extracting `const CURRENT_YEAR = 2026;` to module scope eliminates render impurity, prevents hydration divergence, enables React Compiler memoization, and ensures `oxlint` passes with 0 warnings.
6. **Observation 1.3**: `components/PremiumMotion.tsx` wraps the entire application (`app/page.tsx:19`) with `<MotionConfig transition={{ duration: 0.62, ease: premiumEase }}>`, where `premiumEase` is `[0.22, 1, 0.36, 1]`.
7. **Deduction 3**: Replacing `premiumEase` with exported `landoEase = [0.65, 0.05, 0, 1] as const` and setting duration to `0.75s` in `MotionConfig` globally propagates the Lando Norris athletic timing curve to all motion primitives across the site.
8. **Observation 1.4**: Mobile browsers, PWAs, and native status bars inspect `app/manifest.ts` and `app/layout.tsx` viewport `themeColor`.
9. **Deduction 4**: Updating `app/manifest.ts` and `app/layout.tsx` to `#282c20` aligns all native OS surfaces with Paddock Olive body canvas.

---

## 3. Caveats

1. **Turbopack Cache Invalidation**: After adding `components/ProjectPresentation.module.css`, run `rm -rf .next` or ensure Next.js cleans `.next/cache` if stale compilation traces persist.
2. **Next.js Security Notice**: Next.js 16.4.0 emits an advisory banner during `next build` recommending `next upgrade --agent=security`. This is an informational CLI message and does not fail the build if all compilation errors are resolved.
3. **Card Chamfer on Mobile**: On mobile viewports (< 768px), `projectCard` switches from a 2-column grid to a single column. The chamfer clip-path is preserved cleanly at 18px.
4. **Theme Toggle in Light Mode**: While `defaultTheme="dark"` renders Paddock Olive `#282c20`, Chalk Cream `#f4f4ed` light sections use `data-surface="light"` and `.light` tokens.

---

## 4. Conclusion & Actionable Implementation Plan

### 4.1 Solution for Task 1: Create `components/ProjectPresentation.module.css`
Provide the file `components/ProjectPresentation.module.css` with exact Lando Norris aesthetic (Visor Black `#111112`, 1px Tarmac Gray `#535450` borders, Signal Lime `#d2ff00` buttons, Moss Lime `#b2c73a` accents, zero shadows, chamfer notch):

```css
/* Lando Norris Project Presentation Styles */
.projects {
  position: relative;
  background-color: var(--visor-black, #111112);
  color: var(--chalk-cream, #f4f4ed);
  padding: 88.89px 4vw;
  width: 100%;
}

.sectionInner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.carousel {
  position: relative;
  width: 100%;
  margin-top: 36px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.workCount {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--font-mono, monospace);
  font-size: 15px;
  font-weight: 700;
  color: var(--chalk-cream, #f4f4ed);
}

.countDivider {
  color: var(--tarmac-gray, #535450);
}

.toolbarHint {
  margin-left: 14px;
  font-family: var(--font-sans, sans-serif);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--lichen-gray, #b4b8a5);
  text-transform: uppercase;
}

.control {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid var(--tarmac-gray, #535450);
  background: var(--paddock-olive, #282c20);
  color: var(--chalk-cream, #f4f4ed);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.65, 0.05, 0, 1);
}

.control:hover {
  background: var(--signal-lime, #d2ff00);
  color: var(--paddock-olive, #282c20);
  border-color: var(--signal-lime, #d2ff00);
}

.nextControl {
  margin-left: 2px;
}

.deck {
  position: relative;
  height: 460px;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
}

.cardPosition {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.projectCard {
  position: relative;
  width: 100%;
  max-width: 880px;
  height: 430px;
  background: var(--visor-black, #111112);
  border: 1px solid var(--tarmac-gray, #535450);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: inherit;
  box-shadow: none !important;
}

.projectImage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #18191a;
}

.previewImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.75s cubic-bezier(0.65, 0.05, 0, 1);
}

.projectCard:hover .previewImage {
  transform: scale(1.03);
}

.imageCaption {
  position: absolute;
  bottom: 14px;
  left: 14px;
  font-family: var(--font-sans, sans-serif);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--chalk-cream, #f4f4ed);
  background: rgba(17, 17, 18, 0.88);
  padding: 4px 10px;
  border: 1px solid var(--tarmac-gray, #535450);
}

.projectCopy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 28px;
  background: var(--visor-black, #111112);
}

.projectCategory {
  font-family: var(--font-sans, sans-serif);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--moss-lime, #b2c73a);
  font-weight: 700;
}

.projectCategory span {
  color: var(--tarmac-gray, #535450);
  margin-left: 6px;
}

.projectTitle {
  font-family: var(--font-sans, sans-serif);
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 750;
  letter-spacing: -0.04em;
  color: var(--chalk-cream, #f4f4ed);
  text-transform: uppercase;
  line-height: 1.1;
  margin: 10px 0;
}

.projectDescription {
  font-family: var(--font-sans, sans-serif);
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--stone-gray, #b9bbad);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.techList {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.tech {
  font-family: var(--font-sans, sans-serif);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border: 1px solid var(--tarmac-gray, #535450);
  color: var(--lichen-gray, #b4b8a5);
  background: rgba(83, 84, 80, 0.18);
  border-radius: 2.96px;
}

.openProject {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans, sans-serif);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--signal-lime, #d2ff00);
  margin-top: auto;
}

.openIcon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: var(--signal-lime, #d2ff00);
  color: var(--paddock-olive, #282c20);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 28px;
}

.pageButton {
  background: transparent;
  border: 0;
  padding: 6px;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.pageIndicator {
  height: 4px;
  border-radius: 2px;
  transition: all 0.75s cubic-bezier(0.65, 0.05, 0, 1);
}

@media (max-width: 768px) {
  .deck {
    height: 520px;
  }
  .projectCard {
    grid-template-columns: 1fr;
    height: auto;
    max-height: 500px;
  }
  .projectImage {
    height: 200px;
  }
  .projectCopy {
    padding: 20px;
  }
  .toolbarHint {
    display: none;
  }
}
```

---

### 4.2 Solution for Task 2: Purity and Hydration Fix in `components/Footer.tsx`
In `components/Footer.tsx`:
1. Define `const CURRENT_YEAR = 2026;` outside the component function.
2. Update line 9 to render `AW / {CURRENT_YEAR}`.
3. Update line 40 to render `© {CURRENT_YEAR} {siteConfig.name}`.

```tsx
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { navLinks, siteConfig } from "@/data/portfolio";
import styles from "./Chrome.module.css";

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className={styles.footerGround} data-surface="dark">
      <div className={styles.footerPanel}>
        <div className={styles.footerTab} aria-hidden="true">AW / {CURRENT_YEAR}</div>
        <div className={styles.footerTop}>
          <p className={styles.micro}>Next up / your idea</p>
          <a href="#home" className={styles.backTop}>Back to top <ArrowUp size={17} aria-hidden="true" /></a>
        </div>
        <div className={styles.footerStatement}>
          <h2>Have something<br />in <em>mind?</em></h2>
          <a href={`mailto:${siteConfig.email}`} className={styles.footerCta}>Let’s build it <ArrowUpRight size={22} aria-hidden="true" /></a>
        </div>
        <div className={styles.footerColumns}>
          <div className={styles.footerIdentity}>
            <a href="#home" className={styles.wordmark} aria-label={`${siteConfig.name}, home`}><span>Arsalan</span><strong>WARSI</strong></a>
            <p>{siteConfig.role}<br />{siteConfig.location}</p>
          </div>
          <div className={styles.footerLinkGroup}>
            <h3>Explore</h3>
            {navLinks.filter(link => ["#about", "#experience", "#projects", "#contact"].includes(link.href)).map(link => <a href={link.href} key={link.href}>{link.label}</a>)}
          </div>
          <div className={styles.footerLinkGroup}>
            <h3>Elsewhere</h3>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className={`${styles.footerLinkGroup} ${styles.footerContact}`}>
            <h3>Say hello</h3>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            {siteConfig.phone && <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {CURRENT_YEAR} {siteConfig.name}</p>
          <p>Designed with intent. Built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

### 4.3 Solution for Task 3: Framer Motion Curves in `components/PremiumMotion.tsx`
In `components/PremiumMotion.tsx`:
1. Export `landoEase = [0.65, 0.05, 0, 1] as const`.
2. Export `landoTransition = { duration: 0.75, ease: landoEase } as const`.
3. Provide `premiumEase = landoEase` as alias for backward compatibility.
4. Set `MotionConfig` transition to `{ duration: 0.75, ease: landoEase }`.
5. Standardize transitions in `Reveal`, `StaggerItem`, and `LiftCard` to `landoEase` and `0.75s`.
6. In `components/ProjectMedia.tsx`, update `mediaEase = [0.65, 0.05, 0, 1] as const` and `duration: 0.75`.

Key patch snippet for `components/PremiumMotion.tsx`:
```tsx
export const landoEase = [0.65, 0.05, 0, 1] as const;
export const landoTransition = {
  duration: 0.75,
  ease: landoEase,
} as const;

export const premiumEase = landoEase;
const instantTransition = { duration: 0.01 };

// ...

export default function PremiumMotion({ children }: PremiumMotionProps) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.75, ease: landoEase }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

---

### 4.4 Solution for Task 4: `#282c20` Alignment
Update the following files:

1. **`app/manifest.ts`**:
   ```ts
   export default function manifest(): MetadataRoute.Manifest {
     return {
       name: siteConfig.name,
       short_name: siteConfig.shortName,
       description: seo.description,
       start_url: "/",
       display: "standalone",
       background_color: "#282c20",
       theme_color: "#282c20",
       icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
     };
   }
   ```

2. **`app/layout.tsx`**:
   ```ts
   export const viewport: Viewport = {
     themeColor: "#282c20",
     colorScheme: "dark light",
   };
   ```

3. **`app/globals.css`**:
   Ensure `--background: var(--paddock-olive);` (`#282c20`) is set for `:root` and `.dark`.

4. **`app/opengraph-image.tsx`**:
   Replace coffee linear gradient `#17110c`/`#2b1e15`/`#49301f` with `#282c20` / `#111112` and typography colors `#d2ff00` (Signal Lime) and `#f4f4ed` (Chalk Cream).

5. **`components/ProjectMedia.tsx`**:
   Replace `bg-[#17110c]` with `bg-[#111112]` (Visor Black) and remove `shadow-2xl`.

---

## 5. Verification Method

### 5.1 Verification Commands
1. **Linter Verification**:
   ```powershell
   npm run lint
   ```
   *Expected Result*: Exits 0 with `Found 0 warnings and 0 errors.`
2. **Build Verification**:
   ```powershell
   npm run build
   ```
   *Expected Result*: Turbopack compiles successfully without missing module errors (`ProjectPresentation.module.css`).
3. **Motion Inspection**:
   Search across `components/` to verify all motion constants use `[0.65, 0.05, 0, 1]`:
   ```powershell
   Select-String -Path "components\*.tsx" -Pattern "as const"
   ```
4. **Color Search**:
   Verify no coffee hexes (`#17110c`, `#211711`, `#130e0a`) remain in active app/component files:
   ```powershell
   Select-String -Path "app\*.tsx", "app\*.ts", "components\*.tsx" -Pattern "#17110c", "#211711", "#130e0a"
   ```
