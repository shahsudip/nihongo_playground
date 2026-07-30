const fs = require('fs');
const path = require('path');

const topic10_stories = [
  {
    id: "140_1",
    title: "Topic 10",
    japanese_text: "<ruby>今<rt>いま</rt></ruby><ruby>住<rt>す</rt></ruby>んでいるマンションのベランダは<ruby>南向<rt>みなみむ</rt></ruby>きで、<ruby>日当<rt>ひあ</rt></ruby>たりがいい。<ruby>和室<rt>わしつ</rt></ruby>だけではなく、<ruby>洋室<rt>ようしつ</rt></ruby>も<ruby>立派<rt>りっぱ</rt></ruby>だ。しかもエントランスホールが<ruby>広<rt>ひろ</rt></ruby>い。",
    english_translation: "The balcony of the apartment I'm living in now is south facing and sunny. Both its Japanese-style room and Western-style room are splendid. Moreover, the entrance hall is spacious.",
    annotated_words: [
      { kanji: "マンション", furigana: "", meaning: "apartment" },
      { kanji: "ベランダ", furigana: "", meaning: "balcony" },
      { kanji: "〜向き", furigana: "〜むき", meaning: "facing" },
      { kanji: "日当たり", furigana: "ひあたり", meaning: "sunlight" },
      { kanji: "和室", furigana: "わしつ", meaning: "Japanese-style room" },
      { kanji: "洋室", furigana: "ようしつ", meaning: "Western-style room" },
      { kanji: "立派な", furigana: "りっぱな", meaning: "splendid" },
      { kanji: "ホール", furigana: "", meaning: "hall" }
    ]
  },
  {
    id: "140_2",
    title: "Topic 10",
    japanese_text: "<ruby>家<rt>いえ</rt></ruby>の<ruby>壁<rt>かべ</rt></ruby>の<ruby>色<rt>いろ</rt></ruby>を<ruby>塗<rt>ぬ</rt></ruby>り<ruby>直<rt>なお</rt></ruby>し、<ruby>門<rt>もん</rt></ruby>の<ruby>電球<rt>でんきゅう</rt></ruby>を<ruby>取<rt>と</rt></ruby>り<ruby>替<rt>か</rt></ruby>えたら、<ruby>明<rt>あか</rt></ruby>るくなった。",
    english_translation: "I repainted the walls of my house and changed the light bulbs at the gate and it got brighter.",
    annotated_words: [
      { kanji: "塗る", furigana: "ぬる", meaning: "paint" },
      { kanji: "門", furigana: "もん", meaning: "gate" },
      { kanji: "電球", furigana: "でんきゅう", meaning: "light bulb" }
    ]
  },
  {
    id: "141_1",
    title: "Topic 10",
    japanese_text: "<ruby>寮<rt>りょう</rt></ruby>のリビングは<ruby>狭<rt>せま</rt></ruby>く、ソファーを<ruby>斜<rt>なな</rt></ruby>めにしか<ruby>置<rt>お</rt></ruby>けない。しかし、<ruby>低家賃<rt>ていやちん</rt></ruby>なので、わがままは<ruby>言<rt>い</rt></ruby>えない。<ruby>我慢<rt>がまん</rt></ruby>するしかない。",
    english_translation: "The dorm living room is cramped and the sofa can only be arranged diagonally. However, it's low rent, so I can't complain. I've no choice but to bear it.",
    annotated_words: [
      { kanji: "寮", furigana: "りょう", meaning: "dorm, dormitory" },
      { kanji: "リビング", furigana: "", meaning: "living room" },
      { kanji: "ソファー", furigana: "", meaning: "sofa" },
      { kanji: "斜め", furigana: "ななめ", meaning: "diagonal" },
      { kanji: "低〜", furigana: "てい〜", meaning: "low ~" },
      { kanji: "家賃", furigana: "やちん", meaning: "rent" },
      { kanji: "わがまま", furigana: "", meaning: "complaining" },
      { kanji: "我慢［する］", furigana: "がまん", meaning: "bearing, enduring, bear, endure" }
    ]
  },
  {
    id: "141_2",
    title: "Topic 10",
    japanese_text: "この<ruby>家<rt>いえ</rt></ruby>は、<ruby>大都市<rt>だいとし</rt></ruby>にも<ruby>地方都市<rt>ちほうとし</rt></ruby>にも<ruby>距離<rt>きょり</rt></ruby>が<ruby>近<rt>ちか</rt></ruby>い。<ruby>最高<rt>さいこう</rt></ruby>だ。",
    english_translation: "This house is close in distance to both a large city and the local cities. It's the best.",
    annotated_words: [
      { kanji: "都市", furigana: "とし", meaning: "city" },
      { kanji: "地方都市", furigana: "ちほうとし", meaning: "local city" },
      { kanji: "地方", furigana: "ちほう", meaning: "region" },
      { kanji: "距離", furigana: "きょり", meaning: "distance" },
      { kanji: "最高", furigana: "さいこう", meaning: "best" }
    ]
  },
  {
    id: "142_1",
    title: "Topic 10",
    japanese_text: "<ruby>出勤<rt>しゅっきん</rt></ruby>する<ruby>途中<rt>とちゅう</rt></ruby>、<ruby>踏切<rt>ふみきり</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>で<ruby>車<rt>くるま</rt></ruby>が<ruby>動<rt>うご</rt></ruby>かなくなった。<ruby>近<rt>ちか</rt></ruby>くに<ruby>住民<rt>じゅうみん</rt></ruby>はいない。<ruby>確<rt>たし</rt></ruby>か、<ruby>近<rt>ちか</rt></ruby>くに<ruby>消防署<rt>しょうぼうしょ</rt></ruby>があったはずだ。のんびりしてはいられない。<ruby>行<rt>い</rt></ruby>ってみよう。",
    english_translation: "While commuting to work, my car stopped moving right in front of a railroad crossing. There are no residents nearby. I'm sure there was a fire station nearby. I can't just sit around. Let's go and see.",
    annotated_words: [
      { kanji: "出勤［する］", furigana: "しゅっきん", meaning: "commuting to work, commute to work" },
      { kanji: "踏切", furigana: "ふみきり", meaning: "railroad crossing" },
      { kanji: "住民", furigana: "じゅうみん", meaning: "resident" },
      { kanji: "確か", furigana: "たしか", meaning: "sure, certain" },
      { kanji: "消防署", furigana: "しょうぼうしょ", meaning: "fire department" },
      { kanji: "消防車", furigana: "しょうぼうしゃ", meaning: "fire engine" },
      { kanji: "消防士", furigana: "しょうぼうし", meaning: "firefighter" },
      { kanji: "のんびりする", furigana: "", meaning: "sit around, take it easy" }
    ]
  },
  {
    id: "142_2",
    title: "Topic 10",
    japanese_text: "<ruby>向<rt>む</rt></ruby>かいの<ruby>幼稚園<rt>ようちえん</rt></ruby>はたびたび<ruby>工事<rt>こうじ</rt></ruby>をする。うるさくて、<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>もリラックスして<ruby>過<rt>す</rt></ruby>ごせない。<ruby>早<rt>はや</rt></ruby>く<ruby>終了<rt>しゅうりょう</rt></ruby>してほしい。",
    english_translation: "The kindergarten on the other side of the street frequently undergoes construction. It's so loud I can't even relax on my days off. I hope its ends soon.",
    annotated_words: [
      { kanji: "向かい", furigana: "むかい", meaning: "opposite" },
      { kanji: "幼稚園", furigana: "ようちえん", meaning: "kindergarten" },
      { kanji: "たびたび", furigana: "", meaning: "frequently" },
      { kanji: "工事［する］", furigana: "こうじ", meaning: "construction, undergo construction" },
      { kanji: "工事現場", furigana: "こうじげんば", meaning: "construction site" },
      { kanji: "リラックス［する］", furigana: "", meaning: "relaxing, relax" },
      { kanji: "過ごす", furigana: "すごす", meaning: "spend" },
      { kanji: "終了［する］", furigana: "しゅうりょう", meaning: "end, finish" }
    ]
  },
  {
    id: "143_1",
    title: "Topic 10",
    japanese_text: "この<ruby>電車<rt>でんしゃ</rt></ruby>は<ruby>発車時刻<rt>はっしゃじこく</rt></ruby>を<ruby>過<rt>す</rt></ruby>ぎても<ruby>動<rt>うご</rt></ruby>かない。<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いてよく<ruby>見<rt>み</rt></ruby>ると、<ruby>行<rt>い</rt></ruby>き<ruby>先<rt>さき</rt></ruby>も<ruby>表示<rt>ひょうじ</rt></ruby>していないし、ライトも<ruby>消<rt>き</rt></ruby>えている。<ruby>車庫<rt>しゃこ</rt></ruby>に<ruby>行<rt>い</rt></ruby>くのだろうか。なかなか<ruby>帰宅<rt>きたく</rt></ruby>できない。",
    english_translation: "This train isn't moving even though it's past its departure time. After calmly looking around, I noticed that the destination wasn't even displayed and the lights were off. It might be going to the depot. I'm having a hard time getting home.",
    annotated_words: [
      { kanji: "時刻", furigana: "じこく", meaning: "time" },
      { kanji: "時刻表", furigana: "じこくひょう", meaning: "time table" },
      { kanji: "過ぎる", furigana: "すぎる", meaning: "pass, exceed" },
      { kanji: "落ち着く", furigana: "おちつく", meaning: "calm down" },
      { kanji: "行き先", furigana: "いきさき", meaning: "destination" },
      { kanji: "ライト", furigana: "", meaning: "light" },
      { kanji: "車庫", furigana: "しゃこ", meaning: "depot" },
      { kanji: "帰宅［する］", furigana: "きたく", meaning: "going home, go home" }
    ]
  },
  {
    id: "144_1",
    title: "Topic 10",
    japanese_text: "<ruby>都会<rt>とかい</rt></ruby><ruby>生<rt>う</rt></ruby>まれの<ruby>私<rt>わたし</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>は、いつか<ruby>土地<rt>とち</rt></ruby>を<ruby>買<rt>か</rt></ruby>い、<ruby>畑<rt>はたけ</rt></ruby>で<ruby>近所<rt>きんじょ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>分<rt>わ</rt></ruby>けられる<ruby>程度<rt>ていど</rt></ruby>の<ruby>野菜<rt>やさい</rt></ruby>または<ruby>果物<rt>くだもの</rt></ruby>を<ruby>作<rt>つく</rt></ruby>ることだ。",
    english_translation: "Having been born in the city, it's my dream to someday buy some land and raise enough vegetables or even fruit to share with the people living nearby.",
    annotated_words: [
      { kanji: "都会", furigana: "とかい", meaning: "urban" },
      { kanji: "〜生まれ", furigana: "〜うまれ", meaning: "born" },
      { kanji: "いつか", furigana: "", meaning: "someday" },
      { kanji: "土地", furigana: "とち", meaning: "land" },
      { kanji: "畑", furigana: "はたけ", meaning: "field" },
      { kanji: "程度", furigana: "ていど", meaning: "enough, degree" },
      { kanji: "または", furigana: "", meaning: "or" }
    ]
  },
  {
    id: "144_2",
    title: "Topic 10",
    japanese_text: "<ruby>昨日<rt>きのう</rt></ruby>の<ruby>大雪<rt>おおゆき</rt></ruby>のせいで、<ruby>首都<rt>しゅと</rt></ruby><ruby>高速道路<rt>こうそくどうろ</rt></ruby>の<ruby>出入口<rt>でいりぐち</rt></ruby>で<ruby>事故<rt>じこ</rt></ruby>があった。パトカーや<ruby>救急車<rt>きゅうきゅうしゃ</rt></ruby>が<ruby>集<rt>あつ</rt></ruby>まっている。けが<ruby>人<rt>にん</rt></ruby>がいないことを<ruby>願<rt>ねが</rt></ruby>う。",
    english_translation: "Yesterday's heavy snow caused an accident at the on-ramp of the Tokyo Metropolitan Expressway. Police cars and ambulances have gathered there. I hope no one is hurt.",
    annotated_words: [
      { kanji: "大雪", furigana: "おおゆき", meaning: "heavy snow" },
      { kanji: "首都", furigana: "しゅと", meaning: "capital" },
      { kanji: "高速道路", furigana: "こうそくどうろ", meaning: "highway" },
      { kanji: "出入口", furigana: "でいりぐち", meaning: "exit and entrance" },
      { kanji: "パトカー", furigana: "", meaning: "police car" },
      { kanji: "救急車", furigana: "きゅうきゅうしゃ", meaning: "ambulance" },
      { kanji: "願う", furigana: "ねがう", meaning: "make a wish, hope for" },
      { kanji: "願い", furigana: "ねがい", meaning: "wish, hope" }
    ]
  },
  {
    id: "145_1",
    title: "Topic 10",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>が<ruby>住<rt>す</rt></ruby>んでいる<ruby>団地<rt>だんち</rt></ruby>は<ruby>坂<rt>さか</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>にある。<ruby>商店街<rt>しょうてんがい</rt></ruby>がある<ruby>大通<rt>おおどお</rt></ruby>りから<ruby>外<rt>はず</rt></ruby>れたところに<ruby>位置<rt>いち</rt></ruby>しているので、<ruby>子<rt>こ</rt></ruby>どもがよく<ruby>迷子<rt>まいご</rt></ruby>になる。",
    english_translation: "The housing complex where I live is at the top of a slope. It's located some distance away from the bigger streets around the commercial district, so the children often get lost.",
    annotated_words: [
      { kanji: "団地", furigana: "だんち", meaning: "housing complex" },
      { kanji: "坂", furigana: "さか", meaning: "hill, slope" },
      { kanji: "商店街", furigana: "しょうてんがい", meaning: "shopping street" },
      { kanji: "商店", furigana: "しょうてん", meaning: "store" },
      { kanji: "大通り", furigana: "おおどおり", meaning: "main street, large street" },
      { kanji: "外れる", furigana: "はずれる", meaning: "come off, be off" },
      { kanji: "位置［する］", furigana: "いち", meaning: "position, locate, position" },
      { kanji: "迷子", furigana: "まいご", meaning: "lost child" }
    ]
  },
  {
    id: "146_1",
    title: "Topic 10",
    japanese_text: "<ruby>郊外<rt>こうがい</rt></ruby>に<ruby>暮<rt>く</rt></ruby>らすと、アクセスが<ruby>悪<rt>わる</rt></ruby>いというイメージがある。しかし、<ruby>実際<rt>じっさい</rt></ruby>には<ruby>地下鉄一本<rt>ちかてついっぽん</rt></ruby>で<ruby>通勤<rt>つうきん</rt></ruby>できる。",
    english_translation: "People tend to imagine that living in the suburbs means having poor access, but I can actually commute to work with just one subway line.",
    annotated_words: [
      { kanji: "郊外", furigana: "こうがい", meaning: "suburbs" },
      { kanji: "暮らす", furigana: "くらす", meaning: "live" },
      { kanji: "暮らし", furigana: "くらし", meaning: "life, living" },
      { kanji: "アクセス［する］", furigana: "", meaning: "access" },
      { kanji: "イメージ［する］", furigana: "", meaning: "image, imagine" },
      { kanji: "通勤［する］", furigana: "つうきん", meaning: "commuting to work, commute to work" }
    ]
  },
  {
    id: "146_2",
    title: "Topic 10",
    japanese_text: "<ruby>公園<rt>こうえん</rt></ruby>の<ruby>芝生<rt>しばふ</rt></ruby>に<ruby>寝転<rt>ねころ</rt></ruby>がると、<ruby>土<rt>つち</rt></ruby>の<ruby>香<rt>かお</rt></ruby>りがした。<ruby>蚊<rt>か</rt></ruby>がいたので、<ruby>扇子<rt>せんす</rt></ruby>でたたいた。",
    english_translation: "When I laid out on the grass in the park, it smelled like soil. There was a mosquito, so I swatted it with a folding fan.",
    annotated_words: [
      { kanji: "芝生", furigana: "しばふ", meaning: "lawn, grass" },
      { kanji: "転がる", furigana: "ころがる", meaning: "roll around, roll over" },
      { kanji: "転がす", furigana: "ころがす", meaning: "roll" },
      { kanji: "土", furigana: "つち", meaning: "soil" },
      { kanji: "香り", furigana: "かおり", meaning: "fragrance, smell" },
      { kanji: "蚊", furigana: "か", meaning: "mosquito" },
      { kanji: "扇子", furigana: "せんす", meaning: "fan" }
    ]
  },
  {
    id: "147_1",
    title: "Topic 10",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>が<ruby>生<rt>う</rt></ruby>まれ<ruby>育<rt>そだ</rt></ruby>った<ruby>場所<rt>ばしょ</rt></ruby>の<ruby>地名<rt>ちめい</rt></ruby>を<ruby>言<rt>い</rt></ruby>っても、<ruby>誰<rt>だれ</rt></ruby>も<ruby>知<rt>し</rt></ruby>らないだろう。<ruby>商業<rt>しょうぎょう</rt></ruby>が<ruby>盛<rt>さか</rt></ruby>んな<ruby>街<rt>まち</rt></ruby>で、いろいろな<ruby>会社<rt>かいしゃ</rt></ruby>の<ruby>事務所<rt>じむしょ</rt></ruby>がある。<ruby>住宅地<rt>じゅうたくち</rt></ruby>の<ruby>中<rt>なか</rt></ruby>に<ruby>大型<rt>おおがた</rt></ruby>スーパーがあるので、<ruby>食料品<rt>しょくりょうひん</rt></ruby>もすぐに<ruby>買<rt>か</rt></ruby>えるし、<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>書店<rt>しょてん</rt></ruby>もある。",
    english_translation: "Even if I tell people the name of the place where I was born and raised, no one would probably know it. It is a city with a lot of commerce, and there are offices of various companies. There is a large supermarket in the residential area, so food products can be purchased right away, and there is also a famous bookstore.",
    annotated_words: [
      { kanji: "地名", furigana: "ちめい", meaning: "place name" },
      { kanji: "商業", furigana: "しょうぎょう", meaning: "commerce, trade" },
      { kanji: "街", furigana: "まち", meaning: "town, city" },
      { kanji: "〜所", furigana: "〜しょ", meaning: "place" },
      { kanji: "住宅", furigana: "じゅうたく", meaning: "house" },
      { kanji: "食料品", furigana: "しょくりょうひん", meaning: "food products" },
      { kanji: "食料", furigana: "しょくりょう", meaning: "food" },
      { kanji: "書店", furigana: "しょてん", meaning: "bookstore" }
    ]
  }
];

const targetDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

topic10_stories.forEach(story => {
  fs.writeFileSync(path.join(targetDir, `${story.id}.json`), JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
