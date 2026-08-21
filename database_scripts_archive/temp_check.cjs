const fs = require('fs');
const content = fs.readFileSync('generate_topic4_exact.js', 'utf-8');
const lines = content.split('\n');
let storyNumber = 0;
for (const line of lines) {
  if (line.includes('story_number:')) {
    storyNumber = line.match(/\d+/)[0];
  }
  if (line.includes('<u>')) {
    const uTags = [...line.matchAll(/<u>(.*?)<\/u>/g)].map(m => m[1]);
    console.log(`Story ${storyNumber}: ${uTags.join(', ')}`);
  }
}
