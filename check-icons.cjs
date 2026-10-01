/* eslint-disable @typescript-eslint/no-require-imports */

const l = require('lucide-react');
const keys = Object.keys(l);
const git = keys.filter(k => k.toLowerCase().includes('git'));
const link = keys.filter(k => k.toLowerCase().includes('link'));
const cookie = keys.filter(k => k.toLowerCase().includes('cookie'));
console.log('Git-related:', git.join(', '));
console.log('Link-related:', link.join(', '));
console.log('Cookie-related:', cookie.join(', '));
console.log('Total exports:', keys.length);
// Check some specific ones
const check = ['Github', 'GitBranch', 'Linkedin', 'Cookie', 'ExternalLink', 'CheckCircle2'];
check.forEach(name => {
  console.log(`${name}: ${name in l ? 'EXISTS' : 'MISSING'}`);
});
