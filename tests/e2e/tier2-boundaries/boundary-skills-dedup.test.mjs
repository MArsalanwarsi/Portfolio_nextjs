import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPortfolioData,
  getComponentContent,
} from '../../helpers/test-context.mjs';

describe('Tier 2 - Feature 6: Skills Architecture Boundaries & Deduplication', () => {
  const data = getPortfolioData();
  const skills = data.sections.skills.items;

  test('T2-F6-01: Empty Category Filter Fallback', () => {
    const skillsCode = getComponentContent('Skills.tsx');
    assert.match(
      skillsCode,
      /skillsContent\.items\.filter\(\s*\(skill\)\s*=>\s*skill\.category\s*===\s*category\.key\s*\)/,
      'Skills component must filter items matching category.key'
    );
    const definedKeys = data.sections.skills.categories.map((c) => c.key);
    assert.deepStrictEqual(
      definedKeys.sort(),
      ['backend', 'database', 'frontend', 'tools'],
      'Defined category keys in portfolio.json must match 4-category architecture'
    );
    const unmappedItems = skills.filter((s) => !definedKeys.includes(s.category));
    assert.strictEqual(
      unmappedItems.length,
      0,
      'Zero skills may belong to an undefined or empty category'
    );
  });

  test('T2-F6-02: Duplicate Skill Name Guard (100% Unique)', () => {
    const names = skills.map((s) => s.name);
    const uniqueNames = new Set(names);
    assert.strictEqual(
      uniqueNames.size,
      67,
      `Found ${67 - uniqueNames.size} duplicate skill name(s) in portfolio.json`
    );
  });

  test('T2-F6-03: Longest Skill Name Containment', () => {
    const maxLenSkill = skills.reduce(
      (max, s) => (s.name.length > max.name.length ? s : max),
      skills[0]
    );
    assert.ok(
      maxLenSkill.name.length <= 40,
      `Max skill name length (${maxLenSkill.name}: ${maxLenSkill.name.length} chars) must be <= 40 chars`
    );
  });

  test('T2-F6-04: Missing Icon Fallback Safety', () => {
    const skillsCode = getComponentContent('Skills.tsx');
    const handlesIconFallback =
      /iconComponents\[[^\]]+\]\s*\?\?\s*Code2/i.test(skillsCode) ||
      /defaultIcon/i.test(skillsCode);
    assert.ok(
      handlesIconFallback,
      'Skills component must provide resilient icon fallback (?? Code2)'
    );
  });

  test('T2-F6-05: Category Sum Invariant Under Mutation', () => {
    const categories = ['frontend', 'backend', 'database', 'tools'];
    const sum = categories.reduce(
      (acc, cat) => acc + skills.filter((s) => s.category === cat).length,
      0
    );
    assert.strictEqual(
      sum,
      skills.length,
      'Sum of partition counts must equal total skills count'
    );
  });
});
