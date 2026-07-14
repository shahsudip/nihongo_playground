const fs = require('fs');
const path = require('path');

function checkImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];
    
    // Ignore non-relative imports
    if (!importPath.startsWith('.')) continue;
    
    const dir = path.dirname(filePath);
    const resolvedPath = path.resolve(dir, importPath);
    
    // Check if the directory exists
    const targetDir = path.dirname(resolvedPath);
    if (!fs.existsSync(targetDir)) continue;
    
    const targetFile = path.basename(resolvedPath);
    const filesInDir = fs.readdirSync(targetDir);
    
    const actualFile = filesInDir.find(f => f.toLowerCase() === targetFile.toLowerCase());
    
    if (actualFile && actualFile !== targetFile) {
      console.log(`CASE MISMATCH in ${filePath}:`);
      console.log(`  Imported as: ${targetFile}`);
      console.log(`  Actual file: ${actualFile}`);
      console.log('-----------------------------------');
    }
  }
}

// Check App.jsx and all components
checkImports('src/App.jsx');
const components = fs.readdirSync('src/components').filter(f => f.endsWith('.jsx'));
for (const comp of components) {
  checkImports(path.join('src/components', comp));
}
