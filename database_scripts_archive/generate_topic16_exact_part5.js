import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 16 Stories (School) - Part 5
const topic16StoriesPart5 = [
  {
    is_story: true,
    story_number: 28,
    title: "Topic 16 学校",
    page_story: "232_1",
    japanese_text: "今でも<u>記憶</u>に残る先生の一人に<u>保健室</u>の先生がいる。<u>マイペースな</u>性格でなかなか友達の<u>輪</u>に入れなかった私だが、先生がいつも話を聞いてくれたおかげで、学校に来ることができた。先生は、どんな話も大人の<u>物差し</u>で判断しない人だった。",
    english_translation: "One teacher that has stayed in my memory was in charge of the infirmary. As a child, I went along at my own pace and it wasn't easy for me to make a circle of friends, but I was able to attend school thanks to that teacher, who always listened to what I had to say. No matter what I said, she never judged me by adult standards.",
    annotated_words: [
      { word_id: "n2_1566", word_number: 1566, kanji: "記憶[する]", furigana: "きおく", meaning_en: "memory, memorize" },
      { word_id: "n2_1567", word_number: 1567, kanji: "保健室", furigana: "ほけんしつ", meaning_en: "infirmary" },
      { word_id: "n2_1568", word_number: 1568, kanji: "保健", furigana: "ほけん", meaning_en: "health" },
      { word_id: "n2_1569", word_number: 1569, kanji: "マイペースな", furigana: "まいぺーすな", meaning_en: "my own pace" },
      { word_id: "n2_1570", word_number: 1570, kanji: "輪", furigana: "わ", meaning_en: "circle" },
      { word_id: "n2_1571", word_number: 1571, kanji: "物差し", furigana: "ものさし", meaning_en: "standard, measure" }
    ]
  },
  {
    is_story: true,
    story_number: 29,
    title: "Topic 16 学校",
    page_story: "232_2",
    japanese_text: "学校で掃除の片付けをしていたとき、<u>はしご</u>が倒れてきて足に当たった。そのときはあまり痛くなかったが、だんだんと痛みが<u>こらえられなく</u>なり、<u>翌</u>日病院に行った。",
    english_translation: "I was cleaning up at school when a ladder fell over and hit me on the leg. It didn't hurt too much at the time, but gradually the pain became unbearable and I went to hospital the following day.",
    annotated_words: [
      { word_id: "n2_1572", word_number: 1572, kanji: "はしご[する]", furigana: "", meaning_en: "ladder, go bar hopping" },
      { word_id: "n2_1573", word_number: 1573, kanji: "こらえる", furigana: "", meaning_en: "endure, bear" },
      { word_id: "n2_1574", word_number: 1574, kanji: "翌〜", furigana: "よく", meaning_en: "following ~" }
    ]
  },
  {
    is_story: true,
    story_number: 30,
    title: "Topic 16 学校",
    page_story: "233_1",
    japanese_text: "歴史を学ぶ際、ただ出来事を<u>暗記する</u>だけではもったいない。時代<u>区分</u>によって、それぞれ<u>言葉遣い</u>が異なるという面白さもあるので、当時の言葉にも注目してみてはどうだろう。",
    english_translation: "When you study history, it's pointless to just memorize events. What's interesting is how the use of language differs depending on the division of historical periods, so it's worth examining the language of the time.",
    annotated_words: [
      { word_id: "n2_1575", word_number: 1575, kanji: "暗記[する]", furigana: "あんき", meaning_en: "learning by heart, memorize" },
      { word_id: "n2_1576", word_number: 1576, kanji: "区分[する]", furigana: "くぶん", meaning_en: "category, division, divide" },
      { word_id: "n2_1577", word_number: 1577, kanji: "言葉遣い", furigana: "ことばづかい", meaning_en: "use of language" }
    ]
  }
];

topic16StoriesPart5.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 16 story ${story.story_number}: ${story.page_story}.json`);
});
