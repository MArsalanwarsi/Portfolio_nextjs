import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { getGlobalsCss } from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 1: Theme Tokens & Color Palette', () => {
  const css = getGlobalsCss();

  test('T1-F1-01: Canvas Ground Hex Tokens (Charcoal & Paper White)', () => {
    assert.match(
      css,
      /#202020/i,
      'Charcoal #202020 must be declared in globals.css theme tokens'
    );
    assert.match(
      css,
      /#f4f4f4/i,
      'Paper White #f4f4f4 must be declared in globals.css theme tokens'
    );
  });

  test('T1-F1-02: Accent Gray Hex Tokens (Silver & Mid Gray)', () => {
    assert.match(
      css,
      /#eeeeee/i,
      'Silver #eeeeee must be declared in globals.css theme tokens'
    );
    assert.match(
      css,
      /#bcbcbc/i,
      'Mid Gray #bcbcbc must be declared in globals.css theme tokens'
    );
  });

  test('T1-F1-03: Dark Void & Outlines (Visor Black & Tarmac Gray)', () => {
    assert.match(
      css,
      /#151515/i,
      'Visor Black #151515 must be declared in globals.css theme tokens'
    );
    assert.match(
      css,
      /#535353/i,
      'Tarmac Gray #535353 must be declared in globals.css theme tokens'
    );
  });

  test('T1-F1-04: Secondary Palette Tokens (Silver Gray & Soft Gray)', () => {
    assert.match(
      css,
      /#dedede/i,
      'Silver Gray #dedede must be declared in globals.css theme tokens'
    );
    assert.match(
      css,
      /#b6b6b6/i,
      'Soft Gray #b6b6b6 must be declared in globals.css theme tokens'
    );
  });

  test('T1-F1-05: Silver Halo Radial Gradient Token', () => {
    const haloPattern = /radial-gradient\(\s*circle at 50% -190%,\s*rgba\(227,\s*227,\s*227,\s*0\)\s*68%,\s*rgb\(227,\s*227,\s*227\)\s*83%\s*\)/i;
    assert.match(
      css,
      haloPattern,
      'Footer Silver Halo radial gradient must match exact spec: radial-gradient(circle at 50% -190%, rgba(227, 227, 227, 0) 68%, rgb(227, 227, 227) 83%)'
    );
  });

  test('T1-F1-06: Complete Purge of Coffee Brown Palette Tokens', () => {
    const rootBlock = css.match(/:root\s*\{[^}]*\}/s)?.[0] || '';
    assert.doesNotMatch(
      rootBlock,
      /#211711/i,
      'Root palette must not contain coffee brown #211711'
    );
    assert.doesNotMatch(
      rootBlock,
      /#bb895b/i,
      'Root palette must not contain coffee primary #bb895b'
    );
    assert.doesNotMatch(
      rootBlock,
      /#38271b/i,
      'Root palette must not contain coffee secondary #38271b'
    );
    assert.doesNotMatch(
      rootBlock,
      /#4a3221/i,
      'Root palette must not contain coffee accent #4a3221'
    );
  });
});

