import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 20 Stories (Manners) - Part 1
const topic20StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 20 マナー",
    page_story: "278_1",
    japanese_text: "求人情報には「年齢を<u>問わない</u>」と書いてあったが、面接官は<u>未成年</u>である私に対して、<u>明らかに</u> <u>圧力</u>をかけてきた。<u>さすがに</u>ひどすぎると思い、後日、雇い<u>主</u>に<u>苦情</u>の電話をかけ、求人サイトに面接での出来事を<u>書き込んだ</u>。",
    english_translation: "The job ad stated that age wasn't an issue, but the interviewer clearly put pressure on me for being a minor. As might be expected, I thought it was just too awful, so I called the employer at a later date to complain, and I also wrote a post on the job site about what happened at the interview.",
    annotated_words: [
      { word_id: "n2_1928", word_number: 1928, kanji: "問う", furigana: "とう", meaning_en: "question, call into question" },
      { word_id: "n2_1929", word_number: 1929, kanji: "未成年", furigana: "みせいねん", meaning_en: "minor" },
      { word_id: "n2_1930", word_number: 1930, kanji: "明らかな", furigana: "あきらかな", meaning_en: "clear, obvious" },
      { word_id: "n2_1931", word_number: 1931, kanji: "圧力", furigana: "あつりょく", meaning_en: "pressure" },
      { word_id: "n2_1932", word_number: 1932, kanji: "さすがに", furigana: "", meaning_en: "as (might be) expected" },
      { word_id: "n2_1933", word_number: 1933, kanji: "～主", furigana: "ぬし", meaning_en: "~ owner, proprietor of ~" },
      { word_id: "n2_1934", word_number: 1934, kanji: "苦情", furigana: "くじょう", meaning_en: "complaint" },
      { word_id: "n2_1935", word_number: 1935, kanji: "書き込む", furigana: "かきこむ", meaning_en: "write, post" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 20 マナー",
    page_story: "279_1",
    japanese_text: "A：友達に、内定を断るときのメールの文面を相談されたから、「その書き方は<u>礼儀</u>正しくないと思う。内定をくれたことに対する感謝の気持ちを<u>込める</u>べきだよ」ってアドバイスしたんだ。そうしたら、友達の<u>機嫌</u>が悪くなっちゃった。ちょっと<u>強引な</u>言い方だったかな。\nB：<u>いや</u>、そんなことないと思うよ。",
    english_translation: "A: A friend of mine asked me for advice on writing an email to refuse a job offer. I advised her, \"I don't think it's polite to write like that. You should include some gratitude for the job offer.\" Then my friend's mood turned sour. I guess I was a bit forceful. B: No, I don't think so.",
    annotated_words: [
      { word_id: "n2_1936", word_number: 1936, kanji: "礼儀", furigana: "れいぎ", meaning_en: "etiquette, politeness" },
      { word_id: "n2_1937", word_number: 1937, kanji: "込める", furigana: "こめる", meaning_en: "include, put into" },
      { word_id: "n2_1938", word_number: 1938, kanji: "機嫌", furigana: "きげん", meaning_en: "mood, temper" },
      { word_id: "n2_1939", word_number: 1939, kanji: "強引な", furigana: "ごういんな", meaning_en: "forceful, aggressive" },
      { word_id: "n2_1940", word_number: 1940, kanji: "いや", furigana: "", meaning_en: "oh, no (exclamation)" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 20 マナー",
    page_story: "280_1",
    japanese_text: "今日の<u>明け方</u>、友達が酒に酔って<u>車道</u>で<u>寝転んだり</u>、車の邪魔になるほどふらついて歩いたりしていたらしい。この行為は道路交通法違反であり、<u>罰金</u>を取られることもある。この話を友達から聞いて、なんて<u>みっともない</u>やつだと思った。",
    english_translation: "Apparently, at dawn today, a friend of mine was drunk, lying down and walking unsteadily on the roadway, interfering with traffic. Such behavior is a violation of the road traffic laws and can result in a fine. When my friend told me this story, I thought he was disgraceful.",
    annotated_words: [
      { word_id: "n2_1941", word_number: 1941, kanji: "明け方", furigana: "あけがた", meaning_en: "dawn, daybreak" },
      { word_id: "n2_1942", word_number: 1942, kanji: "車道", furigana: "しゃどう", meaning_en: "roadway" },
      { word_id: "n2_1943", word_number: 1943, kanji: "歩道", furigana: "ほどう", meaning_en: "sidewalk" },
      { word_id: "n2_1944", word_number: 1944, kanji: "寝転ぶ", furigana: "ねころぶ", meaning_en: "lie down" },
      { word_id: "n2_1945", word_number: 1945, kanji: "罰金", furigana: "ばっきん", meaning_en: "fine" },
      { word_id: "n2_1946", word_number: 1946, kanji: "みっともない", furigana: "", meaning_en: "disgraceful" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 20 マナー",
    page_story: "280_2",
    japanese_text: "A：面接で、どうやったらうまく<u>自身</u>を<u>アピールできる</u>かな。\nB：うーん。<u>ささいな</u>出来事でも、それらを<u>寄せ集めて</u>、いかに活躍できたか話せばいいんじゃないかな。",
    english_translation: "A: I wonder how I can be more successful promoting myself in interviews. B: Hmmm. I think you should bring together a lot of little events to make a statement about how active you've been.",
    annotated_words: [
      { word_id: "n2_1947", word_number: 1947, kanji: "自身", furigana: "じしん", meaning_en: "oneself" },
      { word_id: "n2_1948", word_number: 1948, kanji: "アピール[する]", furigana: "あぴーる", meaning_en: "appeal, promote" },
      { word_id: "n2_1949", word_number: 1949, kanji: "ささいな", furigana: "", meaning_en: "trivial, little" },
      { word_id: "n2_1950", word_number: 1950, kanji: "寄せ集める", furigana: "よせあつめる", meaning_en: "gather together, bring together" },
      { word_id: "n2_1951", word_number: 1951, kanji: "寄せる", furigana: "よせる", meaning_en: "come near, bring near" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 20 マナー",
    page_story: "281_1",
    japanese_text: "私は目に<u>障がい</u>がある。いつも杖を持ちながら歩いているが、杖の<u>先端</u>で道を把握するには、やはり<u>限度</u>がある。特に<u>夜間</u>は前に進めるかどうかの判断が難しく、<u>混乱する</u>こともあるので、たまに声をかけてくれる人がいて、ありがたいと思う。",
    english_translation: "I have a visual disability. I always walk with a cane, but of course, there's a limit to what I can comprehend with the tip of my cane. Especially at night, it's difficult for me to judge whether or not to move forward, and I sometimes get confused, so I'm grateful that people call out to help me.",
    annotated_words: [
      { word_id: "n2_1952", word_number: 1952, kanji: "障がい", furigana: "しょうがい", meaning_en: "disability" },
      { word_id: "n2_1953", word_number: 1953, kanji: "障がい者", furigana: "しょうがいしゃ", meaning_en: "person with a disability" },
      { word_id: "n2_1954", word_number: 1954, kanji: "先端", furigana: "せんたん", meaning_en: "tip" },
      { word_id: "n2_1955", word_number: 1955, kanji: "限度", furigana: "げんど", meaning_en: "limit" },
      { word_id: "n2_1956", word_number: 1956, kanji: "夜間", furigana: "やかん", meaning_en: "night" },
      { word_id: "n2_1957", word_number: 1957, kanji: "混乱[する]", furigana: "こんらん", meaning_en: "confusion, get confused" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 20 マナー",
    page_story: "282_1",
    japanese_text: "私は<u>妊婦</u>だ。昨日バスに乗ったとき、2人がけの<u>優先</u>席に<u>空き</u>を見つけたので座ろうとした。しかし、隣の人の脚が邪魔で、私が座ろうとしていた<u>スペース</u>は、かなり狭くなっていた。<u>しょうがない</u>と思い、その人の脚と<u>足元</u>の荷物を<u>避けて</u>座った。",
    english_translation: "I am pregnant. Yesterday, when I got on the bus, I found a vacant two-person priority seat and I tried to sit down. However, the person sitting there was blocking the seat with their legs, leaving only a tiny space for me to occupy. There was nothing else to do, so I just sat down, trying to avoid that person's legs and the bags at their feet.",
    annotated_words: [
      { word_id: "n2_1958", word_number: 1958, kanji: "妊婦", furigana: "にんぷ", meaning_en: "pregnancy" },
      { word_id: "n2_1959", word_number: 1959, kanji: "優先[する]", furigana: "ゆうせん", meaning_en: "priority, prioritize" },
      { word_id: "n2_1960", word_number: 1960, kanji: "空き", furigana: "あき", meaning_en: "vacancy" },
      { word_id: "n2_1961", word_number: 1961, kanji: "スペース", furigana: "すぺーす", meaning_en: "space" },
      { word_id: "n2_1962", word_number: 1962, kanji: "しょうがない", furigana: "", meaning_en: "unavoidable, nothing else to do" },
      { word_id: "n2_1963", word_number: 1963, kanji: "足元", furigana: "あしもと", meaning_en: "at someone's feet, footing" },
      { word_id: "n2_1964", word_number: 1964, kanji: "避ける", furigana: "さける", meaning_en: "avoid" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 20 マナー",
    page_story: "282_2",
    japanese_text: "A：今朝、電車でマスクをはずして、思いっきり咳をしている人を<u>見かけた</u>んだよね。\nB：うわ、その人、咳<u>エチケット</u>って言葉を知らないのかな。\nA：本当にそうだよね。せめて手のひらで口元をしっかり<u>塞いで</u>ほしいよ。",
    english_translation: "A: This morning on the train, I saw a man who'd removed his mask and was coughing as hard as he could. B: Wow, sounds like he's never heard the phrase \"cough etiquette.\" A: Yes, really. I wished he'd at least cover his mouth with his hand properly.",
    annotated_words: [
      { word_id: "n2_1965", word_number: 1965, kanji: "見かける", furigana: "みかける", meaning_en: "see, spot" },
      { word_id: "n2_1966", word_number: 1966, kanji: "エチケット", furigana: "えちけっと", meaning_en: "etiquette" },
      { word_id: "n2_1967", word_number: 1967, kanji: "塞ぐ", furigana: "ふさぐ", meaning_en: "close, cover, seal" },
      { word_id: "n2_1968", word_number: 1968, kanji: "塞がる", furigana: "ふさがる", meaning_en: "be blocked, be obstructed" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 20 マナー",
    page_story: "283_1",
    japanese_text: "今日、うちの会社に新入社員が入った。明日から早速営業に<u>同行して</u>もらう予定なので、<u>不明な</u>点は恥ずかしがらずに質問すること、営業先では笑顔を崩さないことを<u>強調して</u>おいた。<u>物事</u>は初めが大切だ。",
    english_translation: "Today, a new employee joined our company. Starting tomorrow, I plan to have her accompany me on sales visits, so I told her to ask questions if anything is unclear, and emphasized that when visiting clients, she should always keep smiling. In most things, first impressions are important.",
    annotated_words: [
      { word_id: "n2_1969", word_number: 1969, kanji: "同行[する]", furigana: "どうこう", meaning_en: "companion, accompany" },
      { word_id: "n2_1970", word_number: 1970, kanji: "不明な", furigana: "ふめいな", meaning_en: "unclear" },
      { word_id: "n2_1971", word_number: 1971, kanji: "強調[する]", furigana: "きょうちょう", meaning_en: "emphasis, emphasize" },
      { word_id: "n2_1972", word_number: 1972, kanji: "物事", furigana: "ものごと", meaning_en: "things, matters" }
    ]
  }
];

topic20StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 20 story ${story.story_number}: ${story.page_story}.json`);
});
