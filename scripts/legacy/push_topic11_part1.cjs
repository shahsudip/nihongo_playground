const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "150_1",
    "japanese_text": "天気予報によると、大雨注意報が出ている。午後からにわか雨が降るので、早めに毛布とシーツを取り込まなければならない。",
    "english_translation": "The weather forecast said that a heavy rain advisory is in effect. There could be sudden showers starting in the afternoon, so I have to bring in the blanket and sheets before that.",
    "annotated_words": [
      { "meaning_en": "forecast, forecast", "furigana": "よほう", "kanji": "予報［する］" },
      { "meaning_en": "heavy rain", "furigana": "おおあめ", "kanji": "大雨" },
      { "meaning_en": "light rain", "furigana": "こさめ", "kanji": "↔小雨" },
      { "meaning_en": "warning", "furigana": "ちゅういほう", "kanji": "注意報" },
      { "meaning_en": "alert", "furigana": "けいほう", "kanji": "警報" },
      { "meaning_en": "shower (rain)", "furigana": "にわかあめ", "kanji": "にわか雨" },
      { "meaning_en": "blanket", "furigana": "もうふ", "kanji": "毛布" },
      { "meaning_en": "bed sheet", "furigana": "", "kanji": "シーツ" }
    ]
  },
  {
    "id": "150_2",
    "japanese_text": "大陸が地球の上を移動して、現在の世界ができたという説が1912年に発表された。",
    "english_translation": "The theory that our present world is result of the movement of the continents over the earth was presented in 1912.",
    "annotated_words": [
      { "meaning_en": "continent", "furigana": "たいりく", "kanji": "大陸" },
      { "meaning_en": "the earth", "furigana": "ちきゅう", "kanji": "地球" },
      { "meaning_en": "moving, move", "furigana": "いどう", "kanji": "移動［する］" },
      { "meaning_en": "theory, reason", "furigana": "せつ", "kanji": "説" }
    ]
  },
  {
    "id": "151_1",
    "japanese_text": "海外と比較して、日本は防災の意識が強い。梅雨のシーズンだが、今年は大きな被害が出ないことを祈っている。",
    "english_translation": "Japan has a stronger awareness of disaster prevention in comparison to other countries. It is now the rainy season, and I pray that there will be no serious damage this year.",
    "annotated_words": [
      { "meaning_en": "overseas", "furigana": "かいがい", "kanji": "海外" },
      { "meaning_en": "comparison, compare", "furigana": "ひかく", "kanji": "比較［する］" },
      { "meaning_en": "disaster prevention", "furigana": "ぼうさい", "kanji": "防災" },
      { "meaning_en": "consciousness, be aware of", "furigana": "いしき", "kanji": "意識［する］" },
      { "meaning_en": "rainy season", "furigana": "つゆ", "kanji": "梅雨" },
      { "meaning_en": "pray", "furigana": "いのる", "kanji": "祈る" },
      { "meaning_en": "prayer", "furigana": "いのり", "kanji": "祈り" }
    ]
  },
  {
    "id": "151_2",
    "japanese_text": "今日は花粉がたくさん飛んでいる。目がかゆくて、鼻もむずむずするので、外出はやめておこう。",
    "english_translation": "There's so much pollen in the air today. My eyes are itchy and my nose tickles, so I'm not going to leave the house.",
    "annotated_words": [
      { "meaning_en": "pollen", "furigana": "かふん", "kanji": "花粉" },
      { "meaning_en": "hay fever", "furigana": "かふんしょう", "kanji": "花粉症" },
      { "meaning_en": "itchy", "furigana": "", "kanji": "かゆい" },
      { "meaning_en": "going out, go out", "furigana": "がいしゅつ", "kanji": "外出［する］" }
    ]
  },
  {
    "id": "152_1",
    "japanese_text": "台風が近づいているので、大雨、強風、洪水の被害が心配である。電柱が倒れて、突然停電したり、断水したりするかもしれない。",
    "english_translation": "A typhoon is approaching, so I'm worried about damage from heavy rain, strong wind, and flooding. There could be sudden power outages due to downed utility poles or the water could be cut off.",
    "annotated_words": [
      { "meaning_en": "strong wind", "furigana": "きょうふう", "kanji": "強風" },
      { "meaning_en": "flood", "furigana": "こうずい", "kanji": "洪水" },
      { "meaning_en": "telephone pole", "furigana": "でんちゅう", "kanji": "電柱" },
      { "meaning_en": "electrical wire", "furigana": "でんせん", "kanji": "電線" },
      { "meaning_en": "blackout, have a blackout", "furigana": "ていでん", "kanji": "停電［する］" },
      { "meaning_en": "water outage, have a water outage", "furigana": "だんすい", "kanji": "断水［する］" }
    ]
  },
  {
    "id": "152_2",
    "japanese_text": "雨の日にレインコートを着て自転車に乗っていたら、タイヤが滑って転びそうになったが、何とか無事だった。",
    "english_translation": "I was wearing a raincoat as I rode my bike on a rainy day, the tires slipped and I almost crashed, but somehow made it through safe.",
    "annotated_words": [
      { "meaning_en": "raincoat", "furigana": "", "kanji": "レインコート" },
      { "meaning_en": "tire", "furigana": "", "kanji": "タイヤ" },
      { "meaning_en": "slide", "furigana": "すべる", "kanji": "滑る" },
      { "meaning_en": "crash, fall down", "furigana": "ころぶ", "kanji": "転ぶ" },
      { "meaning_en": "safe, unharmed", "furigana": "ぶじな", "kanji": "無事な" }
    ]
  },
  {
    "id": "153_1",
    "japanese_text": "日本の夏は湿度が高くて蒸し暑い。クーラーや扇風機を使わなかったら、すぐにのどがからからになり、息ができなくなる。",
    "english_translation": "With high humidity, summer in Japan is hot and muggy. Without air conditioning or a fan, you will find your throat so bone dry, you'll barely be able to breathe.",
    "annotated_words": [
      { "meaning_en": "humidity", "furigana": "しつど", "kanji": "湿度" },
      { "meaning_en": "humid", "furigana": "むしあつい", "kanji": "蒸し暑い" },
      { "meaning_en": "cooler", "furigana": "", "kanji": "クーラー" },
      { "meaning_en": "(electric) fan", "furigana": "せんぷうき", "kanji": "扇風機" },
      { "meaning_en": "thirsty, dry", "furigana": "", "kanji": "からからな" },
      { "meaning_en": "breath", "furigana": "いき", "kanji": "息" }
    ]
  },
  {
    "id": "153_2",
    "japanese_text": "田舎と比べると、都会はコンクリートに囲まれているので、なかなか地面の温度が下がりにくい。",
    "english_translation": "Compared to the countryside, the city is surrounded by concrete, so the temperature of the ground doesn't fall easily.",
    "annotated_words": [
      { "meaning_en": "compare", "furigana": "くらべる", "kanji": "比べる" },
      { "meaning_en": "concrete", "furigana": "", "kanji": "コンクリート" },
      { "meaning_en": "surround", "furigana": "かこむ", "kanji": "囲む" },
      { "meaning_en": "temperature", "furigana": "おんど", "kanji": "温度" },
      { "meaning_en": "thermometer", "furigana": "おんどけい", "kanji": "温度計" }
    ]
  }
];

const overrides = {
    "祈る": "祈って",
    "停電": "停電したり",
    "断水": "断水したり",
    "滑る": "滑って",
    "転ぶ": "転び",
    "無事な": "無事だった",
    "比べる": "比べると",
    "囲む": "囲まれている",
    "↔小雨": "小雨",
    "からからな": "からからに"
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
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    
    let currentWordId = 1056 + i*10; // rough start
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
  console.log("Topic 11 part 1 successfully pushed!");
}

run().catch(console.error);
