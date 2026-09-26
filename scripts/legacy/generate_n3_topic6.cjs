const fs = require('fs');
const path = require('path');

const topic6_stories = [
  {
    id: "92_1",
    title: "Topic 6",
    japanese_text: "<ruby>昔<rt>むかし</rt></ruby>からこの<ruby>作家<rt>さっか</rt></ruby>の<ruby>大<rt>だい</rt></ruby>ファンだった。<ruby>彼女<rt>かのじょ</rt></ruby>の<ruby>最高傑作<rt>さいこうけっさく</rt></ruby>が、<ruby>今度<rt>こんど</rt></ruby><ruby>実写化<rt>じっしゃか</rt></ruby>されるらしい。",
    english_translation: "I've been a huge fan of this author since a long time ago. It seems like her masterpiece will be made into a live action movie soon.",
    annotated_words: [
      { kanji: "ファン", furigana: "", meaning: "fan" },
      { kanji: "最高", furigana: "さいこう", meaning: "the highest, the best" },
      { kanji: "最低", furigana: "さいてい", meaning: "the lowest, the worst" },
      { kanji: "最高傑作", furigana: "さいこうけっさく", meaning: "masterpiece" },
      { kanji: "実写化［する］", furigana: "じっしゃか", meaning: "live-action adaptation" }
    ]
  },
  {
    id: "92_2",
    title: "Topic 6",
    japanese_text: "Ａ：<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>監督<rt>かんとく</rt></ruby>のインタビューを<ruby>読<rt>よ</rt></ruby>んで、<ruby>彼<rt>かれ</rt></ruby>の<ruby>作品<rt>さくひん</rt></ruby>を<ruby>見始<rt>みはじ</rt></ruby>めた。\nＢ：リメイクされる<ruby>作品<rt>さくひん</rt></ruby>は、<ruby>前<rt>まえ</rt></ruby>の<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>使<rt>つか</rt></ruby>ってほしい。<ruby>曲<rt>きょく</rt></ruby>が<ruby>流<rt>なが</rt></ruby>れるだけで<ruby>懐<rt>なつ</rt></ruby>かしくて<ruby>泣<rt>な</rt></ruby>けそうになる。",
    english_translation: "A: I read an interview by a famous director, and I started watching his works.\nB: For works that are remakes, I want them to use the old music. Just hearing the song being played will make it feel nostalgic and make you feel like crying.",
    annotated_words: [
      { kanji: "監督", furigana: "かんとく", meaning: "director" },
      { kanji: "インタビュー", furigana: "", meaning: "interview" },
      { kanji: "リメイク［する］", furigana: "", meaning: "remake" },
      { kanji: "曲", furigana: "きょく", meaning: "piece of music, song" },
      { kanji: "流れる", furigana: "ながれる", meaning: "play, flow" },
      { kanji: "流す", furigana: "ながす", meaning: "play, wash away" },
      { kanji: "懐かしい", furigana: "なつかしい", meaning: "nostalgic" }
    ]
  },
  {
    id: "93_1",
    title: "Topic 6",
    japanese_text: "<ruby>最近<rt>さいきん</rt></ruby>のライトノベルは、まずオンラインの<ruby>小説<rt>しょうせつ</rt></ruby>サイトに<ruby>掲載<rt>けいさい</rt></ruby>され、それから<ruby>本<rt>ほん</rt></ruby>になることが<ruby>多<rt>おお</rt></ruby>い。タイトルが<ruby>長<rt>なが</rt></ruby>く、タイトルだけで<ruby>内容<rt>ないよう</rt></ruby>が<ruby>分<rt>わ</rt></ruby>かることが<ruby>共通<rt>きょうつう</rt></ruby>している。<ruby>本<rt>ほん</rt></ruby>の<ruby>表紙<rt>ひょうし</rt></ruby>にはかわいいキャラクターが<ruby>描<rt>えが</rt></ruby>かれているが、タイトルのせいで<ruby>見<rt>み</rt></ruby>にくかったりする。",
    english_translation: "Recent light novels are often first published on online novel sites and then become books. It is common that the titles are long, and you can figure out the content just by the title alone. Cute characters are drawn on the covers of the books, but they may be difficult to see because of the title.",
    annotated_words: [
      { kanji: "オンライン", furigana: "", meaning: "online" },
      { kanji: "タイトル", furigana: "", meaning: "title" },
      { kanji: "題名", furigana: "だいめい", meaning: "title" },
      { kanji: "題", furigana: "だい", meaning: "title" },
      { kanji: "内容", furigana: "ないよう", meaning: "content" },
      { kanji: "共通［する］", furigana: "きょうつう", meaning: "having in common, have in common, share" },
      { kanji: "表紙", furigana: "ひょうし", meaning: "cover" }
    ]
  },
  {
    id: "94_1",
    title: "Topic 6",
    japanese_text: "Ａ：この<ruby>前<rt>まえ</rt></ruby><ruby>勧<rt>すす</rt></ruby>めてくれたドラマ、<ruby>追<rt>お</rt></ruby>いついたよ。\nＢ：え、もう？いつ<ruby>教<rt>おし</rt></ruby>えたっけ。\nＡ：<ruby>先々週<rt>せんせんしゅう</rt></ruby>だから、２<ruby>週間<rt>しゅうかん</rt></ruby>で20<ruby>話<rt>わ</rt></ruby>ぐらい<ruby>見<rt>み</rt></ruby>たかな。<ruby>今夜<rt>こんや</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>は<ruby>予約済<rt>よやくず</rt></ruby>み。",
    english_translation: "A: I got caught up in that drama that recommended to me the other day.\nB: What? Already? When did I tell you about it again?\nA: The week before last, so I watched 20 episodes in about two weeks. I've already set a reservation for tonight's episode.",
    annotated_words: [
      { kanji: "勧める", furigana: "すすめる", meaning: "recommend" },
      { kanji: "おすすめ［する］", furigana: "", meaning: "recommended, recommendation" },
      { kanji: "ドラマ", furigana: "", meaning: "drama" },
      { kanji: "追いつく", furigana: "おいつく", meaning: "catch up" },
      { kanji: "先々週", furigana: "せんせんしゅう", meaning: "week before last" },
      { kanji: "〜済み", furigana: "〜ずみ", meaning: "finished ~" }
    ]
  },
  {
    id: "94_2",
    title: "Topic 6",
    japanese_text: "Ａ：これ、<ruby>私<rt>わたし</rt></ruby>が<ruby>小学生<rt>しょうがくせい</rt></ruby>のときの<ruby>劇<rt>げき</rt></ruby>のビデオです。\nＢ：え、どこに<ruby>映<rt>うつ</rt></ruby>ってるの？\nＡ：ああ、<ruby>木<rt>き</rt></ruby>の<ruby>手前<rt>てまえ</rt></ruby>にいる、リボンをつけた<ruby>子<rt>こ</rt></ruby>が<ruby>私<rt>わたし</rt></ruby>です。",
    english_translation: "A: This is a video of a play from when I was in elementary school.\nB: Oh, where are you?\nA: Umm, I'm the kid in front of the tree wearing a ribbon.",
    annotated_words: [
      { kanji: "劇", furigana: "げき", meaning: "play" },
      { kanji: "劇場", furigana: "げきじょう", meaning: "theater" },
      { kanji: "手前", furigana: "てまえ", meaning: "in front" },
      { kanji: "リボン", furigana: "", meaning: "ribbon" }
    ]
  },
  {
    id: "95_1",
    title: "Topic 6",
    japanese_text: "<ruby>以前<rt>いぜん</rt></ruby>はよくレンタルビデオ<ruby>店<rt>てん</rt></ruby>にビデオやＤＶＤを<ruby>借<rt>か</rt></ruby>りに<ruby>行<rt>い</rt></ruby>った。しかし、<ruby>今<rt>いま</rt></ruby>はインターネットでレンタルすることができる。まず<ruby>会員登録<rt>かいいんとうろく</rt></ruby>し、それから<ruby>好<rt>す</rt></ruby>きな<ruby>金額<rt>きんがく</rt></ruby>をチャージする。チャージした<ruby>金額分<rt>きんがくぶん</rt></ruby>、<ruby>自由<rt>じゆう</rt></ruby>にレンタルすることができる。このやり<ruby>方<rt>かた</rt></ruby>は<ruby>一<rt>ひと</rt></ruby>つの<ruby>発明<rt>はつめい</rt></ruby>だと<ruby>思<rt>おも</rt></ruby>う。<ruby>私<rt>わたし</rt></ruby>はサイトをお<ruby>気<rt>き</rt></ruby>に<ruby>入<rt>い</rt></ruby>りに<ruby>登録<rt>とうろく</rt></ruby>している。",
    english_translation: "In the past, people rented videos and DVDs at rental video stores. But now, you can rent things on the internet. First, register as a member and then charge whatever amount you like. You can freely rent things with the charged amount. I think this method is one invention. I've registered the site to my favorites.",
    annotated_words: [
      { kanji: "レンタル［する］", furigana: "", meaning: "rental, rent" },
      { kanji: "登録［する］", furigana: "とうろく", meaning: "registration, registering" },
      { kanji: "チャージ［する］", furigana: "", meaning: "charging, charge" },
      { kanji: "発明［する］", furigana: "はつめい", meaning: "invention, invent" },
      { kanji: "お気に入り", furigana: "おきにいり", meaning: "favorite" }
    ]
  },
  {
    id: "96_1",
    title: "Topic 6",
    japanese_text: "<ruby>最初<rt>さいしょ</rt></ruby>はみんな、このアニメを<ruby>仲良<rt>なかよ</rt></ruby>しの<ruby>女<rt>おんな</rt></ruby>の<ruby>子<rt>こ</rt></ruby>が<ruby>変身<rt>へんしん</rt></ruby>して<ruby>戦<rt>たたか</rt></ruby>うだけの<ruby>話<rt>はなし</rt></ruby>だと<ruby>思<rt>おも</rt></ruby>っていた。しかし、<ruby>第<rt>だい</rt></ruby>３<ruby>話<rt>わ</rt></ruby>で<ruby>一<rt>ひと</rt></ruby><ruby>人<rt>り</rt></ruby>のキャラが<ruby>殺<rt>ころ</rt></ruby>され、みんなショックを<ruby>受<rt>う</rt></ruby>けた。",
    english_translation: "At first everyone thought that the anime was only about girls who were friends and would change form and fight. However, one character was killed in the third episode, and everyone was shocked.",
    annotated_words: [
      { kanji: "アニメ（ーション）", furigana: "", meaning: "anime" },
      { kanji: "仲良し", furigana: "なかよし", meaning: "good friend" },
      { kanji: "戦う", furigana: "たたかう", meaning: "fight" },
      { kanji: "戦い", furigana: "たたかい", meaning: "fight" },
      { kanji: "第〜", furigana: "だい〜", meaning: "~th/nd/rd" },
      { kanji: "殺す", furigana: "ころす", meaning: "kill" }
    ]
  },
  {
    id: "96_2",
    title: "Topic 6",
    japanese_text: "この<ruby>会社<rt>かいしゃ</rt></ruby>のアニメは、<ruby>前半<rt>ぜんはん</rt></ruby>がどんな<ruby>話<rt>はなし</rt></ruby>でも、<ruby>後半<rt>こうはん</rt></ruby>は<ruby>必<rt>かなら</rt></ruby>ず<ruby>宇宙<rt>うちゅう</rt></ruby>に<ruby>飛<rt>と</rt></ruby>び<ruby>出<rt>だ</rt></ruby>す。",
    english_translation: "No matter what happens in the first half of the anime from that company, they always fly off to space in the second half.",
    annotated_words: [
      { kanji: "前半", furigana: "ぜんはん", meaning: "first half" },
      { kanji: "後半", furigana: "こうはん", meaning: "second half" },
      { kanji: "宇宙", furigana: "うちゅう", meaning: "space" },
      { kanji: "飛び出す", furigana: "とびだす", meaning: "launch out, jump out" }
    ]
  },
  {
    id: "97_1",
    title: "Topic 6",
    japanese_text: "<ruby>少年漫画<rt>しょうねんまんが</rt></ruby>で<ruby>何<rt>なに</rt></ruby>がはやっているかは、<ruby>小<rt>ちい</rt></ruby>さな<ruby>子<rt>こ</rt></ruby>どもたちを<ruby>見<rt>み</rt></ruby>れば<ruby>分<rt>わ</rt></ruby>かる。<ruby>彼<rt>かれ</rt></ruby>らはすぐに<ruby>言葉<rt>ことば</rt></ruby>や<ruby>技<rt>わざ</rt></ruby>をまねするから。",
    english_translation: "You can tell what young boy's comics are popular by looking at young children. This is because they immediately imitate their words and techniques.",
    annotated_words: [
      { kanji: "少年", furigana: "しょうねん", meaning: "boy" },
      { kanji: "少女", furigana: "しょうじょ", meaning: "girl" },
      { kanji: "はやる", furigana: "", meaning: "be popular" },
      { kanji: "はやり", furigana: "", meaning: "trend, fad" },
      { kanji: "技", furigana: "わざ", meaning: "skill" },
      { kanji: "まね［する］", furigana: "", meaning: "imitation, imitate" }
    ]
  },
  {
    id: "97_2",
    title: "Topic 6",
    japanese_text: "Ａ：ミステリーのドラマってだいたいハンサムな<ruby>役者<rt>やくしゃ</rt></ruby>が<ruby>犯人<rt>はんにん</rt></ruby>だよな。\nＢ：おい、そんなこと<ruby>言<rt>い</rt></ruby>うのやめろよ。",
    english_translation: "A: In mystery dramas, the criminal is usually the handsome actor, right?\nB: Hey, stop saying things like that.",
    annotated_words: [
      { kanji: "ミステリー", furigana: "", meaning: "mystery" },
      { kanji: "ハンサムな", furigana: "", meaning: "handsome" },
      { kanji: "犯人", furigana: "はんにん", meaning: "criminal" },
      { kanji: "おい", furigana: "", meaning: "hey" }
    ]
  },
  {
    id: "98_1",
    title: "Topic 6",
    japanese_text: "<ruby>恋愛<rt>れんあい</rt></ruby>と<ruby>友情<rt>ゆうじょう</rt></ruby>は、<ruby>人間<rt>にんげん</rt></ruby>にとって<ruby>最<rt>もっと</rt></ruby>も<ruby>重大<rt>じゅうだい</rt></ruby>なテーマだ。だからこそ、<ruby>歴史<rt>れきし</rt></ruby>の<ruby>中<rt>なか</rt></ruby>でたくさんの<ruby>物語<rt>ものがたり</rt></ruby>が<ruby>作<rt>つく</rt></ruby>られてきた。<ruby>現代<rt>げんだい</rt></ruby>の<ruby>曲<rt>きょく</rt></ruby>の<ruby>歌詞<rt>かし</rt></ruby>にも<ruby>多<rt>おお</rt></ruby>く<ruby>登場<rt>とうじょう</rt></ruby>する。",
    english_translation: "Love and friendship are the most significant themes for humans. That's why there have been a lot of stories in history. Many appear in the lyrics of modern songs too.",
    annotated_words: [
      { kanji: "恋愛［する］", furigana: "れんあい", meaning: "love, love" },
      { kanji: "友情", furigana: "ゆうじょう", meaning: "friendship" },
      { kanji: "重大な", furigana: "じゅうだいな", meaning: "serious" },
      { kanji: "テーマ", furigana: "", meaning: "theme" },
      { kanji: "物語", furigana: "ものがたり", meaning: "story" },
      { kanji: "歌詞", furigana: "かし", meaning: "lyrics" }
    ]
  },
  {
    id: "98_2",
    title: "Topic 6",
    japanese_text: "この<ruby>作者<rt>さくしゃ</rt></ruby>の<ruby>漫画<rt>まんが</rt></ruby>は<ruby>面白<rt>おもしろ</rt></ruby>いけど、ところどころ<ruby>変<rt>へん</rt></ruby>だ。<ruby>最初女<rt>さいしょおんな</rt></ruby>の<ruby>子<rt>こ</rt></ruby>だったキャラが、いつの<ruby>間<rt>ま</rt></ruby>にか<ruby>男<rt>おとこ</rt></ruby>の<ruby>子<rt>こ</rt></ruby>になっていた。ストーリーにも<ruby>波<rt>なみ</rt></ruby>があり、<ruby>調子<rt>ちょうし</rt></ruby>がいいときは<ruby>読<rt>よ</rt></ruby>んでいてどきどきするが、<ruby>調子<rt>ちょうし</rt></ruby>が<ruby>悪<rt>わる</rt></ruby>いときは<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>面白<rt>おもしろ</rt></ruby>くない。",
    english_translation: "This author's manga are interesting, but there are some strange parts here and there. One character who was a girl at first at some point became a boy. There are waves in the story, and when the condition is good, I read it and get excited, but when it's not good, it's really uninteresting.",
    annotated_words: [
      { kanji: "作者", furigana: "さくしゃ", meaning: "author" },
      { kanji: "ところどころ", furigana: "", meaning: "here and there" },
      { kanji: "いつの間にか", furigana: "いつのまにか", meaning: "at some point" },
      { kanji: "波", furigana: "なみ", meaning: "wave" },
      { kanji: "調子", furigana: "ちょうし", meaning: "condition" },
      { kanji: "どきどき［する］", furigana: "", meaning: "exciting, get excited" }
    ]
  },
  {
    id: "99_1",
    title: "Topic 6",
    japanese_text: "Ａ：この<ruby>映画<rt>えいが</rt></ruby>は、<ruby>観客<rt>かんきゃく</rt></ruby>にカードのプレゼントがあるから、４<ruby>回見<rt>かいみ</rt></ruby>に<ruby>行<rt>い</rt></ruby>かないと。\nＢ：そんなに<ruby>見<rt>み</rt></ruby>たら<ruby>飽<rt>あ</rt></ruby>きない？\nＡ：カードだけもらう<ruby>人<rt>ひと</rt></ruby>もいるけど、<ruby>私<rt>わたし</rt></ruby>は<ruby>見<rt>み</rt></ruby>る。<ruby>最初<rt>さいしょ</rt></ruby>、あれ？って<ruby>思<rt>おも</rt></ruby>ったところが、２<ruby>回目<rt>かいめ</rt></ruby>に<ruby>見<rt>み</rt></ruby>ると<ruby>意味<rt>いみ</rt></ruby>が<ruby>分<rt>わ</rt></ruby>かったりするから。",
    english_translation: "A: This movie has a card present for the audience, so I have to go four times.\nB: Won't you get tired of watching it so much?\nA: Some people get only the cards, but I watch it. I can better understand some of the things that made me go \"huh?\" the first time I watched it when watching it for the second time.",
    annotated_words: [
      { kanji: "観客", furigana: "かんきゃく", meaning: "audience" },
      { kanji: "カード", furigana: "", meaning: "card" },
      { kanji: "飽きる", furigana: "あきる", meaning: "get tired" },
      { kanji: "あれ？", furigana: "", meaning: "Huh?" }
    ]
  },
  {
    id: "100_1",
    title: "Topic 6",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>はアイドルには<ruby>少<rt>すこ</rt></ruby>しも<ruby>興味<rt>きょうみ</rt></ruby>がなかった。しかし、<ruby>友人<rt>ゆうじん</rt></ruby>に<ruby>誘<rt>さそ</rt></ruby>われて、コンサートに<ruby>行<rt>い</rt></ruby>ってから、ファンになった。<ruby>彼<rt>かれ</rt></ruby>らが<ruby>登場<rt>とうじょう</rt></ruby>したときの<ruby>会場<rt>かいじょう</rt></ruby>の<ruby>空気<rt>くうき</rt></ruby>は<ruby>忘<rt>わす</rt></ruby>れられない。とても<ruby>感動的<rt>かんどうてき</rt></ruby>で、<ruby>終<rt>お</rt></ruby>わる<ruby>頃<rt>ころ</rt></ruby>には<ruby>泣<rt>な</rt></ruby>いていた。",
    english_translation: "I didn't used to be interested in idols at all. However, I was invited by a friend to a concert and have been a fan ever since. I'll never forget the vibe in the venue the moment they appeared. It was really moving, and I cried when it was over.",
    annotated_words: [
      { kanji: "少しも〜ない", furigana: "すこしも〜ない", meaning: "not at all ~" },
      { kanji: "コンサート", furigana: "", meaning: "concert" },
      { kanji: "ライブ", furigana: "", meaning: "live show" },
      { kanji: "登場［する］", furigana: "とうじょう", meaning: "appearance, appear" },
      { kanji: "〜的", furigana: "〜てき", meaning: "~ish" }
    ]
  },
  {
    id: "100_2",
    title: "Topic 6",
    japanese_text: "<ruby>来週<rt>らいしゅう</rt></ruby>、<ruby>私<rt>わたし</rt></ruby>の<ruby>好<rt>す</rt></ruby>きな<ruby>漫画家<rt>まんがか</rt></ruby>の<ruby>最新作<rt>さいしんさく</rt></ruby>がスタートします。<ruby>私<rt>わたし</rt></ruby>は<ruby>小<rt>ちい</rt></ruby>さい<ruby>頃<rt>ころ</rt></ruby>、お<ruby>小遣<rt>こづか</rt></ruby>いをためて、その<ruby>人<rt>ひと</rt></ruby>の<ruby>全作品<rt>ぜんさくひん</rt></ruby>をそろえていました。<ruby>新<rt>あたら</rt></ruby>しい<ruby>作品<rt>さくひん</rt></ruby>は、<ruby>過去<rt>かこ</rt></ruby>の<ruby>作品<rt>さくひん</rt></ruby>の<ruby>続<rt>つづ</rt></ruby>きのストーリーです。",
    english_translation: "Next week, the latest work from my favorite manga artist will be starting. When I was younger, I used to save up my pocket money, and I had collected all of their works. Their new work is a continuation of the story of their past work.",
    annotated_words: [
      { kanji: "〜作", furigana: "〜さく", meaning: "~ work" },
      { kanji: "スタート［する］", furigana: "", meaning: "start, start" },
      { kanji: "（お）小遣い", furigana: "（お）こづかい", meaning: "pocket money" },
      { kanji: "そろえる", furigana: "", meaning: "collect, arrange together" },
      { kanji: "そろう", furigana: "", meaning: "be collected, be arranged together" },
      { kanji: "おそろい", furigana: "", meaning: "complete set, matching" },
      { kanji: "過去", furigana: "かこ", meaning: "past" },
      { kanji: "続き", furigana: "つづき", meaning: "continuation" }
    ]
  },
  {
    id: "101_1",
    title: "Topic 6",
    japanese_text: "Ａ：<ruby>展覧会<rt>てんらんかい</rt></ruby>とか<ruby>行<rt>い</rt></ruby>ったことないんだよね。どれに<ruby>行<rt>い</rt></ruby>ったらいいか<ruby>分<rt>わ</rt></ruby>からないし。\nＢ：<ruby>最初<rt>さいしょ</rt></ruby>はなんでもいいんだよ。<ruby>適当<rt>てきとう</rt></ruby>に<ruby>行<rt>い</rt></ruby>って、<ruby>何<rt>なに</rt></ruby>かの<ruby>絵<rt>え</rt></ruby>が<ruby>気<rt>き</rt></ruby>に<ruby>入<rt>い</rt></ruby>ったら、それを<ruby>描<rt>か</rt></ruby>いた<ruby>画家<rt>がか</rt></ruby>のことを<ruby>調<rt>しら</rt></ruby>べる。そうしているうちにだんだん<ruby>詳<rt>くわ</rt></ruby>しくなるよ。",
    english_translation: "A: I have never been to an exhibition. I wouldn't even know which one to go to.\nB: Anything is okay at first. Just go when you feel like it, and if you see a painting you like, check out the painter who painted it. You'll grow more knowledgeable as you do that.",
    annotated_words: [
      { kanji: "展覧会", furigana: "てんらんかい", meaning: "exhibition" },
      { kanji: "気に入る", furigana: "きにいる", meaning: "to like" },
      { kanji: "画家", furigana: "がか", meaning: "painter" },
      { kanji: "詳しい", furigana: "くわしい", meaning: "knowledgeable, detailed" }
    ]
  },
  {
    id: "102_1",
    title: "Topic 6",
    japanese_text: "コンサートのチケットは<ruby>夜中<rt>よなか</rt></ruby>に<ruby>発売<rt>はつばい</rt></ruby>されたのに、アクセスが<ruby>集中<rt>しゅうちゅう</rt></ruby>し、たった１<ruby>分<rt>ぷん</rt></ruby>で<ruby>売<rt>う</rt></ruby>り<ruby>切<rt>き</rt></ruby>れた。",
    english_translation: "The tickets for the concert went on sale during the night, but access was concentrated, and they sold out in just one minute.",
    annotated_words: [
      { kanji: "夜中", furigana: "よなか", meaning: "in the night" },
      { kanji: "発売［する］", furigana: "はつばい", meaning: "selling, go on sale" },
      { kanji: "新発売", furigana: "しんはつばい", meaning: "now on sale" },
      { kanji: "集中［する］", furigana: "しゅうちゅう", meaning: "concentrating, concentrate" },
      { kanji: "集中力", furigana: "しゅうちゅうりょく", meaning: "concentration" },
      { kanji: "たった", furigana: "", meaning: "only" }
    ]
  },
  {
    id: "102_2",
    title: "Topic 6",
    japanese_text: "これは、<ruby>少年<rt>しょうねん</rt></ruby>が<ruby>妹<rt>いもうと</rt></ruby>を<ruby>守<rt>まも</rt></ruby>るために、<ruby>父親<rt>ちちおや</rt></ruby>である<ruby>王<rt>おう</rt></ruby>を<ruby>倒<rt>たお</rt></ruby>す<ruby>物語<rt>ものがたり</rt></ruby>です。そのために、<ruby>少年<rt>しょうねん</rt></ruby>はいろいろな<ruby>犯罪<rt>はんざい</rt></ruby>も<ruby>犯<rt>おか</rt></ruby>します。でも、ラストは<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>感動的<rt>かんどうてき</rt></ruby>で、<ruby>見終<rt>みお</rt></ruby>わったときは<ruby>拍手<rt>はくしゅ</rt></ruby>しました。",
    english_translation: "This is a story of a boy that defeats the king who is also his father to protect his sister. To that end, the boy also commits a variety of crimes. But the ending was really moving, and I clapped when it ended.",
    annotated_words: [
      { kanji: "王", furigana: "おう", meaning: "king" },
      { kanji: "王様", furigana: "おうさま", meaning: "king" },
      { kanji: "国王", furigana: "こくおう", meaning: "king" },
      { kanji: "倒す", furigana: "たおす", meaning: "defeat" },
      { kanji: "犯罪", furigana: "はんざい", meaning: "crime" },
      { kanji: "ラスト", furigana: "", meaning: "ending, finale" },
      { kanji: "拍手［する］", furigana: "はくしゅ", meaning: "applause, clap, applauded" }
    ]
  },
  {
    id: "103_1",
    title: "Topic 6",
    japanese_text: "テレビを<ruby>見<rt>み</rt></ruby>ている<ruby>人<rt>ひと</rt></ruby>も<ruby>参加<rt>さんか</rt></ruby>できるクイズ<ruby>番組<rt>ばんぐみ</rt></ruby>があった。<ruby>私<rt>わたし</rt></ruby>はいつも、スマホを<ruby>操作<rt>そうさ</rt></ruby>している<ruby>途中<rt>とちゅう</rt></ruby>で<ruby>締<rt>し</rt></ruby>め<ruby>切<rt>き</rt></ruby>られてしまっていた。<ruby>答<rt>こた</rt></ruby>えは<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>分<rt>わ</rt></ruby>かっていて、もうちょっとで<ruby>商品<rt>しょうひん</rt></ruby>がもらえたのに、<ruby>惜<rt>お</rt></ruby>しかった。",
    english_translation: "There were quiz programs where people watching on TV can participate too. They always ended while I was busy using my smartphone. I knew all of the answers, and I was almost able to get a prize, so it was frustrating.",
    annotated_words: [
      { kanji: "クイズ", furigana: "", meaning: "quiz" },
      { kanji: "操作［する］", furigana: "そうさ", meaning: "manipulation, manipulate" },
      { kanji: "途中", furigana: "とちゅう", meaning: "on the way" },
      { kanji: "締め切る", furigana: "しめきる", meaning: "close up" },
      { kanji: "締め切り", furigana: "しめきり", meaning: "deadline" },
      { kanji: "惜しい", furigana: "おしい", meaning: "frustrating, regrettable" }
    ]
  }
];

const targetDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

topic6_stories.forEach(story => {
  fs.writeFileSync(path.join(targetDir, `${story.id}.json`), JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
