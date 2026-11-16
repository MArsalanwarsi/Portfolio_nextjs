# Project: Muhammad Arsalan Warsi Portfolio Redesign (Lando Norris Aesthetic)

## Architecture
- **Framework**: Next.js 16.4.0 (Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, pure CSS `@theme` in `app/globals.css`, zero box shadows)
- **Typography**: Next.js Google Fonts — `Mona_Sans` (variable `wdth` 93, `wght` 400-800) and `Bodoni_Moda` (variable `opsz` 6-96, display serif)
- **Motion**: Framer Motion (`LazyMotion`, `domMax`, `MotionConfig` with `cubic-bezier(0.65, 0.05, 0, 1)`, duration `0.75s`)
- **Theme Alternation**:
  * Paddock Olive (`#282c20`): Body canvas, manifesto statement section, inset footer panel, dark text on light
  * Chalk Cream (`#f4f4ed`): Light section canvas, menu button fill, light text on dark, contour lines ground
  * Visor Black (`#111112`): Neutral void ground for project showcase cards, 1px Tarmac Gray borders
  * Signal Lime (`#d2ff00`): 8px radius buttons, live switches, monogram accents, signature scribble, footer halo glow
  * Moss Lime (`#b2c73a`): Serif accent words inside dark uppercase statements

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Coffee Theme Purge | Delete CoffeeCursor, DeferredCoffeeCursor, CoffeeScrollRail, DotField bean canvas, LoadingScreen coffee video, and 420+ lines of coffee styles | M1 | Survey / User Request |
| 2 | Tailwind CSS v4 Lando Tokens | Configure `@theme` with Paddock Olive, Chalk Cream, Signal Lime, Moss Lime, Visor Black, Sage Fog, Tarmac Gray, Lichen Gray, Stone Gray | M1 | Survey / Style Spec |
| 3 | Variable Font Integration | Load `Mona_Sans` (`wdth` 93) and `Bodoni_Moda` (`opsz`) via `next/font/google` in `app/layout.tsx` | M1 | Survey / Style Spec |
| 4 | Motion Curve & Elevation Rules | Enforce `cubic-bezier(0.65, 0.05, 0, 1)` (0.75s) and zero box shadows (`box-shadow: none !important`) | M1 | Survey / Style Spec |
| 5 | Clean Dependency & CSS Alignment | Fix broken `ProjectPresentation.module.css` references and impure `Date()` call in `Footer.tsx` | M1 | Survey / Build Discovery |
| 6 | Topographic Contour Line Overlay | Reusable SVG contour line pattern for Chalk Cream and Paddock Olive section grounds | M2 | Survey / Style Spec |
| 7 | Floating Chrome Navigation | Inset 18.52px fixed layer with Arsalan WARSI wordmark, `aw` monogram, Signal Lime contact button, 55.5px square menu toggle | M2 | Survey / Style Spec |
| 8 | Assembling Hero & Sprint Ticket | Chalk Cream contour hero with portrait cut-out, active sprint ticket (Aptech, MERN, Open to Work), shrinking to card on scroll | M2 | Survey / Content Inventory |
| 9 | Mixed-Face Statement Block | Manifesto headline in Sage Fog Mona Sans uppercase with Moss Lime Bodoni Moda serif accent words on Paddock Olive | M2 | Survey / Style Spec |
| 10 | Chamfered Project Cards on Visor Black | Visor Black showcase cards with 1px Tarmac Gray border, chamfered notch tab, hosting 8 real projects with live/repo links | M3 | Survey / Content Inventory |
| 11 | Skills & Tools Architecture | Highlighting 67 skills across Frontend, Backend, Database, and Tools with Lichen Gray caption pills | M3 | Survey / Content Inventory |
| 12 | Experience & Education Timelines | Aptech Teaching Associate and Boston Grammar School experience + ACCP Computer Science and B.Com education | M3 | Survey / Content Inventory |
| 13 | Certificates & Recognition Showcase | Display 6 verified certificates (Meta Front-End, Meta Back-End, Aptech Ambassador, etc.) | M3 | Survey / Content Inventory |
| 14 | On / Off Track Two-Way Teaser | Split section on Chalk Cream: `ON CODE` (Full-Stack / MERN) vs `IN LAB` (Teaching / Mentorship) with 55px Lime Icon Tiles | M4 | Survey / Style Spec |
| 15 | Tech Logo Marquee | Monochrome Paddock Olive logos across Chalk Cream crossed by Signal Lime brush script accent | M4 | Survey / Style Spec |
| 16 | Fanned Social Deck | Arc of portrait cards for GitHub, LinkedIn, Vercel, Resume, WhatsApp under `WHAT'S UP ON SOCIALS` | M4 | Survey / Style Spec |
| 17 | Inset Footer Panel with Lime Halo Glow | Paddock Olive panel inset 18.52px on radial lime halo gradient with raised center tab `AW / 2026` | M4 | Survey / Style Spec |
| 18 | Interactive Contact Form & CV Download | Hardened `/api/contact` route integration with honeypot + direct download for `/M_Arsalan_Warsi_CV.pdf` | M4 | Survey / Content Inventory |
| 19 | Opaque-Box E2E Testing Suite | Multi-tier test suite covering navigation, theme switching, responsive layouts, forms, and link integrity | M5 | Project Pattern Dual-Track |
| 20 | Production Build & Lint Gate | Zero-error production build (`next build`) and zero-warning linter pass (`oxlint`) | M5 | Project Pattern Verification |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation & Coffee Purge | Purge all coffee files, styles, and assets; configure Tailwind v4 `@theme`, `next/font/google` Mona Sans & Bodoni Moda, lando motion curve, 0 shadows, and resolve missing CSS modules | none | DONE |
| M2 | Navigation, Hero & Manifesto | Topographic background, Floating Chrome Nav, Assembling Hero with Sprint Ticket, Mixed-Face Statement Block | M1 | DONE |
| M3 | Showcase & Content Architecture | Visor Black chamfered project showcase (8 projects), Skills breakdown (67 skills), Experience & Education timelines, Certificates | M2 | IN_PROGRESS |
| M4 | Interactive Teasers, Footer & Contact | On/Off Track split teaser, Tech Marquee, Fanned Social Deck, Inset Footer with Lime Halo Glow, Contact form & CV download | M3 | PLANNED |
| M5 | Final Verification & E2E Pass | Run E2E test suite, execute Turbopack production build and oxlint, ensure 100% test pass and zero regressions | M4 | PLANNED |

## Interface Contracts
### `ContourBackground` Component
- Signature: `ContourBackground({ surface?: "dark" | "light" }) -> JSX.Element`
- Ground: renders non-scaling SVG contour lines (`rgba(83, 84, 80, 0.28)` on dark, `rgba(40, 44, 32, 0.12)` on light).

### `ChromeNav` Component
- Role: Fixed site navigation layer inset 18.52px (`position: fixed; inset: 18.52px 18.52px auto 18.52px; z-index: 50;`)
- Controls: Arsalan WARSI wordmark, `aw` monogram, Signal Lime 8px CTA button, 55.5px square menu toggle.

### `ChamferCard` Geometry
- Clip-path: `polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`
- Background: `#111112` (Visor Black), Border: 1px `#535450` (Tarmac Gray).

### `LimeHaloGlow` Ground
- Background: `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)`

## Code Layout
- `app/`
  * `globals.css`: Tailwind v4 theme, CSS variables, zero-shadows, chamfer geometries, typography rules
  * `layout.tsx`: Root layout, Google Fonts (`Mona_Sans`, `Bodoni_Moda`), viewport theme color `#282c20`
  * `page.tsx`: Page structure assembling ChromeNav, Hero, Manifesto, Projects, Experience, Skills, Teaser, Social, Footer
- `components/`
  * `ChromeNav.tsx`: Floating chrome nav layer
  * `ContourBackground.tsx`: SVG topographic contour lines
  * `Hero.tsx`: Assembling hero portrait and Active Sprint ticket
  * `Manifesto.tsx`: Mixed-face statement block
  * `Projects.tsx` & `ProjectCard.tsx`: Visor Black chamfered showcase cards
  * `Skills.tsx`: 67 skills categorized layout with Lichen Gray pills
  * `Experience.tsx` & `Education.tsx`: Verified career and education timeline
  * `Certificates.tsx`: Verified credentials showcase
  * `SplitTeaser.tsx`: On Code / In Lab two-way teaser
  * `SocialDeck.tsx`: Fanned arc card deck
  * `Footer.tsx`: Inset Paddock Olive panel with Lime Halo Gradient
  * `ContactForm.tsx`: Rate-limited contact form with honeypot
  * `PremiumMotion.tsx`: Framer Motion configuration with `cubic-bezier(0.65, 0.05, 0, 1)` (0.75s)
- `data/`
  * `portfolio.json`: Source of truth for profile data, 8 projects, 67 skills, education, awards
