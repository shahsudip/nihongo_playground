import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 16 Stories (School) - Part 4
const topic16StoriesPart4 = [
  {
    is_story: true,
    story_number: 19,
    title: "Topic 16 学校",
    page_story: "226_1",
    japanese_text: "小学生の頃は絵が得意で、<u>コンテスト</u>に応募してみたが、<u>賞</u>は取れなかった。その悔しさを<u>ばね</u>にして、今は<u>本格的に</u>絵の勉強をしている。",
    english_translation: "In elementary school, I was good at drawing and entered a contest, but didn't win any prizes. Using that frustration as a springboard, I'm now studying painting in earnest.",
    annotated_words: [
      { word_id: "n2_1521", word_number: 1521, kanji: "コンテスト", furigana: "こんてすと", meaning_en: "contest" },
      { word_id: "n2_1522", word_number: 1522, kanji: "賞", furigana: "しょう", meaning_en: "prize" },
      { word_id: "n2_1523", word_number: 1523, kanji: "賞金", furigana: "しょうきん", meaning_en: "prize money" },
      { word_id: "n2_1524", word_number: 1524, kanji: "ばね", furigana: "", meaning_en: "springboard" },
      { word_id: "n2_1525", word_number: 1525, kanji: "本格的な", furigana: "ほんかくてきな", meaning_en: "earnest, fully-fledged" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 16 学校",
    page_story: "226_2",
    japanese_text: "A：あ！さっきの試験、<u>答案</u>に名前を書くのを忘れた！\nB：名前を書き忘れる<u>なんて</u>、ドジだなあ。\nA：Bさんだって、この前の試験で嘘の選択肢に<u>引っかかって</u>たじゃない。",
    english_translation: "A: Ah! I forgot to write my name on the exam paper! B: You forget to write your name? How dumb you are. A: Well, you got stuck on a false choice answer in the last exam, didn't you?",
    annotated_words: [
      { word_id: "n2_1526", word_number: 1526, kanji: "答案", furigana: "とうあん", meaning_en: "exam paper, answer sheet" },
      { word_id: "n2_1527", word_number: 1527, kanji: "〜なんて", furigana: "", meaning_en: "how ~, what ~ (exclamation)" },
      { word_id: "n2_1528", word_number: 1528, kanji: "引っかかる", furigana: "ひっかかる", meaning_en: "get stuck, get caught" },
      { word_id: "n2_1529", word_number: 1529, kanji: "引っかける", furigana: "ひっかける", meaning_en: "catch, hook" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 16 学校",
    page_story: "227_1",
    japanese_text: "私がいた野球部は、昔は強かったが、私が入った頃はだらだら練習する<u>緩い</u>雰囲気で、全然強くなかった。しかし、監督が<u>交代して</u>野球の楽しさを知り、練習中も一<u>球</u>一<u>球</u>全力で投げるようになった。その結果、<u>再び</u>強くなり、みんなが一つになれた。この経験を通して、監督という<u>役割</u>の大きさを知った。",
    english_translation: "My old baseball team was previously competitive, but when I joined the team, it wasn't strong at all, with a casual atmosphere and sloppy practice. However, after the coach was replaced, the team learned to enjoy baseball and began to throw every single ball as hard as they could during practice. As a result, the team got strong once more and all the players were united. This experience taught me the significance of the coach's role.",
    annotated_words: [
      { word_id: "n2_1530", word_number: 1530, kanji: "緩い", furigana: "ゆるい", meaning_en: "loose, casual" },
      { word_id: "n2_1531", word_number: 1531, kanji: "交代[する]", furigana: "こうたい", meaning_en: "replacement, replace" },
      { word_id: "n2_1532", word_number: 1532, kanji: "〜球", furigana: "きゅう", meaning_en: "~ ball" },
      { word_id: "n2_1533", word_number: 1533, kanji: "球", furigana: "きゅう", meaning_en: "sphere" },
      { word_id: "n2_1534", word_number: 1534, kanji: "再び", furigana: "ふたたび", meaning_en: "again, once more" },
      { word_id: "n2_1535", word_number: 1535, kanji: "役割", furigana: "やくわり", meaning_en: "role" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 16 学校",
    page_story: "228_1",
    japanese_text: "私のクラスは<u>学級</u> <u>対抗</u>の<u>縄跳び</u>大会で優勝した。練習中はクラス内で練習方法について<u>対立する</u>こともあったが、最後はみんなで作戦を<u>練って</u>大会に挑んだ。その思い出は、この<u>賞状</u>よりも価値があると思う。",
    english_translation: "My class won the jump rope competition between opposing classes. During practice, at times the class disagreed about how to practice, but in the end we came up with a strategy together and really challenged the competition. That memory is even more valuable than this certificate, I think.",
    annotated_words: [
      { word_id: "n2_1536", word_number: 1536, kanji: "学級", furigana: "がっきゅう", meaning_en: "school class" },
      { word_id: "n2_1537", word_number: 1537, kanji: "対抗[する]", furigana: "たいこう", meaning_en: "opposition, oppose" },
      { word_id: "n2_1538", word_number: 1538, kanji: "縄跳び", furigana: "なわとび", meaning_en: "jump rope" },
      { word_id: "n2_1539", word_number: 1539, kanji: "縄", furigana: "なわ", meaning_en: "rope" },
      { word_id: "n2_1540", word_number: 1540, kanji: "対立[する]", furigana: "たいりつ", meaning_en: "confrontation, disagree" },
      { word_id: "n2_1541", word_number: 1541, kanji: "練る", furigana: "ねる", meaning_en: "come up with, work out" },
      { word_id: "n2_1542", word_number: 1542, kanji: "賞状", furigana: "しょうじょう", meaning_en: "award, certificate" }
    ]
  },
  {
    is_story: true,
    story_number: 23,
    title: "Topic 16 学校",
    page_story: "228_2",
    japanese_text: "初舞台の前、台詞を<u>必死に</u>覚えて当日を迎えたが、舞台で大勢のお客さんを見ると<u>上がって</u>しまい、一言も言えずに終わってしまった。ところが<u>明くる</u>日、あの演技が良かったとたくさんの人に褒められた。",
    english_translation: "Before my first performance, I tried desperately to memorize my lines, but when I went up on stage and saw the large audience, I got so nervous that I couldn't say a word. But the following day, many people praised my performance.",
    annotated_words: [
      { word_id: "n2_1543", word_number: 1543, kanji: "必死な", furigana: "ひっしな", meaning_en: "desperate, urgent" },
      { word_id: "n2_1544", word_number: 1544, kanji: "上がる", furigana: "あがる", meaning_en: "get nervous" },
      { word_id: "n2_1545", word_number: 1545, kanji: "明くる", furigana: "あくる", meaning_en: "next, following" }
    ]
  },
  {
    is_story: true,
    story_number: 24,
    title: "Topic 16 学校",
    page_story: "229_2",
    japanese_text: "学校の理科室には、一般的には見られないような<u>特殊な</u> <u>薬品</u>が多くある。中学のときは、先生から薬品を扱うときには気をつけるよう何度も言われ、<u>脅かして</u>いるだけだと思っていたが、実際危険なので子どもは本当に気をつけなければならない。",
    english_translation: "The science lab at my school contains many special chemicals not generally found. When I was in junior high school, my teacher always told me to be careful when handling the chemicals. Although I thought he was just trying to scare me, in fact they really are dangerous and children do need to be careful.",
    annotated_words: [
      { word_id: "n2_1546", word_number: 1546, kanji: "特殊な", furigana: "とくしゅな", meaning_en: "special" },
      { word_id: "n2_1547", word_number: 1547, kanji: "薬品", furigana: "やくひん", meaning_en: "chemicals" },
      { word_id: "n2_1548", word_number: 1548, kanji: "脅かす", furigana: "おどかす", meaning_en: "scare, threaten" }
    ]
  },
  {
    is_story: true,
    story_number: 25,
    title: "Topic 16 学校",
    page_story: "230_1",
    japanese_text: "子どもは悪いと思わず、「<u>不潔だ</u>」などと友達を<u>からかったり</u>、時には<u>ぶったり</u>している。本人は遊びの<u>延長</u>のつもりでも、相手が苦痛を感じればいじめとなることを教える必要がある。",
    english_translation: "Children may tease their friends for being \"filthy\" or sometimes even hit another child without knowing it is wrong. We need to teach them that even if it is just an extension of play, if the other person feels hurt, this is bullying.",
    annotated_words: [
      { word_id: "n2_1549", word_number: 1549, kanji: "不潔な", furigana: "ふけつな", meaning_en: "filthy" },
      { word_id: "n2_1550", word_number: 1550, kanji: "からかう", furigana: "", meaning_en: "tease" },
      { word_id: "n2_1551", word_number: 1551, kanji: "ぶつ", furigana: "", meaning_en: "hit, strike" },
      { word_id: "n2_1552", word_number: 1552, kanji: "延長[する]", furigana: "えんちょう", meaning_en: "extension, extend" }
    ]
  },
  {
    is_story: true,
    story_number: 26,
    title: "Topic 16 学校",
    page_story: "230_2",
    japanese_text: "A：この<u>課</u>の<u>筆記</u>試験はどのような問題が出ますか。\nB：そうですね。まず、漢字を<u>書き取る</u>問題、それから文章をまとめる問題です。例えば「空いている<u>箇所</u>に言葉を<u>当てはめて</u>作者の言いたいことをまとめなさい」のような。",
    english_translation: "A: What kind of questions will be on the written test in this section? B: Well, there will be questions involving dictation of kanji characters and summarizing sentences. For example, \"Summarize what the author is trying to say by fitting words into the blank spaces.\"",
    annotated_words: [
      { word_id: "n2_1553", word_number: 1553, kanji: "課", furigana: "か", meaning_en: "section" },
      { word_id: "n2_1554", word_number: 1554, kanji: "筆記[する]", furigana: "ひっき", meaning_en: "writing, write" },
      { word_id: "n2_1555", word_number: 1555, kanji: "筆記用具", furigana: "ひっきようぐ", meaning_en: "writing implements" },
      { word_id: "n2_1556", word_number: 1556, kanji: "書き取る", furigana: "かきとる", meaning_en: "transcribe, take dictation" },
      { word_id: "n2_1557", word_number: 1557, kanji: "箇所", furigana: "かしょ", meaning_en: "place, space" },
      { word_id: "n2_1558", word_number: 1558, kanji: "当てはめる", furigana: "あてはめる", meaning_en: "apply, fit in" },
      { word_id: "n2_1559", word_number: 1559, kanji: "当てはまる", furigana: "あてはまる", meaning_en: "be applicable" }
    ]
  },
  {
    is_story: true,
    story_number: 27,
    title: "Topic 16 学校",
    page_story: "231_1",
    japanese_text: "学校で行っている<u>募金</u>活動の<u>規模</u>を広げ、今年から学外でも行うようにした。その結果、去年の分も<u>含め</u>100万円以上を環境保護団体に<u>寄付する</u>ことができた。今後もこの活動は<u>継続し</u>ていきたい。",
    english_translation: "We've expanded the scale of our fund-raising activities at the school, and starting this year, we've also been holding them off-campus. As a result, including last year's amount, we've been able to donate more than 1 million yen to environmental conservation groups. We intend to continue these activities in the future.",
    annotated_words: [
      { word_id: "n2_1560", word_number: 1560, kanji: "募金[する]", furigana: "ぼきん", meaning_en: "fund-raising, raise funds" },
      { word_id: "n2_1561", word_number: 1561, kanji: "規模", furigana: "きぼ", meaning_en: "scale" },
      { word_id: "n2_1562", word_number: 1562, kanji: "含める", furigana: "ふくめる", meaning_en: "include" },
      { word_id: "n2_1563", word_number: 1563, kanji: "含む", furigana: "ふくむ", meaning_en: "integrate, contain" },
      { word_id: "n2_1564", word_number: 1564, kanji: "寄付[する]", furigana: "きふ", meaning_en: "donation, donate" },
      { word_id: "n2_1565", word_number: 1565, kanji: "継続[する]", furigana: "けいぞく", meaning_en: "continuation, continue" }
    ]
  }
];

topic16StoriesPart4.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 16 story ${story.story_number}: ${story.page_story}.json`);
});
