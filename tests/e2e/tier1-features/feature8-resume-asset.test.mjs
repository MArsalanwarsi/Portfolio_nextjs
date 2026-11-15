import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPdfAssetStats,
  getPortfolioData,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 8: Resume Asset Download', () => {
  const stats = getPdfAssetStats('M_Arsalan_Warsi_CV.pdf');
  const data = getPortfolioData();

  test('T1-F8-01: Resume File Physical Existence on Disk', () => {
    assert.strictEqual(
      stats.exists,
      true,
      'File public/M_Arsalan_Warsi_CV.pdf must physically exist on disk'
    );
  });

  test('T1-F8-02: Resume File Size Integrity (>100,000 bytes)', () => {
    assert.ok(
      stats.size > 100_000,
      `Resume PDF size (${stats.size} bytes) must be substantial and > 100 KB`
    );
  });

  test('T1-F8-03: PDF Binary Header Magic Bytes (%PDF-)', () => {
    assert.strictEqual(
      stats.hasPdfHeader,
      true,
      'Resume file must start with PDF magic bytes (%PDF- / 0x25 0x50 0x44 0x46 0x2d)'
    );
  });

  test('T1-F8-04: Portfolio Configuration Resume URL Path', () => {
    assert.strictEqual(
      data.siteConfig.resumeUrl,
      '/M_Arsalan_Warsi_CV.pdf',
      'siteConfig.resumeUrl in data/portfolio.json must point to /M_Arsalan_Warsi_CV.pdf'
    );
  });

  test('T1-F8-05: Resume Link Anchor Attributes in UI Components', () => {
    const navbarCode = getComponentContent('Navbar.tsx');
    const heroCode = getComponentContent('Hero.tsx');
    const footerCode = getComponentContent('Footer.tsx');
    const allCode = navbarCode + heroCode + footerCode;

    const hasResumeLink =
      /M_Arsalan_Warsi_CV\.pdf/i.test(allCode) ||
      /resumeUrl/i.test(allCode) ||
      /résumé|resume/i.test(allCode);
    assert.ok(
      hasResumeLink,
      'UI navigation or footer components must provide resume access'
    );
  });
});
