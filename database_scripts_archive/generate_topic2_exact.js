import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete Topic 2 (家事 - Housework, No. 93 to 189): 18 stories transcribed directly from page images (28.jpg to 42.jpg)
const topic2Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 2 家事",
    page_story: "28_1",
    japanese_text: "A：チョコレートは、<u>刻んで</u>から<ruby>溶<rt>と</rt></ruby>かしてね。\nB：どうして？<u>いちいち</u><ruby>刻<rt>きざ</rt></ruby>まなくても<u>熱湯</u>で<ruby>溶<rt>と</rt></ruby>かせばすぐでしょ。\nA：<ruby>低<rt>ひく</rt></ruby>い<ruby>温度<rt>おんど</rt></ruby>で<ruby>早<rt>はや</rt></ruby>く<ruby>溶<rt>と</rt></ruby>かすために<ruby>刻<rt>きざ</rt></ruby>むんだよ。<ruby>高<rt>たか</rt></ruby>い<ruby>温度<rt>おんど</rt></ruby>で<ruby>溶<rt>と</rt></ruby>かすと<ruby>味<rt>あじ</rt></ruby>が<ruby>悪<rt>わる</rt></ruby>くなるから。",
    english_translation: "A: You should chop up the chocolate before you melt it. B: Why? Even if you don't chop up every single piece, it will still melt in hot water. A: If you chop up the chocolate, it melts faster at a lower temperature. If you melt it at a higher temperature, it won't taste as good.",
    annotated_words: [
      { word_id: "n2_0093", word_number: 93, kanji: "刻む", furigana: "きざむ", meaning_en: "chop up" },
      { word_id: "n2_0094", word_number: 94, kanji: "いちいち", furigana: "", meaning_en: "piece by piece, every single piece" },
      { word_id: "n2_0095", word_number: 95, kanji: "熱湯", furigana: "ねっとう", meaning_en: "hot water, boiling water" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 2 家事",
    page_story: "29_1",
    japanese_text: "A：<ruby>彼女<rt>かのじょ</rt></ruby>がおうちに<ruby>遊<rt>あそ</rt></ruby>びに<ruby>来<rt>く</rt></ruby>るの、<u>いよいよ</u><ruby>明後日<rt>あさって</rt></ruby>だね。もう<ruby>準備<rt>じゅんび</rt></ruby>はしたの？\nB：うーん、<ruby>昼食<rt>ちゅうしょく</rt></ruby>の<u>献立</u>は<ruby>決<rt>き</rt></ruby>めたんだけど、まだ<ruby>材料<rt>ざいりょう</rt></ruby>を<u>何も</u><ruby>買<rt>か</rt></ruby>ってないんだよね。\nA：そっか。そこの<ruby>道路<rt>どうろ</rt></ruby>を<u>隔てた</u>ところにスーパーがあるんだけど、あそこはいい<u>品</u>がそろってるよ。",
    english_translation: "A: Your girlfriend is finally coming to visit you the day after tomorrow, right? Have you made all the preparations yet? B: Well, I worked out the lunch menu, but I haven't bought any ingredients yet. A: Right. There's a supermarket across the road, and they have some good things there.",
    annotated_words: [
      { word_id: "n2_0096", word_number: 96, kanji: "いよいよ", furigana: "", meaning_en: "finally, after all this time" },
      { word_id: "n2_0097", word_number: 97, kanji: "献立", furigana: "こんだて", meaning_en: "menu, arrangement" },
      { word_id: "n2_0098", word_number: 98, kanji: "何も", furigana: "なに", meaning_en: "none, not any" },
      { word_id: "n2_0099", word_number: 99, kanji: "隔てる", furigana: "へだてる", meaning_en: "divide, separate" },
      { word_id: "n2_0100", word_number: 100, kanji: "隔たる", furigana: "へだたる", meaning_en: "be distant or separate" },
      { word_id: "n2_0101", word_number: 101, kanji: "品", furigana: "しな", meaning_en: "items, things" },
      { word_id: "n2_0102", word_number: 102, kanji: "品切れ[する]", furigana: "しなぎれ", meaning_en: "stock shortage, sell out" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 2 家事",
    page_story: "30_1",
    japanese_text: "A：あ、ペットボトルと<ruby>缶<rt>かん</rt></ruby>はその<ruby>袋<rt>ふくろ</rt></ruby>じゃなくて、<ruby>別<rt>べつ</rt></ruby>の<u>ごみ袋</u>に<ruby>入<rt>い</rt></ruby>れて！\nB：え？ペットボトルは<u>プラスチック</u>だから<ruby>燃<rt>も</rt></ruby>えないごみでしょ？<ruby>同<rt>おな</rt></ruby>じ<u>分類</u>じゃないの？\nA：<ruby>確<rt>たし</rt></ruby>かに<ruby>両方<rt>りょうほう</rt></ruby>とも<ruby>燃<rt>も</rt></ruby>えないごみだけど、<ruby>袋<rt>ふくろ</rt></ruby>は<ruby>分<rt>わ</rt></ruby>けないと。\nB：そうなの？<u>面倒くさい</u>なあ。\nA：<u>文句</u>を<ruby>言<rt>い</rt></ruby>わずに、<u>せっせと</u><ruby>手<rt>て</rt></ruby>を<ruby>動<rt>うご</rt></ruby>かす！",
    english_translation: "A: Oh, put the plastic bottles and cans in another trash bag, not that one! B: What? Plastic bottles are non-burnable waste because they are plastic, right? Aren't they in the same category? A: Sure, both are non-burnable waste, but the bags have to be separated. B: Really? That's a hassle. A: Stop complaining and work harder!",
    annotated_words: [
      { word_id: "n2_0103", word_number: 103, kanji: "ごみ袋", furigana: "ごみぶくろ", meaning_en: "trash bag, garbage bag" },
      { word_id: "n2_0104", word_number: 104, kanji: "プラスチック", furigana: "", meaning_en: "plastic" },
      { word_id: "n2_0105", word_number: 105, kanji: "分類[する]", furigana: "ぶんるい", meaning_en: "category, separate" },
      { word_id: "n2_0106", word_number: 106, kanji: "面倒くさい", furigana: "めんどうくさい", meaning_en: "hassle, troublesome" },
      { word_id: "n2_0107", word_number: 107, kanji: "文句", furigana: "もんく", meaning_en: "complain" },
      { word_id: "n2_0108", word_number: 108, kanji: "せっせと", furigana: "", meaning_en: "busily, hard (at work)" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 2 家事",
    page_story: "30_2",
    japanese_text: "A：ごめん、お<ruby>皿<rt>さら</rt></ruby><ruby>落<rt>お</rt></ruby>として<ruby>割<rt>わ</rt></ruby>っちゃった…。<ruby>掃除<rt>そうじ</rt></ruby>するから、ほうきと<u>ちりとり</u><ruby>借<rt>か</rt></ruby>りてもいいかな？\nB：ああ、<ruby>気<rt>き</rt></ruby>にしないで。<ruby>先<rt>さき</rt></ruby>に<ruby>水<rt>みず</rt></ruby>を<u>くん</u>できて、<u>布巾</u>で<u>じゅうたん</u>を<ruby>拭<rt>ふ</rt></ruby>いてもらえるかな？<u>放っておく</u>と<u>染み</u>になるから。",
    english_translation: "A: Sorry, I dropped the plate and it broke... Can I borrow a broom and dustpan to clean up? B: Oh, don't worry about it. Can you go ahead and draw some water and wipe the carpet with a rag? If you leave it, it will become stained.",
    annotated_words: [
      { word_id: "n2_0109", word_number: 109, kanji: "ちりとり", furigana: "", meaning_en: "dustpan" },
      { word_id: "n2_0110", word_number: 110, kanji: "くむ", furigana: "", meaning_en: "scoop up, draw (water)" },
      { word_id: "n2_0111", word_number: 111, kanji: "布巾", furigana: "ふきん", meaning_en: "cloth, rag" },
      { word_id: "n2_0112", word_number: 112, kanji: "じゅうたん", furigana: "", meaning_en: "carpet" },
      { word_id: "n2_0113", word_number: 113, kanji: "放る", furigana: "ほうる", meaning_en: "leave, neglect" },
      { word_id: "n2_0114", word_number: 114, kanji: "染み", furigana: "しみ", meaning_en: "stain" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 2 家事",
    page_story: "31_1",
    japanese_text: "A：あれ？<ruby>量<rt>りょう</rt></ruby>が<ruby>減<rt>へ</rt></ruby>ってる<ruby>気<rt>き</rt></ruby>がするんだけど、お<ruby>父<rt>とう</rt></ruby>さん<ruby>食<rt>た</rt></ruby>べた？\nB：<u>味見</u>してたら、<ruby>食<rt>た</rt></ruby>べすぎちゃって…。\nA：もー！あ、ワインの<u>栓</u>も<ruby>開<rt>あ</rt></ruby>いてる！お<ruby>母<rt>かあ</rt></ruby>さんに<u>言い付ける</u>よ！",
    english_translation: "A: Huh? Looks like there's less now! Did you eat some, Dad? B: I was just tasting it, but I ate too much... A: No way! Oh, the cork—you opened the wine too! I'm telling mom!",
    annotated_words: [
      { word_id: "n2_0115", word_number: 115, kanji: "味見[する]", furigana: "あじみ", meaning_en: "tasting, taste" },
      { word_id: "n2_0116", word_number: 116, kanji: "栓", furigana: "せん", meaning_en: "stopper, cork" },
      { word_id: "n2_0117", word_number: 117, kanji: "言い付ける", furigana: "いいつける", meaning_en: "tattle, tell (tales)" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 2 家事",
    page_story: "32_1",
    japanese_text: "A：ケーキが<ruby>膨<rt>ふく</rt></ruby>らまない…。<u>はかり</u>も<ruby>使<rt>つか</rt></ruby>って<u>レシピ</u><ruby>通<rt>どお</rt></ruby>りの<u>分量</u>で<ruby>作<rt>つく</rt></ruby>ったのになあ。\nB：<ruby>卵<rt>たまご</rt></ruby>とバターを<ruby>混<rt>ま</rt></ruby>ぜるとき、<ruby>卵<rt>たまご</rt></ruby>を<ruby>一度<rt>いちど</rt></ruby>に<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>入<rt>い</rt></ruby>れたからかな？<ruby>一度<rt>いちど</rt></ruby>に<ruby>入<rt>い</rt></ruby>れると、うまく<ruby>混<rt>ま</rt></ruby>ざらなくて<ruby>膨<rt>ふく</rt></ruby>らみにくいらしいけど。\nA：<u>しまった</u>！それだ！\nB：お<ruby>菓子作<rt>かしづく</rt></ruby>りは<ruby>分量<rt>ぶんりょう</rt></ruby>だけじゃなく、<u>過程</u>も<ruby>大切<rt>たいせつ</rt></ruby>ってことだね。",
    english_translation: "A: The cake didn't rise... I used a measuring scale and followed the recipe, using the listed quantities. B: Maybe it's because you added all the eggs and butter at once when you mixed them? If you add them all at the same time, they don't mix well and the cake is less likely to rise, I think. A: Oh no! That's it! B: Baking isn't just about the quantities, but also the process.",
    annotated_words: [
      { word_id: "n2_0118", word_number: 118, kanji: "はかり", furigana: "", meaning_en: "measuring scale" },
      { word_id: "n2_0119", word_number: 119, kanji: "レシピ", furigana: "", meaning_en: "recipe" },
      { word_id: "n2_0120", word_number: 120, kanji: "分量", furigana: "ぶんりょう", meaning_en: "amount, quantity" },
      { word_id: "n2_0121", word_number: 121, kanji: "しまった", furigana: "", meaning_en: "Oh no!" },
      { word_id: "n2_0122", word_number: 122, kanji: "過程", furigana: "かてい", meaning_en: "process" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 2 家事",
    page_story: "32_2",
    japanese_text: "A：<ruby>息子<rt>むすこ</rt></ruby>さん、<ruby>大<rt>おお</rt></ruby>きくなったね。この<ruby>間<rt>あいだ</rt></ruby>まで<u>おむつ</u><ruby>履<rt>は</rt></ruby>いてたのに。\nB：<ruby>最近<rt>さいきん</rt></ruby>は<u>お使い</u>にも<ruby>行<rt>い</rt></ruby>ってくれるんだ。でも、まだ「<u>おんぶ</u>してー」って<ruby>言<rt>い</rt></ruby>ってくることもあるよ。",
    english_translation: "A: Your son is so big now. He was wearing diapers just a little while ago. B: He even runs errands for me these days. But he still asks for a piggyback ride sometimes.",
    annotated_words: [
      { word_id: "n2_0123", word_number: 123, kanji: "おむつ", furigana: "", meaning_en: "diapers" },
      { word_id: "n2_0124", word_number: 124, kanji: "お使い[する]", furigana: "おつかい", meaning_en: "errand, run errand" },
      { word_id: "n2_0125", word_number: 125, kanji: "おんぶ[する]", furigana: "", meaning_en: "piggyback, give a piggyback ride" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 2 家事",
    page_story: "33_1",
    japanese_text: "<ruby>唐揚<rt>からあ</rt></ruby>げは2<ruby>回<rt>かい</rt></ruby><u>揚げ</u>るのがおすすめだ。まず、160<ruby>度<rt>ど</rt></ruby>の<ruby>油<rt>あぶら</rt></ruby>で4<ruby>分間<rt>ふんかん</rt></ruby><ruby>揚<rt>あ</rt></ruby>げ、<ruby>油<rt>あぶら</rt></ruby>から<ruby>出<rt>だ</rt></ruby>して4<ruby>分<rt>ふん</rt></ruby><ruby>待<rt>ま</rt></ruby>つ。<ruby>待<rt>ま</rt></ruby>っている<ruby>間<rt>あいだ</rt></ruby>に<ruby>火<rt>ひ</rt></ruby>を<u>強め</u>、<ruby>油<rt>あぶら</rt></ruby>の<ruby>温度<rt>おんど</rt></ruby>を<ruby>上<rt>あ</rt></ruby>げておき、180<ruby>度<rt>ど</rt></ruby>の<ruby>油<rt>あぶら</rt></ruby>で<u>さっと</u><ruby>揚<rt>あ</rt></ruby>げれば<ruby>完成<rt>かんせい</rt></ruby>だ。<ruby>特別<rt>とくべつ</rt></ruby>な<u>味付け</u>をしなくても、この<u>手間</u>でおいしくなる。",
    english_translation: "Frying chicken twice is recommended. First, fry in oil at 160°C for 4 minutes, then remove from oil and wait 4 minutes. While waiting, increase the heat to raise the temperature of the oil, then quickly fry the chicken at 180°C. This extra step adds flavor to the dish without any special seasoning.",
    annotated_words: [
      { word_id: "n2_0126", word_number: 126, kanji: "揚げる", furigana: "あげる", meaning_en: "fry" },
      { word_id: "n2_0127", word_number: 127, kanji: "強める", furigana: "つよめる", meaning_en: "make stronger, increase" },
      { word_id: "n2_0128", word_number: 128, kanji: "強まる", furigana: "つよまる", meaning_en: "grow stronger" },
      { word_id: "n2_0129", word_number: 129, kanji: "さっと", furigana: "", meaning_en: "quickly, immediately" },
      { word_id: "n2_0130", word_number: 130, kanji: "味付け[する]", furigana: "あじつけ", meaning_en: "seasoning, add flavor" },
      { word_id: "n2_0131", word_number: 131, kanji: "手間", furigana: "てま", meaning_en: "effort, step" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 2 家事",
    page_story: "34_1",
    japanese_text: "A：そのカレー、<u>保温</u><ruby>調理<rt>ちょうり</rt></ruby>で<ruby>作<rt>つく</rt></ruby>ってみたんだけど、どうかな？\nB：おいしいよ。<ruby>何<rt>なに</rt></ruby>か<ruby>特別<rt>とくべつ</rt></ruby>な<u>器具</u>を<ruby>使<rt>つか</rt></ruby>ったの？\nA：ううん、<ruby>使<rt>つか</rt></ruby>ったのは<u>タイマー</u>くらい。まず、<ruby>普段<rt>ふだん</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じように<u>熱した</u><ruby>鍋<rt>なべ</rt></ruby>で<ruby>具材<rt>ぐざい</rt></ruby>を<ruby>炒<rt>いた</rt></ruby>めて、<ruby>少<rt>すこ</rt></ruby>し<ruby>煮<rt>に</rt></ruby>るんだ。その<ruby>後<rt>あと</rt></ruby>、タオルで<ruby>包<rt>つつ</rt></ruby>んで30<ruby>分<rt>ぷん</rt></ruby><ruby>待<rt>ま</rt></ruby>つだけ。<ruby>母<rt>はは</rt></ruby>に<ruby>教<rt>おし</rt></ruby>えてもらったの。\nB：へえ。<ruby>主婦<rt>しゅふ</rt></ruby>の<u>知恵</u>は<u>偉大</u>だね。",
    english_translation: "A: I made that curry using a heat-retaining cooking method, how do you like it? B: It's delicious. Did you use any special utensils? A: No, just a timer. First, I sauteed the ingredients in a heated pan as usual, and then simmered it a while. Then I just wrap it in a towel and wait 30 minutes. My mother taught me how. B: Wow. The wisdom of housewives is kind of awesome.",
    annotated_words: [
      { word_id: "n2_0132", word_number: 132, kanji: "保温[する]", furigana: "ほおん", meaning_en: "thermal retention, retain heat" },
      { word_id: "n2_0133", word_number: 133, kanji: "保冷[する]", furigana: "ほれい", meaning_en: "cold retention, retain cold" },
      { word_id: "n2_0134", word_number: 134, kanji: "器具", furigana: "きぐ", meaning_en: "utensils" },
      { word_id: "n2_0135", word_number: 135, kanji: "タイマー", furigana: "", meaning_en: "timer" },
      { word_id: "n2_0136", word_number: 136, kanji: "熱[する]", furigana: "ねつ", meaning_en: "heat, heat up" },
      { word_id: "n2_0137", word_number: 137, kanji: "知恵", furigana: "ちえ", meaning_en: "wisdom" },
      { word_id: "n2_0138", word_number: 138, kanji: "偉大な", furigana: "いだいな", meaning_en: "awesome, magnificent" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 2 家事",
    page_story: "35_1",
    japanese_text: "A：そのお<ruby>弁当<rt>べんとう</rt></ruby>、<ruby>自分<rt>じぶん</rt></ruby>で<ruby>作<rt>つく</rt></ruby>ったの？\nB：そうそう。<ruby>最近<rt>さいきん</rt></ruby>、<u>節約</u>のために<u>自炊して</u>て。\nA：<ruby>確<rt>たし</rt></ruby>かに、<ruby>自分<rt>じぶん</rt></ruby>で<ruby>作<rt>つく</rt></ruby>る<ruby>方<rt>ほう</rt></ruby>が<ruby>安<rt>やす</rt></ruby>いよね。\nB：うん。<ruby>食事<rt>しょくじ</rt></ruby>の<ruby>量<rt>りょう</rt></ruby>も<u>コントロール</u>できるからいいよ。\nA：でも<ruby>朝起<rt>あさお</rt></ruby>きるの<ruby>大変<rt>たいへん</rt></ruby>じゃない？\nB：<ruby>前<rt>まえ</rt></ruby>は<ruby>早起<rt>はやお</rt></ruby>きが<ruby>苦手<rt>にがて</rt></ruby>だったけど、<ruby>食事<rt>しょくじ</rt></ruby>に<ruby>気<rt>き</rt></ruby>をつけ<ruby>始<rt>はじ</rt></ruby>めてから<ruby>毎朝<rt>まいあさ</rt></ruby><u>すっきり</u> <u>目覚められる</u>ようになったんだ。",
    english_translation: "A: Did you make that lunch box yourself? B: Yes, I did. I've been cooking for myself lately to save money. A: Right, it's cheaper to make it yourself. B: Yes. I can control the amount of food I eat. A: But isn't it hard to get up early in the morning? B: I used to find it hard getting up early, but since I started watching what I eat, I wake up refreshed every morning.",
    annotated_words: [
      { word_id: "n2_0139", word_number: 139, kanji: "節約[する]", furigana: "せつやく", meaning_en: "cost-cutting, save money" },
      { word_id: "n2_0140", word_number: 140, kanji: "節電[する]", furigana: "せつでん", meaning_en: "saving electricity, conserve power" },
      { word_id: "n2_0141", word_number: 141, kanji: "自炊[する]", furigana: "じすい", meaning_en: "cooking for oneself" },
      { word_id: "n2_0142", word_number: 142, kanji: "コントロール[する]", furigana: "", meaning_en: "control" },
      { word_id: "n2_0143", word_number: 143, kanji: "すっきり(と)", furigana: "", meaning_en: "cleanly, refreshed" },
      { word_id: "n2_0144", word_number: 144, kanji: "目覚める", furigana: "めざめる", meaning_en: "wake up" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 2 家事",
    page_story: "36_1",
    japanese_text: "A：どうしたの、この<ruby>部屋<rt>へや</rt></ruby>。<ruby>机<rt>つくえ</rt></ruby>の<ruby>下<rt>した</rt></ruby>には<u>紙くず</u>、キッチンには<u>洗い物</u>がいっぱい！<ruby>洗濯物<rt>せんたくもの</rt></ruby>にも<u>しわ</u>がついてる…。\nB：<ruby>今週<rt>こんしゅう</rt></ruby><ruby>忙<rt>いそが</rt></ruby>しくて…。\nA：<u>ルームシェア</u>してるんだよね？<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>住<rt>す</rt></ruby>んでる<ruby>人<rt>ひと</rt></ruby>は<ruby>怒<rt>おこ</rt></ruby>らないの？\nB：<ruby>今<rt>いま</rt></ruby><ruby>旅行中<rt>りょこうちゅう</rt></ruby>で<u>不在</u>なんだ。もうすぐ<ruby>帰<rt>かえ</rt></ruby>ってくるよ。\nA：じゃあ<ruby>早<rt>はや</rt></ruby>く<ruby>掃除<rt>そうじ</rt></ruby>しないと。ほら、その<ruby>机<rt>つくえ</rt></ruby><u>持ち上げて</u>！",
    english_translation: "A: What happened to your room? There are paper scraps under the desk, and the kitchen is full of dirty dishes! The laundry is all wrinkled too... B: I've been busy this week... A: You share this place, right? Won't the guy you live with get mad at you? B: He's away on a trip right now. But he'll be back soon. A: Then we have to clean up right away. Okay, lift up that desk!",
    annotated_words: [
      { word_id: "n2_0145", word_number: 145, kanji: "紙くず", furigana: "かみくず", meaning_en: "paper scraps" },
      { word_id: "n2_0146", word_number: 146, kanji: "洗い物", furigana: "あらいもの", meaning_en: "dirty dishes or clothing" },
      { word_id: "n2_0147", word_number: 147, kanji: "しわ", furigana: "", meaning_en: "wrinkle" },
      { word_id: "n2_0148", word_number: 148, kanji: "ルームシェア[する]", furigana: "", meaning_en: "sharing housing, share a place" },
      { word_id: "n2_0149", word_number: 149, kanji: "不在", furigana: "ふざい", meaning_en: "absence, gone away" },
      { word_id: "n2_0150", word_number: 150, kanji: "持ち上げる", furigana: "もちあげる", meaning_en: "lift up" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 2 家事",
    page_story: "37_1",
    japanese_text: "A：このクッキーおいしい！<u>ねじって</u>あって、<ruby>形<rt>かたち</rt></ruby>もかわいいね！\nB：ありがとう。<u>粗く</u> <u>砕いた</u>アーモンドを<ruby>入<rt>い</rt></ruby>れてみたんだ。<ruby>失敗<rt>しっぱい</rt></ruby>したときの<u>予備</u>にたくさん<ruby>作<rt>つく</rt></ruby>ったから、よかったらそこの<u>容器</u>に<ruby>入<rt>い</rt></ruby>れて<ruby>持<rt>も</rt></ruby>って<ruby>帰<rt>かえ</rt></ruby>って。\nA：え、いいの？\nB：うん。こんなに<u>大量</u>にあっても、<u>食べきれない</u>から。",
    english_translation: "A: These cookies are delicious! The shape's so cute too, the way they're twisted! B: Thanks. I put coarsely ground almonds in them. Actually, I made a lot of spare cookies in case I messed up, so you can take some home in that container if you like. A: Oh, really? B: Yeah. I made so many, I could never finish them all off myself.",
    annotated_words: [
      { word_id: "n2_0151", word_number: 151, kanji: "ねじる", furigana: "", meaning_en: "twist" },
      { word_id: "n2_0152", word_number: 152, kanji: "粗い", furigana: "あらい", meaning_en: "rough, coarse" },
      { word_id: "n2_0153", word_number: 153, kanji: "砕く", furigana: "くだく", meaning_en: "crush, grind" },
      { word_id: "n2_0154", word_number: 154, kanji: "予備", furigana: "よび", meaning_en: "extra, spare" },
      { word_id: "n2_0155", word_number: 155, kanji: "容器", furigana: "ようき", meaning_en: "container" },
      { word_id: "n2_0156", word_number: 156, kanji: "大量な", furigana: "たいりょうな", meaning_en: "large quantity" },
      { word_id: "n2_0157", word_number: 157, kanji: "～きる", furigana: "", meaning_en: "finish off ~, completely ~" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 2 家事",
    page_story: "38_1",
    japanese_text: "<ruby>部屋<rt>へや</rt></ruby>をきれいに<u>保つ</u>ためには、<ruby>物<rt>もの</rt></ruby>を<ruby>増<rt>ふ</rt></ruby>やさないことが<ruby>重要<rt>じゅうよう</rt></ruby>だ。<ruby>物<rt>もの</rt></ruby>が<ruby>少<rt>すく</rt></ruby>ないだけで<ruby>部屋<rt>へや</rt></ruby>がきれいに<ruby>見<rt>み</rt></ruby>える。<ruby>捨<rt>す</rt></ruby>てることが<ruby>難<rt>むずか</rt></ruby>しい<ruby>場合<rt>ばあい</rt></ruby>、<ruby>使<rt>つか</rt></ruby>わない<ruby>物<rt>もの</rt></ruby>は<u>入れ物</u>にしまったり、<u>物置</u>に<ruby>入<rt>い</rt></ruby>れたりして、<ruby>物<rt>もの</rt></ruby>を<ruby>少<rt>すく</rt></ruby>なく<ruby>見<rt>み</rt></ruby>せるのも<u>有効</u>だ。<ruby>加<rt>くわ</rt></ruby>えて、<ruby>使<rt>つか</rt></ruby>ったものを<ruby>元<rt>もと</rt></ruby>の<ruby>場所<rt>ばしょ</rt></ruby>に<u>収める</u>ことも<ruby>大切<rt>たいせつ</rt></ruby>である。",
    english_translation: "To keep a room clean, it's important not to add more things. Having just a few items makes a room look cleaner. If you have trouble throwing things away, it's also effective to put unused items in a container or storage space to make the room look neater. Also, it's important to place anything you use back where it belongs.",
    annotated_words: [
      { word_id: "n2_0158", word_number: 158, kanji: "保つ", furigana: "たもつ", meaning_en: "keep, maintain" },
      { word_id: "n2_0159", word_number: 159, kanji: "入れ物", furigana: "いれもの", meaning_en: "container" },
      { word_id: "n2_0160", word_number: 160, kanji: "物置", furigana: "ものおき", meaning_en: "storage space" },
      { word_id: "n2_0161", word_number: 161, kanji: "有効な", furigana: "ゆうこうな", meaning_en: "effective" },
      { word_id: "n2_0162", word_number: 162, kanji: "収める／納める", furigana: "おさめる", meaning_en: "store, place" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 2 家事",
    page_story: "38_2",
    japanese_text: "A：<ruby>最近<rt>さいきん</rt></ruby>、<ruby>母<rt>はは</rt></ruby>が<ruby>家事<rt>かじ</rt></ruby>を<ruby>手伝<rt>てつだ</rt></ruby>いにうるさくて。\nB：え？<ruby>家事<rt>かじ</rt></ruby>しないの？\nA：<u>自ら</u><ruby>進<rt>すす</rt></ruby>んでやることはないかも。<u>炊事</u>、<ruby>洗濯<rt>せんたく</rt></ruby>、<ruby>掃除<rt>そうじ</rt></ruby>は<ruby>苦手<rt>にがて</rt></ruby>だから、<ruby>母<rt>はは</rt></ruby>に<u>任せて</u><ruby>仕事<rt>しごと</rt></ruby>に<ruby>集中<rt>しゅうちゅう</rt></ruby>したいな。\nB：いや、できる<u>範囲</u>でやりなよ。",
    english_translation: "A: Lately, my mother's been nagging me to help with the housework. B: What? You don't do housework? A: I just don't think to do it myself. I'm no good at cooking, washing clothes, or cleaning, so I prefer to leave it up to my mother and just concentrate on my work. B: That's no good. You should do as much as you can.",
    annotated_words: [
      { word_id: "n2_0163", word_number: 163, kanji: "自ら", furigana: "みずから", meaning_en: "oneself" },
      { word_id: "n2_0164", word_number: 164, kanji: "炊事[する]", furigana: "すいじ", meaning_en: "cooking, cook" },
      { word_id: "n2_0165", word_number: 165, kanji: "任せる", furigana: "まかせる", meaning_en: "leave up to" },
      { word_id: "n2_0166", word_number: 166, kanji: "範囲", furigana: "はんい", meaning_en: "range, scope" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 2 家事",
    page_story: "39_1",
    japanese_text: "<ruby>最近<rt>さいきん</rt></ruby>、<ruby>家事<rt>かじ</rt></ruby>を<u>論理的に</u><ruby>行<rt>おこな</rt></ruby>う<ruby>方法<rt>ほうほう</rt></ruby>が<ruby>話題<rt>わだい</rt></ruby>になっている。これは、<ruby>家事<rt>かじ</rt></ruby>をする<ruby>前<rt>まえ</rt></ruby>に、やることや、やる<ruby>順番<rt>じゅんばん</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>しておくというものである。<ruby>作業<rt>さぎょう</rt></ruby>を<u>順々に</u><ruby>書<rt>か</rt></ruby>き<ruby>出<rt>だ</rt></ruby>すことで、<ruby>時間<rt>じかん</rt></ruby>の<ruby>無駄<rt>むだ</rt></ruby>なく<ruby>家事<rt>かじ</rt></ruby>ができるのである。また、<ruby>何<rt>なに</rt></ruby>をするべきかがはっきりするため、<ruby>夫婦<rt>ふうふ</rt></ruby>で<ruby>家事<rt>かじ</rt></ruby>を<u>分業</u>しやすくもなる。",
    english_translation: "Recently, there's been a lot of discussion about the logical way to do household chores. The idea is to organize the tasks that need doing and the order in which they are to be done before starting the chores. By writing down the tasks in order, housework can be done without wasting time. This also makes it easier for couples to divide the household chores, because they know exactly what needs to be done.",
    annotated_words: [
      { word_id: "n2_0167", word_number: 167, kanji: "論理的な", furigana: "ろんりてきな", meaning_en: "logical" },
      { word_id: "n2_0168", word_number: 168, kanji: "論理", furigana: "ろんり", meaning_en: "logic" },
      { word_id: "n2_0169", word_number: 169, kanji: "順々に", furigana: "じゅんじゅんに", meaning_en: "in order, successively" },
      { word_id: "n2_0170", word_number: 170, kanji: "分業[する]", furigana: "ぶんぎょう", meaning_en: "division of labor, divide tasks" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 2 家事",
    page_story: "40_1",
    japanese_text: "A：お<ruby>掃除<rt>そうじ</rt></ruby><u>完了</u>！\nB：おかげさまで<u>あっという間に</u><ruby>終<rt>お</rt></ruby>わったよ。<u>頼って</u>ばかりでごめんね。\nA：いいよいいよ。でも、<u>かび</u>が<ruby>生<rt>は</rt></ruby>えた<ruby>服<rt>ふく</rt></ruby>が<ruby>出<rt>で</rt></ruby>てきたときは、びっくりしたな。\nB：うっ…。<ruby>冬<rt>ふゆ</rt></ruby>は<ruby>服<rt>ふく</rt></ruby>が<ruby>乾<rt>かわ</rt></ruby>きにくいから…。\nA：エアコンをつけた<ruby>部屋<rt>へや</rt></ruby>に<u>つるして</u>おくといいよ。<ruby>部屋<rt>へや</rt></ruby>も<ruby>乾燥<rt>かんそう</rt></ruby>しないし。",
    english_translation: "A: And the cleaning is finished! B: Thanks to you, we got it done in no time. I'm always relying on you, sorry. A: That's all right. But I was surprised to find mold growing on your clothes. B: Uh... It's hard to dry clothes in winter... A: You can hang them in an air-conditioned room. It keeps the room dry too.",
    annotated_words: [
      { word_id: "n2_0171", word_number: 171, kanji: "完了[する]", furigana: "かんりょう", meaning_en: "completion, finish" },
      { word_id: "n2_0172", word_number: 172, kanji: "あっという間", furigana: "あっというま", meaning_en: "in no time" },
      { word_id: "n2_0173", word_number: 173, kanji: "頼る", furigana: "たよる", meaning_en: "depend, rely" },
      { word_id: "n2_0174", word_number: 174, kanji: "かび", furigana: "", meaning_en: "mold" },
      { word_id: "n2_0175", word_number: 175, kanji: "つるす", furigana: "", meaning_en: "hang (something)" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 2 家事",
    page_story: "41_1",
    japanese_text: "<ruby>鶏胸肉<rt>とりむねにく</rt></ruby>はいろいろな<ruby>料理<rt>りょうり</rt></ruby>に<u>応用できる</u>ので、ゆでた<ruby>鶏胸肉<rt>とりむねにく</rt></ruby>を<u>裂いて</u><ruby>冷凍保存<rt>れいとうほぞん</rt></ruby>している<ruby>人<rt>ひと</rt></ruby>も<ruby>多<rt>おお</rt></ruby>い。<ruby>鶏胸肉<rt>とりむねにく</rt></ruby>は<u>縮み</u>やすいので、<ruby>下準備<rt>したじゅんび</rt></ruby>をしておく<ruby>必要<rt>ひつよう</rt></ruby>がある。<ruby>例<rt>たと</rt></ruby>えば、<u>加熱する</u><ruby>前<rt>まえ</rt></ruby>にフォークで<ruby>刺<rt>さ</rt></ruby>したり、<u>棒</u>でたたいたりするといい。また、<ruby>袋<rt>ふくろ</rt></ruby>に<ruby>水<rt>みず</rt></ruby>と<ruby>塩<rt>しお</rt></ruby>と<ruby>砂糖<rt>さとう</rt></ruby>を<ruby>入<rt>い</rt></ruby>れ、その<ruby>中<rt>なか</rt></ruby>に<u>漬けて</u>おくのもおすすめだ。",
    english_translation: "Chicken breasts can be used in a variety of dishes, so many people shred boiled chicken breasts and freeze them. Chicken breasts tend to shrink, so you need to prepare them in advance. For example, you can prick them with a fork or pound them with a heavy rod before heating. Marinating them in a bag with water, salt, and sugar is also recommended.",
    annotated_words: [
      { word_id: "n2_0176", word_number: 176, kanji: "応用[する]", furigana: "おうよう", meaning_en: "application, use" },
      { word_id: "n2_0177", word_number: 177, kanji: "裂く", furigana: "さく", meaning_en: "shred" },
      { word_id: "n2_0178", word_number: 178, kanji: "裂ける", furigana: "さける", meaning_en: "rupture, split" },
      { word_id: "n2_0179", word_number: 179, kanji: "縮む", furigana: "ちぢむ", meaning_en: "shrink, shrivel" },
      { word_id: "n2_0180", word_number: 180, kanji: "加熱[する]", furigana: "かねつ", meaning_en: "heating, heat" },
      { word_id: "n2_0181", word_number: 181, kanji: "棒", furigana: "ぼう", meaning_en: "stick, rod" },
      { word_id: "n2_0182", word_number: 182, kanji: "漬ける", furigana: "つける", meaning_en: "marinate" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 2 家事",
    page_story: "42_1",
    japanese_text: "A：そのマフラー、<ruby>新<rt>あたら</rt></ruby>しいよね？<ruby>買<rt>か</rt></ruby>ったの？\nB：あ、これ<ruby>自分<rt>じぶん</rt></ruby>で<u>編んだ</u>んだ。\nA：<u>器用</u>だなあ。<ruby>私<rt>わたし</rt></ruby>、<u>編み物</u>とか<u>裁縫</u>が<ruby>苦手<rt>にがて</rt></ruby>なんだよね。<ruby>中学生<rt>ちゅうがくせい</rt></ruby>のとき<u>エプロン</u><ruby>作<rt>つく</rt></ruby>ったんだけど、ポケットを<u>逆さまに</u>つけちゃって、みんなに<ruby>笑<rt>わら</rt></ruby>われちゃった。",
    english_translation: "A: That scarf is new, isn't it? Did you buy it? B: Oh, I knitted it myself. A: You're very skillful. I'm no good at knitting or sewing. When I was in junior high school, I made an apron, but I put the pockets on upside down and everyone laughed at me.",
    annotated_words: [
      { word_id: "n2_0183", word_number: 183, kanji: "編む", furigana: "あむ", meaning_en: "knit" },
      { word_id: "n2_0184", word_number: 184, kanji: "器用な", furigana: "きような", meaning_en: "adept, skillful" },
      { word_id: "n2_0185", word_number: 185, kanji: "不器用な", furigana: "ぶきような", meaning_en: "clumsy, unskilled" },
      { word_id: "n2_0186", word_number: 186, kanji: "編み物", furigana: "あみもの", meaning_en: "knitting" },
      { word_id: "n2_0187", word_number: 187, kanji: "裁縫[する]", furigana: "さいほう", meaning_en: "sewing, sew" },
      { word_id: "n2_0188", word_number: 188, kanji: "エプロン", furigana: "", meaning_en: "apron" },
      { word_id: "n2_0189", word_number: 189, kanji: "逆さまな／逆さな", furigana: "さかさまな", meaning_en: "upside down" }
    ]
  }
];

topic2Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 2 story ${story.story_number}: ${story.page_story}.json`);
});
