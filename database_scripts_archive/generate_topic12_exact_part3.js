import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 12 Stories (Housing) - Part 3
const topic12StoriesPart3 = [
  {
    is_story: true,
    story_number: 13,
    title: "Topic 12 住",
    page_story: "169_2",
    japanese_text: "A：<u>一軒家</u>を買うか、<u>賃貸</u>アパートにするか迷うなあ。\nB：アパートだと、上の階の人が<u>騒がしい</u>と最悪だよ。\nA：でも、買うと手放すのが大変だし。必要に<u>応じて</u> <u>住居</u>を変えられるようにしたいんだよね。",
    english_translation: "A: I don't know whether to buy a detached house or rent an apartment. B: An apartment would be terrible if the people upstairs are noisy. A: But if I buy, it'll be hard to give it up. I want to be able to change my residence depending on my needs.",
    annotated_words: [
      { word_id: "n2_1081", word_number: 1081, kanji: "一軒家", furigana: "いっけんや", meaning_en: "detached house" },
      { word_id: "n2_1082", word_number: 1082, kanji: "一戸建て", furigana: "いっこだて", meaning_en: "detached house, standalone house" },
      { word_id: "n2_1083", word_number: 1083, kanji: "賃貸", furigana: "ちんたい", meaning_en: "rental" },
      { word_id: "n2_1084", word_number: 1084, kanji: "騒がしい", furigana: "さわがしい", meaning_en: "noisy" },
      { word_id: "n2_1085", word_number: 1085, kanji: "応じる", furigana: "おうじる", meaning_en: "depend, accept, respond" },
      { word_id: "n2_1086", word_number: 1086, kanji: "住居", furigana: "じゅうきょ", meaning_en: "residence" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 12 住",
    page_story: "170_1",
    japanese_text: "近所のスーパーに、一週間<u>ごと</u>に食品の<u>定期</u> <u>配送</u>をお願いしている。だがこの地域では、大雪が配達の<u>妨げ</u>となり、予定通りに届かないことがある。",
    english_translation: "I get my local supermarket to make regular deliveries of food every week. However, in this area, heavy snowfall sometimes interferes with deliveries and they don't arrive on time.",
    annotated_words: [
      { word_id: "n2_1087", word_number: 1087, kanji: "〜ごと", furigana: "", meaning_en: "each ~, every ~" },
      { word_id: "n2_1088", word_number: 1088, kanji: "定期", furigana: "ていき", meaning_en: "regular period" },
      { word_id: "n2_1089", word_number: 1089, kanji: "定期的な", furigana: "ていきてきな", meaning_en: "regular, periodic" },
      { word_id: "n2_1090", word_number: 1090, kanji: "定期券", furigana: "ていきけん", meaning_en: "commuter pass, season ticket" },
      { word_id: "n2_1091", word_number: 1091, kanji: "配送[する]", furigana: "はいそう", meaning_en: "delivery, deliver" },
      { word_id: "n2_1092", word_number: 1092, kanji: "妨げ", furigana: "さまたげ", meaning_en: "hindrance, interference" },
      { word_id: "n2_1093", word_number: 1093, kanji: "妨げる", furigana: "さまたげる", meaning_en: "hinder, interfere" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 12 住",
    page_story: "170_2",
    japanese_text: "レンガは<u>長方形</u>のものが最も<u>一般的だ</u>。<u>等しい</u>大きさのレンガだけでも、組み方によっていろいろな<u>図形</u>を描くことができる。この本によると、代表的な組み方は５<u>通り</u>あるらしい。",
    english_translation: "Rectangular bricks are the most common type. Even bricks of equal size can be made into various configurations, depending on how they are put together. According to this book, there are five typical ways of putting bricks together.",
    annotated_words: [
      { word_id: "n2_1094", word_number: 1094, kanji: "長方形", furigana: "ちょうほうけい", meaning_en: "rectangle" },
      { word_id: "n2_1095", word_number: 1095, kanji: "正方形", furigana: "せいほうけい", meaning_en: "square" },
      { word_id: "n2_1096", word_number: 1096, kanji: "一般的な", furigana: "いっぱんてきな", meaning_en: "common, general, prevailing" },
      { word_id: "n2_1097", word_number: 1097, kanji: "一般", furigana: "いっぱん", meaning_en: "general, ordinary" },
      { word_id: "n2_1098", word_number: 1098, kanji: "等しい", furigana: "ひとしい", meaning_en: "equal, equivalent" },
      { word_id: "n2_1099", word_number: 1099, kanji: "図形", furigana: "ずけい", meaning_en: "configuration, diagram, shape" },
      { word_id: "n2_1100", word_number: 1100, kanji: "〜通り", furigana: "とおり", meaning_en: "kind of ~, way of ~" }
    ]
  }
];

topic12StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 12 story ${story.story_number}: ${story.page_story}.json`);
});
