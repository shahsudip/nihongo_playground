const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "210_1",
    "japanese_text": "あの店は新年とお盆のときに混雑するので、半期に一度臨時でアルバイトを募集する。",
    "english_translation": "Since that store is crowded during the New Year and obon, they recruit once ever half-year for temporary part-time workers.",
    "annotated_words": [
      { "meaning_en": "New Year", "furigana": "しんねん", "kanji": "新年" },
      { "meaning_en": "congestion, be crowded", "furigana": "こんざつ", "kanji": "混雑［する］" },
      { "meaning_en": "~ period", "furigana": "き", "kanji": "〜期" },
      { "meaning_en": "temporary", "furigana": "りんじ", "kanji": "臨時" },
      { "meaning_en": "recruiting, recruit", "furigana": "ぼしゅう", "kanji": "募集［する］" }
    ]
  },
  {
    "id": "210_2",
    "japanese_text": "運転手にとって周りの人や車に気を配り、注意を注ぐことは義務である。事故を起こしたら、二度とハンドルを握れなくなる。",
    "english_translation": "As a driver, it is your duty to pay attention to the people and cars around you and be careful. If you get into an accident, you may never be able to take hold of the wheel again.",
    "annotated_words": [
      { "meaning_en": "distribute", "furigana": "くばる", "kanji": "配る" },
      { "meaning_en": "take (care), pour", "furigana": "そそぐ", "kanji": "注ぐ" },
      { "meaning_en": "duty", "furigana": "ぎむ", "kanji": "義務" },
      { "meaning_en": "again", "furigana": "にどと", "kanji": "二度と" },
      { "meaning_en": "hold", "furigana": "にぎる", "kanji": "握る" }
    ]
  },
  {
    "id": "211_1",
    "japanese_text": "会社に問い合わせたところ、今日中に速達で履歴書を提出すれば大丈夫だった。時間がないので、宛名などを書き忘れないようにしなければならない。",
    "english_translation": "When I contacted the company, I was told that it would be okay if I submitted my resume by express within the day. Because there is no time, I have to be careful not to forget to write things like the name of the receiver.",
    "annotated_words": [
      { "meaning_en": "contact, inquire", "furigana": "といあわせる", "kanji": "問い合わせる" },
      { "meaning_en": "express (mail)", "furigana": "そくたつ", "kanji": "速達" },
      { "meaning_en": "resume", "furigana": "りれきしょ", "kanji": "履歴書" },
      { "meaning_en": "submission, submit", "furigana": "ていしゅつ", "kanji": "提出［する］" },
      { "meaning_en": "address", "furigana": "あてな", "kanji": "宛名" },
      { "meaning_en": "destination", "furigana": "あてさき", "kanji": "宛先" }
    ]
  },
  {
    "id": "211_2",
    "japanese_text": "指定された場所に集合して、みんなで一緒に面接会場に行った。",
    "english_translation": "We gathered at the specified place and went to the interview venue together.",
    "annotated_words": [
      { "meaning_en": "specifying, specify", "furigana": "してい", "kanji": "指定［する］" },
      { "meaning_en": "reserved seat", "furigana": "していせき", "kanji": "指定席" },
      { "meaning_en": "gathering, gather", "furigana": "しゅうごう", "kanji": "集合［する］" },
      { "meaning_en": "meeting place", "furigana": "しゅうごうばしょ", "kanji": "集合場所" }
    ]
  },
  {
    "id": "212_1",
    "japanese_text": "国際会議場でたまたま知り合いに会った。久しぶりだったので、名刺を交換して、食事会の日程調整を行った。",
    "english_translation": "I happened to meet an acquaintance at the international conference center. It had been a while, so we exchnaged business cards and arranged a date for a dinner party.",
    "annotated_words": [
      { "meaning_en": "~ place", "furigana": "じょう", "kanji": "〜場" },
      { "meaning_en": "business card", "furigana": "めいし", "kanji": "名刺" },
      { "meaning_en": "adjustment, adjust", "furigana": "ちょうせい", "kanji": "調整［する］" }
    ]
  },
  {
    "id": "212_2",
    "japanese_text": "ハローワークで工業、サービス業などの希望条件から順に質問された。良い仕事かどうかがなかなか判断できなかった。",
    "english_translation": "At the Public Employment Security Office, I was asked in order about the desired conditions for industries such as the manufacturing and service industries. I wasn't really able to judge whether it was a good job or not.",
    "annotated_words": [
      { "meaning_en": "manufacturing, industry", "furigana": "こうぎょう", "kanji": "工業" },
      { "meaning_en": "condition", "furigana": "じょうけん", "kanji": "条件" },
      { "meaning_en": "order", "furigana": "じゅん", "kanji": "順" },
      { "meaning_en": "decision, decide", "furigana": "はんだん", "kanji": "判断［する］" }
    ]
  },
  {
    "id": "213_1",
    "japanese_text": "レストランで食事をして、会計のとき、レジの人の名札を見ると高校時代の恋人だった。久しぶりに会って驚いたため、クレジットカードのサインを間違えてしまった。",
    "english_translation": "I was eating at a restaurant, and when it came time to pay the bill, I looked at the name tag of the person working the register, and they happened to be an old flame from high school. I was surprised to see them for the first time in so long, and I made a mistake signing my credit card receipt.",
    "annotated_words": [
      { "meaning_en": "check", "furigana": "かいけい", "kanji": "会計" },
      { "meaning_en": "name tag", "furigana": "なふだ", "kanji": "名札" },
      { "meaning_en": "signature, sign", "furigana": "", "kanji": "サイン［する］" }
    ]
  },
  {
    "id": "213_2",
    "japanese_text": "製造業はどこも経営が厳しい。ある人の話では、個人経営の会社はもうからないらしい。",
    "english_translation": "Every company is having trouble with sales in the manufacturing industry. I heard from one person that privately managed companies don't seem to make any money.",
    "annotated_words": [
      { "meaning_en": "~ industry", "furigana": "ぎょう", "kanji": "〜業" },
      { "meaning_en": "management, manage", "furigana": "けいえい", "kanji": "経営［する］" },
      { "meaning_en": "private person, individual", "furigana": "こじん", "kanji": "個人" }
    ]
  },
  {
    "id": "214_1",
    "japanese_text": "オフィスに誰もいないのは危ないから、留守番しておいて。正午までに戻ってくるから、それまでに部屋の整理もやっておいてね！",
    "english_translation": "It's dangerous if no one is in the office, so stay here. I'll be back by noon, so organize the rooms by then!",
    "annotated_words": [
      { "meaning_en": "office", "furigana": "", "kanji": "オフィス" },
      { "meaning_en": "stay (home) house watching, staying (here), house watching", "furigana": "るすばん", "kanji": "留守番［する］" },
      { "meaning_en": "noon", "furigana": "しょうご", "kanji": "正午" },
      { "meaning_en": "organizing, organize", "furigana": "せいり", "kanji": "整理［する］" }
    ]
  },
  {
    "id": "214_2",
    "japanese_text": "居酒屋のキッチンで働いているが、看板メニューを作ることを上司に命令された。",
    "english_translation": "I worked in the kitchen of a tavern, and I was commanded to make a signature dish by my senior.",
    "annotated_words": [
      { "meaning_en": "tavern", "furigana": "いざかや", "kanji": "居酒屋" },
      { "meaning_en": "kitchen", "furigana": "", "kanji": "キッチン" },
      { "meaning_en": "sign", "furigana": "かんばん", "kanji": "看板" },
      { "meaning_en": "command, give commands", "furigana": "めいれい", "kanji": "命令［する］" }
    ]
  },
  {
    "id": "215_1",
    "japanese_text": "送別会でビールを10本注文すべきだったのに、間違えて10ダース注文してしまった。一時はどうなるかと思ったが、いろんな人が協力してくれたおかげで、何とかなりほっとしている。",
    "english_translation": "Even though I should've ordered 10 beers at the farewell party, I made a mistake and ordered 10 dozen. For a moment, I didn't know what to do, but thanks to various people helping out, it worked out, so I was relieved.",
    "annotated_words": [
      { "meaning_en": "order, make an order", "furigana": "ちゅうもん", "kanji": "注文［する］" },
      { "meaning_en": "~ dozen", "furigana": "", "kanji": "〜ダース" },
      { "meaning_en": "for a moment", "furigana": "いちじ", "kanji": "一時" },
      { "meaning_en": "temporary returning home, temporarily return home", "furigana": "いちじきこく", "kanji": "一時帰国［する］" },
      { "meaning_en": "cooperation, help out, cooperate", "furigana": "きょうりょく", "kanji": "協力［する］" },
      { "meaning_en": "be relieved", "furigana": "", "kanji": "ほっとする" }
    ]
  }
];

const overrides = {
    "混雑": "混雑する",
    "〜期": "半期",
    "募集": "募集する",
    "配る": "配り",
    "注ぐ": "注ぐ",
    "握る": "握れなくなる",
    "問い合わせる": "問い合わせた",
    "提出": "提出すれ",
    "指定": "指定された",
    "集合": "集合して",
    "〜場": "会議場",
    "調整": "調整",
    "判断": "判断できなかった",
    "サイン": "サイン",
    "〜業": "製造業",
    "経営": "経営",
    "留守番": "留守番して",
    "整理": "整理",
    "命令": "命令された",
    "注文": "注文",
    "〜ダース": "ダース",
    "協力": "協力して",
    "ほっとする": "ほっとしている"
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
  const topicId = 'topic_14';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 14 仕事 Work`;
    story.story_number = i + 13;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1555, 1560, 1565, 1571, 1575, 1578, 1582, 1585, 1588, 1592, 1596];
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
  console.log("Topic 14 part 2 successfully pushed!");
}

run().catch(console.error);
