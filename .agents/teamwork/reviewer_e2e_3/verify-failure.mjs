import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import fs from 'node:fs';

const tempFile = 'D:/Arsalan/Portfolio_nextjs/.agents/teamwork/reviewer_e2e_3/temp-fail.mjs';
const testCode = `
import test from 'node:test';
import assert from 'node:assert/strict';

test('Failing Test Suite', async (t) => {
  await t.test('will fail', () => {
    assert.strictEqual(1, 2, 'Intentional test failure');
  });
});
`;

fs.writeFileSync(tempFile, testCode);

let hasFailures = false;
const testStream = run({
  files: [tempFile],
  concurrency: true,
});

testStream.on('data', (event) => {
  if (event.type === 'test:fail' && !event.data?.todo && !event.data?.skip) {
    hasFailures = true;
    process.exitCode = 1;
  }
});

testStream.compose(spec).pipe(process.stdout);
testStream.on('end', () => {
  fs.unlinkSync(tempFile);
  console.log('Result hasFailures:', hasFailures, 'exitCode:', process.exitCode);
});
