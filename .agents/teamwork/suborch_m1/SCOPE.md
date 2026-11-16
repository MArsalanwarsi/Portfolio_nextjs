# Scope: Milestone 1 — Foundation & Coffee Purge

## Architecture
- Module/package boundaries: Next.js 16.4.0 root layout (`app/layout.tsx`), stylesheet (`app/globals.css`), Framer Motion configuration (`components/PremiumMotion.tsx`), missing module CSS fixes (`components/ProjectPresentation.module.css`), and complete purge of coffee theme components/assets.
- Shared interfaces:
  * CSS variables: `--paddock-olive: #282c20`, `--chalk-cream: #f4f4ed`, `--signal-lime: #d2ff00`, `--moss-lime: #b2c73a`, `--visor-black: #111112`, `--sage-fog: #dde1d2`, `--tarmac-gray: #535450`, `--lichen-gray: #b4b8a5`, `--stone-gray: #b9bbad`
  * Tailwind CSS v4 `@theme` mappings
  * Zero box-shadows enforcement: `box-shadow: none !important;`
  * Easing curve: `cubic-bezier(0.65, 0.05, 0, 1)` with `0.75s`
  * Font variables: `--font-sans` (`Mona_Sans`), `--font-serif` (`Bodoni_Moda`)

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Coffee Theme Purge | Delete CoffeeCursor, DeferredCoffeeCursor, CoffeeScrollRail, DotField bean canvas, LoadingScreen coffee video, and 420+ lines of coffee styles | M1 | Survey / User Request | DONE |
| 2 | Tailwind CSS v4 Lando Tokens | Configure `@theme` with Paddock Olive, Chalk Cream, Signal Lime, Moss Lime, Visor Black, Sage Fog, Tarmac Gray, Lichen Gray, Stone Gray | M1 | Survey / Style Spec | DONE |
| 3 | Variable Font Integration | Load `Mona_Sans` (`wdth` 93) and `Bodoni_Moda` (`opsz`) via `next/font/google` in `app/layout.tsx` | M1 | Survey / Style Spec | DONE |
| 4 | Motion Curve & Elevation Rules | Enforce `cubic-bezier(0.65, 0.05, 0, 1)` (0.75s) and zero box shadows (`box-shadow: none !important`) | M1 | Survey / Style Spec | DONE |
| 5 | Clean Dependency & CSS Alignment | Fix broken `ProjectPresentation.module.css` references and impure `Date()` call in `Footer.tsx` | M1 | Survey / Build Discovery | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status | Outputs |
|---|------|-------|-------------|--------|---------|
| M1.1 | Foundation & Coffee Purge (Iter 1) | Full M1 implementation cycle: Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate | none | DONE | Gate PASS; 14 coffee files/folders deleted; globals.css purged (-665 lines); ContourBackground.tsx, ProjectPresentation.module.css created; Mona Sans/Bodoni Moda configured; 0 lint errors, build exit code 0 |

## Interface Contracts
### `app/globals.css`
- Defines Tailwind v4 `@theme` tokens and zero-shadow rule:
```css
*, *::before, *::after {
  box-shadow: none !important;
  text-shadow: none !important;
}
```
- Defines chamfer clip-paths:
  * `.chamfer-card`: `polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`
  * `.footer-tab`: `polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)`
  * `.lime-halo-glow`: `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)`

### `app/layout.tsx`
- Loads `Mona_Sans` with `variable: "--font-sans"`, `axes: ["wdth"]`.
- Loads `Bodoni_Moda` with `variable: "--font-serif"`, `axes: ["opsz"]`.
- Sets viewport `themeColor: "#282c20"`.

### `components/PremiumMotion.tsx`
- Exports `landoEase = [0.65, 0.05, 0, 1]` and duration `0.75s`.
- Applies to `MotionConfig`.

### `components/ContourBackground.tsx`
- Replaces `DotField.tsx` with clean SVG topographic contour lines on dark/light surfaces.
