import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 18 Stories (Life) - Part 1
const topic18StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 18 人生",
    page_story: "251_1",
    japanese_text: "彼女と私は<u>一人っ子</u> <u>同士</u>で、彼女の家族から<u>婿</u>にと<u>望まれた</u>が、うちの<u>親</u>が許さなかった。結局親に<u>逆らって</u>結婚した。",
    english_translation: "Both she and I are only children, and her family had hoped to adopt me as a son-in-law into their family, but my parents wouldn't allow it. In the end, we went against her parents' wishes when we married.",
    annotated_words: [
      { word_id: "n2_1709", word_number: 1709, kanji: "一人っ子", furigana: "ひとりっこ", meaning_en: "only child" },
      { word_id: "n2_1710", word_number: 1710, kanji: "同士", furigana: "どうし", meaning_en: "both, fellow" },
      { word_id: "n2_1711", word_number: 1711, kanji: "婿", furigana: "むこ", meaning_en: "bridegroom, son-in-law" },
      { word_id: "n2_1712", word_number: 1712, kanji: "嫁", furigana: "よめ", meaning_en: "bride, daughter-in-law" },
      { word_id: "n2_1713", word_number: 1713, kanji: "望む", furigana: "のぞむ", meaning_en: "hope" },
      { word_id: "n2_1714", word_number: 1714, kanji: "親", furigana: "おや", meaning_en: "parent" },
      { word_id: "n2_1715", word_number: 1715, kanji: "逆らう", furigana: "さからう", meaning_en: "defy, go against" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 18 人生",
    page_story: "252_1",
    japanese_text: "貯金を全部はたいて、<u>花嫁</u>が<u>憧れていた</u>豪華な結婚<u>式</u>を挙げた。家族や友達の前で<u>永久</u>の愛を<u>誓った</u>が、その一年後に<u>離婚した</u>。<u>詐欺</u>にあったような気がしている。",
    english_translation: "The bride spent all her savings on the lavish wedding ceremony that she'd always longed for. The couple pledged their eternal love before family and friends, but a year later they got divorced. It feels as if she's been swindled.",
    annotated_words: [
      { word_id: "n2_1716", word_number: 1716, kanji: "花嫁", furigana: "はなよめ", meaning_en: "bride" },
      { word_id: "n2_1717", word_number: 1717, kanji: "憧れる", furigana: "あこがれる", meaning_en: "long for" },
      { word_id: "n2_1718", word_number: 1718, kanji: "式", furigana: "しき", meaning_en: "ceremony" },
      { word_id: "n2_1719", word_number: 1719, kanji: "永久", furigana: "えいきゅう", meaning_en: "eternity, forever" },
      { word_id: "n2_1720", word_number: 1720, kanji: "誓う", furigana: "ちかう", meaning_en: "pledge, swear" },
      { word_id: "n2_1721", word_number: 1721, kanji: "離婚[する]", furigana: "りこん", meaning_en: "divorce, get divorced" },
      { word_id: "n2_1722", word_number: 1722, kanji: "詐欺", furigana: "さぎ", meaning_en: "fraud, swindle" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 18 人生",
    page_story: "252_2",
    japanese_text: "<u>マスコミ</u> <u>関連</u>企業でカメラマンとして働いていたが、<u>独立し</u>、フリーで活動している。<u>もうかって</u>はいないが、仕事の依頼は<u>順調で</u>、何より煩わしい人間関係に振り回されることなく、<u>伸び伸びと</u>好きな写真を撮れるのがよい。",
    english_translation: "I used to work as a photographer for a media-related company, but I have since set up my own independent business and am now working as a freelance photographer. Although I don't make good money, job offers come in steadily, and most importantly, I can just take whatever photos I like in a relaxing way without interference by annoying interpersonal relationships.",
    annotated_words: [
      { word_id: "n2_1723", word_number: 1723, kanji: "マスコミ", furigana: "ますこみ", meaning_en: "media, mass media" },
      { word_id: "n2_1724", word_number: 1724, kanji: "関連[する]", furigana: "かんれん", meaning_en: "relationship, be related" },
      { word_id: "n2_1725", word_number: 1725, kanji: "独立[する]", furigana: "どくりつ", meaning_en: "independence, be independent" },
      { word_id: "n2_1726", word_number: 1726, kanji: "フリーな", furigana: "ふりーな", meaning_en: "free" },
      { word_id: "n2_1727", word_number: 1727, kanji: "もうかる", furigana: "", meaning_en: "make good money, be profitable" },
      { word_id: "n2_1728", word_number: 1728, kanji: "もうける", furigana: "", meaning_en: "earn (money), generate" },
      { word_id: "n2_1729", word_number: 1729, kanji: "順調な", furigana: "じゅんちょうな", meaning_en: "steady, favorable" },
      { word_id: "n2_1730", word_number: 1730, kanji: "伸び伸びと", furigana: "のびのびと", meaning_en: "in a relaxing way" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 18 人生",
    page_story: "253_1",
    japanese_text: "推薦で大学に入学したものの、<u>明確な</u> <u>目標</u>もなく<u>ぼんやり</u>過ごしていたら、卒業単位が足りなくなり、一年<u>ダブって</u>しまった。",
    english_translation: "I entered university on a recommendation, but I didn't have a clear goal in mind and was just living aimlessly. I didn't have enough credits to graduate, so I had to repeat a year.",
    annotated_words: [
      { word_id: "n2_1731", word_number: 1731, kanji: "明確な", furigana: "めいかくな", meaning_en: "clear" },
      { word_id: "n2_1732", word_number: 1732, kanji: "目標", furigana: "もくひょう", meaning_en: "goal, objective" },
      { word_id: "n2_1733", word_number: 1733, kanji: "ぼんやり", furigana: "", meaning_en: "aimlessly, absent-mindedly" },
      { word_id: "n2_1734", word_number: 1734, kanji: "ダブる", furigana: "だぶる", meaning_en: "double, repeat a year" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 18 人生",
    page_story: "254_1",
    japanese_text: "このままでは<u>もしかすると</u>卒業できないかもしれないと<u>教員</u>から言われ、心を入れ替えることにした。",
    english_translation: "A faculty member told me that I perhaps I'd never graduate if I continued at this rate, so I decided to change my approach.",
    annotated_words: [
      { word_id: "n2_1735", word_number: 1735, kanji: "もしかすると／もしかしたら／もしかして", furigana: "", meaning_en: "perhaps, maybe" },
      { word_id: "n2_1736", word_number: 1736, kanji: "教員", furigana: "きょういん", meaning_en: "faculty member, teacher" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 18 人生",
    page_story: "254_2",
    japanese_text: "私は子どもの頃、親の愛情に<u>飢えて</u>いた。<u>大企業</u>に勤める両親はいつも忙しく、誕生日もまともに祝ってもらえなかった。だから私は娘の<u>出産</u>を機に<u>退職する</u>。娘の誕生日会を開くという夢を<u>叶えたい</u>。",
    english_translation: "When I was a child, I was starved for my parents' love. My parents, who both worked for large companies, were always busy and never celebrated my birthday properly. So I resigned from my job after the birth of my daughter. I want to fulfill my dream by throwing birthday parties for my daughter.",
    annotated_words: [
      { word_id: "n2_1737", word_number: 1737, kanji: "飢える", furigana: "うえる", meaning_en: "starve" },
      { word_id: "n2_1738", word_number: 1738, kanji: "大企業", furigana: "だいきぎょう", meaning_en: "large company" },
      { word_id: "n2_1739", word_number: 1739, kanji: "中小企業", furigana: "ちゅうしょうきぎょう", meaning_en: "small and medium companies" },
      { word_id: "n2_1740", word_number: 1740, kanji: "出産[する]", furigana: "しゅっさん", meaning_en: "birth, give birth" },
      { word_id: "n2_1741", word_number: 1741, kanji: "退職[する]", furigana: "たいしょく", meaning_en: "retirement, resign from a job" },
      { word_id: "n2_1742", word_number: 1742, kanji: "叶える", furigana: "かなえる", meaning_en: "fulfil, grant" },
      { word_id: "n2_1743", word_number: 1743, kanji: "叶う", furigana: "かなう", meaning_en: "be granted, be realized" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 18 人生",
    page_story: "255_1",
    japanese_text: "私は結婚相手に求める条件が多い。友人からは<u>欲張りだ</u>と言われるが、<u>年収</u>、<u>学歴</u>、<u>職歴</u>はどうしても譲れない。そんな私に、<u>お見合い</u>は条件に合った人を見つけられる<u>合理的な</u> <u>選択肢</u>だ。",
    english_translation: "I have a lot of requirements for a partner in marriage. My friends say I'm avaricious, but I won't compromise on income, educational background, and work experience. For me, matchmaking is a reasonable option to find someone who meets my requirements.",
    annotated_words: [
      { word_id: "n2_1744", word_number: 1744, kanji: "欲張りな", furigana: "よくばりな", meaning_en: "avaricious, greedy" },
      { word_id: "n2_1745", word_number: 1745, kanji: "年収", furigana: "ねんしゅう", meaning_en: "(annual) income" },
      { word_id: "n2_1746", word_number: 1746, kanji: "学歴", furigana: "がくれき", meaning_en: "educational background" },
      { word_id: "n2_1747", word_number: 1747, kanji: "職歴", furigana: "しょくれき", meaning_en: "work experience" },
      { word_id: "n2_1748", word_number: 1748, kanji: "(お)見合い[する]", furigana: "おみあい", meaning_en: "matchmaking, matchmake" },
      { word_id: "n2_1749", word_number: 1749, kanji: "合理的な", furigana: "ごうりてきな", meaning_en: "reasonable" },
      { word_id: "n2_1750", word_number: 1750, kanji: "合理化[する]", furigana: "ごうりか", meaning_en: "rationalization, rationalize" },
      { word_id: "n2_1751", word_number: 1751, kanji: "選択肢", furigana: "せんたくし", meaning_en: "option" }
    ]
  }
];

topic18StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 18 story ${story.story_number}: ${story.page_story}.json`);
});
