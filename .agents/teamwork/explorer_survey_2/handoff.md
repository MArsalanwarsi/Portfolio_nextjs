# Survey Phase Handoff Report — Explorer 2: Content Inventory & Asset Survey

## 1. Observation

### 1.1 User Profile & Core Identity
Observed in `data/portfolio.json:22-68` and `data/portfolio.ts:26-58`:
- **Full Name**: `Muhammad Arsalan Warsi`
- **Short Name / Monogram**: `Arsalan` / Monogram: `AW`
- **Primary Role**: `Full Stack Developer`
- **Specialization**: `MERN Stack Developer`
- **Tagline**: `"MERN Stack developer building scalable, secure, high-performance web applications."`
- **Professional Description**: `"MERN Stack Developer with hands-on experience building scalable, secure, and high-performance web applications using React, Next.js, Redux, Node.js, Express, MongoDB, PHP, and REST APIs."`
- **Introductory Context**: `"Currently working as a Teaching Intern at Aptech Learning, delivering practical training in MERN Stack, Next.js, and PHP development."` (Promoted to Teaching Associate in experience records).
- **Availability**: `Open to work`
- **Location**: `Karachi, Pakistan`
- **Live Portfolio URL**: `https://arsalanwarsi.vercel.app/`
- **Direct Phone**: `+923150207265`
- **Primary Email**: `mohammadarsalanwarsi@gmail.com`
- **GitHub Profile**: `https://github.com/MArsalanwarsi`
- **LinkedIn Profile**: `https://www.linkedin.com/in/m-sheikh-arsalan/`
- **Hero Card Title**: `"Secure MERN products with practical teaching experience."`
- **Hero Card Eyebrow**: `"Software engineer profile"`
- **Hero Card Description**: `"React, Next.js, Redux, Node.js, Express, MongoDB, PHP, JWT, cookies, OTP, REST APIs, and deployment-ready product UI."`
- **Focus Areas**: `["MERN Stack training", "Secure APIs & auth", "Production UI"]`
- **Hero Metrics**:
  - `08` / `"Selected projects"`
  - `67` / `"Skills & tools"`
  - `25` / `"Public repos"`

### 1.2 Resume Asset Verification
Observed in `public/` directory via PowerShell file query:
```powershell
Get-ChildItem -Path "D:\Arsalan\Portfolio_nextjs\public"
```
- File: `D:\Arsalan\Portfolio_nextjs\public\M_Arsalan_Warsi_CV.pdf`
- Size: `151,811 bytes` (~151 KB)
- Last Modified: `10/1/2026 10:32:30 PM`
- Configured Path: `data/portfolio.json:37` -> `"resumeUrl": "/M_Arsalan_Warsi_CV.pdf"`
- Verified: Asset exists, is valid, accessible via root URL `/M_Arsalan_Warsi_CV.pdf`.

### 1.3 Portrait & Photographic Imagery Assets
Observed in `public/` directory:
- `header-photo.webp` (`67,876 bytes`) — High-efficiency web-ready cut-out portrait of Muhammad Arsalan Warsi.
- `header-photo.png` (`1,969,628 bytes` / 1.96 MB) — High-resolution source cut-out.
- `profile-photo.svg` (`3,306 bytes`) — Vector fallback avatar.
- Configured in `data/portfolio.json:38-43`:
  ```json
  "portrait": {
    "src": "/header-photo.webp",
    "fallbackSrc": "/profile-photo.svg",
    "alt": "Portrait of Muhammad Arsalan Warsi",
    "initials": "AW"
  }
  ```

### 1.4 Work Experience & Teaching Records
Observed in `data/portfolio.json:146-180`:
1. **Teaching Associate — Aptech Learning**
   - Location: `Shahrah-e-Faisal, Karachi`
   - Period: `Dec 2025 - Present`
   - Key Responsibilities:
     - Deliver hands-on training in MERN Stack, Next.js, and JavaScript development.
     - Teach authentication systems including JWT, cookies, and OTP verification.
     - Assist students in debugging, project structuring, best coding practices, and real-world full-stack workflows.
   - Core Skills: `MERN Stack`, `Next.js`, `Javascript`, `JWT`, `OTP`
2. **Computer Teacher — Boston Grammar School**
   - Location: `Karachi`
   - Period: `Aug 2025 - Dec 2025`
   - Key Responsibilities:
     - Taught computer fundamentals and programming basics to Grades 3-10.
     - Designed engaging lessons, improved student participation, and strengthened digital literacy and logical thinking.
   - Core Skills: `Computing`, `Programming`, `Digital literacy`

### 1.5 Academic Education Records
Observed in `data/portfolio.json:188-213`:
1. **ACCP Computer Science — Aptech**
   - Period: `2023 - 2026`
   - Status: `In progress`
   - Description: Professional computer science training focused on web development, programming, databases, and full-stack project work.
   - Highlights: `MERN Stack`, `PHP development`, `Database fundamentals`
2. **Bachelor of Commerce (B.Com) — University of Karachi**
   - Period: `2023`
   - Result: `1st Division`
   - Description: Commerce degree with business, accounting, and analytical foundations that support product and client-facing work.
   - Highlights: `Commerce`, `Business foundations`, `Analytical thinking`

### 1.6 Full Projects Inventory (8 Projects)
Observed in `data/portfolio.json:607-959` and `public/projects/`:
| # | Project Title | Category / Label | GitHub Link | Live Link | Tech Stack Highlights | Key Features / Outcomes | Project Image Assets |
|---|---|---|---|---|---|---|---|
| 1 | **GrowthRadar AI** | AI SaaS Platform | [github.com/MArsalanwarsi/growthAi](https://github.com/MArsalanwarsi/growthAi) | [growth-ai-eight.vercel.app](https://growth-ai-eight.vercel.app/) | React 19, Vite 8, Node.js, Express.js, Redux Toolkit, Socket.IO, Gemini API, Recharts, Tailwind CSS 4, Winston, Helmet | AI competitor analysis, real-time Socket.IO alerts for momentum signals, MVC API with rate limits; full marketing command center | `/projects/growthradar-dashboard.svg`<br/>`/projects/growthradar-signals.svg` |
| 2 | **Fitness Tracker Application** | AI Product Build (MERN) | [github.com/MArsalanwarsi/fitness-tracker-React](https://github.com/MArsalanwarsi/fitness-tracker-React) | [fitness-tracker-react-seven.vercel.app](https://fitness-tracker-react-seven.vercel.app/) | React, Redux Toolkit, Node.js, Express.js, MongoDB, Gemini API, ShadCN UI, Nodemailer | JWT authentication, cookie sessions, OTP verification via Nodemailer, Gemini recommendations; 40% reduction in invalid data, 30% faster UI | `/projects/fitness-dashboard.svg`<br/>`/projects/fitness-ai.svg` |
| 3 | **Sustainable Living** | Carbon Tracker App | [github.com/MArsalanwarsi/sustainable_living](https://github.com/MArsalanwarsi/sustainable_living) | `#` | Flutter, Dart, Provider, Firebase, Local DB, fl_chart | Mobile CO2 tracking, lifestyle/energy carbon logs, interactive charts and eco recommendations | `/projects/sustainable-dashboard.svg`<br/>`/projects/sustainable-insights.svg` |
| 4 | **Warranty Flow** | Private Flutter Portal | [github.com/MArsalanwarsi/Warranty-Flow](https://github.com/MArsalanwarsi/Warranty-Flow) | `#` | Flutter, Dart, Riverpod, GoRouter, FlexColorScheme, Google Fonts, ScreenUtil, Lottie, warranty_shared | Customer login/routing, active job tracking, receipt viewing, status history, shared design system package & repository mocks | `/projects/warranty-flow-portal.svg`<br/>`/projects/warranty-flow-tracking.svg` |
| 5 | **ThriftShoewear Commerce Platform** | Private Commerce Stack | [github.com/MArsalanwarsi/thriftshoewear-dashboard](https://github.com/MArsalanwarsi/thriftshoewear-dashboard) | [thriftshoewear-dashboard.vercel.app](https://thriftshoewear-dashboard.vercel.app/) | React 19, Vite 8, Node.js, Express 5, MongoDB, Mongoose, Redux Toolkit, Tailwind CSS 4, Radix UI, Redis, Helmet, Nodemailer, Oxlint | Storefront + admin dashboard, product ops, categories, cart/wishlist, coupons, payments, shipments, hardened Express API security | `/projects/thrift-dashboard.svg`<br/>`/projects/thrift-products.svg` |
| 6 | **Master Wood Works** | Client PHP Commerce | `#` (Client build) | `#` | PHP, MySQL, HTML, CSS, JavaScript, Bootstrap | Client custom furniture storefront, full CRUD inventory management, WhatsApp direct ordering flow | `/projects/masterwood-store.svg`<br/>`/projects/masterwood-inventory.svg` |
| 7 | **ABC Mall & Cinema Management** | ASP.NET MVC System | `#` (Personal build) | `#` | ASP.NET MVC, HTML, CSS, JavaScript, Auth, Booking Flow | Cinema ticket booking workflows, protected management screens, comprehensive admin operations dashboard | `/projects/abc-mall-booking.svg`<br/>`/projects/abc-mall-admin.svg` |
| 8 | **K-Medicos Medicine Store** | PHP Commerce (Award-winning) | [github.com/MArsalanwarsi/K-Medicos-drug-store-using-PHP-and-MYSQL](https://github.com/MArsalanwarsi/K-Medicos-drug-store-using-PHP-and-MYSQL) | [k-medicos.free.nf](https://k-medicos.free.nf/) | PHP, MySQL, HTML, CSS, JavaScript, SCSS, PHPMailer, Composer | Medicine e-commerce purchasing, drug interaction detection for user safety, scalable PHP backend (Aptech Vision 2024 project) | `/projects/medicos-store.svg`<br/>`/projects/medicos-admin.svg` |

All 16 SVG preview files are confirmed present in `public/projects/`.

### 1.7 Skills & Tooling Inventory (67 Skills Total)
Observed in `data/portfolio.json:252-588`:
- **Stack Highlights**: `React.js`, `Next.js 16`, `Redux Toolkit`, `TypeScript`, `Express.js`, `MongoDB`
- **Frontend Category (27 items)**:
  - HTML5, CSS3, JavaScript, jQuery, TypeScript, Dart, React.js, Flutter, Flutter Riverpod, GoRouter, Flutter ScreenUtil, FlexColorScheme, Lottie, Next.js, Tailwind CSS, Bootstrap, React Bootstrap, Sass, Redux Toolkit, React Router, Swiper, shadcn/ui, Base UI, Responsive UI, Recharts, GSAP, Accessibility.
- **Backend Category (17 items)**:
  - Node.js, Express.js, PHP, Laravel, ASP.NET MVC, REST APIs, Socket.IO, API Routing, JWT Auth, OTP Systems, Cookies, Nodemailer, Auth Guards, Helmet, Rate limiting, Server Logic.
- **Database Category (7 items)**:
  - MongoDB, Mongoose, MySQL, Redis, Firebase, Schema Design, Data Modeling.
- **Tools & Workflow Category (17 items)**:
  - Git, GitHub, VS Code, npm, JSON, Postman, Axios, Vercel, Vercel Analytics, Netlify, Cloudinary, Gemini API, WhatsApp Integration, Chrome DevTools, Winston, Oxlint, Figma.

### 1.8 Certificates & Recognition (6 Awards Total)
Observed in `data/portfolio.json:968-1010`:
1. **Introduction to Front-End Development** — Issuer: `Meta` (Nov 2024)
2. **Introduction to Back-End Development** — Issuer: `Meta` (Nov 2024)
3. **M.S Office** — Issuer: `Aptech` (Dec 2023)
4. **Amazon FBA** — Issuer: `Enablers` (Dec 2023)
5. **Visual Designing Course** — Issuer: `Techzone` (Dec 2020)
6. **Aptech Ambassador** — Issuer: `Aptech` (May 2025)

### 1.9 Contact Form, Interactive Requirements & API Endpoints
Observed in `app/api/contact/route.ts` and `components/ContactForm.tsx`:
- Endpoint: `POST /api/contact` (Node.js runtime, `force-dynamic`)
- Rate limiting: Max 5 submissions per 10-minute window per IP (`getClientKey`)
- Payload validation constraints:
  - `name`: 2 to 80 characters, required
  - `email`: valid regex format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), max 120 characters
  - `subject`: 3 to 120 characters, required
  - `message`: 20 to 2000 characters, required
  - `company`: Honeypot field (hidden off-screen; if filled by bots, silently responds 200 success without sending email)
- Nodemailer transport: Configurable via SMTP environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `SMTP_SECURE`).
- Security sanitization: HTML entities escaped (`escapeHtml`), single/multi-line header injection stripped (`cleanHeader`).

### 1.10 Coffee Theme Artifacts to be Removed
Directly observed in codebase:
1. **Coffee Components**:
   - `components/CoffeeCursor.tsx`: SVG coffee cup pouring drops and steam on pointer movement (`.coffee-cursor`, `.coffee-cursor-steam`, `.coffee-cursor-cup`).
   - `components/DeferredCoffeeCursor.tsx`: Idle-delayed loader for `CoffeeCursor`.
   - `components/CoffeeScrollRail.tsx`: Fixed scrollbar displaying an espresso brewing pot, pouring stream, coffee bean slider, and filling coffee cup (`.brew-machine`, `.brew-pot`, `.brew-stream`, `.brew-bean`, `.brew-cup`).
   - `components/DotField.tsx`: Canvas named `CoffeeBeanField` explicitly drawing rasterized coffee bean sprites floating across the viewport.
   - `components/AnimatedBackground.tsx`: Wraps `DotField` and coffee vignettes.
   - `components/LoadingScreen.tsx` & `components/BootLoader.tsx`: Renders `/loader/coffee-cinema.mp4` video with poster `/loader/coffee-poster.webp`, caption "Brewing something good...", and `aria-label="Coffee introduction"`.
   - `assets/loader/coffee-cinema.blend` and `create_scene.py`: 3D Blender cinema assets.
2. **Coffee Styles in `app/globals.css`**:
   - Lines 9-78: Palette root tokens `--background: #211711`, `--foreground: #fff5e9`, `--primary: #bb895b`, `--secondary: #38271b`, `--accent: #4a3221`, `--card: #2a1d15`.
   - Lines 383-457: `.coffee-pointer`, `.coffee-cursor*`, `@keyframes coffee-steam`, `@keyframes coffee-pour`, `@keyframes coffee-drop`.
   - Lines 484-804: `.coffee-scroll-rail`, `.brew-*`, espresso stream gradients and animations.
3. **Coffee Metadata & Text**:
   - `app/layout.tsx:54`: `themeColor: "#211711"`
   - `app/manifest.ts:11-12`: `background_color: "#17110c"`, `theme_color: "#17110c"`
   - `app/opengraph-image.tsx:12`: `linear-gradient(135deg, #17110c 0%, #2b1e15 55%, #49301f 100%)` and `#d3a472`
   - `README.md:38-44`: "## Coffee theme and verification" documentation.

### 1.11 Linter Diagnostic Observation
Command executed: `npm run lint`
Verbatim tool output:
```
! react(purity): Cannot call impure function during render
  ,-[components/Footer.tsx:40:18]
40 |           <p>© {new Date().getFullYear()} {siteConfig.name}</p>
   :                 ^^^^^|^^^^
   :                      `-- Cannot call impure function
Found 1 warning and 0 errors.
```
Because `package.json` specifies `--deny-warnings` on `oxlint`, calling `new Date().getFullYear()` during render fails the lint check. Static year or hook-computed year must be used.

---

## 2. Logic Chain

1. **Premise 1**: The user request explicitly demands removing the coffee theme ("the coffee theme should be removed it looks irrelavant") and replacing it with the Lando Norris Style Reference.
2. **Premise 2**: The portfolio belongs to Muhammad Arsalan Warsi, a Karachi-based Full-Stack Developer specializing in MERN stack, secure authentication, scalable APIs, and hands-on teaching at Aptech Learning.
3. **Premise 3**: Every item of authentic content—his 8 projects (GrowthRadar AI, Fitness Tracker, Sustainable Living, Warranty Flow, ThriftShoewear, Master Wood Works, ABC Mall, K-Medicos), 67 skills, 6 certificates, education, teaching records, contact methods, and `/M_Arsalan_Warsi_CV.pdf`—must be preserved with complete fidelity without inventing or hallucinating false achievements.
4. **Premise 4**: The Lando Norris style reference provides a clear component-by-component design language that naturally maps to Arsalan Warsi's engineering strengths:
   - **Floating Chrome Bar** (fixed navigation layer inset 18.52px, stacked `Arsalan` serif over `WARSI` heavy sans wordmark, `aw` monogram, Signal Lime `#d2ff00` CTA button, 55.5px square menu button with 2 unequal dashes, opening full-bleed numbered directory).
   - **Assembling Hero Portrait & Sprint Ticket** (Chalk Cream `#f4f4ed` canvas with fine topographic contours, centred portrait cut-out of Arsalan from `/header-photo.webp`, framed by an engineering "Active Sprint / Next Milestone Ticket" bottom-left displaying: `ACTIVE SPRINT`, `MERN / FULL-STACK DEV`, `APTECH LEARNING ASSOCIATE`, `SINCE 2023 · KARACHI, PK`, `OPEN TO WORK`). On scroll, hero shrinks into an inset card over Paddock Olive canvas.
   - **Mixed-Face Statement Block (Manifesto)** (Paddock Olive `#282c20` canvas, heavy uppercase Mona Sans Variable in Sage Fog `#dde1d2`, swapping emotional accent words in Moss Lime `#b2c73a` Brier/display serif: e.g. `BUILDING SCALABLE FULL-STACK PRODUCTS WITH UNCOMPROMISING` [PRECISION] `AND REAL-WORLD` [SPEED]).
   - **Captioned Photo Fragment & Quote** (square-cornered photos with 9.26px uppercase captions `KARACHI, 2026`, `APTECH LEARNING, 2025`, and Arsalan's personal architectural quote paired with a Signal Lime `#d2ff00` signature scribble).
   - **Notched Outline Cards on Visor Black `#111112`** (Framed with 1px Tarmac Gray `#535450` outlines and chamfered notch tabs; showcasing the 8 projects and certificates with 0 shadows).
   - **On / Off Track Two-Way Teaser** (Chalk Cream `#f4f4ed` columns: `ON CODE` for full-stack engineering / architecture vs. `IN LAB` for Aptech teaching and mentorship, paired with 55px Signal Lime hooked-arrow icon tiles).
   - **Flagship Feature Block** (Highlighting GrowthRadar AI or ThriftShoewear with heavy display headline, technical breakdown, and Signal Lime arrow button).
   - **Tech & Partner Logo Marquee** (Monochrome Paddock Olive `#282c20` stack logos across Chalk Cream crossed by giant Signal Lime brush script `STACK & TOOLS`).
   - **Fanned Social Deck** (Curved fan arc of rounded cards for GitHub, LinkedIn, Vercel, Resume, WhatsApp under `WHAT'S UP ON SOCIALS`).
   - **Inset Footer Panel** (Paddock Olive `#282c20` panel inset 18.52px on radial Signal Lime halo gradient `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)`, raised tab `AW / 2026`, "ALWAYS BRINGING THE FIGHT", and 4-column directory).
5. **Conclusion**: By cleanly extirpating all coffee assets, cursor handlers, scroll rails, and brown CSS variables, and rehousing Arsalan's authentic portfolio data into the 10 Lando Norris precision components, the site will achieve high aesthetic and performance marks while preserving 100% of the candidate's real credentials.

---

## 3. Caveats

1. **Uncommitted Git Changes in Workspace**:
   - `components/BootLoader.tsx`, `components/Footer.tsx`, `components/LoadingScreen.module.css`, `components/LoadingScreen.tsx`, `components/Navbar.tsx`, `components/ProjectCarousel.tsx`, and `components/Projects.tsx` contain modified working tree edits from prior activity.
   - `components/Projects.tsx` and `components/ProjectCarousel.tsx` currently reference `./ProjectPresentation.module.css` which does not exist in the working directory. The implementer should ensure styles are cleanly defined in valid module files or standard Tailwind classes.
2. **SMTP Credentials**:
   - The contact route `/api/contact/route.ts` requires external SMTP credentials to deliver outbound emails. In local development or preview environments without SMTP variables, it returns `validationMessages.emailNotConfigured` (500) or handles honeypot spam gracefully.
3. **No External Image Hotlinking**:
   - All 16 project SVG mockups and personal portrait files are hosted locally within `public/`. No remote CDNs are required.

---

## 4. Conclusion

1. **Identity & Content Integrity**: Muhammad Arsalan Warsi's full-stack and teaching credentials are comprehensive, verified across `data/portfolio.json`, `data/portfolio.ts`, and `public/M_Arsalan_Warsi_CV.pdf`.
2. **Project & Skills Completeness**: All 8 projects, 67 skills, 6 certifications, and 4 snapshot stats are fully structured and ready for direct consumption by Lando Norris design components.
3. **Elimination Target**:
   - Files to safely decommission/replace: `CoffeeCursor.tsx`, `DeferredCoffeeCursor.tsx`, `CoffeeScrollRail.tsx`, `DotField.tsx`, `LoadingScreen.tsx`, `public/loader/*`.
   - Styles to prune: 400+ lines of coffee styles and `#211711`/`#130e0a` brown tokens in `app/globals.css`.
4. **Actionable Mapping Plan**:
   - Replace Coffee Cinema video loader with instant/lightweight Topographic contour hero reveal.
   - Replace coffee bean canvas with fine topographic contour lines overlay on Chalk Cream `#f4f4ed` and Paddock Olive `#282c20`.
   - Frame Muhammad Arsalan Warsi's portrait and credentials using the 10 distinct Lando Norris components: Floating Chrome Bar, Active Sprint Ticket, Mixed-Face Statement Block, Notched Cards on Visor Black, On/Off Track Teaser, Monochrome Tech Marquee, Fanned Social Deck, and Inset Halo Footer.

---

## 5. Verification Method

### 5.1 Verification Commands
1. **Lint Check**:
   ```powershell
   npm run lint
   ```
   *Expected Outcome*: Must pass with 0 errors and 0 warnings (ensure `Footer.tsx` does not execute `new Date().getFullYear()` during render).
2. **Build Check**:
   ```powershell
   npm run build
   ```
   *Expected Outcome*: Next.js App Router production build succeeds with static pages generated and valid Turbopack cache.
3. **Asset Verification**:
   ```powershell
   Test-Path "D:\Arsalan\Portfolio_nextjs\public\M_Arsalan_Warsi_CV.pdf"
   Test-Path "D:\Arsalan\Portfolio_nextjs\public\header-photo.webp"
   Get-ChildItem "D:\Arsalan\Portfolio_nextjs\public\projects\*.svg" | Measure-Object
   ```
   *Expected Outcome*: Both file tests return `True`, and SVG count equals `16`.

### 5.2 Invalidation Conditions
- If any project title, live demo link, GitHub link, or CV download link fails to resolve or is omitted.
- If any coffee bean, cup, pouring stream, or `#211711` brown hue remains in the active bundle.
- If shadow filters, soft drop shadows, or rounded pill buttons (>8px) are retained instead of the zero-shadow, 8px-radius Lando Norris specification.
