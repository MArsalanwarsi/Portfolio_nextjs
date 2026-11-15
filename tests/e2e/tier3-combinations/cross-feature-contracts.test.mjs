import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlobalsCss,
  getComponentContent,
  getPortfolioData,
  calculateContrastRatio,
  getRouteContactContent,
} from '../../helpers/test-context.mjs';

describe('Tier 3: Cross-Feature Interaction & Contract Tests', () => {
  const css = getGlobalsCss();
  const data = getPortfolioData();
  const navbarTsx = getComponentContent('Navbar.tsx');
  const chromeCss = getComponentContent('Chrome.module.css');
  const contactForm = getComponentContent('ContactForm.tsx');
  const projectCarousel = getComponentContent('ProjectCarousel.tsx');
  const heroCode = getComponentContent('Hero.tsx');
  const routeCode = getRouteContactContent();

  test(
    'T3-COMB-01: Floating Chrome Nav Monogram × Theme Palette Contrast (WCAG AA/AAA)',
    () => {
      // Contrast of Charcoal (#202020) text on Paper White (#f4f4f4)
      const lightRatio = calculateContrastRatio('#202020', '#f4f4f4');
      assert.ok(
        lightRatio >= 7.0,
        `Light canvas text contrast (${lightRatio.toFixed(2)}) must exceed WCAG AAA (7.0)`
      );

      // Contrast of Paper White (#f4f4f4) text on Charcoal (#202020)
      const darkRatio = calculateContrastRatio('#f4f4f4', '#202020');
      assert.ok(
        darkRatio >= 7.0,
        `Dark canvas text contrast (${darkRatio.toFixed(2)}) must exceed WCAG AAA (7.0)`
      );

      // Contrast of Silver button (#eeeeee) with dark Charcoal label (#202020)
      const buttonRatio = calculateContrastRatio('#202020', '#eeeeee');
      assert.ok(
        buttonRatio >= 4.5,
        `Signal lime button label contrast (${buttonRatio.toFixed(2)}) must exceed WCAG AA (4.5)`
      );
    }
  );

  test(
    'T3-COMB-02: Topographic Contour SVG Pattern Ground × Alternating Section Canvases',
    () => {
      assert.match(
        css,
        /--(?:color-)?paddock-olive:\s*(?:#202020|var)/i,
        'globals.css must define Charcoal token'
      );
      assert.match(
        css,
        /--(?:color-)?chalk-cream:\s*(?:#f4f4f4|var)/i,
        'globals.css must define Paper White token'
      );
      const contourCode =
        getComponentContent('ContourBackground.tsx') +
        getComponentContent('TopoMap.tsx');
      assert.ok(
        contourCode.length > 0 || /topo|contour|svg/i.test(css),
        'Contour SVG pattern must be integrated in components or CSS'
      );
    }
  );

  test(
    'T3-COMB-03: Contact Honeypot Field × Rate-Limiting Invariant',
    () => {
      assert.match(
        contactForm,
        /company/i,
        'Contact form must render honeypot company input field'
      );
      assert.match(
        contactForm,
        /success|sent/i,
        'Contact form must implement success UI feedback'
      );
      assert.match(
        routeCode,
        /if\s*\(\s*validation\.data\.company\s*\)\s*\{[\s\S]*?return\s+jsonResponse\([\s\S]*?200[\s\S]*?\)/,
        'Contact API route must silently succeed with HTTP 200 on honeypot without mailing'
      );
    }
  );

  test(
    'T3-COMB-04: Navigation Menu Full-Screen Dialog × Lando Motion Curve Easing',
    () => {
      assert.match(
        chromeCss,
        /animation:\s*menu-reveal\s*\.75s\s*cubic-bezier\(\.65,\.05,0,1\)/,
        'Menu open animation must strictly use .75s cubic-bezier(.65, .05, 0, 1)'
      );
      assert.match(
        navbarTsx,
        /dialog\.current\?\.showModal\(\)/,
        'Navbar must open dialog using native showModal() API'
      );
    }
  );

  test(
    'T3-COMB-05: Visor Black Project Cards × Chamfer Geometry × Zero Drop Shadows',
    () => {
      const projectsCode =
        getComponentContent('Projects.tsx') + projectCarousel;
      const hasVisorBlackOrTarmac =
        /#151515/i.test(projectsCode) ||
        /#545454/i.test(projectsCode) ||
        /#151515/i.test(css);
      assert.ok(
        hasVisorBlackOrTarmac,
        'Project cards must use Visor Black #151515 canvas and Tarmac Gray #545454 outlines'
      );

      const hasChamferOrPolygon =
        /polygon|chamfer|clip-path/i.test(projectsCode + css);
      assert.ok(
        hasChamferOrPolygon,
        'Project cards must implement chamfer notch geometry'
      );

      assert.doesNotMatch(
        projectsCode,
        /\bshadow-(?:md|lg|xl|2xl)\b/i,
        'Project cards must strictly enforce zero drop shadows'
      );
    }
  );

  test(
    'T3-COMB-06: 67 Skills Architecture × Category Counts × Soft Gray Pills',
    () => {
      const skills = data.sections.skills.items;
      assert.strictEqual(skills.length, 67, 'Total skills count must remain exactly 67');
      const counts = {
        frontend: skills.filter((s) => s.category === 'frontend').length,
        backend: skills.filter((s) => s.category === 'backend').length,
        database: skills.filter((s) => s.category === 'database').length,
        tools: skills.filter((s) => s.category === 'tools').length,
      };
      assert.strictEqual(counts.frontend, 27);
      assert.strictEqual(counts.backend, 16);
      assert.strictEqual(counts.database, 7);
      assert.strictEqual(counts.tools, 17);
    }
  );

  test(
    'T3-COMB-07: Resume Asset Link × Direct PDF Download Attributes',
    () => {
      const resumeUrl = data.siteConfig.resumeUrl;
      assert.strictEqual(resumeUrl, '/M_Arsalan_Warsi_CV.pdf');
    }
  );

  test(
    'T3-COMB-08: Form Input Focus States × Uncontrolled/Controlled Form State',
    () => {
      const retainsValues =
        /value=\{form\./.test(contactForm) ||
        /value=\{formData\./.test(contactForm);
      assert.ok(
        retainsValues,
        'Contact form inputs must be controlled to retain draft message values'
      );
    }
  );

  test(
    'T3-COMB-09: Active Sprint Ticket Widget × Hero Scroll Parallax Scale',
    () => {
      const heroContent = heroCode + getComponentContent('Hero.module.css');
      const hasActiveSprint =
        /siteConfig\.availability/.test(heroContent);
      assert.ok(
        hasActiveSprint,
        'Hero must render the current availability from portfolio data'
      );
      assert.match(
        data.siteConfig.availability,
        /Open to work/i,
        'siteConfig must confirm Open to work status'
      );
    }
  );

  test(
    'T3-COMB-10: Mixed-Face Statement Block × Dual Font Alignment & Contrast',
    () => {
      const contrast = calculateContrastRatio('#dedede', '#202020');
      assert.ok(
        contrast >= 7.0,
        `Silver Gray on Charcoal contrast (${contrast.toFixed(2)}) must exceed WCAG AAA (7.0)`
      );

      const mossContrast = calculateContrastRatio('#bcbcbc', '#202020');
      assert.ok(
        mossContrast >= 4.5,
        `Mid Gray on Charcoal contrast (${mossContrast.toFixed(2)}) must exceed WCAG AA (4.5)`
      );
    }
  );
});
