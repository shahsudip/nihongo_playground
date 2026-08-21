import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete Topic 4 (ファッション - Fashion, No. 247 to 338): 22 stories transcribed from pages 52-66
const topic4Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 4 ファッション",
    page_story: "52_1",
    japanese_text: `A：この<ruby>選手<rt>せんしゅ</rt></ruby>、確か<u>モデル</u>の<ruby>女性<rt>じょせい</rt></ruby>と<ruby>結婚<rt>けっこん</rt></ruby>したんだよね。
B：ああ、「<ruby>笑<rt>わら</rt></ruby>わない<ruby>男<rt>おとこ</rt></ruby>」って呼ばれてる<ruby>人<rt>ひと</rt></ruby>？
A：そう。でも<ruby>本当<rt>ほんとう</rt></ruby>はすごく<ruby>優<rt>やさ</rt></ruby>しくて、<ruby>私服<rt>しふく</rt></ruby>もすごくおしゃれで<u>センス</u>いいんだって。
B：なるほど。<u>ギャップ</u>がある<ruby>人<rt>ひと</rt></ruby>はモテるって言うもんね。`,
    english_translation: "A: This athlete married his model girlfriend, didn't he? B: Oh, the one they call \"the man who never smiles\"? A: Yes. But actually, he seems very kind and in his private life, he has a stylish fashion sense. B: I see. They say people who have contradictions are more attractive.",
    annotated_words: [
      { word_id: "n2_0247", word_number: 247, kanji: "モデル", furigana: "", meaning_en: "model" },
      { word_id: "n2_0248", word_number: 248, kanji: "センス", furigana: "", meaning_en: "sense" },
      { word_id: "n2_0249", word_number: 249, kanji: "ギャップ", furigana: "", meaning_en: "contradiction" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 4 ファッション",
    page_story: "53_1",
    japanese_text: `A：明日初デートなんだけど、この服どうかな？\nB：<u>全身</u>、<u>アウトドア</u><u>ブランド</u>で揃えたのね。\nA：うん。<u>ダサい</u>かな？\nB：うーん。流行を<u>取り入れよう</u>としてるのはいいと思うんだけど、<u>だぶだぶな</u>ズボンはカジュアルすぎない？ スニーカーもその色はちょっと…。\nA：そっか。この靴、色違いで２<u>足</u>持ってるんだけど、黒い方ならいいかな？`,
    english_translation: "A: I'm going on a first date tomorrow. What do you think about these clothes? B: The whole outfit is from outdoor brands, isn't it? A: Yes. Does it look unstylish? B: Hmmm. It's good that you're trying to incorporate the latest trends, but aren't the baggy pants a bit casual? I don't like the color of the sneakers either... A: Okay. I have two pairs of these shoes in different colors. Maybe the black ones would look better?",
    annotated_words: [
      { word_id: "n2_0250", word_number: 250, kanji: "全身", furigana: "ぜんしん", meaning_en: "whole body" },
      { word_id: "n2_0251", word_number: 251, kanji: "アウトドア", furigana: "", meaning_en: "outdoor" },
      { word_id: "n2_0252", word_number: 252, kanji: "ブランド", furigana: "", meaning_en: "brand, label" },
      { word_id: "n2_0253", word_number: 253, kanji: "ダサい", furigana: "", meaning_en: "unstylish, uncool" },
      { word_id: "n2_0254", word_number: 254, kanji: "取り入れる", furigana: "とりいれる", meaning_en: "incorporate" },
      { word_id: "n2_0255", word_number: 255, kanji: "だぶだぶな", furigana: "", meaning_en: "loose, baggy" },
      { word_id: "n2_0256", word_number: 256, kanji: "～足", furigana: "そく", meaning_en: "~ pairs" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 4 ファッション",
    page_story: "54_1",
    japanese_text: `A：この<u>ポーズ</u>は、背伸びする猫を<u>表して</u>います。\nB：あ、これは簡単ですね。\nA：そうですね。でも、<u>ただ</u>ポーズをまねするんじゃなくて、呼吸を意識するのが大切ですよ。`,
    english_translation: "A: This pose represents a cat stretching. B: Oh, this one is easy. A: Yes, it is. But it's important to stay aware of your breathing, not just imitate the pose.",
    annotated_words: [
      { word_id: "n2_0257", word_number: 257, kanji: "ポーズ", furigana: "", meaning_en: "pose" },
      { word_id: "n2_0258", word_number: 258, kanji: "表す", furigana: "あらわす", meaning_en: "express, represent" },
      { word_id: "n2_0259", word_number: 259, kanji: "ただ", furigana: "", meaning_en: "just, merely" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 4 ファッション",
    page_story: "54_2",
    japanese_text: `A：ねえ、この写真見て。今若い人の間でこんなの<u>はやってる</u>んだって。買ってみようかな。\nB：いや…<u>おまえ</u>、いくつだよ。\nA：ほら、最近のお母さんってみんな<u>若々しい</u>じゃない？\nB：うーん、無理にそんな<u>格好</u>すると、<u>逆に</u>目立つと思うよ。`,
    english_translation: "A: Hey, look at this photo. I heard this kind of thing is popular among young people these days. Maybe I should buy one. B: No way... How old are you? A: Hey, all the mothers these days look young, don't they? B: Well, if you dress to look like that, I think on the contrary, you'll actually stand out.",
    annotated_words: [
      { word_id: "n2_0260", word_number: 260, kanji: "おまえ", furigana: "", meaning_en: "you (familiar use)" },
      { word_id: "n2_0261", word_number: 261, kanji: "若々しい", furigana: "わかわかしい", meaning_en: "young-looking" },
      { word_id: "n2_0262", word_number: 262, kanji: "格好", furigana: "かっこう", meaning_en: "appearance, look" },
      { word_id: "n2_0263", word_number: 263, kanji: "逆に", furigana: "ぎゃくに", meaning_en: "conversely, on the contrary" },
      { word_id: "n2_0264", word_number: 264, kanji: "はやる", furigana: "", meaning_en: "be popular, be in fashion" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 4 ファッション",
    page_story: "55_1",
    japanese_text: `A：見て。<u>たんす</u>を整理したら、いらない服がこんなに出てきた。\nB：駅前のデパートの<u>婦人</u>服売り場に、<u>衣料</u>品を回収する箱があったから持っていったら？ アフリカに送るんだって。\nA：うーん。でも最近アフリカでは、海外から届く服が余ってごみになることもあるみたいで、<u>かえって</u>問題になってるみたいだよ。`,
    english_translation: "A: Hey, look. I went through my closet and found so many clothes I don't need. B: There's a clothing collection box in the women's clothing section at the department store by the station. Why don't you take them there? They're going to send them to Africa. A: Hmmm. But recently, surplus clothing sent to Africa from overseas has been ending up as trash, and on the contrary, it actually seems to be causing problems.",
    annotated_words: [
      { word_id: "n2_0265", word_number: 265, kanji: "たんす", furigana: "", meaning_en: "chest of drawers, closet" },
      { word_id: "n2_0266", word_number: 266, kanji: "婦人", furigana: "ふじん", meaning_en: "woman, lady" },
      { word_id: "n2_0267", word_number: 267, kanji: "衣料", furigana: "いりょう", meaning_en: "clothing" },
      { word_id: "n2_0268", word_number: 268, kanji: "かえって", furigana: "", meaning_en: "conversely, on the contrary" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 4 ファッション",
    page_story: "56_1",
    japanese_text: `A：ねえ、「ルッキズム」ってどういう意味？\nB：Looks と ism を合わせた言葉で、人を<u>見た目</u>で判断する<u>主義</u>のことだよ。最近よく批判されてるね。\nA：なるほど。昔から<u>美人</u>は得をするって言うもんね。それってなんか<u>ずるい</u>もんね。`,
    english_translation: "A: Hey, what does \"lookism\" mean? B: It's a combination of the words \"looks\" and \"ism,\" and refers to the principle of judging people by their looks. It's widely criticized these days. A: Oh, I see. People have always said that beautiful people get a better deal. It's a bit unfair.",
    annotated_words: [
      { word_id: "n2_0269", word_number: 269, kanji: "主義", furigana: "しゅぎ", meaning_en: "principle, \"-ism\"" },
      { word_id: "n2_0270", word_number: 270, kanji: "見た目", furigana: "みため", meaning_en: "appearance, looks" },
      { word_id: "n2_0271", word_number: 271, kanji: "美人", furigana: "びじん", meaning_en: "beautiful people" },
      { word_id: "n2_0272", word_number: 272, kanji: "ずるい", furigana: "", meaning_en: "unfair, sneaky" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 4 ファッション",
    page_story: "56_2",
    japanese_text: `A：妊婦さん<u>向け</u>の服や<u>下着</u>って、なぜか<u>綿</u>とか<u>シルク</u>が多いよね。\nB：ああ、妊娠中は肌が敏感になる人が多いから、肌に優しい生地が好まれるんだと思うよ。`,
    english_translation: "A: For some reason, clothes and underwear made for pregnant women are often cotton or silk, aren't they? B: Oh, I think it's because their skin gets more sensitive during pregnancy, so they prefer gentler fabrics.",
    annotated_words: [
      { word_id: "n2_0273", word_number: 273, kanji: "～向け", furigana: "むけ", meaning_en: "made for ~, aimed at ~" },
      { word_id: "n2_0274", word_number: 274, kanji: "綿", furigana: "めん", meaning_en: "cotton" },
      { word_id: "n2_0275", word_number: 275, kanji: "下着", furigana: "したぎ", meaning_en: "underwear" },
      { word_id: "n2_0276", word_number: 276, kanji: "シルク", furigana: "", meaning_en: "silk" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 4 ファッション",
    page_story: "57_1",
    japanese_text: `妊婦さん向けの服や下着って、なぜか綿とかシルクが多いよね。\nああ、妊娠中は肌が<u>敏感な</u>人が多いから、肌に優しい<u>生地</u>が好まれるんだと思うよ。`,
    english_translation: "For some reason, clothes and underwear made for pregnant women are often cotton or silk, aren't they? Oh, I think it's because their skin gets more sensitive during pregnancy, so they prefer gentler fabrics.",
    annotated_words: [
      { word_id: "n2_0277", word_number: 277, kanji: "敏感な", furigana: "びんかんな", meaning_en: "sensitive" },
      { word_id: "n2_0278", word_number: 278, kanji: "生地", furigana: "きじ", meaning_en: "fabric" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 4 ファッション",
    page_story: "57_2",
    japanese_text: `A：あれ？ ばっさり切ったね。<u>イメチェン</u>？\nB：ははは。実は、ヘアドネーションしたんだ。\nA：病気で髪が<u>抜け</u>てしまった子どもたちのための、ウィッグになるんだっけ。\nB：そう。できるだけきれいな髪でいるために、<u>巻い</u>たり、<u>染め</u>たりするのも我慢してたんだ。`,
    english_translation: "A: Whoa! You've had your hair cut so short. Changing your image? B: Ha ha ha. Actually, I donated my hair. A: You mean, to make wigs for children who have lost their hair due to illness? B: Yes. I had to stop myself curling or dyeing my hair to keep it as nice as possible.",
    annotated_words: [
      { word_id: "n2_0279", word_number: 279, kanji: "イメチェン／イメージチェンジ[する]", furigana: "", meaning_en: "change of image, change one's image" },
      { word_id: "n2_0280", word_number: 280, kanji: "抜ける", furigana: "ぬける", meaning_en: "fall out, come out" },
      { word_id: "n2_0281", word_number: 281, kanji: "巻く", furigana: "まく", meaning_en: "curl, roll" },
      { word_id: "n2_0282", word_number: 282, kanji: "染める", furigana: "そめる", meaning_en: "dye (something)" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 4 ファッション",
    page_story: "58_1",
    japanese_text: `A：この前京都で買った<u>くし</u>、どうだった？\nB：あ、あれね！ 髪を<u>とかす</u>だけで本当に<u>さらさらに</u>なるの。一緒に買ったオイルをつけると、自然な<u>艶</u>が出ていい感じだよ。`,
    english_translation: "A: What do you think of the comb you bought in Kyoto the other day? B: Oh, that! Just brushing my hair with it made it feel really smooth. And when I used the oil I bought with it, it gave my hair a nice natural shine.",
    annotated_words: [
      { word_id: "n2_0284", word_number: 284, kanji: "くし", furigana: "", meaning_en: "comb" },
      { word_id: "n2_0285", word_number: 285, kanji: "さらさらな", furigana: "", meaning_en: "smooth" },
      { word_id: "n2_0286", word_number: 286, kanji: "艶", furigana: "つや", meaning_en: "gloss, shine" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 4 ファッション",
    page_story: "58_2",
    japanese_text: `A：これ<u>試着して</u>みない？ 似合うと思う。\nB：<u>サイズ</u>いくつ？\nA：えっと、７<u>号</u>だね。\nB：無理無理！ 私いつも11 号だよ。<u>ウエスト</u>が入らないよ。`,
    english_translation: "A: Wanna try this on? I think it'd suit you. B: What size is it? A: Let's see, it's a size 7. B: No way! I'm usually a size 11. I'll never fit into the waist.",
    annotated_words: [
      { word_id: "n2_0287", word_number: 287, kanji: "試着[する]", furigana: "しちゃく", meaning_en: "fitting, try on (clothing)" },
      { word_id: "n2_0288", word_number: 288, kanji: "サイズ", furigana: "", meaning_en: "size" },
      { word_id: "n2_0289", word_number: 289, kanji: "～号", furigana: "ごう", meaning_en: "size ~" },
      { word_id: "n2_0290", word_number: 290, kanji: "ウエスト", furigana: "", meaning_en: "waist" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 4 ファッション",
    page_story: "59_1",
    japanese_text: `A：いかがですか。\nB：この<u>縞</u>のデザインが気に入ってるんですが、<u>客観的に</u>見て<u>派手</u>すぎませんか。\nA：お似合いですよ。ジャケットと<u>組み合わせれ</u>ばオフィスにも着ていけますし。\nB：そうですか。あと、<u>丈</u>がちょっとだけ長いかな。\nA：丈の長さは、この<u>ベルト</u>で<u>調節できます</u>よ。`,
    english_translation: "A: How do you like it? B: I like the stripe design, but objectively speaking, it's a bit flashy, isn't it? A: It looks good on you. And combined with a jacket, you could even wear it to the office. B: Do you think so? The length might be slightly too long. A: You can adjust the length with this belt.",
    annotated_words: [
      { word_id: "n2_0291", word_number: 291, kanji: "縞", furigana: "しま", meaning_en: "stripe" },
      { word_id: "n2_0292", word_number: 292, kanji: "客観的な", furigana: "きゃっかんてきな", meaning_en: "objective" },
      { word_id: "n2_0293", word_number: 293, kanji: "派手な", furigana: "はでな", meaning_en: "flashy, gaudy" },
      { word_id: "n2_0294", word_number: 294, kanji: "組み合わせる", furigana: "くみあわせる", meaning_en: "combine" },
      { word_id: "n2_0295", word_number: 295, kanji: "ベルト", furigana: "", meaning_en: "belt" },
      { word_id: "n2_0296", word_number: 296, kanji: "丈", furigana: "たけ", meaning_en: "length" },
      { word_id: "n2_0297", word_number: 297, kanji: "調節[する]", furigana: "ちょうせつ", meaning_en: "adjustment, adjust" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 4 ファッション",
    page_story: "60_1",
    japanese_text: `A：あれ？ 眼鏡変えた？\nB：ああ、これサングラスなの。今まで<u>単なる</u>眼鏡しか持ってなかったんだけど、外に出ると<u>まぶしくて</u>。\nA：へえ。<u>透明な</u><u>レンズ</u>でも効果あるの？\nB：あ、このレンズ、よく見ると薄い茶色なんだよ。`,
    english_translation: "A: Hey, did you get new glasses? B: Oh, these are sunglasses. I used to have just simple normal glasses, but when I went outside it was always too dazzling. A: Really? Do the transparent lenses work? B: Well, if you look closely, these lenses are pale brown.",
    annotated_words: [
      { word_id: "n2_0298", word_number: 298, kanji: "単なる", furigana: "たんなる", meaning_en: "mere, simple" },
      { word_id: "n2_0299", word_number: 299, kanji: "まぶしい", furigana: "", meaning_en: "too bright, dazzling" },
      { word_id: "n2_0300", word_number: 300, kanji: "透明な", furigana: "とうめいな", meaning_en: "transparent" },
      { word_id: "n2_0301", word_number: 301, kanji: "レンズ", furigana: "", meaning_en: "lens" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 4 ファッション",
    page_story: "60_2",
    japanese_text: `A：腕の傷、どうしたの？\nB：ああ、これ…。私、腕の毛が<u>割と</u>濃いから、毎日<u>かみそり</u>で剃ってるんだけど、昨日切っちゃって…。\nA：大変だね。\nB：脱毛するっていう手もあるんだけど、<u>美容</u>にお金かけたくないんだよね。`,
    english_translation: "A: Hey, how did you cut your arm? B: Oh, that... I have rather thick hair on my arms, so I shave them every day with a razor, but yesterday I cut myself... A: That's awful. B: There are other ways to remove hair, but I don't want to spend a lot of money on beauty treatments.",
    annotated_words: [
      { word_id: "n2_0302", word_number: 302, kanji: "割と", furigana: "わりと", meaning_en: "rather, comparatively" },
      { word_id: "n2_0303", word_number: 303, kanji: "かみそり", furigana: "", meaning_en: "razor" },
      { word_id: "n2_0304", word_number: 304, kanji: "美容", furigana: "びよう", meaning_en: "beauty" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 4 ファッション",
    page_story: "61_1",
    japanese_text: `A：最近ＳＮＳでヒョウ<u>柄</u>の服をよく見るんだけど、私は普段<u>無地</u>の服しか着ないから、ちょっと<u>抵抗</u>あるんだよね。\nB：そう？ <u>キャップ</u>とかバッグとか、小物をちょっと<u>付け加える</u>だけでいいアクセントになるんじゃない？ この写真みたいに。\nA：なるほど。よく見るといろんな<u>パターン</u>があるんだね。`,
    english_translation: "A: I've been seeing a lot of clothes in leopard-print patterns on social media lately, but I usually only wear plain, solid colors, so I'm a bit resistant to it. B: Really? I think just adding a cap, bag, or some other small accessory creates a nice accent. You know, like in this photo. A: Oh, right. If you look closely, you can see there are many different patterns.",
    annotated_words: [
      { word_id: "n2_0305", word_number: 305, kanji: "柄", furigana: "がら", meaning_en: "pattern" },
      { word_id: "n2_0306", word_number: 306, kanji: "無地", furigana: "むじ", meaning_en: "plain, solid (colors)" },
      { word_id: "n2_0307", word_number: 307, kanji: "抵抗[する]", furigana: "ていこう", meaning_en: "resistance, resist" },
      { word_id: "n2_0308", word_number: 308, kanji: "キャップ", furigana: "", meaning_en: "cap" },
      { word_id: "n2_0309", word_number: 309, kanji: "付け加える", furigana: "つけくわえる", meaning_en: "add, supplement" },
      { word_id: "n2_0310", word_number: 310, kanji: "パターン", furigana: "", meaning_en: "pattern" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 4 ファッション",
    page_story: "62_1",
    japanese_text: `大統領<u>夫人</u>は、<u>知的な</u>イメージが強く、<u>幅広い</u>世代から人気がある。ここ数年は、<u>上品な</u><u>ヘアスタイル</u>と<u>独特な</u>ファッションが世界各国のデザイナーから注目されている。`,
    english_translation: "The First Lady has a strongly intellectual image and she has found popularity among a wide range of ages. In recent years, her elegant hairstyle and unique fashion sense have attracted the attention of designers from around the world.",
    annotated_words: [
      { word_id: "n2_0311", word_number: 311, kanji: "夫人", furigana: "ふじん", meaning_en: "wife" },
      { word_id: "n2_0312", word_number: 312, kanji: "知的な", furigana: "ちてきな", meaning_en: "intellectual" },
      { word_id: "n2_0313", word_number: 313, kanji: "幅広い", furigana: "はばひろい", meaning_en: "extended, wide-ranging" },
      { word_id: "n2_0314", word_number: 314, kanji: "上品な", furigana: "じょうひんな", meaning_en: "elegant, stylish" },
      { word_id: "n2_0315", word_number: 315, kanji: "ヘアスタイル", furigana: "", meaning_en: "hairstyle" },
      { word_id: "n2_0316", word_number: 316, kanji: "独特な", furigana: "どくとくな", meaning_en: "unique" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 4 ファッション",
    page_story: "62_2",
    japanese_text: `A：新しい会社で、ひげはだめだって注意されたよ。日本の<u>ビジネス</u><u>マナー</u>って難しいね。\nB：そっか。<u>欧米</u>ではひげを<u>生やして</u>てもいいもんね。\nA：ひげは個性の一つだからね。`,
    english_translation: "A: I was warned to avoid growing a beard at my new company. Business etiquette in Japan can be tricky. B: Is that right? In Europe and the USA, it's fine to grow a beard, isn't it? A: A beard is a way to express your personality.",
    annotated_words: [
      { word_id: "n2_0317", word_number: 317, kanji: "ビジネス", furigana: "", meaning_en: "business" },
      { word_id: "n2_0318", word_number: 318, kanji: "マナー", furigana: "", meaning_en: "manners, etiquette" },
      { word_id: "n2_0319", word_number: 319, kanji: "欧米", furigana: "おうべい", meaning_en: "Europe and the USA" },
      { word_id: "n2_0320", word_number: 320, kanji: "生やす", furigana: "はやす", meaning_en: "grow (hair, beard, etc.)" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 4 ファッション",
    page_story: "63_1",
    japanese_text: `先日行われたアンケートでは、日本の大学生の<u>大半</u>が、３カ月に１度以上ファストファッションを購入していると<u>回答した</u>。しかし、近年ではファストファッションが客のニーズを満たすために<u>衣服</u>を過剰に生産しているという批判の声も<u>多数</u>聞かれる。`,
    english_translation: "In a recent survey, the majority of Japanese university students answered that they purchase fast fashion at least every three months. However, in recent years, many have apparently criticized fast fashion for overproducing clothing to satisfy customer demand.",
    annotated_words: [
      { word_id: "n2_0321", word_number: 321, kanji: "大半", furigana: "たいはん", meaning_en: "majority" },
      { word_id: "n2_0322", word_number: 322, kanji: "回答[する]", furigana: "かいとう", meaning_en: "response, answer" },
      { word_id: "n2_0323", word_number: 323, kanji: "衣服", furigana: "いふく", meaning_en: "clothing" },
      { word_id: "n2_0324", word_number: 324, kanji: "多数", furigana: "たすう", meaning_en: "many, plenty" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 4 ファッション",
    page_story: "64_1",
    japanese_text: `A：今日の服、<u>和服</u><u>っぽくて</u>かわいいね。\nB：ありがとう。おばあちゃんの着物を、<u>普段</u>着られるようにリメイクしたんだ。\nA：へえ、さすが。\nB：<u>絹</u>だから、ちょっと<u>手入れ</u>が大変だけどね。`,
    english_translation: "A: Your clothes look so cute today, like traditional Japanese clothes. B: Thanks. I remade my grandmother's kimono so I can wear it normally. A: Wow, that's great. B: It's silk, so it's a little difficult to look after.",
    annotated_words: [
      { word_id: "n2_0326", word_number: 326, kanji: "和服", furigana: "わふく", meaning_en: "traditional Japanese clothes" },
      { word_id: "n2_0327", word_number: 327, kanji: "普段", furigana: "ふだん", meaning_en: "normally, usually" },
      { word_id: "n2_0328", word_number: 328, kanji: "絹", furigana: "きぬ", meaning_en: "silk" },
      { word_id: "n2_0329", word_number: 329, kanji: "手入れ[する]", furigana: "ていれ", meaning_en: "care, look after" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 4 ファッション",
    page_story: "64_2",
    japanese_text: `A：わ、玄関が靴<u>だらけ</u>！\nB：どれも長時間履いてると痛くって、どんどん新しいの買っちゃうんだよね。\nA：Ｂさんの足は人差し指が一番長いから、先が<u>とがって</u>るパンプスが足に合うと思うよ。靴が合わないと<u>姿勢</u>が悪くなるから気をつけて。`,
    english_translation: "A: Hey, the hallway is full of shoes! B: They all hurt when I wear them for too long, so I keep buying new ones. A: Since your second toe is the longest on your foot, I think pumps with a pointed toe will suit your feet best. If your shoes don't fit, your posture will get worse, so be careful.",
    annotated_words: [
      { word_id: "n2_0330", word_number: 330, kanji: "～だらけ", furigana: "", meaning_en: "all over ~, full of ~, covered with ~" },
      { word_id: "n2_0331", word_number: 331, kanji: "とがる", furigana: "", meaning_en: "be pointed" },
      { word_id: "n2_0332", word_number: 332, kanji: "姿勢", furigana: "しせい", meaning_en: "posture" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 4 ファッション",
    page_story: "65_1",
    japanese_text: `４月は初めての人と会う機会が多いので、服装には<u>気を遣う</u>。明るい色の服を着たり、<u>襟</u>付きのシャツを着たりして、<u>だらしな</u>い印象を与えないように気をつけている。`,
    english_translation: "April offers many opportunities to meet people for the first time, so we tend to be careful about how we dress. I take care to avoid giving an untidy impression by wearing brightly colored clothes and collared shirts.",
    annotated_words: [
      { word_id: "n2_0333", word_number: 333, kanji: "気を遣う", furigana: "きをつかう", meaning_en: "take care, be careful" },
      { word_id: "n2_0334", word_number: 334, kanji: "襟", furigana: "えり", meaning_en: "collar" },
      { word_id: "n2_0335", word_number: 335, kanji: "だらしない", furigana: "", meaning_en: "sloppy, untidy" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 4 ファッション",
    page_story: "66_1",
    japanese_text: `A：お母さん、この制服のズボン、お尻のあたりがパンパンで<u>破け</u>そう。\nB：あ、本当だね。入学したときは<u>ぶかぶかだった</u>のに…。卒業まであと半年か。買い替えるか<u>微妙な</u>ところだね。`,
    english_translation: "A: Mom, my school uniform pants are so tight around my waist, they're about to rip. B: Oh, you're right. And they were so baggy when you first started school... Now there's only six months until you graduate. I'm unsure whether to buy you new ones or not.",
    annotated_words: [
      { word_id: "n2_0336", word_number: 336, kanji: "破く", furigana: "やぶく", meaning_en: "rip, tear" },
      { word_id: "n2_0337", word_number: 337, kanji: "ぶかぶかな", furigana: "", meaning_en: "baggy, too big" },
      { word_id: "n2_0338", word_number: 338, kanji: "微妙な", furigana: "びみょうな", meaning_en: "unsure, delicate, questionable" }
    ]
  }
];

topic4Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved Topic 4 story ${story.story_number}: ${story.page_story}.json`);
});

console.log(`\nDone! ${topic4Stories.length} stories saved for Topic 4 ファッション (words 247-338).`);
