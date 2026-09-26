const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "192_2",
    "japanese_text": "私は3つの大学を受験した。今日は第一志望校の合格発表の日だ。インターネットでも見られるが、直接キャンパスに発表を見に行くつもりだ。",
    "english_translation": "I took entrance exams for three universities. Today is the day of the examination result announcements of my first-pick school. They can also be seen on the internet, but I will go to see the announcements directly on the campus.",
    "annotated_words": [
      { "meaning_en": "taking an test, take an test", "furigana": "じゅけん", "kanji": "受験［する］" },
      { "meaning_en": "test taker", "furigana": "じゅけんせい", "kanji": "受験生" },
      { "meaning_en": "~ school", "furigana": "こう", "kanji": "〜校" },
      { "meaning_en": "passing, pass (a test)", "furigana": "ごうかく", "kanji": "合格［する］" },
      { "meaning_en": "presentation, present", "furigana": "はっぴょう", "kanji": "発表［する］" },
      { "meaning_en": "directly", "furigana": "ちょくせつ", "kanji": "直接" },
      { "meaning_en": "campus", "furigana": "", "kanji": "キャンパス" }
    ]
  },
  {
    "id": "193_1",
    "japanese_text": "今日、書留を受け取った。開けてみると、作文コンクールで優秀だった人に贈られる賞金だった。その上、私の作文は、学校の掲示板に貼られているそうだ。",
    "english_translation": "Today, I received registered mail. When I opened it, it was prize money given to people who were excellent in the essay contest. In addition, it seems that my essay has been posted on the school bulletin board.",
    "annotated_words": [
      { "meaning_en": "registered mail", "furigana": "かきとめ", "kanji": "書留" },
      { "meaning_en": "receive", "furigana": "うけとる", "kanji": "受け取る" },
      { "meaning_en": "acceptance", "furigana": "うけとり", "kanji": "受け取り" },
      { "meaning_en": "contest", "furigana": "", "kanji": "コンクール" },
      { "meaning_en": "excellent", "furigana": "ゆうしゅうな", "kanji": "優秀な" },
      { "meaning_en": "bulletin board", "furigana": "けいじばん", "kanji": "掲示板" },
      { "meaning_en": "bulletin, post a bulletin", "furigana": "けいじ", "kanji": "掲示［する］" }
    ]
  },
  {
    "id": "194_1",
    "japanese_text": "最近面白い文房具を見つけた。折りたためる定規や、筆のように書けるペンがあった。また、こすると消えるペンもあったが、大切な書類では使ってはいけないそうだ。",
    "english_translation": "Recently, I found some interesting stationery. There were things like a foldable ruler and a pen that writes like a brush. In addition, there was a pen that disappears when erased, but I heard that you should not use it on important documents.",
    "annotated_words": [
      { "meaning_en": "stationery, writing materials", "furigana": "ぶんぼうぐ／ぶんぐ", "kanji": "文房具／文具" },
      { "meaning_en": "ruler", "furigana": "じょうぎ", "kanji": "定規" },
      { "meaning_en": "brush", "furigana": "ふで", "kanji": "筆" },
      { "meaning_en": "document", "furigana": "しょるい", "kanji": "書類" }
    ]
  },
  {
    "id": "194_2",
    "japanese_text": "A：先生、雨の日に廊下をほうきで掃いたら、ほうきに泥がついてしまいました。\nB：そのままで構いません。来週、掃除用具を洗う日がありますから。",
    "english_translation": "A: Teacher, I swept the hallway on a rainy day, and mud got on the broom. B: You can just leave it like that. Next week, there is a day when we'll wash the cleaning equipment.",
    "annotated_words": [
      { "meaning_en": "broom", "furigana": "", "kanji": "ほうき" },
      { "meaning_en": "mud", "furigana": "どろ", "kanji": "泥" },
      { "meaning_en": "I don't mind.", "furigana": "かまいません", "kanji": "構いません" }
    ]
  },
  {
    "id": "195_1",
    "japanese_text": "大学の日本語教育学の講義で、日本語の敬語について学んだ。初級の学習者にとって、敬語はとても難しいそうだ。",
    "english_translation": "I learned about Japanese honorifics in a lecture on Japanese language education at my university. For beginner-level learners, honorifics seem to be very difficult.",
    "annotated_words": [
      { "meaning_en": "lecture, give a lecture", "furigana": "こうぎ", "kanji": "講義［する］" },
      { "meaning_en": "honorific language", "furigana": "けいご", "kanji": "敬語" },
      { "meaning_en": "beginner level", "furigana": "しょきゅう", "kanji": "初級" },
      { "meaning_en": "intermediate level", "furigana": "ちゅうきゅう", "kanji": "中級" },
      { "meaning_en": "advanced level", "furigana": "じょうきゅう", "kanji": "上級" },
      { "meaning_en": "studying, study", "furigana": "がくしゅう", "kanji": "学習［する］" }
    ]
  },
  {
    "id": "195_2",
    "japanese_text": "今日の世界史の授業は、先生がお休みで、自習になった。私はとても疲れていたので、居眠りしてしまって、配られたプリントには1行も書けなかった。",
    "english_translation": "In today's world history class, the teacher had taken the day off, and we had to do self-study. Because I was really tired, I nodded off and wasn't able to write a single line on the handout that we had been given.",
    "annotated_words": [
      { "meaning_en": "~ history", "furigana": "し", "kanji": "〜史" },
      { "meaning_en": "self-study, study on one's own", "furigana": "じしゅう", "kanji": "自習［する］" },
      { "meaning_en": "dozing off", "furigana": "いねむり", "kanji": "居眠り［する］" },
      { "meaning_en": "~ line", "furigana": "ぎょう", "kanji": "〜行" }
    ]
  },
  {
    "id": "196_1",
    "japanese_text": "はい、教科書を閉じてください。今から英語のテストの説明をします。下線が引かれた英語の文の翻訳を書いてください。翻訳文は、解答用紙の四角の中に書いてください。では、試験を開始します。",
    "english_translation": "Okay, please close your textbooks. Now, I will explain about the English test. Write a translation of the underlined English sentences. Write your translations in the square on the answer sheet. Now, start the test.",
    "annotated_words": [
      { "meaning_en": "close", "furigana": "とじる", "kanji": "閉じる" },
      { "meaning_en": "underline", "furigana": "かせん", "kanji": "下線" },
      { "meaning_en": "pull", "furigana": "ひく", "kanji": "引く" },
      { "meaning_en": "sentence", "furigana": "ぶん", "kanji": "文" },
      { "meaning_en": "word", "furigana": "たんご", "kanji": "単語" },
      { "meaning_en": "answer sheet", "furigana": "かいとうようし", "kanji": "解答用紙" },
      { "meaning_en": "answer, answer", "furigana": "かいとう", "kanji": "解答［する］" },
      { "meaning_en": "square (shape)", "furigana": "しかく（けい）", "kanji": "四角(形)" },
      { "meaning_en": "square", "furigana": "しかくい", "kanji": "四角い" },
      { "meaning_en": "start, start", "furigana": "かいし", "kanji": "開始［する］" }
    ]
  },
  {
    "id": "196_2",
    "japanese_text": "じゃあ、トマトの葉っぱの観察をしましょう。観察したら、プリントに気づいたことを書いてください。括弧の中に書きましょう。チャイムが鳴ったら、書くのをストップして、プリントを先生のところに持ってきてくださいね。",
    "english_translation": "Now, let's observe this tomato leaf. Once you do, write down what you noticed on the handout. Be sure to write inside the parentheses. When the chime rings, please stop writing and bring your handouts to me.",
    "annotated_words": [
      { "meaning_en": "observing, observe", "furigana": "かんさつ", "kanji": "観察［する］" },
      { "meaning_en": "handout, print", "furigana": "", "kanji": "プリント［する］" },
      { "meaning_en": "parentheses", "furigana": "かっこ", "kanji": "括弧" },
      { "meaning_en": "chime", "furigana": "", "kanji": "チャイム" },
      { "meaning_en": "stopping, stop", "furigana": "", "kanji": "ストップ［する］" }
    ]
  },
  {
    "id": "197_1",
    "japanese_text": "私の家は大学までとても遠い。学割の定期を買っているが、それでも高い。そのため、秋から下宿をすることにした。大学の男子寮が空いたからだ。",
    "english_translation": "My house is very far from my university. I buy a commuter pass with a student discount, but it's still expensive. So, I decided to live in a boarding house starting in the fall. This is because the female dormitory that the university has has a vacancy.",
    "annotated_words": [
      { "meaning_en": "student discount", "furigana": "がくわり／がくせいわりびき", "kanji": "学割／学生割引" },
      { "meaning_en": "boarding house", "furigana": "げしゅく", "kanji": "下宿" },
      { "meaning_en": "boy", "furigana": "だんし", "kanji": "男子" },
      { "meaning_en": "girl", "furigana": "じょし", "kanji": "女子" }
    ]
  },
  {
    "id": "198_1",
    "japanese_text": "大学の授業料が上がることに反対する学生たちの集まりがあった。このような集会がときどき開かれているそうだ。",
    "english_translation": "There was a gathering of students opposed to the university tuition fee increase. Apparently, such assemblies are sometimes held.",
    "annotated_words": [
      { "meaning_en": "tuition fee", "furigana": "じゅぎょうりょう", "kanji": "授業料" },
      { "meaning_en": "gathering", "furigana": "あつまり", "kanji": "集まり" },
      { "meaning_en": "assembly, conference", "furigana": "しゅうかい", "kanji": "集会" }
    ]
  },
  {
    "id": "198_2",
    "japanese_text": "教師は、子どものいたずらを見つけたとき、どうするべきだと思いますか。クラス全体の前で叱ると、次からいたずらを隠すようになるかもしれません。じゃあ、どうしたらいいでしょう。みなさん、何か思いつきますか。",
    "english_translation": "What do you think teachers should do when they see children being mischievous? If they scold the children in front of the whole class, they may just try to hide it the next time. So, what should they do? Everyone, can you think of anything?",
    "annotated_words": [
      { "meaning_en": "prank, pull a prank, play a practical joke on", "furigana": "", "kanji": "いたずら［する］" },
      { "meaning_en": "whole", "furigana": "ぜんたい", "kanji": "全体" },
      { "meaning_en": "hide", "furigana": "かくす", "kanji": "隠す" },
      { "meaning_en": "hide", "furigana": "かくれる", "kanji": "隠れる" },
      { "meaning_en": "think (of something)", "furigana": "おもいつく", "kanji": "思いつく" }
    ]
  }
];

const overrides = {
    "受験": "受験した",
    "〜校": "校",
    "合格": "合格",
    "発表": "発表",
    "受け取る": "受け取った",
    "優秀な": "優秀だった",
    "文房具／文具": "文房具",
    "講義": "講義",
    "学習": "学習者",
    "〜史": "史",
    "自習": "自習",
    "居眠り": "居眠りして",
    "〜行": "行",
    "閉じる": "閉じて",
    "引く": "引かれた",
    "四角(形)": "四角",
    "開始": "開始します",
    "観察": "観察",
    "プリント": "プリント",
    "ストップ": "ストップして",
    "学割／学生割引": "学割",
    "いたずら": "いたずら",
    "隠す": "隠す",
    "思いつく": "思いつきますか"
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
    story.story_number = i + 22;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1413, 1420, 1427, 1431, 1434, 1440, 1444, 1454, 1459, 1463, 1466];
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
  console.log("Topic 13 part 3 successfully pushed!");
}

run().catch(console.error);
