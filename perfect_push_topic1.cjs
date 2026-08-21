const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

// Load all Topic 1 files
const files = [
  'generate_n3_topic1_part1.js',
  'generate_n3_topic1_part2.js',
  'generate_n3_topic1_part3.js',
  'generate_n3_topic1_remaining.js'
];

let allStories = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
  const match = content.match(/const stories = (\[[\s\S]*?\]);/);
  if (match) {
    // some files might use `export const stories`, but the regex `const stories = ` catches them.
    const fileStories = eval(match[1]);
    allStories = allStories.concat(fileStories);
  }
}

// Verb conjugation overrides (kanji -> exact string in text to underline)
const overrides = {
  // We can add them as we spot them. Let's start with a few known ones or just let it skip and we fix later.
  "燃える": "燃えた",
  "取り替える": "取り替えて",
  "嫌がる": "嫌がる",
  "混ぜる": "混ぜて",
  "温める": "温めて",
  "汚す": "汚して",
  "慌てる": "慌てて",
  "敷く": "敷く",
  "弱める": "弱め",
  "溶かす": "溶かして",
  "固める": "固めて",
  "ひっくり返す": "ひっくり返す",
  "召し上がる": "召し上がり", // text has お召し上がり
  "残す": "残す"
};

function extractPlainTextMap(html) {
  let plain = "";
  let map = [];
  let inTag = false;
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '<') inTag = true;
    if (!inTag) {
      plain += html[i];
      map.push(i);
    }
    if (html[i] === '>') inTag = false;
  }
  return { plain, map };
}

function wrapWords(html, wordList) {
  // 1. Strip existing wrappers
  let cleanHtml = html.replace(/<span class=['"]annotated-word['"][^>]*>/g, '').replace(/<\/span>/g, '');
  
  // Also strip existing <u> tags if any
  cleanHtml = cleanHtml.replace(/<u>/g, '').replace(/<\/u>/g, '');
  
  let { plain, map } = extractPlainTextMap(cleanHtml);
  
  let validWords = [];
  let wrappedHtml = cleanHtml;
  let offset = 0; // track length changes
  
  // Sort words by length descending so longer words get matched first (e.g. 冷凍食品 before 冷凍)
  const sortedWords = [...wordList].sort((a,b) => {
    const aLen = (overrides[a.kanji.replace(/［する］/g, '')] || a.kanji.replace(/［する］/g, '')).length;
    const bLen = (overrides[b.kanji.replace(/［する］/g, '')] || b.kanji.replace(/［する］/g, '')).length;
    return bLen - aLen;
  });

  // Keep track of which original word objects were matched to keep original order later
  const matchedOriginals = new Set();
  const replacements = [];

  for (const w of sortedWords) {
    const kanjiPlain = w.kanji.replace(/［する］/g, '');
    const searchTarget = overrides[kanjiPlain] || kanjiPlain;
    if (!searchTarget) continue;

    // Find in plain text
    const idx = plain.indexOf(searchTarget);
    if (idx !== -1) {
      matchedOriginals.add(w);
      // We found it! We need to record the replacement to apply later from right to left
      const startHtmlIdx = map[idx];
      const endHtmlIdx = map[idx + searchTarget.length - 1] + 1;
      replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
      
      // Blank it out in plain so we don't double match inside it
      plain = plain.substring(0, idx) + ' '.repeat(searchTarget.length) + plain.substring(idx + searchTarget.length);
    }
  }

  // Apply replacements from right to left to avoid offsetting issues
  replacements.sort((a,b) => b.start - a.start);
  for (const r of replacements) {
    wrappedHtml = wrappedHtml.substring(0, r.start) + '<u>' + wrappedHtml.substring(r.start, r.end) + '</u>' + wrappedHtml.substring(r.end);
  }

  // Filter original word list to ONLY include those that were actually found (maintains original order)
  const filteredWords = wordList.filter(w => matchedOriginals.has(w));

  return { html: wrappedHtml, validWords: filteredWords };
}

let currentWordId = 1;

async function run() {
  for (let i = 0; i < allStories.length; i++) {
    const story = allStories[i];
    
    // Some stories have "is_story" already, some don't
    story.title = "Topic 1 食事 Eating";
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    const { html, validWords } = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = html;
    
    story.annotated_words = validWords.map(w => {
      const newW = {
        word_id: `n3_${String(currentWordId).padStart(4, '0')}`,
        word_number: currentWordId,
        kanji: w.kanji,
        furigana: w.furigana,
        meaning_en: w.meaning_en
      };
      currentWordId++;
      return newW;
    });

    delete story.id;

    // Push to firebase
    const docId = story.page_story;
    const topicId = 'topic_01';

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .set({ title: story.title, id: topicId }, { merge: true });

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });
      
    // Save locally
    const targetPath = path.join(__dirname, 'src', 'data', 'tango_n3_raw', `${docId}.json`);
    fs.writeFileSync(targetPath, JSON.stringify(story, null, 2));
    console.log(`Pushed perfect version of ${docId} with ${validWords.length} valid words`);
  }
  console.log("All Topic 1 stories perfectly fixed and pushed!");
}

run().catch(console.error);
