import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic22StoriesPart2 = [
  {
    is_story: true,
    story_number: 7,
    title: "Topic 22 政治",
    page_story: "310_2",
    japanese_text: "A：先生、「<u>前</u>首相」と「<u>元</u>首相」ってどう違うんですか？\nB：面白いところに気づきましたね。<u>現</u>首相の前に首相だった人はみな元首相で、一つ前に首相だった人だけを前首相と言うんですよ。",
    english_translation: "A: Sir, what is the difference between \"previous prime minister\" and \"former prime minister\"?\nB: You've picked up on an interesting point. Everyone who was prime minister before the current prime minister is called a \"former prime minister,\" but only the most recent prime minister before this one is called the \"previous prime minister.\"",
    annotated_words: [
      { word_id: "n2_2182", word_number: 2182, kanji: "前～", furigana: "ぜん", meaning_en: "previous ~" },
      { word_id: "n2_2183", word_number: 2183, kanji: "元～", furigana: "もと", meaning_en: "former ~" },
      { word_id: "n2_2184", word_number: 2184, kanji: "現～", furigana: "げん", meaning_en: "current ~" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 22 政治",
    page_story: "311_1",
    japanese_text: "日本の出生数の<u>増減</u>を見ると、第２次<u>世界大戦</u>前は増加傾向であったが、昭和24年の270万人を<u>ピーク</u>に減少している。",
    english_translation: "Fluctuations in Japan's birth rate show an increasing trend prior to World War II, but after peaking at 2.7 million in 1949, the number of births has declined ever since.",
    annotated_words: [
      { word_id: "n2_2185", word_number: 2185, kanji: "増減[する]", furigana: "ぞうげん", meaning_en: "fluctuation, fluctuate" },
      { word_id: "n2_2186", word_number: 2186, kanji: "世界大戦", furigana: "せかいたいせん", meaning_en: "World War" },
      { word_id: "n2_2187", word_number: 2187, kanji: "大戦", furigana: "たいせん", meaning_en: "major war" },
      { word_id: "n2_2188", word_number: 2188, kanji: "ピーク", furigana: "ぴーく", meaning_en: "peak" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 22 政治",
    page_story: "311_2",
    japanese_text: "A：最近の野党についてどう思う？\nB：なんか<u>余計な</u>ことばかり話してない？<u>不景気</u>で<u>所得</u>が減って、生活の<u>質</u>が下がっているんだから、解決策を考えてほしいな。",
    english_translation: "A: What do you think about the opposition parties these days?\nB: Everything they're saying is so redundant, isn't it? I wish they'd come up with solutions to this recession, decreasing incomes, and decreasing quality of life.",
    annotated_words: [
      { word_id: "n2_2189", word_number: 2189, kanji: "余計な", furigana: "よけいな", meaning_en: "redundant, unnecessary" },
      { word_id: "n2_2190", word_number: 2190, kanji: "不景気", furigana: "ふけいき", meaning_en: "recession" },
      { word_id: "n2_2191", word_number: 2191, kanji: "所得", furigana: "しょとく", meaning_en: "income" },
      { word_id: "n2_2192", word_number: 2192, kanji: "質", furigana: "しつ", meaning_en: "quality" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 22 政治",
    page_story: "312_1",
    japanese_text: "日本では、<u>総理大臣</u>は<u>国会</u>議員の中から選ばれ、<u>天皇</u>によって任命される。",
    english_translation: "In Japan, the Prime Minister is chosen from among the members of the Diet and appointed by the Emperor.",
    annotated_words: [
      { word_id: "n2_2193", word_number: 2193, kanji: "総理大臣", furigana: "そうりだいじん", meaning_en: "prime minister" },
      { word_id: "n2_2194", word_number: 2194, kanji: "国会", furigana: "こっかい", meaning_en: "Diet (Japan's national assembly)" },
      { word_id: "n2_2195", word_number: 2195, kanji: "議員", furigana: "ぎいん", meaning_en: "member" },
      { word_id: "n2_2196", word_number: 2196, kanji: "天皇", furigana: "てんのう", meaning_en: "Emperor" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 22 政治",
    page_story: "312_2",
    japanese_text: "予算委員会の国会中継を見ると、<u>より公正な</u>分配のためにいろいろと提案している議員もいれば、<u>政党</u>の<u>利害</u>を先に考えている議員もいるようだ。",
    english_translation: "Watching parliamentary coverage of the Budget Committee, it seems that some legislators are proposing various measures for more equitable distribution, while others are prioritizing political party interests.",
    annotated_words: [
      { word_id: "n2_2197", word_number: 2197, kanji: "より", furigana: "", meaning_en: "more (comparison)" },
      { word_id: "n2_2198", word_number: 2198, kanji: "公正な", furigana: "こうせいな", meaning_en: "fair, equitable" },
      { word_id: "n2_2199", word_number: 2199, kanji: "政党", furigana: "せいとう", meaning_en: "political party" },
      { word_id: "n2_2200", word_number: 2200, kanji: "利害", furigana: "りがい", meaning_en: "interests" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 22 政治",
    page_story: "312_3",
    japanese_text: "アメリカの新しい<u>大使</u>が来日し、外務<u>大臣</u>と初めて面会した。およそ１時間、日本の米軍<u>基地</u>に関して話し合いが行われた。",
    english_translation: "The new U.S. ambassador arrived in Japan and met for the first time with the Foreign Minister. For about one hour, they engaged in discussion about U.S. military bases in Japan.",
    annotated_words: [
      { word_id: "n2_2201", word_number: 2201, kanji: "大使", furigana: "たいし", meaning_en: "ambassador" },
      { word_id: "n2_2202", word_number: 2202, kanji: "大臣", furigana: "だいじん", meaning_en: "minister" },
      { word_id: "n2_2203", word_number: 2203, kanji: "基地", furigana: "きち", meaning_en: "(military) base" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 22 政治",
    page_story: "313_2",
    japanese_text: "首相は、ＣＯＰ２６の<u>会合</u>に出席し、発展途上国の温暖化<u>対策</u>を支援する方法について<u>演説した</u>。",
    english_translation: "The Prime Minister attended the COP26 gathering and gave a speech on countermeasures to help developing countries fight global warming.",
    annotated_words: [
      { word_id: "n2_2204", word_number: 2204, kanji: "会合[する]", furigana: "かいごう", meaning_en: "assembly, gather" },
      { word_id: "n2_2205", word_number: 2205, kanji: "対策[する]", furigana: "たいさく", meaning_en: "action, countermeasure" },
      { word_id: "n2_2206", word_number: 2206, kanji: "演説[する]", furigana: "えんぜつ", meaning_en: "address, make a speech" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 22 政治",
    page_story: "313_3",
    japanese_text: "日本の<u>封建的な</u>政治は、１２００<u>年代</u>から約７００年に渡って続いたが、明治政府によって廃止された。",
    english_translation: "Feudal rule in Japan lasted for about 700 years, starting from the era of the 1200s, but was abolished by the Meiji government.",
    annotated_words: [
      { word_id: "n2_2207", word_number: 2207, kanji: "封建的な", furigana: "ほうけんてきな", meaning_en: "feudal" },
      { word_id: "n2_2208", word_number: 2208, kanji: "民主的な", furigana: "みんしゅてきな", meaning_en: "democratic" },
      { word_id: "n2_2209", word_number: 2209, kanji: "～年代", furigana: "ねんだい", meaning_en: "era, era of ~" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 22 政治",
    page_story: "314_1",
    japanese_text: "「<u>民主主義</u>」とは「国のあり方を決める権利は国民が持っている」と考える政治<u>体制</u>のことである。民主主義において、政治家は<u>我々</u>国民の<u>代理人</u>である。しかし、実際には、その権力を自分のために使い、<u>不正</u>を行う<u>役人</u>も少なくない。",
    english_translation: "Democracy is a political system that holds that citizens have the right to decide the state of their nation. In a democracy, politicians are the representatives of us, the people. In reality, however, there are many government officials who use their power for their own benefit and act unjustly.",
    annotated_words: [
      { word_id: "n2_2210", word_number: 2210, kanji: "民主主義", furigana: "みんしゅしゅぎ", meaning_en: "democracy" },
      { word_id: "n2_2211", word_number: 2211, kanji: "体制", furigana: "たいせい", meaning_en: "system" },
      { word_id: "n2_2212", word_number: 2212, kanji: "我々", furigana: "われわれ", meaning_en: "we, us" },
      { word_id: "n2_2213", word_number: 2213, kanji: "代理人", furigana: "だいりにん", meaning_en: "agent, representative" },
      { word_id: "n2_2214", word_number: 2214, kanji: "代理[する]", furigana: "だいり", meaning_en: "proxy, act as proxy" },
      { word_id: "n2_2215", word_number: 2215, kanji: "不正", furigana: "ふせい", meaning_en: "injustice" },
      { word_id: "n2_2216", word_number: 2216, kanji: "役人", furigana: "やくにん", meaning_en: "government official, bureaucrat" }
    ]
  }
];

topic22StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 22 story ${story.story_number}: ${story.page_story}.json`);
});
