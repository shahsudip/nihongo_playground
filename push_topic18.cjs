const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  // Page 252 (Story 354 & 355)
  {
    "id": "354",
    "japanese_text": "現在小学生くらいの年齢の子どもが成人する頃には、日本の経済や産業は今より縮小しているだろう。",
    "english_translation": "By the time the children who are currently of elementary school age grow up, Japan's economy and industry will be smaller than they are now.",
    "annotated_words": [
      { "meaning_en": "age", "furigana": "ねんれい", "kanji": "年齢" },
      { "meaning_en": "adulthood, become an adult", "furigana": "せいじん", "kanji": "成人［する］" },
      { "meaning_en": "coming-of-age ceremony", "furigana": "せいじんしき", "kanji": "成人式" },
      { "meaning_en": "around (time)", "furigana": "ころ", "kanji": "頃" },
      { "meaning_en": "economy", "furigana": "けいざい", "kanji": "経済" },
      { "meaning_en": "economic", "furigana": "けいざいてき", "kanji": "経済的" },
      { "meaning_en": "industry", "furigana": "さんぎょう", "kanji": "産業" },
      { "meaning_en": "shrinking, shrink", "furigana": "しゅくしょう", "kanji": "縮小［する］" }
    ]
  },
  {
    "id": "355",
    "japanese_text": "以前と比べ、長生きする高齢者の割合が低下している。",
    "english_translation": "The percentage of elderly people who live longer is decreasing compared to that of the past.",
    "annotated_words": [
      { "meaning_en": "living long, live long", "furigana": "ながいき", "kanji": "長生き［する］" },
      { "meaning_en": "senior citizens", "furigana": "こうれいしゃ", "kanji": "高齢者" },
      { "meaning_en": "aging, grow old", "furigana": "こうれいか", "kanji": "高齢化［する］" },
      { "meaning_en": "proportion", "furigana": "わりあい", "kanji": "割合" },
      { "meaning_en": "descending, descend", "furigana": "ていか", "kanji": "低下［する］" }
    ]
  },
  // Page 253 (Story 356 & 357)
  {
    "id": "356",
    "japanese_text": "消費税の増税など、税金制度は非常に緩やかではあるが、変化している。",
    "english_translation": "The tax system is changing, albeit very slowly, such as the consumption tax hike.",
    "annotated_words": [
      { "meaning_en": "consumption tax", "furigana": "しょうひぜい", "kanji": "消費税" },
      { "meaning_en": "consumption, consume", "furigana": "しょうひ", "kanji": "消費［する］" },
      { "meaning_en": "~ tax", "furigana": "ぜい", "kanji": "〜税" },
      { "meaning_en": "tax", "furigana": "ぜいきん", "kanji": "税金" },
      { "meaning_en": "system", "furigana": "せいど", "kanji": "制度" },
      { "meaning_en": "extremely", "furigana": "ひじょうに", "kanji": "非常に" },
      { "meaning_en": "mild, calm", "furigana": "ゆるやかな", "kanji": "緩やかな" },
      { "meaning_en": "change, change", "furigana": "へんか", "kanji": "変化［する］" }
    ]
  },
  {
    "id": "357",
    "japanese_text": "一部を除き、以前より、現在の住まいに満足している人が多い。",
    "english_translation": "Except for some, more people are more satisfied with their current home than the one before.",
    "annotated_words": [
      { "meaning_en": "one part", "furigana": "いちぶ", "kanji": "一部" },
      { "meaning_en": "before", "furigana": "いぜん", "kanji": "以前" },
      { "meaning_en": "present", "furigana": "げんざい", "kanji": "現在" },
      { "meaning_en": "residence", "furigana": "すまい", "kanji": "住まい" },
      { "meaning_en": "satisfaction, be satisfied", "furigana": "まんぞく", "kanji": "満足［する］" }
    ]
  },
  // Page 254 & 255 (Story 358, 359, 360)
  {
    "id": "358",
    "japanese_text": "現代は平和になった。だが、前より不幸になったと感じているお年寄りが恐らくいるだろう。",
    "english_translation": "The present age has become peaceful. However, there are probably older people who feel more unhappy than before.",
    "annotated_words": [
      { "meaning_en": "present day", "furigana": "げんだい", "kanji": "現代" },
      { "meaning_en": "contemporary", "furigana": "げんだいてきな", "kanji": "現代的な" },
      { "meaning_en": "peaceful", "furigana": "へいわな", "kanji": "平和な" },
      { "meaning_en": "but", "furigana": "", "kanji": "だが" },
      { "meaning_en": "unhappy", "furigana": "ふこうな", "kanji": "不幸な" },
      { "meaning_en": "feel", "furigana": "かんじ", "kanji": "感じる" },
      { "meaning_en": "elderly person", "furigana": "としよ", "kanji": "お年寄り" },
      { "meaning_en": "probably", "furigana": "おそら", "kanji": "恐らく" }
    ]
  },
  {
    "id": "359",
    "japanese_text": "首相は、「国民は例外なく幸福になる権利がある」と考えを述べた。",
    "english_translation": "The prime minister said, \"People have the right to happiness without exception.\"",
    "annotated_words": [
      { "meaning_en": "prime minister", "furigana": "しゅしょう", "kanji": "首相" },
      { "meaning_en": "national, citizen", "furigana": "こくみん", "kanji": "国民" },
      { "meaning_en": "citizen", "furigana": "しみん", "kanji": "市民" },
      { "meaning_en": "exception", "furigana": "れいがい", "kanji": "例外" },
      { "meaning_en": "happy", "furigana": "こうふくな", "kanji": "幸福な" },
      { "meaning_en": "right", "furigana": "けんり", "kanji": "権利" },
      { "meaning_en": "thinking", "furigana": "かんがえ", "kanji": "考え" }
    ]
  },
  {
    "id": "360",
    "japanese_text": "先日、選挙があった。若者の投票率は毎回下がっている。解決法を考えるべきだ。",
    "english_translation": "There was an election the other day. Youth turnout is declining every time. We should think of a solution.",
    "annotated_words": [
      { "meaning_en": "the other day", "furigana": "せんじつ", "kanji": "先日" },
      { "meaning_en": "election, elect", "furigana": "せんきょ", "kanji": "選挙［する］" },
      { "meaning_en": "young man", "furigana": "わかもの", "kanji": "若者" },
      { "meaning_en": "voting, vote", "furigana": "とうひょう", "kanji": "投票［する］" },
      { "meaning_en": "vote", "furigana": "ひょう", "kanji": "〜票" },
      { "meaning_en": "every ~", "furigana": "まい", "kanji": "毎〜" },
      { "meaning_en": "solving, solve", "furigana": "かいけつ", "kanji": "解決［する］" },
      { "meaning_en": "~ method", "furigana": "ほう", "kanji": "〜法" }
    ]
  },
  // Page 256 & 257 (Story 361 & 362 & 363)
  {
    "id": "361",
    "japanese_text": "政府は政治家と青年が交流するチャンスを作ろうとしたが、結局いいアイデアが出なかった。",
    "english_translation": "The government tried to create opportunities for politicians and adolescents to interact, but in the end it didn't come up with a good idea.",
    "annotated_words": [
      { "meaning_en": "government", "furigana": "せいふ", "kanji": "政府" },
      { "meaning_en": "politician", "furigana": "せいじか", "kanji": "政治家" },
      { "meaning_en": "politics", "furigana": "せいじ", "kanji": "政治" },
      { "meaning_en": "young man", "furigana": "せいねん", "kanji": "青年" },
      { "meaning_en": "exchange, exchange", "furigana": "こうりゅう", "kanji": "交流［する］" },
      { "meaning_en": "chance", "furigana": "", "kanji": "チャンス" },
      { "meaning_en": "eventually", "furigana": "けっきょく", "kanji": "結局" },
      { "meaning_en": "idea", "furigana": "", "kanji": "アイデア" }
    ]
  },
  {
    "id": "362",
    "japanese_text": "数えられないほど試験を受け、なんとか運転免許証をとることができた。友達はとっくに取っているので、一人でお祝いしよう。",
    "english_translation": "I took countless tests and managed to get a driver's license. My friends had already gotten theirs long ago, so I'll celebrate alone.",
    "annotated_words": [
      { "meaning_en": "count", "furigana": "かぞえる", "kanji": "数える" },
      { "meaning_en": "somehow", "furigana": "", "kanji": "なんとか" },
      { "meaning_en": "driver's license", "furigana": "うんてんめんきょしょう", "kanji": "運転免許証" },
      { "meaning_en": "already", "furigana": "", "kanji": "とっくに" },
      { "meaning_en": "celebrate", "furigana": "いわ", "kanji": "お祝いする" },
      { "meaning_en": "celebrate", "furigana": "いわう", "kanji": "祝う" }
    ]
  },
  {
    "id": "363",
    "japanese_text": "最近は生活のための費用を削っている。なぜなら、奨学金が減る一方で、学費は高くなっているからだ。仕方がないが、貧乏な学生にはつらい。",
    "english_translation": "Recently, I've been cutting costs for living. This is because scholarships are decreasing, while tuition fees are increasing. It can't be helped, but it's hard for poor students.",
    "annotated_words": [
      { "meaning_en": "cost", "furigana": "ひよう", "kanji": "費用" },
      { "meaning_en": "scrape", "furigana": "けずる", "kanji": "削る" },
      { "meaning_en": "because", "furigana": "", "kanji": "なぜなら" },
      { "meaning_en": "scholarship", "furigana": "しょうがくきん", "kanji": "奨学金" },
      { "meaning_en": "on the one hand", "furigana": "いっぽう", "kanji": "一方" },
      { "meaning_en": "tuition", "furigana": "がくひ", "kanji": "学費" },
      { "meaning_en": "it's no use", "furigana": "しかたない", "kanji": "仕方がない" },
      { "meaning_en": "poor", "furigana": "びんぼうな", "kanji": "貧乏な" }
    ]
  },
  // Page 258 & 259 (Story 364, 365, 366)
  {
    "id": "364",
    "japanese_text": "講演会を聞いた後、エコロジーに関心をもつようになった。私たち一人一人の行動が結果に現れるのだ。",
    "english_translation": "After listening to the lecture, I became interested in ecology. The actions of each of us are reflected in the results.",
    "annotated_words": [
      { "meaning_en": "lecture", "furigana": "こうえんかい", "kanji": "講演会" },
      { "meaning_en": "lecture, give a lecture", "furigana": "こうえん", "kanji": "講演［する］" },
      { "meaning_en": "later", "furigana": "のち", "kanji": "後" },
      { "meaning_en": "ecology", "furigana": "", "kanji": "エコロジー" },
      { "meaning_en": "interest", "furigana": "かんしん", "kanji": "関心" },
      { "meaning_en": "one by one (people)", "furigana": "ひとりひとり", "kanji": "一人一人" },
      { "meaning_en": "behavior, behave", "furigana": "こうどう", "kanji": "行動［する］" },
      { "meaning_en": "appear", "furigana": "あらわれる", "kanji": "現れる" }
    ]
  },
  {
    "id": "365",
    "japanese_text": "グループで話し合ってみたところ、子育てをしやすくするために最も必要なことは、保育園の数を増やすことだという結論になった。明るい未来になってほしい。",
    "english_translation": "After trying to discuss things as a group, it was concluded that the most important thing to make it easier to raise children is to increase the number of nurseries. We want them to have a bright future.",
    "annotated_words": [
      { "meaning_en": "raising children", "furigana": "こそだて", "kanji": "子育て" },
      { "meaning_en": "most", "furigana": "もっとも", "kanji": "最も" },
      { "meaning_en": "nursery", "furigana": "ほいくえん", "kanji": "保育園" },
      { "meaning_en": "number", "furigana": "かず", "kanji": "数" },
      { "meaning_en": "increase", "furigana": "ふやす", "kanji": "増やす" },
      { "meaning_en": "conclusion", "furigana": "けつろん", "kanji": "結論" },
      { "meaning_en": "bright", "furigana": "あかるい", "kanji": "明るい" },
      { "meaning_en": "future", "furigana": "みらい", "kanji": "未来" }
    ]
  },
  {
    "id": "366",
    "japanese_text": "グラフから分かるように、老人ホームの建設数は確実に増加している。",
    "english_translation": "As you can see from the graph, the number of elderly homes built is steadily increasing.",
    "annotated_words": [
      { "meaning_en": "graph", "furigana": "", "kanji": "グラフ" },
      { "meaning_en": "nursing home", "furigana": "ろうじんホーム", "kanji": "老人ホーム" },
      { "meaning_en": "old man", "furigana": "ろうじん", "kanji": "老人" },
      { "meaning_en": "building, build", "furigana": "けんせつ", "kanji": "建設［する］" },
      { "meaning_en": "~ number", "furigana": "すう", "kanji": "〜数" },
      { "meaning_en": "certain", "furigana": "かくじつな", "kanji": "確実な" },
      { "meaning_en": "increase, increase", "furigana": "ぞうか", "kanji": "増加［する］" },
      { "meaning_en": "decrease, decrease", "furigana": "げんしょう", "kanji": "減少［する］" }
    ]
  },
  // Page 260, 261, 262, 263 (Story 367, 368, 369, 370, 371)
  {
    "id": "367",
    "japanese_text": "最近、通訳ロボットの話題がニュースで取り上げられている。21世紀には科学が進歩し、ますます使用が拡大されるだろう。",
    "english_translation": "Recently, the topic of interpreting robots has been in the news. In the 21st century, science will advance and its use will increase.",
    "annotated_words": [
      { "meaning_en": "interpreting, interpret", "furigana": "つうやく", "kanji": "通訳［する］" },
      { "meaning_en": "robot", "furigana": "", "kanji": "ロボット" },
      { "meaning_en": "topic", "furigana": "わだい", "kanji": "話題" },
      { "meaning_en": "~ century, ~ age", "furigana": "せいき", "kanji": "〜世紀" },
      { "meaning_en": "progress, make progress", "furigana": "しんぽ", "kanji": "進歩［する］" },
      { "meaning_en": "more and more", "furigana": "", "kanji": "ますます" },
      { "meaning_en": "expantion, expand", "furigana": "かくだい", "kanji": "拡大［する］" }
    ]
  },
  {
    "id": "368",
    "japanese_text": "今回の報告で、車の生産が無期限で休止されることが分かった。会社のトップが無責任な決定をしたためだ。",
    "english_translation": "From this report, we learned that car production will be suspended indefinitely. This is because the company's upper management made irresponsible decisions.",
    "annotated_words": [
      { "meaning_en": "this time", "furigana": "こんかい", "kanji": "今回" },
      { "meaning_en": "report, report", "furigana": "ほうこく", "kanji": "報告［する］" },
      { "meaning_en": "production, produce", "furigana": "せいさん", "kanji": "生産［する］" },
      { "meaning_en": "no~", "furigana": "む", "kanji": "無〜" },
      { "meaning_en": "time limit", "furigana": "きげん", "kanji": "期限" },
      { "meaning_en": "top", "furigana": "", "kanji": "トップ" },
      { "meaning_en": "irresponsible", "furigana": "むせきにんな", "kanji": "無責任な" },
      { "meaning_en": "decision, decide", "furigana": "けってい", "kanji": "決定［する］" }
    ]
  },
  {
    "id": "369",
    "japanese_text": "表から分かるように、石油、石炭、その他の資源は減り続けている。いつまでもあるわけではないのだ。",
    "english_translation": "As you can see from the table, oil, coal and other resources continue to decline. It doesn't last forever.",
    "annotated_words": [
      { "meaning_en": "table, chart", "furigana": "ひょう", "kanji": "表" },
      { "meaning_en": "oil", "furigana": "せきゆ", "kanji": "石油" },
      { "meaning_en": "coal", "furigana": "せきたん", "kanji": "石炭" },
      { "meaning_en": "other", "furigana": "そのほか", "kanji": "その他" },
      { "meaning_en": "resource", "furigana": "しげん", "kanji": "資源" },
      { "meaning_en": "recyclable waste", "furigana": "しげんごみ", "kanji": "資源ごみ" },
      { "meaning_en": "decrease", "furigana": "へる", "kanji": "減る" },
      { "meaning_en": "forever", "furigana": "", "kanji": "いつまでも" }
    ]
  },
  {
    "id": "370",
    "japanese_text": "まず、このモニターの丸の中に、ぴったりと顔の位置を合わせて、体温を測ってください。次に、こちらの用紙に健康状態を記入していただきます。書き方は、例の図をご覧ください。",
    "english_translation": "First, please position your face in the center of the circle on the monitor and take your temperature. Next, please write your health condition on this form. Please reference the example chart for instructions on how to fill it out.",
    "annotated_words": [
      { "meaning_en": "precisely, exactly", "furigana": "", "kanji": "ぴったり" },
      { "meaning_en": "status", "furigana": "じょうたい", "kanji": "状態" },
      { "meaning_en": "filling out, fill out", "furigana": "きにゅう", "kanji": "記入［する］" },
      { "meaning_en": "example", "furigana": "れい", "kanji": "例" },
      { "meaning_en": "figure", "furigana": "ず", "kanji": "図" }
    ]
  },
  {
    "id": "371",
    "japanese_text": "この道は夜になると真っ暗だが、残業帰りの人がよく通っていた。しかし、この前ニュースで取り上げられたように、事件が起こった。それ以後、人通りがなくなった。",
    "english_translation": "This road was pitch black at night, but people returning from overtime often used to go there. However, as mentioned in the news the other day, an incident happened. Since then, the traffic has disappeared.",
    "annotated_words": [
      { "meaning_en": "completely dark", "furigana": "まっくらな", "kanji": "真っ暗な" },
      { "meaning_en": "working overtime, work overtime", "furigana": "ざんぎょう", "kanji": "残業［する］" },
      { "meaning_en": "take up, pick up", "furigana": "とりあげ", "kanji": "取り上げる" },
      { "meaning_en": "incident", "furigana": "じけん", "kanji": "事件" },
      { "meaning_en": "incident site", "furigana": "じけんげんば", "kanji": "事件現場" },
      { "meaning_en": "occur", "furigana": "おこる", "kanji": "起こる" },
      { "meaning_en": "thereafter", "furigana": "いご", "kanji": "以後" }
    ]
  }
];

const overrides = {
  "年齢": "年齢",
  "成人": "成人する",
  "成人式": "成人式",
  "頃": "頃",
  "経済": "経済",
  "経済的": "経済的",
  "産業": "産業",
  "縮小": "縮小している",
  "長生き": "長生きする",
  "高齢者": "高齢者",
  "高齢化": "高齢化",
  "割合": "割合",
  "低下": "低下している",
  "消費税": "消費税",
  "消費": "消費",
  "〜税": "税",
  "税金": "税金",
  "制度": "制度",
  "非常に": "非常に",
  "緩やかな": "緩やか",
  "変化": "変化している",
  "一部": "一部",
  "以前": "以前",
  "現在": "現在",
  "住まい": "住まい",
  "満足": "満足している",
  "現代": "現代",
  "現代的な": "現代的",
  "平和な": "平和",
  "だが": "だが",
  "不幸な": "不幸",
  "感じる": "感じている",
  "お年寄り": "お年寄り",
  "恐らく": "恐らく",
  "首相": "首相",
  "国民": "国民",
  "市民": "市民",
  "例外": "例外",
  "幸福な": "幸福",
  "権利": "権利",
  "考え": "考え",
  "先日": "先日",
  "選挙": "選挙",
  "若者": "若者",
  "投票": "投票率",
  "〜票": "票",
  "毎〜": "毎",
  "解決": "解決法",
  "〜法": "法",
  "政府": "政府",
  "政治家": "政治家",
  "政治": "政治",
  "青年": "青年",
  "交流": "交流する",
  "チャンス": "チャンス",
  "結局": "結局",
  "アイデア": "アイデア",
  "数える": "数えられない",
  "なんとか": "なんとか",
  "運転免許証": "運転免許証",
  "とっくに": "とっくに",
  "お祝いする": "お祝いしよう",
  "祝う": "祝う",
  "費用": "費用",
  "削る": "削っている",
  "なぜなら": "なぜなら",
  "奨学金": "奨学金",
  "一方": "一方",
  "学費": "学費",
  "仕方がない": "仕方がない",
  "貧乏な": "貧乏な",
  "講演会": "講演会",
  "講演": "講演",
  "後": "後",
  "エコロジー": "エコロジー",
  "関心": "関心",
  "一人一人": "一人一人",
  "行動": "行動",
  "現れる": "現れる",
  "子育て": "子育て",
  "最も": "最も",
  "保育園": "保育園",
  "数": "数",
  "増やす": "増やす",
  "結論": "結論",
  "明るい": "明るい",
  "未来": "未来",
  "グラフ": "グラフ",
  "老人ホーム": "老人ホーム",
  "老人": "老人",
  "建設": "建設数",
  "〜数": "数",
  "確実な": "確実",
  "増加": "増加している",
  "減少": "減少",
  "通訳": "通訳",
  "ロボット": "ロボット",
  "話題": "話題",
  "〜世紀": "世紀",
  "進歩": "進歩し",
  "ますます": "ますます",
  "拡大": "拡大される",
  "今回": "今回",
  "報告": "報告",
  "生産": "生産",
  "無〜": "無",
  "期限": "期限",
  "トップ": "トップ",
  "無責任な": "無責任な",
  "決定": "決定",
  "表": "表",
  "石油": "石油",
  "石炭": "石炭",
  "その他": "その他",
  "資源": "資源",
  "資源ごみ": "資源ごみ",
  "減る": "減り続けている",
  "いつまでも": "いつまでも",
  "ぴったり": "ぴったり",
  "状態": "状態",
  "記入": "記入",
  "例": "例",
  "図": "図",
  "真っ暗な": "真っ暗",
  "残業": "残業",
  "取り上げる": "取り上げられた",
  "事件": "事件",
  "事件現場": "事件現場",
  "起こる": "起こった",
  "以後": "以後"
};

function extractPlainTextMap(html) {
  let plain = "";
  let map = [];
  let inTag = false;
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '<') inTag = true;
    if (!inTag) {
      plain += html[i];
      map.push(i);
    }
    if (html[i] === '>') inTag = false;
  }
  return { plain, map };
}

function wrapWords(html, wordList) {
  let { plain, map } = extractPlainTextMap(html);
  let wrappedHtml = html;
  
  const sortedWords = [...wordList].sort((a,b) => {
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let searchTarget = overrides[kanjiPlain] || kanjiPlain;
    if (!searchTarget) continue;

    let idx = plain.indexOf(searchTarget);
    if (idx !== -1) {
      const startHtmlIdx = map[idx];
      const endHtmlIdx = map[idx + searchTarget.length - 1] + 1;
      replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
      plain = plain.substring(0, idx) + ' '.repeat(searchTarget.length) + plain.substring(idx + searchTarget.length);
    } else {
      let kanjiNoSuru = kanjiPlain.replace(/する$/, '').replace(/な$/, '');
      if (kanjiNoSuru && kanjiNoSuru.length > 0) {
        idx = plain.indexOf(kanjiNoSuru);
        if (idx !== -1) {
          const startHtmlIdx = map[idx];
          const endHtmlIdx = map[idx + kanjiNoSuru.length - 1] + 1;
          replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
          plain = plain.substring(0, idx) + ' '.repeat(kanjiNoSuru.length) + plain.substring(idx + kanjiNoSuru.length);
        }
      }
    }
  }

  replacements.sort((a,b) => b.start - a.start);
  for (const r of replacements) {
    wrappedHtml = wrappedHtml.substring(0, r.start) + '<u>' + wrappedHtml.substring(r.start, r.end) + '</u>' + wrappedHtml.substring(r.end);
  }

  return wrappedHtml;
}

async function run() {
  const topicId = 'topic_18';
  console.log(`Processing ${topicId}...`);
  
  // Set Topic document title
  await db.collection('books').doc('tango_n3')
    .collection('topics').doc(topicId)
    .set({ id: topicId, title: "Topic 18 社会 Society" }, { merge: true });

  let currentWordId = 1886;

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 18 社会 Society`;
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    story.annotated_words = story.annotated_words.map(w => {
      w.word_id = `n3_${String(currentWordId).padStart(4, '0')}`;
      w.word_number = currentWordId;
      currentWordId++;
      return w;
    });

    delete story.id;
    const docId = story.page_story;

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });

    console.log(`Pushed story ${docId} (words up to ${currentWordId - 1})`);
  }
  console.log(`Topic 18 successfully pushed! Total words pushed up to: ${currentWordId - 1}`);
}

run().catch(console.error);
