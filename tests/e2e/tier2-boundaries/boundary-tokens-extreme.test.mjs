import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlobalsCss,
  getLayoutTsx,
  getComponentFiles,
  getComponentContent,
  hexToRgb,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 1: Theme Tokens Boundaries & Extreme Values', () => {
  const css = getGlobalsCss();
  const layout = getLayoutTsx();
  const componentFiles = getComponentFiles();

  test('T2-F1-01: Hex Code Normalization & Case-Insensitivity', () => {
    const hexMatches = css.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
    assert.ok(hexMatches.length >= 8, 'globals.css must contain at least 8 hex color declarations');
    
    const lowerHexes = new Set(hexMatches.map((h) => h.toLowerCase()));
    const requiredPalette = ['#202020', '#f4f4f4', '#eeeeee', '#bcbcbc', '#151515'];
    for (const color of requiredPalette) {
      assert.ok(
        lowerHexes.has(color),
        `globals.css tokens must contain normalized palette color ${color}`
      );
    }

    const [r, g, b] = hexToRgb('#202020');
    assert.strictEqual(r, 32, 'Charcoal red channel must be 32');
    assert.strictEqual(g, 32, 'Charcoal green channel must be 32');
    assert.strictEqual(b, 32, 'Charcoal blue channel must be 32');
  });

  test('T2-F1-02: Silver Full-Section Background Isolation', () => {
    for (const file of componentFiles) {
      const code = getComponentContent(file);
      assert.doesNotMatch(
        code,
        /<section[^>]*className=["'][^"']*\bbg-(?:signal-lime|\[#eeeeee\])\b/i,
        `Section in ${file} must not use Silver as full section background fill`
      );
    }
  });

  test('T2-F1-03: Display Serif Accent Color Boundary on Dark Grounds', () => {
    const manifestoCode = getComponentContent('Manifesto.tsx') + getComponentContent('Hero.tsx');
    const hasMossLimeVoice =
      /#bcbcbc/i.test(manifestoCode) ||
      /moss-lime/i.test(manifestoCode) ||
      /#bcbcbc/i.test(css);
    assert.ok(
      hasMossLimeVoice,
      'Display serif accent words on dark grounds must use Mid Gray #bcbcbc, not Silver'
    );
  });

  test('T2-F1-04: Dark Text on Light Canvas Boundary (Paper White -> #202020)', () => {
    // Assert dark text uses Charcoal #202020, not pure black #000000
    assert.doesNotMatch(
      css,
      /--color-foreground:\s*#000000/i,
      'Theme foreground on light canvas must not be pure black #000000'
    );
    const usesOliveText =
      /#202020/i.test(css) ||
      componentFiles.some((f) => /text-\[#202020\]/i.test(getComponentContent(f)));
    assert.ok(
      usesOliveText,
      'Dark typography on light sections must resolve to Charcoal #202020'
    );
  });

  test('T2-F1-05: Viewport Meta Theme-Color Synchronization', () => {
    assert.match(
      layout,
      /themeColor:\s*["']#202020["']/,
      'Viewport themeColor in app/layout.tsx must be configured to #202020 (Charcoal)'
    );
    assert.doesNotMatch(
      layout,
      /themeColor:\s*["']#211711["']/,
      'Viewport themeColor must not reference legacy coffee brown #211711'
    );
  });
});
