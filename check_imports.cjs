const fs = require('fs');
const path = require('path');
let issues = 0;

function check(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      check(full);
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /from\s+['"]([^'"]+)['"]/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const imp = m[1];
        if (imp.startsWith('.')) {
          const targetDir = path.dirname(path.resolve(dir, imp));
          let targetFile = path.basename(imp);
          
          try {
            const dirFiles = fs.readdirSync(targetDir);
            let found = false;
            
            // Check exact match
            if (dirFiles.includes(targetFile)) found = true;
            
            // Check if it's missing extension but matches exactly
            if (!found && (dirFiles.includes(targetFile + '.js') || dirFiles.includes(targetFile + '.jsx'))) {
              found = true;
            }
            
            // Check for case-insensitive match (which would fail on Linux)
            if (!found) {
              const lowerFiles = dirFiles.map(d => d.toLowerCase());
              const lowerTarget = targetFile.toLowerCase();
              if (lowerFiles.includes(lowerTarget) || lowerFiles.includes(lowerTarget + '.js') || lowerFiles.includes(lowerTarget + '.jsx')) {
                console.log('CASE MISMATCH in', full, ':', imp, '->', targetFile);
                issues++;
              } else {
                console.log('NOT FOUND in', full, ':', imp, '->', targetFile);
                issues++;
              }
            }
          } catch(e) {
            console.log('DIRECTORY NOT FOUND for import in', full, ':', imp);
            issues++;
          }
        }
      }
    }
  }
}

check('src');
console.log('Total issues:', issues);
