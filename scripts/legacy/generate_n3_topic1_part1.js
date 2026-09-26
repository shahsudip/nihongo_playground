import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

const stories = [
  // Story 1 (🔊1) - Page 16
  {
    id: "16_1",
    title: "Topic 1",
    japanese_text: "A：<ruby>朝<rt>ちょう</rt></ruby><ruby>食<rt>しょく</rt></ruby>に<span class='annotated-word' data-word='フルーツ'>フルーツ</span>を<ruby>食<rt>た</rt></ruby>べるといいって<ruby>聞<rt>き</rt></ruby>いたんだけど、<span class='annotated-word' data-word='皮'>皮</span>を<span class='annotated-word' data-word='むく'>むく</span>のが<ruby>面倒<rt>めんどう</rt></ruby>くさいんだよね。<br>B：じゃあ<span class='annotated-word' data-word='缶詰'>缶詰</span>でいいじゃない。<br>A：でも、<span class='annotated-word' data-word='新鮮な'><ruby>新鮮<rt>しんせん</rt></ruby>な</span><ruby>方<rt>ほう</rt></ruby>がよくない？",
    english_translation: "A: I heard that you should eat fruit for breakfast, but peeling it is a hassle. B: Then canned food would be fine, wouldn't it? A: But isn't fresh fruit better?",
    annotated_words: [
      { meaning_en: "breakfast", furigana: "ちょうしょく", kanji: "朝食" },
      { meaning_en: "lunch", furigana: "ちゅうしょく", kanji: "昼食" },
      { meaning_en: "dinner", furigana: "ゆうしょく", kanji: "夕食" },
      { meaning_en: "fruit", furigana: "", kanji: "フルーツ" },
      { meaning_en: "skin", furigana: "かわ", kanji: "皮" },
      { meaning_en: "peel", furigana: "", kanji: "むく" },
      { meaning_en: "canned goods", furigana: "かんづめ", kanji: "缶詰" },
      { meaning_en: "fresh", furigana: "しんせん", kanji: "新鮮な" }
    ]
  },
  // Story 2 (🔊2) - Page 16
  {
    id: "16_2",
    title: "Topic 1",
    japanese_text: "<ruby>最近<rt>さいきん</rt></ruby>の<span class='annotated-word' data-word='冷凍食品'><ruby>冷凍<rt>れいとう</rt></ruby><ruby>食品<rt>しょくひん</rt></ruby></span>はとてもおいしい。<span class='annotated-word' data-word='手作り'><ruby>手作<rt>てづく</rt></ruby>り</span>の<ruby>料理<rt>りょうり</rt></ruby>と<span class='annotated-word' data-word='区別'><ruby>区別<rt>くべつ</rt></ruby></span>できない。それに、<span class='annotated-word' data-word='トレー'>トレー</span>を<ruby>分<rt>わ</rt></ruby>ければ、3<span class='annotated-word' data-word='～人分'><ruby>人分<rt>にんぶん</rt></ruby></span>とか1<ruby>人分<rt>ひとりぶん</rt></ruby>のように<ruby>必<rt>ひつ</rt></ruby><ruby>要<rt>よう</rt></ruby>な<span class='annotated-word' data-word='量'><ruby>量<rt>りょう</rt></ruby></span>だけを<ruby>使<rt>つか</rt></ruby>うことができる。",
    english_translation: "Frozen foods these days are very delicious. They are indistinguishable from homemade dishes. Besides, if you divide the tray, you can use only the amount you need, such as for three people or just one person.",
    annotated_words: [
      { meaning_en: "frozen food", furigana: "れいとうしょくひん", kanji: "冷凍食品" },
      { meaning_en: "freezing, freeze", furigana: "れいとう", kanji: "冷凍[する]" },
      { meaning_en: "handmade, make by hand", furigana: "てづく", kanji: "手作り[する]" },
      { meaning_en: "distinguishing, distinguish", furigana: "くべつ", kanji: "区別[する]" },
      { meaning_en: "tray", furigana: "", kanji: "トレー" },
      { meaning_en: "for ~ person/people", furigana: "にんぶん", kanji: "～人分" },
      { meaning_en: "amount", furigana: "りょう", kanji: "量" }
    ]
  },
  // Story 3 (🔊3) - Page 17
  {
    id: "17_1",
    title: "Topic 1",
    japanese_text: "A：あのう、<ruby>今日<rt>きょう</rt></ruby>の<span class='annotated-word' data-word='日替わり'><ruby>日替<rt>ひが</rt></ruby>わり</span><span class='annotated-word' data-word='定食'><ruby>定食<rt>ていしょく</rt></ruby></span>って<ruby>何<rt>なん</rt></ruby>ですか。<br>B：<span class='annotated-word' data-word='本日'><ruby>本日<rt>ほんじつ</rt></ruby></span>は、<span class='annotated-word' data-word='エビ'>エビ</span><span class='annotated-word' data-word='フライ'>フライ</span>と<span class='annotated-word' data-word='おかず'>おかず</span>が1つ、あとはご<ruby>飯<rt>はん</rt></ruby>と<span class='annotated-word' data-word='みそ'>みそ</span><span class='annotated-word' data-word='汁'><ruby>汁<rt>しる</rt></ruby></span>です。",
    english_translation: "A: Um, what's in the daily set meal? B: Today, we have fried shrimp and one side dish, and also rice and miso soup.",
    annotated_words: [
      { meaning_en: "daily", furigana: "ひがわり", kanji: "日替わり" },
      { meaning_en: "set meal", furigana: "ていしょく", kanji: "定食" },
      { meaning_en: "today", furigana: "ほんじつ", kanji: "本日" },
      { meaning_en: "shrimp", furigana: "", kanji: "エビ" },
      { meaning_en: "fried, fry", furigana: "", kanji: "フライ" },
      { meaning_en: "side dish", furigana: "", kanji: "おかず" },
      { meaning_en: "miso", furigana: "", kanji: "みそ" },
      { meaning_en: "soup", furigana: "しる", kanji: "汁" }
    ]
  },
  // Story 4 (🔊4) - Page 18
  {
    id: "18_1",
    title: "Topic 1",
    japanese_text: "A：<span class='annotated-word' data-word='お待たせしました'>お<ruby>待<rt>ま</rt></ruby>たせしました</span>。<span class='annotated-word' data-word='～風'><ruby>和風<rt>わふう</rt></ruby></span>ハンバーグでございます。<span class='annotated-word' data-word='ソース'>ソース</span>をかけて、お<span class='annotated-word' data-word='召し上がる'><ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がり</span>ください。<br>B：あ、どうぞ<span class='annotated-word' data-word='（お）先に'>お<ruby>先<rt>さき</rt></ruby>に</span>。<span class='annotated-word' data-word='（ご）遠慮なく'>ご<ruby>遠慮<rt>えんりょ</rt></ruby>なく</span>。<br>C：じゃあ、いただきます。",
    english_translation: "A: Thank you for your patience. Here is your Japanese-style hamburger steak. Please enjoy it with sauce. B: Oh, please go ahead. No need to hesitate. C: Then let's eat.",
    annotated_words: [
      { meaning_en: "(sorry to) keep you waiting", furigana: "ま", kanji: "お待たせしました" },
      { meaning_en: "I'm sorry to have kept you waiting", furigana: "ま", kanji: "お待ちどおさま" },
      { meaning_en: "~ style", furigana: "ふう", kanji: "～風" },
      { meaning_en: "sauce", furigana: "", kanji: "ソース" },
      { meaning_en: "eat, drink (honorific speech)", furigana: "めしあがる", kanji: "召し上がる" },
      { meaning_en: "after you", furigana: "さき", kanji: "（お）先に" },
      { meaning_en: "without hesitation, no need to hesitate", furigana: "えんりょ", kanji: "（ご）遠慮なく" }
    ]
  },
  // Story 5 (🔊5) - Pages 18-19
  {
    id: "18_2",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='焼肉'><ruby>焼肉<rt>やきにく</rt></ruby></span>の<span class='annotated-word' data-word='バイキング'>バイキング</span>は<span class='annotated-word' data-word='セルフサービス'>セルフサービス</span>ではなく、テーブルで<ruby>注文<rt>ちゅうもん</rt></ruby>するスタイルが<ruby>多<rt>おお</rt></ruby>い。<ruby>肉<rt>にく</rt></ruby><ruby>以外<rt>いがい</rt></ruby>にも、<span class='annotated-word' data-word='ライス'>ライス</span>、<span class='annotated-word' data-word='スープ'>スープ</span>、<span class='annotated-word' data-word='デザート'>デザート</span>などが<ruby>注文<rt>ちゅうもん</rt></ruby>できる。もちろん、<span class='annotated-word' data-word='残す'><ruby>残<rt>のこ</rt></ruby>す</span>してはいけない。",
    english_translation: "Yakiniku buffet is not self-service, but is often ordered at the table. Besides meat, you can order rice, soup, dessert and more. Of course, you must not leave any leftovers.",
    annotated_words: [
      { meaning_en: "yakiniku, Korean bbq", furigana: "やきにく", kanji: "焼肉" },
      { meaning_en: "buffet, all-you-can-eat", furigana: "", kanji: "バイキング" },
      { meaning_en: "self service", furigana: "", kanji: "セルフサービス" },
      { meaning_en: "rice", furigana: "", kanji: "ライス" },
      { meaning_en: "soup", furigana: "", kanji: "スープ" },
      { meaning_en: "dessert", furigana: "", kanji: "デザート" },
      { meaning_en: "leave", furigana: "のこす", kanji: "残す" }
    ]
  },
  // Story 6 (🔊6) - Page 19
  {
    id: "19_1",
    title: "Topic 1",
    japanese_text: "A：あ、その<ruby>肉<rt>にく</rt></ruby>、<ruby>早<rt>はや</rt></ruby>く<span class='annotated-word' data-word='ひっくり返す'>ひっくり<ruby>返<rt>かえ</rt></ruby>す</span>して。これもこれも。<br>B：うわ、<ruby>肉<rt>にく</rt></ruby>が<span class='annotated-word' data-word='燃えた'><ruby>燃<rt>も</rt></ruby>えた</span>！　どうしよう！<br>A：あー、そういうときは、この<span class='annotated-word' data-word='氷'><ruby>氷<rt>こおり</rt></ruby></span>を<ruby>網<rt>あみ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>せればいいんだ。<ruby>網<rt>あみ</rt></ruby>が<ruby>汚<rt>よご</rt></ruby>れちゃったね。<span class='annotated-word' data-word='取り替えて'><ruby>取<rt>と</rt></ruby>り<ruby>替<rt>か</rt></ruby>えて</span>もらおう。",
    english_translation: "A: Oh, that meat, hurry up and turn it over. This one and this one too. B: Wow, the meat burned! What should I do! A: Ah, in that case, just put this ice on the net. The net got dirty. Let's have it replaced.",
    annotated_words: [
      { meaning_en: "turn over", furigana: "ひっくりかえす", kanji: "ひっくり返す" },
      { meaning_en: "be turned over", furigana: "ひっくりかえる", kanji: "ひっくり返る" },
      { meaning_en: "burn, be burned", furigana: "もえる", kanji: "燃える" },
      { meaning_en: "burn", furigana: "もやす", kanji: "燃やす" },
      { meaning_en: "ice", furigana: "こおり", kanji: "氷" },
      { meaning_en: "replace", furigana: "とりかえる", kanji: "取り替える" }
    ]
  },
  // Story 7 (🔊7) - Page 20
  {
    id: "20_1",
    title: "Topic 1",
    japanese_text: "この<ruby>店<rt>みせ</rt></ruby>のラーメンはとても<ruby>味<rt>あじ</rt></ruby>が<span class='annotated-word' data-word='濃い'><ruby>濃<rt>こ</rt></ruby>い</span>、スープの<span class='annotated-word' data-word='表面'><ruby>表面<rt>ひょうめん</rt></ruby></span>には<span class='annotated-word' data-word='油'><ruby>油<rt>あぶら</rt></ruby></span>が<ruby>浮<rt>う</rt></ruby>いている。しかし、<span class='annotated-word' data-word='のり'>のり</span>とご<ruby>飯<rt>はん</rt></ruby>と<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>食<rt>た</rt></ruby>べるとうまい。",
    english_translation: "The ramen in this shop has a very strong taste, and oil floats on the surface of the soup. However, it is good to eat it with seaweed and rice.",
    annotated_words: [
      { meaning_en: "rich, strong", furigana: "こい", kanji: "濃い" },
      { meaning_en: "bland", furigana: "うすい", kanji: "薄い" },
      { meaning_en: "surface", furigana: "ひょうめん", kanji: "表面" },
      { meaning_en: "oil", furigana: "あぶら", kanji: "油" },
      { meaning_en: "salad oil", furigana: "あぶら", kanji: "サラダ油" },
      { meaning_en: "seaweed", furigana: "", kanji: "のり" }
    ]
  },
  // Story 8 (🔊8) - Page 20
  {
    id: "20_2",
    title: "Topic 1",
    japanese_text: "<ruby>納豆<rt>なっとう</rt></ruby>は<span class='annotated-word' data-word='匂い／臭い'><ruby>匂<rt>にお</rt></ruby>い</span>を<span class='annotated-word' data-word='嫌がる'><ruby>嫌<rt>いや</rt></ruby>がる</span><ruby>人<rt>ひと</rt></ruby>も<ruby>多<rt>おお</rt></ruby>いですが、<ruby>慣<rt>な</rt></ruby>れると<span class='annotated-word' data-word='平気な'><ruby>平気<rt>へいき</rt></ruby></span>になります。<span class='annotated-word' data-word='ねばねば'>ねばねば</span>していますが、<span class='annotated-word' data-word='腐る'><ruby>腐<rt>くさ</rt></ruby>っている</span>わけではないですよ。",
    english_translation: "Many people don't like the smell of natto, but once you get used to it, you'll be fine. It's sticky, but it's not rotten.",
    annotated_words: [
      { meaning_en: "odor/stench", furigana: "におい", kanji: "匂い／臭い" },
      { meaning_en: "be fragrant/stink", furigana: "におう", kanji: "匂う／臭う" },
      { meaning_en: "dislike", furigana: "いやがる", kanji: "嫌がる" },
      { meaning_en: "fine, calm", furigana: "へいき", kanji: "平気な" },
      { meaning_en: "stickiness, be sticky", furigana: "", kanji: "ねばねば[する]" },
      { meaning_en: "rot, go bad", furigana: "くさる", kanji: "腐る" }
    ]
  },
  // Story 9 (🔊9) - Page 21
  {
    id: "21_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='ドレッシング'>ドレッシング</span>を<ruby>作<rt>つく</rt></ruby>るのは<ruby>簡単<rt>かんたん</rt></ruby>だ。オリーブ<span class='annotated-word' data-word='オイル'>オイル</span>と<span class='annotated-word' data-word='酢'><ruby>酢<rt>す</rt></ruby></span>をよく<span class='annotated-word' data-word='混ぜる'><ruby>混<rt>ま</rt></ruby>ぜて</span>、<ruby>好<rt>この</rt></ruby>みで<ruby>塩<rt>しお</rt></ruby>・<span class='annotated-word' data-word='こしょう'>こしょう</span>を<ruby>入<rt>い</rt></ruby>れる。これでサラダをおいしく<ruby>食<rt>た</rt></ruby>べられる。",
    english_translation: "Making a dressing is easy. Mix olive oil and vinegar thoroughly and add salt and pepper as you like. Now you can eat the great-tasting salad.",
    annotated_words: [
      { meaning_en: "dressing", furigana: "", kanji: "ドレッシング" },
      { meaning_en: "oil", furigana: "", kanji: "オイル" },
      { meaning_en: "vinegar", furigana: "す", kanji: "酢" },
      { meaning_en: "mix", furigana: "まぜる", kanji: "混ぜる" },
      { meaning_en: "be mixed", furigana: "まざる", kanji: "混ざる" },
      { meaning_en: "pepper", furigana: "", kanji: "こしょう" }
    ]
  },
  // Story 10 (🔊10) - Page 21
  {
    id: "21_2",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='腹'><ruby>腹<rt>はら</rt></ruby></span>が<ruby>痛<rt>いた</rt></ruby>い。<span class='annotated-word' data-word='レバー'>レバー</span>を<span class='annotated-word' data-word='生'><ruby>生<rt>なま</rt></ruby></span>で<ruby>食<rt>た</rt></ruby>べたのが<ruby>原因<rt>げんいん</rt></ruby>だろうか。<span class='annotated-word' data-word='それとも'>それとも</span><span class='annotated-word' data-word='貝'><ruby>貝<rt>かい</rt></ruby></span>だろうか。",
    english_translation: "I have a stomachache. Is it because I ate some liver raw? Or was it the shellfish?",
    annotated_words: [
      { meaning_en: "stomach", furigana: "はら", kanji: "腹" },
      { meaning_en: "liver", furigana: "", kanji: "レバー" },
      { meaning_en: "raw", furigana: "なま", kanji: "生" },
      { meaning_en: "or", furigana: "", kanji: "それとも" },
      { meaning_en: "shell", furigana: "かい", kanji: "貝" }
    ]
  }
];

// Write each story to a JSON file
for (const story of stories) {
  const filePath = path.join(outDir, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Generated ${story.id}.json`);
}
console.log(`\nDone! Generated ${stories.length} stories for Topic 1 (Part 1).`);
