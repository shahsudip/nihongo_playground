const fs = require('fs');
let content = fs.readFileSync('generate_topic4_exact.js', 'utf-8');
// Fix the multi-line string syntax by converting double quotes to backticks for japanese_text
// Find all instances of japanese_text: "..." and convert them.
content = content.replace(/japanese_text:\s*"/g, 'japanese_text: `');
content = content.replace(/",\s*english_translation:/g, '`,\n    english_translation:');
// Fix the one that had a syntax error
content = content.replace(/黒い方ならいいかな？",/g, '黒い方ならいいかな？`,');
fs.writeFileSync('generate_topic4_exact.js', content, 'utf-8');
