import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 14 Stories (Weather) - Part 3
const topic14StoriesPart3 = [
  {
    is_story: true,
    story_number: 12,
    title: "Topic 14 天気",
    page_story: "190_1",
    japanese_text: "A：秋の京都ってどうですか？\nB：<u>紅葉</u>がすごくきれいですよ。山だけじゃなくて、<u>地面</u>も<u>落ち葉</u>でいっぱいになるし、夜は山がライトで<u>照らされる</u>し。",
    english_translation: "A: What do you think of Kyoto in the fall? B: The colorful fall leaves are very beautiful. Not only the mountains, but also the ground is covered with fallen leaves, and at night the mountains are lit up.",
    annotated_words: [
      { word_id: "n2_1256", word_number: 1256, kanji: "紅葉[する]", furigana: "こうよう", meaning_en: "colorful fall leaves, (leaves) turn red" },
      { word_id: "n2_1257", word_number: 1257, kanji: "地面", furigana: "じめん", meaning_en: "ground" },
      { word_id: "n2_1258", word_number: 1258, kanji: "落ち葉", furigana: "おちば", meaning_en: "fallen leaves" },
      { word_id: "n2_1259", word_number: 1259, kanji: "照らす", furigana: "てらす", meaning_en: "light up" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 14 天気",
    page_story: "190_2",
    japanese_text: "航空機は進化し続けているが、<u>それでも</u> <u>霧</u>で<u>運休</u>になることがある。結局、人の目で確認しなければ、<u>正常な</u> <u>運行</u>は難しい。",
    english_translation: "Aircraft continue to evolve, but even so, flights are sometimes canceled due to fog. After all, it is difficult to operate aircraft normally without confirming with the human eye.",
    annotated_words: [
      { word_id: "n2_1260", word_number: 1260, kanji: "それでも", furigana: "", meaning_en: "even so" },
      { word_id: "n2_1261", word_number: 1261, kanji: "霧", furigana: "きり", meaning_en: "fog" },
      { word_id: "n2_1262", word_number: 1262, kanji: "運休[する]", furigana: "うんきゅう", meaning_en: "cancelation, cancel" },
      { word_id: "n2_1263", word_number: 1263, kanji: "正常な", furigana: "せいじょうな", meaning_en: "normal" },
      { word_id: "n2_1264", word_number: 1264, kanji: "運行[する]", furigana: "うんこう", meaning_en: "operation, operate" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 14 天気",
    page_story: "191_1",
    japanese_text: "梅雨の時期は、<u>衣類</u>が<u>湿気</u>を含みやすいため、<u>油断する</u>と、<u>たちまち</u>かびが生えてしまう。",
    english_translation: "During the rainy season, clothes are prone to dampness, and if you're not careful, they can quickly become moldy.",
    annotated_words: [
      { word_id: "n2_1265", word_number: 1265, kanji: "衣類", furigana: "いるい", meaning_en: "clothes" },
      { word_id: "n2_1266", word_number: 1266, kanji: "湿気", furigana: "しっけ", meaning_en: "dampness, moisture" },
      { word_id: "n2_1267", word_number: 1267, kanji: "しける", furigana: "", meaning_en: "get damp" },
      { word_id: "n2_1268", word_number: 1268, kanji: "油断[する]", furigana: "ゆだん", meaning_en: "negligence, be careless (not careful)" },
      { word_id: "n2_1269", word_number: 1269, kanji: "たちまち", furigana: "", meaning_en: "quickly, right away" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 14 天気",
    page_story: "191_2",
    japanese_text: "<u>降水確率</u>は「０％」と<u>表示されて</u>いても、絶対に雨が降らないというわけではない。<u>矛盾して</u>いるように思えるが、降水確率は四捨五入されるため、４％以下なら０％となるのである。",
    english_translation: "Even if the probability of rain is indicated as 0%, this doesn't mean it will never rain. This may seem contradictory, but the probability of rain is rounded down, so anything less than 4% is shown as 0%.",
    annotated_words: [
      { word_id: "n2_1270", word_number: 1270, kanji: "降水確率", furigana: "こうすいかくりつ", meaning_en: "probability of rain" },
      { word_id: "n2_1271", word_number: 1271, kanji: "降水量", furigana: "こうすいりょう", meaning_en: "amount of rainfall" },
      { word_id: "n2_1272", word_number: 1272, kanji: "表示[する]", furigana: "ひょうじ", meaning_en: "indication, display" },
      { word_id: "n2_1273", word_number: 1273, kanji: "矛盾[する]", furigana: "むじゅん", meaning_en: "contradiction, contradict" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 14 天気",
    page_story: "192_1",
    japanese_text: "<u>杉</u>の花粉は<u>例年</u>、２月半ばから飛び始める。<u>晴天</u>の日は、空を<u>見上げる</u>と、目に見えるほど花粉が多い日もある。",
    english_translation: "Every year, cedar pollen usually begins to fly around in mid-February. In sunny weather, when you look up at the sky, some days there is so much pollen you can see it.",
    annotated_words: [
      { word_id: "n2_1274", word_number: 1274, kanji: "杉", furigana: "すぎ", meaning_en: "cedar" },
      { word_id: "n2_1275", word_number: 1275, kanji: "例年", furigana: "れいねん", meaning_en: "every year, usual year" },
      { word_id: "n2_1276", word_number: 1276, kanji: "晴天", furigana: "せいてん", meaning_en: "sunny weather" },
      { word_id: "n2_1277", word_number: 1277, kanji: "見上げる", furigana: "みあげる", meaning_en: "look up" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 14 天気",
    page_story: "192_2",
    japanese_text: "やはり実家は<u>快適だ</u>。<u>夕焼け</u>を見ると、田舎に帰ってきたことを<u>実感する</u>。",
    english_translation: "Of course, I feel comfortable at my parents' house. When I watch the sunset, I really feel I've returned to the countryside.",
    annotated_words: [
      { word_id: "n2_1278", word_number: 1278, kanji: "快適な", furigana: "かいてきな", meaning_en: "comfortable, pleasant" },
      { word_id: "n2_1279", word_number: 1279, kanji: "夕焼け", furigana: "ゆうやけ", meaning_en: "sunset" },
      { word_id: "n2_1280", word_number: 1280, kanji: "実感[する]", furigana: "じっかん", meaning_en: "actual feeling, really feel" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 14 天気",
    page_story: "193_1",
    japanese_text: "「春の<u>嵐</u>」が、<u>急激な</u>風や雨を起こしやすいことからも分かるように、春は<u>四季</u>の中でもっとも天気が変わりやすい季節である。",
    english_translation: "Spring is the most changeable of the four seasons, as evidenced by the fact that spring storms tend to bring sudden winds and rain.",
    annotated_words: [
      { word_id: "n2_1281", word_number: 1281, kanji: "嵐", furigana: "あらし", meaning_en: "storm" },
      { word_id: "n2_1282", word_number: 1282, kanji: "急激な", furigana: "きゅうげきな", meaning_en: "sudden" },
      { word_id: "n2_1283", word_number: 1283, kanji: "四季", furigana: "しき", meaning_en: "four seasons" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 14 天気",
    page_story: "193_2",
    japanese_text: "雲のない晴れた日でも、<u>いきなり</u> <u>竜巻</u>のような風が起こることがある。これは「つむじ風」と呼ばれ、<u>天候</u>が安定しているときでも起こる。",
    english_translation: "Even on clear, cloudless days, a tornado-like wind can suddenly occur. This is called a whirlwind, and it can occur even when the weather is stable.",
    annotated_words: [
      { word_id: "n2_1284", word_number: 1284, kanji: "いきなり", furigana: "", meaning_en: "suddenly" },
      { word_id: "n2_1285", word_number: 1285, kanji: "竜巻", furigana: "たつまき", meaning_en: "tornado" },
      { word_id: "n2_1286", word_number: 1286, kanji: "天候", furigana: "てんこう", meaning_en: "weather" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 14 天気",
    page_story: "194_1",
    japanese_text: "A：<u>災害</u> <u>救助</u>マニュアルの<u>見本</u>が届いたので、チェックをお願いします。\nB：ああ、分かりました。このマニュアルが完成すれば、<u>緊急</u>時の対応もスムーズにできるようになりますね。",
    english_translation: "A: A sample of the Disaster Relief Manual has arrived, and I'd like you to check it. B: Understood. Once the manual is completed, we'll be able to respond more smoothly to emergencies.",
    annotated_words: [
      { word_id: "n2_1287", word_number: 1287, kanji: "災害", furigana: "さいがい", meaning_en: "disaster" },
      { word_id: "n2_1288", word_number: 1288, kanji: "救助[する]", furigana: "きゅうじょ", meaning_en: "relief, relieve" },
      { word_id: "n2_1289", word_number: 1289, kanji: "見本", furigana: "みほん", meaning_en: "sample" },
      { word_id: "n2_1290", word_number: 1290, kanji: "緊急", furigana: "きんきゅう", meaning_en: "emergency" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 14 天気",
    page_story: "194_2",
    japanese_text: "A：他に、登山に必要なものは？\nB：<u>雨具</u>。\nA：<u>レインコート</u>とか？\nB：そう。汗が<u>蒸発し</u>やすいものを買うといいよ。あと、<u>水筒</u>もいる。",
    english_translation: "A: What else do you need to go hiking? B: Wet weather gear. A: Like a raincoat? B: Right. You should get one that allows sweat to evaporate. You'll need a water bottle too.",
    annotated_words: [
      { word_id: "n2_1291", word_number: 1291, kanji: "雨具", furigana: "あまぐ", meaning_en: "wet weather gear" },
      { word_id: "n2_1292", word_number: 1292, kanji: "レインコート", furigana: "れいんこーと", meaning_en: "raincoat" },
      { word_id: "n2_1293", word_number: 1293, kanji: "かっぱ", furigana: "", meaning_en: "raincoat" },
      { word_id: "n2_1294", word_number: 1294, kanji: "蒸発[する]", furigana: "じょうはつ", meaning_en: "evaporation, evaporate" },
      { word_id: "n2_1295", word_number: 1295, kanji: "水筒", furigana: "すいとう", meaning_en: "water bottle" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 14 天気",
    page_story: "195_2",
    japanese_text: "<u>昨</u>晩は地震の後、津波警報が出た。<u>万が一</u>を考え、高いところに<u>避難した</u>。寒くて<u>凍え</u>そうだった。<u>夜明け</u>に警報が<u>解除され</u>、<u>静まった</u>町を歩き、家に帰った。",
    english_translation: "Last night, after the earthquake, there was a tsunami warning. I evacuated to an elevated location, just in case. It was so cold I thought I'd freeze. At dawn the warning was lifted, and I walked through the quiet town and went home.",
    annotated_words: [
      { word_id: "n2_1296", word_number: 1296, kanji: "昨〜", furigana: "さく", meaning_en: "last ~" },
      { word_id: "n2_1297", word_number: 1297, kanji: "万が一／万一", furigana: "まんがいち", meaning_en: "just in case, in the unlikely event of" },
      { word_id: "n2_1298", word_number: 1298, kanji: "避難[する]", furigana: "ひなん", meaning_en: "evacuation, evacuate" },
      { word_id: "n2_1299", word_number: 1299, kanji: "凍える", furigana: "こごえる", meaning_en: "freeze" },
      { word_id: "n2_1300", word_number: 1300, kanji: "夜明け", furigana: "よあけ", meaning_en: "dawn" },
      { word_id: "n2_1301", word_number: 1301, kanji: "解除[する]", furigana: "かいじょ", meaning_en: "release, lift" },
      { word_id: "n2_1302", word_number: 1302, kanji: "静まる", furigana: "しずまる", meaning_en: "be quiet" }
    ]
  }
];

topic14StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 14 story ${story.story_number}: ${story.page_story}.json`);
});
