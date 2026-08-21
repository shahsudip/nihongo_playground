const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

// Load all remaining Topic files
const files = fs.readdirSync(__dirname).filter(f => f.match(/^generate_n3_topic.*\.(js|cjs)$/) && !f.includes('topic1_') && !f.includes('topic9') && !f.includes('topic1.'));

let allStories = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
  // Match the array declaration, usually const something = [...]
  const match = content.match(/const [a-zA-Z0-9_]+ = (\[[\s\S]*?\]);/);
  if (match) {
    try {
      const fileStories = eval(match[1]);
      allStories = allStories.concat(fileStories);
    } catch(e){}
  }
}

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
  let cleanHtml = html.replace(/<span class=['"]annotated-word['"][^>]*>/g, '').replace(/<\/span>/g, '');
  cleanHtml = cleanHtml.replace(/<u>/g, '').replace(/<\/u>/g, '');
  
  let { plain, map } = extractPlainTextMap(cleanHtml);
  
  let wrappedHtml = cleanHtml;
  
  const sortedWords = [...wordList].sort((a,b) => {
    const aLen = a.kanji.replace(/［する］|\[する\]|（|）|～/g, '').length;
    const bLen = b.kanji.replace(/［する］|\[する\]|（|）|～/g, '').length;
    return bLen - aLen;
  });

  const matchedOriginals = new Set();
  const replacements = [];

  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）|～/g, '');
    let searchTarget = kanjiPlain;
    if (!searchTarget) continue;

    let idx = plain.indexOf(searchTarget);
    if (idx !== -1) {
      matchedOriginals.add(w);
      const startHtmlIdx = map[idx];
      const endHtmlIdx = map[idx + searchTarget.length - 1] + 1;
      replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
      plain = plain.substring(0, idx) + ' '.repeat(searchTarget.length) + plain.substring(idx + searchTarget.length);
    } else {
        // Try without suru
        let kanjiNoSuru = kanjiPlain.replace(/する$/, '');
        if (kanjiNoSuru && kanjiNoSuru.length > 1) {
            idx = plain.indexOf(kanjiNoSuru);
            if (idx !== -1) {
                matchedOriginals.add(w);
                const startHtmlIdx = map[idx];
                const endHtmlIdx = map[idx + kanjiNoSuru.length - 1] + 1;
                replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
                plain = plain.substring(0, idx) + ' '.repeat(kanjiNoSuru.length) + plain.substring(idx + kanjiNoSuru.length);
            }
        }
    }
  }

  replacements.sort((a,b) => b.start - a.start);
  for (const r of replacements) {
    wrappedHtml = wrappedHtml.substring(0, r.start) + '<u>' + wrappedHtml.substring(r.start, r.end) + '</u>' + wrappedHtml.substring(r.end);
  }

  const filteredWords = wordList.filter(w => matchedOriginals.has(w));
  return { html: wrappedHtml, validWords: filteredWords };
}


// Group by Topic
const topicsMap = {};
for (const story of allStories) {
  if (!story.title) continue;
  const tNum = parseInt(story.title.split(' ')[1]);
  if (!tNum) continue;
  const topicId = `topic_${String(tNum).padStart(2, '0')}`;
  if (!topicsMap[topicId]) topicsMap[topicId] = [];
  topicsMap[topicId].push(story);
}

let currentWordId = 1000;

async function run() {
  for (const [topicId, stories] of Object.entries(topicsMap)) {
      console.log(`Processing ${topicId}...`);
      for (let i = 0; i < stories.length; i++) {
        const story = stories[i];
        
        story.title = `Topic ${parseInt(topicId.split('_')[1])}`;
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
            meaning_en: w.meaning_en || w.meaning
          };
          currentWordId++;
          return newW;
        });

        delete story.id;

        const docId = story.page_story;

        await db.collection('books').doc('tango_n3')
          .collection('topics').doc(topicId)
          .set({ title: story.title, id: topicId }, { merge: true });

        await db.collection('books').doc('tango_n3')
          .collection('topics').doc(topicId)
          .collection('stories').doc(docId)
          .set(story, { merge: true });
          
        const targetPath = path.join(__dirname, 'src', 'data', 'tango_n3_raw', `${docId}.json`);
        fs.writeFileSync(targetPath, JSON.stringify(story, null, 2));
      }
      console.log(`Finished ${topicId}`);
  }
  console.log("All Topics successfully fixed and pushed!");
}

run().catch(console.error);
