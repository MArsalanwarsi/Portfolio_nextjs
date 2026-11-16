import fs from 'node:fs';
import postcss from 'postcss';
import tailwindPostcss from '@tailwindcss/postcss';

async function testCompile() {
  const sample = `
    @import "tailwindcss";
    @import "./app/globals.css";

    .test-paddock {
      @apply bg-paddock-olive text-chalk-cream border-visor-black;
    }
    .test-lime {
      @apply bg-signal-lime text-moss-lime;
    }
  `;

  const result = await postcss([tailwindPostcss()]).process(sample, { from: 'test.css' });
  const lines = result.css.split('\n');
  const matched = lines.filter(l => 
    l.includes('test-paddock') || 
    l.includes('test-lime') || 
    l.includes('--color-paddock-olive') || 
    l.includes('--color-signal-lime') ||
    l.includes('paddock-olive')
  );
  console.log('--- Matched Lines ---');
  console.log(matched.join('\n'));
  console.log('--- Success ---');
}

testCompile().catch(e => {
  console.error('Compilation Error:', e);
  process.exit(1);
});
