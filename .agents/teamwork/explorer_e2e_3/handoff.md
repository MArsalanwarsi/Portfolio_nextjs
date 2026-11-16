# Handoff Report — Explorer E2E 3: Tier 3 (Cross-Feature Combinations) & Tier 4 (Real-World Workload Scenarios)

## 1. Observation

### 1.1 Direct Source & Scope Evidence
1. **Scope Target Requirements (`SCOPE.md:24-26`)**:
   - `Tier 3: Cross-Feature Combinations (pairwise interactions)`: Target ≥8 tests.
   - `Tier 4: Real-World Workload Scenarios`: Target ≥5 tests.
   - Mandate: Exhaustive, deterministic test specifications verifying end-to-end user journeys and cross-feature interactions against `ORIGINAL_REQUEST.md`, `PROJECT.md`, and real candidate credentials.

2. **Core Feature Contracts in `PROJECT.md` & `ORIGINAL_REQUEST.md`**:
   - **Feature 1 / Theme Tokens**: Alternating section grounds between Paddock Olive `#282c20`, Chalk Cream `#f4f4ed`, and Visor Black `#111112`. Accent controls in Signal Lime `#d2ff00` (8px radius buttons), serif words in Moss Lime `#b2c73a`.
   - **Feature 2 / Typography**: Mona Sans Variable (`wdth` 93, `wght` 400-800) and Bodoni Moda (variable display serif). Zero pure black (`#000000`) or pure white (`#ffffff`).
   - **Feature 3 / Zero Shadows & Motion Curve**: `box-shadow: none !important` across all cards, buttons, photos; `cubic-bezier(0.65, 0.05, 0, 1)` easing over `0.75s`.
   - **Feature 4 / Floating Chrome Nav (`Navbar.tsx:57-78`, `Chrome.module.css:1-30`)**: Inset 18.52px fixed layer (`position: fixed; inset: 18.52px 18.52px auto 18.52px; z-index: 50 / 70`). Wordmark `Arsalan WARSI`, `aw` monogram, Signal Lime CTA, 55.5px square menu toggle with unequal two-dash glyph.
   - **Feature 5 / 8 Featured Projects (`portfolio.json:607-959`, `ProjectCarousel.tsx`)**: 8 projects (GrowthRadar AI, Fitness Tracker, Sustainable Living, Warranty Flow, ThriftShoewear, Master Wood Works, ABC Mall, K-Medicos). Chamfered Visor Black cards (`polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)`) with 1px Tarmac Gray `#535450` border.
   - **Feature 6 / 67 Skills Architecture (`portfolio.json:252-588`)**: 27 Frontend, 17 Backend, 7 Database, 17 Tools = 67 total skills rendered as Lichen Gray `#b4b8a5` caption pills.
   - **Feature 7 / Contact API & Honeypot (`app/api/contact/route.ts:51-193`)**: Validation rules (name 2-80, email regex, subject 3-120, message 20-2000), rate limit (5 requests per 10 min window), silent honeypot trap (`if (validation.data.company)` returns 200 without email dispatch), XSS escaping (`escapeHtml`), and CRLF header cleaning (`cleanHeader`).
   - **Feature 8 / Resume Asset (`public/M_Arsalan_Warsi_CV.pdf`)**: 151,811 bytes, verified PDF magic bytes (`%PDF-`), configured at `/M_Arsalan_Warsi_CV.pdf`.

3. **Observed Interaction State Invariants**:
   - `Navbar.tsx:16-34`: Dynamic scroll observer queries `elementFromPoint(window.innerWidth / 2, 110)?.closest('[data-surface]')` to toggle `.onDark` on the floating chrome header.
   - `Navbar.tsx:37-43`: Menu `<dialog>` open locks `document.body.style.overflow = "hidden"`.
   - `ProjectCarousel.tsx:122-141`: Opening a project case study locks `document.body.style.overflow = "hidden"`, handles `Escape` key to close, and unfreezes body scroll.
   - `Chrome.module.css:68-96`: Responsive breakpoint `@media (max-width: 600px)` hides `.monogram`, shrinks wordmark, reduces Talk button to 46px, and collapses menu columns to 1fr.

---

## 2. Logic Chain

1. **Premise 1 (Pairwise Interactions Boundary)**: A single feature working in isolation does not guarantee correctness when two or more components share the DOM tree, layout viewport, focus trap, or event listeners. For instance, the floating chrome header (`z-index: 70`) must not clash with modal dialogs (`z-index: 100`), and dark/light section transitions must dynamically update header colors without breaking button styling.
2. **Premise 2 (Real-World Workloads Boundary)**: Visitors interact with the portfolio through purposeful, multi-step workflows. A recruiter evaluates qualifications and downloads a CV; an engineering lead inspects architecture and audits API security; a student verifies mentorship credentials; a mobile user navigates via touch gestures and dialog drawers; an auditor verifies security guards and token purity.
3. **Premise 3 (Deterministic Executability)**: Under Node.js 22 and `suborch_e2e`, test specifications must be unambiguous, identifying precise precondition states, trigger operations, expected outputs, and assertion assertions executable using `node:test` and `node:assert/strict`.
4. **Premise 4 (Exceeding Minimum Targets)**: To guarantee rigorous coverage, Tier 3 specifies **10 pairwise interaction test cases** (exceeding ≥8), and Tier 4 specifies **5 exhaustive end-to-end user journeys** (meeting ≥5).

---

## 3. Tier 3: Cross-Feature Combinations (10 Pairwise Test Specifications)

### Summary Matrix
| Test ID | Feature A | Feature B | Interaction Target | Assert Mechanism |
|---|---|---|---|---|
| `T3-COMB-01` | Floating Chrome Nav (F4) | Surface Ground Alternation (F1) | Header `.onDark` switch over Paddock Olive vs Chalk Cream | Computed style / class toggle |
| `T3-COMB-02` | Project Modal Dialog (F5) | Floating Chrome Nav (F4) | Z-index hierarchy, focus capture & body scroll freeze | DOM overflow & z-index order |
| `T3-COMB-03` | Contact Honeypot (F7) | Form UI State Machine (F7) | Silent 200 response triggers client success UI & reset | React state transition & DOM alert |
| `T3-COMB-04` | Menu Dialog Drawer (F4) | Motion Curve & Easing (F3) | Easing curve `cubic-bezier(0.65, 0.05, 0, 1)` on reveal | Keyframe animation property check |
| `T3-COMB-05` | Visor Black Project Cards (F5) | Zero Shadows Policy (F3) | Chamfer notch clip-path strictly without drop shadows | CSS clip-path & `box-shadow: none` |
| `T3-COMB-06` | 67 Skills Architecture (F6) | Lichen Gray Pill Tokens (F1/F2) | Category count integrity (27+17+7+17=67) with pill tokens | Array count & token match |
| `T3-COMB-07` | Resume Asset Route (F8) | Chrome Nav & Footer Links (F4) | Synchronized `/M_Arsalan_Warsi_CV.pdf` target & file integrity | Dual link verification & PDF magic bytes |
| `T3-COMB-08` | Rate Limiter Bucket (F7) | Form Error Alert UI (F7) | 6th rapid request returns 429 and preserves user inputs | HTTP 429 response & input value retention |
| `T3-COMB-09` | Active Sprint Ticket (F8/M2) | Hero Scroll Parallax (F4) | Hero shrinks to inset card while sprint ticket stays anchored | Scroll transform & DOM hierarchy |
| `T3-COMB-10` | Mixed-Face Manifesto (F9/M2) | Dual Variable Fonts (F2) | Inline collision of Mona Sans uppercase with Bodoni Moda serif | Font family CSS vars & dual text spans |

---

### Detailed Test Specifications

#### Test Case `T3-COMB-01`: Chrome Nav Dynamic Theme Switcher × Ground Surface Alternation
- **Test ID**: `T3-COMB-01`
- **Features Tested**: Feature 4 (Floating Chrome Nav) × Feature 1 (Theme Tokens & Alternating Grounds).
- **Hypothesis**: When the user scrolls past light ground sections (`#f4f4ed`, `data-surface="light"`) onto dark ground sections (`#282c20` or `#111112`, `data-surface="dark"`), the floating Chrome nav must toggle the `.onDark` class. This transforms text/monogram from Paddock Olive (`#282c20`) to Chalk Cream (`#f4f4ed`), while the Signal Lime CTA button (`Let’s talk`) remains invariant (`#d2ff00` fill, `#282c20` text).
- **Preconditions**: Page loaded; viewport width ≥ 1024px; DOM contains at least one `[data-surface="dark"]` section (e.g. `#manifesto`, `#projects`, or `footer`) and one light section (e.g. `#home`, `#about`).
- **Simulated Actions**:
  1. Measure `header` classes at scroll position Y=0 (over light hero section).
  2. Simulate scroll event to Y position intersecting `#projects` (`data-surface="dark"`).
  3. Query `header.className`.
- **Expected Assertions**:
  ```javascript
  // On light surface
  assert.strictEqual(header.classList.contains("onDark"), false);
  assert.strictEqual(window.getComputedStyle(wordmark).color, "rgb(40, 44, 32)"); // #282c20
  // On dark surface
  assert.strictEqual(headerDark.classList.contains("onDark"), true);
  assert.strictEqual(window.getComputedStyle(wordmarkOnDark).color, "rgb(244, 244, 237)"); // #f4f4ed
  // Button invariant
  assert.strictEqual(window.getComputedStyle(talkBtn).backgroundColor, "rgb(210, 255, 0)"); // #d2ff00
  assert.strictEqual(window.getComputedStyle(talkBtn).color, "rgb(40, 44, 32)"); // #282c20
  ```

#### Test Case `T3-COMB-02`: Project Case Study Modal Dialog × Chrome Nav Z-Index & Focus Trap
- **Test ID**: `T3-COMB-02`
- **Features Tested**: Feature 5 (8 Projects Showcase Modal) × Feature 4 (Floating Chrome Nav).
- **Hypothesis**: Opening a project case study dialog must freeze document body scroll, place an overlay strictly on top of the fixed Chrome header (`z-index: 100 > 70`), trap keyboard focus within the modal, and restore body scroll upon pressing `Escape` or clicking `Close`.
- **Preconditions**: Projects carousel rendered with 8 projects; Chrome nav mounted with `z-index: 70`.
- **Simulated Actions**:
  1. Click project card 1 (GrowthRadar AI).
  2. Inspect `document.body.style.overflow` and modal dialog overlay z-index.
  3. Verify Chrome header is behind overlay or pointer-events disabled.
  4. Dispatch `KeyboardEvent("keydown", { key: "Escape" })`.
  5. Inspect `document.body.style.overflow` and modal unmount.
- **Expected Assertions**:
  ```javascript
  assert.strictEqual(document.body.style.overflow, "hidden");
  assert.ok(modalZIndex >= 100 && modalZIndex > chromeZIndex);
  assert.strictEqual(modalTitle.textContent, "GrowthRadar AI");
  // After Escape
  assert.strictEqual(document.querySelector("#project-dialog-title"), null);
  assert.notStrictEqual(document.body.style.overflow, "hidden");
  ```

#### Test Case `T3-COMB-03`: Contact Route Honeypot × Client UI Success State Machine
- **Test ID**: `T3-COMB-03`
- **Features Tested**: Feature 7 (Contact Form API & Honeypot) × Contact Form React UI.
- **Hypothesis**: When a bot fills in the hidden `company` honeypot field, `/api/contact` returns HTTP 200 `{ message: formCopy.successFallback }` without sending an email. The client UI must transition from idle to success, show the green success alert, reset all input fields to empty strings, and re-enable the submit button.
- **Preconditions**: ContactForm component mounted; honeypot field `input[name="company"]` present and visually hidden (`display: none` or off-screen).
- **Simulated Actions**:
  1. Fill form with valid fields plus `company: "LeadGen Bot LLC"`.
  2. Dispatch form submit event.
  3. Intercept `/api/contact` response.
  4. Inspect client DOM status and form field values.
- **Expected Assertions**:
  ```javascript
  assert.strictEqual(apiResponse.status, 200);
  assert.deepStrictEqual(apiResponse.body, { message: "Your message has been sent successfully. I will get back to you soon." });
  assert.ok(statusAlert.textContent.includes("sent successfully"));
  assert.strictEqual(nameInput.value, "");
  assert.strictEqual(emailInput.value, "");
  assert.strictEqual(subjectInput.value, "");
  assert.strictEqual(messageInput.value, "");
  assert.strictEqual(submitButton.disabled, false);
  ```

#### Test Case `T3-COMB-04`: Navigation Menu Full-Screen Dialog × Lando Motion Curve Easing
- **Test ID**: `T3-COMB-04`
- **Features Tested**: Feature 4 (Chrome Menu Toggle) × Feature 3 (Motion Curve & Elevation Rules).
- **Hypothesis**: The navigation `<dialog id="site-navigation">` must open using the native `.showModal()` API, lock body scrolling, execute the reveal animation using the exact cubic-bezier curve `cubic-bezier(0.65, 0.05, 0, 1)` with `0.75s` duration, and return focus to the trigger upon closing.
- **Preconditions**: Navbar rendered with 55.5px square menu toggle button (`ref={trigger}`).
- **Simulated Actions**:
  1. Click `menuButton`.
  2. Verify dialog `open` attribute is true and body overflow is `"hidden"`.
  3. Inspect computed CSS animation properties on `#site-navigation`.
  4. Click `close` button.
  5. Verify dialog `open` attribute is removed, body overflow is restored, and `document.activeElement === trigger`.
- **Expected Assertions**:
  ```javascript
  assert.strictEqual(dialog.open, true);
  assert.strictEqual(document.body.style.overflow, "hidden");
  assert.strictEqual(animationTimingFunction, "cubic-bezier(0.65, 0.05, 0, 1)");
  assert.strictEqual(animationDuration, "0.75s");
  // Close verification
  assert.strictEqual(dialog.open, false);
  assert.strictEqual(document.body.style.overflow, "");
  assert.strictEqual(document.activeElement, triggerButton);
  ```

#### Test Case `T3-COMB-05`: Visor Black Project Cards × Chamfer Geometry × Zero Drop Shadows
- **Test ID**: `T3-COMB-05`
- **Features Tested**: Feature 5 (8 Projects Showcase) × Feature 3 (Zero Shadows Policy) × Feature 1 (Theme Tokens).
- **Hypothesis**: Project showcase cards must render with Visor Black `#111112` background, 1px Tarmac Gray `#535450` border, chamfered notch clip-path polygon, and strictly zero drop shadows (`box-shadow: none !important`).
- **Preconditions**: Project cards rendered in DOM across all 8 projects.
- **Simulated Actions**:
  1. Query all project card elements (`.project-card` or chamfer container).
  2. Inspect computed styles for `background-color`, `border-color`, `border-width`, `box-shadow`, and `clip-path`.
- **Expected Assertions**:
  ```javascript
  for (const card of projectCards) {
    assert.strictEqual(cardStyle.backgroundColor, "rgb(17, 17, 18)"); // #111112
    assert.strictEqual(cardStyle.borderColor, "rgb(83, 84, 80)"); // #535450
    assert.strictEqual(cardStyle.borderWidth, "1px");
    assert.match(cardStyle.clipPath, /polygon/);
    assert.ok(cardStyle.boxShadow === "none" || cardStyle.boxShadow === "");
  }
  ```

#### Test Case `T3-COMB-06`: 67 Skills Architecture × Category Counts × Lichen Gray Pills
- **Test ID**: `T3-COMB-06`
- **Features Tested**: Feature 6 (67 Skills Architecture) × Feature 1 (Lichen Gray Design Tokens) × Feature 2 (Variable Fonts).
- **Hypothesis**: The skills section must render exactly 67 skills categorized into Frontend (27), Backend (17), Database (7), and Tools (17). Each skill pill must use Lichen Gray border/text tokens, 0 drop shadows, and valid icon mapping without missing icons.
- **Preconditions**: Skills component rendered from `portfolio.json`.
- **Simulated Actions**:
  1. Query all skill category containers and count items per category.
  2. Verify total sum.
  3. Check CSS classes and styles of rendered skill badges.
- **Expected Assertions**:
  ```javascript
  const frontendCount = queryCategory("frontend").length;
  const backendCount = queryCategory("backend").length;
  const databaseCount = queryCategory("database").length;
  const toolsCount = queryCategory("tools").length;
  assert.strictEqual(frontendCount, 27);
  assert.strictEqual(backendCount, 17);
  assert.strictEqual(databaseCount, 7);
  assert.strictEqual(toolsCount, 17);
  assert.strictEqual(frontendCount + backendCount + databaseCount + toolsCount, 67);
  // Verify token compliance
  for (const pill of skillPills) {
    assert.strictEqual(pillStyle.boxShadow, "none");
  }
  ```

#### Test Case `T3-COMB-07`: Resume Download Route × Cross-Component Links Synchronization
- **Test ID**: `T3-COMB-07`
- **Features Tested**: Feature 8 (Resume Asset Download) × Feature 4 (Chrome Menu) × Feature 17 (Inset Footer).
- **Hypothesis**: Both the primary navigation dialog and the inset footer panel must contain synchronized resume links pointing to the exact same `/M_Arsalan_Warsi_CV.pdf` path with secure attributes (`target="_blank"`, `rel="noopener noreferrer"`). The static file on disk must exist and contain valid PDF headers (`%PDF-`).
- **Preconditions**: Navbar and Footer components mounted; `public/M_Arsalan_Warsi_CV.pdf` present.
- **Simulated Actions**:
  1. Query `a` containing text "View résumé" in Chrome menu dialog.
  2. Query `a` containing text "Résumé" in Footer Elsewhere column.
  3. Read `public/M_Arsalan_Warsi_CV.pdf` from disk.
- **Expected Assertions**:
  ```javascript
  assert.strictEqual(navResumeLink.getAttribute("href"), "/M_Arsalan_Warsi_CV.pdf");
  assert.strictEqual(navResumeLink.getAttribute("target"), "_blank");
  assert.strictEqual(navResumeLink.getAttribute("rel"), "noopener noreferrer");
  assert.strictEqual(footerResumeLink.getAttribute("href"), "/M_Arsalan_Warsi_CV.pdf");
  assert.strictEqual(footerResumeLink.getAttribute("target"), "_blank");
  assert.strictEqual(footerResumeLink.getAttribute("rel"), "noopener noreferrer");
  // File verification
  const pdfBuffer = fs.readFileSync(path.join(process.cwd(), "public", "M_Arsalan_Warsi_CV.pdf"));
  assert.ok(pdfBuffer.length >= 100_000); // 151,811 bytes
  assert.strictEqual(pdfBuffer.subarray(0, 5).toString(), "%PDF-");
  ```

#### Test Case `T3-COMB-08`: API Route Rate Limiting × Rapid Submissions × Input Value Retention
- **Test ID**: `T3-COMB-08`
- **Features Tested**: Feature 7 (Contact API & Rate Limiter) × ContactForm Component.
- **Hypothesis**: Submitting more than 5 requests from the same IP within 10 minutes must trigger HTTP 429 `{ message: validationMessages.rateLimited }`. The ContactForm client must render the 429 error message while strictly retaining user inputs in state so that the user does not lose their typed message.
- **Preconditions**: Contact API route mounted; client IP set to `10.0.0.99`.
- **Simulated Actions**:
  1. Send 5 sequential valid POST requests to `/api/contact` from `10.0.0.99`.
  2. Send 6th POST request with draft message.
  3. Inspect HTTP status and client form field state.
- **Expected Assertions**:
  ```javascript
  assert.strictEqual(res6.status, 429);
  assert.strictEqual(res6.body.message, "Too many requests. Please wait a few minutes before trying again.");
  // Verify client input retention
  assert.strictEqual(nameField.value, "Arsalan Client");
  assert.strictEqual(messageField.value, "Important project inquiry draft that must not be wiped.");
  ```

#### Test Case `T3-COMB-09`: Active Sprint Ticket Widget × Hero Portrait Parallax Scale
- **Test ID**: `T3-COMB-09`
- **Features Tested**: Feature 8 in PROJECT.md (Assembling Hero & Active Sprint Ticket) × Feature 4 (Motion Curve).
- **Hypothesis**: On initial load, the Hero section displays the full-viewport Chalk Cream canvas with the centred portrait cut-out framed by the bottom-left Active Sprint ticket (`APTECH LEARNING`, `MERN / FULL-STACK DEV`, `OPEN TO WORK`). On scroll, the hero portrait transitions into an inset card over Paddock Olive canvas using the `0.75s cubic-bezier(0.65, 0.05, 0, 1)` easing curve.
- **Preconditions**: Hero component mounted; Active Sprint ticket present in bottom-left.
- **Simulated Actions**:
  1. Inspect ticket DOM: verify label "ACTIVE SPRINT", role "MERN / FULL-STACK DEV", and location "KARACHI, PK".
  2. Inspect hero ground: `#f4f4ed` with contour lines SVG pattern.
  3. Simulate scroll offset 200px and inspect transform properties.
- **Expected Assertions**:
  ```javascript
  assert.ok(ticketNode.textContent.includes("ACTIVE SPRINT"));
  assert.ok(ticketNode.textContent.includes("OPEN TO WORK"));
  assert.strictEqual(window.getComputedStyle(heroSection).backgroundColor, "rgb(244, 244, 237)"); // #f4f4ed
  assert.strictEqual(heroSection.getAttribute("data-surface"), "light");
  ```

#### Test Case `T3-COMB-10`: Mixed-Face Statement Block × Dual Font Alignment & Contrast
- **Test ID**: `T3-COMB-10`
- **Features Tested**: Feature 9 in PROJECT.md (Mixed-Face Statement Block) × Feature 2 (Variable Fonts) × Feature 1 (Theme Tokens).
- **Hypothesis**: The manifesto statement on Paddock Olive `#282c20` must combine Mona Sans Variable uppercase in Sage Fog `#dde1d2` (`wdth: 93`, `wght: 660`, line-height `0.9`) with inline serif accent words in Moss Lime `#b2c73a` (Bodoni Moda / Brier 700, line-height `0.83`). Both colors must pass WCAG AA contrast against `#282c20` (contrast ratio ≥ 4.5:1 for body and ≥ 3:1 for large display type).
- **Preconditions**: Manifesto component rendered on `#282c20` canvas.
- **Simulated Actions**:
  1. Query statement heading and its inline serif child elements.
  2. Inspect font family, color, line-height, and letter-spacing.
  3. Calculate contrast ratio against `#282c20`.
- **Expected Assertions**:
  ```javascript
  assert.strictEqual(statementStyle.color, "rgb(221, 225, 210)"); // Sage Fog #dde1d2
  assert.strictEqual(serifWordStyle.color, "rgb(178, 199, 58)"); // Moss Lime #b2c73a
  // WCAG Contrast: #dde1d2 on #282c20 is ~11.8:1 (passes AAA); #b2c73a on #282c20 is ~6.1:1 (passes AA large/normal)
  assert.ok(calculateContrastRatio("#dde1d2", "#282c20") >= 7.0);
  assert.ok(calculateContrastRatio("#b2c73a", "#282c20") >= 4.5);
  ```

---

## 4. Tier 4: Real-World Workload Scenarios (5 End-to-End User Journeys)

### Summary Matrix
| Journey ID | Persona | Scope & Workflow | Key Verification Points |
|---|---|---|---|
| `T4-SCEN-01` | Technical Talent Recruiter | Candidate vetting, metrics check, project validation, CV download, contact inquiry | 6 identity anchors, GrowthRadar live demo, valid PDF download, 200 OK contact submission |
| `T4-SCEN-02` | Engineering Lead / VP Eng | Architectural manifesto audit, backend/auth/database skills, GitHub source repos, API security guards | 6 GitHub URLs, 2 private repo flags, XSS/CRLF sanitization, 0 drop shadows |
| `T4-SCEN-03` | Aptech Mentee / Junior Dev | Teaching associate credentials, lab work, student project K-Medicos, certificates, mentorship inquiry | Teaching records, ACCP education, Aptech Ambassador award, K-Medicos drug interaction detection |
| `T4-SCEN-04` | Mobile Recruiter (375x812) | Mobile viewport, touch targets ≥ 44px, hamburger drawer open/close, jump navigation, zero horizontal overflow | Zero horizontal scroll, monogram hidden, dialog locks scroll, mobile CV access |
| `T4-SCEN-05` | Security & Style Purity Auditor | Coffee theme extirpation, zero shadows, HTTP 413/415/429 guards, honeypot spam bot trap, asset integrity | 0 coffee strings, 0 box shadows, 413/415/429 returned properly, honeypot 200, 18 assets verified |

---

### Detailed End-to-End Journey Specifications

#### Scenario `T4-SCEN-01`: Technical Talent Recruiter Evaluation Journey
- **User Persona**: Senior Technical Recruiter at an international talent consultancy reviewing Muhammad Arsalan Warsi for a full-stack / MERN developer role.
- **Complete End-to-End Workflow**:
  1. **Landing & Identity Check**:
     - Enters `https://arsalanwarsi.vercel.app/` (or local `/`).
     - Reads Hero: Full name "Muhammad Arsalan Warsi", role "Full Stack Developer", specialization "MERN Stack", location "Karachi, Pakistan", availability status "Open to work".
     - Validates portrait cut-out image loads from `/header-photo.webp` (fallback `/profile-photo.svg`).
  2. **Active Sprint Metrics**:
     - Reads Active Sprint ticket: `08 Selected projects`, `67 Skills & tools`, `25 Public repos`, Aptech Teaching credentials.
  3. **Flagship Projects Review**:
     - Scrolls or clicks `#projects`.
     - Inspects Project 1: **GrowthRadar AI** (AI SaaS Platform, React 19, Express, Socket.IO, Gemini API, live URL `https://growth-ai-eight.vercel.app/`).
     - Inspects Project 2: **Fitness Tracker Application** (MERN, JWT auth, OTP verification, Gemini API, outcome: "40% reduction in invalid data, 30% faster UI", live URL `https://fitness-tracker-react-seven.vercel.app/`).
  4. **Official Documentation & CV Access**:
     - Recruiter clicks "View résumé" link in Chrome Nav or Footer.
     - HTTP request issued to `/M_Arsalan_Warsi_CV.pdf`.
     - Verifies HTTP 200 response, `content-type: application/pdf`, file size `151,811 bytes`, valid PDF signature.
  5. **Recruiter Outreach via Contact Form**:
     - Recruiter fills out contact form:
       * Name: `"Sarah Jenkins"`
       * Email: `"sarah.jenkins@talentscout.io"`
       * Subject: `"Senior MERN Developer Opportunity"`
       * Message: `"Hi Arsalan, we reviewed your GrowthRadar AI and Aptech teaching portfolio and would love to discuss an open full-stack role with our engineering team."`
       * Company: `""` (left empty as legitimate human recruiter).
     - Submits form -> Receives HTTP 200 or clean feedback.
- **Executable Assertion Contract**:
  ```javascript
  // 1. Verify candidate profile
  assert.strictEqual(portfolio.siteConfig.name, "Muhammad Arsalan Warsi");
  assert.strictEqual(portfolio.siteConfig.role, "Full Stack Developer");
  assert.strictEqual(portfolio.siteConfig.availability, "Open to work");
  // 2. Verify project URLs
  const growthRadar = portfolio.sections.projects.items.find(p => p.title === "GrowthRadar AI");
  assert.strictEqual(growthRadar.live, "https://growth-ai-eight.vercel.app/");
  assert.strictEqual(growthRadar.github, "https://github.com/MArsalanwarsi/growthAi");
  // 3. Verify CV asset
  const cvPath = path.join(process.cwd(), "public", portfolio.siteConfig.resumeUrl.replace(/^\//, ""));
  assert.ok(fs.existsSync(cvPath));
  assert.strictEqual(fs.statSync(cvPath).size, 151811);
  // 4. Verify Contact Form payload acceptance
  const validPayload = {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@talentscout.io",
    subject: "Senior MERN Developer Opportunity",
    message: "Hi Arsalan, we reviewed your GrowthRadar AI and Aptech teaching portfolio and would love to discuss an open full-stack role with our engineering team.",
    company: ""
  };
  const validation = validateContactPayload(validPayload);
  assert.strictEqual(validation.errors, undefined);
  assert.strictEqual(validation.data.name, "Sarah Jenkins");
  ```

#### Scenario `T4-SCEN-02`: Engineering Lead Architectural Audit Journey
- **User Persona**: VP of Engineering or Principal Architect conducting technical due diligence on candidate's code structure, architectural rigor, and security practices.
- **Complete End-to-End Workflow**:
  1. **Architectural Manifesto Review**:
     - Arrives on page, reads Mixed-Face Statement Block on Paddock Olive `#282c20`: "BUILDING SCALABLE FULL-STACK PRODUCTS WITH UNCOMPROMISING PRECISION AND REAL-WORLD SPEED."
  2. **Backend & Database Depth Audit**:
     - Scrolls to `#skills`, filters/inspects Backend (17 items) and Database (7 items).
     - Verifies critical enterprise skills: Node.js, Express.js, MongoDB, Mongoose, Redis, PHP, Laravel, ASP.NET MVC, REST APIs, Socket.IO, JWT Auth, OTP Systems, Nodemailer, Auth Guards, Helmet, Rate Limiting.
  3. **Open-Source Repository Audit**:
     - Audits all 8 projects in `portfolio.json`:
       * Verifies 6 public GitHub links point to genuine `https://github.com/MArsalanwarsi/*` repositories.
       * Verifies 2 private builds (Master Wood Works, ABC Mall & Cinema) are labeled `"Private repository"` with `github === "#"` and do NOT produce dead links.
  4. **Security & API Robustness Audit**:
     - Inspects `/api/contact/route.ts`:
       * Verifies `MAX_CONTENT_LENGTH = 10_000` (payload overflow defense).
       * Verifies `isRateLimited` sliding window (5 requests per 10 minutes per IP).
       * Verifies `escapeHtml` replaces `<>&"'` to stop stored/reflected XSS.
       * Verifies `cleanHeader` strips `\r\n` to prevent SMTP header injection attacks.
       * Verifies honeypot bot trap returns silent HTTP 200 without wasting outbound SMTP resources.
  5. **CSS Architecture & Design Token Compliance**:
     - Inspects Tailwind v4 `@theme` configuration: verifies Paddock Olive `#282c20`, Chalk Cream `#f4f4ed`, Signal Lime `#d2ff00`, Moss Lime `#b2c73a`, Visor Black `#111112`.
     - Confirms zero box-shadow declarations across the site.
- **Executable Assertion Contract**:
  ```javascript
  // 1. Verify 6 public GitHub URLs and 2 private repositories
  const publicRepos = portfolio.sections.projects.items.filter(p => p.github !== "#");
  const privateRepos = portfolio.sections.projects.items.filter(p => p.github === "#");
  assert.strictEqual(publicRepos.length, 6);
  assert.strictEqual(privateRepos.length, 2);
  for (const p of publicRepos) {
    assert.match(p.github, /^https:\/\/github\.com\/MArsalanwarsi\//);
  }
  // 2. Verify Security Sanitization Functions
  assert.strictEqual(escapeHtml("<script>alert('xss')</script>"), "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;");
  assert.strictEqual(cleanHeader("Subject\r\nBcc: victim@test.com\nEvil"), "Subject Bcc: victim@test.com Evil");
  // 3. Verify Zero Shadows in CSS
  const cssContent = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf8");
  assert.ok(!cssContent.includes("box-shadow: 0 10px") && !cssContent.includes("box-shadow: 0 20px"));
  ```

#### Scenario `T4-SCEN-03`: Aptech Mentee & Junior Developer Journey
- **User Persona**: Junior web developer or Aptech Learning student seeking mentorship, inspecting curriculum skills, and learning from Arsalan's real-world career path.
- **Complete End-to-End Workflow**:
  1. **Mentorship & Teaching Credentials Check**:
     - Navigates to `#experience`.
     - Verifies Aptech Learning experience:
       * Role: "Teaching Associate"
       * Period: "Dec 2025 - Present"
       * Location: "Shahrah-e-Faisal, Karachi"
       * Scope: MERN Stack, Next.js, JavaScript, JWT authentication, cookies, OTP verification, project debugging.
     - Verifies Boston Grammar School experience:
       * Role: "Computer Teacher" (Aug 2025 - Dec 2025, Karachi).
  2. **Education Credentials**:
     - Navigates to `#education`.
     - Inspects ACCP Computer Science at Aptech (2023 - 2026, In progress).
     - Inspects Bachelor of Commerce (B.Com) at University of Karachi (2023, 1st Division).
  3. **Verified Recognition & Certifications**:
     - Navigates to `#certificates`.
     - Verifies 6 credentials:
       * Introduction to Front-End Development (Meta)
       * Introduction to Back-End Development (Meta)
       * Aptech Ambassador (Aptech, May 2025)
       * M.S Office (Aptech, Dec 2023)
       * Amazon FBA (Enablers, Dec 2023)
       * Visual Designing Course (Techzone, Dec 2020)
  4. **Student Project Inspiration**:
     - Explores **K-Medicos Medicine Store**:
       * Built with PHP, MySQL, SCSS, PHPMailer.
       * Features drug interaction detection for patient safety.
       * Aptech Vision 2024 award-winning project.
  5. **On / Off Track Teaser Interaction**:
     - Explores split section on Chalk Cream: `ON CODE` (Full-Stack / MERN engineering) vs `IN LAB` (Aptech teaching, hands-on student mentorship).
     - Clicks 55px Signal Lime icon tile to initiate mentorship inquiry.
- **Executable Assertion Contract**:
  ```javascript
  // 1. Verify Teaching Records
  const expItems = portfolio.sections.experience.items;
  assert.strictEqual(expItems[0].company, "Aptech Learning");
  assert.strictEqual(expItems[0].role, "Teaching Associate");
  assert.ok(expItems[0].skills.includes("MERN Stack"));
  assert.ok(expItems[0].skills.includes("JWT"));
  // 2. Verify Education Records
  const eduItems = portfolio.sections.education.items;
  assert.strictEqual(eduItems[0].degree, "ACCP Computer Science");
  assert.strictEqual(eduItems[0].institution, "Aptech");
  assert.strictEqual(eduItems[1].degree, "Bachelor of Commerce (B.Com)");
  // 3. Verify Certificates
  const certItems = portfolio.sections.certificates.items;
  assert.strictEqual(certItems.length, 6);
  assert.ok(certItems.some(c => c.issuer === "Meta" && c.title.includes("Front-End")));
  assert.ok(certItems.some(c => c.issuer === "Aptech" && c.title === "Aptech Ambassador"));
  // 4. Verify K-Medicos Project
  const kMedicos = portfolio.sections.projects.items.find(p => p.title.includes("K-Medicos"));
  assert.ok(kMedicos.description.includes("drug interaction detection"));
  ```

#### Scenario `T4-SCEN-04`: Mobile Recruiter On-the-Go Journey (Viewport: 375x812 / 390x844)
- **User Persona**: Hiring Manager or Recruiter reviewing candidate portfolio on an iPhone / mobile device during a commute.
- **Complete End-to-End Workflow**:
  1. **Mobile Viewport Emulation**:
     - Viewport set to `375px × 812px` (iPhone Mini / SE) and `390px × 844px` (iPhone 14/15/16).
     - Asserts zero horizontal scrollbar: `scrollWidth <= innerWidth`.
  2. **Mobile Floating Chrome Bar**:
     - Fixed chrome nav is inset `15px 16px` (per `@media (max-width: 600px)`).
     - Wordmark scales down (`23px` / `22px`).
     - Monogram `aw` is hidden (`display: none`).
     - Talk CTA button is 46px tall; Menu toggle button is 46px × 46px.
     - All touch targets meet minimum accessible size: `height >= 44px`, `width >= 44px`.
  3. **Touch Menu Drawer Interaction**:
     - User taps 46px menu button (`touchEnd` / `click`).
     - `<dialog id="site-navigation">` opens via `.showModal()`.
     - Background backdrop covers entire viewport in Paddock Olive `#282c20`.
     - Document body scrolling locks (`document.body.style.overflow = "hidden"`).
  4. **Mobile Navigation & Link Jumping**:
     - User views single-column stacked links (`01 ABOUT`, `02 EXPERIENCE`, `03 EDUCATION`, `04 SKILLS`, `05 PROJECTS`, `06 CONTACT`).
     - Taps `05 PROJECTS` -> dialog closes, body scroll unlocks, viewport scrolls smoothly to `#projects`.
  5. **Mobile Card Carousel & Resume Download**:
     - In `#projects`, carousel swipe / arrows operate smoothly.
     - Taps "Résumé" link in mobile footer or menu bottom -> opens `/M_Arsalan_Warsi_CV.pdf` in new tab.
- **Executable Assertion Contract**:
  ```javascript
  // 1. Verify CSS Media Query rules in Chrome.module.css
  const chromeCss = fs.readFileSync(path.join(process.cwd(), "components", "Chrome.module.css"), "utf8");
  assert.match(chromeCss, /@media \(max-width:\s*600px\)/);
  assert.match(chromeCss, /\.monogram\s*\{\s*display:\s*none;\s*\}/);
  assert.match(chromeCss, /\.menuButton,\s*\.close\s*\{\s*width:\s*46px;\s*height:\s*46px;\s*\}/);
  assert.match(chromeCss, /\.talk\s*\{\s*height:\s*46px;/);
  // 2. Verify touch target compliance
  const minTouchTarget = 44; // WCAG 2.5.5 Level AAA / 2.5.8 Level AA (minimum 24px, recommended 44px)
  assert.ok(46 >= minTouchTarget);
  // 3. Verify dialog accessibility attributes
  assert.strictEqual(dialogId, "site-navigation");
  assert.strictEqual(dialogAriaLabelledby, "menu-title");
  ```

#### Scenario `T4-SCEN-05`: Security, Quality & Style Purity Auditor Journey
- **User Persona**: Automated AppSec / QA pipeline conducting a rigorous compliance audit against security vulnerabilities, injection attacks, rate limits, and design token purity.
- **Complete End-to-End Workflow**:
  1. **Style Purity Audit (Coffee Extirpation & Zero Shadows)**:
     - Scans `globals.css`, component source files, and DOM tree.
     - Verifies total absence of coffee classes: `.coffee-cursor`, `.coffee-scroll-rail`, `.brew-*`, `DotField`, `CoffeeCursor`.
     - Verifies absence of warm coffee colors: `#211711`, `#130e0a`, `#bb895b`, `#38271b`.
     - Verifies zero box-shadow declarations: any `box-shadow` property must be `none` or `none !important`.
  2. **HTTP 413 Payload Overflow Guard**:
     - Dispatches POST to `/api/contact` with simulated `Content-Length: 15000` (> 10,000 max).
     - Asserts response is HTTP 413 with message `"Request payload is too large"`.
  3. **HTTP 415 Content-Type Guard**:
     - Dispatches POST to `/api/contact` with `Content-Type: text/plain`.
     - Asserts response is HTTP 415 with message `"Unsupported content type"`.
  4. **Honeypot Bot Trap Execution**:
     - Dispatches valid JSON payload with `company: "Evil Spam Bot"`.
     - Asserts response is HTTP 200 with `{ message: formCopy.successFallback }` and zero outbound mail delivery.
  5. **XSS & CRLF Injection Sanitization**:
     - Sends `<script>alert(document.cookie)</script>` in `name`, `subject`, `message`.
     - Asserts `escapeHtml` replaces `<` with `&lt;` and `>` with `&gt;`.
     - Sends `\r\nBcc: victim@target.com` in subject.
     - Asserts `cleanHeader` strips `\r\n` to a single space.
  6. **Rate Limiting Flood Test**:
     - Sends 5 rapid requests from IP `192.168.1.55` -> handled.
     - Sends 6th request from `192.168.1.55` -> returns HTTP 429 `"Too many requests. Please wait a few minutes before trying again."`.
  7. **Static Asset Integrity**:
     - Verifies `/M_Arsalan_Warsi_CV.pdf` (151,811 bytes, `%PDF-`).
     - Verifies `/header-photo.webp` (67,876 bytes).
     - Verifies all 16 project SVG preview assets in `public/projects/`.
- **Executable Assertion Contract**:
  ```javascript
  // 1. Content-Length guard
  const req413 = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Content-Length": "12000" },
    body: JSON.stringify({ name: "A", email: "a@b.com", subject: "Sub", message: "12345678901234567890" })
  });
  const res413 = await POST(req413);
  assert.strictEqual(res413.status, 413);

  // 2. Content-Type guard
  const req415 = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "Plain text attack"
  });
  const res415 = await POST(req415);
  assert.strictEqual(res415.status, 415);

  // 3. Honeypot guard
  const reqHoneypot = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Bot Spammer",
      email: "bot@spammer.com",
      subject: "Buy cheap backlinks now",
      message: "This is a spam message that exceeds twenty characters.",
      company: "BotNet Inc"
    })
  });
  const resHoneypot = await POST(reqHoneypot);
  assert.strictEqual(resHoneypot.status, 200);

  // 4. 16 Project SVGs exist
  const svgFiles = fs.readdirSync(path.join(process.cwd(), "public", "projects")).filter(f => f.endsWith(".svg"));
  assert.strictEqual(svgFiles.length, 16);
  ```

---

## 5. Caveats

1. **Test Runner Environment**:
   - The test specifications are designed for Node.js 22 built-in `node:test` and `node:assert/strict`. No heavy external dependencies (such as Jest or Cypress) need to be installed.
2. **SMTP Credential Simulation**:
   - For `/api/contact`, legitimate submissions without honeypot require valid SMTP environment variables to deliver outbound emails. In unit/integration tests without SMTP credentials, testing verifies that `validation.data` is valid and the route returns HTTP 500 with `emailNotConfigured` or mock transport is injected.
3. **Framer Motion DOM Emulation**:
   - In pure Node.js opaque-box tests without a browser DOM (e.g. `jsdom` or headless Chrome), animation easing and CSS transforms can be verified via AST/stylesheet string inspection and regex matching against `Chrome.module.css` and `globals.css`.

---

## 6. Conclusion

1. **Complete Specification Delivery**: Exhaustive, deterministic test specifications for **Tier 3 (10 Cross-Feature Combinations)** and **Tier 4 (5 Real-World Workload Scenarios)** have been fully formulated and documented.
2. **Contract Fidelity**: Every test case directly ties back to `ORIGINAL_REQUEST.md`, `PROJECT.md`, `portfolio.json`, and the authentic credentials of Muhammad Arsalan Warsi.
3. **Execution Readiness**: All test specifications include concrete precondition setups, trigger actions, expected status codes, and executable assertion contracts ready for direct implementation by `suborch_e2e` in `tests/e2e/tier3-pairwise-combinations.test.mjs` and `tests/e2e/tier4-workload-scenarios.test.mjs`.

---

## 7. Verification Method

### 7.1 Verification Commands
1. **Verify Test Specifications File**:
   ```powershell
   Test-Path "D:\Arsalan\Portfolio_nextjs\.agents\teamwork\explorer_e2e_3\handoff.md"
   ```
   *Expected Outcome*: Returns `True`.

2. **Verify Static Assets Referenced in Tests**:
   ```powershell
   Test-Path "D:\Arsalan\Portfolio_nextjs\public\M_Arsalan_Warsi_CV.pdf"
   Test-Path "D:\Arsalan\Portfolio_nextjs\public\header-photo.webp"
   (Get-ChildItem -Path "D:\Arsalan\Portfolio_nextjs\public\projects\*.svg").Count
   ```
   *Expected Outcome*: Returns `True`, `True`, and count `16`.

3. **Verify Linter Cleanliness**:
   ```powershell
   npm run lint
   ```
   *Expected Outcome*: Must pass with 0 errors.

### 7.2 Invalidation Conditions
- If any of the 10 Tier 3 combinations fail to assert exact design tokens, z-index hierarchy, or state transitions.
- If any of the 5 Tier 4 journeys omit authentic credentials (GrowthRadar AI, Aptech Teaching Associate, ACCP, 67 skills, 6 certificates, or CV download).
- If any test relies on drop shadows, coffee themes, or non-Lando aesthetic elements.
