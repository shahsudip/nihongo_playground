import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 20 Stories (Manners) - Part 3
const topic20StoriesPart3 = [
  {
    is_story: true,
    story_number: 15,
    title: "Topic 20 マナー",
    page_story: "288_1",
    japanese_text: "A：昨日、居酒屋に行ったんだけど、隣の客がずっと大きい声で<u>独り言</u>を言ってたんだ。\nB：へえ。\nA：それで、急に<u>怒鳴り</u>ながら<u>暴れ</u>はじめて、ついには店員を<u>殴っ</u>ちゃってさ。\nB：あらら…<u>公共</u>の場でやめてほしいね。\nA：うん。私、<u>正義</u>感が強いから、思わず止めに入りそうだったよ。",
    english_translation: "A: Yesterday, I went to an izakaya and the guy next to me was talking to himself loudly the whole time. B: Oh, really? A: Then suddenly he started yelling and getting violent, and finally he hit a waiter. B: Oh wow ... I wish people wouldn't do that in public. A: Yeah. I have a strong sense of justice, so without thinking, I was about to stop him.",
    annotated_words: [
      { word_id: "n2_2003", word_number: 2003, kanji: "独り言", furigana: "ひとりごと", meaning_en: "talking to oneself" },
      { word_id: "n2_2004", word_number: 2004, kanji: "怒鳴る", furigana: "どなる", meaning_en: "yell, shout" },
      { word_id: "n2_2005", word_number: 2005, kanji: "暴れる", furigana: "あばれる", meaning_en: "get violent" },
      { word_id: "n2_2006", word_number: 2006, kanji: "殴る", furigana: "なぐる", meaning_en: "strike, hit" },
      { word_id: "n2_2007", word_number: 2007, kanji: "公共", furigana: "こうきょう", meaning_en: "public" },
      { word_id: "n2_2008", word_number: 2008, kanji: "公共料金", furigana: "こうきょうりょうきん", meaning_en: "public utility fees" },
      { word_id: "n2_2009", word_number: 2009, kanji: "正義", furigana: "せいぎ", meaning_en: "justice" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 20 マナー",
    page_story: "289_1",
    japanese_text: "A：さっき、電車の<u>通路</u>の真ん中に座って、<u>やかましい</u>声で話し続ける人たちがいたんだよ。\nB：<u>品</u>がない人たちだね。\nA：うん。そうしたら、<u>車掌</u>さんが周りの乗客に<u>害</u>があると判断したからか、注意しに来てくれたんだよね。それで、うるさい人たちが降りた後、車掌さんが周りの乗客に<u>お詫びしてた</u>。大変な仕事だよね。",
    english_translation: "A: Just before, some people were sitting in the middle of the train aisle and talking loudly. B: Not very classy. A: No. Then the conductor came to warn them, probably because he thought they were being a nuisance to the other passengers. After the noisy people got off, the conductor apologized to the surrounding passengers. It's a tough job, isn't it?",
    annotated_words: [
      { word_id: "n2_2010", word_number: 2010, kanji: "通路", furigana: "つうろ", meaning_en: "aisle, corridor" },
      { word_id: "n2_2011", word_number: 2011, kanji: "やかましい", furigana: "", meaning_en: "loud, noisy" },
      { word_id: "n2_2012", word_number: 2012, kanji: "品", furigana: "ひん", meaning_en: "class, quality" },
      { word_id: "n2_2013", word_number: 2013, kanji: "車掌", furigana: "しゃしょう", meaning_en: "conductor" },
      { word_id: "n2_2014", word_number: 2014, kanji: "害", furigana: "がい", meaning_en: "harm, nuisance" },
      { word_id: "n2_2015", word_number: 2015, kanji: "お詫び[する]", furigana: "おわび", meaning_en: "apology, make an apology" },
      { word_id: "n2_2016", word_number: 2016, kanji: "詫びる", furigana: "わびる", meaning_en: "apologize" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 20 マナー",
    page_story: "290_1",
    japanese_text: "今朝、地震の影響で東京駅－新橋駅の<u>区間</u>で電車が突然止まった。このような<u>状況</u>で、車内<u>アナウンス</u>を聞くことは大切である。しかし、<u>乗客</u>の中に大きい<u>ボリューム</u>で話し続ける人たちがいたので、アナウンスが<u>聞き取れなかった</u>。<u>せめて</u>、もう少し小さい声で話してほしかった。",
    english_translation: "This morning, due to an earthquake, trains suddenly stopped on the section between Tokyo Station and Shinbashi Station. In such circumstances, it's important to listen to the train announcements. But I couldn't hear the announcements because some other passengers were talking at a high volume. At the very least, I would have liked them to speak a little more quietly.",
    annotated_words: [
      { word_id: "n2_2017", word_number: 2017, kanji: "区間", furigana: "くかん", meaning_en: "section" },
      { word_id: "n2_2018", word_number: 2018, kanji: "状況", furigana: "じょうきょう", meaning_en: "situation, circumstances" },
      { word_id: "n2_2019", word_number: 2019, kanji: "アナウンス[する]", furigana: "あなうんす", meaning_en: "announcement, announce" },
      { word_id: "n2_2020", word_number: 2020, kanji: "アナウンサー", furigana: "あなうんさー", meaning_en: "announcer" },
      { word_id: "n2_2021", word_number: 2021, kanji: "乗客", furigana: "じょうきゃく", meaning_en: "passenger" },
      { word_id: "n2_2022", word_number: 2022, kanji: "ボリューム", furigana: "ぼりゅーむ", meaning_en: "volume" },
      { word_id: "n2_2023", word_number: 2023, kanji: "聞き取る", furigana: "ききとる", meaning_en: "hear, pick up" },
      { word_id: "n2_2024", word_number: 2024, kanji: "せめて", furigana: "", meaning_en: "at least, at the very least" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 20 マナー",
    page_story: "291_1",
    japanese_text: "A：田中先生へのプレゼントに手紙を<u>添えたい</u>んだ。どんな相談に対しても<u>的確な</u>アドバイスをしてくださる、みんなから<u>敬われていた</u>先生で…。\nB：いい先生なんだね。\nA：うん。あ、先生への手紙に「田中<u>殿</u>」って書いてもいいのかな。\nB：ううん、先生に対して「殿」は使わないよ。",
    english_translation: "A: I want to attach a letter to my present for Mr. Tanaka. He was respected by everyone and always gave such sound advice ... B: He's a great teacher, isn't he? A: Yes. I wonder if I should address him as \"Tanaka-dono\" in my letter. B: No, dono isn't used for teachers.",
    annotated_words: [
      { word_id: "n2_2025", word_number: 2025, kanji: "添える", furigana: "そえる", meaning_en: "attach, append" },
      { word_id: "n2_2026", word_number: 2026, kanji: "的確な", furigana: "てきかくな", meaning_en: "appropriate, sound" },
      { word_id: "n2_2027", word_number: 2027, kanji: "敬う", furigana: "うやまう", meaning_en: "respect" },
      { word_id: "n2_2028", word_number: 2028, kanji: "～殿", furigana: "どの", meaning_en: "~dono [honorific suffix for names, often used for business or personal correspondence]" }
    ]
  }
];

topic20StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 20 story ${story.story_number}: ${story.page_story}.json`);
});
