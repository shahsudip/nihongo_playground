import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

const stories = [
  {
    id: "31_1",
    title: "Topic 1",
    japanese_text: "いつも<ruby>夕食<rt>ゆうしょく</rt></ruby>は<ruby>簡単<rt>かんたん</rt></ruby>な<ruby>料理<rt>りょうり</rt></ruby>やスーパーの<span class='annotated-word' data-word='おそうざい'>おそうざい</span>で<span class='annotated-word' data-word='済ませる'>済<ruby><rt>す</rt></ruby>ませて</span>いる。<span class='annotated-word' data-word='外食する'>外食<ruby><rt>がいしょく</rt></ruby></span>もしない。でも、<ruby>結婚<rt>けっこん</rt></ruby><span class='annotated-word' data-word='記念日'>記念日<ruby><rt>きねんび</rt></ruby></span>ぐらいは<span class='annotated-word' data-word='ぜいたくする'>ぜいたくし</span>たい。",
    english_translation: "My dinner is always something simple or some side dish I bought at the supermarket. I don't eat out. But I do want to have something luxurious on my wedding anniversary at least.",
    annotated_words: [
      { meaning_en: "side dish", furigana: "", kanji: "(お)そうざい" },
      { meaning_en: "be done, settle", furigana: "すませる", kanji: "済ませる" },
      { meaning_en: "finish", furigana: "すむ", kanji: "済む" },
      { meaning_en: "eating out, eat out", furigana: "がいしょく", kanji: "外食[する]" },
      { meaning_en: "anniversary", furigana: "きねんび", kanji: "記念日" },
      { meaning_en: "commemoration, commemorate", furigana: "きねん", kanji: "記念[する]" },
      { meaning_en: "luxury, do something luxurious", furigana: "", kanji: "ぜいたく[する]" }
    ]
  },
  {
    id: "31_2",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='全力'>全力<ruby><rt>ぜんりょく</rt></ruby></span>で<ruby>運動<rt>うんどう</rt></ruby>した<ruby>後<rt>あと</rt></ruby>は、お<ruby>腹<rt>なか</rt></ruby>が<span class='annotated-word' data-word='ぺこぺこな'>ぺこぺこに</span>なる。ご<ruby>飯<rt>はん</rt></ruby>を<span class='annotated-word' data-word='丼'>丼<ruby><rt>どんぶり</rt></ruby></span>で<ruby>何<rt>なん</rt></ruby><span class='annotated-word' data-word='杯'>杯<ruby><rt>ばい</rt></ruby></span>も<span class='annotated-word' data-word='おかわりする'>おかわりして</span>しまう。",
    english_translation: "After exercising with all my strength, I get hungry. I end up having bowl after bowl of rice.",
    annotated_words: [
      { meaning_en: "full strength, with all one's might", furigana: "ぜんりょく", kanji: "全力" },
      { meaning_en: "empty (stomach), very hungry", furigana: "", kanji: "ぺこぺこな" },
      { meaning_en: "bowl", furigana: "どんぶり", kanji: "丼" },
      { meaning_en: "~ items (counter for bowls of food or cups of drink)", furigana: "はい", kanji: "〜杯" },
      { meaning_en: "refill, have seconds, have a refill", furigana: "", kanji: "おかわり[する]" }
    ]
  },
  {
    id: "32_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='小麦'>小麦<ruby><rt>こむぎ</rt></ruby></span>は、<span class='annotated-word' data-word='トウモロコシ'>トウモロコシ</span>、<ruby>米<rt>こめ</rt></ruby>の<ruby>次<rt>つぎ</rt></ruby>に<ruby>世界中<rt>せかいじゅう</rt></ruby>で<ruby>作<rt>つく</rt></ruby>られている。<ruby>小麦<rt>こむぎ</rt></ruby>は、まず<span class='annotated-word' data-word='粉'>粉<ruby><rt>こな</rt></ruby></span>にする。それから、パンを<ruby>作<rt>つく</rt></ruby>ったり、<span class='annotated-word' data-word='麺'>麺<ruby><rt>めん</rt></ruby></span>を<ruby>作<rt>つく</rt></ruby>ったりする。イタリアの<span class='annotated-word' data-word='パスタ'>パスタ</span>は<ruby>世界中<rt>せかいじゅう</rt></ruby>で<ruby>食<rt>た</rt></ruby>べられている。",
    english_translation: "Wheat is the third most produced grain around the world after corn and rice. Wheat is first made into grain. Then, it is used to make bread or noodles. Italian pasta is eaten around the world.",
    annotated_words: [
      { meaning_en: "wheat", furigana: "こむぎ", kanji: "小麦" },
      { meaning_en: "flour", furigana: "こむぎこ", kanji: "小麦粉" },
      { meaning_en: "corn", furigana: "", kanji: "トウモロコシ" },
      { meaning_en: "powder", furigana: "こな", kanji: "粉" },
      { meaning_en: "noodles", furigana: "めん", kanji: "麺" },
      { meaning_en: "pasta", furigana: "", kanji: "パスタ" }
    ]
  }
];

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const story of stories) {
  const filePath = path.join(outDir, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Generated ${story.id}.json`);
}
console.log(`\\nDone! Generated ${stories.length} stories.`);
