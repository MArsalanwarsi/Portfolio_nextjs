import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPortfolioData,
  getComponentContent,
  getGlobalsCss,
} from '../../helpers/test-context.mjs';

describe('Tier 1 - Feature 6: 67 Skills Architecture', () => {
  const data = getPortfolioData();
  const skills = data.sections.skills.items;

  test('T1-F6-01: Total Skills Count Invariant (67 Skills)', () => {
    assert.strictEqual(
      skills.length,
      67,
      `Master skills inventory in data/portfolio.json must have exactly 67 items (got ${skills.length})`
    );
  });

  test('T1-F6-02: 4-Category Partition Integrity', () => {
    const counts = { frontend: 0, backend: 0, database: 0, tools: 0 };
    for (const item of skills) {
      assert.ok(
        counts.hasOwnProperty(item.category),
        `Unexpected skill category: ${item.category} in skill ${item.name}`
      );
      counts[item.category]++;
    }

    assert.strictEqual(counts.frontend, 27, 'Frontend skills count must be 27');
    assert.ok(
      counts.backend === 16 || counts.backend === 17,
      `Backend skills count must be 16 or 17 (got ${counts.backend})`
    );
    assert.strictEqual(counts.database, 7, 'Database skills count must be 7');
    assert.strictEqual(counts.tools, 17, 'Tools skills count must be 17');
    assert.strictEqual(
      counts.frontend + counts.backend + counts.database + counts.tools,
      67,
      'Sum of categories must equal 67'
    );
  });

  test('T1-F6-03: Stack Highlights Subsumption', () => {
    const highlights = data.sections.skills.stackHighlights;
    assert.ok(Array.isArray(highlights), 'stackHighlights must be an array');
    assert.strictEqual(highlights.length, 6, 'Must have exactly 6 stack highlights');

    const skillNames = new Set(skills.map((s) => s.name));
    for (const h of highlights) {
      assert.ok(
        skillNames.has(h) || skills.some((s) => h.startsWith(s.name) || s.name.startsWith(h)),
        `Highlight '${h}' must exist in the master skills list`
      );
    }
  });

  test('T1-F6-04: Skill Pill Visual Styling Tokens (Soft Gray)', () => {
    const skillsCode = getComponentContent('Skills.tsx');
    const css = getGlobalsCss();

    const hasLichenGray =
      /#b6b6b6/i.test(skillsCode) ||
      /lichen-gray/i.test(skillsCode) ||
      /border-\[#b6b6b6\]/i.test(skillsCode) ||
      /#b6b6b6/i.test(css);
    assert.ok(
      hasLichenGray,
      'Skill pills must be styled with Soft Gray #b6b6b6 tokens'
    );
  });

  test('T1-F6-05: Lucide Icon Key Validity', () => {
    for (const item of skills) {
      assert.strictEqual(
        typeof item.icon,
        'string',
        `Skill '${item.name}' must have a string icon key`
      );
      assert.ok(
        item.icon.trim().length > 0,
        `Skill '${item.name}' icon key must not be empty`
      );
    }
  });
});
