import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic22StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 22 政治",
    page_story: "307_1",
    japanese_text: "A：<u>人種</u>や<u>民族</u>が違うから<u>差別する</u>なんて、ひどい話だよね。\nB：そうだね。今でも国家間の<u>外交</u>問題に繋がったり、<u>デモ</u>が起きたりしてるもんね。",
    english_translation: "A: Discriminating against people because of race or ethnicity is a terrible thing.\nB: Yes, it is. And even now, it leads to protests and diplomatic problems between nations.",
    annotated_words: [
      { word_id: "n2_2159", word_number: 2159, kanji: "人種", furigana: "じんしゅ", meaning_en: "race" },
      { word_id: "n2_2160", word_number: 2160, kanji: "民族", furigana: "みんぞく", meaning_en: "ethnicity" },
      { word_id: "n2_2161", word_number: 2161, kanji: "差別[する]", furigana: "さべつ", meaning_en: "discrimination, discriminate" },
      { word_id: "n2_2162", word_number: 2162, kanji: "外交", furigana: "がいこう", meaning_en: "diplomacy" },
      { word_id: "n2_2163", word_number: 2163, kanji: "外交官", furigana: "がいこうかん", meaning_en: "diplomat" },
      { word_id: "n2_2164", word_number: 2164, kanji: "デモ", furigana: "でも", meaning_en: "demonstration, protest" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 22 政治",
    page_story: "308_1",
    japanese_text: "全国の18歳以上を対象とした<u>世論</u>調査で、今の<u>憲法</u>を<u>改正する</u>必要があると思うかが、毎年問われている。",
    english_translation: "In the nationwide public opinion poll of people over the age of 18, people are asked whether they think the current Constitution needs to be amended.",
    annotated_words: [
      { word_id: "n2_2165", word_number: 2165, kanji: "世論", furigana: "よろん", meaning_en: "public opinion" },
      { word_id: "n2_2166", word_number: 2166, kanji: "憲法", furigana: "けんぽう", meaning_en: "constitution" },
      { word_id: "n2_2167", word_number: 2167, kanji: "改正[する]", furigana: "かいせい", meaning_en: "amendment, amend" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 22 政治",
    page_story: "308_2",
    japanese_text: "市の<u>議会</u>では市長や議員などが<u>議題</u>を提案する。<u>議長</u>は議員に対し議案に賛成、反対の意思表示を求める。原則として議員の<u>過半数</u>が賛成するか否かで結果が決まる。",
    english_translation: "At city council meetings, the mayor and council members propose the agenda. The chairperson asks the council members to indicate their approval or disapproval of the agenda. In principle, the result is determined by approval or disapproval of a majority of the council members.",
    annotated_words: [
      { word_id: "n2_2168", word_number: 2168, kanji: "議会", furigana: "ぎかい", meaning_en: "council meeting" },
      { word_id: "n2_2169", word_number: 2169, kanji: "議題", furigana: "ぎだい", meaning_en: "agenda, matter" },
      { word_id: "n2_2170", word_number: 2170, kanji: "議長", furigana: "ぎちょう", meaning_en: "chairperson" },
      { word_id: "n2_2171", word_number: 2171, kanji: "過半数", furigana: "かはんすう", meaning_en: "majority" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 22 政治",
    page_story: "309_1",
    japanese_text: "<u>先進国</u>の定義はさまざまだが、「ＧＤＰが１万ドル以上である国」という基準に<u>従えば</u>、世間一般的には<u>新興国</u>とされる国も、多くの国が先進国に分類される。",
    english_translation: "The definition of a developed country varies, but following the criterion of \"a country with a GDP of $10,000 or more,\" many countries end up classified as developed countries, even those that are generally considered emerging countries.",
    annotated_words: [
      { word_id: "n2_2172", word_number: 2172, kanji: "先進国", furigana: "せんしんこく", meaning_en: "developed country" },
      { word_id: "n2_2173", word_number: 2173, kanji: "従う", furigana: "したがう", meaning_en: "follow" },
      { word_id: "n2_2174", word_number: 2174, kanji: "新興国", furigana: "しんこうこく", meaning_en: "emerging country, developing country" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 22 政治",
    page_story: "309_2",
    japanese_text: "A：公務員が無免許運転で<u>捕まった</u>んだって。\nB：知ってる。７年も運転してたらしいよ。本当に<u>あきれた</u>話だよな。\nA：７年も！<u>相当</u>ひどいね。",
    english_translation: "A: I heard that a government employee was arrested for driving without a license.\nB: I know. I heard he's been driving like that for seven years. It's scandalous.\nA: Seven years! That's really quite bad.",
    annotated_words: [
      { word_id: "n2_2175", word_number: 2175, kanji: "捕まる", furigana: "つかまる", meaning_en: "be caught, be arrested" },
      { word_id: "n2_2176", word_number: 2176, kanji: "あきれる", furigana: "あきれる", meaning_en: "be scandalous, be outrageous" },
      { word_id: "n2_2177", word_number: 2177, kanji: "相当", furigana: "そうとう", meaning_en: "quite, considerably" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 22 政治",
    page_story: "310_1",
    japanese_text: "衆議院<u>解散</u>の前に実施された国民への意識調査では、自由民主党が現在最も<u>支持されて</u>いるという結果が出たと<u>報道された</u>。",
    english_translation: "It has been reported that a survey of public attitudes conducted prior to the dissolution of the House of Representatives showed that the Liberal Democratic Party currently enjoys the most support.",
    annotated_words: [
      { word_id: "n2_2178", word_number: 2178, kanji: "解散[する]", furigana: "かいさん", meaning_en: "dispersal, dissolve" },
      { word_id: "n2_2179", word_number: 2179, kanji: "支持[する]", furigana: "しじ", meaning_en: "support, support" },
      { word_id: "n2_2180", word_number: 2180, kanji: "支持率", furigana: "しじりつ", meaning_en: "support rate" },
      { word_id: "n2_2181", word_number: 2181, kanji: "報道[する]", furigana: "ほうどう", meaning_en: "reporting, report" }
    ]
  }
];

topic22StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 22 story ${story.story_number}: ${story.page_story}.json`);
});
