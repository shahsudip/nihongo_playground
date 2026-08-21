import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 10 Stories (Sports) - Part 2
const topic10StoriesPart2 = [
  {
    is_story: true,
    story_number: 8,
    title: "Topic 10 スポーツ",
    page_story: "140_1",
    japanese_text: "A：<u>アマチュア</u>テニスでは、<u>左利き</u>は<u>有力な</u>武器になるんだよ。\nB：そうなの？\nA：うん。<u>右利き</u>プレーヤーにとって、左利きプレーヤーが打つボールは打ち返しにくいからね。だから、<u>弱気に</u>ならなくて大丈夫だよ。",
    english_translation: "A: In amateur tennis, being left-handed is a powerful weapon. B: Is that so? A: Yes, because for right-handed players, balls hit by left-handed players are difficult to hit back. So there's no need to be timid.",
    annotated_words: [
      { word_id: "n2_0847", word_number: 847, kanji: "アマ(チュア)", furigana: "", meaning_en: "amateur" },
      { word_id: "n2_0848", word_number: 848, kanji: "左利き", furigana: "ひだりき", meaning_en: "left-handedness" },
      { word_id: "n2_0849", word_number: 849, kanji: "有力な", furigana: "ゆうりょくな", meaning_en: "powerful" },
      { word_id: "n2_0850", word_number: 850, kanji: "右利き", furigana: "みぎき", meaning_en: "right-handedness" },
      { word_id: "n2_0851", word_number: 851, kanji: "弱気な", furigana: "よわきな", meaning_en: "faint-hearted, timid" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 10 スポーツ",
    page_story: "140_2",
    japanese_text: "A：ダンス大会、楽しみだね。\nB：僕<u>のろま</u>なのに、本当にみんなと<u>ステージ</u>に立てるのかな。\nA：大丈夫だよ。曲の<u>テンポ</u>は速いけど、一生懸命練習したし！",
    english_translation: "A: I'm looking forward to the dance performance. B: But I'm such a dunce. I wonder if I should really go up on stage with everyone else. A: Don't worry. The tempo of the song may be fast, but you've practiced hard!",
    annotated_words: [
      { word_id: "n2_0852", word_number: 852, kanji: "のろま", furigana: "", meaning_en: "dunce, dimwitted person" },
      { word_id: "n2_0853", word_number: 853, kanji: "のろい", furigana: "", meaning_en: "dim, dull, slow" },
      { word_id: "n2_0854", word_number: 854, kanji: "ステージ", furigana: "", meaning_en: "stage" },
      { word_id: "n2_0855", word_number: 855, kanji: "テンポ", furigana: "", meaning_en: "tempo" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 10 スポーツ",
    page_story: "141_1",
    japanese_text: "A：今日は一日中休まず練習してたんだ。\nB：がんばったんだね。でも、どんなに<u>意欲</u>があっても、<u>適度に</u> <u>間</u>を空けて休んだ方がいいよ。\nA：え、そう？\nB：<u>張り切り</u>すぎても、体力を<u>無駄遣いする</u>だけだからね。脳の<u>働き</u>が悪いと良いプレーはできないよ。",
    english_translation: "A: I practiced all day today. B: You worked hard. But no matter how motivated you are, you should take breaks at appropriate intervals. A: Oh, really? B: Too much enthusiasm means you'll just waste your physical energy. You can't play well if your brain isn't working properly.",
    annotated_words: [
      { word_id: "n2_0856", word_number: 856, kanji: "意欲", furigana: "いよく", meaning_en: "motivation, will" },
      { word_id: "n2_0857", word_number: 857, kanji: "意欲的な", furigana: "いよくてきな", meaning_en: "ambitious, motivated" },
      { word_id: "n2_0858", word_number: 858, kanji: "適度な", furigana: "てきどな", meaning_en: "appropriate, moderate" },
      { word_id: "n2_0859", word_number: 859, kanji: "間", furigana: "ま", meaning_en: "interval, period" },
      { word_id: "n2_0860", word_number: 860, kanji: "張り切る", furigana: "はりきる", meaning_en: "be enthusiastic, stretch to breaking point" },
      { word_id: "n2_0861", word_number: 861, kanji: "無駄遣い[する]", furigana: "むだづかい", meaning_en: "waste, throw away" },
      { word_id: "n2_0862", word_number: 862, kanji: "働き", furigana: "はたらき", meaning_en: "function, work" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 10 スポーツ",
    page_story: "142_1",
    japanese_text: "最初は、<u>攻めた</u> <u>レース</u>を展開して相手チームを大きく<u>リードし</u>ていたが、<u>つまずいて</u>しまい、試合に<u>敗れて</u>しまった。残念だが、誰にも彼女を<u>責める</u>ことはできない。",
    english_translation: "At first, she took a large lead over the other team in an aggressive race, but then she stumbled and lost the race. It's a pity, but really, no one can blame her.",
    annotated_words: [
      { word_id: "n2_0863", word_number: 863, kanji: "攻める", furigana: "せめる", meaning_en: "attack, be aggressive" },
      { word_id: "n2_0864", word_number: 864, kanji: "レース", furigana: "", meaning_en: "race" },
      { word_id: "n2_0865", word_number: 865, kanji: "リード[する]", furigana: "", meaning_en: "lead, take the lead" },
      { word_id: "n2_0866", word_number: 866, kanji: "つまずく", furigana: "", meaning_en: "fall down, stumble" },
      { word_id: "n2_0867", word_number: 867, kanji: "敗れる", furigana: "やぶれる", meaning_en: "lose" },
      { word_id: "n2_0868", word_number: 868, kanji: "責める", furigana: "せめる", meaning_en: "blame" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 10 スポーツ",
    page_story: "142_2",
    japanese_text: "A：昨日のサッカーの試合、<u>盛り上がりました</u>ね！\nB：実は昨日、<u>観客席</u>にいたんです。\nA：え、うらやましいなあ！\nB：スタジアムで<u>観戦する</u>ことが、<u>唯一の</u>趣味なんですよ。",
    english_translation: "A: Yesterday's soccer match got really exciting! B: Actually, I was watching from the spectator stands yesterday. A: What? I'm so jealous! B: Watching sports at the stadium is my sole hobby.",
    annotated_words: [
      { word_id: "n2_0869", word_number: 869, kanji: "盛り上がる", furigana: "もりあがる", meaning_en: "get excited" },
      { word_id: "n2_0870", word_number: 870, kanji: "観客席", furigana: "かんきゃくせき", meaning_en: "audience seats, spectator stand" },
      { word_id: "n2_0871", word_number: 871, kanji: "観戦[する]", furigana: "かんせん", meaning_en: "sports watching, watch sports" },
      { word_id: "n2_0872", word_number: 872, kanji: "唯一", furigana: "ゆいいつ", meaning_en: "singular, sole (something)" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 10 スポーツ",
    page_story: "143_1",
    japanese_text: "A：4位<u>入賞</u>、おめでとうございます！ <u>先ほど</u>の試合、素晴らしかったです。\nB：ありがとうございます。皆さんの<u>声援</u>のおかげです。\nA：ただ、試合中にけがをされたようですが…。\nB：少し<u>手首</u>を<u>ひねって</u>しまったみたいです。明日の試合に<u>響か</u>ないように、帰って<u>コンディション</u>を整えます。",
    english_translation: "A: Congratulations on placing fourth! That was a great game you played just now. B: Thank you very much. It was thanks to everyone's cheering. A: However, I heard that you were injured during the game. B: I think I twisted my wrist a little. I'll go home and make sure it's in good condition so it doesn't affect tomorrow's game.",
    annotated_words: [
      { word_id: "n2_0873", word_number: 873, kanji: "入賞[する]", furigana: "にゅうしょう", meaning_en: "win, place" },
      { word_id: "n2_0874", word_number: 874, kanji: "先ほど", furigana: "さきほど", meaning_en: "just now, a moment ago" },
      { word_id: "n2_0875", word_number: 875, kanji: "声援", furigana: "せいえん", meaning_en: "cheering" },
      { word_id: "n2_0876", word_number: 876, kanji: "手首", furigana: "てくび", meaning_en: "wrist" },
      { word_id: "n2_0877", word_number: 877, kanji: "ひねる", furigana: "", meaning_en: "sprain, twist" },
      { word_id: "n2_0878", word_number: 878, kanji: "響く", furigana: "ひびく", meaning_en: "affect, influence, reverberate (sound)" },
      { word_id: "n2_0879", word_number: 879, kanji: "コンディション", furigana: "", meaning_en: "condition" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 10 スポーツ",
    page_story: "144_1",
    japanese_text: "スキージャンプでは、スキー板の<u>角度</u>を<u>調整し</u>ながら飛ぶ。ジャンプ台を飛び出したら、<u>空中</u>を<u>前進する</u>ようにして、できるだけ遠い<u>地点</u>に降りると点数が高くなる。",
    english_translation: "Ski jumping involves flying through the air while adjusting the angle of your skis. Once off the ski jump, the skier moves forward in mid-air and lands at the farthest point possible to get the highest score.",
    annotated_words: [
      { word_id: "n2_0880", word_number: 880, kanji: "角度", furigana: "かくど", meaning_en: "angle" },
      { word_id: "n2_0881", word_number: 881, kanji: "調整[する]", furigana: "ちょうせい", meaning_en: "adjustment, adjust" },
      { word_id: "n2_0882", word_number: 882, kanji: "空中", furigana: "くうちゅう", meaning_en: "mid-air" },
      { word_id: "n2_0883", word_number: 883, kanji: "前進[する]", furigana: "ぜんしん", meaning_en: "advancement, move forward" },
      { word_id: "n2_0884", word_number: 884, kanji: "地点", furigana: "ちてん", meaning_en: "point, spot" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 10 スポーツ",
    page_story: "144_2",
    japanese_text: "<u>初心者</u>の頃、何も分からないまま<u>ラケット</u>を<u>思い切り</u>振っていたら、<u>ひじ</u>に<u>鈍い</u>痛みが走ったことがある。",
    english_translation: "When I was a beginner, I once swung my racket with all my might without really knowing how, and felt a dull pain in my elbow.",
    annotated_words: [
      { word_id: "n2_0885", word_number: 885, kanji: "初心者", furigana: "しょしんしゃ", meaning_en: "beginner" },
      { word_id: "n2_0886", word_number: 886, kanji: "ラケット", furigana: "", meaning_en: "racket, racquet" },
      { word_id: "n2_0887", word_number: 887, kanji: "思い切り", furigana: "おもいきり", meaning_en: "as hard/much as possible, with all one's might" },
      { word_id: "n2_0888", word_number: 888, kanji: "ひじ", furigana: "", meaning_en: "elbow" },
      { word_id: "n2_0889", word_number: 889, kanji: "鈍い", furigana: "にぶい", meaning_en: "dull" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 10 スポーツ",
    page_story: "145_1",
    japanese_text: "柔道では、<u>帯</u>の色で強さが分かる。はやく<u>上達して</u>、黒帯を取りたい。そのために、毎日<u>稽古して</u>いる。",
    english_translation: "In judo, you can tell an athlete's strength by the color of their belt. I want to improve quickly and earn my black belt. That's why I practice every day.",
    annotated_words: [
      { word_id: "n2_0890", word_number: 890, kanji: "帯", furigana: "おび", meaning_en: "belt" },
      { word_id: "n2_0891", word_number: 891, kanji: "上達[する]", furigana: "じょうたつ", meaning_en: "improvement, improve" },
      { word_id: "n2_0892", word_number: 892, kanji: "稽古[する]", furigana: "けいこ", meaning_en: "practice, train" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 10 スポーツ",
    page_story: "145_2",
    japanese_text: "<u>一応</u>、<u>勝敗</u>を<u>占って</u>みたら<u>引き分け</u>と出たので、<u>いまいち</u>応援に気持ちが入らなかった。でも無事に勝てたので、これで今シーズンは3<u>勝</u>1<u>敗</u>だ。",
    english_translation: "I'd pretty much predicted that the outcome would be a draw, so I didn't quite feel like supporting the team. But since we won safely, we now have three wins and one loss this season.",
    annotated_words: [
      { word_id: "n2_0893", word_number: 893, kanji: "一応", furigana: "いちおう", meaning_en: "sort of, pretty much" },
      { word_id: "n2_0894", word_number: 894, kanji: "勝敗", furigana: "しょうはい", meaning_en: "(a contest's) outcome, victory or defeat" },
      { word_id: "n2_0895", word_number: 895, kanji: "占う", furigana: "うらなう", meaning_en: "predict, anticipate" },
      { word_id: "n2_0896", word_number: 896, kanji: "引き分け", furigana: "ひきわけ", meaning_en: "draw" },
      { word_id: "n2_0897", word_number: 897, kanji: "いまいち", furigana: "", meaning_en: "not quite, somewhat (lacking)" },
      { word_id: "n2_0898", word_number: 898, kanji: "〜勝", furigana: "しょう", meaning_en: "wins" },
      { word_id: "n2_0899", word_number: 899, kanji: "〜敗", furigana: "はい", meaning_en: "losses" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 10 スポーツ",
    page_story: "146_1",
    japanese_text: "A：あの日の<u>審判</u>が正しかったのかは<u>ともかく</u>として、審判を<u>恨んで</u>いてもどうしようもないと思う。\nB：それは、そうだけど…。\nA：<u>きっぱり</u>割り切って、次の<u>ステップ</u>へ進むっていう<u>選択</u>もできるはずだよ。がんばろう！",
    english_translation: "A: Regardless of whether the decision was correct on the day, in any event there's no point in holding a grudge against the referee. B: Well, that's true, but ... A: You can choose to just make a decisive break and move on to the next step. Good luck!",
    annotated_words: [
      { word_id: "n2_0900", word_number: 900, kanji: "審判[する]", furigana: "しんぱん", meaning_en: "decision, referee, judge" },
      { word_id: "n2_0901", word_number: 901, kanji: "ともかく", furigana: "", meaning_en: "anyway, in any event" },
      { word_id: "n2_0902", word_number: 902, kanji: "恨む", furigana: "うらむ", meaning_en: "hold a grudge, feel bitter" },
      { word_id: "n2_0903", word_number: 903, kanji: "恨み", furigana: "うらみ", meaning_en: "grudge" },
      { word_id: "n2_0904", word_number: 904, kanji: "きっぱり(と)", furigana: "", meaning_en: "decisively, firmly" },
      { word_id: "n2_0905", word_number: 905, kanji: "ステップ", furigana: "", meaning_en: "step" },
      { word_id: "n2_0906", word_number: 906, kanji: "選択[する]", furigana: "せんたく", meaning_en: "option, choice, choose" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 10 スポーツ",
    page_story: "146_2",
    japanese_text: "重量挙げは、男女<u>別</u>、体<u>重別</u>に<u>競う</u>ことができる競技だ。最近では、トランスジェンダーであっても競技に出られるように、昔からの基準を<u>改めよう</u>とする動きも出てきた。",
    english_translation: "Weightlifting is a sport in which men and women compete by both gender and weight. Recently, there has been a movement to revise the previous standards to allow transgender people to compete too.",
    annotated_words: [
      { word_id: "n2_0907", word_number: 907, kanji: "重量", furigana: "じゅうりょう", meaning_en: "weight" },
      { word_id: "n2_0908", word_number: 908, kanji: "〜別", furigana: "べつ", meaning_en: "by ~, theo ~, riêng" },
      { word_id: "n2_0909", word_number: 909, kanji: "競う", furigana: "きそう", meaning_en: "compete" },
      { word_id: "n2_0910", word_number: 910, kanji: "改める", furigana: "あらためる", meaning_en: "overhaul, revise" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 10 スポーツ",
    page_story: "147_2",
    japanese_text: "今日は、リーグの<u>順位</u>を<u>入れ替える</u>ための大切な試合がある。この一年、「<u>今に</u>見てろ！」と思いながら、練習してきた。トレーニングの<u>年間</u>計画を立てて実行するなど、新しい取り組みも行った。相手の弱点を<u>突いた</u>攻撃をして、なんとか勝ちたい。",
    english_translation: "Today's match is important for changing our standing in the league. For the past year, I've been practicing with the approach, \"Just you wait, you'll see!\" Our team has also made new efforts, such as developing and implementing a training plan during the year. We intend to win this game by attacking the weakest points of the opposing team.",
    annotated_words: [
      { word_id: "n2_0911", word_number: 911, kanji: "順位", furigana: "じゅんい", meaning_en: "ranking, standing" },
      { word_id: "n2_0912", word_number: 912, kanji: "入れ替える", furigana: "いれかえる", meaning_en: "change, shift, switch" },
      { word_id: "n2_0913", word_number: 913, kanji: "今に", furigana: "いまに", meaning_en: "before long, just you wait, some day" },
      { word_id: "n2_0914", word_number: 914, kanji: "年間", furigana: "ねんかん", meaning_en: "year, during the year" },
      { word_id: "n2_0915", word_number: 915, kanji: "突く", furigana: "つく", meaning_en: "attack, poke, strike" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 10 スポーツ",
    page_story: "148_1",
    japanese_text: "スポーツにおいて、背が低いことは<u>一種</u>のハンデだ。私は母からの<u>遺伝</u>で低身長だが、それを理由にしたら、サッカーはうまくなれない。だから、私に合ったドリブルや<u>パス</u>の仕方をいつも考えている。",
    english_translation: "In sports, being short is a kind of handicap. I'm short because it runs in my mother's family, but if I rely on that excuse, I'll never be great at soccer. So I'm always thinking about my own ways to dribble or pass the ball.",
    annotated_words: [
      { word_id: "n2_0916", word_number: 916, kanji: "一種", furigana: "いっしゅ", meaning_en: "kind of, type of" },
      { word_id: "n2_0917", word_number: 917, kanji: "遺伝[する]", furigana: "いでん", meaning_en: "heredity, run in the family" },
      { word_id: "n2_0918", word_number: 918, kanji: "遺伝子", furigana: "いでんし", meaning_en: "genetics" },
      { word_id: "n2_0919", word_number: 919, kanji: "パス[する]", furigana: "", meaning_en: "pass, pass" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 10 スポーツ",
    page_story: "148_2",
    japanese_text: "今年は、春から新入生が<u>続々と</u> <u>加入して</u>くれた。バレー部に<u>勢い</u>がつくのは嬉しいが、練習は厳しい。1年後、<u>果たして</u>何人残っているだろうか。",
    english_translation: "This year, new students have been joining one after another since spring. I'm happy that the volleyball team is gaining momentum, but the practice is tough. I wonder how many people will actually be left after a year.",
    annotated_words: [
      { word_id: "n2_0920", word_number: 920, kanji: "続々(と)", furigana: "ぞくぞく", meaning_en: "successively, one after another" },
      { word_id: "n2_0921", word_number: 921, kanji: "加入[する]", furigana: "かにゅう", meaning_en: "entry, join" },
      { word_id: "n2_0922", word_number: 922, kanji: "勢い", furigana: "いきおい", meaning_en: "momentum" },
      { word_id: "n2_0923", word_number: 923, kanji: "果たして", furigana: "はたして", meaning_en: "actually" }
    ]
  }
];

topic10StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 10 story ${story.story_number}: ${story.page_story}.json`);
});
