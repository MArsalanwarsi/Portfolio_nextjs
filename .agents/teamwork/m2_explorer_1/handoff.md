# Milestone 2 Technical Investigation & Implementation Plan: Floating Chrome Navigation & Full-Bleed Directory Dialog

**Agent**: `teamwork_explorer` (`m2_explorer_1`)  
**Date**: 2026-11-10T15:46:00Z  
**Parent Sub-Orchestrator**: `14eeed66-406e-4913-973e-90c5eacf0e16`  
**Target Components**: `components/Navbar.tsx`, `components/Chrome.module.css`, `components/MobileNav.tsx`

---

## 1. Observation

### 1.1 Existing `components/Navbar.tsx` & `components/Chrome.module.css`
- **File Location**: `D:\Arsalan\Portfolio_nextjs\components\Navbar.tsx` (108 lines) & `D:\Arsalan\Portfolio_nextjs\components\Chrome.module.css` (105 lines).
- **Current State Architecture**:
  - `Navbar.tsx` lines 9-13:
    ```tsx
    const dialog = useRef<HTMLDialogElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkSurface, setDarkSurface] = useState(false);
    ```
  - Surface detection at `Navbar.tsx` lines 14-34:
    ```tsx
    const section = document
      .elementFromPoint(window.innerWidth / 2, 110)
      ?.closest<HTMLElement>("[data-surface]");
    if (section) setDarkSurface(section.dataset.surface === "dark");
    ```
  - Body scroll lock at `Navbar.tsx` lines 36-43:
    ```tsx
    useEffect(() => {
      if (!menuOpen) return;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }, [menuOpen]);
    ```
  - Native `<dialog>` modal API used at lines 45-53:
    ```tsx
    const openMenu = () => {
      dialog.current?.showModal();
      setMenuOpen(true);
    };
    const closeMenu = () => dialog.current?.close();
    const handleClose = () => {
      setMenuOpen(false);
      trigger.current?.focus({ preventScroll: true });
    };
    ```
- **Discrepancies against Lando Norris Specification**:
  1. **Fixed Layer Inset**:
     - `Chrome.module.css` line 4: `top: 20px; left: 28px; right: 28px;` (desktop) and line 75: `top: 15px; left: 16px; right: 16px;` (mobile).
     - *Spec Requirement*: Exact fixed layer inset `18.52px` (`position: fixed; inset: 18.52px 18.52px auto 18.52px; z-index: 50;`) with zero cast shadow.
  2. **Z-Index**:
     - `Chrome.module.css` line 3: `z-index: 70;`.
     - *Spec Requirement*: `z-index: 50;` (aligning with page layering architecture).
  3. **Menu Toggle Button Contrast & Dimensions**:
     - `Chrome.module.css` line 25: `width: 55px; height: 55px; background: #f4f4ed; color: #282c20;`.
     - *Spec Requirement*: Exactly `55.5px` square. Furthermore, on light sections (`data-surface="light"`), the menu button must be a 1px Paddock Olive (`#282c20`) outline on a **transparent fill**, with Paddock Olive glyph. On dark sections (`data-surface="dark"`), it is filled Chalk Cream (`#f4f4ed`) with Paddock Olive glyph. In current CSS, it retains a solid cream fill in both states.
  4. **Primary CTA Button ("LET'S TALK ↗")**:
     - `Chrome.module.css` line 23: `height: 55px; padding: 0 20px; font-size: 13px; font-weight: 800;`.
     - `Navbar.tsx` line 64: `Let’s talk` (mixed-case with curly apostrophe).
     - *Spec Requirement*: `55.5px` height, Signal Lime (`#d2ff00`) fill, 1px `#d2ff00` border, `8px` radius (`rounded-[8px]`), uppercase Mona Sans 800 text `LET'S TALK ↗` in Paddock Olive (`#282c20`), 1.0 line-height, zero shadow.
  5. **Numbered Directory Navigation Dialog**:
     - `Navbar.tsx` lines 91-99: Iterates over all 8 links in `navLinks` (`Home`, `About`, `Experience`, `Education`, `Skills`, `Projects`, `Certificates`, `Contact`).
     - *Spec Requirement*: Strict 5 curated numbered directory links:
       - `01 // PROJECTS` (`#projects`)
       - `02 // ABOUT` (`#about`)
       - `03 // SKILLS` (`#skills`)
       - `04 // TIMELINE` (`#experience`)
       - `05 // CONTACT` (`#contact`)
       Formatted with the double-slash `//` delimiter and athletic transition `cubic-bezier(0.65, 0.05, 0, 1)`.

### 1.2 Inspection of `components/MobileNav.tsx`
- **File Location**: `D:\Arsalan\Portfolio_nextjs\components\MobileNav.tsx` (179 lines).
- **Direct Observation**:
  - Uses Radix `Sheet` from `@/components/ui/sheet`.
  - Line 81: `shadow-[0_28px_100px_rgba(0,0,0,0.55)]`
  - Line 94: `shadow-[0_0_34px_rgba(200,151,104,0.18)]` (leftover coffee brown token).
  - Line 131: `shadow-[0_14px_34px_rgba(200,151,104,0.24)]` (leftover coffee brown token).
  - Search command `Select-String -Path 'app/**/*.tsx', 'components/**/*.tsx' -Pattern 'MobileNav'` returned **zero matches**.
  - `MobileNav.tsx` is completely orphaned and unreferenced in the application.

### 1.3 Inspection of Surface Attributes Across the Page
- Command `Select-String -Path 'components/**/*.tsx' -Pattern 'data-surface'` revealed that only `Footer.tsx` (`data-surface="dark"`) and `Projects.tsx` (`data-surface="dark"`) currently declare `data-surface`.
- `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Education.tsx`, `Skills.tsx`, and `Contact.tsx` lack `data-surface` declarations, causing `document.elementFromPoint` in `Navbar.tsx` to fail to detect light vs dark transitions accurately.

### 1.4 Test Suite Baseline
- Command: `npm test` runs `node scripts/run-e2e-tests.mjs`.
- Result:
  - `Tier 1 - Feature 4: Floating Chrome Navigation`: **100% PASS** (all 5 assertions passed).
  - `Tier 2 - Feature 4: Chrome Nav Viewport & Interaction Boundaries`: **100% PASS** (all 5 assertions passed).
  - Overall test suite: 16 passed, 2 failed in unrelated areas (F3 shadow utility in `ProjectCarousel.tsx` and T3-COMB-09 in `Hero.tsx`).
- Chrome nav test assertions verify:
  - `hasFixed`: fixed positioning.
  - `hasInset`: `top: 18.52px` or `top: 20px`.
  - `hasZIndex`: `z-index >= 50`.
  - `wordmark`: Arsalan + WARSI with serif style.
  - `monogram`: `aw`.
  - `CTA button`: Signal Lime `#d2ff00`, 8px radius, ~55px height.
  - `menuButton`: 55.5px square with 2 unequal dashes.
  - `overflow`: body scroll locking.

---

## 2. Logic Chain

1. **Geometry Normalization (18.52px Inset & 55.5px Controls)**:
   - *Observation*: The Lando Norris style reference (`ORIGINAL_REQUEST.md`) explicitly specifies:
     > "No bar or fill: a fixed layer inset 18.52px with the stacked LANDO (serif) over NORRIS (heavy sans) SVG wordmark top-left, the LN monogram centred, and a Signal Lime Store button beside a 55.5px square menu button top-right. It sits over every section without a shadow."
   - *Inference*: Updating `Chrome.module.css` from `top: 20px; left: 28px; right: 28px;` to `inset: 18.52px 18.52px auto 18.52px;` and button heights from `55px` to `55.5px` adheres 100% to the exact design spec while remaining fully compliant with `feature4-chrome-nav.test.mjs` (which regex-matches `(?:18\.52px|20px|15px)` and `(?:55px|55\.5px)`).

2. **Dynamic Surface Contrast & Transparency**:
   - *Observation*: The outer navigation container has `pointer-events: none` and a transparent background. However, the menu button toggle must alternate appearance based on the background under it:
     - On dark sections (`#282c20` / `#111112`): filled Chalk Cream (`#f4f4ed`) with Paddock Olive glyph.
     - On light sections (`#f4f4ed`): 1px Paddock Olive (`#282c20`) outline on transparent fill with Paddock Olive glyph.
   - *Inference*: `Navbar.tsx` already has `darkSurface` state. Refactoring `.menuButton` styles in `Chrome.module.css` to conditionally apply `.onDark .menuButton` resolves the contrast requirement without introducing background paint to the navbar root.
   - *Inference*: To ensure `document.elementFromPoint` accurately detects ground switches, sections must have `data-surface="light"` (Hero, Teaser) and `data-surface="dark"` (Manifesto, Projects, Footer).

3. **Orphaned `MobileNav.tsx` Retirement**:
   - *Observation*: `MobileNav.tsx` contains 179 lines of dead code with coffee-colored box shadows (`shadow-[0_0_34px_rgba(200,151,104,0.18)]`) and is unimported.
   - *Observation*: `Navbar.tsx` already contains responsive media queries (`@media (max-width: 600px)`) that adapt the floating chrome and open the full-screen `<dialog>`.
   - *Inference*: Retiring or removing `MobileNav.tsx` cleans up technical debt, removes lingering coffee shadows, and ensures single-source-of-truth navigation across all viewport widths.

4. **Curated 5-Link Directory Structure**:
   - *Observation*: `navLinks` currently has 8 links. The Milestone 2 specification requests:
     > "Full-bleed numbered directory navigation dialog (01 // PROJECTS, 02 // ABOUT, 03 // SKILLS, 04 // TIMELINE, 05 // CONTACT) with athletic transition `cubic-bezier(0.65, 0.05, 0, 1)`."
   - *Inference*: In `Navbar.tsx`, create a dedicated `directoryLinks` array with the 5 curated items, each containing `number`, `label`, `href`, and `//` divider.

5. **Motion and Interaction Curve**:
   - *Observation*: `PROJECT.md` specifies `cubic-bezier(0.65, 0.05, 0, 1)` (0.75s) as the standard athletic easing curve.
   - *Inference*: In `Chrome.module.css`, the keyframe `@keyframes menu-reveal` and all hover transitions (`transform: translateX(8px)`, color changes, SVG arrow opacity) must enforce `transition: all 0.3s cubic-bezier(0.65, 0.05, 0, 1)` and `animation: menu-reveal 0.75s cubic-bezier(0.65, 0.05, 0, 1)`.

---

## 3. Caveats

1. **Native `<dialog>` Exit Animation**:
   - Native HTML `<dialog>` does not natively animate exit before closing when `.close()` is called, unless modern CSS `@starting-style` is used or close is delayed in React by 750ms.
   - In modern evergreen browsers (Chrome 117+, Firefox 125+, Safari 17.4+), `@starting-style` and `transition: display 0.75s allow-discrete, overlay 0.75s allow-discrete, clip-path 0.75s cubic-bezier(0.65, 0.05, 0, 1)` enable smooth closing animations natively. If older browser support is required, a React `isClosing` state timeout can be used.
2. **Read-Only Investigation Scope**:
   - As an explorer agent, no workspace files were edited. The plan below provides drop-in replacements for the worker agent.
3. **Sections Missing `data-surface`**:
   - `Navbar.tsx`'s surface detection relies on `document.elementFromPoint(window.innerWidth / 2, 110)?.closest("[data-surface]")`. Milestone 2 components (`Hero.tsx`, `Manifesto.tsx`) must include `data-surface="light"` and `data-surface="dark"` respectively.

---

## 4. Conclusion & Actionable Technical Plan

### 4.1 Component Interface & Architecture

#### `components/Navbar.tsx` (Refactored Spec)
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import styles from "./Chrome.module.css";

export const directoryLinks = [
  { number: "01", label: "PROJECTS", href: "#projects" },
  { number: "02", label: "ABOUT", href: "#about" },
  { number: "03", label: "SKILLS", href: "#skills" },
  { number: "04", label: "TIMELINE", href: "#experience" },
  { number: "05", label: "CONTACT", href: "#contact" },
] as const;

export default function Navbar() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkSurface, setDarkSurface] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = document
        .elementFromPoint(window.innerWidth / 2, 110)
        ?.closest<HTMLElement>("[data-surface]");
      if (section) {
        setDarkSurface(
          section.dataset.surface === "dark" || section.dataset.surface === "void"
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const openMenu = () => {
    dialog.current?.showModal();
    setMenuOpen(true);
  };

  const closeMenu = () => {
    dialog.current?.close();
  };

  const handleClose = () => {
    setMenuOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* Floating Chrome Navigation Bar */}
      <header
        className={`${styles.chrome} ${darkSurface ? styles.onDark : ""}`}
        aria-label="Site header"
      >
        {/* Top-Left Stacked Wordmark */}
        <a
          href="#home"
          className={styles.wordmark}
          aria-label={`${siteConfig.name}, back to top`}
        >
          <span>Arsalan</span>
          <strong>WARSI</strong>
        </a>

        {/* Center Monogram Badge */}
        <a
          href="#home"
          className={styles.monogram}
          aria-label="Back to top"
        >
          aw<span>↗</span>
        </a>

        {/* Top-Right Action Controls */}
        <div className={styles.navActions}>
          <a
            href="#contact"
            className={styles.talk}
            aria-label="Let's talk, go to contact section"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            ref={trigger}
            type="button"
            className={styles.menuButton}
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-haspopup="dialog"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Full-Bleed Directory Navigation Dialog */}
      <dialog
        ref={dialog}
        id="site-navigation"
        className={styles.menu}
        onClose={handleClose}
        aria-labelledby="menu-title"
        aria-modal="true"
      >
        <div className={styles.menuTop}>
          <a
            href="#home"
            onClick={closeMenu}
            className={styles.wordmark}
            aria-label={`${siteConfig.name}, home`}
          >
            <span>Arsalan</span>
            <strong>WARSI</strong>
          </a>
          <span className={styles.micro}>
            Independent Developer · Karachi, PK
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className={styles.close}
            aria-label="Close navigation menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.menuContent}>
          <div className={styles.menuIntro}>
            <p id="menu-title" className={styles.micro}>
              Directory
            </p>
            <p>
              Good ideas.
              <br />
              <em>Better websites.</em>
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className={styles.menuEmail}
            >
              {siteConfig.email} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <nav className={styles.menuLinks} aria-label="Primary navigation">
            {directoryLinks.map((link) => (
              <a
                href={link.href}
                key={link.number}
                onClick={closeMenu}
                className={styles.directoryLink}
              >
                <span className={styles.dirNumber}>{link.number}</span>
                <span className={styles.dirDivider}>//</span>
                <span className={styles.dirLabel}>{link.label}</span>
                <ArrowUpRight
                  size={26}
                  className={styles.dirArrow}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.menuBottom}>
          <span className={styles.micro}>
            {siteConfig.role} · Aptech Associate
          </span>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View résumé <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </>
  );
}
```

---

### 4.2 Exact CSS Specification: `components/Chrome.module.css`

```css
/* ============================================================================
   Floating Chrome Navigation Layer (Lando Norris Aesthetic)
   ============================================================================ */
.chrome {
  position: fixed;
  inset: 18.52px 18.52px auto 18.52px;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  color: #282c20; /* Paddock Olive default on light ground */
  pointer-events: none;
  box-shadow: none !important;
  transition: color 0.3s cubic-bezier(0.65, 0.05, 0, 1);
}

.chrome a,
.chrome button {
  pointer-events: auto;
}

/* Contrast switch when hovering over dark / void sections */
.onDark {
  color: #f4f4ed; /* Chalk Cream on dark ground */
}

/* ----------------------------------------------------------------------------
   Top-Left Stacked Wordmark
   ---------------------------------------------------------------------------- */
.wordmark {
  display: inline-flex;
  flex-direction: column;
  width: fit-content;
  text-decoration: none;
  color: inherit;
  line-height: 0.83;
  user-select: none;
}

.wordmark span {
  font-family: var(--font-serif), Georgia, serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 0.83;
  color: inherit;
}

.wordmark strong {
  font-family: var(--font-sans), sans-serif;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.07em;
  font-variation-settings: "wdth" 93;
  line-height: 0.83;
  text-transform: uppercase;
  color: inherit;
}

/* ----------------------------------------------------------------------------
   Center Monogram Badge
   ---------------------------------------------------------------------------- */
.monogram {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: inherit;
  font-family: var(--font-sans), sans-serif;
  font-weight: 800;
  font-size: 39px;
  line-height: 1;
  letter-spacing: -0.12em;
  text-decoration: none;
  user-select: none;
  transition: opacity 0.25s ease;
}

.monogram:hover {
  opacity: 0.85;
}

.monogram span {
  margin-top: -3px;
  margin-left: 7px;
  font-size: 20px;
  letter-spacing: 0;
  color: #d2ff00; /* Signal Lime accent */
}

/* ----------------------------------------------------------------------------
   Top-Right Action Controls
   ---------------------------------------------------------------------------- */
.navActions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 9px;
}

/* Signal Lime Store / Talk CTA Button */
.talk {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  height: 55.5px;
  padding: 0 18.52px;
  border: 1px solid #d2ff00;
  border-radius: 8px;
  background: #d2ff00;
  color: #282c20;
  text-decoration: none;
  text-transform: uppercase;
  font-family: var(--font-sans), sans-serif;
  font-size: 14.81px;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1;
  box-shadow: none !important;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.talk:hover {
  background: #e0ff55;
  border-color: #e0ff55;
}

/* Square Menu Toggle Button (55.5px square with 2 unequal dashes) */
.menuButton {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-shrink: 0;
  width: 55.5px;
  height: 55.5px;
  padding: 0;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: none !important;
  transition: background-color 0.25s cubic-bezier(0.65, 0.05, 0, 1),
              border-color 0.25s cubic-bezier(0.65, 0.05, 0, 1),
              color 0.25s cubic-bezier(0.65, 0.05, 0, 1);

  /* Light ground state: 1px Paddock Olive outline on transparent fill */
  background: transparent;
  border: 1px solid #282c20;
  color: #282c20;
}

/* Dark ground state: Chalk Cream fill with Paddock Olive glyph */
.onDark .menuButton {
  background: #f4f4ed;
  border: 1px solid #f4f4ed;
  color: #282c20;
}

.menuButton span {
  height: 2px;
  background: currentColor;
  transition: width 0.25s cubic-bezier(0.65, 0.05, 0, 1),
              margin 0.25s cubic-bezier(0.65, 0.05, 0, 1);
}

.menuButton span:first-child {
  width: 23px;
}

.menuButton span:last-child {
  width: 15px;
  margin-left: 8px;
}

.menuButton:hover span:last-child {
  width: 23px;
  margin-left: 0;
}

.chrome :focus-visible,
.menu :focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

/* ----------------------------------------------------------------------------
   Full-Bleed Numbered Directory Navigation Dialog
   ---------------------------------------------------------------------------- */
.menu {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  border: 0;
  padding: 24px 4vw;
  color: #f4f4ed;
  background: #282c20; /* Paddock Olive full-bleed canvas */
  box-shadow: none !important;
  overflow-y: auto;
}

.menu::backdrop {
  background: #282c20;
}

.menu[open] {
  display: flex;
  flex-direction: column;
  animation: menu-reveal 0.75s cubic-bezier(0.65, 0.05, 0, 1);
}

@keyframes menu-reveal {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.menuTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.micro {
  font-family: var(--font-sans), sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  line-height: 1.5;
  font-weight: 600;
}

.menuTop > .micro {
  color: #b4b8a5; /* Lichen Gray */
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55.5px;
  height: 55.5px;
  padding: 0;
  border-radius: 8px;
  border: 1px solid #f4f4ed;
  background: transparent;
  color: #f4f4ed;
  cursor: pointer;
  box-shadow: none !important;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.close:hover {
  background: #f4f4ed;
  color: #282c20;
}

.menuContent {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10vw;
  padding: 6vh 0;
}

.menuIntro > p:nth-child(2) {
  margin-top: 28px;
  font-family: var(--font-sans), sans-serif;
  font-size: clamp(40px, 5vw, 80px);
  line-height: 1.02;
  letter-spacing: -0.05em;
  font-weight: 700;
}

.menuIntro em {
  font-family: var(--font-serif), Georgia, serif;
  font-style: italic;
  font-weight: 500;
  color: #b2c73a; /* Moss Lime serif accent */
}

.menuEmail {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 34px;
  font-size: 14px;
  color: #b4b8a5;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.2s ease;
}

.menuEmail:hover {
  color: #d2ff00;
}

/* ----------------------------------------------------------------------------
   Numbered Directory Links
   ---------------------------------------------------------------------------- */
.menuLinks {
  display: flex;
  flex-direction: column;
}

.directoryLink {
  display: grid;
  grid-template-columns: 36px 20px 1fr 32px;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: #f4f4ed;
  text-decoration: none;
  font-family: var(--font-sans), sans-serif;
  font-size: clamp(26px, 3.8vw, 54px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  transition: color 0.25s cubic-bezier(0.65, 0.05, 0, 1),
              transform 0.3s cubic-bezier(0.65, 0.05, 0, 1);
}

.dirNumber {
  color: #b4b8a5; /* Lichen Gray */
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.05em;
  font-weight: 400;
}

.dirDivider {
  color: rgba(180, 184, 165, 0.4);
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  user-select: none;
}

.dirLabel {
  min-width: 0;
}

.dirArrow {
  opacity: 0;
  color: #d2ff00;
  transition: opacity 0.2s cubic-bezier(0.65, 0.05, 0, 1),
              transform 0.2s cubic-bezier(0.65, 0.05, 0, 1);
}

.directoryLink:hover {
  color: #b2c73a; /* Moss Lime on hover */
  transform: translateX(8px);
}

.directoryLink:hover .dirArrow,
.directoryLink:focus-visible .dirArrow {
  opacity: 1;
  transform: translateX(2px);
}

.menuBottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  gap: 20px;
  border-top: 1px solid #535450;
}

.menuBottom > a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #f4f4ed;
  font-size: 12px;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.2s ease;
}

.menuBottom > a:hover {
  color: #d2ff00;
}

/* ----------------------------------------------------------------------------
   Responsive Breakpoints
   ---------------------------------------------------------------------------- */
@media (max-width: 900px) {
  .menuContent {
    gap: 5vw;
  }
}

@media (max-width: 600px) {
  .chrome {
    inset: 16px 16px auto 16px;
    grid-template-columns: 1fr auto;
    gap: 12px;
  }
  .wordmark span {
    font-size: 23px;
  }
  .wordmark strong {
    font-size: 22px;
  }
  .monogram {
    display: none;
  }
  .talk {
    height: 46px;
    padding: 0 13px;
    gap: 10px;
    font-size: 11px;
  }
  .menuButton,
  .close {
    width: 46px;
    height: 46px;
  }
  .menu {
    padding: 18px 24px;
  }
  .menuTop > .micro {
    display: none;
  }
  .menuContent {
    grid-template-columns: 1fr;
    align-content: center;
    gap: 24px;
    padding: 30px 0;
  }
  .menuIntro > p:nth-child(2),
  .menuEmail {
    display: none;
  }
  .directoryLink {
    font-size: clamp(26px, 7vw, 40px);
    padding: 10px 0;
  }
  .dirArrow {
    opacity: 1;
    width: 20px;
  }
  .menuBottom {
    flex-wrap: wrap;
  }
}

@media (max-height: 650px) and (min-width: 601px) {
  .menuContent {
    padding: 20px 0;
  }
  .directoryLink {
    font-size: 26px;
    padding: 6px 0;
  }
  .menuIntro > p:nth-child(2) {
    font-size: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu[open] {
    animation: none;
  }
  .chrome,
  .directoryLink,
  .dirArrow,
  .menuButton,
  .menuButton span {
    transition: none !important;
  }
}
```

---

### 4.3 Actionable Work Breakdown for Milestone 2 Worker
1. **Update `components/Chrome.module.css`**:
   - Replace layout inset with `inset: 18.52px 18.52px auto 18.52px;` and `z-index: 50`.
   - Update control sizes to `55.5px`.
   - Update `.menuButton` light/dark states: transparent + Paddock Olive border on light, filled Chalk Cream on dark.
   - Update directory link styling with 4-column grid: `36px 20px 1fr 32px` to display `number // label arrow`.
2. **Update `components/Navbar.tsx`**:
   - Introduce `directoryLinks` with the 5 curated items (`01 // PROJECTS`, `02 // ABOUT`, `03 // SKILLS`, `04 // TIMELINE`, `05 // CONTACT`).
   - Standardize CTA button text to uppercase `"LET'S TALK"`.
   - Add accessible labels (`aria-label`, `aria-expanded`, `aria-controls`, `aria-modal`).
3. **Deprecate / Remove `components/MobileNav.tsx`**:
   - Delete `components/MobileNav.tsx` or empty it with an export comment.
4. **Ensure `data-surface` declarations on Milestone 2 sections**:
   - `Hero.tsx`: `<section id="home" data-surface="light" ...>`
   - `Manifesto.tsx` / `About.tsx`: `<section id="about" data-surface="dark" ...>`

---

## 5. Verification Method

1. **Opaque-Box E2E Test Suite**:
   Execute the dedicated Chrome Nav feature tests:
   ```powershell
   node --test tests/e2e/tier1-features/feature4-chrome-nav.test.mjs
   node --test tests/e2e/tier2-boundaries/boundary-nav-viewports.test.mjs
   ```
   **Expected Outcome**: 100% pass across all 10 tests:
   - `T1-F4-01`: Inset Fixed Layout Geometry
   - `T1-F4-02`: Stacked Brand Wordmark
   - `T1-F4-03`: Centered Monogram
   - `T1-F4-04`: Signal Lime CTA Button Dimensions & Styling
   - `T1-F4-05`: Square Menu Toggle Button
   - `T2-F4-01`: Mobile Viewport Inset Width Budget (<375px)
   - `T2-F4-02`: Dynamic Theme Reactive Menu State (Dark vs Light Canvas)
   - `T2-F4-03`: Escape Key Closes Mobile Menu & Restores Scroll
   - `T2-F4-04`: Nav Root Layer Fill Must Be Transparent (Zero Solid Slab)
   - `T2-F4-05`: Menu Dash Glyph Length Disparity

2. **Linter Inspection**:
   ```powershell
   npx oxlint
   ```
   **Expected Outcome**: 0 errors.

3. **Production Build Gate**:
   ```powershell
   npm run build
   ```
   **Expected Outcome**: Turbopack compiles successfully with zero type or CSS module errors.

4. **Visual & Interaction Verification Checklist**:
   - On initial load over light hero, chrome text and menu toggle outline are Paddock Olive (`#282c20`).
   - On scrolling over dark manifesto / projects, chrome text turns Chalk Cream (`#f4f4ed`) and menu toggle button fills with Chalk Cream (`#f4f4ed`).
   - Clicking menu button slides open full-bleed directory dialog with athletic curve `cubic-bezier(0.65, 0.05, 0, 1)`.
   - Pressing `Escape` or clicking `X` restores page scroll and returns focus to the menu trigger.
   - Hovering over directory items reveals Moss Lime text, right arrow, and smooth `8px` translation.
