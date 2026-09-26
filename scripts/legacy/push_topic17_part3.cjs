const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "348",
    "japanese_text": "A：今日の電車で、髪が全部白髪の男の人が乗ってきたんだ。席に空きがなかったから譲ろうとしたら、「まだ若いからいい」って怒られたんだ。\nB：そうなんだ。\nA：確かに間違えたのは申し訳ないけど…もうちょっと優しく断ってほしかったよ。\nB：きっと今ごろその男の人も反省しているよ。",
    "english_translation": "A: On today's train, a man with all gray hair came on board. There were no vacant seats, and when I tried to give him my seat, he got mad at me, saying he was still young. B: Is that so? A: I'm sorry I made a mistake, but . . . I wanted him to decline it a little more gently. B: I'm sure the man is also reflecting on it right now.",
    "annotated_words": [
      { "meaning_en": "white hair", "furigana": "しらが", "kanji": "白髪" },
      { "meaning_en": "vacancy", "furigana": "あ", "kanji": "空き" },
      { "meaning_en": "give", "furigana": "ゆず", "kanji": "譲る" },
      { "meaning_en": "surely", "furigana": "たし", "kanji": "確かに" },
      { "meaning_en": "inexcusable", "furigana": "もうしわけ", "kanji": "申し訳ない" },
      { "meaning_en": "reflection, reflect", "furigana": "はんせい", "kanji": "反省［する］" }
    ]
  },
  {
    "id": "349",
    "japanese_text": "A：昨日駅のホームで、ものすごい大きな声でしゃべるグループがいたんだよ。\nB：そうなんだ。\nA：ホームの真ん中でバッグの荷物を広げて、注意されてもどかないし。電車に乗った後は広いシートを全部使っちゃうし。\nB：それは困るね。",
    "english_translation": "A: Yesterday on the platform of the station, there was a group of people who talked really loudly. B: Oh really? A: They spread their baggage out in the middle of the platform and didn't move even after being warned. After getting on the train, they used all of the wide seats. B: That's a problem.",
    "annotated_words": [
      { "meaning_en": "amazing", "furigana": "", "kanji": "ものすごい" },
      { "meaning_en": "chat", "furigana": "", "kanji": "しゃべる" },
      { "meaning_en": "bag", "furigana": "", "kanji": "バッグ" },
      { "meaning_en": "spread", "furigana": "ひろ", "kanji": "広げる" },
      { "meaning_en": "spread", "furigana": "ひろ", "kanji": "広がる" },
      { "meaning_en": "move", "furigana": "", "kanji": "どく" },
      { "meaning_en": "seat", "furigana": "", "kanji": "シート" },
      { "meaning_en": "seat belt", "furigana": "", "kanji": "シートベルト" }
    ]
  },
  {
    "id": "350",
    "japanese_text": "昨夜、酔った人がけんかをして、相手を刺してしまったそうだ。すぐに警官が来て、逮捕された。酔った人の迷惑な行動をどうやって防止するか、考えなければならない。",
    "english_translation": "Last night, a drunken man quarreled with someone and stabbed him. A policeman came right away and he was arrested. We have to think about how to prevent the annoying behavior of drunk people.",
    "annotated_words": [
      { "meaning_en": "last night", "furigana": "さくや", "kanji": "昨夜" },
      { "meaning_en": "last night", "furigana": "さくばん", "kanji": "昨晩" },
      { "meaning_en": "stab", "furigana": "さ", "kanji": "刺す" },
      { "meaning_en": "stab", "furigana": "さ", "kanji": "刺さる" },
      { "meaning_en": "police officer", "furigana": "けいかん", "kanji": "警官/警察官" },
      { "meaning_en": "police station", "furigana": "けいさつしょ", "kanji": "警察署" },
      { "meaning_en": "arrest, arrest", "furigana": "たいほ", "kanji": "逮捕［する］" },
      { "meaning_en": "prevention, prevent", "furigana": "ぼうし", "kanji": "防止［する］" }
    ]
  },
  {
    "id": "351",
    "japanese_text": "大都会東京の地下鉄はとても複雑だ。一つの駅に改札も出口もたくさんある。がらがらな電車はほとんど見たことがない。かばんに資料や本を詰め込んだサラリーマンや学生が、いつもたくさん乗っている。",
    "english_translation": "The subway in the big city of Tokyo is very complicated. There are many ticket gates and exits at one station. I have hardly seen a rattle train. There are always a lot of office workers and students who pack materials and books in their bags.",
    "annotated_words": [
      { "meaning_en": "large", "furigana": "だい", "kanji": "大〜" },
      { "meaning_en": "complex", "furigana": "ふくざつな", "kanji": "複雑な" },
      { "meaning_en": "ticket gate", "furigana": "かいさつ", "kanji": "改札" },
      { "meaning_en": "vacant", "furigana": "", "kanji": "がらがらな" },
      { "meaning_en": "stuff", "furigana": "つ", "kanji": "詰め込む" },
      { "meaning_en": "pack", "furigana": "つ", "kanji": "詰める" },
      { "meaning_en": "refill, repack", "furigana": "つ", "kanji": "詰め替え" }
    ]
  },
  {
    "id": "352",
    "japanese_text": "日本では、20歳より若い人がお酒を飲むことは法律で禁止されています。違反したら、お金を払わなければなりません。",
    "english_translation": "In Japan, it is prohibited by law for people younger than 20 to drink alcohol. If you violate it, fines will be imposed.",
    "annotated_words": [
      { "meaning_en": "law", "furigana": "ほうりつ", "kanji": "法律" },
      { "meaning_en": "ban, ban", "furigana": "きんし", "kanji": "禁止［する］" },
      { "meaning_en": "violation, violate", "furigana": "いはん", "kanji": "違反［する］" }
    ]
  },
  {
    "id": "353",
    "japanese_text": "A：今日図書館で、イヤホンで音楽を聞いている人がいたんだけど、大きな音が漏れていて、とても気になったよ。\nB：図書館や美術館のようなしいんとした場所や交通機関では、そういう人は目立つね。音に気をつけてほしいね。\nA：うん。携帯電話もマナーモードにしてほしいよ。",
    "english_translation": "A: There was a person listening to music with earphones in the library today, but I was very worried because there was a loud noise. B: Such people stand out in silent places such as libraries and museums and on transportation. I wish they’d be mindful of the noise. A: Yeah. I wish they’d set their mobile phone to silent mode.",
    "annotated_words": [
      { "meaning_en": "earphones", "furigana": "", "kanji": "イヤホン" },
      { "meaning_en": "headphones", "furigana": "", "kanji": "ヘッドホン" },
      { "meaning_en": "be concerned", "furigana": "き", "kanji": "気になる" },
      { "meaning_en": "silently", "furigana": "", "kanji": "しいんと" },
      { "meaning_en": "transportation facilities", "furigana": "こうつうきかん", "kanji": "交通機関" },
      { "meaning_en": "stand out", "furigana": "めだ", "kanji": "目立つ" },
      { "meaning_en": "silent mode", "furigana": "", "kanji": "マナーモード" }
    ]
  }
];

const overrides = {
    "白髪": "白髪",
    "空き": "空き",
    "譲る": "譲ろう",
    "確かに": "確かに",
    "申し訳ない": "申し訳ない",
    "反省": "反省している",
    "ものすごい": "ものすごい",
    "しゃべる": "しゃべる",
    "バッグ": "バッグ",
    "広げる": "広げて",
    "広がる": "広がる", // not in text
    "どく": "どかない",
    "シート": "シート",
    "シートベルト": "シートベルト", // not in text
    "昨夜": "昨夜",
    "昨晩": "昨晩", // not in text
    "刺す": "刺して",
    "刺さる": "刺さる", // not in text
    "警官/警察官": "警官",
    "警察署": "警察署", // not in text
    "逮捕": "逮捕された",
    "防止": "防止するか",
    "大〜": "大",
    "複雑な": "複雑だ",
    "改札": "改札",
    "がらがらな": "がらがらな",
    "詰め込む": "詰め込んだ",
    "詰める": "詰める", // not in text
    "詰め替え": "詰め替え", // not in text
    "法律": "法律",
    "禁止": "禁止されています",
    "違反": "違反したら",
    "イヤホン": "イヤホン",
    "ヘッドホン": "ヘッドホン", // not in text
    "気になる": "気になった",
    "しいんと": "しいんと",
    "交通機関": "交通機関",
    "目立つ": "目立つ",
    "マナーモード": "マナーモード"
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
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）|\/警察官/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）|\/警察官/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）|\/警察官/g, '');
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
    story.story_number = i + 13;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1847, 1853, 1861, 1869, 1876, 1879];
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
  console.log("Topic 17 part 3 successfully pushed!");
}

run().catch(console.error);
