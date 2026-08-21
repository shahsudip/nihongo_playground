import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 13 Stories (Cities) - Part 3
const topic13StoriesPart3 = [
  {
    is_story: true,
    story_number: 11,
    title: "Topic 13 町",
    page_story: "179_1",
    japanese_text: "<u>自宅</u>前の生活道路は速度制限の<u>標識</u>がない。生活道路の最高速度は<u>時速</u>30kmに指定されているが、標識がないのをいいことに、深夜は猛スピードで車が通るため、危険なだけではなく、<u>騒音</u>にも悩まされている。<u>非常識な</u>人がいて困ったものだ。",
    english_translation: "The road in front of my house isn't marked with a speed limit sign. The maximum road speed is 30 km/h, but because there's no sign, cars pass by at breakneck speeds late at night, which is not only dangerous but also noisy. Thoughtless people are causing me a lot of trouble.",
    annotated_words: [
      { word_id: "n2_1161", word_number: 1161, kanji: "自宅", furigana: "じたく", meaning_en: "one's house, home" },
      { word_id: "n2_1162", word_number: 1162, kanji: "標識", furigana: "ひょうしき", meaning_en: "sign" },
      { word_id: "n2_1163", word_number: 1163, kanji: "時速", furigana: "じそく", meaning_en: "speed per hour, ~/h" },
      { word_id: "n2_1164", word_number: 1164, kanji: "分速", furigana: "ふんそく", meaning_en: "speed per minute, ~/m" },
      { word_id: "n2_1165", word_number: 1165, kanji: "秒速", furigana: "びょうそく", meaning_en: "speed per second, ~/s" },
      { word_id: "n2_1166", word_number: 1166, kanji: "騒音", furigana: "そうおん", meaning_en: "(undesirable) noise" },
      { word_id: "n2_1167", word_number: 1167, kanji: "非常識な", furigana: "ひじょうしきな", meaning_en: "thoughtless, lacking common sense" },
      { word_id: "n2_1168", word_number: 1168, kanji: "常識的な", furigana: "じょうしきてきな", meaning_en: "commonsensical" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 13 町",
    page_story: "180_1",
    japanese_text: "最近は、<u>敷地</u>と道路の<u>境</u>に<u>垣根</u>などを作らない家が多いので、近所の子どもに<u>うろうろされ</u>たり、見ず知らずの車に<u>無断</u>で<u>Uターン</u>に使われたりすることがあります。そのようなことを防ぐため、境界に<u>鎖</u>がついたポールを置いた方がいいでしょう。",
    english_translation: "These days, many houses don't have fences on the boundary between their property and the road, so neighborhood children can loiter about and strange cars can use their property to make unauthorized U-turns. To prevent this, it's a good idea to install poles with a chain attached to mark your boundary.",
    annotated_words: [
      { word_id: "n2_1169", word_number: 1169, kanji: "敷地", furigana: "しきち", meaning_en: "property, site" },
      { word_id: "n2_1170", word_number: 1170, kanji: "境", furigana: "さかい", meaning_en: "boundary" },
      { word_id: "n2_1171", word_number: 1171, kanji: "垣根", furigana: "かきね", meaning_en: "fence, hedge" },
      { word_id: "n2_1172", word_number: 1172, kanji: "うろうろする", furigana: "", meaning_en: "loiter, wander" },
      { word_id: "n2_1173", word_number: 1173, kanji: "無断", furigana: "むだん", meaning_en: "unauthorized" },
      { word_id: "n2_1174", word_number: 1174, kanji: "Uターン[する]", furigana: "ゆーたーん", meaning_en: "U-turn, make a U-turn" },
      { word_id: "n2_1175", word_number: 1175, kanji: "鎖", furigana: "くさり", meaning_en: "chain" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 13 町",
    page_story: "180_2",
    japanese_text: "<u>でこぼこした</u>道を自転車で走っていたら、<u>カーブ</u>を曲がるときに転倒してしまった。<u>大した</u>けがもせず、<u>運</u>が良かったと思ったが、ペダルをこぐと変な音がする。<u>パンクした</u>ようだ。どうしようかと<u>あれこれ</u>考えたが、自転車を押して帰る以外に<u>手段</u>はない。",
    english_translation: "I was riding my bicycle along a bumpy road and as I took a curve, I fell over. Luckily, I was not seriously injured, but as I pedaled, I heard a strange sound. It seemed I had a puncture. I thought about doing one thing or another, but in the end, walking my bicycle home was the only way.",
    annotated_words: [
      { word_id: "n2_1176", word_number: 1176, kanji: "でこぼこ[する]", furigana: "", meaning_en: "irregularity, be bumpy" },
      { word_id: "n2_1177", word_number: 1177, kanji: "カーブ[する]", furigana: "", meaning_en: "curve, take a curve" },
      { word_id: "n2_1178", word_number: 1178, kanji: "大した", furigana: "たいした", meaning_en: "serious" },
      { word_id: "n2_1179", word_number: 1179, kanji: "運", furigana: "うん", meaning_en: "luck, fortune" },
      { word_id: "n2_1180", word_number: 1180, kanji: "パンク[する]", furigana: "", meaning_en: "puncture" },
      { word_id: "n2_1181", word_number: 1181, kanji: "あれこれ(と)", furigana: "", meaning_en: "one thing or another" },
      { word_id: "n2_1182", word_number: 1182, kanji: "手段", furigana: "しゅだん", meaning_en: "means, way" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 13 町",
    page_story: "181_2",
    japanese_text: "A：すみません、テレビ<u>局</u>に行きたいんですが…。\nB：ああ、ジャパンテレビでしたら、この大通り<u>沿い</u>ですよ。あそこに見えてる東京<u>タワー</u>が、だいたい<u>中間</u>地点です。",
    english_translation: "A: Excuse me, I'm trying to get to the TV station ... B: Oh, if you mean Japan TV, it's along this main road. You see Tokyo Tower over there? It's about midway between here and there.",
    annotated_words: [
      { word_id: "n2_1183", word_number: 1183, kanji: "局", furigana: "きょく", meaning_en: "station" },
      { word_id: "n2_1184", word_number: 1184, kanji: "沿い", furigana: "ぞい", meaning_en: "along" },
      { word_id: "n2_1185", word_number: 1185, kanji: "タワー", furigana: "", meaning_en: "tower" },
      { word_id: "n2_1186", word_number: 1186, kanji: "中間", furigana: "ちゅうかん", meaning_en: "center, midway" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 13 町",
    page_story: "182_1",
    japanese_text: "私たち<u>一家</u>が引っ越してきたのは、おいしいお米がよくとれることが<u>特色</u>の、<u>田んぼ</u>の多い地域だ。バスが一日に２本しか走っていないので交通の<u>便</u>は悪いが、乗り遅れそうになったらすぐに止まってくれる。人が少ないというのも<u>案外</u> <u>気楽で</u>、田舎も住めば<u>都</u>だ。",
    english_translation: "As a family, we moved to an area with many rice paddies; a feature of the area is its delicious rice. Access isn't convenient, since there are only two buses a day, but if you're about to miss the bus, it always stops for you. Contrary to expectation, because so few people live here the countryside is a really easygoing place to live. Home is where you make it.",
    annotated_words: [
      { word_id: "n2_1187", word_number: 1187, kanji: "一家", furigana: "いっか", meaning_en: "family" },
      { word_id: "n2_1188", word_number: 1188, kanji: "特色", furigana: "とくしょく", meaning_en: "characteristic, feature" },
      { word_id: "n2_1189", word_number: 1189, kanji: "田んぼ", furigana: "たんぼ", meaning_en: "rice paddy" },
      { word_id: "n2_1190", word_number: 1190, kanji: "便", furigana: "べん", meaning_en: "convenience" },
      { word_id: "n2_1191", word_number: 1191, kanji: "案外", furigana: "あんがい", meaning_en: "contrary to expectation" },
      { word_id: "n2_1192", word_number: 1192, kanji: "気楽な", furigana: "きらくな", meaning_en: "easygoing" },
      { word_id: "n2_1193", word_number: 1193, kanji: "都", furigana: "みやこ", meaning_en: "city, metropolis" }
    ]
  }
];

topic13StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 13 story ${story.story_number}: ${story.page_story}.json`);
});
