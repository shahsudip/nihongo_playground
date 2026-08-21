const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "342",
    "japanese_text": "部屋の奥から煙が出ているのに気づいた。慌てて行ってみると、パソコンに取り付けたスピーカーから煙が出ていた。急いでスピーカーを取り外し、周りの燃えやすい物をどけて、水をかけた。",
    "english_translation": "I noticed smoke coming from the back of the room. I hurried and found smoke coming from the speakers attached to a computer. I hurriedly removed the speaker and the flammable material around it, and sprinkled it with water.",
    "annotated_words": [
      { "meaning_en": "back", "furigana": "おく", "kanji": "奥" },
      { "meaning_en": "smoke", "furigana": "けむり", "kanji": "煙" },
      { "meaning_en": "find", "furigana": "き", "kanji": "気づく" },
      { "meaning_en": "speaker", "furigana": "", "kanji": "スピーカー" },
      { "meaning_en": "move, remove", "furigana": "", "kanji": "どける" }
    ]
  },
  {
    "id": "343",
    "japanese_text": "食堂で名前を呼ばれて振り向いたときに、コーヒーをこぼしてしまった。着替えもないので、汚れたところをこすっていたら、汚れがどんどん広がってしまった。",
    "english_translation": "I spilled coffee when I looked back at my name in the cafeteria. I didn’t have spare clothes, so when I was rubbing the dirty part, the dirt spread more and more.",
    "annotated_words": [
      { "meaning_en": "turn around", "furigana": "ふ", "kanji": "振り向く" },
      { "meaning_en": "spare clothes", "furigana": "きが", "kanji": "着替え" },
      { "meaning_en": "rub", "furigana": "", "kanji": "こする" }
    ]
  },
  {
    "id": "344",
    "japanese_text": "A：昨日、ラッシュの電車で、若い人がお年寄りに座席を譲っていて、感心したよ。\nB：素敵だね。優先席に座っていても譲らない人もいるよね。\nA：そうだね。「どうぞ」と言うのは少し勇気がいるかもしれないけど、ぜひやってほしいね。",
    "english_translation": "A: Yesterday, I was impressed by the young woman giving up her seat to the elderly on the train during rush hour.\nB: That's nice. Some people don't give up their seats even if they sit in the priority seats.\nA: That's right. It may be a little courageous to say \"please,\" but I definitely want them to do it.",
    "annotated_words": [
      { "meaning_en": "rush", "furigana": "", "kanji": "ラッシュ" },
      { "meaning_en": "seat", "furigana": "ざせき", "kanji": "座席" },
      { "meaning_en": "impression, be impressed", "furigana": "かんしん", "kanji": "感心［する］" },
      { "meaning_en": "priority seating", "furigana": "ゆうせんせき", "kanji": "優先席" },
      { "meaning_en": "courage", "furigana": "ゆうき", "kanji": "勇気" }
    ]
  },
  {
    "id": "345",
    "japanese_text": "ゴミの分別方法は地域によって違うので、その地域のルールを守りましょう。",
    "english_translation": "The way to separate garbage vary from region to region, so follow the rules for that region.",
    "annotated_words": [
      { "meaning_en": "separation, separate", "furigana": "ぶんべつ", "kanji": "分別［する］" },
      { "meaning_en": "area", "furigana": "ちいき", "kanji": "地域" },
      { "meaning_en": "protect, keep (a rule)", "furigana": "まも", "kanji": "守る" }
    ]
  },
  {
    "id": "346",
    "japanese_text": "この広場にある公衆トイレは、とてもきれいだ。みんながマナーを守って使っているからだ。",
    "english_translation": "The public toilets in this square are very clean. This is because everyone uses them with good manners.",
    "annotated_words": [
      { "meaning_en": "square", "furigana": "ひろば", "kanji": "広場" },
      { "meaning_en": "public toilet", "furigana": "こうしゅう", "kanji": "公衆トイレ" },
      { "meaning_en": "manners", "furigana": "", "kanji": "マナー" }
    ]
  },
  {
    "id": "347",
    "japanese_text": "デパートの化粧品売り場で、新しい香水のサンプルをもらった。香水はたまにしかつけないが、とてもいい香りだったし、「誰にでも愛される香り」と書いてあったので、買ってしまった。",
    "english_translation": "I got a new perfume sample at the cosmetics department of a department store. I only wear perfume once in a while, but it had a very nice scent, and it said, \"A scent loved by everyone,\" so I bought it.",
    "annotated_words": [
      { "meaning_en": "cosmetics", "furigana": "けしょうひん", "kanji": "化粧品" },
      { "meaning_en": "make up, put on make up", "furigana": "けしょう", "kanji": "化粧［する］" },
      { "meaning_en": "make up, put on make up", "furigana": "", "kanji": "メイク［する］" },
      { "meaning_en": "perfume", "furigana": "こうすい", "kanji": "香水" },
      { "meaning_en": "sample", "furigana": "", "kanji": "サンプル" },
      { "meaning_en": "once in a while", "furigana": "", "kanji": "たまに" },
      { "meaning_en": "love, love", "furigana": "あい", "kanji": "愛［する］" }
    ]
  }
];

const overrides = {
    "奥": "奥",
    "煙": "煙",
    "気づく": "気づいた",
    "スピーカー": "スピーカー",
    "どける": "どけて",
    "振り向く": "振り向いた",
    "着替え": "着替え",
    "こする": "こすって",
    "ラッシュ": "ラッシュ",
    "座席": "座席",
    "感心": "感心した",
    "優先席": "優先席",
    "勇気": "勇気",
    "分別": "分別",
    "地域": "地域",
    "守る": "守りましょう",
    "広場": "広場",
    "公衆トイレ": "公衆トイレ",
    "マナー": "マナー",
    "化粧品": "化粧品",
    "化粧": "化粧", // not in text
    "メイク": "メイク", // not in text
    "香水": "香水",
    "サンプル": "サンプル",
    "たまに": "たまに",
    "愛": "愛される"
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
  const topicId = 'topic_17';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 17 マナー Manners`;
    story.story_number = i + 7;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1821, 1826, 1829, 1834, 1837, 1840];
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
  console.log("Topic 17 part 2 successfully pushed!");
}

run().catch(console.error);
