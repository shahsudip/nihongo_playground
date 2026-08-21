const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "180_1",
    "japanese_text": "理科で学ぶ内容は、主に物理・化学・生物・地学に分けられる。また、社会で学ぶ内容は、地理・歴史・公民に分けられる。",
    "english_translation": "The topics studied in the sciences can be divided mainly into physics, chemistry, biology and geology. The topics studied in the social sciences can be divided into geography, history and social studies.",
    "annotated_words": [
      { "meaning_en": "science", "furigana": "りか", "kanji": "理科" },
      { "meaning_en": "learn", "furigana": "まなぶ", "kanji": "学ぶ" },
      { "meaning_en": "physics", "furigana": "ぶつり", "kanji": "物理" },
      { "meaning_en": "geography", "furigana": "ちり", "kanji": "地理" }
    ]
  },
  {
    "id": "180_2",
    "japanese_text": "足し算と引き算は算数の基本だが、かけ算もとても大切だ。かけ算がすらすら言えないと、割り算で苦労する。",
    "english_translation": "Addition and subtraction are the basis of arithmetic, but multiplication is also very important. If you can't recite multiplication smoothly, then you will struggle with division.",
    "annotated_words": [
      { "meaning_en": "addition", "furigana": "たしざん", "kanji": "足し算" },
      { "meaning_en": "subtraction", "furigana": "ひきざん", "kanji": "引き算" },
      { "meaning_en": "arithmetic", "furigana": "さんすう", "kanji": "算数" },
      { "meaning_en": "multiplication", "furigana": "かけざん", "kanji": "かけ算" },
      { "meaning_en": "smoothly", "furigana": "", "kanji": "すらすら（と）" },
      { "meaning_en": "division", "furigana": "わりざん", "kanji": "割り算" }
    ]
  },
  {
    "id": "181_1",
    "japanese_text": "子どもが学校を早退したり欠席するときは、親が連絡帳や生徒手帳、欠席届などに必要なことを書いて学校に連絡することになっている。",
    "english_translation": "When a child leaves school early or will be absent, their parents must write an absence form and contact the school.",
    "annotated_words": [
      { "meaning_en": "leaving early, leave early", "furigana": "そうたい", "kanji": "早退［する］" },
      { "meaning_en": "absence, be absent", "furigana": "けっせき", "kanji": "欠席［する］" },
      { "meaning_en": "~ book", "furigana": "ちょう", "kanji": "〜帳" },
      { "meaning_en": "~ form", "furigana": "とどけ", "kanji": "〜届" }
    ]
  },
  {
    "id": "181_2",
    "japanese_text": "寝坊してしまった！ このままじゃ遅刻だ。でも今日はテストがあるから、サボれない。早く準備して学校に行かなくちゃ。電車の中で参考書を読んでおこう。",
    "english_translation": "I overslept! At this rate, I'll be late. But there is a test today, so I can't skip class. I have to hurry up and get ready and get to school. I'll read the reference book on the train.",
    "annotated_words": [
      { "meaning_en": "oversleeping, oversleep", "furigana": "ねぼう", "kanji": "寝坊［する］" },
      { "meaning_en": "tardiness, be late", "furigana": "ちこく", "kanji": "遅刻［する］" },
      { "meaning_en": "skip (class, work)", "furigana": "", "kanji": "サボる" },
      { "meaning_en": "~ book", "furigana": "しょ", "kanji": "〜書" }
    ]
  },
  {
    "id": "182_1",
    "japanese_text": "高校時代のテニス部の仲間は今でも親友だ。けんかもしたけど、翌日には仲直りした。一緒にばかなこともしたけど、厳しい練習をふらふらになるまでやった。今はお互い違う学校に行っているけれど、どんなに離れていても親友だ。",
    "english_translation": "I'm still close with my friends from my high school tennis club. We got into fights, but we made up the next day. We did some stupid things together, but we practiced hard until we were faint. Now, we go to different schools, but no matter how far away from each other we go, we're still close friends.",
    "annotated_words": [
      { "meaning_en": "~ club", "furigana": "ぶ", "kanji": "〜部" },
      { "meaning_en": "close friend", "furigana": "しんゆう", "kanji": "親友" },
      { "meaning_en": "making up, make up", "furigana": "なかなおり", "kanji": "仲直り［する］" },
      { "meaning_en": "stupid", "furigana": "", "kanji": "ばかな" },
      { "meaning_en": "faint", "furigana": "", "kanji": "ふらふらな" },
      { "meaning_en": "no matter", "furigana": "", "kanji": "どんなに" }
    ]
  },
  {
    "id": "182_2",
    "japanese_text": "中学生や高校生は毎日の荷物がとても多い。そのため、ロッカーにあまり使わない教科書や体操服などの持ち物を置いて帰ることができる。ロッカーはダイヤル式の鍵があって、生年月日の数字を使ってはいけない。",
    "english_translation": "Junior high school and high school students have a lot of daily luggage. So, they can leave things such as textbooks they don't use much and gym clothes in their lockers when they go home. The lockers have a dial-type lock, and students should not use their date of birth (for the combination).",
    "annotated_words": [
      { "meaning_en": "locker", "furigana": "", "kanji": "ロッカー" },
      { "meaning_en": "textbook", "furigana": "きょうかしょ", "kanji": "教科書" },
      { "meaning_en": "luggage, belongings", "furigana": "もちもの", "kanji": "持ち物" },
      { "meaning_en": "birthday", "furigana": "せいねんがっぴ", "kanji": "生年月日" }
    ]
  },
  {
    "id": "183_1",
    "japanese_text": "春休みの宿題は、「プラスチックと環境」というテーマのレポートです。横書きのレポート用紙に、5枚以上書いてください。最初に目次もつけてください。",
    "english_translation": "Your spring break homework is to write a report on the subject of \"plastic and the environment.\" Please write five or more pages on horizontal report paper. Please also first include a table of contents.",
    "annotated_words": [
      { "meaning_en": "plastic", "furigana": "", "kanji": "プラスチック" },
      { "meaning_en": "report", "furigana": "", "kanji": "レポート" },
      { "meaning_en": "horizontal writing", "furigana": "よこがき", "kanji": "横書き" },
      { "meaning_en": "paper", "furigana": "ようし", "kanji": "用紙" },
      { "meaning_en": "table of contents", "furigana": "もくじ", "kanji": "目次" }
    ]
  },
  {
    "id": "184_1",
    "japanese_text": "私の子どもが通う幼稚園には父母の会がある。やる人が少なくて、いつもじゃんけんで決めている。今年、思い切って引き受けることにした。私は夏祭りの係で、子どもたちの夏祭りをお手伝いすることになった。楽しそうだ。",
    "english_translation": "There is a parents' association at the kindergarten that my child attends. Only a few people participate, and things are always decided by rock-paper-scissors. This year, I resolved to take on some of the work. It's been decided that I will be in charge of the summer festival and help the children with it. It sounds fun.",
    "annotated_words": [
      { "meaning_en": "parents", "furigana": "ふぼ", "kanji": "父母" },
      { "meaning_en": "rock-paper-scissors", "furigana": "", "kanji": "じゃんけん［する］" },
      { "meaning_en": "with resolve", "furigana": "おもいきって", "kanji": "思い切って" },
      { "meaning_en": "take on, undertake", "furigana": "ひきうける", "kanji": "引き受ける" },
      { "meaning_en": "charge, in charge of ~", "furigana": "かかり", "kanji": "係" }
    ]
  },
  {
    "id": "184_2",
    "japanese_text": "大学の留学生センターには、留学生と日本人学生が交流するグループがある。私はそのグループのメンバーだ。今日は来週の活動の内容をみんなで話し合った。近所の古いお寺に見学に行くことになった。",
    "english_translation": "The university's international student center has a group for international students and Japanese students to interact. I'm a member of that group. Today, we discussed our activities for next week. We are going to visit an old temple in the neighborhood.",
    "annotated_words": [
      { "meaning_en": "~ student", "furigana": "せい", "kanji": "〜生" },
      { "meaning_en": "center", "furigana": "", "kanji": "センター" },
      { "meaning_en": "group", "furigana": "", "kanji": "グループ" },
      { "meaning_en": "member", "furigana": "", "kanji": "メンバー" },
      { "meaning_en": "activities, do activities", "furigana": "かつどう", "kanji": "活動［する］" },
      { "meaning_en": "discuss", "furigana": "はなしあう", "kanji": "話し合う" },
      { "meaning_en": "viewing, observance, view, observe", "furigana": "けんがく", "kanji": "見学［する］" }
    ]
  },
  {
    "id": "185_1",
    "japanese_text": "A：テストで間違ったところに、大きなばつをつけられちゃったよ。すっかり勉強する気がなくなっちゃった…。\nB：そんなこと言わないで。最後にちゃんと見直した？ ここ、すごく簡単な計算ミスをしているよ。\nA：あ、本当だ。",
    "english_translation": "A: Huge x's were drawn on the places I got wrong on the test. I've completely lost the will to study. B: Don't say that. Did you review it properly in the end? Look here, you made a really simple calculation mistake. A: Oh, you're right.",
    "annotated_words": [
      { "meaning_en": "x, 'x' mark", "furigana": "", "kanji": "ばつ" },
      { "meaning_en": "completely", "furigana": "", "kanji": "すっかり" },
      { "meaning_en": "review", "furigana": "みなおす", "kanji": "見直す" }
    ]
  }
];

const overrides = {
    "学ぶ": "学ぶ",
    "すらすら（と）": "すらすら",
    "早退": "早退し",
    "欠席": "欠席する",
    "〜帳": "帳",
    "〜届": "届",
    "寝坊": "寝坊して",
    "遅刻": "遅刻",
    "サボる": "サボれ",
    "〜書": "書",
    "〜部": "部",
    "仲直り": "仲直りした",
    "ばかな": "ばかな",
    "ふらふらな": "ふらふらに",
    "じゃんけん": "じゃんけんで",
    "活動": "活動",
    "見学": "見学に",
    "見直す": "見直した",
    "〜生": "生"
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
  const topicId = 'topic_13';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 13 学校 School`;
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1299, 1303, 1309, 1313, 1317, 1323, 1328, 1335, 1340, 1348];
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
  console.log("Topic 13 part 1 successfully pushed!");
}

run().catch(console.error);
