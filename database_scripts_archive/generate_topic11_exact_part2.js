import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 11 Stories (Animals) - Part 2
const topic11StoriesPart2 = [
  {
    is_story: true,
    story_number: 11,
    title: "Topic 11 動物",
    page_story: "156_1",
    japanese_text: "<u>収穫</u>前の畑に<u>巨大な</u> <u>昆虫</u>が<u>群れ</u>で<u>飛行して</u>きた。畑には何も残っていなかった。翌日の新聞では「まるで山火事にあったようだ」と<u>例えられて</u>いた。",
    english_translation: "Huge insects flew in swarms into the fields before harvest. Nothing was left in the fields. The following day's newspaper likened the fields to what remains after a forest fire.",
    annotated_words: [
      { word_id: "n2_0977", word_number: 977, kanji: "収穫[する]", furigana: "しゅうかく", meaning_en: "harvest, pick (crops)" },
      { word_id: "n2_0978", word_number: 978, kanji: "巨大な", furigana: "きょだいな", meaning_en: "huge" },
      { word_id: "n2_0979", word_number: 979, kanji: "昆虫", furigana: "こんちゅう", meaning_en: "insect" },
      { word_id: "n2_0980", word_number: 980, kanji: "群れ", furigana: "むれ", meaning_en: "herd, swarm" },
      { word_id: "n2_0981", word_number: 981, kanji: "飛行[する]", furigana: "ひこう", meaning_en: "flight, fly" },
      { word_id: "n2_0982", word_number: 982, kanji: "例える", furigana: "たとえる", meaning_en: "liken, compare" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 11 動物",
    page_story: "156_2",
    japanese_text: "A：<u>休暇</u>中は何してたの？\nB：お客さんが<u>絶えない</u>ことで有名な、イルカの<u>ショー</u>を見に行ったよ。本当に<u>見事だった</u>！\nA：僕も先月家族で見に行ったよ。すごく<u>興奮する</u>よね。",
    english_translation: "A: What did you do during vacation? B: I went to see the dolphin show, which is famous for its endless stream of visitors. It was really spectacular! A: I went with my family last month too. It's very exciting, isn't it?",
    annotated_words: [
      { word_id: "n2_0983", word_number: 983, kanji: "休暇", furigana: "きゅうか", meaning_en: "vacation" },
      { word_id: "n2_0984", word_number: 984, kanji: "絶える", furigana: "たえる", meaning_en: "cease, come to an end" },
      { word_id: "n2_0985", word_number: 985, kanji: "絶えず", furigana: "たえず", meaning_en: "endless, unceasing" },
      { word_id: "n2_0986", word_number: 986, kanji: "ショー", furigana: "", meaning_en: "show" },
      { word_id: "n2_0987", word_number: 987, kanji: "見事な", furigana: "みごとな", meaning_en: "amazing, spectacular" },
      { word_id: "n2_0988", word_number: 988, kanji: "興奮[する]", furigana: "こうふん", meaning_en: "excitement, exciting" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 11 動物",
    page_story: "157_2",
    japanese_text: "A：<u>井戸</u>の方から<u>物音</u>しない？\nB：そうだね。なんだろう。\nA：なんか<u>気配</u>はするけど、<u>薄暗くて</u>、よく見えないな。\nB：あ！あそこの草が<u>茂って</u>るとこ、見て！へびが<u>這って</u>る。",
    english_translation: "A: Did you hear some noise from the well? B: Yes, I think so. I wonder what it is. A: I have a feeling something's there, but it's too dark to really see. B: Ah! Look over there, in the overgrown grass! There's a snake slithering.",
    annotated_words: [
      { word_id: "n2_0989", word_number: 989, kanji: "井戸", furigana: "いど", meaning_en: "well" },
      { word_id: "n2_0990", word_number: 990, kanji: "物音", furigana: "ものおと", meaning_en: "noise, sound" },
      { word_id: "n2_0991", word_number: 991, kanji: "気配", furigana: "けはい", meaning_en: "sign, indication, feeling" },
      { word_id: "n2_0992", word_number: 992, kanji: "薄暗い", furigana: "うすぐらい", meaning_en: "dark, dim" },
      { word_id: "n2_0993", word_number: 993, kanji: "茂る", furigana: "しげる", meaning_en: "grow, overgrow" },
      { word_id: "n2_0994", word_number: 994, kanji: "這う", furigana: "はう", meaning_en: "crawl, creep, slither" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 11 動物",
    page_story: "158_1",
    japanese_text: "A：この<u>松</u>、立派だね。\nB：<u>根</u>も<u>幹</u>も、とても太いね。松は<u>養分</u>が少ない場所でも育ちやすいらしいよ。\nA：へえ、詳しいね。\nB：実は最近盆栽を始めたんだ。自然の<u>力強さ</u>や美しさを<u>身近に</u>感じたくて。",
    english_translation: "A: This pine tree is magnificent. B: Its roots and trunk are so thick, aren't they? Apparently, pine trees can even grow in places where nutrients are scarce. A: Wow, you know a lot. B: Actually, I recently started bonsai. I like to feel the power and beauty of nature close to me.",
    annotated_words: [
      { word_id: "n2_0995", word_number: 995, kanji: "松", furigana: "まつ", meaning_en: "pine tree" },
      { word_id: "n2_0996", word_number: 996, kanji: "根", furigana: "ね", meaning_en: "roots" },
      { word_id: "n2_0997", word_number: 997, kanji: "幹", furigana: "みき", meaning_en: "trunk" },
      { word_id: "n2_0998", word_number: 998, kanji: "養分", furigana: "ようぶん", meaning_en: "nutrients" },
      { word_id: "n2_0999", word_number: 999, kanji: "力強さ", furigana: "ちからづよさ", meaning_en: "power" },
      { word_id: "n2_1000", word_number: 1000, kanji: "力強い", furigana: "ちからづよい", meaning_en: "powerful" },
      { word_id: "n2_1001", word_number: 1001, kanji: "身近な", furigana: "みぢかな", meaning_en: "nearby, close" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 11 動物",
    page_story: "158_2",
    japanese_text: "動物<u>全般</u>に対して人が<u>抱く</u>感情は、時代や地域によって異なる。私は、<u>ジャングル</u>で捕まり、<u>毛皮</u>にされる<u>哀れな</u>動物たちの姿を思うと、心が苦しくなる。",
    english_translation: "The attitudes that people hold toward animals in general vary from era to era and region to region. My heart aches when I think of poor animals caught in the jungle and turned into furs.",
    annotated_words: [
      { word_id: "n2_1002", word_number: 1002, kanji: "全般", furigana: "ぜんぱん", meaning_en: "general" },
      { word_id: "n2_1003", word_number: 1003, kanji: "抱く", furigana: "いだく", meaning_en: "have, hold" },
      { word_id: "n2_1004", word_number: 1004, kanji: "ジャングル", furigana: "", meaning_en: "jungle" },
      { word_id: "n2_1005", word_number: 1005, kanji: "毛皮", furigana: "けがわ", meaning_en: "fur, pelt" },
      { word_id: "n2_1006", word_number: 1006, kanji: "哀れな", furigana: "あわれな", meaning_en: "poor, wretched" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 11 動物",
    page_story: "159_2",
    japanese_text: "<u>陸</u>で一番大きな<u>生き物</u>はアフリカゾウだ。現地で<u>実物</u>を見たときは、その大きさに感動した。敵と戦うときは、あの大きな足で敵を<u>潰す</u>そうだ。",
    english_translation: "The largest land animal is the African elephant. When I saw one for real, I was impressed by its size. I heard that when it fights, it crushes its enemies with its massive feet.",
    annotated_words: [
      { word_id: "n2_1007", word_number: 1007, kanji: "陸", furigana: "りく", meaning_en: "land, earth" },
      { word_id: "n2_1008", word_number: 1008, kanji: "生き物", furigana: "いきもの", meaning_en: "animal, creature" },
      { word_id: "n2_1009", word_number: 1009, kanji: "実物", furigana: "じつぶつ", meaning_en: "real thing, for real" },
      { word_id: "n2_1010", word_number: 1010, kanji: "潰す", furigana: "つぶす", meaning_en: "crush, squash" },
      { word_id: "n2_1011", word_number: 1011, kanji: "潰れる", furigana: "つぶれる", meaning_en: "be crushed, be smashed" }
    ]
  }
];

topic11StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 11 story ${story.story_number}: ${story.page_story}.json`);
});
