import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import fs from 'node:fs';

const tempFile = 'D:/Arsalan/Portfolio_nextjs/.agents/teamwork/reviewer_e2e_3/temp-spec3.mjs';
const testCode = `
import test from 'node:test';
import assert from 'node:assert/strict';

test('Tier 1 - Feature 1', async (t) => {
  await t.test('T1-F1-01: Canvas Ground', () => {
    console.log('EXECUTED T1-F1-01');
    assert.strictEqual(1, 1);
  });
  await t.test('T1-F1-02: Accent Lime', () => {
    console.log('EXECUTED T1-F1-02');
    assert.strictEqual(1, 1);
  });
});
`;

fs.writeFileSync(tempFile, testCode);

// Test what happens if testNamePatterns contains BOTH parent and child pattern
const stream = run({
  files: [tempFile],
  testNamePatterns: [/Tier 1 - Feature 1/i, /T1-F1-01/i]
});

stream.compose(spec).pipe(process.stdout);
stream.on('end', () => {
  fs.unlinkSync(tempFile);
});
