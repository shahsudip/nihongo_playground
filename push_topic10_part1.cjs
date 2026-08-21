const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "140_1",
    "japanese_text": "今住んでいるマンションのベランダは南向きで、日当たりがいい。和室だけではなく、洋室も立派だ。しかもエントランスホールが広い。",
    "english_translation": "The balcony of the apartment I'm living in now is south facing and sunny. Both its Japanese-style room and Western-style room are splendid. Moreover, the entrance hall is spacious.",
    "annotated_words": [
      { "meaning_en": "apartment", "furigana": "", "kanji": "マンション" },
      { "meaning_en": "balcony", "furigana": "", "kanji": "ベランダ" },
      { "meaning_en": "~ facing", "furigana": "むき", "kanji": "〜向き" },
      { "meaning_en": "sunlight", "furigana": "ひあたり", "kanji": "日当たり" },
      { "meaning_en": "Japanese-style room", "furigana": "わしつ", "kanji": "和室" },
      { "meaning_en": "Western-style room", "furigana": "ようしつ", "kanji": "洋室" },
      { "meaning_en": "splendid", "furigana": "りっぱ", "kanji": "立派な" },
      { "meaning_en": "hall", "furigana": "", "kanji": "ホール" }
    ]
  },
  {
    "id": "140_2",
    "japanese_text": "家の壁の色を塗り直し、門の電球を取り替えたら、明るくなった。",
    "english_translation": "I repainted the walls of my house and changed the light bulbs at the gate and it got brighter.",
    "annotated_words": [
      { "meaning_en": "paint", "furigana": "ぬる", "kanji": "塗る" },
      { "meaning_en": "gate", "furigana": "もん", "kanji": "門" },
      { "meaning_en": "light bulb", "furigana": "でんきゅう", "kanji": "電球" }
    ]
  },
  {
    "id": "141_1",
    "japanese_text": "寮のリビングは狭く、ソファーを斜めにしか置けない。しかし、低家賃なので、わがままは言えない。我慢するしかない。",
    "english_translation": "The dorm living room is cramped and the sofa can only be arranged diagonally. However, it's low rent, so I can't complain. I've no choice but to bear it.",
    "annotated_words": [
      { "meaning_en": "dorm, dormitory", "furigana": "りょう", "kanji": "寮" },
      { "meaning_en": "living room", "furigana": "", "kanji": "リビング" },
      { "meaning_en": "sofa", "furigana": "", "kanji": "ソファー" },
      { "meaning_en": "diagonal", "furigana": "ななめ", "kanji": "斜め" },
      { "meaning_en": "low ~", "furigana": "てい", "kanji": "低〜" },
      { "meaning_en": "rent", "furigana": "やちん", "kanji": "家賃" },
      { "meaning_en": "complaining", "furigana": "", "kanji": "わがまま" },
      { "meaning_en": "bearing, enduring, bear, endure", "furigana": "がまん", "kanji": "我慢［する］" }
    ]
  },
  {
    "id": "141_2",
    "japanese_text": "この家は、大都市にも地方都市にも距離が近い。最高だ。",
    "english_translation": "This house is close in distance to both a large city and the local cities. It's the best.",
    "annotated_words": [
      { "meaning_en": "city", "furigana": "とし", "kanji": "都市" },
      { "meaning_en": "local city", "furigana": "ちほうとし", "kanji": "地方都市" },
      { "meaning_en": "region", "furigana": "ちほう", "kanji": "地方" },
      { "meaning_en": "distance", "furigana": "きょり", "kanji": "距離" },
      { "meaning_en": "best", "furigana": "さいこう", "kanji": "最高" }
    ]
  }
];

const overrides = {
    "塗る": "塗り",
    "〜向き": "向き",
    "低〜": "低"
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
    
    story.title = `Topic 10`;
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    
    // Assign word_id
    let currentWordId = 2000 + i*10;
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
      .set({ title: story.title, id: topicId }, { merge: true });

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });
  }
  console.log("Topic 10 part 1 successfully pushed!");
}

run().catch(console.error);
