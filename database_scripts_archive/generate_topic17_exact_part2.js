import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 17 Stories (Work) - Part 2
const topic17StoriesPart2 = [
  {
    is_story: true,
    story_number: 4,
    title: "Topic 17 仕事",
    page_story: "236_1",
    japanese_text: "A：コンビニのバイトはどう？\nB：それが、店長に<u>サービス残業</u>を<u>要求されたり</u>、前日に突然<u>シフト</u>に入ってくれって言われたりする。\nA：えー、そんな人なの？\nB：しかも「仕事遅いね」とか、<u>嫌味</u>ばかり言ってくるし、それでバイトを<u>辞めた</u>人もいて、<u>やばい</u>店に来ちゃったなと思った。",
    english_translation: "A: How's your part-time job at the convenience store? B: Well, the manager demands that I work overtime without pay, and suddenly asks me to work shifts the day before. A: Oh, is that what he's like? B: And he's always saying nasty things like, \"You're a slow worker.\" Some employees quit because of it, and I realized I'd come to work at an awful store.",
    annotated_words: [
      { word_id: "n2_1593", word_number: 1593, kanji: "サービス残業", furigana: "さーびすざんぎょう", meaning_en: "overtime work without pay" },
      { word_id: "n2_1594", word_number: 1594, kanji: "要求[する]", furigana: "ようきゅう", meaning_en: "request, demand" },
      { word_id: "n2_1595", word_number: 1595, kanji: "シフト", furigana: "しふと", meaning_en: "shift" },
      { word_id: "n2_1596", word_number: 1596, kanji: "嫌味", furigana: "いやみ", meaning_en: "nasty, sarcastic" },
      { word_id: "n2_1597", word_number: 1597, kanji: "辞める", furigana: "やめる", meaning_en: "quit" },
      { word_id: "n2_1598", word_number: 1598, kanji: "やばい", furigana: "", meaning_en: "awful, terrible" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 17 仕事",
    page_story: "237_1",
    japanese_text: "A：あの新しく<u>オープンした</u>コンビニ、行った？\nB：行った行った。店長がすっごい<u>笑顔</u>のイケメンだよね。\nA：そうそう。あそこバイト<u>募集して</u>たよ。\n\nA：今度、社内<u>レクリエーション</u>で何をするか<u>提案し</u>なきゃいけないんです。\nB：へー、何するんですか？\nA：<u>今のところ</u>、<u>ビンゴ</u>大会にしようかなと思ってます。<u>当たり</u>は温泉旅館のチケットです。",
    english_translation: "A: Have you been to that convenience store that just opened? B: I did. The manager is so handsome, with a fantastic smile. A: That's the one. They were taking applications for part-timers.\n\nA: It's my turn to make some proposals for recreation for the company. B: Wow, what are you going to suggest? A: At the moment, I'm thinking of holding a bingo tournament. The winner would get a ticket to a hot spring resort.",
    annotated_words: [
      { word_id: "n2_1599", word_number: 1599, kanji: "オープン[する]", furigana: "おーぷん", meaning_en: "opening, open" },
      { word_id: "n2_1600", word_number: 1600, kanji: "笑顔", furigana: "えがお", meaning_en: "smile" },
      { word_id: "n2_1601", word_number: 1601, kanji: "募集[する]", furigana: "ぼしゅう", meaning_en: "recruitment, take applications" },
      { word_id: "n2_1602", word_number: 1602, kanji: "レクリエーション", furigana: "れくりえーしょん", meaning_en: "recreation" },
      { word_id: "n2_1603", word_number: 1603, kanji: "提案[する]", furigana: "ていあん", meaning_en: "recommendation, proposal, suggest" },
      { word_id: "n2_1604", word_number: 1604, kanji: "今のところ", furigana: "いまのところ", meaning_en: "at the moment" },
      { word_id: "n2_1605", word_number: 1605, kanji: "ビンゴ", furigana: "びんご", meaning_en: "bingo" },
      { word_id: "n2_1606", word_number: 1606, kanji: "当たり", furigana: "あたり", meaning_en: "win" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 17 仕事",
    page_story: "238_1",
    japanese_text: "日本でも1980年代の初め頃までは、よく労働<u>組合</u>が<u>ストライキ</u>を起こし、会社に<u>給与</u>の<u>交渉</u>を求めていた。",
    english_translation: "In Japan, up to the early 1980s, labor unions often went on strike and demanded to negotiate their salaries with employers.",
    annotated_words: [
      { word_id: "n2_1607", word_number: 1607, kanji: "組合", furigana: "くみあい", meaning_en: "union" },
      { word_id: "n2_1608", word_number: 1608, kanji: "スト(ライキ)", furigana: "すとらいき", meaning_en: "(industrial) strike" },
      { word_id: "n2_1609", word_number: 1609, kanji: "給与", furigana: "きゅうよ", meaning_en: "salary" },
      { word_id: "n2_1610", word_number: 1610, kanji: "交渉[する]", furigana: "こうしょう", meaning_en: "negotiation, negotiate" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 17 仕事",
    page_story: "238_2",
    japanese_text: "A：職場の<u>マネージャー</u>から、また二人で飲みに行こうってメールが来た...。\nB：また？ <u>しつこい</u>ね。\nA：<u>勤務</u>日に顔を合わせるのが<u>苦痛</u>。\nB：あの人、他の<u>スタッフ</u>にも声をかけてるらしいけど、はっきり断ったら、仕事で<u>意地悪して</u>くるんだって。",
    english_translation: "A: I got a text from my manager at work inviting me out for a drink with him again ... B: Again? Persistent, isn't he? A: It's so painful to see him on workdays. B: He's been asking other staff members to join him, but when they clearly refuse, he's spiteful to them at work.",
    annotated_words: [
      { word_id: "n2_1611", word_number: 1611, kanji: "マネージャー", furigana: "まねーじゃー", meaning_en: "manager" },
      { word_id: "n2_1612", word_number: 1612, kanji: "しつこい", furigana: "", meaning_en: "persistent" },
      { word_id: "n2_1613", word_number: 1613, kanji: "勤務[する]", furigana: "きんむ", meaning_en: "work, go to work" },
      { word_id: "n2_1614", word_number: 1614, kanji: "苦痛", furigana: "くつう", meaning_en: "misery, pain" },
      { word_id: "n2_1615", word_number: 1615, kanji: "スタッフ", furigana: "すたっふ", meaning_en: "staff" },
      { word_id: "n2_1616", word_number: 1616, kanji: "意地悪[する]", furigana: "いじわる", meaning_en: "malice, be spiteful" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 17 仕事",
    page_story: "239_1",
    japanese_text: "A：どうしたの？ さっきから<u>ため息</u>ばかりだけど。\nB：今度、<u>本部</u>で役員を相手に<u>プレゼンする</u>んですけど、すごい<u>プレッシャー</u>で...。\nA：じゃあ、この<u>お守り</u>をもっていくといいよ。\nB：ありがとうございます。失敗したときは<u>慰めて</u>ください。",
    english_translation: "A: What's wrong? You've been sighing for a while. B: I have to give a presentation to the board of directors at head office, and it's a lot of pressure... A: Then you should take this good-luck charm with you. B: Thank you very much. If it goes badly, please cheer me up.",
    annotated_words: [
      { word_id: "n2_1617", word_number: 1617, kanji: "ため息", furigana: "ためいき", meaning_en: "sigh" },
      { word_id: "n2_1618", word_number: 1618, kanji: "本部", furigana: "ほんぶ", meaning_en: "head office, headquarters" },
      { word_id: "n2_1619", word_number: 1619, kanji: "プレゼン[する]", furigana: "ぷれぜん", meaning_en: "presentation, give a presentation" },
      { word_id: "n2_1620", word_number: 1620, kanji: "プレッシャー", furigana: "ぷれっしゃー", meaning_en: "pressure" },
      { word_id: "n2_1621", word_number: 1621, kanji: "お守り", furigana: "おまもり", meaning_en: "good-luck charm" },
      { word_id: "n2_1622", word_number: 1622, kanji: "慰める", furigana: "なぐさめる", meaning_en: "console, cheer up" }
    ]
  }
];

topic17StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 17 story ${story.story_number}: ${story.page_story}.json`);
});
