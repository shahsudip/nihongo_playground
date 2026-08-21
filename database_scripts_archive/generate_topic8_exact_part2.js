import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 8 Stories (Social Life) - Part 2
const topic8Stories = [
  {
    is_story: true,
    story_number: 9,
    title: "Topic 8 人付き合い",
    page_story: "122_1",
    japanese_text: "田中さんと初めて話したときは、なんだか<u>怪しい</u>人だと思って警戒してしまった。しかし、時間をかけて話すにつれて、田中さんは<u>朗らかで</u>、<u>信頼できる</u> <u>人物</u>だということが分かった。",
    english_translation: "When I first spoke with Tanaka, I was wary because I found him somehow suspicious. However, as we spent more time talking, I came to realize that Tanaka was a cheerful, trustworthy person.",
    annotated_words: [
      { word_id: "n2_0723", word_number: 723, kanji: "怪しい", furigana: "あやしい", meaning_en: "suspicious, uncertain" },
      { word_id: "n2_0724", word_number: 724, kanji: "朗らかな", furigana: "ほがらかな", meaning_en: "cheerful, positive" },
      { word_id: "n2_0725", word_number: 725, kanji: "信頼[する]", furigana: "しんらい", meaning_en: "trust, trust" },
      { word_id: "n2_0726", word_number: 726, kanji: "人物", furigana: "じんぶつ", meaning_en: "person" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 8 人付き合い",
    page_story: "122_2",
    japanese_text: "A：10歳差の結婚ってどう思う？<u>価値観</u>のずれが心配で…。\nB：うーん。私は、<u>親類</u>に12歳差の<u>夫妻</u>がいるから<u>別に</u>違和感ないよ。<u>中年</u>になった今でも、二人と犬一匹で仲良く暮らしてるみたい。",
    english_translation: "A: What do you think about a marriage with a 10-year age gap? I'm worried about having different values... B: Hmmm. I'm related to a couple with a 12-year age gap, but it doesn't feel particularly weird. Even now, in middle age, they seem to get along fine with each other and their dog.",
    annotated_words: [
      { word_id: "n2_0727", word_number: 727, kanji: "価値観", furigana: "かちかん", meaning_en: "sense of values" },
      { word_id: "n2_0728", word_number: 728, kanji: "価値", furigana: "かち", meaning_en: "value" },
      { word_id: "n2_0729", word_number: 729, kanji: "親類", furigana: "しんるい", meaning_en: "relative (family)" },
      { word_id: "n2_0730", word_number: 730, kanji: "夫妻", furigana: "ふさい", meaning_en: "husband and wife, couple" },
      { word_id: "n2_0731", word_number: 731, kanji: "別に", furigana: "べつに", meaning_en: "particularly" },
      { word_id: "n2_0732", word_number: 732, kanji: "中年", furigana: "ちゅうねん", meaning_en: "middle age" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 8 人付き合い",
    page_story: "123_2",
    japanese_text: "A：あした、いよいよ<u>オーディション</u>なんだ。\nB：そっか。Aさんはもうプロの声優みたいに上手だから、きっと大丈夫だよ。\nA：みんなそう言ってくれるけど、<u>お世辞</u>かなって思っちゃうんだよね。\nB：そんなことないよ！ Aさんの声は、みんなに元気を<u>与える</u>声だよ。そんなに<u>謙遜しないで</u>よ。",
    english_translation: "A: Finally, I have my audition tomorrow. B: Really? You're already as good as any professional voice actor, so I'm sure you'll do fine. A: Well, everyone says so, but they're probably just flattering me. B: That's not true! Your voice brings everyone happiness. Don't be so modest.",
    annotated_words: [
      { word_id: "n2_0733", word_number: 733, kanji: "オーディション", furigana: "", meaning_en: "audition" },
      { word_id: "n2_0734", word_number: 734, kanji: "お世辞", furigana: "おせじ", meaning_en: "flattery" },
      { word_id: "n2_0735", word_number: 735, kanji: "与える", furigana: "あたえる", meaning_en: "give, impart, bring" },
      { word_id: "n2_0736", word_number: 736, kanji: "謙遜[する]", furigana: "けんそん", meaning_en: "humility, be modest" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 8 人付き合い",
    page_story: "124_1",
    japanese_text: "父は、<u>見かけ</u>は優しそうだが、<u>無口で</u>厳しい人だ。だが、私が大学に入学して一人暮らしを始めると、毎月8万も<u>送金して</u>くれた。社会人になったら、この<u>恩</u>を返すために<u>親孝行しよう</u>と思う。",
    english_translation: "My father may seem like a kind person, but he is quite strict, a man of few words. However, when I went to university and started living by myself, he sent me 80,000 yen every month. When I enter the workforce, I plan to repay this debt of gratitude by being a dutiful child.",
    annotated_words: [
      { word_id: "n2_0737", word_number: 737, kanji: "見かけ", furigana: "みかけ", meaning_en: "appearance, seeming" },
      { word_id: "n2_0738", word_number: 738, kanji: "無口な", furigana: "むくちな", meaning_en: "silent, of few words" },
      { word_id: "n2_0739", word_number: 739, kanji: "送金[する]", furigana: "そうきん", meaning_en: "remittance, send money" },
      { word_id: "n2_0740", word_number: 740, kanji: "恩", furigana: "おん", meaning_en: "debt of gratitude, obligation" },
      { word_id: "n2_0741", word_number: 741, kanji: "恩人", furigana: "おんじん", meaning_en: "benefactor, person to whom some debt is owed" },
      { word_id: "n2_0742", word_number: 742, kanji: "親孝行[する]", furigana: "おやこうこう", meaning_en: "devotion to one's parents, be a dutiful child" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 8 人付き合い",
    page_story: "124_2",
    japanese_text: "A：木村さんをこれ以上デートに誘わない方がいいよって友達から<u>忠告された</u>んだけど、これが最後だと思って、映画のチケットを<u>口実に</u>デートに誘ったんだ。\nB：うん。どうだった？\nA：「もう私に関わらないで」って言われちゃった。しかも、そのとき<u>結構な</u>スピードで飛んできたボールが頭に当たって…。\nB：それは、<u>二重に</u><u>災難</u>だったね。",
    english_translation: "A: My friend warned me not to ask Kimura on any more dates, but I thought I'd try one last time, so I used movie tickets as an excuse to ask her out. B: Okay. How did it go? A: She said she didn't want anything more to do with me. And then a ball flew at me, traveling quite fast, and hit me on the head... B: So it was a double disaster.",
    annotated_words: [
      { word_id: "n2_0743", word_number: 743, kanji: "忠告[する]", furigana: "ちゅうこく", meaning_en: "warning, caution" },
      { word_id: "n2_0744", word_number: 744, kanji: "口実", furigana: "こうじつ", meaning_en: "excuse, pretence" },
      { word_id: "n2_0745", word_number: 745, kanji: "結構な", furigana: "けっこうな", meaning_en: "quite, considerable" },
      { word_id: "n2_0746", word_number: 746, kanji: "二重", furigana: "にじゅう", meaning_en: "double, duplicate" },
      { word_id: "n2_0747", word_number: 747, kanji: "災難", furigana: "さいなん", meaning_en: "disaster" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 8 人付き合い",
    page_story: "125_2",
    japanese_text: "先日、高校の同窓会があった。私は<u>急用</u>ができてしまったため、二次会から<u>合流した</u>。私が<u>顔を出す</u>頃には、みんな酔っ払っていた。",
    english_translation: "I went to my high school reunion other day. I had to attend to an urgent matter first, so I met up with everyone at the second venue. By the time I showed up, everyone was drunk.",
    annotated_words: [
      { word_id: "n2_0748", word_number: 748, kanji: "急用", furigana: "きゅうよう", meaning_en: "urgent matter" },
      { word_id: "n2_0749", word_number: 749, kanji: "合流[する]", furigana: "ごうりゅう", meaning_en: "meet up, join, merge" },
      { word_id: "n2_0750", word_number: 750, kanji: "顔を出す", furigana: "かおをだす", meaning_en: "show one's face, show up" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 8 人付き合い",
    page_story: "126_1",
    japanese_text: "高校の同窓会では、先生からの<u>ありがたい</u>お言葉も聞いた。私の先生は、常に先生に対して<u>敬意</u>を示さないとすぐ機嫌が悪くなるような、<u>頭が固い</u>人だった。先生のことはあまり好きではなかったが、クラスの友達は、さまざまな業界で<u>活躍している</u>自慢できる人ばかりだ。",
    english_translation: "At the high school reunion, my teacher said some things I was grateful to hear. He was always a hard-headed guy who would fly into a temper if someone failed to show him respect. I didn't like my teacher much, but I'm proud that all my classmates are so active in their respective occupations.",
    annotated_words: [
      { word_id: "n2_0751", word_number: 751, kanji: "ありがたい", furigana: "", meaning_en: "grateful, welcome" },
      { word_id: "n2_0752", word_number: 752, kanji: "敬意", furigana: "けいい", meaning_en: "respect" },
      { word_id: "n2_0753", word_number: 753, kanji: "頭が固い", furigana: "あたまがかたい", meaning_en: "hard-headed, obstinate" },
      { word_id: "n2_0754", word_number: 754, kanji: "活躍[する]", furigana: "かつやく", meaning_en: "action, activity, be active" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 8 人付き合い",
    page_story: "126_2",
    japanese_text: "高校の友達には<u>愉快な</u>やつが多く、当時<u>傷つけたり</u>、<u>傷つけられたり</u>した思い出のあるやつもいた。私が好きだった子は、すでに結婚して<u>名字</u>が変わっていた。",
    english_translation: "Most of my friends from high school are cheerful, likeable guys, and were telling stories about how they hurt people or were hurt back in the day. The girl I used to like was already married and had changed her last name.",
    annotated_words: [
      { word_id: "n2_0755", word_number: 755, kanji: "愉快な", furigana: "ゆかいな", meaning_en: "cheerful, likeable" },
      { word_id: "n2_0756", word_number: 756, kanji: "傷つける", furigana: "きつける", meaning_en: "injure, hurt" },
      { word_id: "n2_0757", word_number: 757, kanji: "傷つく", furigana: "きずつく", meaning_en: "be injured, be hurt" },
      { word_id: "n2_0758", word_number: 758, kanji: "名字", furigana: "みょうじ", meaning_en: "family name, last name" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 8 人付き合い",
    page_story: "127_1",
    japanese_text: "アメリカの友達に、現地のお菓子を日本へ<u>郵送して</u>くれないかと<u>依頼した</u>。しかし、2週間経っても届かない。友達に<u>催促し</u>てみたところ、しっかり2週間前に送ったが、荷物の<u>行方</u>は分からないらしい。1週間後に<u>再度</u>確認したところ、航空便ではなく、誤って<u>船便で</u>送ってしまっていたそうだ。",
    english_translation: "I asked my friend in the US to mail some American snacks to Japan. However, it took two weeks for the package to arrive. When I reminded her about the package, she said she'd sent it two weeks previously but she didn't know where it was. And when she checked once more a week later, she discovered that she'd sent it by sea mail instead of by air mail by mistake.",
    annotated_words: [
      { word_id: "n2_0759", word_number: 759, kanji: "郵送[する]", furigana: "ゆうそう", meaning_en: "mail, send by mail" },
      { word_id: "n2_0760", word_number: 760, kanji: "依頼[する]", furigana: "いらい", meaning_en: "request, ask" },
      { word_id: "n2_0761", word_number: 761, kanji: "催促[する]", furigana: "さいそく", meaning_en: "reminder, urge" },
      { word_id: "n2_0762", word_number: 762, kanji: "行方", furigana: "ゆくえ", meaning_en: "whereabouts, where something is" },
      { word_id: "n2_0763", word_number: 763, kanji: "再度", furigana: "さいど", meaning_en: "again, once more" },
      { word_id: "n2_0764", word_number: 764, kanji: "船便", furigana: "ふなびん", meaning_en: "sea mail" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 8 人付き合い",
    page_story: "128_1",
    japanese_text: "アメリカから荷物が届いた。私の友達は<u>せっかちだが</u> <u>気が利く</u>ので、頼んだお菓子以外にも、おいしそうなものを詰めてくれていた。私はお礼にその友達に<u>宛てて</u> <u>便り</u>を書いた。なぜチャットでメッセージを送らないかというと、その友達は日本の<u>消印</u> <u>マニア</u>で、いつも手紙を<u>よこして</u>くれと言うからだ。",
    english_translation: "My package arrived from America. My friend can be irritable, but she's thoughtful too, and she'd packed some other delicious-looking things in addition to the candy I'd asked for. I wrote a letter to my friend to thank her. I didn't send her a message via chat because she's crazy about Japanese postmarks and always asks me to send her letters.",
    annotated_words: [
      { word_id: "n2_0765", word_number: 765, kanji: "せっかちな", furigana: "", meaning_en: "hasty, irritable" },
      { word_id: "n2_0766", word_number: 766, kanji: "気が利く", furigana: "きがきく", meaning_en: "thoughtful" },
      { word_id: "n2_0767", word_number: 767, kanji: "宛てる", furigana: "あてる", meaning_en: "address to someone (mail)" },
      { word_id: "n2_0768", word_number: 768, kanji: "便り", furigana: "たより", meaning_en: "letter" },
      { word_id: "n2_0769", word_number: 769, kanji: "消印", furigana: "けしいん", meaning_en: "postmark" },
      { word_id: "n2_0770", word_number: 770, kanji: "マニア", furigana: "", meaning_en: "passion, enthusiasm, crazy about" },
      { word_id: "n2_0771", word_number: 771, kanji: "よこす", furigana: "", meaning_en: "send" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 8 人付き合い",
    page_story: "129_1",
    japanese_text: "A：はい、営業部です。\nB：もしもし、経理部の田中です。山田さんはいらっしゃいますか。\nA：あ、すみません。私昨日営業部に入ったばかりの<u>者</u>で…。山田さんを<u>存じ上げない</u>ので、確認してまいります。\nB：もしいらっしゃったら、<u>厚かましい</u>お願いで<u>恐縮</u>なのですが、今1階でやっている経理部の会議に来ていただきたいと伝えてください。",
    english_translation: "A: Yes, this is the Sales department. B: Hello, this is Tanaka from Accounting. Is Mr. Yamada there? A: Oh, I'm sorry. I'm the one who just joined the Sales department yesterday. I don't know Mr. Yamada, but I'll go check. B: If he is there, tell him I'm sorry to be so presumptuous, but I'd like him to come to the Accounting department meeting, which is being held right now on the first floor.",
    annotated_words: [
      { word_id: "n2_0772", word_number: 772, kanji: "者", furigana: "もの", meaning_en: "one, person" },
      { word_id: "n2_0773", word_number: 773, kanji: "存じ上げる", furigana: "ぞんじあげる", meaning_en: "know, think, presume [honorific form of 知っている]" },
      { word_id: "n2_0774", word_number: 774, kanji: "厚かましい", furigana: "あつかましい", meaning_en: "presumptuous, pushy" },
      { word_id: "n2_0775", word_number: 775, kanji: "恐縮[する]", furigana: "きょうしゅく", meaning_en: "feeling of obligation, be sorry" }
    ]
  }
];

topic8Stories.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 8 story ${story.story_number}: ${story.page_story}.json`);
});
