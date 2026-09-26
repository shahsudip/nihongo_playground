const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "204_1",
    "japanese_text": "妹は平日はクリーニング屋、週末はホテルのフロントでアルバイトをしている。いつも寝不足で、なかなか体を休めることができない。",
    "english_translation": "My sister works at a cleaner's on weekdays and works part-time job at a hotel front desk on weekends. She is always sleep deprived and can never really rest her body.",
    "annotated_words": [
      { "meaning_en": "weekday", "furigana": "へいじつ", "kanji": "平日" },
      { "meaning_en": "cleaner's, clean", "furigana": "", "kanji": "クリーニング［する］" },
      { "meaning_en": "front desk", "furigana": "", "kanji": "フロント" },
      { "meaning_en": "sleep deprived", "furigana": "ねぶそくな", "kanji": "寝不足な" },
      { "meaning_en": "rest", "furigana": "やすめる", "kanji": "休める" }
    ]
  },
  {
    "id": "204_2",
    "japanese_text": "子どもたちがなりたい職業について、かつてはエンジニアが上位だった。しかし、最近の1位は意外にもサラリーマンである。",
    "english_translation": "Being an engineer used to be the top among jobs children want to have. However nowadays, first place surprisingly goes to being an office worker.",
    "annotated_words": [
      { "meaning_en": "job, profession", "furigana": "しょくぎょう", "kanji": "職業" },
      { "meaning_en": "engineer", "furigana": "", "kanji": "エンジニア" },
      { "meaning_en": "top", "furigana": "じょうい", "kanji": "上位" },
      { "meaning_en": "~ position", "furigana": "い", "kanji": "〜位" },
      { "meaning_en": "surprising", "furigana": "いがいな", "kanji": "意外な" },
      { "meaning_en": "office worker, salaried worker", "furigana": "", "kanji": "サラリーマン" }
    ]
  },
  {
    "id": "205_1",
    "japanese_text": "彼女は先々月から仕事を始めたが、研修期間も給料がもらえるらしい。",
    "english_translation": "She started her job the month before last, and it seems she can get paid during their training period too.",
    "annotated_words": [
      { "meaning_en": "the month before last", "furigana": "せんせんげつ", "kanji": "先々月" },
      { "meaning_en": "training, train", "furigana": "けんしゅう", "kanji": "研修［する］" },
      { "meaning_en": "period", "furigana": "きかん", "kanji": "期間" },
      { "meaning_en": "salary", "furigana": "きゅうりょう", "kanji": "給料" }
    ]
  },
  {
    "id": "205_2",
    "japanese_text": "新入社員には、いつも「単純で機械的な作業であっても、繰り返すことが大切だ」というアドバイスを送っている。",
    "english_translation": "I always send new employees the advice \"It's important to repeat even simple, mechanical work.\"",
    "annotated_words": [
      { "meaning_en": "employee", "furigana": "しゃいん", "kanji": "社員" },
      { "meaning_en": "simple", "furigana": "たんじゅんな", "kanji": "単純な" },
      { "meaning_en": "mechanical", "furigana": "きかいてきな", "kanji": "機械的な" },
      { "meaning_en": "work, do work", "furigana": "さぎょう", "kanji": "作業［する］" },
      { "meaning_en": "repeat", "furigana": "くりかえす", "kanji": "繰り返す" },
      { "meaning_en": "advice, give advice", "furigana": "", "kanji": "アドバイス［する］" }
    ]
  },
  {
    "id": "206_1",
    "japanese_text": "ガソリンスタンドでのアルバイトはきつく、まったく座ることができないので、腰を痛めてしまい、半年で辞めてしまった。",
    "english_translation": "My part-time job at a gas station was hard and I couldn't get to sit at all, I hurt my back and quit in half a year.",
    "annotated_words": [
      { "meaning_en": "gas station", "furigana": "", "kanji": "ガソリンスタンド" },
      { "meaning_en": "tough", "furigana": "", "kanji": "きつい" },
      { "meaning_en": "waist", "furigana": "こし", "kanji": "腰" },
      { "meaning_en": "half a year", "furigana": "はんとし", "kanji": "半年" }
    ]
  },
  {
    "id": "206_2",
    "japanese_text": "店長の態度が悪く、その上、休憩時間も短い。無理を承知の上で、月末で辞めることを伝えたら、うまくいった。",
    "english_translation": "The store manager has a bad attitude, and moreover, break times are short. After acknowledging that this isn't working, I communicated that I would be quitting at the end of the month, and it went well.",
    "annotated_words": [
      { "meaning_en": "~ manager", "furigana": "ちょう", "kanji": "〜長" },
      { "meaning_en": "attitude", "furigana": "たいど", "kanji": "態度" },
      { "meaning_en": "moreover", "furigana": "そのうえ", "kanji": "その上" },
      { "meaning_en": "break, rest, take a break", "furigana": "きゅうけい", "kanji": "休憩［する］" },
      { "meaning_en": "understanding, know, acknowledge", "furigana": "しょうち", "kanji": "承知［する］" },
      { "meaning_en": "end of the month", "furigana": "げつまつ", "kanji": "月末" }
    ]
  },
  {
    "id": "207_1",
    "japanese_text": "ある出版社の副社長と面接することになった。特技は事務だとアピールしたら、見事に受かった。",
    "english_translation": "I had an interview with the vice president of a certain publishing company. I appealed to her by telling her that my special skill was office work, and it was wonderfully received.",
    "annotated_words": [
      { "meaning_en": "publishing company", "furigana": "しゅっぱんしゃ", "kanji": "出版社" },
      { "meaning_en": "publishing, publish", "furigana": "しゅっぱん", "kanji": "出版［する］" },
      { "meaning_en": "vice ~, assistant ~", "furigana": "ふく", "kanji": "副〜" },
      { "meaning_en": "interview, have an interview", "furigana": "めんせつ", "kanji": "面接［する］" },
      { "meaning_en": "special skill", "furigana": "とくぎ", "kanji": "特技" },
      { "meaning_en": "office work", "furigana": "じむ", "kanji": "事務" },
      { "meaning_en": "pass", "furigana": "うかる", "kanji": "受かる" },
      { "meaning_en": "fail", "furigana": "おちる", "kanji": "落ちる" }
    ]
  },
  {
    "id": "207_2",
    "japanese_text": "この月に失業した人の約7割が新型コロナウイルスの影響によるものである。",
    "english_translation": "About 70 percent of the people who lost their jobs this month did so due to the influence of the novel coronavirus.",
    "annotated_words": [
      { "meaning_en": "unemployment, lose one's job", "furigana": "しつぎょう", "kanji": "失業［する］" },
      { "meaning_en": "about", "furigana": "やく", "kanji": "約〜" },
      { "meaning_en": "~ percent", "furigana": "わり", "kanji": "〜割" }
    ]
  },
  {
    "id": "208_1",
    "japanese_text": "彼は営業の仕事をしているが、扱っている商品が高級な物のため、めったに売れずに苦労している。",
    "english_translation": "He is working in sales, but because the product being handled is high-class, he has a hard time and rarely make any sales.",
    "annotated_words": [
      { "meaning_en": "sales, do sales", "furigana": "えいぎょう", "kanji": "営業［する］" },
      { "meaning_en": "product", "furigana": "しょうひん", "kanji": "商品" },
      { "meaning_en": "high-class", "furigana": "こうきゅうな", "kanji": "高級な" },
      { "meaning_en": "having a hard time, have a hard time", "furigana": "くろう", "kanji": "苦労［する］" }
    ]
  },
  {
    "id": "208_2",
    "japanese_text": "新しい職場は大変だと思うが、しっかり経験を積んで、実力をつけてもらいたい。コミュニケーション能力が高い彼女なら、きっとできるはずだ。",
    "english_translation": "I'm sure her new workplace is tough, but I hope she will steadily gain experience and improve her proficiency. She is skilled at communication, so I'm sure she'll be able to do it.",
    "annotated_words": [
      { "meaning_en": "workplace", "furigana": "しょくば", "kanji": "職場" },
      { "meaning_en": "gain, acquire", "furigana": "つむ", "kanji": "積む" },
      { "meaning_en": "accumulate, pile up", "furigana": "つもる", "kanji": "積もる" },
      { "meaning_en": "proficiency, ability", "furigana": "じつりょく", "kanji": "実力" },
      { "meaning_en": "communication", "furigana": "", "kanji": "コミュニケーション" }
    ]
  },
  {
    "id": "209_1",
    "japanese_text": "パートとして働いているが、時給がまあまあなので長く続けられており、今月末で5年になる。",
    "english_translation": "I work part-time, but my hourly wage is just okay, so I've been able to work there for a long time, and it will be five years at the end of this month.",
    "annotated_words": [
      { "meaning_en": "part-timer, part-time job", "furigana": "", "kanji": "パート" },
      { "meaning_en": "hourly salary", "furigana": "じきゅう", "kanji": "時給" },
      { "meaning_en": "monthly salary", "furigana": "げっきゅう", "kanji": "月給" },
      { "meaning_en": "just okay", "furigana": "まあまあな", "kanji": "まあまあな" },
      { "meaning_en": "~ end", "furigana": "まつ", "kanji": "〜末" }
    ]
  },
  {
    "id": "209_2",
    "japanese_text": "今回のイベントは会員限定なので、会員に向けた参加マニュアルを作成する必要がある。",
    "english_translation": "Since this event is limited to members only, we need to create a participation manual for members.",
    "annotated_words": [
      { "meaning_en": "event", "furigana": "", "kanji": "イベント" },
      { "meaning_en": "member", "furigana": "かいいん", "kanji": "会員" },
      { "meaning_en": "limitation, limit", "furigana": "げんてい", "kanji": "限定［する］" },
      { "meaning_en": "aim at", "furigana": "むける", "kanji": "向ける" },
      { "meaning_en": "face", "furigana": "むく", "kanji": "向く" },
      { "meaning_en": "manual", "furigana": "", "kanji": "マニュアル" }
    ]
  }
];

const overrides = {
    "クリーニング": "クリーニング屋",
    "寝不足な": "寝不足で",
    "休める": "休める",
    "〜位": "1位",
    "意外な": "意外にも",
    "研修": "研修期間",
    "単純な": "単純で",
    "機械的な": "機械的な",
    "作業": "作業",
    "繰り返す": "繰り返す",
    "アドバイス": "アドバイス",
    "きつい": "きつく",
    "〜長": "店長",
    "休憩": "休憩時間",
    "承知": "承知",
    "副〜": "副社長",
    "面接": "面接する",
    "受かる": "受かった",
    "失業": "失業した",
    "約〜": "約7割",
    "〜割": "約7割",
    "営業": "営業",
    "高級な": "高級な",
    "苦労": "苦労している",
    "積む": "積んで",
    "まあまあな": "まあまあなので",
    "〜末": "今月末",
    "限定": "限定",
    "向ける": "向けた"
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
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1493, 1498, 1504, 1508, 1514, 1518, 1524, 1532, 1535, 1539, 1544, 1549];
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
  console.log("Topic 14 part 1 successfully pushed!");
}

run().catch(console.error);
