const fs = require('fs');

const topic5_part2 = [
  {
    id: "83_1",
    title: "Topic 5",
    japanese_text: "<ruby>デジタル<rt></rt></ruby><ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>の<rt></rt></ruby><ruby>発達<rt>はったつ</rt></ruby><ruby>によって、スマートフォンで<rt></rt></ruby><ruby>簡単<rt>かんたん</rt></ruby><ruby>に<rt></rt></ruby><ruby>録音<rt>ろくおん</rt></ruby><ruby>したり<rt></rt></ruby><ruby>撮影<rt>さつえい</rt></ruby><ruby>したりできるようになった。<rt></rt></ruby>",
    english_translation: "The development of digital technology has made it easy to record sound or video with smartphones.",
    annotated_words: [
      { kanji: "デジタル", furigana: "", meaning: "digital" },
      { kanji: "アナログ", furigana: "", meaning: "analog" },
      { kanji: "技術", furigana: "ぎじゅつ", meaning: "technology" },
      { kanji: "録音", furigana: "ろくおん", meaning: "recording, record" },
      { kanji: "撮影", furigana: "さつえい", meaning: "filming, film" }
    ]
  },
  {
    id: "83_2",
    title: "Topic 5",
    japanese_text: "<ruby>今日<rt>きょう</rt></ruby><ruby>は<rt></rt></ruby><ruby>祝日<rt>しゅくじつ</rt></ruby><ruby>だったのに、<rt></rt></ruby><ruby>目覚<rt>めざ</rt></ruby><ruby>ましをいつも<rt></rt></ruby><ruby>通<rt>どお</rt></ruby><ruby>りにセットしてしまい、<rt></rt></ruby><ruby>朝<rt>あさ</rt></ruby><ruby>の<rt></rt></ruby>６<ruby>時<rt>じ</rt></ruby><ruby>にアラームが<rt></rt></ruby><ruby>鳴<rt>な</rt></ruby><ruby>ってしまった。<rt></rt></ruby>",
    english_translation: "Even though today was a public holiday, I set my alarm in the morning as always, and the alarm went off at 6 o'clock in the morning.",
    annotated_words: [
      { kanji: "祝日", furigana: "しゅくじつ", meaning: "public holiday" },
      { kanji: "目覚まし（時計）", furigana: "めざまし（とけい）", meaning: "alarm clock" },
      { kanji: "アラーム", furigana: "", meaning: "alarm" }
    ]
  },
  {
    id: "84_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：ウェブサイトの<rt></rt></ruby><ruby>広告<rt>こうこく</rt></ruby><ruby>って<rt></rt></ruby><ruby>本当<rt>ほんとう</rt></ruby><ruby>に<rt></rt></ruby><ruby>嫌<rt>きら</rt></ruby><ruby>い。なんか<rt></rt></ruby><ruby>画面<rt>がめん</rt></ruby><ruby>のあちこちに<rt></rt></ruby><ruby>出<rt>で</rt></ruby><ruby>てきて、うっかりクリックしそうになる。<rt></rt></ruby>\n<ruby>Ｂ：そういう<rt></rt></ruby><ruby>工夫<rt>くふう</rt></ruby><ruby>はしてほしくないよね。<rt></rt></ruby>",
    english_translation: "A: I really hate advertisements on websites. They just pop up all over the screen, and I always almost carelessly click on them.\nB: I wish they wouldn't design them like that.",
    annotated_words: [
      { kanji: "ウェブサイト", furigana: "", meaning: "website" },
      { kanji: "ウェブ", furigana: "", meaning: "web" },
      { kanji: "広告", furigana: "こうこく", meaning: "advertisement" },
      { kanji: "広告会社", furigana: "こうこくがいしゃ", meaning: "advertising company" },
      { kanji: "あちこち", furigana: "", meaning: "everywhere, here and there" },
      { kanji: "あちらこちら", furigana: "", meaning: "everywhere, here and there (polite speech)" },
      { kanji: "クリック", furigana: "", meaning: "click, click" },
      { kanji: "工夫", furigana: "くふう", meaning: "design, scheme" }
    ]
  },
  {
    id: "84_2",
    title: "Topic 5",
    japanese_text: "インストールするときに、<ruby>一緒<rt>いっしょ</rt></ruby><ruby>に<rt></rt></ruby><ruby>変<rt>へん</rt></ruby><ruby>なプログラムも<rt></rt></ruby><ruby>追加<rt>ついか</rt></ruby><ruby>するアプリがある。また、<rt></rt></ruby><ruby>勝手<rt>かって</rt></ruby><ruby>に<rt></rt></ruby><ruby>個人情報<rt>こじんじょうほう</rt></ruby><ruby>を<rt></rt></ruby><ruby>送信<rt>そうしん</rt></ruby><ruby>するアプリもあるので、インストール<rt></rt></ruby><ruby>前<rt>まえ</rt></ruby><ruby>には<rt></rt></ruby><ruby>注意<rt>ちゅうい</rt></ruby><ruby>が<rt></rt></ruby><ruby>必要<rt>ひつよう</rt></ruby><ruby>だ。<rt></rt></ruby>",
    english_translation: "There are applications that also add strange programs without permission when installing them. In addition, there are also apps that send personal information without permission, so take care before installing them.",
    annotated_words: [
      { kanji: "プログラム", furigana: "", meaning: "program" },
      { kanji: "追加", furigana: "ついか", meaning: "addition, add" },
      { kanji: "勝手な", furigana: "かってな", meaning: "without permission" }
    ]
  },
  {
    id: "85_1",
    title: "Topic 5",
    japanese_text: "<ruby>個人情報<rt>こじんじょうほう</rt></ruby><ruby>を<rt></rt></ruby><ruby>送信<rt>そうしん</rt></ruby><ruby>するアプリもあるので、インストール<rt></rt></ruby><ruby>前<rt>まえ</rt></ruby><ruby>には<rt></rt></ruby><ruby>注意<rt>ちゅうい</rt></ruby><ruby>が<rt></rt></ruby><ruby>必要<rt>ひつよう</rt></ruby><ruby>だ。<rt></rt></ruby>",
    english_translation: "There are applications that also add strange programs without permission when installing them. In addition, there are also apps that send personal information without permission, so take care before installing them.",
    annotated_words: [
      { kanji: "個人情報", furigana: "こじんじょうほう", meaning: "personal information" },
      { kanji: "情報", furigana: "じょうほう", meaning: "information" },
      { kanji: "送信", furigana: "そうしん", meaning: "transmission, transmit" },
      { kanji: "受信", furigana: "じゅしん", meaning: "receiving, receive" }
    ]
  },
  {
    id: "85_2",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：チャットの<rt></rt></ruby><ruby>通知<rt>つうち</rt></ruby><ruby>がどんどん<rt></rt></ruby><ruby>来<rt>く</rt></ruby><ruby>るのが<rt></rt></ruby><ruby>気<rt>き</rt></ruby><ruby>になるんだけど。<rt></rt></ruby><ruby>大<rt>たい</rt></ruby><ruby>したことじゃないときもあるし。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>通知停止<rt>つうちていし</rt></ruby><ruby>すればいいじゃん。<rt></rt></ruby><ruby>名前<rt>なまえ</rt></ruby><ruby>のところ<rt></rt></ruby><ruby>長押<rt>ながお</rt></ruby><ruby>しして。<rt></rt></ruby>\n<ruby>Ａ：なるほどー。みんなそうしてたんだ。<rt></rt></ruby>",
    english_translation: "A: I'm worried about these chat notifications that keep coming. Sometimes it's not even something important.\nB: You should turn off notifications. Press and hold on their name.\nA: I see. So that's what everyone does.",
    annotated_words: [
      { kanji: "チャット", furigana: "", meaning: "chat, chat" },
      { kanji: "通知", furigana: "つうち", meaning: "notice, give notice" },
      { kanji: "停止", furigana: "ていし", meaning: "stopping, stop" },
      { kanji: "長押し", furigana: "ながおし", meaning: "holding, long press, press (for a long time)" },
      { kanji: "なるほど", furigana: "", meaning: "I see" }
    ]
  },
  {
    id: "86_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：マウスがときどき<rt></rt></ruby><ruby>動<rt>うご</rt></ruby><ruby>かなくなるんですよ。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>無線<rt>むせん</rt></ruby><ruby>のマウスだったらたぶん<rt></rt></ruby><ruby>電池<rt>でんち</rt></ruby><ruby>が<rt></rt></ruby><ruby>切<rt>き</rt></ruby><ruby>れかけています。<rt></rt></ruby><ruby>交換<rt>こうかん</rt></ruby><ruby>すれば<rt></rt></ruby><ruby>直<rt>なお</rt></ruby><ruby>りますよ。<rt></rt></ruby>",
    english_translation: "A: My mouse stops moving sometimes.\nB: If it's a wireless mouse, the batteries are probably running out. If you replace them, it should work fine.",
    annotated_words: [
      { kanji: "マウス", furigana: "", meaning: "mouse" },
      { kanji: "無線", furigana: "むせん", meaning: "wireless" },
      { kanji: "有線", furigana: "ゆうせん", meaning: "wired" },
      { kanji: "電池", furigana: "でんち", meaning: "battery" },
      { kanji: "乾電池", furigana: "かんでんち", meaning: "dry cell" },
      { kanji: "交換", furigana: "こうかん", meaning: "exchange, exchange" }
    ]
  },
  {
    id: "86_2",
    title: "Topic 5",
    japanese_text: "<ruby>先日<rt>せんじつ</rt></ruby><ruby>、<rt></rt></ruby><ruby>落<rt>お</rt></ruby><ruby>とし<rt></rt></ruby><ruby>物<rt>もの</rt></ruby><ruby>をしたら、<rt></rt></ruby><ruby>拾<rt>ひろ</rt></ruby><ruby>って<rt></rt></ruby><ruby>届<rt>とど</rt></ruby><ruby>けてくれた<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>がいた。<rt></rt></ruby><ruby>神様<rt>かみさま</rt></ruby><ruby>みたいな<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>だと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>った。<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>もこれから<rt></rt></ruby><ruby>他人<rt>たにん</rt></ruby><ruby>に<rt></rt></ruby><ruby>親切<rt>しんせつ</rt></ruby><ruby>にしよう。<rt></rt></ruby>",
    english_translation: "The other day, I had a dropped something, and someone picked it up and delivered it to me. I thought that person was like a god. I will also try to help others from now on.",
    annotated_words: [
      { kanji: "落とし物", furigana: "おとしもの", meaning: "dropping something" },
      { kanji: "神様", furigana: "かみさま", meaning: "god" },
      { kanji: "神", furigana: "かみ", meaning: "god" },
      { kanji: "他人", furigana: "たにん", meaning: "(other) person, stranger" }
    ]
  },
  {
    id: "87_1",
    title: "Topic 5",
    japanese_text: "ある<ruby>国<rt>くに</rt></ruby><ruby>の<rt></rt></ruby><ruby>一流企業<rt>いちりゅうきぎょう</rt></ruby><ruby>の<rt></rt></ruby><ruby>製品<rt>せいひん</rt></ruby><ruby>であっても、<rt></rt></ruby><ruby>中身<rt>なかみ</rt></ruby><ruby>の<rt></rt></ruby><ruby>部品<rt>ぶひん</rt></ruby><ruby>は<rt></rt></ruby><ruby>別<rt>べつ</rt></ruby><ruby>の<rt></rt></ruby><ruby>国<rt>くに</rt></ruby><ruby>の<rt></rt></ruby><ruby>小<rt>ちい</rt></ruby><ruby>さな<rt></rt></ruby><ruby>会社<rt>かいしゃ</rt></ruby><ruby>で<rt></rt></ruby><ruby>製造<rt>せいぞう</rt></ruby><ruby>されていることがある。<rt></rt></ruby>",
    english_translation: "Even though a product may be a leading company of one country, there are times when the parts inside are manufactured at small companies in another country.",
    annotated_words: [
      { kanji: "一流", furigana: "いちりゅう", meaning: "top, top tier" },
      { kanji: "製品", furigana: "せいひん", meaning: "product" },
      { kanji: "中身", furigana: "なかみ", meaning: "inside, content" },
      { kanji: "部品", furigana: "ぶひん", meaning: "part" },
      { kanji: "製造", furigana: "せいぞう", meaning: "manufacturing, manufacture" }
    ]
  },
  {
    id: "87_2",
    title: "Topic 5",
    japanese_text: "<ruby>文字<rt>もじ</rt></ruby><ruby>だけの<rt></rt></ruby><ruby>発言<rt>はつげん</rt></ruby><ruby>は<rt></rt></ruby><ruby>誤解<rt>ごかい</rt></ruby><ruby>されることも<rt></rt></ruby><ruby>多<rt>おお</rt></ruby><ruby>い。だからこそ、<rt></rt></ruby><ruby>親近感<rt>しんきんかん</rt></ruby><ruby>を<rt></rt></ruby><ruby>表<rt>あらわ</rt></ruby><ruby>すために、<rt></rt></ruby><ruby>絵文字<rt>えもじ</rt></ruby><ruby>やスタンプが<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>われる。<rt></rt></ruby>",
    english_translation: "Transmissions that only use letters are often misunderstood. So, in order to express a feeling of familiarity, things like emojis and stamps are used.",
    annotated_words: [
      { kanji: "発言", furigana: "はつげん", meaning: "message, transmission, send a message, speak" },
      { kanji: "誤解", furigana: "ごかい", meaning: "misunderstanding, misunderstand" },
      { kanji: "〜感", furigana: "〜かん", meaning: "feeling of ~" },
      { kanji: "絵文字", furigana: "えもじ", meaning: "emoji" },
      { kanji: "スタンプ", furigana: "", meaning: "stamp" }
    ]
  },
  {
    id: "88_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：メールの<rt></rt></ruby><ruby>件名<rt>けんめい</rt></ruby><ruby>、<rt></rt></ruby><ruby>全然変<rt>ぜんぜんか</rt></ruby><ruby>えない<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>がいるけど、<rt></rt></ruby><ruby>許<rt>ゆる</rt></ruby><ruby>せないんだよね。<rt></rt></ruby>\n<ruby>Ｂ：え、でも、<rt></rt></ruby><ruby>返信<rt>へんしん</rt></ruby><ruby>のときは<rt></rt></ruby><ruby>変<rt>か</rt></ruby><ruby>えない。<rt></rt></ruby><ruby>変<rt>か</rt></ruby><ruby>えたら<rt></rt></ruby><ruby>失礼<rt>しつれい</rt></ruby><ruby>じゃない？<rt></rt></ruby>\n<ruby>Ａ：でも、<rt></rt></ruby><ruby>返信<rt>へんしん</rt></ruby><ruby>や<rt></rt></ruby><ruby>転送<rt>てんそう</rt></ruby><ruby>が<rt></rt></ruby><ruby>続<rt>つづ</rt></ruby><ruby>くと、<rt></rt></ruby><ruby>記号<rt>きごう</rt></ruby><ruby>が<rt></rt></ruby><ruby>増<rt>ふ</rt></ruby><ruby>えて<rt></rt></ruby><ruby>長<rt>なが</rt></ruby><ruby>くなるでしょ。<rt></rt></ruby><ruby>最大<rt>さいだい</rt></ruby>20<ruby>文字<rt>もじ</rt></ruby><ruby>ぐらいになるようにしてるな。<rt></rt></ruby>",
    english_translation: "A: Isn't it unforgivable how there are some people who don't change the subjects of their email at all?\nB: But I don't change it when replying. Wouldn't it be rude if you did?\nA: But as it continues to be replied to or forwarded, the number of symbols increases, and the subject gets longer. I make sure it's never more than 20 characters.",
    annotated_words: [
      { kanji: "件名", furigana: "けんめい", meaning: "subject" },
      { kanji: "返信", furigana: "へんしん", meaning: "reply, reply (to an email)" },
      { kanji: "転送", furigana: "てんそう", meaning: "forwarding, forward (an email)" },
      { kanji: "最大", furigana: "さいだい", meaning: "maximum" },
      { kanji: "最小", furigana: "さいしょう", meaning: "minimum" }
    ]
  },
  {
    id: "88_2",
    title: "Topic 5",
    japanese_text: "<ruby>紙<rt>かみ</rt></ruby><ruby>のアルバムの<rt></rt></ruby><ruby>中<rt>なか</rt></ruby><ruby>の<rt></rt></ruby><ruby>写真<rt>しゃしん</rt></ruby><ruby>をスキャンして、インターネットに<rt></rt></ruby><ruby>移<rt>うつ</rt></ruby><ruby>した。<rt></rt></ruby>",
    english_translation: "I scanned the pictures in my paper album and transferred them to the internet.",
    annotated_words: [
      { kanji: "アルバム", furigana: "", meaning: "album" },
      { kanji: "スキャン", furigana: "", meaning: "scanning, scan" },
      { kanji: "移す", furigana: "うつす", meaning: "transfer, move" },
      { kanji: "移る", furigana: "うつる", meaning: "be transferred, be moved" }
    ]
  },
  {
    id: "89_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：アンケートに<rt></rt></ruby><ruby>答<rt>こた</rt></ruby><ruby>えたら<rt></rt></ruby><ruby>回答者<rt>かいとうしゃ</rt></ruby><ruby>にプレゼントが<rt></rt></ruby><ruby>当<rt>あ</rt></ruby><ruby>たるっていうの、あるでしょ。あれ、<rt></rt></ruby><ruby>本当<rt>ほんとう</rt></ruby><ruby>に<rt></rt></ruby><ruby>当<rt>あ</rt></ruby><ruby>たるのかな。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>子<rt>こ</rt></ruby><ruby>どものとき、<rt></rt></ruby><ruby>漫画雑誌<rt>まんがざっし</rt></ruby><ruby>のアンケートでスマホのケース<rt></rt></ruby><ruby>当<rt>あ</rt></ruby><ruby>たったことあるよ。１<rt></rt></ruby><ruby>位<rt>い</rt></ruby><ruby>はゲーム<rt></rt></ruby><ruby>機<rt>き</rt></ruby><ruby>だったけど、それは<rt></rt></ruby><ruby>当<rt>あ</rt></ruby><ruby>たった<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>には<rt></rt></ruby><ruby>会<rt>あ</rt></ruby><ruby>ったことないなあ。<rt></rt></ruby>",
    english_translation: "A: You know how there are surveys where you could win a present if you answer them? I wonder if you can really win anything.\nB: When I was a kid, I won a smartphone case from a survey in a manga magazine. First place was a game console, but I've never met anyone who's won one.",
    annotated_words: [
      { kanji: "アンケート", furigana: "", meaning: "survey" },
      { kanji: "〜者", furigana: "〜しゃ", meaning: "person" },
      { kanji: "ケース", furigana: "", meaning: "case" },
      { kanji: "〜機", furigana: "〜き", meaning: "console, machine" }
    ]
  }
];

topic5_part2.forEach(story => {
  fs.writeFileSync(`src/data/tango_n3_raw/${story.id}.json`, JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
