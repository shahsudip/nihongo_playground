import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const topic6Stories = [
  {
    "id": "84_1",
    "title": "Topic 6 流行",
    "audio_id": "92",
    "japanese_text": "音楽ゲーム、<u>略して</u>「音ゲー」は<u>リズム</u>に合わせて<u>太鼓</u>やボタンをたたくゲームで、多くのゲームセンターに置いてある。最近では、リズムに合わせて<u>タップする</u>ゲームがスマホアプリでたくさん<u>リリースされている</u>。",
    "english_text": "Musical rhythm games, often abbreviated in Japanese as \"otoge\", are games in which players tap drums or buttons to a musical rhythm. They can be found in many game arcades. Recently, many games in which players tap to the rhythm have been released as smartphone apps.",
    "words": [
      { "id": "461", "kanji": "略す", "furigana": "りゃくす", "english": "abbreviate" },
      { "id": "462", "kanji": "リズム", "furigana": "リズム", "english": "rhythm" },
      { "id": "463", "kanji": "太鼓", "furigana": "たいこ", "english": "drum" },
      { "id": "464", "kanji": "タップ[する]", "furigana": "タップ", "english": "tap" },
      { "id": "465", "kanji": "リリース[する]", "furigana": "リリース", "english": "release" }
    ]
  },
  {
    "id": "85_1",
    "title": "Topic 6 流行",
    "audio_id": "93",
    "japanese_text": "A：このゲーム、最初の城で<u>詰まった</u>んだけど。\nB：<u>武器</u>は何使ってる？最初の敵は<u>銃</u>よりも<u>剣</u>に弱かった気がする。\nA：そこが<u>弱点</u>なんだね。でも、近づくと攻撃に当たっちゃうんだけど。\nB：あの城は、裏の壁に穴が開いてるから、そこから<u>こっそり</u>入って、背中から剣で斬るんだよ。\nA：なんて<u>卑怯な</u>…。",
    "english_text": "A: I'm stuck in the first castle in this game. B: What weapon are you using? I think the first enemies are more vulnerable to swords than guns. A: That's their weakness, right. But when I get too close, I get hit by their attacks. B: There's a hole in the back wall of the castle, so I sneak in through there and stab them in the back with my sword. A: That's so cowardly...",
    "words": [
      { "id": "466", "kanji": "詰まる", "furigana": "つまる", "english": "be stuck" },
      { "id": "467", "kanji": "武器", "furigana": "ぶき", "english": "weapon" },
      { "id": "468", "kanji": "銃", "furigana": "じゅう", "english": "gun" },
      { "id": "469", "kanji": "剣", "furigana": "けん", "english": "sword" },
      { "id": "470", "kanji": "弱点", "furigana": "じゃくてん", "english": "weakness, vulnerability" },
      { "id": "471", "kanji": "こっそり(と)", "furigana": "こっそり(と)", "english": "sneakily" },
      { "id": "472", "kanji": "卑怯な", "furigana": "ひきょうな", "english": "cowardly" }
    ]
  },
  {
    "id": "86_1",
    "title": "Topic 6 流行",
    "audio_id": "94",
    "japanese_text": "A：<u>ライバル</u>ってすごく重要な<u>要素</u>だと思う。\nB：分かる。名作ってだいたいライバルが<u>主人公</u>より人気あるよね。最初強かった敵が、<u>味方</u>になる。まさかあのキャラクターが仲間になってくれるなんて！って<u>わくわくする</u>。\nA：でも、主人公に<u>ふさわしい</u>敵として最後まで戦うのもいいよね。",
    "english_text": "A: I think rivalry is a very important element. B: I agree. In lots of great movies, rivals are more popular than the main characters. Someone who was a powerful enemy at first later becomes an ally. And you never expect that character to become a friend! It's exciting! A: But it's also great when they fight to the very end as an enemy worthy of the main character.",
    "words": [
      { "id": "473", "kanji": "ライバル", "furigana": "ライバル", "english": "rival, rivalry" },
      { "id": "474", "kanji": "要素", "furigana": "ようそ", "english": "factor, element" },
      { "id": "475", "kanji": "主人公", "furigana": "しゅじんこう", "english": "main character, protagonist" },
      { "id": "476", "kanji": "味方[する]", "furigana": "みかた", "english": "ally, take sides with" },
      { "id": "477", "kanji": "わくわくする", "furigana": "わくわくする", "english": "be excited" },
      { "id": "478", "kanji": "ふさわしい", "furigana": "ふさわしい", "english": "suitable, worthy" }
    ]
  },
  {
    "id": "86_2",
    "title": "Topic 6 流行",
    "audio_id": "95",
    "japanese_text": "高いところから<u>ジャンプして</u>登場する。戦う前に<u>勇ましい</u><u>せりふ</u>を言う。これらは日本のヒーローの特徴である。ロボットに乗って戦う場合も、<u>パイロット</u>は必殺技を<u>撃つ</u>ときに、技の名前を叫ぶのだ。",
    "english_text": "Jumping down from somewhere high to make a dramatic entrance. Saying heroic lines before fighting. These are the characteristics of Japanese heroes. Even when fighting in a giant robot, the pilot has to shout the name of the technique when firing off a killer technique.",
    "words": [
      { "id": "479", "kanji": "ジャンプ[する]", "furigana": "ジャンプ", "english": "jumping, jump" },
      { "id": "480", "kanji": "勇ましい", "furigana": "いさましい", "english": "heroic" },
      { "id": "481", "kanji": "せりふ", "furigana": "せりふ", "english": "line, dialog" },
      { "id": "482", "kanji": "パイロット", "furigana": "パイロット", "english": "pilot" },
      { "id": "483", "kanji": "撃つ", "furigana": "うつ", "english": "fire off, discharge" }
    ]
  },
  {
    "id": "87_1",
    "title": "Topic 6 流行",
    "audio_id": "96",
    "japanese_text": "ヒミコという名前はいろいろなマンガに登場するが、これは古代の日本の<u>女王</u>の名前である。男が王だった時代は、ずっと<u>争い</u>が続いていた。しかし、女王が国を<u>治める</u>ようになると、争いは止まったと言われている。",
    "english_text": "Himiko is the name of an ancient Japanese queen, and her name appears in various manga comics. When men were kings, there was constant conflict. However, it's said that when a queen ruled the land, the fighting ceased.",
    "words": [
      { "id": "484", "kanji": "女王", "furigana": "じょおう", "english": "queen" },
      { "id": "485", "kanji": "争い", "furigana": "あらそい", "english": "conflict, strife" },
      { "id": "486", "kanji": "＋ 争う", "furigana": "あらそう", "english": "fight, struggle" },
      { "id": "487", "kanji": "治める", "furigana": "おさめる", "english": "rule, reign over" }
    ]
  },
  {
    "id": "88_1",
    "title": "Topic 6 流行",
    "audio_id": "97",
    "japanese_text": "この映画では<u>悪役</u>の<u>演技</u>が素晴らしく、数々の<u>名</u><u>シーン</u>を生んだ。<u>評論家</u>も<u>絶賛した</u>。しかし、あまりにも<u>醜い</u><u>役</u>を演じたためか、<u>役者</u>はその後、亡くなってしまった。",
    "english_text": "The villain's performance in this film was excellent, which made for lots of great scenes. Critics also praised it. However, perhaps because the role was so unpleasant, the actor had passed away.",
    "words": [
      { "id": "488", "kanji": "悪役", "furigana": "あくやく", "english": "bad guy, villain" },
      { "id": "489", "kanji": "演技[する]", "furigana": "えんぎ", "english": "performance, perform" },
      { "id": "490", "kanji": "名～", "furigana": "めい～", "english": "famous ~, great ~" },
      { "id": "491", "kanji": "シーン", "furigana": "シーン", "english": "scene" },
      { "id": "492", "kanji": "評論家", "furigana": "ひょうろんか", "english": "critic" },
      { "id": "493", "kanji": "＋ 評論[する]", "furigana": "ひょうろん", "english": "criticism, criticize" },
      { "id": "494", "kanji": "醜い", "furigana": "みにくい", "english": "ugly, unpleasant" },
      { "id": "495", "kanji": "役", "furigana": "やく", "english": "role" },
      { "id": "496", "kanji": "役者", "furigana": "やくしゃ", "english": "actor" }
    ]
  },
  {
    "id": "88_2",
    "title": "Topic 6 流行",
    "audio_id": "98",
    "japanese_text": "小学生の頃、私はいろいろ<u>空想して</u>、漫画を描くことが好きだった。中学生になると、家族たちは<u>くだらない</u>とか、そんな<u>幼稚な</u>ことはやめろと言ってきた。しかし、私は高校でも大学でも漫画を描くことはやめなかった。そして25才のとき、<u>ついに</u>私の描いた漫画が雑誌に<u>載った</u>。",
    "english_text": "When I was in elementary school, I liked to fantasize about all kinds of things and draw manga comics. When I entered junior high school, my family told me it was silly and that I should stop doing such childish things. But I never stopped drawing manga, even in high school and in college. Finally, when I was 25, a magazine published a manga comic that I'd drawn.",
    "words": [
      { "id": "497", "kanji": "空想[する]", "furigana": "くうそう", "english": "fantasy, fantasize" },
      { "id": "498", "kanji": "くだらない", "furigana": "くだらない", "english": "silly, pointless" },
      { "id": "499", "kanji": "幼稚な", "furigana": "ようちな", "english": "childish" },
      { "id": "500", "kanji": "ついに", "furigana": "ついに", "english": "finally" },
      { "id": "501", "kanji": "載る", "furigana": "のる", "english": "post, publish" }
    ]
  },
  {
    "id": "89_1",
    "title": "Topic 6 流行",
    "audio_id": "99",
    "japanese_text": "<u>演劇</u>の面白さは、<u>粗筋</u>は同じでも、演出によって全く異なる作品になることである。さらに、同じメンバーでも日によって<u>芝居</u>は少しずつ変化する。",
    "english_text": "The fascinating thing about theater is that even if the broad outline of a play stays the same, it can become a completely different work depending on how it's directed. Moreover, even with the same cast, the show will vary slightly from day to day.",
    "words": [
      { "id": "502", "kanji": "演劇", "furigana": "えんげき", "english": "theater" },
      { "id": "503", "kanji": "粗筋", "furigana": "あらすじ", "english": "broad outline, summary" },
      { "id": "504", "kanji": "芝居[する]", "furigana": "しばい", "english": "show, play, perform" }
    ]
  },
  {
    "id": "90_1",
    "title": "Topic 6 流行",
    "audio_id": "100",
    "japanese_text": "私は最初、その漫画を、<u>単に</u>街を<u>脅かす</u>巨人を<u>やっつける</u>だけの漫画だと思っていた。しかし、さまざまな<u>謎</u>があることに気づき、インターネット上で議論しながら<u>展開</u>を予想するようになった。",
    "english_text": "At first, I thought this manga was simply a comic book about slaying giants that threaten the city. However, I later became aware of various mysteries and began to try to predict story developments through discussions on the Internet.",
    "words": [
      { "id": "505", "kanji": "単に", "furigana": "たんに", "english": "simply" },
      { "id": "506", "kanji": "脅かす", "furigana": "おびやかす", "english": "threaten" },
      { "id": "507", "kanji": "やっつける", "furigana": "やっつける", "english": "slay, vanquish" },
      { "id": "508", "kanji": "謎", "furigana": "なぞ", "english": "mystery" },
      { "id": "509", "kanji": "展開[する]", "furigana": "てんかい", "english": "development, develop" }
    ]
  },
  {
    "id": "90_2",
    "title": "Topic 6 流行",
    "audio_id": "101",
    "japanese_text": "元<u>刑事</u>が<u>殺人</u>をしたと言って警察にやってきた。そんなシーンから始まるこの小説は、当初、<u>批評</u>家の評価は高くなかった。しかし、読者の人気は高く、映画やドラマが<u>制作された</u>。",
    "english_text": "A former detective comes to the police, claiming to have committed a murder. The novel, which begins with this scene, was not well received by critics at first. But it was very popular with readers, and a movie and drama series were later produced.",
    "words": [
      { "id": "510", "kanji": "刑事", "furigana": "けいじ", "english": "detective" },
      { "id": "511", "kanji": "殺人", "furigana": "さつじん", "english": "murder" },
      { "id": "512", "kanji": "批評[する]", "furigana": "ひひょう", "english": "critique, criticize, review" },
      { "id": "513", "kanji": "制作[する]", "furigana": "せいさく", "english": "production, produce" }
    ]
  },
  {
    "id": "91_1",
    "title": "Topic 6 流行",
    "audio_id": "102",
    "japanese_text": "<u>娯楽</u>作品では、<u>探偵</u>は人気のある職業だが、泥棒も人気があったりする。泥棒のキャラクターは<u>ダイヤ</u>などの<u>宝</u>を盗むが、お金には興味がなく、盗んだものを<u>返却する</u>ことも多い。また、考えてみれば不思議なことだが、しばしば銃から<u>トランプ</u>を<u>発射して</u>戦ったりする。",
    "english_text": "In fictional works of entertainment, private investigators are popular characters, but thieves can also be popular. Thief characters steal diamonds and other riches, but they're often not interested in money and sometimes even return what they steal. It's odd when you think about it, but they often fight by firing playing cards from guns.",
    "words": [
      { "id": "514", "kanji": "娯楽", "furigana": "ごらく", "english": "entertainment" },
      { "id": "515", "kanji": "探偵", "furigana": "たんてい", "english": "detective, investigator" },
      { "id": "516", "kanji": "ダイヤ", "furigana": "ダイヤ", "english": "diamond" },
      { "id": "517", "kanji": "宝", "furigana": "たから", "english": "treasure, riches" },
      { "id": "518", "kanji": "返却[する]", "furigana": "へんきゃく", "english": "return, return" },
      { "id": "519", "kanji": "トランプ", "furigana": "トランプ", "english": "playing card" },
      { "id": "520", "kanji": "発射[する]", "furigana": "はっしゃ", "english": "discharge, fire, shoot" }
    ]
  },
  {
    "id": "92_1",
    "title": "Topic 6 流行",
    "audio_id": "103",
    "japanese_text": "<u>炎</u>を出したり、<u>翼</u>を生やしたり、漫画・アニメには超能力がよく登場する。その不思議な<u>パワー</u>を手に入れる方法も様々だ。有名な漫画では、<u>奇妙な</u>形の<u>実</u>を食べることで、力を手に入れる。<u>しかも</u>、その実の<u>図鑑</u>があり、食べる前からどんな力が手に入るのかわかるのだ。",
    "english_text": "The ability to produce flames, grow wings, and other supernatural powers often appear in manga comics and anime. There are also various ways to obtain these mysterious powers. In one well-known manga, powers are obtained by eating strangely shaped fruit. And what's more, there's even an illustrated book of these fruit, so you know what sort of power you'll get before you eat it.",
    "words": [
      { "id": "521", "kanji": "炎", "furigana": "ほのお", "english": "flame" },
      { "id": "522", "kanji": "翼", "furigana": "つばさ", "english": "wing" },
      { "id": "523", "kanji": "パワー", "furigana": "パワー", "english": "power" },
      { "id": "524", "kanji": "奇妙な", "furigana": "きみょうな", "english": "strange, odd" },
      { "id": "525", "kanji": "実", "furigana": "み", "english": "fruit, nut" },
      { "id": "526", "kanji": "しかも", "furigana": "しかも", "english": "what's more, on top of that" },
      { "id": "527", "kanji": "図鑑", "furigana": "ずかん", "english": "picture book, illustrated book" }
    ]
  },
  {
    "id": "92_2",
    "title": "Topic 6 流行",
    "audio_id": "104",
    "japanese_text": "A：ホラー映画って苦手だな。<u>幽霊</u>に<u>恐怖</u>は感じないんだけど、大きな音で<u>驚かされる</u>のが嫌いなんだ。\nB：私は推理ものとかでも、<u>死体</u>が<u>映っている</u>とだめですね。<u>気味が悪い</u>から。",
    "english_text": "A: I don't like horror movies. I'm not afraid of ghosts, but I don't like being startled by loud noises. B: I don't like to see dead bodies shown in thriller movies. It gives me a creepy feeling.",
    "words": [
      { "id": "528", "kanji": "幽霊", "furigana": "ゆうれい", "english": "ghost" },
      { "id": "529", "kanji": "恐怖[する]", "furigana": "きょうふ", "english": "fear, be afraid of" },
      { "id": "530", "kanji": "驚かす", "furigana": "おどろかす", "english": "surprise, startle" },
      { "id": "531", "kanji": "死体", "furigana": "したい", "english": "dead body, corpse" },
      { "id": "532", "kanji": "映る", "furigana": "うつる", "english": "appear, be shown" },
      { "id": "533", "kanji": "＋ 映す", "furigana": "うつす", "english": "show, project" },
      { "id": "534", "kanji": "気味が悪い", "furigana": "きみがわるい", "english": "creepy, uneasy" }
    ]
  },
  {
    "id": "93_1",
    "title": "Topic 6 流行",
    "audio_id": "105",
    "japanese_text": "ある人気漫画は36<u>巻</u>、<u>ストーリー</u>の途中で止まってしまっている。しかし、もうすぐ<u>再開する</u>と<u>うわさされている</u>。",
    "english_text": "A certain popular manga has stopped at 36 volumes, and it's only partway through the story. However, it's rumored that it will resume soon.",
    "words": [
      { "id": "535", "kanji": "～巻", "furigana": "～かん", "english": "volumes, instalments" },
      { "id": "536", "kanji": "ストーリー", "furigana": "ストーリー", "english": "story" },
      { "id": "537", "kanji": "再開[する]", "furigana": "さいかい", "english": "restart, resume" },
      { "id": "538", "kanji": "うわさ[する]", "furigana": "うわさ", "english": "rumor, be rumored" }
    ]
  },
  {
    "id": "94_1",
    "title": "Topic 6 流行",
    "audio_id": "106",
    "japanese_text": "ＲＰＧ、ロールプレイングゲームが日本で発売されたとき、大<u>ブーム</u>が起こった。多くの若者が剣と<u>魔法</u>の世界での<u>冒険</u>に<u>熱中した</u>。<u>当時</u>は<u>徹夜して</u><u>プレイした</u>人も多かった。",
    "english_text": "When role-playing games, or RPGs, were first released in Japan, there was a huge RPG boom. Many young people were absorbed in adventures in sword and magical worlds. At that time, many people stayed up all night to play.",
    "words": [
      { "id": "539", "kanji": "ブーム", "furigana": "ブーム", "english": "boom" },
      { "id": "540", "kanji": "魔法", "furigana": "まほう", "english": "magic" },
      { "id": "541", "kanji": "冒険[する]", "furigana": "ぼうけん", "english": "adventure, go adventuring" },
      { "id": "542", "kanji": "熱中[する]", "furigana": "ねっちゅう", "english": "enthusiasm, be absorbed" },
      { "id": "543", "kanji": "当時", "furigana": "とうじ", "english": "at that time" },
      { "id": "544", "kanji": "徹夜[する]", "furigana": "てつや", "english": "all-nighter, stay up all night" },
      { "id": "545", "kanji": "プレイ[する]", "furigana": "プレイ", "english": "playing, play" }
    ]
  },
  {
    "id": "94_2",
    "title": "Topic 6 流行",
    "audio_id": "107",
    "japanese_text": "このゲームの<u>請求書</u>は、<u>あらゆる</u><u>端末</u>から見ることができます。「<u>発行する</u>」のボタンを押すと、ＰＤＦがダウンロードでき、印刷することもできます。",
    "english_text": "The billing statement for this game can be viewed from any kind of device. You can also download a PDF file and print it out by clicking the \"Issue\" button.",
    "words": [
      { "id": "546", "kanji": "請求書", "furigana": "せいきゅうしょ", "english": "billing statement, invoice" },
      { "id": "547", "kanji": "＋ 請求[する]", "furigana": "せいきゅう", "english": "invoice, request payment" },
      { "id": "548", "kanji": "あらゆる", "furigana": "あらゆる", "english": "any kind of, all kinds of" },
      { "id": "549", "kanji": "端末", "furigana": "たんまつ", "english": "device, terminal" },
      { "id": "550", "kanji": "発行[する]", "furigana": "はっこう", "english": "issue, publish" }
    ]
  },
  {
    "id": "95_1",
    "title": "Topic 6 流行",
    "audio_id": "108",
    "japanese_text": "A：<u>シリーズ</u>最新作、３月に<u>上映</u>だってね。今から超楽しみ。絶対<u>前売り</u>券買って、初日に見る。\nB：どうせ上映後１年したらテレビで見られるんだから、急いで見る必要なくない？\nA：あの大きい<u>スクリーン</u>で見るのがいいんじゃない！それに、<u>ＣＭ</u>が入るのが我慢できないんだ。",
    "english_text": "A: I heard that the latest movie in the series will screen in March. I'm really looking forward to it. I'll definitely buy a ticket in advance and see it on the first day. B: It'll be on TV a year after it screens anyway, so there's no rush to see it. A: It's better to see it on the big screen! Besides, I can't stand commercials.",
    "words": [
      { "id": "551", "kanji": "シリーズ", "furigana": "シリーズ", "english": "series" },
      { "id": "552", "kanji": "上映[する]", "furigana": "じょうえい", "english": "projection, screen" },
      { "id": "553", "kanji": "前売り[する]", "furigana": "まえうり", "english": "advance sale, sell in advance" },
      { "id": "554", "kanji": "スクリーン", "furigana": "スクリーン", "english": "screen" },
      { "id": "555", "kanji": "ＣＭ／コマーシャル", "furigana": "シーエム／コマーシャル", "english": "commercial" }
    ]
  },
  {
    "id": "96_1",
    "title": "Topic 6 流行",
    "audio_id": "109",
    "japanese_text": "A：私の好きな漫画家のＳＮＳが、「<u>公式</u>」って書いてあるのに、本人じゃなかったんだー。<u>だまされた</u>気分。\nB：それは仕方ないね。漫画家がＳＮＳやるの大変らしいよ。「私の好きなキャラクターを活躍させてください」って<u>リクエストする</u>人もいるし。\nA：えー。<u>ずうずうしい</u>人がいるんだね。",
    "english_text": "A: My favorite manga cartoonist's social media site says \"Official\" but it's not actually him! I feel cheated. B: But what can you do? It's not easy for cartoonists to be on social media. People make requests to put in their own favorite characters. A: Really? Some people are shameless.",
    "words": [
      { "id": "556", "kanji": "公式", "furigana": "こうしき", "english": "official" },
      { "id": "557", "kanji": "だます", "furigana": "だます", "english": "cheat, deceive" },
      { "id": "558", "kanji": "リクエスト[する]", "furigana": "リクエスト", "english": "request, request" },
      { "id": "559", "kanji": "ずうずうしい", "furigana": "ずうずうしい", "english": "brazen, shameless" }
    ]
  },
  {
    "id": "96_2",
    "title": "Topic 6 流行",
    "audio_id": "110",
    "japanese_text": "昔は、<u>終えた</u>ゲームは<u>中古</u>ゲーム店に売ることが多かった。中古ゲームには、前の持ち主の名前が書かれていたり、<u>シール</u>が貼られていたりすることもあった。",
    "english_text": "In the past, after finishing a video game, people often sold them to used game stores. Used games sometimes had the name of the previous owner written on them or were covered in stickers.",
    "words": [
      { "id": "560", "kanji": "終える", "furigana": "おえる", "english": "finish" },
      { "id": "561", "kanji": "中古", "furigana": "ちゅうこ", "english": "used, secondhand" },
      { "id": "562", "kanji": "シール", "furigana": "シール", "english": "sticker" }
    ]
  },
  {
    "id": "97_1",
    "title": "Topic 6 流行",
    "audio_id": "111",
    "japanese_text": "A：うわー、もう死にそう。ここ難しすぎるよー。\nB：今見えた<u>泉</u>に入ってみたら？回復するんじゃない？\nA：え、本当に回復した！<u>ヒント</u>は<u>一切</u>なかったのに、どうして分かったの？\nB：こういうゲームは<u>一通り</u>プレイしているからね。\nA：<u>さすが</u>だね。",
    "english_text": "A: Whoa, I'm about to die. It's too difficult here. B: Why not try entering the fountain we just saw? You should recover. A: Hey, I did recover! There were no hints at all. How did you figure it out? B: I play a lot of these games, and they're usually quite similar. A: I knew it. That's just like you.",
    "words": [
      { "id": "563", "kanji": "泉", "furigana": "いずみ", "english": "spring, fountain" },
      { "id": "564", "kanji": "ヒント", "furigana": "ヒント", "english": "hint" },
      { "id": "565", "kanji": "一切", "furigana": "いっさい", "english": "at all, absolutely" },
      { "id": "566", "kanji": "一通り", "furigana": "ひととおり", "english": "generally speaking, usually" },
      { "id": "567", "kanji": "さすが", "furigana": "さすが", "english": "as expected, just like (someone)" }
    ]
  },
  {
    "id": "98_1",
    "title": "Topic 6 流行",
    "audio_id": "112",
    "japanese_text": "A：ゲームのやりすぎかなあ。これ以上、<u>視力</u>が悪くなったらメガネかコンタクトだって医者に<u>警告された</u>。どっちが<u>もてる</u>と思う？\nB：どっちにしても、もてないと思う。",
    "english_text": "A: I think I play too many games. My doctor warned me that if my eyesight gets any worse, I'll have to get glasses or contact lenses. Which do you think would be more attractive? B: Either way, I don't think you'll be attractive.",
    "words": [
      { "id": "568", "kanji": "視力", "furigana": "しりょく", "english": "eyesight, vision" },
      { "id": "569", "kanji": "警告[する]", "furigana": "けいこく", "english": "warning, warn" },
      { "id": "570", "kanji": "もてる", "furigana": "もてる", "english": "be attractive" }
    ]
  },
  {
    "id": "98_2",
    "title": "Topic 6 流行",
    "audio_id": "113",
    "japanese_text": "A：今度の映画の<u>ゲスト</u>キャラクターの役者が<u>公表された</u>けど、<u>お笑い芸人</u>なんだって。ちゃんとプロの声優を使ってほしいよ。\nB：きっと、事務所が<u>推薦した</u>んだろうね。",
    "english_text": "A: They've announced who's playing the guest character in the upcoming movie, but he's a comedian. I wish they'd get a professional voice actor. B: Well, I'm sure the agency recommended him.",
    "words": [
      { "id": "571", "kanji": "ゲスト", "furigana": "ゲスト", "english": "guest" },
      { "id": "572", "kanji": "公表[する]", "furigana": "こうひょう", "english": "announcement, announce" },
      { "id": "573", "kanji": "（お笑い）芸人", "furigana": "（おわらい）げいにん", "english": "comedian" },
      { "id": "574", "kanji": "推薦[する]", "furigana": "すいせん", "english": "recommendation, recommend" },
      { "id": "575", "kanji": "＋ 推薦状", "furigana": "すいせんじょう", "english": "letter of recommendation" }
    ]
  },
  {
    "id": "99_1",
    "title": "Topic 6 流行",
    "audio_id": "114",
    "japanese_text": "「ガチャ」と呼ばれる、<u>抽選</u>でキャラクターがあたるシステムは、今は大半のスマホゲームに<u>広まっている</u>。お金がかかるのでもうやめよう、と思っても「あと１回で当たるかも」と<u>悪魔</u>が<u>ささやいて</u>くる。",
    "english_text": "The gacha system, in which players are awarded characters by random draw, has now spread widely to the majority of smartphone games. Even if you decide to stop playing because it costs money, the devil will still whisper in your ear, \"Just one more time—you might win...\"",
    "words": [
      { "id": "576", "kanji": "抽選[する]", "furigana": "ちゅうせん", "english": "lottery, draw at random" },
      { "id": "577", "kanji": "広まる", "furigana": "ひろまる", "english": "diffuse, spread widely" },
      { "id": "578", "kanji": "＋ 広める", "furigana": "ひろめる", "english": "extend, broaden" },
      { "id": "579", "kanji": "悪魔", "furigana": "あくま", "english": "devil" },
      { "id": "580", "kanji": "ささやく", "furigana": "ささやく", "english": "whisper" }
    ]
  },
  {
    "id": "100_1",
    "title": "Topic 6 流行",
    "audio_id": "115",
    "japanese_text": "A：今日漫画に「アメノ」なんとかっていう名前の剣が出てきて、変な名前だなって思ったよ。\nB：「アメノハバキリ」じゃない？日本の<u>神話</u>に出てくる剣だよ。\nA：え！本当にあったの？\nB：神話だよ。でも、<u>架空</u>の剣に、<u>オリジナル</u>の名前をつけても覚えづらいでしょ。だから、剣でもモンスターでも、神話から名前を借りてくることは多いよ。漫画やアニメを見ていると、神話にも詳しくなる。\nA：へえ。そこまでくると、<u>教養</u>だね。",
    "english_text": "A: In the manga I read today, there was a sword named \"Ameno\" something, and I thought it was such a strange name. B: Isn't that Ame-no-Habakiri? It's a sword from Japanese mythology. A: What? Did it really exist? B: It's a myth. But it's harder to remember a fictional sword with an original name, isn't it? That's why swords and monsters often borrow names from mythology. If you watch manga and anime, you become more familiar with mythology. A: Wow. I suppose if you take it far enough, you can really gain an education.",
    "words": [
      { "id": "581", "kanji": "神話", "furigana": "しんわ", "english": "myth, mythology" },
      { "id": "582", "kanji": "架空", "furigana": "かくう", "english": "fictional, fantastical" },
      { "id": "583", "kanji": "オリジナル", "furigana": "オリジナル", "english": "original" },
      { "id": "584", "kanji": "教養", "furigana": "きょうよう", "english": "culture, refinement, education" }
    ]
  },
  {
    "id": "101_1",
    "title": "Topic 6 流行",
    "audio_id": "116",
    "japanese_text": "<u>アイドル</u>の仕事はとても大変だ。スケジュールが<u>ハードな</u>上、<u>激しい</u>動きのダンスをしながら、ステージでは常に<u>ほほ笑んで</u>いなければならない。そして、休日にデートしているところを見られると、ニュースの<u>見出し</u>に名前が載り、ファンには「<u>裏切られた</u>」と言われる。しかし、大変だからこそ、<u>プライド</u>を持って仕事をしているのである。",
    "english_text": "Working as a musical \"idol\" performer is not easy. The schedule is hard, and you have to constantly smile on stage while performing strenuous dance moves. And if you're ever spotted going on a date on your day off, your name will be in the headlines and fans will say that you've betrayed them. But precisely because it's so hard, they take pride in their work.",
    "words": [
      { "id": "585", "kanji": "アイドル", "furigana": "アイドル", "english": "idol (performer)" },
      { "id": "586", "kanji": "ハードな", "furigana": "ハードな", "english": "hard" },
      { "id": "587", "kanji": "激しい", "furigana": "はげしい", "english": "strenuous, intense" },
      { "id": "588", "kanji": "ほほ笑む", "furigana": "ほほえむ", "english": "smile" },
      { "id": "589", "kanji": "見出し", "furigana": "みだし", "english": "headline" },
      { "id": "590", "kanji": "裏切る", "furigana": "うらぎる", "english": "betray" },
      { "id": "591", "kanji": "プライド", "furigana": "プライド", "english": "pride" }
    ]
  },
  {
    "id": "102_1",
    "title": "Topic 6 流行",
    "audio_id": "117",
    "japanese_text": "<u>いわゆる</u>オープンワールドと呼ばれるゲームは、<u>広大な</u>世界を自由に移動できるゲームのことだ。プレイヤーは自由にゲームを<u>進める</u>ことができる。もちろん、世界のあちこちに敵が<u>存在し</u>、それに<u>勝利する</u>ことが目的である。ストーリーが<u>進行する</u>にしたがって、最初は何も持っていなかった主人公がどんどん<u>重装備</u>になっていくことも、魅力の一つだ。",
    "english_text": "So-called \"open world\" games are games that allow players to move freely through vast worlds. The player can proceed through the game however they like. Of course, enemies exist everywhere in the world, and the goal is to defeat them. As the story progresses, the main character, who initially had nothing, becomes more and more heavily equipped, which is one of the attractions of the game.",
    "words": [
      { "id": "592", "kanji": "いわゆる", "furigana": "いわゆる", "english": "so-called" },
      { "id": "593", "kanji": "広大な", "furigana": "こうだいな", "english": "vast, huge" },
      { "id": "594", "kanji": "進める", "furigana": "すすめる", "english": "move forward, proceed" },
      { "id": "595", "kanji": "存在[する]", "furigana": "そんざい", "english": "presence, exist" },
      { "id": "596", "kanji": "勝利[する]", "furigana": "しょうり", "english": "triumph over, defeat" },
      { "id": "597", "kanji": "進行[する]", "furigana": "しんこう", "english": "progress, proceed" },
      { "id": "598", "kanji": "重～", "furigana": "じゅう～", "english": "heavily ~" },
      { "id": "599", "kanji": "装備[する]", "furigana": "そうび", "english": "equipment, equip" }
    ]
  },
  {
    "id": "103_1",
    "title": "Topic 6 流行",
    "audio_id": "118",
    "japanese_text": "A：やっぱり古い３部作は見た方がいいかなあ？\nB：いろんな映画に影響を<u>及ぼした</u>名作だからね。映画史に<u>永遠に</u>残るだろうね。帝国に支配されていた民族が<u>解放される</u>シーンは、当時の<u>思想</u>なども反映されていると思うよ。\nA：でも古い３部作は、ストーリーの最初じゃないんだよね。\nB：ストーリーの<u>順序</u>は異なるけど、映像としては古いものから新しいものを見た方が技術の進歩を感じられるよ。",
    "english_text": "A: So should I watch the original trilogy? B: They're masterpieces whose influence has extended to lots of films. I think they'll go down forever in the history of cinema. The scenes showing the people once ruled by the Empire become liberated reflect the thinking of the time. A: But the original trilogy isn't the beginning of the story. B: The order of the story is different, but as for the images, you get more of a sense of how the technology progressed by watching the original trilogy first, then the new ones.",
    "words": [
      { "id": "600", "kanji": "及ぼす", "furigana": "およぼす", "english": "extend, reach" },
      { "id": "601", "kanji": "永遠な", "furigana": "えいえんな", "english": "forever, eternal" },
      { "id": "602", "kanji": "解放[する]", "furigana": "かいほう", "english": "liberation, liberate" },
      { "id": "603", "kanji": "思想", "furigana": "しそう", "english": "thought, thinking" },
      { "id": "604", "kanji": "順序", "furigana": "じゅんじょ", "english": "order" }
    ]
  }
];

topic6Stories.forEach(story => {
  const filePath = path.join(OUTPUT_DIR, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Saved Topic 6 story: ${story.id}.json`);
});
console.log(`Done! ${topic6Stories.length} stories saved for Topic 6.`);
