import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 19 Stories (Health) - Part 3
const topic19StoriesPart3 = [
  {
    is_story: true,
    story_number: 14,
    title: "Topic 19 健康",
    page_story: "276_1",
    japanese_text: "祖母は<u>生まれつき</u>身体が弱く、小さい頃はよく熱を出し、両親に<u>看病して</u>もらったそうだ。だが、母を産んでからは<u>心身</u>ともに強くなり、病気をすることもなくなったそうだ。",
    english_translation: "From birth, my grandmother was physically weak, and as a child she often had fevers and had to be nursed to health by her parents. However, after she gave birth to my mother, she became stronger both in mind and body, and she never got sick again.",
    annotated_words: [
      { word_id: "n2_1917", word_number: 1917, kanji: "生まれつき", furigana: "うまれつき", meaning_en: "from birth, by nature" },
      { word_id: "n2_1918", word_number: 1918, kanji: "看病[する]", furigana: "かんびょう", meaning_en: "nursing, nurse to health" },
      { word_id: "n2_1919", word_number: 1919, kanji: "心身", furigana: "しんしん", meaning_en: "mind and body" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 19 健康",
    page_story: "276_2",
    japanese_text: "娘の<u>誕生</u>をきっかけに、医師サポートを受けながら、たばこを減らしはじめた。病院は予約<u>制</u>で、2週に1回きちんと通い、<u>着々と</u>禁煙計画を進めている。",
    english_translation: "The birth of her daughter was an opportunity to cut down on smoking cigarettes, which was supported by her doctor. Hospital visits are by appointment only, and she attends every two weeks, making steady progress with her plans to quit smoking.",
    annotated_words: [
      { word_id: "n2_1920", word_number: 1920, kanji: "誕生[する]", furigana: "たんじょう", meaning_en: "birth, be born" },
      { word_id: "n2_1921", word_number: 1921, kanji: "～制", furigana: "せい", meaning_en: "~ system" },
      { word_id: "n2_1922", word_number: 1922, kanji: "着々と", furigana: "ちゃくちゃくと", meaning_en: "steadily" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 19 健康",
    page_story: "277_1",
    japanese_text: "腰の痛みを<u>訴えて</u>、<u>医療</u>機関を受診する人は多い。だが、原因がはっきり分からないこともあり、痛みを<u>散らす</u>注射を打って終わることもある。そのため、病院ではなく、ジムなどで経験が<u>豊富な</u>インストラクターから指導を受け、腰痛を改善させる人もいる。",
    english_translation: "Many people visit medical facilities complaining of back pain. However, sometimes the cause of this pain is unclear, and they end up receiving an injection to relieve the pain. For this reason, instead of a hospital, some people go to a gym to receive guidance from an instructor with abundant experience to improve their back pain.",
    annotated_words: [
      { word_id: "n2_1923", word_number: 1923, kanji: "訴える", furigana: "うったえる", meaning_en: "complain, litigate" },
      { word_id: "n2_1924", word_number: 1924, kanji: "訴え", furigana: "うったえ", meaning_en: "lawsuit, legal action" },
      { word_id: "n2_1925", word_number: 1925, kanji: "医療", furigana: "いりょう", meaning_en: "medical treatment, medicine" },
      { word_id: "n2_1926", word_number: 1926, kanji: "散らす", furigana: "ちらす", meaning_en: "relieve, disperse" },
      { word_id: "n2_1927", word_number: 1927, kanji: "豊富な", furigana: "ほうふな", meaning_en: "rich, abundant" }
    ]
  }
];

topic19StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 19 story ${story.story_number}: ${story.page_story}.json`);
});
