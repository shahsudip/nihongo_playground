import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 19 Stories (Health) - Part 1
const topic19StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 19 健康",
    page_story: "266_1",
    japanese_text: "A：この前<u>血圧</u>を<u>測定したら</u>、ちょっと高かったんだよ。\nB：そうなんだ。<u>水分</u>を取ったり、運動したりするのが大事らしいね。\nA：うん。やってみた。でも、なかなか下がらなくて、今は<u>血管</u>を広げる薬を<u>服用して</u>るんだ。この薬を飲むと、<u>副作用</u>で少し<u>目まい</u>がするんだけど。",
    english_translation: "A: When I checked my blood pressure the other day, it was a little high. B: Really? I guess getting plenty of fluids and doing some exercise is important. A: Yes. I tried that. However, it still wouldn't come down, so now I'm taking medicine to dilate my blood vessels. But taking this medicine gives me a little dizziness as a side effect.",
    annotated_words: [
      { word_id: "n2_1839", word_number: 1839, kanji: "血圧", furigana: "けつあつ", meaning_en: "blood pressure" },
      { word_id: "n2_1840", word_number: 1840, kanji: "測定[する]", furigana: "そくてい", meaning_en: "measurement, measure" },
      { word_id: "n2_1841", word_number: 1841, kanji: "水分", furigana: "すいぶん", meaning_en: "moisture, fluids" },
      { word_id: "n2_1842", word_number: 1842, kanji: "血管", furigana: "けっかん", meaning_en: "blood vessels" },
      { word_id: "n2_1843", word_number: 1843, kanji: "服用[する]", furigana: "ふくよう", meaning_en: "dose, take (medicine)" },
      { word_id: "n2_1844", word_number: 1844, kanji: "副作用", furigana: "ふくさよう", meaning_en: "side effect" },
      { word_id: "n2_1845", word_number: 1845, kanji: "目まい", furigana: "めまい", meaning_en: "dizziness" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 19 健康",
    page_story: "267_1",
    japanese_text: "先日、事故に遭った友達の<u>お見舞いに</u>行ってきた。友達は<u>輸血</u>を受けるぐらいの大けがで、まだ<u>青白い</u>顔をしていた。体はたくさんの<u>管</u>に繋がれ、ずっと<u>あおむけ</u>の状態で、頭にも<u>包帯</u>が巻いてあった。<u>回復</u>まで、まだ時間がかかりそうだ。",
    english_translation: "The other day I went to visit a friend who'd been in an accident. She was so badly injured that she'd had a blood transfusion, and she still looked pale. Her body was connected to a lot of tubes, and she was lying on her back with bandages on her head. Apparently, it'll take her a long time to recover.",
    annotated_words: [
      { word_id: "n2_1846", word_number: 1846, kanji: "(お)見舞い", furigana: "(お)みまい", meaning_en: "visit (someone unwell)" },
      { word_id: "n2_1847", word_number: 1847, kanji: "輸血[する]", furigana: "ゆけつ", meaning_en: "blood transfusion, transfuse" },
      { word_id: "n2_1848", word_number: 1848, kanji: "青白い", furigana: "あおじろい", meaning_en: "pale" },
      { word_id: "n2_1849", word_number: 1849, kanji: "管", furigana: "くだ", meaning_en: "tube" },
      { word_id: "n2_1850", word_number: 1850, kanji: "あおむけ", furigana: "", meaning_en: "lying on one's back" },
      { word_id: "n2_1851", word_number: 1851, kanji: "包帯", furigana: "ほうたい", meaning_en: "bandage" },
      { word_id: "n2_1852", word_number: 1852, kanji: "回復[する]", furigana: "かいふく", meaning_en: "recovery, recover" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 19 健康",
    page_story: "268_1",
    japanese_text: "<u>健康診断</u>で胸の<u>レントゲン</u>を撮ったら、<u>肺</u>に影が見つかった。その後、がんと<u>診断され</u>、すぐに<u>治療</u>が開始された。",
    english_translation: "During a physical examination, a shadow was found on his lungs after a chest X-ray. Subsequently, he was diagnosed with cancer and started medical treatment immediately.",
    annotated_words: [
      { word_id: "n2_1853", word_number: 1853, kanji: "健康診断", furigana: "けんこうしんだん", meaning_en: "physical examination, health checkup" },
      { word_id: "n2_1854", word_number: 1854, kanji: "レントゲン", furigana: "れんとげん", meaning_en: "X-ray" },
      { word_id: "n2_1855", word_number: 1855, kanji: "肺", furigana: "はい", meaning_en: "lungs" },
      { word_id: "n2_1856", word_number: 1856, kanji: "診断[する]", furigana: "しんだん", meaning_en: "diagnosis, diagnose" },
      { word_id: "n2_1857", word_number: 1857, kanji: "治療[する]", furigana: "ちりょう", meaning_en: "medical treatment, treat" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 19 健康",
    page_story: "268_2",
    japanese_text: "頭痛がひどくても頭痛<u>薬</u>を飲みたくない場合がある。そんなときは、<u>脇</u>や<u>あご</u>の周りの筋肉を<u>もむ</u>とよい。目の疲れが原因のこともあるため、<u>まぶた</u>の上に温かいタオルを乗せたり、<u>額</u>を<u>マッサージしたり</u>すると楽になるだろう。",
    english_translation: "Sometimes even when you have a terrible headache you don't want to take headache medicine. In times like that, it's good to massage the muscles around your armpits or jaw. Your eyes being tired can also be the cause, so placing a warm towel over your eyelids or massaging your forehead can also bring relief.",
    annotated_words: [
      { word_id: "n2_1858", word_number: 1858, kanji: "～薬", furigana: "やく", meaning_en: "~ medicine" },
      { word_id: "n2_1859", word_number: 1859, kanji: "脇", furigana: "わき", meaning_en: "armpit, side (of body)" },
      { word_id: "n2_1860", word_number: 1860, kanji: "あご", furigana: "", meaning_en: "jaw" },
      { word_id: "n2_1861", word_number: 1861, kanji: "もむ", furigana: "", meaning_en: "rub, massage" },
      { word_id: "n2_1862", word_number: 1862, kanji: "まぶた", furigana: "", meaning_en: "eyelids" },
      { word_id: "n2_1863", word_number: 1863, kanji: "額", furigana: "ひたい", meaning_en: "forehead" },
      { word_id: "n2_1864", word_number: 1864, kanji: "おでこ", furigana: "", meaning_en: "forehead" },
      { word_id: "n2_1865", word_number: 1865, kanji: "マッサージ[する]", furigana: "まっさーじ", meaning_en: "massage, massage" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 19 健康",
    page_story: "269_1",
    japanese_text: "A：風邪をひかないように、何か気をつけてることある？\nB：こまめに<u>換気したり</u>、ちゃんと<u>効力</u>が<u>裏付けられた</u> <u>除菌</u>スプレーを使ったりしてるよ。それから、<u>寒け</u>がしたり、風邪<u>気味</u>だと思ったりしたら、出社しないようにしてる。",
    english_translation: "A: Do you take any precautions to avoid catching a cold? B: I ventilate the room frequently and I use a disinfectant spray that is demonstrated to be effective. I also try to avoid going to work if have a chill or the suggestion of a cold.",
    annotated_words: [
      { word_id: "n2_1866", word_number: 1866, kanji: "換気[する]", furigana: "かんき", meaning_en: "ventilation, ventilate" },
      { word_id: "n2_1867", word_number: 1867, kanji: "効力", furigana: "こうりょく", meaning_en: "effectiveness" },
      { word_id: "n2_1868", word_number: 1868, kanji: "裏付ける", furigana: "うらづける", meaning_en: "demonstrate, back up" },
      { word_id: "n2_1869", word_number: 1869, kanji: "除菌[する]", furigana: "じょきん", meaning_en: "disinfectant, disinfect" },
      { word_id: "n2_1870", word_number: 1870, kanji: "寒け", furigana: "さむけ", meaning_en: "(body) chill" },
      { word_id: "n2_1871", word_number: 1871, kanji: "～気味", furigana: "ぎみ", meaning_en: "feeling of ~, suggestion of ~" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 19 健康",
    page_story: "270_1",
    japanese_text: "A：最近、疲れがたまってて…。\nB：働きすぎじゃない？<u>寿命</u>が縮まるよ。まずは、生活リズムを<u>整えた</u>方がいいよ。休憩時間は深く<u>呼吸して</u>、リラックスしてね。",
    english_translation: "A: I've been feeling so tired lately ... B: Maybe you're working too hard? You're really shortening your lifespan. First of all, you should set up a daily rhythm. During your breaks, breathe deeply and relax.",
    annotated_words: [
      { word_id: "n2_1872", word_number: 1872, kanji: "寿命", furigana: "じゅみょう", meaning_en: "lifspan" },
      { word_id: "n2_1873", word_number: 1873, kanji: "整える", furigana: "ととのえる", meaning_en: "arrange, prepare, set up" },
      { word_id: "n2_1874", word_number: 1874, kanji: "整う", furigana: "ととのう", meaning_en: "be ready, be arranged" },
      { word_id: "n2_1875", word_number: 1875, kanji: "呼吸[する]", furigana: "こきゅう", meaning_en: "breath, breathe" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 19 健康",
    page_story: "270_2",
    japanese_text: "A：また交通事故のニュースだね。\nB：そうだね。車同士の衝突で、お母さんは頭を強く打って<u>重体</u>、お父さんは命に問題はないけれど<u>重症</u>、子どもは軽いけがで<u>軽傷</u>か…。お母さん、なんとか助かってほしいね。\nA：うん。事故のニュースを見る<u>たびに</u>、心が<u>痛む</u>よ。",
    english_translation: "A: Another traffic accident in the news. B: Yeah. In a crash between two cars, the mother bumped her head hard and is in critical condition, the father's life isn't in danger but he's in serious condition, and the child got away with minor injuries.... I just hope the mother makes it. A: Yeah. It breaks my heart every time I see an accident on the news.",
    annotated_words: [
      { word_id: "n2_1876", word_number: 1876, kanji: "重体", furigana: "じゅうたい", meaning_en: "critical condition" },
      { word_id: "n2_1877", word_number: 1877, kanji: "重症", furigana: "じゅうしょう", meaning_en: "serious condition" },
      { word_id: "n2_1878", word_number: 1878, kanji: "軽傷", furigana: "けいしょう", meaning_en: "minor injuries" },
      { word_id: "n2_1879", word_number: 1879, kanji: "たび", furigana: "", meaning_en: "(every) time, instance" },
      { word_id: "n2_1880", word_number: 1880, kanji: "痛む", furigana: "いたむ", meaning_en: "ache, hurt" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 19 健康",
    page_story: "271_1",
    japanese_text: "<u>解剖</u>学の観点から、<u>脳</u>と<u>腸</u>は互いに影響を及ぼし合うことが分かっている。脳が疲れていると、腸が栄養を<u>吸収する</u>力も弱まるし、腸の調子がいいと、脳の調子もいい。朝からしっかり脳を働かせるには、腸が最も活動を<u>高める</u>0時に寝ていることが重要だ。",
    english_translation: "From an anatomical perspective, we know that the brain and the gut influence each other. When the brain is tired, the gut is less able to absorb nutrients, and when the gut is in good condition, the brain is in good condition. In order for the brain to function well in the morning, it's important to be asleep by midnight, which increases gut activity to the highest level.",
    annotated_words: [
      { word_id: "n2_1881", word_number: 1881, kanji: "解剖[する]", furigana: "かいぼう", meaning_en: "anatomy, dissect" },
      { word_id: "n2_1882", word_number: 1882, kanji: "脳", furigana: "のう", meaning_en: "brain" },
      { word_id: "n2_1883", word_number: 1883, kanji: "腸", furigana: "ちょう", meaning_en: "gut, intestines" },
      { word_id: "n2_1884", word_number: 1884, kanji: "吸収[する]", furigana: "きゅうしゅう", meaning_en: "absorption, absorb" },
      { word_id: "n2_1885", word_number: 1885, kanji: "高める", furigana: "たかめる", meaning_en: "increase, raise" },
      { word_id: "n2_1886", word_number: 1886, kanji: "高まる", furigana: "たかまる", meaning_en: "rise" }
    ]
  }
];

topic19StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 19 story ${story.story_number}: ${story.page_story}.json`);
});
