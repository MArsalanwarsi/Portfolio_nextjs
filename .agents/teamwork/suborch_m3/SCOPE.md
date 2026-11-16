# Scope: Milestone 3 — Showcase & Content Architecture

## Architecture
- Framework: Next.js 16.4.0 (Turbopack, React 19, TypeScript)
- Theme: Tailwind CSS v4 (`@theme inline`), Paddock Olive (`#282c20`), Chalk Cream (`#f4f4ed`), Visor Black (`#111112`), Tarmac Gray (`#535450`), Signal Lime (`#d2ff00`), Lichen Gray (`#b4b8a5`), Sage Fog (`#dde1d2`)
- Motion: Framer Motion with `cubic-bezier(0.65, 0.05, 0, 1)`, duration `0.75s`, `useReducedMotion()` support
- Zero Shadows: Strict universal elevation reset (`box-shadow: none !important;`)
- Card Geometry: 0px border radius with bottom-right chamfered notch (`clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`)
- Button Geometry: 8px border radius, Signal Lime hooked-arrow controls

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 10 | Chamfered Project Cards on Visor Black | Visor Black showcase cards with 1px Tarmac Gray border, chamfered notch tab, hosting 8 real projects with live/repo links | M3 | PROJECT.md / Survey |
| 11 | Skills & Tools Architecture | Highlighting 67 skills across Frontend (27), Backend (17), Database (7), and Tools (17) with Lichen Gray caption pills | M3 | PROJECT.md / Survey |
| 12 | Experience & Education Timelines | Aptech Teaching Associate and Boston Grammar School experience + ACCP Computer Science and B.Com education | M3 | PROJECT.md / Survey |
| 13 | Certificates & Recognition Showcase | Display 6 verified certificates (Meta Front-End, Meta Back-End, Aptech Ambassador, etc.) with credential details | M3 | PROJECT.md / Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M3.1 | Technical Investigation | 3 Explorers mapping existing components, missing styles, data fidelity | none | IN_PROGRESS |
| M3.2 | Showcase & Content Implementation | Worker implementing Projects, Skills, Timelines, Certificates | M3.1 | PLANNED |
| M3.3 | Review & Challenge | 2 Reviewers + 2 Challengers independently assessing visual, code, and adversarial stress | M3.2 | PLANNED |
| M3.4 | Forensic Audit & Gate | 1 Forensic Auditor running integrity and anti-cheat checks | M3.3 | PLANNED |

## Interface Contracts
### `ProjectCard` / `ProjectCarousel` / `Projects`
- Ground: Visor Black (`#111112`)
- Border: 1px `#535450` (Tarmac Gray)
- Card Radius: `0px`
- Chamfer Notch: `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`
- Typography: Mona Sans 13.33px/600 Chalk Cream project name, Signal Lime 13.33px/700 year/tag
- Interactive controls: 8px border-radius buttons with Signal Lime hooked return arrows (`aw↗` or curved return)
- All 8 projects: GrowthRadar AI, Fitness Tracker, Sustainable Living, Warranty Flow, ThriftShoewear, Master Wood Works, ABC Mall, K-Medicos.
- Real GitHub and Live URLs, local SVGs from `public/projects/`.
- No `ProjectPresentation.module.css` broken references; no legacy `shadow-2xl` classes.

### `Skills`
- Ground: Section ground aligned with alternating theme (Paddock Olive or Chalk Cream)
- 67 skills: Frontend (27), Backend (17), Database (7), Tools (17)
- Caption pills: Lichen Gray (`#b4b8a5`), 1px pill border, 2.96px badge radius.

### `Experience` & `Education`
- Experience: Teaching Associate at Aptech Learning (Dec 2025 - Present) & Computer Teacher at Boston Grammar School (Aug 2025 - Dec 2025).
- Education: ACCP Computer Science at Aptech (2023 - 2026, in progress) & Bachelor of Commerce at University of Karachi (2023, 1st Division).
- Layout: Clean architectural timeline with 1px Tarmac borders, tone separation, 0px cards, zero box shadows.

### `Certificates`
- 6 awards: Meta Front-End, Meta Back-End, M.S Office, Amazon FBA, Visual Designing Course, Aptech Ambassador.
- Verified details from `data/portfolio.json`.

## Code Layout
- `components/`
  * `Projects.tsx`: Container section for project showcase
  * `ProjectCard.tsx` / `ProjectCarousel.tsx`: Showcase cards with Visor Black ground, 1px Tarmac Gray border, chamfered notch, 0px radius, 8px controls
  * `Skills.tsx`: 67 skills categorized with Lichen Gray pills
  * `Experience.tsx`: Career timeline
  * `Education.tsx`: Academic timeline
  * `Certificates.tsx`: Credentials showcase
  * `page.tsx`: Section assembly and wiring
- `data/`
  * `portfolio.json`: Source of truth for 8 projects, 67 skills, education, experience, certificates
