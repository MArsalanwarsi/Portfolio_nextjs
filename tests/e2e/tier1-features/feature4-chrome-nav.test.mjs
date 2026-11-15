import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlobalsCss,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 4: Floating Chrome Navigation', () => {
  const css = getGlobalsCss();
  const navbarTsx = getComponentContent('Navbar.tsx');
  const chromeCss = getComponentContent('Chrome.module.css');

  test('T1-F4-01: Inset Fixed Layout Geometry (Fixed, Inset, High Z-Index)', () => {
    const isFixed =
      /position:\s*fixed/i.test(chromeCss) || /fixed/i.test(navbarTsx);
    assert.ok(isFixed, 'ChromeNav layer must use fixed positioning');

    const hasInsets =
      /top:\s*(?:15px|20px);/i.test(chromeCss) ||
      /inset:\s*18\.52px/i.test(chromeCss) ||
      /inset/i.test(navbarTsx);
    assert.ok(hasInsets, 'ChromeNav must be inset from viewport edges');

    const hasHighZIndex =
      /z-index:\s*(?:50|70|100)/i.test(chromeCss) ||
      /z-(?:50|70|100)/i.test(navbarTsx);
    assert.ok(hasHighZIndex, 'ChromeNav must have high z-index stacking context');
  });

  test('T1-F4-02: Stacked Brand Wordmark (Arsalan serif over WARSI sans)', () => {
    assert.match(
      navbarTsx,
      /Arsalan/i,
      'Navbar must contain first name "Arsalan"'
    );
    assert.match(
      navbarTsx,
      /WARSI/i,
      'Navbar must contain uppercase surname "WARSI"'
    );
    assert.match(
      chromeCss,
      /\.wordmark\s*\{[^}]*display:\s*inline-flex;[^}]*flex-direction:\s*column;/i,
      'Wordmark must be stacked vertically (serif over heavy sans)'
    );
  });

  test('T1-F4-03: Section links belong to the navigation dialog', () => {
    const header = navbarTsx.match(/<header\b[\s\S]*?<\/header>/)?.[0];
    assert.ok(header);
    assert.doesNotMatch(header, /<nav\b|href="#(?:projects|about|experience)"/);
    assert.match(navbarTsx, /<dialog\b[\s\S]*directoryLinks\.map/);
    for (const section of ['projects', 'about', 'experience']) {
      assert.ok(navbarTsx.includes('href: "#' + section + '"'));
    }
  });
  test('T1-F4-04: Silver CTA Button Dimensions & Styling', () => {
    const hasSignalLimeFill =
      /background:\s*#eeeeee/i.test(chromeCss) ||
      /bg-\[#eeeeee\]/i.test(navbarTsx);
    assert.ok(hasSignalLimeFill, 'CTA button must have Silver #eeeeee background');

    const hasRadius8px =
      /border-radius:\s*8px/i.test(chromeCss) ||
      /rounded-\[8px\]/i.test(navbarTsx) ||
      /rounded-lg/i.test(navbarTsx);
    assert.ok(hasRadius8px, 'CTA button must have 8px border-radius');

    const hasHeight55 =
      /height:\s*(?:55px|55\.5px)/i.test(chromeCss) ||
      /h-\[55\.5px\]/i.test(navbarTsx) ||
      /h-14/i.test(navbarTsx);
    assert.ok(hasHeight55, 'CTA button must be ~55px tall');
  });

  test('T1-F4-05: Square Menu Toggle Button (55.5px square with 2-dash icon)', () => {
    const hasSquareDimensions =
      /(?:width:\s*55(?:\.5)?px;\s*height:\s*55(?:\.5)?px|w-\[55\.5px\]|w-14)/i.test(chromeCss);
    assert.ok(hasSquareDimensions, 'Menu toggle button must be defined with square dimensions in CSS');

    const hasMenuButton =
      /menuButton/i.test(chromeCss) && /menuButton/i.test(navbarTsx);
    assert.ok(hasMenuButton, 'Navbar must render square menu toggle button');
  });
});

