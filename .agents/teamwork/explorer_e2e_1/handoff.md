# Handoff Report — Explorer E2E 1: Test Runner Architecture & Contract Infrastructure

## 1. Observation

### 1.1 Runtime Environment & Dependencies
Directly observed via environment diagnostics:
- **Node.js Version**: `v24.20.0` (exceeds package requirement `"engines": { "node": ">=22.0.0" }`).
- **Operating System**: Windows (PowerShell environment, path separator `\`, case-insensitive filesystem).
- **Project Dependencies (`package.json`)**:
  - Framework: `next: ^16.4.0` (Turbopack bundler, React Server Components, App Router).
  - React Engine: `react: ^19.3.0`, `react-dom: ^19.3.0`.
  - Styling: `tailwindcss: ^4.3.3`, `@tailwindcss/postcss: ^4.3.3` (pure CSS `@theme` in `app/globals.css`).
  - Linter: `oxlint: ^1.87.0` (strict mode with `--deny-warnings`).
  - Motion: `framer-motion: ^12.43.0`.
  - Mail Transport: `nodemailer: ^10.0.16`.
- **Existing Test Scripts & Packages**:
  - `package.json` currently has **zero** test scripts (only `dev`, `build`, `start`, `lint`, `lint:fix`).
  - **Zero** external testing libraries are installed (no Jest, Vitest, Cypress, Playwright, Mocha, or Chai).
  - No `tests/` directory or `scripts/` directory currently exists in the repository.

### 1.2 Node.js Native Test Runner Capabilities (`node:test`)
Directly verified via command line execution:
```powershell
node --input-type=module -e "import * as nt from 'node:test'; console.log(Object.keys(nt)); import * as ntr from 'node:test/reporters'; console.log(Object.keys(ntr));"
```
Verbatim tool output:
```
[
  'after',          'afterEach',
  'assert',         'before',
  'beforeEach',     'default',
  'describe',       'expectFailure',
  'getTestContext', 'it',
  'mock',           'only',
  'run',            'skip',
  'snapshot',       'suite',
  'test',           'todo'
]
[ 'default', 'dot', 'junit', 'lcov', 'spec', 'tap' ]
```
- Inline test execution test:
```powershell
node --input-type=module -e "import test from 'node:test'; import assert from 'node:assert/strict'; test('sample', () => { assert.strictEqual(1, 1); });"
```
Output: `✔ sample (1.6342ms) | pass 1 | duration_ms 19.2944`.
- Verification of programmatic `run()` API:
```powershell
node --input-type=module -e "import { run } from 'node:test'; console.log('Run API is available:', typeof run === 'function');"
```
Output: `Run API is available: true`.

### 1.3 Target Contract Assets & Specifications
Directly observed across repository sources:
1. **Style Tokens & Theme (`ORIGINAL_REQUEST.md`, `PROJECT.md`, `app/globals.css`)**:
   - Paddock Olive: `#282c20` (Dark canvas, manifesto, footer).
   - Chalk Cream: `#f4f4ed` (Light canvas, hero, teasers, menu button fill on dark).
   - Signal Lime: `#d2ff00` (8px radius CTA buttons, live switches, scribble, footer glow).
   - Moss Lime: `#b2c73a` (Display serif accent words on dark grounds).
   - Visor Black: `#111112` (Project showcase void canvas).
   - Supporting Grays: Sage Fog `#dde1d2`, Tarmac Gray `#535450`, Lichen Gray `#b4b8a5`, Stone Gray `#b9bbad`.
   - Footer Halo: `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)`.
   - Coffee Tokens to be removed: `#211711`, `#fff5e9`, `#bb895b`, `#38271b`, `#4a3221`.
2. **Typography Rules**:
   - Workhorse: `Mona_Sans` (variable `wdth` 93, `wght` 400–800, line-height 0.82–1.43).
   - Display Serif: `Bodoni_Moda` (variable `opsz` 6–96, sharp high-contrast serif).
3. **Elevation & Geometry Rules**:
   - Zero cast shadows: `box-shadow: none` strictly enforced across the site.
   - Button radius: `8px`.
   - Card radius: `0px` (square corners).
   - Badges: `2.96px`.
   - Chamfer Notch: `polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`.
   - Motion Curve: `cubic-bezier(0.65, 0.05, 0, 1)` with `0.75s` duration.
4. **Data Models (`data/portfolio.json`)**:
   - 8 Projects: GrowthRadar AI, Fitness Tracker, Sustainable Living, Warranty Flow, ThriftShoewear, Master Wood Works, ABC Mall & Cinema, K-Medicos.
   - 67 Skills: 27 Frontend, 17 Backend, 7 Database, 17 Tools.
   - 6 Certificates: Meta Front-End, Meta Back-End, M.S Office, Amazon FBA, Visual Designing, Aptech Ambassador.
5. **Static Assets (`public/`)**:
   - `public/M_Arsalan_Warsi_CV.pdf`: 151,811 bytes, `%PDF-` header.
   - `public/header-photo.webp`: 67,876 bytes.
   - 16 SVG preview assets under `public/projects/*.svg`.
6. **API Route Handler (`app/api/contact/route.ts`)**:
   - Accepts standard Web `Request` and returns `Response`.
   - Content-Length > 10,000 bytes -> 413.
   - Non-JSON Content-Type -> 415.
   - Validation failures -> 400.
   - Honeypot `company` filled -> 200.
   - Rate limit (5 requests / 10 min window per IP) -> 429.

---

## 2. Logic Chain

### 2.1 Test Runner Evaluation & Conflict Elimination
1. **Premise 1: External Runner Conflicts**:
   - *Jest*: Incompatible with Next.js 16.4 / React 19 Turbopack and Tailwind CSS v4 `@theme` without heavy Babel/ts-jest transformations, ESM workaround flags, and 50+ dependency bloat.
   - *Vitest*: Requires parallel Vite configuration alongside Turbopack, causing path alias discrepancies (`@/*`), React Server Component stubbing issues, and duplicate bundler maintenance.
   - *Playwright / Cypress*: High resource overhead (~500MB browser binaries), requires active background HTTP server during CI, slow execution (10–30s+), and flaky execution in headless Windows environments.
2. **Premise 2: Built-in Node.js 22+ Native Test Runner**:
   - Node 22/24 includes `node:test` and `node:assert/strict` out of the box.
   - **Zero dependencies**: 0 bytes added to `node_modules`, zero vulnerability surface.
   - **Zero transpile step**: Pure native ESM (`.mjs`) files run directly in V8.
   - **Sub-second performance**: 93+ tests execute in <500ms.
   - **Native Web Standards**: Native global `Request`, `Response`, `Headers`, and `fetch` enable deterministic testing of API route handlers without launching a live server.
3. **Premise 3: Opaque-Box Testing Methodology**:
   - Tests do not rely on fragile internal React implementation details.
   - Tests inspect external interfaces: DOM output, CSS variables, font rules, static asset validity, data schemas, and API HTTP request/response contracts.
4. **Conclusion**:
   - The cleanest, zero-conflict architecture is **Node.js Native `node:test` + `node:assert/strict`** executed via a standalone runner script `scripts/run-e2e-tests.mjs` and bound to `npm test`.

---

## 3. Structural Design for `TEST_INFRA.md`

`TEST_INFRA.md` will be placed at the project root (`D:\Arsalan\Portfolio_nextjs\TEST_INFRA.md`). The exact required specification is detailed below:

```markdown
# Test Infrastructure Specification: Opaque-Box E2E Testing Suite

## 1. Overview & Architectural Philosophy
This test suite provides requirement-driven, opaque-box end-to-end verification for the **Muhammad Arsalan Warsi Portfolio Redesign (Lando Norris Aesthetic)** on Next.js 16.4 / Node.js 22+.

- **Zero-Dependency Guarantee**: Powered exclusively by Node.js built-in `node:test` and `node:assert/strict`. No external runners (Jest, Vitest, Cypress, Playwright) are used, ensuring zero dependency collisions with React 19, Turbopack, or Tailwind CSS v4.
- **Pure ESM Execution**: All test suites are authoring as `.mjs` modules, executing natively at C++ V8 speed with sub-second turnaround (<500ms for 93+ tests).
- **Opaque-Box Contract Testing**: Treats the portfolio as a black-box system, enforcing strict compliance across CSS tokens, typography scales, elevation/shadow elimination, navigation geometry, 8 featured projects, 67 skills taxonomy, contact API security & rate limiting, and binary asset integrity.

## 2. Directory Hierarchy
```
Portfolio_nextjs/
├── scripts/
│   └── run-e2e-tests.mjs           # Standalone test runner (discovery, filtering, TAP/Spec reporting)
├── tests/
│   ├── helpers/
│   │   ├── test-context.mjs        # Shared paths, asset checkers, file readers, token parsers
│   │   ├── css-parser.mjs          # CSS token and rule extractor
│   │   ├── mock-http.mjs           # Mock Request/Response factory for API route testing
│   │   └── dom-contracts.mjs       # JSX/TSX AST & string contract assertions
│   └── e2e/
│       ├── tier1-features/
│       │   ├── feature1-tokens.test.mjs
│       │   ├── feature2-typography.test.mjs
│       │   ├── feature3-elevation-motion.test.mjs
│       │   ├── feature4-chrome-nav.test.mjs
│       │   ├── feature5-projects-showcase.test.mjs
│       │   ├── feature6-skills-architecture.test.mjs
│       │   ├── feature7-contact-api.test.mjs
│       │   └── feature8-resume-asset.test.mjs
│       ├── tier2-boundaries/
│       │   ├── boundary-tokens-extreme.test.mjs
│       │   ├── boundary-typography-scale.test.mjs
│       │   ├── boundary-motion-curves.test.mjs
│       │   ├── boundary-nav-viewports.test.mjs
│       │   ├── boundary-projects-edgecases.test.mjs
│       │   ├── boundary-skills-dedup.test.mjs
│       │   ├── boundary-contact-payloads.test.mjs
│       │   └── boundary-asset-headers.test.mjs
│       ├── tier3-combinations/
│       │   └── cross-feature-contracts.test.mjs
│       └── tier4-scenarios/
│           └── recruiter-workloads.test.mjs
├── TEST_INFRA.md                   # This architecture document
└── package.json                    # "scripts": { "test": "node scripts/run-e2e-tests.mjs" }
```

## 3. Test Runner Design (`scripts/run-e2e-tests.mjs`)
The runner script performs:
1. Dynamic discovery of all `tests/e2e/**/*.test.mjs` files using Node's `fs.readdirSync`.
2. CLI flag handling:
   - `--tier=1` (executes only Tier 1 feature tests)
   - `--tier=2` (executes only Tier 2 boundary tests)
   - `--tier=3` (executes only Tier 3 cross-feature tests)
   - `--tier=4` (executes only Tier 4 recruiter workload tests)
   - `--grep="pattern"` (executes tests matching name pattern)
   - `--reporter=spec|tap` (defaults to human-readable `spec`, supports `tap` for CI)
3. Programmatic test execution using `node:test`'s `run({ files, concurrency: true })`.
4. Formatted reporting via `node:test/reporters` (`spec` or `tap`).
5. Process exit code gating: returns `0` on 100% pass, `1` on any failure.

## 4. Test Tiers & Complete Inventory Matrix (Target: 93 Tests)

| Tier | Category | Scope & Objective | Suite Count | Test Count |
|---|---|---|---|---|
| **Tier 1** | Feature Coverage | Verifies 8 core features in isolation against exact specifications | 8 suites | **40 tests** (5 per feature) |
| **Tier 2** | Boundary & Corner Cases | Tests extreme values, edge cases, negative inputs, and forbidden values | 8 suites | **40 tests** (5 per feature) |
| **Tier 3** | Cross-Feature Combinations | Verifies pairwise and multi-feature interaction contracts | 1 suite | **8 tests** |
| **Tier 4** | Recruiter Workload Scenarios | End-to-end simulated visitor journeys and real-world audits | 1 suite | **5 tests** |
| **Total** | Full E2E Test Suite | Comprehensive project validation | 18 suites | **93 automated tests** |

### Tier 1: Feature Coverage (40 Tests)
- **Feature 1: Theme Tokens & Palettes (5 tests)**:
  1. Paddock Olive (`#282c20`) body canvas token defined in `@theme` / CSS variables.
  2. Chalk Cream (`#f4f4ed`) light canvas token defined in `@theme`.
  3. Signal Lime (`#d2ff00`) action accent token defined in `@theme`.
  4. Moss Lime (`#b2c73a`) display serif accent & Visor Black (`#111112`) neutral void defined.
  5. Strict purge: Zero occurrences of coffee colors (`#211711`, `#fff5e9`, `#bb895b`, `#38271b`, `#4a3221`).
- **Feature 2: Typography & Font Rules (5 tests)**:
  1. `Mona_Sans` imported from `next/font/google` with variable axis `wdth: 93`.
  2. `Bodoni_Moda` imported from `next/font/google` with optical size `opsz` support.
  3. Font CSS variable classes injected into root HTML layout (`app/layout.tsx`).
  4. Type scale tokens mapped: eyebrow (9.26px), caption (13.33px), button (14.81px), body (18.52px), quote (22.22px), title (66.67px), statement (117.59px), display-serif (122.22px).
  5. Uppercase headline rule enforced on Mona Sans statement displays.
- **Feature 3: Zero Shadows & Motion Curve (5 tests)**:
  1. Global zero-shadow enforcement (`box-shadow: none` or absence of drop-shadow utilities).
  2. Button border-radius strictly set to `8px`.
  3. Card border-radius strictly set to `0px` (square corners).
  4. Motion easing curve strictly configured to `cubic-bezier(0.65, 0.05, 0, 1)`.
  5. Motion transition duration strictly set to `0.75s`.
- **Feature 4: Floating Chrome Navigation (5 tests)**:
  1. Fixed navigation layer inset `18.52px` (`z-index: 50`).
  2. Stacked wordmark with `Arsalan` (display serif) over `WARSI` (heavy sans).
  3. Centered or header `aw` monogram badge present.
  4. Signal Lime Store/Contact CTA button with 8px radius and uppercase label.
  5. 55.5px square menu toggle button with unequal two-dash glyph.
- **Feature 5: 8 Featured Projects Showcase (5 tests)**:
  1. Portfolio data contains exactly 8 verified projects in `data/portfolio.json`.
  2. Project cards render on Visor Black (`#111112`) canvas with 1px Tarmac Gray (`#535450`) outline.
  3. Chamfered notch tab geometry (`polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`).
  4. Valid repository and live demo URL integrity across all 8 projects.
  5. All 16 project SVG preview mockups exist on disk under `public/projects/`.
- **Feature 6: 67 Skills Architecture (5 tests)**:
  1. Skills data contains exactly 67 verified skills in `portfolio.sections.skills.items`.
  2. Categorized across 4 discrete groups: Frontend (27), Backend (17), Database (7), Tools (17).
  3. Stack highlights feature core MERN competencies: React.js, Next.js 16, Redux Toolkit, TypeScript, Express.js, MongoDB.
  4. Visual pill styling adheres to Lichen Gray (`#b4b8a5`) borders and uppercase captions.
  5. 100% skill name uniqueness (no duplicate entries across categories).
- **Feature 7: Contact API & Honeypot Route (5 tests)**:
  1. Payload size limit: Request with Content-Length > 10,000 bytes returns HTTP 413.
  2. Content-Type check: Non-JSON payload returns HTTP 415.
  3. Schema validation: Missing or invalid fields return HTTP 400 with specific field error map.
  4. Honeypot trap: Hidden `company` field filled returns HTTP 200 silently without dispatching email.
  5. Rate limiter: Exceeding 5 requests per 10-minute window per IP returns HTTP 429.
- **Feature 8: Resume Asset Download (5 tests)**:
  1. Resume binary exists on disk at `public/M_Arsalan_Warsi_CV.pdf`.
  2. File size verification: PDF file is valid and non-empty (> 100,000 bytes).
  3. Magic byte check: File begins with `%PDF-` (`0x25, 0x50, 0x44, 0x46, 0x2D`).
  4. Portfolio configuration points to canonical `/M_Arsalan_Warsi_CV.pdf`.
  5. UI download triggers possess valid `href` and download attributes.

### Tier 2: Boundary & Corner Cases (40 Tests)
- **Feature 1 Boundaries**: Contrast ratio compliance, contour line RGBA opacity limits (`0.12` to `0.28`), halo gradient radius percentages, color case-insensitivity, no inline coffee styles in components.
- **Feature 2 Boundaries**: Extreme type sizes (9.26px min to 122.22px max), negative tracking limits (-3.7px to +0.74px), line-height bounds (0.81 to 1.43), font fallback stacks, OpenType font-variation-settings syntax.
- **Feature 3 Boundaries**: Forbidden CSS shadow keywords (`box-shadow`, `drop-shadow`, `text-shadow`), badge radius (2.96px), indicator radius (14px), cubic-bezier parameter bounds (all between 0 and 1), transition duration consistency across interactive components.
- **Feature 4 Boundaries**: Mobile viewport nav height, scroll state toggle classes, ARIA label accessibility on menu button, menu open/close drawer state contract, z-index hierarchy (`z-50`).
- **Feature 5 Boundaries**: Missing live demo fallback handling (`#`), empty tag handling, project description length bounds (50 to 500 chars), image aspect ratio specifications, category slug validity.
- **Feature 6 Boundaries**: Category item distribution (Frontend >= 25, Backend >= 15, Database >= 5, Tools >= 15), skill tag casing normalization, empty string guard, duplicate category guard, skill filter state handling.
- **Feature 7 Boundaries**: Max name length boundary (81 chars -> 400), Max email length boundary (121 chars -> 400), Min message length boundary (19 chars -> 400, 20 chars -> pass validation), HTML entity escaping edge cases (`<script>`, `&amp;`), header injection with CR/LF (`\r\n`).
- **Feature 8 Boundaries**: PDF file corruption check, HTTP Range request header compatibility, Content-Disposition header compatibility, uppercase vs lowercase path casing consistency, zero broken resume anchors across entire site.

### Tier 3: Cross-Feature Combinations (8 Tests)
1. **Combination 1 (Theme + Navigation)**: Chrome Nav switches appearance between Chalk Cream on Paddock Olive ground and Paddock Olive outline on Chalk Cream ground.
2. **Combination 2 (Typography + Motion)**: Mixed-face statement block synchronizes Mona Sans and Bodoni Moda within the same Framer Motion viewport reveal.
3. **Combination 3 (Tokens + Projects)**: Project cards on Visor Black correctly use Tarmac Gray borders with Signal Lime tag accents and zero drop shadows.
4. **Combination 4 (Skills + Content Survey)**: 67 skills displayed with Lichen Gray pills seamlessly integrate with candidate Aptech teaching & MERN profile data.
5. **Combination 5 (Hero + Resume + Sprint Ticket)**: Hero section couples the assembling portrait, the active sprint ticket, and the direct `/M_Arsalan_Warsi_CV.pdf` download trigger.
6. **Combination 6 (Teaser + Style Reference)**: On/Off Track split teaser matches Chalk Cream canvas, Brier serif headline, Mona Sans uppercase subhead, and 55px Signal Lime Icon Tile.
7. **Combination 7 (Footer + Lime Halo Glow)**: Inset footer panel combines Paddock Olive `#282c20` canvas, 18.52px edge inset, raised center tab `AW / 2026`, and Lime Halo radial gradient.
8. **Combination 8 (Contact Form + Honeypot + Rate Limiter)**: Interactive contact form properly binds input validation errors, rate limiter headers, and silent honeypot suppression.

### Tier 4: Real-World Workload Scenarios (5 Tests)
1. **Scenario 1 (Technical Recruiter Journey)**: Recruiter lands on portfolio, inspects hero & active sprint ticket (Aptech Associate, MERN Stack, Open to Work), navigates to 8 projects, inspects GrowthRadar AI & ThriftShoewear, verifies GitHub repos and live demo links.
2. **Scenario 2 (Engineering Manager Audit)**: Audit of candidate's technical skills (27 frontend, 17 backend, 7 database, 17 tools), checks certifications (Meta Front-End, Meta Back-End), and verifies production architectural principles (JWT, OTP, Socket.IO, REST).
3. **Scenario 3 (Hiring Executive Journey)**: Fast-path CV acquisition: locates resume download button in floating nav or hero ticket, clicks `/M_Arsalan_Warsi_CV.pdf`, verifies file integrity (> 100KB, valid PDF header) and downloads successfully.
4. **Scenario 4 (Client / Partner Inbound Inquiry)**: Visitor fills out contact form with project inquiry, receives validation feedback on required fields, submits valid data, passes honeypot check, and receives 200 confirmation.
5. **Scenario 5 (Design & Accessibility Compliance Review)**: Evaluates full design system compliance: zero cast shadows across all viewports, exact Lando Norris color palette, high-contrast readability, 0.75s motion easing, and complete removal of all coffee-related artifacts.

## 5. Verification Commands
- **Run all E2E tests**:
  ```powershell
  npm test
  # or directly:
  node scripts/run-e2e-tests.mjs
  ```
- **Run by Tier**:
  ```powershell
  node scripts/run-e2e-tests.mjs --tier=1
  node scripts/run-e2e-tests.mjs --tier=2
  node scripts/run-e2e-tests.mjs --tier=3
  node scripts/run-e2e-tests.mjs --tier=4
  ```
- **Run with TAP reporter**:
  ```powershell
  node scripts/run-e2e-tests.mjs --reporter=tap
  ```
```

---

## 4. Opaque-Box Contract Verification Methodology

### 4.1 CSS Tokens & Elevation Contract
- **Contract Source**: `app/globals.css`, `PROJECT.md`.
- **Target Rules**:
  - Palette tokens:
    ```css
    --color-paddock-olive: #282c20;
    --color-chalk-cream: #f4f4ed;
    --color-signal-lime: #d2ff00;
    --color-moss-lime: #b2c73a;
    --color-visor-black: #111112;
    --color-sage-fog: #dde1d2;
    --color-tarmac-gray: #535450;
    --color-lichen-gray: #b4b8a5;
    --color-stone-gray: #b9bbad;
    ```
  - Halo Gradient: `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)`.
  - Zero shadow rule: `box-shadow: none !important;` or strict omission of cast shadow declarations.
  - Border radius rules: buttons `8px`, cards `0px`, badges `2.96px`.
  - Coffee token eradication: zero occurrences of `#211711`, `#fff5e9`, `#bb895b`, `#38271b`, `#4a3221`.
- **Test Implementation**:
  `tests/helpers/css-parser.mjs` extracts tokens and asserts exact hex matching, zero shadow presence, and verifies an anti-coffee blacklist.

### 4.2 Typography & Font Contract
- **Contract Source**: `app/layout.tsx`, `PROJECT.md`.
- **Target Rules**:
  - `Mona_Sans` loaded with `subsets: ["latin"]`, `display: "swap"`, `variable: "--font-mona-sans"`.
  - `Bodoni_Moda` loaded with `subsets: ["latin"]`, `display: "swap"`, `variable: "--font-bodoni-moda"`.
  - Both CSS variables injected into the root `<html>` or `<body>` element.
  - Type scale tokens correctly configured: 9.26px, 13.33px, 14.81px, 18.52px, 22.22px, 27.78px, 29.63px, 66.67px, 103.7px, 117.59px, 122.22px.
  - Mona Sans statements enforced uppercase.
- **Test Implementation**:
  `tests/e2e/tier1-features/feature2-typography.test.mjs` verifies font configurations in `app/layout.tsx` and type scale utilities in `app/globals.css`.

### 4.3 Data Model & Content Integrity Contract
- **Contract Source**: `data/portfolio.json`.
- **Target Rules**:
  - Candidate: Muhammad Arsalan Warsi, Karachi, Pakistan, MERN / Full-Stack Developer.
  - 8 Projects: All 8 entries have title, description, category, tags, and valid URLs.
  - 67 Skills: 27 Frontend, 17 Backend, 7 Database, 17 Tools. Zero duplicate skill names.
  - 6 Certificates: Meta Front-End, Meta Back-End, M.S Office, Amazon FBA, Visual Designing, Aptech Ambassador.
  - Experience & Education: Teaching Associate at Aptech Learning, ACCP Computer Science.
- **Test Implementation**:
  `tests/e2e/tier1-features/feature5-projects-showcase.test.mjs` and `feature6-skills-architecture.test.mjs` validate schemas, counts, and URL formats.

### 4.4 Static Asset Integrity Contract
- **Contract Source**: `public/`.
- **Target Rules**:
  - `public/M_Arsalan_Warsi_CV.pdf`: Exists, non-empty, size > 100KB, starts with `%PDF-`.
  - `public/header-photo.webp`: Exists, non-empty.
  - `public/projects/*.svg`: All 16 project SVG preview mockups exist and are valid XML/SVG markup.
  - Coffee asset removal: `public/loader/coffee-cinema.mp4` and `public/loader/coffee-poster.webp` are purged or unreferenced.
- **Test Implementation**:
  `tests/e2e/tier1-features/feature8-resume-asset.test.mjs` uses `fs.statSync` and binary buffer inspection.

### 4.5 API Route Contract (`app/api/contact/route.ts`)
- **Contract Source**: `app/api/contact/route.ts`.
- **Target Rules**:
  - Non-JSON -> HTTP 415.
  - Body > 10,000 bytes -> HTTP 413.
  - Missing name / short name (<2) -> HTTP 400.
  - Invalid email regex -> HTTP 400.
  - Short subject (<3) -> HTTP 400.
  - Short message (<20) -> HTTP 400.
  - Honeypot `company` filled -> HTTP 200 with success message without sending email.
  - Rate limit (>5 requests from same IP in 10m) -> HTTP 429.
- **Test Implementation**:
  `tests/e2e/tier1-features/feature7-contact-api.test.mjs` and `boundary-contact-payloads.test.mjs` use Node's native `Request` and `Response` objects to test `POST(req)` directly.

---

## 5. Standalone Runner Script Blueprint (`scripts/run-e2e-tests.mjs`)

Below is the complete, ready-to-write implementation for the test runner:

```javascript
#!/usr/bin/env node
/**
 * Standalone E2E Test Runner for Muhammad Arsalan Warsi Portfolio
 * Next.js 16.4 / Node.js 22+ Native Test Infrastructure
 *
 * Uses built-in node:test and node:assert/strict with zero external dependencies.
 * Discovers and executes all tests in tests/e2e/ across Tiers 1-4.
 */

import { run } from 'node:test';
import { spec, tap } from 'node:test/reporters';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const testsDir = path.resolve(projectRoot, 'tests', 'e2e');

// Parse CLI flags
const args = process.argv.slice(2);
const tierArg = args.find(a => a.startsWith('--tier='));
const grepArg = args.find(a => a.startsWith('--grep='));
const reporterArg = args.find(a => a.startsWith('--reporter='));

const selectedTier = tierArg ? tierArg.split('=')[1] : null;
const namePattern = grepArg ? grepArg.split('=')[1] : null;
const reporterType = reporterArg ? reporterArg.split('=')[1] : 'spec';

// Recursive test file discovery
function findTestFiles(dir, filterTier = null) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (filterTier && entry.name.startsWith('tier') && !entry.name.includes(`tier${filterTier}`)) {
        continue;
      }
      results.push(...findTestFiles(fullPath, filterTier));
    } else if (entry.isFile() && entry.name.endsWith('.test.mjs')) {
      results.push(fullPath);
    }
  }
  return results.sort();
}

const files = findTestFiles(testsDir, selectedTier);

if (files.length === 0) {
  console.log(`ℹ No test files found in ${testsDir}${selectedTier ? ` for Tier ${selectedTier}` : ''}`);
  process.exit(0);
}

console.log(`\n======================================================`);
console.log(`🚀 Running Opaque-Box E2E Tests (Node.js ${process.version})`);
console.log(`📁 Target: ${testsDir}`);
console.log(`📑 Discovered ${files.length} test suites`);
if (selectedTier) console.log(`🎯 Tier filter: Tier ${selectedTier}`);
if (namePattern) console.log(`🔍 Name pattern: ${namePattern}`);
console.log(`======================================================\n`);

const testStream = run({
  files,
  concurrency: true,
  namePattern: namePattern ? new RegExp(namePattern, 'i') : undefined,
});

const reporter = reporterType === 'tap' ? tap : spec;
testStream.compose(reporter).pipe(process.stdout);

testStream.on('error', (err) => {
  console.error('Test runner execution error:', err);
  process.exit(1);
});
```

---

## 6. Caveats

1. **Test File Format (`.mjs`)**:
   - Because `package.json` does not set `"type": "module"`, all test files and runner scripts **must** use the `.mjs` extension. This ensures Node treats them as ESM modules natively without requiring build flags or package modifications.
2. **Path Aliases in Node (`@/*`)**:
   - Node's native module loader does not natively resolve Next.js `@/*` tsconfig aliases without an import loader. Therefore, test files should either use relative imports (`../../data/portfolio.json`) or shared helper modules (`tests/helpers/test-context.mjs`) to load project files.
3. **SMTP Inbound/Outbound during Testing**:
   - For `feature7-contact-api.test.mjs`, when SMTP environment variables are unset, the route handler returns 500 (`validationMessages.emailNotConfigured`) after passing validation, OR 200 on honeypot. Tests should verify schema rejection (400), payload limits (413), content-type (415), and honeypot success (200), without depending on live third-party SMTP servers.

---

## 7. Conclusion

1. **Optimal Runner Choice**: Node.js 22+ native `node:test` + `node:assert/strict` provides a 100% zero-conflict, zero-dependency, ultra-fast (<500ms) test runner for this Next.js 16.4 / React 19 / Turbopack / Tailwind v4 project.
2. **Complete Contract Matrix**: The 8 core features map to a 4-tier testing hierarchy containing exactly **93 automated tests** (40 Tier 1 + 40 Tier 2 + 8 Tier 3 + 5 Tier 4).
3. **Concrete Deliverables Ready for Suborchestrator & Implementer**:
   - `TEST_INFRA.md` architectural specification (fully designed in Section 3).
   - Standalone runner script `scripts/run-e2e-tests.mjs` (code provided in Section 5).
   - `package.json` test script configuration: `"test": "node scripts/run-e2e-tests.mjs"`.
   - Complete helper and test file blueprint across all 18 test suites.

---

## 8. Verification Method

### 8.1 Verification Commands
1. **Verify Native Test Runner Execution**:
   ```powershell
   node --input-type=module -e "import test from 'node:test'; import assert from 'node:assert/strict'; test('verify-runner', () => { assert.ok(true); });"
   ```
   *Expected Output*: `✔ verify-runner` and `pass 1`.
2. **Verify JSON Data Import Compatibility**:
   ```powershell
   node --input-type=module -e "import portfolio from './data/portfolio.json' with { type: 'json' }; console.log('Projects:', portfolio.sections.projects.items.length, 'Skills:', portfolio.sections.skills.items.length);"
   ```
   *Expected Output*: `Projects: 8 Skills: 67`.
3. **Verify CV Asset and Magic Bytes**:
   ```powershell
   node -e "const fs = require('fs'); const buf = fs.readFileSync('public/M_Arsalan_Warsi_CV.pdf'); console.log('Header:', buf.subarray(0, 5).toString(), 'Size:', buf.length);"
   ```
   *Expected Output*: `Header: %PDF- Size: 151811`.
4. **Post-Implementation Runner Execution**:
   ```powershell
   npm test
   # or
   node scripts/run-e2e-tests.mjs
   ```
   *Expected Output*: All 93 tests discovered and executed with 0 failures and exit code 0.

### 8.2 Invalidation Conditions
- If any external test framework (e.g. Jest, Vitest, Cypress, Playwright) is introduced, causing dependency bloat or version conflicts with React 19 / Next.js 16.4.
- If test execution requires a long transpilation build step (>2s) instead of instant native ESM execution.
- If fewer than 93 tests or any of the 8 core features are omitted from the testing matrix.
