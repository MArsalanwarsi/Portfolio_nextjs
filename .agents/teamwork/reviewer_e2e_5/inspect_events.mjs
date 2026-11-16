import { run } from 'node:test';
import path from 'node:path';
import fs from 'node:fs';

const tempDir = path.resolve('.agents/teamwork/reviewer_e2e_5/temp_test2');
fs.mkdirSync(tempDir, { recursive: true });

const failingTestPath = path.join(tempDir, 'failing2.test.mjs');
fs.writeFileSync(failingTestPath, `
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

describe('Adversarial Suite', () => {
  test('failing test', () => {
    assert.equal(1, 2, 'Intentional adversarial failure');
  });
});
`);

const testStream = run({ files: [failingTestPath] });

testStream.on('data', (event) => {
  console.log('Event type:', event.type, 'data name:', event.data?.name, 'details:', event.data?.details);
  if (event.type === 'test:fail' && !event.data?.todo && !event.data?.skip) {
    console.log('Matched test:fail! Setting process.exitCode = 1');
    process.exitCode = 1;
  }
});

testStream.on('end', () => {
  console.log('testStream end. Current process.exitCode:', process.exitCode);
  fs.unlinkSync(failingTestPath);
  fs.rmdirSync(tempDir);
});
