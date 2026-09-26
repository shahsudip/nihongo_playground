const fs = require('fs');
const path = require('path');

const topic8_stories = [
  {
    id: "114_1",
    title: "Topic 8",
    japanese_text: "<ruby>卓球<rt>たっきゅう</rt></ruby>の<ruby>団体戦<rt>だんたいせん</rt></ruby>が<ruby>行<rt>おこな</rt></ruby>われて、<ruby>中国<rt>ちゅうごく</rt></ruby>が３<ruby>対<rt>たい</rt></ruby>２で<ruby>日本<rt>にほん</rt></ruby>に<ruby>勝利<rt>しょうり</rt></ruby>した。",
    english_translation: "A table tennis team competition was held, and China won over Japan 3 to 2.",
    annotated_words: [
      { kanji: "卓球", furigana: "たっきゅう", meaning: "table tennis" },
      { kanji: "団体", furigana: "だんたい", meaning: "team, group" },
      { kanji: "〜戦", furigana: "〜せん", meaning: "match" },
      { kanji: "〜対〜", furigana: "〜たい〜", meaning: "~ to ~ / ~ : ~" }
    ]
  },
  {
    id: "114_2",
    title: "Topic 8",
    japanese_text: "オリンピックの<ruby>開会式<rt>かいかいしき</rt></ruby>の<ruby>入場券<rt>にゅうじょうけん</rt></ruby>が<ruby>抽選<rt>ちゅうせん</rt></ruby>で<ruby>当<rt>あ</rt></ruby>たった。",
    english_translation: "I won the lottery for tickets for the Olympic Opening Ceremony.",
    annotated_words: [
      { kanji: "オリンピック", furigana: "", meaning: "the Olympics" },
      { kanji: "開会［する］", furigana: "かいかい", meaning: "opening ceremony, have an opening ceremony" },
      { kanji: "閉会［する］", furigana: "へいかい", meaning: "closing ceremony, have a closing ceremony" },
      { kanji: "入場［する］", furigana: "にゅうじょう", meaning: "entrance, enter (a venue)" },
      { kanji: "退場［する］", furigana: "たいじょう", meaning: "leaving, leave (a venue)" },
      { kanji: "券", furigana: "けん", meaning: "ticket" },
      { kanji: "チケット", furigana: "", meaning: "ticket" },
      { kanji: "当たる", furigana: "あたる", meaning: "win (a lottery)" }
    ]
  },
  {
    id: "115_1",
    title: "Topic 8",
    japanese_text: "あの<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>水泳選手<rt>すいえいせんしゅ</rt></ruby>も、<ruby>子<rt>こ</rt></ruby>どもの<ruby>頃<rt>ころ</rt></ruby>、<ruby>浅<rt>あさ</rt></ruby>い<ruby>川<rt>かわ</rt></ruby>で<ruby>溺<rt>おぼ</rt></ruby>れたことがあるらしい。",
    english_translation: "Even that famous swimmer once (almost) drowned in a river as a child.",
    annotated_words: [
      { kanji: "選手", furigana: "せんしゅ", meaning: "athlete, player" },
      { kanji: "浅い", furigana: "あさい", meaning: "shallow" },
      { kanji: "溺れる", furigana: "おぼれる", meaning: "be lost in, drown" }
    ]
  },
  {
    id: "115_2",
    title: "Topic 8",
    japanese_text: "グラウンドから<ruby>派手<rt>はで</rt></ruby>な<ruby>応援歌<rt>おうえんか</rt></ruby>や<ruby>選手<rt>せんしゅ</rt></ruby>の<ruby>叫<rt>さけ</rt></ruby>ぶ<ruby>声<rt>こえ</rt></ruby>が<ruby>盛<rt>さか</rt></ruby>んに<ruby>聞<rt>き</rt></ruby>こえてくる。",
    english_translation: "From the field, loud cheers and the shouts of the players can be actively heard frequently.",
    annotated_words: [
      { kanji: "グラウンド", furigana: "", meaning: "field (of play)" },
      { kanji: "派手な", furigana: "はでな", meaning: "loud, flashy" },
      { kanji: "応援［する］", furigana: "おうえん", meaning: "cheering, cheer" },
      { kanji: "〜歌", furigana: "〜か", meaning: "~ song" },
      { kanji: "叫ぶ", furigana: "さけぶ", meaning: "shout" },
      { kanji: "盛んな", furigana: "さかんな", meaning: "frequent, lively" }
    ]
  },
  {
    id: "116_1",
    title: "Topic 8",
    japanese_text: "マラソンコースの<ruby>両側<rt>りょうがわ</rt></ruby>にロープが<ruby>張<rt>は</rt></ruby>られ、<ruby>道路<rt>どうろ</rt></ruby>の<ruby>中央<rt>ちゅうおう</rt></ruby>を<ruby>走<rt>はし</rt></ruby>るようになっている。",
    english_translation: "Rope is put on both sides of the marathon course, and people are supposed to run in the center of the road.",
    annotated_words: [
      { kanji: "マラソン", furigana: "", meaning: "marathon" },
      { kanji: "コース", furigana: "", meaning: "course" },
      { kanji: "両側", furigana: "りょうがわ", meaning: "both sides" },
      { kanji: "ロープ", furigana: "", meaning: "rope" },
      { kanji: "中央", furigana: "ちゅうおう", meaning: "center" }
    ]
  },
  {
    id: "116_2",
    title: "Topic 8",
    japanese_text: "どんなに<ruby>才能<rt>さいのう</rt></ruby>がある<ruby>選手<rt>せんしゅ</rt></ruby>でも、トレーニングを<ruby>続<rt>つづ</rt></ruby>けなければ、<ruby>記録<rt>きろく</rt></ruby>を<ruby>伸<rt>の</rt></ruby>ばすことはできない。",
    english_translation: "No matter how talented athletes may be, if they do not continue training, they won't be able to improve their records.",
    annotated_words: [
      { kanji: "才能", furigana: "さいのう", meaning: "talent" },
      { kanji: "トレーニング［する］", furigana: "", meaning: "training, train" },
      { kanji: "記録［する］", furigana: "きろく", meaning: "record, record" },
      { kanji: "伸ばす", furigana: "のばす", meaning: "improve, extend" },
      { kanji: "伸びる", furigana: "のびる", meaning: "be extended, be stretched" }
    ]
  },
  {
    id: "117_1",
    title: "Topic 8",
    japanese_text: "サッカーの<ruby>世界一<rt>せかいいち</rt></ruby>を<ruby>決<rt>き</rt></ruby>める<ruby>大会<rt>たいかい</rt></ruby>がカリフォルニア<ruby>州<rt>しゅう</rt></ruby>ロサンゼルスで<ruby>行<rt>おこな</rt></ruby>われていて、<ruby>多<rt>おお</rt></ruby>くの<ruby>人<rt>ひと</rt></ruby>が<ruby>注目<rt>ちゅうもく</rt></ruby>している。",
    english_translation: "A tournament that determines the best in the world of soccer will be held in Los Angeles, California, and many people are paying attention to it.",
    annotated_words: [
      { kanji: "大会", furigana: "たいかい", meaning: "tournament" },
      { kanji: "州", furigana: "しゅう", meaning: "state" },
      { kanji: "注目［する］", furigana: "ちゅうもく", meaning: "paying attention to, pay attention to" }
    ]
  },
  {
    id: "117_2",
    title: "Topic 8",
    japanese_text: "オリンピックで<ruby>体操<rt>たいそう</rt></ruby>の<ruby>日本代表<rt>にほんだいひょう</rt></ruby>が<ruby>金<rt>きん</rt></ruby>、<ruby>銀<rt>ぎん</rt></ruby>、<ruby>銅<rt>どう</rt></ruby>の<ruby>表彰台<rt>ひょうしょうだい</rt></ruby>を<ruby>独占<rt>どくせん</rt></ruby>した。",
    english_translation: "The Japanese national representative in gymnastics at the Olympics monopolized the gold, silver and bronze podium.",
    annotated_words: [
      { kanji: "体操［する］", furigana: "たいそう", meaning: "gymnastics, do gymnastics" },
      { kanji: "代表［する］", furigana: "だいひょう", meaning: "representative, represent" },
      { kanji: "金", furigana: "きん", meaning: "gold" },
      { kanji: "金色", furigana: "きんいろ", meaning: "gold (color)" },
      { kanji: "銀", furigana: "ぎん", meaning: "silver" },
      { kanji: "銀色", furigana: "ぎんいろ", meaning: "silver (color)" },
      { kanji: "〜台", furigana: "〜だい", meaning: "~ stand, ~ podium" },
      { kanji: "独占［する］", furigana: "どくせん", meaning: "monopoly, monopolize" }
    ]
  },
  {
    id: "118_1",
    title: "Topic 8",
    japanese_text: "<ruby>体育<rt>たいいく</rt></ruby>の<ruby>授業<rt>じゅぎょう</rt></ruby>でバレーボールをやった。１セット<ruby>目<rt>め</rt></ruby>は<ruby>点<rt>てん</rt></ruby>を<ruby>取<rt>と</rt></ruby>ることができたが、その<ruby>後<rt>あと</rt></ruby>は<ruby>一方的<rt>いっぽうてき</rt></ruby>に<ruby>負<rt>ま</rt></ruby>けてしまった。<ruby>試合後<rt>しあいご</rt></ruby>、<ruby>両<rt>りょう</rt></ruby>チームで<ruby>握手<rt>あくしゅ</rt></ruby>した。",
    english_translation: "We played volleyball in my physical education class. We scored some points in the first set, but after that, we lost one-sidedly. After the game, both teams shook hands.",
    annotated_words: [
      { kanji: "体育", furigana: "たいいく", meaning: "physical education" },
      { kanji: "体育館", furigana: "たいいくかん", meaning: "gymnasium" },
      { kanji: "〜セット", furigana: "", meaning: "~ set" },
      { kanji: "点", furigana: "てん", meaning: "point" },
      { kanji: "両〜", furigana: "りょう〜", meaning: "both ~" },
      { kanji: "握手［する］", furigana: "あくしゅ", meaning: "shaking hands, shake hands" }
    ]
  },
  {
    id: "118_2",
    title: "Topic 8",
    japanese_text: "<ruby>雨<rt>あめ</rt></ruby>で<ruby>中止<rt>ちゅうし</rt></ruby>の<ruby>場合<rt>ばあい</rt></ruby>でも、<ruby>大会当日<rt>たいかいとうじつ</rt></ruby>にチケット<ruby>代<rt>だい</rt></ruby>を<ruby>払<rt>はら</rt></ruby>い<ruby>戻<rt>もど</rt></ruby>すことはできません。",
    english_translation: "Even in the event of cancellation due to rainy weather, you will not be able to get a refund for ticket fees on the day of the tournament.",
    annotated_words: [
      { kanji: "当日", furigana: "とうじつ", meaning: "actual day of" },
      { kanji: "当日券", furigana: "とうじつけん", meaning: "ticket for today" },
      { kanji: "払い戻す", furigana: "はらいもどす", meaning: "refund" }
    ]
  },
  {
    id: "119_1",
    title: "Topic 8",
    japanese_text: "<ruby>球場<rt>きゅうじょう</rt></ruby>では<ruby>多<rt>おお</rt></ruby>くの<ruby>観客<rt>かんきゃく</rt></ruby>がグローブを<ruby>手<rt>て</rt></ruby>にはめ、ホームランのボールを<ruby>捕<rt>と</rt></ruby>ろうとしている。",
    english_translation: "In the stadium, many spectators have gloves on their hands and are trying to catch home run balls.",
    annotated_words: [
      { kanji: "はめる", furigana: "", meaning: "fit into" },
      { kanji: "ボール", furigana: "", meaning: "ball" },
      { kanji: "球", furigana: "たま", meaning: "ball" },
      { kanji: "捕る", furigana: "とる", meaning: "catch, take" }
    ]
  },
  {
    id: "119_2",
    title: "Topic 8",
    japanese_text: "マラソン<ruby>選手<rt>せんしゅ</rt></ruby>が１<ruby>着<rt>ちゃく</rt></ruby>でゴールする<ruby>姿<rt>すがた</rt></ruby>を<ruby>見<rt>み</rt></ruby>て<ruby>感動<rt>かんどう</rt></ruby>した。たまたま<ruby>録画<rt>ろくが</rt></ruby>していたので<ruby>何度<rt>なんど</rt></ruby>も<ruby>見<rt>み</rt></ruby>た。",
    english_translation: "I was moved seeing the marathon runner cross the goal in first place. I just happened to record it, so I watched it again and again.",
    annotated_words: [
      { kanji: "〜着", furigana: "〜ちゃく", meaning: "~ place" },
      { kanji: "ゴール［する］", furigana: "", meaning: "goal, score a goal" },
      { kanji: "姿", furigana: "すがた", meaning: "appearance" },
      { kanji: "感動［する］", furigana: "かんどう", meaning: "being moved, be moved" },
      { kanji: "たまたま", furigana: "", meaning: "just happened to" },
      { kanji: "録画［する］", furigana: "ろくが", meaning: "recording, record" }
    ]
  },
  {
    id: "120_1",
    title: "Topic 8",
    japanese_text: "<ruby>柔道<rt>じゅうどう</rt></ruby>の48キロ<ruby>級<rt>きゅう</rt></ruby>の<ruby>日本選手<rt>にほんせんしゅ</rt></ruby>が<ruby>試合中<rt>しあいなか</rt></ruby>に<ruby>肩<rt>かた</rt></ruby>を<ruby>負傷<rt>ふしょう</rt></ruby>したが、<ruby>見事<rt>みごと</rt></ruby>に<ruby>金<rt>きん</rt></ruby>メダルを<ruby>獲得<rt>かくとく</rt></ruby>した。",
    english_translation: "Judo's 48 kg-class Japanese athlete injured their shoulders during the match but still impressively won a gold medal.",
    annotated_words: [
      { kanji: "〜級", furigana: "〜きゅう", meaning: "~ class" },
      { kanji: "肩", furigana: "かた", meaning: "shoulder" },
      { kanji: "負傷［する］", furigana: "ふしょう", meaning: "injury, be injured" },
      { kanji: "メダル", furigana: "", meaning: "medal" },
      { kanji: "獲得［する］", furigana: "かくとく", meaning: "acquisition, acquire" }
    ]
  },
  {
    id: "120_2",
    title: "Topic 8",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>はランニングが<ruby>苦手<rt>にがて</rt></ruby>だ。しかしコーチが、ランニングの<ruby>効果<rt>こうか</rt></ruby>は<ruby>大<rt>おお</rt></ruby>きいと<ruby>言<rt>い</rt></ruby>ったので、<ruby>走<rt>はし</rt></ruby>り<ruby>続<rt>つづ</rt></ruby>けている。",
    english_translation: "I'm no good at running. But my coach said that my running results were significant, so I keep running.",
    annotated_words: [
      { kanji: "ランニング［する］", furigana: "", meaning: "running, run" },
      { kanji: "苦手な", furigana: "にがてな", meaning: "not good at" },
      { kanji: "コーチ", furigana: "", meaning: "coach" },
      { kanji: "効果", furigana: "こうか", meaning: "effect" }
    ]
  },
  {
    id: "121_1",
    title: "Topic 8",
    japanese_text: "フリーキックの<ruby>天才<rt>てんさい</rt></ruby>と<ruby>呼<rt>よ</rt></ruby>ばれる<ruby>選手<rt>せんしゅ</rt></ruby>がボールを<ruby>蹴<rt>け</rt></ruby>った。<ruby>右<rt>みぎ</rt></ruby>に<ruby>大<rt>おお</rt></ruby>きく<ruby>曲<rt>ま</rt></ruby>げようとしたが、<ruby>回転<rt>かいてん</rt></ruby>しなかったので、まっすぐ<ruby>飛<rt>と</rt></ruby>んでいってしまった。",
    english_translation: "The player called the free kick genius kicked the ball. She tried to curve the ball wide to the right, but the ball didn't spin, so it flew straight.",
    annotated_words: [
      { kanji: "天才", furigana: "てんさい", meaning: "genius" },
      { kanji: "蹴る", furigana: "ける", meaning: "kick" },
      { kanji: "曲げる", furigana: "まげる", meaning: "curve, bend" },
      { kanji: "回転［する］", furigana: "かいてん", meaning: "rotation, rotate" }
    ]
  },
  {
    id: "121_2",
    title: "Topic 8",
    japanese_text: "<ruby>手続<rt>てつづ</rt></ruby>きにミスがあって、<ruby>予算<rt>よさん</rt></ruby>がカットされてしまい、<ruby>次回<rt>じかい</rt></ruby>の<ruby>大会<rt>たいかい</rt></ruby>に<ruby>出場<rt>しゅつじょう</rt></ruby>できなくなってしまった。",
    english_translation: "As there was a mistake in the procedure, the budget was cut and I will now no longer be able to participate in the next tournament.",
    annotated_words: [
      { kanji: "ミス［する］", furigana: "", meaning: "mistake, make a mistake" },
      { kanji: "カット［する］", furigana: "", meaning: "cut, cut" },
      { kanji: "次回", furigana: "じかい", meaning: "next time" },
      { kanji: "出場［する］", furigana: "しゅつじょう", meaning: "participation, participate" }
    ]
  },
  {
    id: "122_1",
    title: "Topic 8",
    japanese_text: "プロ<ruby>野球<rt>やきゅう</rt></ruby>では、７<ruby>回<rt>かい</rt></ruby>をラッキー７と<ruby>呼<rt>よ</rt></ruby>ぶ。ラッキー７の<ruby>攻撃前<rt>こうげきまえ</rt></ruby>には、ファンは<ruby>風船<rt>ふうせん</rt></ruby>を<ruby>飛<rt>と</rt></ruby>ばしたり、ビニール<ruby>傘<rt>がさ</rt></ruby>を<ruby>使<rt>つか</rt></ruby>って<ruby>応援<rt>おうえん</rt></ruby>したりする。",
    english_translation: "In professional baseball, the seventh inning is called lucky 7. Before their team goes to bat in the lucky 7, fans will do things like let loose balloons or cheer using vinyl umbrellas.",
    annotated_words: [
      { kanji: "プロ", furigana: "", meaning: "professional" },
      { kanji: "攻撃［する］", furigana: "こうげき", meaning: "attack, attack" },
      { kanji: "ファン", furigana: "", meaning: "fan" },
      { kanji: "風船", furigana: "ふうせん", meaning: "balloon" },
      { kanji: "ビニール", furigana: "", meaning: "vinyl" },
      { kanji: "ビニール袋", furigana: "ビニールぶくろ", meaning: "plastic bag" }
    ]
  },
  {
    id: "122_2",
    title: "Topic 8",
    japanese_text: "<ruby>相撲<rt>すもう</rt></ruby>はルールが<ruby>簡単<rt>かんたん</rt></ruby>だ。それに<ruby>結果<rt>けっか</rt></ruby>が<ruby>分<rt>わ</rt></ruby>かりやすいので、<ruby>人気<rt>にんき</rt></ruby>がある。",
    english_translation: "The rules of sumo wrestling are simple. In addition, the results are easy to understand, so it's popular.",
    annotated_words: [
      { kanji: "相撲", furigana: "すもう", meaning: "sumo wrestling" },
      { kanji: "ルール", furigana: "", meaning: "rule" },
      { kanji: "それに", furigana: "", meaning: "in addition" },
      { kanji: "結果", furigana: "けっか", meaning: "result" }
    ]
  },
  {
    id: "123_1",
    title: "Topic 8",
    japanese_text: "ボールを<ruby>追<rt>お</rt></ruby>った<ruby>選手同士<rt>せんしゅどうし</rt></ruby>がかなりのスピードでぶつかった。ぶつかった<ruby>脚<rt>あし</rt></ruby>はすぐに<ruby>動<rt>うご</rt></ruby>かさず、スプレーをかけて<ruby>冷<rt>ひ</rt></ruby>やし、<ruby>様子<rt>ようす</rt></ruby>を<ruby>見<rt>み</rt></ruby>た。",
    english_translation: "The players who were chasing the ball collided at a considerable speed. They kept their legs that had collided still, and they sprayed them to cool them and waited to see how things turned out.",
    annotated_words: [
      { kanji: "追う", furigana: "おう", meaning: "chase" },
      { kanji: "スピード", furigana: "", meaning: "speed" },
      { kanji: "動かす", furigana: "うごかす", meaning: "move" },
      { kanji: "スプレー", furigana: "", meaning: "spray" }
    ]
  },
  {
    id: "123_2",
    title: "Topic 8",
    japanese_text: "<ruby>全<rt>まった</rt></ruby>く<ruby>点数<rt>てんすう</rt></ruby>が<ruby>入<rt>はい</rt></ruby>らず、<ruby>選手<rt>せんしゅ</rt></ruby>は<ruby>汗<rt>あせ</rt></ruby>ばかりかいている。こんなときはベンチからの<ruby>指示<rt>しじ</rt></ruby>が<ruby>重要<rt>じゅうよう</rt></ruby>となる。",
    english_translation: "No one is scoring, and the players are covered in sweat. In cases like this, giving instructions from the bench is important.",
    annotated_words: [
      { kanji: "点数", furigana: "てんすう", meaning: "score" },
      { kanji: "かく", furigana: "", meaning: "perspire" },
      { kanji: "ベンチ", furigana: "", meaning: "bench" }
    ]
  },
  {
    id: "124_1",
    title: "Topic 8",
    japanese_text: "リーダーが<ruby>本気<rt>ほんき</rt></ruby>になった。<ruby>講習<rt>こうしゅう</rt></ruby>に<ruby>申<rt>もう</rt></ruby>し<ruby>込<rt>こ</rt></ruby>んで<ruby>競争力<rt>きょうそうりょく</rt></ruby>を<ruby>高<rt>たか</rt></ruby>めようとしている。",
    english_translation: "The leader became serious. She is applying for courses and trying to increase her competitiveness.",
    annotated_words: [
      { kanji: "リーダー", furigana: "", meaning: "leader" },
      { kanji: "本気な", furigana: "ほんきな", meaning: "serious" },
      { kanji: "講習", furigana: "こうしゅう", meaning: "course" },
      { kanji: "申し込む", furigana: "もうしこむ", meaning: "apply" },
      { kanji: "申し込み", furigana: "もうしこみ", meaning: "application" },
      { kanji: "競争［する］", furigana: "きょうそう", meaning: "competition, compete" },
      { kanji: "〜力", furigana: "〜りょく", meaning: "~ ability" }
    ]
  },
  {
    id: "124_2",
    title: "Topic 8",
    japanese_text: "<ruby>今回<rt>こんかい</rt></ruby>は<ruby>予想<rt>よそう</rt></ruby>が<ruby>外<rt>はず</rt></ruby>れ、<ruby>優勝<rt>ゆうしょう</rt></ruby>したチームを<ruby>当<rt>あ</rt></ruby>てることができなかった。",
    english_translation: "This time, my expectations were wrong, and I was unable to guess the winning team.",
    annotated_words: [
      { kanji: "優勝［する］", furigana: "ゆうしょう", meaning: "victory, win" },
      { kanji: "チーム", furigana: "", meaning: "team" },
      { kanji: "当てる", furigana: "あてる", meaning: "guess (correctly)" }
    ]
  },
  {
    id: "125_1",
    title: "Topic 8",
    japanese_text: "<ruby>会費<rt>かいひ</rt></ruby>を<ruby>支払<rt>しはら</rt></ruby>うことで、<ruby>有名<rt>ゆうめい</rt></ruby>なサッカーチームのファンクラブに<ruby>参加<rt>さんか</rt></ruby>することができる。",
    english_translation: "By paying the membership fee, you can participate in the famous football team fan club.",
    annotated_words: [
      { kanji: "会費", furigana: "かいひ", meaning: "membership fee" },
      { kanji: "クラブ", furigana: "", meaning: "club" },
      { kanji: "参加［する］", furigana: "さんか", meaning: "participation, participate" }
    ]
  }
];

const targetDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

topic8_stories.forEach(story => {
  fs.writeFileSync(path.join(targetDir, `${story.id}.json`), JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
