const fs = require('fs');
const path = require('path');

const topic7_stories = [
  {
    id: "106_1",
    title: "Topic 7",
    japanese_text: "<ruby>久<rt>ひさ</rt></ruby>しぶりに<ruby>中国人<rt>ちゅうごくじん</rt></ruby>の<ruby>友人<rt>ゆうじん</rt></ruby>が<ruby>来日<rt>らいにち</rt></ruby>した。<ruby>母親<rt>ははおや</rt></ruby>が「ようこそ、よくいらっしゃいました」と<ruby>言<rt>い</rt></ruby>うと、<ruby>友人<rt>ゆうじん</rt></ruby>は「ご<ruby>無沙汰<rt>ぶさた</rt></ruby>しています」とあいさつした。",
    english_translation: "A Chinese friend of mine came to Japan for the first time in a while. When my mother said, \"Welcome, I'm glad you made it,\" my friend greeting her by saying, \"Long time no see.\"",
    annotated_words: [
      { kanji: "久しぶりに", furigana: "ひさしぶりに", meaning: "for the first time in a while" },
      { kanji: "友人", furigana: "ゆうじん", meaning: "friend" },
      { kanji: "母親", furigana: "ははおや", meaning: "mother" },
      { kanji: "父親", furigana: "ちちおや", meaning: "father" },
      { kanji: "ようこそ", furigana: "", meaning: "welcome" },
      { kanji: "よくいらっしゃいました", furigana: "", meaning: "thank you for coming" },
      { kanji: "ご無沙汰［する］", furigana: "ごぶさた", meaning: "long silence, not see talk to each other for a while" }
    ]
  },
  {
    id: "106_2",
    title: "Topic 7",
    japanese_text: "<ruby>友人<rt>ゆうじん</rt></ruby>が<ruby>中国<rt>ちゅうごく</rt></ruby>へ<ruby>帰<rt>かえ</rt></ruby>るので、<ruby>空港<rt>くうこう</rt></ruby>まで<ruby>見送<rt>みおく</rt></ruby>った。<ruby>後日<rt>ごじつ</rt></ruby>、<ruby>友人<rt>ゆうじん</rt></ruby>から<ruby>小包<rt>こづつみ</rt></ruby>が<ruby>届<rt>とど</rt></ruby>いた。<ruby>便箋<rt>びんせん</rt></ruby>には「お<ruby>世話<rt>せわ</rt></ruby>になりました。どうかお<ruby>元気<rt>げんき</rt></ruby>で」と<ruby>書<rt>か</rt></ruby>かれていた。",
    english_translation: "My friend returned to China, so I saw him off to the airport. Later, a package arrived from my friend. The letter on it read \"Thank you for looking after me. Please take care.\"",
    annotated_words: [
      { kanji: "見送る", furigana: "みおくる", meaning: "send off" },
      { kanji: "見送り", furigana: "みおくり", meaning: "send off" },
      { kanji: "後日", furigana: "ごじつ", meaning: "a few days later, at a later date" },
      { kanji: "小包", furigana: "こづつみ", meaning: "parcel" },
      { kanji: "便箋", furigana: "びんせん", meaning: "letter paper, stationary" },
      { kanji: "お世話になりました", furigana: "おせわになりました", meaning: "thank you for helping me." },
      { kanji: "どうか", furigana: "", meaning: "please" },
      { kanji: "お元気で", furigana: "おげんきで", meaning: "take care" }
    ]
  },
  {
    id: "107_1",
    title: "Topic 7",
    japanese_text: "<ruby>親戚<rt>しんせき</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>を<ruby>訪問<rt>ほうもん</rt></ruby>したら、おじさんがいた。あいさつをし、「ところで、おばさんは」と<ruby>聞<rt>き</rt></ruby>くと、<ruby>別々<rt>べつべつ</rt></ruby>に<ruby>暮<rt>く</rt></ruby>らしているらしい。<ruby>今年<rt>ことし</rt></ruby>の<ruby>年賀状<rt>ねんがじょう</rt></ruby>におばさんの<ruby>名前<rt>なまえ</rt></ruby>がなかった。",
    english_translation: "I went to visit a relative's house, and my uncle was there. I greeted him and asked \"By the way, where's my aunt?,\" and it seems that they're now living separately. Speaking of which, this year's New Year's card didn't have my aunt's name on it.",
    annotated_words: [
      { kanji: "親戚", furigana: "しんせき", meaning: "relative" },
      { kanji: "訪問［する］", furigana: "ほうもん", meaning: "visiting, visit" },
      { kanji: "おじ（さん）", furigana: "", meaning: "uncle" },
      { kanji: "ところで", furigana: "", meaning: "by the way" },
      { kanji: "おば（さん）", furigana: "", meaning: "aunt" },
      { kanji: "別々に", furigana: "べつべつに", meaning: "separately" },
      { kanji: "そういえば", furigana: "", meaning: "speaking of which" },
      { kanji: "年賀状", furigana: "ねんがじょう", meaning: "New Year's card" }
    ]
  },
  {
    id: "108_1",
    title: "Topic 7",
    japanese_text: "<ruby>長女<rt>ちょうじょ</rt></ruby>は<ruby>生意気<rt>なまいき</rt></ruby>だが、<ruby>目上<rt>めうえ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>会<rt>あ</rt></ruby>うときちんとおじぎする。それが<ruby>長所<rt>ちょうしょ</rt></ruby>だ。",
    english_translation: "My eldest daughter is sassy, but when meeting older people, she bows. That's her strong point.",
    annotated_words: [
      { kanji: "長女", furigana: "ちょうじょ", meaning: "eldest daughter" },
      { kanji: "次女", furigana: "じじょ", meaning: "second daughter" },
      { kanji: "生意気な", furigana: "なまいきな", meaning: "sassy" },
      { kanji: "目上", furigana: "めうえ", meaning: "older (people), elder" },
      { kanji: "目下", furigana: "めした", meaning: "younger (people), junior" },
      { kanji: "おじぎ［する］", furigana: "", meaning: "bowing, bow" },
      { kanji: "長所", furigana: "ちょうしょ", meaning: "strong point" },
      { kanji: "短所", furigana: "たんしょ", meaning: "weak point" }
    ]
  },
  {
    id: "108_2",
    title: "Topic 7",
    japanese_text: "<ruby>中学生<rt>ちゅうがくせい</rt></ruby>の<ruby>姪<rt>めい</rt></ruby>とは<ruby>仲<rt>なか</rt></ruby>がいい。<ruby>日<rt>ひ</rt></ruby>が<ruby>暮<rt>く</rt></ruby>れたら３<ruby>年<rt>ねん</rt></ruby>ぶりに<ruby>花火<rt>はなび</rt></ruby>をしようと<ruby>約束<rt>やくそく</rt></ruby>した。しかし、ライターを<ruby>切<rt>き</rt></ruby>らしていて、できなかった。<ruby>私<rt>わたし</rt></ruby>は「すまないね」と<ruby>謝<rt>あやま</rt></ruby>った。",
    english_translation: "I'm close with my niece who is a junior high school student. When the sun went down, I promised to light some fireworks for the first time in three years. However, my lighter was empty and I couldn't light them. I told her I was sorry.",
    annotated_words: [
      { kanji: "姪", furigana: "めい", meaning: "niece" },
      { kanji: "甥", furigana: "おい", meaning: "nephew" },
      { kanji: "仲", furigana: "なか", meaning: "relationship" },
      { kanji: "暮れる", furigana: "くれる", meaning: "get dark" },
      { kanji: "〜ぶり", furigana: "", meaning: "in ~ (timespan)" },
      { kanji: "花火", furigana: "はなび", meaning: "fireworks" },
      { kanji: "切らす", furigana: "きらす", meaning: "run out" },
      { kanji: "すまない", furigana: "", meaning: "remorseful" }
    ]
  },
  {
    id: "109_1",
    title: "Topic 7",
    japanese_text: "<ruby>田中先生<rt>たなかせんせい</rt></ruby>の<ruby>研究室<rt>けんきゅうしつ</rt></ruby>をノックしたが、<ruby>留守<rt>るす</rt></ruby>のようだ。<ruby>今日<rt>きょう</rt></ruby>は<ruby>大学<rt>だいがく</rt></ruby>をお<ruby>休<rt>やす</rt></ruby>みになっているのかもしれない。<ruby>伝言<rt>でんごん</rt></ruby>メモに、「お<ruby>目<rt>め</rt></ruby>にかかって、<ruby>先生<rt>せんせい</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>を<ruby>拝見<rt>はいけん</rt></ruby>したいと<ruby>思<rt>おも</rt></ruby>っています。<ruby>明日<rt>あす</rt></ruby>また<ruby>訪<rt>たず</rt></ruby>ねます」と<ruby>書<rt>か</rt></ruby>いた。<ruby>氏名<rt>しめい</rt></ruby>を<ruby>書<rt>か</rt></ruby>くのも<ruby>忘<rt>わす</rt></ruby>れなかった。",
    english_translation: "I knocked (on the door of) Tanaka-sensei's laboratory, but it seemed that no one was there. He may be absent from university today. On a memo, I wrote, \"I would like to meet with you and see your book. I will come by again tomorrow.\" I also did not forget to write my name.",
    annotated_words: [
      { kanji: "ノック［する］", furigana: "", meaning: "knocking, knock" },
      { kanji: "お休みになる", furigana: "おやすみになる", meaning: "be absent (honorific)" },
      { kanji: "伝言［する］", furigana: "でんごん", meaning: "message, send a message" },
      { kanji: "お目にかかる", furigana: "おめにかかる", meaning: "see, meet (humble)" },
      { kanji: "拝見［する］", furigana: "はいけん", meaning: "seeing, see (humble)" },
      { kanji: "訪ねる", furigana: "たずねる", meaning: "visit" },
      { kanji: "氏名", furigana: "しめい", meaning: "full name" }
    ]
  },
  {
    id: "110_1",
    title: "Topic 7",
    japanese_text: "<ruby>彼<rt>かれ</rt></ruby>は<ruby>信<rt>しん</rt></ruby>じられる<ruby>人間<rt>にんげん</rt></ruby>だ。<ruby>秘密<rt>ひみつ</rt></ruby>を<ruby>守<rt>まも</rt></ruby>り、<ruby>離<rt>はな</rt></ruby>れていても<ruby>頼<rt>たの</rt></ruby>みを<ruby>聞<rt>き</rt></ruby>いてくれる。<ruby>彼<rt>かれ</rt></ruby>はみんなから<ruby>尊敬<rt>そんけい</rt></ruby>されている。",
    english_translation: "He is a person people trust. He keeps secrets and listens to your favors even when he's away. He is respected by everyone.",
    annotated_words: [
      { kanji: "信じる", furigana: "しんじる", meaning: "trust, believe" },
      { kanji: "人間", furigana: "にんげん", meaning: "human" },
      { kanji: "秘密", furigana: "ひみつ", meaning: "secret" },
      { kanji: "離れる", furigana: "はなれる", meaning: "separate" },
      { kanji: "頼み", furigana: "たのみ", meaning: "favor, request" },
      { kanji: "尊敬［する］", furigana: "そんけい", meaning: "respect, respect" }
    ]
  },
  {
    id: "110_2",
    title: "Topic 7",
    japanese_text: "<ruby>知<rt>し</rt></ruby>り<ruby>合<rt>あ</rt></ruby>いは、<ruby>私<rt>わたし</rt></ruby>の<ruby>友人<rt>ゆうじん</rt></ruby>をバーベキューに<ruby>誘<rt>さそ</rt></ruby>うついでに、<ruby>私<rt>わたし</rt></ruby>を<ruby>誘<rt>さそ</rt></ruby>った。<ruby>私<rt>わたし</rt></ruby>が「<ruby>用事<rt>ようじ</rt></ruby>があって」と<ruby>断<rt>ことわ</rt></ruby>ったら、グループチャットから<ruby>外<rt>はず</rt></ruby>された。",
    english_translation: "An acquaintance invited my friend to barbecue and invited me as well. When I refused saying \"I have some errands to do,\" I was removed from the group chat.",
    annotated_words: [
      { kanji: "知り合い", furigana: "しりあい", meaning: "acquaintance" },
      { kanji: "知り合う", furigana: "しりあう", meaning: "know someone" },
      { kanji: "バーベキュー", furigana: "", meaning: "barbecue" },
      { kanji: "誘う", furigana: "さそう", meaning: "invite" },
      { kanji: "誘い", furigana: "さそい", meaning: "invitation" },
      { kanji: "ついでに", furigana: "", meaning: "at the same time" },
      { kanji: "断る", furigana: "ことわる", meaning: "refuse, turn down" },
      { kanji: "外す", furigana: "はずす", meaning: "remove" }
    ]
  },
  {
    id: "111_1",
    title: "Topic 7",
    japanese_text: "<ruby>彼女<rt>かのじょ</rt></ruby>はデート<ruby>中<rt>ちゅう</rt></ruby>、ずっと<ruby>不機嫌<rt>ふきげん</rt></ruby>で、<ruby>話<rt>はな</rt></ruby>しかけても<ruby>黙<rt>だま</rt></ruby>っているので、<ruby>全然楽<rt>ぜんぜんたの</rt></ruby>しめなかった。その<ruby>後<rt>ご</rt></ruby>、<ruby>彼女<rt>かのじょ</rt></ruby>との<ruby>関係<rt>かんけい</rt></ruby>は<ruby>自然<rt>しぜん</rt></ruby>と<ruby>切<rt>き</rt></ruby>れた。",
    english_translation: "During our date, she was in a bad mood the whole time, staying silent even when I tried to talk to her, so I wasn't able to enjoy it at all. After that, my relationship with her organically ended.",
    annotated_words: [
      { kanji: "彼女", furigana: "かのじょ", meaning: "girlfriend" },
      { kanji: "彼（氏）", furigana: "かれ（し）", meaning: "boyfriend" },
      { kanji: "デート［する］", furigana: "", meaning: "date, go on a date" },
      { kanji: "不機嫌な", furigana: "ふきげんな", meaning: "in a bad mood" },
      { kanji: "話しかける", furigana: "はなしかける", meaning: "talk to" },
      { kanji: "黙る", furigana: "だまる", meaning: "be silent" },
      { kanji: "楽しむ", furigana: "たのしむ", meaning: "have fun" },
      { kanji: "切れる", furigana: "きれる", meaning: "be ended, be severed" }
    ]
  }
];

const targetDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

topic7_stories.forEach(story => {
  fs.writeFileSync(path.join(targetDir, `${story.id}.json`), JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
