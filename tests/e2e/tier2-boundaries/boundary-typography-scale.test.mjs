import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlobalsCss,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 2: Typography Scale Boundaries & Ratio Integrity', () => {
  const css = getGlobalsCss();

  test('T2-F2-01: Statement Wordmark Tracking Boundary (-0.93px)', () => {
    const manifestoCode = getComponentContent('Manifesto.tsx');
    const hasStatementTracking =
      /-0\.93px/i.test(css) ||
      /tracking-\[-0\.93px\]/i.test(manifestoCode) ||
      /letter-spacing:\s*-0\.93px/i.test(css) ||
      /-0\.93px/i.test(getComponentContent('Chrome.module.css'));
    assert.ok(
      hasStatementTracking,
      'Statement typography scale must configure -0.93px tracking constraint'
    );
  });

  test('T2-F2-02: Serif-to-Sans Baseline Alignment Constraint', () => {
    const manifestoCode =
      getComponentContent('Manifesto.tsx') +
      getComponentContent('Chrome.module.css') +
      getComponentContent('Hero.tsx');

    const hasBaselineAlignment =
      /inline|baseline|items-baseline|display:\s*inline-flex/i.test(manifestoCode);
    assert.ok(
      hasBaselineAlignment,
      'Mixed-face inline statements must specify baseline alignment to prevent vertical jitter'
    );
  });

  test('T2-F2-03: Fluid Rem Scaling & Clamp Range (320px to 1920px)', () => {
    const chromeCss = getComponentContent('Chrome.module.css');
    const clampMatches = chromeCss.match(/clamp\(\s*\d+px\s*,\s*[\d.]+vw\s*,\s*\d+px\s*\)/g);
    assert.ok(
      clampMatches && clampMatches.length >= 3,
      'Navigation and footer CSS must define at least 3 fluid clamp(min, vw, max) typography scales'
    );
  });

  test('T2-F2-04: Uppercase Transform Enforcement on Statement Classes', () => {
    const manifestoCode =
      getComponentContent('Manifesto.tsx') +
      getComponentContent('Chrome.module.css') +
      css;
    const hasUppercase =
      /uppercase|text-transform:\s*uppercase/i.test(manifestoCode);
    assert.ok(
      hasUppercase,
      'Manifesto statement blocks must enforce uppercase transformation'
    );
  });

  test('T2-F2-05: Mona Sans Font Weight Bounds (400 to 800)', () => {
    const allCode =
      css +
      getComponentContent('Chrome.module.css') +
      getComponentContent('Manifesto.tsx') +
      getComponentContent('Hero.tsx');
    const hasWeightRange =
      /(?:400|font-normal)/.test(allCode) && /(?:700|800|font-bold|font-extrabold)/.test(allCode);
    assert.ok(
      hasWeightRange,
      'Mona Sans font weights must cover regular 400 through bold/extra-bold 800'
    );
  });
});
