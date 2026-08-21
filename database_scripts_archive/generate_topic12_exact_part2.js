import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 12 Stories (Housing) - Part 2
const topic12StoriesPart2 = [
  {
    is_story: true,
    story_number: 8,
    title: "Topic 12 住",
    page_story: "166_1",
    japanese_text: "また、多くの空き家は<u>植木</u>が<u>整備されず</u>、草も<u>刈られない</u>ため、火のついたタバコの<u>ポイ捨て</u>が原因で火災につながることもあるらしい。",
    english_translation: "Also, in many vacant houses, garden plants are not maintained and grass is not mown, so discarded cigarettes can lead to fires, apparently.",
    annotated_words: [
      { word_id: "n2_1056", word_number: 1056, kanji: "植木", furigana: "うえき", meaning_en: "garden plants" },
      { word_id: "n2_1057", word_number: 1057, kanji: "整備[する]", furigana: "せいび", meaning_en: "improvement, maintain" },
      { word_id: "n2_1058", word_number: 1058, kanji: "刈る", furigana: "かる", meaning_en: "cut (grass), mow" },
      { word_id: "n2_1059", word_number: 1059, kanji: "ポイ捨て[する]", furigana: "ぽいすて", meaning_en: "litter, discard, toss away" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 12 住",
    page_story: "166_2",
    japanese_text: "A：この、天井から植物を<u>ぶら下げて</u>るの、いいね。\nB：ありがとう。アレルギー<u>物質</u>が気になるから、掃除機をかけやすいようにしてるんだ。\nA：なるほど。こんな部屋で仕事できたら、新しい<u>発想</u>がどんどん<u>浮かび</u>そう！うちもこんな雰囲気に<u>近づけたい</u>な。",
    english_translation: "A: I like these plants hanging from the ceiling. B: Thanks. I'm worried about allergic substances, so I'm trying to make it easier to vacuum. A: I see. If I could work in a room like this, I'm sure lots of new ideas would spring to mind! I'd like to make my room more like this.",
    annotated_words: [
      { word_id: "n2_1060", word_number: 1060, kanji: "ぶら下げる", furigana: "ぶらさげる", meaning_en: "hang (something)" },
      { word_id: "n2_1061", word_number: 1061, kanji: "ぶら下がる", furigana: "ぶらさがる", meaning_en: "hang" },
      { word_id: "n2_1062", word_number: 1062, kanji: "物質", furigana: "ぶっしつ", meaning_en: "substance, material" },
      { word_id: "n2_1063", word_number: 1063, kanji: "発想[する]", furigana: "はっそう", meaning_en: "idea, have an idea" },
      { word_id: "n2_1064", word_number: 1064, kanji: "浮かぶ", furigana: "うかぶ", meaning_en: "spring to mind" },
      { word_id: "n2_1065", word_number: 1065, kanji: "近づける", furigana: "ちかづける", meaning_en: "bring closer, make ~ more like" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 12 住",
    page_story: "167_2",
    japanese_text: "A：はあ、また親から写真が送られてきた。\nB：どうしたの？\nA：先月会社を退職したんだけどね。DIYに<u>挑戦する</u>んだって言ってて。それで<u>さびた</u> <u>ガレージ</u>に自分で<u>ペンキ</u>塗って、<u>シャッター</u>までつけたんだって。",
    english_translation: "A: Huh, my dad sent me another photo. B: What's going on? A: He retired from his job last month and said he was going to try his hand at DIY. So he painted a rusty garage by himself and even put up shutters.",
    annotated_words: [
      { word_id: "n2_1066", word_number: 1066, kanji: "挑戦[する]", furigana: "ちょうせん", meaning_en: "challenge, try one's hand" },
      { word_id: "n2_1067", word_number: 1067, kanji: "さびる", furigana: "", meaning_en: "become rusted" },
      { word_id: "n2_1068", word_number: 1068, kanji: "さび", furigana: "", meaning_en: "rust" },
      { word_id: "n2_1069", word_number: 1069, kanji: "ガレージ", furigana: "", meaning_en: "garage" },
      { word_id: "n2_1070", word_number: 1070, kanji: "ペンキ", furigana: "", meaning_en: "paint" },
      { word_id: "n2_1071", word_number: 1071, kanji: "シャッター", furigana: "", meaning_en: "shutter" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 12 住",
    page_story: "168_1",
    japanese_text: "A：この前大きな荷物運んでたら、<u>下駄箱</u>にぶつけちゃって。ここ、けっこう<u>へこん</u>じゃったんだよね。どうしよう。\nB：ほんとだ。とりあえず<u>大家</u>さんに相談してみたら？",
    english_translation: "A: The other day I was carrying something heavy and I bumped into the shoe cupboard. It made quite a dent. What should I do? B: Well, firstly, why don't you talk to your landlord about it?",
    annotated_words: [
      { word_id: "n2_1072", word_number: 1072, kanji: "下駄箱", furigana: "げたばこ", meaning_en: "shoe cupboard, shoe rack" },
      { word_id: "n2_1073", word_number: 1073, kanji: "へこむ", furigana: "", meaning_en: "dent" },
      { word_id: "n2_1074", word_number: 1074, kanji: "大家", furigana: "おおや", meaning_en: "landlord" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 12 住",
    page_story: "168_2",
    japanese_text: "A：お隣さんの飼い猫がうちに入ってきて困ってるんだ。隣の家とは<u>塀</u>で<u>区切られて</u>るんだけど、越えてくるんだよね。\nB：水を入れたペットボトルを等<u>間隔</u>で置いておくとか？\nA：うーん。でも庭の雰囲気を<u>重視したい</u>んだよね。",
    english_translation: "A: The neighbor's cat keeps coming into my yard and it's bothering me. Our house and their house are separated by a fence, but it jumps over it. B: How about putting plastic bottles filled with water at regular intervals? A: Hmmm. But I want to prioritize the atmosphere of the garden.",
    annotated_words: [
      { word_id: "n2_1075", word_number: 1075, kanji: "塀", furigana: "へい", meaning_en: "fence" },
      { word_id: "n2_1076", word_number: 1076, kanji: "区切る", furigana: "くぎる", meaning_en: "divide, separate" },
      { word_id: "n2_1077", word_number: 1077, kanji: "区切り", furigana: "くぎり", meaning_en: "division" },
      { word_id: "n2_1078", word_number: 1078, kanji: "間隔", furigana: "かんかく", meaning_en: "interval" },
      { word_id: "n2_1079", word_number: 1079, kanji: "重視[する]", furigana: "じゅうし", meaning_en: "emphasis, emphasize" },
      { word_id: "n2_1080", word_number: 1080, kanji: "軽視[する]", furigana: "けいし", meaning_en: "disregard, belittle, dismiss" }
    ]
  }
];

topic12StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 12 story ${story.story_number}: ${story.page_story}.json`);
});
