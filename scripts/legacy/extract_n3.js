/**
 * extract_n3.js
 *
 * Master pipeline for Best Tango N3 合格2100.
 * For processing pages (e.g., from 127 onwards):
 *   1. Call Gemini Vision → extract story JSON
 *   2. Save JSON to src/data/tango_n3_raw/  
 *   3. Immediately push to Firebase
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Firebase ────────────────────────────────────────────────────────────────
const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

// ── Config ──────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = 'AQ.Ab8RN6JW3j_WeBbJvYWrWtQYACZs7lP95A4DtglIXhhR6qAfYQ';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Update START_PAGE to match where Topic 9 actually begins in the book.
const START_PAGE     = 127; 

// We explicitly target the N3 book directory
const IMG_DIR = 'D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\ベスト単語\\ベスト単語 N3 合格2100';
const OUT_DIR = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

console.log(`📚 N3 images : ${IMG_DIR}`);
console.log(`📁 Output    : ${OUT_DIR}`);
console.log(`🚀 Start page: ${START_PAGE}\n`);

// ── Gemini prompt ───────────────
function buildPrompt(pageNum) {
  return `You are processing page ${pageNum} from the Japanese textbook "Best Tango N3 合格2100".
Each page has one or two story/passage blocks in distinct framed boxes.

For EACH story block on the page return one JSON object:
- "story_index": 1 for the first story on this page, 2 for the second (if any)
- "story_number": the sequential story number within this topic (read from the book)
- "topic_title": exact topic title as printed, e.g. "Topic 9 動物と植物 Animals and plants"
- "japanese_text": EXACT Japanese text from the story box, with underlined words wrapped in <u>...</u> or <span class='annotated-word'>...</span>
- "english_translation": ONLY the English translation for this story (stop before Chinese/Vietnamese)
- "words": array of vocab words listed under this story block:
    [{"id": "190", "kanji": "...", "furigana": "...", "meaning_en": "..."}]
    where "id" is the exact word number printed in the book

Return a JSON array (one element per story block on this page):
[
  {
    "story_index": 1,
    "story_number": 1,
    "topic_title": "Topic 9 動物と植物 Animals and plants",
    "japanese_text": "...",
    "english_translation": "...",
    "words": [{"id": "190", "kanji": "...", "furigana": "...", "meaning_en": "..."}]
  }
]

RULES:
- Do NOT invent a "page_story" field — we will set it from the actual page number.
- Return [] if this page has no story blocks (index/intro/review/index pages).
- Return ONLY valid JSON array, no markdown fences, no commentary.
- Exact word-for-word Japanese text only. Do NOT merge two stories.`;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function callGemini(imgPath, pageNum, retries = 5) {
  const b64 = fs.readFileSync(imgPath).toString('base64');
  const payload = {
    contents: [{ parts: [
      { text: buildPrompt(pageNum) },
      { inline_data: { mime_type: 'image/jpeg', data: b64 } }
    ]}],
    generationConfig: { temperature: 0.0, response_mime_type: 'application/json' }
  };

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const resp = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        const data = await resp.json();
        return data.candidates[0].content.parts[0].text;
      }
      if (resp.status === 429) {
        const wait = 30000 * (attempt + 1);
        console.log(`  ⏳ Rate limited — waiting ${wait/1000}s...`);
        await sleep(wait);
      } else {
        const txt = await resp.text();
        console.log(`  ❌ Gemini ${resp.status}: ${txt.slice(0, 150)}`);
        await sleep(5000);
      }
    } catch (err) {
      console.log(`  ❌ Fetch error: ${err.message}`);
      await sleep(5000);
    }
  }
  return '[]';
}

async function pushStory(storyData, docId) {
  const topicTitle = storyData.title || 'Topic 9';
  const m = topicTitle.match(/Topic\s*(\d+)/i);
  const topicId = m ? `topic_${m[1].padStart(2, '0')}` : 'topic_09';

  // Make sure we write to tango_n3!
  await db.collection('books').doc('tango_n3').set({
    id: 'tango_n3', title: 'Best Tango N3 Goukaku 2100',
    description: 'Reading comprehension and vocabulary for N3',
    level: 'N3', category: 'Vocabulary & Reading', type: 'reading'
  }, { merge: true });

  await db.collection('books').doc('tango_n3')
    .collection('topics').doc(topicId)
    .set({ title: topicTitle, id: topicId }, { merge: true });

  await db.collection('books').doc('tango_n3')
    .collection('topics').doc(topicId)
    .collection('stories').doc(docId)
    .set(storyData, { merge: true });

  console.log(`  🔥 Firebase → tango_n3/${topicId}/stories/${docId}`);
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(IMG_DIR)) {
     console.error(`ERROR: Image directory not found at ${IMG_DIR}`);
     process.exit(1);
  }

  const pages = fs.readdirSync(IMG_DIR)
    .filter(f => f.endsWith('.jpg') && /^\d+$/.test(f.slice(0, -4)))
    .map(f => parseInt(f.slice(0, -4), 10))
    .filter(n => n >= START_PAGE)
    .sort((a, b) => a - b);

  console.log(`📖 ${pages.length} pages to process (${pages[0]}–${pages[pages.length-1]})\n`);

  let extracted = 0;
  let skipped   = 0;
  let currentTopic = '';

  for (let i = 0; i < pages.length; i++) {
    const pageNum = pages[i];
    const imgPath = path.join(IMG_DIR, `${pageNum}.jpg`);

    const doneFiles = fs.readdirSync(OUT_DIR)
      .filter(f => f.startsWith(`${pageNum}_`) && f.endsWith('.json'));

    // Uncomment this to allow skipping already parsed files
    // if (doneFiles.length > 0) { ... continue; }

    process.stdout.write(`\n📄 Page ${pageNum} [${i+1}/${pages.length}] extracting... `);
    const raw = await callGemini(imgPath, pageNum);

    let stories;
    try {
      stories = JSON.parse(raw);
      if (!Array.isArray(stories)) stories = [stories];
    } catch (e) {
      console.log(`\n  ⚠️  JSON parse error: ${e.message} | raw: ${raw.slice(0, 200)}`);
      fs.writeFileSync(path.join(OUT_DIR, `_error_${pageNum}.txt`), raw, 'utf8');
      await sleep(3000);
      continue;
    }

    if (stories.length === 0) {
      console.log(`→ no stories (skipping)`);
      await sleep(1000);
      continue;
    }

    console.log(`→ ${stories.length} story(s)`);

    for (const story of stories) {
      const idx        = parseInt(story.story_index || '1', 10);
      const pageStory  = `${pageNum}_${idx}`;
      const topicTitle = (story.topic_title || 'Topic 9').trim();

      if (topicTitle !== currentTopic) {
        currentTopic = topicTitle;
        console.log(`\n${'─'.repeat(55)}\n📚  ${currentTopic}\n${'─'.repeat(55)}`);
      }

      const storyData = {
        is_story:            true,
        story_number:        parseInt(story.story_number || idx, 10),
        title:               topicTitle,
        page_story:          pageStory,
        japanese_text:       story.japanese_text || '',
        english_translation: story.english_translation || '',
        annotated_words: (story.words || []).map(w => {
          const id = String(w.id || '').replace(/,/g, '');
          return {
            word_id:     `n3_${id.padStart(4, '0')}`,
            word_number: parseInt(id, 10) || 0,
            kanji:       w.kanji || '',
            furigana:    w.furigana || '',
            meaning_en:  w.meaning_en || ''
          };
        })
      };

      // Save
      const fpath = path.join(OUT_DIR, `${pageStory}.json`);
      fs.writeFileSync(fpath, JSON.stringify(storyData, null, 2), 'utf8');
      console.log(`  💾 ${pageStory}.json  story#${storyData.story_number}  ${storyData.annotated_words.length} words`);

      // Push immediately
      await pushStory(storyData, pageStory);
      extracted++;
    }

    await sleep(2000);
  }

  console.log(`\n${'═'.repeat(55)}`);
  console.log(`🎉 ALL DONE! stories=${extracted}`);
  console.log(`${'═'.repeat(55)}`);
  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
