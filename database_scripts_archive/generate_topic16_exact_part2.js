import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 16 Stories (School) - Part 2
const topic16StoriesPart2 = [
  {
    is_story: true,
    story_number: 7,
    title: "Topic 16 学校",
    page_story: "218_1",
    japanese_text: "大学の<u>付属</u>小学校である本校では、特色のある<u>カリキュラム</u>で指導しています。「読み・書き・計算」といった<u>基礎的な</u>力はもちろん、<u>児童</u>向けソフトを使ってＩＴ<u>スキル</u>も伸ばします。<u>伝統的な</u>学校行事も多くあり、学校生活が充実するよう工夫しています。",
    english_translation: "As a university-affiliated elementary school, we guide students with a distinctive curriculum. In addition to the fundamental skills of reading, writing, and arithmetic, we also use software designed for children to improve their IT skills. We also hold many traditional school events, and we strive to enrich their school life.",
    annotated_words: [
      { word_id: "n2_1459", word_number: 1459, kanji: "付属[する]", furigana: "ふぞく", meaning_en: "attachment, be affiliated" },
      { word_id: "n2_1460", word_number: 1460, kanji: "カリキュラム", furigana: "かりきゅらむ", meaning_en: "curriculum" },
      { word_id: "n2_1461", word_number: 1461, kanji: "基礎的な", furigana: "きそてきな", meaning_en: "fundamental" },
      { word_id: "n2_1463", word_number: 1463, kanji: "児童", furigana: "じどう", meaning_en: "child, children" },
      { word_id: "n2_1464", word_number: 1464, kanji: "スキル", furigana: "すきる", meaning_en: "skill" },
      { word_id: "n2_1465", word_number: 1465, kanji: "伝統的な", furigana: "でんとうてきな", meaning_en: "traditional" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 16 学校",
    page_story: "218_2",
    japanese_text: "この<u>絵本</u>は登場人物が<u>生き生きと</u>描かれている。難しい言葉は子どもが分かりやすい言葉に<u>言い換えられて</u>いるし、<u>まさに</u>子どもにとって素晴らしい一冊だと言える。",
    english_translation: "The characters appearing in this picture book are vividly depicted. Difficult words are reworded in ways that are easy for children to understand, which certainly makes this a wonderful book for children.",
    annotated_words: [
      { word_id: "n2_1467", word_number: 1467, kanji: "絵本", furigana: "えほん", meaning_en: "picture book" },
      { word_id: "n2_1468", word_number: 1468, kanji: "生き生き(と)", furigana: "いきいき(と)", meaning_en: "vividly" },
      { word_id: "n2_1469", word_number: 1469, kanji: "言い換える", furigana: "いいかえる", meaning_en: "reword, paraphrase" },
      { word_id: "n2_1470", word_number: 1470, kanji: "まさに", furigana: "", meaning_en: "exactly, certainly" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 16 学校",
    page_story: "219_1",
    japanese_text: "最近、<u>暴力</u>事件や<u>校舎</u>の窓が割られることがよくあり、犯人だと思われる生徒<u>ら</u>を<u>呼び出して</u>話を聞いた。生徒らは<u>覚え</u>がないと言って認めないが、このまま<u>帰して</u>もいいものか悩むところだ。",
    english_translation: "Recently, there have been a number of violent incidents and broken windows in the school buildings. I sent for a group of students whom I believe to be responsible and asked them about it. The students refuse to admit anything, saying they have no memory of it, but I'm not sure I can just send them home.",
    annotated_words: [
      { word_id: "n2_1471", word_number: 1471, kanji: "暴力", furigana: "ぼうりょく", meaning_en: "violence" },
      { word_id: "n2_1472", word_number: 1472, kanji: "校舎", furigana: "こうしゃ", meaning_en: "school building" },
      { word_id: "n2_1473", word_number: 1473, kanji: "〜ら", furigana: "", meaning_en: "group of ~, several ~" },
      { word_id: "n2_1474", word_number: 1474, kanji: "呼び出す", furigana: "よびだす", meaning_en: "summon, send for" },
      { word_id: "n2_1475", word_number: 1475, kanji: "覚え", furigana: "おぼえ", meaning_en: "memory" },
      { word_id: "n2_1476", word_number: 1476, kanji: "帰す", furigana: "かえす", meaning_en: "send home, send back" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 16 学校",
    page_story: "220_1",
    japanese_text: "昨晩友達とお酒を飲みすぎて、大事な試験の日に寝坊してしまった。焦って<u>言い訳</u>を考えながら学校に行くと、<u>幸運な</u>ことに<u>休講</u>になっていた。あまりの嬉しさに、友達と居酒屋でまた飲んだ。こんな<u>荒れた</u>生活を親が知ったらどう思うだろう。",
    english_translation: "I drank too much with my friends the previous night and overslept on the day of an important exam. I rushed to school, trying think of an excuse, but fortunately, the class had been canceled. I was so happy that I went out drinking again at an izakaya with my friends. I wonder what my parents would think if they knew about this wild life.",
    annotated_words: [
      { word_id: "n2_1477", word_number: 1477, kanji: "言い訳[する]", furigana: "いいわけ", meaning_en: "excuse, make excuses" },
      { word_id: "n2_1478", word_number: 1478, kanji: "幸運な", furigana: "こううんな", meaning_en: "fortunate" },
      { word_id: "n2_1479", word_number: 1479, kanji: "休講[する]", furigana: "きゅうこう", meaning_en: "class cancelation, cancel class" },
      { word_id: "n2_1480", word_number: 1480, kanji: "荒れる", furigana: "あれる", meaning_en: "get rough, go wild" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 16 学校",
    page_story: "220_2",
    japanese_text: "両親への<u>反抗</u>のピークは高校生のときだった。ほとんど話もしなかったし、顔を合わせれば<u>衝突して</u>いた。何度も<u>家出</u>をしたし、本当に申し訳ないことをした。結婚し、親の<u>立場</u>になってみて初めてそのときの親の気持ちが分かるようになった。",
    english_translation: "The peak of my defiance against my parents was in high school. We hardly ever talked, and whenever we saw each other, we would clash. I ran away from home many times, and I did things I really regret. It was only when I got married and put myself in my parents' position that I began to understand how they felt at that time.",
    annotated_words: [
      { word_id: "n2_1481", word_number: 1481, kanji: "反抗[する]", furigana: "はんこう", meaning_en: "defiance, rebel" },
      { word_id: "n2_1482", word_number: 1482, kanji: "衝突[する]", furigana: "しょうとつ", meaning_en: "collision, clash" },
      { word_id: "n2_1483", word_number: 1483, kanji: "家出[する]", furigana: "いえで", meaning_en: "runaway, run away from home" },
      { word_id: "n2_1484", word_number: 1484, kanji: "立場", furigana: "たちば", meaning_en: "position, standpoint" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 16 学校",
    page_story: "221_1",
    japanese_text: "今からペアで活動します。まず、出席番号が<u>奇数</u>の人と<u>偶数</u>の人で分かれてください。そして、その中でペアを<u>組んで</u>ください。できたら前を見てください。ここに<u>挙げた</u>言葉を使って<u>英文</u>を10個以上作りましょう。一番早くできたペアが勝ちです。",
    english_translation: "Now we will work in pairs. Firstly, please divide yourselves into two groups: those with odd seat numbers and those with even seat numbers. Then, once in those groups, please form pairs. When you are ready, please look ahead. Make at least 10 English sentences using the words listed here. The pair that can do it the fastest wins.",
    annotated_words: [
      { word_id: "n2_1485", word_number: 1485, kanji: "奇数", furigana: "きすう", meaning_en: "odd number" },
      { word_id: "n2_1486", word_number: 1486, kanji: "偶数", furigana: "ぐうすう", meaning_en: "even number" },
      { word_id: "n2_1487", word_number: 1487, kanji: "組む", furigana: "くむ", meaning_en: "form" },
      { word_id: "n2_1488", word_number: 1488, kanji: "挙げる", furigana: "あげる", meaning_en: "give, list" },
      { word_id: "n2_1489", word_number: 1489, kanji: "英文", furigana: "えいぶん", meaning_en: "English sentence" }
    ]
  }
];

topic16StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 16 story ${story.story_number}: ${story.page_story}.json`);
});
