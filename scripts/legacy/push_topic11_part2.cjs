const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "154_1",
    "japanese_text": "昨日、震度5強の地震があり、かなり揺れた。海岸の近くにいて、今にも津波が来そうだったので、はだしで走り、近くの家の屋根の上に逃げた。",
    "english_translation": "Yesterday, there was an earthquake that registered a strong 5 of the Japanese seismic intensity scale. It shook a fair amount. I was near the coast, and it seemed a tsunami could come at any moment, so ran barefoot to the roof of a nearby house.",
    "annotated_words": [
      { "meaning_en": "yesterday", "furigana": "さくじつ", "kanji": "昨日" },
      { "meaning_en": "last year", "furigana": "さくねん", "kanji": "昨年" },
      { "meaning_en": "seismic intensity", "furigana": "しんど", "kanji": "震度" },
      { "meaning_en": "shake, quake, sway", "furigana": "ゆれる", "kanji": "揺れる" },
      { "meaning_en": "coast", "furigana": "かいがん", "kanji": "海岸" },
      { "meaning_en": "at any moment, soon", "furigana": "いまにも", "kanji": "今にも" },
      { "meaning_en": "barefoot", "furigana": "", "kanji": "はだし" },
      { "meaning_en": "roof", "furigana": "やね", "kanji": "屋根" }
    ]
  },
  {
    "id": "154_2",
    "japanese_text": "地球温暖化の影響で最近の気候はおかしい。森林を切りすぎたことは無関係ではなく、いろんなバランスが崩れているのだろう。",
    "english_translation": "The weather has been impacted lately by global warming. The overcutting of forests is not unrelated to this and has lead to the collapse of various types of balance.",
    "annotated_words": [
      { "meaning_en": "change", "furigana": "か", "kanji": "〜化" },
      { "meaning_en": "influence, influence", "furigana": "えいきょう", "kanji": "影響［する］" },
      { "meaning_en": "climate", "furigana": "きこう", "kanji": "気候" },
      { "meaning_en": "strange, weird", "furigana": "", "kanji": "おかしい" },
      { "meaning_en": "forest", "furigana": "しんりん", "kanji": "森林" },
      { "meaning_en": "unrelated", "furigana": "むかんけいな", "kanji": "無関係な" },
      { "meaning_en": "collapse", "furigana": "くずれる", "kanji": "崩れる" },
      { "meaning_en": "destroy, ruin", "furigana": "くずす", "kanji": "崩す" }
    ]
  },
  {
    "id": "155_1",
    "japanese_text": "子どもが初めてマフラーを巻いたが、うまく巻けず、けっこうめちゃめちゃだった。顔を見ると、悔しくて涙をこぼしていた。",
    "english_translation": "The child tried to put her scarf on herself for the first time, but wasn't able to do it well so it looked quite messy. Looking at her face, she looked frustrated and teary-eyed.",
    "annotated_words": [
      { "meaning_en": "scarf", "furigana": "", "kanji": "マフラー" },
      { "meaning_en": "quite", "furigana": "", "kanji": "けっこう" },
      { "meaning_en": "messy", "furigana": "", "kanji": "めちゃめちゃな" },
      { "meaning_en": "let slip, spill", "furigana": "", "kanji": "こぼす" },
      { "meaning_en": "let slip, spill", "furigana": "", "kanji": "こぼれる" }
    ]
  },
  {
    "id": "156_1",
    "japanese_text": "津波は一瞬のうちに多くの命を奪ってしまう。被害を防ぐために、逃げる場所を確かめておいた方がいい。",
    "english_translation": "A tsunami can extinguish many lives in the blink of an eye. You should confirm ahead of time where you will run to protect yourself in times of disaster.",
    "annotated_words": [
      { "meaning_en": "tsunami", "furigana": "つなみ", "kanji": "津波" },
      { "meaning_en": "(for a) moment", "furigana": "いっしゅん", "kanji": "一瞬" },
      { "meaning_en": "damage", "furigana": "ひがい", "kanji": "被害" },
      { "meaning_en": "prevent", "furigana": "ふせぐ", "kanji": "防ぐ" },
      { "meaning_en": "confirm", "furigana": "たしかめる", "kanji": "確かめる" }
    ]
  },
  {
    "id": "156_2",
    "japanese_text": "ひどい雨で、服が濡れてしまった。家に着いてからも、風はどんどん強くなり、雷も鳴りはじめた。窓ガラスがガタガタと震えている。",
    "english_translation": "My clothes got wet from the terrible rain. Even after I got home, the wind got stronger and stronger, and it started to thunder. The windowpane was rattling.",
    "annotated_words": [
      { "meaning_en": "get wet", "furigana": "ぬれる", "kanji": "濡れる" },
      { "meaning_en": "wet", "furigana": "ぬらす", "kanji": "濡らす" },
      { "meaning_en": "thunder", "furigana": "かみなり", "kanji": "雷" },
      { "meaning_en": "tremble, shiver", "furigana": "ふるえる", "kanji": "震える" }
    ]
  },
  {
    "id": "157_1",
    "japanese_text": "まだ桜が散りつつある4月上旬だが、気温が25度もあるので、汗がたくさん出る。",
    "english_translation": "Although it's only early April and the cherry blossoms are still falling, at 25 degrees already, I'm sweating a lot.",
    "annotated_words": [
      { "meaning_en": "cherry blossoms", "furigana": "さくら", "kanji": "桜" },
      { "meaning_en": "fall, scatter", "furigana": "ちる", "kanji": "散る" },
      { "meaning_en": "first 10 days of month", "furigana": "じょうじゅん", "kanji": "上旬" },
      { "meaning_en": "middle 10 days of month", "furigana": "ちゅうじゅん", "kanji": "中旬" },
      { "meaning_en": "last 10 days of month", "furigana": "げじゅん", "kanji": "下旬" },
      { "meaning_en": "temperature", "furigana": "きおん", "kanji": "気温" },
      { "meaning_en": "degrees", "furigana": "ど", "kanji": "〜度" },
      { "meaning_en": "sweat", "furigana": "あせ", "kanji": "汗" }
    ]
  },
  {
    "id": "157_2",
    "japanese_text": "今日はとても寒いので、外に置いていた旗が凍っている。でも、日が照れば、すぐに元に戻るだろう。",
    "english_translation": "Since it is very cold today, the flag that was placed outside is frozen. But once the sun shines on it, it will soon go back to the way it was.",
    "annotated_words": [
      { "meaning_en": "flag", "furigana": "はた", "kanji": "旗" },
      { "meaning_en": "freeze", "furigana": "こおる", "kanji": "凍る" },
      { "meaning_en": "shine", "furigana": "てる", "kanji": "照る" }
    ]
  },
  {
    "id": "158_1",
    "japanese_text": "A：旅行に行くなら、太陽が昇るところを楽しみたい。でも、夕日が沈むところもいいなあ。一度に両方は無理かな。\nB：景色のいいところでテントを張って、キャンプするってのはどう？",
    "english_translation": "A: If I'm going on a trip, I want to enjoy the sunrise. But, I sunsets are nice too. I wonder if I can do both. B: Why don't you pitch a tent someplace with nice scenery and camp out?",
    "annotated_words": [
      { "meaning_en": "sun", "furigana": "たいよう", "kanji": "太陽" },
      { "meaning_en": "rise", "furigana": "のぼる", "kanji": "昇る" },
      { "meaning_en": "go down", "furigana": "しずむ", "kanji": "沈む" },
      { "meaning_en": "at the same time", "furigana": "いちどに", "kanji": "一度に" },
      { "meaning_en": "camping, go camping", "furigana": "", "kanji": "キャンプ［する］" }
    ]
  }
];

const overrides = {
    "揺れる": "揺れた",
    "〜化": "化",
    "影響": "影響で",
    "無関係な": "無関係で",
    "崩れる": "崩れて",
    "めちゃめちゃな": "めちゃめちゃだった",
    "こぼす": "こぼして",
    "濡れる": "濡れて",
    "震える": "震えて",
    "散る": "散り",
    "〜度": "度",
    "凍る": "凍って",
    "照る": "照れば",
    "沈む": "沈む",
    "昇る": "昇る",
    "キャンプ": "キャンプする"
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
  const topicId = 'topic_11';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 11 天気 Weather`;
    story.story_number = i + 9;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let currentWordId = 1101 + i*10;
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
  console.log("Topic 11 part 2 successfully pushed!");
}

run().catch(console.error);
