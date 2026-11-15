import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlobalsCss,
  getComponentFiles,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 3: Motion Curves & Zero Shadows Boundaries', () => {
  const css = getGlobalsCss();
  const componentFiles = getComponentFiles();

  test('T2-F3-01: Rejection of filter: drop-shadow on SVGs and Images', () => {
    assert.doesNotMatch(
      css,
      /filter:\s*drop-shadow/i,
      'app/globals.css must not introduce drop-shadow filters'
    );
    const activeComponents = componentFiles.filter(
      (f) => !f.toLowerCase().includes('coffee')
    );
    for (const file of activeComponents) {
      const code = getComponentContent(file);
      assert.doesNotMatch(
        code,
        /\bdrop-shadow-(?:sm|md|lg|xl|2xl)\b/i,
        `Component ${file} must not use drop-shadow utility classes`
      );
    }
  });

  test('T2-F3-02: Hover & Focus States Shadow Rejection', () => {
    const activeComponents = componentFiles.filter(
      (f) => !f.toLowerCase().includes('coffee')
    );
    for (const file of activeComponents) {
      const code = getComponentContent(file);
      assert.doesNotMatch(
        code,
        /\b(?:hover|focus|active):shadow-(?:sm|md|lg|xl|2xl)\b/i,
        `Component ${file} must not add shadows on hover or focus`
      );
    }
  });

  test('T2-F3-03: prefers-reduced-motion Media Query Handling', () => {
    const hasReducedMotion =
      /prefers-reduced-motion/i.test(css) ||
      componentFiles.some((f) => /prefers-reduced-motion/i.test(getComponentContent(f)));
    assert.ok(
      hasReducedMotion,
      'CSS or motion components must respect prefers-reduced-motion media query'
    );
  });

  test('T2-F3-04: Cubic-Bezier Curve Coordinates Range Check', () => {
    const match = css.match(/cubic-bezier\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\s*\)/);
    assert.ok(match, 'app/globals.css must contain a cubic-bezier easing curve definition');
    const x1 = parseFloat(match[1]);
    const y1 = parseFloat(match[2]);
    const x2 = parseFloat(match[3]);
    const y2 = parseFloat(match[4]);
    assert.ok(x1 >= 0 && x1 <= 1, 'x1 coordinate must be in [0, 1]');
    assert.ok(x2 >= 0 && x2 <= 1, 'x2 coordinate must be in [0, 1]');
    assert.strictEqual(typeof y1, 'number', 'y1 must be a valid number');
    assert.strictEqual(typeof y2, 'number', 'y2 must be a valid number');
    assert.strictEqual(x1, 0.65, 'x1 must match Lando easing coordinate 0.65');
    assert.strictEqual(y1, 0.05, 'y1 must match Lando easing coordinate 0.05');
    assert.strictEqual(x2, 0, 'x2 must match Lando easing coordinate 0');
    assert.strictEqual(y2, 1, 'y2 must match Lando easing coordinate 1');
  });

  test('T2-F3-05: Chamfer Notch Tab Polygon Geometry Formula', () => {
    const allCode =
      css +
      componentFiles.map((f) => getComponentContent(f)).join('\n');
    const hasPolygonNotch =
      /polygon\(0\s+0,\s*100%\s+0,\s*100%\s+calc\(100%\s*-\s*18px\),\s*calc\(100%\s*-\s*18px\)\s+100%,\s*0\s+100%\)/i.test(
        allCode
      ) ||
      /clip-path:\s*polygon/i.test(allCode);
    assert.ok(
      hasPolygonNotch,
      'Chamfer polygon notch geometry formula must be configured'
    );
  });
});
