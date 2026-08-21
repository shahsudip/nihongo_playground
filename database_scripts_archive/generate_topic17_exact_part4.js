import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 17 Stories (Work) - Part 4
const topic17StoriesPart4 = [
  {
    is_story: true,
    story_number: 17,
    title: "Topic 17 仕事",
    page_story: "244_1",
    japanese_text: "A：最近新しく入った<u>アシスタント</u>、すごく<u>頼もしい</u>よ。\nB：へー、どんなふうに？\nA：一つ一つの仕事の<u>処理</u>が、正確な上に速い。\nB：そうなんだ。うちの<u>人事</u>は優秀だね。<u>他</u>社では人事への不満をよく聞くけど。\nA：人事って、どうやって<u>雇う</u>人を選んでるんだろう。\nB：うーん...結局、<u>勘</u>じゃない？",
    english_translation: "A: The new assistant who joined us recently is very dependable. B: Oh, in what way? A: He handles every single job quickly and accurately. B: I see. HR at our company is excellent. You often hear complaints about HR at other companies. A: I wonder how HR selects the people they hire. B: Well ... in the end, it's just intuition, isn't it?",
    annotated_words: [
      { word_id: "n2_1658", word_number: 1658, kanji: "アシスタント", furigana: "あしすたんと", meaning_en: "assistant" },
      { word_id: "n2_1659", word_number: 1659, kanji: "頼もしい", furigana: "たのもしい", meaning_en: "dependable, promising" },
      { word_id: "n2_1660", word_number: 1660, kanji: "処理[する]", furigana: "しょり", meaning_en: "processing, handle" },
      { word_id: "n2_1661", word_number: 1661, kanji: "人事", furigana: "じんじ", meaning_en: "human resources, HR" },
      { word_id: "n2_1662", word_number: 1662, kanji: "他〜", furigana: "た", meaning_en: "other ~" },
      { word_id: "n2_1663", word_number: 1663, kanji: "雇う", furigana: "やとう", meaning_en: "hire, employ" },
      { word_id: "n2_1664", word_number: 1664, kanji: "勘", furigana: "かん", meaning_en: "intuition" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 17 仕事",
    page_story: "244_2",
    japanese_text: "文字を<u>確定する</u>と、過去のデータから<u>推測して</u>、次に使用する<u>確率</u>が高い文字を出してくれます。",
    english_translation: "Whenever you confirm a character, it makes a guess based on past data and suggests the most likely character to be used next.",
    annotated_words: [
      { word_id: "n2_1665", word_number: 1665, kanji: "確定[する]", furigana: "かくてい", meaning_en: "decision, confirm" },
      { word_id: "n2_1666", word_number: 1666, kanji: "推測[する]", furigana: "すいそく", meaning_en: "guess, estimate" },
      { word_id: "n2_1667", word_number: 1667, kanji: "確率", furigana: "かくりつ", meaning_en: "probability, likelihood" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 17 仕事",
    page_story: "245_1",
    japanese_text: "A：宛名の<u>形式</u>は、人が「様」、会社とか団体が「<u>御中</u>」ですよね。\nB：そうそう。\nA：「<u>御社</u>」と「<u>貴社</u>」はどう違うんでしたっけ。\nB：意味は同じだけど、「御社」は話し言葉で使われるかな。「貴社」は書き言葉。",
    english_translation: "A: In Japanese, the form of address is sama for a person and onchu for a company or organization, right? B: That's right. A: What is the difference between onsha and kisha? B: They mean the same thing, but onsha is used in spoken language and kisha is used when written.",
    annotated_words: [
      { word_id: "n2_1668", word_number: 1668, kanji: "形式", furigana: "けいしき", meaning_en: "form, format" },
      { word_id: "n2_1669", word_number: 1669, kanji: "御中", furigana: "おんちゅう", meaning_en: "for the attention of ... (form of address) (onchu)" },
      { word_id: "n2_1670", word_number: 1670, kanji: "御社", furigana: "おんしゃ", meaning_en: "your company (onsha)" },
      { word_id: "n2_1671", word_number: 1671, kanji: "貴社", furigana: "きしゃ", meaning_en: "your company (kisha)" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 17 仕事",
    page_story: "246_1",
    japanese_text: "ウイルス対策に協力した飲食店には、協力金が<u>平等に</u> <u>支給された</u>が、大きな飲食店からは<u>不平</u>不満も出ている。大きな飲食店は、家賃や給料を払うだけで<u>足が出る</u>からだ。",
    english_translation: "Restaurants cooperating with anti-viral measures were each provided with an equal amount of money, but there were some complaints from larger restaurants. This was because just paying rent and salaries meant large restaurants couldn't cover their expenses.",
    annotated_words: [
      { word_id: "n2_1672", word_number: 1672, kanji: "平等な", furigana: "びょうどうな", meaning_en: "equal" },
      { word_id: "n2_1673", word_number: 1673, kanji: "支給[する]", furigana: "しきゅう", meaning_en: "supply, provide" },
      { word_id: "n2_1674", word_number: 1674, kanji: "不平", furigana: "ふへい", meaning_en: "complaint, dissatisfaction" },
      { word_id: "n2_1675", word_number: 1675, kanji: "足が出る", furigana: "あしでる", meaning_en: "can't cover expenses, exceed budget" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 17 仕事",
    page_story: "246_2",
    japanese_text: "<u>下町</u>に腕のいい包丁<u>職人</u>がいると聞いたので、<u>取材</u>を申し込んだ。<u>頑固で</u>難しい性格の<u>持ち主</u>だそうなので、断られるかもしれないと思ったが、簡単に<u>了解して</u>もらった。",
    english_translation: "I'd heard there was a skilled knife-making artisan in downtown Tokyo, so I asked to interview him. I'd heard that the proprietor had a stubborn, difficult personality, so I thought he might refuse, but he readily agreed.",
    annotated_words: [
      { word_id: "n2_1676", word_number: 1676, kanji: "下町", furigana: "したまち", meaning_en: "downtown" },
      { word_id: "n2_1677", word_number: 1677, kanji: "職人", furigana: "しょくにん", meaning_en: "artisan, craftsperson" },
      { word_id: "n2_1678", word_number: 1678, kanji: "取材[する]", furigana: "しゅざい", meaning_en: "interview, interview" },
      { word_id: "n2_1679", word_number: 1679, kanji: "頑固な", furigana: "がんこな", meaning_en: "stubborn" },
      { word_id: "n2_1680", word_number: 1680, kanji: "持ち主", furigana: "もちぬし", meaning_en: "owner, proprietor" },
      { word_id: "n2_1681", word_number: 1681, kanji: "了解[する]", furigana: "りょうかい", meaning_en: "understand, agree" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 17 仕事",
    page_story: "247_1",
    japanese_text: "A：日本の会社では、上司と<u>日常的に</u>どう<u>接したら</u>いいですか？\nB：そうですね...仕事は<u>教わった</u>通りにするとか、言われたことには<u>言い返さず</u>、<u>うなずく</u>とか、<u>宴会</u>では誰よりも早くお酒をつぐとか、かな？\nA：えー...。",
    english_translation: "A: At a Japanese company, how should I interact with my boss on an everyday basis? B: Well ... do your job like you were taught, don't talk back when spoken to, nod your head, and pour the drinks before anyone else at banquets. Okay? A: Right ...",
    annotated_words: [
      { word_id: "n2_1682", word_number: 1682, kanji: "日常的な", furigana: "にちじょうてきな", meaning_en: "common, everyday" },
      { word_id: "n2_1683", word_number: 1683, kanji: "接する", furigana: "せっする", meaning_en: "interact" },
      { word_id: "n2_1684", word_number: 1684, kanji: "教わる", furigana: "おそわる", meaning_en: "be taught" },
      { word_id: "n2_1685", word_number: 1685, kanji: "言い返す", furigana: "いいかえす", meaning_en: "talk back (to someone)" },
      { word_id: "n2_1686", word_number: 1686, kanji: "うなずく", furigana: "", meaning_en: "nod" },
      { word_id: "n2_1687", word_number: 1687, kanji: "宴会", furigana: "えんかい", meaning_en: "banquet, party" }
    ]
  },
  {
    is_story: true,
    story_number: 23,
    title: "Topic 17 仕事",
    page_story: "248_1",
    japanese_text: "A：<u>オーダー</u>を間違えた<u>件</u>、A社に説明しに行くのは来週でもいいかな。\nB：何の<u>んきな</u>こと言ってるんですか。<u>至急</u>、A社に<u>アポ</u>をとって、謝りに行ってください。",
    english_translation: "A: I suppose I can visit Company A next week to explain about the matter of the mistake in the order. B: Why are you being so complacent about this? Make an appointment immediately with Company A so you can apologize.",
    annotated_words: [
      { word_id: "n2_1688", word_number: 1688, kanji: "オーダー[する]", furigana: "おーだー", meaning_en: "order, place an order" },
      { word_id: "n2_1689", word_number: 1689, kanji: "件", furigana: "けん", meaning_en: "matter, incident" },
      { word_id: "n2_1690", word_number: 1690, kanji: "のんきな", furigana: "", meaning_en: "carefree, complacent" },
      { word_id: "n2_1691", word_number: 1691, kanji: "至急", furigana: "しきゅう", meaning_en: "immediately, urgently" },
      { word_id: "n2_1692", word_number: 1692, kanji: "アポ(イントメント)", furigana: "あぽ", meaning_en: "appointment" }
    ]
  },
  {
    is_story: true,
    story_number: 24,
    title: "Topic 17 仕事",
    page_story: "248_2",
    japanese_text: "A：最後は<u>どうせ</u>社長が決めちゃうんでしょ？\nB：そうそう。若い<u>芽</u>を育てようとしないし、人を機械みたいに<u>乱暴に</u> <u>扱う</u>会社だからね。",
    english_translation: "A: Anyway, the CEO will make the final decision, right? B: That's right. This company doesn't try to tenderly nurture young buds-instead, it treats people without care, like they're machines.",
    annotated_words: [
      { word_id: "n2_1693", word_number: 1693, kanji: "どうせ", furigana: "", meaning_en: "anyway, in any event" },
      { word_id: "n2_1694", word_number: 1694, kanji: "芽", furigana: "め", meaning_en: "bud, sprout" },
      { word_id: "n2_1695", word_number: 1695, kanji: "乱暴な", furigana: "らんぼうな", meaning_en: "without care, rough, violent" },
      { word_id: "n2_1696", word_number: 1696, kanji: "扱う", furigana: "あつかう", meaning_en: "handle, treat" },
      { word_id: "n2_1697", word_number: 1697, kanji: "扱い", furigana: "あつかい", meaning_en: "handling, treatment" }
    ]
  },
  {
    is_story: true,
    story_number: 25,
    title: "Topic 17 仕事",
    page_story: "249_1",
    japanese_text: "A：<u>プログラミング</u>を<u>マスターすれば</u>、<u>フリーランス</u>で<u>いける</u>かな。\nB：私の知り合いに<u>SE</u>も兼ねてる<u>プログラマー</u>がいるけど、けっこう<u>稼いで</u>るみたい。",
    english_translation: "A: If I can master programming, I can do well as a freelancer. B: I know a programmer who's also an SE, and he seems to earn a lot.",
    annotated_words: [
      { word_id: "n2_1698", word_number: 1698, kanji: "プログラミング[する]", furigana: "ぷろぐらみんぐ", meaning_en: "programming, program" },
      { word_id: "n2_1699", word_number: 1699, kanji: "マスター[する]", furigana: "ますたー", meaning_en: "mastery, master" },
      { word_id: "n2_1700", word_number: 1700, kanji: "フリーランス", furigana: "ふりーらんす", meaning_en: "freelance" },
      { word_id: "n2_1701", word_number: 1701, kanji: "いける", furigana: "", meaning_en: "do well, go well" },
      { word_id: "n2_1702", word_number: 1702, kanji: "SE／システムエンジニア", furigana: "えすいー／しすてむえんじにあ", meaning_en: "SE (system engineer)" },
      { word_id: "n2_1703", word_number: 1703, kanji: "プログラマー", furigana: "ぷろぐらまー", meaning_en: "programmer" },
      { word_id: "n2_1704", word_number: 1704, kanji: "稼ぐ", furigana: "かせぐ", meaning_en: "earn" }
    ]
  },
  {
    is_story: true,
    story_number: 26,
    title: "Topic 17 仕事",
    page_story: "250_1",
    japanese_text: "愛社<u>精神</u>をもって会社に<u>貢献して</u>きたが、今回の事件で、会社への信用はすっかり<u>失われた</u>。もう会社として<u>おしまい</u>だ。",
    english_translation: "I've always tried to contribute to the company in a spirit of loyalty, but after this incident I've completely lost my trust in them. This company is finished.",
    annotated_words: [
      { word_id: "n2_1705", word_number: 1705, kanji: "精神", furigana: "せいしん", meaning_en: "spirit, mentality" },
      { word_id: "n2_1706", word_number: 1706, kanji: "貢献[する]", furigana: "こうけん", meaning_en: "contribution, contribute" },
      { word_id: "n2_1707", word_number: 1707, kanji: "失う", furigana: "うしなう", meaning_en: "lose" },
      { word_id: "n2_1708", word_number: 1708, kanji: "(お)しまい", furigana: "おしまい", meaning_en: "finish, end" }
    ]
  }
];

topic17StoriesPart4.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 17 story ${story.story_number}: ${story.page_story}.json`);
});
