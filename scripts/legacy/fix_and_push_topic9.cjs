const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

// We will read the old cjs file and eval it to get the array
const topic9_content = fs.readFileSync(path.join(__dirname, 'generate_n3_topic9.cjs'), 'utf8');
// extract the array
const match = topic9_content.match(/const topic9_stories = (\[[\s\S]*?\]);/);
const stories = eval(match[1]);

let currentWordId = 883;

async function run() {
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    story.title = "Topic 9 動物 Animals";
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    // Add IDs and fix meaning key
    story.annotated_words = story.annotated_words.map(w => {
      const kanjiPlain = w.kanji.replace(/［する］/g, ''); // For matching in text
      
      // Try to wrap the word in japanese_text if it's not already wrapped
      // We look for <ruby>kanjiPlain... or just the kanjiPlain
      const rubyRegex = new RegExp(`(<ruby>${kanjiPlain}<rt>[^<]*</rt></ruby>)`, 'g');
      if (story.japanese_text.match(rubyRegex)) {
        story.japanese_text = story.japanese_text.replace(rubyRegex, `<span class='annotated-word' data-word='${kanjiPlain}'>$1</span>`);
      } else {
        const plainRegex = new RegExp(`(${kanjiPlain})`, 'g');
        story.japanese_text = story.japanese_text.replace(plainRegex, `<span class='annotated-word' data-word='${kanjiPlain}'>$1</span>`);
      }

      const newW = {
        word_id: `n3_${String(currentWordId).padStart(4, '0')}`,
        word_number: currentWordId,
        kanji: w.kanji,
        furigana: w.furigana,
        meaning_en: w.meaning
      };
      currentWordId++;
      return newW;
    });

    delete story.id;

    // Push to firebase
    const docId = story.page_story;
    const topicId = 'topic_09';

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .set({ title: story.title, id: topicId }, { merge: true });

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });
      
    // Save locally too
    fs.writeFileSync(path.join(__dirname, 'src', 'data', 'tango_n3_raw', `${docId}.json`), JSON.stringify(story, null, 2));
    
    console.log(`Fixed and pushed ${docId}`);
  }
  console.log("All Topic 9 stories fixed and pushed!");
}

run().catch(console.error);
