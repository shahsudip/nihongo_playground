import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const n2Dir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
const files = fs.readdirSync(n2Dir).filter(f => f.endsWith('.json'));

let storyCount = 0;

for (const file of files) {
  const filePath = path.join(n2Dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let modified = false;

  if (data.id && !data.page_story) {
    data.page_story = data.id;
    delete data.id;
    modified = true;
  }
  
  if (data.english_text && !data.english_translation) {
    data.english_translation = data.english_text;
    delete data.english_text;
    modified = true;
  }
  
  if (data.words && !data.annotated_words) {
    data.annotated_words = data.words.map(w => {
      const num = parseInt(w.id, 10);
      return {
        word_id: `n2_${num.toString().padStart(4, '0')}`,
        word_number: num,
        kanji: w.kanji,
        furigana: w.furigana || "",
        meaning_en: w.english
      };
    });
    delete data.words;
    modified = true;
  }

  // Also add is_story and story_number if missing
  if (data.is_story === undefined) {
    data.is_story = true;
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    storyCount++;
    console.log(`Fixed ${file}`);
  }
}

console.log(`Fixed ${storyCount} files.`);
