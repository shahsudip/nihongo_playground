import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic23StoriesPart4 = [
  {
    is_story: true,
    story_number: 24,
    title: "Topic 23 環境・科学",
    page_story: "333_1",
    japanese_text: "ある液体が<u>酸性</u>か<u>アルカリ性</u>かを見分けるのに、<u>電流</u>を使うのは賢い方法とは言えない。どちらの液体も電流を通すからだ。<u>したがって</u>、ｐＨ試験紙を用いて、試験紙の色がどの色見本と<u>一致する</u>か調べるのが有効である。<u>前者</u>であれば赤色に、<u>後者</u>なら青色に近くなるはずである。",
    english_translation: "Using an electric current to tell whether a liquid is acidic or alkaline is not a smart way to do it. This is because both kinds of liquid are conductive. Therefore, it is more effective to use a pH test paper and match the test strip with the color sample. If it is the former, it should appear red, and if the latter, it should be closer to blue.",
    annotated_words: [
      { word_id: "n2_2348", word_number: 2348, kanji: "酸性", furigana: "さんせい", meaning_en: "acidity" },
      { word_id: "n2_2349", word_number: 2349, kanji: "アルカリ性", furigana: "あるかりせい", meaning_en: "alkalinity" },
      { word_id: "n2_2350", word_number: 2350, kanji: "電流", furigana: "でんりゅう", meaning_en: "electric current" },
      { word_id: "n2_2351", word_number: 2351, kanji: "したがって", furigana: "したがって", meaning_en: "therefore, accordingly" },
      { word_id: "n2_2352", word_number: 2352, kanji: "一致[する]", furigana: "いっち", meaning_en: "consistency, match" },
      { word_id: "n2_2353", word_number: 2353, kanji: "前者", furigana: "ぜんしゃ", meaning_en: "former" },
      { word_id: "n2_2354", word_number: 2354, kanji: "後者", furigana: "こうしゃ", meaning_en: "latter" }
    ]
  },
  {
    is_story: true,
    story_number: 25,
    title: "Topic 23 環境・科学",
    page_story: "334_1",
    japanese_text: "A：また大型の台風が日本に<u>接近してる</u>って。怖いなあ。\nB：でも、<u>前回</u>と<u>同様</u>、日本に<u>上陸する</u>までに<u>温帯</u>低気圧に変わるって話もあるよ。\nA：でも<u>断定</u>はできないんでしょ。対策をしておくには越したことはないよ。",
    english_translation: "A: Another major typhoon is approaching Japan. It's frightening.\nB: People are saying it will turn into a temperate low-pressure storm by the time it hits Japan, just like last time.\nA: But we can't just conclude that, can we? It's best to take precautions.",
    annotated_words: [
      { word_id: "n2_2355", word_number: 2355, kanji: "接近[する]", furigana: "せっきん", meaning_en: "approach, draw near" },
      { word_id: "n2_2356", word_number: 2356, kanji: "前回", furigana: "ぜんかい", meaning_en: "last time" },
      { word_id: "n2_2357", word_number: 2357, kanji: "同様", furigana: "どうよう", meaning_en: "same, just like" },
      { word_id: "n2_2358", word_number: 2358, kanji: "上陸[する]", furigana: "じょうりく", meaning_en: "landfall, hit (land)" },
      { word_id: "n2_2359", word_number: 2359, kanji: "温帯", furigana: "おんたい", meaning_en: "temperate zone" },
      { word_id: "n2_2360", word_number: 2360, kanji: "断定[する]", furigana: "だんてい", meaning_en: "decision, conclude" }
    ]
  }
];

topic23StoriesPart4.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 23 story ${story.story_number}: ${story.page_story}.json`);
});
