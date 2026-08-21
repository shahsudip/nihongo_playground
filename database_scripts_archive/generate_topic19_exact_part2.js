import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 19 Stories (Health) - Part 2
const topic19StoriesPart2 = [
  {
    is_story: true,
    story_number: 9,
    title: "Topic 19 健康",
    page_story: "272_1",
    japanese_text: "2020年、<u>強力な</u>感染力を持つ<u>伝染病</u>が世界中に拡大した。ウイルスが国内に<u>侵入する</u>のを防ぐために、経済よりも<u>人命</u>を優先し、各国が<u>入国</u>を制限してきた。しかし、<u>ワクチン</u>が開発されてから、徐々にその制限は解除された。",
    english_translation: "In the year 2020, a powerfully contagious epidemic spread across the globe. In order to prevent intrusion of the virus, countries restricted entry, prioritizing human life over the economy. However, after a vaccine was developed, these restrictions were gradually lifted.",
    annotated_words: [
      { word_id: "n2_1887", word_number: 1887, kanji: "強力な", furigana: "きょうりょくな", meaning_en: "powerful" },
      { word_id: "n2_1888", word_number: 1888, kanji: "伝染病", furigana: "でんせんびょう", meaning_en: "epidemic" },
      { word_id: "n2_1889", word_number: 1889, kanji: "伝染[する]", furigana: "でんせん", meaning_en: "contagion, infect" },
      { word_id: "n2_1890", word_number: 1890, kanji: "侵入[する]", furigana: "しんにゅう", meaning_en: "intrusion, invade" },
      { word_id: "n2_1891", word_number: 1891, kanji: "人命", furigana: "じんめい", meaning_en: "human life" },
      { word_id: "n2_1892", word_number: 1892, kanji: "入国[する]", furigana: "にゅうこく", meaning_en: "entry (into a country), enter a country" },
      { word_id: "n2_1893", word_number: 1893, kanji: "出国[する]", furigana: "しゅっこく", meaning_en: "exit (from a country), exit a country" },
      { word_id: "n2_1894", word_number: 1894, kanji: "ワクチン", furigana: "わくちん", meaning_en: "vaccine" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 19 健康",
    page_story: "272_2",
    japanese_text: "子どもが外でけがをしたら、まずは出血の<u>有無</u>を確認し、<u>傷口</u>の汚れを水で流すことが大切だ。その後、<u>清潔な</u>タオルやハンカチで拭くとよい。子どもは小さいけがでもびっくりして泣いてしまうが、親は落ち着いて<u>手当て</u>をすることが大切だ。",
    english_translation: "When a child is injured outdoors, it is important to first check for the presence of any bleeding and wash the wound with water. Then, wipe it with a clean towel or handkerchief. Children may cry when startled by even the smallest injury, but it's important for parents to stay calm and treat the injury.",
    annotated_words: [
      { word_id: "n2_1895", word_number: 1895, kanji: "有無", furigana: "うむ", meaning_en: "presence" },
      { word_id: "n2_1896", word_number: 1896, kanji: "傷口", furigana: "きずぐち", meaning_en: "wound" },
      { word_id: "n2_1897", word_number: 1897, kanji: "清潔な", furigana: "せいけつな", meaning_en: "clean" },
      { word_id: "n2_1898", word_number: 1898, kanji: "手当て[する]", furigana: "てあて", meaning_en: "medical treatment, treat" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 19 健康",
    page_story: "273_1",
    japanese_text: "最近お気に入りの<u>入浴剤</u>を入れて、お風呂に入っている。入浴剤の<u>成分</u>は気にしていないが、使いやすい<u>錠剤</u>タイプを選んでいる。",
    english_translation: "Recently I've been taking baths with my favorite bath salts. I don't care about the active ingredients, but I prefer tablet-type bath salts because they're so easy to use.",
    annotated_words: [
      { word_id: "n2_1899", word_number: 1899, kanji: "入浴剤", furigana: "にゅうよくざい", meaning_en: "bath salts" },
      { word_id: "n2_1900", word_number: 1900, kanji: "成分", furigana: "せいぶん", meaning_en: "active ingredient" },
      { word_id: "n2_1901", word_number: 1901, kanji: "錠剤", furigana: "じょうざい", meaning_en: "tablet" },
      { word_id: "n2_1902", word_number: 1902, kanji: "カプセル", furigana: "かぷせる", meaning_en: "capsule" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 19 健康",
    page_story: "274_1",
    japanese_text: "A：最近疲れやすくて、<u>念のため</u>病院で検査を受けたら、<u>肥満</u>が原因だって言われたんだ。\nB：そうなんだ。大変だね。薬を飲んでるの？\nA：ううん、今は<u>サプリ</u>で<u>ビタミン</u>と<u>カルシウム</u>をしっかりとって、お酒は<u>控える</u>ようにしている。\nB：そっか。お酒好きには<u>気の毒な</u>生活だね。",
    english_translation: "A: I've been getting tired lately, so I went to the hospital for a checkup, just in case, and they said it's because I'm obese. B: Oh. That's terrible. Are you taking any medicine? A: No, I'm taking proper vitamin and calcium supplements and trying to avoid alcohol. B: I see. That's unfortunate for someone who enjoys a drink.",
    annotated_words: [
      { word_id: "n2_1903", word_number: 1903, kanji: "念のため", furigana: "ねんのため", meaning_en: "just in case" },
      { word_id: "n2_1904", word_number: 1904, kanji: "肥満", furigana: "ひまん", meaning_en: "obesity" },
      { word_id: "n2_1905", word_number: 1905, kanji: "サプリ(メント)", furigana: "さぷり(めんと)", meaning_en: "supplement" },
      { word_id: "n2_1906", word_number: 1906, kanji: "ビタミン", furigana: "びたみん", meaning_en: "vitamin" },
      { word_id: "n2_1907", word_number: 1907, kanji: "カルシウム", furigana: "かるしうむ", meaning_en: "calcium" },
      { word_id: "n2_1908", word_number: 1908, kanji: "控える", furigana: "ひかえる", meaning_en: "avoid, limit" },
      { word_id: "n2_1909", word_number: 1909, kanji: "気の毒な", furigana: "きのどくな", meaning_en: "unfortunate" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 19 健康",
    page_story: "275_1",
    japanese_text: "A：最近<u>いびき</u>うるさいよ。<u>顔色</u>もよくないし、一度病院で検査を受けてきたら？ よく<u>しゃっくり</u>も出ているじゃない。\nB：そうだな。朝なのに、<u>疲労</u>が残っているように感じるし、<u>体調</u>もあまりよくないし。でも、病院は嫌なんだよな…。\nA：<u>付き添って</u>あげるから、<u>ぶつぶつ</u>言ってないで病院に行こう！",
    english_translation: "A: You've been snoring loudly lately, and your color is a bit off. Why don't you go into the hospital for a checkup? You hiccup a lot too. B: I think you're right. Even in the mornings, I feel fatigued, and my physical condition isn't great. But I don't like the hospital ... A: I'll escort you, so stop grumbling and let's go to the hospital!",
    annotated_words: [
      { word_id: "n2_1910", word_number: 1910, kanji: "いびき", furigana: "", meaning_en: "snoring" },
      { word_id: "n2_1911", word_number: 1911, kanji: "顔色", furigana: "かおいろ", meaning_en: "(face) color" },
      { word_id: "n2_1912", word_number: 1912, kanji: "しゃっくり[する]", furigana: "", meaning_en: "hiccup, hiccup" },
      { word_id: "n2_1913", word_number: 1913, kanji: "疲労", furigana: "ひろう", meaning_en: "fatigue" },
      { word_id: "n2_1914", word_number: 1914, kanji: "体調", furigana: "たいちょう", meaning_en: "physical condition" },
      { word_id: "n2_1915", word_number: 1915, kanji: "付き添う", furigana: "つきそう", meaning_en: "escort, attend on" },
      { word_id: "n2_1916", word_number: 1916, kanji: "ぶつぶつ", furigana: "", meaning_en: "in a grumbling or moaning manner" }
    ]
  }
];

topic19StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 19 story ${story.story_number}: ${story.page_story}.json`);
});
