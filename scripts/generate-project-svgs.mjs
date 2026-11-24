import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public', 'projects');

const svgData = [
  // 1. GlowAfter Theme Engine
  {
    name: 'glowafter-preview.svg',
    title: 'GlowAfter Theme Engine',
    desc: 'React and Tailwind CSS theme transition engine with smooth circular reveal and zero layout shift.',
    content: `
      <defs>
        <linearGradient id="bg_ga" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#090a0f"/><stop offset=".5" stop-color="#1e1b4b"/><stop offset="1" stop-color="#312e81"/></linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%"><stop stop-color="#fbbf24"/><stop offset="1" stop-color="#d97706"/></radialGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#bg_ga)"/>
      <rect x="80" y="70" width="1040" height="620" rx="32" fill="#0f172a" stroke="#6366f1" stroke-opacity=".4"/>
      <rect x="130" y="120" width="940" height="70" rx="18" fill="#1e293b"/>
      <text x="170" y="165" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="28" font-weight="900">GlowAfter</text>
      <text x="320" y="164" fill="#94a3b8" font-family="Inter,Arial,sans-serif" font-size="16">View-Transition Theme Engine</text>
      <circle cx="980" cy="155" r="20" fill="url(#sun)"/>
      <rect x="130" y="230" width="450" height="420" rx="24" fill="#1e1b4b" stroke="#818cf8" stroke-opacity=".3"/>
      <text x="170" y="290" fill="#a5b4fc" font-family="Inter,Arial,sans-serif" font-size="22" font-weight="800">Light / Dark Switch</text>
      <text x="170" y="330" fill="#e2e8f0" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">Ripple Transition</text>
      <circle cx="355" cy="460" r="110" fill="none" stroke="#6366f1" stroke-width="12" stroke-dasharray="8 8"/>
      <circle cx="355" cy="460" r="70" fill="#4338ca"/>
      <rect x="620" y="230" width="450" height="420" rx="24" fill="#0b0f19" stroke="#334155"/>
      <text x="660" y="290" fill="#38bdf8" font-family="Inter,Arial,sans-serif" font-size="18" font-weight="700">Code Architecture</text>
      <rect x="660" y="320" width="370" height="28" rx="8" fill="#1e293b"/>
      <rect x="660" y="365" width="310" height="28" rx="8" fill="#1e293b"/>
      <rect x="660" y="410" width="340" height="28" rx="8" fill="#1e293b"/>
      <rect x="660" y="455" width="280" height="28" rx="8" fill="#1e293b"/>
      <rect x="660" y="520" width="180" height="50" rx="14" fill="#6366f1"/>
      <text x="705" y="552" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="16" font-weight="800">Install npm</text>
    `
  },
  {
    name: 'glowafter-detail.svg',
    title: 'GlowAfter Transition Details',
    desc: 'Circular clip-path animation visual demonstrating seamless background theme reveal.',
    content: `
      <defs>
        <linearGradient id="ga_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#020617"/><stop offset="1" stop-color="#1e1b4b"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#ga_det)"/>
      <circle cx="600" cy="380" r="280" fill="#4f46e5" opacity=".2"/>
      <circle cx="600" cy="380" r="200" fill="#4338ca" opacity=".5"/>
      <circle cx="600" cy="380" r="120" fill="#6366f1"/>
      <text x="600" y="390" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="36" font-weight="900">0ms JANK</text>
    `
  },

  // 2. Create Modern MERN App CLI
  {
    name: 'mern-cli-preview.svg',
    title: 'Create Modern MERN App CLI',
    desc: 'Terminal command line generator scaffolding production MERN architectures.',
    content: `
      <defs>
        <linearGradient id="cli_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#0f172a"/><stop offset="1" stop-color="#022c22"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#cli_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="28" fill="#0a0a0c" stroke="#10b981" stroke-opacity=".4"/>
      <rect x="80" y="70" width="1040" height="56" rx="28" fill="#18181b"/>
      <circle cx="120" cy="98" r="8" fill="#ef4444"/><circle cx="145" cy="98" r="8" fill="#f59e0b"/><circle cx="170" cy="98" r="8" fill="#10b981"/>
      <text x="210" y="104" fill="#a1a1aa" font-family="monospace" font-size="16">bash - npx create-modern-mern-app</text>
      <text x="130" y="180" fill="#10b981" font-family="monospace" font-size="28" font-weight="900">$ npx create-modern-mern-app my-enterprise-saas</text>
      <text x="130" y="240" fill="#38bdf8" font-family="monospace" font-size="20">✔ Template selected: MERN + TypeScript + JWT + TailWind 4</text>
      <text x="130" y="280" fill="#a1a1aa" font-family="monospace" font-size="20">✔ Initializing Git &amp; Installing dependencies...</text>
      <text x="130" y="320" fill="#34d399" font-family="monospace" font-size="20">✔ Security: Helmet, Rate-Limit, CORS &amp; Joi configured</text>
      <text x="130" y="360" fill="#fbbf24" font-family="monospace" font-size="20">✔ Database: MongoDB Mongoose Schema engine bound</text>
      <rect x="130" y="420" width="940" height="220" rx="20" fill="#18181b" stroke="#27272a"/>
      <text x="170" y="475" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="800">Zero Configuration Enterprise Scaffold</text>
      <text x="170" y="520" fill="#9ca3af" font-family="Inter,Arial,sans-serif" font-size="16">Production-ready developer workflow with Vite 8, React 19, and Express 5.</text>
      <rect x="170" y="555" width="220" height="44" rx="12" fill="#10b981"/>
      <text x="220" y="583" fill="#052e16" font-family="monospace" font-size="16" font-weight="900">npm start // dev</text>
    `
  },
  {
    name: 'mern-cli-detail.svg',
    title: 'MERN CLI Architecture Modules',
    desc: 'Folder and package decomposition created by create-modern-mern-app CLI.',
    content: `
      <defs>
        <linearGradient id="cli_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#022c22"/><stop offset="1" stop-color="#064e3b"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#cli_det)"/>
      <rect x="250" y="150" width="700" height="460" rx="30" fill="#021f18" stroke="#10b981" stroke-width="4"/>
      <text x="600" y="280" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="44" font-weight="900">MERN // TS</text>
      <text x="600" y="360" text-anchor="middle" fill="#a7f3d0" font-family="Inter,Arial,sans-serif" font-size="24">Production Scaffolding CLI</text>
      <rect x="420" y="420" width="360" height="60" rx="16" fill="#10b981"/>
      <text x="600" y="458" text-anchor="middle" fill="#022c22" font-family="monospace" font-size="22" font-weight="900">v2.4.0 VERIFIED</text>
    `
  },

  // 3. AAtech Software Agency
  {
    name: 'aatech-preview.svg',
    title: 'AAtech Software Agency',
    desc: 'Modern software engineering agency showcase built with Python and sleek design.',
    content: `
      <defs>
        <linearGradient id="aatech_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#090a0f"/><stop offset=".4" stop-color="#172554"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#aatech_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#0a0f1d" stroke="#3b82f6" stroke-opacity=".35"/>
      <text x="140" y="150" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">AAtech Solutions</text>
      <text x="140" y="190" fill="#93c5fd" font-family="Inter,Arial,sans-serif" font-size="16">Enterprise Software, Cloud &amp; AI Engineering</text>
      <rect x="140" y="240" width="300" height="380" rx="20" fill="#1e293b"/>
      <rect x="470" y="240" width="300" height="380" rx="20" fill="#1e293b"/>
      <rect x="800" y="240" width="280" height="380" rx="20" fill="#1e293b"/>
      <circle cx="200" cy="310" r="30" fill="#3b82f6"/>
      <circle cx="530" cy="310" r="30" fill="#10b981"/>
      <circle cx="860" cy="310" r="30" fill="#f59e0b"/>
      <text x="170" y="390" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">Web &amp; Cloud</text>
      <text x="500" y="390" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">Custom APIs</text>
      <text x="830" y="390" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">Automation</text>
    `
  },
  {
    name: 'aatech-detail.svg',
    title: 'AAtech Agency Services',
    desc: 'Agency service delivery matrix and client project engagement breakdown.',
    content: `
      <defs>
        <linearGradient id="aatech_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0284c7"/><stop offset="1" stop-color="#0369a1"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#aatech_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="28" fill="#082f49" stroke="#38bdf8" stroke-width="4"/>
      <text x="600" y="340" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="44" font-weight="900">AAtech Platform</text>
      <text x="600" y="420" text-anchor="middle" fill="#bae6fd" font-family="Inter,Arial,sans-serif" font-size="22">Python Full Stack Agency</text>
    `
  },

  // 4. Smart Housing Backend API
  {
    name: 'smart-housing-preview.svg',
    title: 'Smart Housing Backend API',
    desc: 'Enterprise RESTful API backend managing housing infrastructure, tenants, and utility metrics.',
    content: `
      <defs>
        <linearGradient id="sh_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#14532d"/><stop offset="1" stop-color="#064e3b"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#sh_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="32" fill="#090d0b" stroke="#22c55e" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="32" font-weight="900">Smart Housing API</text>
      <text x="140" y="190" fill="#86efac" font-family="Inter,Arial,sans-serif" font-size="16">Tenant Management, Roles, Billing &amp; Automated Security</text>
      <rect x="140" y="240" width="450" height="380" rx="20" fill="#142118" stroke="#1e3a29"/>
      <text x="180" y="300" fill="#22c55e" font-family="monospace" font-size="20">POST /api/v1/auth/login</text>
      <text x="180" y="350" fill="#22c55e" font-family="monospace" font-size="20">GET  /api/v1/tenants/active</text>
      <text x="180" y="400" fill="#22c55e" font-family="monospace" font-size="20">POST /api/v1/billing/meter</text>
      <text x="180" y="450" fill="#22c55e" font-family="monospace" font-size="20">PUT  /api/v1/units/assign</text>
      <rect x="620" y="240" width="460" height="380" rx="20" fill="#0d1611" stroke="#1f2937"/>
      <text x="660" y="300" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="22" font-weight="800">RBAC Security Guard</text>
      <text x="660" y="340" fill="#9ca3af" font-family="Inter,Arial,sans-serif" font-size="16">Granular JWT claim authorization with refresh tokens.</text>
      <circle cx="850" cy="480" r="60" fill="#22c55e" opacity=".2"/>
      <circle cx="850" cy="480" r="30" fill="#22c55e"/>
    `
  },
  {
    name: 'smart-housing-detail.svg',
    title: 'Smart Housing Endpoint Matrix',
    desc: 'REST API Swagger / OpenAPI schema endpoint flow diagram for estate operations.',
    content: `
      <defs>
        <linearGradient id="sh_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#064e3b"/><stop offset="1" stop-color="#022c22"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#sh_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="30" fill="#052e16" stroke="#22c55e" stroke-width="4"/>
      <text x="600" y="350" text-anchor="middle" fill="#4ade80" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="900">HOUSING BACKEND</text>
      <text x="600" y="420" text-anchor="middle" fill="#dcfce7" font-family="Inter,Arial,sans-serif" font-size="22">RESTful Architecture</text>
    `
  },

  // 5. Bright World Lighting Store
  {
    name: 'bright-world-preview.svg',
    title: 'Bright World Lighting Store',
    desc: 'OOP commercial e-commerce storefront for lighting fixtures, chandeliers, and home decor.',
    content: `
      <defs>
        <linearGradient id="bw_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#713f12"/><stop offset="1" stop-color="#ca8a04"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#bw_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#0f0c05" stroke="#eab308" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#fef08a" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">Bright World</text>
      <text x="140" y="190" fill="#fde047" font-family="Inter,Arial,sans-serif" font-size="16">Luxury Lighting &amp; Chandelier E-Store</text>
      <rect x="140" y="240" width="290" height="380" rx="20" fill="#1c160c"/>
      <rect x="460" y="240" width="290" height="380" rx="20" fill="#1c160c"/>
      <rect x="780" y="240" width="300" height="380" rx="20" fill="#1c160c"/>
      <circle cx="285" cy="340" r="50" fill="#eab308"/>
      <circle cx="605" cy="340" r="50" fill="#f59e0b"/>
      <circle cx="930" cy="340" r="50" fill="#d97706"/>
      <text x="210" y="440" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">Chandeliers</text>
      <text x="540" y="440" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">Pendant Lights</text>
      <text x="860" y="440" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">LED Ambience</text>
    `
  },
  {
    name: 'bright-world-detail.svg',
    title: 'Bright World Storefront Details',
    desc: 'Product catalog filtering and interactive cart operations breakdown.',
    content: `
      <defs>
        <linearGradient id="bw_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#a16207"/><stop offset="1" stop-color="#422006"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#bw_det)"/>
      <circle cx="600" cy="380" r="220" fill="#eab308" opacity=".3"/>
      <circle cx="600" cy="380" r="140" fill="#fef08a"/>
      <text x="600" y="390" text-anchor="middle" fill="#713f12" font-family="Inter,Arial,sans-serif" font-size="36" font-weight="900">OOP COMMERCE</text>
    `
  },

  // 6. History Monuments Portal
  {
    name: 'history-monument-preview.svg',
    title: 'History Monuments Portal',
    desc: 'Educational historical portal with JSON datasets, monuments gallery, and architectural timelines.',
    content: `
      <defs>
        <linearGradient id="hm_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#451a03"/><stop offset="1" stop-color="#78350f"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#hm_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#0f0b08" stroke="#b45309" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#fed7aa" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">History &amp; Monuments</text>
      <text x="140" y="190" fill="#fdba74" font-family="Inter,Arial,sans-serif" font-size="16">Heritage Sites, Architectural Histories &amp; Interactive Archives</text>
      <rect x="140" y="240" width="450" height="380" rx="20" fill="#1c130d"/>
      <text x="180" y="300" fill="#fb923c" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="800">Global Wonders</text>
      <rect x="180" y="340" width="370" height="180" rx="14" fill="#2d1c10"/>
      <rect x="620" y="240" width="460" height="380" rx="20" fill="#1c130d"/>
      <text x="660" y="300" fill="#fb923c" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="800">Timeline &amp; Dynasties</text>
      <rect x="660" y="340" width="380" height="20" rx="8" fill="#432815"/>
      <rect x="660" y="380" width="300" height="20" rx="8" fill="#432815"/>
      <rect x="660" y="420" width="340" height="20" rx="8" fill="#432815"/>
    `
  },
  {
    name: 'history-monument-detail.svg',
    title: 'Monuments Archive Dataset',
    desc: 'Structured JSON museum archives and responsive media galleries view.',
    content: `
      <defs>
        <linearGradient id="hm_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#9a3412"/><stop offset="1" stop-color="#431407"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#hm_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="28" fill="#271008" stroke="#fb923c" stroke-width="4"/>
      <text x="600" y="350" text-anchor="middle" fill="#ffedd5" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="900">HISTORICAL ARCHIVES</text>
      <text x="600" y="420" text-anchor="middle" fill="#fdba74" font-family="Inter,Arial,sans-serif" font-size="22">Curated JSON Heritage Data</text>
    `
  },

  // 7. Core PHP Admin Dashboard
  {
    name: 'core-php-admin-preview.svg',
    title: 'Core PHP Admin Dashboard',
    desc: 'Custom CRUD administration control panel built in pure Core PHP and MySQL.',
    content: `
      <defs>
        <linearGradient id="cpa_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#1e1b4b"/><stop offset="1" stop-color="#4f46e5"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#cpa_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#090a12" stroke="#6366f1" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="32" font-weight="900">Core PHP Admin</text>
      <text x="140" y="190" fill="#a5b4fc" font-family="Inter,Arial,sans-serif" font-size="16">Authentication, User Management, Database CRUD &amp; Session Control</text>
      <rect x="140" y="240" width="220" height="380" rx="16" fill="#111827"/>
      <rect x="160" y="280" width="180" height="36" rx="8" fill="#4f46e5"/>
      <rect x="160" y="330" width="180" height="36" rx="8" fill="#1f2937"/>
      <rect x="160" y="380" width="180" height="36" rx="8" fill="#1f2937"/>
      <rect x="390" y="240" width="690" height="380" rx="16" fill="#111827"/>
      <text x="430" y="300" fill="#e5e7eb" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800">Database Records</text>
      <rect x="430" y="330" width="610" height="40" rx="8" fill="#1f2937"/>
      <rect x="430" y="385" width="610" height="40" rx="8" fill="#1f2937"/>
      <rect x="430" y="440" width="610" height="40" rx="8" fill="#1f2937"/>
    `
  },
  {
    name: 'core-php-admin-detail.svg',
    title: 'Core PHP Admin Control Matrix',
    desc: 'Session security and SQL injection sanitization data table view.',
    content: `
      <defs>
        <linearGradient id="cpa_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#4338ca"/><stop offset="1" stop-color="#1e1b4b"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#cpa_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="28" fill="#0f172a" stroke="#818cf8" stroke-width="4"/>
      <text x="600" y="350" text-anchor="middle" fill="#c7d2fe" font-family="Inter,Arial,sans-serif" font-size="40" font-weight="900">PHP &amp; MySQL ADMIN</text>
      <text x="600" y="420" text-anchor="middle" fill="#e0e7ff" font-family="Inter,Arial,sans-serif" font-size="22">CRUD Operations Suite</text>
    `
  },

  // 8. Unity Game Mechanics
  {
    name: 'mygame-preview.svg',
    title: 'Unity Game Engine Mechanics',
    desc: 'Interactive 3D physics simulation and gameplay mechanics developed with C# in Unity.',
    content: `
      <defs>
        <linearGradient id="mg_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#155e75"/><stop offset="1" stop-color="#0e7490"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#mg_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#081014" stroke="#06b6d4" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">Unity 3D Mechanics</text>
      <text x="140" y="190" fill="#67e8f9" font-family="Inter,Arial,sans-serif" font-size="16">C# Scripts, Rigidbody Physics, Collision Detectors &amp; Particle FX</text>
      <polygon points="600,280 750,560 450,560" fill="#0891b2" opacity=".7"/>
      <polygon points="600,280 675,560 450,560" fill="#0e7490"/>
      <circle cx="600" cy="240" r="40" fill="#22d3ee"/>
      <rect x="140" y="520" width="280" height="100" rx="16" fill="#164e63"/>
      <text x="180" y="580" fill="#cffafe" font-family="monospace" font-size="20">FPS: 60 // STABLE</text>
    `
  },
  {
    name: 'mygame-detail.svg',
    title: 'Unity C# Physics Controller',
    desc: 'Character kinematics, jump curves, and collision pipeline logic representation.',
    content: `
      <defs>
        <linearGradient id="mg_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0891b2"/><stop offset="1" stop-color="#164e63"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#mg_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="28" fill="#082f49" stroke="#22d3ee" stroke-width="4"/>
      <text x="600" y="350" text-anchor="middle" fill="#a5f3fc" font-family="Inter,Arial,sans-serif" font-size="44" font-weight="900">UNITY &amp; C# ENGINE</text>
      <text x="600" y="420" text-anchor="middle" fill="#ecfeff" font-family="Inter,Arial,sans-serif" font-size="22">Real-time Game Physics</text>
    `
  },

  // 9. React Footwear Catalog
  {
    name: 'react-shoes-preview.svg',
    title: 'React Footwear Catalog',
    desc: 'Responsive shoe retail storefront built with React, interactive filters, and cart state.',
    content: `
      <defs>
        <linearGradient id="rs_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#831843"/><stop offset="1" stop-color="#be185d"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#rs_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#0f090c" stroke="#ec4899" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#fbcfe8" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">Footwear Retail Catalog</text>
      <text x="140" y="190" fill="#f472b6" font-family="Inter,Arial,sans-serif" font-size="16">React 19, Dynamic Filtering, Live Pricing &amp; Cart State</text>
      <rect x="140" y="240" width="300" height="380" rx="20" fill="#1f1117"/>
      <rect x="470" y="240" width="300" height="380" rx="20" fill="#1f1117"/>
      <rect x="800" y="240" width="280" height="380" rx="20" fill="#1f1117"/>
      <path d="M200 420c60-80 120-20 180-60" fill="none" stroke="#ec4899" stroke-width="12" stroke-linecap="round"/>
      <path d="M530 420c60-80 120-20 180-60" fill="none" stroke="#f472b6" stroke-width="12" stroke-linecap="round"/>
      <path d="M850 420c50-80 100-20 150-60" fill="none" stroke="#fb7185" stroke-width="12" stroke-linecap="round"/>
    `
  },
  {
    name: 'react-shoes-detail.svg',
    title: 'React Shoes Catalog Cart Details',
    desc: 'Cart and checkout state interaction for footwear retail store.',
    content: `
      <defs>
        <linearGradient id="rs_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#be185d"/><stop offset="1" stop-color="#500724"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#rs_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="28" fill="#1f0914" stroke="#f472b6" stroke-width="4"/>
      <text x="600" y="350" text-anchor="middle" fill="#fce7f3" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="900">REACT FOOTWEAR</text>
      <text x="600" y="420" text-anchor="middle" fill="#fbcfe8" font-family="Inter,Arial,sans-serif" font-size="22">Modular Catalog Frontend</text>
    `
  },

  // 10. Plant-Based Living Portal
  {
    name: 'plant-based-preview.svg',
    title: 'Plant-Based Living Portal',
    desc: 'Competition-winning ecological sustainability web portal with interactive nutrition guides.',
    content: `
      <defs>
        <linearGradient id="pb_bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#050505"/><stop offset=".5" stop-color="#14532d"/><stop offset="1" stop-color="#15803d"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#pb_bg)"/>
      <rect x="80" y="70" width="1040" height="620" rx="30" fill="#09120c" stroke="#4ade80" stroke-opacity=".4"/>
      <text x="140" y="150" fill="#bbf7d0" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="900">Plant-Based Living</text>
      <text x="140" y="190" fill="#86efac" font-family="Inter,Arial,sans-serif" font-size="16">Award-Winning Environmental &amp; Plant Nutrition Portal</text>
      <rect x="140" y="240" width="450" height="380" rx="20" fill="#102316"/>
      <circle cx="365" cy="400" r="90" fill="#166534"/>
      <path d="M365 310c40 40 40 100 0 140-40-40-40-100 0-140z" fill="#4ade80"/>
      <rect x="620" y="240" width="460" height="380" rx="20" fill="#102316"/>
      <text x="660" y="310" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="800">Carbon &amp; Health Insights</text>
      <rect x="660" y="360" width="370" height="24" rx="8" fill="#14532d"/>
      <rect x="660" y="410" width="330" height="24" rx="8" fill="#14532d"/>
      <rect x="660" y="460" width="290" height="24" rx="8" fill="#14532d"/>
    `
  },
  {
    name: 'plant-based-detail.svg',
    title: 'Plant-Based Sustainability Metrics',
    desc: 'Ecological impact charts and plant-based dietary benefits overview.',
    content: `
      <defs>
        <linearGradient id="pb_det" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#15803d"/><stop offset="1" stop-color="#052e16"/></linearGradient>
      </defs>
      <rect width="1200" height="760" fill="url(#pb_det)"/>
      <rect x="250" y="160" width="700" height="440" rx="28" fill="#052e16" stroke="#4ade80" stroke-width="4"/>
      <text x="600" y="350" text-anchor="middle" fill="#dcfce7" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="900">AZM CONTEST WINNER</text>
      <text x="600" y="420" text-anchor="middle" fill="#bbf7d0" font-family="Inter,Arial,sans-serif" font-size="22">Plant-Based Living Portal</text>
    `
  }
];

for (const svg of svgData) {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" role="img" aria-labelledby="title desc">
  <title id="title">\${svg.title}</title>
  <desc id="desc">\${svg.desc}</desc>
  \${svg.content.trim()}
</svg>`;
  fs.writeFileSync(path.join(outDir, svg.name), fullSvg.trim() + '\\n');
  console.log('Generated:', svg.name);
}
console.log('All 20 SVGs successfully generated!');
