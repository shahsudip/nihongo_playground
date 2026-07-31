const fs = require('fs');
const path = require('path');

const topic11_stories = [
  {
    id: "150_1",
    title: "Topic 11",
    japanese_text: "<ruby>天気予報<rt>てんきよほう</rt></ruby>によると、<ruby>大雨注意報<rt>おおあめちゅういほう</rt></ruby>が<ruby>出<rt>で</rt></ruby>ている。<ruby>午後<rt>ごご</rt></ruby>からにわか<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るので、<ruby>早<rt>はや</rt></ruby>めに<ruby>毛布<rt>もうふ</rt></ruby>とシーツを<ruby>取<rt>と</rt></ruby>り<ruby>込<rt>こ</rt></ruby>まなければならない。",
    english_translation: "The weather forecast said that a heavy rain advisory is in effect. There could be sudden showers starting in the afternoon, so I have to bring in the blanket and sheets before that.",
    annotated_words: [
      { kanji: "予報［する］", furigana: "よほう", meaning: "forecast, forecast" },
      { kanji: "大雨", furigana: "おおあめ", meaning: "heavy rain" },
      { kanji: "小雨", furigana: "こさめ", meaning: "light rain" },
      { kanji: "注意報", furigana: "ちゅういほう", meaning: "warning" },
      { kanji: "警報", furigana: "けいほう", meaning: "alert" },
      { kanji: "にわか雨", furigana: "にわかあめ", meaning: "shower (rain)" },
      { kanji: "毛布", furigana: "もうふ", meaning: "blanket" },
      { kanji: "シーツ", furigana: "", meaning: "bed sheet" }
    ]
  },
  {
    id: "150_2",
    title: "Topic 11",
    japanese_text: "<ruby>大陸<rt>たいりく</rt></ruby>が<ruby>地球<rt>ちきゅう</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>を<ruby>移動<rt>いどう</rt></ruby>して、<ruby>現在<rt>げんざい</rt></ruby>の<ruby>世界<rt>せかい</rt></ruby>ができたという<ruby>説<rt>せつ</rt></ruby>が1912<ruby>年<rt>ねん</rt></ruby>に<ruby>発表<rt>はっぴょう</rt></ruby>された。",
    english_translation: "The theory that our present world is result of the movement of the continents over the earth was presented in 1912.",
    annotated_words: [
      { kanji: "大陸", furigana: "たいりく", meaning: "continent" },
      { kanji: "地球", furigana: "ちきゅう", meaning: "the earth" },
      { kanji: "移動［する］", furigana: "いどう", meaning: "moving, move" },
      { kanji: "説", furigana: "せつ", meaning: "theory, reason" }
    ]
  },
  {
    id: "151_1",
    title: "Topic 11",
    japanese_text: "<ruby>海外<rt>かいがい</rt></ruby>と<ruby>比較<rt>ひかく</rt></ruby>して、<ruby>日本<rt>にほん</rt></ruby>は<ruby>防災<rt>ぼうさい</rt></ruby>の<ruby>意識<rt>いしき</rt></ruby>が<ruby>強<rt>つよ</rt></ruby>い。<ruby>梅雨<rt>つゆ</rt></ruby>のシーズンだが、<ruby>今年<rt>ことし</rt></ruby>は<ruby>大<rt>おお</rt></ruby>きな<ruby>被害<rt>ひがい</rt></ruby>が<ruby>出<rt>で</rt></ruby>ないことを<ruby>祈<rt>いの</rt></ruby>っている。",
    english_translation: "Japan has a stronger awareness of disaster prevention in comparison to other countries. It is now the rainy season, and I pray that there will be no serious damage this year.",
    annotated_words: [
      { kanji: "海外", furigana: "かいがい", meaning: "overseas" },
      { kanji: "比較［する］", furigana: "ひかく", meaning: "comparison, compare" },
      { kanji: "防災", furigana: "ぼうさい", meaning: "disaster prevention" },
      { kanji: "意識［する］", furigana: "いしき", meaning: "consciousness, be aware of" },
      { kanji: "梅雨", furigana: "つゆ", meaning: "rainy season" },
      { kanji: "祈る", furigana: "いのる", meaning: "pray" },
      { kanji: "祈り", furigana: "いのり", meaning: "prayer" }
    ]
  },
  {
    id: "151_2",
    title: "Topic 11",
    japanese_text: "<ruby>今日<rt>きょう</rt></ruby>は<ruby>花粉<rt>かふん</rt></ruby>がたくさん<ruby>飛<rt>と</rt></ruby>んでいる。<ruby>目<rt>め</rt></ruby>がかゆくて、<ruby>鼻<rt>はな</rt></ruby>もむずむずするので、<ruby>外出<rt>がいしゅつ</rt></ruby>はやめておこう。",
    english_translation: "There's so much pollen in the air today. My eyes are itchy and my nose tickles, so I'm not going to leave the house.",
    annotated_words: [
      { kanji: "花粉", furigana: "かふん", meaning: "pollen" },
      { kanji: "花粉症", furigana: "かふんしょう", meaning: "hay fever" },
      { kanji: "かゆい", furigana: "", meaning: "itchy" },
      { kanji: "外出［する］", furigana: "がいしゅつ", meaning: "going out, go out" }
    ]
  },
  {
    id: "152_1",
    title: "Topic 11",
    japanese_text: "<ruby>台風<rt>たいふう</rt></ruby>が<ruby>近<rt>ちか</rt></ruby>づいているので、<ruby>大雨<rt>おおあめ</rt></ruby>、<ruby>強風<rt>きょうふう</rt></ruby>、<ruby>洪水<rt>こうずい</rt></ruby>の<ruby>被害<rt>ひがい</rt></ruby>が<ruby>心配<rt>しんぱい</rt></ruby>である。<ruby>電柱<rt>でんちゅう</rt></ruby>が<ruby>倒<rt>たお</rt></ruby>れて、<ruby>突然<rt>とつぜん</rt></ruby><ruby>停電<rt>ていでん</rt></ruby>したり、<ruby>断水<rt>だんすい</rt></ruby>したりするかもしれない。",
    english_translation: "A typhoon is approaching, so I'm worried about damage from heavy rain, strong wind, and flooding. There could be sudden power outages due to downed utility poles or the water could be cut off.",
    annotated_words: [
      { kanji: "強風", furigana: "きょうふう", meaning: "strong wind" },
      { kanji: "洪水", furigana: "こうずい", meaning: "flood" },
      { kanji: "電柱", furigana: "でんちゅう", meaning: "telephone pole" },
      { kanji: "電線", furigana: "でんせん", meaning: "electrical wire" },
      { kanji: "停電［する］", furigana: "ていでん", meaning: "blackout, have a blackout" },
      { kanji: "断水［する］", furigana: "だんすい", meaning: "water outage, have a water outage" }
    ]
  },
  {
    id: "152_2",
    title: "Topic 11",
    japanese_text: "<ruby>雨<rt>あめ</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>にレインコートを<ruby>着<rt>き</rt></ruby>て<ruby>自転車<rt>じてんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>っていたら、タイヤが<ruby>滑<rt>すべ</rt></ruby>って<ruby>転<rt>ころ</rt></ruby>びそうになったが、<ruby>何<rt>なん</rt></ruby>とか<ruby>無事<rt>ぶじ</rt></ruby>だった。",
    english_translation: "I was wearing a raincoat as I rode my bike on a rainy day, the tires slipped and I almost crashed, but somehow made it through safe.",
    annotated_words: [
      { kanji: "レインコート", furigana: "", meaning: "raincoat" },
      { kanji: "タイヤ", furigana: "", meaning: "tire" },
      { kanji: "滑る", furigana: "すべる", meaning: "slide" },
      { kanji: "転ぶ", furigana: "ころぶ", meaning: "crash, fall down" },
      { kanji: "無事な", furigana: "ぶじな", meaning: "safe, unharmed" }
    ]
  },
  {
    id: "153_1",
    title: "Topic 11",
    japanese_text: "<ruby>日本<rt>にほん</rt></ruby>の<ruby>夏<rt>なつ</rt></ruby>は<ruby>湿度<rt>しつど</rt></ruby>が<ruby>高<rt>たか</rt></ruby>くて<ruby>蒸<rt>む</rt></ruby>し<ruby>暑<rt>あつ</rt></ruby>い。クーラーや<ruby>扇風機<rt>せんぷうき</rt></ruby>を<ruby>使<rt>つか</rt></ruby>わなかったら、すぐにのどがからからになり、<ruby>息<rt>いき</rt></ruby>ができなくなる。",
    english_translation: "With high humidity, summer in Japan is hot and muggy. Without air conditioning or a fan, you will find your throat so bone dry, you'll barely be able to breathe.",
    annotated_words: [
      { kanji: "湿度", furigana: "しつど", meaning: "humidity" },
      { kanji: "蒸し暑い", furigana: "むしあつい", meaning: "humid" },
      { kanji: "クーラー", furigana: "", meaning: "cooler" },
      { kanji: "扇風機", furigana: "せんぷうき", meaning: "(electric) fan" },
      { kanji: "からからな", furigana: "", meaning: "thirsty, dry" },
      { kanji: "息", furigana: "いき", meaning: "breath" }
    ]
  },
  {
    id: "153_2",
    title: "Topic 11",
    japanese_text: "<ruby>田舎<rt>いなか</rt></ruby>と<ruby>比<rt>くら</rt></ruby>べると、<ruby>都会<rt>とかい</rt></ruby>はコンクリートに<ruby>囲<rt>かこ</rt></ruby>まれているので、なかなか<ruby>地面<rt>じめん</rt></ruby>の<ruby>温度<rt>おんど</rt></ruby>が<ruby>下<rt>さ</rt></ruby>がりにくい。",
    english_translation: "Compared to the countryside, the city is surrounded by concrete, so the temperature of the ground doesn't fall easily.",
    annotated_words: [
      { kanji: "比べる", furigana: "くらべる", meaning: "compare" },
      { kanji: "コンクリート", furigana: "", meaning: "concrete" },
      { kanji: "囲む", furigana: "かこむ", meaning: "surround" },
      { kanji: "温度", furigana: "おんど", meaning: "temperature" },
      { kanji: "温度計", furigana: "おんどけい", meaning: "thermometer" }
    ]
  },
  {
    id: "154_1",
    title: "Topic 11",
    japanese_text: "<ruby>昨日<rt>きのう</rt></ruby>、<ruby>震度<rt>しんど</rt></ruby>５<ruby>強<rt>きょう</rt></ruby>の<ruby>地震<rt>じしん</rt></ruby>があり、かなり<ruby>揺<rt>ゆ</rt></ruby>れた。<ruby>海岸<rt>かいがん</rt></ruby>の<ruby>近<rt>ちか</rt></ruby>くにいて、<ruby>今<rt>いま</rt></ruby>にも<ruby>津波<rt>つなみ</rt></ruby>が<ruby>来<rt>き</rt></ruby>そうだったので、はだしで<ruby>走<rt>はし</rt></ruby>り、<ruby>近<rt>ちか</rt></ruby>くの<ruby>家<rt>いえ</rt></ruby>の<ruby>屋根<rt>やね</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>逃<rt>に</rt></ruby>げた。",
    english_translation: "Yesterday, there was an earthquake that registered a strong 5 of the Japanese seismic intensity scale. It shook a fair amount. I was near the coast, and it seemed a tsunami could come at any moment, so ran barefoot to the roof of a nearby house.",
    annotated_words: [
      { kanji: "昨日", furigana: "きのう", meaning: "yesterday" },
      { kanji: "昨年", furigana: "さくねん", meaning: "last year" },
      { kanji: "震度", furigana: "しんど", meaning: "seismic intensity" },
      { kanji: "揺れる", furigana: "ゆれる", meaning: "shake, quake, sway" },
      { kanji: "海岸", furigana: "かいがん", meaning: "coast" },
      { kanji: "今にも", furigana: "いまにも", meaning: "at any moment, soon" },
      { kanji: "はだし", furigana: "", meaning: "barefoot" },
      { kanji: "屋根", furigana: "やね", meaning: "roof" }
    ]
  },
  {
    id: "154_2",
    title: "Topic 11",
    japanese_text: "<ruby>地球温暖化<rt>ちきゅうおんだんか</rt></ruby>の<ruby>影響<rt>えいきょう</rt></ruby>で<ruby>最近<rt>さいきん</rt></ruby>の<ruby>気候<rt>きこう</rt></ruby>はおかしい。<ruby>森林<rt>しんりん</rt></ruby>を<ruby>切<rt>き</rt></ruby>りすぎたことは<ruby>無関係<rt>むかんけい</rt></ruby>ではなく、いろんなバランスが<ruby>崩<rt>くず</rt></ruby>れているのだろう。",
    english_translation: "The weather has been impacted lately by global warming. The overcutting of forests is not unrelated to this and has lead to the collapse of various types of balance.",
    annotated_words: [
      { kanji: "〜化", furigana: "〜か", meaning: "change" },
      { kanji: "影響［する］", furigana: "えいきょう", meaning: "influence, influence" },
      { kanji: "気候", furigana: "きこう", meaning: "climate" },
      { kanji: "おかしい", furigana: "", meaning: "strange, weird" },
      { kanji: "森林", furigana: "しんりん", meaning: "forest" },
      { kanji: "無関係な", furigana: "むかんけいな", meaning: "unrelated" },
      { kanji: "崩れる", furigana: "くずれる", meaning: "collapse" },
      { kanji: "崩す", furigana: "くずす", meaning: "destroy, ruin" }
    ]
  },
  {
    id: "155_1",
    title: "Topic 11",
    japanese_text: "<ruby>子<rt>こ</rt></ruby>どもが<ruby>初<rt>はじ</rt></ruby>めてマフラーを<ruby>巻<rt>ま</rt></ruby>いたが、うまく<ruby>巻<rt>ま</rt></ruby>けず、けっこうめちゃめちゃだった。<ruby>顔<rt>かお</rt></ruby>を<ruby>見<rt>み</rt></ruby>ると、<ruby>悔<rt>くや</rt></ruby>しくて<ruby>涙<rt>なみだ</rt></ruby>をこぼしていた。",
    english_translation: "The child tried to put her scarf on herself for the first time, but wasn't able to do it well so it looked quite messy. Looking at her face, she looked frustrated and teary-eyed.",
    annotated_words: [
      { kanji: "マフラー", furigana: "", meaning: "scarf" },
      { kanji: "けっこう", furigana: "", meaning: "quite" },
      { kanji: "めちゃめちゃな", furigana: "", meaning: "messy" },
      { kanji: "こぼす", furigana: "", meaning: "let slip, spill" },
      { kanji: "こぼれる", furigana: "", meaning: "let slip, spill" }
    ]
  },
  {
    id: "156_1",
    title: "Topic 11",
    japanese_text: "<ruby>津波<rt>つなみ</rt></ruby>は<ruby>一瞬<rt>いっしゅん</rt></ruby>のうちに<ruby>多<rt>おお</rt></ruby>くの<ruby>命<rt>いのち</rt></ruby>を<ruby>奪<rt>うば</rt></ruby>ってしまう。<ruby>被害<rt>ひがい</rt></ruby>を<ruby>防<rt>ふせ</rt></ruby>ぐために、<ruby>逃<rt>に</rt></ruby>げる<ruby>場所<rt>ばしょ</rt></ruby>を<ruby>確<rt>たし</rt></ruby>かめておいた<ruby>方<rt>ほう</rt></ruby>がいい。",
    english_translation: "A tsunami can extinguish many lives in the blink of an eye. You should confirm ahead of time where you will run to protect yourself in times of disaster.",
    annotated_words: [
      { kanji: "津波", furigana: "つなみ", meaning: "tsunami" },
      { kanji: "一瞬", furigana: "いっしゅん", meaning: "(for a) moment" },
      { kanji: "被害", furigana: "ひがい", meaning: "damage" },
      { kanji: "防ぐ", furigana: "ふせぐ", meaning: "prevent" },
      { kanji: "確かめる", furigana: "たしかめる", meaning: "confirm" }
    ]
  },
  {
    id: "156_2",
    title: "Topic 11",
    japanese_text: "ひどい<ruby>雨<rt>あめ</rt></ruby>で、<ruby>服<rt>ふく</rt></ruby>が<ruby>濡<rt>ぬ</rt></ruby>れてしまった。<ruby>家<rt>いえ</rt></ruby>に<ruby>着<rt>つ</rt></ruby>いてからも、<ruby>風<rt>かぜ</rt></ruby>はどんどん<ruby>強<rt>つよ</rt></ruby>くなり、<ruby>雷<rt>かみなり</rt></ruby>も<ruby>鳴<rt>な</rt></ruby>りはじめた。<ruby>窓<rt>まど</rt></ruby>ガラスがガタガタと<ruby>震<rt>ふる</rt></ruby>えている。",
    english_translation: "My clothes got wet from the terrible rain. Even after I got home, the wind got stronger and stronger, and it started to thunder. The windowpane was rattling.",
    annotated_words: [
      { kanji: "濡れる", furigana: "ぬれる", meaning: "get wet" },
      { kanji: "濡らす", furigana: "ぬらす", meaning: "wet" },
      { kanji: "雷", furigana: "かみなり", meaning: "thunder" },
      { kanji: "震える", furigana: "ふるえる", meaning: "tremble, shiver" }
    ]
  },
  {
    id: "157_1",
    title: "Topic 11",
    japanese_text: "まだ<ruby>桜<rt>さくら</rt></ruby>が<ruby>散<rt>ち</rt></ruby>りつつある４<ruby>月上旬<rt>がつじょうじゅん</rt></ruby>だが、<ruby>気温<rt>きおん</rt></ruby>が25<ruby>度<rt>ど</rt></ruby>もあるので、<ruby>汗<rt>あせ</rt></ruby>がたくさん<ruby>出<rt>で</rt></ruby>る。",
    english_translation: "Although it's only early April and the cherry blossoms are still falling, at 25 degrees already, I'm sweating a lot.",
    annotated_words: [
      { kanji: "桜", furigana: "さくら", meaning: "cherry blossoms" },
      { kanji: "散る", furigana: "ちる", meaning: "fall, scatter" },
      { kanji: "上旬", furigana: "じょうじゅん", meaning: "first 10 days of month" },
      { kanji: "中旬", furigana: "ちゅうじゅん", meaning: "middle 10 days of month" },
      { kanji: "下旬", furigana: "げじゅん", meaning: "last 10 days of month" },
      { kanji: "気温", furigana: "きおん", meaning: "temperature" },
      { kanji: "〜度", furigana: "〜ど", meaning: "degrees" },
      { kanji: "汗", furigana: "あせ", meaning: "sweat" }
    ]
  },
  {
    id: "157_2",
    title: "Topic 11",
    japanese_text: "<ruby>今日<rt>きょう</rt></ruby>はとても<ruby>寒<rt>さむ</rt></ruby>いので、<ruby>外<rt>そと</rt></ruby>に<ruby>置<rt>お</rt></ruby>いていた<ruby>旗<rt>はた</rt></ruby>が<ruby>凍<rt>こお</rt></ruby>っている。でも、<ruby>日<rt>ひ</rt></ruby>が<ruby>照<rt>て</rt></ruby>れば、すぐに<ruby>元<rt>もと</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>るだろう。",
    english_translation: "Since it is very cold today, the flag that was placed outside is frozen. But once the sun shines on it, it will soon go back to the way it was.",
    annotated_words: [
      { kanji: "旗", furigana: "はた", meaning: "flag" },
      { kanji: "凍る", furigana: "こおる", meaning: "freeze" },
      { kanji: "照る", furigana: "てる", meaning: "shine" }
    ]
  },
  {
    id: "158_1",
    title: "Topic 11",
    japanese_text: "A：<ruby>旅行<rt>りょこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>くなら、<ruby>太陽<rt>たいよう</rt></ruby>が<ruby>昇<rt>のぼ</rt></ruby>るところを<ruby>楽<rt>たの</rt></ruby>しみたい。でも、<ruby>夕日<rt>ゆうひ</rt></ruby>が<ruby>沈<rt>しず</rt></ruby>むところもいいなあ。<ruby>一度<rt>いちど</rt></ruby>に<ruby>両方<rt>りょうほう</rt></ruby>は<ruby>無理<rt>むり</rt></ruby>かな。<br>B：<ruby>景色<rt>けしき</rt></ruby>のいいところでテントを<ruby>張<rt>は</rt></ruby>って、キャンプするってのはどう？",
    english_translation: "A: If I'm going on a trip, I want to enjoy the sunrise. But, I sunsets are nice too. I wonder if I can do both. B: Why don't you pitch a tent someplace with nice scenery and camp out?",
    annotated_words: [
      { kanji: "太陽", furigana: "たいよう", meaning: "sun" },
      { kanji: "昇る", furigana: "のぼる", meaning: "rise" },
      { kanji: "沈む", furigana: "しずむ", meaning: "go down" },
      { kanji: "一度に", furigana: "いちどに", meaning: "at the same time" },
      { kanji: "キャンプ［する］", furigana: "", meaning: "camping, go camping" }
    ]
  }
];

const targetDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

topic11_stories.forEach(story => {
  fs.writeFileSync(path.join(targetDir, `${story.id}.json`), JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
