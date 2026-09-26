const fs = require('fs');
const path = require('path');

// Fix paragraph indentation in N3 w04 passages
// In the JSON file the passage is stored as a single-line JSON string.
// Paragraph breaks appear as the literal characters \n inside the string (i.e. backslash-n).
// We need to add 　 after every \n that starts a new paragraph (not already indented).

['d01','d02','d03','d04','d05'].forEach(d => {
  const file = path.join(__dirname, '..', 'src', 'data', 'zenkamoku_n3', 'w04-'+d+'.json');
  let content = fs.readFileSync(file, 'utf8');

  // In a JSON string on disk, the escape sequence is the two chars: \ and n
  // We can work at the raw text level: replace \n followed by a non-indented char
  // A "新しい段落 with no indent" means the char after \n is NOT 　 (U+3000) or < (closing div)
  // We replace \\n (literal backslash-n in the file) followed by Japanese/letter that's not already 　
  const before = content;
  
  // Replace \n (in the raw file) followed by 日本語 without 　
  // The raw file has: \\n (two chars: backslash, n) as the paragraph separator
  content = content.replace(/\\n([^\u3000<\\])/g, (match, nextChar) => {
    return '\\n\u3000' + nextChar;
  });

  if (content !== before) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed indentation in:', path.basename(file));
  } else {
    console.log('Already correct or no passages:', path.basename(file));
  }
});

console.log('N3 W4 done.');
