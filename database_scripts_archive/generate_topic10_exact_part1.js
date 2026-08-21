import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 10 Stories (Sports) - Part 1
const topic10StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 10 スポーツ",
    page_story: "135_1",
    japanese_text: "2022年、内村航平氏が<u>会見で</u> <u>引退する</u>ことを発表した。内村氏は16年間<u>体操界で</u>活躍し続け、東京<u>五輪</u>では、体操男子全体の<u>キャプテン</u>も務めた人物である。",
    english_translation: "In 2022, Kohei Uchimura announced his retirement at a press conference. Uchimura has been active in the world of gymnastics for 16 years and was the captain of the Japanese men's gymnastics team at the Tokyo Olympic Games.",
    annotated_words: [
      { word_id: "n2_0805", word_number: 805, kanji: "会見[する]", furigana: "かいけん", meaning_en: "press conference, hold a press conference" },
      { word_id: "n2_0806", word_number: 806, kanji: "引退[する]", furigana: "いんたい", meaning_en: "retirement, retire" },
      { word_id: "n2_0807", word_number: 807, kanji: "体操[する]", furigana: "たいそう", meaning_en: "gymnastics, do gymnastics" },
      { word_id: "n2_0808", word_number: 808, kanji: "〜界", furigana: "かい", meaning_en: "the world of ~" },
      { word_id: "n2_0809", word_number: 809, kanji: "五輪", furigana: "ごりん", meaning_en: "Olympic Games" },
      { word_id: "n2_0810", word_number: 810, kanji: "キャプテン", furigana: "", meaning_en: "captain" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 10 スポーツ",
    page_story: "136_1",
    japanese_text: "A：最近息子がスイミング<u>スクール</u>に通い始めたんだけど、<u>体力</u>がなくて、すぐ疲れるみたいなんだよね。\nB：<u>筋肉</u>がつけば、疲れにくくなってくると思う。あとは栄養<u>満点</u>の食事が大切だね。お父さん、がんばって！\nA：そうだよね。<u>集団</u>行動が苦手な息子ががんばってるんだから、俺もサポートがんばるわ。",
    english_translation: "A: My son has recently started attending swimming school, but he lacks physical strength and gets tired easily. B: Once he builds up some muscles, he won't tire so easily. Top-level nutrition is also important. Good luck! A: I hope so. My son isn't great at group activities, but he's trying his best, so I'll do my best to support him.",
    annotated_words: [
      { word_id: "n2_0811", word_number: 811, kanji: "スクール", furigana: "", meaning_en: "school" },
      { word_id: "n2_0812", word_number: 812, kanji: "体力", furigana: "たいりょく", meaning_en: "physical strength" },
      { word_id: "n2_0813", word_number: 813, kanji: "筋肉", furigana: "きんにく", meaning_en: "muscles" },
      { word_id: "n2_0814", word_number: 814, kanji: "満点", furigana: "まんてん", meaning_en: "top level, perfection" },
      { word_id: "n2_0815", word_number: 815, kanji: "集団", furigana: "しゅうだん", meaning_en: "group" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 10 スポーツ",
    page_story: "136_2",
    japanese_text: "<u>パラリンピック</u>に出る人のなかには、もともと<u>軍隊</u>にいて、けがをきっかけに<u>競技</u>者になった人もいる。東京パラリンピックで金メダルをとったブラッド・スナイダー<u>氏</u>もその一人だ。",
    english_translation: "Some athletes in the Paralympics originally served in the military and became competitors after an injury. Mr. Brad Snyder, who won a gold medal at the Tokyo Paralympics, is one such athlete.",
    annotated_words: [
      { word_id: "n2_0816", word_number: 816, kanji: "パラリンピック", furigana: "", meaning_en: "Paralympic Games" },
      { word_id: "n2_0817", word_number: 817, kanji: "軍隊", furigana: "ぐんたい", meaning_en: "armed forces, military" },
      { word_id: "n2_0818", word_number: 818, kanji: "競技", furigana: "きょうぎ", meaning_en: "game, competition" },
      { word_id: "n2_0819", word_number: 819, kanji: "競技場", furigana: "きょうぎじょう", meaning_en: "stadium" },
      { word_id: "n2_0820", word_number: 820, kanji: "〜氏", furigana: "し", meaning_en: "Mr. ~, Mrs. ~, Ms. ~" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 10 スポーツ",
    page_story: "137_2",
    japanese_text: "スポーツ<u>中継</u>は、分からない<u>用語</u>があっても<u>解説</u>者が説明してくれるし、競技に対して新しい<u>見方</u>ができるようになるから好きだ。中継する<u>チャンネル</u>や<u>日程</u>がもっと増えてほしい。",
    english_translation: "I enjoy live sports broadcasts because the commentators explain any terms I don't understand and I get a new perspective on the competition. I wish there were more channels and schedules for live broadcasts.",
    annotated_words: [
      { word_id: "n2_0821", word_number: 821, kanji: "中継[する]", furigana: "ちゅうけい", meaning_en: "broadcast, broadcast" },
      { word_id: "n2_0822", word_number: 822, kanji: "用語", furigana: "ようご", meaning_en: "terms, terminology" },
      { word_id: "n2_0823", word_number: 823, kanji: "解説[する]", furigana: "かいせつ", meaning_en: "commentary, commentate" },
      { word_id: "n2_0824", word_number: 824, kanji: "見方", furigana: "みかた", meaning_en: "perspective, way of viewing" },
      { word_id: "n2_0825", word_number: 825, kanji: "チャンネル", furigana: "", meaning_en: "channel" },
      { word_id: "n2_0826", word_number: 826, kanji: "日程", furigana: "にってい", meaning_en: "schedule" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 10 スポーツ",
    page_story: "138_1",
    japanese_text: "その野球<u>監督</u>は、<u>炎天下</u>でのピッチング練習を<u>禁じ</u>、かわりに、<u>敵</u>チームのプレーを<u>分析する</u>ように指示した。",
    english_translation: "The baseball coach forbade his players from practicing pitching under the blazing sun, instead instructing them to analyze the plays of the opposing team.",
    annotated_words: [
      { word_id: "n2_0827", word_number: 827, kanji: "監督[する]", furigana: "かんとく", meaning_en: "coach, director, direct" },
      { word_id: "n2_0828", word_number: 828, kanji: "炎天下", furigana: "えんてんか", meaning_en: "under the blazing sun" },
      { word_id: "n2_0829", word_number: 829, kanji: "〜下", furigana: "か", meaning_en: "under ~" },
      { word_id: "n2_0830", word_number: 830, kanji: "禁じる／禁ずる", furigana: "きんじる", meaning_en: "forbid, prohibit" },
      { word_id: "n2_0831", word_number: 831, kanji: "敵", furigana: "てき", meaning_en: "enemy, opposition" },
      { word_id: "n2_0832", word_number: 832, kanji: "分析[する]", furigana: "ぶんせき", meaning_en: "analysis, analyze" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 10 スポーツ",
    page_story: "138_2",
    japanese_text: "分析を<u>深めて</u>いくと、相手への<u>攻撃</u>の<u>狙い目</u>も自分が<u>強化す</u>べきところも分かってきた。それで、練習の<u>方針</u>を変えることにした。次こそ、リベンジを<u>果たし</u>たい。",
    english_translation: "As I deepened my analysis, I realized how I needed to target my attack on my opponent and what I needed to strengthen in myself. So I decided to change my training plan. Next time, I intend to carry out my revenge.",
    annotated_words: [
      { word_id: "n2_0833", word_number: 833, kanji: "深める", furigana: "ふかめる", meaning_en: "deepen (something)" },
      { word_id: "n2_0834", word_number: 834, kanji: "深まる", furigana: "ふかまる", meaning_en: "become deeper, intensify" },
      { word_id: "n2_0835", word_number: 835, kanji: "攻撃[する]", furigana: "こうげき", meaning_en: "attack, attack" },
      { word_id: "n2_0836", word_number: 836, kanji: "狙い目", furigana: "ねらいめ", meaning_en: "target" },
      { word_id: "n2_0837", word_number: 837, kanji: "狙う", furigana: "ねらう", meaning_en: "aim at, go for (something)" },
      { word_id: "n2_0838", word_number: 838, kanji: "強化[する]", furigana: "きょうか", meaning_en: "reinforcement, strengthen" },
      { word_id: "n2_0839", word_number: 839, kanji: "方針", furigana: "ほうしん", meaning_en: "plan, policy" },
      { word_id: "n2_0840", word_number: 840, kanji: "果たす", furigana: "はたす", meaning_en: "carry out, follow through" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 10 スポーツ",
    page_story: "139_2",
    japanese_text: "東京五輪では、<u>ジェンダー</u>平等の面から、7つの競技で男女<u>混合</u> <u>種目</u>が採用された。卓球もその1つで、水谷・伊藤<u>ペア</u>が男女混合の<u>初代</u>金メダリストとなった。",
    english_translation: "In the Tokyo Olympics, seven sports have introduced mixed-gender events with a view toward gender equality. One such event was table tennis, in which the Mizutani/Ito pair became the first-ever gold medalists in a mixed-gender event.",
    annotated_words: [
      { word_id: "n2_0841", word_number: 841, kanji: "ジェンダー", furigana: "", meaning_en: "gender" },
      { word_id: "n2_0842", word_number: 842, kanji: "混合[する]", furigana: "こんごう", meaning_en: "mix, mix" },
      { word_id: "n2_0843", word_number: 843, kanji: "種目", furigana: "しゅもく", meaning_en: "event" },
      { word_id: "n2_0844", word_number: 844, kanji: "ペア", furigana: "", meaning_en: "pair" },
      { word_id: "n2_0845", word_number: 845, kanji: "初代", furigana: "しょだい", meaning_en: "first" },
      { word_id: "n2_0846", word_number: 846, kanji: "初〜", furigana: "しょ", meaning_en: "first ~, first-ever ~" }
    ]
  }
];

topic10StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 10 story ${story.story_number}: ${story.page_story}.json`);
});
