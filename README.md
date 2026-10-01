# Muhammad Arsalan Warsi — Portfolio

Responsive Next.js portfolio styled with Fira Code, Open Sans, a monochrome palette, subtle motion, and accessible project galleries. Original information remains in `data/portfolio.json`; the redesign does not modify it.

## Run

- `npm ci`
- `npm run dev` for development.
- `npm run build` then `npm start` for production and offline testing. Use this build command in deployment: its postbuild step generates the release-specific offline asset manifest.
- `npm run lint`
- `node --test scripts/test-offline.mjs`

## Offline browsing

On HTTPS (or localhost), production visits register a service worker after page load and idle time. Assets download sequentially at low priority, including fonts, images, scripts, styles and the résumé. A complete cached release supports offline reload and galleries. First-visit caching takes time and requires connectivity; browser storage can be cleared or evicted. Data Saver skips bulk downloads. Contact submission and external websites require internet. No contact messages or analytics are cached.

The build enforces a 12 MiB asset budget. The worker keeps two completed releases, resumes interrupted caching, and avoids caching API or React Server Component responses as HTML.

For Chrome browser verification, install Playwright in your test environment, start the production server, and run `node scripts/test-offline-browser.mjs`. Optional environment variables: `PLAYWRIGHT_MODULE` (absolute path to Playwright index.mjs), `TEST_BASE_URL` (defaults to http://localhost:3000).

## Contact and deployment

Configure `SMTP_HOST`, `SMTP_PORT` (default 587), `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and optionally `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` on the server. Keep secrets out of public environment variables. Without SMTP, direct email/phone links work but the contact form cannot deliver messages. Optional analytics uses `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

Deploy with a Node-compatible Next.js host such as Vercel; the contact API requires server execution. Serve the site over HTTPS and do not override the no-cache headers for sw.js or offline-assets.json.

## SEO

Includes canonical metadata, robots.txt, sitemap.xml, social previews and factual Person/WebSite/ProfilePage structured data. Keep `siteConfig.website` aligned with the production domain. Verify the deployed domain in Google Search Console and submit `/sitemap.xml`. A perfect local Lighthouse SEO score validates technical checks; it does not guarantee indexing or first-place rankings.

## Interaction design

Projects use a manual carousel with arrows, swipe, keyboard navigation, a project selector and direct project hashes. All project content remains in server-rendered HTML; with JavaScript disabled, projects appear as a list. Add projects in the existing JSON data to extend the carousel automatically.

The signature intro combines a name reveal, monogram and introduction-progress counter. It lasts about 1.4 seconds, supports Skip, and runs on every refresh. The percentage describes the intro animation, not network download progress. Reduced-motion users bypass it and motion effects. The custom pointer enhancement is limited to fine-pointer desktop devices and retains native cursor fallbacks. Scrolling remains native.

## Source organization and performance

- `app/page.tsx`: server-rendered portfolio sections; `data/portfolio.json` remains the content source.
- `components/`: only components used by the current site. Interactive code stays behind client boundaries.
- `app/styles/`: foundation, sections, projects/effects, hero, navigation, cursor, and viewport rules, imported in explicit cascade order by `app/globals.css`.
- `components/AmbientField.tsx`: monochrome contour animation at 24fps, a single-resolution canvas, fewer lines on mobile, no React renders per frame. Hidden tabs pause it; reduced-motion and data-saving preferences use a static frame.
- `scripts/`: offline manifest generation and verification. Run `npm run test:offline` for cache behavior checks.

Use Node.js 22 or newer. Dependencies are constrained to stable release ranges and resolved in `package-lock.json`; use `npm ci` for reproducible installs. Run lint, build, and offline/browser checks after dependency updates. No separate animation or UI framework is required.
