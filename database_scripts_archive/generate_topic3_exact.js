import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete Topic 3 (買い物 - Shopping, No. 190 to 246): 11 stories transcribed from pages 43-51
const topic3Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 3 買い物",
    page_story: "43_1",
    japanese_text: "<ruby>感染症<rt>かんせんしょう</rt></ruby>の<ruby>流行<rt>りゅうこう</rt></ruby>は、<ruby>社会<rt>しゃかい</rt></ruby>にさまざまな<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えている。<ruby>例<rt>たと</rt></ruby>えば、<ruby>外出<rt>がいしゅつ</rt></ruby>が<ruby>制限<rt>せいげん</rt></ruby>されたため、<ruby>旅行関係<rt>りょこうかんけい</rt></ruby>の<u>支出</u>は大きく<ruby>減少<rt>げんしょう</rt></ruby>した。また、<ruby>感染症予防<rt>かんせんしょうよぼう</rt></ruby>のマスク<u>着用</u>により、<u>一気に</u><u>万引き</u>が<ruby>増<rt>ふ</rt></ruby>えた<ruby>店<rt>みせ</rt></ruby>もあるようだ。",
    english_translation: "The outbreak of infectious disease is affecting society in various ways. For example, travel-related spending has dropped significantly, due to restrictions on going out. Also, some stores have seen a sudden increase in shoplifting due to the wearing of masks to prevent infectious disease.",
    annotated_words: [
      { word_id: "n2_0190", word_number: 190, kanji: "支出[する]", furigana: "ししゅつ", meaning_en: "expenses, spend" },
      { word_id: "n2_0191", word_number: 191, kanji: "着用[する]", furigana: "ちゃくよう", meaning_en: "wearing, wear" },
      { word_id: "n2_0192", word_number: 192, kanji: "一気に", furigana: "いっきに", meaning_en: "suddenly, all at once" },
      { word_id: "n2_0193", word_number: 193, kanji: "万引き[する]", furigana: "まんびき", meaning_en: "shoplifting, shoplift" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 3 買い物",
    page_story: "44_1",
    japanese_text: "A：こないだ<ruby>会社<rt>かいしゃ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>たちと<ruby>飲<rt>の</rt></ruby>みに行ったとき、<ruby>全員<rt>ぜんいん</rt></ruby><ruby>分<rt>ぶん</rt></ruby><ruby>僕<rt>ぼく</rt></ruby>が<ruby>払<rt>はら</rt></ruby>っておいたんだよ。それで<ruby>昨日<rt>きのう</rt></ruby>、どうやって<u>精算</u>しようかと思って<ruby>先輩<rt>せんぱい</rt></ruby>に<ruby>相談<rt>そうだん</rt></ruby>してみたら「１<ruby>円<rt>えん</rt></ruby>まできれいに<ruby>分<rt>わ</rt></ruby>けてくれ」って<ruby>言<rt>い</rt></ruby>われちゃって…。
B：うわー、<u>けちだ</u>ねー。
A：その<ruby>先輩<rt>せんぱい</rt></ruby>だけが<u>高価な</u>お<ruby>酒<rt>さけ</rt></ruby>をたくさん<ruby>飲<rt>の</rt></ruby>んでたのに…。<ruby>先月<rt>せんげつ</rt></ruby><u>賞与</u>が出て、やっと少し<ruby>貯金<rt>ちょきん</rt></ruby>ができたところなんだけどな。",
    english_translation: "A: The other night, I went out for drinks with some people from work and I paid for everyone. Yesterday, I asked a senior colleague for advice on how to settle the bill, and he told me to split it evenly, right down to the last yen... B: Wow, that's so stingy. A: And he was the only one drinking lots of expensive alcohol... Damn, I just got my bonus last month and finally saved up a little money.",
    annotated_words: [
      { word_id: "n2_0194", word_number: 194, kanji: "精算[する]", furigana: "せいさん", meaning_en: "payment, settle (a bill)" },
      { word_id: "n2_0195", word_number: 195, kanji: "けちな", furigana: "けちな", meaning_en: "stingy, tight (with money)" },
      { word_id: "n2_0196", word_number: 196, kanji: "高価な", furigana: "こうかな", meaning_en: "expensive" },
      { word_id: "n2_0197", word_number: 197, kanji: "賞与", furigana: "しょうよ", meaning_en: "bonus (salary)" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 3 買い物",
    page_story: "45_1",
    japanese_text: "A：<ruby>通販<rt>つうはん</rt></ruby>でコンロ買ったんだけど、<u>包装</u>を<u>ほどいて</u>みたら、都市ガス用だったの。うちでは使えないから<u>返品しよう</u>と思ったんだけど、<ruby>箱<rt>はこ</rt></ruby>に「<u>不良品</u>を<ruby>除<rt>のぞ</rt></ruby>いて、開封済みの商品の<ruby>返品<rt>へんぴん</rt></ruby>には、<ruby>送料<rt>そうりょう</rt></ruby>と<u>手数料</u>を<u>頂戴します</u>」って<ruby>書<rt>か</rt></ruby>いてあったの。\nB：そっか。まあ向こうも<u>商売</u>だもんね。",
    english_translation: "A: I bought a stove by mail order, but when I removed the packaging, I found it was designed to use city gas. Since I can't use that at home, I tried to return it, but on the box it said, \"Unless a product is defective, a handling fee is required for the return of products that have been opened.\" B: Is that right? Well, I guess they're a business too.",
    annotated_words: [
      { word_id: "n2_0198", word_number: 198, kanji: "包装[する]", furigana: "ほうそう", meaning_en: "packaging, pack" },
      { word_id: "n2_0199", word_number: 199, kanji: "ほどく", furigana: "ほどく", meaning_en: "unpack, loosen, take off" },
      { word_id: "n2_0201", word_number: 201, kanji: "返品[する]", furigana: "へんぴん", meaning_en: "return, send back (an item)" },
      { word_id: "n2_0202", word_number: 202, kanji: "不良品", furigana: "ふりょうひん", meaning_en: "defective product" },
      { word_id: "n2_0203", word_number: 203, kanji: "手数料", furigana: "てすうりょう", meaning_en: "handling fee" },
      { word_id: "n2_0204", word_number: 204, kanji: "頂戴する", furigana: "ちょうだいする", meaning_en: "request, require" },
      { word_id: "n2_0205", word_number: 205, kanji: "商売[する]", furigana: "しょうばい", meaning_en: "business, commerce, trade" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 3 買い物",
    page_story: "46_1",
    japanese_text: "パソコン探しに<ruby>困<rt>こま</rt></ruby>っていたら、<u>株式会社</u><ruby>値段<rt>ねだん</rt></ruby>ドットコムのホームページを<ruby>見<rt>み</rt></ruby>てみるといい。<u>各種</u>メーカー<ruby>製品<rt>せいひん</rt></ruby>を<u>取り扱って</u>いて、<u>価格</u>やスペック、<u>売れ行き</u>など、さまざまな<ruby>条件<rt>じょうけん</rt></ruby>を<ruby>指定<rt>してい</rt></ruby>して<ruby>探<rt>さが</rt></ruby>すことができる。",
    english_translation: "If you're having trouble finding a computer, take a look at the Price.com Inc. website. They stock products from various manufacturers, and you can search by specifying various criteria such as price, specifications, and how well they sell.",
    annotated_words: [
      { word_id: "n2_0206", word_number: 206, kanji: "株式会社", furigana: "かぶしきがいしゃ", meaning_en: "incorporated company (Inc. or Co., Ltd.)" },
      { word_id: "n2_0208", word_number: 208, kanji: "各種", furigana: "かくしゅ", meaning_en: "all kinds, various" },
      { word_id: "n2_0209", word_number: 209, kanji: "取り扱う", furigana: "とりあつかう", meaning_en: "stock, deal, handle" },
      { word_id: "n2_0211", word_number: 211, kanji: "価格", furigana: "かかく", meaning_en: "price" },
      { word_id: "n2_0212", word_number: 212, kanji: "売れ行き", furigana: "うれゆき", meaning_en: "sales, demand" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 3 買い物",
    page_story: "46_2",
    japanese_text: "この商品はとても小さいので<u>小銭</u>入れに見えるが、実は<u>硬貨</u>だけでなく<u>紙幣</u>も入る。<u>泡</u>をつけて<ruby>丁寧<rt>ていねい</rt></ruby>に<ruby>洗<rt>あら</rt></ruby>えば、とてもきれいになるところもお<ruby>気<rt>き</rt></ruby>に<ruby>入<rt>い</rt></ruby>りだ。",
    english_translation: "This product is so tiny it looks like a coin purse, but it actually holds banknotes as well as coins. It's also popular because it cleans up nicely when lathered up and washed carefully.",
    annotated_words: [
      { word_id: "n2_0213", word_number: 213, kanji: "小銭", furigana: "こぜに", meaning_en: "coin" },
      { word_id: "n2_0214", word_number: 214, kanji: "硬貨", furigana: "こうか", meaning_en: "coin, hard currency" },
      { word_id: "n2_0215", word_number: 215, kanji: "紙幣", furigana: "しへい", meaning_en: "banknote" },
      { word_id: "n2_0216", word_number: 216, kanji: "泡", furigana: "あわ", meaning_en: "foam, lather" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 3 買い物",
    page_story: "47_1",
    japanese_text: "A：<ruby>国内<rt>こくない</rt></ruby>ではまだ<u>販売されて</u>いない、<ruby>海外<rt>かいがい</rt></ruby>の<ruby>商品<rt>しょうひん</rt></ruby>が<ruby>購入<rt>こうにゅう</rt></ruby>できるサイトって知らない？
B：えっと、<u>評価</u>が高いのはKAIGAI MALLかな。でも、<u>為替レート</u>によって<ruby>値段<rt>ねだん</rt></ruby>が変わりやすいし、<u>関税</u>がかかったりするんだよね。あと<u>発送</u>が遅いかも。",
    english_translation: "A: Do you know any websites where you can buy overseas products not yet on sale in Japan? B: Well, I think Kaigai Mall is the most highly rated. But prices tend to change depending on the exchange rate, and there are Customs charges too. Also, shipping might be slow.",
    annotated_words: [
      { word_id: "n2_0217", word_number: 217, kanji: "販売[する]", furigana: "はんばい", meaning_en: "sale, sell" },
      { word_id: "n2_0218", word_number: 218, kanji: "評価[する]", furigana: "ひょうか", meaning_en: "evaluation, rating, rate" },
      { word_id: "n2_0219", word_number: 219, kanji: "為替レート", furigana: "かわせレート", meaning_en: "exchange rate" },
      { word_id: "n2_0221", word_number: 221, kanji: "関税", furigana: "かんぜい", meaning_en: "customs" },
      { word_id: "n2_0222", word_number: 222, kanji: "発送[する]", furigana: "はっそう", meaning_en: "shipping, deliver" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 3 買い物",
    page_story: "48_1",
    japanese_text: "A：<ruby>昨日<rt>きのう</rt></ruby><u>足首</u>のサポーターとスマホの<ruby>充電<rt>じゅうでん</rt></ruby><u>器</u><ruby>注文<rt>ちゅうもん</rt></ruby>したんだけど、<ruby>口座<rt>こうざ</rt></ruby><u>引き落とし</u>で<ruby>支払<rt>しはら</rt></ruby>おうとしたら、<u>残高</u>が足りなくて<ruby>買<rt>か</rt></ruby>えなくて…。Bさん、もしクレジットカード<ruby>持<rt>も</rt></ruby>ってたら<u>立て替えて</u>くれない？
B：うーん、それはちょっと…。",
    english_translation: "A: I ordered an ankle brace and a phone charging device yesterday, but when I tried to pay by direct debit, I couldn't because my account balance was too low... Hey B, if you have a credit card, could you pay it on my behalf? B: Hmmm, I'm not sure about that...",
    annotated_words: [
      { word_id: "n2_0223", word_number: 223, kanji: "足首", furigana: "あしくび", meaning_en: "ankle" },
      { word_id: "n2_0224", word_number: 224, kanji: "～器", furigana: "き", meaning_en: "~ device" },
      { word_id: "n2_0225", word_number: 225, kanji: "引き落とし", furigana: "ひきおとし", meaning_en: "direct debit, bank withdrawal" },
      { word_id: "n2_0227", word_number: 227, kanji: "残高", furigana: "ざんだか", meaning_en: "(account) balance" },
      { word_id: "n2_0228", word_number: 228, kanji: "立て替える", furigana: "たてかえる", meaning_en: "pay on someone's behalf" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 3 買い物",
    page_story: "48_2",
    japanese_text: "A：もうすぐホワイトデーだから、<ruby>彼女<rt>かのじょ</rt></ruby>に<u>花束</u>とチョコを<ruby>贈<rt>おく</rt></ruby>ろうと思ってて…これなんてどうかな？
B：へー、かわいいね！<u>かご</u>に<ruby>花<rt>はな</rt></ruby>とチョコが<ruby>入<rt>はい</rt></ruby>ってるんだ。あ、<ruby>今<rt>いま</rt></ruby>キャンペーン<ruby>中<rt>ちゅう</rt></ruby>で、<u>いくらか</u><u>ボーナス</u>で<u>ポイント</u>もつくみたいだよ。",
    english_translation: "A: It's almost White Day. I was thinking of getting my girlfriend a bouquet of flowers and some chocolates... How about this? B: Wow, that's cute! It's a basket with flowers and chocolates. Oh, there's a campaign on at the moment, so it looks like you can earn a few bonus points too.",
    annotated_words: [
      { word_id: "n2_0229", word_number: 229, kanji: "花束", furigana: "はなたば", meaning_en: "bouquet, bunch of flowers" },
      { word_id: "n2_0231", word_number: 231, kanji: "かご", furigana: "かご", meaning_en: "basket" },
      { word_id: "n2_0232", word_number: 232, kanji: "いくらか", furigana: "いくらか", meaning_en: "a few, some" },
      { word_id: "n2_0233", word_number: 233, kanji: "ボーナス", furigana: "", meaning_en: "bonus" },
      { word_id: "n2_0234", word_number: 234, kanji: "ポイント", furigana: "", meaning_en: "points" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 3 買い物",
    page_story: "49_1",
    japanese_text: "A：見てこれ。<ruby>絶版<rt>ぜっぱん</rt></ruby>になった<ruby>本<rt>ほん</rt></ruby>がオークションに出てるんだけど、<ruby>予算<rt>よさん</rt></ruby>を<u>超えて</u>るんだよね。\nB：<ruby>珍しい<rt>めずらしい</rt></ruby>ものは<u>大概</u>そうなるよね。",
    english_translation: "A: Look at this. There's an out-of-print book on auction, but it's over my budget. B: That's usually the case with rare items.",
    annotated_words: [
      { word_id: "n2_0235", word_number: 235, kanji: "超える", furigana: "こえる", meaning_en: "exceed, go over" },
      { word_id: "n2_0236", word_number: 236, kanji: "大概", furigana: "たいがい", meaning_en: "usually, generally speaking" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 3 買い物",
    page_story: "50_1",
    japanese_text: "A：あー、どうしよう。オークションの<ruby>終了時間<rt>しゅうりょうじかん</rt></ruby>が<u>迫って</u>る。\nB：予算オーバーって言っても<u>せいぜい</u>500円でしょ。<ruby>新品<rt>しんぴん</rt></ruby>とそんなに<u>差</u>はないんだから、<u>損得</u>考えずに買っちゃいなよ。",
    english_translation: "A: Oh, what should I do? The end of the auction is approaching. B: Even if it's over your budget, it won't be more than 500 yen at most. That's not too different from a new one, so just buy it and don't worry about your monetary gain or loss.",
    annotated_words: [
      { word_id: "n2_0237", word_number: 237, kanji: "迫る", furigana: "せまる", meaning_en: "approach, impend" },
      { word_id: "n2_0238", word_number: 238, kanji: "せいぜい", furigana: "", meaning_en: "at most, to the utmost" },
      { word_id: "n2_0239", word_number: 239, kanji: "差", furigana: "さ", meaning_en: "difference, discrepancy" },
      { word_id: "n2_0240", word_number: 240, kanji: "損得", furigana: "そんとく", meaning_en: "gain and loss" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 3 買い物",
    page_story: "50_2",
    japanese_text: "A：あ、パソコン買ったの？
B：欲しかったモデルがたまたま売ってて、<u>つい</u><ruby>買<rt>か</rt></ruby>っちゃった。
A：<ruby>最新<rt>さいしん</rt></ruby>モデルだよね。<ruby>高<rt>たか</rt></ruby>くなかった？
B：<ruby>展示品<rt>てんじひん</rt></ruby>だったから<u>値引き</u>もされて、<u>手頃な</u>価格だったよ。<u>不要な</u>パソコンは<ruby>買<rt>か</rt></ruby>い<ruby>取<rt>と</rt></ruby>ってもらって、<u>おまけ</u>で<ruby>画面<rt>がめん</rt></ruby>に貼るフィルムももらっちゃった。<u>品質</u>もいいし、<ruby>大満足<rt>だいまんぞく</rt></ruby>！",
    english_translation: "A: Oh, did you buy a computer? B: The model I wanted was on sale, so I just bought it on impulse. A: It's the latest model, right? Wasn't it expensive? B: It was a display model, so I got a discount and it was a reasonable price. I exchanged it for a computer I didn't need, and got some protective film for the screen as a free gift. The quality is good, and I'm very satisfied!",
    annotated_words: [
      { word_id: "n2_0241", word_number: 241, kanji: "つい", furigana: "", meaning_en: "inadvertently, on impulse" },
      { word_id: "n2_0242", word_number: 242, kanji: "値引き[する]", furigana: "ねびき", meaning_en: "discount, discount (something)" },
      { word_id: "n2_0243", word_number: 243, kanji: "手頃な", furigana: "てごろな", meaning_en: "affordable, reasonable (price)" },
      { word_id: "n2_0244", word_number: 244, kanji: "不要な", furigana: "ふような", meaning_en: "not needed" },
      { word_id: "n2_0245", word_number: 245, kanji: "おまけ[する]", furigana: "おまけ", meaning_en: "gift, incentive, offer as a gift" },
      { word_id: "n2_0246", word_number: 246, kanji: "品質", furigana: "ひんしつ", meaning_en: "quality" }
    ]
  }
];

topic3Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved Topic 3 story ${story.story_number}: ${story.page_story}.json`);
});

console.log(`\nDone! ${topic3Stories.length} stories saved for Topic 3 買い物 (words 190-246).`);
