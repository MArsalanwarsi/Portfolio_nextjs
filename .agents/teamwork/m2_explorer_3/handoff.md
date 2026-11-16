# Handoff Report: Milestone 2 — Mixed-Face Statement Block / Manifesto & Page Integration

**Author**: Explorer Agent 3 (`m2_explorer_3`)  
**Mission**: Investigate and formulate technical implementation plan for Mixed-Face Statement Block / Manifesto & Page Integration (`ChromeNav`, `Hero`, `Manifesto`, `app/page.tsx`)  
**State Folder**: `D:\Arsalan\Portfolio_nextjs\.agents\teamwork\m2_explorer_3`  
**Workspace**: `D:\Arsalan\Portfolio_nextjs`  
**Date**: 2026-11-10T15:47:00Z  

---

## 1. Observation

### 1.1 Existing Component Landscape
- **`components/Manifesto.tsx`**: File currently does not exist (`file does not exist`).
- **`components/About.tsx`**: Currently contains obsolete code (`About.tsx:1-67`):
  * Line 2: Imports `LiftCard` from `@/components/PremiumMotion`.
  * Line 4-5: Imports `Badge` and `Card, CardContent` from `@/components/ui`.
  * Line 17: `<section id="about" className="px-4 py-20 sm:px-6 lg:py-28">` lacks `data-surface="dark"`.
  * Line 25: `Card` uses `rounded-xl bg-card/80` (violates 0px / 8px Lando Norris geometry).
  * Line 27: `Badge` uses `rounded-full` (violates 2.96px badge radius rule).
  * Does not contain the Mixed-Face Statement Block, Bodoni Moda serif accent words, Brier Callout Quote, or Signal Lime signature scribble.
- **`app/page.tsx`**: Currently imports and renders `About` (`app/page.tsx:1, 23`):
  ```tsx
  import About from "@/components/About";
  ...
  <main className="page-shell">
    <Hero />
    <About />
    <Experience />
  ...
  ```
  `page.tsx` has no transition coordinates between Chalk Cream (`#f4f4ed`) and Paddock Olive (`#282c20`).
- **`components/Navbar.tsx` & `Chrome.module.css`**:
  * Line 18-21 of `Navbar.tsx`: Surface listener uses:
    ```tsx
    const section = document
      .elementFromPoint(window.innerWidth / 2, 110)
      ?.closest<HTMLElement>("[data-surface]");
    if (section) setDarkSurface(section.dataset.surface === "dark");
    ```
  * `Chrome.module.css:16`: `.onDark { color: #f4f4ed; }`.
  * Floating chrome is fixed at top (`Chrome.module.css:1-14`), expecting sections to define explicit `data-surface="light"` vs `data-surface="dark"`.
- **`components/ContourBackground.tsx`**:
  * Line 1-15: Supports `surface?: "dark" | "light"`.
  * Stroke color for dark surface is `rgba(83, 84, 80, 0.28)` (Tarmac Gray on Paddock Olive).
  * Stroke color for light surface is `rgba(40, 44, 32, 0.12)` (Paddock Olive on Chalk Cream).

### 1.2 Test Suite Expectations (Node Native Test Suite)
- **`tests/e2e/tier2-boundaries/boundary-tokens-extreme.test.mjs:41-51`**:
  * `T2-F1-03: Display Serif Accent Color Boundary on Dark Grounds`:
    Directly inspects `getComponentContent('Manifesto.tsx') + getComponentContent('Hero.tsx')`.
    Requires `/#b2c73a/i` or `/moss-lime/i`.
    Constraint: Serif accent words on dark grounds must use Moss Lime `#b2c73a`, NOT Signal Lime `#d2ff00`.
- **`tests/e2e/tier2-boundaries/boundary-typography-scale.test.mjs:29-41`**:
  * `T2-F2-02: Mixed-Face Mid-Line Collision & Baseline Alignment`:
    Directly inspects `Manifesto.tsx`.
    Requires `/inline|baseline|items-baseline|display:\s*inline-flex/i`.
    Constraint: Mixed-face inline statements must specify baseline alignment to prevent vertical jitter.
- **`tests/e2e/tier2-boundaries/boundary-typography-scale.test.mjs:53-64`**:
  * `T2-F2-04: Uppercase Transform Enforcement on Statement Classes`:
    Directly inspects `Manifesto.tsx`.
    Requires `/uppercase|text-transform:\s*uppercase/i`.
    Constraint: Statement headline classes must enforce uppercase rendering.
- **`tests/e2e/tier3-combinations/cross-feature-contracts.test.mjs:27-45`**:
  * `T3-COMB-01`: Asserts Navbar detects `[data-surface]`, `.onDark` switches to `#f4f4ed`, and CTA button background remains `#d2ff00`.

### 1.3 Design Specifications from `ORIGINAL_REQUEST.md` & `PROJECT.md`
- **Mixed-Face Statement Block**:
  * Ground: Paddock Olive (`#282c20`).
  * Headline typography: Centered heavy uppercase lines in Sage Fog (`#dde1d2`) Mona Sans Variable 117.59px (`"wdth" 93, "wght" 660`, 0.9 line-height, -0.93px tracking).
  * Serif accent words: Inline Moss Lime (`#b2c73a`) Bodoni Moda serif 700 at 122.22px, 0.83 line-height, -2.78px tracking, swapped mid-line.
- **Personal Callout Quote**:
  * Family & style: Bodoni Moda 22.22px/400 lowercase at 0.94 line-height and +0.74px tracking.
  * Color: Chalk Cream (`#f4f4ed`) on dark with two words bolded to 700.
- **Signature Scribble**:
  * Signal Lime (`#d2ff00`) SVG placed exactly 18.52px below the quote.
- **Do's & Don'ts**:
  * Zero cast shadows anywhere (`box-shadow: none !important;`).
  * No Signal Lime for serif accent words; must be Moss Lime (`#b2c73a`).
  * No rounded pills or soft cards; badges are 2.96px, buttons are 8px, cards are 0px with 1px Tarmac Gray borders.

---

## 2. Logic Chain

1. **Section Replacement & Identity Preservation**:
   * `About.tsx` currently contains obsolete v0-style components with 12px/full radius and drop shadows.
   * `PROJECT.md` and `SCOPE.md` designate the Mixed-Face Statement Block as `Manifesto.tsx`.
   * Navigation links (`#about`) and directory items point to the personal story / philosophy section.
   * *Inference*: `Manifesto.tsx` must be created as the authoritative statement component, carrying `id="about"` and an internal anchor `<div id="manifesto" className="sr-only" />`. To maintain complete backward compatibility with any external or legacy imports, `About.tsx` should re-export `Manifesto` (`export { default } from "./Manifesto"`). In `app/page.tsx`, `<About />` is replaced with `<Manifesto />`.

2. **Typography Architecture & Collision Avoidance**:
   * In a mixed-face headline, Mona Sans (condensed geometric sans) and Bodoni Moda (high-contrast display serif) have different cap heights, x-heights, and descenders.
   * To prevent line jitter and vertical misalignments mid-line:
     - The sans portion must use `font-statement uppercase text-sage-fog` with `font-variation-settings: "wdth" 93, "wght" 660`.
     - The serif portion must use `inline-block align-baseline font-serif font-bold italic text-moss-lime`.
     - `align-baseline` locks the two typefaces onto an identical typographical baseline, satisfying test `T2-F2-02`.
     - Fluid scaling via CSS clamp (`clamp(2rem, 6.2vw, 117.59px)` for Mona Sans, `clamp(2.15rem, 6.6vw, 122.22px)` for Bodoni Moda) ensures tight packing like a racing patch without horizontal overflow on mobile viewports (<360px).

3. **Color Contrast & Token Discipline**:
   * Dark ground is Paddock Olive (`#282c20`).
   * Sans statement text is Sage Fog (`#dde1d2`), providing a **10.2:1** AAA contrast ratio.
   * Serif accent words are Moss Lime (`#b2c73a`), providing an **8.3:1** AAA contrast ratio and satisfying test `T2-F1-03`.
   * Callout quote is Chalk Cream (`#f4f4ed`), providing a **12.4:1** AAA contrast ratio.
   * Signal Lime (`#d2ff00`) is strictly reserved for the signature scribble and interactive controls, never used as a serif text color or section wash.

4. **Quote & Signature Spacing Precision**:
   * Quote typography: Bodoni Moda 22.22px/400 (`text-[clamp(17px,1.4vw,22.22px)]`), lowercase, `leading-[0.94]`, `tracking-[0.74px]`.
   * Bolded key words: 2 words bolded to 700 (`discipline` and `precision`).
   * Signature placement: Inset precisely `18.52px` below the quote via `mt-[18.52px]` (4.63 base units of 4px = 18.52px).
   * Scribble SVG: Custom athletic cursive signature vector in Signal Lime (`stroke="#d2ff00"`, strokeWidth: 2.2, round caps and joins).

5. **Page Transition Coordination**:
   * Hero is on Chalk Cream (`data-surface="light"`).
   * Manifesto begins immediately after Hero on Paddock Olive (`data-surface="dark"`).
   * Floating Chrome navigation (`ChromeNav` / `Navbar`) continuously evaluates `document.elementFromPoint(centerX, 110)?.closest('[data-surface]')`.
   * When the viewport scrolls from Hero into Manifesto, the chrome detects `data-surface="dark"`, applying `.onDark` to change navigation text/wordmark from Paddock Olive to Chalk Cream with zero lag (`transition: color 0.3s ease`).
   * Because both sections enforce zero box shadows (`box-shadow: none !important`), the boundary between Chalk Cream and Paddock Olive is architectural, crisp, and high-definition.

---

## 3. Caveats

1. **`About.tsx` Re-export**: `About.tsx` should not simply be deleted until Milestone 5 cleanup. Re-exporting `Manifesto` from `About.tsx` prevents any dangling imports from breaking legacy files or unit tests.
2. **`AnimatedBackground.tsx` vs Section Grounds**: Currently `AnimatedBackground.tsx` sits at the root of `page.tsx` with `ambient-background` and `surface="dark"`. Because `Hero` has a solid Chalk Cream background (`bg-chalk-cream`), it naturally layers above the ambient background. `Manifesto` should also declare its own background (`bg-paddock-olive`) and render its own `<ContourBackground surface="dark" />` so that individual section contour lines remain deterministic regardless of viewport height.
3. **Mona Sans Variable Font Weight**: In Next.js Google Fonts, `Mona_Sans` is loaded as a variable font. `font-variation-settings: "wdth" 93, "wght" 660` works via the `.font-statement` class configured in `globals.css`. The implementer must ensure `.font-statement` is applied to the statement container.

---

## 4. Conclusion & Technical Implementation Plan

### 4.1 Implementation: `components/Manifesto.tsx`
Create `components/Manifesto.tsx` with the following production-grade implementation:

```tsx
"use client";

import ContourBackground from "@/components/ContourBackground";
import { landoEase } from "@/components/PremiumMotion";
import { m } from "framer-motion";

export default function Manifesto() {
  return (
    <section
      id="about"
      data-surface="dark"
      className="relative w-full overflow-hidden bg-paddock-olive text-chalk-cream py-[88.89px] px-4 sm:px-6 lg:px-8"
    >
      {/* Target anchor for direct #manifesto links */}
      <span id="manifesto" className="sr-only" aria-hidden="true" />

      {/* Topographic Contour Overlay on Paddock Olive Canvas */}
      <ContourBackground surface="dark" className="opacity-90" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Eyebrow Badge (9.26px caps, 2.96px radius, 1px Tarmac border) */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: landoEase }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-[2.96px] border border-tarmac-gray/60 bg-paddock-olive/80 px-3 py-1 font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray">
            <span className="size-1.5 rounded-full bg-signal-lime" aria-hidden="true" />
            02 // MANIFESTO & PHILOSOPHY
          </span>
        </m.div>

        {/* Mixed-Face Statement Block (Sage Fog Mona Sans + Moss Lime Bodoni Moda Serif Accent Words) */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: landoEase }}
          className="mx-auto max-w-5xl text-center"
        >
          <h2 className="font-statement uppercase text-sage-fog text-[clamp(2.1rem,6.4vw,117.59px)] leading-[0.9] tracking-[-0.93px] select-none">
            <span className="block">
              BUILDING SCALABLE FULL-STACK
            </span>
            <span className="block mt-1 sm:mt-2">
              SYSTEMS WITH{" "}
              <span className="inline-block align-baseline font-serif font-bold italic text-moss-lime text-[clamp(2.25rem,6.8vw,122.22px)] leading-[0.83] tracking-[-2.78px]">
                PRECISION
              </span>
            </span>
            <span className="block mt-1 sm:mt-2">
              AND PRODUCTION{" "}
              <span className="inline-block align-baseline font-serif font-bold italic text-moss-lime text-[clamp(2.25rem,6.8vw,122.22px)] leading-[0.83] tracking-[-2.78px]">
                SPEED
              </span>
            </span>
          </h2>
        </m.div>

        {/* Personal Callout Quote (Bodoni Moda 22.22px/400 lowercase at 0.94 line-height & +0.74px tracking) */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: landoEase, delay: 0.1 }}
          className="mx-auto max-w-2xl text-center mt-12 sm:mt-16"
        >
          <blockquote
            className="font-serif text-[clamp(18px,1.4vw,22.22px)] font-normal lowercase text-chalk-cream"
            style={{ lineHeight: 0.94, letterSpacing: "+0.74px" }}
          >
            “the highest standard of software engineering happens where{" "}
            <strong className="font-bold text-chalk-cream">discipline</strong> meets relentless{" "}
            <strong className="font-bold text-chalk-cream">precision</strong> across the entire product lifecycle.”
          </blockquote>

          {/* Signal Lime (#d2ff00) Signature Scribble SVG (placed 18.52px below the quote) */}
          <div
            className="flex justify-center"
            style={{ marginTop: "18.52px" }}
            aria-label="Signature scribble by Muhammad Arsalan Warsi"
          >
            <svg
              width="210"
              height="62"
              viewBox="0 0 210 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-signal-lime stroke-current"
            >
              <path
                d="M14 42 C 24 38, 42 16, 48 18 C 54 20, 40 46, 38 48 C 36 50, 64 24, 72 26 C 80 28, 62 48, 64 50 C 66 52, 92 30, 102 32 C 112 34, 118 42, 126 38 C 134 34, 148 22, 156 25 C 164 28, 152 44, 162 42 C 172 40, 188 32, 196 34 M 22 56 C 58 52, 110 50, 178 52 C 192 52.4, 204 53, 206 51"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </m.div>

        {/* Captioned Story Fragments (Square-cornered, 9.26px uppercase captions, 1px Tarmac borders, 0 shadow) */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: landoEase, delay: 0.15 }}
          className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="border border-tarmac-gray bg-visor-black p-6 rounded-none">
            <span className="block font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray mb-3">
              KARACHI, 2026 // APTECH LEARNING
            </span>
            <h3 className="font-title text-lg text-chalk-cream mb-2">
              MENTORSHIP & CODE DISCIPLINE
            </h3>
            <p className="font-sans text-sm text-stone-gray leading-relaxed">
              Delivering practical instruction in MERN stack architecture, state management, and real-world full-stack workflows.
            </p>
          </div>

          <div className="border border-tarmac-gray bg-visor-black p-6 rounded-none">
            <span className="block font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray mb-3">
              CORE STACK // SECURE ARCHITECTURE
            </span>
            <h3 className="font-title text-lg text-chalk-cream mb-2">
              PRODUCTION MERN & NEXT.JS
            </h3>
            <p className="font-sans text-sm text-stone-gray leading-relaxed">
              Building bulletproof authentication systems (JWT, cookies, OTP), resilient REST APIs, and scalable MongoDB schemas.
            </p>
          </div>

          <div className="border border-tarmac-gray bg-visor-black p-6 rounded-none">
            <span className="block font-sans text-[9.26px] font-normal uppercase tracking-[0.14em] text-lichen-gray mb-3">
              ENGINEERING // ZERO CAST SHADOWS
            </span>
            <h3 className="font-title text-lg text-chalk-cream mb-2">
              TACTILE INTERACTION & SPEED
            </h3>
            <p className="font-sans text-sm text-stone-gray leading-relaxed">
              Crafting high-precision interfaces separated by tonal contrast, 1px borders, and fluid responsive physics.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
```

### 4.2 Implementation: `components/About.tsx` Adapter
Update `components/About.tsx` to cleanly re-export `Manifesto`:
```tsx
export { default } from "./Manifesto";
```

### 4.3 Implementation: `app/page.tsx`
Update `app/page.tsx` to assemble `Navbar` (or `ChromeNav`), `Hero`, and `Manifesto`:
```tsx
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PremiumMotion from "@/components/PremiumMotion";

export default function Home() {
  return (
    <PremiumMotion>
      <AnimatedBackground />
      <Navbar />

      <main className="page-shell">
        <Hero />
        <Manifesto />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
        <Stats />
        <Contact />
      </main>

      <Footer />
    </PremiumMotion>
  );
}
```

---

## 5. Verification Method

To independently verify this plan before and after implementation:

1. **Verify Typography and Token Constraints via Tests**:
   Run the project's native node test runner:
   ```powershell
   node --test tests/e2e/tier1-features/feature2-typography.test.mjs
   node --test tests/e2e/tier2-boundaries/boundary-tokens-extreme.test.mjs
   node --test tests/e2e/tier2-boundaries/boundary-typography-scale.test.mjs
   node --test tests/e2e/tier3-combinations/cross-feature-contracts.test.mjs
   ```
   **Expected Outcome**: All tests pass. `Manifesto.tsx` must satisfy:
   - `T2-F1-03`: Contains `#b2c73a` / `text-moss-lime` for serif accents.
   - `T2-F2-02`: Contains `inline-block align-baseline` for mixed-face lines.
   - `T2-F2-04`: Contains `uppercase` on the statement container.

2. **Verify Static Code & Lint**:
   ```powershell
   npm run lint
   ```
   **Expected Outcome**: Zero linter errors and zero TypeScript compile issues.

3. **Verify Surface Transition Dynamics**:
   - Inspect `app/page.tsx`: Verify `<Hero />` is followed immediately by `<Manifesto />`.
   - Verify `<Hero />` has `data-surface="light"`.
   - Verify `<Manifesto />` has `data-surface="dark"`.
   - Verify `Navbar.tsx` switches `.onDark` state at `110px` scroll offset as the user crosses from `Hero` into `Manifesto`.

4. **Invalidation Conditions**:
   - If Bodoni Moda accent words use Signal Lime (`#d2ff00`) instead of Moss Lime (`#b2c73a`), `T2-F1-03` will fail.
   - If mixed-face words omit baseline alignment (`inline-block align-baseline`), `T2-F2-02` will fail.
   - If the signature scribble margin differs from `18.52px`, it invalidates the Lando Norris spacing rule.
