import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { getRouteContactContent } from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 7: Contact Form API Boundaries & Sanitization', () => {
  const routeCode = getRouteContactContent();
  assert.ok(routeCode.length > 0, 'app/api/contact/route.ts must exist and not be empty');

  test('T2-F7-01: Payload Max Content-Length Boundary (>10000 -> 413)', () => {
    assert.match(
      routeCode,
      /MAX_CONTENT_LENGTH\s*=\s*(?:10_000|10000)/,
      'MAX_CONTENT_LENGTH must be defined as 10,000 bytes'
    );
    assert.match(
      routeCode,
      /413/,
      'Route must return HTTP 413 when content length exceeds limit'
    );
  });

  test('T2-F7-02: Name Boundary Lengths (<2 fails, 2..80 passes, >80 fails)', () => {
    const minMatch = routeCode.match(/data\.name\.length\s*<\s*(\d+)/);
    assert.ok(minMatch, 'Route must check minimum name length');
    assert.strictEqual(Number(minMatch[1]), 2, 'Minimum name length must be 2');

    const maxMatch = routeCode.match(/data\.name\.length\s*>\s*(\d+)/);
    assert.ok(maxMatch, 'Route must check maximum name length');
    assert.strictEqual(Number(maxMatch[1]), 80, 'Maximum name length must be 80');

    assert.match(
      routeCode,
      /function\s+getSingleLine\s*\(value:\s*unknown\)\s*\{[^}]*trim\(\)\.replace\(\/\\s\+\/g,\s*["']\s*["']\)/s,
      'Route must sanitize single line fields by trimming and collapsing whitespace'
    );
  });

  test('T2-F7-03: Subject Boundary Lengths (<3 fails, 3..120 passes, >120 fails)', () => {
    const minMatch = routeCode.match(/data\.subject\.length\s*<\s*(\d+)/);
    assert.ok(minMatch, 'Route must check minimum subject length');
    assert.strictEqual(Number(minMatch[1]), 3, 'Minimum subject length must be 3');

    const maxMatch = routeCode.match(/data\.subject\.length\s*>\s*(\d+)/);
    assert.ok(maxMatch, 'Route must check maximum subject length');
    assert.strictEqual(Number(maxMatch[1]), 120, 'Maximum subject length must be 120');
  });

  test('T2-F7-04: Message Boundary Lengths (<20 fails, 20..2000 passes, >2000 fails)', () => {
    const minMatch = routeCode.match(/data\.message\.length\s*<\s*(\d+)/);
    assert.ok(minMatch, 'Route must check minimum message length');
    assert.strictEqual(Number(minMatch[1]), 20, 'Minimum message length must be 20');

    const maxMatch = routeCode.match(/data\.message\.length\s*>\s*(\d+)/);
    assert.ok(maxMatch, 'Route must check maximum message length');
    assert.strictEqual(Number(maxMatch[1]), 2000, 'Maximum message length must be 2000');

    assert.match(
      routeCode,
      /function\s+getMultiline\s*\(value:\s*unknown\)\s*\{[^}]*replace\(\/\\r\\n\/g,\s*["']\\n["']\)/s,
      'Route must normalize CRLF to LF in multiline messages'
    );
  });

  test('T2-F7-05: Header Injection CRLF Stripping & Truncation', () => {
    assert.match(
      routeCode,
      /function\s+cleanHeader\s*\(value:\s*string\)\s*\{[^}]*replace\(\/\[\\r\\n\]\+\/g,\s*["']\s*["']\)\.slice\(0,\s*140\)/s,
      'cleanHeader must replace CRLF with single space and truncate to 140 chars'
    );
    assert.match(
      routeCode,
      /const\s+safeName\s*=\s*cleanHeader\(name\)/,
      'cleanHeader must be applied to name before constructing headers'
    );
    assert.match(
      routeCode,
      /const\s+safeSubject\s*=\s*cleanHeader\(subject\)/,
      'cleanHeader must be applied to subject before constructing headers'
    );
  });

  test('T2-F7-06: HTML Entity Sanitization Verification', () => {
    assert.match(
      routeCode,
      /function\s+escapeHtml\s*\(value:\s*string\)\s*\{[^}]*\.replace\(\/&\/g,\s*["']&amp;["']\)[^}]*\.replace\(\/<(?:\\\/)?\/g,\s*["']&lt;["']\)[^}]*\.replace\(\/>\/g,\s*["']&gt;["']\)[^}]*\.replace\(\/"\/g,\s*["']&quot;["']\)[^}]*\.replace\(\/'\/g,\s*["']&#39;["']\)/s,
      'escapeHtml must escape &, <, >, ", and \' characters'
    );
    assert.match(
      routeCode,
      /escapeHtml\(message\)/,
      'escapeHtml must be applied to message in email html template'
    );
  });
});
