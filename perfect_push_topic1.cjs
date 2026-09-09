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
    const fileStories = eval(match[1]);
    allStories = allStories.concat(fileStories);
  }
}

// Verb conjugation overrides (kanji -> exact string in text to underline)
const overrides = {
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
  "召し上がる": "召し上がり",
  "残す": "残す"
};

function parseRubyHtml(html) {
  let clean = html
    .replace(/<span class=['"]annotated-word['"][^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<u>/g, '')
    .replace(/<\/u>/g, '');

  let baseText = "";
  let baseMap = [];

  let i = 0;
  while (i < clean.length) {
    if (clean.startsWith('<ruby', i)) {
      const rubyEnd = clean.indexOf('</ruby>', i);
      if (rubyEnd !== -1) {
        const fullRubyHtml = clean.substring(i, rubyEnd + 7);
        const insideRuby = clean.substring(clean.indexOf('>', i) + 1, rubyEnd);
        const rtRemoved = insideRuby.replace(/<rt[\s\S]*?<\/rt>/gi, '').replace(/<rp[\s\S]*?<\/rp>/gi, '').replace(/<[^>]+>/g, '');
        
        for (let c of rtRemoved) {
          baseText += c;
          baseMap.push({
            char: c,
            htmlStart: i,
            htmlEnd: rubyEnd + 7,
            isRuby: true,
            fullRubyHtml: fullRubyHtml
          });
        }
        i = rubyEnd + 7;
        continue;
      }
    }

    if (clean[i] === '<') {
      const tagEnd = clean.indexOf('>', i);
      if (tagEnd !== -1) {
        i = tagEnd + 1;
        continue;
      }
    }

    baseText += clean[i];
    baseMap.push({
      char: clean[i],
      htmlStart: i,
      htmlEnd: i + 1,
      isRuby: false
    });
    i++;
  }

  return { clean, baseText, baseMap };
}

function wrapWords(html, wordList) {
  const { clean, baseText, baseMap } = parseRubyHtml(html);
  
  let searchStr = baseText;
  const sortedWords = [...wordList].sort((a, b) => {
    const aPlain = a.kanji.replace(/［する］|\[する\]|（|）|～/g, '');
    const bPlain = b.kanji.replace(/［する］|\[する\]|（|）|～/g, '');
    const aTarget = overrides[aPlain] || aPlain;
    const bTarget = overrides[bPlain] || bPlain;
    return bTarget.length - aTarget.length;
  });

  const matchedOriginals = new Set();
  const replacements = [];

  for (const w of sortedWords) {
    const kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）|～/g, '');
    const searchTarget = overrides[kanjiPlain] || kanjiPlain;
    if (!searchTarget) continue;

    const idx = searchStr.indexOf(searchTarget);
    if (idx !== -1) {
      matchedOriginals.add(w);
      const startHtmlIdx = baseMap[idx].htmlStart;
      const endHtmlIdx = baseMap[idx + searchTarget.length - 1].htmlEnd;
      replacements.push({ start: startHtmlIdx, end: endHtmlIdx, word: w });
      
      searchStr = searchStr.substring(0, idx) + ' '.repeat(searchTarget.length) + searchStr.substring(idx + searchTarget.length);
    }
  }

  // Sort replacements from right to left
  replacements.sort((a, b) => b.start - a.start);
  let wrappedHtml = clean;
  for (const r of replacements) {
    wrappedHtml = wrappedHtml.substring(0, r.start) + '<u>' + wrappedHtml.substring(r.start, r.end) + '</u>' + wrappedHtml.substring(r.end);
  }

  const filteredWords = wordList.filter(w => matchedOriginals.has(w));
  return { html: wrappedHtml, validWords: filteredWords };
}

let currentWordId = 1;

async function run() {
  for (let i = 0; i < allStories.length; i++) {
    const story = allStories[i];
    
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
