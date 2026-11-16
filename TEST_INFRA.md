# Test Infrastructure Specification: Opaque-Box E2E Testing Suite

## 1. Overview & Architectural Philosophy
This test suite provides requirement-driven, opaque-box end-to-end verification for the **Muhammad Arsalan Warsi Portfolio Redesign (Lando Norris Aesthetic)** on Next.js 16.4 / Node.js 22+.

- **Zero-Dependency Guarantee**: Powered exclusively by Node.js built-in `node:test` and `node:assert/strict`. No external runners (Jest, Vitest, Cypress, Playwright) are used, eliminating all dependency collisions with React 19, Turbopack, and Tailwind CSS v4.
- **Pure ESM Execution**: All test suites are authored as `.mjs` modules, executing natively at C++ V8 speed with sub-second turnaround (<500ms for 97 tests).
- **Opaque-Box Contract Testing**: Treats the portfolio as a black-box system, enforcing strict compliance across CSS tokens, typography scales, elevation/shadow elimination, navigation geometry, 8 featured projects, 67 skills taxonomy, contact API security & rate limiting, and binary asset integrity.

## 2. Directory Hierarchy
```
Portfolio_nextjs/
├── scripts/
│   └── run-e2e-tests.mjs                             # Standalone test runner (discovery, filtering, TAP/Spec reporting)
├── tests/
│   ├── helpers/
│   │   └── test-context.mjs                          # Shared paths, asset checkers, file readers, token parsers
│   └── e2e/
│       ├── tier1-features/
│       │   ├── feature1-tokens.test.mjs              # 6 tests: Palette tokens, ground alternation, coffee purge
│       │   ├── feature2-typography.test.mjs          # 5 tests: Mona Sans, Bodoni Moda, type scale, uppercase
│       │   ├── feature3-elevation-motion.test.mjs    # 5 tests: Zero shadows, 8px buttons, 0.75s cubic-bezier
│       │   ├── feature4-chrome-nav.test.mjs          # 5 tests: 18.52px inset, wordmark, monogram, 55.5px CTA
│       │   ├── feature5-projects-showcase.test.mjs   # 5 tests: 8 projects, 16 SVGs, URLs, Visor Black
│       │   ├── feature6-skills-architecture.test.mjs # 5 tests: 67 skills, 4 partitions, highlights, pills
│       │   ├── feature7-contact-api.test.mjs         # 5 tests: Schema, 415 type, 400 JSON, 200 honeypot, 400 empty
│       │   └── feature8-resume-asset.test.mjs        # 5 tests: public PDF exists, size, %PDF- header, link integrity
│       ├── tier2-boundaries/
│       │   ├── boundary-tokens-extreme.test.mjs      # 5 tests: Hex normalization, section fills, serif voice, dark text
│       │   ├── boundary-typography-scale.test.mjs    # 5 tests: System fallbacks, baseline collision, clamp, mobile tracking
│       │   ├── boundary-motion-curves.test.mjs       # 5 tests: Filter shadows, hover shadows, reduced motion, chamfer
│       │   ├── boundary-nav-viewports.test.mjs       # 5 tests: Mobile width budget, dark/light switch, Escape key, transparent nav
│       │   ├── boundary-projects-edgecases.test.mjs  # 5 tests: Private repo '#', missing images, text wrap, special chars
│       │   ├── boundary-skills-dedup.test.mjs        # 5 tests: Empty category, 100% unique names, name length, icon fallback
│       │   ├── boundary-contact-payloads.test.mjs    # 6 tests: 413 max size, name/subject/message lengths, CRLF, XSS
│       │   └── boundary-asset-headers.test.mjs       # 5 tests: File casing, >100KB size, %%EOF marker, local root path, clean name
│       ├── tier3-combinations/
│       │   └── cross-feature-contracts.test.mjs      # 10 tests: Pairwise interactions & cross-component contracts
│       └── tier4-scenarios/
│           └── recruiter-workloads.test.mjs          # 5 tests: Real-world recruiter, architect, student, mobile, auditor journeys
├── TEST_INFRA.md                                     # This architecture document
└── package.json                                      # "scripts": { "test": "node scripts/run-e2e-tests.mjs" }
```

## 3. Test Runner Design (`scripts/run-e2e-tests.mjs`)
The runner script performs:
1. Dynamic recursive discovery of all `tests/e2e/**/*.test.mjs` files using Node's `fs.readdirSync`.
2. CLI flag handling:
   - `--tier=1` (executes only Tier 1 feature coverage tests)
   - `--tier=2` (executes only Tier 2 boundary tests)
   - `--tier=3` (executes only Tier 3 cross-feature combinations)
   - `--tier=4` (executes only Tier 4 recruiter workload scenarios)
   - `--grep="pattern"` (executes tests matching name pattern)
   - `--reporter=spec|tap` (defaults to human-readable `spec`, supports `tap` for CI)
3. Programmatic test execution using `node:test`'s `run({ files, concurrency: true })`.
4. Formatted reporting via `node:test/reporters` (`spec` or `tap`).
5. Process exit code gating: returns `0` on 100% pass, `1` on any failure.

## 4. Test Tiers & Complete Inventory Matrix (Target: 97 Tests)

| Tier | Category | Scope & Objective | Suite Count | Test Count |
|---|---|---|---|---|
| **Tier 1** | Feature Coverage | Verifies 8 core features in isolation against exact specifications | 8 suites | **41 tests** |
| **Tier 2** | Boundary & Corner Cases | Tests extreme values, edge cases, negative inputs, and forbidden values | 8 suites | **41 tests** |
| **Tier 3** | Cross-Feature Combinations | Verifies pairwise and multi-feature interaction contracts | 1 suite | **10 tests** |
| **Tier 4** | Recruiter Workload Scenarios | End-to-end simulated visitor journeys and real-world audits | 1 suite | **5 tests** |
| **Total** | Full E2E Test Suite | Comprehensive project validation | 18 suites | **97 automated tests** |

### Tier 1: Feature Coverage (41 Tests)
- **Feature 1: Theme Tokens & Palettes (6 tests)**:
  1. `T1-F1-01`: Canvas ground hex tokens (Paddock Olive `#282c20` & Chalk Cream `#f4f4ed`).
  2. `T1-F1-02`: Accent lime hex tokens (Signal Lime `#d2ff00` & Moss Lime `#b2c73a`).
  3. `T1-F1-03`: Dark void & outlines (Visor Black `#111112` & Tarmac Gray `#535450`).
  4. `T1-F1-04`: Secondary palette tokens (Sage Fog `#dde1d2` & Lichen Gray `#b4b8a5`).
  5. `T1-F1-05`: Lime Halo radial gradient token (`radial-gradient(circle at 50% -190%, ...)`).
  6. `T1-F1-06`: Complete purge of coffee brown palette tokens (`#211711`, `#fff5e9`, `#bb895b`, `#38271b`).

- **Feature 2: Typography & Font Rules (5 tests)**:
  1. `T1-F2-01`: Google Font loader configuration in `app/layout.tsx` (`Mona_Sans` & `Bodoni_Moda`).
  2. `T1-F2-02`: Font CSS variable bindings on root HTML/body (`--font-sans`, `--font-serif`).
  3. `T1-F2-03`: Mona Sans width variable settings (`"wdth" 93`).
  4. `T1-F2-04`: Mixed-face statement typography scale (117.59px, tight line-height, negative tracking).
  5. `T1-F2-05`: Body font scale & tracking (18.52px / -0.19px).

- **Feature 3: Zero Shadows & Motion Curve (5 tests)**:
  1. `T1-F3-01`: Global zero box-shadow enforcer (`box-shadow: none !important`).
  2. `T1-F3-02`: Elimination of `shadow-*` utility classes across components.
  3. `T1-F3-03`: Framer Motion Lando easing definition (`cubic-bezier(0.65, 0.05, 0, 1)`).
  4. `T1-F3-04`: Motion duration standard (0.75s / 750ms).
  5. `T1-F3-05`: 1px Tarmac Gray border alternative to cast shadows.

- **Feature 4: Floating Chrome Navigation (5 tests)**:
  1. `T1-F4-01`: Inset fixed layout geometry (18.52px inset, fixed position, high z-index).
  2. `T1-F4-02`: Stacked brand wordmark (Arsalan serif over WARSI heavy sans).
  3. `T1-F4-03`: Centered monogram (`AW`) element present.
  4. `T1-F4-04`: Signal Lime CTA button dimensions (55.5px high, 8px radius, uppercase).
  5. `T1-F4-05`: Square menu toggle button (55.5px square with unequal 2-dash icon).

- **Feature 5: 8 Featured Projects Showcase (5 tests)**:
  1. `T1-F5-01`: Exact 8 projects inventory verification in `data/portfolio.json`.
  2. `T1-F5-02`: 16 SVG project image mockup assets exist in `public/projects/`.
  3. `T1-F5-03`: Project tech stack non-empty arrays with ≥3 technologies each.
  4. `T1-F5-04`: Project repository & live URLs format validity.
  5. `T1-F5-05`: Project card Visor Black void ground & chamfer notch geometry.

- **Feature 6: 67 Skills Architecture (5 tests)**:
  1. `T1-F6-01`: Total skills count invariant (exactly 67 skills).
  2. `T1-F6-02`: 4-category partition integrity (Frontend 27, Backend 16/17, Database 7, Tools 17).
  3. `T1-F6-03`: Stack highlights subsumption (all 6 highlights exist in skills items).
  4. `T1-F6-04`: Skill pill visual styling tokens (Lichen Gray `#b4b8a5`).
  5. `T1-F6-05`: Lucide icon key validity (non-empty string icons).

- **Feature 7: Contact Form API & Honeypot Route (5 tests)**:
  1. `T1-F7-01`: Payload validation schema execution on valid inputs.
  2. `T1-F7-02`: Content-Type enforcement (HTTP 415 on non-JSON).
  3. `T1-F7-03`: Malformed JSON body handling (HTTP 400).
  4. `T1-F7-04`: Honeypot silent HTTP 200 success when `company` is filled.
  5. `T1-F7-05`: Empty payload validation failure (HTTP 400 with field errors).

- **Feature 8: Resume Asset Download (5 tests)**:
  1. `T1-F8-01`: Resume file physical existence at `public/M_Arsalan_Warsi_CV.pdf`.
  2. `T1-F8-02`: Resume file size integrity (>100,000 bytes).
  3. `T1-F8-03`: PDF binary header magic bytes (`%PDF-`).
  4. `T1-F8-04`: Portfolio configuration resume URL path points to `/M_Arsalan_Warsi_CV.pdf`.
  5. `T1-F8-05`: Resume link anchor attributes in UI components.

### Tier 2: Boundary & Corner Cases (41 Tests)
- **Feature 1 Boundaries (5 tests)**: Hex code normalization, Signal Lime section isolation, Moss Lime for serif on dark, Paddock Olive dark text, viewport meta themeColor `#282c20`.
- **Feature 2 Boundaries (5 tests)**: Font fallback chains, mixed-face baseline alignment, responsive typography clamp, uppercase transform, negative tracking mobile guard.
- **Feature 3 Boundaries (5 tests)**: Rejection of `filter: drop-shadow`, hover/focus state shadow rejection, `prefers-reduced-motion` query, cubic-bezier coordinate bounds, chamfer notch polygon formula.
- **Feature 4 Boundaries (5 tests)**: Mobile viewport inset width budget, dynamic theme reactive menu state, Escape key closes menu, transparent nav root layer, unequal 2-dash glyph lengths.
- **Feature 5 Boundaries (5 tests)**: Private repo `#` link graceful handling, missing image graceful fallback, ultra-long description text wrap, special characters in tech stack, responsive grid column breakpoints.
- **Feature 6 Boundaries (5 tests)**: Empty category filter fallback, duplicate skill name guard (100% unique), longest skill name containment, missing icon fallback safety, category sum invariant under mutation.
- **Feature 7 Boundaries (6 tests)**: Max Content-Length boundary (>10000 -> 413), name boundary lengths (<2, 2..80, >80), subject boundary lengths (<3, 3..120, >120), message boundary lengths (<20, 20..2000, >2000), CRLF header injection stripping, HTML entity escaping.
- **Feature 8 Boundaries (5 tests)**: File name case sensitivity match, non-zero file size check, trailing `%%EOF` marker, local root path vs external dead link, clean file name without encoded spaces.

### Tier 3: Cross-Feature Combinations (10 Tests)
1. `T3-COMB-01`: Chrome Nav dynamic theme switcher × Surface ground alternation.
2. `T3-COMB-02`: Project case study modal dialog × Chrome Nav z-index & focus trap.
3. `T3-COMB-03`: Contact route honeypot × Client UI success state machine.
4. `T3-COMB-04`: Navigation menu full-screen dialog × Lando motion curve easing.
5. `T3-COMB-05`: Visor Black project cards × Chamfer geometry × Zero drop shadows.
6. `T3-COMB-06`: 67 Skills architecture × Category counts × Lichen Gray pills.
7. `T3-COMB-07`: Resume download route × Cross-component links synchronization.
8. `T3-COMB-08`: API route rate limiting × Rapid submissions × Input value retention.
9. `T3-COMB-09`: Active sprint ticket widget × Hero scroll parallax scale.
10. `T3-COMB-10`: Mixed-face statement block × Dual font alignment & WCAG contrast.

### Tier 4: Real-World Workload Scenarios (5 Tests)
1. `T4-SCEN-01`: Technical Talent Recruiter Evaluation Journey.
2. `T4-SCEN-02`: Engineering Lead Architectural Audit Journey.
3. `T4-SCEN-03`: Aptech Mentee & Junior Developer Journey.
4. `T4-SCEN-04`: Mobile Recruiter On-the-Go Journey (Viewport 375x812 / 390x844).
5. `T4-SCEN-05`: Security, Quality & Style Purity Auditor Journey.

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
