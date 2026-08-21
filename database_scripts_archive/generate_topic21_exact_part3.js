import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic21StoriesPart3 = [
  {
    is_story: true,
    story_number: 19,
    title: "Topic 21 社会",
    page_story: "303_1",
    japanese_text: "農業や<u>漁業</u>は<u>深刻な</u>人手不足が問題で、必要な<u>労働力</u>が外国人によって<u>補われている</u>。さらに、農業では<u>農村</u>の<u>発展</u>、<u>いわば</u>ＩＣＴの活用などが遅れていることも問題となっている。",
    english_translation: "The agriculture and fishing industries are facing serious labor shortages, and the required work force is being supplemented by foreign workers. Furthermore, in agriculture, development in farming communities—the use of ICT, so to speak—is lagging, which is also causing problems.",
    annotated_words: [
      { word_id: "n2_2128", word_number: 2128, kanji: "漁業", furigana: "ぎょぎょう", meaning_en: "fishing industry" },
      { word_id: "n2_2129", word_number: 2129, kanji: "深刻な", furigana: "しんこくな", meaning_en: "serious" },
      { word_id: "n2_2130", word_number: 2130, kanji: "労働力", furigana: "ろうどうりょく", meaning_en: "work force" },
      { word_id: "n2_2131", word_number: 2131, kanji: "労働[する]", furigana: "ろうどう", meaning_en: "labor, work" },
      { word_id: "n2_2132", word_number: 2132, kanji: "補う", furigana: "おぎなう", meaning_en: "cover, supplement" },
      { word_id: "n2_2133", word_number: 2133, kanji: "農村", furigana: "のうそん", meaning_en: "farming community" },
      { word_id: "n2_2134", word_number: 2134, kanji: "発展[する]", furigana: "はってん", meaning_en: "development, develop" },
      { word_id: "n2_2135", word_number: 2135, kanji: "いわば", furigana: "", meaning_en: "so to speak" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 21 社会",
    page_story: "304_1",
    japanese_text: "あの会社は、工場の<u>爆発</u>に対する<u>過失</u>を<u>認めて</u>いなかったが、<u>裁判</u>でようやく<u>決着</u>がついた。",
    english_translation: "The company never admitted fault for the explosion at the factory, but the matter was finally settled in court.",
    annotated_words: [
      { word_id: "n2_2136", word_number: 2136, kanji: "爆発[する]", furigana: "ばくはつ", meaning_en: "explosion, explode" },
      { word_id: "n2_2137", word_number: 2137, kanji: "過失", furigana: "かしつ", meaning_en: "fault, error" },
      { word_id: "n2_2138", word_number: 2138, kanji: "認める", furigana: "みとめる", meaning_en: "admit, recognize" },
      { word_id: "n2_2139", word_number: 2139, kanji: "裁判[する]", furigana: "さいばん", meaning_en: "court, judge" },
      { word_id: "n2_2140", word_number: 2140, kanji: "決着[する]", furigana: "けっちゃく", meaning_en: "resolution, settle" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 21 社会",
    page_story: "304_2",
    japanese_text: "部下は、人がまだ話をしていても、言葉を<u>かぶせて</u>しまうときがある。部下に<u>威張って</u>いると思われたくないが、<u>どうにか</u>してやめさせたい。どう伝えたらいいだろうか。",
    english_translation: "There's a guy who works for me who talks over other people while they're still speaking. I don't want him to think I'm overbearing, but I want to make him stop somehow. What should I say?",
    annotated_words: [
      { word_id: "n2_2141", word_number: 2141, kanji: "かぶせる", furigana: "かぶせる", meaning_en: "overlap, cover, go over (something)" },
      { word_id: "n2_2142", word_number: 2142, kanji: "威張る", furigana: "いばる", meaning_en: "be overbearing, throw one's weight around" },
      { word_id: "n2_2143", word_number: 2143, kanji: "どうにか", furigana: "", meaning_en: "somehow, in some way" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 21 社会",
    page_story: "305_1",
    japanese_text: "数多くの国がそうであったように、<u>近代</u>日本も、<u>既婚</u>者であることが良いとされていた。また、<u>性</u>役割、<u>すなわち</u>ジェンダーロールも固定されていた。ジェンダーロールは、今も<u>なお</u>存在し続けている。男性、女性に関係なく、<u>多様な</u>生き方が<u>受け入れら</u>れるようになってほしい。",
    english_translation: "In modern Japan, as in many other countries, being married has been considered a good thing. Also, expectations of gender—that is to say, gender roles—have been fixed. Gender roles still continue to exist today. It's my hope that more diverse lifestyles will become accepted, regardless of whether one is male or female.",
    annotated_words: [
      { word_id: "n2_2144", word_number: 2144, kanji: "近代", furigana: "きんだい", meaning_en: "modern times, present day" },
      { word_id: "n2_2145", word_number: 2145, kanji: "既婚", furigana: "きこん", meaning_en: "marriage" },
      { word_id: "n2_2146", word_number: 2146, kanji: "未婚", furigana: "みこん", meaning_en: "unmarried (not yet married) state" },
      { word_id: "n2_2147", word_number: 2147, kanji: "性", furigana: "せい", meaning_en: "sex, gender" },
      { word_id: "n2_2148", word_number: 2148, kanji: "すなわち", furigana: "", meaning_en: "that is to say" },
      { word_id: "n2_2149", word_number: 2149, kanji: "なお", furigana: "", meaning_en: "still" },
      { word_id: "n2_2150", word_number: 2150, kanji: "多様な", furigana: "たような", meaning_en: "diverse" },
      { word_id: "n2_2151", word_number: 2151, kanji: "受け入れる", furigana: "うけいれる", meaning_en: "accept" }
    ]
  },
  {
    is_story: true,
    story_number: 23,
    title: "Topic 21 社会",
    page_story: "306_1",
    japanese_text: "自分の<u>居場所</u>がないように感じてしまうと、<u>困難</u>に<u>遭った</u>とき、ＳＯＳの<u>合図</u>が出せなくなり、必要な<u>援助</u>を得ることもできなくなってしまう。<u>限界</u>を超えると、<u>自殺して</u>しまうこともある。",
    english_translation: "When people feel like there's nowhere they belong, they can be unable to send SOS signals when they encounter difficulties, which may prevent them from getting the help they need. And if they reach their limit, they could even commit suicide.",
    annotated_words: [
      { word_id: "n2_2152", word_number: 2152, kanji: "居場所", furigana: "いばしょ", meaning_en: "place where one belongs, place to be" },
      { word_id: "n2_2153", word_number: 2153, kanji: "困難な", furigana: "こんなんな", meaning_en: "difficult" },
      { word_id: "n2_2154", word_number: 2154, kanji: "遭う", furigana: "あう", meaning_en: "encounter" },
      { word_id: "n2_2155", word_number: 2155, kanji: "合図[する]", furigana: "あいず", meaning_en: "signal, signal" },
      { word_id: "n2_2156", word_number: 2156, kanji: "援助[する]", furigana: "えんじょ", meaning_en: "help, assist" },
      { word_id: "n2_2157", word_number: 2157, kanji: "限界", furigana: "げんかい", meaning_en: "limit" },
      { word_id: "n2_2158", word_number: 2158, kanji: "自殺[する]", furigana: "じさつ", meaning_en: "suicide, commit suicide" }
    ]
  }
];

topic21StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 21 story ${story.story_number}: ${story.page_story}.json`);
});
