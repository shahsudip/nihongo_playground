const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "146_1",
    "japanese_text": "郊外に暮らすと、アクセスが悪いというイメージがある。しかし、実際には地下鉄一本で通勤できる。",
    "english_translation": "People tend to imagine that living in the suburbs means having poor access, but I can actually commute to work with just one subway line.",
    "annotated_words": [
      { "meaning_en": "suburbs", "furigana": "こうがい", "kanji": "郊外" },
      { "meaning_en": "live", "furigana": "くらす", "kanji": "暮らす" },
      { "meaning_en": "life, living", "furigana": "くらし", "kanji": "暮らし" },
      { "meaning_en": "access, access", "furigana": "", "kanji": "アクセス［する］" },
      { "meaning_en": "image, imagine", "furigana": "", "kanji": "イメージ［する］" },
      { "meaning_en": "commuting to work, commute to work", "furigana": "つうきん", "kanji": "通勤［する］" }
    ]
  },
  {
    "id": "146_2",
    "japanese_text": "公園の芝生に寝転がると、土の香りがした。蚊がいたので、扇子でたたいた。",
    "english_translation": "When I laid out on the grass in the park, it smelled like soil. There was a mosquito, so I swatted it with a folding fan.",
    "annotated_words": [
      { "meaning_en": "lawn, grass", "furigana": "しばふ", "kanji": "芝生" },
      { "meaning_en": "roll around, roll over", "furigana": "ころがる", "kanji": "転がる" },
      { "meaning_en": "roll", "furigana": "ころがす", "kanji": "転がす" },
      { "meaning_en": "soil", "furigana": "つち", "kanji": "土" },
      { "meaning_en": "fragrance, smell", "furigana": "かおり", "kanji": "香り" },
      { "meaning_en": "mosquito", "furigana": "か", "kanji": "蚊" },
      { "meaning_en": "fan", "furigana": "せんす", "kanji": "扇子" }
    ]
  },
  {
    "id": "147_1",
    "japanese_text": "私が生まれ育った場所の地名を言っても、誰も知らないだろう。商業が盛んな街で、いろいろな会社の事務所がある。住宅地の中に大型スーパーがあるので、食料品もすぐに買えるし、有名な書店もある。",
    "english_translation": "Even if I tell people the name of the place where I was born and raised, no one would probably know it. It is a city with a lot of commerce, and there are offices of various companies. There is a large supermarket in the residential area, so food products can be purchased right away, and there is also a famous bookstore.",
    "annotated_words": [
      { "meaning_en": "place name", "furigana": "ちめい", "kanji": "地名" },
      { "meaning_en": "commerce, trade", "furigana": "しょうぎょう", "kanji": "商業" },
      { "meaning_en": "town, city", "furigana": "まち", "kanji": "街" },
      { "meaning_en": "~ place", "furigana": "しょ", "kanji": "〜所" },
      { "meaning_en": "house", "furigana": "じゅうたく", "kanji": "住宅" },
      { "meaning_en": "food products", "furigana": "しょくりょうひん", "kanji": "食料品" },
      { "meaning_en": "food", "furigana": "しょくりょう", "kanji": "食料" },
      { "meaning_en": "bookstore", "furigana": "しょてん", "kanji": "書店" }
    ]
  }
];

const overrides = {
    "転がる": "寝転がると",
    "〜所": "所",
    "住宅": "住宅地"
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
  let { plain, map } = extractPlainTextMap(html);
  let wrappedHtml = html;
  
  const sortedWords = [...wordList].sort((a,b) => {
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let searchTarget = overrides[kanjiPlain] || kanjiPlain;
    if (!searchTarget) continue;

    let idx = plain.indexOf(searchTarget);
    if (idx !== -1) {
      const startHtmlIdx = map[idx];
      const endHtmlIdx = map[idx + searchTarget.length - 1] + 1;
      replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
      plain = plain.substring(0, idx) + ' '.repeat(searchTarget.length) + plain.substring(idx + searchTarget.length);
    } else {
        let kanjiNoSuru = kanjiPlain.replace(/する$/, '');
        if (kanjiNoSuru && kanjiNoSuru.length > 1) {
            idx = plain.indexOf(kanjiNoSuru);
            if (idx !== -1) {
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

  return wrappedHtml;
}

async function run() {
  const topicId = 'topic_10';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 10 町 Cities`;
    story.story_number = i + 11; // Starts at 11
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    
    let currentWordId = 2100 + i*10;
    story.annotated_words = story.annotated_words.map(w => {
      w.word_id = `n3_${String(currentWordId).padStart(4, '0')}`;
      w.word_number = currentWordId;
      currentWordId++;
      return w;
    });

    delete story.id;
    const docId = story.page_story;

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });
  }
  console.log("Topic 10 part 3 successfully pushed!");
}

run().catch(console.error);
