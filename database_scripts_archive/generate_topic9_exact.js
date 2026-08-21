import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 9 Stories (Annual Events)
const topic9Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 9 年中行事",
    page_story: "130_1",
    japanese_text: "新型コロナウイルスが広まったことで、多くの<u>年中行事</u>の規模が小さくなったり、<u>省略されたり</u>した。私の娘も2021年の<u>末</u>に結婚したが、結婚式は行わなかった。<u>おめでたい</u>ことなのに、残念だ。",
    english_translation: "The spread of COVID has led to many annual events being scaled back or skipped entirely. My daughter got married at the end of 2021, but we didn't have a wedding ceremony. It's a shame, because it was a joyful occasion.",
    annotated_words: [
      { word_id: "n2_0776", word_number: 776, kanji: "年中行事", furigana: "ねんちゅうぎょうじ", meaning_en: "annual event" },
      { word_id: "n2_0777", word_number: 777, kanji: "省略[する]", furigana: "しょうりゃく", meaning_en: "abbreviation, omit, skip" },
      { word_id: "n2_0778", word_number: 778, kanji: "末", furigana: "すえ", meaning_en: "end of" },
      { word_id: "n2_0779", word_number: 779, kanji: "(お)めでたい", furigana: "", meaning_en: "celebratory, joyful" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 9 年中行事",
    page_story: "131_1",
    japanese_text: "盆踊りはもともと、<u>先祖</u>の霊を迎える目的があった。今では、地元の人と<u>親交</u>を深める目的が強まり、<u>浴衣</u>を着て気軽に楽しむことができる。",
    english_translation: "Originally, the purpose of Bon festival dancing was to greet and welcome the spirits of ancestors. Nowadays, the purpose is more to deepen the friendship among locals, and people wear yukata (summer kimono) and enjoy it in a more carefree way.",
    annotated_words: [
      { word_id: "n2_0780", word_number: 780, kanji: "先祖", furigana: "せんぞ", meaning_en: "ancestor" },
      { word_id: "n2_0781", word_number: 781, kanji: "親交", furigana: "しんこう", meaning_en: "friendship" },
      { word_id: "n2_0782", word_number: 782, kanji: "浴衣", furigana: "ゆかた", meaning_en: "yukata (summer kimono)" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 9 年中行事",
    page_story: "131_2",
    japanese_text: "<u>縁起</u>を<u>担ぐ</u>ために、5時に<u>起床して</u>、<u>日の出</u>を見に行った。来年こそ、富士山に登って初日の出を<u>拝みたい</u>。",
    english_translation: "To bring me good luck, I got up at five o'clock and went to see the sunrise. Next year, I want to climb Mt. Fuji and join my hands in prayer at the first sunrise of the year.",
    annotated_words: [
      { word_id: "n2_0783", word_number: 783, kanji: "縁起", furigana: "えんぎ", meaning_en: "good luck" },
      { word_id: "n2_0784", word_number: 784, kanji: "担ぐ", furigana: "かつぐ", meaning_en: "bring, carry on shoulders" },
      { word_id: "n2_0785", word_number: 785, kanji: "起床[する]", furigana: "きしょう", meaning_en: "rising, get up, get out of bed" },
      { word_id: "n2_0786", word_number: 786, kanji: "日の出", furigana: "ひので", meaning_en: "sunrise" },
      { word_id: "n2_0787", word_number: 787, kanji: "日の入り", furigana: "ひのいり", meaning_en: "sunset" },
      { word_id: "n2_0788", word_number: 788, kanji: "拝む", furigana: "おがむ", meaning_en: "join hands in prayer, witness" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 9 年中行事",
    page_story: "132_1",
    japanese_text: "日本には、<u>大みそか</u>に寺で<u>鐘</u>をつき、<u>元旦</u>には神社へ<u>初詣</u>に行く人がいる。<u>信仰</u>心の強さは関係なく、これらの行事が文化として生活の一部になっているからだ。",
    english_translation: "In Japan, people ring bells at temples on New Year's Eve and go to shrines on New Year's Day for hatsumode (the first shrine visit of the new year). It doesn't matter how strong their religious beliefs are, these events have become part of their lives as Japanese culture.",
    annotated_words: [
      { word_id: "n2_0789", word_number: 789, kanji: "大みそか", furigana: "おおみそか", meaning_en: "New Year's Eve" },
      { word_id: "n2_0790", word_number: 790, kanji: "鐘", furigana: "かね", meaning_en: "bell" },
      { word_id: "n2_0791", word_number: 791, kanji: "元旦", furigana: "がんたん", meaning_en: "New Year's Day" },
      { word_id: "n2_0792", word_number: 792, kanji: "元日", furigana: "がんじつ", meaning_en: "New Year's morning" },
      { word_id: "n2_0793", word_number: 793, kanji: "初詣", furigana: "はつもうで", meaning_en: "hatsumode (the first shrine visit of the new year)" },
      { word_id: "n2_0794", word_number: 794, kanji: "信仰[する]", furigana: "しんこう", meaning_en: "religious belief" },
      { word_id: "n2_0795", word_number: 795, kanji: "信者", furigana: "しんじゃ", meaning_en: "religious believer" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 9 年中行事",
    page_story: "133_1",
    japanese_text: "毎年お花見はするのに、<u>梅</u>まつりには行ったことがない。3月<u>初旬</u>が見頃らしいので、<u>足を運んでみよう</u>。",
    english_translation: "I go cherry blossom viewing every year, but I've never been to an ume (Japanese plum) festival. The beginning of March is supposed to be the best time to see the plum blossoms, so I'll think I'll make my way to see them.",
    annotated_words: [
      { word_id: "n2_0796", word_number: 796, kanji: "梅", furigana: "うめ", meaning_en: "ume (Japanese plum)" },
      { word_id: "n2_0797", word_number: 797, kanji: "初旬", furigana: "しょじゅん", meaning_en: "beginning of" },
      { word_id: "n2_0798", word_number: 798, kanji: "足を運ぶ", furigana: "あしをはこぶ", meaning_en: "go, make one's way" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 9 年中行事",
    page_story: "133_2",
    japanese_text: "A：年の<u>暮れ</u>にお墓に<u>お参りし</u>たいから、子どもも一緒に連れて帰るね。\nB：分かった。入院してるおばあちゃんの<u>面会</u>も、そのとき行こうね。",
    english_translation: "A: I want to pay my respects at the grave at the end of the year, so I'll bring my child with me when I come back. B: Understood. Let's go together when I visit my grandmother in the hospital.",
    annotated_words: [
      { word_id: "n2_0799", word_number: 799, kanji: "暮れ", furigana: "くれ", meaning_en: "end of, close of" },
      { word_id: "n2_0800", word_number: 800, kanji: "お参り[する]", furigana: "おまいり", meaning_en: "visit, pay one's respects" },
      { word_id: "n2_0801", word_number: 801, kanji: "面会[する]", furigana: "めんかい", meaning_en: "meetup, visit" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 9 年中行事",
    page_story: "134_1",
    japanese_text: "日本の年中行事や祭りの多くが、昔の<u>農民</u>の生活とつながっている。日本の<u>国旗</u>は、農業に必要な陽の光、すなわち日の丸が<u>モチーフ</u>になっている。",
    english_translation: "Many of Japan's annual events and festivals are connected to how peasants lived in the past. Japan's national flag is based on the motif of the rising sun, which is essential for agriculture.",
    annotated_words: [
      { word_id: "n2_0802", word_number: 802, kanji: "農民", furigana: "のうみん", meaning_en: "farmer, peasant" },
      { word_id: "n2_0803", word_number: 803, kanji: "国旗", furigana: "こっき", meaning_en: "national flag" },
      { word_id: "n2_0804", word_number: 804, kanji: "モチーフ", furigana: "", meaning_en: "motif" }
    ]
  }
];

topic9Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 9 story ${story.story_number}: ${story.page_story}.json`);
});
