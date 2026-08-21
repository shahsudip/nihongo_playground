const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "186_1",
    "japanese_text": "私の兄は大学で物理学を専攻していて、文学部の私とは専門が全然違う。兄は朝から晩まで実験室にいる日も多い。物理学に関する知識はまるで百科事典のようだ。",
    "english_translation": "My brother majored in physics at university, so his field of expertise is completely different from mine, as I was in the literary department. My brother spends many days in the laboratory from morning to night. His knowledge of physics is almost just like an encyclopedia.",
    "annotated_words": [
      { "meaning_en": "~ study, ~ field", "furigana": "がく", "kanji": "〜学" },
      { "meaning_en": "major, major in", "furigana": "せんこう", "kanji": "専攻［する］" },
      { "meaning_en": "expertise", "furigana": "せんもん", "kanji": "専門" },
      { "meaning_en": "vocational school", "furigana": "せんもんがっこう", "kanji": "専門学校" },
      { "meaning_en": "expert", "furigana": "せんもんか", "kanji": "専門家" },
      { "meaning_en": "~ room", "furigana": "しつ", "kanji": "〜室" },
      { "meaning_en": "knowledge", "furigana": "ちしき", "kanji": "知識" },
      { "meaning_en": "just like, as if", "furigana": "", "kanji": "まるで" },
      { "meaning_en": "encyclopedia", "furigana": "ひゃっかじてん", "kanji": "百科事典" }
    ]
  },
  {
    "id": "186_2",
    "japanese_text": "A：将来国際的な仕事がしたいから、大学生の間に海外留学やホームステイに行きたいと思っているんだ。\nB：どんな所に行きたいの？\nA：クラスメートにいろんな国の人がいる所がいいな。最初は言葉が伝わらなくて悔しい思いをするかもしれないけど。",
    "english_translation": "A: In the future, I want to have an international job, so I would like to study abroad or do a homestay while I'm a university student. B: What kind of place do you want to go to? A: A place that has classmates from various countries. Though at first, I may have a frustrating time not being able to communicate.",
    "annotated_words": [
      { "meaning_en": "international", "furigana": "こくさいてき", "kanji": "国際的な" },
      { "meaning_en": "homestay, do a homestay", "furigana": "", "kanji": "ホームステイ［する］" },
      { "meaning_en": "classmate", "furigana": "", "kanji": "クラスメート" },
      { "meaning_en": "frustrating", "furigana": "くやしい", "kanji": "悔しい" }
    ]
  },
  {
    "id": "187_1",
    "japanese_text": "A：もうすぐ試験の時期だね。\nB：今回は成績が悪い人には補習があるって先輩が言ってたよ。\nA：心配だな。問題集を解いてたら大丈夫かな。",
    "english_translation": "A: It's almost time for exams. B: I heard from a senior that this time, there'll be supplementary lessons for people with bad grades. A: That's worrisome. I wonder if I'll be okay solving some workbook questions.",
    "annotated_words": [
      { "meaning_en": "time, season", "furigana": "じき", "kanji": "時期" },
      { "meaning_en": "grade", "furigana": "せいせき", "kanji": "成績" },
      { "meaning_en": "supplementary lessons, take supplementary lessons", "furigana": "ほしゅう", "kanji": "補習［する］" },
      { "meaning_en": "senior", "furigana": "せんぱい", "kanji": "先輩" },
      { "meaning_en": "junior", "furigana": "こうはい", "kanji": "後輩" },
      { "meaning_en": "~ book, ~ collection", "furigana": "しゅう", "kanji": "〜集" },
      { "meaning_en": "solve", "furigana": "とく", "kanji": "解く" }
    ]
  },
  {
    "id": "188_1",
    "japanese_text": "私は1年3組だ。担任の山田先生はとてもいい先生で、いつもにこにこしている。そして、クラスの生徒全員の特徴をよく理解して、丁寧に指導してくれる。先生が担当している教科は音楽だ。",
    "english_translation": "I am a first-year student in group 3. Our homeroom teacher, Yamada-sensei, is a very good teacher and is always smiling. And she also understand the characteristics of every student and instructs us with care. The subject she is in charge of is music.",
    "annotated_words": [
      { "meaning_en": "~ class, ~ team", "furigana": "くみ", "kanji": "〜組" },
      { "meaning_en": "homeroom teacher, be in charge", "furigana": "たんにん", "kanji": "担任［する］" },
      { "meaning_en": "smile", "furigana": "", "kanji": "にこにこする" },
      { "meaning_en": "all members", "furigana": "ぜんいん", "kanji": "全員" },
      { "meaning_en": "instructing, instruct", "furigana": "しどう", "kanji": "指導［する］" },
      { "meaning_en": "instructor", "furigana": "しどうしゃ", "kanji": "指導者" },
      { "meaning_en": "subject", "furigana": "きょうか", "kanji": "教科" }
    ]
  },
  {
    "id": "188_2",
    "japanese_text": "教師になるためには、教育実習に行かなければならない。私はしあさってから実習が始まるので、とても緊張している。担当する学年は、2年生だ。図書館で、子どもたちの教科書の貸し出しをしているので、借りてきた。今日から頑張って授業の準備をするつもりだ。",
    "english_translation": "In order to become a teacher, we have to attend educational training. I start my training three days from today, so I'm really nervous. I'll be in charge of year-two. The library loans out children's textbooks, so I borrowed some. From today, I intended to do my best and prepare for my classes.",
    "annotated_words": [
      { "meaning_en": "teacher", "furigana": "きょうし", "kanji": "教師" },
      { "meaning_en": "professor", "furigana": "きょうじゅ", "kanji": "教授" },
      { "meaning_en": "training, train", "furigana": "じっしゅう", "kanji": "実習［する］" },
      { "meaning_en": "three days from today", "furigana": "", "kanji": "しあさって" },
      { "meaning_en": "nervousness, be nervous", "furigana": "きんちょう", "kanji": "緊張［する］" },
      { "meaning_en": "school year", "furigana": "がくねん", "kanji": "学年" },
      { "meaning_en": "loan, lending", "furigana": "かしだし", "kanji": "貸し出し" }
    ]
  },
  {
    "id": "189_1",
    "japanese_text": "子どもの通学路には、大きな道路がある。子どもたちは、道路を渡らずに、歩道橋を使うように指示されている。",
    "english_translation": "There is a big road that (some) children use when commuting to school. Children are instructed to use the pedestrian bridge and not just cross the road.",
    "annotated_words": [
      { "meaning_en": "commuting to school, go to school", "furigana": "つうがく", "kanji": "通学［する］" },
      { "meaning_en": "pedestrian bridge", "furigana": "ほどうきょう", "kanji": "歩道橋" },
      { "meaning_en": "instruction, instruct", "furigana": "しじ", "kanji": "指示［する］" }
    ]
  },
  {
    "id": "190_1",
    "japanese_text": "いじめは、絶対に許されることではない。たたいたり、引っ張ったりするだけではなく、言葉の暴力もいじめである。友達の様子に疑問を感じ、いじめかなと思ったら、すぐに相談してほしい。",
    "english_translation": "Bullying is something that can absolutely not be allowed. Bullying includes not only things like hitting and pulling, but also verbal abuse. If you are concerned about how a friend is doing and have a feeling of suspicion that they may be being bullied, please consult us immediately.",
    "annotated_words": [
      { "meaning_en": "bullying", "furigana": "", "kanji": "いじめ" },
      { "meaning_en": "bully", "furigana": "", "kanji": "いじめる" },
      { "meaning_en": "hit", "furigana": "", "kanji": "たたく" },
      { "meaning_en": "pull", "furigana": "ひっぱる", "kanji": "引っ張る" },
      { "meaning_en": "suspicion", "furigana": "ぎもん", "kanji": "疑問" }
    ]
  },
  {
    "id": "190_2",
    "japanese_text": "学校のルールを破って、テストでカンニングした学生がいたようだ。その学期のテストは全部0点になってしまったと聞いた。",
    "english_translation": "It seems that there was a student who broke the school rules and cheated on a test. I heard that they were given zeros on all of their tests for the semester.",
    "annotated_words": [
      { "meaning_en": "break", "furigana": "やぶる", "kanji": "破る" },
      { "meaning_en": "be broken", "furigana": "やぶれる", "kanji": "破れる" },
      { "meaning_en": "cheating, cheat (on a test)", "furigana": "", "kanji": "カンニング［する］" },
      { "meaning_en": "semester", "furigana": "がっき", "kanji": "学期" }
    ]
  },
  {
    "id": "191_1",
    "japanese_text": "私は読書が大好きで、学校でも好きな科目は国語だ。作家になるのが夢で、文章を書くためのレッスンも受けている。",
    "english_translation": "I love reading, and my favorite subjects in school is Japanese language. My dream is to become a writer. I'm also taking lessons on how to write literature.",
    "annotated_words": [
      { "meaning_en": "reading, read", "furigana": "どくしょ", "kanji": "読書［する］" },
      { "meaning_en": "subject", "furigana": "かもく", "kanji": "科目" },
      { "meaning_en": "national language", "furigana": "こくご", "kanji": "国語" },
      { "meaning_en": "writer", "furigana": "さっか", "kanji": "作家" },
      { "meaning_en": "lesson, take lessons", "furigana": "", "kanji": "レッスン［する］" }
    ]
  },
  {
    "id": "191_2",
    "japanese_text": "大学のゼミに3年生がたくさん入ってきてくれた。公園で3年生の歓迎会を開く予定だったが、大雨のため、延期になってしまった。",
    "english_translation": "A lot of third-year students came into the university seminar. I was planning to have a welcome party for the third-years in the park, but because of heavy rain, it was postponed.",
    "annotated_words": [
      { "meaning_en": "seminar", "furigana": "", "kanji": "ゼミ" },
      { "meaning_en": "welcoming party", "furigana": "かんげいかい", "kanji": "歓迎会" },
      { "meaning_en": "welcoming, welcome", "furigana": "かんげい", "kanji": "歓迎［する］" },
      { "meaning_en": "postponement, postpone", "furigana": "えんき", "kanji": "延期［する］" }
    ]
  },
  {
    "id": "192_1",
    "japanese_text": "日本の小学校には、国立、公立、私立などの種類がある。大部分が公立である。給食のある学校がほとんどで、子どもたちは給食当番などを通して、食事のルールや栄養のある食事の大切さなどについて学ぶ。",
    "english_translation": "There are various types of Japanese elementary schools, including national, public and private types. Most are public. Many of the schools provide lunch, and children learn about the importance of etiquette and nutritional meals through doing lunch duty.",
    "annotated_words": [
      { "meaning_en": "national", "furigana": "こくりつ", "kanji": "国立" },
      { "meaning_en": "prefectural", "furigana": "けんりつ", "kanji": "県立" },
      { "meaning_en": "public", "furigana": "こうりつ", "kanji": "公立" },
      { "meaning_en": "private", "furigana": "しりつ", "kanji": "私立" },
      { "meaning_en": "most", "furigana": "だいぶぶん", "kanji": "大部分" },
      { "meaning_en": "school lunch", "furigana": "きゅうしょく", "kanji": "給食" },
      { "meaning_en": "duty", "furigana": "とうばん", "kanji": "当番" }
    ]
  }
];

const overrides = {
    "〜学": "学",
    "専攻": "専攻して",
    "〜室": "室",
    "国際的な": "国際的な",
    "ホームステイ": "ホームステイ",
    "時期": "時期",
    "補習": "補習",
    "〜集": "集",
    "解く": "解いて",
    "〜組": "組",
    "担任": "担任",
    "にこにこする": "にこにこして",
    "指導": "指導して",
    "実習": "実習に",
    "緊張": "緊張して",
    "通学": "通学路",
    "指示": "指示されて",
    "いじめる": "いじめ",
    "たたく": "たたいたり",
    "引っ張る": "引っ張ったり",
    "破る": "破って",
    "破れる": "破れる",
    "カンニング": "カンニングした",
    "読書": "読書",
    "レッスン": "レッスンも",
    "歓迎": "歓迎会",
    "延期": "延期に"
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
    story.story_number = i + 11;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1351, 1360, 1364, 1371, 1378, 1385, 1388, 1393, 1397, 1402, 1406];
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
  console.log("Topic 13 part 2 successfully pushed!");
}

run().catch(console.error);
