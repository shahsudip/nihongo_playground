/**
 * extract_shinkanzen_n3.js
 *
 * Master pipeline for JLPT Shinkanzen Master N3 Reading.
 * For processing pages (e.g., from 0018 onwards):
 *   1. Call Gemini Vision → extract passage JSON
 *   2. Save JSON to src/data/shinkanzen_n3_raw/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Config ──────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = 'AQ.Ab8RN6JW3j_WeBbJvYWrWtQYACZs7lP95A4DtglIXhhR6qAfYQ';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const IMG_DIR = 'D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\\shinkanzen\\shinkanzen_maaster_reading';
const OUT_DIR = path.join(__dirname, 'src', 'data', 'shinkanzen_n3_raw');

console.log(`📚 N3 images : ${IMG_DIR}`);
console.log(`📁 Output    : ${OUT_DIR}`);

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ── Gemini prompt ───────────────
function buildPrompt(pageNum) {
  return `You are processing a page from the Japanese textbook "JLPT Shinkanzen Master N3 Reading".
The image contains reading comprehension passages and/or questions.

Return a JSON array where each element represents one problem or passage section found on this page. If a passage spans multiple pages or continues from the previous page, do your best to transcribe the content visible on THIS page.

Format EACH element in the JSON array as follows:
{
  "title": "Title of the section, e.g. 第1部 問題1 or just the problem number",
  "mondaiHeader": "The overarching question instruction, e.g. 問題1 つぎの文章を読んで、質問に答えなさい。...",
  "passageText": "The exact Japanese reading passage text. Wrap underlined parts in HTML tags like <span class=\\"underline...\\">...</span> if possible. Preserve paragraphs using \\n\\n.",
  "passageNotes": "Any vocabulary notes or hints at the bottom of the passage, e.g. (注1) 引き取り：... Use HTML tags like <p>...</p>.",
  "questions": [
    {
      "questionText": "問い The exact question being asked about the passage",
      "options": [
        "Option 1 text",
        "Option 2 text",
        "Option 3 text",
        "Option 4 text"
      ],
      "correctOption": {
        "index": 0, // Set to 0, 1, 2, or 3 based on your knowledge of the correct answer, or omit if you don't know
        "text": "The exact text of the correct option"
      },
      "explanation": "Brief explanation of why it is correct (optional)"
    }
  ]
}

RULES:
- Return ONLY a valid JSON array, no markdown fences (no \`\`\`json), no commentary.
- Return [] if this page has no relevant reading passages or questions (e.g. cover page, table of contents).
- Exact word-for-word Japanese text.
- If a page only contains questions for a passage on the previous page, include the questions under a dummy "title" and leave "passageText" empty.
`;
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

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(IMG_DIR)) {
     console.error(`ERROR: Image directory not found at ${IMG_DIR}`);
     process.exit(1);
  }

  const files = fs.readdirSync(IMG_DIR)
    .filter(f => f.startsWith('N3_page-') && f.endsWith('.jpg'))
    .sort();

  console.log(`📖 ${files.length} pages to process\n`);

  let extracted = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const pageNumStr = filename.match(/N3_page-(\d+)\.jpg/)[1];
    const imgPath = path.join(IMG_DIR, filename);
    const outName = `page_${pageNumStr}.json`;
    const fpath = path.join(OUT_DIR, outName);

    if (fs.existsSync(fpath)) {
       console.log(`\n📄 ${filename} [${i+1}/${files.length}] → already exists, skipping.`);
       continue;
    }

    process.stdout.write(`\n📄 ${filename} [${i+1}/${files.length}] extracting... `);
    const raw = await callGemini(imgPath, pageNumStr);

    let passages;
    try {
      passages = JSON.parse(raw);
      if (!Array.isArray(passages)) passages = [passages];
    } catch (e) {
      console.log(`\n  ⚠️  JSON parse error: ${e.message} | raw: ${raw.slice(0, 200)}`);
      fs.writeFileSync(path.join(OUT_DIR, `_error_${pageNumStr}.txt`), raw, 'utf8');
      await sleep(3000);
      continue;
    }

    if (passages.length === 0) {
      console.log(`→ no content (skipping)`);
      await sleep(1000);
      continue;
    }

    console.log(`→ ${passages.length} passage(s)/problem(s)`);

    fs.writeFileSync(fpath, JSON.stringify(passages, null, 2), 'utf8');
    console.log(`  💾 Saved ${outName}`);

    extracted += passages.length;
    await sleep(2000);
  }

  console.log(`\n${'═'.repeat(55)}`);
  console.log(`🎉 ALL DONE! extracted items=${extracted}`);
  console.log(`${'═'.repeat(55)}`);
  process.exit(0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
