import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlobalsCss,
  getComponentFiles,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 3: Zero Shadows & Motion Curve', () => {
  const css = getGlobalsCss();
  const componentFiles = getComponentFiles();

  test('T1-F3-01: Global Zero Box-Shadow Enforcer', () => {
    const hasZeroShadowEnforcer =
      /box-shadow:\s*none\s*!important/i.test(css) ||
      /\*,\s*\*::before,\s*\*::after\s*\{[^}]*box-shadow:\s*none/i.test(css) ||
      /box-shadow:\s*none/i.test(css);
    assert.ok(
      hasZeroShadowEnforcer,
      'Global CSS must enforce box-shadow: none !important across elements'
    );
  });

  test(
    'T1-F3-02: Elimination of shadow-* Utility Classes in Components',
    () => {
      // Only check active project components (excluding obsolete coffee components)
      const activeComponents = componentFiles.filter(
        (f) => !f.toLowerCase().includes('coffee')
      );
      for (const file of activeComponents) {
        const content = getComponentContent(file);
        assert.doesNotMatch(
          content,
          /className=["'][^"']*\bshadow-(?:sm|md|lg|xl|2xl)\b[^"']*["']/,
          `Component ${file} must not use Tailwind shadow elevation classes`
        );
      }
    }
  );

  test('T1-F3-03: Framer Motion Lando Easing Definition', () => {
    const bezierInCss = /0\.65,\s*0\.05,\s*0(?:(?:\.0*)?),\s*1/.test(css);
    const bezierInComponents = componentFiles.some((f) =>
      /\[0\.65,\s*0\.05,\s*0,\s*1\]/.test(getComponentContent(f)) ||
      /cubic-bezier\(0\.65,\s*0\.05,\s*0,\s*1\)/.test(getComponentContent(f))
    );
    assert.ok(
      bezierInCss || bezierInComponents,
      'Lando cubic-bezier curve [0.65, 0.05, 0, 1] must be configured in CSS or motion components'
    );
  });

  test('T1-F3-04: Motion Duration Standard (0.75s / 750ms)', () => {
    const hasDuration750 =
      /0\.75s|\.75s|750ms/.test(css) ||
      componentFiles.some((f) =>
        /duration:\s*0\.75|transition:\s*\{\s*duration:\s*0\.75/.test(
          getComponentContent(f)
        )
      );
    assert.ok(
      hasDuration750,
      'Motion animations must standardise on 0.75s (750ms) duration'
    );
  });

  test('T1-F3-05: 1px Tarmac Gray Border Alternative to Shadows', () => {
    const hasTarmacBorder =
      /#535450/.test(css) ||
      componentFiles.some((f) =>
        /border-\[#535450\]|border-tarmac-gray|border-neutral-700/.test(
          getComponentContent(f)
        )
      );
    assert.ok(
      hasTarmacBorder,
      'Depth separation must use 1px Tarmac Gray #535450 borders rather than shadows'
    );
  });
});
