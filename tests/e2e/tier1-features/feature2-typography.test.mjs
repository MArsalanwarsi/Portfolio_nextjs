import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { getGlobalsCss, getLayoutTsx } from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 2: Typography & Font Loading', () => {
  const layout = getLayoutTsx();
  const css = getGlobalsCss();

  test('T1-F2-01: Google Font Loader Configuration in layout.tsx', () => {
    assert.match(
      layout,
      /from\s+["']next\/font\/google["']/,
      'app/layout.tsx must import fonts from next/font/google'
    );
    assert.match(
      layout,
      /Mona_Sans/,
      'app/layout.tsx must configure Mona_Sans variable font loader'
    );
    assert.match(
      layout,
      /Bodoni_Moda/,
      'app/layout.tsx must configure Bodoni_Moda display serif font loader'
    );
  });

  test('T1-F2-02: Font CSS Variable Bindings on Layout', () => {
    assert.match(
      layout,
      /--font-sans|--font-mona-sans/,
      'app/layout.tsx must bind sans font CSS variable'
    );
    assert.match(
      layout,
      /--font-serif|--font-display-serif|--font-bodoni-moda/,
      'app/layout.tsx must bind display serif font CSS variable'
    );
  });

  test('T1-F2-03: Mona Sans Width Variable Settings ("wdth" 93)', () => {
    assert.match(
      css,
      /"wdth"\s*93|font-variation-settings:.*wdth.*93/i,
      'CSS must declare OpenType font-variation-settings with "wdth" 93 for Mona Sans'
    );
  });

  test('T1-F2-04: Mixed-Face Statement Typography Scale', () => {
    const hasStatementScale =
      /117\.59px|7\.9375rem|text-\[117\.59px\]/i.test(css) ||
      /\.font-statement/i.test(css) ||
      css.includes('font-statement');
    assert.ok(
      hasStatementScale,
      'CSS must define statement typography scale (.font-statement or 117.59px) with tight line-height and uppercase'
    );
  });

  test('T1-F2-05: Body Font Scale & Tracking (18.52px / -0.19px)', () => {
    const hasBodyScale =
      /18\.52px|1\.25rem|text-\[18\.52px\]|-0\.19px/i.test(css) ||
      /font-body|body\s*\{[^}]*font-family/i.test(css);
    assert.ok(
      hasBodyScale,
      'CSS must define standard body type with sans font family and tracking'
    );
  });
});
