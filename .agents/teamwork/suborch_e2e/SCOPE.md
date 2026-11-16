# Scope: suborch_e2e (Opaque-Box E2E Testing Track)

## Architecture
- **Framework**: Next.js 16.4.0 (Turbopack, App Router, Node.js 22)
- **Test Runner**: Node.js native test runner (`node:test`, `node:assert`, executable via `npm test` or `node --test tests/e2e/**/*.test.mjs` / `scripts/test-runner.mjs`)
- **Testing Approach**: Requirement-driven, opaque-box testing. Tests verify DOM contracts, style token compliance, route API responses, asset accessibility, and user flows against `ORIGINAL_REQUEST.md` and `PROJECT.md`.
- **Artifacts**: `TEST_INFRA.md`, `TEST_READY.md`, test suites under `tests/e2e/` or `tests/`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Theme Tokens & Palettes | Verify exact hex values for Paddock Olive, Chalk Cream, Signal Lime, Moss Lime, Visor Black, etc. | E2 | Style Spec |
| 2 | Typography & Font Loading | Verify Mona Sans, Bodoni Moda integration, font variables, and type scale definitions | E2 | Style Spec |
| 3 | Zero Shadows & Motion Curve | Verify absence of drop shadows (`box-shadow: none`) and 0.75s cubic-bezier easing curve | E2 | Style Spec |
| 4 | Floating Chrome Navigation | Fixed layer inset 18.52px, wordmark, AW monogram, Signal Lime CTA, 55.5px menu toggle | E2 | Style Spec |
| 5 | 8 Featured Projects Showcase | 8 projects, Visor Black cards, chamfered notch tabs, valid GitHub and live URLs | E2 | Content Survey |
| 6 | 67 Skills Architecture | Highlighting 67 skills across Frontend, Backend, Database, Tools with Lichen Gray pills | E2 | Content Survey |
| 7 | Contact API & Honeypot Route | Validation rules, rate-limiting, honeypot spam guard silently returning 200 | E2 | API Spec |
| 8 | Resume Asset Download | Valid `/M_Arsalan_Warsi_CV.pdf` file accessibility and download trigger | E2 | Content Survey |

## Test Tiers & Target Counts
- **Tier 1: Feature Coverage (≥5 tests per feature)**: 8 features × 5 = ≥40 tests
- **Tier 2: Boundary & Corner Cases (≥5 tests per feature)**: 8 features × 5 = ≥40 tests
- **Tier 3: Cross-Feature Combinations (pairwise interactions)**: ≥8 tests
- **Tier 4: Real-World Workload Scenarios**: ≥5 tests
- **Total Minimum Target**: ≥93 automated tests

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E1 | Test Infrastructure & Runner | Design test directory layout, standalone test runner script, npm test script, and publish TEST_INFRA.md | none | IN_PROGRESS |
| E2 | Tier 1 Feature Coverage Tests | Implement ≥40 tests verifying features 1-8 in isolation | E1 | PLANNED |
| E3 | Tier 2 Boundary & Tier 3 Combinations | Implement ≥40 boundary tests and ≥8 cross-feature interaction tests | E2 | PLANNED |
| E4 | Tier 4 Recruiter Workload Scenarios | Implement ≥5 real-world recruiter and visitor journeys | E3 | PLANNED |
| E5 | Verification & TEST_READY.md | Execute full test suite, verify 100% pass, generate TEST_READY.md, final handoff | E4 | PLANNED |

## Interface Contracts
### Test Runner Invocation
- Command: `npm test` or `node scripts/run-e2e-tests.mjs`
- Output: TAP / formatted summary reporting passing tests, failing tests, and tier breakdown.
- Exit code: `0` on 100% pass, non-zero on any failure.
