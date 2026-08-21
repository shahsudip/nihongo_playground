import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const n2Dir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
const files = fs.readdirSync(n2Dir).filter(f => f.endsWith('.json'));

let foundMismatch = false;

for (const file of files) {
  const filePath = path.join(n2Dir, file);
  const storyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const text = storyData.japanese_text || '';
  const match = text.match(/<u>.*?<\/u>/g) || [];
  const tagCount = match.length;
  
  const wordCount = (storyData.annotated_words || []).length;
  
  if (tagCount !== wordCount) {
    foundMismatch = true;
    console.log(`Mismatch in ${file}:`);
    console.log(`  Title: ${storyData.title}`);
    console.log(`  Story Number: ${storyData.story_number}`);
    console.log(`  <u> Tags: ${tagCount}, Words: ${wordCount}`);
    
    // Check if any tag contains multiple words
    let wIndex = 0;
    for (const tag of match) {
      if (wIndex < storyData.annotated_words.length) {
        const expectedWord = storyData.annotated_words[wIndex].kanji;
        // console.log(`    Tag: ${tag} -> Expected: ${expectedWord}`);
      }
      wIndex++;
    }
  }
}

if (!foundMismatch) {
  console.log("All stories have perfect 1-to-1 matching!");
}
