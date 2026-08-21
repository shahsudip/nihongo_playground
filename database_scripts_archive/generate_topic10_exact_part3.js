import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 10 Stories (Sports) - Part 3
const topic10StoriesPart3 = [
  {
    is_story: true,
    story_number: 23,
    title: "Topic 10 スポーツ",
    page_story: "149_1",
    japanese_text: "A：パラリンピックが<u>開幕した</u>けど、Bさんは何か見る？\nB：車いすバスケかな。友達が車いすの<u>車輪</u>を作る仕事をしてるから見始めたんだけど、<u>頭脳</u>プレーが多くて面白いの！",
    english_translation: "A: The Paralympics have started. What are you going to watch, B? B: Wheelchair basketball, I think. I started watching it because my friend works making wheels for wheelchairs. It's really interesting because there's a lot of clever play!",
    annotated_words: [
      { word_id: "n2_0924", word_number: 924, kanji: "開幕[する]", furigana: "かいまく", meaning_en: "opening, open (event)" },
      { word_id: "n2_0925", word_number: 925, kanji: "閉幕[する]", furigana: "へいまく", meaning_en: "closing, close (event)" },
      { word_id: "n2_0926", word_number: 926, kanji: "幕", furigana: "まく", meaning_en: "end of, close" },
      { word_id: "n2_0927", word_number: 927, kanji: "車輪", furigana: "しゃりん", meaning_en: "wheels" },
      { word_id: "n2_0928", word_number: 928, kanji: "頭脳", furigana: "ずのう", meaning_en: "brain" }
    ]
  }
];

topic10StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 10 story ${story.story_number}: ${story.page_story}.json`);
});
