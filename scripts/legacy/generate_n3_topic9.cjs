const fs = require('fs');
const path = require('path');

const topic9_stories = [
  {
    id: "128_1",
    title: "Topic 9",
    japanese_text: "A：この<ruby>金属<rt>きんぞく</rt></ruby>の<ruby>棒<rt>ぼう</rt></ruby>は<ruby>何<rt>なに</rt></ruby>をするためのものですか。<br>B：ああ、これは<ruby>動物<rt>どうぶつ</rt></ruby>の<ruby>体重<rt>たいじゅう</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>するためのものですよ。<br>A：へえ〜、これで<ruby>測<rt>はか</rt></ruby>るんですね。<br>B：あとで<ruby>園長<rt>えんちょう</rt></ruby>に<ruby>許可<rt>きょか</rt></ruby>をもらったら、<ruby>試<rt>ため</rt></ruby>しに<ruby>使<rt>つか</rt></ruby>ってみましょうか。",
    english_translation: "A: What does this metal pole do? B: Oh, this is to check the weight of animals. A: Wow, you measure that with this. B: If we get permission from the head of the zoo later, why don't we try using it?",
    annotated_words: [
      { kanji: "金属", furigana: "きんぞく", meaning: "metal" },
      { kanji: "確認［する］", furigana: "かくにん", meaning: "confirmation, confirm" },
      { kanji: "許可［する］", furigana: "きょか", meaning: "permission, permit" }
    ]
  },
  {
    id: "128_2",
    title: "Topic 9",
    japanese_text: "あのおじいさんは<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>釣<rt>つ</rt></ruby>りに<ruby>行<rt>い</rt></ruby>く<ruby>前<rt>まえ</rt></ruby>に<ruby>必<rt>かなら</rt></ruby>ずこの<ruby>公園<rt>こうえん</rt></ruby>に<ruby>来<rt>き</rt></ruby>て、７<ruby>羽<rt>わ</rt></ruby>の<ruby>鳩<rt>はと</rt></ruby>にバケツいっぱいの<ruby>豆<rt>まめ</rt></ruby>をやることを<ruby>日課<rt>にっか</rt></ruby>にしている。",
    english_translation: "Every morning, that old man always comes to this park before going fishing, and his daily routine is to give seven pigeons a whole bucket of beans.",
    annotated_words: [
      { kanji: "釣り", furigana: "つり", meaning: "fishing" },
      { kanji: "釣る", furigana: "つる", meaning: "fish" },
      { kanji: "〜羽", furigana: "〜わ", meaning: "counter for birds, etc." },
      { kanji: "バケツ", furigana: "", meaning: "bucket" },
      { kanji: "豆", furigana: "まめ", meaning: "bean" },
      { kanji: "やる", furigana: "", meaning: "give" }
    ]
  },
  {
    id: "129_1",
    title: "Topic 9",
    japanese_text: "A：<ruby>小動物館<rt>しょうどうぶつかん</rt></ruby>が<ruby>休館<rt>きゅうかん</rt></ruby>になってましたが、なんででしょうかね。<br>B：ああ、リスに<ruby>続<rt>つづ</rt></ruby>いて、<ruby>昨夜<rt>さくや</rt></ruby>、うさぎが<ruby>死<rt>し</rt></ruby>んでしまったみたいです。<br>A：そうですか。みんなでかわいがっていたのに、<ruby>残念<rt>ざんねん</rt></ruby>ですね。つらいことは<ruby>重<rt>かさ</rt></ruby>なるものですね。",
    english_translation: "A: The small animal building is closed, but I wonder why. B: Oh, I heard that a rabbit died last night followed by a squirrel. A: Really? That's a pity, since they were so adored by everyone. Bad things tend to happen one after the other.",
    annotated_words: [
      { kanji: "〜館", furigana: "〜かん", meaning: "building" },
      { kanji: "なんで", furigana: "", meaning: "why" },
      { kanji: "かわいがる", furigana: "", meaning: "adore" },
      { kanji: "重なる", furigana: "かさなる", meaning: "happen one after the other, overlap" },
      { kanji: "重ねる", furigana: "かさねる", meaning: "pile on" }
    ]
  },
  {
    id: "129_2",
    title: "Topic 9",
    japanese_text: "A：<ruby>見<rt>み</rt></ruby>て<ruby>見<rt>み</rt></ruby>て、あの<ruby>猿<rt>さる</rt></ruby>、ちっちゃい<ruby>枕<rt>まくら</rt></ruby>を<ruby>抱<rt>だ</rt></ruby>いてる。<br>B：そうそう、<ruby>寝<rt>ね</rt></ruby>るときに<ruby>枕<rt>まくら</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うから、「ピロー」って<ruby>名前<rt>なまえ</rt></ruby>らしいよ。",
    english_translation: "A: Look, look. That monkey is carrying a tiny pillow. B: Yeah, it uses a pillow when it goes to sleep, so they named it Pillow.",
    annotated_words: [
      { kanji: "猿", furigana: "さる", meaning: "monkey" },
      { kanji: "枕", furigana: "まくら", meaning: "pillow" },
      { kanji: "抱く", furigana: "だく", meaning: "carry, hug" }
    ]
  },
  {
    id: "130_1",
    title: "Topic 9",
    japanese_text: "A：あのからす、ずっとあの<ruby>枝<rt>えだ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>でじっとしているね。<br>B：ははは、あれ<ruby>本物<rt>ほんもの</rt></ruby>じゃないよ。",
    english_translation: "A: That crow has been sitting still on that branch for a while. B: Hahaha, it's not real.",
    annotated_words: [
      { kanji: "からす", furigana: "", meaning: "crow" },
      { kanji: "枝", furigana: "えだ", meaning: "branch" },
      { kanji: "じっとする", furigana: "", meaning: "be still" },
      { kanji: "本物", furigana: "ほんもの", meaning: "real, real thing" }
    ]
  },
  {
    id: "130_2",
    title: "Topic 9",
    japanese_text: "A：<ruby>息子<rt>むすこ</rt></ruby>さん、<ruby>成長<rt>せいちょう</rt></ruby>したね。そのうち、お<ruby>父<rt>とう</rt></ruby>さんの<ruby>背<rt>せ</rt></ruby>も<ruby>追<rt>お</rt></ruby>い<ruby>越<rt>こ</rt></ruby>しそうね。<br>B：そうなの。ちょっと<ruby>前<rt>まえ</rt></ruby>までは<ruby>子<rt>こ</rt></ruby>どもだったのに、そのうち<ruby>就職<rt>しゅうしょく</rt></ruby>や<ruby>結婚<rt>けっこん</rt></ruby>で<ruby>家<rt>いえ</rt></ruby>を<ruby>出<rt>で</rt></ruby>る<ruby>日<rt>ひ</rt></ruby>が<ruby>来<rt>く</rt></ruby>るなんて、<ruby>想像<rt>そうぞう</rt></ruby>するだけで<ruby>恐<rt>おそ</rt></ruby>ろしいわ。<br>A：あはは。<ruby>冗談<rt>じょうだん</rt></ruby>でしょ。かわいい<ruby>子<rt>こ</rt></ruby>には<ruby>旅<rt>たび</rt></ruby>をさせろって<ruby>言<rt>い</rt></ruby>うじゃない。",
    english_translation: "A: Your son has grown. Pretty soon, he'll be even taller than his father. B: That's right. Though he was a child up until recently, now just thinking about the fact that he'll soon have to leave the house to find work and get married is terrifying. A: Ahaha. You're joking, right? Don't they say, if you love something, you have to let it go?",
    annotated_words: [
      { kanji: "成長［する］", furigana: "せいちょう", meaning: "growing, grow" },
      { kanji: "追い越す", furigana: "おいこす", meaning: "be more than, overtake" },
      { kanji: "恐ろしい", furigana: "おそろしい", meaning: "terrible" },
      { kanji: "冗談", furigana: "じょうだん", meaning: "joke" },
      { kanji: "ジョーク", furigana: "", meaning: "joke" }
    ]
  },
  {
    id: "131_1",
    title: "Topic 9",
    japanese_text: "<ruby>生物<rt>せいぶつ</rt></ruby>の<ruby>授業<rt>じゅぎょう</rt></ruby>で、<ruby>真<rt>ま</rt></ruby>っ<ruby>赤<rt>か</rt></ruby>な<ruby>羽<rt>はね</rt></ruby>に<ruby>黒<rt>くろ</rt></ruby>い<ruby>模様<rt>もよう</rt></ruby>がある<ruby>虫<rt>むし</rt></ruby>の<ruby>観察<rt>かんさつ</rt></ruby>をした。<ruby>虫<rt>むし</rt></ruby>は<ruby>苦手<rt>にがて</rt></ruby>だったが、いろんな<ruby>特徴<rt>とくちょう</rt></ruby>をノートにまとめる<ruby>作業<rt>さぎょう</rt></ruby>が<ruby>面白<rt>おもしろ</rt></ruby>くて、いつの<ruby>間<rt>ま</rt></ruby>にか<ruby>好<rt>す</rt></ruby>きになっていた。",
    english_translation: "In biology class, we observed an insect that had deep red wings with a black pattern. I was no good with insects, but it was interesting to write down their various characteristics in our notes and I soon came to like them.",
    annotated_words: [
      { kanji: "生物", furigana: "せいぶつ", meaning: "biology" },
      { kanji: "真っ赤な", furigana: "まっかな", meaning: "deep red" },
      { kanji: "真っ青な", furigana: "まっさおな", meaning: "deep blue" },
      { kanji: "模様", furigana: "もよう", meaning: "pattern" },
      { kanji: "水玉模様", furigana: "みずたまもよう", meaning: "polka dot" },
      { kanji: "虫", furigana: "むし", meaning: "insect" },
      { kanji: "特徴", furigana: "とくちょう", meaning: "characteristic" },
      { kanji: "なる", furigana: "", meaning: "become" }
    ]
  },
  {
    id: "132_1",
    title: "Topic 9",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>は<ruby>植物<rt>しょくぶつ</rt></ruby>を<ruby>見<rt>み</rt></ruby>るのは<ruby>好<rt>す</rt></ruby>きだが<ruby>育<rt>そだ</rt></ruby>てるのは<ruby>苦手<rt>にがて</rt></ruby>だ。この<ruby>間<rt>あいだ</rt></ruby>も、<ruby>水<rt>みず</rt></ruby>をやるのを<ruby>忘<rt>わす</rt></ruby>れてしまって、<ruby>観葉植物<rt>かんようしょくぶつ</rt></ruby>がすっかり<ruby>枯<rt>か</rt></ruby>れてしまった。かわいそうなことをした。",
    english_translation: "I like to look at plants, but I'm not good at raising them. Just a while back, I forgot to water my houseplant, and it completely withered away. That poor thing.",
    annotated_words: [
      { kanji: "植物", furigana: "しょくぶつ", meaning: "plant" },
      { kanji: "枯れる", furigana: "かれる", meaning: "wither" },
      { kanji: "かわいそうな", furigana: "", meaning: "poor, pitiful" }
    ]
  },
  {
    id: "132_2",
    title: "Topic 9",
    japanese_text: "<ruby>動物<rt>どうぶつ</rt></ruby>を<ruby>飼<rt>か</rt></ruby>うことは<ruby>命<rt>いのち</rt></ruby>を<ruby>預<rt>あず</rt></ruby>かることである。<ruby>最後<rt>さいご</rt></ruby>まで<ruby>責任<rt>せきにん</rt></ruby>を<ruby>持<rt>も</rt></ruby>って<ruby>育<rt>そだ</rt></ruby>てることができない<ruby>人<rt>ひと</rt></ruby>に<ruby>動物<rt>どうぶつ</rt></ruby>を<ruby>飼<rt>か</rt></ruby>う<ruby>資格<rt>しかく</rt></ruby>はない。",
    english_translation: "Owning an animal means being responsible for a life. People who cannot responsibly raise one to the very end are not qualified to own an animal.",
    annotated_words: [
      { kanji: "飼う", furigana: "かう", meaning: "own (an animal)" },
      { kanji: "命", furigana: "いのち", meaning: "life" },
      { kanji: "責任", furigana: "せきにん", meaning: "responsibility" },
      { kanji: "責任者", furigana: "せきにんしゃ", meaning: "person responsible" },
      { kanji: "育てる", furigana: "そだてる", meaning: "raise" },
      { kanji: "育つ", furigana: "そだつ", meaning: "be raised" }
    ]
  },
  {
    id: "133_1",
    title: "Topic 9",
    japanese_text: "<ruby>日本<rt>にほん</rt></ruby>は、<ruby>世界<rt>せかい</rt></ruby>の<ruby>中<rt>なか</rt></ruby>でも<ruby>水族館<rt>すいぞくかん</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いことで<ruby>有名<rt>ゆうめい</rt></ruby>だ。<ruby>水族館<rt>すいぞくかん</rt></ruby>ではたくさんの<ruby>種類<rt>しゅるい</rt></ruby>の<ruby>魚<rt>さかな</rt></ruby>たちを<ruby>見<rt>み</rt></ruby>ることができるだけでなく、イルカのショーを<ruby>見<rt>み</rt></ruby>たり、ペンギンやサメに<ruby>餌<rt>えさ</rt></ruby>をやることもできる。",
    english_translation: "Japan is famous around the world for having many aquariums. At these aquariums, not only can you see many types of fish, but you can also watch dolphin shows and even feed penguins and sharks.",
    annotated_words: [
      { kanji: "水族館", furigana: "すいぞくかん", meaning: "aquarium" },
      { kanji: "種類", furigana: "しゅるい", meaning: "type" },
      { kanji: "餌", furigana: "えさ", meaning: "feed" }
    ]
  },
  {
    id: "133_2",
    title: "Topic 9",
    japanese_text: "A：わあ、<ruby>部屋<rt>へや</rt></ruby>の<ruby>中<rt>なか</rt></ruby>にカメムシがいる。<br>B：つぶすと<ruby>臭<rt>くさ</rt></ruby>いから、つぶさないようにティッシュで<ruby>捕<rt>つか</rt></ruby>まえて<ruby>窓<rt>まど</rt></ruby>の<ruby>外<rt>そと</rt></ruby>へ<ruby>出<rt>だ</rt></ruby>して。",
    english_translation: "A: Oh no, there's a stink bug in the room. B: Crushing it only makes it stink, so catch it with a tissue without crushing it and throw it out the window.",
    annotated_words: [
      { kanji: "臭い", furigana: "くさい", meaning: "stink, odor" },
      { kanji: "ティッシュ（ペーパー）", furigana: "", meaning: "tissue paper" },
      { kanji: "トイレットペーパー", furigana: "", meaning: "toilet paper" },
      { kanji: "捕まえる", furigana: "つかまえる", meaning: "catch" },
      { kanji: "捕まる", furigana: "つかまる", meaning: "be caught" }
    ]
  },
  {
    id: "134_1",
    title: "Topic 9",
    japanese_text: "A：どうしたんですか。<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>ですか。<br>B：あ、すみません。<ruby>立<rt>た</rt></ruby>ち<ruby>上<rt>あ</rt></ruby>がろうとした<ruby>際<rt>さい</rt></ruby>に、<ruby>突然<rt>とつぜん</rt></ruby><ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>が<ruby>真<rt>ま</rt></ruby>っ<ruby>暗<rt>くら</rt></ruby>になって…。<br>A：えっと、まずはこの<ruby>平<rt>たい</rt></ruby>らなところにそっと<ruby>座<rt>すわ</rt></ruby>ってください。ゆっくりでいいですよ。<ruby>今<rt>いま</rt></ruby>、<ruby>救急車<rt>きゅうきゅうしゃ</rt></ruby><ruby>呼<rt>よ</rt></ruby>びますね。",
    english_translation: "A: What happened? Are you okay? B: I'm sorry. I tried to stand up, and suddenly everything went black . . . A: Well, first please slowly sit down on this flat surface. Just take your time. I'll call an ambulance right now.",
    annotated_words: [
      { kanji: "立ち上がる", furigana: "たちあがる", meaning: "stand up" },
      { kanji: "立ち上げる", furigana: "たちあげる", meaning: "build" },
      { kanji: "際", furigana: "さい", meaning: "when, (in the) event" },
      { kanji: "突然", furigana: "とつぜん", meaning: "suddenly" },
      { kanji: "平らな", furigana: "たいらな", meaning: "flat" },
      { kanji: "そっと", furigana: "", meaning: "quietly" }
    ]
  },
  {
    id: "134_2",
    title: "Topic 9",
    japanese_text: "<ruby>天井<rt>てんじょう</rt></ruby>にカビが<ruby>生<rt>は</rt></ruby>えているのを<ruby>発見<rt>はっけん</rt></ruby>して、<ruby>思<rt>おも</rt></ruby>わず<ruby>大<rt>おお</rt></ruby>きな<ruby>声<rt>こえ</rt></ruby>を<ruby>出<rt>だ</rt></ruby>してしまった。",
    english_translation: "I found mold on the ceiling, and unintentionally screamed loudly.",
    annotated_words: [
      { kanji: "天井", furigana: "てんじょう", meaning: "ceiling" },
      { kanji: "生える", furigana: "はえる", meaning: "grow" },
      { kanji: "発見［する］", furigana: "はっけん", meaning: "discovery, discover" }
    ]
  },
  {
    id: "135_1",
    title: "Topic 9",
    japanese_text: "<ruby>隣<rt>となり</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>の<ruby>子<rt>こ</rt></ruby>はおとなしい<ruby>性格<rt>せいかく</rt></ruby>で、あまり<ruby>感情的<rt>かんじょうてき</rt></ruby>なところを<ruby>見<rt>み</rt></ruby>たことがない。だけど、<ruby>私<rt>わたし</rt></ruby>に<ruby>気<rt>き</rt></ruby>がつくといつも<ruby>立<rt>た</rt></ruby>ち<ruby>止<rt>ど</rt></ruby>まってにっこりと<ruby>笑<rt>わら</rt></ruby>ってくれる。",
    english_translation: "The child in the house next door has a gentle personality, and I haven't really seen them being that emotional. But whenever they notice me, they always stop and smile.",
    annotated_words: [
      { kanji: "おとなしい", furigana: "", meaning: "gentle" },
      { kanji: "性格", furigana: "せいかく", meaning: "personality" },
      { kanji: "感情的な", furigana: "かんじょうてきな", meaning: "emotional" },
      { kanji: "感情", furigana: "かんじょう", meaning: "emotion" },
      { kanji: "立ち止まる", furigana: "たちどまる", meaning: "stop" },
      { kanji: "にっこり（と）", furigana: "", meaning: "sweetly, griningly" }
    ]
  },
  {
    id: "135_2",
    title: "Topic 9",
    japanese_text: "A：<ruby>見<rt>み</rt></ruby>て<ruby>見<rt>み</rt></ruby>て。<ruby>象<rt>ぞう</rt></ruby>の<ruby>親子<rt>おやこ</rt></ruby>が<ruby>鼻<rt>はな</rt></ruby>を<ruby>合<rt>あ</rt></ruby>わせて<ruby>遊<rt>あそ</rt></ruby>んでる。<br>B：<ruby>本当<rt>ほんとう</rt></ruby>だ。<ruby>自由<rt>じゆう</rt></ruby>に<ruby>鼻<rt>はな</rt></ruby>を<ruby>動<rt>うご</rt></ruby>かせるんだね。<br>A：うん、<ruby>象<rt>ぞう</rt></ruby>の<ruby>鼻<rt>はな</rt></ruby>って<ruby>骨<rt>ほね</rt></ruby>がないらしいよ。",
    english_translation: "A: Look, look. Adult elephants and its child putting their noses together and playing. B: Oh, you're right. They can move their noses so freely. A: Yeah, I hear elephant's noses don't have any bones.",
    annotated_words: [
      { kanji: "象", furigana: "ぞう", meaning: "elephant" },
      { kanji: "親子", furigana: "おやこ", meaning: "parent and child" },
      { kanji: "骨", furigana: "ほね", meaning: "bone" }
    ]
  },
  {
    id: "136_1",
    title: "Topic 9",
    japanese_text: "<ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>愛犬<rt>あいけん</rt></ruby>の<ruby>毛<rt>け</rt></ruby>をブラシでとかして、<ruby>爪<rt>つめ</rt></ruby>を<ruby>切<rt>き</rt></ruby>っている。しっぽを<ruby>振<rt>ふ</rt></ruby>って<ruby>喜<rt>よろこ</rt></ruby>んでくれる<ruby>姿<rt>すがた</rt></ruby>がとてもかわいく、<ruby>心<rt>こころ</rt></ruby>が<ruby>癒<rt>いや</rt></ruby>される。",
    english_translation: "Every morning, I brush my pet's dog hair with a brush and cut its nails. Seeing its tail wag in happiness is so cute, and it warms my heart.",
    annotated_words: [
      { kanji: "ブラシ", furigana: "", meaning: "brush" },
      { kanji: "爪", furigana: "つめ", meaning: "nail" },
      { kanji: "振る", furigana: "ふる", meaning: "wag, shake" },
      { kanji: "心", furigana: "こころ", meaning: "heart" }
    ]
  },
  {
    id: "136_2",
    title: "Topic 9",
    japanese_text: "<ruby>幼児<rt>ようじ</rt></ruby>は<ruby>集団生活<rt>しゅうだんせいかつ</rt></ruby>を<ruby>通<rt>とお</rt></ruby>して、<ruby>相手<rt>あいて</rt></ruby>の<ruby>気持<rt>きも</rt></ruby>ちを<ruby>理解<rt>りかい</rt></ruby>したり、<ruby>仲間<rt>なかま</rt></ruby>を<ruby>助<rt>たす</rt></ruby>けることを<ruby>学<rt>まな</rt></ruby>ぶ。",
    english_translation: "Through communal living, toddlers learn to understand other people's feelings and how to help them.",
    annotated_words: [
      { kanji: "幼児", furigana: "ようじ", meaning: "toddler" },
      { kanji: "理解［する］", furigana: "りかい", meaning: "understanding, understand" },
      { kanji: "仲間", furigana: "なかま", meaning: "friend" },
      { kanji: "助ける", furigana: "たすける", meaning: "help, save" },
      { kanji: "助かる", furigana: "たすかる", meaning: "be helped, be saved" }
    ]
  },
  {
    id: "137_1",
    title: "Topic 9",
    japanese_text: "A：<ruby>最近<rt>さいきん</rt></ruby>、<ruby>犬<rt>いぬ</rt></ruby>を<ruby>飼<rt>か</rt></ruby>いたいと<ruby>思<rt>おも</rt></ruby>ってるんだけど。<br>B：そうなんだ。<ruby>大型犬<rt>おおがたけん</rt></ruby>と<ruby>小型犬<rt>こがたけん</rt></ruby>、どっち？<br>A：うーん、<ruby>育<rt>そだ</rt></ruby>てやすい<ruby>方<rt>ほう</rt></ruby>がいいから<ruby>小型犬<rt>こがたけん</rt></ruby>かな。<br>B：<ruby>案外<rt>あんがい</rt></ruby>、<ruby>大型犬<rt>おおがたけん</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>がおとなしくて<ruby>育<rt>そだ</rt></ruby>てやすく、<ruby>小型犬<rt>こがたけん</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>がよくほえるらしいよ。",
    english_translation: "A: I've been thinking about getting a dog recently. B: Really? Which kind, a large dog or a small dog? A: Hmm, maybe a small dog since I prefer one that's easy to raise. B: Large dogs are actually surprisingly quieter and easy to raise, and I hear small dogs tend to bark more.",
    annotated_words: [
      { kanji: "大型", furigana: "おおがた", meaning: "large size" },
      { kanji: "小型", furigana: "こがた", meaning: "small size" },
      { kanji: "ほえる", furigana: "", meaning: "bark" }
    ]
  },
  {
    id: "138_1",
    title: "Topic 9",
    japanese_text: "色（Colors）",
    english_translation: "Colors",
    annotated_words: [
      { kanji: "黒", furigana: "くろ", meaning: "black" },
      { kanji: "白", furigana: "しろ", meaning: "white" },
      { kanji: "赤", furigana: "あか", meaning: "red" },
      { kanji: "青", furigana: "あお", meaning: "blue" },
      { kanji: "黄色", furigana: "きいろ", meaning: "yellow" },
      { kanji: "緑", furigana: "みどり", meaning: "green" },
      { kanji: "茶色", furigana: "ちゃいろ", meaning: "brown" },
      { kanji: "ピンク", furigana: "", meaning: "pink" },
      { kanji: "オレンジ", furigana: "", meaning: "orange" },
      { kanji: "紫", furigana: "むらさき", meaning: "purple" },
      { kanji: "紺", furigana: "こん", meaning: "indigo" },
      { kanji: "水色", furigana: "みずいろ", meaning: "light blue" },
      { kanji: "金色", furigana: "きんいろ", meaning: "gold" },
      { kanji: "銀色", furigana: "ぎんいろ", meaning: "silver" }
    ]
  }
];

const targetDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

topic9_stories.forEach(story => {
  fs.writeFileSync(path.join(targetDir, `${story.id}.json`), JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
