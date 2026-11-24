import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getPortfolioData,
  publicDir,
  getGlobalsCss,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 5: Projects Showcase', () => {
  const data = getPortfolioData();
  const projects = data.sections.projects.items;

  test('T1-F5-01: Projects Inventory Verification', () => {
    assert.strictEqual(projects.length, 18, 'Portfolio data must contain 18 projects');

    const titles = projects.map((p) => p.title);
    const expectedTitles = [
      'GrowthRadar AI',
      'Fitness Tracker Application',
      'Sustainable Living',
      'Warranty Flow',
      'ThriftShoewear Commerce Platform',
      'Master Wood Works',
      'ABC Mall & Cinema Management',
      'K-Medicos Medicine Store',
    ];

    for (const expected of expectedTitles) {
      assert.ok(
        titles.some((t) => t.includes(expected) || expected.includes(t)),
        `Projects must include ${expected}`
      );
    }
  });

  test('T1-F5-02: 36 SVG Project Image Mockup Assets on Disk', () => {
    let totalImagesChecked = 0;
    for (const project of projects) {
      assert.ok(
        Array.isArray(project.images) && project.images.length === 2,
        `Project ${project.title} must have exactly 2 preview images`
      );
      for (const img of project.images) {
        totalImagesChecked++;
        const relativeSrc = img.src.replace(/^\//, '');
        const fullPath = path.join(publicDir, relativeSrc);
        assert.ok(fs.existsSync(fullPath), `Project image asset must exist: ${fullPath}`);
        const stat = fs.statSync(fullPath);
        assert.ok(stat.size > 0, `Image asset must not be empty: ${fullPath}`);
      }
    }
    assert.strictEqual(totalImagesChecked, 36, 'Exactly 36 project SVG assets must be verified');
  });

  test('T1-F5-03: Project Tech Stack Non-Empty Arrays (>=3 items each)', () => {
    for (const project of projects) {
      assert.ok(
        Array.isArray(project.techStack) && project.techStack.length >= 3,
        `Project ${project.title} must have techStack with >= 3 technologies`
      );
      for (const tech of project.techStack) {
        assert.strictEqual(typeof tech, 'string');
        assert.ok(tech.trim().length > 0, 'Tech stack item must not be empty string');
      }
    }
  });

  test('T1-F5-04: Project Repository & Live URLs Format Validity', () => {
    for (const project of projects) {
      assert.strictEqual(typeof project.github, 'string', `${project.title} must have string github field`);
      assert.strictEqual(typeof project.live, 'string', `${project.title} must have string live field`);

      if (project.github !== '#') {
        assert.match(
          project.github,
          /^https:\/\/github\.com\//,
          `${project.title} github must be a valid GitHub URL`
        );
      }
      if (project.live !== '#') {
        assert.match(
          project.live,
          /^https?:\/\//,
          `${project.title} live must be a valid web URL`
        );
      }
    }
  });

  test('T1-F5-05: Project Card Visor Black Void Ground & Chamfer Notch', () => {
    const css = getGlobalsCss();
    const projectsCode =
      getComponentContent('Projects.tsx') +
      getComponentContent('ProjectCarousel.tsx') +
      getComponentContent('ProjectMedia.tsx');

    const hasVisorBlack =
      /#111112/i.test(projectsCode) ||
      /#111112/i.test(css) ||
      /visor-black/i.test(projectsCode);
    assert.ok(hasVisorBlack, 'Project cards must be presented on Visor Black #111112 canvas');

    const hasChamfer =
      /chamfer|clip-path|polygon/i.test(projectsCode) ||
      /chamfer|clip-path|polygon/i.test(css);
    assert.ok(hasChamfer, 'Project cards must use chamfer notch geometry');
  });
});
