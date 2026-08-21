import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 18 Stories (Life) - Part 3
const topic18StoriesPart3 = [
  {
    is_story: true,
    story_number: 19,
    title: "Topic 18 人生",
    page_story: "264_1",
    japanese_text: "前の会社での<u>地位</u>に納得できず、もっと<u>実績</u>を<u>生かしたい</u>と思い、<u>転職した</u>。しかし、思うようにはいかず、<u>中途半端な</u> <u>覚悟</u>で<u>安易に</u>転職してしまったことを<u>後悔して</u>いる。",
    english_translation: "I wasn't satisfied with my position at my previous employer and wanted to make use of my accomplishments, so I changed jobs. However, it didn't work out the way I wanted and now I regret that I took the easy option and changed jobs when I was only halfway ready.",
    annotated_words: [
      { word_id: "n2_1824", word_number: 1824, kanji: "地位", furigana: "ちい", meaning_en: "position, status" },
      { word_id: "n2_1825", word_number: 1825, kanji: "実績", furigana: "じっせき", meaning_en: "accomplishments" },
      { word_id: "n2_1826", word_number: 1826, kanji: "生かす", furigana: "いかす", meaning_en: "make use of, take advantage of" },
      { word_id: "n2_1827", word_number: 1827, kanji: "転職[する]", furigana: "てんしょく", meaning_en: "job change, change jobs" },
      { word_id: "n2_1828", word_number: 1828, kanji: "中途半端な", furigana: "ちゅうとはんぱな", meaning_en: "halfway, by half-measures" },
      { word_id: "n2_1829", word_number: 1829, kanji: "覚悟[する]", furigana: "かくご", meaning_en: "readiness, be ready" },
      { word_id: "n2_1830", word_number: 1830, kanji: "安易な", furigana: "あんいな", meaning_en: "easy, careless" },
      { word_id: "n2_1831", word_number: 1831, kanji: "後悔[する]", furigana: "こうかい", meaning_en: "regret, regret" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 18 人生",
    page_story: "264_2",
    japanese_text: "有名大学を卒業した後は、<u>大手</u>企業に<u>入社し</u>、同期の中で一番に<u>出世して</u>高<u>収入</u>を得る予定だった。<u>まあ</u>、<u>現実</u>はそんなに甘くない。",
    english_translation: "After graduating from a famous university, I planned to join a leading company, rise to the top among my colleagues, and earn a huge income. Well, reality is not so kind.",
    annotated_words: [
      { word_id: "n2_1832", word_number: 1832, kanji: "大手", furigana: "おおて", meaning_en: "leading, major" },
      { word_id: "n2_1833", word_number: 1833, kanji: "入社[する]", furigana: "にゅうしゃ", meaning_en: "entrance, join (a company)" },
      { word_id: "n2_1834", word_number: 1834, kanji: "出世[する]", furigana: "しゅっせ", meaning_en: "success, succeed, rise" },
      { word_id: "n2_1835", word_number: 1835, kanji: "収入", furigana: "しゅうにゅう", meaning_en: "income" },
      { word_id: "n2_1836", word_number: 1836, kanji: "まあ", furigana: "", meaning_en: "well" },
      { word_id: "n2_1837", word_number: 1837, kanji: "現実", furigana: "げんじつ", meaning_en: "reality" },
      { word_id: "n2_1838", word_number: 1838, kanji: "現実的な", furigana: "げんじつてきな", meaning_en: "realistic" }
    ]
  }
];

topic18StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 18 story ${story.story_number}: ${story.page_story}.json`);
});
