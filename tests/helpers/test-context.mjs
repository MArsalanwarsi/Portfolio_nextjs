/**
 * Test Context & Shared Helper Utilities for Opaque-Box E2E Tests
 * Next.js 16.4 / Node.js 22+ Native Test Infrastructure
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, '..', '..');
export const appDir = path.resolve(projectRoot, 'app');
export const componentsDir = path.resolve(projectRoot, 'components');
export const dataDir = path.resolve(projectRoot, 'data');
export const publicDir = path.resolve(projectRoot, 'public');

/**
 * Read and parse data/portfolio.json
 */
export function getPortfolioData() {
  const filePath = path.join(dataDir, 'portfolio.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Read app/globals.css
 */
export function getGlobalsCss() {
  const filePath = path.join(appDir, 'globals.css');
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Read app/layout.tsx
 */
export function getLayoutTsx() {
  const filePath = path.join(appDir, 'layout.tsx');
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Read app/api/contact/route.ts
 */
export function getRouteContactContent() {
  const filePath = path.join(appDir, 'api', 'contact', 'route.ts');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Get list of all component file names in components/
 */
export function getComponentFiles() {
  if (!fs.existsSync(componentsDir)) return [];
  return fs.readdirSync(componentsDir).filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'));
}

/**
 * Read component file content
 */
export function getComponentContent(fileName) {
  const filePath = path.join(componentsDir, fileName);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Check PDF asset on disk
 */
export function getPdfAssetStats(relativePath = 'M_Arsalan_Warsi_CV.pdf') {
  const fullPath = path.join(publicDir, relativePath);
  if (!fs.existsSync(fullPath)) {
    return { exists: false, size: 0, hasPdfHeader: false, hasEofTrailer: false };
  }
  const stat = fs.statSync(fullPath);
  const buffer = fs.readFileSync(fullPath);
  const header = buffer.subarray(0, 5).toString('ascii');
  const trailer = buffer.subarray(Math.max(0, buffer.length - 64)).toString('ascii');

  return {
    exists: true,
    size: stat.size,
    hasPdfHeader: header === '%PDF-',
    hasEofTrailer: trailer.includes('%%EOF'),
  };
}

/**
 * Parse hex to RGB array [r, g, b]
 */
export function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Calculate relative luminance (WCAG 2.1)
 */
export function getLuminance(r, g, b) {
  const [lr, lg, lb] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * Calculate WCAG contrast ratio between two hex colors
 */
export function calculateContrastRatio(hex1, hex2) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
