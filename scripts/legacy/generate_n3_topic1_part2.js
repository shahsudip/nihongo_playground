import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

const stories = [
  // Story 11 (🔊11) - Page 22
  {
    id: "22_1",
    title: "Topic 1",
    japanese_text: "A：<ruby>最近<rt>さいきん</rt></ruby><ruby>暑<rt>あつ</rt></ruby>すぎて、<span class='annotated-word' data-word='食欲'><ruby>食欲<rt>しょくよく</rt></ruby></span>がないんだよねえ。<span class='annotated-word' data-word='さっぱりした'>さっぱりした</span>ものが<ruby>食<rt>た</rt></ruby>べたい。<ruby>冷<rt>つめ</rt></ruby>たい<span class='annotated-word' data-word='そば'>そば</span>にしようかな。<br>B：あ、なんか<span class='annotated-word' data-word='酸っぱい'><ruby>酸<rt>す</rt></ruby>っぱい</span>ものもいいらしいよ。",
    english_translation: "A: It's been too hot lately, and I have no appetite. I want to eat refreshing food. Maybe I should make some cold soba. B: Oh, something sour is good too, I hear.",
    annotated_words: [
      { meaning_en: "appetite", furigana: "しょくよく", kanji: "食欲" },
      { meaning_en: "refreshing, refresh", furigana: "", kanji: "さっぱり[する]" },
      { meaning_en: "soba, buckwheat noodles", furigana: "", kanji: "そば" },
      { meaning_en: "udon, thick noodles", furigana: "", kanji: "うどん" },
      { meaning_en: "sour", furigana: "すっぱい", kanji: "酸っぱい" }
    ]
  },
  // Story 12 (🔊12) - Page 22
  {
    id: "22_2",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='ワイン'>ワイン</span>は<ruby>温度<rt>おんど</rt></ruby>の<span class='annotated-word' data-word='管理'><ruby>管理<rt>かんり</rt></ruby></span>が<ruby>重要<rt>じゅうよう</rt></ruby>だ。<ruby>気<rt>き</rt></ruby>をつけないと、すぐに<span class='annotated-word' data-word='ぬるい'>ぬるく</span>なってしまう。<span class='annotated-word' data-word='ぬるい'>ぬるい</span>ワインはおいしくない。また、ワインを<ruby>飲<rt>の</rt></ruby>む<ruby>前<rt>まえ</rt></ruby>にグラスを<span class='annotated-word' data-word='回す'><ruby>回<rt>まわ</rt></ruby>す</span>と、<ruby>香<rt>かお</rt></ruby>りがよくなる。",
    english_translation: "With wine, it is important to control the temperature. If you're not careful, the wine will get tepid. Tepid wine is not delicious. Also, by swirling the glass before drinking wine, the scent will improve.",
    annotated_words: [
      { meaning_en: "wine", furigana: "", kanji: "ワイン" },
      { meaning_en: "management, manage", furigana: "かんり", kanji: "管理[する]" },
      { meaning_en: "tepid, lukewarm", furigana: "", kanji: "ぬるい" },
      { meaning_en: "swirl, turn", furigana: "まわす", kanji: "回す" }
    ]
  },
  // Story 13 (🔊13) - Page 23
  {
    id: "23_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='カップル'>カップル</span><ruby>用<rt>よう</rt></ruby>の<span class='annotated-word' data-word='ストロー'>ストロー</span>というものがある。<span class='annotated-word' data-word='片方'><ruby>片方<rt>かたほう</rt></ruby></span>は<ruby>普通<rt>ふつう</rt></ruby>のストローだが、もう<ruby>片方<rt>かたほう</rt></ruby>は2つに<ruby>分<rt>わ</rt></ruby>かれていて、2<ruby>人<rt>ふたり</rt></ruby>が<ruby>同時<rt>どうじ</rt></ruby>に<ruby>飲<rt>の</rt></ruby>むことができる。<ruby>途中<rt>とちゅう</rt></ruby>が<span class='annotated-word' data-word='ハート'>ハート</span>の<ruby>形<rt>かたち</rt></ruby>になっていることもある。<ruby>使<rt>つか</rt></ruby>ってみたいが、<span class='annotated-word' data-word='人前'><ruby>人前<rt>ひとまえ</rt></ruby></span>で<ruby>使<rt>つか</rt></ruby>うのは<ruby>恥<rt>は</rt></ruby>ずかしい。",
    english_translation: "There is a straw made specifically for couples. On one end, it is a normal straw, but the other is divided into two straws, so two people can drink at the same time. The middle may be in the form of a heart. I want to try using it, but it would be embarrassing using it in front of people.",
    annotated_words: [
      { meaning_en: "couple", furigana: "", kanji: "カップル" },
      { meaning_en: "straw", furigana: "", kanji: "ストロー" },
      { meaning_en: "one side", furigana: "かたほう", kanji: "片方" },
      { meaning_en: "heart", furigana: "", kanji: "ハート" },
      { meaning_en: "public", furigana: "ひとまえ", kanji: "人前" }
    ]
  },
  // Story 14 (🔊14) - Page 24
  {
    id: "24_1",
    title: "Topic 1",
    japanese_text: "A：<span class='annotated-word' data-word='忘年会'><ruby>忘年会<rt>ぼうねんかい</rt></ruby></span>のお<ruby>店<rt>みせ</rt></ruby>、「<ruby>梅<rt>うめ</rt></ruby>の<ruby>花<rt>はな</rt></ruby>」はどうかな？<br>B：え、どこですか。<br>A：<ruby>知<rt>し</rt></ruby>らない？　<ruby>駅<rt>えき</rt></ruby>の<ruby>北<rt>きた</rt></ruby><span class='annotated-word' data-word='～口'><ruby>口<rt>ぐち</rt></ruby></span>にある<ruby>居酒屋<rt>いざかや</rt></ruby>。<br>B：<ruby>分<rt>わ</rt></ruby>かりました。<span class='annotated-word' data-word='押さえます'><ruby>押<rt>お</rt></ruby>さえます</span>。<span class='annotated-word' data-word='乾杯'><ruby>乾杯<rt>かんぱい</rt></ruby></span>のあいさつは<ruby>部長<rt>ぶちょう</rt></ruby>にお<ruby>願<rt>ねが</rt></ruby>いするつもりです。",
    english_translation: "A: How about having our year-end party at that restaurant called Ume no Hana? B: Where is it? A: You don't know? It's a pub at the north exit of the station. B: I got it. I'll make a reservation. I plan on asking the department chief to give a toast.",
    annotated_words: [
      { meaning_en: "year-end party", furigana: "ぼうねんかい", kanji: "忘年会" },
      { meaning_en: "New Year's party", furigana: "しんねんかい", kanji: "新年会" },
      { meaning_en: "~ entrance, exit", furigana: "ぐち", kanji: "～口" },
      { meaning_en: "make a reservation, hold down", furigana: "おさえる", kanji: "押さえる" },
      { meaning_en: "toast, make a toast", furigana: "かんぱい", kanji: "乾杯[する]" }
    ]
  },
  // Story 15 (🔊15) - Pages 24-25
  {
    id: "24_2",
    title: "Topic 1",
    japanese_text: "<ruby>先輩<rt>せんぱい</rt></ruby>の<span class='annotated-word' data-word='送別会'><ruby>送別会<rt>そうべつかい</rt></ruby></span>が、<ruby>高<rt>たか</rt></ruby>そうな<span class='annotated-word' data-word='西洋'><ruby>西洋<rt>せいよう</rt></ruby></span><span class='annotated-word' data-word='料理店'><ruby>料理店<rt>りょうりてん</rt></ruby></span>で<ruby>開<rt>ひら</rt></ruby>かれた。テーブルにたくさんの<ruby>食器<rt>しょっき</rt></ruby>と<span class='annotated-word' data-word='ナプキン'>ナプキン</span>が<ruby>置<rt>お</rt></ruby>かれていて、<ruby>見<rt>み</rt></ruby>るだけで<ruby>緊張<rt>きんちょう</rt></ruby>してしまった。<ruby>見<rt>み</rt></ruby>たことがない<span class='annotated-word' data-word='ごちそう'>ごちそう</span>だったが、<ruby>緊張<rt>きんちょう</rt></ruby>しすぎて<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>食<rt>た</rt></ruby>べられず、<span class='annotated-word' data-word='もったいない'>もったいなかった</span>。",
    english_translation: "A farewell party for our senior was held at an expensive-looking Western-style restaurant. There were a lot of tableware and napkins on the table, and I got nervous just from looking at them. It was a feast like I had never seen before, but I was too nervous to eat everything, which was a waste.",
    annotated_words: [
      { meaning_en: "farewell party", furigana: "そうべつかい", kanji: "送別会" },
      { meaning_en: "Western", furigana: "せいよう", kanji: "西洋" },
      { meaning_en: "~ store", furigana: "てん", kanji: "～店" },
      { meaning_en: "napkin", furigana: "", kanji: "ナプキン" },
      { meaning_en: "feast", furigana: "", kanji: "ごちそう" },
      { meaning_en: "treat (someone) to a meal", furigana: "", kanji: "ごちそうする" },
      { meaning_en: "wasteful", furigana: "", kanji: "もったいない" }
    ]
  },
  // Story 16 (🔊16) - Page 25
  {
    id: "25_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='ガム'>ガム</span>は、<span class='annotated-word' data-word='栄養'><ruby>栄養<rt>えいよう</rt></ruby></span>がほとんどないが、<ruby>虫歯<rt>むしば</rt></ruby>の<ruby>予防<rt>よぼう</rt></ruby>や<ruby>集中力<rt>しゅうちゅうりょく</rt></ruby>を<ruby>高<rt>たか</rt></ruby>める<ruby>効果<rt>こうか</rt></ruby>があり、<ruby>毎日<rt>まいにち</rt></ruby>かんでいる<ruby>人<rt>ひと</rt></ruby>も<ruby>多<rt>おお</rt></ruby>い。しかし、<span class='annotated-word' data-word='ポイ捨て'>ポイ<ruby>捨<rt>す</rt></ruby>て</span>が<ruby>問題<rt>もんだい</rt></ruby>になる。<ruby>外出<rt>がいしゅつ</rt></ruby>するときは、<span class='annotated-word' data-word='包み紙'><ruby>包<rt>つつ</rt></ruby>み<ruby>紙<rt>がみ</rt></ruby></span>を<ruby>忘<rt>わす</rt></ruby>れないようにしたい。",
    english_translation: "Gum has little nutrition, but it has the effect of preventing cavities and increasing concentration, and many people chew it every day. However, littering is a problem. When going out, try not to forget to bring wrapping paper.",
    annotated_words: [
      { meaning_en: "gum", furigana: "", kanji: "ガム" },
      { meaning_en: "nutrition", furigana: "えいよう", kanji: "栄養" },
      { meaning_en: "littering, litter, toss away", furigana: "ポイすて", kanji: "ポイ捨て[する]" },
      { meaning_en: "wrapping paper", furigana: "つつみがみ", kanji: "包み紙" }
    ]
  },
  // Story 17 (🔊17) - Page 26
  {
    id: "26_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='飲み会'><ruby>飲<rt>の</rt></ruby>み<ruby>会<rt>かい</rt></ruby></span>で、<span class='annotated-word' data-word='割り勘'><ruby>割<rt>わ</rt></ruby>り<ruby>勘<rt>かん</rt></ruby></span>だったのに、<span class='annotated-word' data-word='酔って'><ruby>酔<rt>よ</rt></ruby>って</span>しまってお<ruby>金<rt>かね</rt></ruby>を<ruby>払<rt>はら</rt></ruby>わずに<ruby>帰<rt>かえ</rt></ruby>ってしまった。<span class='annotated-word' data-word='翌日'><ruby>翌日<rt>よくじつ</rt></ruby></span>、<ruby>注意<rt>ちゅうい</rt></ruby>されたのでお<ruby>金<rt>かね</rt></ruby>を<ruby>払<rt>はら</rt></ruby>った。",
    english_translation: "At the drinking party, we split the bill, but I got drunk and went home without paying. The next day, they cautioned me, and I paid.",
    annotated_words: [
      { meaning_en: "drinking party", furigana: "のみかい", kanji: "飲み会" },
      { meaning_en: "splitting the bill, split the bill", furigana: "わりかん", kanji: "割り勘[する]" },
      { meaning_en: "become intoxicated, get drunk", furigana: "よう", kanji: "酔う" },
      { meaning_en: "next day", furigana: "よくじつ", kanji: "翌日" }
    ]
  },
  // Story 18 (🔊18) - Page 26
  {
    id: "26_2",
    title: "Topic 1",
    japanese_text: "おいしいと<span class='annotated-word' data-word='評判'><ruby>評判<rt>ひょうばん</rt></ruby></span>のラーメン<ruby>屋<rt>や</rt></ruby>。<ruby>日本中<rt>にほんじゅう</rt></ruby>に<ruby>店<rt>みせ</rt></ruby>があるが、<span class='annotated-word' data-word='本店'><ruby>本店<rt>ほんてん</rt></ruby></span>は<ruby>特<rt>とく</rt></ruby>に<ruby>人気<rt>にんき</rt></ruby>が<ruby>高<rt>たか</rt></ruby>く、<span class='annotated-word' data-word='わざわざ'>わざわざ</span><ruby>隣<rt>となり</rt></ruby>の<ruby>県<rt>けん</rt></ruby>から<ruby>来<rt>く</rt></ruby>る<ruby>客<rt>きゃく</rt></ruby>もいる。<ruby>店<rt>みせ</rt></ruby>は<span class='annotated-word' data-word='細長い'><ruby>細長<rt>ほそなが</rt></ruby>く</span>、<ruby>大勢<rt>おおぜい</rt></ruby>の<ruby>客<rt>きゃく</rt></ruby>が<ruby>入<rt>はい</rt></ruby>れないので、<ruby>店<rt>みせ</rt></ruby>の<ruby>外<rt>そと</rt></ruby>にはいつも<span class='annotated-word' data-word='行列'><ruby>行列<rt>ぎょうれつ</rt></ruby></span>ができている。",
    english_translation: "This is a ramen shop with a reputation for its food being delicious. It has branches all over Japan, but the main store is particularly popular, and some customers come all the way from neighboring prefectures. The store is long and narrow and cannot accommodate a large number of customers, so there are always lines outside the store.",
    annotated_words: [
      { meaning_en: "reputation", furigana: "ひょうばん", kanji: "評判" },
      { meaning_en: "main store", furigana: "ほんてん", kanji: "本店" },
      { meaning_en: "main office, headquarters", furigana: "ほんしゃ", kanji: "本社" },
      { meaning_en: "take the trouble", furigana: "", kanji: "わざわざ" },
      { meaning_en: "long and narrow", furigana: "ほそながい", kanji: "細長い" },
      { meaning_en: "ranks, line", furigana: "ぎょうれつ", kanji: "行列" }
    ]
  },
  // Story 19 (🔊19) - Page 27
  {
    id: "27_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='食品'><ruby>食品<rt>しょくひん</rt></ruby></span>の<span class='annotated-word' data-word='産地'><ruby>産地<rt>さんち</rt></ruby></span>を<ruby>気<rt>き</rt></ruby>にする<ruby>人<rt>ひと</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えてきた。<span class='annotated-word' data-word='基本的な'><ruby>基本的<rt>きほんてき</rt></ruby>な</span>には<span class='annotated-word' data-word='国産'><ruby>国産<rt>こくさん</rt></ruby></span>のものの<ruby>方<rt>ほう</rt></ruby>が<span class='annotated-word' data-word='品質'><ruby>品質<rt>ひんしつ</rt></ruby></span>も<ruby>値段<rt>ねだん</rt></ruby>も<ruby>高<rt>たか</rt></ruby>い。そのため、<ruby>海外<rt>かいがい</rt></ruby><span class='annotated-word' data-word='～産'><ruby>産<rt>さん</rt></ruby></span>の<ruby>食品<rt>しょくひん</rt></ruby>に、「<ruby>国産<rt>こくさん</rt></ruby>」の<span class='annotated-word' data-word='ラベル'>ラベル</span>を<ruby>貼<rt>は</rt></ruby>る<ruby>事件<rt>じけん</rt></ruby>も<ruby>起<rt>お</rt></ruby>きた。",
    english_translation: "An increasing number of people are concerned about the production areas of their food. Generally, domestic products are higher in quality and price. As a result, there have been cases where overseas food products are labeled as \"domestic.\"",
    annotated_words: [
      { meaning_en: "food", furigana: "しょくひん", kanji: "食品" },
      { meaning_en: "production area", furigana: "さんち", kanji: "産地" },
      { meaning_en: "basic, general", furigana: "きほんてき", kanji: "基本的な" },
      { meaning_en: "basics", furigana: "きほん", kanji: "基本" },
      { meaning_en: "domestic product", furigana: "こくさん", kanji: "国産" },
      { meaning_en: "quality", furigana: "ひんしつ", kanji: "品質" },
      { meaning_en: "made in ~, from ~", furigana: "さん", kanji: "～産" },
      { meaning_en: "label", furigana: "", kanji: "ラベル" }
    ]
  }
];

// Write each story to a JSON file
for (const story of stories) {
  const filePath = path.join(outDir, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Generated ${story.id}.json`);
}
console.log(`\nDone! Generated ${stories.length} stories for Topic 1 (Part 2).`);
