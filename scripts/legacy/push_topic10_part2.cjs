const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "142_1",
    "japanese_text": "出勤する途中、踏切の前で車が動かなくなった。近くに住民はいない。確か、近くに消防署があったはずだ。のんびりしてはいられない。行ってみよう。",
    "english_translation": "While commuting to work, my car stopped moving right in front of a railroad crossing. There are no residents nearby. I'm sure there was a fire station nearby. I can't just sit around. Let's go and see.",
    "annotated_words": [
      { "meaning_en": "commuting to work, commute to work", "furigana": "しゅっきん", "kanji": "出勤［する］" },
      { "meaning_en": "railroad crossing", "furigana": "ふみきり", "kanji": "踏切" },
      { "meaning_en": "resident", "furigana": "じゅうみん", "kanji": "住民" },
      { "meaning_en": "sure, certain", "furigana": "たしか", "kanji": "確か" },
      { "meaning_en": "fire department", "furigana": "しょうぼうしょ", "kanji": "消防署" },
      { "meaning_en": "fire engine", "furigana": "しょうぼうしゃ", "kanji": "消防車" },
      { "meaning_en": "firefighter", "furigana": "しょうぼうし", "kanji": "消防士" },
      { "meaning_en": "sit around, take it easy", "furigana": "", "kanji": "のんびりする" }
    ]
  },
  {
    "id": "142_2",
    "japanese_text": "向かいの幼稚園はたびたび工事をする。うるさくて、休みの日もリラックスして過ごせない。早く終了してほしい。",
    "english_translation": "The kindergarten on the other side of the street frequently undergoes construction. It's so loud I can't even relax on my days off. I hope its ends soon.",
    "annotated_words": [
      { "meaning_en": "opposite", "furigana": "むかい", "kanji": "向かい" },
      { "meaning_en": "kindergarten", "furigana": "ようちえん", "kanji": "幼稚園" },
      { "meaning_en": "frequently", "furigana": "", "kanji": "たびたび" },
      { "meaning_en": "construction, undergo construction", "furigana": "こうじ", "kanji": "工事［する］" },
      { "meaning_en": "construction site", "furigana": "こうじげんば", "kanji": "工事現場" },
      { "meaning_en": "relaxing, relax", "furigana": "", "kanji": "リラックス［する］" },
      { "meaning_en": "spend", "furigana": "すごす", "kanji": "過ごす" },
      { "meaning_en": "end, finish", "furigana": "しゅうりょう", "kanji": "終了［する］" }
    ]
  },
  {
    "id": "143_1",
    "japanese_text": "この電車は発車時刻を過ぎても動かない。落ち着いてよく見ると、行き先も表示していないし、ライトも消えている。車庫に行くのだろうか。なかなか帰宅できない。",
    "english_translation": "This train isn't moving even though it's past its departure time. After calmly looking around, I noticed that the destination wasn't even displayed and the lights were off. It might be going to the depot. I'm having a hard time getting home.",
    "annotated_words": [
      { "meaning_en": "time", "furigana": "じこく", "kanji": "時刻" },
      { "meaning_en": "time table", "furigana": "じこくひょう", "kanji": "時刻表" },
      { "meaning_en": "pass, exceed", "furigana": "すぎる", "kanji": "過ぎる" },
      { "meaning_en": "calm down", "furigana": "おちつく", "kanji": "落ち着く" },
      { "meaning_en": "destination", "furigana": "いきさき", "kanji": "行き先" },
      { "meaning_en": "light", "furigana": "", "kanji": "ライト" },
      { "meaning_en": "depot", "furigana": "しゃこ", "kanji": "車庫" },
      { "meaning_en": "going home, go home", "furigana": "きたく", "kanji": "帰宅［する］" }
    ]
  },
  {
    "id": "144_1",
    "japanese_text": "都会生まれの私の夢は、いつか土地を買い、畑で近所の人に分けられる程度の野菜または果物を作ることだ。",
    "english_translation": "Having been born in the city, it's my dream to someday buy some land and raise enough vegetables or even fruit to share with the people living nearby.",
    "annotated_words": [
      { "meaning_en": "urban", "furigana": "とかい", "kanji": "都会" },
      { "meaning_en": "~ born", "furigana": "うまれ", "kanji": "〜生まれ" },
      { "meaning_en": "someday", "furigana": "", "kanji": "いつか" },
      { "meaning_en": "land", "furigana": "とち", "kanji": "土地" },
      { "meaning_en": "field", "furigana": "はたけ", "kanji": "畑" },
      { "meaning_en": "enough, degree", "furigana": "ていど", "kanji": "程度" },
      { "meaning_en": "or", "furigana": "", "kanji": "または" }
    ]
  },
  {
    "id": "144_2",
    "japanese_text": "昨日の大雪のせいで、首都高速道路の出入口で事故があった。パトカーや救急車が集まっている。けが人がいないことを願う。",
    "english_translation": "Yesterday's heavy snow caused an accident at the on-ramp of the Tokyo Metropolitan Expressway. Police cars and ambulances have gathered there. I hope no one is hurt.",
    "annotated_words": [
      { "meaning_en": "heavy snow", "furigana": "おおゆき", "kanji": "大雪" },
      { "meaning_en": "capital", "furigana": "しゅと", "kanji": "首都" },
      { "meaning_en": "highway", "furigana": "こうそくどうろ", "kanji": "高速道路" },
      { "meaning_en": "exit and entrance", "furigana": "でいりぐち", "kanji": "出入口" },
      { "meaning_en": "police car", "furigana": "", "kanji": "パトカー" },
      { "meaning_en": "ambulance", "furigana": "きゅうきゅうしゃ", "kanji": "救急車" },
      { "meaning_en": "make a wish, hope for", "furigana": "ねがう", "kanji": "願う" },
      { "meaning_en": "wish, hope", "furigana": "ねがい", "kanji": "願い" }
    ]
  },
  {
    "id": "145_1",
    "japanese_text": "私が住んでいる団地は坂の上にある。商店街がある大通りから外れたところに位置しているので、子どもがよく迷子になる。",
    "english_translation": "The housing complex where I live is at the top of a slope. It's located some distance away from the bigger streets around the commercial district, so the children often get lost.",
    "annotated_words": [
      { "meaning_en": "housing complex", "furigana": "だんち", "kanji": "団地" },
      { "meaning_en": "hill, slope", "furigana": "さか", "kanji": "坂" },
      { "meaning_en": "shopping street", "furigana": "しょうてんがい", "kanji": "商店街" },
      { "meaning_en": "store", "furigana": "しょうてん", "kanji": "商店" },
      { "meaning_en": "main street, large street", "furigana": "おおどおり", "kanji": "大通り" },
      { "meaning_en": "come off, be off", "furigana": "はずれる", "kanji": "外れる" },
      { "meaning_en": "position, locate, position", "furigana": "いち", "kanji": "位置［する］" },
      { "meaning_en": "lost child", "furigana": "まいご", "kanji": "迷子" }
    ]
  }
];

const overrides = {
    "のんびりする": "のんびりして",
    "過ごす": "過ごせ",
    "過ぎる": "過ぎて",
    "落ち着く": "落ち着いて",
    "〜生まれ": "生まれ",
    "外れる": "外れた"
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
  // Offset story number because we are doing part 2 (stories 5-10)
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 10 町 Cities`;
    story.story_number = i + 5; // Starts at 5
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    
    // Assign word_id
    // Part 1 ended at word 1000? No, part 1 had 4 stories, so words 964 to 987.
    // Let's just give them unique dummy IDs or real ones if needed, it doesn't strictly matter for UI.
    let currentWordId = 2050 + i*10;
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
  console.log("Topic 10 part 2 successfully pushed!");
}

run().catch(console.error);
