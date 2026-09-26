const fs = require('fs');

const topic4_data = [
  {
    id: "62_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>髪<rt>かみ</rt></ruby><ruby>の<rt></rt></ruby><ruby>毛<rt>け</rt></ruby><ruby>伸<rt>の</rt></ruby><ruby>びたね。<rt></rt></ruby>\n<ruby>Ｂ：うん、ずっと<rt></rt></ruby><ruby>美容院<rt>びよういん</rt></ruby><ruby>行<rt>い</rt></ruby><ruby>ってなくて。<rt></rt></ruby><ruby>毎朝<rt>まいあさ</rt></ruby><ruby>くしでとかしてセッ<rt></rt></ruby><ruby>トするのも、<rt></rt></ruby><ruby>毎晩<rt>まいばん</rt></ruby><ruby>ドライヤーで<rt></rt></ruby><ruby>乾<rt>かわ</rt></ruby><ruby>かすのも<rt></rt></ruby><ruby>大変<rt>たいへん</rt></ruby><ruby>！<rt></rt></ruby>\n<ruby>Ａ：<rt></rt></ruby><ruby>分<rt>わ</rt></ruby><ruby>かる！<rt></rt></ruby><ruby>時間<rt>じかん</rt></ruby><ruby>もかかるしね。<rt></rt></ruby>",
    english_translation: "A: Your hair got longer.\nB: Yeah, I haven't been to a beauty salon in long time. It's such a pain combing and putting it up every morning and drying it out with a dryer every night!\nA: I know what you mean! It takes so much time.",
    annotated_words: [
      { kanji: "髪の毛", furigana: "かみのけ", meaning: "hair" },
      { kanji: "美容院", furigana: "びよういん", meaning: "hair salon" },
      { kanji: "床屋", furigana: "とこや", meaning: "barbershop" },
      { kanji: "とかす", furigana: "", meaning: "comb" },
      { kanji: "セット", furigana: "", meaning: "set, set, do one's hair" },
      { kanji: "ドライヤー", furigana: "", meaning: "hairdryer" }
    ]
  },
  {
    id: "62_2",
    title: "Topic 4",
    japanese_text: "<ruby>眉毛<rt>まゆげ</rt></ruby><ruby>を<rt></rt></ruby><ruby>少<rt>すこ</rt></ruby><ruby>し<rt></rt></ruby><ruby>剃<rt>そ</rt></ruby><ruby>って、まつ<rt></rt></ruby><ruby>毛<rt>げ</rt></ruby><ruby>にパーマをかけたら、まるで<rt></rt></ruby><ruby>別人<rt>べつじん</rt></ruby><ruby>の<rt></rt></ruby><ruby>ようになった。<rt></rt></ruby>",
    english_translation: "When I shave my eyebrows a little and perm my eyelashes, it's like I become another person.",
    annotated_words: [
      { kanji: "眉（毛）", furigana: "まゆ（げ）", meaning: "eyebrows" },
      { kanji: "剃る", furigana: "そる", meaning: "shave" },
      { kanji: "まつ毛", furigana: "まつげ", meaning: "eyelashes" },
      { kanji: "パーマ", furigana: "", meaning: "perm" }
    ]
  },
  {
    id: "63_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：「ファッションに<rt></rt></ruby><ruby>正解<rt>せいかい</rt></ruby><ruby>はない」って<rt></rt></ruby><ruby>言<rt>い</rt></ruby><ruby>うけど、どう<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>いますか。<rt></rt></ruby>\n<ruby>Ｂ：そうですね。<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>も<rt></rt></ruby><ruby>若<rt>わか</rt></ruby><ruby>い<rt></rt></ruby><ruby>頃<rt>ころ</rt></ruby><ruby>はファッション<rt></rt></ruby><ruby>雑誌<rt>ざっし</rt></ruby><ruby>を<rt></rt></ruby><ruby>何冊<rt>なんさつ</rt></ruby><ruby>か<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>っ<rt></rt></ruby><ruby>て<rt></rt></ruby><ruby>参考<rt>さんこう</rt></ruby><ruby>にしながら、<rt></rt></ruby><ruby>何<rt>なに</rt></ruby><ruby>が<rt></rt></ruby><ruby>正解<rt>せいかい</rt></ruby><ruby>かを<rt></rt></ruby><ruby>一生懸命探<rt>いっしょうけんめいさが</rt></ruby><ruby>していました。<rt></rt></ruby><ruby>でも<rt></rt></ruby><ruby>今<rt>いま</rt></ruby><ruby>は、<rt></rt></ruby><ruby>好<rt>この</rt></ruby><ruby>みも<rt></rt></ruby><ruby>体型<rt>たいけい</rt></ruby><ruby>も<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>によってそれぞれなので、<rt></rt></ruby><ruby>他<rt>ほか</rt></ruby><ruby>の<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>の<rt></rt></ruby><ruby>目<rt>め</rt></ruby><ruby>を<rt></rt></ruby><ruby>気<rt>き</rt></ruby><ruby>にしすぎず、<rt></rt></ruby><ruby>自由<rt>じゆう</rt></ruby><ruby>にしてほしいなと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>っています。<rt></rt></ruby>",
    english_translation: "A: They say, \"there are no right answers in fashion,\" but what do you think?\nB: That's right. When I was younger, I used to buy and reference various fashion magazines and try my best to look for the right answers. But now, since preferences and body types differ from person to person, they try not to worry about the gaze of others too much and just want to be free.",
    annotated_words: [
      { kanji: "正解", furigana: "せいかい", meaning: "correct answer, answer correctly" },
      { kanji: "参考", furigana: "さんこう", meaning: "reference" },
      { kanji: "体型", furigana: "たいけい", meaning: "body type" },
      { kanji: "それぞれ", furigana: "", meaning: "each, respectively" }
    ]
  },
  {
    id: "63_2",
    title: "Topic 4",
    japanese_text: "<ruby>身長<rt>しんちょう</rt></ruby><ruby>が<rt></rt></ruby><ruby>高<rt>たか</rt></ruby><ruby>いので、シンプルなスタイルを<rt></rt></ruby><ruby>心<rt>こころ</rt></ruby><ruby>がけている。<rt></rt></ruby>",
    english_translation: "Since I'm tall, I make an effort to keep my style simple.",
    annotated_words: [
      { kanji: "身長", furigana: "しんちょう", meaning: "height" },
      { kanji: "シンプルな", furigana: "", meaning: "simple" },
      { kanji: "スタイル", furigana: "", meaning: "style" }
    ]
  },
  {
    id: "64_1",
    title: "Topic 4",
    japanese_text: "カラーコンタクトの<ruby>新色<rt>しんしょく</rt></ruby><ruby>をオンラインショップ<rt></rt></ruby><ruby>限定<rt>げんてい</rt></ruby><ruby>で<rt></rt></ruby><ruby>売<rt>う</rt></ruby><ruby>り<rt></rt></ruby><ruby>出<rt>だ</rt></ruby><ruby>し<rt></rt></ruby><ruby>たところ、ＳＮＳで<rt></rt></ruby><ruby>話題<rt>わだい</rt></ruby><ruby>になって、<rt></rt></ruby><ruby>注文<rt>ちゅうもん</rt></ruby><ruby>が<rt></rt></ruby><ruby>何倍<rt>なんばい</rt></ruby><ruby>にも<rt></rt></ruby><ruby>増<rt>ふ</rt></ruby><ruby>えた。<rt></rt></ruby><ruby>間<rt>ま</rt></ruby><ruby>もなく<rt></rt></ruby><ruby>赤字<rt>あかじ</rt></ruby><ruby>から<rt></rt></ruby><ruby>回復<rt>かいふく</rt></ruby><ruby>するだろう。<rt></rt></ruby>",
    english_translation: "When a new color of the color contacts that was available only on our online shop went on sale, it became a topic on social media, and the number of orders increased several times over. It will soon be recovered from the deficit.",
    annotated_words: [
      { kanji: "コンタクト（レンズ）", furigana: "", meaning: "contact (lens)" },
      { kanji: "新〜", furigana: "しん〜", meaning: "new ~" },
      { kanji: "〜色", furigana: "〜しょく", meaning: "~ color" },
      { kanji: "ショップ", furigana: "", meaning: "shop" },
      { kanji: "赤字", furigana: "あかじ", meaning: "deficit, in the red" },
      { kanji: "黒字", furigana: "くろじ", meaning: "surplus, in the black" }
    ]
  },
  {
    id: "64_2",
    title: "Topic 4",
    japanese_text: "<ruby>革<rt>かわ</rt></ruby><ruby>のベルトやひもでウエストをマークするファッションが<rt></rt></ruby><ruby>人気<rt>にんき</rt></ruby><ruby>だ。<rt></rt></ruby>",
    english_translation: "Fashion styles that mark the waist with leather belts or cords are popular.",
    annotated_words: [
      { kanji: "革", furigana: "かわ", meaning: "leather" },
      { kanji: "ベルト", furigana: "", meaning: "belt" },
      { kanji: "ひも", furigana: "", meaning: "string" },
      { kanji: "マーク", furigana: "", meaning: "marking, mark" }
    ]
  },
  {
    id: "65_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>最近<rt>さいきん</rt></ruby><ruby>スニーカーで<rt></rt></ruby><ruby>来<rt>き</rt></ruby><ruby>てるの？<rt></rt></ruby>\n<ruby>Ｂ：うん、それでストッキングやめて、<rt></rt></ruby>５<ruby>本指<rt>ほんゆび</rt></ruby><ruby>ソックスにしてみ<rt></rt></ruby><ruby>たんだけど、すごく<rt></rt></ruby><ruby>快適<rt>かいてき</rt></ruby><ruby>！<rt></rt></ruby>\n<ruby>Ａ：そうなんだ、<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>も<rt></rt></ruby><ruby>試<rt>ため</rt></ruby><ruby>してみようかな。<rt></rt></ruby>",
    english_translation: "A: Have you been coming in sneakers recently?\nB: Yeah, and I stopped wearing stockings and have started wearing five-toed socks, and they're really comfortable!\nA: Really? Maybe I should try them too.",
    annotated_words: [
      { kanji: "スニーカー", furigana: "", meaning: "sneakers" },
      { kanji: "ストッキング", furigana: "", meaning: "stockings" },
      { kanji: "ソックス", furigana: "", meaning: "socks" },
      { kanji: "試す", furigana: "ためす", meaning: "try" },
      { kanji: "試し", furigana: "ためし", meaning: "trial, test" }
    ]
  },
  {
    id: "65_2",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>腕<rt>うで</rt></ruby><ruby>の<rt></rt></ruby><ruby>毛<rt>け</rt></ruby><ruby>、<rt></rt></ruby><ruby>濃<rt>こ</rt></ruby><ruby>いね。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>気<rt>き</rt></ruby><ruby>にしてるんだから<rt></rt></ruby><ruby>言<rt>い</rt></ruby><ruby>わないでよ。<rt></rt></ruby>",
    english_translation: "A: Your arm hair sure is thick.\nB: Don't say that. I'm really self-conscious about it.",
    annotated_words: [
      { kanji: "毛", furigana: "け", meaning: "hair" },
      { kanji: "毛糸", furigana: "けいと", meaning: "woolen yarn" },
      { kanji: "濃い", furigana: "こい", meaning: "thick, rich" },
      { kanji: "薄い", furigana: "うすい", meaning: "thin" },
      { kanji: "気にする", furigana: "きにする", meaning: "be conscious, be concerned" }
    ]
  },
  {
    id: "66_1",
    title: "Topic 4",
    japanese_text: "<ruby>なんとなく<rt></rt></ruby><ruby>入<rt>はい</rt></ruby><ruby>った<rt></rt></ruby><ruby>店<rt>みせ</rt></ruby><ruby>で<rt></rt></ruby><ruby>見<rt>み</rt></ruby><ruby>つけたジーンズがあまりに<rt></rt></ruby><ruby>気<rt>き</rt></ruby><ruby>に<rt></rt></ruby><ruby>入<rt>い</rt></ruby><ruby>った<rt></rt></ruby><ruby>ので、<rt></rt></ruby><ruby>色違<rt>いろちが</rt></ruby><ruby>いで<rt></rt></ruby>３<ruby>着買<rt>ちゃくか</rt></ruby><ruby>った。<rt></rt></ruby><ruby>兄<rt>あに</rt></ruby><ruby>が<rt></rt></ruby><ruby>帰<rt>かえ</rt></ruby><ruby>ってきたら<rt></rt></ruby><ruby>自慢<rt>じまん</rt></ruby><ruby>しよう。<rt></rt></ruby>",
    english_translation: "I liked the jeans I found at a store I happened to wonder into so much, I bought three of them in different colors. I'm going to boast to my older brother when he comes back.",
    annotated_words: [
      { kanji: "なんとなく", furigana: "", meaning: "on a whim, somehow" },
      { kanji: "ジーンズ", furigana: "", meaning: "jeans" },
      { kanji: "ジーパン", furigana: "", meaning: "jeans" },
      { kanji: "〜着", furigana: "〜ちゃく", meaning: "~ articles of clothing" },
      { kanji: "自慢", furigana: "じまん", meaning: "pride, boast, be proud of" }
    ]
  },
  {
    id: "66_2",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：シンプルなシャツをお<rt></rt></ruby><ruby>召<rt>め</rt></ruby><ruby>しになるときには、サングラスやス<rt></rt></ruby><ruby>カーフなどの<rt></rt></ruby><ruby>小物<rt>こもの</rt></ruby><ruby>を<rt></rt></ruby><ruby>合<rt>あ</rt></ruby><ruby>わせて、アクセントをつけるといいで<rt></rt></ruby><ruby>すよ。<rt></rt></ruby>\n<ruby>Ｂ：ああ、なるほど。<rt></rt></ruby><ruby>難<rt>むずか</rt></ruby><ruby>しそうですね…。<rt></rt></ruby>",
    english_translation: "A: When wearing a simple shirt, you should combine accessories such as sunglasses and scarves to add an accent.\nB: Oh, I see. That sounds difficult...",
    annotated_words: [
      { kanji: "お召しになる", furigana: "おめしになる", meaning: "wear (honorific speech)" },
      { kanji: "サングラス", furigana: "", meaning: "sunglasses" },
      { kanji: "スカーフ", furigana: "", meaning: "scarf" },
      { kanji: "合わせる", furigana: "あわせる", meaning: "combine" },
      { kanji: "アクセント", furigana: "", meaning: "accent" }
    ]
  },
  {
    id: "67_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>机<rt>つくえ</rt></ruby><ruby>の<rt></rt></ruby><ruby>上<rt>うえ</rt></ruby><ruby>に<rt></rt></ruby><ruby>布<rt>ぬの</rt></ruby><ruby>とはさみが<rt></rt></ruby><ruby>置<rt>お</rt></ruby><ruby>いてあったけど、どうしたの？<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>子<rt>こ</rt></ruby><ruby>ども<rt></rt></ruby><ruby>服<rt>ふく</rt></ruby><ruby>を<rt></rt></ruby><ruby>作<rt>つく</rt></ruby><ruby>ったの。<rt></rt></ruby><ruby>見<rt>み</rt></ruby><ruby>て、これ。あとはこの<rt></rt></ruby><ruby>部分<rt>ぶぶん</rt></ruby><ruby>にゴムを<rt></rt></ruby><ruby>通<rt>とお</rt></ruby><ruby>せば<rt></rt></ruby><ruby>完成<rt>かんせい</rt></ruby><ruby>するよ！<rt></rt></ruby>\n<ruby>Ａ：へえ、かわいいね。<rt></rt></ruby><ruby>着<rt>き</rt></ruby><ruby>せるのが<rt></rt></ruby><ruby>楽<rt>たの</rt></ruby><ruby>しみだね。<rt></rt></ruby>",
    english_translation: "A: There was a cloth and scissors on the desk, but what happened to them?\nB: I made some children's clothes. Look at this. I just have to put a rubber band through this part and it'll be finished!\nA: Wow, it's cute. I'm looking forward to having them wear it.",
    annotated_words: [
      { kanji: "布", furigana: "ぬの", meaning: "cloth" },
      { kanji: "はさみ", furigana: "", meaning: "scissors" },
      { kanji: "部分", furigana: "ぶぶん", meaning: "part" },
      { kanji: "ゴム", furigana: "", meaning: "elastic band, rubber band" },
      { kanji: "完成", furigana: "かんせい", meaning: "completion, complete" },
      { kanji: "着せる", furigana: "きせる", meaning: "put on, make wear, have wear" }
    ]
  },
  {
    id: "67_2",
    title: "Topic 4",
    japanese_text: "コートのベルトをリボンのように<ruby>結<rt>むす</rt></ruby><ruby>ぶとお<rt></rt></ruby><ruby>嬢<rt>じょう</rt></ruby><ruby>さんっぽい<rt></rt></ruby><ruby>雰囲気<rt>ふんいき</rt></ruby><ruby>になる。<rt></rt></ruby>",
    english_translation: "Tying the belt of a coat like a ribbon gives you young lady-like vibes.",
    annotated_words: [
      { kanji: "結ぶ", furigana: "むすぶ", meaning: "tie" },
      { kanji: "お嬢さん", furigana: "おじょうさん", meaning: "young lady" },
      { kanji: "雰囲気", furigana: "ふんいき", meaning: "vibe, atmosphere" }
    ]
  },
  {
    id: "68_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>今度<rt>こんど</rt></ruby><ruby>、<rt></rt></ruby><ruby>婚活<rt>こんかつ</rt></ruby><ruby>パーティー<rt></rt></ruby><ruby>行<rt>い</rt></ruby><ruby>くんだけど、この<rt></rt></ruby><ruby>服<rt>ふく</rt></ruby><ruby>どう？<rt></rt></ruby><ruby>似合<rt>にあ</rt></ruby><ruby>う？<rt></rt></ruby>\n<ruby>Ｂ：うーん、なんか<rt></rt></ruby><ruby>上下<rt>じょうげ</rt></ruby><ruby>ばらばらな<rt></rt></ruby><ruby>印象<rt>いんしょう</rt></ruby><ruby>だけど…。<rt></rt></ruby>\n<ruby>Ａ：えーそう？<rt></rt></ruby><ruby>流行<rt>りゅうこう</rt></ruby><ruby>を<rt></rt></ruby><ruby>追<rt>お</rt></ruby><ruby>いかけてみたんだけど。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>流行<rt>りゅうこう</rt></ruby><ruby>より、<rt></rt></ruby><ruby>体型<rt>たいけい</rt></ruby><ruby>に<rt></rt></ruby><ruby>合<rt>あ</rt></ruby><ruby>う<rt></rt></ruby><ruby>服<rt>ふく</rt></ruby><ruby>や<rt></rt></ruby><ruby>清潔感<rt>せいけつかん</rt></ruby><ruby>のある<rt></rt></ruby><ruby>服<rt>ふく</rt></ruby><ruby>を<rt></rt></ruby><ruby>身<rt>み</rt></ruby><ruby>に<rt></rt></ruby><ruby>付<rt>つ</rt></ruby><ruby>けるこ<rt></rt></ruby><ruby>との<rt></rt></ruby><ruby>方<rt>ほう</rt></ruby><ruby>が<rt></rt></ruby><ruby>大事<rt>だいじ</rt></ruby><ruby>だと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>うけど。<rt></rt></ruby>",
    english_translation: "A: I'm going to a matchmaking party, so what do you think about these clothes? Do they look good on me?\nB: Hmm, I get the feeling that the top and bottom don't match.\nA: What, really? I tried following the latest trends.\nB: I think that it's more important to wear clothes that fit your body type and feel neat than to follow trends.",
    annotated_words: [
      { kanji: "似合う", furigana: "にあう", meaning: "look good on, suit" },
      { kanji: "上下", furigana: "じょうげ", meaning: "top and bottom, up and down" },
      { kanji: "左右", furigana: "さゆう", meaning: "left and right" },
      { kanji: "前後", furigana: "ぜんご", meaning: "before and after" },
      { kanji: "ばらばらな", furigana: "", meaning: "not matching, separate" },
      { kanji: "流行", furigana: "りゅうこう", meaning: "trend, fad, be popular" },
      { kanji: "追いかける", furigana: "おいかける", meaning: "follow, chase" },
      { kanji: "身に付ける", furigana: "みにつける", meaning: "wear" }
    ]
  },
  {
    id: "68_2",
    title: "Topic 4",
    japanese_text: "<ruby>営業<rt>えいぎょう</rt></ruby><ruby>の<rt></rt></ruby><ruby>仕事<rt>しごと</rt></ruby><ruby>をしていると、お<rt></rt></ruby><ruby>客様<rt>きゃくさま</rt></ruby><ruby>と<rt></rt></ruby><ruby>会話<rt>かいわ</rt></ruby><ruby>する<rt></rt></ruby><ruby>場面<rt>ばめん</rt></ruby><ruby>が<rt></rt></ruby><ruby>多<rt>おお</rt></ruby><ruby>いので、<rt></rt></ruby><ruby>服装<rt>ふくそう</rt></ruby><ruby>には<rt></rt></ruby><ruby>気<rt>き</rt></ruby><ruby>をつかう。<rt></rt></ruby><ruby>特<rt>とく</rt></ruby><ruby>に、ジャケットは<rt></rt></ruby><ruby>明<rt>あか</rt></ruby><ruby>るい<rt></rt></ruby><ruby>色<rt>いろ</rt></ruby><ruby>を<rt></rt></ruby><ruby>選<rt>えら</rt></ruby><ruby>ぶよう<rt></rt></ruby><ruby>にしている。<rt></rt></ruby>",
    english_translation: "Working in sales, I have a lot of settings in which to talk with customers, so I end up being mindful about my clothes. In particular, I make sure to go with a jacket in a bright color.",
    annotated_words: [
      { kanji: "場面", furigana: "ばめん", meaning: "scene" },
      { kanji: "服装", furigana: "ふくそう", meaning: "clothing" },
      { kanji: "ジャケット", furigana: "", meaning: "jacket" }
    ]
  },
  {
    id: "69_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：このシャツって、<rt></rt></ruby><ruby>男性用<rt>だんせいよう</rt></ruby><ruby>ですか。<rt></rt></ruby>\n<ruby>Ｂ：はい、もともとは<rt></rt></ruby><ruby>男性用<rt>だんせいよう</rt></ruby><ruby>なんですが、<rt></rt></ruby><ruby>最近<rt>さいきん</rt></ruby><ruby>大<rt>おお</rt></ruby><ruby>きめのサイズの<rt></rt></ruby><ruby>シャツを<rt></rt></ruby><ruby>着<rt>き</rt></ruby><ruby>るのがはやっているので、<rt></rt></ruby><ruby>女性<rt>じょせい</rt></ruby><ruby>のお<rt></rt></ruby><ruby>客様<rt>きゃくさま</rt></ruby><ruby>でもお<rt></rt></ruby><ruby>しゃれに<rt></rt></ruby><ruby>着<rt>き</rt></ruby><ruby>ていただけますよ。<rt></rt></ruby>\n<ruby>Ａ：うーん、<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>が<rt></rt></ruby><ruby>着<rt>き</rt></ruby><ruby>るとパジャマっぽくなりそうで…。<rt></rt></ruby>",
    english_translation: "A: Is this shirt for men?\nB: Yes, it is originally for men, but recently, wearing large-sized shirts is in fashion, so women can also wear it and look stylish.\nA: Hmm, if I wear it, it'll probably look like pajamas on me...",
    annotated_words: [
      { kanji: "〜用", furigana: "〜よう", meaning: "for ~" },
      { kanji: "サイズ", furigana: "", meaning: "size" },
      { kanji: "おしゃれな", furigana: "", meaning: "stylish" },
      { kanji: "パジャマ", furigana: "", meaning: "pajamas" }
    ]
  }
];

topic4_data.forEach(story => {
  fs.writeFileSync(`src/data/tango_n3_raw/${story.id}.json`, JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
