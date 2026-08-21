import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Full Topic 1 (食事 - Eating, No. 1 to 92): 17 stories in total
const topic1Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 1 食事",
    page_story: "14_1",
    japanese_text: "A：<ruby>先週<rt>せんしゅう</rt></ruby><ruby>行<rt>い</rt></ruby>った<ruby>駅前<rt>えきまえ</rt></ruby>の<u>創作</u><ruby>料理<rt>りょうり</rt></ruby>の<ruby>店<rt>みせ</rt></ruby>、<ruby>閉店<rt>へいてん</rt></ruby>するんだって。\nB：え、あの<ruby>店<rt>みせ</rt></ruby>、<u>食物</u>アレルギーに<ruby>対応<rt>たいおう</rt></ruby>したメニューもあってよかったのに。\nA：ね。<ruby>駅前<rt>えきまえ</rt></ruby>は、チェーンのファミレスも<ruby>多<rt>おお</rt></ruby>いし、やっぱり、<ruby>小<rt>ちい</rt></ruby>さい<ruby>店<rt>みせ</rt></ruby>がそういう<ruby>大<rt>おお</rt></ruby>きい<ruby>店<rt>みせ</rt></ruby>と<u>勝負</u>するのは<ruby>難<rt>むずか</rt></ruby>しいのかもね。",
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
    japanese_text: "<ruby>日本<rt>にほん</rt></ruby>の<ruby>米<rt>こめ</rt></ruby>は、<ruby>品種<rt>ひんしゅ</rt></ruby>によって<u>粒</u>の<ruby>大<rt>おお</rt></ruby>きさ、<ruby>甘<rt>あま</rt></ruby><u>み</u>、<ruby>食感<rt>しょっかん</rt></ruby>などが<ruby>異<rt>こと</rt></ruby>なる。\\n300gの<ruby>少量<rt>しょうりょう</rt></ruby><u>パック</u>も<ruby>売<rt>う</rt></ruby>っているので、いろいろ<ruby>試<rt>ため</rt></ruby>してみるのもいいだろう。<ruby>保存<rt>ほぞん</rt></ruby>するときは、<ruby>温<rt>あたた</rt></ruby>かいうちに<u>1人前</u>ずつ<u>ラップ</u>で<ruby>包<rt>つつ</rt></ruby>むのが<ruby>大切<rt>たいせつ</rt></ruby>だ。<u>冷めたら</u>さらに<u>アルミホイル</u>で<ruby>包<rt>つつ</rt></ruby>んで<ruby>冷凍庫<rt>れいとうこ</rt></ruby>に<ruby>入<rt>い</rt></ruby>れれば、おいしいまま<ruby>冷凍<rt>れいとう</rt></ruby>できる。",
    english_translation: "Japanese rice varies in grain size, sweetness, and texture, depending on the variety. Small 300 gram packs are available, so it's a good idea to try different varieties. When storing rice, it's important to wrap it in single portions in plastic wrap while it's still warm. After they cool, wrap them in aluminum foil and put them in the freezer to freeze them while they are still full of flavor.",
    annotated_words: [
      { word_id: "n2_0004", word_number: 4, kanji: "粒", furigana: "つぶ", meaning_en: "grain" },
      { word_id: "n2_0005", word_number: 5, kanji: "～み", furigana: "", meaning_en: "~ness" },
      { word_id: "n2_0006", word_number: 6, kanji: "パック[する]", furigana: "", meaning_en: "pack, package" },
      { word_id: "n2_0007", word_number: 7, kanji: "～人前", furigana: "にんまえ", meaning_en: "~portion" },
      { word_id: "n2_0008", word_number: 8, kanji: "ラップ[する]", furigana: "", meaning_en: "plastic wrap, to wrap" },
      { word_id: "n2_0009", word_number: 9, kanji: "冷める", furigana: "さめる", meaning_en: "cool down" },
      { word_id: "n2_0011", word_number: 11, kanji: "アルミホイル", furigana: "", meaning_en: "aluminum foil" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 1 食事",
    page_story: "16_1",
    japanese_text: "A：あそこのラーメン<ruby>屋<rt>や</rt></ruby>、どうだった？\\nB：うーん。<u>あっさり</u>してて、ちょっと<u>物足りない</u>と<ruby>思<rt>おも</rt></ruby>った。やっぱり、ラーメンは<u>脂</u>が<u>たっぷり</u><ruby>入<rt>はい</rt></ruby>ってるのが<u>好み</u>だなあ。\\nA：ああ、そうだね。\\nB：あ、でも、チャーシューが<u>あぶって</u>あったのはよかったね。",
    english_translation: "A: How was that ramen shop? B: Hmmm. Well, I found it rather light and unsatisfying. Personally, I prefer ramen with plenty of fat. A: Oh, right. B: But the roasted pork was nicely seared.",
    annotated_words: [
      { word_id: "n2_0012", word_number: 12, kanji: "あっさり", furigana: "あっさり", meaning_en: "lightly, plainly, simply" },
      { word_id: "n2_0013", word_number: 13, kanji: "物足りない", furigana: "ものたりない", meaning_en: "lacking, unsatisfying" },
      { word_id: "n2_0014", word_number: 14, kanji: "脂", furigana: "あぶら", meaning_en: "fat" },
      { word_id: "n2_0015", word_number: 15, kanji: "たっぷり", furigana: "たっぷり", meaning_en: "generously, plentifully" },
      { word_id: "n2_0016", word_number: 16, kanji: "好み", furigana: "このみ", meaning_en: "preference" },
      { word_id: "n2_0018", word_number: 18, kanji: "あぶる", furigana: "あぶる", meaning_en: "roast, sear" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 1 食事",
    page_story: "16_2",
    japanese_text: "A：ご<ruby>注文<rt>ちゅうもん</rt></ruby>はお<ruby>決<rt>き</rt></ruby>まりですか。\\nB：えっと、<ruby>日替<rt>ひが</rt></ruby>わりランチ。\\nA：はい、では、こちらから<u>メイン</u>をお<ruby>選<rt>えら</rt></ruby>びください。\\nB：あ、じゃ、<u>ミックス</u>フライで。\\nA：はい。サラダのドレッシングはいかがなさいますか。\\nB：あ、<u>和風</u>ドレッシングで。<u>それと</u>、<ruby>抹茶<rt>まっちゃ</rt></ruby>パフェお<ruby>願<rt>ねが</rt></ruby>いします。",
    english_translation: "A: Have you decided what you want to order? B: Let's see, the daily lunch. A: Right, well, please choose your main dish here. B: Oh, well, I'll have the mixed deep-fry plate. A: Got it. What kind of dressing would you like for your salad? B: Um, Japanese-style dressing. And also, green tea parfait, please.",
    annotated_words: [
      { word_id: "n2_0019", word_number: 19, kanji: "メイン", furigana: "", meaning_en: "main dish" },
      { word_id: "n2_0020", word_number: 20, kanji: "ミックス[する]", furigana: "", meaning_en: "mix, to mix" },
      { word_id: "n2_0021", word_number: 21, kanji: "和風", furigana: "わふう", meaning_en: "Japanese-style" },
      { word_id: "n2_0023", word_number: 23, kanji: "それと", furigana: "", meaning_en: "and also" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 1 食事",
    page_story: "17_1",
    japanese_text: "A：なんか<u>煙く</u>ない？\\nB：<ruby>確<rt>たし</rt></ruby>かに…あ、<u>焦げてる</u>！この<ruby>黒<rt>くろ</rt></ruby>い<u>塊</u>、<ruby>何<rt>なに</rt></ruby>？\\nA：うーん…たぶん、ホルモン…。",
    english_translation: "A: Can't you smell smoke? B: I sure can... Oh, it's burning! What are these black chunks? A: Hmmm... it's probably offal...",
    annotated_words: [
      { word_id: "n2_0024", word_number: 24, kanji: "煙い", furigana: "けむい", meaning_en: "smoky" },
      { word_id: "n2_0025", word_number: 25, kanji: "焦げる", furigana: "こげる", meaning_en: "burn" },
      { word_id: "n2_0027", word_number: 27, kanji: "塊", furigana: "かたまり", meaning_en: "chunk, lump" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 1 食事",
    page_story: "18_1",
    japanese_text: "この<ruby>店<rt>みせ</rt></ruby>の<u>名物</u>は、<ruby>皮付<rt>かわつ</rt></ruby>きのりんごが<u>丸々</u>1<ruby>個<rt>こ</rt></ruby><ruby>入<rt>はい</rt></ruby>ったアップルパイだ。<u>芯</u>をくりぬいた<ruby>部分<rt>ぶぶん</rt></ruby>には、スポンジが<u>ぎっしり</u>と<ruby>詰<rt>つ</rt></ruby>まっている。<u>見た目</u>がかわいい<ruby>上<rt>うえ</rt></ruby>にとてもおいしく、<ruby>大人気<rt>だいにんき</rt></ruby>だ。",
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
    japanese_text: "A：<ruby>今度<rt>こんど</rt></ruby>の<ruby>歓迎会<rt>かんげいかい</rt></ruby>だけど、<ruby>焼肉<rt>やきにく</rt></ruby><u>食べ放題</u>はどう？\\nB：いいですね。でも、<ruby>胃<rt>い</rt></ruby>が<u>もたれ</u>そうだな。\\nA：え、まだ<ruby>若<rt>わか</rt></ruby>いのに。じゃあ、このしゃぶしゃぶ<ruby>屋<rt>や</rt></ruby>はどう？<u>上等な</u><ruby>肉<rt>にく</rt></ruby>が<ruby>安<rt>やす</rt></ruby>く<ruby>食<rt>た</rt></ruby>べられるって<u>口コミ</u>でも<ruby>評判<rt>ひょうばん</rt></ruby>だよ。",
    english_translation: "A: How about all-you-can-eat barbecue for the upcoming welcome party? B: Sounds good. But it'll probably sit too heavily in my stomach. A: What? You're still young. How about this shabu-shabu place? It's got great word-of-mouth for being inexpensive for top-quality meat.",
    annotated_words: [
      { word_id: "n2_0033", word_number: 33, kanji: "食べ放題", furigana: "たべほうだい", meaning_en: "all-you-can-eat" },
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
    japanese_text: "<ruby>一人暮<rt>ひとりぐ</rt></ruby>らしをしていると、<ruby>栄養<rt>えいよう</rt></ruby>が<u>偏り</u>がちだ。<ruby>何<rt>なに</rt></ruby>か<ruby>野菜<rt>やさい</rt></ruby>を<ruby>食<rt>た</rt></ruby>べなければと<ruby>思<rt>おも</rt></ruby>うが、<ruby>今<rt>いま</rt></ruby>は<ruby>野菜<rt>やさい</rt></ruby>が<ruby>高<rt>たか</rt></ruby>くて<u>手に入りにくい</u>。<ruby>子<rt>こ</rt></ruby>どものときは<u>好き嫌い</u>が<ruby>多<rt>おお</rt></ruby>く、<ruby>母<rt>はは</rt></ruby>の<ruby>作<rt>つく</rt></ruby>る<ruby>料理<rt>りょうり</rt></ruby>が<ruby>嫌<rt>いや</rt></ruby>だと<ruby>思<rt>おも</rt></ruby>ったこともあったが、<ruby>今<rt>いま</rt></ruby>となっては<ruby>栄養<rt>えいよう</rt></ruby>たっぷりの<ruby>母<rt>はは</rt></ruby>の<ruby>手料理<rt>てりょうり</rt></ruby>が<u>恋しい</u>。",
    english_translation: "When you live alone, your diet tends to get imbalanced. I probably need to eat some vegetables, but vegetables are expensive and hard to get nowadays. When I was a child, I was fussy about food and at times I disliked the food my mother cooked, but now I miss her healthy, nutritious cooking.",
    annotated_words: [
      { word_id: "n2_0038", word_number: 38, kanji: "偏る", furigana: "かたよる", meaning_en: "deviate, get imbalanced" },
      { word_id: "n2_0040", word_number: 40, kanji: "手に入れる", furigana: "てにいれる", meaning_en: "get, obtain" },
      { word_id: "n2_0042", word_number: 42, kanji: "好き嫌い[する]", furigana: "すききらい", meaning_en: "likes and dislikes, fussy" },
      { word_id: "n2_0043", word_number: 43, kanji: "恋しい", furigana: "こいしい", meaning_en: "longed for, missed" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 1 食事",
    page_story: "20_1",
    japanese_text: "<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>が<u>生臭い</u>と<ruby>思<rt>おも</rt></ruby>ったら、きゅうりが<ruby>腐<rt>くさ</rt></ruby>って<ruby>白<rt>しろ</rt></ruby>い<u>液体</u>が<ruby>出<rt>で</rt></ruby>ていた。<ruby>普段<rt>ふだん</rt></ruby>、<u>賞味期限</u><u>切れ</u>のお<ruby>菓子<rt>かし</rt></ruby>などは<ruby>気<rt>き</rt></ruby>にせず<ruby>食<rt>た</rt></ruby>べているが、これはさすがにやめておこう。せっかく<ruby>母<rt>はは</rt></ruby>が<u>農薬</u>を<ruby>使<rt>つか</rt></ruby>わずに<ruby>育<rt>そだ</rt></ruby>てたからと<ruby>送<rt>おく</rt></ruby>ってくれたのに、<u>粗末</u>にしてしまって<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ない。",
    english_translation: "I noticed something stinking in the refrigerator, but it turned out to be rotten cucumbers with white fluid oozing out of them. I usually don't mind eating expired snacks, but there's no way I'd eat this. My mother sent me these cucumbers she'd grown without using any pesticides, so I feel bad for treating them so carelessly.",
    annotated_words: [
      { word_id: "n2_0045", word_number: 45, kanji: "生臭い", furigana: "なまぐさい", meaning_en: "stinking" },
      { word_id: "n2_0046", word_number: 46, kanji: "液体", furigana: "えきたい", meaning_en: "fluid, liquid" },
      { word_id: "n2_0047", word_number: 47, kanji: "賞味期限", furigana: "しょうみきげん", meaning_en: "best-before date" },
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
    japanese_text: "<ruby>昨日<rt>きのう</rt></ruby>、<ruby>久<rt>ひさ</rt></ruby>しぶりに<ruby>友<rt>とも</rt></ruby>だちとスイーツ<u>ビュッフェ</u>に<ruby>行<rt>い</rt></ruby>った。<ruby>壁<rt>かべ</rt></ruby><u>一面</u>がパステルカラーで、メニューには、カラフルなケーキや、<u>綿</u>あめののったドリンクがあったりして、とてもかわいかった。",
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
    japanese_text: "A：クリスマスパーティーのケーキ、どうする？\\nB：5<ruby>人<rt>にん</rt></ruby>だよね？5<u>等分</u>って、<ruby>難<rt>むずか</rt></ruby>しいよね…。\\nA：あ、じゃあ、<ruby>大<rt>おお</rt></ruby>きいのひとつじゃなくて、<u>めいめい</u><ruby>好<rt>す</rt></ruby>きなケーキを<ruby>買<rt>か</rt></ruby>う？\\nB：いいね。<ruby>私<rt>わたし</rt></ruby>はフルーツタルトにしよっと。あの<ruby>店<rt>みせ</rt></ruby>のはフルーツがたくさんで<u>豪華</u>なんだよね。",
    english_translation: "A: What do you want to do about a cake for the Christmas party? B: There are five of us, right? It's hard to divide a cake into five equal portions. A: Well, instead of one big cake, why don't we buy our own respective cakes? B: Great idea. I'll get a fruit tart. The one at that store is gorgeous with lots of fruit on it.",
    annotated_words: [
      { word_id: "n2_0055", word_number: 55, kanji: "～等分", furigana: "とうぶん", meaning_en: "equal portions" },
      { word_id: "n2_0057", word_number: 57, kanji: "めいめい", furigana: "", meaning_en: "individual, respective" },
      { word_id: "n2_0058", word_number: 58, kanji: "豪華な", furigana: "ごうかな", meaning_en: "gorgeous" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 1 食事",
    page_story: "22_1",
    japanese_text: "A：<ruby>今<rt>いま</rt></ruby>のうちに<u>各自</u><ruby>食事<rt>しょくじ</rt></ruby>を<u>済ませて</u>おくように、だって。\\nB：そうなんだ。じゃ、<ruby>一緒<rt>いっしょ</rt></ruby>に<u>飯</u>、<u>食い</u>に<ruby>行<rt>い</rt></ruby>く？\\nA：いいね。どこ<ruby>行<rt>い</rt></ruby>く？\\nB：<ruby>駅前<rt>えきまえ</rt></ruby>の<ruby>定食屋<rt>ていしょくや</rt></ruby>は？あそこ、いつも<u>満席</u>だけど、この<ruby>時間<rt>じかん</rt></ruby>なら<ruby>空<rt>す</rt></ruby>いてそう。\\nA：そうだね。まだ<u>開店して</u>10<ruby>分<rt>ふん</rt></ruby>くらいだし。<ruby>行<rt>い</rt></ruby>こ、<ruby>行<rt>い</rt></ruby>こ。",
    english_translation: "A: He said we should each go ahead and get our meals out of the way now. B: Okay. So, do you want to go eat a meal with me? A: Great. Where do you want to go? B: How about that eatery right by the station? It's always full, but it's probably empty at this time of day. A: That's true. It's only been open for about 10 minutes. Let's go, let's go.",
    annotated_words: [
      { word_id: "n2_0059", word_number: 59, kanji: "各自", furigana: "かくじ", meaning_en: "each, individual" },
      { word_id: "n2_0060", word_number: 60, kanji: "済ませる", furigana: "すませる", meaning_en: "get out of the way, be done with" },
      { word_id: "n2_0061", word_number: 61, kanji: "飯", furigana: "めし", meaning_en: "food, meal" },
      { word_id: "n2_0062", word_number: 62, kanji: "食う", furigana: "くう", meaning_en: "eat" },
      { word_id: "n2_0063", word_number: 63, kanji: "満席", furigana: "まんせき", meaning_en: "full to capacity" },
      { word_id: "n2_0065", word_number: 65, kanji: "開店[する]", furigana: "かいてん", meaning_en: "open, to open a store" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 1 食事",
    page_story: "22_2",
    japanese_text: "A：なんか、<u>食卓</u>の<ruby>下<rt>した</rt></ruby>、<u>湿って</u>ない？\\nB：ああ。さっき、お<ruby>父<rt>とう</rt></ruby>さんが<u>酔っぱらって</u>お<ruby>酒<rt>さけ</rt></ruby>こぼしちゃったの。",
    english_translation: "A: Hey, is it wet under the table? B: Yeah. Dad got drunk and spilled some alcohol earlier.",
    annotated_words: [
      { word_id: "n2_0066", word_number: 66, kanji: "食卓", furigana: "しょくたく", meaning_en: "table" },
      { word_id: "n2_0067", word_number: 67, kanji: "湿る", furigana: "しめる", meaning_en: "get wet" },
      { word_id: "n2_0068", word_number: 68, kanji: "酔っぱらう", furigana: "よっぱらう", meaning_en: "get drunk" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 1 食事",
    page_story: "23_1",
    japanese_text: "フランス<ruby>料理<rt>りょうり</rt></ruby>はマナーが<ruby>難<rt>むずか</rt></ruby>しい。パンの<u>くず</u>は<ruby>店<rt>みせ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>が<ruby>掃除<rt>そうじ</rt></ruby>するので<ruby>自分<rt>じぶん</rt></ruby>で<ruby>払<rt>はら</rt></ruby>ってはいけない。スープを<ruby>飲<rt>の</rt></ruby>むときは、<ruby>皿<rt>さら</rt></ruby>の<u>縁</u>からスプーンを<ruby>入<rt>い</rt></ruby>れる。<ruby>少<rt>すく</rt></ruby>なくなってきたら<ruby>皿<rt>さら</rt></ruby>を<u>傾けて</u>もいいが、<ruby>音<rt>おと</rt></ruby>をたててはいけない。ワインを<ruby>注文<rt>ちゅうもん</rt></ruby>するときは、はじめに<ruby>少量<rt>しょうりょう</rt></ruby>だけ<u>つがれ</u>、<ruby>味<rt>あじ</rt></ruby>や<ruby>香<rt>かお</rt></ruby>りをチェックすることになっている。",
    english_translation: "Etiquette for French cuisine is difficult. You shouldn't sweep away bread crumbs yourself, since the waiter will clean them up. When eating soup, you put the spoon in from the edge of the bowl. When there's only a little soup left, you may tilt the bowl, but you shouldn't make any noise. When you order wine, only a small amount of wine is poured at the start so you can check the flavor and aroma.",
    annotated_words: [
      { word_id: "n2_0070", word_number: 70, kanji: "くず", furigana: "", meaning_en: "crumbs, waste" },
      { word_id: "n2_0071", word_number: 71, kanji: "縁", furigana: "ふち", meaning_en: "edge" },
      { word_id: "n2_0072", word_number: 72, kanji: "傾ける", furigana: "かたむける", meaning_en: "tilt" },
      { word_id: "n2_0074", word_number: 74, kanji: "つぐ", furigana: "", meaning_en: "pour" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 1 食事",
    page_story: "24_1",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>の<ruby>大<rt>だい</rt></ruby><u>好物</u>はこの<ruby>店<rt>みせ</rt></ruby>のラーメンだ。いつもニンニク・<ruby>野菜<rt>やさい</rt></ruby><u>増し</u>で<ruby>注文<rt>ちゅうもん</rt></ruby>している。<u>湯気</u>が<ruby>出<rt>で</rt></ruby>ている<ruby>熱々<rt>あつあつ</rt></ruby>の<ruby>大盛<rt>おおも</rt></ruby>りのラーメンが<ruby>出<rt>だ</rt></ruby>されると、<u>毎度</u><ruby>食<rt>た</rt></ruby>べきれるか<ruby>少<rt>すこ</rt></ruby>し<ruby>不安<rt>ふあん</rt></ruby>になる。ゆっくりと<u>味わっ</u>ている<ruby>時間<rt>じかん</rt></ruby>はない。<ruby>麺<rt>めん</rt></ruby>がのびないうちに<ruby>急<rt>いそ</rt></ruby>いで<ruby>食<rt>た</rt></ruby>べる。そして、<ruby>帰<rt>かえ</rt></ruby>りに<u>さっぱり</u>したアイスを<ruby>買<rt>か</rt></ruby>うのも<ruby>欠<rt>か</rt></ruby>かせない。",
    english_translation: "My favorite food is the ramen at this restaurant. I always order extra garlic and vegetables. When I'm served a large bowl of hot, steamy ramen, I'm always a little nervous about whether I'll be able to finish it. There's no time to savor it slowly. I eat it quickly before the noodles get too soft. And on the way home, it's essential to buy a refreshing ice cream.",
    annotated_words: [
      { word_id: "n2_0075", word_number: 75, kanji: "好物", furigana: "こうぶつ", meaning_en: "favorite" },
      { word_id: "n2_0076", word_number: 76, kanji: "増し", furigana: "まし", meaning_en: "addition, extra" },
      { word_id: "n2_0078", word_number: 78, kanji: "湯気", furigana: "ゆげ", meaning_en: "steam" },
      { word_id: "n2_0079", word_number: 79, kanji: "毎度", furigana: "まいど", meaning_en: "always, every time" },
      { word_id: "n2_0080", word_number: 80, kanji: "味わう", furigana: "あじわう", meaning_en: "savor" },
      { word_id: "n2_0081", word_number: 81, kanji: "さっぱり", furigana: "", meaning_en: "refreshingly" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 1 食事",
    page_story: "24_2",
    japanese_text: "「<ruby>胃下垂<rt>いかすい</rt></ruby>」には、<ruby>食後<rt>しょくご</rt></ruby>にお<ruby>腹<rt>なか</rt></ruby>の<ruby>下<rt>した</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>が<u>膨らむ</u>という<ruby>特徴<rt>とくちょう</rt></ruby>がある。また、<u>消化</u><ruby>不良<rt>ふりょう</rt></ruby>の<ruby>原因<rt>げんいん</rt></ruby>にもなりうる。",
    english_translation: "Ikasui (gastric ptosis) is characterized by bloating in the lower abdomen after eating. It can also cause indigestion.",
    annotated_words: [
      { word_id: "n2_0082", word_number: 82, kanji: "膨らむ", furigana: "ふくらむ", meaning_en: "bloat" },
      { word_id: "n2_0084", word_number: 84, kanji: "消化[する]", furigana: "しょうか", meaning_en: "digestion, digest" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 1 食事",
    page_story: "25_1",
    japanese_text: "ダイエット<ruby>中<rt>ちゅう</rt></ruby>は<u>カロリー</u>ばかり<ruby>気<rt>き</rt></ruby>にする<ruby>人<rt>ひと</rt></ruby>もいるが、<u>タンパク質</u>などの<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>栄養<rt>えいよう</rt></ruby>を<u>バランス</u>よくとることが<ruby>大切<rt>たいせつ</rt></ruby>だ。カロリーが<ruby>少<rt>すく</rt></ruby>なすぎると<u>エネルギー</u><ruby>不足<rt>ふそく</rt></ruby>になり、やせにくくなってしまう。\\nまた、<u>主食</u>はパンよりも<ruby>米<rt>こめ</rt></ruby>を、デザートはケーキではなく<u>和菓子</u>を<ruby>選<rt>えら</rt></ruby>ぶようにしたり、<u>塩分</u>をとりすぎないようにすると<ruby>良<rt>よ</rt></ruby>い。",
    english_translation: "Although some people are only concerned about calories when dieting, it's important to have a good balance of protein and other essential nutrients. Too few calories will result in a lack of energy, making it difficult to lose weight. It is also advisable to eat rice rather than bread as a staple food, to choose Japanese sweets for dessert instead of cakes, and to avoid excessive salt.",
    annotated_words: [
      { word_id: "n2_0085", word_number: 85, kanji: "カロリー", furigana: "", meaning_en: "calories" },
      { word_id: "n2_0086", word_number: 86, kanji: "タンパク質", furigana: "たんぱくしつ", meaning_en: "protein" },
      { word_id: "n2_0087", word_number: 87, kanji: "バランス", furigana: "", meaning_en: "balance" },
      { word_id: "n2_0088", word_number: 88, kanji: "エネルギー", furigana: "", meaning_en: "energy" },
      { word_id: "n2_0089", word_number: 89, kanji: "主食", furigana: "しゅしょく", meaning_en: "staple food" },
      { word_id: "n2_0091", word_number: 91, kanji: "和～", furigana: "わ", meaning_en: "Japanese ~" },
      { word_id: "n2_0092", word_number: 92, kanji: "塩分", furigana: "えんぶん", meaning_en: "salt content" }
    ]
  }
];

topic1Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact story ${story.story_number}: ${story.page_story}.json`);
});
