import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 16 Stories (School) - Part 3
const topic16StoriesPart3 = [
  {
    is_story: true,
    story_number: 13,
    title: "Topic 16 学校",
    page_story: "222_1",
    japanese_text: "<u>新入生</u>のみなさんは<u>正門</u>に集まってください。これからキャンパス内を案内します。黄色いジャンパーを着ているスタッフを<u>先頭</u>にして、<u>名簿</u>の順番に並んでください。では、キャンパスの地図を<u>配布します</u>。",
    english_translation: "All new students, please gather at the main gate. We will now conduct a tour of the campus. Please line up in the order listed on the roll, with the staff member wearing the yellow jacket in the lead. We will now hand out campus maps.",
    annotated_words: [
      { word_id: "n2_1490", word_number: 1490, kanji: "新入生", furigana: "しんにゅうせい", meaning_en: "new student" },
      { word_id: "n2_1491", word_number: 1491, kanji: "正門", furigana: "せいもん", meaning_en: "main (front) gate" },
      { word_id: "n2_1492", word_number: 1492, kanji: "先頭", furigana: "せんとう", meaning_en: "front, lead" },
      { word_id: "n2_1493", word_number: 1493, kanji: "名簿", furigana: "めいぼ", meaning_en: "roll, list of names" },
      { word_id: "n2_1494", word_number: 1494, kanji: "配布[する]", furigana: "はいふ", meaning_en: "distribution, hand out" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 16 学校",
    page_story: "222_2",
    japanese_text: "母は看護師になるため、私を産んでから大学へ通っていた。育児と勉学の<u>両立</u>は大変で、<u>落第したり</u>、体を壊して<u>休学したり</u>したこともあったようだ。そんな母も今では立派な看護師だ。母は、「あの頃を<u>振り返る</u>と、<u>回り道</u>もしたけど大学に行って本当によかった。でもあの<u>地獄</u>のような日々には戻りたくない。」と言っている。",
    english_translation: "After I was born, my mother went to college to become a nurse. It was difficult for her to balance childcare and studies, and she flunked some classes and took time off from school due to health problems. But now she's a fantastic nurse. She says, \"Looking back, I'm really glad I went to college, even though I took some detours. But I wouldn't want to go back to those hellish days.\"",
    annotated_words: [
      { word_id: "n2_1495", word_number: 1495, kanji: "両立[する]", furigana: "りょうりつ", meaning_en: "balance, balance" },
      { word_id: "n2_1496", word_number: 1496, kanji: "落第[する]", furigana: "らくだい", meaning_en: "failure, flunk" },
      { word_id: "n2_1497", word_number: 1497, kanji: "休学[する]", furigana: "きゅうがく", meaning_en: "leave of absence, take time off from school" },
      { word_id: "n2_1498", word_number: 1498, kanji: "振り返る", furigana: "ふりかえる", meaning_en: "look back" },
      { word_id: "n2_1499", word_number: 1499, kanji: "回り道[する]", furigana: "まわりみち", meaning_en: "detour, take the long way around" },
      { word_id: "n2_1500", word_number: 1500, kanji: "地獄", furigana: "じごく", meaning_en: "hell" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 16 学校",
    page_story: "223_2",
    japanese_text: "高校のとき、とても怖い先生がいて、<u>同い年</u>の友達と陰で<u>鬼</u>という<u>あだ名</u>をつけて呼んでいた。",
    english_translation: "When I was in high school, I had a very scary teacher. Behind his back, I and my friends in the same year called him Oni as a nickname.",
    annotated_words: [
      { word_id: "n2_1502", word_number: 1502, kanji: "同い年", furigana: "おないどし", meaning_en: "same age, same year" },
      { word_id: "n2_1503", word_number: 1503, kanji: "鬼", furigana: "おに", meaning_en: "oni (Japanese ogre)" },
      { word_id: "n2_1504", word_number: 1504, kanji: "あだ名", furigana: "あだな", meaning_en: "nickname" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 16 学校",
    page_story: "224_1",
    japanese_text: "小学校の頃、<u>人影</u>のない夜の学校に行くと<u>笛</u>やピアノの音が聞こえるとか、何も押していないのにブザーが鳴る、人形が<u>ひとりでに</u>歩き出すなど、お化けに関する話がいくつもあった。今考えると<u>ばかばかしい</u>が、今でも一人で夜の学校に行くのは嫌だ。",
    english_translation: "When I was in elementary school, I heard so many stories about ghosts—about hearing a whistle or piano at school at night when there were not a single person around, buzzers sounding even though nothing had been pressed, dolls walking around of their own accord, and so on. It's ridiculous when I think about it, but I still don't like going near schools at night by myself.",
    annotated_words: [
      { word_id: "n2_1505", word_number: 1505, kanji: "人影", furigana: "ひとかげ", meaning_en: "person, figure" },
      { word_id: "n2_1507", word_number: 1507, kanji: "笛", furigana: "ふえ", meaning_en: "whistle, flute" },
      { word_id: "n2_1508", word_number: 1508, kanji: "ひとりでに", furigana: "", meaning_en: "spontaneously, of its own accord" },
      { word_id: "n2_1509", word_number: 1509, kanji: "ばかばかしい", furigana: "", meaning_en: "absurd, ridiculous" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 16 学校",
    page_story: "224_2",
    japanese_text: "<u>志望校</u>の<u>願書</u>は<u>明後日</u>が提出締め切りだ。それ<u>以降</u>は受け取ってもらえないので、忘れないようにしよう。",
    english_translation: "The deadline for submitting the application form for your preferred school is the day after tomorrow. After that, it won't be accepted, so don't forget to do it.",
    annotated_words: [
      { word_id: "n2_1512", word_number: 1512, kanji: "志望校", furigana: "しぼうこう", meaning_en: "preferred school" },
      { word_id: "n2_1513", word_number: 1513, kanji: "願書", furigana: "がんしょ", meaning_en: "application form" },
      { word_id: "n2_1514", word_number: 1514, kanji: "明後日", furigana: "みょうごにち", meaning_en: "day after tomorrow" },
      { word_id: "n2_1515", word_number: 1515, kanji: "以降", furigana: "いこう", meaning_en: "after, since" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 16 学校",
    page_story: "225_2",
    japanese_text: "A：最近Cさんを見ないね。\nB：ああ。<u>退学</u>したらしいよ。<u>あくまで</u>うわさなんだけど、バイトで俳優の仕事をしていたけど、<u>正式に</u>俳優の事務所に<u>属して</u>やっていくことにしたんだって。\nA：へえ。それはすごいね。早く<u>世間</u>に認められて活躍してほしいね。",
    english_translation: "A: I haven't seen C lately. B: I think C dropped out of school. It's just a rumor, but I heard she was working part-time as an actor, and then decided to officially join an acting agency. A: Wow. That's amazing. I really hope she gets recognized by the public soon and becomes successful.",
    annotated_words: [
      { word_id: "n2_1516", word_number: 1516, kanji: "退学[する]", furigana: "たいがく", meaning_en: "leaving school, drop out of school" },
      { word_id: "n2_1517", word_number: 1517, kanji: "あくまで", furigana: "", meaning_en: "just, in the end" },
      { word_id: "n2_1518", word_number: 1518, kanji: "正式な", furigana: "せいしきな", meaning_en: "official" },
      { word_id: "n2_1519", word_number: 1519, kanji: "属する", furigana: "ぞくする", meaning_en: "join, belong to" },
      { word_id: "n2_1520", word_number: 1520, kanji: "世間", furigana: "せけん", meaning_en: "society, public" }
    ]
  }
];

topic16StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 16 story ${story.story_number}: ${story.page_story}.json`);
});
