import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { getRouteContactContent } from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 7: Contact Form API & Honeypot Route', () => {
  const routeCode = getRouteContactContent();
  assert.ok(routeCode.length > 0, 'app/api/contact/route.ts must exist and not be empty');

  test('T1-F7-01: Payload Validation Schema Execution on Valid Inputs', () => {
    assert.match(
      routeCode,
      /function\s+validatePayload/,
      'Route must declare validatePayload function'
    );
    assert.match(
      routeCode,
      /data\.name\.length\s*<\s*2/,
      'Route must enforce minimum name length of 2 characters'
    );
    assert.match(
      routeCode,
      /data\.name\.length\s*>\s*80/,
      'Route must enforce maximum name length of 80 characters'
    );
    assert.match(
      routeCode,
      /data\.subject\.length\s*<\s*3/,
      'Route must enforce minimum subject length of 3 characters'
    );
    assert.match(
      routeCode,
      /data\.subject\.length\s*>\s*120/,
      'Route must enforce maximum subject length of 120 characters'
    );
    assert.match(
      routeCode,
      /data\.message\.length\s*<\s*20/,
      'Route must enforce minimum message length of 20 characters'
    );
    assert.match(
      routeCode,
      /data\.message\.length\s*>\s*2000/,
      'Route must enforce maximum message length of 2000 characters'
    );
    assert.match(
      routeCode,
      /isEmail\s*\(value:\s*string\)\s*\{[^}]*return\s+\/\^\[\^\\s@\]\+@\[\^\\s@\]\+\\\.\[\^\\s@\]\+\$\//,
      'Route must validate email format via standard regex'
    );
  });

  test('T1-F7-02: Content-Type Enforcement (HTTP 415)', () => {
    assert.match(
      routeCode,
      /application\/json/,
      'Route must verify application/json content-type'
    );
    assert.match(
      routeCode,
      /415/,
      'Route must return HTTP 415 when Content-Type is not application/json'
    );
  });

  test('T1-F7-03: Malformed JSON Body Handling (HTTP 400)', () => {
    assert.match(
      routeCode,
      /try\s*\{[^}]*request\.json\(\)[^}]*\}\s*catch/s,
      'Route must catch malformed JSON parsing failures with try/catch'
    );
    assert.match(
      routeCode,
      /400/,
      'Route must return HTTP 400 on malformed JSON payload'
    );
  });

  test('T1-F7-04: Honeypot Silent HTTP 200 Success', () => {
    assert.match(
      routeCode,
      /validation\.data\.company/,
      'Route must check honeypot company field'
    );
    assert.match(
      routeCode,
      /if\s*\(\s*validation\.data\.company\s*\)\s*\{[\s\S]*?return\s+jsonResponse\([\s\S]*?200[\s\S]*?\)/,
      'Route must return silent HTTP 200 on honeypot submission without emailing'
    );
  });

  test('T1-F7-05: Empty Payload Validation Failure (HTTP 400)', () => {
    assert.match(
      routeCode,
      /if\s*\(\s*!validation\.data\s*\)\s*\{[^}]*return\s+jsonResponse\(\s*\{[^}]*errors:\s*validation\.errors[^}]*\},\s*400/s,
      'Route must return HTTP 400 with validation errors on invalid or empty payload'
    );
  });
});
