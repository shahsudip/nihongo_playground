import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete 11 stories for Topic 1 (食事) transcribed directly from page images
const topic1Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 1 食事",
    page_story: "14_1",
    japanese_text: "A：先週行った駅前の<u>創作</u>料理の店、閉店するんだって。\nB：え、あの店、<u>食物</u>アレルギーに対応したメニューもあってよかったのに。\nA：ね。駅前は、チェーンのファミレスも多いし、やっぱり、小さい店がそういう大きい店と<u>勝負</u>するのは難しいのかもね。",
    english_translation: "A: I heard that the creative cuisine restaurant by the station that we went to last week is closing. B: What? That restaurant was great—it had a menu for people with food allergies. A: Yeah. There are lots of franchise family restaurants near the station, and it's probably difficult for a smaller restaurant to compete with such large places.",
    annotated_words: [
      { word_id: "n2_0001", word_number: 1, kanji: "創作[する]", furigana: "そうさく", meaning_en: "creative, create" },
      { word_id: "n2_0002", word_number: 2, kanji: "食物", furigana: "しょくもつ", meaning_en: "food" },
      { word_id: "n2_0003", word_number: 3, kanji: "勝負[する]", furigana: "しょうぶ", meaning_en: "victory, compete" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 1 食事",
    page_story: "15_1",
    japanese_text: "日本の米は、品種によって<u>粒</u>の大きさ、甘<u>み</u>、食感などが異なる。\n300gの少量<u>パック</u>も売っているので、いろいろ試してみるのもいいだろう。保存するときは、温かいうちに<u>1人前</u>ずつ<u>ラップ</u>で包むのが大切だ。<u>冷めたら</u>さらに<u>アルミホイル</u>で包んで<u>冷凍庫</u>に入れれば、おいしいまま冷凍できる。",
    english_translation: "Japanese rice varies in grain size, sweetness, and texture, depending on the variety. Small 300 gram packs are available, so it's a good idea to try different varieties. When storing rice, it's important to wrap it in single portions in plastic wrap while it's still warm. After they cool, wrap them in aluminum foil and put them in the freezer to freeze them while they are still full of flavor.",
    annotated_words: [
      { word_id: "n2_0004", word_number: 4, kanji: "粒", furigana: "つぶ", meaning_en: "grain" },
      { word_id: "n2_0005", word_number: 5, kanji: "～み", furigana: "", meaning_en: "~ness" },
      { word_id: "n2_0006", word_number: 6, kanji: "パック[する]", furigana: "", meaning_en: "pack, package" },
      { word_id: "n2_0007", word_number: 7, kanji: "～人前", furigana: "にんまえ", meaning_en: "~portion" },
      { word_id: "n2_0008", word_number: 8, kanji: "ラップ[する]", furigana: "", meaning_en: "plastic wrap, to wrap" },
      { word_id: "n2_0009", word_number: 9, kanji: "冷める", furigana: "さめる", meaning_en: "cool down" },
      { word_id: "n2_0010", word_number: 10, kanji: "冷ます", furigana: "さます", meaning_en: "cool (something) down" },
      { word_id: "n2_0011", word_number: 11, kanji: "アルミホイル", furigana: "", meaning_en: "aluminum foil" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 1 食事",
    page_story: "16_1",
    japanese_text: "A：あそこのラーメン屋、どうだった？\nB：うーん。<u>あっさり</u>してて、ちょっと<u>物足りない</u>と思った。やっぱり、ラーメンは<u>脂</u>が<u>たっぷり</u>入ってるのが<u>好み</u>だなあ。\nA：ああ、そうだね。\nB：あ、でも、チャーシューが<u>あぶって</u>あったのはよかったね。",
    english_translation: "A: How was that ramen shop? B: Hmmm. Well, I found it rather light and unsatisfying. Personally, I prefer ramen with plenty of fat. A: Oh, right. B: But the roasted pork was nicely seared.",
    annotated_words: [
      { word_id: "n2_0012", word_number: 12, kanji: "あっさり", furigana: "あっさり", meaning_en: "lightly, plainly, simply" },
      { word_id: "n2_0013", word_number: 13, kanji: "物足りない", furigana: "ものたりない", meaning_en: "lacking, unsatisfying" },
      { word_id: "n2_0014", word_number: 14, kanji: "脂", furigana: "あぶら", meaning_en: "fat" },
      { word_id: "n2_0015", word_number: 15, kanji: "たっぷり", furigana: "たっぷり", meaning_en: "generously, plentifully" },
      { word_id: "n2_0016", word_number: 16, kanji: "好み", furigana: "このみ", meaning_en: "preference" },
      { word_id: "n2_0017", word_number: 17, kanji: "好む", furigana: "このむ", meaning_en: "prefer" },
      { word_id: "n2_0018", word_number: 18, kanji: "あぶる", furigana: "あぶる", meaning_en: "roast, sear" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 1 食事",
    page_story: "16_2",
    japanese_text: "A：ご注文はお決まりですか。\nB：えっと、日替わりランチ。\nA：はい、では、こちらから<u>メイン</u>をお選びください。\nB：あ、じゃ、<u>ミックス</u>フライで。\nA：はい。サラダのドレッシングはいかがなさいますか。\nB：あ、<u>和風</u>ドレッシングで。<u>それと</u>、抹茶パフェお願いします。",
    english_translation: "A: Have you decided what you want to order? B: Let's see, the daily lunch. A: Right, well, please choose your main dish here. B: Oh, well, I'll have the mixed deep-fry plate. A: Got it. What kind of dressing would you like for your salad? B: Um, Japanese-style dressing. And also, green tea parfait, please.",
    annotated_words: [
      { word_id: "n2_0019", word_number: 19, kanji: "メイン", furigana: "", meaning_en: "main dish" },
      { word_id: "n2_0020", word_number: 20, kanji: "ミックス[する]", furigana: "", meaning_en: "mix, to mix" },
      { word_id: "n2_0021", word_number: 21, kanji: "和風", furigana: "わふう", meaning_en: "Japanese-style" },
      { word_id: "n2_0022", word_number: 22, kanji: "洋風", furigana: "ようふう", meaning_en: "western-style" },
      { word_id: "n2_0023", word_number: 23, kanji: "それと", furigana: "", meaning_en: "and also" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 1 食事",
    page_story: "17_1",
    japanese_text: "A：なんか<u>煙く</u>ない？\nB：確かに…あ、<u>焦げてる</u>！この黒い<u>塊</u>、何？\nA：うーん…たぶん、ホルモン…。",
    english_translation: "A: Can't you smell smoke? B: I sure can... Oh, it's burning! What are these black chunks? A: Hmmm... it's probably offal...",
    annotated_words: [
      { word_id: "n2_0024", word_number: 24, kanji: "煙い", furigana: "けむい", meaning_en: "smoky" },
      { word_id: "n2_0025", word_number: 25, kanji: "焦げる", furigana: "こげる", meaning_en: "burn" },
      { word_id: "n2_0026", word_number: 26, kanji: "焦がす", furigana: "こがす", meaning_en: "burn (something)" },
      { word_id: "n2_0027", word_number: 27, kanji: "塊", furigana: "かたまり", meaning_en: "chunk, lump" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 1 食事",
    page_story: "18_1",
    japanese_text: "この店の<u>名物</u>は、皮付きのりんごが<u>丸々</u>1個入ったアップルパイだ。<u>芯</u>をくりぬいた部分には、スポンジが<u>ぎっしり</u>と詰まっている。<u>見た目</u>がかわいい上にとてもおいしく、大人気だ。",
    english_translation: "This store's specialty is apple pie, made from an entire apple with the skin left on. The core is hollowed out and packed full of sponge cake. The pie looks cute, tastes really great, and is very popular.",
    annotated_words: [
      { word_id: "n2_0028", word_number: 28, kanji: "名物", furigana: "めいぶつ", meaning_en: "specialty" },
      { word_id: "n2_0029", word_number: 29, kanji: "丸々", furigana: "まるまる", meaning_en: "entirely, wholly" },
      { word_id: "n2_0030", word_number: 30, kanji: "芯", furigana: "しん", meaning_en: "core" },
      { word_id: "n2_0031", word_number: 31, kanji: "ぎっしり(と)", furigana: "", meaning_en: "tightly, fully" },
      { word_id: "n2_0032", word_number: 32, kanji: "見た目", furigana: "みため", meaning_en: "appearance, look" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 1 食事",
    page_story: "18_2",
    japanese_text: "A：今度の歓迎会だけど、焼肉<u>食べ放題</u>はどう？\nB：いいですね。でも、胃が<u>もたれ</u>そうだな。\nA：え、まだ若いのに。じゃあ、このしゃぶしゃぶ屋はどう？<u>上等な</u>肉が安く食べられるって<u>口コミ</u>でも評判だよ。",
    english_translation: "A: How about all-you-can-eat barbecue for the upcoming welcome party? B: Sounds good. But it'll probably sit too heavily in my stomach. A: What? You're still young. How about this shabu-shabu place? It's got great word-of-mouth for being inexpensive for top-quality meat.",
    annotated_words: [
      { word_id: "n2_0033", word_number: 33, kanji: "食べ放題", furigana: "たべほうだい", meaning_en: "all-you-can-eat" },
      { word_id: "n2_0034", word_number: 34, kanji: "～放題", furigana: "ほうだい", meaning_en: "all-you-can-~" },
      { word_id: "n2_0035", word_number: 35, kanji: "もたれる", furigana: "", meaning_en: "sit heavily" },
      { word_id: "n2_0036", word_number: 36, kanji: "上等な", furigana: "じょうとうな", meaning_en: "high-end, top-quality" },
      { word_id: "n2_0037", word_number: 37, kanji: "口コミ", furigana: "くちこみ", meaning_en: "word of mouth" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 1 食事",
    page_story: "19_1",
    japanese_text: "一人暮らしをしていると、栄養が<u>偏り</u>がちだ。何か野菜を食べなければと思うが、今は野菜が高くて<u>手に入りにくい</u>。子どものときは<u>好き嫌い</u>が多く、母の作る料理が嫌だと思ったこともあったが、今となっては栄養たっぷりの母の手料理が<u>恋しい</u>。",
    english_translation: "When you live alone, your diet tends to get imbalanced. I probably need to eat some vegetables, but vegetables are expensive and hard to get nowadays. When I was a child, I was fussy about food and at times I disliked the food my mother cooked, but now I miss her healthy, nutritious cooking.",
    annotated_words: [
      { word_id: "n2_0038", word_number: 38, kanji: "偏る", furigana: "かたよる", meaning_en: "deviate, get imbalanced" },
      { word_id: "n2_0039", word_number: 39, kanji: "偏り", furigana: "かたよる", meaning_en: "bias, imbalance" },
      { word_id: "n2_0040", word_number: 40, kanji: "手に入れる", furigana: "てにいれる", meaning_en: "get, obtain" },
      { word_id: "n2_0041", word_number: 41, kanji: "手に入る", furigana: "てにはいる", meaning_en: "come into (one's) possession" },
      { word_id: "n2_0042", word_number: 42, kanji: "好き嫌い[する]", furigana: "すききらい", meaning_en: "likes and dislikes, fussy" },
      { word_id: "n2_0043", word_number: 43, kanji: "恋しい", furigana: "こいしい", meaning_en: "longed for, missed" },
      { word_id: "n2_0044", word_number: 44, kanji: "恋[する]", furigana: "こい", meaning_en: "love" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 1 食事",
    page_story: "20_1",
    japanese_text: "冷蔵庫の中が<u>生臭い</u>と思ったら、きゅうりが腐って白い<u>液体</u>が出ていた。普段、<u>賞味期限</u>切れのお菓子などは気にせず食べているが、これはさすがにやめておこう。せっかく母が<u>農薬</u>を使わずに育てたからと送ってくれたのに、<u>粗末</u>にしてしまって申し訳ない。",
    english_translation: "I noticed something stinking in the refrigerator, but it turned out to be rotten cucumbers with white fluid oozing out of them. I usually don't mind eating expired snacks, but there's no way I'd eat this. My mother sent me these cucumbers she'd grown without using any pesticides, so I feel bad for treating them so carelessly.",
    annotated_words: [
      { word_id: "n2_0045", word_number: 45, kanji: "生臭い", furigana: "なまぐさい", meaning_en: "stinking" },
      { word_id: "n2_0046", word_number: 46, kanji: "液体", furigana: "えきたい", meaning_en: "fluid, liquid" },
      { word_id: "n2_0047", word_number: 47, kanji: "賞味期限", furigana: "しょうみきげん", meaning_en: "best-before date" },
      { word_id: "n2_0048", word_number: 48, kanji: "消費期限", furigana: "しょうひきげん", meaning_en: "expiry date" },
      { word_id: "n2_0049", word_number: 49, kanji: "～切れ", furigana: "ぎれ", meaning_en: "used up, run out, expired" },
      { word_id: "n2_0050", word_number: 50, kanji: "農薬", furigana: "のうやく", meaning_en: "pesticides" },
      { word_id: "n2_0051", word_number: 51, kanji: "粗末な", furigana: "そまつな", meaning_en: "coarse, careless" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 1 食事",
    page_story: "20_2",
    japanese_text: "昨日、久しぶりに友だちとスイーツ<u>ビュッフェ</u>に行った。壁<u>一面</u>がパステルカラーで、メニューには、カラフルなケーキや、<u>綿</u>あめののったドリンクがあったりして、とてもかわいかった。",
    english_translation: "Yesterday, for the first time in a while, I went to a dessert buffet with a friend. The walls were pastel-colored all over, and there were colorful cakes and drinks with cotton candy on the menu. It was really cute.",
    annotated_words: [
      { word_id: "n2_0052", word_number: 52, kanji: "ビュッフェ", furigana: "", meaning_en: "buffet" },
      { word_id: "n2_0053", word_number: 53, kanji: "一面", furigana: "いちめん", meaning_en: "all over" },
      { word_id: "n2_0054", word_number: 54, kanji: "綿", furigana: "わた", meaning_en: "cotton" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 1 食事",
    page_story: "21_1",
    japanese_text: "A：クリスマスパーティーのケーキ、どうする？\nB：5人だよね？5<u>等分</u>って、難しいよね…。\nA：あ、じゃあ、大きいのひとつじゃなくて、<u>めいめい</u>好きなケーキを買う？\nB：いいね。私はフルーツタルトにしよっと。あの店のはフルーツがたくさんで<u>豪華</u>なんだよね。",
    english_translation: "A: What do you want to do about a cake for the Christmas party? B: There are five of us, right? It's hard to divide a cake into five equal portions. A: Well, instead of one big cake, why don't we buy our own respective cakes? B: Great idea. I'll get a fruit tart. The one at that store is gorgeous with lots of fruit on it.",
    annotated_words: [
      { word_id: "n2_0055", word_number: 55, kanji: "～等分", furigana: "とうぶん", meaning_en: "equal portions" },
      { word_id: "n2_0056", word_number: 56, kanji: "等分[する]", furigana: "とうぶん", meaning_en: "equal portions, divide equally" },
      { word_id: "n2_0057", word_number: 57, kanji: "めいめい", furigana: "", meaning_en: "individual, respective" },
      { word_id: "n2_0058", word_number: 58, kanji: "豪華な", furigana: "ごうかな", meaning_en: "gorgeous" }
    ]
  }
];

topic1Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact story ${story.story_number}: ${story.page_story}.json`);
});
