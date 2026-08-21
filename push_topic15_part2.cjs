const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "313",
    "japanese_text": "出張で大阪に行った。大阪で新しく重要な会議が入ったので、戻る日にちを延ばす方向で話し合っている。",
    "english_translation": "I went to Osaka on a business trip. Since I have new and important meetings in Osaka, I'm discussing extending the date of my return.",
    "annotated_words": [
      { "meaning_en": "business trip, go on a business trip", "furigana": "しゅっちょう", "kanji": "出張［する］" },
      { "meaning_en": "important", "furigana": "じゅうような", "kanji": "重要な" },
      { "meaning_en": "date", "furigana": "ひにち", "kanji": "日にち" },
      { "meaning_en": "extend", "furigana": "のばす", "kanji": "延ばす" },
      { "meaning_en": "extend", "furigana": "のびる", "kanji": "延びる" },
      { "meaning_en": "direction", "furigana": "ほうこう", "kanji": "方向" }
    ]
  },
  {
    "id": "314",
    "japanese_text": "いとこはお金持ちの男性と付き合っていた。しかし、彼の会社の経営が苦しくなり、お金がなくなると、彼を振った。",
    "english_translation": "My cousin was dating a rich man. But when his company became difficult to run and he ran out of money, she dumped him.",
    "annotated_words": [
      { "meaning_en": "cousin", "furigana": "", "kanji": "いとこ" },
      { "meaning_en": "rich", "furigana": "かねもち", "kanji": "（お）金持ち" },
      { "meaning_en": "date, go out with", "furigana": "つきあう", "kanji": "付き合う" },
      { "meaning_en": "however", "furigana": "", "kanji": "しかし" },
      { "meaning_en": "difficult", "furigana": "くるしい", "kanji": "苦しい" },
      { "meaning_en": "suffer", "furigana": "くるしむ", "kanji": "苦しむ" },
      { "meaning_en": "dump", "furigana": "ふる", "kanji": "振る" }
    ]
  },
  {
    "id": "315",
    "japanese_text": "〈メールの文章〉山田さん、おはようございます。林です。今日も暑いですね。さて、先日のパーティーではスピーチをしてくださり、ありがとうございました。感謝しています。パーティーの感想も聞かせてください。",
    "english_translation": "<Email text> Yamada-san, good morning. It's Hayashi. It is hot today too. Well, thank you for giving a speech for us the other party's party. I appreciate it. Please tell me your impression of the party.",
    "annotated_words": [
      { "meaning_en": "now", "furigana": "", "kanji": "さて" },
      { "meaning_en": "speech, give a speech", "furigana": "", "kanji": "スピーチ［する］" },
      { "meaning_en": "give, bestow (honorific)", "furigana": "", "kanji": "くださる" },
      { "meaning_en": "appreciation, appreciate", "furigana": "かんしゃ", "kanji": "感謝［する］" },
      { "meaning_en": "impression", "furigana": "かんそう", "kanji": "感想" }
    ]
  },
  {
    "id": "316",
    "japanese_text": "大学院に進学し、建築について勉強したい。また、日本語のレベルを上げ、ぺらぺらと話せる能力をつけたい。",
    "english_translation": "I would like to go to graduate school and study architecture. Also, I would like to improve my level of Japanese and have the ability to speak fluently.",
    "annotated_words": [
      { "meaning_en": "graduate school", "furigana": "だいがくいん", "kanji": "大学院" },
      { "meaning_en": "graduate student", "furigana": "だいがくいんせい", "kanji": "大学院生" },
      { "meaning_en": "going to the next level of school, graduate", "furigana": "しんがく", "kanji": "進学［する］" },
      { "meaning_en": "building, erect a building", "furigana": "けんちく", "kanji": "建築［する］" },
      { "meaning_en": "level", "furigana": "", "kanji": "レベル" },
      { "meaning_en": "fluently", "furigana": "", "kanji": "ぺらぺら（と）" },
      { "meaning_en": "ability", "furigana": "のうりょく", "kanji": "能力" }
    ]
  },
  {
    "id": "317",
    "japanese_text": "隣の家の姉妹は歌手になりたいらしい。最近は早起きし、夢中で楽器を演奏している。うるさくて目が覚める。",
    "english_translation": "The sisters in the house next door seem to want to be singers. They recently get up early and mindlessly play instruments. It's so loud it wakes me up.",
    "annotated_words": [
      { "meaning_en": "sisters", "furigana": "しまい", "kanji": "姉妹" },
      { "meaning_en": "singer", "furigana": "かしゅ", "kanji": "歌手" },
      { "meaning_en": "talent", "furigana": "", "kanji": "タレント" },
      { "meaning_en": "waking up early, wake up early", "furigana": "はやおき", "kanji": "早起き［する］" },
      { "meaning_en": "mindless, in a dream-like state", "furigana": "むちゅうな", "kanji": "夢中な" },
      { "meaning_en": "instrument", "furigana": "がっき", "kanji": "楽器" },
      { "meaning_en": "wake up", "furigana": "さめる", "kanji": "覚める" },
      { "meaning_en": "wake up", "furigana": "さます", "kanji": "覚ます" }
    ]
  },
  {
    "id": "318",
    "japanese_text": "大学生のとき、貿易を行う多国籍企業への就職を希望していた。今、実際に働いている。",
    "english_translation": "When I was a university student, I wanted to find a job at a multinational company that works in trade. Now, I'm actually working at just such a place.",
    "annotated_words": [
      { "meaning_en": "trade, do trade", "furigana": "ぼうえき", "kanji": "貿易［する］" },
      { "meaning_en": "country of citizenship", "furigana": "こくせき", "kanji": "国籍" },
      { "meaning_en": "company", "furigana": "きぎょう", "kanji": "企業" },
      { "meaning_en": "getting a job, get a job", "furigana": "しゅうしょく", "kanji": "就職［する］" },
      { "meaning_en": "job hunting", "furigana": "しゅうしょくかつどう", "kanji": "就職活動" },
      { "meaning_en": "hope, hope", "furigana": "きぼう", "kanji": "希望［する］" },
      { "meaning_en": "actually", "furigana": "じっさい", "kanji": "実際（に）" }
    ]
  },
  {
    "id": "319",
    "japanese_text": "妻は年上の友人から、「私を信用して署名してください」と何度も頼まれた。素直な妻はとうとうはんこを押してしまった。",
    "english_translation": "My wife was asked by an older friend, \"please trust me and sign this,\" many times. My honest wife at last stamped her seal on it.",
    "annotated_words": [
      { "meaning_en": "older", "furigana": "としうえ", "kanji": "年上" },
      { "meaning_en": "younger", "furigana": "としした", "kanji": "年下" },
      { "meaning_en": "trust, trust", "furigana": "しんよう", "kanji": "信用［する］" },
      { "meaning_en": "signature, give a signature", "furigana": "しょめい", "kanji": "署名［する］" },
      { "meaning_en": "honest", "furigana": "すなおな", "kanji": "素直な" },
      { "meaning_en": "finally", "furigana": "", "kanji": "とうとう" },
      { "meaning_en": "seal", "furigana": "", "kanji": "はんこ" }
    ]
  },
  {
    "id": "320",
    "japanese_text": "年金をもらうための手続きを教えてもらった。市役所の窓口で受け付けていて、印鑑と保険証が必要だそうだ。",
    "english_translation": "I was told about the paperwork to get a pension. It seems that it is accepted at the city hall window, and it seems that a seal and insurance card needed.",
    "annotated_words": [
      { "meaning_en": "paperwork, do paperwork", "furigana": "てつづき", "kanji": "手続き［する］" },
      { "meaning_en": "window", "furigana": "まどぐち", "kanji": "窓口" },
      { "meaning_en": "accept", "furigana": "うけつける", "kanji": "受け付ける" },
      { "meaning_en": "seal", "furigana": "いんかん", "kanji": "印鑑" },
      { "meaning_en": "insurance", "furigana": "ほけん", "kanji": "保険" },
      { "meaning_en": "~ card", "furigana": "しょう", "kanji": "〜証" }
    ]
  }
];

const overrides = {
    "出張": "出張",
    "重要な": "重要な",
    "延ばす": "延ばす",
    "（お）金持ち": "お金持ち",
    "付き合う": "付き合っていた",
    "苦しい": "苦しく",
    "振る": "振った",
    "スピーチ": "スピーチ",
    "くださる": "くださり",
    "感謝": "感謝しています",
    "進学": "進学し",
    "建築": "建築",
    "ぺらぺら（と）": "ぺらぺらと",
    "早起き": "早起きし",
    "夢中な": "夢中で",
    "覚める": "覚める",
    "貿易": "貿易",
    "就職": "就職",
    "希望": "希望してい",
    "実際（に）": "実際に",
    "信用": "信用して",
    "署名": "署名して",
    "素直な": "素直な",
    "手続き": "手続き",
    "受け付ける": "受け付けて",
    "〜証": "保険証" // will match 保険証 but also we have 保険 itself. wait.
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
  const topicId = 'topic_15';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 15 人生 Life`;
    story.story_number = i + 9;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1657, 1663, 1670, 1675, 1682, 1690, 1697, 1704];
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
  console.log("Topic 15 part 2 successfully pushed!");
}

run().catch(console.error);
