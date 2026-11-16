const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getFiles(full));
    else if (e.isFile() && e.name.endsWith('.test.mjs')) files.push(full);
  }
  return files;
}

const files = getFiles('tests/e2e');
console.log('Total files found:', files.length);

let issues = 0;
let totalTests = 0;
let totalSuites = 0;
let totalTodos = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(process.cwd(), file);
  
  const hasDescribeImport = /import\s*\{[^}]*describe[^}]*\}\s*from\s*['"]node:test['"]/.test(content);
  const hasTestImport = /import\s*\{[^}]*test[^}]*\}\s*from\s*['"]node:test['"]/.test(content);
  const hasOldTTest = /t\.test\s*\(/.test(content);
  const describeMatches = content.match(/describe\s*\(/g) || [];
  const testMatches = content.match(/test\s*\(/g) || [];
  const todoMatches = content.match(/todo\s*:/g) || [];
  
  if (!hasDescribeImport || !hasTestImport) {
    console.error('FAIL Import:', relPath);
    issues++;
  }
  if (hasOldTTest) {
    console.error('FAIL Contains t.test():', relPath);
    issues++;
  }
  if (describeMatches.length === 0) {
    console.error('FAIL No describe():', relPath);
    issues++;
  }

  totalSuites += describeMatches.length;
  totalTests += testMatches.length;
  totalTodos += todoMatches.length;
  
  console.log(`OK: ${relPath} -> describes: ${describeMatches.length}, tests: ${testMatches.length}, todos: ${todoMatches.length}`);
}

console.log(`Summary: ${files.length} files, ${totalSuites} describes, ${totalTests} tests, ${totalTodos} todos. Issues: ${issues}`);
if (issues > 0) process.exit(1);
