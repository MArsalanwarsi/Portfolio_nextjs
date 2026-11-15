import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPortfolioData,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 5: Projects Showcase Edge Cases & Boundaries', () => {
  const data = getPortfolioData();
  const projects = data.sections.projects.items;
  const projectsCode =
    getComponentContent('Projects.tsx') +
    getComponentContent('ProjectCarousel.tsx') +
    getComponentContent('ProjectMedia.tsx');

  test('T2-F5-01: Private Repo # Link Graceful Handling', () => {
    const privateProjects = projects.filter((p) => p.github === '#');
    assert.ok(
      privateProjects.length >= 2,
      'Must contain private builds with github: "#"'
    );
    for (const p of privateProjects) {
      assert.strictEqual(p.github, '#');
    }
    assert.match(
      projectsCode,
      /github\s*!==\s*["']#["']|github\s*===\s*["']#["']/,
      'Project components must explicitly guard private repository # links'
    );
  });

  test('T2-F5-02: Missing Image Graceful Fallback Safety', () => {
    for (const p of projects) {
      assert.ok(
        Array.isArray(p.images),
        `Project ${p.title} images property must be an array`
      );
    }
    const guardsImages = /(?:images\[0\]\s*\?|images\[0\]\?\.)/i.test(projectsCode);
    assert.ok(guardsImages, 'Project cards must guard image rendering with conditional access');
  });

  test('T2-F5-03: Ultra-Long Description Text Wrap & Clamping', () => {
    for (const p of projects) {
      assert.ok(
        typeof p.description === 'string' && p.description.length >= 50,
        `Project ${p.title} description must be meaningful (>50 chars)`
      );
      assert.ok(
        p.description.length <= 500,
        `Project ${p.title} description must be within reasonable bounds (<500 chars)`
      );
    }
    const hasContainment = /line-clamp|overflow-hidden|break-words|text-wrap/i.test(projectsCode);
    assert.ok(hasContainment, 'Project card text must specify overflow containment');
  });

  test('T2-F5-04: Special Characters in Tech Stack (.js, C#, /)', () => {
    const allTech = projects.flatMap((p) => p.techStack);
    const punctuationTech = allTech.filter((t) => /[./]/.test(t));
    assert.ok(
      punctuationTech.length >= 4,
      'Must contain technologies with punctuation (.js, shadcn/ui, etc.)'
    );
    for (const tech of punctuationTech) {
      assert.strictEqual(typeof tech, 'string');
      assert.ok(
        !tech.includes('&amp;'),
        'Tech stack strings must not be pre-entity-escaped in portfolio.json'
      );
    }
  });

  test('T2-F5-05: Responsive Grid Breakpoints & Layout Safety', () => {
    const hasResponsiveLayout =
      /grid|flex|carousel|scroll/i.test(projectsCode);
    assert.ok(
      hasResponsiveLayout,
      'Projects showcase layout must define flexible or responsive container structure'
    );
  });
});
