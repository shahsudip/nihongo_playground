/**
 * extract_and_push_all_n2.js
 *
 * Master pipeline for Best Tango N2 合格2400.
 * For every page from 43 onwards (Topics 3+):
 *   1. Call Gemini Vision → extract story JSON
 *   2. Save JSON to src/data/tango_n2_raw/  (page_story = "{pageNum}_{idx}" always correct)
 *   3. Immediately push to Firebase
 *   4. Move to next page — never stops until done
 *
 * Already-done pages (JSON exists on disk) are skipped.
 * Run: node extract_and_push_all_n2.js
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
const START_PAGE     = 43; // Topics 1 & 2 already done (pages 14–42)

function findN2ImgDir() {
  const base = 'D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi';
  for (const item of fs.readdirSync(base)) {
    if (item.includes('単語')) {
      const best = path.join(base, item);
      for (const sub of fs.readdirSync(best)) {
        if (sub.includes('N2') && sub.includes('2400') && !sub.endsWith('.pdf') && !sub.endsWith('.zip')) {
          return path.join(best, sub);
        }
      }
    }
  }
  throw new Error('N2 image directory not found');
}

const IMG_DIR = findN2ImgDir();
const OUT_DIR = path.join(__dirname, 'src', 'data', 'tango_n2_raw');

console.log(`📚 N2 images : ${IMG_DIR}`);
console.log(`📁 Output    : ${OUT_DIR}`);
console.log(`🚀 Start page: ${START_PAGE}\n`);

// ── Gemini prompt (NO page_story field — we set it ourselves) ───────────────
function buildPrompt(pageNum) {
  return `You are processing page ${pageNum} from the Japanese textbook "Best Tango N2 合格2400".
Each page has one or two story/passage blocks in distinct framed boxes.

For EACH story block on the page return one JSON object:
- "story_index": 1 for the first story on this page, 2 for the second (if any)
- "story_number": the sequential story number within this topic (read from the book)
- "topic_title": exact topic title as printed, e.g. "Topic 3 買い物"
- "japanese_text": EXACT Japanese text from the story box, with underlined words wrapped in <u>...</u>
- "english_translation": ONLY the English translation for this story (stop before Chinese/Vietnamese)
- "words": array of vocab words listed under this story block:
    [{"id": "190", "kanji": "...", "furigana": "...", "meaning_en": "..."}]
    where "id" is the exact word number printed in the book

Return a JSON array (one element per story block on this page):
[
  {
    "story_index": 1,
    "story_number": 1,
    "topic_title": "Topic 3 買い物",
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
  const topicTitle = storyData.title || 'Topic 3 買い物';
  const m = topicTitle.match(/Topic\s*(\d+)/i);
  const topicId = m ? `topic_${m[1].padStart(2, '0')}` : 'topic_03';

  await db.collection('books').doc('tango_n2').set({
    id: 'tango_n2', title: 'Best Tango N2 Goukaku 2500',
    description: 'Reading comprehension and vocabulary for N2',
    level: 'N2', category: 'Vocabulary & Reading', type: 'reading'
  }, { merge: true });

  await db.collection('books').doc('tango_n2')
    .collection('topics').doc(topicId)
    .set({ title: topicTitle, id: topicId }, { merge: true });

  await db.collection('books').doc('tango_n2')
    .collection('topics').doc(topicId)
    .collection('stories').doc(docId)
    .set(storyData, { merge: true });

  console.log(`  🔥 Firebase → tango_n2/${topicId}/stories/${docId}`);
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
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

    // Check which story slots already done for this page
    const doneFiles = fs.readdirSync(OUT_DIR)
      .filter(f => f.startsWith(`${pageNum}_`) && f.endsWith('.json'));

    if (doneFiles.length > 0) {
      process.stdout.write(`  ⏭️  p${pageNum} already done → `);
      for (const fname of doneFiles) {
        const data = JSON.parse(fs.readFileSync(path.join(OUT_DIR, fname), 'utf8'));
        await pushStory(data, fname.slice(0, -5));
      }
      skipped++;
      continue;
    }

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
      // Always compute page_story from real page number — never trust Gemini
      const idx        = parseInt(story.story_index || '1', 10);
      const pageStory  = `${pageNum}_${idx}`;
      const topicTitle = (story.topic_title || 'Topic 3 買い物').trim();

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
            word_id:     `n2_${id.padStart(4, '0')}`,
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

    // Delay between pages
    await sleep(2000);

    // Checkpoint every 20 pages
    if ((i + 1) % 20 === 0) {
      console.log(`\n${'═'.repeat(55)}`);
      console.log(`✅ CHECKPOINT  page ${pageNum}  [${i+1}/${pages.length}]  extracted=${extracted}`);
      console.log(`${'═'.repeat(55)}\n`);
      await sleep(3000);
    }
  }

  console.log(`\n${'═'.repeat(55)}`);
  console.log(`🎉 ALL DONE!  pages=${pages.length}  stories=${extracted}  skipped=${skipped}`);
  console.log(`${'═'.repeat(55)}`);
  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
