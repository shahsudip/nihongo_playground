const fs = require('fs');

const file = 'src/data/zenkamoku_n2/w05-d01.json';
let c = fs.readFileSync(file, 'utf8');

// Fix 1: Remove the hardcoded bg-gray-50 white box and colored text labels
// Replace the inner 記 section box with theme-adaptive classes
c = c.replace(
  '"bg-gray-50 dark:bg-slate-800/80 p-4 border border-gray-300 dark:border-gray-700 rounded mb-4 text-base space-y-3"',
  '"p-4 border border-gray-400 dark:border-gray-500 rounded mb-4 text-base space-y-3"'
);

// Fix 2: Remove red/blue color labels for 【変更前】/【変更後】 — plain bold matching the book
c = c.replace(
  '"font-bold text-red-600 dark:text-red-400"',
  '"font-bold"'
);
c = c.replace(
  '"font-bold text-blue-600 dark:text-blue-400"',
  '"font-bold"'
);

try {
  JSON.parse(c);
  console.log('JSON valid');
} catch(e) {
  console.error('JSON INVALID:', e.message);
  process.exit(1);
}

fs.writeFileSync(file, c, 'utf8');
console.log('Fixed w05-d01.json');
