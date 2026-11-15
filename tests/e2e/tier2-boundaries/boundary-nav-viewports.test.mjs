import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 4: Chrome Nav Viewport & Interaction Boundaries', () => {
  const navCode = getComponentContent('Navbar.tsx');
  const chromeCss = getComponentContent('Chrome.module.css');

  test('T2-F4-01: Mobile Viewport Inset Width Budget (<375px)', () => {
    const mobileChromeMatch = chromeCss.match(
      /@media\s*\(max-width:\s*600px\)\s*\{[^}]*\.chrome\s*\{[^}]*left:\s*(\d+)px;\s*right:\s*(\d+)px;/
    );
    assert.ok(mobileChromeMatch, 'Chrome.module.css must define mobile insets under @media (max-width: 600px)');
    const leftInset = Number(mobileChromeMatch[1]);
    const rightInset = Number(mobileChromeMatch[2]);
    const totalInset = leftInset + rightInset;

    const minViewportWidth = 320;
    const remainingWidth = minViewportWidth - totalInset;
    assert.ok(
      remainingWidth >= 280,
      `Remaining content width on 320px viewport (${remainingWidth}px) must be >= 280px`
    );
    assert.match(
      chromeCss,
      /\.monogram\s*\{\s*display:\s*none;\s*\}/,
      'Chrome CSS must hide monogram on mobile to preserve layout budget'
    );
  });

  test('T2-F4-02: Dynamic Theme Reactive Menu State (Dark vs Light Canvas)', () => {
    const hasThemeSwitch =
      /darkSurface|data-surface|onDark/i.test(navCode) ||
      /\.onDark/i.test(chromeCss);
    assert.ok(
      hasThemeSwitch,
      'Navbar must implement reactive dark/light surface styling'
    );
  });

  test('T2-F4-03: Escape Key Closes Mobile Menu & Restores Scroll', () => {
    const hasEscapeOrClose =
      /Escape|handleClose|onClose|closeMenu/i.test(navCode);
    assert.ok(
      hasEscapeOrClose,
      'Navbar menu must handle close events and unfreeze document body scroll'
    );
    assert.match(
      navCode,
      /document\.body\.style\.overflow/,
      'Navbar must manage body scroll lock'
    );
  });

  test('T2-F4-04: Nav Root Layer Fill Must Be Transparent (Zero Solid Slab)', () => {
    assert.doesNotMatch(
      navCode,
      /className=["'][^"']*\bbg-(?:white|black|slate-\d+|gray-\d+)\b[^"']*["']/,
      'Outer navbar wrapper must not carry a solid opaque background slab'
    );
    const isPointerOrTransparent =
      /pointer-events:\s*none/i.test(chromeCss) ||
      !/background:\s*#(?:fff|000)/i.test(chromeCss);
    assert.ok(isPointerOrTransparent, 'Nav outer layer must be non-blocking/transparent');
  });

  test('T2-F4-05: Menu Dash Glyph Length Disparity (Unequal Lengths)', () => {
    const hasUnequalSpans =
      /span:last-child\s*\{\s*width:\s*15px/i.test(chromeCss) ||
      /span\s*\{\s*width:\s*23px/i.test(chromeCss) ||
      /span\s*\/>\s*<span\s*\/>/i.test(navCode);
    assert.ok(
      hasUnequalSpans,
      'Menu icon glyph must specify two dashes of unequal lengths'
    );
  });
});
