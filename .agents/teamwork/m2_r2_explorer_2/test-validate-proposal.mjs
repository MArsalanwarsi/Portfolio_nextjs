import fs from 'node:fs';
import path from 'node:path';

let css = fs.readFileSync('app/globals.css', 'utf8');

const targetOpenTypeBlock = `/* ============================================================================
   OpenType Mona Sans & Bodoni Moda Variation Presets
   ============================================================================ */
.font-statement {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 660;
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -0.01em;
}

.font-title {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 750;
  text-transform: uppercase;
  line-height: 0.89;
  letter-spacing: -0.03em;
}

.font-serif-accent {
  font-family: var(--font-serif), Georgia, serif;
  color: var(--moss-lime);
  font-weight: 700;
  letter-spacing: -0.025em;
}`;

const replacementOpenTypeBlock = `/* ============================================================================
   OpenType Mona Sans & Bodoni Moda Variation Presets & Type Scale Utilities
   ============================================================================ */
.font-statement {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 660;
  font-size: 117.59px;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -0.93px;
}

.font-title {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 750;
  font-size: 66.67px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.89;
  letter-spacing: -1.85px;
}

.font-impact {
  font-family: var(--font-sans), sans-serif;
  font-variation-settings: "wdth" 93, "wght" 750;
  font-size: 103.7px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.82;
  letter-spacing: -3.7px;
}

.font-button {
  font-family: var(--font-sans), sans-serif;
  font-size: 14.81px;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0px;
}

.font-body {
  font-family: var(--font-sans), sans-serif;
  font-size: 18.52px;
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.19px;
}

.font-serif-accent {
  font-family: var(--font-serif), Georgia, serif;
  color: var(--moss-lime);
  font-weight: 700;
  letter-spacing: -0.025em;
}`;

// Normalize line endings for replacement
const normalizeLf = (s) => s.replace(/\r\n/g, '\n');

let proposedCss = normalizeLf(css)
  // 1. :root tokens: add direct --color-* aliases
  .replace(
    normalizeLf(`  --paddock-olive: #282c20;
  --chalk-cream: #f4f4ed;
  --signal-lime: #d2ff00;
  --moss-lime: #b2c73a;
  --visor-black: #111112;
  --sage-fog: #dde1d2;
  --tarmac-gray: #535450;
  --lichen-gray: #b4b8a5;
  --stone-gray: #b9bbad;`),
    normalizeLf(`  --paddock-olive: #282c20;
  --color-paddock-olive: #282c20;
  --chalk-cream: #f4f4ed;
  --color-chalk-cream: #f4f4ed;
  --signal-lime: #d2ff00;
  --color-signal-lime: #d2ff00;
  --moss-lime: #b2c73a;
  --color-moss-lime: #b2c73a;
  --visor-black: #111112;
  --color-visor-black: #111112;
  --sage-fog: #dde1d2;
  --color-sage-fog: #dde1d2;
  --tarmac-gray: #535450;
  --color-tarmac-gray: #535450;
  --lichen-gray: #b4b8a5;
  --color-lichen-gray: #b4b8a5;
  --stone-gray: #b9bbad;
  --color-stone-gray: #b9bbad;`)
  )
  // 2. @theme inline: direct hex values + font weights + tracking
  .replace(
    normalizeLf(`  --color-paddock: var(--paddock-olive);
  --color-paddock-olive: var(--paddock-olive);
  --color-chalk: var(--chalk-cream);
  --color-chalk-cream: var(--chalk-cream);
  --color-signal-lime: var(--signal-lime);
  --color-moss-lime: var(--moss-lime);
  --color-visor-black: var(--visor-black);
  --color-sage-fog: var(--sage-fog);
  --color-tarmac: var(--tarmac-gray);
  --color-tarmac-gray: var(--tarmac-gray);
  --color-lichen: var(--lichen-gray);
  --color-lichen-gray: var(--lichen-gray);
  --color-stone: var(--stone-gray);
  --color-stone-gray: var(--stone-gray);`),
    normalizeLf(`  --color-paddock: #282c20;
  --color-paddock-olive: #282c20;
  --color-chalk: #f4f4ed;
  --color-chalk-cream: #f4f4ed;
  --color-signal-lime: #d2ff00;
  --color-moss-lime: #b2c73a;
  --color-visor-black: #111112;
  --color-sage-fog: #dde1d2;
  --color-tarmac: #535450;
  --color-tarmac-gray: #535450;
  --color-lichen: #b4b8a5;
  --color-lichen-gray: #b4b8a5;
  --color-stone: #b9bbad;
  --color-stone-gray: #b9bbad;`)
  )
  .replace(
    normalizeLf(`  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;`),
    normalizeLf(`  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Mona Sans Font Weight Tokens (400 to 800) */
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Tracking Tokens */
  --tracking-statement: -0.93px;
  --tracking-title: -1.85px;
  --tracking-impact: -3.7px;
  --tracking-body: -0.19px;
  --tracking-serif-wide: 0.74px;`)
  )
  // 3. body layer: add font-weight: 400 and letter-spacing: -0.19px
  .replace(
    normalizeLf(`    font-family: var(--font-sans), sans-serif;
    background-color: var(--background);`),
    normalizeLf(`    font-family: var(--font-sans), sans-serif;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: -0.19px;
    background-color: var(--background);`)
  )
  // 4. typography variation presets
  .replace(
    normalizeLf(targetOpenTypeBlock),
    normalizeLf(replacementOpenTypeBlock)
  );

// Write proposed replacement file in our folder
fs.writeFileSync('.agents/teamwork/m2_r2_explorer_2/proposed_globals.css', proposedCss, 'utf8');
console.log('Saved proposed_globals.css with clean replacement.');
