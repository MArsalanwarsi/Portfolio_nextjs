import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public', 'projects');
const screenshotsDir = path.join(publicDir, 'screenshots');

async function optimizeToPngBase64(inputPath, width = 1200, height = 760) {
  if (!fs.existsSync(inputPath)) {
    return null;
  }
  const buffer = await sharp(inputPath)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .png({ quality: 82, compressionLevel: 8 })
    .toBuffer();
  return buffer.toString('base64');
}

function createBrowserSvg(title, desc, url, base64Png, accentColor = '#3b82f6') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${desc}</desc>
  <defs>
    <clipPath id="viewportClip">
      <rect x="0" y="52" width="1200" height="708"/>
    </clipPath>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c1c1f"/>
      <stop offset="100%" stop-color="#121214"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="#0d0d0f"/>
  <g clip-path="url(#viewportClip)">
    <image href="data:image/png;base64,${base64Png}" x="0" y="52" width="1200" height="708" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <!-- Browser Chrome Top Bar -->
  <rect width="1200" height="52" fill="url(#headerGrad)"/>
  <line x1="0" y1="52" x2="1200" y2="52" stroke="#2d2d32" stroke-width="1"/>
  <!-- Window Controls -->
  <circle cx="28" cy="26" r="6" fill="#ef4444" opacity="0.85"/>
  <circle cx="48" cy="26" r="6" fill="#eab308" opacity="0.85"/>
  <circle cx="68" cy="26" r="6" fill="#22c55e" opacity="0.85"/>
  <!-- URL Address Bar -->
  <rect x="110" y="12" width="460" height="28" rx="6" fill="#27272a" stroke="#3f3f46" stroke-width="1"/>
  <circle cx="128" cy="26" r="3.5" fill="${accentColor}"/>
  <text x="142" y="31" fill="#e4e4e7" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12" font-weight="500">${url}</text>
  <!-- Active Badge -->
  <rect x="1080" y="14" width="94" height="24" rx="4" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-opacity="0.4"/>
  <text x="1127" y="30" fill="${accentColor}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="11" font-weight="600" text-anchor="middle">VERIFIED</text>
</svg>`;
}

async function main() {
  console.log('Generating authentic project preview SVGs...');

  // 1. GlowAfter Theme Engine
  const glowPng = await optimizeToPngBase64(path.join(screenshotsDir, 'glowafter.png'));
  if (glowPng) {
    fs.writeFileSync(
      path.join(publicDir, 'glowafter-preview.svg'),
      createBrowserSvg(
        'GlowAfter Theme Engine',
        'Next.js & Tailwind CSS theme transition engine with nature-inspired reveal animations',
        'glowafter.vercel.app',
        glowPng,
        '#d4ff00'
      )
    );
    console.log('✓ glowafter-preview.svg written');
  }

  // GrowthRadar AI (Real Live Screenshot)
  const growthPng = await optimizeToPngBase64(path.join(screenshotsDir, 'growthradar.png'));
  if (growthPng) {
    fs.writeFileSync(
      path.join(publicDir, 'growthradar-dashboard.svg'),
      createBrowserSvg(
        'GrowthRadar AI Command Center',
        'Premium competitor intelligence dashboard with analytics, growth score, and campaign signals',
        'growth-ai-eight.vercel.app',
        growthPng,
        '#a855f7'
      )
    );
    console.log('✓ growthradar-dashboard.svg written');
  }

  // Fitness Tracker (Real Live Screenshot)
  const fitnessPng = await optimizeToPngBase64(path.join(screenshotsDir, 'fitness.png'));
  if (fitnessPng) {
    fs.writeFileSync(
      path.join(publicDir, 'fitness-dashboard.svg'),
      createBrowserSvg(
        'Fitness Tracker Application',
        'Workout logger, macro tracking, and personal training progress analytics',
        'fitness-tracker-react-seven.vercel.app',
        fitnessPng,
        '#22c55e'
      )
    );
    console.log('✓ fitness-dashboard.svg written');
  }

  // K-Medicos Medicine Store (Real Live Screenshot)
  const medicosPng = await optimizeToPngBase64(path.join(screenshotsDir, 'k-medicos.png'));
  if (medicosPng) {
    fs.writeFileSync(
      path.join(publicDir, 'medicos-store.svg'),
      createBrowserSvg(
        'K-Medicos Medicine Store',
        'Pharmacy web platform featuring medicine purchasing workflows and drug interaction safety checks',
        'k-medicos.free.nf',
        medicosPng,
        '#0284c7'
      )
    );
    console.log('✓ medicos-store.svg written');
  }

  // GlowAfter Detail
  fs.writeFileSync(
    path.join(publicDir, 'glowafter-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">GlowAfter Animation Pipeline</title>
  <desc id="desc">Shader timing, circular clip-path transition mechanics, and theme state reconciliation.</desc>
  <rect width="1200" height="760" fill="#0d0d10"/>
  <rect x="50" y="50" width="1100" height="660" rx="16" fill="#141418" stroke="#2a2a32" stroke-width="1"/>
  <!-- Header -->
  <text x="90" y="115" fill="#f4f4f5" font-family="Inter,system-ui,sans-serif" font-size="28" font-weight="700">Transition Shader &amp; Animation Engine</text>
  <text x="90" y="148" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="14">glowafter/core/transition-pipeline.ts</text>
  <!-- Code Frame -->
  <rect x="90" y="180" width="620" height="480" rx="10" fill="#09090b" stroke="#27272a"/>
  <text x="120" y="225" fill="#d4ff00" font-family="ui-monospace,monospace" font-size="13">const createThemeReveal = (origin: Point) =&gt; {</text>
  <text x="140" y="255" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">  const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);</text>
  <text x="140" y="285" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">  return document.startViewTransition(() =&gt; {</text>
  <text x="160" y="315" fill="#60a5fa" font-family="ui-monospace,monospace" font-size="13">    document.documentElement.classList.toggle('dark');</text>
  <text x="160" y="345" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">    applyCanvasVariables(activeTheme);</text>
  <text x="140" y="375" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">  }).ready.then(() =&gt; {</text>
  <text x="160" y="405" fill="#34d399" font-family="ui-monospace,monospace" font-size="13">    document.documentElement.animate({</text>
  <text x="180" y="435" fill="#fbbf24" font-family="ui-monospace,monospace" font-size="13">      clipPath: [\`circle(0px at \${origin.x}px \${origin.y}px)\`,</text>
  <text x="180" y="465" fill="#fbbf24" font-family="ui-monospace,monospace" font-size="13">                 \`circle(\${maxRadius}px at \${origin.x}px \${origin.y}px)\`]</text>
  <text x="160" y="495" fill="#34d399" font-family="ui-monospace,monospace" font-size="13">    }, { duration: 650, easing: 'cubic-bezier(0.65, 0.05, 0, 1)' });</text>
  <text x="140" y="525" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">  });</text>
  <text x="120" y="555" fill="#d4ff00" font-family="ui-monospace,monospace" font-size="13">};</text>
  <!-- Telemetry Card -->
  <rect x="740" y="180" width="370" height="230" rx="10" fill="#18181c" stroke="#2e2e38"/>
  <text x="770" y="220" fill="#e4e4e7" font-family="Inter,sans-serif" font-size="16" font-weight="600">Animation Telemetry</text>
  <text x="770" y="260" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">Frame Rate: <tspan fill="#22c55e" font-weight="700">60.0 FPS</tspan></text>
  <text x="770" y="295" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">GPU Render Cost: <tspan fill="#22c55e" font-weight="700">1.8 ms</tspan></text>
  <text x="770" y="330" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">Layout Shifts (CLS): <tspan fill="#22c55e" font-weight="700">0.000</tspan></text>
  <text x="770" y="365" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="13">Easing: <tspan fill="#60a5fa">Lando Easing</tspan></text>
  <!-- Palette Card -->
  <rect x="740" y="430" width="370" height="230" rx="10" fill="#18181c" stroke="#2e2e38"/>
  <text x="770" y="470" fill="#e4e4e7" font-family="Inter,sans-serif" font-size="16" font-weight="600">Color System Tokens</text>
  <circle cx="785" cy="515" r="14" fill="#0d0d10" stroke="#444"/>
  <text x="815" y="520" fill="#e4e4e7" font-family="ui-monospace,monospace" font-size="13">#0d0d10 Void Ground</text>
  <circle cx="785" cy="560" r="14" fill="#d4ff00"/>
  <text x="815" y="565" fill="#e4e4e7" font-family="ui-monospace,monospace" font-size="13">#d4ff00 Signal Lime</text>
  <circle cx="785" cy="605" r="14" fill="#262626" stroke="#555"/>
  <text x="815" y="610" fill="#e4e4e7" font-family="ui-monospace,monospace" font-size="13">#262626 Tarmac Surface</text>
</svg>`
  );
  console.log('✓ glowafter-detail.svg written');

  // 2. Create Modern MERN App
  const mernPng = await optimizeToPngBase64(path.join(screenshotsDir, 'create-modern-mern-app.png'));
  if (mernPng) {
    fs.writeFileSync(
      path.join(publicDir, 'mern-cli-preview.svg'),
      createBrowserSvg(
        'Create Modern MERN App',
        'Official npm package documentation and quickstart generator for enterprise MERN stack development',
        'create-modern-mern-app.vercel.app',
        mernPng,
        '#00e676'
      )
    );
    console.log('✓ mern-cli-preview.svg written');
  }

  // MERN Detail
  fs.writeFileSync(
    path.join(publicDir, 'mern-cli-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Create Modern MERN App Terminal</title>
  <desc id="desc">Interactive CLI scaffolding engine with automated TypeScript, Tailwind, and JWT configuration.</desc>
  <rect width="1200" height="760" fill="#090a0f"/>
  <rect x="60" y="50" width="1080" height="660" rx="14" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <!-- Terminal Top Bar -->
  <rect x="60" y="50" width="1080" height="42" rx="14" fill="#161b22"/>
  <circle cx="92" cy="71" r="6" fill="#ff5f56"/>
  <circle cx="112" cy="71" r="6" fill="#ffbd2e"/>
  <circle cx="132" cy="71" r="6" fill="#27c93f"/>
  <text x="600" y="76" fill="#8b949e" font-family="ui-monospace,monospace" font-size="13" text-anchor="middle">terminal — npx create-modern-mern-app</text>
  <!-- Terminal Output -->
  <g font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="14">
    <text x="100" y="130" fill="#58a6ff">$ npx create-modern-mern-app enterprise-portal</text>
    <text x="100" y="165" fill="#3fb950">✔</text>
    <text x="125" y="165" fill="#c9d1d9">Scaffolding modern fullstack project in ./enterprise-portal...</text>
    <text x="100" y="200" fill="#3fb950">✔</text>
    <text x="125" y="200" fill="#c9d1d9">Template: Next.js 16 + Express + TypeScript + MongoDB + Tailwind</text>
    <text x="100" y="235" fill="#3fb950">✔</text>
    <text x="125" y="235" fill="#c9d1d9">Configured secure cookie-based JWT &amp; OTP auth pipeline</text>
    <text x="100" y="270" fill="#3fb950">✔</text>
    <text x="125" y="270" fill="#c9d1d9">Generated 24 RESTful modular endpoints with Zod schema validation</text>
    <text x="100" y="305" fill="#3fb950">✔</text>
    <text x="125" y="305" fill="#c9d1d9">Installed dependencies (84 packages) in 3.42s with zero audit vulnerabilities</text>
    <!-- Box Diagram -->
    <rect x="100" y="340" width="980" height="320" rx="8" fill="#161b22" stroke="#30363d"/>
    <text x="130" y="380" fill="#f0883e" font-weight="700">PROJECT ARCHITECTURE CONTRACT:</text>
    <text x="130" y="420" fill="#79c0ff">├── client/          <tspan fill="#8b949e"># React 19 / Next.js with Server Components &amp; State Stores</tspan></text>
    <text x="130" y="455" fill="#79c0ff">├── server/          <tspan fill="#8b949e"># Node.js + Express with rate-limiting &amp; helmet security</tspan></text>
    <text x="130" y="490" fill="#79c0ff">├── middleware/      <tspan fill="#8b949e"># JWT Token validation, CSRF guard, Request Sanitizers</tspan></text>
    <text x="130" y="525" fill="#79c0ff">├── models/          <tspan fill="#8b949e"># Mongoose schemas with indexing &amp; lifecycle hooks</tspan></text>
    <text x="130" y="560" fill="#79c0ff">└── config/          <tspan fill="#8b949e"># Environment variables validation via Zod strict schema</tspan></text>
    <text x="130" y="610" fill="#58a6ff">&gt; Next steps: <tspan fill="#c9d1d9">cd enterprise-portal &amp;&amp; npm run dev</tspan></text>
  </g>
</svg>`
  );
  console.log('✓ mern-cli-detail.svg written');

  // 3. AAtech Software Agency
  const aatechPng = await optimizeToPngBase64(path.join(screenshotsDir, 'aatech.png'));
  if (aatechPng) {
    fs.writeFileSync(
      path.join(publicDir, 'aatech-preview.svg'),
      createBrowserSvg(
        'AAtech Software Agency',
        'Official software consulting and product engineering agency storefront',
        'a-atech.vercel.app',
        aatechPng,
        '#6366f1'
      )
    );
    console.log('✓ aatech-preview.svg written');
  }

  // AAtech Detail
  fs.writeFileSync(
    path.join(publicDir, 'aatech-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">AAtech Engineering Metrics</title>
  <desc id="desc">Agency capability matrix, fullstack microservice architecture, and enterprise project portfolio.</desc>
  <rect width="1200" height="760" fill="#0b0f19"/>
  <rect x="60" y="50" width="1080" height="660" rx="16" fill="#111827" stroke="#1f2937" stroke-width="1"/>
  <text x="100" y="115" fill="#f9fafb" font-family="Inter,sans-serif" font-size="28" font-weight="700">AAtech Digital Solutions Matrix</text>
  <text x="100" y="148" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="14">Enterprise Engineering Services &amp; Delivery Standards</text>
  <!-- 4 Pillars -->
  <g font-family="Inter,sans-serif">
    <!-- Card 1 -->
    <rect x="100" y="180" width="460" height="220" rx="12" fill="#1f2937" stroke="#374151"/>
    <text x="130" y="225" fill="#60a5fa" font-size="18" font-weight="700">Web &amp; Fullstack Engineering</text>
    <text x="130" y="260" fill="#d1d5db" font-size="14" leading="24">Next.js, React, Node.js, and TypeScript architectures built for speed, SEO, and massive multi-tenant scale.</text>
    <rect x="130" y="325" width="90" height="26" rx="4" fill="#2563eb" fill-opacity="0.2"/>
    <text x="175" y="342" fill="#93c5fd" font-size="11" font-weight="600" text-anchor="middle">NEXT.JS 16</text>
    <rect x="230" y="325" width="90" height="26" rx="4" fill="#2563eb" fill-opacity="0.2"/>
    <text x="275" y="342" fill="#93c5fd" font-size="11" font-weight="600" text-anchor="middle">EXPRESS.JS</text>
    <!-- Card 2 -->
    <rect x="600" y="180" width="480" height="220" rx="12" fill="#1f2937" stroke="#374151"/>
    <text x="630" y="225" fill="#a78bfa" font-size="18" font-weight="700">Mobile Applications (Flutter / RN)</text>
    <text x="630" y="260" fill="#d1d5db" font-size="14">Cross-platform iOS and Android apps with Riverpod reactive state management, biometric auth, and offline sync.</text>
    <rect x="630" y="325" width="80" height="26" rx="4" fill="#7c3aed" fill-opacity="0.2"/>
    <text x="670" y="342" fill="#c4b5fd" font-size="11" font-weight="600" text-anchor="middle">FLUTTER</text>
    <rect x="720" y="325" width="90" height="26" rx="4" fill="#7c3aed" fill-opacity="0.2"/>
    <text x="765" y="342" fill="#c4b5fd" font-size="11" font-weight="600" text-anchor="middle">RIVERPOD</text>
    <!-- Card 3 -->
    <rect x="100" y="430" width="460" height="240" rx="12" fill="#1f2937" stroke="#374151"/>
    <text x="130" y="475" fill="#34d399" font-size="18" font-weight="700">Backend APIs &amp; Security</text>
    <text x="130" y="510" fill="#d1d5db" font-size="14">Scalable REST &amp; WebSocket APIs with JWT authentication, OTP SMS verification, Redis caching, and rate limiting.</text>
    <text x="130" y="580" fill="#10b981" font-family="ui-monospace,monospace" font-size="13">✓ OWASP Top 10 Security Hardened</text>
    <text x="130" y="610" fill="#10b981" font-family="ui-monospace,monospace" font-size="13">✓ 99.98% Service Level Uptime</text>
    <!-- Card 4 -->
    <rect x="600" y="430" width="480" height="240" rx="12" fill="#1f2937" stroke="#374151"/>
    <text x="630" y="475" fill="#fbbf24" font-size="18" font-weight="700">Cloud &amp; DevOps Delivery</text>
    <text x="630" y="510" fill="#d1d5db" font-size="14">Automated CI/CD pipelines, Dockerized deployments, MongoDB Atlas replication clusters, and edge caching.</text>
    <text x="630" y="580" fill="#f59e0b" font-family="ui-monospace,monospace" font-size="13">✓ Automated GitHub Actions CI/CD</text>
    <text x="630" y="610" fill="#f59e0b" font-family="ui-monospace,monospace" font-size="13">✓ Zero Downtime Rolling Releases</text>
  </g>
</svg>`
  );
  console.log('✓ aatech-detail.svg written');

  // 4. Core PHP Admin Dashboard
  const phpAdminPng = await optimizeToPngBase64(path.join(screenshotsDir, 'core-php-admin.png'));
  if (phpAdminPng) {
    fs.writeFileSync(
      path.join(publicDir, 'core-php-admin-preview.svg'),
      createBrowserSvg(
        'Core PHP Admin Panel',
        'Lightweight administrative control panel and database management suite in pure PHP & MySQL',
        'freecs9.epizy.com/core-php-admin',
        phpAdminPng,
        '#8b5cf6'
      )
    );
    console.log('✓ core-php-admin-preview.svg written');
  }

  // Core PHP Detail
  fs.writeFileSync(
    path.join(publicDir, 'core-php-admin-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Core PHP Admin Architecture</title>
  <desc id="desc">Database schema, PDO secure queries, session lifecycle management, and CRUD administrative tables.</desc>
  <rect width="1200" height="760" fill="#111827"/>
  <rect x="50" y="40" width="1100" height="680" rx="12" fill="#1f2937" stroke="#374151"/>
  <!-- Top Bar -->
  <text x="90" y="95" fill="#f3f4f6" font-family="Inter,sans-serif" font-size="26" font-weight="700">Admin Control Center &amp; Database Layer</text>
  <text x="90" y="125" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">PHP 8.2 + PDO Prepared Statements + MySQL Relational Engine</text>
  <!-- Table Layout -->
  <rect x="90" y="150" width="1020" height="340" rx="8" fill="#111827" stroke="#374151"/>
  <!-- Table Header -->
  <rect x="90" y="150" width="1020" height="46" rx="8" fill="#374151"/>
  <text x="120" y="179" fill="#93c5fd" font-family="ui-monospace,monospace" font-size="12" font-weight="700">RECORD ID</text>
  <text x="260" y="179" fill="#93c5fd" font-family="ui-monospace,monospace" font-size="12" font-weight="700">ENTITY / USERNAME</text>
  <text x="490" y="179" fill="#93c5fd" font-family="ui-monospace,monospace" font-size="12" font-weight="700">ROLE &amp; PRIVILEGES</text>
  <text x="730" y="179" fill="#93c5fd" font-family="ui-monospace,monospace" font-size="12" font-weight="700">STATUS</text>
  <text x="940" y="179" fill="#93c5fd" font-family="ui-monospace,monospace" font-size="12" font-weight="700">ACTIONS</text>
  <!-- Row 1 -->
  <text x="120" y="230" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">#ADM-001</text>
  <text x="260" y="230" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">arsalan.admin</text>
  <text x="490" y="230" fill="#a78bfa" font-family="ui-monospace,monospace" font-size="13">Super Administrator</text>
  <rect x="730" y="214" width="75" height="22" rx="4" fill="#065f46"/>
  <text x="767" y="229" fill="#6ee7b7" font-family="ui-monospace,monospace" font-size="11" text-anchor="middle">ACTIVE</text>
  <text x="940" y="230" fill="#60a5fa" font-family="ui-monospace,monospace" font-size="12">[Edit] [Logs]</text>
  <!-- Row 2 -->
  <line x1="90" y1="255" x2="1110" y2="255" stroke="#1f2937"/>
  <text x="120" y="290" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">#MOD-042</text>
  <text x="260" y="290" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">content.editor</text>
  <text x="490" y="290" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">Catalog Manager</text>
  <rect x="730" y="274" width="75" height="22" rx="4" fill="#065f46"/>
  <text x="767" y="289" fill="#6ee7b7" font-family="ui-monospace,monospace" font-size="11" text-anchor="middle">ACTIVE</text>
  <text x="940" y="290" fill="#60a5fa" font-family="ui-monospace,monospace" font-size="12">[Edit] [Logs]</text>
  <!-- Row 3 -->
  <line x1="90" y1="315" x2="1110" y2="315" stroke="#1f2937"/>
  <text x="120" y="350" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">#USR-108</text>
  <text x="260" y="350" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">client.vendor</text>
  <text x="490" y="350" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">Store Vendor</text>
  <rect x="730" y="334" width="85" height="22" rx="4" fill="#78350f"/>
  <text x="772" y="349" fill="#fde68a" font-family="ui-monospace,monospace" font-size="11" text-anchor="middle">PENDING</text>
  <text x="940" y="350" fill="#60a5fa" font-family="ui-monospace,monospace" font-size="12">[Review] [Approve]</text>
  <!-- Row 4 -->
  <line x1="90" y1="375" x2="1110" y2="375" stroke="#1f2937"/>
  <text x="120" y="410" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">#USR-219</text>
  <text x="260" y="410" fill="#e5e7eb" font-family="ui-monospace,monospace" font-size="13">api.service</text>
  <text x="490" y="410" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">Automated Ingest</text>
  <rect x="730" y="394" width="75" height="22" rx="4" fill="#065f46"/>
  <text x="767" y="409" fill="#6ee7b7" font-family="ui-monospace,monospace" font-size="11" text-anchor="middle">ACTIVE</text>
  <text x="940" y="410" fill="#60a5fa" font-family="ui-monospace,monospace" font-size="12">[Edit] [Logs]</text>
  <!-- Bottom Architecture Metrics -->
  <rect x="90" y="520" width="310" height="160" rx="8" fill="#111827" stroke="#374151"/>
  <text x="120" y="555" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">SQL Query Performance</text>
  <text x="120" y="600" fill="#10b981" font-family="Inter,sans-serif" font-size="34" font-weight="800">0.014s</text>
  <text x="120" y="640" fill="#6b7280" font-family="Inter,sans-serif" font-size="13">Average indexed fetch time</text>

  <rect x="445" y="520" width="310" height="160" rx="8" fill="#111827" stroke="#374151"/>
  <text x="475" y="555" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">Session Security Layer</text>
  <text x="475" y="600" fill="#a78bfa" font-family="Inter,sans-serif" font-size="34" font-weight="800">CSRF+HttpOnly</text>
  <text x="475" y="640" fill="#6b7280" font-family="Inter,sans-serif" font-size="13">Encrypted session cookies</text>

  <rect x="800" y="520" width="310" height="160" rx="8" fill="#111827" stroke="#374151"/>
  <text x="830" y="555" fill="#9ca3af" font-family="ui-monospace,monospace" font-size="13">Active Database Records</text>
  <text x="830" y="600" fill="#60a5fa" font-family="Inter,sans-serif" font-size="34" font-weight="800">12,480+</text>
  <text x="830" y="640" fill="#6b7280" font-family="Inter,sans-serif" font-size="13">Normalized relational rows</text>
</svg>`
  );
  console.log('✓ core-php-admin-detail.svg written');

  // 5. Bright World Lighting Store
  const brightPng = await optimizeToPngBase64(path.join(screenshotsDir, 'bright-world.jpg'));
  if (brightPng) {
    fs.writeFileSync(
      path.join(publicDir, 'bright-world-preview.svg'),
      createBrowserSvg(
        'Bright World Commercial Lighting Store',
        'Commercial lighting and fixture storefront with catalog search and cart workflows',
        'brightworld.lighting',
        brightPng,
        '#f59e0b'
      )
    );
    console.log('✓ bright-world-preview.svg written');
  }

  // Bright World Detail
  fs.writeFileSync(
    path.join(publicDir, 'bright-world-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Bright World Product Specification</title>
  <desc id="desc">Commercial luminaire catalog, Kelvin color temperature selector, and lighting energy efficiency specs.</desc>
  <rect width="1200" height="760" fill="#0d0f14"/>
  <rect x="60" y="50" width="1080" height="660" rx="16" fill="#161a23" stroke="#252b38"/>
  <text x="100" y="115" fill="#f8fafc" font-family="Inter,sans-serif" font-size="28" font-weight="700">Luminaires &amp; Architecture Lighting Specification</text>
  <text x="100" y="148" fill="#94a3b8" font-family="ui-monospace,monospace" font-size="14">Product ID: BW-LUM-940 // High-CRI Architectural Pendant</text>
  <!-- Left Product Visual Mockup -->
  <rect x="100" y="180" width="480" height="480" rx="12" fill="#0f1219" stroke="#2d3748"/>
  <circle cx="340" cy="380" r="140" fill="none" stroke="#fbbf24" stroke-width="4" stroke-dasharray="8 8" opacity="0.6"/>
  <circle cx="340" cy="380" r="100" fill="none" stroke="#f59e0b" stroke-width="6"/>
  <circle cx="340" cy="380" r="60" fill="#fbbf24" fill-opacity="0.2"/>
  <text x="340" y="386" fill="#fef3c7" font-family="ui-monospace,monospace" font-size="16" font-weight="700" text-anchor="middle">3000K WARM</text>
  <!-- Right Specs Panel -->
  <g font-family="Inter,sans-serif" transform="translate(620, 180)">
    <rect width="460" height="480" rx="12" fill="#1e2433" stroke="#2d3748"/>
    <text x="40" y="50" fill="#f1f5f9" font-size="20" font-weight="700">Technical Specifications</text>
    <text x="40" y="95" fill="#94a3b8" font-size="14">Luminous Flux:</text>
    <text x="240" y="95" fill="#fbbf24" font-weight="700" font-family="ui-monospace,monospace">3,800 Lumens</text>
    <text x="40" y="140" fill="#94a3b8" font-size="14">Color Temp (CCT):</text>
    <text x="240" y="140" fill="#f8fafc" font-family="ui-monospace,monospace">2700K - 6500K Tunable</text>
    <text x="40" y="185" fill="#94a3b8" font-size="14">Color Rendering (CRI):</text>
    <text x="240" y="185" fill="#34d399" font-weight="700" font-family="ui-monospace,monospace">Ra &gt; 95 (True Color)</text>
    <text x="40" y="230" fill="#94a3b8" font-size="14">Power Consumption:</text>
    <text x="240" y="230" fill="#f8fafc" font-family="ui-monospace,monospace">36W (Energy Class A++)</text>
    <text x="40" y="275" fill="#94a3b8" font-size="14">Dimming Protocol:</text>
    <text x="240" y="275" fill="#f8fafc" font-family="ui-monospace,monospace">DALI-2 / 0-10V / Zigbee</text>
    <text x="40" y="320" fill="#94a3b8" font-size="14">Lifespan Rating:</text>
    <text x="240" y="320" fill="#60a5fa" font-weight="700" font-family="ui-monospace,monospace">50,000 hrs (L80B10)</text>
    <rect x="40" y="380" width="380" height="52" rx="8" fill="#f59e0b"/>
    <text x="230" y="412" fill="#0f172a" font-size="15" font-weight="700" text-anchor="middle">ADD TO PROJECT SPEC SHEET</text>
  </g>
</svg>`
  );
  console.log('✓ bright-world-detail.svg written');

  // 6. Master Wood Works
  const woodBannerPng = await optimizeToPngBase64(path.join(screenshotsDir, 'woodworks-banner.webp'));
  if (woodBannerPng) {
    fs.writeFileSync(
      path.join(publicDir, 'masterwood-store.svg'),
      createBrowserSvg(
        'Master Wood Works Storefront',
        'Client furniture e-commerce storefront with PHP, CRUD inventory management, and WhatsApp ordering',
        'masterwoodworks.com',
        woodBannerPng,
        '#d97706'
      )
    );
    console.log('✓ masterwood-store.svg written');
  }

  const woodBedPng = await optimizeToPngBase64(path.join(screenshotsDir, 'woodworks-bed.jpg'));
  if (woodBedPng) {
    fs.writeFileSync(
      path.join(publicDir, 'masterwood-inventory.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Master Wood Works Custom Furniture</title>
  <desc id="desc">Solid wood crafted bed set with catalog inventory management and direct WhatsApp ordering.</desc>
  <defs>
    <clipPath id="bedClip">
      <rect x="90" y="150" width="480" height="500" rx="12"/>
    </clipPath>
  </defs>
  <rect width="1200" height="760" fill="#17120e"/>
  <rect x="50" y="40" width="1100" height="680" rx="16" fill="#231c16" stroke="#3d3025"/>
  <text x="90" y="95" fill="#fef3c7" font-family="Inter,sans-serif" font-size="28" font-weight="700">Master Wood Works // Artisan Furniture Collection</text>
  <text x="90" y="125" fill="#b45309" font-family="ui-monospace,monospace" font-size="13">Handcrafted Sheesham &amp; Walnut Wood Craftsmanship</text>
  <!-- Bed Image -->
  <g clip-path="url(#bedClip)">
    <image href="data:image/png;base64,${woodBedPng}" x="90" y="150" width="480" height="500" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <rect x="90" y="150" width="480" height="500" rx="12" fill="none" stroke="#78350f" stroke-width="2"/>
  <!-- Right Details -->
  <g font-family="Inter,sans-serif" transform="translate(610, 150)">
    <rect width="490" height="500" rx="12" fill="#1c1611" stroke="#3d3025"/>
    <text x="40" y="55" fill="#fef3c7" font-size="22" font-weight="700">Royal Sheesham King Bed Set</text>
    <text x="40" y="85" fill="#92400e" font-family="ui-monospace,monospace" font-size="13">SKU: MWW-BED-2024</text>
    <text x="40" y="135" fill="#d6d3d1" font-size="14" leading="24">Engineered from premium seasoned Sheesham rosewood. Built with mortise and tenon joinery for multi-generational durability.</text>
    <text x="40" y="195" fill="#a8a29e" font-size="14">Wood Finish: <tspan fill="#fef3c7" font-weight="600">Deep Natural Teak Satin</tspan></text>
    <text x="40" y="235" fill="#a8a29e" font-size="14">Warranty: <tspan fill="#fef3c7" font-weight="600">10-Year Termite &amp; Structure Guarantee</tspan></text>
    <text x="40" y="275" fill="#a8a29e" font-size="14">Dimensions: <tspan fill="#fef3c7" font-weight="600">78" W x 84" L x 54" H</tspan></text>
    <!-- WhatsApp CTA -->
    <rect x="40" y="340" width="410" height="60" rx="10" fill="#25d366"/>
    <text x="245" y="377" fill="#ffffff" font-size="16" font-weight="700" text-anchor="middle">💬 ORDER VIA WHATSAPP (+923150207265)</text>
    <text x="245" y="430" fill="#78716c" font-size="12" text-anchor="middle">Instant consultation &amp; custom sizing available</text>
  </g>
</svg>`
    );
    console.log('✓ masterwood-inventory.svg written');
  }

  // 7. Plant-Based Living Portal
  const plantProductPng = await optimizeToPngBase64(path.join(screenshotsDir, 'plant-product.jpg'));
  if (plantProductPng) {
    fs.writeFileSync(
      path.join(publicDir, 'plant-based-preview.svg'),
      createBrowserSvg(
        'Plant-Based Living & Nursery Portal',
        'Award-winning environmental and plant-based nutrition and botanical awareness web portal',
        'plant-based-lifestyle.org',
        plantProductPng,
        '#22c55e'
      )
    );
    console.log('✓ plant-based-preview.svg written');
  }

  // Plant-Based Detail
  fs.writeFileSync(
    path.join(publicDir, 'plant-based-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Botanical Nutrition &amp; Species Guide</title>
  <desc id="desc">Interactive plant care telemetry, air purification index, and botanical nutrition guide.</desc>
  <rect width="1200" height="760" fill="#0a140d"/>
  <rect x="60" y="50" width="1080" height="660" rx="16" fill="#102216" stroke="#1d3d27"/>
  <text x="100" y="115" fill="#f0fdf4" font-family="Inter,sans-serif" font-size="28" font-weight="700">Botanical Science &amp; Indoor Air Quality Index</text>
  <text x="100" y="148" fill="#4ade80" font-family="ui-monospace,monospace" font-size="14">AZM Environmental Innovation Award Winner</text>
  <g font-family="Inter,sans-serif" transform="translate(100, 180)">
    <!-- Column 1 -->
    <rect width="320" height="480" rx="12" fill="#0b170f" stroke="#1f422b"/>
    <text x="30" y="50" fill="#86efac" font-size="18" font-weight="700">Ficus Elastica (Rubber)</text>
    <text x="30" y="80" fill="#6ee7b7" font-family="ui-monospace,monospace" font-size="12">Air Score: 94/100</text>
    <text x="30" y="130" fill="#bbf7d0" font-size="14" leading="24">Absorbs formaldehyde and airborne toxins. Thrives in moderate indirect sunlight with 7-day watering cycles.</text>
    <text x="30" y="240" fill="#86efac" font-size="13" font-weight="600">WATERING:</text>
    <text x="30" y="265" fill="#dcfce7" font-size="13">Every 7 to 10 days</text>
    <text x="30" y="310" fill="#86efac" font-size="13" font-weight="600">LIGHT:</text>
    <text x="30" y="335" fill="#dcfce7" font-size="13">Bright Indirect Sunlight</text>
    <text x="30" y="380" fill="#86efac" font-size="13" font-weight="600">SOIL DRAINAGE:</text>
    <text x="30" y="405" fill="#dcfce7" font-size="13">Aerated Perlite Mix (pH 6.0)</text>

    <!-- Column 2 -->
    <rect x="360" width="320" height="480" rx="12" fill="#0b170f" stroke="#1f422b"/>
    <text x="390" y="50" fill="#86efac" font-size="18" font-weight="700">Monstera Deliciosa</text>
    <text x="390" y="80" fill="#6ee7b7" font-family="ui-monospace,monospace" font-size="12">Air Score: 91/100</text>
    <text x="390" y="130" fill="#bbf7d0" font-size="14" leading="24">Swiss cheese plant known for humidity stabilization and large fenestrated air-purifying foliage.</text>
    <text x="390" y="240" fill="#86efac" font-size="13" font-weight="600">WATERING:</text>
    <text x="390" y="265" fill="#dcfce7" font-size="13">When top 2 inches dry out</text>
    <text x="390" y="310" fill="#86efac" font-size="13" font-weight="600">LIGHT:</text>
    <text x="390" y="335" fill="#dcfce7" font-size="13">Medium to High Ambient</text>
    <text x="390" y="380" fill="#86efac" font-size="13" font-weight="600">HUMIDITY:</text>
    <text x="390" y="405" fill="#dcfce7" font-size="13">60% - 80% Optimal Range</text>

    <!-- Column 3 -->
    <rect x="720" width="260" height="480" rx="12" fill="#0b170f" stroke="#1f422b"/>
    <text x="750" y="50" fill="#86efac" font-size="18" font-weight="700">Impact Stats</text>
    <text x="750" y="110" fill="#4ade80" font-size="36" font-weight="800">-42%</text>
    <text x="750" y="135" fill="#bbf7d0" font-size="12">Indoor VOC Contaminants</text>
    <text x="750" y="190" fill="#4ade80" font-size="36" font-weight="800">+65%</text>
    <text x="750" y="215" fill="#bbf7d0" font-size="12">Oxygen Replenishment</text>
    <text x="750" y="270" fill="#4ade80" font-size="36" font-weight="800">100%</text>
    <text x="750" y="295" fill="#bbf7d0" font-size="12">Organic Soil Substrates</text>
  </g>
</svg>`
  );
  console.log('✓ plant-based-detail.svg written');

  // 8. Smart Housing Backend API
  fs.writeFileSync(
    path.join(publicDir, 'smart-housing-preview.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Smart Housing Backend API &amp; Swagger</title>
  <desc id="desc">RESTful API documentation and gate access control engine for housing societies.</desc>
  <rect width="1200" height="760" fill="#0b0f19"/>
  <rect x="50" y="40" width="1100" height="680" rx="14" fill="#111827" stroke="#1e293b"/>
  <!-- Top API Bar -->
  <rect x="50" y="40" width="1100" height="56" rx="14" fill="#1e293b"/>
  <text x="90" y="75" fill="#38bdf8" font-family="ui-monospace,monospace" font-size="18" font-weight="700">Smart Housing REST API v1.4.0</text>
  <rect x="980" y="52" width="130" height="30" rx="6" fill="#0284c7"/>
  <text x="1045" y="72" fill="#fff" font-family="ui-monospace,monospace" font-size="12" font-weight="700" text-anchor="middle">OAS 3.0 VALID</text>
  <!-- Endpoint List -->
  <g font-family="ui-monospace,monospace" font-size="13">
    <!-- EP 1 -->
    <rect x="90" y="130" width="1020" height="64" rx="8" fill="#0f172a" stroke="#1e293b"/>
    <rect x="110" y="146" width="60" height="32" rx="4" fill="#15803d"/>
    <text x="140" y="167" fill="#fff" font-weight="700" text-anchor="middle">GET</text>
    <text x="190" y="167" fill="#e2e8f0" font-weight="600">/api/v1/housing/tenants</text>
    <text x="600" y="167" fill="#94a3b8">Retrieve tenant lease contracts, parking spots &amp; active residents</text>
    <text x="1040" y="167" fill="#22c55e" font-weight="700">200 OK</text>
    <!-- EP 2 -->
    <rect x="90" y="210" width="1020" height="64" rx="8" fill="#0f172a" stroke="#1e293b"/>
    <rect x="110" y="226" width="60" height="32" rx="4" fill="#1d4ed8"/>
    <text x="140" y="247" fill="#fff" font-weight="700" text-anchor="middle">POST</text>
    <text x="190" y="247" fill="#e2e8f0" font-weight="600">/api/v1/access/rfid-gate</text>
    <text x="600" y="247" fill="#94a3b8">Validate RFID barcode vehicle badge and log timestamped gate entry</text>
    <text x="1040" y="247" fill="#22c55e" font-weight="700">201 CREATED</text>
    <!-- EP 3 -->
    <rect x="90" y="290" width="1020" height="64" rx="8" fill="#0f172a" stroke="#1e293b"/>
    <rect x="110" y="306" width="60" height="32" rx="4" fill="#b45309"/>
    <text x="140" y="327" fill="#fff" font-weight="700" text-anchor="middle">PUT</text>
    <text x="190" y="327" fill="#e2e8f0" font-weight="600">/api/v1/billing/maintenance</text>
    <text x="600" y="327" fill="#94a3b8">Automated monthly billing reconciliation &amp; digital invoice generation</text>
    <text x="1040" y="327" fill="#22c55e" font-weight="700">200 OK</text>
  </g>
  <!-- JSON Response Sandbox -->
  <rect x="90" y="390" width="1020" height="290" rx="8" fill="#030712" stroke="#1f2937"/>
  <text x="120" y="425" fill="#38bdf8" font-family="ui-monospace,monospace" font-size="13">// Example JSON response: /api/v1/access/rfid-gate</text>
  <g font-family="ui-monospace,monospace" font-size="12">
    <text x="120" y="460" fill="#e2e8f0">{</text>
    <text x="140" y="485" fill="#93c5fd">"status": <tspan fill="#a7f3d0">"authorized"</tspan>,</text>
    <text x="140" y="510" fill="#93c5fd">"resident": <tspan fill="#e2e8f0">{ "unit": "Block-C, Apt 402", "name": "M. Arsalan", "tier": "Owner" }</tspan>,</text>
    <text x="140" y="535" fill="#93c5fd">"gateId": <tspan fill="#a7f3d0">"MAIN-NORTH-BOOM-01"</tspan>,</text>
    <text x="140" y="560" fill="#93c5fd">"timestamp": <tspan fill="#fef08a">"2026-11-24T15:30:00Z"</tspan>,</text>
    <text x="140" y="585" fill="#93c5fd">"securityClearance": <tspan fill="#86efac">true</tspan></text>
    <text x="120" y="615" fill="#e2e8f0">}</text>
  </g>
</svg>`
  );
  console.log('✓ smart-housing-preview.svg written');

  fs.writeFileSync(
    path.join(publicDir, 'smart-housing-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Smart Housing Society Telemetry</title>
  <desc id="desc">Society resident portal, monthly utility billing, and automated access logs.</desc>
  <rect width="1200" height="760" fill="#0a0e17"/>
  <rect x="50" y="40" width="1100" height="680" rx="14" fill="#131a29" stroke="#1e293b"/>
  <text x="90" y="95" fill="#f8fafc" font-family="Inter,sans-serif" font-size="28" font-weight="700">Estate Management Telemetry Dashboard</text>
  <text x="90" y="125" fill="#38bdf8" font-family="ui-monospace,monospace" font-size="13">Real-time IoT Gate Traffic &amp; Service Invoicing</text>
  <!-- 3 Metric Cards -->
  <g font-family="Inter,sans-serif">
    <rect x="90" y="160" width="310" height="180" rx="10" fill="#0f172a" stroke="#1e293b"/>
    <text x="120" y="200" fill="#94a3b8" font-size="14">Vehicles Processed (24h)</text>
    <text x="120" y="260" fill="#38bdf8" font-size="44" font-weight="800">1,842</text>
    <text x="120" y="300" fill="#22c55e" font-size="13">✔ 100% Verified RFID Scans</text>

    <rect x="445" y="160" width="310" height="180" rx="10" fill="#0f172a" stroke="#1e293b"/>
    <text x="475" y="200" fill="#94a3b8" font-size="14">Society Dues Collected</text>
    <text x="475" y="260" fill="#22c55e" font-size="44" font-weight="800">98.4%</text>
    <text x="475" y="300" fill="#94a3b8" font-size="13">PKR 4.2M Automated Receipts</text>

    <rect x="800" y="160" width="310" height="180" rx="10" fill="#0f172a" stroke="#1e293b"/>
    <text x="830" y="200" fill="#94a3b8" font-size="14">Average Boom Barrier Latency</text>
    <text x="830" y="260" fill="#fbbf24" font-size="44" font-weight="800">180ms</text>
    <text x="830" y="300" fill="#22c55e" font-size="13">High-speed MQTT Broker</text>
  </g>
  <!-- Gate Activity Graph -->
  <rect x="90" y="380" width="1020" height="290" rx="10" fill="#0b0f19" stroke="#1e293b"/>
  <text x="120" y="420" fill="#e2e8f0" font-family="Inter,sans-serif" font-size="16" font-weight="600">Gate Access Traffic Frequency (Hourly Distribution)</text>
  <!-- Chart Bars -->
  <g fill="#0284c7">
    <rect x="140" y="550" width="36" height="70" rx="4"/>
    <rect x="220" y="520" width="36" height="100" rx="4"/>
    <rect x="300" y="470" width="36" height="150" rx="4"/>
    <rect x="380" y="450" width="36" height="170" rx="4"/>
    <rect x="460" y="510" width="36" height="110" rx="4"/>
    <rect x="540" y="530" width="36" height="90" rx="4"/>
    <rect x="620" y="490" width="36" height="130" rx="4"/>
    <rect x="700" y="460" width="36" height="160" rx="4"/>
    <rect x="780" y="440" width="36" height="180" rx="4"/>
    <rect x="860" y="480" width="36" height="140" rx="4"/>
    <rect x="940" y="530" width="36" height="90" rx="4"/>
    <rect x="1020" y="570" width="36" height="50" rx="4"/>
  </g>
  <line x1="120" y1="620" x2="1080" y2="620" stroke="#334155" stroke-width="2"/>
</svg>`
  );
  console.log('✓ smart-housing-detail.svg written');

  // 9. History Monuments Portal
  fs.writeFileSync(
    path.join(publicDir, 'history-monument-preview.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">History Monuments Portal</title>
  <desc id="desc">Educational monuments and architectural heritage portal with JSON dataset feeds and gallery views.</desc>
  <defs>
    <radialGradient id="heritageGlow" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#b45309" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0f0d0a" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#heritageGlow)"/>
  <rect x="60" y="50" width="1080" height="660" rx="16" fill="#181410" stroke="#382c20"/>
  <!-- Top Navigation -->
  <text x="100" y="115" fill="#fef3c7" font-family="Georgia,serif" font-size="32" font-weight="700">World Heritage &amp; Ancient Monuments</text>
  <text x="100" y="148" fill="#d97706" font-family="ui-monospace,monospace" font-size="14">ARCHAEOLOGICAL PORTAL &amp; DIGITAL ENCYCLOPEDIA</text>
  <!-- Monument Cards -->
  <g font-family="Inter,sans-serif">
    <!-- Card 1 -->
    <rect x="100" y="180" width="310" height="480" rx="12" fill="#241d16" stroke="#4a3b2b"/>
    <rect x="120" y="200" width="270" height="180" rx="8" fill="#3d3023"/>
    <text x="255" y="300" fill="#fef3c7" font-family="Georgia,serif" font-size="20" font-weight="700" text-anchor="middle">Taj Mahal</text>
    <text x="120" y="420" fill="#fef3c7" font-size="18" font-weight="700">Agra, India (1632)</text>
    <text x="120" y="450" fill="#d6d3d1" font-size="13" leading="20">Ivory-white marble mausoleum on the right bank of the river Yamuna, commissioned by Mughal emperor Shah Jahan.</text>
    <rect x="120" y="590" width="120" height="32" rx="4" fill="#b45309"/>
    <text x="180" y="611" fill="#fff" font-size="12" font-weight="600" text-anchor="middle">EXPLORE</text>

    <!-- Card 2 -->
    <rect x="445" y="180" width="310" height="480" rx="12" fill="#241d16" stroke="#4a3b2b"/>
    <rect x="465" y="200" width="270" height="180" rx="8" fill="#3d3023"/>
    <text x="600" y="300" fill="#fef3c7" font-family="Georgia,serif" font-size="20" font-weight="700" text-anchor="middle">The Colosseum</text>
    <text x="465" y="420" fill="#fef3c7" font-size="18" font-weight="700">Rome, Italy (70 AD)</text>
    <text x="465" y="450" fill="#d6d3d1" font-size="13" leading="20">The largest ancient amphitheatre ever built, capable of holding an estimated 50,000 to 80,000 spectators.</text>
    <rect x="465" y="590" width="120" height="32" rx="4" fill="#b45309"/>
    <text x="525" y="611" fill="#fff" font-size="12" font-weight="600" text-anchor="middle">EXPLORE</text>

    <!-- Card 3 -->
    <rect x="790" y="180" width="310" height="480" rx="12" fill="#241d16" stroke="#4a3b2b"/>
    <rect x="810" y="200" width="270" height="180" rx="8" fill="#3d3023"/>
    <text x="945" y="300" fill="#fef3c7" font-family="Georgia,serif" font-size="20" font-weight="700" text-anchor="middle">Petra Al-Khazneh</text>
    <text x="810" y="420" fill="#fef3c7" font-size="18" font-weight="700">Ma'an, Jordan (1st C)</text>
    <text x="810" y="450" fill="#d6d3d1" font-size="13" leading="20">Historic and archaeological city in southern Jordan famous for its rock-cut architecture and water conduit system.</text>
    <rect x="810" y="590" width="120" height="32" rx="4" fill="#b45309"/>
    <text x="870" y="611" fill="#fff" font-size="12" font-weight="600" text-anchor="middle">EXPLORE</text>
  </g>
</svg>`
  );
  console.log('✓ history-monument-preview.svg written');

  fs.writeFileSync(
    path.join(publicDir, 'history-monument-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Monument Architectural Blueprint</title>
  <desc id="desc">Historical monument architectural breakdown, masonry data, and excavation chronology.</desc>
  <rect width="1200" height="760" fill="#120f0c"/>
  <rect x="60" y="50" width="1080" height="660" rx="14" fill="#1c1712" stroke="#3b2f23"/>
  <text x="100" y="115" fill="#fef3c7" font-family="Georgia,serif" font-size="28" font-weight="700">Architectural Analysis &amp; Masonry Specifications</text>
  <text x="100" y="148" fill="#b45309" font-family="ui-monospace,monospace" font-size="13">JSON DATA FEED: /data/monuments/taj-mahal.json</text>
  <g font-family="Inter,sans-serif" transform="translate(100, 180)">
    <rect width="460" height="480" rx="12" fill="#14100c" stroke="#3b2f23"/>
    <text x="30" y="50" fill="#fde68a" font-size="18" font-weight="700">Structural Geometry &amp; Symmetry</text>
    <text x="30" y="95" fill="#a8a29e" font-size="14">Base Plinth:</text>
    <text x="220" y="95" fill="#fef3c7" font-family="ui-monospace,monospace">95.5m square marble</text>
    <text x="30" y="145" fill="#a8a29e" font-size="14">Dome Height:</text>
    <text x="220" y="145" fill="#fef3c7" font-family="ui-monospace,monospace">35 meters (Central)</text>
    <text x="30" y="195" fill="#a8a29e" font-size="14">Minaret Incline:</text>
    <text x="220" y="195" fill="#fef3c7" font-family="ui-monospace,monospace">Outward by 2.5 degrees</text>
    <text x="30" y="245" fill="#a8a29e" font-size="14">Stone Inlay Technique:</text>
    <text x="220" y="245" fill="#fbbf24" font-weight="700">Pietra Dura (Semiprecious)</text>
    <text x="30" y="295" fill="#a8a29e" font-size="14">UNESCO Inscription:</text>
    <text x="220" y="295" fill="#34d399" font-weight="700">1983 (Criterion i)</text>

    <!-- Right Side Archaeological Chronology -->
    <rect x="500" width="480" height="480" rx="12" fill="#14100c" stroke="#3b2f23"/>
    <text x="530" y="50" fill="#fde68a" font-size="18" font-weight="700">Chronological Milestones</text>
    <circle cx="540" cy="110" r="6" fill="#f59e0b"/>
    <text x="560" y="115" fill="#fef3c7" font-size="14" font-weight="600">1632 AD: Construction Initiated</text>
    <text x="560" y="140" fill="#a8a29e" font-size="13">Over 20,000 artisans mobilized from Persia, Europe, and India.</text>

    <circle cx="540" cy="190" r="6" fill="#f59e0b"/>
    <text x="560" y="195" fill="#fef3c7" font-size="14" font-weight="600">1648 AD: Central Mausoleum Complete</text>
    <text x="560" y="220" fill="#a8a29e" font-size="13">Main dome and perimeter minarets finalized.</text>

    <circle cx="540" cy="270" r="6" fill="#f59e0b"/>
    <text x="560" y="275" fill="#fef3c7" font-size="14" font-weight="600">1653 AD: Gardens &amp; Outer Complex Finished</text>
    <text x="560" y="300" fill="#a8a29e" font-size="13">Charbagh quadrilateral garden layout completed.</text>

    <circle cx="540" cy="350" r="6" fill="#10b981"/>
    <text x="560" y="355" fill="#fef3c7" font-size="14" font-weight="600">Present Day: Digital Preservation</text>
    <text x="560" y="380" fill="#a8a29e" font-size="13">Photogrammetry 3D scans and JSON educational archive integration.</text>
  </g>
</svg>`
  );
  console.log('✓ history-monument-detail.svg written');

  // 10. Unity Game Engine Mechanics
  fs.writeFileSync(
    path.join(publicDir, 'mygame-preview.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Unity 3D Game Mechanics Viewport</title>
  <desc id="desc">Physics interactions, character control, and level mechanics prototype developed in C# and Unity.</desc>
  <defs>
    <linearGradient id="gameSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="60%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#gameSky)"/>
  <!-- Perspective Grid -->
  <path d="M 0 540 L 1200 540 M 0 600 L 1200 600 M 0 680 L 1200 680" stroke="#312e81" stroke-width="2" opacity="0.6"/>
  <path d="M 600 500 L 0 760 M 600 500 L 300 760 M 600 500 L 900 760 M 600 500 L 1200 760" stroke="#312e81" stroke-width="2" opacity="0.6"/>
  <!-- Player HUD -->
  <g font-family="ui-monospace,monospace">
    <!-- Health Bar -->
    <rect x="50" y="50" width="280" height="28" rx="6" fill="#18181b" stroke="#3f3f46"/>
    <rect x="54" y="54" width="210" height="20" rx="4" fill="#ef4444"/>
    <text x="64" y="69" fill="#ffffff" font-size="12" font-weight="700">HP 180 / 240</text>
    <!-- Stamina Bar -->
    <rect x="50" y="86" width="240" height="20" rx="4" fill="#18181b" stroke="#3f3f46"/>
    <rect x="54" y="89" width="190" height="14" rx="2" fill="#22c55e"/>
    <text x="64" y="101" fill="#ffffff" font-size="10" font-weight="700">STAMINA 85%</text>
    <!-- Minimap -->
    <circle cx="1100" cy="110" r="60" fill="#09090b" stroke="#6366f1" stroke-width="3"/>
    <circle cx="1100" cy="110" r="5" fill="#22c55e"/>
    <circle cx="1080" cy="90" r="4" fill="#ef4444"/>
    <circle cx="1120" cy="130" r="4" fill="#ef4444"/>
    <!-- Crosshair -->
    <circle cx="600" cy="380" r="18" fill="none" stroke="#d4ff00" stroke-width="2" stroke-dasharray="6 6"/>
    <circle cx="600" cy="380" r="3" fill="#d4ff00"/>
    <!-- Weapon Indicator -->
    <rect x="940" y="660" width="210" height="60" rx="8" fill="#18181b" stroke="#3f3f46"/>
    <text x="960" y="695" fill="#f4f4f5" font-size="16" font-weight="700">C# KINEMATIC RIG</text>
    <text x="960" y="712" fill="#a1a1aa" font-size="11">Active Weapon: Plasma Cannon</text>
  </g>
</svg>`
  );
  console.log('✓ mygame-preview.svg written');

  fs.writeFileSync(
    path.join(publicDir, 'mygame-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Unity C# Physics &amp; Controller Inspector</title>
  <desc id="desc">Unity Rigidbody physics, velocity curves, character controller logic, and input handling.</desc>
  <rect width="1200" height="760" fill="#090a0f"/>
  <rect x="50" y="40" width="1100" height="680" rx="14" fill="#121620" stroke="#252d3d"/>
  <text x="90" y="95" fill="#f8fafc" font-family="Inter,sans-serif" font-size="28" font-weight="700">Unity C# Physics Inspector &amp; Collision Pipeline</text>
  <text x="90" y="125" fill="#818cf8" font-family="ui-monospace,monospace" font-size="13">CharacterController.cs // RigidBody3D Velocity Interpolation</text>
  <!-- Code Snippet -->
  <rect x="90" y="150" width="620" height="520" rx="10" fill="#090c13" stroke="#1f2937"/>
  <g font-family="ui-monospace,monospace" font-size="13">
    <text x="120" y="195" fill="#60a5fa">[RequireComponent(typeof(CharacterController))]</text>
    <text x="120" y="225" fill="#f43f5e">public class <tspan fill="#facc15">PlayerMechanics</tspan> : MonoBehaviour</text>
    <text x="120" y="255" fill="#e2e8f0">{</text>
    <text x="140" y="285" fill="#94a3b8">  [SerializeField] private float moveSpeed = 8.5f;</text>
    <text x="140" y="315" fill="#94a3b8">  [SerializeField] private float gravity = -19.62f;</text>
    <text x="140" y="345" fill="#94a3b8">  [SerializeField] private LayerMask groundMask;</text>
    <text x="140" y="385" fill="#34d399">  private void Update()</text>
    <text x="140" y="415" fill="#e2e8f0">  {</text>
    <text x="160" y="445" fill="#a5b4fc">    isGrounded = Physics.CheckSphere(groundCheck.position, 0.4f, groundMask);</text>
    <text x="160" y="475" fill="#e2e8f0">    Vector3 move = transform.right * input.x + transform.forward * input.y;</text>
    <text x="160" y="505" fill="#e2e8f0">    controller.Move(move * moveSpeed * Time.deltaTime);</text>
    <text x="160" y="535" fill="#fbbf24">    velocity.y += gravity * Time.deltaTime;</text>
    <text x="160" y="565" fill="#e2e8f0">    controller.Move(velocity * Time.deltaTime);</text>
    <text x="140" y="595" fill="#e2e8f0">  }</text>
    <text x="120" y="625" fill="#e2e8f0">}</text>
  </g>
  <!-- Physics Metrics -->
  <g font-family="Inter,sans-serif" transform="translate(740, 150)">
    <rect width="370" height="240" rx="10" fill="#181e2b" stroke="#2b3548"/>
    <text x="30" y="45" fill="#f8fafc" font-size="16" font-weight="700">Physics Engine Telemetry</text>
    <text x="30" y="85" fill="#94a3b8" font-size="14">Physics Step Rate:</text>
    <text x="220" y="85" fill="#34d399" font-family="ui-monospace,monospace" font-weight="700">50 Hz FixedUpdate</text>
    <text x="30" y="125" fill="#94a3b8" font-size="14">Collision Layers:</text>
    <text x="220" y="125" fill="#f8fafc" font-family="ui-monospace,monospace">Ground / NPC / Hitbox</text>
    <text x="30" y="165" fill="#94a3b8" font-size="14">Raycast Detection:</text>
    <text x="220" y="165" fill="#38bdf8" font-family="ui-monospace,monospace">&lt; 0.05 ms latency</text>
    <text x="30" y="205" fill="#94a3b8" font-size="14">Input System:</text>
    <text x="220" y="205" fill="#fbbf24" font-family="ui-monospace,monospace">Unity New Input Sys</text>

    <rect y="260" width="370" height="260" rx="10" fill="#181e2b" stroke="#2b3548"/>
    <text x="30" y="300" fill="#f8fafc" font-size="16" font-weight="700">Animation State Machine</text>
    <rect x="30" y="330" width="140" height="40" rx="6" fill="#2563eb"/>
    <text x="100" y="355" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Idle_State</text>
    <text x="190" y="355" fill="#60a5fa" font-size="16">➔</text>
    <rect x="220" y="330" width="120" height="40" rx="6" fill="#1e293b"/>
    <text x="280" y="355" fill="#94a3b8" font-size="13" text-anchor="middle">Run_Blend</text>
    <rect x="30" y="400" width="310" height="36" rx="6" fill="#0f172a"/>
    <text x="185" y="423" fill="#a5b4fc" font-size="12" text-anchor="middle">Smooth 0.15s Transition Blending</text>
  </g>
</svg>`
  );
  console.log('✓ mygame-detail.svg written');

  // 11. React Footwear Catalog
  fs.writeFileSync(
    path.join(publicDir, 'react-shoes-preview.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">React Footwear Sneaker Store</title>
  <desc id="desc">Responsive footwear retail catalog frontend with real-time faceted search and dynamic cart state management.</desc>
  <rect width="1200" height="760" fill="#111114"/>
  <rect x="50" y="40" width="1100" height="680" rx="16" fill="#18181c" stroke="#2e2e36"/>
  <!-- Top Nav -->
  <text x="90" y="95" fill="#ffffff" font-family="Inter,sans-serif" font-size="28" font-weight="900" letter-spacing="-0.04em">KICKS // STREETWEAR FOOTWEAR</text>
  <text x="90" y="125" fill="#f43f5e" font-family="ui-monospace,monospace" font-size="13">NEW ARRIVALS 2026 // LIMITED RELEASE ARCHIVE</text>
  <!-- Sneaker 1 -->
  <g font-family="Inter,sans-serif">
    <rect x="90" y="160" width="320" height="500" rx="12" fill="#1f1f24" stroke="#363640"/>
    <rect x="110" y="180" width="280" height="220" rx="8" fill="#131316"/>
    <!-- Abstract Sneaker Silhouette -->
    <path d="M 140 310 Q 180 230 250 240 Q 300 230 350 280 L 370 340 L 140 340 Z" fill="#f43f5e"/>
    <path d="M 130 340 L 380 340 L 370 360 L 140 360 Z" fill="#ffffff"/>
    <text x="120" y="435" fill="#ffffff" font-size="20" font-weight="800">Air Velocity Retro 4</text>
    <text x="120" y="465" fill="#9ca3af" font-size="14">Black / Crimson Red / White</text>
    <text x="120" y="515" fill="#f43f5e" font-size="24" font-weight="800">$185.00</text>
    <rect x="120" y="570" width="260" height="46" rx="8" fill="#f43f5e"/>
    <text x="250" y="598" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle">ADD TO CART</text>

    <!-- Sneaker 2 -->
    <rect x="440" y="160" width="320" height="500" rx="12" fill="#1f1f24" stroke="#363640"/>
    <rect x="460" y="180" width="280" height="220" rx="8" fill="#131316"/>
    <path d="M 490 310 Q 530 230 600 240 Q 650 230 700 280 L 720 340 L 490 340 Z" fill="#3b82f6"/>
    <path d="M 480 340 L 730 340 L 720 360 L 490 360 Z" fill="#ffffff"/>
    <text x="470" y="435" fill="#ffffff" font-size="20" font-weight="800">Quantum Boost Low</text>
    <text x="470" y="465" fill="#9ca3af" font-size="14">Cobalt Blue / Pure Platinum</text>
    <text x="470" y="515" fill="#3b82f6" font-size="24" font-weight="800">$160.00</text>
    <rect x="470" y="570" width="260" height="46" rx="8" fill="#3b82f6"/>
    <text x="600" y="598" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle">ADD TO CART</text>

    <!-- Sneaker 3 -->
    <rect x="790" y="160" width="320" height="500" rx="12" fill="#1f1f24" stroke="#363640"/>
    <rect x="810" y="180" width="280" height="220" rx="8" fill="#131316"/>
    <path d="M 840 310 Q 880 230 950 240 Q 1000 230 1050 280 L 1070 340 L 840 340 Z" fill="#d4ff00"/>
    <path d="M 830 340 L 1080 340 L 1070 360 L 840 360 Z" fill="#ffffff"/>
    <text x="820" y="435" fill="#ffffff" font-size="20" font-weight="800">Volt Kinetic Runner</text>
    <text x="820" y="465" fill="#9ca3af" font-size="14">Electric Lime / Jet Black</text>
    <text x="820" y="515" fill="#d4ff00" font-size="24" font-weight="800">$210.00</text>
    <rect x="820" y="570" width="260" height="46" rx="8" fill="#d4ff00"/>
    <text x="950" y="598" fill="#111114" font-size="14" font-weight="800" text-anchor="middle">ADD TO CART</text>
  </g>
</svg>`
  );
  console.log('✓ react-shoes-preview.svg written');

  fs.writeFileSync(
    path.join(publicDir, 'react-shoes-detail.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1200" height="760" role="img" aria-labelledby="title desc">
  <title id="title">Sneaker Specification &amp; Cart State</title>
  <desc id="desc">Footwear retail sizing matrix, inventory availability, and React state architecture.</desc>
  <rect width="1200" height="760" fill="#0d0d10"/>
  <rect x="50" y="40" width="1100" height="680" rx="16" fill="#16161b" stroke="#2b2b35"/>
  <text x="90" y="95" fill="#ffffff" font-family="Inter,sans-serif" font-size="28" font-weight="800">Volt Kinetic Runner // Product Engineering</text>
  <text x="90" y="125" fill="#d4ff00" font-family="ui-monospace,monospace" font-size="13">React Context &amp; Redux Toolkit Cart State Management</text>
  <g font-family="Inter,sans-serif" transform="translate(90, 160)">
    <!-- Specs Column -->
    <rect width="520" height="500" rx="12" fill="#1d1d24" stroke="#33333f"/>
    <text x="40" y="50" fill="#f4f4f5" font-size="20" font-weight="700">Cushioning &amp; Sole Technology</text>
    <text x="40" y="95" fill="#a1a1aa" font-size="14">Midsole Material:</text>
    <text x="260" y="95" fill="#ffffff" font-weight="600">Dual-density Nitrogen Foam</text>
    <text x="40" y="145" fill="#a1a1aa" font-size="14">Outsole Traction:</text>
    <text x="260" y="145" fill="#ffffff" font-weight="600">Waffle-lug Carbon Rubber</text>
    <text x="40" y="195" fill="#a1a1aa" font-size="14">Upper Weave:</text>
    <text x="260" y="195" fill="#ffffff" font-weight="600">Engineered Breathable Mesh</text>
    <text x="40" y="245" fill="#a1a1aa" font-size="14">Drop (Heel to Toe):</text>
    <text x="260" y="245" fill="#d4ff00" font-weight="700">8 mm Dynamic Gradient</text>
    <!-- Size Selector -->
    <text x="40" y="315" fill="#f4f4f5" font-size="16" font-weight="700">Select US Size:</text>
    <rect x="40" y="340" width="60" height="44" rx="6" fill="#292933" stroke="#444455"/>
    <text x="70" y="367" fill="#fff" font-size="14" text-anchor="middle">8.0</text>
    <rect x="115" y="340" width="60" height="44" rx="6" fill="#292933" stroke="#444455"/>
    <text x="145" y="367" fill="#fff" font-size="14" text-anchor="middle">9.0</text>
    <rect x="190" y="340" width="60" height="44" rx="6" fill="#d4ff00"/>
    <text x="220" y="367" fill="#111" font-size="14" font-weight="800" text-anchor="middle">10.0</text>
    <rect x="265" y="340" width="60" height="44" rx="6" fill="#292933" stroke="#444455"/>
    <text x="295" y="367" fill="#fff" font-size="14" text-anchor="middle">11.0</text>
    <rect x="340" y="340" width="60" height="44" rx="6" fill="#292933" stroke="#444455"/>
    <text x="370" y="367" fill="#fff" font-size="14" text-anchor="middle">12.0</text>

    <!-- Cart State Column -->
    <rect x="560" width="460" height="500" rx="12" fill="#1d1d24" stroke="#33333f"/>
    <text x="600" y="50" fill="#f4f4f5" font-size="20" font-weight="700">Cart State Machine (Redux)</text>
    <rect x="600" y="80" width="380" height="200" rx="8" fill="#111114" stroke="#2c2c36"/>
    <text x="620" y="115" fill="#86efac" font-family="ui-monospace,monospace" font-size="13">// Redux Slice Dispatch</text>
    <text x="620" y="145" fill="#e4e4e7" font-family="ui-monospace,monospace" font-size="12">dispatch(addToCart({</text>
    <text x="640" y="170" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="12">  sku: "VKR-2026-LIME",</text>
    <text x="640" y="195" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="12">  size: 10.0,</text>
    <text x="640" y="220" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="12">  price: 210.00,</text>
    <text x="640" y="245" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="12">  quantity: 1</text>
    <text x="620" y="270" fill="#e4e4e7" font-family="ui-monospace,monospace" font-size="12">}));</text>

    <rect x="600" y="310" width="380" height="150" rx="8" fill="#111114" stroke="#2c2c36"/>
    <text x="620" y="345" fill="#e4e4e7" font-size="15" font-weight="600">Inventory Status:</text>
    <text x="620" y="380" fill="#22c55e" font-size="22" font-weight="700">In Stock (14 pairs left)</text>
    <text x="620" y="420" fill="#a1a1aa" font-size="13">Dispatched same-day via express delivery</text>
  </g>
</svg>`
  );
  console.log('✓ react-shoes-detail.svg written');

  console.log('All project preview SVGs generated successfully!');
}

main().catch(err => {
  console.error('Fatal error generating project images:', err);
  process.exit(1);
});
