const fs = require('fs');
const path = require('path');

// Fix W4D1: curly quotes introduced during editing, making JSON invalid
const file = path.join(__dirname, '..', 'src', 'data', 'zenkamoku_n2', 'w04-d01.json');
let c = fs.readFileSync(file, 'utf8');

// Replace curly/smart double quotes with regular escaped quotes
// In JSON strings, double quotes must be escaped as \"
// The smart quotes \u201c and \u201d do not need escaping in JSON, but the
// actual issue is the replace_file_content tool introduced unescaped literal "
// Let's validate and find the problem
try {
  JSON.parse(c);
  console.log('JSON already valid');
} catch (e) {
  console.log('JSON invalid, fixing...');
  // The passage has: 今では"母の買い物"がありがたく
  // In a JSON string, regular " must be \", but smart quotes \u201c\u201d are fine
  // The replace_file_content tool changed the curly quotes to straight quotes
  // without escaping them, breaking JSON. Fix: escape the unescaped inner quotes.
  
  // Strategy: re-escape any unescaped " that appear inside the passage string value
  // Find the passage field and fix it
  c = c.replace(/"母の買い物"/g, '\\"母の買い物\\"');
  
  try {
    JSON.parse(c);
    console.log('JSON fixed and valid');
  } catch (e2) {
    console.error('Still invalid:', e2.message);
    // Show the problematic area
    const idx = e2.message.match(/position (\d+)/);
    if (idx) {
      const pos = parseInt(idx[1]);
      console.log('Context:', JSON.stringify(c.substring(pos - 20, pos + 20)));
    }
  }
}

fs.writeFileSync(file, c, 'utf8');
console.log('Saved');
