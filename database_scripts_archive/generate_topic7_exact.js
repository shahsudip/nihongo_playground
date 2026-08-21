import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete Topic 7 Stories (Hobbies) - pages 104-115
const topic7Stories = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 7 趣味",
    page_story: "104_1",
    japanese_text: "<u>語学</u>の勉強は、続けることが大切だ。私は、朝起きたら英語の新聞を読み、夜寝る前は英語の<u>短編</u>小説を読むのを<u>日課</u>にしている。この方法は、<u>実例</u>から単語を学ぶことができるので楽しい。",
    english_translation: "When studying a language, it is important to keep at it. As part of my daily schedule, I read an English newspaper when I wake up in the morning and a short story before going to bed at night. I enjoy this method because I can learn vocabulary from real-life examples.",
    annotated_words: [
      { word_id: "n2_0605", word_number: 605, kanji: "語学", furigana: "ごがく", meaning_en: "language" },
      { word_id: "n2_0606", word_number: 606, kanji: "短編", furigana: "たんぺん", meaning_en: "short story" },
      { word_id: "n2_0607", word_number: 607, kanji: "長編", furigana: "ちょうへん", meaning_en: "full-length novel" },
      { word_id: "n2_0608", word_number: 608, kanji: "日課", furigana: "にっか", meaning_en: "daily schedule, daily lesson" },
      { word_id: "n2_0609", word_number: 609, kanji: "実例", furigana: "じつれい", meaning_en: "real-life example" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 7 趣味",
    page_story: "105_1",
    japanese_text: "日本では、3月31日は「耳にいい日」で<u>オーケストラ</u>の日だ。この日は、<u>クラシック</u>音楽をより多くの人に楽しんでもらおうと、毎年全国<u>各地</u>でイベントやコンサートが開かれている。",
    english_translation: "In Japan, March 31 is Orchestra Day, or \"Treat Your Ears Day\" (a numerical pun on the date). Every year, on this day, events and concerts are held throughout Japan to encourage more people to enjoy classical music.",
    annotated_words: [
      { word_id: "n2_0610", word_number: 610, kanji: "オーケストラ", furigana: "", meaning_en: "orchestra" },
      { word_id: "n2_0611", word_number: 611, kanji: "クラシック", furigana: "", meaning_en: "classical (music)" },
      { word_id: "n2_0612", word_number: 612, kanji: "各地", furigana: "かくち", meaning_en: "throughout, all over" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 7 趣味",
    page_story: "105_2",
    japanese_text: "昔の<u>書籍</u>は、「木版印刷」という方法で<u>刷られて</u>いた。木の板に文章や絵を<u>彫り</u>、そこに<u>絵の具</u>や墨などを塗って紙をあてるという、スタンプのような方法だ。",
    english_translation: "In the old days, books were printed using a method known as woodblock printing. This is a method in which text or pictures are carved into wooden boards, coated with pigments or ink, then stamped onto paper.",
    annotated_words: [
      { word_id: "n2_0613", word_number: 613, kanji: "書籍", furigana: "しょせき", meaning_en: "books, publications" },
      { word_id: "n2_0614", word_number: 614, kanji: "刷る", furigana: "する", meaning_en: "print" },
      { word_id: "n2_0615", word_number: 615, kanji: "彫る", furigana: "ほる", meaning_en: "carve" },
      { word_id: "n2_0616", word_number: 616, kanji: "絵の具", furigana: "えのぐ", meaning_en: "pigment, paint" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 7 趣味",
    page_story: "106_1",
    japanese_text: "<u>公民館</u>では、<u>将棋</u>教室、<u>手品</u>教室などの講座や、<u>ジャズ</u>コンサートなどさまざまなイベントが開かれている。対象はその地域に住んでいる人に<u>限られる</u>場合もあるので、自分の住んでいる地域のホームページをチェックしてみるといい。",
    english_translation: "All kinds of events are held at community centers, such as shogi classes, magic trick classes, and other classes, jazz concerts, and more. Sometimes they're restricted to people living in the local area, so you should check the website of your local community center.",
    annotated_words: [
      { word_id: "n2_0617", word_number: 617, kanji: "公民館", furigana: "こうみんかん", meaning_en: "community center" },
      { word_id: "n2_0618", word_number: 618, kanji: "将棋", furigana: "しょうぎ", meaning_en: "shogi (a Japanese game similar to chess)" },
      { word_id: "n2_0619", word_number: 619, kanji: "手品", furigana: "てじな", meaning_en: "magic tricks" },
      { word_id: "n2_0620", word_number: 620, kanji: "ジャズ", furigana: "", meaning_en: "jazz" },
      { word_id: "n2_0621", word_number: 621, kanji: "ポップス", furigana: "", meaning_en: "pop music" },
      { word_id: "n2_0622", word_number: 622, kanji: "限る", furigana: "かぎる", meaning_en: "limit, restrict" },
      { word_id: "n2_0623", word_number: 623, kanji: "限定[する]", furigana: "げんてい", meaning_en: "limitation, restrict, limit" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 7 趣味",
    page_story: "106_2",
    japanese_text: "A：このスペースに置けそうな本棚を探しているんだけど、なかなかちょうどいいサイズのがなくて…。\nB：そうなんだ。作ってあげようか。\nA：え、作れるの？\nB：うん、<u>大して</u>難しくないよ。<u>のこぎり</u>と<u>ねじ</u>はあるから、あとで一緒に<u>板</u>を買いに行こうか。",
    english_translation: "A: I'm looking for a bookshelf that will fit this space, but I can't find one the right size... B: Oh, really? I'll make one for you. A: You can make one? B: Yeah, it's not so hard. I have a saw and some screws, and we can go shopping for wooden boards later.",
    annotated_words: [
      { word_id: "n2_0624", word_number: 624, kanji: "大して", furigana: "たいして", meaning_en: "(not so) much, (not) very" },
      { word_id: "n2_0625", word_number: 625, kanji: "のこぎり", furigana: "", meaning_en: "saw" },
      { word_id: "n2_0626", word_number: 626, kanji: "ねじ", furigana: "", meaning_en: "screw" },
      { word_id: "n2_0627", word_number: 627, kanji: "板", furigana: "いた", meaning_en: "board, plank" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 7 趣味",
    page_story: "107_1",
    japanese_text: "この<u>詩</u>は女性の恋心を<u>表現して</u>いる。作者は、先日のインタビューで、自分の体験がもとになっていることや、<u>わざと</u>音が似た単語を並べているという表現の工夫について<u>語った</u>。",
    english_translation: "This poem expresses how a woman feels about a love affair. In a recent interview, the author spoke about how the poem is based on her own experiences and how she intentionally tried to arrange similar-sounding words together.",
    annotated_words: [
      { word_id: "n2_0628", word_number: 628, kanji: "詩", furigana: "し", meaning_en: "poem" },
      { word_id: "n2_0629", word_number: 629, kanji: "詩人", furigana: "しじん", meaning_en: "poet" },
      { word_id: "n2_0630", word_number: 630, kanji: "表現[する]", furigana: "ひょうげん", meaning_en: "expression, express, represent" },
      { word_id: "n2_0631", word_number: 631, kanji: "わざと", furigana: "", meaning_en: "intentionally" },
      { word_id: "n2_0632", word_number: 632, kanji: "語る", furigana: "かたる", meaning_en: "tell, speak about" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 7 趣味",
    page_story: "108_1",
    japanese_text: "この美術館では、約50万点もの<u>コレクション</u>がオンラインで無料で<u>公開されて</u>いる。16世紀に<u>描かれた</u> <u>絵画</u>や、紀元前のギリシャで制作された彫刻など、<u>数々の</u>有名な作品がいつでも楽しめるのは<u>実に</u>素晴らしいことだ。",
    english_translation: "The museum's collection of about 500,000 pieces is available online for free. It's truly wonderful to be able to enjoy numerous masterpieces at any time, including pictures painted in the 16th century and sculptures created in Greece during the BC era.",
    annotated_words: [
      { word_id: "n2_0633", word_number: 633, kanji: "コレクション[する]", furigana: "", meaning_en: "collection, collect" },
      { word_id: "n2_0634", word_number: 634, kanji: "公開[する]", furigana: "こうかい", meaning_en: "opening, make available, make public" },
      { word_id: "n2_0635", word_number: 635, kanji: "描く", furigana: "えがく", meaning_en: "draw, paint" },
      { word_id: "n2_0636", word_number: 636, kanji: "絵画", furigana: "かいが", meaning_en: "painting, picture" },
      { word_id: "n2_0637", word_number: 637, kanji: "数々", furigana: "かずかず", meaning_en: "numerous" },
      { word_id: "n2_0638", word_number: 638, kanji: "実に", furigana: "じつに", meaning_en: "truly, really" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 7 趣味",
    page_story: "108_2",
    japanese_text: "A：うーん、この論文の<u>著者</u>が<u>主張して</u>いるのはこういうことじゃないんじゃないかな。もう一度よく読んでみてください。\nB：あ、はい。\nA：それから、この本、<u>索引</u>もついていて調べやすいので、おすすめです。特に第3<u>章</u>は、Bさんのテーマと関係があるので、読んだ方がいいですよ。",
    english_translation: "A: Hmm, I don't think this is what the author of the paper is claiming. Please read it again more carefully. B: Yes, I will. A: Also, I recommend this book because it has an index, so it's easy to look things up. You should read Chapter 3 in particular, because it's related to your theme.",
    annotated_words: [
      { word_id: "n2_0639", word_number: 639, kanji: "著者", furigana: "ちょしゃ", meaning_en: "author" },
      { word_id: "n2_0640", word_number: 640, kanji: "主張[する]", furigana: "しゅちょう", meaning_en: "claim, assert, argue" },
      { word_id: "n2_0641", word_number: 641, kanji: "索引", furigana: "さくいん", meaning_en: "index" },
      { word_id: "n2_0642", word_number: 642, kanji: "～章", furigana: "しょう", meaning_en: "chapter ~" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 7 趣味",
    page_story: "109_1",
    japanese_text: "A：昨日買ったイヤホン、なんか<u>雑音</u>が聞こえるんだよ。\nB：え、返品したら？\nA：それが、セール品だったから返品<u>不可</u>だったんだ。お気に入りのメーカーだから大丈夫だと思ったんだけど、<u>失望し</u>たよ。",
    english_translation: "A: Those earphones I bought yesterday are making some kind of static noise. B: Well, why don't you return them? A: They were on sale, so it's not possible to return them. I thought they'd be okay because they're from my favorite manufacturer, but I was disappointed.",
    annotated_words: [
      { word_id: "n2_0643", word_number: 643, kanji: "雑音", furigana: "ざつおん", meaning_en: "(unpleasant) noise, static" },
      { word_id: "n2_0644", word_number: 644, kanji: "不可", furigana: "ふか", meaning_en: "not possible, not allowed" },
      { word_id: "n2_0645", word_number: 645, kanji: "可", furigana: "か", meaning_en: "possible, allowed" },
      { word_id: "n2_0646", word_number: 646, kanji: "失望[する]", furigana: "しつぼう", meaning_en: "disappointment, disappoint" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 7 趣味",
    page_story: "110_1",
    japanese_text: "「<u>農業</u>は<u>農家</u>が仕事でやるもの」というイメージを持っている人も多いかもしれないが、最近は、<u>未</u>経験者が畑の一部や道具を借りて、週末に趣味で始めることもよくあるそうだ。<u>種</u>や苗から自分で育てた野菜は<u>一段と</u>おいしく感じられるだろう。",
    english_translation: "Many people have the impression that \"farming is a job that farmers do,\" but these days, inexperienced people often borrow part of a field and some tools and start farming as a weekend hobby. Vegetables you grow yourself from seeds and seedlings definitely taste even better.",
    annotated_words: [
      { word_id: "n2_0647", word_number: 647, kanji: "農業", furigana: "のうぎょう", meaning_en: "farming, agriculture" },
      { word_id: "n2_0648", word_number: 648, kanji: "農家", furigana: "のうか", meaning_en: "farmer" },
      { word_id: "n2_0649", word_number: 649, kanji: "未～", furigana: "み", meaning_en: "not yet, un~, in~" },
      { word_id: "n2_0650", word_number: 650, kanji: "種", furigana: "たね", meaning_en: "seed" },
      { word_id: "n2_0651", word_number: 651, kanji: "一段と", furigana: "いちだんと", meaning_en: "even more, further" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 7 趣味",
    page_story: "110_2",
    japanese_text: "A：この間、何も買っていないのに<u>フリマ</u>アプリにメッセージが来て、<u>妙な</u>と思ったら、私のアカウントが誰かに使われてたんだ。\nB：え、大丈夫？\nA：うん。すぐカスタマーサポートに連絡したから。\nB：よかった。フリマアプリって便利だけど、チケットが高い<u>額</u>で売られていたり、<u>欠陥</u>のある商品が届いたり、問題もあるみたいだね。",
    english_translation: "A: The other day I got a message on a flea market app although I hadn't bought anything. I thought it was strange, but my account was actually being used by someone else. B: Oh, is everything okay? A: Yes. I contacted customer support right away. B: That's good. I guess flea market apps have some problems, like tickets being scalped for large amounts and defective goods being delivered to buyers.",
    annotated_words: [
      { word_id: "n2_0652", word_number: 652, kanji: "フリマ／フリーマーケット", furigana: "", meaning_en: "flea market" },
      { word_id: "n2_0653", word_number: 653, kanji: "妙な", furigana: "みょうな", meaning_en: "strange, odd" },
      { word_id: "n2_0654", word_number: 654, kanji: "額", furigana: "がく", meaning_en: "amount, sum" },
      { word_id: "n2_0655", word_number: 655, kanji: "欠陥", furigana: "けっかん", meaning_en: "defect" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 7 趣味",
    page_story: "111_1",
    japanese_text: "<u>ことわざ</u>には、その<u>言語</u>の文化が表れている。たとえば日本語では、<u>名人</u>でも失敗することもあるという意味で「猿も木から落ちる」と言うが、英語では「ホメロスも居眠りをする」と言う。",
    english_translation: "Proverbs express the culture of a language. For example, in Japanese they say, \"Even monkeys fall from trees,\" meaning that even experts sometimes fail, while in English the expression is \"Even Homer sometimes nods.\"",
    annotated_words: [
      { word_id: "n2_0656", word_number: 656, kanji: "ことわざ", furigana: "", meaning_en: "proverb" },
      { word_id: "n2_0657", word_number: 657, kanji: "言語", furigana: "げんご", meaning_en: "language" },
      { word_id: "n2_0658", word_number: 658, kanji: "名人", furigana: "めいじん", meaning_en: "master, expert" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 7 趣味",
    page_story: "112_1",
    japanese_text: "この博物館にはさまざまな<u>メーカー</u>の<u>望遠鏡</u>が展示されている。屋上では、<u>係員</u>の説明を聞きながら実際に星を見ることができ、子どもから大人まで楽しめる。",
    english_translation: "Telescopes made by various manufacturers are on display at this museum. On the rooftop, children and adults alike can enjoy gazing at the stars while listening to commentary by the staff.",
    annotated_words: [
      { word_id: "n2_0659", word_number: 659, kanji: "メーカー", furigana: "", meaning_en: "manufacturer" },
      { word_id: "n2_0660", word_number: 660, kanji: "望遠鏡", furigana: "ぼうえんきょう", meaning_en: "telescope" },
      { word_id: "n2_0661", word_number: 661, kanji: "係員", furigana: "かかりいん", meaning_en: "staff, attendant" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 7 趣味",
    page_story: "112_2",
    japanese_text: "小学生の頃、授業で、<u>原稿</u>用紙に作文を書き、先生にチェックしてもらった後、<u>清書</u>をして提出することがあった。よく先生から、<u>主語</u>と<u>述語</u>を対応させること、<u>だらだらと</u>長い文を書かないことなどを注意されたが、そういった<u>初歩的な</u>ことが大人になった今も大切だと感じている。",
    english_translation: "When I was in elementary school, we would write an essay on manuscript paper, have it checked by our teacher, and then submit it as a clean copy. Our teacher often cautioned us that the grammatical subject must correspond to the predicate and to avoid writing long, rambling sentences. Even now, as an adult, I feel that such elementary things are important.",
    annotated_words: [
      { word_id: "n2_0662", word_number: 662, kanji: "原稿", furigana: "げんこう", meaning_en: "manuscript" },
      { word_id: "n2_0663", word_number: 663, kanji: "清書[する]", furigana: "せいしょ", meaning_en: "clean copy, make a clean copy" },
      { word_id: "n2_0664", word_number: 664, kanji: "主語", furigana: "しゅご", meaning_en: "(grammatical) subject" },
      { word_id: "n2_0665", word_number: 665, kanji: "述語", furigana: "じゅつご", meaning_en: "(grammatical) predicate" },
      { word_id: "n2_0666", word_number: 666, kanji: "だらだら(と)", furigana: "", meaning_en: "sluggishly, in a rambling way" },
      { word_id: "n2_0667", word_number: 667, kanji: "初歩的な", furigana: "しょほてきな", meaning_en: "elementary, rudimentary" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 7 趣味",
    page_story: "113_1",
    japanese_text: "<u>国宝</u>や重要文化財になっている古い建物を直すための<u>高度な</u>技術を持った<u>大工</u>を、宮大工という。宮大工は「木組み」という技術で、<u>釘</u>を使わずに<u>木材</u>を組み合わせて建物を修理する。この技術は、日本の<u>財産</u>とも言えるだろう。",
    english_translation: "Carpenters with advanced skills who repair old buildings that are considered national treasures or important cultural properties of Japan are called miya-daiku, or \"shrine carpenters.\" Miya-daiku carpenters repair buildings using a technique called kigumi, or \"timber joinery,\" which involves joining timber pieces without using nails. This technique is considered a national asset of Japan.",
    annotated_words: [
      { word_id: "n2_0668", word_number: 668, kanji: "国宝", furigana: "こくほう", meaning_en: "national treasure" },
      { word_id: "n2_0669", word_number: 669, kanji: "高度な", furigana: "こうどな", meaning_en: "advanced" },
      { word_id: "n2_0670", word_number: 670, kanji: "大工", furigana: "だいく", meaning_en: "carpenter" },
      { word_id: "n2_0671", word_number: 671, kanji: "釘", furigana: "くぎ", meaning_en: "nail" },
      { word_id: "n2_0672", word_number: 672, kanji: "木材", furigana: "もくざい", meaning_en: "timber, wood" },
      { word_id: "n2_0673", word_number: 673, kanji: "財産", furigana: "ざいさん", meaning_en: "asset, property" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 7 趣味",
    page_story: "114_1",
    japanese_text: "A：昨日「魔笛」を見たんだけど、<u>感激して</u> <u>思わず</u>「ブラボー！」って叫んじゃった。\nB：「魔笛」って？\nA：モーツァルトが最後に<u>作曲した</u>オペラで、オペラ<u>史</u>に残る名作だよ。最近、オペラ<u>鑑賞</u>が趣味なんだ。\nB：へえ。オペラって、高そう。\nA：いや、25歳以下なら安いから、<u>気軽に</u>見に行けるよ。",
    english_translation: "A: I saw \"The Magic Flute\" yesterday, and I was so moved that I unintentionally shouted out \"Bravo!\". B: What's \"The Magic Flute\"? A: It's the final opera that Mozart composed, and one of the greatest works in the history of opera. Recently, I've been enjoying watching opera. B: Really? Opera seems expensive. A: No, it's not expensive if you're under 25. You can easily go see it.",
    annotated_words: [
      { word_id: "n2_0674", word_number: 674, kanji: "感激[する]", furigana: "かんげき", meaning_en: "deep emotion, be moved" },
      { word_id: "n2_0675", word_number: 675, kanji: "思わず", furigana: "おもわず", meaning_en: "involuntarily, unintentionally" },
      { word_id: "n2_0676", word_number: 676, kanji: "作曲[する]", furigana: "さっきょく", meaning_en: "composition, compose" },
      { word_id: "n2_0677", word_number: 677, kanji: "～史", furigana: "し", meaning_en: "history of ~" },
      { word_id: "n2_0678", word_number: 678, kanji: "鑑賞[する]", furigana: "かんしょう", meaning_en: "viewing, watch" },
      { word_id: "n2_0679", word_number: 679, kanji: "気軽な", furigana: "きがるな", meaning_en: "easy, carefree" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 7 趣味",
    page_story: "115_1",
    japanese_text: "このブログの<u>筆者</u>は、<u>よほど</u>電車が好きらしく、ほぼ毎日電車の写真を撮りに行っている。昨日は青森県の<u>貨物</u>列車の写真がアップされていた。さらに、自分が撮った写真を使ってキーホルダーを<u>作製して</u>いるようだ。",
    english_translation: "The author of this blog seems to love trains so much that she takes photos of them almost every day. Yesterday, she uploaded a photo of a freight train in Aomori. What's more, she apparently also makes key rings using the photos she takes.",
    annotated_words: [
      { word_id: "n2_0680", word_number: 680, kanji: "筆者", furigana: "ひっしゃ", meaning_en: "author" },
      { word_id: "n2_0681", word_number: 681, kanji: "よほど", furigana: "", meaning_en: "so much, greatly" },
      { word_id: "n2_0682", word_number: 682, kanji: "貨物", furigana: "かもつ", meaning_en: "freight" },
      { word_id: "n2_0683", word_number: 683, kanji: "作製[する]", furigana: "さくせい", meaning_en: "creation, make" }
    ]
  }
];

topic7Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 7 story ${story.story_number}: ${story.page_story}.json`);
});
