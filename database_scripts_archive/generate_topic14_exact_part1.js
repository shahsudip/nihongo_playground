import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 14 Stories (Weather) - Part 1
const topic14StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 14 天気",
    page_story: "183_1",
    japanese_text: "<u>ダム</u>は、川の上流で洪水が起きたときに、水を止めることができる。だが、水を<u>ためる</u>一方では、<u>溢れて</u>下流に<u>被害</u>を及ぼしてしまうため、<u>たまった</u>水は調節しながら流される。",
    english_translation: "When flooding occurs upstream, a dam can hold back the water. However, when water is stored up, it can overflow and cause damage downstream, so the buildup of water is usually channeled away as a regulated flow.",
    annotated_words: [
      { word_id: "n2_1194", word_number: 1194, kanji: "ダム", furigana: "だむ", meaning_en: "dam" },
      { word_id: "n2_1195", word_number: 1195, kanji: "ためる", furigana: "", meaning_en: "store up" },
      { word_id: "n2_1196", word_number: 1196, kanji: "溢れる", furigana: "あふれる", meaning_en: "overflow" },
      { word_id: "n2_1197", word_number: 1197, kanji: "被害", furigana: "ひがい", meaning_en: "damage, harm" },
      { word_id: "n2_1198", word_number: 1198, kanji: "たまる", furigana: "", meaning_en: "accumulate, build up" },
      { word_id: "n2_1199", word_number: 1199, kanji: "水たまり", furigana: "みずたまり", meaning_en: "accumulated water" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 14 天気",
    page_story: "184_1",
    japanese_text: "マラソン大会は、<u>あいにく</u>の<u>豪雨</u>で、<u>一昨年</u>と同じく翌日に延期された。もし明日も<u>相変わらず</u>雨なら、<u>再</u>延期はされず中止となる。",
    english_translation: "Unfortunately, the marathon was postponed to the following day due to heavy rain, just like the year before last. And if it rains the same tomorrow, the marathon will be canceled rather than postponed again.",
    annotated_words: [
      { word_id: "n2_1200", word_number: 1200, kanji: "あいにく", furigana: "", meaning_en: "unfortunately" },
      { word_id: "n2_1201", word_number: 1201, kanji: "豪雨", furigana: "ごうう", meaning_en: "heavy rain" },
      { word_id: "n2_1202", word_number: 1202, kanji: "一昨年", furigana: "いっさくねん", meaning_en: "the year before last" },
      { word_id: "n2_1203", word_number: 1203, kanji: "相変わらず", furigana: "あいかわらず", meaning_en: "the same, unchanged" },
      { word_id: "n2_1204", word_number: 1204, kanji: "再〜", furigana: "さい", meaning_en: "again, re~" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 14 天気",
    page_story: "184_2",
    japanese_text: "<u>紫外線</u>は太陽<u>光線</u>の一種であり、２月から夏にかけて<u>徐々に</u>増えていく。紫外線は<u>日焼け</u>やしみの原因になるが、<u>日光</u>を浴びなければ、ビタミンDが<u>不足して</u>しまう。",
    english_translation: "Ultraviolet rays are a type of solar radiation that gradually increases from February throughout summer. Although UV rays can cause sunburn and skin blotches, without exposure to sunlight, we would be deficient in vitamin D.",
    annotated_words: [
      { word_id: "n2_1205", word_number: 1205, kanji: "紫外線", furigana: "しがいせん", meaning_en: "ultraviolet ray" },
      { word_id: "n2_1206", word_number: 1206, kanji: "光線", furigana: "こうせん", meaning_en: "radiation, ray" },
      { word_id: "n2_1207", word_number: 1207, kanji: "徐々に", furigana: "じょじょに", meaning_en: "gradually" },
      { word_id: "n2_1208", word_number: 1208, kanji: "日焼け[する]", furigana: "ひやけ", meaning_en: "sunburn, get sunburned" },
      { word_id: "n2_1209", word_number: 1209, kanji: "日光", furigana: "にっこう", meaning_en: "sunlight" },
      { word_id: "n2_1210", word_number: 1210, kanji: "不足[する]", furigana: "ふそく", meaning_en: "deficiency, be deficient" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 14 天気",
    page_story: "185_2",
    japanese_text: "梅雨が<u>明け</u>、<u>猛暑日</u>が多くなる７月から８月にかけては、<u>熱中症</u>にかかる人が多い。<u>日中</u>はできるだけ<u>屋外</u>で過ごさず、エアコンの効いた<u>屋内</u>で<u>涼む</u>のが安全だ。",
    english_translation: "Many people suffer from heat stroke during July and August, after the rainy season has ended and the days are extremely hot (35°C or more). During daytime, it's safer to stay cool indoors with air conditioning and avoid spending time outdoors as much as possible.",
    annotated_words: [
      { word_id: "n2_1212", word_number: 1212, kanji: "明ける", furigana: "あける", meaning_en: "end" },
      { word_id: "n2_1213", word_number: 1213, kanji: "猛暑日", furigana: "もうしょび", meaning_en: "extremely hot day (35°C or more)" },
      { word_id: "n2_1214", word_number: 1214, kanji: "猛暑", furigana: "もうしょ", meaning_en: "intense heat" },
      { word_id: "n2_1215", word_number: 1215, kanji: "熱中症", furigana: "ねっちゅうしょう", meaning_en: "heat stroke" },
      { word_id: "n2_1216", word_number: 1216, kanji: "日中", furigana: "にっちゅう", meaning_en: "during daytime" },
      { word_id: "n2_1217", word_number: 1217, kanji: "屋外", furigana: "おくがい", meaning_en: "outdoors" },
      { word_id: "n2_1218", word_number: 1218, kanji: "屋内", furigana: "おくない", meaning_en: "indoors" },
      { word_id: "n2_1219", word_number: 1219, kanji: "涼む", furigana: "すずむ", meaning_en: "cool off, stay cool" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 14 天気",
    page_story: "186_1",
    japanese_text: "鹿児島県の桜島は、よくニュースなどで<u>蒸気</u>が上がっている姿を見るが、一年で千回以上<u>噴火する</u>こともある比較的不安定な火山である。噴火で出た灰が、家や畑の<u>作物</u>を<u>覆って</u>しまうこともよくあるそうだ。鹿児島の人に「噴火は日常の<u>一部分</u>ですよ」と言われたが、私にはよく分からない<u>感覚</u>である。",
    english_translation: "Mount Sakurajima in Kagoshima Prefecture is a relatively unstable volcano that erupts over a thousand times a year, frequently pictured on the news with rising plumes of steam. Ash from its eruptions often covers houses and crops in the fields. Someone from Kagoshima once told me, \"Eruptions are part of everyday life,\" but I'll never really understand that feeling.",
    annotated_words: [
      { word_id: "n2_1220", word_number: 1220, kanji: "(水)蒸気", furigana: "じょうき", meaning_en: "steam" },
      { word_id: "n2_1221", word_number: 1221, kanji: "噴火[する]", furigana: "ふんか", meaning_en: "eruption, erupt" },
      { word_id: "n2_1222", word_number: 1222, kanji: "作物", furigana: "さくもつ", meaning_en: "crops" },
      { word_id: "n2_1223", word_number: 1223, kanji: "覆う", furigana: "おおう", meaning_en: "cover" },
      { word_id: "n2_1224", word_number: 1224, kanji: "一部分", furigana: "いちぶぶん", meaning_en: "part, section" },
      { word_id: "n2_1225", word_number: 1225, kanji: "感覚", furigana: "かんかく", meaning_en: "feeling" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 14 天気",
    page_story: "186_2",
    japanese_text: "日本の家によく見られる<u>雨戸</u>は、<u>暴風雨</u>や<u>日差し</u>を防ぐ役割を果たす。",
    english_translation: "Storm shutters, which are common in Japanese homes, serve to protect against rainstorms and sunlight.",
    annotated_words: [
      { word_id: "n2_1226", word_number: 1226, kanji: "雨戸", furigana: "あまど", meaning_en: "storm shutters" },
      { word_id: "n2_1227", word_number: 1227, kanji: "暴風雨", furigana: "ぼうふうう", meaning_en: "rainstorm" },
      { word_id: "n2_1228", word_number: 1228, kanji: "日差し", furigana: "ひざし", meaning_en: "sunlight" }
    ]
  }
];

topic14StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 14 story ${story.story_number}: ${story.page_story}.json`);
});
