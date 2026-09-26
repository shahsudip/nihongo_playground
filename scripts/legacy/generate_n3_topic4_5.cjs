const fs = require('fs');

const topic4_remaining = [
  {
    id: "70_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：どうしたの、その<rt></rt></ruby><ruby>唇<rt>くちびる</rt></ruby><ruby>。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>新<rt>あたら</rt></ruby><ruby>しい<rt></rt></ruby><ruby>口紅<rt>くちべに</rt></ruby><ruby>つけてみたの！ どう？<rt></rt></ruby>\n<ruby>Ａ：うーん、ちょっときらきらしすぎて、<rt></rt></ruby><ruby>不自然<rt>ふしぜん</rt></ruby><ruby>と<rt></rt></ruby><ruby>言<rt>い</rt></ruby><ruby>うか…<rt></rt></ruby><ruby>浮<rt>う</rt></ruby><ruby>い<rt></rt></ruby><ruby>てる<rt></rt></ruby><ruby>感<rt>かん</rt></ruby><ruby>じがする。<rt></rt></ruby>\n<ruby>Ｂ：えー、せっかく<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>ったのに。<rt></rt></ruby>",
    english_translation: "A: What's that on your lips?\nB: I tried wearing a new lipstick! How is it?\nA: Hmm, it's a little too sparkly and I'd say unnatural... or out of place.\nB: Aw, but I already bought and paid for it.",
    annotated_words: [
      { kanji: "唇", furigana: "くちびる", meaning: "lips" },
      { kanji: "口紅", furigana: "くちべに", meaning: "lipstick" },
      { kanji: "きらきらする", furigana: "", meaning: "be sparkly" },
      { kanji: "不〜", furigana: "ふ〜", meaning: "un~" },
      { kanji: "浮く", furigana: "うく", meaning: "be out of place, float" }
    ]
  },
  {
    id: "70_2",
    title: "Topic 4",
    japanese_text: "<ruby>実<rt>じつ</rt></ruby><ruby>は<rt></rt></ruby><ruby>最近<rt>さいきん</rt></ruby><ruby>、ピアスをする<rt></rt></ruby><ruby>若者<rt>わかもの</rt></ruby><ruby>が<rt></rt></ruby><ruby>減<rt>へ</rt></ruby><ruby>っている。<rt></rt></ruby><ruby>自分<rt>じぶん</rt></ruby><ruby>の<rt></rt></ruby><ruby>体<rt>からだ</rt></ruby><ruby>に<rt></rt></ruby><ruby>穴<rt>あな</rt></ruby><ruby>を<rt></rt></ruby><ruby>開<rt>あ</rt></ruby><ruby>けるのが<rt></rt></ruby><ruby>嫌<rt>いや</rt></ruby><ruby>だというのが<rt></rt></ruby><ruby>理由<rt>りゆう</rt></ruby><ruby>らしい。<rt></rt></ruby>",
    english_translation: "Actually, the number of young people getting piercings has been decreasing recently. It seems that it's because they don't want to open holes in their bodies.",
    annotated_words: [
      { kanji: "実は", furigana: "じつは", meaning: "actually" },
      { kanji: "ピアス", furigana: "", meaning: "piercing, earrings" },
      { kanji: "穴", furigana: "あな", meaning: "hole" }
    ]
  },
  {
    id: "71_1",
    title: "Topic 4",
    japanese_text: "<ruby>誕生日<rt>たんじょうび</rt></ruby><ruby>に<rt></rt></ruby><ruby>彼<rt>かれ</rt></ruby><ruby>からネックレスとイヤリングをもらったが、<rt></rt></ruby><ruby>個性的<rt>こせいてき</rt></ruby><ruby>なデザインで<rt></rt></ruby><ruby>着<rt>つ</rt></ruby><ruby>ける<rt></rt></ruby><ruby>機会<rt>きかい</rt></ruby><ruby>がない。<rt></rt></ruby>",
    english_translation: "I got a necklace and earrings from my boyfriend on my birthday, but it's such a unique design that I have no opportunity to wear them.",
    annotated_words: [
      { kanji: "ネックレス", furigana: "", meaning: "necklace" },
      { kanji: "イヤリング", furigana: "", meaning: "earrings" },
      { kanji: "個性的な", furigana: "こせいてきな", meaning: "unique" },
      { kanji: "個性", furigana: "こせい", meaning: "uniqueness" },
      { kanji: "着ける", furigana: "つける", meaning: "wear" }
    ]
  },
  {
    id: "71_2",
    title: "Topic 4",
    japanese_text: "せっかくいいデザインのブーツがあったのに、<ruby>試着<rt>しちゃく</rt></ruby><ruby>するとファスナーが<rt></rt></ruby><ruby>閉<rt>し</rt></ruby><ruby>まらなかった。<rt></rt></ruby>",
    english_translation: "Even though there were some boots with a nice design, the zipper wouldn't close when I tried them on.",
    annotated_words: [
      { kanji: "デザイン", furigana: "", meaning: "design, design" },
      { kanji: "デザイナー", furigana: "", meaning: "designer" },
      { kanji: "ブーツ", furigana: "", meaning: "boots" },
      { kanji: "ファスナー", furigana: "", meaning: "zipper" }
    ]
  },
  {
    id: "72_1",
    title: "Topic 4",
    japanese_text: "<ruby>Ａ：あ、お<rt></rt></ruby><ruby>母<rt>かあ</rt></ruby><ruby>さん、<rt></rt></ruby><ruby>制服<rt>せいふく</rt></ruby><ruby>のシャツのボタンが<rt></rt></ruby><ruby>取<rt>と</rt></ruby><ruby>れちゃって…。<rt></rt></ruby><ruby>付<rt>つ</rt></ruby><ruby>けてくれない？<rt></rt></ruby>\n<ruby>Ｂ：いいけど、どこのボタン？ ああ、<rt></rt></ruby><ruby>右<rt>みぎ</rt></ruby><ruby>の<rt></rt></ruby><ruby>袖<rt>そで</rt></ruby><ruby>ね。ボタン<rt></rt></ruby><ruby>用<rt>よう</rt></ruby><ruby>の<rt></rt></ruby><ruby>糸<rt>いと</rt></ruby><ruby>、あったかな？<rt></rt></ruby>",
    english_translation: "A: Oh, Mom, one of my uniform shirt buttons came off... Can you put it back on?\nB: Sure, but which button? Oh, the right sleeve. Do we have thread for the button?",
    annotated_words: [
      { kanji: "制服", furigana: "せいふく", meaning: "uniform" },
      { kanji: "取れる", furigana: "とれる", meaning: "come off" },
      { kanji: "付ける", furigana: "つける", meaning: "put on, attach" },
      { kanji: "袖", furigana: "そで", meaning: "sleeve" },
      { kanji: "長袖", furigana: "ながそで", meaning: "long sleeves" },
      { kanji: "半袖", furigana: "はんそで", meaning: "shirtsleeves" },
      { kanji: "糸", furigana: "いと", meaning: "yarn" }
    ]
  },
  // TOPIC 5: Technology
  {
    id: "74_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>昨日<rt>きのう</rt></ruby><ruby>スマホ<rt></rt></ruby><ruby>落<rt>お</rt></ruby><ruby>としちゃって、<rt></rt></ruby><ruby>画面<rt>がめん</rt></ruby><ruby>割<rt>わ</rt></ruby><ruby>れた。<rt></rt></ruby><ruby>修理<rt>しゅうり</rt></ruby><ruby>も<rt></rt></ruby><ruby>無理<rt>むり</rt></ruby><ruby>だって。ショックだよー。<rt></rt></ruby>\n<ruby>Ｂ：え、カバー<rt></rt></ruby><ruby>付<rt>つ</rt></ruby><ruby>けてなかったの？<rt></rt></ruby>\n<ruby>Ａ：<rt></rt></ruby><ruby>今度<rt>こんど</rt></ruby><ruby>から<rt></rt></ruby><ruby>付<rt>つ</rt></ruby><ruby>けるようにする。<rt></rt></ruby>",
    english_translation: "A: Yesterday, I dropped my smartphone and broke the screen. They said it's impossible to repair. I'm in shock.\nB: What, didn't you put a cover on it?\nA: I'll be sure to put one on the next time.",
    annotated_words: [
      { kanji: "画面", furigana: "がめん", meaning: "screen" },
      { kanji: "画面共有", furigana: "がめんきょうゆう", meaning: "screen sharing" },
      { kanji: "割れる", furigana: "われる", meaning: "break" },
      { kanji: "割る", furigana: "わる", meaning: "be broken" },
      { kanji: "修理", furigana: "しゅうり", meaning: "repairs, repair" },
      { kanji: "ショック", furigana: "", meaning: "shock" },
      { kanji: "カバー", furigana: "", meaning: "cover" }
    ]
  },
  {
    id: "74_2",
    title: "Topic 5",
    japanese_text: "<ruby>化学<rt>かがく</rt></ruby><ruby>の<rt></rt></ruby><ruby>実験<rt>じっけん</rt></ruby><ruby>の<rt></rt></ruby><ruby>授業<rt>じゅぎょう</rt></ruby><ruby>で、<rt></rt></ruby><ruby>学生<rt>がくせい</rt></ruby><ruby>が<rt></rt></ruby><ruby>死亡<rt>しぼう</rt></ruby><ruby>するという<rt></rt></ruby><ruby>事故<rt>じこ</rt></ruby><ruby>があった。<rt></rt></ruby><ruby>大<rt>おお</rt></ruby><ruby>きな<rt></rt></ruby><ruby>騒<rt>さわ</rt></ruby><ruby>ぎになった。<rt></rt></ruby>",
    english_translation: "There was an incident where a student died during a chemistry experiment in class. There was a big uproar about it.",
    annotated_words: [
      { kanji: "実験", furigana: "じっけん", meaning: "experiment, do an experiment" },
      { kanji: "死亡", furigana: "しぼう", meaning: "death, die" },
      { kanji: "騒ぎ", furigana: "さわぎ", meaning: "uproar" }
    ]
  },
  {
    id: "75_1",
    title: "Topic 5",
    japanese_text: "<ruby>資料<rt>しりょう</rt></ruby><ruby>は<rt></rt></ruby><ruby>以下<rt>いか</rt></ruby><ruby>のアドレスにアップしましたので、ダウンロードしてください。<rt></rt></ruby><ruby>紙<rt>かみ</rt></ruby><ruby>の<rt></rt></ruby><ruby>資料<rt>しりょう</rt></ruby><ruby>が<rt></rt></ruby><ruby>欲<rt>ほ</rt></ruby><ruby>しい<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>は、<rt></rt></ruby><ruby>自分<rt>じぶん</rt></ruby><ruby>で<rt></rt></ruby><ruby>印刷<rt>いんさつ</rt></ruby><ruby>してください。<rt></rt></ruby>",
    english_translation: "The materials have been uploaded to the following address, so please download them. If you would like paper materials, please print them yourself.",
    annotated_words: [
      { kanji: "資料", furigana: "しりょう", meaning: "materials, document" },
      { kanji: "アドレス", furigana: "", meaning: "address" },
      { kanji: "アップ（ロード）", furigana: "", meaning: "uploading, upload" },
      { kanji: "ダウンロード", furigana: "", meaning: "downloading, download" },
      { kanji: "印刷", furigana: "いんさつ", meaning: "printing, print" }
    ]
  },
  {
    id: "75_2",
    title: "Topic 5",
    japanese_text: "「<ruby>携帯電話<rt>けいたいでんわ</rt></ruby><ruby>」という<rt></rt></ruby><ruby>名前<rt>なまえ</rt></ruby><ruby>だが、<rt></rt></ruby><ruby>主<rt>おも</rt></ruby><ruby>にアプリを<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>っている。<rt></rt></ruby><ruby>通話<rt>つうわ</rt></ruby><ruby>するとお<rt></rt></ruby><ruby>金<rt>かね</rt></ruby><ruby>がかかるので、<rt></rt></ruby><ruby>友人<rt>ゆうじん</rt></ruby><ruby>との<rt></rt></ruby><ruby>会話<rt>かいわ</rt></ruby><ruby>は<rt></rt></ruby><ruby>全<rt>すべ</rt></ruby><ruby>てチャットを<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>っている。<rt></rt></ruby>",
    english_translation: "It may be called a \"mobile phone,\" but I mainly use apps. Making calls costs money, so all of my conversations with friends are over chat apps.",
    annotated_words: [
      { kanji: "主に", furigana: "おもに", meaning: "mainly" },
      { kanji: "通話", furigana: "つうわ", meaning: "calling, call" },
      { kanji: "かかる", furigana: "", meaning: "take, cost" },
      { kanji: "全て", furigana: "すべて", meaning: "all" }
    ]
  },
  {
    id: "76_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>、スケジュールはスマホじゃなくて、<rt></rt></ruby><ruby>手帳<rt>てちょう</rt></ruby><ruby>で<rt></rt></ruby><ruby>管理<rt>かんり</rt></ruby><ruby>してるな。<rt></rt></ruby><ruby>自由<rt>じゆう</rt></ruby><ruby>に<rt></rt></ruby><ruby>書<rt>か</rt></ruby><ruby>けるし。<rt></rt></ruby>\n<ruby>Ｂ：あ、<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>はそれもスマホでやってる。なんかアイコンで<rt></rt></ruby><ruby>自由<rt>じゆう</rt></ruby><ruby>に<rt></rt></ruby><ruby>印<rt>しるし</rt></ruby><ruby>つけられるから、カラフルで<rt></rt></ruby><ruby>楽<rt>たの</rt></ruby><ruby>しいよ。<rt></rt></ruby>",
    english_translation: "A: I manage my schedule in a notebook rather than on a smartphone. I can write freely.\nB: Oh, I do that with a smartphone too. It's colorful and fun because you can freely place stamps with an icon.",
    annotated_words: [
      { kanji: "スケジュール", furigana: "", meaning: "schedule" },
      { kanji: "手帳", furigana: "てちょう", meaning: "notebook" },
      { kanji: "アイコン", furigana: "", meaning: "icon" },
      { kanji: "印", furigana: "しるし", meaning: "mark" },
      { kanji: "カラフルな", furigana: "", meaning: "colorful" }
    ]
  },
  {
    id: "76_2",
    title: "Topic 5",
    japanese_text: "このマイクはピンで<ruby>服<rt>ふく</rt></ruby><ruby>に<rt></rt></ruby><ruby>止<rt>と</rt></ruby><ruby>めて<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>います。このスイッチを<rt></rt></ruby><ruby>押<rt>お</rt></ruby><ruby>すと<rt></rt></ruby><ruby>電源<rt>でんげん</rt></ruby><ruby>が<rt></rt></ruby><ruby>入<rt>はい</rt></ruby><ruby>ります。あとは<rt></rt></ruby><ruby>普通<rt>ふつう</rt></ruby><ruby>に<rt></rt></ruby><ruby>話<rt>はな</rt></ruby><ruby>せば、<rt></rt></ruby><ruby>声<rt>こえ</rt></ruby><ruby>がマイクに<rt></rt></ruby><ruby>入<rt>はい</rt></ruby><ruby>ります。<rt></rt></ruby>",
    english_translation: "This microphone is a pin microphone and is attached to clothing. Press this switch to turn on the power. After that, just speak normally, and your voice will be picked up by the microphone.",
    annotated_words: [
      { kanji: "マイク", furigana: "", meaning: "microphone" },
      { kanji: "ピン", furigana: "", meaning: "pin" },
      { kanji: "スイッチ", furigana: "", meaning: "switch" },
      { kanji: "電源", furigana: "でんげん", meaning: "power" }
    ]
  },
  {
    id: "77_1",
    title: "Topic 5",
    japanese_text: "<ruby>待<rt>ま</rt></ruby><ruby>ち<rt></rt></ruby><ruby>合<rt>あ</rt></ruby><ruby>わせの<rt></rt></ruby><ruby>日時<rt>にちじ</rt></ruby><ruby>は<rt></rt></ruby><ruby>以下<rt>いか</rt></ruby><ruby>の<rt></rt></ruby><ruby>通<rt>とお</rt></ruby><ruby>りです。あと、<rt></rt></ruby><ruby>場所<rt>ばしょ</rt></ruby><ruby>は<rt></rt></ruby><ruby>分<rt>わ</rt></ruby><ruby>かりにくいので、マップで<rt></rt></ruby><ruby>示<rt>しめ</rt></ruby><ruby>します。リンク<rt></rt></ruby><ruby>先<rt>さき</rt></ruby><ruby>を<rt></rt></ruby><ruby>見<rt>み</rt></ruby><ruby>てください。<rt></rt></ruby>",
    english_translation: "The date and time of the meeting is as follows. Also, the location is difficult to understand, so I will show it on a map. Please see the link.",
    annotated_words: [
      { kanji: "待ち合わせ", furigana: "まちあわせ", meaning: "meeting" },
      { kanji: "待ち合わせる", furigana: "まちあわせる", meaning: "meet with, have a meeting" },
      { kanji: "日時", furigana: "にちじ", meaning: "date and time" },
      { kanji: "マップ", furigana: "", meaning: "map" },
      { kanji: "リンク先", furigana: "リンクさき", meaning: "link destination" },
      { kanji: "リンク", furigana: "", meaning: "link, link to" }
    ]
  },
  {
    id: "77_2",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：あれ、ここ<rt></rt></ruby><ruby>電波<rt>でんぱ</rt></ruby><ruby>悪<rt>わる</rt></ruby><ruby>い？ なんか<rt></rt></ruby><ruby>全然表示<rt>ぜんぜんひょうじ</rt></ruby><ruby>されないんだけど。<rt></rt></ruby>\n<ruby>Ｂ：ん？ こっちは<rt></rt></ruby><ruby>問題<rt>もんだい</rt></ruby><ruby>ないけど。<rt></rt></ruby>\n<ruby>Ａ：あ、しまった。<rt></rt></ruby><ruby>今月通信量<rt>こんげつつうしんりょう</rt></ruby><ruby>が<rt></rt></ruby><ruby>多<rt>おお</rt></ruby><ruby>くて、<rt></rt></ruby><ruby>速度制限<rt>そくどせいげん</rt></ruby><ruby>かかったんだっ<rt></rt></ruby><ruby>た。<rt></rt></ruby><ruby>動画見<rt>どうがみ</rt></ruby><ruby>すぎたよ。<rt></rt></ruby>",
    english_translation: "A: Huh, reception is bad here. Nothing is being displayed at all.\nB: What? I'm not having any problems.\nA: Oh, my mistake. I had a lot of communication traffic this month, and they put a speed limit on my phone. I watched too many videos.",
    annotated_words: [
      { kanji: "電波", furigana: "でんぱ", meaning: "reception, signal" },
      { kanji: "速度", furigana: "そくど", meaning: "speed" },
      { kanji: "制限", furigana: "せいげん", meaning: "limit, limit" }
    ]
  },
  {
    id: "78_1",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：あ、ごめん、もう<rt></rt></ruby><ruby>充電<rt>じゅうでん</rt></ruby><ruby>切<rt>き</rt></ruby><ruby>れそう。<rt></rt></ruby>\n<ruby>Ｂ：え、まだお<rt></rt></ruby><ruby>昼<rt>ひる</rt></ruby><ruby>だよ。そんなことある？<rt></rt></ruby>\n<ruby>Ａ：いやー、<rt></rt></ruby><ruby>夜<rt>よる</rt></ruby><ruby>に<rt></rt></ruby><ruby>充電<rt>じゅうでん</rt></ruby><ruby>したつもりだったんだけど、コンセントからケーブルが<rt></rt></ruby><ruby>抜<rt>ぬ</rt></ruby><ruby>けてて。<rt></rt></ruby>",
    english_translation: "A: Oh, I'm sorry, it looks like my battery is already about to run out.\nB: What? But it's only the afternoon. How is that possible?\nA: I meant to charge it (last) night, but the plug came out of the outlet.",
    annotated_words: [
      { kanji: "充電", furigana: "じゅうでん", meaning: "charging, charge (a battery)" },
      { kanji: "コンセント", furigana: "", meaning: "(power) outlet" },
      { kanji: "ケーブル", furigana: "", meaning: "cable" },
      { kanji: "抜ける", furigana: "ぬける", meaning: "be pulled out, be removed" },
      { kanji: "抜く", furigana: "ぬく", meaning: "pull out, remove" }
    ]
  },
  {
    id: "78_2",
    title: "Topic 5",
    japanese_text: "<ruby>容量<rt>ようりょう</rt></ruby><ruby>がすぐになくなるので、<rt></rt></ruby><ruby>無駄<rt>むだ</rt></ruby><ruby>なデータや<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>わないファイルはなるべく<rt></rt></ruby><ruby>消<rt>け</rt></ruby><ruby>すようにしている。<rt></rt></ruby>",
    english_translation: "Since I (always) run out of storage space so quickly, I try to delete as much unneeded data and files as I can.",
    annotated_words: [
      { kanji: "容量", furigana: "ようりょう", meaning: "capacity" },
      { kanji: "無駄な", furigana: "むだな", meaning: "useless" },
      { kanji: "データ", furigana: "", meaning: "data" },
      { kanji: "ファイル", furigana: "", meaning: "file" }
    ]
  },
  {
    id: "79_1",
    title: "Topic 5",
    japanese_text: "メールアドレスを<ruby>間違<rt>まちが</rt></ruby><ruby>って、<rt></rt></ruby><ruby>他<rt>ほか</rt></ruby><ruby>の<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>にメールを<rt></rt></ruby><ruby>送<rt>おく</rt></ruby><ruby>らないように<rt></rt></ruby><ruby>注意<rt>ちゅうい</rt></ruby><ruby>しないといけない。うっかり<rt></rt></ruby><ruby>本人<rt>ほんにん</rt></ruby><ruby>に<rt></rt></ruby><ruby>悪口<rt>わるぐち</rt></ruby><ruby>を<rt></rt></ruby><ruby>書<rt>か</rt></ruby><ruby>いたメールを<rt></rt></ruby><ruby>送<rt>おく</rt></ruby><ruby>ったら、<rt></rt></ruby><ruby>最悪<rt>さいあく</rt></ruby><ruby>だ。<rt></rt></ruby>",
    english_translation: "You must be careful not to get email addresses wrong and send emails to other people. Carelessly sending an email bad-mouthing the actual person you're sending it to is the worst.",
    annotated_words: [
      { kanji: "メールアドレス", furigana: "", meaning: "email address" },
      { kanji: "間違う", furigana: "まちがう", meaning: "make a mistake" },
      { kanji: "間違い", furigana: "まちがい", meaning: "mistake" },
      { kanji: "うっかり", furigana: "", meaning: "inadvertently" },
      { kanji: "本人", furigana: "ほんにん", meaning: "actual person" },
      { kanji: "悪口", furigana: "わるぐち", meaning: "bad words" },
      { kanji: "最悪な", furigana: "さいあくな", meaning: "worst" }
    ]
  },
  {
    id: "79_2",
    title: "Topic 5",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby><ruby>のパソコンはモニターを<rt></rt></ruby>２<ruby>台使用<rt>だいしよう</rt></ruby><ruby>している。さまざまなアプリを<rt></rt></ruby><ruby>同時<rt>どうじ</rt></ruby><ruby>に<rt></rt></ruby><ruby>表示<rt>ひょうじ</rt></ruby><ruby>できるので、<rt></rt></ruby><ruby>便利<rt>べんり</rt></ruby><ruby>だ。<rt></rt></ruby>",
    english_translation: "My personal computer uses two monitors. It is convenient because I can view various apps simultaneously.",
    annotated_words: [
      { kanji: "モニター", furigana: "", meaning: "monitor" },
      { kanji: "使用", furigana: "しよう", meaning: "usage, use" },
      { kanji: "さまざまな", furigana: "", meaning: "various" },
      { kanji: "同時", furigana: "どうじ", meaning: "simultaneous" }
    ]
  },
  {
    id: "80_1",
    title: "Topic 5",
    japanese_text: "<ruby>最近<rt>さいきん</rt></ruby><ruby>の<rt></rt></ruby><ruby>翻訳<rt>ほんやく</rt></ruby><ruby>アプリは<rt></rt></ruby><ruby>音声入力<rt>おんせいにゅうりょく</rt></ruby><ruby>で<rt></rt></ruby><ruby>話<rt>はな</rt></ruby><ruby>した<rt></rt></ruby><ruby>言葉<rt>ことば</rt></ruby><ruby>を<rt></rt></ruby><ruby>次々<rt>つぎつぎ</rt></ruby><ruby>と<rt></rt></ruby><ruby>訳<rt>やく</rt></ruby><ruby>してくれ<rt></rt></ruby><ruby>る。しかも、よく<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>う<rt></rt></ruby><ruby>表現<rt>ひょうげん</rt></ruby><ruby>は<rt></rt></ruby><ruby>保存<rt>ほぞん</rt></ruby><ruby>できる。これで<rt></rt></ruby><ruby>無料<rt>むりょう</rt></ruby><ruby>というの<rt></rt></ruby><ruby>が<rt></rt></ruby><ruby>信<rt>しん</rt></ruby><ruby>じられない。<rt></rt></ruby>",
    english_translation: "Recent translation apps can continuously translate the words spoken into them. Moreover, often-used expressions can be saved. I can't believe something like this is free.",
    annotated_words: [
      { kanji: "翻訳", furigana: "ほんやく", meaning: "translation, translate" },
      { kanji: "音声", furigana: "おんせい", meaning: "voice" },
      { kanji: "次々（と）", furigana: "つぎつぎ（と）", meaning: "continuously" },
      { kanji: "訳す", furigana: "やくす", meaning: "translate" },
      { kanji: "訳", furigana: "やく", meaning: "translation" },
      { kanji: "保存", furigana: "ほぞん", meaning: "saving, save" },
      { kanji: "無料", furigana: "むりょう", meaning: "free" },
      { kanji: "有料", furigana: "ゆうりょう", meaning: "paid, not free" }
    ]
  },
  {
    id: "80_2",
    title: "Topic 5",
    japanese_text: "<ruby>Ａ：パスワードってさ、<rt></rt></ruby><ruby>数字<rt>すうじ</rt></ruby><ruby>があるものとか、<rt></rt></ruby><ruby>文字<rt>もじ</rt></ruby><ruby>だけのものと<rt></rt></ruby><ruby>かいろいろあって<rt></rt></ruby><ruby>覚<rt>おぼ</rt></ruby><ruby>えるのが<rt></rt></ruby><ruby>大変<rt>たいへん</rt></ruby><ruby>じゃない？ しかも<rt></rt></ruby><ruby>数回間<rt>すうかいま</rt></ruby><ruby>違<rt>ちが</rt></ruby><ruby>えたら、ロックされるし。<rt></rt></ruby>\n<ruby>Ｂ：それならパスワード<rt></rt></ruby><ruby>管理<rt>かんり</rt></ruby><ruby>アプリをインストールするといいよ。<rt></rt></ruby>",
    english_translation: "A: Isn't it really difficult to remember passwords when you've got some with numbers and some with only letters or something? What's more, if you get it wrong several times, your account will be locked.\nB: If that's the case, then you should install a password management app.",
    annotated_words: [
      { kanji: "パスワード", furigana: "", meaning: "password" },
      { kanji: "数字", furigana: "すうじ", meaning: "number" },
      { kanji: "文字", furigana: "もじ", meaning: "letter" },
      { kanji: "数回", furigana: "すうかい", meaning: "several times" },
      { kanji: "ロック", furigana: "", meaning: "lock, lock" },
      { kanji: "それなら", furigana: "", meaning: "in that case" },
      { kanji: "インストール", furigana: "", meaning: "installation, install" }
    ]
  },
  {
    id: "81_1",
    title: "Topic 5",
    japanese_text: "スマホを<ruby>替<rt>か</rt></ruby><ruby>えようと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>ってカタログを<rt></rt></ruby><ruby>見<rt>み</rt></ruby><ruby>ているけど、<rt></rt></ruby><ruby>違<rt>ちが</rt></ruby><ruby>いが<rt></rt></ruby><ruby>分<rt>わ</rt></ruby><ruby>からない。<rt></rt></ruby><ruby>最新型<rt>さいしんがた</rt></ruby><ruby>は<rt></rt></ruby><ruby>私<rt>わたし</rt></ruby><ruby>には<rt></rt></ruby><ruby>必要<rt>ひつよう</rt></ruby><ruby>ないかな。<rt></rt></ruby>",
    english_translation: "I want to get a new smartphone, so I'm looking at a catalog, but I can't tell the difference. I don't think I need the latest model.",
    annotated_words: [
      { kanji: "替える/代える/換える", furigana: "かえる", meaning: "exchange, replace, change" },
      { kanji: "替わる/代わる/換わる", furigana: "かわる", meaning: "exchange, replace, change" },
      { kanji: "カタログ", furigana: "", meaning: "catalog" },
      { kanji: "違い", furigana: "ちがい", meaning: "difference" },
      { kanji: "最新", furigana: "さいしん", meaning: "latest" },
      { kanji: "〜型", furigana: "〜がた", meaning: "model" }
    ]
  },
  {
    id: "82_1",
    title: "Topic 5",
    japanese_text: "この<ruby>円<rt>えん</rt></ruby><ruby>グラフは、<rt></rt></ruby><ruby>日本人<rt>にほんじん</rt></ruby><ruby>がスマホを<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>って<rt></rt></ruby><ruby>何<rt>なに</rt></ruby><ruby>をしているかを<rt></rt></ruby><ruby>表<rt>あらわ</rt></ruby><ruby>したものである。<rt></rt></ruby><ruby>平均<rt>へいきん</rt></ruby><ruby>して<rt></rt></ruby>１<ruby>日<rt>にち</rt></ruby><ruby>に<rt></rt></ruby>４<ruby>時間<rt>じかん</rt></ruby><ruby>スマホを<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>っていて、<rt></rt></ruby><ruby>その<rt></rt></ruby><ruby>約<rt>やく</rt></ruby>50パーセントがＳＮＳの<ruby>利用<rt>りよう</rt></ruby><ruby>である。ホームページやブ<rt></rt></ruby><ruby>ログを<rt></rt></ruby><ruby>見<rt>み</rt></ruby><ruby>る<rt></rt></ruby><ruby>時間<rt>じかん</rt></ruby><ruby>は<rt></rt></ruby><ruby>減<rt>へ</rt></ruby><ruby>ってきている。<rt></rt></ruby>",
    english_translation: "This pie chart shows what Japanese people do when using a smartphone. On average, people use their phones about four hours a day, and about 50 percent of that time is spent on social media. Time spent looking at home pages and blogs is decreasing.",
    annotated_words: [
      { kanji: "円", furigana: "えん", meaning: "circle" },
      { kanji: "平均", furigana: "へいきん", meaning: "average, average" },
      { kanji: "パーセント", furigana: "", meaning: "percent" },
      { kanji: "ＳＮＳ", furigana: "", meaning: "social media" },
      { kanji: "ホームページ", furigana: "", meaning: "home page" },
      { kanji: "ブログ", furigana: "", meaning: "blog" }
    ]
  },
  {
    id: "82_2",
    title: "Topic 5",
    japanese_text: "<ruby>検索<rt>けんさく</rt></ruby><ruby>するときは、この<rt></rt></ruby><ruby>矢印<rt>やじるし</rt></ruby><ruby>が<rt></rt></ruby><ruby>書<rt>か</rt></ruby><ruby>かれているところに<rt></rt></ruby><ruby>文字<rt>もじ</rt></ruby><ruby>を<rt></rt></ruby><ruby>入<rt>い</rt></ruby><ruby>れ<rt></rt></ruby><ruby>ます。ローマ<rt></rt></ruby><ruby>字<rt>じ</rt></ruby><ruby>でも<rt></rt></ruby><ruby>検索<rt>けんさく</rt></ruby><ruby>できます。<rt></rt></ruby>",
    english_translation: "When doing a search, put the characters in the place where this arrow is written. You can even search using Roman letters.",
    annotated_words: [
      { kanji: "検索", furigana: "けんさく", meaning: "search, search" },
      { kanji: "矢印", furigana: "やじるし", meaning: "arrow" },
      { kanji: "ローマ字", furigana: "ローマじ", meaning: "Roman letters" }
    ]
  }
];

topic4_remaining.forEach(story => {
  fs.writeFileSync(`src/data/tango_n3_raw/${story.id}.json`, JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
