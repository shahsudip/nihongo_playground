import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 13 Stories (Cities) - Part 2
const topic13StoriesPart2 = [
  {
    is_story: true,
    story_number: 6,
    title: "Topic 13 町",
    page_story: "176_1",
    japanese_text: "マンションの最上階に住んでいる。<u>防火</u> <u>性</u>を備えたカーテンやじゅうたんを購入しなければならなかったり、エレベーターがなかなか来なかったり、<u>やや</u> <u>不自由な</u>点はあるが、窓から下を<u>通行する</u>人を<u>見下ろす</u>のは気分がいい。",
    english_translation: "I live on the top floor of an apartment building. Although it can be a little inconvenient, since I have to buy curtains and carpets with fireproof properties and the elevator takes ages to come, it's a great feeling to look down from the window at people passing by below.",
    annotated_words: [
      { word_id: "n2_1134", word_number: 1134, kanji: "防火", furigana: "ぼうか", meaning_en: "fireproofing" },
      { word_id: "n2_1135", word_number: 1135, kanji: "〜性", furigana: "せい", meaning_en: "with ~ properties/qualities" },
      { word_id: "n2_1136", word_number: 1136, kanji: "やや", furigana: "", meaning_en: "a little, somewhat" },
      { word_id: "n2_1137", word_number: 1137, kanji: "不自由な", furigana: "ふじゆうな", meaning_en: "inconvenient" },
      { word_id: "n2_1138", word_number: 1138, kanji: "通行[する]", furigana: "つうこう", meaning_en: "passing traffic, pass by" },
      { word_id: "n2_1139", word_number: 1139, kanji: "通行止め", furigana: "つうこうどめ", meaning_en: "traffic closure, no thoroughfare" },
      { word_id: "n2_1140", word_number: 1140, kanji: "見下ろす", furigana: "みおろす", meaning_en: "look down" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 13 町",
    page_story: "176_2",
    japanese_text: "<u>地元</u>の<u>沼</u>の水辺や<u>野原</u>を自主<u>清掃する</u>グループ「掃除<u>隊</u>」に所属している。掃除の<u>最中</u>には<u>岸</u>に生える植物を楽しむことができる。",
    english_translation: "I'm a member of the \"cleaning squad,\" a volunteer group that cleans the marshland waterfronts and plains in my local area. Midway through the cleanup, we can enjoy the plants growing on the banks.",
    annotated_words: [
      { word_id: "n2_1141", word_number: 1141, kanji: "地元", furigana: "じもと", meaning_en: "local area" },
      { word_id: "n2_1142", word_number: 1142, kanji: "沼", furigana: "ぬま", meaning_en: "marshland, swamp" },
      { word_id: "n2_1143", word_number: 1143, kanji: "野原", furigana: "のはら", meaning_en: "field, plains" },
      { word_id: "n2_1144", word_number: 1144, kanji: "清掃[する]", furigana: "せいそう", meaning_en: "cleaning, clean" },
      { word_id: "n2_1145", word_number: 1145, kanji: "〜隊", furigana: "たい", meaning_en: "squad, team" },
      { word_id: "n2_1146", word_number: 1146, kanji: "最中", furigana: "さいちゅう", meaning_en: "midway" },
      { word_id: "n2_1147", word_number: 1147, kanji: "岸", furigana: "きし", meaning_en: "banks, shore" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 13 町",
    page_story: "177_2",
    japanese_text: "人間は<u>共同</u>生活を行う動物だが、最初の頃は<u>衣食住</u>に関係する活動にたくさんの時間を使っていた。しかし、<u>文明</u>が発達するにつれて、学問や芸術など、より<u>高等な</u>活動を行う時間が生まれた。",
    english_translation: "Humans are communal animals, but in the beginning we spent a lot of time on activities involving food, clothing, and shelter. However, as civilization developed, more time arose for advanced activities such as academic learning and the arts.",
    annotated_words: [
      { word_id: "n2_1148", word_number: 1148, kanji: "共同", furigana: "きょうどう", meaning_en: "cooperation, community" },
      { word_id: "n2_1149", word_number: 1149, kanji: "衣食住", furigana: "いしょくじゅう", meaning_en: "food, clothing, and shelter" },
      { word_id: "n2_1150", word_number: 1150, kanji: "文明", furigana: "ぶんめい", meaning_en: "civilization" },
      { word_id: "n2_1151", word_number: 1151, kanji: "高等な", furigana: "こうとうな", meaning_en: "advanced, higher" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 13 町",
    page_story: "178_1",
    japanese_text: "名古屋、東京<u>間</u>にリニア中央新幹線が<u>開通したら</u>、<u>直通</u>運転の場合、所要時間は最短40分らしい。そうなれば、<u>転勤</u>が減るかもしれない。",
    english_translation: "After the Linear Chuo Shinkansen line opens between Nagoya and Tokyo, apparently the minimum time required for a direct service will be 40 minutes. If that happens, there might be fewer work transfers.",
    annotated_words: [
      { word_id: "n2_1152", word_number: 1152, kanji: "〜間", furigana: "かん", meaning_en: "between ~" },
      { word_id: "n2_1153", word_number: 1153, kanji: "開通[する]", furigana: "かいつう", meaning_en: "opening, open" },
      { word_id: "n2_1154", word_number: 1154, kanji: "直通[する]", furigana: "ちょくつう", meaning_en: "direct service, run directly" },
      { word_id: "n2_1155", word_number: 1155, kanji: "転勤[する]", furigana: "てんきん", meaning_en: "work transfer, relocate" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 13 町",
    page_story: "178_2",
    japanese_text: "交通系<u>ICカード</u>の導入により、バスの<u>運賃</u>を<u>スマートに</u>支払うことができるようになった。以前は<u>遅延する</u>ことがあったが、今では<u>解消された</u>。",
    english_translation: "By introducing a transportation IC card, you can now pay bus fares in a contactless way. Previously there were times when buses were delayed, but that has now been eliminated.",
    annotated_words: [
      { word_id: "n2_1156", word_number: 1156, kanji: "ICカード", furigana: "あいしーかーど", meaning_en: "IC card" },
      { word_id: "n2_1157", word_number: 1157, kanji: "運賃", furigana: "うんちん", meaning_en: "fare" },
      { word_id: "n2_1158", word_number: 1158, kanji: "スマートな", furigana: "", meaning_en: "contactless" },
      { word_id: "n2_1159", word_number: 1159, kanji: "遅延[する]", furigana: "ちえん", meaning_en: "delay, be delayed" },
      { word_id: "n2_1160", word_number: 1160, kanji: "解消[する]", furigana: "かいしょう", meaning_en: "elimination, eliminate" }
    ]
  }
];

topic13StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 13 story ${story.story_number}: ${story.page_story}.json`);
});
