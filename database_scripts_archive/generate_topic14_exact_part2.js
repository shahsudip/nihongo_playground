import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 14 Stories (Weather) - Part 2
const topic14StoriesPart2 = [
  {
    is_story: true,
    story_number: 7,
    title: "Topic 14 天気",
    page_story: "187_1",
    japanese_text: "<u>高気圧</u>から吹く風は、<u>北半球</u>では右に、<u>南半球</u>では左に<u>ずれる</u>。<u>緯度</u>が高いほど、この力は強く働く。これは、風が気圧だけでなく、地球の<u>自転</u>の影響も受けていることにより起こる<u>現象</u>である。",
    english_translation: "Winds blowing from high pressure systems shift to the right in the northern hemisphere and to the left in the southern hemisphere. The higher the latitude, the stronger this force. This phenomenon is caused by the wind being affected not only by atmospheric pressure but also by the earth's rotation.",
    annotated_words: [
      { word_id: "n2_1229", word_number: 1229, kanji: "高気圧", furigana: "こうきあつ", meaning_en: "high pressure system" },
      { word_id: "n2_1230", word_number: 1230, kanji: "低気圧", furigana: "ていきあつ", meaning_en: "low pressure system" },
      { word_id: "n2_1231", word_number: 1231, kanji: "北半球", furigana: "きたはんきゅう", meaning_en: "northern hemisphere" },
      { word_id: "n2_1232", word_number: 1232, kanji: "南半球", furigana: "みなみはんきゅう", meaning_en: "southern hemisphere" },
      { word_id: "n2_1233", word_number: 1233, kanji: "ずれる", furigana: "", meaning_en: "deviate, shift" },
      { word_id: "n2_1234", word_number: 1234, kanji: "緯度", furigana: "いど", meaning_en: "latitude" },
      { word_id: "n2_1235", word_number: 1235, kanji: "経度", furigana: "けいど", meaning_en: "longitude" },
      { word_id: "n2_1236", word_number: 1236, kanji: "自転[する]", furigana: "じてん", meaning_en: "(self-)rotation, rotate" },
      { word_id: "n2_1237", word_number: 1237, kanji: "現象", furigana: "げんしょう", meaning_en: "phenomenon" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 14 天気",
    page_story: "188_1",
    japanese_text: "この冬は<u>吹雪</u>がひどかった<u>せい</u>で、<u>農作物</u>がここ10年で<u>最低</u>の生産量となった。",
    english_translation: "Because of the severe blizzards this winter, agricultural production was the lowest in ten years.",
    annotated_words: [
      { word_id: "n2_1238", word_number: 1238, kanji: "吹雪", furigana: "ふぶき", meaning_en: "blizzard" },
      { word_id: "n2_1239", word_number: 1239, kanji: "せい", furigana: "", meaning_en: "blame, cause (negative)" },
      { word_id: "n2_1240", word_number: 1240, kanji: "農作物", furigana: "のうさくぶつ", meaning_en: "agricultural production/products" },
      { word_id: "n2_1241", word_number: 1241, kanji: "最低", furigana: "さいてい", meaning_en: "lowest" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 14 天気",
    page_story: "188_2",
    japanese_text: "A：さっきの<u>夕立</u>、ひどかったね。急に<u>ざあざあ</u>降ってくるから服が<u>びしょびしょだ</u>。\nB：ほんとだね。あ、<u>虹</u>！\nA：え、どこ？\nB：あそこ、<u>丘</u>の方。",
    english_translation: "A: What a terrible sudden shower we just had. My clothes are soaking wet because it just started pouring down. B: It really was. Oh look, a rainbow! A: Where? B: Over there, toward the hill.",
    annotated_words: [
      { word_id: "n2_1242", word_number: 1242, kanji: "夕立", furigana: "ゆうだち", meaning_en: "sudden (rain) shower" },
      { word_id: "n2_1243", word_number: 1243, kanji: "ざあざあ", furigana: "", meaning_en: "pouring down (rain)" },
      { word_id: "n2_1244", word_number: 1244, kanji: "びしょびしょな", furigana: "", meaning_en: "soaking wet" },
      { word_id: "n2_1245", word_number: 1245, kanji: "虹", furigana: "にじ", meaning_en: "rainbow" },
      { word_id: "n2_1246", word_number: 1246, kanji: "丘", furigana: "おか", meaning_en: "hill" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 14 天気",
    page_story: "189_1",
    japanese_text: "昨日、今日と<u>快晴</u>が続きましたが、明日は<u>大気</u>の状態が不安定になり、<u>平野</u>でも<u>積雪</u>が見られるでしょう。",
    english_translation: "Yesterday's and today's weather was clear, but tomorrow atmospheric conditions will become unstable and we will likely see some snowfall on the plains.",
    annotated_words: [
      { word_id: "n2_1247", word_number: 1247, kanji: "快晴", furigana: "かいせい", meaning_en: "clear weather" },
      { word_id: "n2_1248", word_number: 1248, kanji: "大気", furigana: "たいき", meaning_en: "atmosphere" },
      { word_id: "n2_1249", word_number: 1249, kanji: "平野", furigana: "へいや", meaning_en: "plains" },
      { word_id: "n2_1250", word_number: 1250, kanji: "積雪[する]", furigana: "せきせつ", meaning_en: "snowfall, snow" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 14 天気",
    page_story: "189_2",
    japanese_text: "A：<u>あら</u>、あの猫、さっき庭に出たばかりなのに、もう<u>引き返して</u>きた。\nB：見て。<u>霜</u>の上に<u>足跡</u>がついてるけど、途中でなくなってる。冷たかったんだろうね。あ、部屋に<u>引っ込ん</u>じゃった。",
    english_translation: "A: Oh, the cat just went out into the garden a moment ago, but it's already turned back. B: Look. There are tracks on the frost, but they stop partway. It must have been cold. Oh, it's come inside.",
    annotated_words: [
      { word_id: "n2_1251", word_number: 1251, kanji: "あら", furigana: "", meaning_en: "Oh" },
      { word_id: "n2_1252", word_number: 1252, kanji: "引き返す", furigana: "ひきかえす", meaning_en: "turn back" },
      { word_id: "n2_1253", word_number: 1253, kanji: "霜", furigana: "しも", meaning_en: "frost" },
      { word_id: "n2_1254", word_number: 1254, kanji: "足跡", furigana: "あしあと", meaning_en: "tracks, footprint" },
      { word_id: "n2_1255", word_number: 1255, kanji: "引っ込む", furigana: "ひっこむ", meaning_en: "retire, withdraw, come inside" }
    ]
  }
];

topic14StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 14 story ${story.story_number}: ${story.page_story}.json`);
});
