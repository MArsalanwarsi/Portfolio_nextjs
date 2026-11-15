#!/usr/bin/env node
/**
 * Standalone E2E Test Runner for Muhammad Arsalan Warsi Portfolio
 * Next.js 16.4 / Node.js 22+ Native Test Infrastructure
 *
 * Uses built-in node:test and node:assert/strict with zero external dependencies.
 * Discovers and executes all tests in tests/e2e/ across Tiers 1-4.
 */

import { run } from 'node:test';
import { spec, tap } from 'node:test/reporters';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const testsDir = path.resolve(projectRoot, 'tests', 'e2e');

// Parse CLI flags
const args = process.argv.slice(2);
const tierArg = args.find(a => a.startsWith('--tier='));
const grepArg = args.find(a => a.startsWith('--grep='));
const reporterArg = args.find(a => a.startsWith('--reporter='));

const selectedTier = tierArg ? tierArg.split('=')[1].replace(/^tier/i, '') : null;
const namePattern = grepArg ? grepArg.split('=')[1] : null;
const reporterType = reporterArg ? reporterArg.split('=')[1] : 'spec';

// Recursive test file discovery
function findTestFiles(dir, filterTier = null) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (filterTier && entry.name.startsWith('tier') && !entry.name.includes(`tier${filterTier}`)) {
        continue;
      }
      results.push(...findTestFiles(fullPath, filterTier));
    } else if (entry.isFile() && entry.name.endsWith('.test.mjs')) {
      results.push(fullPath);
    }
  }
  return results.sort();
}

const files = findTestFiles(testsDir, selectedTier);

if (files.length === 0) {
  console.log(`ℹ No test files found in ${testsDir}${selectedTier ? ` for Tier ${selectedTier}` : ''}`);
  process.exit(0);
}

console.log(`\n======================================================`);
console.log(`🚀 Running Opaque-Box E2E Tests (Node.js ${process.version})`);
console.log(`📁 Target: ${testsDir}`);
console.log(`📑 Discovered ${files.length} test suites`);
if (selectedTier) console.log(`🎯 Tier filter: Tier ${selectedTier}`);
if (namePattern) console.log(`🔍 Name pattern: ${namePattern}`);
console.log(`======================================================\n`);

let hasFailures = false;

const testStream = run({
  files,
  concurrency: true,
  testNamePatterns: namePattern ? [new RegExp(namePattern, 'i')] : undefined,
});

testStream.on('data', (event) => {
  if (event.type === 'test:fail' && !event.data?.todo && !event.data?.skip) {
    hasFailures = true;
    process.exitCode = 1;
  }
});

const reporter = reporterType === 'tap' ? tap : spec;
testStream.compose(reporter).pipe(process.stdout);

testStream.on('error', (err) => {
  console.error('Test runner execution error:', err);
  process.exit(1);
});

testStream.on('end', () => {
  if (hasFailures) {
    process.exitCode = 1;
  }
});
