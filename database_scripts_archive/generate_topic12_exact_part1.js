import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 12 Stories (Housing) - Part 1
const topic12StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 12 住",
    page_story: "161_1",
    japanese_text: "A：ねえ、<u>蛇口</u>から水が<u>漏れて</u>る。\nB：ここは寒い地域だから、凍らないようにわざと水を出してるんだ。<u>あと</u>、<u>下水</u>に続く<u>パイプ</u>の中で水が凍ることもあるんだよ。",
    english_translation: "A: Hey, water is leaking from the faucet. B: It's cold around here, so I let the water out so it doesn't freeze. Also, sometimes water freezes in the pipes leading to the sewers.",
    annotated_words: [
      { word_id: "n2_1018", word_number: 1018, kanji: "蛇口", furigana: "じゃぐち", meaning_en: "faucet" },
      { word_id: "n2_1019", word_number: 1019, kanji: "漏れる", furigana: "もれる", meaning_en: "leak" },
      { word_id: "n2_1020", word_number: 1020, kanji: "漏らす", furigana: "もらす", meaning_en: "discharge" },
      { word_id: "n2_1021", word_number: 1021, kanji: "あと", furigana: "", meaning_en: "also" },
      { word_id: "n2_1022", word_number: 1022, kanji: "下水", furigana: "げすい", meaning_en: "sewer, wastewater" },
      { word_id: "n2_1023", word_number: 1023, kanji: "パイプ", furigana: "", meaning_en: "pipe" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 12 住",
    page_story: "162_1",
    japanese_text: "夏は、家の<u>周辺</u>に水を<u>まく</u>、いわゆる打ち水をするのが<u>我が家</u>のルールである。朝打ち水をすることで、地面の熱が<u>地上</u>に逃げやすくなり、暑さ対策になる。",
    english_translation: "In summer, sprinkling water around the house's surroundings is a rule in my home. After water is sprinkled in the morning, heat from the ground can more easily escape, which is a good way to combat the heat.",
    annotated_words: [
      { word_id: "n2_1024", word_number: 1024, kanji: "周辺", furigana: "しゅうへん", meaning_en: "surroundings" },
      { word_id: "n2_1025", word_number: 1025, kanji: "まく", furigana: "", meaning_en: "sprinkle water, water (plants)" },
      { word_id: "n2_1026", word_number: 1026, kanji: "我が家", furigana: "わがや", meaning_en: "my home, our house" },
      { word_id: "n2_1027", word_number: 1027, kanji: "地上", furigana: "ちじょう", meaning_en: "ground" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 12 住",
    page_story: "162_2",
    japanese_text: "A：このテーブル傾いてない？\nB：あ、分かっちゃった？ 自分で作ったんだけど、板と脚を<u>垂直に</u> <u>固定する</u>のが難しくて…。\nA：なるほど。一度ばらばらにして、脚の長さを<u>統一した</u>方がいいかもね。板が<u>水平</u>になっているかは、スマホアプリで簡単に調べられるよ。",
    english_translation: "A: Is this table tilted? B: Oh, did you notice? I made it myself, but I had trouble fixing the tabletop and legs in place perpendicularly ... A: I see. Maybe you should take it apart and make the legs uniform in length. You can easily check if the tabletop is level using a smartphone app.",
    annotated_words: [
      { word_id: "n2_1028", word_number: 1028, kanji: "垂直", furigana: "すいちょく", meaning_en: "perpendicularity, verticality" },
      { word_id: "n2_1029", word_number: 1029, kanji: "平行", furigana: "へいこう", meaning_en: "parallel" },
      { word_id: "n2_1030", word_number: 1030, kanji: "固定[する]", furigana: "こてい", meaning_en: "immobilization, fix in place" },
      { word_id: "n2_1031", word_number: 1031, kanji: "統一[する]", furigana: "とういつ", meaning_en: "standardization, unify, make uniform" },
      { word_id: "n2_1032", word_number: 1032, kanji: "水平", furigana: "すいへい", meaning_en: "level" },
      { word_id: "n2_1033", word_number: 1033, kanji: "水平線", furigana: "すいへいせん", meaning_en: "horizon, horizontal line" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 12 住",
    page_story: "163_2",
    japanese_text: "この辺りは<u>都心</u>への通勤に<u>最適な</u>距離であるため<u>一見</u>住みやすそうだが、飛行機が飛び交い<u>騒々しい</u>ことに加え、<u>地盤</u>が沈んで道路が崩れる事件が起きたため、一人また一人と<u>去って</u>いく人が増えている。",
    english_translation: "At first glance, this area seems to be a nice place to live, since it's within the optimum commuting distance to the city center, but in addition to the noisy airplanes flying overhead, because the ground is subsiding and roads are collapsing, more people are leaving, one after another.",
    annotated_words: [
      { word_id: "n2_1034", word_number: 1034, kanji: "都心", furigana: "としん", meaning_en: "city center" },
      { word_id: "n2_1035", word_number: 1035, kanji: "最適な", furigana: "さいてきな", meaning_en: "ideal, optimum" },
      { word_id: "n2_1036", word_number: 1036, kanji: "一見", furigana: "いっけん", meaning_en: "at a glance, at first glance" },
      { word_id: "n2_1037", word_number: 1037, kanji: "騒々しい", furigana: "そうぞうしい", meaning_en: "noisy" },
      { word_id: "n2_1038", word_number: 1038, kanji: "地盤", furigana: "じばん", meaning_en: "ground" },
      { word_id: "n2_1039", word_number: 1039, kanji: "去る", furigana: "さる", meaning_en: "leave" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 12 住",
    page_story: "164_1",
    japanese_text: "A：<u>別荘</u>って、ミステリーでは<u>典型的な</u> <u>悲劇</u>の舞台になるよね。\nB：そうそう。玄関はもちろん<u>裏口</u>は開かないし、<u>書斎</u>にこもれば犯人に狙われるし。\nA：そして、決まって犯人は<u>広々とした</u> <u>居間</u>で明かされるよね。",
    english_translation: "A: A vacation home is a typical setting for a tragedy in a mystery, isn't it? B: Yes, yes. Of course, the back door never opens, let alone the front entrance, and if you hide in the study, the murderer will surely attack you. A: And the culprit is always revealed in the spacious living room.",
    annotated_words: [
      { word_id: "n2_1040", word_number: 1040, kanji: "別荘", furigana: "べっそう", meaning_en: "vacation home, villa" },
      { word_id: "n2_1041", word_number: 1041, kanji: "典型的な", furigana: "てんけいてきな", meaning_en: "typical, stereotypical" },
      { word_id: "n2_1042", word_number: 1042, kanji: "悲劇", furigana: "ひげき", meaning_en: "tragedy" },
      { word_id: "n2_1043", word_number: 1043, kanji: "裏口", furigana: "うらぐち", meaning_en: "back door" },
      { word_id: "n2_1044", word_number: 1044, kanji: "書斎", furigana: "しょさい", meaning_en: "study (room)" },
      { word_id: "n2_1045", word_number: 1045, kanji: "広々(と)", furigana: "ひろびろ", meaning_en: "spaciously" },
      { word_id: "n2_1046", word_number: 1046, kanji: "居間", furigana: "いま", meaning_en: "living room" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 12 住",
    page_story: "164_2",
    japanese_text: "A：見てこのカタログ。家の壁がコンクリートって、なんか<u>人工的で</u>かっこいいよね。中の<u>インテリア</u>も<u>洗練されて</u>るし、<u>設備</u>も充実してるって。\nB：うーん。私はもっと木をたくさん使った<u>開放的な</u>家がいいな。",
    english_translation: "A: Look at this catalog. The walls of the house are concrete, so it looks kind of artificial and cool, doesn't it? The interior is sophisticated too, and it's fully equipped, apparently. B: Hmmm. I prefer more open designs using plenty of timber.",
    annotated_words: [
      { word_id: "n2_1047", word_number: 1047, kanji: "人工的な", furigana: "じんこうてきな", meaning_en: "artificial" },
      { word_id: "n2_1048", word_number: 1048, kanji: "インテリア", furigana: "", meaning_en: "interior" },
      { word_id: "n2_1049", word_number: 1049, kanji: "洗練[する]", furigana: "せんれん", meaning_en: "sophistication, refine" },
      { word_id: "n2_1050", word_number: 1050, kanji: "設備", furigana: "せつび", meaning_en: "equipment" },
      { word_id: "n2_1051", word_number: 1051, kanji: "開放的な", furigana: "かいほうてきな", meaning_en: "expansive, open" },
      { word_id: "n2_1052", word_number: 1052, kanji: "開放[する]", furigana: "かいほう", meaning_en: "liberation, liberate" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 12 住",
    page_story: "165_2",
    japanese_text: "近年、空き家の<u>火災</u>が増えている。その原因の多くが人によって火がつけられる場合で、<u>ぼろぼろで</u>明かりがついていない<u>家屋</u>が狙われやすいようだ。",
    english_translation: "In recent years, fires in vacant houses have been increasing. Many are caused by people setting fires, and it seems that rundown, unlit houses are more likely to be targeted.",
    annotated_words: [
      { word_id: "n2_1053", word_number: 1053, kanji: "火災", furigana: "かさい", meaning_en: "conflagration, fire" },
      { word_id: "n2_1054", word_number: 1054, kanji: "ぼろぼろな", furigana: "", meaning_en: "battered, rundown" },
      { word_id: "n2_1055", word_number: 1055, kanji: "家屋", furigana: "かおく", meaning_en: "house" }
    ]
  }
];

topic12StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 12 story ${story.story_number}: ${story.page_story}.json`);
});
