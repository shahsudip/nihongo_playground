const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "336",
    "japanese_text": "満員電車で大きなリュックを背負うと、周りの人の迷惑になる。大きなリュックは背負わずに前に持つといい。",
    "english_translation": "Carrying a large backpack on a crowded train can be a nuisance to those around you. It's a good idea to carry a large backpack in front of you without carrying it on your back.",
    "annotated_words": [
      { "meaning_en": "full (of people)", "furigana": "まんいん", "kanji": "満員" },
      { "meaning_en": "backpack", "furigana": "", "kanji": "リュック(サック)" },
      { "meaning_en": "surroundings", "furigana": "まわり", "kanji": "周り" },
      { "meaning_en": "annoyance, be annoyed", "furigana": "めいわく", "kanji": "迷惑［する］" }
    ]
  },
  {
    "id": "337",
    "japanese_text": "この道は幅が広くて危ないのに、横断歩道が少ないので道路を横断する人が多い。そこで警察がどのくらいの人が道路を横断するのかの調査を行った。",
    "english_translation": "Although this road is wide and dangerous, many people cross the road because there are few pedestrian crossings. So the police investigated how many people crossed the road.",
    "annotated_words": [
      { "meaning_en": "width", "furigana": "はば", "kanji": "幅" },
      { "meaning_en": "pedestrian crossing", "furigana": "おうだんほどう", "kanji": "横断歩道" },
      { "meaning_en": "crossing, cross", "furigana": "おうだん", "kanji": "横断［する］" },
      { "meaning_en": "therefore", "furigana": "", "kanji": "そこで" },
      { "meaning_en": "investigation, investigate", "furigana": "ちょうさ", "kanji": "調査［する］" }
    ]
  },
  {
    "id": "338",
    "japanese_text": "リサイクルできるように、空きびんと空き缶は分けて捨てよう。",
    "english_translation": "Discard empty bottles and cans separately so that they can be recycled.",
    "annotated_words": [
      { "meaning_en": "recycling, recycle", "furigana": "", "kanji": "リサイクル［する］" },
      { "meaning_en": "empty bottle", "furigana": "あきびん", "kanji": "空きびん" },
      { "meaning_en": "empty can", "furigana": "あきかん", "kanji": "空き缶" },
      { "meaning_en": "divide, separate", "furigana": "わける", "kanji": "分ける" }
    ]
  },
  {
    "id": "339",
    "japanese_text": "入学資料の中に、留学生とおしゃべりして交流するボランティアのチラシが挟んであった。私の周りにはそのような活動に積極的な人が多いので、私もやってみようと思う。",
    "english_translation": "In the admission materials, there was a leaflet of a volunteer who chats and interacts with international students. There are many people around me who are active in such activities, so I will try it too.",
    "annotated_words": [
      { "meaning_en": "chatting, chat", "furigana": "", "kanji": "おしゃべり［する］" },
      { "meaning_en": "volunteer", "furigana": "", "kanji": "ボランティア" },
      { "meaning_en": "insert, put between", "furigana": "はさむ", "kanji": "挟む" },
      { "meaning_en": "be caught", "furigana": "はさまる", "kanji": "挟まる" },
      { "meaning_en": "active", "furigana": "せっきょくてきな", "kanji": "積極的な" },
      { "meaning_en": "passive", "furigana": "しょうきょくてきな", "kanji": "消極的な" }
    ]
  },
  {
    "id": "340",
    "japanese_text": "少し前は、環境のための分別やリサイクルを面倒なことだと思う人もいたかもしれない。しかし、今は環境を守るための行動は当然のことになった。",
    "english_translation": "Not long ago, some may have found it a hassle to separate and recycle waste for the environment. Nowadays, however, taking action to protect the environment has become standard.",
    "annotated_words": [
      { "meaning_en": "environment", "furigana": "かんきょう", "kanji": "環境" },
      { "meaning_en": "environmental issues", "furigana": "かんきょうもんだい", "kanji": "環境問題" },
      { "meaning_en": "troublesome", "furigana": "めんどうな", "kanji": "面倒な" },
      { "meaning_en": "of course", "furigana": "とうぜん", "kanji": "当然" }
    ]
  },
  {
    "id": "341",
    "japanese_text": "世界にはさまざまな宗教がある。厳しい決まりがあって、破ることが許されない宗教もあるし、あまり厳しい決まりがない宗教もある。",
    "english_translation": "There are various religions in the world. Some religions have strict rules that cannot be broken, while others do not have very strict rules.",
    "annotated_words": [
      { "meaning_en": "religion", "furigana": "しゅうきょう", "kanji": "宗教" },
      { "meaning_en": "rule", "furigana": "きまり", "kanji": "決まり" },
      { "meaning_en": "forgive, allow", "furigana": "ゆるす", "kanji": "許す" }
    ]
  }
];

const overrides = {
    "満員": "満員",
    "リュック(サック)": "リュック",
    "周り": "周り",
    "迷惑": "迷惑",
    "幅": "幅",
    "横断歩道": "横断歩道",
    "横断": "横断する",
    "そこで": "そこで",
    "調査": "調査",
    "リサイクル": "リサイクル",
    "空きびん": "空きびん",
    "空き缶": "空き缶",
    "分ける": "分けて",
    "おしゃべり": "おしゃべりして",
    "ボランティア": "ボランティア",
    "挟む": "挟んで",
    "挟まる": "挟まる", // not in text
    "積極的な": "積極的な",
    "消極的な": "消極的な", // not in text
    "環境": "環境",
    "環境問題": "環境問題", // not in text
    "面倒な": "面倒な",
    "当然": "当然",
    "宗教": "宗教",
    "決まり": "決まり",
    "許す": "許されない"
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
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）|\(サック\)/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）|\(サック\)/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）|\(サック\)/g, '');
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
  const topicId = 'topic_17';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 17 マナー Manners`;
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1795, 1799, 1804, 1808, 1814, 1818];
    let currentWordId = startWords[i];
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
  console.log("Topic 17 part 1 successfully pushed!");
}

run().catch(console.error);
