import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 20 Stories (Manners) - Part 2
const topic20StoriesPart2 = [
  {
    is_story: true,
    story_number: 9,
    title: "Topic 20 マナー",
    page_story: "284_1",
    japanese_text: "A：クラブってどうやって楽しむの？\nB：お酒を飲みながら、どんどんナンパすればいいんだよ！\nA：ええ、そんなことしたら<u>追い出され</u>そう。\nB：そんなこと<u>恐れないで</u>！あ、クラブのルールに<u>反しない</u>程度にね。クラブで出会ったカップルは長続きするって噂もあるよ。\nA：そんな<u>迷信</u>、聞いたことないよ。",
    english_translation: "A: So how do you enjoy yourself at the club? B: You have a few drinks, try to pick up girls, that sort of thing! A: Yeah, I'd get kicked out if I did that. B: Don't be afraid of that! Just don't break the club's rules. They say that couples who meet at clubs tend to stay together longer. A: I've never heard that superstition.",
    annotated_words: [
      { word_id: "n2_1973", word_number: 1973, kanji: "追い出す", furigana: "おいだす", meaning_en: "kick out, force out" },
      { word_id: "n2_1974", word_number: 1974, kanji: "恐れる", furigana: "おそれる", meaning_en: "be afraid" },
      { word_id: "n2_1975", word_number: 1975, kanji: "恐れ", furigana: "おそれ", meaning_en: "fear, concern" },
      { word_id: "n2_1976", word_number: 1976, kanji: "反する", furigana: "はんする", meaning_en: "break, go against" },
      { word_id: "n2_1977", word_number: 1977, kanji: "迷信", furigana: "めいしん", meaning_en: "superstition" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 20 マナー",
    page_story: "284_2",
    japanese_text: "我が家の庭と、山本さんの庭の<u>境界</u>は<u>あいまいだ</u>。先日、うちの庭の<u>端</u>に、山本さんの家の柿の木がはみ出していた。私は<u>ラッキーだ</u>と思って、柿を1つ取った。そうしたら、それは法律違反だと山本さんに叱られた。",
    english_translation: "The boundary between our yard and Mr. Yamamoto's yard is not clear. The other day, a persimmon tree from his yard was overhanging the edge of our yard. I thought I'd gotten lucky and picked one of the persimmons. When I did, Mr. Yamamoto yelled at me for breaking the law.",
    annotated_words: [
      { word_id: "n2_1978", word_number: 1978, kanji: "境界", furigana: "きょうかい", meaning_en: "boundary" },
      { word_id: "n2_1979", word_number: 1979, kanji: "あいまいな", furigana: "あいまいな", meaning_en: "ambiguous, not clear" },
      { word_id: "n2_1980", word_number: 1980, kanji: "端", furigana: "はし", meaning_en: "edge" },
      { word_id: "n2_1981", word_number: 1981, kanji: "ラッキーな", furigana: "らっきーな", meaning_en: "lucky" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 20 マナー",
    page_story: "285_1",
    japanese_text: "電車では、リュックは体の前にぴったり<u>くっつけて</u>持つのがマナーだ。しかし、先日満員電車に乗っていたら、学生が大きなリュックを<u>背負った</u>まま、私と前の人の<u>隙間</u>に<u>乗り込んできた</u>。",
    english_translation: "On a train, you should hold your backpack by attaching it to the front of your body. However, the other day on a crowded train, a student carrying a large backpack on his back boarded into the gap between me and the person in front of me.",
    annotated_words: [
      { word_id: "n2_1982", word_number: 1982, kanji: "くっつける", furigana: "", meaning_en: "attach, stick" },
      { word_id: "n2_1983", word_number: 1983, kanji: "くっつく", furigana: "", meaning_en: "be attached" },
      { word_id: "n2_1984", word_number: 1984, kanji: "背負う", furigana: "せおう", meaning_en: "carry on one's back" },
      { word_id: "n2_1985", word_number: 1985, kanji: "隙間", furigana: "すきま", meaning_en: "gap, opening" },
      { word_id: "n2_1986", word_number: 1986, kanji: "乗り込む", furigana: "のりこむ", meaning_en: "board, get on" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 20 マナー",
    page_story: "286_1",
    japanese_text: "リュックが何度もぶつかるのでその学生を<u>にらんだ</u>が、<u>無視された</u>ので、余計に<u>むかむか</u>した。",
    english_translation: "I glared at the student as his backpack kept bumping into me, but he ignored me, which was frustrating.",
    annotated_words: [
      { word_id: "n2_1987", word_number: 1987, kanji: "にらむ", furigana: "", meaning_en: "glare" },
      { word_id: "n2_1988", word_number: 1988, kanji: "無視[する]", furigana: "むし", meaning_en: "disregard, ignore" },
      { word_id: "n2_1989", word_number: 1989, kanji: "むかむか", furigana: "", meaning_en: "frustratedly, in an offended manner" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 20 マナー",
    page_story: "286_2",
    japanese_text: "夏休みの課題について説明します。日本社会で<u>異文化</u>理解を進めるために、どのような点について人々が<u>意識</u>を高めるべきか、<u>おのおの</u>考えて2000字以内でまとめてください。その際に、日本社会が<u>抱えている</u>問題にも触れてくださいね。参考文献を<u>示す</u>ことも忘れずに。",
    english_translation: "I'll explain your summer vacation assignment. In order to promote cross-cultural understanding in Japanese society, each of you should think about aspects that people need to be more conscious of and summarize these in 2000 words or less. In doing so, please mention some problems that Japanese society has. Don't forget to indicate your references.",
    annotated_words: [
      { word_id: "n2_1990", word_number: 1990, kanji: "異文化", furigana: "いぶんか", meaning_en: "different cultures" },
      { word_id: "n2_1991", word_number: 1991, kanji: "異文化交流[する]", furigana: "いぶんかこうりゅう", meaning_en: "cross-cultural exchange, interact cross-culturally" },
      { word_id: "n2_1992", word_number: 1992, kanji: "意識[する]", furigana: "いしき", meaning_en: "awareness, be conscious of" },
      { word_id: "n2_1993", word_number: 1993, kanji: "おのおの", furigana: "", meaning_en: "each, each of you" },
      { word_id: "n2_1994", word_number: 1994, kanji: "抱える", furigana: "かかえる", meaning_en: "hold, have" },
      { word_id: "n2_1995", word_number: 1995, kanji: "示す", furigana: "しめす", meaning_en: "indicate" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 20 マナー",
    page_story: "287_1",
    japanese_text: "A：昨日<u>終電</u>に乗ろうとしたら、駅のホームでたばこを吸いながら、その<u>灰</u>を線路に捨てている酔っ払いがいたんだよ。\nB：それは確実に<u>アウト</u>だね。火事にもなりかねないし。\nA：しかも1人だけじゃなくて、<u>複数</u>人いたの。あんな人間にはなりたくないよ。",
    english_translation: "A: Yesterday, as I was about to catch the last train, I saw some drunken guy on the station platform smoking a cigarette and flicking ash onto the tracks. B: That's definitely out of line. He could have started a fire. A: And it wasn't just one guy, there were several. I'd never want to be that sort of person.",
    annotated_words: [
      { word_id: "n2_1996", word_number: 1996, kanji: "終電／最終電車", furigana: "しゅうでん／さいしゅうでんしゃ", meaning_en: "last train" },
      { word_id: "n2_1997", word_number: 1997, kanji: "始発", furigana: "しはつ", meaning_en: "first train" },
      { word_id: "n2_1998", word_number: 1998, kanji: "灰", furigana: "はい", meaning_en: "ash" },
      { word_id: "n2_1999", word_number: 1999, kanji: "灰色", furigana: "はいいろ", meaning_en: "gray" },
      { word_id: "n2_2000", word_number: 2000, kanji: "アウト", furigana: "あうと", meaning_en: "out of line, unacceptable" },
      { word_id: "n2_2001", word_number: 2001, kanji: "複数", furigana: "ふくすう", meaning_en: "multiple, several" },
      { word_id: "n2_2002", word_number: 2002, kanji: "単数", furigana: "たんすう", meaning_en: "single" }
    ]
  }
];

topic20StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 20 story ${story.story_number}: ${story.page_story}.json`);
});
