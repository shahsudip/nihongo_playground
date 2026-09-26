import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const stories = [
  {
    id: "42_0",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='冷やす'><ruby>冷<rt>ひ</rt></ruby>やして</span>おいたビールを<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>から<span class='annotated-word' data-word='取り出す'><ruby>取<rt>と</rt></ruby>り<ruby>出<rt>だ</rt></ruby>し</span>、<ruby>飲<rt>の</rt></ruby>みながらゆっくり<ruby>食事<rt>しょくじ</rt></ruby>をする。これが<ruby>私<rt>わたし</rt></ruby>の<span class='annotated-word' data-word='休日'><ruby>休日<rt>きゅうじつ</rt></ruby></span>の<span class='annotated-word' data-word='喜び'><ruby>喜<rt>よろこ</rt></ruby>び</span>だ。",
    english_translation: "Taking out a chilled beer from the refrigerator and slowly eating a meal while drinking. This is my holiday joy.",
    annotated_words: [
      { meaning_en: "chill, cool", furigana: "ひやす", kanji: "冷やす" },
      { meaning_en: "take out", furigana: "とりだす", kanji: "取り出す" },
      { meaning_en: "holiday", furigana: "きゅうじつ", kanji: "休日" },
      { meaning_en: "joy", furigana: "よろこび", kanji: "喜び" }
    ]
  },
  {
    id: "42_1",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='コインランドリー'>コインランドリー</span>は、<ruby>家<rt>いえ</rt></ruby>の<ruby>洗濯機<rt>せんたくき</rt></ruby>には<ruby>入<rt>はい</rt></ruby>らないような<ruby>大<rt>おお</rt></ruby>きな<span class='annotated-word' data-word='カーペット'>カーペット</span>などを<ruby>洗<rt>あら</rt></ruby>ったり<span class='annotated-word' data-word='乾燥'><ruby>乾燥<rt>かんそう</rt></ruby></span>させたりできるので、<ruby>大変<rt>たいへん</rt></ruby><ruby>便利<rt>べんり</rt></ruby>だ。<br><span class='annotated-word' data-word='欠点'><ruby>欠点<rt>けってん</rt></ruby></span>は、コインランドリーまで<ruby>大<rt>おお</rt></ruby>きなカーペットを<ruby>持<rt>も</rt></ruby>っていくのが<ruby>大変<rt>たいへん</rt></ruby>だということだ。",
    english_translation: "Coin laundromats are very convenient because things like large carpets that can't fit in household washing machines can be washed or dried there. The disadvantage is that it's difficult to bring a large carpet all the way to the coin laundromat.",
    annotated_words: [
      { meaning_en: "coin laundromat", furigana: "", kanji: "コインランドリー" },
      { meaning_en: "carpet", furigana: "", kanji: "カーペット" },
      { meaning_en: "drying, dry", furigana: "かんそう", kanji: "乾燥" },
      { meaning_en: "disadvantage", furigana: "けってん", kanji: "欠点" }
    ]
  },
  {
    id: "43_0",
    title: "Topic 2",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>の<span class='annotated-word' data-word='得意な'><ruby>得意<rt>とくい</rt></ruby>な</span><ruby>料理<rt>りょうり</rt></ruby>はステーキだ。<span class='annotated-word' data-word='少々'><ruby>少々<rt>しょうしょう</rt></ruby></span><span class='annotated-word' data-word='適当な'><ruby>適当<rt>てきとう</rt></ruby>な</span><ruby>味付<rt>あじつ</rt></ruby>けでも、<ruby>硬<rt>かた</rt></ruby>くならないように<ruby>焼<rt>や</rt></ruby>けば<span class='annotated-word' data-word='オーケー'>オーケー</span>だ。",
    english_translation: "The dish I'm best at cooking is steak. Even with somewhat careless seasoning, it'll be okay so long as it's cooked so as not to be too tough.",
    annotated_words: [
      { meaning_en: "good at", furigana: "とくいな", kanji: "得意な" },
      { meaning_en: "a little", furigana: "しょうしょう", kanji: "少々" },
      { meaning_en: "careless, suitable", furigana: "てきとうな", kanji: "適当な" },
      { meaning_en: "okay/OK", furigana: "", kanji: "オーケー" }
    ]
  },
  {
    id: "43_1",
    title: "Topic 2",
    japanese_text: "<ruby>夫<rt>おっと</rt></ruby>の<ruby>趣味<rt>しゅみ</rt></ruby>は<ruby>料理<rt>りょうり</rt></ruby>だ。「<ruby>料理<rt>りょうり</rt></ruby>は<span class='annotated-word' data-word='化学'><ruby>化学<rt>かがく</rt></ruby></span>だ」と<ruby>言<rt>い</rt></ruby>っていて、<ruby>調味料<rt>ちょうみりょう</rt></ruby>を<span class='annotated-word' data-word='加える'><ruby>加<rt>くわ</rt></ruby>える</span><span class='annotated-word' data-word='順番'><ruby>順番<rt>じゅんばん</rt></ruby></span>も<ruby>気<rt>き</rt></ruby>にしている。<span class='annotated-word' data-word='包丁'><ruby>包丁<rt>ほうちょう</rt></ruby></span>の<ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>もとてもうまいし、<ruby>料理家<rt>りょうりか</rt></ruby>の<span class='annotated-word' data-word='記事'><ruby>記事<rt>きじ</rt></ruby></span>もいつも<ruby>熱心<rt>ねっしん</rt></ruby>に<ruby>読<rt>よ</rt></ruby>んでいる。",
    english_translation: "My husband's hobby is cooking. He says, \"Cooking is chemistry,\" and even pays attention to the order in which seasonings are added. He's really good at using kitchen knives, and he always reads articles about cooking enthusiastically.",
    annotated_words: [
      { meaning_en: "chemistry", furigana: "かがく", kanji: "化学" },
      { meaning_en: "add", furigana: "くわえる", kanji: "加える" },
      { meaning_en: "join", furigana: "くわわる", kanji: "加わる" },
      { meaning_en: "order", furigana: "じゅんばん", kanji: "順番" },
      { meaning_en: "kitchen knife", furigana: "ほうちょう", kanji: "包丁" },
      { meaning_en: "article", furigana: "きじ", kanji: "記事" }
    ]
  },
  {
    id: "44_0",
    title: "Topic 2",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>はワイシャツに<span class='annotated-word' data-word='アイロン'>アイロン</span>をかけるのが<ruby>苦手<rt>にがて</rt></ruby>です。<span class='annotated-word' data-word='どうしても'>どうしても</span>うまくできないので、うちでは<ruby>夫<rt>おっと</rt></ruby>がアイロン<span class='annotated-word' data-word='担当'><ruby>担当<rt>たんとう</rt></ruby></span>です。<ruby>夫<rt>おっと</rt></ruby>に<span class='annotated-word' data-word='不満な'><ruby>不満<rt>ふまん</rt></ruby>な</span><ruby>様子<rt>ようす</rt></ruby>は<span class='annotated-word' data-word='全く'><ruby>全<rt>まった</rt></ruby>く</span>なく、<ruby>楽<rt>たの</rt></ruby>しそうにやっています。<ruby>今日<rt>きょう</rt></ruby>も<span class='annotated-word' data-word='ハンガー'>ハンガー</span>にきれいになったワイシャツがかかっていて、うれしいです。",
    english_translation: "I'm no good at ironing dress shirts. Because I just can't do it well no matter what, my husband is in charge of ironing. He doesn't seem to be dissatisfied at all, and looks like he's having fun doing it. I'm glad to see another cleaned dress shirt on the hanger today too.",
    annotated_words: [
      { meaning_en: "iron", furigana: "", kanji: "アイロン" },
      { meaning_en: "no matter what", furigana: "", kanji: "どうしても" },
      { meaning_en: "being in charge of, be in charge of", furigana: "たんとう", kanji: "担当" },
      { meaning_en: "person in charge", furigana: "たんとうしゃ", kanji: "担当者" },
      { meaning_en: "dissatisfied", furigana: "ふまんな", kanji: "不満な" },
      { meaning_en: "(not) at all, completely", furigana: "まったく", kanji: "全く" },
      { meaning_en: "(clothes) hanger", furigana: "", kanji: "ハンガー" }
    ]
  },
  {
    id: "44_1",
    title: "Topic 2",
    japanese_text: "<ruby>家<rt>いえ</rt></ruby>の<span class='annotated-word' data-word='光熱費'><ruby>光熱費<rt>こうねつひ</rt></ruby></span>を<ruby>下<rt>さ</rt></ruby>げるために、<ruby>使<rt>つか</rt></ruby>わない<ruby>機器<rt>きき</rt></ruby>の<span class='annotated-word' data-word='コード'>コード</span>をコンセントから<ruby>抜<rt>ぬ</rt></ruby>くようにしている。しかし、この<ruby>間<rt>あいだ</rt></ruby><span class='annotated-word' data-word='歯磨き'><ruby>歯磨<rt>はみが</rt></ruby>き</span>をしながら<ruby>歩<rt>ある</rt></ruby>いていたら、<ruby>抜<rt>ぬ</rt></ruby>いたコードに<ruby>引<rt>ひ</rt></ruby>っかかってしまって<ruby>危<rt>あぶ</rt></ruby>なかった。コードを<ruby>片付<rt>かたづ</rt></ruby>けるか、<ruby>歯磨<rt>はみが</rt></ruby>きをしながら<ruby>歩<rt>ある</rt></ruby>かないようにするか、どちらがいいだろうか。",
    english_translation: "In order to lower utility costs at home, I've decided to pull the cords of devices I'm not using out of the power outlets. However, when I was walking around while brushing my teeth, I got caught in an unplugged cord, which was dangerous. I wonder which I should do, clean up the cords or stop walking around while brushing my teeth.",
    annotated_words: [
      { meaning_en: "utility costs", furigana: "こうねつひ", kanji: "光熱費" },
      { meaning_en: "cord", furigana: "", kanji: "コード" },
      { meaning_en: "tooth brushing, brushing one's teeth", furigana: "はみがき", kanji: "歯磨き" },
      { meaning_en: "toothbrush", furigana: "はブラシ", kanji: "歯ブラシ" },
      { meaning_en: "tooth paste", furigana: "はみがきこ", kanji: "歯磨き粉" }
    ]
  },
  {
    id: "45_0",
    title: "Topic 2",
    japanese_text: "ここ<span class='annotated-word' data-word='数日'><ruby>数日<rt>すうじつ</rt></ruby></span>、<ruby>年<rt>とし</rt></ruby>をとった<ruby>母<rt>はは</rt></ruby>に<span class='annotated-word' data-word='付き合って'><ruby>付<rt>つ</rt></ruby>き<ruby>合<rt>あ</rt></ruby>って</span>、<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>公園<rt>こうえん</rt></ruby>を<ruby>散歩<rt>さんぽ</rt></ruby>している。<ruby>毎日<rt>まいにち</rt></ruby><ruby>歩<rt>ある</rt></ruby>く<ruby>母<rt>はは</rt></ruby>を<span class='annotated-word' data-word='偉い'><ruby>偉<rt>えら</rt></ruby>い</span>なあと<ruby>思<rt>おも</rt></ruby>っていたが、<ruby>最近<rt>さいきん</rt></ruby>は、<ruby>私<rt>わたし</rt></ruby>も<span class='annotated-word' data-word='自然に'><ruby>自然<rt>しぜん</rt></ruby>に</span><ruby>散歩<rt>さんぽ</rt></ruby>に<ruby>行<rt>い</rt></ruby>きたいと<ruby>思<rt>おも</rt></ruby>うようになってきた。",
    english_translation: "Over the past few days, I've been accompanying my aging mother and walking in the park with her. I was thinking about how great it is that my mother walks every day, but recently, I too have started naturally wanting to go for walks.",
    annotated_words: [
      { meaning_en: "several days", furigana: "すうじつ", kanji: "数日" },
      { meaning_en: "several years", furigana: "すうねん", kanji: "数年" },
      { meaning_en: "accompany", furigana: "つきあう", kanji: "付き合う" },
      { meaning_en: "great", furigana: "えらい", kanji: "偉い" },
      { meaning_en: "natural", furigana: "しぜんな", kanji: "自然な" }
    ]
  },
  {
    id: "46_0",
    title: "Topic 2",
    japanese_text: "A：<ruby>日本<rt>にほん</rt></ruby><span class='annotated-word' data-word='製'><ruby>製<rt>せい</rt></ruby></span>の<span class='annotated-word' data-word='炊飯器'><ruby>炊飯器<rt>すいはんき</rt></ruby></span>って<ruby>海外<rt>かいがい</rt></ruby>でも<ruby>人気<rt>にんき</rt></ruby>があるらしいね。<br>B：お<ruby>米<rt>こめ</rt></ruby>がおいしく<ruby>炊<rt>た</rt></ruby>けるからね。それに、<ruby>料理<rt>りょうり</rt></ruby>もできるんだよ。<ruby>材料<rt>ざいりょう</rt></ruby>を<ruby>入<rt>い</rt></ruby>れてボタンを<ruby>押<rt>お</rt></ruby>すだけで、<span class='annotated-word' data-word='自動'><ruby>自動<rt>じどう</rt></ruby></span>でできる。<br>A：へー、そうなんだ。<br>B：<ruby>忙<rt>いそが</rt></ruby>しい<span class='annotated-word' data-word='主婦'><ruby>主婦<rt>しゅふ</rt></ruby></span>には<ruby>助<rt>たす</rt></ruby>かるよね。<ruby>海外<rt>かいがい</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>何<rt>なに</rt></ruby>か<span class='annotated-word' data-word='贈る'><ruby>贈<rt>おく</rt></ruby>る</span>なら<ruby>炊飯器<rt>すいはんき</rt></ruby>だね！",
    english_translation: "A: Japanese rice cookers seems to be popular overseas.\nB: That's because you can cook delicious rice. Besides, you can cook with them too. You just put the ingredients and press the button and it does it automatically.\nA: Wow, really?\nB: It's a big help for busy housewives. If you want to give a gift to someone overseas, make it a rice cooker!",
    annotated_words: [
      { meaning_en: "made", furigana: "せい", kanji: "〜製" },
      { meaning_en: "rice cooker", furigana: "すいはんき", kanji: "炊飯器" },
      { meaning_en: "automatic", furigana: "じどう", kanji: "自動" },
      { meaning_en: "automatic", furigana: "じどうてきな", kanji: "自動的な" },
      { meaning_en: "housewife", furigana: "しゅふ", kanji: "主婦" },
      { meaning_en: "stay-at-home husband", furigana: "しゅふ", kanji: "主夫" },
      { meaning_en: "present, give a gift", furigana: "おくる", kanji: "贈る" },
      { meaning_en: "gift, present", furigana: "おくりもの", kanji: "贈り物" }
    ]
  },
  {
    id: "47_0",
    title: "Topic 2",
    japanese_text: "ワイシャツを<span class='annotated-word' data-word='インク'>インク</span>で<span class='annotated-word' data-word='汚して'><ruby>汚<rt>よご</rt></ruby>して</span>しまったので、<span class='annotated-word' data-word='慌てて'><ruby>慌<rt>あわ</rt></ruby>てて</span><span class='annotated-word' data-word='洗剤'><ruby>洗剤<rt>せんざい</rt></ruby></span>をつけて<ruby>洗<rt>あら</rt></ruby>った。",
    english_translation: "I got ink on my dress shirt, so I hurriedly rubbed detergent on it and washed it.",
    annotated_words: [
      { meaning_en: "ink", furigana: "", kanji: "インク" },
      { meaning_en: "stain, get dirty", furigana: "よごす", kanji: "汚す" },
      { meaning_en: "be hurried, panic", furigana: "あわてる", kanji: "慌てる" },
      { meaning_en: "detergent", furigana: "せんざい", kanji: "洗剤" }
    ]
  },
  {
    id: "47_1",
    title: "Topic 2",
    japanese_text: "A：<ruby>昨日<rt>きのう</rt></ruby>、<ruby>息子<rt>むすこ</rt></ruby>が<ruby>学校<rt>がっこう</rt></ruby>でけがをしてしまって、<ruby>先生<rt>せんせい</rt></ruby>が<ruby>家<rt>いえ</rt></ruby>まで<ruby>連<rt>つ</rt></ruby>れて<ruby>帰<rt>かえ</rt></ruby>ってきてくださったんです。だから、「ぜひ<span class='annotated-word' data-word='お上がりください'>お<ruby>上<rt>あ</rt></ruby>がりください</span>」って<ruby>言<rt>い</rt></ruby>ったんだけど「<span class='annotated-word' data-word='お構いなく'>お<ruby>構<rt>かま</rt></ruby>いなく</span>」って<ruby>遠慮<rt>えんりょ</rt></ruby>されてしまって。<br>B：<ruby>今<rt>いま</rt></ruby>は、<ruby>先生<rt>せんせい</rt></ruby>は<ruby>生徒<rt>せいと</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>にほとんど<ruby>入<rt>はい</rt></ruby>らないよね。それに<span class='annotated-word' data-word='賛成'><ruby>賛成<rt>さんせい</rt></ruby></span>する<ruby>人<rt>ひと</rt></ruby>も<ruby>反対<rt>はんたい</rt></ruby>する<ruby>人<rt>ひと</rt></ruby>もいるけどね。",
    english_translation: "A: Yesterday, my son was injured at school, and his teacher brought him back to our house. So I said, \"Please come inside,\" but the teacher refused, saying, \"Please don't worry about me.\"\nB: Nowadays, teachers rarely enter to students' homes. Some people agree with this, and some people don't.",
    annotated_words: [
      { meaning_en: "please come in", furigana: "おあがりください", kanji: "お上がりください" },
      { meaning_en: "please don't worry about me", furigana: "おかまいなく", kanji: "お構いなく" },
      { meaning_en: "agreement, agree", furigana: "さんせい", kanji: "賛成" }
    ]
  },
  {
    id: "48_0",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='おととい'>おととい</span><ruby>飲<rt>の</rt></ruby>んだワインの<span class='annotated-word' data-word='瓶'><ruby>瓶<rt>びん</rt></ruby></span>がとてもきれいだったので、<span class='annotated-word' data-word='内側'><ruby>内側<rt>うちがわ</rt></ruby></span>をきれいに<ruby>洗<rt>あら</rt></ruby>って、<ruby>花瓶<rt>かびん</rt></ruby>として<ruby>使<rt>つか</rt></ruby>うことにした。<ruby>下<rt>した</rt></ruby>にきれいなレースを<span class='annotated-word' data-word='敷く'><ruby>敷<rt>し</rt></ruby>く</span>と、とてもいい<ruby>雰囲気<rt>ふんいき</rt></ruby>になった。<ruby>我<rt>わ</rt></ruby>が<ruby>家<rt>や</rt></ruby>は<span class='annotated-word' data-word='年中'><ruby>年中<rt>ねんじゅう</rt></ruby></span><ruby>花<rt>はな</rt></ruby>を<ruby>生<rt>い</rt></ruby>けているため、<ruby>花瓶<rt>かびん</rt></ruby>がたくさん<ruby>必要<rt>ひつよう</rt></ruby>なのだ。",
    english_translation: "The bottle of the wine I drunk the day before yesterday was very beautiful, so I washed the inside clean and used it as a vase. I laid a beautiful lace cloth below it and it really improved the atmosphere. Because my house is full of flowers year-round, I need a lot of vases.",
    annotated_words: [
      { meaning_en: "day before yesterday", furigana: "", kanji: "おととい" },
      { meaning_en: "bottle", furigana: "びん", kanji: "瓶" },
      { meaning_en: "inside", furigana: "うちがわ", kanji: "内側" },
      { meaning_en: "outside", furigana: "そとがわ", kanji: "外側" },
      { meaning_en: "lay", furigana: "しく", kanji: "敷く" },
      { meaning_en: "all year round", furigana: "ねんじゅう", kanji: "年中" }
    ]
  },
  {
    id: "48_1",
    title: "Topic 2",
    japanese_text: "<ruby>野菜<rt>やさい</rt></ruby><span class='annotated-word' data-word='炒め'><ruby>炒<rt>いた</rt></ruby>め</span>を<ruby>作<rt>つく</rt></ruby>るコツは、<ruby>火<rt>ひ</rt></ruby>が<ruby>通<rt>とお</rt></ruby>りにくい<ruby>材料<rt>ざいりょう</rt></ruby>だけ<ruby>中火<rt>ちゅうび</rt></ruby>で<span class='annotated-word' data-word='炒め'><ruby>炒<rt>いた</rt></ruby>め</span>、<ruby>少<rt>すこ</rt></ruby>しやわらかくなったら<ruby>火<rt>ひ</rt></ruby>を<span class='annotated-word' data-word='弱め'><ruby>弱<rt>よわ</rt></ruby>め</span>、<ruby>他<rt>ほか</rt></ruby>の<ruby>野菜<rt>やさい</rt></ruby>を<ruby>足<rt>た</rt></ruby>して、<span class='annotated-word' data-word='そのまま'>そのまま</span><ruby>弱火<rt>よわび</rt></ruby>で<ruby>炒<rt>いた</rt></ruby>めることだ。<span class='annotated-word' data-word='すると'>すると</span>、しゃきっとした<ruby>野菜<rt>やさい</rt></ruby><ruby>炒<rt>いた</rt></ruby>めができるはずだ。",
    english_translation: "The trick to making stir-fried vegetables is using medium heat for hard-to-cook ingredients and switching to low heat once they soften a little, then adding other vegetables, and continuing to cook it on low heat. Then, you should be able to make crispy stir-fried vegetables.",
    annotated_words: [
      { meaning_en: "stir-fry, fried ~", furigana: "いため", kanji: "〜炒め" },
      { meaning_en: "stir fry", furigana: "いためる", kanji: "炒める" },
      { meaning_en: "weaken", furigana: "よわめる", kanji: "弱める" },
      { meaning_en: "be weakened", furigana: "よわまる", kanji: "弱まる" },
      { meaning_en: "as is", furigana: "", kanji: "そのまま" },
      { meaning_en: "and so", furigana: "", kanji: "すると" }
    ]
  },
  {
    id: "49_0",
    title: "Topic 2",
    japanese_text: "〈<ruby>母親<rt>ははおや</rt></ruby>から<ruby>子<rt>こ</rt></ruby>どもへのメモ<ruby>書<rt>が</rt></ruby>き〉<ruby>昨日<rt>きのう</rt></ruby>の<ruby>夕<rt>ゆう</rt></ruby>ご飯の<span class='annotated-word' data-word='残り'><ruby>残<rt>のこ</rt></ruby>り</span>が<span class='annotated-word' data-word='紺色'><ruby>紺色<rt>こんいろ</rt></ruby></span>のお<ruby>皿<rt>さら</rt></ruby>に<ruby>入<rt>はい</rt></ruby>っているから、それをお<ruby>昼<rt>ひる</rt></ruby>に<ruby>食<rt>た</rt></ruby>べてね。<span class='annotated-word' data-word='レンジ'>レンジ</span>で１<ruby>分<rt>ぷん</rt></ruby>ほど<span class='annotated-word' data-word='温めて'><ruby>温<rt>あたた</rt></ruby>めて</span>ね。",
    english_translation: "A memo from a mother to her child: \"The leftovers from yesterday's dinner is in the indigo dish, so eat it for lunch. Please warm it up for about one minute in the microwave.\"",
    annotated_words: [
      { meaning_en: "leftovers, remaining", furigana: "のこり", kanji: "残り" },
      { meaning_en: "indigo, deep blue", furigana: "こんいろ", kanji: "紺色" },
      { meaning_en: "microwave", furigana: "でんしレンジ", kanji: "（電子）レンジ" },
      { meaning_en: "heat up, warm", furigana: "あたためる", kanji: "温める" },
      { meaning_en: "be heated up, be warmed", furigana: "あたたまる", kanji: "温まる" }
    ]
  },
  {
    id: "50_0",
    title: "Topic 2",
    japanese_text: "A：この<span class='annotated-word' data-word='袋'><ruby>袋<rt>ふくろ</rt></ruby></span>に<ruby>入<rt>はい</rt></ruby>っている<ruby>緑色<rt>みどりいろ</rt></ruby>の<ruby>粉<rt>こな</rt></ruby>、<ruby>何<rt>なに</rt></ruby>？<br>B：ケールっていう<ruby>野菜<rt>やさい</rt></ruby>を、<ruby>粉<rt>こな</rt></ruby>にしたものよ。<br>A：ああ、<ruby>健康<rt>けんこう</rt></ruby>にいいやつだね。<br>B：そうそう。お<ruby>湯<rt>ゆ</rt></ruby>に<span class='annotated-word' data-word='溶かして'><ruby>溶<rt>と</rt></ruby>かして</span><ruby>飲<rt>の</rt></ruby>むの。<ruby>粉<rt>こな</rt></ruby>を<span class='annotated-word' data-word='固めて'><ruby>固<rt>かた</rt></ruby>めて</span><ruby>作<rt>つく</rt></ruby>った<ruby>錠剤<rt>じょうざい</rt></ruby>もあるよ。<br>A：ちょっと<ruby>飲<rt>の</rt></ruby>んでみたいな。<br>B：<ruby>今<rt>いま</rt></ruby>ちょうどわかしたお<ruby>湯<rt>ゆ</rt></ruby>が<span class='annotated-word' data-word='やかん'>やかん</span>に<ruby>入<rt>はい</rt></ruby>っているから、<ruby>作<rt>つく</rt></ruby>ってあげるよ。",
    english_translation: "A: What's this green powder in this bag?\nB: It's a powder made from a vegetable called kale.\nA: Oh, it's good for health, isn't it?\nB: Yeah. You dissolve it in hot water and drink it. There are also tablets made from this powder.\nA: I want to try drinking a little.\nB: There's still some hot water in the kettle I just put on, so I'll make you some.",
    annotated_words: [
      { meaning_en: "bag", furigana: "ふくろ", kanji: "袋" },
      { meaning_en: "shopping bag", furigana: "かいものぶくろ", kanji: "買い物袋" },
      { meaning_en: "dissolve, melt", furigana: "とかす", kanji: "溶かす" },
      { meaning_en: "melt", furigana: "とける", kanji: "溶ける" },
      { meaning_en: "make tough, make hard", furigana: "かためる", kanji: "固める" },
      { meaning_en: "harden", furigana: "かたまる", kanji: "固まる" },
      { meaning_en: "kettle, teapot", furigana: "", kanji: "やかん" }
    ]
  }
];

for (const story of stories) {
  const filePath = path.join(outDir, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Generated ${story.id}.json`);
}

console.log(`\nDone! Generated ${stories.length} stories.`);
