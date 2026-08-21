import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 11 Stories (Animals) - Part 3
const topic11StoriesPart3 = [
  {
    is_story: true,
    story_number: 17,
    title: "Topic 11 動物",
    page_story: "160_1",
    japanese_text: "馬は<u>本来</u>記憶力がよい動物である。例えば、自分が嫌いな人が<u>綱</u>を引くと、一歩も動かないこともある。<u>競馬</u>で活躍する馬たちは、野生の馬よりも<u>知能</u>が高いわけではない。しかし、他の馬が前を<u>横切った</u>だけで走り出すなど、競馬に勝つための<u>本能</u>を持っている。",
    english_translation: "By nature, horses have good memories. For example, if someone they dislike pulls on their rope, they may refuse to take a single step. Horses that compete in horse races are no more intelligent than wild horses. However, they do have the instinct to win horse races; for example, by starting to run faster when another horse cuts across them.",
    annotated_words: [
      { word_id: "n2_1012", word_number: 1012, kanji: "本来", furigana: "ほんらい", meaning_en: "origin, by nature, intrinsically" },
      { word_id: "n2_1013", word_number: 1013, kanji: "綱", furigana: "つな", meaning_en: "rope" },
      { word_id: "n2_1014", word_number: 1014, kanji: "競馬", furigana: "けいば", meaning_en: "horse racing" },
      { word_id: "n2_1015", word_number: 1015, kanji: "知能", furigana: "ちのう", meaning_en: "intellect, intelligence" },
      { word_id: "n2_1016", word_number: 1016, kanji: "横切る", furigana: "よこぎる", meaning_en: "cut across, cut in" },
      { word_id: "n2_1017", word_number: 1017, kanji: "本能", furigana: "ほんのう", meaning_en: "instinct" }
    ]
  }
];

topic11StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 11 story ${story.story_number}: ${story.page_story}.json`);
});
