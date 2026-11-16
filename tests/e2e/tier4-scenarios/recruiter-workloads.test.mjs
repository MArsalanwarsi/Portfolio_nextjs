import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  projectRoot,
  publicDir,
  getPortfolioData,
  getPdfAssetStats,
  getComponentContent,
  getGlobalsCss,
  getRouteContactContent,
} from '../../helpers/test-context.mjs';

describe('Tier 4: Real-World Recruiter, Visitor & Auditor Workload Scenarios', () => {
  const data = getPortfolioData();
  const css = getGlobalsCss();
  const routeCode = getRouteContactContent();

  test(
    'T4-SCEN-01: Technical Recruiter Full Candidate Journey (Landing -> Skills -> Projects -> CV)',
    () => {
      // 1. Candidate Identity
      assert.strictEqual(data.siteConfig.name, 'Muhammad Arsalan Warsi');
      assert.match(data.siteConfig.role, /Full[- ]Stack|MERN/i);

      // 2. High-value skills verification
      const skillNames = data.sections.skills.items.map((s) => s.name);
      assert.ok(skillNames.includes('Next.js'));
      assert.ok(skillNames.includes('React.js') || skillNames.includes('React'));
      assert.ok(skillNames.includes('TypeScript'));
      assert.ok(skillNames.includes('Node.js'));
      assert.ok(skillNames.includes('MongoDB'));
      assert.ok(skillNames.includes('Tailwind CSS'));

      // 3. Featured projects
      const projects = data.sections.projects.items;
      assert.strictEqual(projects.length, 8);
      const featuredTitles = projects.map((p) => p.title);
      assert.ok(featuredTitles.includes('GrowthRadar AI'));
      assert.ok(featuredTitles.includes('Warranty Flow'));

      // 4. CV Download asset validation
      const pdfStats = getPdfAssetStats('M_Arsalan_Warsi_CV.pdf');
      assert.strictEqual(pdfStats.exists, true);
      assert.ok(pdfStats.size > 100_000);
      assert.strictEqual(pdfStats.hasPdfHeader, true);

      // 5. Contact validation logic in route
      assert.match(
        routeCode,
        /function\s+validatePayload/,
        'Contact route must implement validatePayload schema'
      );
      assert.match(
        getComponentContent('ContactForm.tsx'),
        /name="name"|name="email"|name="subject"|name="message"/,
        'Contact form must expose standard contact fields'
      );
    }
  );

  test(
    'T4-SCEN-02: Engineering Lead Architectural Audit Journey',
    () => {
      const projects = data.sections.projects.items;

      // 1. Verify public GitHub repositories vs private commercial builds
      const publicRepos = projects.filter((p) => p.github !== '#');
      const privateRepos = projects.filter((p) => p.github === '#');
      assert.strictEqual(publicRepos.length, 6, 'Must have 6 public GitHub repositories');
      assert.strictEqual(privateRepos.length, 2, 'Must have 2 private commercial builds');

      for (const p of publicRepos) {
        assert.match(
          p.github,
          /^https:\/\/github\.com\/MArsalanwarsi\//,
          `Public repo for ${p.title} must belong to MArsalanwarsi`
        );
      }

      // 2. Verify backend & security skills inventory
      const backendSkills = data.sections.skills.items
        .filter((s) => s.category === 'backend')
        .map((s) => s.name);
      assert.ok(backendSkills.includes('Node.js'));
      assert.ok(backendSkills.includes('Express.js'));
      assert.ok(backendSkills.includes('JWT Auth') || backendSkills.includes('REST APIs'));

      // 3. Verify security sanitization functions in routeCode
      assert.match(
        routeCode,
        /function\s+escapeHtml/,
        'Contact route must declare escapeHtml security sanitization function'
      );
      assert.match(
        routeCode,
        /function\s+cleanHeader/,
        'Contact route must declare cleanHeader CRLF injection guard'
      );
    }
  );

  test(
    'T4-SCEN-03: Aptech Mentee & Junior Developer Journey',
    () => {
      // 1. Education history verification
      const education = data.sections.education.items;
      assert.ok(education.length >= 2, 'Must contain education timeline entries');
      const aptechEdu = education.find((e) => /Aptech/i.test(e.institution));
      assert.ok(aptechEdu, 'Must contain Aptech Computer Education entry');
      assert.match(aptechEdu.degree, /ACCP|Computer Science/i);

      // 2. Experience history verification
      const experience = data.sections.experience.items;
      const aptechExp = experience.find((e) => /Aptech/i.test(e.company));
      assert.ok(aptechExp, 'Must contain Aptech Teaching Associate experience');
      assert.match(aptechExp.role, /Teaching Associate|Faculty|Instructor/i);

      // 3. Verified credentials
      const certs = data.sections.certificates.items;
      assert.ok(certs.length >= 6, 'Must contain at least 6 verified certificates');
      const hasMeta = certs.some((c) => /Meta/i.test(c.issuer));
      assert.ok(hasMeta, 'Must contain Meta verified professional certificates');
    }
  );

  test(
    'T4-SCEN-04: Mobile Visitor On-The-Go Experience',
    () => {
      const chromeCss = getComponentContent('Chrome.module.css');

      // 1. Verify responsive breakpoints in CSS
      assert.match(
        chromeCss,
        /@media \(max-width:\s*600px\)/,
        'Chrome CSS must define mobile responsive breakpoint <= 600px'
      );
      assert.match(
        chromeCss,
        /\.monogram\s*\{\s*display:\s*none;\s*\}/,
        'Mobile navigation must hide monogram to prioritize tap targets'
      );

      // 2. Verify touch targets meet WCAG accessibility standards (>= 44px)
      const mobileButtonMatch = chromeCss.match(
        /\.menuButton,\s*\.close\s*\{\s*width:\s*(\d+)px;\s*height:\s*(\d+)px;\s*\}/
      );
      assert.ok(
        mobileButtonMatch,
        'Chrome CSS must specify numeric px dimensions for mobile menu/close buttons'
      );
      const touchWidth = Number(mobileButtonMatch[1]);
      const touchHeight = Number(mobileButtonMatch[2]);
      assert.ok(
        touchWidth >= 44,
        `Mobile menu button width (${touchWidth}px) must meet WCAG 2.5.5 minimum 44px`
      );
      assert.ok(
        touchHeight >= 44,
        `Mobile menu button height (${touchHeight}px) must meet WCAG 2.5.5 minimum 44px`
      );

      const mobileTalkMatch = chromeCss.match(/\.talk\s*\{\s*height:\s*(\d+)px;/);
      assert.ok(mobileTalkMatch, 'Chrome CSS must specify numeric px height for mobile .talk CTA');
      const talkHeight = Number(mobileTalkMatch[1]);
      assert.ok(
        talkHeight >= 44,
        `Mobile talk CTA height (${talkHeight}px) must meet WCAG 2.5.5 minimum 44px`
      );
    }
  );

  test(
    'T4-SCEN-05: Security, Quality & Style Purity Auditor Journey',
    () => {
      // 1. Verify honeypot bot trap logic in route
      assert.match(
        routeCode,
        /if\s*\(\s*validation\.data\.company\s*\)\s*\{[\s\S]*?return\s+jsonResponse\([\s\S]*?200[\s\S]*?\)/,
        'Contact route must intercept honeypot company submissions and exit silently with HTTP 200'
      );

      // 2. Verify all 16 project SVG assets exist on disk
      const projectsDir = path.join(publicDir, 'projects');
      assert.ok(fs.existsSync(projectsDir), 'public/projects directory must exist');
      const svgs = fs
        .readdirSync(projectsDir)
        .filter((f) => f.endsWith('.svg'));
      assert.strictEqual(svgs.length, 16, 'Exactly 16 project SVG preview assets must exist');
      for (const svg of svgs) {
        const stat = fs.statSync(path.join(projectsDir, svg));
        assert.ok(stat.size > 0, `SVG file ${svg} must not be zero-byte empty`);
      }

      // 3. Verify header photo asset exists
      const photoPath = path.join(publicDir, 'portrait-cutout.webp');
      assert.ok(fs.existsSync(photoPath), 'public/portrait-cutout.webp must exist');
      assert.ok(fs.statSync(photoPath).size > 10_000, 'portrait-cutout.webp must be > 10 KB');

      // 4. Verify absolute absence of coffee palette hex codes
      const coffeeHexRegex = /#(?:211711|bb895b|38271b|4a3221|2c1d14|1f140e)\b/i;
      assert.doesNotMatch(
        css,
        coffeeHexRegex,
        'app/globals.css must contain zero residual coffee brown palette tokens'
      );

      // 5. Verify global zero box-shadow enforcer
      assert.match(
        css,
        /box-shadow:\s*none\s*!important/i,
        'Global CSS must enforce box-shadow: none !important'
      );
    }
  );
});
