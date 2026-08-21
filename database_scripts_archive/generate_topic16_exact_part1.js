import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 16 Stories (School) - Part 1
const topic16StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 16 学校",
    page_story: "214_1",
    japanese_text: "<u>幼い</u>頃から<u>人見知り</u>でなかなか友達ができなかったが、高校の時に出会った<u>部活</u>の仲間のおかげで、<u>社交的に</u>なり多くの友達ができた。本当にいい仲間に<u>恵まれて</u>いたと思う。",
    english_translation: "Ever since I was young, I've been shy around strangers and have had difficulty making friends, but thanks to my friends from club activities in high school, I've became sociable and made more friends. I think I've really been blessed with good friends.",
    annotated_words: [
      { word_id: "n2_1428", word_number: 1428, kanji: "幼い", furigana: "おさない", meaning_en: "young" },
      { word_id: "n2_1429", word_number: 1429, kanji: "人見知り[する]", furigana: "ひとみしり", meaning_en: "shyness, be shy around strangers" },
      { word_id: "n2_1430", word_number: 1430, kanji: "部活", furigana: "ぶかつ", meaning_en: "club activity" },
      { word_id: "n2_1431", word_number: 1431, kanji: "社交的な", furigana: "しゃこうてきな", meaning_en: "sociable" },
      { word_id: "n2_1432", word_number: 1432, kanji: "恵まれる", furigana: "めぐまれる", meaning_en: "be blessed with" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 16 学校",
    page_story: "215_1",
    japanese_text: "<u>期末</u>試験で、<u>マークシート</u>の<u>欄</u>を一つずつ間違えて記入してしまった。もうだめだ！<u>単位</u>を落としたかもしれない。",
    english_translation: "In the final exam, I wrote each answer in the wrong column on the marksheet. It's all over! I think I've lost the credit.",
    annotated_words: [
      { word_id: "n2_1433", word_number: 1433, kanji: "期末", furigana: "きまつ", meaning_en: "term end, final" },
      { word_id: "n2_1434", word_number: 1434, kanji: "マークシート", furigana: "まーくしーと", meaning_en: "marksheet" },
      { word_id: "n2_1435", word_number: 1435, kanji: "欄", furigana: "らん", meaning_en: "column, field" },
      { word_id: "n2_1436", word_number: 1436, kanji: "単位", furigana: "たんい", meaning_en: "credit" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 16 学校",
    page_story: "215_2",
    japanese_text: "昨<u>年度</u>は<u>やる気</u>がなく、ずいぶん<u>怠けて</u>しまった。今<u>年度</u>はその分を<u>取り戻せる</u>ように、<u>ほぼ</u>毎日、授業後は図書館で<u>懸命に</u>勉強している。",
    english_translation: "Last year I lacked motivation and slacked off a lot. This year, I'm studying hard in the library almost every day after class to make up for it.",
    annotated_words: [
      { word_id: "n2_1437", word_number: 1437, kanji: "年度", furigana: "ねんど", meaning_en: "year" },
      { word_id: "n2_1438", word_number: 1438, kanji: "やる気", furigana: "やるき", meaning_en: "motivation" },
      { word_id: "n2_1439", word_number: 1439, kanji: "怠ける", furigana: "なまける", meaning_en: "slack off, be idle" },
      { word_id: "n2_1440", word_number: 1440, kanji: "取り戻す", furigana: "とりもどす", meaning_en: "get back, make up" },
      { word_id: "n2_1441", word_number: 1441, kanji: "ほぼ", furigana: "", meaning_en: "almost" },
      { word_id: "n2_1442", word_number: 1442, kanji: "懸命な", furigana: "けんめいな", meaning_en: "hard, intense" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 16 学校",
    page_story: "216_1",
    japanese_text: "中学生とその<u>保護者</u>に<u>塾</u>に通い始めた<u>きっかけ</u>を聞くと、「成績が不安なため」と、<u>学力</u>を気にする回答が最も多かった。ちなみに、<u>塾</u>を選ぶポイントは、<u>塾</u>の雰囲気、家からの近さ、<u>月謝</u>の３つが重視されている。",
    english_translation: "When junior high school students and their guardians were asked the reason why the students started attending cram school, the most common answer was, \"Because we're worried about grades,\" indicating concerns about academic ability. Incidentally, the three most important factors when choosing a cram school were the school's atmosphere, proximity to home, and monthly tuition fees.",
    annotated_words: [
      { word_id: "n2_1443", word_number: 1443, kanji: "保護者", furigana: "ほごしゃ", meaning_en: "guardian (parent)" },
      { word_id: "n2_1444", word_number: 1444, kanji: "塾", furigana: "じゅく", meaning_en: "cram school" },
      { word_id: "n2_1445", word_number: 1445, kanji: "きっかけ", furigana: "", meaning_en: "opportunity, reason" },
      { word_id: "n2_1446", word_number: 1446, kanji: "学力", furigana: "がくりょく", meaning_en: "academic ability" },
      { word_id: "n2_1447", word_number: 1447, kanji: "月謝", furigana: "げっしゃ", meaning_en: "monthly tuition fee" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 16 学校",
    page_story: "216_2",
    japanese_text: "小学生の頃、学校の壁に<u>落書きしたり</u>、<u>花壇</u>の花を<u>ちぎったり</u>するかなり悪い子どもだった。<u>それなのに</u>、校長先生はいつも笑顔で優しく、私たちに<u>混じって</u> <u>校庭</u>でよく遊んでくれた。あんな先生はなかなかいない。",
    english_translation: "In elementary school, I was sort of a bad kid, always scribbling on the school walls and tearing up flowers from the flower beds. But despite this, the principal was always smiling and kind, and would often join us in the schoolyard to play with us. Teachers like that are hard to find.",
    annotated_words: [
      { word_id: "n2_1448", word_number: 1448, kanji: "落書き[する]", furigana: "らくがき", meaning_en: "graffiti, scribble on" },
      { word_id: "n2_1449", word_number: 1449, kanji: "花壇", furigana: "かだん", meaning_en: "flower bed" },
      { word_id: "n2_1450", word_number: 1450, kanji: "ちぎる", furigana: "", meaning_en: "pluck, tear up" },
      { word_id: "n2_1451", word_number: 1451, kanji: "それなのに", furigana: "", meaning_en: "despite this, and yet" },
      { word_id: "n2_1452", word_number: 1452, kanji: "混じる", furigana: "まじる", meaning_en: "mix with, join in" },
      { word_id: "n2_1453", word_number: 1453, kanji: "校庭", furigana: "こうてい", meaning_en: "schoolyard" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 16 学校",
    page_story: "217_1",
    japanese_text: "私が<u>在学する</u>大学は、<u>諸</u>外国の文化の研究に力を入れていて、多くの工芸品が<u>展示されて</u>いる。<u>修了生</u>の中には、その国で研究を続けている人もいる。",
    english_translation: "The university where I'm enrolled is committed to the study of foreign cultures and has artifacts from various countries on display. Some graduates even go on to continue their studies in those countries.",
    annotated_words: [
      { word_id: "n2_1454", word_number: 1454, kanji: "在学[する]", furigana: "ざいがく", meaning_en: "enrolment, enrol (to study)" },
      { word_id: "n2_1455", word_number: 1455, kanji: "諸〜", furigana: "しょ", meaning_en: "many ~, various ~" },
      { word_id: "n2_1456", word_number: 1456, kanji: "展示[する]", furigana: "てんじ", meaning_en: "display, exhibit" },
      { word_id: "n2_1457", word_number: 1457, kanji: "修了生", furigana: "しゅうりょうせい", meaning_en: "graduate" }
    ]
  }
];

topic16StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 16 story ${story.story_number}: ${story.page_story}.json`);
});
