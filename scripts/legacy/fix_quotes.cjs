const fs = require('fs');
let content = fs.readFileSync('generate_topic4_exact.js', 'utf-8');
content = content.replace(/japanese_text: "/g, 'japanese_text: `');
content = content.replace(/",\n    english_translation:/g, '`,\n    english_translation:');
fs.writeFileSync('generate_topic4_exact.js', content, 'utf-8');
console.log('Fixed quotes in generate_topic4_exact.js');
