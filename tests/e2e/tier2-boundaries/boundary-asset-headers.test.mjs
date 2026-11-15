import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  publicDir,
  getPortfolioData,
  getPdfAssetStats,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 8: Resume Asset Integrity & Path Boundaries', () => {
  const data = getPortfolioData();
  const stats = getPdfAssetStats('M_Arsalan_Warsi_CV.pdf');

  test('T2-F8-01: File Name Case Sensitivity Match in public/', () => {
    const publicFiles = fs.readdirSync(publicDir);
    const exactMatch = publicFiles.find((f) => f === 'M_Arsalan_Warsi_CV.pdf');
    assert.ok(
      exactMatch,
      "Exact case-sensitive file name 'M_Arsalan_Warsi_CV.pdf' must exist in public/ directory"
    );
  });

  test('T2-F8-02: Corrupted / Zero-Byte File Rejection (>= 100,000 bytes)', () => {
    assert.strictEqual(stats.exists, true);
    assert.ok(
      stats.size >= 100_000,
      `Resume PDF size must be >= 100,000 bytes (got ${stats.size})`
    );
  });

  test('T2-F8-03: PDF Trailing EOF Marker Verification', () => {
    assert.strictEqual(
      stats.hasEofTrailer,
      true,
      'Resume PDF file must contain %%EOF marker near end of file'
    );
  });

  test('T2-F8-04: Local Root Path vs Unverified Third-Party Link', () => {
    const resumeUrl = data.siteConfig.resumeUrl;
    assert.match(
      resumeUrl,
      /^\/[^/]/,
      'resumeUrl must start with "/" indicating a local asset hosted by the site'
    );
    assert.doesNotMatch(
      resumeUrl,
      /^https?:\/\//,
      'resumeUrl must not depend on an external third-party CDN or drive link'
    );
  });

  test('T2-F8-05: Clean File Name Formatting (No Spaces or %20 Encoding)', () => {
    const resumeUrl = data.siteConfig.resumeUrl;
    assert.doesNotMatch(
      resumeUrl,
      /\s|%20/,
      'Resume file path must not contain whitespace or %20 encoding'
    );
    assert.match(
      resumeUrl,
      /\.pdf$/i,
      'Resume file path must end with .pdf extension'
    );
  });
});
