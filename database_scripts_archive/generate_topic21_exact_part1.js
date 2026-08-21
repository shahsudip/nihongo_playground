import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic21StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 21 社会",
    page_story: "292_1",
    japanese_text: "今の日本では、所得が増えると、<u>課税</u>の<u>対象</u>になる額も増える。<u>資本主義</u>における<u>税制</u>上の<u>恩恵</u>を<u>得ている</u>とは感じにくい。",
    english_translation: "In Japan today, as your income increases, the amount subject to taxation also increases. I don't really feel like anyone gains any benefits from the taxation system under capitalism.",
    annotated_words: [
      { word_id: "n2_2029", word_number: 2029, kanji: "課税[する]", furigana: "かぜい", meaning_en: "taxation, tax" },
      { word_id: "n2_2030", word_number: 2030, kanji: "対象", furigana: "たいしょう", meaning_en: "subject, target" },
      { word_id: "n2_2031", word_number: 2031, kanji: "資本主義", furigana: "しほんしゅぎ", meaning_en: "capitalism" },
      { word_id: "n2_2032", word_number: 2032, kanji: "資本", furigana: "しほん", meaning_en: "capital" },
      { word_id: "n2_2033", word_number: 2033, kanji: "税制", furigana: "ぜいせい", meaning_en: "taxation system" },
      { word_id: "n2_2034", word_number: 2034, kanji: "恩恵", furigana: "おんけい", meaning_en: "benefit" },
      { word_id: "n2_2035", word_number: 2035, kanji: "得る", furigana: "える", meaning_en: "gain, acquire" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 21 社会",
    page_story: "293_1",
    japanese_text: "<u>しばしば</u>盗難が起きているので、<u>貴重品</u>と<u>身の回り</u>の品を一か所に<u>収める</u>のは危険だ。",
    english_translation: "It's not safe to store all your valuables and personal belongings in one place because theft frequently occurs.",
    annotated_words: [
      { word_id: "n2_2036", word_number: 2036, kanji: "しばしば", furigana: "", meaning_en: "frequently, often" },
      { word_id: "n2_2037", word_number: 2037, kanji: "貴重品", furigana: "きちょうひん", meaning_en: "valuables" },
      { word_id: "n2_2038", word_number: 2038, kanji: "貴重な", furigana: "きちょうな", meaning_en: "valuable" },
      { word_id: "n2_2039", word_number: 2039, kanji: "身の回り", furigana: "みのまわり", meaning_en: "one's person, personal belongings" },
      { word_id: "n2_2040", word_number: 2040, kanji: "収める", furigana: "おさめる", meaning_en: "store" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 21 社会",
    page_story: "293_2",
    japanese_text: "2021年、<u>急速に</u> <u>穀物</u>の価格が上がった。穀物の用途は幅広いので、需要が高い。<u>供給</u>と<u>釣り合わ</u>なければ、ますます価格が上がって、<u>売買され</u>にくくなるかもしれない。",
    english_translation: "In 2021, the prices of grain rose rapidly. Demand for grain is so high because of its wide range of uses. If not matched with supply, prices may keep rising, making it harder to buy and sell.",
    annotated_words: [
      { word_id: "n2_2041", word_number: 2041, kanji: "急速な", furigana: "きゅうそくな", meaning_en: "rapid" },
      { word_id: "n2_2042", word_number: 2042, kanji: "穀物", furigana: "こくもつ", meaning_en: "grain" },
      { word_id: "n2_2043", word_number: 2043, kanji: "供給[する]", furigana: "きょうきゅう", meaning_en: "supply" },
      { word_id: "n2_2044", word_number: 2044, kanji: "釣り合う", furigana: "つりあう", meaning_en: "match, balance" },
      { word_id: "n2_2045", word_number: 2045, kanji: "売買[する]", furigana: "ばいばい", meaning_en: "purchase and sale, buy and sell" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 21 社会",
    page_story: "294_1",
    japanese_text: "<u>今日</u>、世界中の<u>ジャーナリスト</u>や報道機関が国からの圧力を受けている。本来なら、<u>公平な</u>報道がされるために、表現の自由は守られるべきである。このことについて、日本社会でも<u>議論</u>を<u>加速させて</u>いく必要があるだろう。",
    english_translation: "These days, journalists and media organizations around the world are under pressure from states. Freedom of expression must be protected to ensure fair reporting. We need to accelerate discussion of this matter in Japanese society.",
    annotated_words: [
      { word_id: "n2_2046", word_number: 2046, kanji: "今日", furigana: "こんにち", meaning_en: "these days" },
      { word_id: "n2_2047", word_number: 2047, kanji: "ジャーナリスト", furigana: "じゃーなりすと", meaning_en: "journalist" },
      { word_id: "n2_2048", word_number: 2048, kanji: "公平な", furigana: "こうへいな", meaning_en: "fair" },
      { word_id: "n2_2049", word_number: 2049, kanji: "不公平な", furigana: "ふこうへいな", meaning_en: "unfair" },
      { word_id: "n2_2050", word_number: 2050, kanji: "議論[する]", furigana: "ぎろん", meaning_en: "discussion, discuss" },
      { word_id: "n2_2051", word_number: 2051, kanji: "加速[する]", furigana: "かそく", meaning_en: "acceleration, accelerate" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 21 社会",
    page_story: "294_2",
    japanese_text: "故・石山太郎氏は、国会議員と都知事も<u>務めた</u>人物だ。<u>強気な</u>コメントで議論を招いたこともあったが、日本の<u>誇り</u>を守ろうと、数多くの<u>取り組み</u>を行っていた。",
    english_translation: "The late Taro Ishiyama served as a member of the Diet and also Governor of Tokyo. Although his aggressive comments sometimes invited controversy, he made consistent efforts to respect Japanese pride.",
    annotated_words: [
      { word_id: "n2_2052", word_number: 2052, kanji: "務める", furigana: "つとめる", meaning_en: "serve as, work as" },
      { word_id: "n2_2053", word_number: 2053, kanji: "強気な", furigana: "つよきな", meaning_en: "aggressive" },
      { word_id: "n2_2054", word_number: 2054, kanji: "誇り", furigana: "ほこり", meaning_en: "pride" },
      { word_id: "n2_2055", word_number: 2055, kanji: "取り組み", furigana: "とりくみ", meaning_en: "effort, initiative" },
      { word_id: "n2_2056", word_number: 2056, kanji: "取り組む", furigana: "とりくむ", meaning_en: "take on, address" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 21 社会",
    page_story: "295_1",
    japanese_text: "A：<u>景気が悪化して</u>、店を続けていくのが難しくなってきたよ。\nB：<u>借金</u>はしない方がいいよ。\nA：それはもっともなんだけど、<u>現状</u>を考えたら検討しなきゃ。\nB：<u>補助金</u>があるかは調べてみたの？",
    english_translation: "A: With the economy getting worse, it's getting harder and harder to keep the store going. B: It's not a good idea to go into debt. A: That's true, but considering the current situation, I have to consider it. B: Have you checked to see if there are any subsidies?",
    annotated_words: [
      { word_id: "n2_2057", word_number: 2057, kanji: "景気", furigana: "けいき", meaning_en: "economy" },
      { word_id: "n2_2058", word_number: 2058, kanji: "悪化[する]", furigana: "あっか", meaning_en: "deterioration, get worse" },
      { word_id: "n2_2059", word_number: 2059, kanji: "借金[する]", furigana: "しゃっきん", meaning_en: "debt, go into debt" },
      { word_id: "n2_2060", word_number: 2060, kanji: "現状", furigana: "げんじょう", meaning_en: "current situation" },
      { word_id: "n2_2061", word_number: 2061, kanji: "補助金", furigana: "ほじょきん", meaning_en: "subsidy" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 21 社会",
    page_story: "296_1",
    japanese_text: "入社<u>早々</u>、<u>湿疹</u>が出てしまった。慣れない生活からの疲労の<u>現れ</u>なのだろう。早く病院に行って<u>さっさと</u>治したいが、今日も上司に出社を<u>命じられて</u>しまった。",
    english_translation: "After I joined the new company, I developed eczema right away. It's probably a sign of fatigue from this lifestyle I'm not used to. I want to go to the clinic and get rid of it quickly, but my boss ordered me to come in and work again today.",
    annotated_words: [
      { word_id: "n2_2062", word_number: 2062, kanji: "早々", furigana: "そうそう", meaning_en: "right away" },
      { word_id: "n2_2063", word_number: 2063, kanji: "湿疹", furigana: "しっしん", meaning_en: "eczema" },
      { word_id: "n2_2064", word_number: 2064, kanji: "現れ", furigana: "あらわれ", meaning_en: "sign" },
      { word_id: "n2_2065", word_number: 2065, kanji: "さっさと", furigana: "", meaning_en: "quickly, immediately" },
      { word_id: "n2_2066", word_number: 2066, kanji: "命じる／命ずる", furigana: "めいじる／めいずる", meaning_en: "order, command" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 21 社会",
    page_story: "296_2",
    japanese_text: "日本では「団塊の<u>世代</u>」と呼ばれる<u>方々</u>が全員75歳以上になると、人口全体の3分の1が65歳以上になると言われている。<u>今後</u>、医療や社会保障などの<u>福祉</u>に対する<u>負担</u>は、<u>一層</u> <u>増大す</u>るだろう。",
    english_translation: "When all the people in Japan's \"baby boomer\" generation have reached the age of 75, apparently one-third of the entire population will be aged 65 or older. In the future, the burden of welfare such as medical care and social security will certainly increase further.",
    annotated_words: [
      { word_id: "n2_2067", word_number: 2067, kanji: "世代", furigana: "せだい", meaning_en: "generation" },
      { word_id: "n2_2068", word_number: 2068, kanji: "方々", furigana: "かたがた", meaning_en: "people" },
      { word_id: "n2_2069", word_number: 2069, kanji: "今後", furigana: "こんご", meaning_en: "future" },
      { word_id: "n2_2070", word_number: 2070, kanji: "福祉", furigana: "ふくし", meaning_en: "welfare" },
      { word_id: "n2_2071", word_number: 2071, kanji: "負担[する]", furigana: "ふたん", meaning_en: "burden" },
      { word_id: "n2_2072", word_number: 2072, kanji: "一層", furigana: "いっそう", meaning_en: "further, to another level" },
      { word_id: "n2_2073", word_number: 2073, kanji: "増大[する]", furigana: "ぞうだい", meaning_en: "increase" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 21 社会",
    page_story: "297_1",
    japanese_text: "<u>率直に</u>言えば、会社の<u>規律</u>を守らない人が苦手だ。会社の<u>利益</u>を<u>向上させる</u>ためにも、社員同士<u>友好な</u>関係を作って<u>支え合う</u>のが良いと思う。",
    english_translation: "Frankly speaking, I don't like people who don't observe discipline in the workplace. In order to improve the company's profits, I think it's a good idea for employees to form friendly relationships and support each other.",
    annotated_words: [
      { word_id: "n2_2074", word_number: 2074, kanji: "率直な", furigana: "そっちょくな", meaning_en: "frank, candid" },
      { word_id: "n2_2075", word_number: 2075, kanji: "規律", furigana: "きりつ", meaning_en: "discipline" },
      { word_id: "n2_2076", word_number: 2076, kanji: "利益", furigana: "りえき", meaning_en: "profit" },
      { word_id: "n2_2077", word_number: 2077, kanji: "向上[する]", furigana: "こうじょう", meaning_en: "improvement, improve" },
      { word_id: "n2_2078", word_number: 2078, kanji: "友好な", furigana: "ゆうこうな", meaning_en: "friendly" },
      { word_id: "n2_2079", word_number: 2079, kanji: "支え合う", furigana: "ささえあう", meaning_en: "support each other, give mutual support" },
      { word_id: "n2_2080", word_number: 2080, kanji: "支える", furigana: "ささえる", meaning_en: "support" }
    ]
  }
];

topic21StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 21 story ${story.story_number}: ${story.page_story}.json`);
});
