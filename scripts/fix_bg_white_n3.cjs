const fs = require('fs');

// Fix N3 w05-d01.json - bg-white
let c2 = fs.readFileSync('src/data/zenkamoku_n3/w05-d01.json','utf8');
const before2 = c2;
c2 = c2.replace(/bg-white/g, 'bg-amber-50\\/20 dark:bg-slate-900\\/60');
if (c2 !== before2) { fs.writeFileSync('src/data/zenkamoku_n3/w05-d01.json',c2,'utf8'); console.log('N3 w05-d01 bg-white fixed'); }

// Fix N3 w05-d05.json - bg-white  
let c3 = fs.readFileSync('src/data/zenkamoku_n3/w05-d05.json','utf8');
const before3 = c3;
c3 = c3.replace(/bg-white/g, 'bg-amber-50\\/20 dark:bg-slate-900\\/60');
if (c3 !== before3) { fs.writeFileSync('src/data/zenkamoku_n3/w05-d05.json',c3,'utf8'); console.log('N3 w05-d05 bg-white fixed'); }

// Validate all
['src/data/zenkamoku_n2/w05-d01.json','src/data/zenkamoku_n3/w05-d01.json','src/data/zenkamoku_n3/w05-d05.json'].forEach(f => {
  try { JSON.parse(fs.readFileSync(f,'utf8')); console.log(f, 'valid'); }
  catch(e) { console.error(f, 'INVALID:', e.message); }
});

console.log('Done');
