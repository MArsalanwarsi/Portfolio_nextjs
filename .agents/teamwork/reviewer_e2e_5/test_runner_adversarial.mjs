import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const tempDir = path.resolve('.agents/teamwork/reviewer_e2e_5/temp_test');
fs.mkdirSync(tempDir, { recursive: true });

const failingTestPath = path.join(tempDir, 'failing.test.mjs');
fs.writeFileSync(failingTestPath, `
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

describe('Adversarial Suite', () => {
  test('failing test', () => {
    assert.equal(1, 2, 'Intentional adversarial failure');
  });
});
`);

console.log('Testing runner exit code on synthetic failure...');
const testStreamCode = `
import { run } from 'node:test';
let hasFailures = false;
const testStream = run({ files: ['${failingTestPath.replace(/\\/g, '/')}'] });
testStream.on('data', (event) => {
  if (event.type === 'test:fail' && !event.data?.todo && !event.data?.skip) {
    hasFailures = true;
    process.exitCode = 1;
  }
});
testStream.on('end', () => {
  if (hasFailures) process.exitCode = 1;
});
`;

const child = spawn(process.execPath, ['--input-type=module', '-e', testStreamCode], { stdio: 'inherit' });

child.on('exit', (code) => {
  console.log('Adversarial synthetic failure child exited with code:', code);
  // cleanup
  try {
    fs.unlinkSync(failingTestPath);
    fs.rmdirSync(tempDir);
  } catch (e) {
    console.error('cleanup error', e);
  }
  if (code !== 1) {
    console.error('FAIL: Runner did NOT exit with code 1!');
    process.exit(1);
  } else {
    console.log('PASS: Runner accurately exited with code 1 on test failure.');
  }
});
