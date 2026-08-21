import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 17 Stories (Work) - Part 3
const topic17StoriesPart3 = [
  {
    is_story: true,
    story_number: 9,
    title: "Topic 17 仕事",
    page_story: "240_1",
    japanese_text: "A：昨日のプレゼン、どうだった？\nB：まあまあです...。<u>ベテラン</u>社員から<u>鋭い</u>意見が出たときは、ちょっと<u>パニック</u>になっちゃいましたけど。\nA：確かにそんなとき<u>冷静で</u>いるのは難しいよね。",
    english_translation: "A: How was your presentation yesterday? B: Not too bad ... I did get a little panicked when a veteran employee made a pointed comment. A: It's not easy to stay calm at times like that, is it?",
    annotated_words: [
      { word_id: "n2_1623", word_number: 1623, kanji: "ベテラン", furigana: "べてらん", meaning_en: "veteran" },
      { word_id: "n2_1624", word_number: 1624, kanji: "鋭い", furigana: "するどい", meaning_en: "sharp, pointed" },
      { word_id: "n2_1625", word_number: 1625, kanji: "パニック", furigana: "ぱにっく", meaning_en: "panic" },
      { word_id: "n2_1626", word_number: 1626, kanji: "冷静な", furigana: "れいせいな", meaning_en: "calm" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 17 仕事",
    page_story: "240_2",
    japanese_text: "新型コロナウイルスが流行して<u>以来</u>、<u>飲食店</u>には厳しい<u>衛生</u>管理が求められるようになった。",
    english_translation: "Since the outbreak of COVID-19, restaurants and bars have been required to maintain strict hygiene.",
    annotated_words: [
      { word_id: "n2_1627", word_number: 1627, kanji: "以来", furigana: "いらい", meaning_en: "since" },
      { word_id: "n2_1628", word_number: 1628, kanji: "飲食[する]", furigana: "いんしょく", meaning_en: "food and beverages, eat and drink" },
      { word_id: "n2_1629", word_number: 1629, kanji: "衛生", furigana: "えいせい", meaning_en: "hygiene" },
      { word_id: "n2_1630", word_number: 1630, kanji: "衛生的な", furigana: "えいせいてきな", meaning_en: "hygienic" },
      { word_id: "n2_1631", word_number: 1631, kanji: "不衛生な", furigana: "ふえいせいな", meaning_en: "unhygienic" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 17 仕事",
    page_story: "241_1",
    japanese_text: "A：<u>部下</u>が<u>有能</u>なら、<u>上司</u>は<u>必ずしも</u>有能<u>じゃなくて</u>もいいよね。\nB：有能じゃなくてもいいけど、うちの上司みたいに<u>無能だ</u>と部下が迷惑するよ。",
    english_translation: "A: If those working under him are capable, the boss doesn't necessarily have to be capable. B: He doesn't have to be capable, but if he's as incompetent as our boss, the people working under him will be annoyed.",
    annotated_words: [
      { word_id: "n2_1632", word_number: 1632, kanji: "部下", furigana: "ぶか", meaning_en: "subordinate, those working under (someone)" },
      { word_id: "n2_1633", word_number: 1633, kanji: "有能な", furigana: "ゆうのうな", meaning_en: "capable, competent" },
      { word_id: "n2_1634", word_number: 1634, kanji: "上司", furigana: "じょうし", meaning_en: "boss, superior" },
      { word_id: "n2_1635", word_number: 1635, kanji: "必ずしも〜ない", furigana: "かならずしも〜ない", meaning_en: "not necessarily" },
      { word_id: "n2_1636", word_number: 1636, kanji: "無能な", furigana: "むのうな", meaning_en: "incompetent" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 17 仕事",
    page_story: "241_2",
    japanese_text: "会議で<u>打ち合わせる</u>前に、<u>文書</u>を<u>回覧して</u>、先に<u>目を通して</u>おいてもらうといい。",
    english_translation: "Before discussing the matter at the meeting, you can circulate the document and ask people to look it over first.",
    annotated_words: [
      { word_id: "n2_1637", word_number: 1637, kanji: "打ち合わせる", furigana: "うちあわせる", meaning_en: "discuss, make arrangements" },
      { word_id: "n2_1638", word_number: 1638, kanji: "打ち合わせ", furigana: "うちあわせ", meaning_en: "meeting" },
      { word_id: "n2_1639", word_number: 1639, kanji: "文書", furigana: "ぶんしょ", meaning_en: "document" },
      { word_id: "n2_1640", word_number: 1640, kanji: "回覧[する]", furigana: "かいらん", meaning_en: "circulation, circulate" },
      { word_id: "n2_1641", word_number: 1641, kanji: "目を通す", furigana: "めをとおす", meaning_en: "look over" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 17 仕事",
    page_story: "242_1",
    japanese_text: "A：あの人、<u>重役</u>なのによく<u>現場</u>に顔を出すし、誰と話すときも敬語を使うよね。\nB：そうそう。<u>従業員</u>にもいろいろ質問して学ぼうとするし、すごく<u>謙虚な</u>人だよね。",
    english_translation: "A: Even though she's an executive, she often shows up in the workplace and uses very courteous language when she talks. B: That's right. She asks the employees all kinds of questions and tries to learn from them, and she seems very humble.",
    annotated_words: [
      { word_id: "n2_1642", word_number: 1642, kanji: "重役", furigana: "じゅうやく", meaning_en: "executive" },
      { word_id: "n2_1643", word_number: 1643, kanji: "現場", furigana: "げんば", meaning_en: "site, workplace" },
      { word_id: "n2_1644", word_number: 1644, kanji: "従業員", furigana: "じゅうぎょういん", meaning_en: "employee" },
      { word_id: "n2_1645", word_number: 1645, kanji: "謙虚な", furigana: "けんきょな", meaning_en: "humble, unassuming" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 17 仕事",
    page_story: "242_2",
    japanese_text: "<u>求人</u>サイトに「<u>急募</u>」と書いてある<u>倉庫</u>のバイトを申し込んだら、<u>人手</u>が足りていないようで、明日から来てくれと言われた。",
    english_translation: "I applied for a part-time job at a warehouse that said \"Urgently seeking workers\" on the recruitment site. They were short-staffed and asked me to come in the very next day.",
    annotated_words: [
      { word_id: "n2_1646", word_number: 1646, kanji: "求人[する]", furigana: "きゅうじん", meaning_en: "recruitment, recruit" },
      { word_id: "n2_1647", word_number: 1647, kanji: "急募[する]", furigana: "きゅうぼ", meaning_en: "urgent recruitment, urgently seek workers" },
      { word_id: "n2_1648", word_number: 1648, kanji: "倉庫", furigana: "そうこ", meaning_en: "warehouse" },
      { word_id: "n2_1649", word_number: 1649, kanji: "人手", furigana: "ひとで", meaning_en: "staff, worker" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 17 仕事",
    page_story: "243_1",
    japanese_text: "<u>助手</u>だった頃は給料が低かったので、たくさんの仕事を<u>受け持ち</u>、<u>狂った</u>ように働きました。それで、<u>正社員</u>になって早く苦しい生活を抜け出したかったんです。",
    english_translation: "When I was an assistant, my salary was low, so I took on a lot of work and worked like crazy. I wanted to become a full-time employee and escape that hard life as soon as possible.",
    annotated_words: [
      { word_id: "n2_1650", word_number: 1650, kanji: "助手", furigana: "じょしゅ", meaning_en: "assistant" },
      { word_id: "n2_1651", word_number: 1651, kanji: "受け持つ", furigana: "うけもつ", meaning_en: "take on, take charge of" },
      { word_id: "n2_1652", word_number: 1652, kanji: "狂う", furigana: "くるう", meaning_en: "go crazy, be mad" },
      { word_id: "n2_1653", word_number: 1653, kanji: "正社員", furigana: "せいしゃいん", meaning_en: "full-time employee" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 17 仕事",
    page_story: "243_2",
    japanese_text: "イベントのポスターを、<u>各</u>階の掲示板に<u>貼って</u>おいてもらえますか。全部で8<u>箇所</u>です。で、イベントが終わったら、忘れずに<u>剥がして</u>おいてください。",
    english_translation: "Could you please put up posters for the event on the noticeboards on each floor? There are eight locations in total. Also, please remember to take them down after the event.",
    annotated_words: [
      { word_id: "n2_1654", word_number: 1654, kanji: "各〜", furigana: "かく", meaning_en: "each ~" },
      { word_id: "n2_1655", word_number: 1655, kanji: "貼る／張る", furigana: "はる", meaning_en: "put up, affix, attach" },
      { word_id: "n2_1656", word_number: 1656, kanji: "〜箇所", furigana: "かしょ", meaning_en: "locations, ~ places" },
      { word_id: "n2_1657", word_number: 1657, kanji: "剥がす", furigana: "はがす", meaning_en: "take down, peel off" }
    ]
  }
];

topic17StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 17 story ${story.story_number}: ${story.page_story}.json`);
});
