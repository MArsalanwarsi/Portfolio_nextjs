import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) files.push(...walk(full));
    else if (f.name.endsWith('.test.mjs')) files.push(full);
  }
  return files;
}

const testFiles = walk('tests/e2e');
for (const file of testFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('||') && !line.includes('//')) {
      console.log(`${path.basename(file)}:${idx + 1}: ${line.trim()}`);
    }
  });
}
