import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 18 Stories (Life) - Part 2
const topic18StoriesPart2 = [
  {
    is_story: true,
    story_number: 8,
    title: "Topic 18 人生",
    page_story: "256_1",
    japanese_text: "両親はかたい職業に<u>就き</u>、<u>安定した</u> <u>身分</u>を得てほしいと言ったが、私は<u>平凡な</u>人生を送りたくない。<u>舞台</u>の<u>主役</u>の座を勝ち取るまで、挑戦し続ける<u>決心</u>をしている。",
    english_translation: "My parents wanted me to attain a solid job and a stable position in society, but I don't want to lead a mediocre life. I'm determined to keep trying until I win a leading role on the stage.",
    annotated_words: [
      { word_id: "n2_1752", word_number: 1752, kanji: "就く", furigana: "つく", meaning_en: "attain, assume" },
      { word_id: "n2_1753", word_number: 1753, kanji: "安定[する]", furigana: "あんてい", meaning_en: "stability, be stable" },
      { word_id: "n2_1754", word_number: 1754, kanji: "身分", furigana: "みぶん", meaning_en: "identity, position in society" },
      { word_id: "n2_1755", word_number: 1755, kanji: "平凡な", furigana: "へいぼんな", meaning_en: "average, mediocre" },
      { word_id: "n2_1756", word_number: 1756, kanji: "舞台", furigana: "ぶたい", meaning_en: "stage" },
      { word_id: "n2_1757", word_number: 1757, kanji: "主役", furigana: "しゅやく", meaning_en: "leading role" },
      { word_id: "n2_1758", word_number: 1758, kanji: "決心[する]", furigana: "けっしん", meaning_en: "determination, be determined" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 18 人生",
    page_story: "256_2",
    japanese_text: "塾の<u>講師</u>として働いている。高<u>水準</u>の教育を提供するのが主な仕事だと思われがちだが、<u>むしろ</u>勉強が嫌いな子どもの知的<u>好奇心</u>を育てることに力をそそいでいる。子どもたちが持つ<u>無限</u>の可能性を引き出したい。",
    english_translation: "I work as an instructor at a cram school. People tend to think that my job is mainly to provide a high standard of education, but rather, I'm dedicated to nurturing intellectual curiosity in children who don't like to study. I want to draw out the limitless potential in children.",
    annotated_words: [
      { word_id: "n2_1759", word_number: 1759, kanji: "講師", furigana: "こうし", meaning_en: "instructor, teacher" },
      { word_id: "n2_1760", word_number: 1760, kanji: "水準", furigana: "すいじゅん", meaning_en: "standard" },
      { word_id: "n2_1761", word_number: 1761, kanji: "むしろ", furigana: "", meaning_en: "rather" },
      { word_id: "n2_1762", word_number: 1762, kanji: "好奇心", furigana: "こうきしん", meaning_en: "curiosity" },
      { word_id: "n2_1763", word_number: 1763, kanji: "無限", furigana: "むげん", meaning_en: "limitless, unlimited" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 18 人生",
    page_story: "257_1",
    japanese_text: "<u>インターンシップ</u>に参加したいと思っているが、<u>応募したい</u>企業が多すぎて、数社に<u>絞り</u>きれない。参加したい企業がないよりは<u>ましだ</u>が、<u>エントリーシート</u>を何枚も作成しなければならず、大変だ。",
    english_translation: "I'd like to do an internship, but there are so many companies I want to apply to that I can't narrow them down to just a few. That's better than not having any companies I want to join, but it's hard because I have to prepare so many application forms.",
    annotated_words: [
      { word_id: "n2_1764", word_number: 1764, kanji: "インターン(シップ)", furigana: "いんたーん(しっぷ)", meaning_en: "intern, internship" },
      { word_id: "n2_1765", word_number: 1765, kanji: "応募[する]", furigana: "おうぼ", meaning_en: "application, apply for" },
      { word_id: "n2_1766", word_number: 1766, kanji: "絞る", furigana: "しぼる", meaning_en: "narrow down" },
      { word_id: "n2_1767", word_number: 1767, kanji: "ましな", furigana: "", meaning_en: "better, preferable" },
      { word_id: "n2_1768", word_number: 1768, kanji: "エントリーシート", furigana: "えんとりーしーと", meaning_en: "application form" },
      { word_id: "n2_1769", word_number: 1769, kanji: "エントリー[する]", furigana: "えんとりー", meaning_en: "entry, enter" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 18 人生",
    page_story: "258_1",
    japanese_text: "高校2年生から<u>文系</u>コース・<u>理系</u>コースに分かれて勉強する。どちらに進むか悩んでいた時、両親に「就職に<u>不利な</u>文系ではなく、<u>有利な</u>理系にしておけ」と言われ、<u>とりあえず</u>理系コースに進んだ。しかし、<u>社会人</u>になった今、そのような学問<u>分野</u>の違いは関係なく、人間としての<u>総合</u>力が大切であると思う。",
    english_translation: "From the second year of high school, study is divided into humanities and science courses. When I was wondering which course to take, my parents told me I should take the science course because it was more advantageous than the humanities course, which was disadvantageous for finding work, so I took the science course for the time being. However, now that I'm a working adult, I believe that these differences in academic fields are irrelevant and that our overall strengths as human beings are more important.",
    annotated_words: [
      { word_id: "n2_1770", word_number: 1770, kanji: "文系", furigana: "ぶんけい", meaning_en: "humanities, liberal arts" },
      { word_id: "n2_1771", word_number: 1771, kanji: "理系", furigana: "りけい", meaning_en: "science" },
      { word_id: "n2_1772", word_number: 1772, kanji: "不利な", furigana: "ふりな", meaning_en: "disadvantageous" },
      { word_id: "n2_1773", word_number: 1773, kanji: "有利な", furigana: "ゆうりな", meaning_en: "advantageous" },
      { word_id: "n2_1774", word_number: 1774, kanji: "とりあえず", furigana: "", meaning_en: "for the time being" },
      { word_id: "n2_1775", word_number: 1775, kanji: "社会人", furigana: "しゃかいじん", meaning_en: "working adult, member of society" },
      { word_id: "n2_1776", word_number: 1776, kanji: "分野", furigana: "ぶんや", meaning_en: "field" },
      { word_id: "n2_1777", word_number: 1777, kanji: "総合[する]", furigana: "そうごう", meaning_en: "overall, comprehensive" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 18 人生",
    page_story: "259_1",
    japanese_text: "いつも<u>ふざけている</u>彼から、真剣な声で「話があるから部屋に行く」と電話があった。悪い<u>予感</u>がして会うかどうか<u>迷った</u>が、<u>すでに</u>家の前に来ているようで、窓から<u>ちらっと</u>姿が見えた。彼は部屋に入るなり、緊張した面持ちで「<u>精いっぱい</u>幸せにします」と言って<u>婚約</u>指輪を差し出した。思いがけない事態に私の<u>思考</u>は停止した。",
    english_translation: "He's always joking around, but he called me in a serious voice, saying, \"We need to talk, so I'm coming over to your place.\" I had a foreboding feeling and hesitated whether or not I should meet him, but he was already in front of my house and I caught a glance of him through the window. As soon as he entered, he nervously said, \"I will do my very best to make you happy,\" and presented me with an engagement ring. At this unexpected turn of events, all my thoughts just stopped.",
    annotated_words: [
      { word_id: "n2_1778", word_number: 1778, kanji: "ふざける", furigana: "", meaning_en: "joke around" },
      { word_id: "n2_1779", word_number: 1779, kanji: "予感[する]", furigana: "よかん", meaning_en: "premonition, have a foreboding feeling" },
      { word_id: "n2_1780", word_number: 1780, kanji: "迷う", furigana: "まよう", meaning_en: "hesitate, waver" },
      { word_id: "n2_1781", word_number: 1781, kanji: "すでに", furigana: "", meaning_en: "already" },
      { word_id: "n2_1782", word_number: 1782, kanji: "ちらっと", furigana: "", meaning_en: "accidentally, at a glance" },
      { word_id: "n2_1783", word_number: 1783, kanji: "精いっぱい", furigana: "せいいっぱい", meaning_en: "the very best one can do, with all one's might" },
      { word_id: "n2_1784", word_number: 1784, kanji: "婚約[する]", furigana: "こんやく", meaning_en: "engagement, get engaged" },
      { word_id: "n2_1785", word_number: 1785, kanji: "思考[する]", furigana: "しこう", meaning_en: "thoughts, think" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 18 人生",
    page_story: "260_1",
    japanese_text: "ほとんどの人が<u>漁師</u>の小さな町で生まれ育った私は、都会にあこがれていた。<u>上京すれば</u> <u>職</u>と<u>生きがい</u>を得ることができると思っていたが、実際は全くの<u>見当</u>外れで、仕事を<u>求め</u>続けたが、<u>納得できる</u>ものを見つけることができず、<u>くたびれて</u>しまった。",
    english_translation: "Born and raised in a small town where most people worked as fishermen, I always longed for city life. I thought that if I moved to Tokyo, I would find a career and purpose in life, but in fact this conjecture was completely wrong. I kept looking for work, but I never found anything convincing, and eventually I got tired of it.",
    annotated_words: [
      { word_id: "n2_1786", word_number: 1786, kanji: "漁師", furigana: "りょうし", meaning_en: "fisherman, fisher" },
      { word_id: "n2_1787", word_number: 1787, kanji: "上京[する]", furigana: "じょうきょう", meaning_en: "moving to Tokyo, go to Tokyo" },
      { word_id: "n2_1788", word_number: 1788, kanji: "職", furigana: "しょく", meaning_en: "job, career" },
      { word_id: "n2_1789", word_number: 1789, kanji: "生きがい", furigana: "いきがい", meaning_en: "purpose in life, meaning in life" },
      { word_id: "n2_1790", word_number: 1790, kanji: "見当", furigana: "けんとう", meaning_en: "conjecture, guess" },
      { word_id: "n2_1791", word_number: 1791, kanji: "求める", furigana: "もとめる", meaning_en: "seek, look for" },
      { word_id: "n2_1792", word_number: 1792, kanji: "納得[する]", furigana: "なっとく", meaning_en: "acceptance, convince, persuade" },
      { word_id: "n2_1793", word_number: 1793, kanji: "くたびれる", furigana: "", meaning_en: "tire of" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 18 人生",
    page_story: "260_2",
    japanese_text: "社宅に住んでいたが、妻が<u>双子</u>を<u>妊娠した</u> <u>タイミング</u>で、一戸建てを<u>購入した</u>。しかし、完全に予算<u>オーバー</u>で、<u>蓄えて</u>いたお金は全部無くなった。最近宝<u>くじ</u>に当たる夢ばかり見ている。",
    english_translation: "We'd been living in company housing, but we bought a house at the time my wife became pregnant with twins. However, we went completely over budget and now all the money we'd saved is gone. Recently, I've been dreaming of winning the lottery.",
    annotated_words: [
      { word_id: "n2_1794", word_number: 1794, kanji: "双子", furigana: "ふたご", meaning_en: "twins" },
      { word_id: "n2_1795", word_number: 1795, kanji: "妊娠[する]", furigana: "にんしん", meaning_en: "pregnancy, become pregnant" },
      { word_id: "n2_1796", word_number: 1796, kanji: "タイミング", furigana: "たいみんぐ", meaning_en: "timing" },
      { word_id: "n2_1797", word_number: 1797, kanji: "購入[する]", furigana: "こうにゅう", meaning_en: "purchase, buy" },
      { word_id: "n2_1798", word_number: 1798, kanji: "オーバー[する]", furigana: "おーばー", meaning_en: "over, go over" },
      { word_id: "n2_1799", word_number: 1799, kanji: "蓄える", furigana: "たくわえる", meaning_en: "save up, store" },
      { word_id: "n2_1800", word_number: 1800, kanji: "くじ", furigana: "", meaning_en: "lottery" },
      { word_id: "n2_1801", word_number: 1801, kanji: "くじ引き[する]", furigana: "くじびき", meaning_en: "drawn lot, draw a lottery" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 18 人生",
    page_story: "261_1",
    japanese_text: "NGO、つまり非政府<u>組織</u>の<u>職員</u>の<u>役目</u>は、<u>民間</u>の立場で世界の課題を解決するために活動することだ。",
    english_translation: "The role of an employee at an NGO, or non-governmental organization, is to try to solve the world's problems from a private-sector standpoint.",
    annotated_words: [
      { word_id: "n2_1802", word_number: 1802, kanji: "組織[する]", furigana: "そしき", meaning_en: "organization, organize" },
      { word_id: "n2_1803", word_number: 1803, kanji: "職員", furigana: "しょくいん", meaning_en: "employee, member" },
      { word_id: "n2_1804", word_number: 1804, kanji: "役目", furigana: "やくめ", meaning_en: "role" },
      { word_id: "n2_1805", word_number: 1805, kanji: "民間", furigana: "みんかん", meaning_en: "private sector" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 18 人生",
    page_story: "262_1",
    japanese_text: "私は、子どもの貧困問題の現状を目の当たりにし、早急に問題解決に取り組むという<u>決意</u>を<u>新たに</u>した。",
    english_translation: "I have witnessed the current situation of child poverty and it has renewed my determination to help solve this problem as soon as possible.",
    annotated_words: [
      { word_id: "n2_1806", word_number: 1806, kanji: "決意", furigana: "けつい", meaning_en: "determination, decision" },
      { word_id: "n2_1807", word_number: 1807, kanji: "新たな", furigana: "あらたな", meaning_en: "new, fresh" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 18 人生",
    page_story: "262_2",
    japanese_text: "<u>合同</u>企業説明会で<u>商社</u>の<u>採用</u>担当者に、<u>内定</u>をもらえるのはどのような人かと質問したところ、問題が生じたとき、その<u>場で</u>すぐに原因を<u>考慮し</u>、<u>適切な</u> <u>対応</u>をとることができる人だと教えてくれた。",
    english_translation: "When I asked a recruiter from a trading company at a joint corporate information session what kind of person receives a job offer, he said it's someone who, when a problem arises, is able to immediately consider the causes and take appropriate action on the spot.",
    annotated_words: [
      { word_id: "n2_1808", word_number: 1808, kanji: "合同[する]", furigana: "ごうどう", meaning_en: "joint, join, unite" },
      { word_id: "n2_1809", word_number: 1809, kanji: "商社", furigana: "しょうしゃ", meaning_en: "trading company" },
      { word_id: "n2_1810", word_number: 1810, kanji: "採用[する]", furigana: "さいよう", meaning_en: "recruitment, hire" },
      { word_id: "n2_1811", word_number: 1811, kanji: "内定[する]", furigana: "ないてい", meaning_en: "(unofficial) job offer, offer a job" },
      { word_id: "n2_1812", word_number: 1812, kanji: "場", furigana: "ば", meaning_en: "place, spot" },
      { word_id: "n2_1813", word_number: 1813, kanji: "考慮[する]", furigana: "こうりょ", meaning_en: "consideration, consider" },
      { word_id: "n2_1814", word_number: 1814, kanji: "適切な", furigana: "てきせつな", meaning_en: "appropriate" },
      { word_id: "n2_1815", word_number: 1815, kanji: "対応[する]", furigana: "たいおう", meaning_en: "response, take action" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 18 人生",
    page_story: "263_1",
    japanese_text: "<u>甘やかされて</u>育ったせいか、<u>大ざっぱな</u>性格で、将来の生活<u>設計</u>をしたり、<u>金銭</u>を細かく管理するのが苦手だ。こんなことでは<u>一生</u>結婚できないのではないかという考えが<u>ふと</u>頭をよぎったが、そんなはずはないとすぐに<u>打ち消した</u>。",
    english_translation: "Perhaps because I grew up spoiled, I have a careless personality and I'm not good at planning my future life or managing my finances in detail. The thought suddenly crossed my mind that because of this, I'd never get married in my lifetime, but I quickly dismissed the idea because it couldn't be true.",
    annotated_words: [
      { word_id: "n2_1816", word_number: 1816, kanji: "甘やかす", furigana: "あまやかす", meaning_en: "spoil (a child)" },
      { word_id: "n2_1817", word_number: 1817, kanji: "大ざっぱな", furigana: "おおざっぱな", meaning_en: "careless, sloppy" },
      { word_id: "n2_1818", word_number: 1818, kanji: "設計[する]", furigana: "せっけい", meaning_en: "design, plan" },
      { word_id: "n2_1819", word_number: 1819, kanji: "設計図", furigana: "せっけいず", meaning_en: "design diagram" },
      { word_id: "n2_1820", word_number: 1820, kanji: "金銭", furigana: "きんせん", meaning_en: "finances" },
      { word_id: "n2_1821", word_number: 1821, kanji: "一生", furigana: "いっしょう", meaning_en: "lifetime, in one's lifetime" },
      { word_id: "n2_1822", word_number: 1822, kanji: "ふと", furigana: "", meaning_en: "suddenly, unintentionally" },
      { word_id: "n2_1823", word_number: 1823, kanji: "打ち消す", furigana: "うちけす", meaning_en: "dismiss, deny" }
    ]
  }
];

topic18StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 18 story ${story.story_number}: ${story.page_story}.json`);
});
