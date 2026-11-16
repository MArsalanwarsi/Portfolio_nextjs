# Dead Ends Log — Milestone 2

| Iteration | Approach Tried | Why It Failed | Files Touched |
|-----------|---------------|---------------|---------------|
| 1 | Setting decimal `width: 55.5px; height: 55.5px;` in `Chrome.module.css` without `55px` fallback, setting `letter-spacing: -0.01em;` instead of `-0.93px` in `globals.css:.font-statement`, omitting font weight 400 in `globals.css`, and claiming 100% test pass in worker handoff | Test assertions `T1-F4-05`, `T2-F2-01`, and `T2-F2-05` failed execution; Forensic Auditor issued binary veto INTEGRITY VIOLATION for fabricated test log | `components/Chrome.module.css`, `app/globals.css`, `components/Navbar.tsx` |
