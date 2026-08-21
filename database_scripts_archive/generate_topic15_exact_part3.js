import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 15 Stories (Travel) - Part 3
const topic15StoriesPart3 = [
  {
    is_story: true,
    story_number: 21,
    title: "Topic 15 旅行",
    page_story: "210_1",
    japanese_text: "冬に旅行したとき、北海道で車を借りた。私は普段から運転するのだが、<u>雪道</u>の運転には慣れていないので、<u>のろのろと</u>空港からホテルに向かった。たった30分でも雪道の運転は<u>どっと</u>疲れた。<u>助手席</u>に座っていた妻が心配そうに私を見ていた。ホテルの人が<u>今</u>シーズンは特に雪が多いと言っていた。",
    english_translation: "Once, traveling in winter, I rented a car in Hokkaido. I often drive, but I'm not used to driving on snowy roads, so I drove slowly from the airport to our hotel. After driving on snowy roads, even just for 30 minutes, I was suddenly exhausted. My wife, sitting in the passenger seat, looked at me with concern. The hotel staff said there'd been particularly heavy snowfall this season.",
    annotated_words: [
      { word_id: "n2_1400", word_number: 1400, kanji: "雪道", furigana: "ゆきみち", meaning_en: "snowy road" },
      { word_id: "n2_1401", word_number: 1401, kanji: "のろのろ(と)", furigana: "", meaning_en: "slowly" },
      { word_id: "n2_1402", word_number: 1402, kanji: "どっと", furigana: "", meaning_en: "suddenly" },
      { word_id: "n2_1403", word_number: 1403, kanji: "助手席", furigana: "じょしゅせき", meaning_en: "passenger seat" },
      { word_id: "n2_1405", word_number: 1405, kanji: "今〜", furigana: "こん", meaning_en: "this ~ (time)" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 15 旅行",
    page_story: "211_1",
    japanese_text: "家族旅行は<u>きっちり</u>計画を立てておいても、<u>思いがけない</u>ことが起こったり誰かがわがままを<u>言い出したり</u>して、なかなか計画通りにはいかない。",
    english_translation: "Even when your family vacation is precisely planned out, it doesn't always go according to plan because unexpected things happen or someone says something selfish.",
    annotated_words: [
      { word_id: "n2_1406", word_number: 1406, kanji: "きっちり(と)", furigana: "", meaning_en: "precisely" },
      { word_id: "n2_1407", word_number: 1407, kanji: "思いがけない", furigana: "おもいがけない", meaning_en: "unexpected" },
      { word_id: "n2_1408", word_number: 1408, kanji: "言い出す", furigana: "いいだす", meaning_en: "say, speak out" }
    ]
  },
  {
    is_story: true,
    story_number: 23,
    title: "Topic 15 旅行",
    page_story: "211_2",
    japanese_text: "日本政府は、公衆トイレの<u>洋式</u>化をすすめている。外国人旅行者からの「<u>和式</u>トイレの使い方が分からない」という声を受けて、駅や観光地にある公衆トイレの整備を<u>補助して</u>いる。汚い、臭い、危険な「公衆<u>便所</u>」から、清潔で安心な「公衆トイレ」に生まれ変わろうとしている。",
    english_translation: "The Japanese government is promoting a shift toward Western-style public restrooms. In response to comments from foreign travelers unfamiliar with using Japanese-style squat toilets, the government is subsidizing the construction of public restrooms at train stations and tourist attractions. These will be transformed from dirty, smelly, dangerous public restrooms to clean and safe public amenities.",
    annotated_words: [
      { word_id: "n2_1409", word_number: 1409, kanji: "洋式", furigana: "ようしき", meaning_en: "Western-style" },
      { word_id: "n2_1410", word_number: 1410, kanji: "和式", furigana: "わしき", meaning_en: "Japanese-style" },
      { word_id: "n2_1412", word_number: 1412, kanji: "補助[する]", furigana: "ほじょ", meaning_en: "subsidy, subsidize" },
      { word_id: "n2_1413", word_number: 1413, kanji: "便所", furigana: "べんじょ", meaning_en: "restroom" }
    ]
  },
  {
    is_story: true,
    story_number: 24,
    title: "Topic 15 旅行",
    page_story: "212_1",
    japanese_text: "A：来月、<u>長期</u>休暇取るんだって？\nB：はい。ビザの<u>申請</u>がうまくいったら、オーストラリアでファームステイをしたいと思っていて。\nA：ファームステイ？何それ？\nB：留学みたいなものなんですが、<u>牧場</u>の<u>オーナー</u>の家に<u>宿泊して</u>動物の世話をしたり農作業を手伝ったりしながら英語を勉強するんです。",
    english_translation: "A: I hear you're taking a long-term vacation next month. B: Yes. If my visa application is successful, I hope to do a farm stay in Australia. A: A farm stay? What's that? B: It's like studying abroad, but you stay at a farm owner's house and study English while taking care of the animals and helping with the farm work.",
    annotated_words: [
      { word_id: "n2_1415", word_number: 1415, kanji: "長期", furigana: "ちょうき", meaning_en: "long term, long period" },
      { word_id: "n2_1417", word_number: 1417, kanji: "申請[する]", furigana: "しんせい", meaning_en: "application, apply" },
      { word_id: "n2_1418", word_number: 1418, kanji: "牧場", furigana: "ぼくじょう", meaning_en: "farm, ranch" },
      { word_id: "n2_1419", word_number: 1419, kanji: "オーナー", furigana: "おーなー", meaning_en: "owner" },
      { word_id: "n2_1420", word_number: 1420, kanji: "宿泊[する]", furigana: "しゅくはく", meaning_en: "accommodation, stay" }
    ]
  },
  {
    is_story: true,
    story_number: 25,
    title: "Topic 15 旅行",
    page_story: "213_1",
    japanese_text: "<u>近頃</u>、一人で<u>テント</u>を<u>張って</u>キャンプをする「ソロキャン」が人気だ。一人でも簡単に<u>組み立てられる</u>タイプのテントがあるので、手軽に本格的なキャンプが楽しめる。<u>慌ただしい</u>日常から離れて過ごせば、いい<u>休養</u>になるし、自然の素晴らしさも<u>しみじみと</u>感じられるだろう。",
    english_translation: "In recent times, solo camping, in which a person pitches a tent and camps alone, has become more popular. Some tents can easily be assembled by a single person, making it easy to enjoy authentic camping. Spending time away from the hectic pace of everyday life is a great way to take a break and quietly experience the wonders of nature.",
    annotated_words: [
      { word_id: "n2_1421", word_number: 1421, kanji: "近頃", furigana: "ちかごろ", meaning_en: "recent times, nowadays" },
      { word_id: "n2_1422", word_number: 1422, kanji: "テント", furigana: "てんと", meaning_en: "tent" },
      { word_id: "n2_1423", word_number: 1423, kanji: "張る", furigana: "はる", meaning_en: "stretch, pitch (a tent)" },
      { word_id: "n2_1424", word_number: 1424, kanji: "組み立てる", furigana: "くみたてる", meaning_en: "assemble" },
      { word_id: "n2_1425", word_number: 1425, kanji: "慌ただしい", furigana: "あわただしい", meaning_en: "hectic, rushed" },
      { word_id: "n2_1426", word_number: 1426, kanji: "休養[する]", furigana: "きゅうよう", meaning_en: "relaxation, take a break" },
      { word_id: "n2_1427", word_number: 1427, kanji: "しみじみ(と)", furigana: "", meaning_en: "quietly, profoundly" }
    ]
  }
];

topic15StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 15 story ${story.story_number}: ${story.page_story}.json`);
});
