import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic23StoriesPart2 = [
  {
    is_story: true,
    story_number: 6,
    title: "Topic 23 環境・科学",
    page_story: "320_1",
    japanese_text: "A：ねえ、この記事見て。1891年に<u>統計</u>が始まって以来、二酸化炭素<u>濃度</u>が高まるのに<u>比例して</u>、世界の平均気温が2021年までに約0.95度も上がったんだって。\nB：そうなんだ。確かにこの<u>図表</u>を見てもはっきりと分かるね。\nA：この研究所もパリ協定に<u>基づいた</u>目標を掲げて、<u>翌年</u>以降の<u>達成</u>を目指してるよ。",
    english_translation: "A: Hey, look at this article. It says that since statistics were first collected in 1891, the world's average temperature has risen by about 0.95°C by 2021, proportionally to the increase in concentration of carbon dioxide.\nB: I see. That's certainly clear looking at this diagram.\nA: This research institute has also declared goals based on the Paris Agreement, and aims to achieve them from the following year.",
    annotated_words: [
      { word_id: "n2_2254", word_number: 2254, kanji: "統計", furigana: "とうけい", meaning_en: "statistics" },
      { word_id: "n2_2255", word_number: 2255, kanji: "濃度", furigana: "のうど", meaning_en: "concentration, density" },
      { word_id: "n2_2256", word_number: 2256, kanji: "比例[する]", furigana: "ひれい", meaning_en: "proportion, be proportional to" },
      { word_id: "n2_2257", word_number: 2257, kanji: "図表", furigana: "ずひょう", meaning_en: "diagram" },
      { word_id: "n2_2258", word_number: 2258, kanji: "基づく", furigana: "もとづく", meaning_en: "base" },
      { word_id: "n2_2259", word_number: 2259, kanji: "翌年", furigana: "よくねん", meaning_en: "following year" },
      { word_id: "n2_2260", word_number: 2260, kanji: "達成[する]", furigana: "たっせい", meaning_en: "accomplishment, achieve" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 23 環境・科学",
    page_story: "321_1",
    japanese_text: "A：ねえ、聞いた？例の地域の<u>水質</u>調査結果。検査<u>機関</u>によると汚染物質の濃度が平均より<u>およそ</u>５倍も高かったんだって。一応は<u>基準</u>値<u>未満</u>だったみたいだけど。\nB：それはびっくりだね。\nA：基準値未満とは言え、この<u>事実</u>をどう<u>解釈する</u>かが重要だね。今後は汚染物質を<u>薄める</u>ための対策をとらないと。",
    english_translation: "A: Hey, did you hear about the results of the water quality survey in the sample area? According to the survey agency, the concentration of pollutants was approximately five times higher than average. Although it seems to be below the standard value.\nB: That's surprising.\nA: Although it is below the standard value, it's important how we interpret this fact. In the future, we need to take measures to dilute the pollutants.",
    annotated_words: [
      { word_id: "n2_2261", word_number: 2261, kanji: "水質", furigana: "すいしつ", meaning_en: "water quality" },
      { word_id: "n2_2262", word_number: 2262, kanji: "機関", furigana: "きかん", meaning_en: "agency, institute" },
      { word_id: "n2_2263", word_number: 2263, kanji: "およそ", furigana: "およそ", meaning_en: "approximately" },
      { word_id: "n2_2264", word_number: 2264, kanji: "基準", furigana: "きじゅん", meaning_en: "standard" },
      { word_id: "n2_2265", word_number: 2265, kanji: "～未満", furigana: "みまん", meaning_en: "below ~" },
      { word_id: "n2_2266", word_number: 2266, kanji: "事実", furigana: "じじつ", meaning_en: "fact" },
      { word_id: "n2_2267", word_number: 2267, kanji: "解釈[する]", furigana: "かいしゃく", meaning_en: "interpretation, interpret" },
      { word_id: "n2_2268", word_number: 2268, kanji: "薄める", furigana: "うすめる", meaning_en: "dilute, weaken" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 23 環境・科学",
    page_story: "322_1",
    japanese_text: "彼は幼い頃から毎日琵琶湖に通っては<u>顕微鏡</u>を覗き続けた。周りに<u>けなされたり</u>、からかわれたりしても、<u>めげずに</u>努力を重ね、ついに世界的なプランクトンの研究者になった。",
    english_translation: "Ever since he was a child, he'd go to Lake Biwa every day and observe things through a microscope. People ridiculed and teased him, but he never got discouraged, and he finally became a world-renowned plankton researcher.",
    annotated_words: [
      { word_id: "n2_2269", word_number: 2269, kanji: "顕微鏡", furigana: "けんびきょう", meaning_en: "microscope" },
      { word_id: "n2_2270", word_number: 2270, kanji: "けなす", furigana: "けなす", meaning_en: "ridicule" },
      { word_id: "n2_2271", word_number: 2271, kanji: "めげる", furigana: "めげる", meaning_en: "be discouraged" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 23 環境・科学",
    page_story: "322_2",
    japanese_text: "A：あの、この大きな<u>装置</u>は何ですか？\nB：顕微鏡だよ。よかったら覗いてみる？\nA：はい。…わあ、<u>大小</u>さまざまなプランクトンが<u>無数に</u>いますね。どれも<u>ユニークな</u>形をしてるなあ。\nB：でしょう。そっちの引き出しにはプランクトンの<u>標本</u>がたくさん入ってるよ。",
    english_translation: "A: What is this large device?\nB: It's a microscope. Would you like to take a look through it?\nA: Yes. Wow, there are countless plankton of all sizes. They all have such unique shapes.\nB: That's right. That drawer contains many specimens of plankton.",
    annotated_words: [
      { word_id: "n2_2272", word_number: 2272, kanji: "装置", furigana: "そうち", meaning_en: "device, apparatus" },
      { word_id: "n2_2273", word_number: 2273, kanji: "大小", furigana: "だいしょう", meaning_en: "all sizes" },
      { word_id: "n2_2274", word_number: 2274, kanji: "無数な", furigana: "むすうな", meaning_en: "countless" },
      { word_id: "n2_2275", word_number: 2275, kanji: "ユニークな", furigana: "ゆにーくな", meaning_en: "unique" },
      { word_id: "n2_2276", word_number: 2276, kanji: "標本", furigana: "ひょうほん", meaning_en: "specimen" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 23 環境・科学",
    page_story: "323_1",
    japanese_text: "A：猫は<u>固体</u>か液体かってテーマで<u>論じた</u>ものがあるんだ。見方によっては、猫は液体だって<u>証明して</u>てね。なんとあのイグ・ノーベル賞をとったんだよ！\nB：その研究俺も知ってる。まさに<u>学問</u>は<u>疑う</u>ことから始まるって感じだよね。",
    english_translation: "A: There's a paper that argues the subject of whether cats are solid or liquid. And it proves that, depending on how you look at it, cats are liquid. It even won the Ig Nobel Prize!\nB: Oh, I heard about that research. It seems to me that learning begins with doubting.",
    annotated_words: [
      { word_id: "n2_2277", word_number: 2277, kanji: "固体", furigana: "こたい", meaning_en: "solid" },
      { word_id: "n2_2278", word_number: 2278, kanji: "論じる／論ずる", furigana: "ろんじる", meaning_en: "argue" },
      { word_id: "n2_2279", word_number: 2279, kanji: "証明[する]", furigana: "しょうめい", meaning_en: "proof, prove" },
      { word_id: "n2_2280", word_number: 2280, kanji: "証明書", furigana: "しょうめいしょ", meaning_en: "certificate" },
      { word_id: "n2_2281", word_number: 2281, kanji: "学問", furigana: "がくもん", meaning_en: "learning" },
      { word_id: "n2_2282", word_number: 2282, kanji: "疑う", furigana: "うたがう", meaning_en: "doubt" },
      { word_id: "n2_2283", word_number: 2283, kanji: "疑い", furigana: "うたがい", meaning_en: "doubt" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 23 環境・科学",
    page_story: "324_1",
    japanese_text: "この地域では以前、汚染された魚を住民が食べたことで病気になるという<u>大規模な</u> <u>公害</u>が起こった。<u>やがて</u>その地域において伝染病が広まっていると<u>でたらめな</u>ことを言う人が現れ、混乱が<u>生じる</u>結果となった。",
    english_translation: "In the past, there was a large-scale incident of environmental pollution in the area, in which residents became ill after eating contaminated fish. Eventually, some people started making nonsensical claims that an epidemic was spreading in the area, causing confusion to arise.",
    annotated_words: [
      { word_id: "n2_2284", word_number: 2284, kanji: "大規模な", furigana: "だいきぼな", meaning_en: "large-scale" },
      { word_id: "n2_2285", word_number: 2285, kanji: "小規模な", furigana: "しょうきぼな", meaning_en: "small-scale" },
      { word_id: "n2_2286", word_number: 2286, kanji: "公害", furigana: "こうがい", meaning_en: "environmental pollution" },
      { word_id: "n2_2287", word_number: 2287, kanji: "やがて", furigana: "やがて", meaning_en: "eventually" },
      { word_id: "n2_2288", word_number: 2288, kanji: "でたらめな", furigana: "でたらめな", meaning_en: "nonsensical, baseless" },
      { word_id: "n2_2289", word_number: 2289, kanji: "生じる／生ずる", furigana: "しょうじる", meaning_en: "arise, occur" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 23 環境・科学",
    page_story: "324_2",
    japanese_text: "地球温暖化に対し、我々が<u>直ちに</u>できることとしてエアコンの温度管理がある。設定温度を管理することで<u>省エネ</u>を目指し、発電所から出る二酸化炭素排出量を減らすのである。<u>具体的に</u>は、冷房は<u>室温</u>28度、暖房は20度に設定するのが目安である。",
    english_translation: "One thing we can do right now to combat global warming is adjust the air conditioning temperature. By controlling the temperature settings, we aim to conserve energy and reduce carbon dioxide emissions from power plants. Specifically, the standard room temperature for air-conditioning should be set at 28°C when cooling and 20°C when heating.",
    annotated_words: [
      { word_id: "n2_2290", word_number: 2290, kanji: "直ちに", furigana: "ただちに", meaning_en: "immediately, right now" },
      { word_id: "n2_2291", word_number: 2291, kanji: "省エネ（ルギー）", furigana: "しょうえね", meaning_en: "energy conservation" },
      { word_id: "n2_2292", word_number: 2292, kanji: "具体的な", furigana: "ぐたいてきな", meaning_en: "specific, concrete" },
      { word_id: "n2_2293", word_number: 2293, kanji: "抽象的な", furigana: "ちゅうしょうてきな", meaning_en: "abstract" },
      { word_id: "n2_2294", word_number: 2294, kanji: "室温", furigana: "しつおん", meaning_en: "room temperature" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 23 環境・科学",
    page_story: "325_2",
    japanese_text: "A：あ、この池アカミミガメがいるね。こんな身近な池にもいるなんて。\nB：カメなんてどの池にもいるじゃん。\nA：あのアカミミガメは<u>外来</u>種で、<u>原産</u>はアメリカなんだよ。\nB：えっ、そうなんだ。日本のカメだと<u>思い込んで</u>いたよ。",
    english_translation: "A: Hey, there are pond slider turtles in this pond. I can't believe they're in a local pond like this.\nB: You can find turtles in every pond.\nA: But the pond slider is a non-native species, originating from the United States.\nB: Oh, really? I'd assumed they were Japanese turtles.",
    annotated_words: [
      { word_id: "n2_2295", word_number: 2295, kanji: "外来", furigana: "がいらい", meaning_en: "imported, non-native" },
      { word_id: "n2_2296", word_number: 2296, kanji: "原産", furigana: "げんさん", meaning_en: "origin (place of origin)" },
      { word_id: "n2_2297", word_number: 2297, kanji: "思い込む", furigana: "おもいこむ", meaning_en: "assume" }
    ]
  }
];

topic23StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 23 story ${story.story_number}: ${story.page_story}.json`);
});
