import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 8 Stories (Social Life) - Part 1
const topic8Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 8 人付き合い",
    page_story: "116_1",
    japanese_text: "私の恋人は<u>ユーモア</u>があって、一緒にいるのが楽しい人だ。でも、最近は私の話がすぐ<u>脱線する</u>ことが気に入らないそうで、よく<u>口論に</u>なってしまう。",
    english_translation: "My girlfriend has a good sense of humor and is fun to be around. But lately she's been getting frustrated when I go off on tangents, and we often get into arguments.",
    annotated_words: [
      { word_id: "n2_0684", word_number: 684, kanji: "ユーモア", furigana: "", meaning_en: "humour" },
      { word_id: "n2_0685", word_number: 685, kanji: "脱線[する]", furigana: "だっせん", meaning_en: "derailment, go off on tangent" },
      { word_id: "n2_0686", word_number: 686, kanji: "口論[する]", furigana: "こうろん", meaning_en: "dispute, argue" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 8 人付き合い",
    page_story: "117_1",
    japanese_text: "A：鈴木さんが明日こそ塾に来るように、彼の友達に<u>言付けて</u>おいたんですが、どうですかね。\nB：うーん、最近、部屋に<u>こもって</u>て出てこないらしいですよ。\nA：そうですか。塾に行かなきゃっていう<u>心理的な</u>負担が大きいのかもしれないですね。\nB：はい。もし明日来ても、<u>くれぐれも</u>本人を責めるような指導はしないようにしましょう。",
    english_translation: "A: I told Suzuki's friend to make sure Suzuki comes to cram school tomorrow. B: Actually, I heard he's been shutting himself up in his room lately and not coming out. A: I see. Maybe the psychological burden of having to go to cram school is too much for him. B: Yes. If he does come tomorrow, I really hope you won't make any remarks critical of him.",
    annotated_words: [
      { word_id: "n2_0687", word_number: 687, kanji: "言付ける", furigana: "ことづける", meaning_en: "send word, tell, pass on" },
      { word_id: "n2_0688", word_number: 688, kanji: "こもる", furigana: "", meaning_en: "to confine, to shut up (oneself)" },
      { word_id: "n2_0689", word_number: 689, kanji: "心理的な", furigana: "しんりてきな", meaning_en: "psychological" },
      { word_id: "n2_0690", word_number: 690, kanji: "心理", furigana: "しんり", meaning_en: "psychological state, mentality" },
      { word_id: "n2_0691", word_number: 691, kanji: "心理学", furigana: "しんりがく", meaning_en: "psychology" },
      { word_id: "n2_0692", word_number: 692, kanji: "くれぐれも", furigana: "", meaning_en: "sincerely, really hope" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 8 人付き合い",
    page_story: "118_1",
    japanese_text: "私は大学生になって、<u>活発で</u> <u>陽気な</u>山田さんと付き合い始めた。周りから<u>うらやましい</u>と言われることも多かった。でも2年の<u>月日</u>が経って、気持ちの<u>擦れ違い</u>も多くなった。そして、その年のクリスマスに私は振られた。人生で初めての<u>失恋</u>だった。",
    english_translation: "When I went to university, I started dating Yamada, who was so lively and cheerful. Many people around me told me they were envious. But after two years' time had passed, we were often at cross purposes emotionally. Then, on Christmas Day that year, he dumped me. It was the first heartbreak of my life.",
    annotated_words: [
      { word_id: "n2_0693", word_number: 693, kanji: "活発な", furigana: "かっぱつな", meaning_en: "lively" },
      { word_id: "n2_0694", word_number: 694, kanji: "陽気な", furigana: "ようきな", meaning_en: "cheerful" },
      { word_id: "n2_0695", word_number: 695, kanji: "うらやましい", furigana: "", meaning_en: "envious" },
      { word_id: "n2_0696", word_number: 696, kanji: "月日", furigana: "つきひ", meaning_en: "time, period of time" },
      { word_id: "n2_0697", word_number: 697, kanji: "擦れ違い", furigana: "すれちがい", meaning_en: "cross purposes, failure to meet" },
      { word_id: "n2_0698", word_number: 698, kanji: "失恋[する]", furigana: "しつれん", meaning_en: "heartbreak, be disappointed in love" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 8 人付き合い",
    page_story: "118_2",
    japanese_text: "通勤途中、電車を降りた<u>瞬間</u>に<u>ばったり</u>昔の恋人に会った。私は驚いた<u>表情</u>で「<u>おお</u>、久しぶり！元気？」と<u>早口</u>で言った。",
    english_translation: "As I was heading to work, I bumped into my old boyfriend by chance right at the moment I got off the train. With a surprised expression on my face, I quickly blurted out, \"Oh, it's been so long! How are you?\"",
    annotated_words: [
      { word_id: "n2_0699", word_number: 699, kanji: "瞬間", furigana: "しゅんかん", meaning_en: "moment" },
      { word_id: "n2_0700", word_number: 700, kanji: "ばったり(と)", furigana: "", meaning_en: "by chance, unexpectedly" },
      { word_id: "n2_0701", word_number: 701, kanji: "表情", furigana: "ひょうじょう", meaning_en: "expression" },
      { word_id: "n2_0702", word_number: 702, kanji: "おお", furigana: "", meaning_en: "Oh" },
      { word_id: "n2_0703", word_number: 703, kanji: "早口", furigana: "はやくち", meaning_en: "quick speech" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 8 人付き合い",
    page_story: "119_2",
    japanese_text: "久しぶりに会った山田さんは、相変わらず<u>魅力的</u>だった。山田さんに今恋人がいないんじゃないかという、<u>わずかな</u>希望を持って「もしよかったら、今度二人でごはん行かない？」と言い、山田さんを<u>引き止めた</u>。私はまるで<u>初対面</u>の人に話しかけるかのように緊張していた。",
    english_translation: "Yamada, whom I hadn't seen in a while, was as charming as ever. In the slightest hope that he might not have a girlfriend at the moment, I asked Yamada whether he'd like to go to dinner with me sometime, and stopped him leaving. I was so nervous, as though I was meeting him for the first time.",
    annotated_words: [
      { word_id: "n2_0704", word_number: 704, kanji: "魅力的な", furigana: "みりょくてきな", meaning_en: "appealing, charming" },
      { word_id: "n2_0705", word_number: 705, kanji: "魅力", furigana: "みりょく", meaning_en: "appeal, charm, fascination" },
      { word_id: "n2_0706", word_number: 706, kanji: "わずかな", furigana: "", meaning_en: "slight, scarce" },
      { word_id: "n2_0707", word_number: 707, kanji: "引き止める", furigana: "ひきとめる", meaning_en: "stop someone leaving, restrain" },
      { word_id: "n2_0708", word_number: 708, kanji: "初対面", furigana: "しょたいめん", meaning_en: "meeting for the first time" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 8 人付き合い",
    page_story: "120_1",
    japanese_text: "私は山田さんを食事に誘った。すると、山田さんは<u>うつむいて</u>「<u>俺</u>、来月結婚するんだ」と頭をかきながら言った。困ったときに頭をかく<u>癖</u>は昔と変わっていない。",
    english_translation: "So I invited Yamada to dinner. When I did, he looked down and said, \"I'm getting married next month,\" while scratching his head. He hasn't lost his habit of scratching his head when he's troubled.",
    annotated_words: [
      { word_id: "n2_0709", word_number: 709, kanji: "うつむく", furigana: "", meaning_en: "hang one's head, look down" },
      { word_id: "n2_0710", word_number: 710, kanji: "俺", furigana: "おれ", meaning_en: "I (colloquial, familiar)" },
      { word_id: "n2_0711", word_number: 711, kanji: "癖", furigana: "くせ", meaning_en: "habit" },
      { word_id: "n2_0712", word_number: 712, kanji: "口癖", furigana: "くちぐせ", meaning_en: "habitual saying" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 8 人付き合い",
    page_story: "120_2",
    japanese_text: "食事の誘いを断られた私はショックで、急いでその場を走り去った。山田さんは私を<u>呼び止めよう</u>とはしなかった。私は<u>落ち込み</u>、その日から山田さんとは<u>音信不通</u>になってしまった。そんな私を<u>励まして</u>くれた田中さんと結婚し、今に<u>至る</u>。思いがけない相手と結婚する可能性も<u>大いに</u>あるものだ。",
    english_translation: "When he turned down my invitation to dinner, I was so shocked that I just suddenly ran away. Yamada didn't call out for me to stop. I was so depressed that I lost touch with Yamada from that day on. Instead, I married Tanaka, who was very encouraging to me, and here we are today. There is a substantial possibility that you may marry someone unexpected.",
    annotated_words: [
      { word_id: "n2_0713", word_number: 713, kanji: "呼び止める", furigana: "よびとめる", meaning_en: "call out to stop" },
      { word_id: "n2_0714", word_number: 714, kanji: "落ち込む", furigana: "おちこむ", meaning_en: "be depressed" },
      { word_id: "n2_0715", word_number: 715, kanji: "音信不通", furigana: "おんしんふつう", meaning_en: "loss of touch, break in contact" },
      { word_id: "n2_0716", word_number: 716, kanji: "励ます", furigana: "はげます", meaning_en: "encourage" },
      { word_id: "n2_0717", word_number: 717, kanji: "至る", furigana: "いたる", meaning_en: "reach, arrive at" },
      { word_id: "n2_0718", word_number: 718, kanji: "大いに", furigana: "おおいに", meaning_en: "considerably, substantially" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 8 人付き合い",
    page_story: "121_2",
    japanese_text: "田中さんとは<u>知人</u>の紹介で出会った。その人は<u>顔が広く</u>、<u>幹事</u>になって食事会を開き、私を<u>招いて</u>くれたのだ。",
    english_translation: "I first met Tanaka through an acquaintance. He knows a lot of people, and when he organized a dinner party, he invited me to attend.",
    annotated_words: [
      { word_id: "n2_0719", word_number: 719, kanji: "知人", furigana: "ちじん", meaning_en: "acquaintance" },
      { word_id: "n2_0720", word_number: 720, kanji: "顔が広い", furigana: "かおがひろい", meaning_en: "know a lot of people, of wide acquaintance" },
      { word_id: "n2_0721", word_number: 721, kanji: "幹事", furigana: "かんじ", meaning_en: "organizer" },
      { word_id: "n2_0722", word_number: 722, kanji: "招く", furigana: "まねく", meaning_en: "invite" }
    ]
  }
];

topic8Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 8 story ${story.story_number}: ${story.page_story}.json`);
});
