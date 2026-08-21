import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic23StoriesPart3 = [
  {
    is_story: true,
    story_number: 14,
    title: "Topic 23 環境・科学",
    page_story: "326_1",
    japanese_text: "<u>水素</u>と<u>酸素</u>は、<u>生命</u>の<u>生存</u>に重要な水を構成する<u>気体</u>だ。近年ではその<u>性質</u>が自動車にも活用されている。水の電気分解の<u>原理</u>を応用し、水素と酸素を化学反応させると、水に変化する過程で電気が発生する。その電気を使って自動車を動かすのである。",
    english_translation: "Hydrogen and oxygen are gases that comprise water, which is crucial for life to exist. In recent years, their properties have been utilized in automobiles. Using the principle of electrolysis of water, when hydrogen and oxygen react chemically, electricity is generated in the process of transforming the water, which is then used to power automobiles.",
    annotated_words: [
      { word_id: "n2_2298", word_number: 2298, kanji: "水素", furigana: "すいそ", meaning_en: "hydrogen" },
      { word_id: "n2_2299", word_number: 2299, kanji: "酸素", furigana: "さんそ", meaning_en: "oxygen" },
      { word_id: "n2_2300", word_number: 2300, kanji: "生命", furigana: "せいめい", meaning_en: "life" },
      { word_id: "n2_2301", word_number: 2301, kanji: "生存[する]", furigana: "せいぞん", meaning_en: "existence, exist" },
      { word_id: "n2_2302", word_number: 2302, kanji: "気体", furigana: "きたい", meaning_en: "gas" },
      { word_id: "n2_2303", word_number: 2303, kanji: "性質", furigana: "せいしつ", meaning_en: "property" },
      { word_id: "n2_2304", word_number: 2304, kanji: "原理", furigana: "げんり", meaning_en: "principle" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 23 環境・科学",
    page_story: "326_2",
    japanese_text: "A：ねえ、この記事見て。この子、<u>磁石</u>に<u>ひっつく</u>かどうかで<u>アルミ</u>缶とスチール缶を分別するごみ箱を発明したんだって！\nB：それは実用的だね！なるほど、磁石の<u>引力</u>を利用したんだ。\nA：なんと、その発明で<u>省</u>資源活動の賞まで<u>受賞した</u>らしいよ。",
    english_translation: "A: Hey, look at this article. This kid has invented a garbage can that separates aluminum cans from steel cans based on whether or not they stick to a magnet!\nB: That's very practical! I see. It uses magnetic attraction.\nA: I heard he even won a prize for resource conservation for his invention.",
    annotated_words: [
      { word_id: "n2_2305", word_number: 2305, kanji: "磁石", furigana: "じしゃく", meaning_en: "magnet" },
      { word_id: "n2_2306", word_number: 2306, kanji: "ひっつく", furigana: "ひっつく", meaning_en: "stick to, adhere" },
      { word_id: "n2_2307", word_number: 2307, kanji: "アルミ（ニウム）", furigana: "あるみ", meaning_en: "aluminum (in the UK, aluminium)" },
      { word_id: "n2_2308", word_number: 2308, kanji: "引力", furigana: "いんりょく", meaning_en: "attraction" },
      { word_id: "n2_2309", word_number: 2309, kanji: "省～", furigana: "しょう", meaning_en: "conservation" },
      { word_id: "n2_2310", word_number: 2310, kanji: "受賞[する]", furigana: "じゅしょう", meaning_en: "award, win a prize" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 23 環境・科学",
    page_story: "327_2",
    japanese_text: "<u>原子力発電</u>には放射線物質が利用される。この放射線物質が放射線を出す能力のことを<u>放射能</u>と呼び、放射能は<u>年月</u>が経つにつれ弱まる性質を持っている。",
    english_translation: "Radioactive materials are used in nuclear power generation. The ability of radioactive materials to emit radiation is called radioactivity, and this radioactivity weakens with the passing of time.",
    annotated_words: [
      { word_id: "n2_2311", word_number: 2311, kanji: "原子力発電", furigana: "げんしりょくはつでん", meaning_en: "nuclear power generation" },
      { word_id: "n2_2312", word_number: 2312, kanji: "発電[する]", furigana: "はつでん", meaning_en: "power generation, generate power" },
      { word_id: "n2_2313", word_number: 2313, kanji: "放射能", furigana: "ほうしゃのう", meaning_en: "radioactivity" },
      { word_id: "n2_2314", word_number: 2314, kanji: "年月", furigana: "ねんげつ", meaning_en: "time (months and years)" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 23 環境・科学",
    page_story: "328_1",
    japanese_text: "原子力発電は二酸化炭素を<u>排出しない</u>、他の発電方法に比べて発電コストが安定するという魅力がある一方、その危険さから<u>反</u>原発運動が続いている。",
    english_translation: "While nuclear power is attractive because it emits no carbon dioxide and is more cost-effective than other methods of power generation, its dangers have led to the ongoing anti-nuclear power movement.",
    annotated_words: [
      { word_id: "n2_2315", word_number: 2315, kanji: "排出[する]", furigana: "はいしゅつ", meaning_en: "emission, discharge" },
      { word_id: "n2_2316", word_number: 2316, kanji: "反～", furigana: "はん", meaning_en: "anti~" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 23 環境・科学",
    page_story: "328_2",
    japanese_text: "<u>原始</u>時代、火の発見は<u>人類</u>の進化に大きく貢献した。ヒトの<u>祖先</u>は<u>摩擦</u>を<u>用いて</u>火を起こすことを覚え、そこから火を使ういろいろな道具が発明された。<u>こうして</u>、ヒトと火の<u>密接な</u>関係が今も続いている。",
    english_translation: "In primitive times, our discovery of fire contributed greatly to humanity's evolution. Our ancestors learned to make fire using friction, and from there invented various tools that use fire. In this way, the close relationship between humans and fire continues to this day.",
    annotated_words: [
      { word_id: "n2_2317", word_number: 2317, kanji: "原始", furigana: "げんし", meaning_en: "primitive state, origin" },
      { word_id: "n2_2318", word_number: 2318, kanji: "人類", furigana: "じんるい", meaning_en: "humanity, human species" },
      { word_id: "n2_2319", word_number: 2319, kanji: "祖先", furigana: "そせん", meaning_en: "ancestor" },
      { word_id: "n2_2320", word_number: 2320, kanji: "摩擦", furigana: "まさつ", meaning_en: "friction" },
      { word_id: "n2_2321", word_number: 2321, kanji: "用いる", furigana: "もちいる", meaning_en: "use, utilize" },
      { word_id: "n2_2322", word_number: 2322, kanji: "こうして", furigana: "こうして", meaning_en: "in this way, thus" },
      { word_id: "n2_2323", word_number: 2323, kanji: "密接な", furigana: "みっせつな", meaning_en: "close" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 23 環境・科学",
    page_story: "329_1",
    japanese_text: "A：<u>複写</u>の申請してた論文が、やっと届いたよ。\nB：このデジタル時代に大変だったね。\nA：まったくだよ。今度から<u>真空</u>発生装置を使った実験をするんだけど、まずはこの論文と同じ結果が出るか試すんだ。\nB：あの装置全然使ってないよね。<u>維持</u>費高いのに。\nA：だから使えるか確認から。確認<u>項目</u>いくつあったっけ。",
    english_translation: "A: That paper I applied for a copy of finally arrived.\nB: That's rough, in this digital age.\nA: Exactly. I'm going to do an experiment using a vacuum generator, but first I want to see if I can get the same results as in this paper.\nB: You haven't used that apparatus at all, have you? It costs a lot to maintain.\nA: That's why I'll start by confirming it's ready to use. Now, how many items did I have to check?",
    annotated_words: [
      { word_id: "n2_2324", word_number: 2324, kanji: "複写[する]", furigana: "ふくしゃ", meaning_en: "duplicate, copy" },
      { word_id: "n2_2325", word_number: 2325, kanji: "真空", furigana: "しんくう", meaning_en: "vacuum" },
      { word_id: "n2_2326", word_number: 2326, kanji: "維持[する]", furigana: "いじ", meaning_en: "maintenance, maintain" },
      { word_id: "n2_2327", word_number: 2327, kanji: "項目", furigana: "こうもく", meaning_en: "item" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 23 環境・科学",
    page_story: "330_1",
    japanese_text: "A：岡島大学の先生の講演面白かったよ。私<u>哲学</u>に関しては<u>素人</u>なんだけど、とっても分かりやすかったんだ。\nB：それはよかったね。\nA：評判通りのすごい先生だったよ。特に言葉の使い方について<u>述べて</u>いたところが面白かったなあ。",
    english_translation: "A: I enjoyed the professor's lecture at Okajima University. I'm only an amateur at philosophy, but it was very easy to understand.\nB: That's great.\nA: He's a great teacher, as his reputation suggests. I especially enjoyed it when he spoke about the use of language.",
    annotated_words: [
      { word_id: "n2_2328", word_number: 2328, kanji: "哲学", furigana: "てつがく", meaning_en: "philosophy" },
      { word_id: "n2_2329", word_number: 2329, kanji: "素人", furigana: "しろうと", meaning_en: "amateur" },
      { word_id: "n2_2330", word_number: 2330, kanji: "述べる", furigana: "のべる", meaning_en: "express, explain, speak" }
    ]
  },
  {
    is_story: true,
    story_number: 21,
    title: "Topic 23 環境・科学",
    page_story: "330_2",
    japanese_text: "A：<u>本</u>施設には<u>天然</u>ガスが<u>貯蔵されて</u>います。<u>通常</u>は発電用の燃料として使用されていますが、場合によっては都市ガスの原料としても利用されます。\nB：この施設の敷地面積はどのくらいなんですか。\nA：そうですね。<u>およそ</u>東京<u>ドーム</u>17個分です。",
    english_translation: "A: Natural gas is stored at this facility. It's usually used as fuel for generating power, but in some cases it's also used for the city's gas supply.\nB: How large in area is the facility site?\nA: Right. It's roughly the size of 17 Tokyo Domes.",
    annotated_words: [
      { word_id: "n2_2331", word_number: 2331, kanji: "本～", furigana: "ほん", meaning_en: "this ~" },
      { word_id: "n2_2332", word_number: 2332, kanji: "天然", furigana: "てんねん", meaning_en: "natural" },
      { word_id: "n2_2333", word_number: 2333, kanji: "貯蔵[する]", furigana: "ちょぞう", meaning_en: "stockpile, store" },
      { word_id: "n2_2334", word_number: 2334, kanji: "通常", furigana: "つうじょう", meaning_en: "usual situation" },
      { word_id: "n2_2335", word_number: 2335, kanji: "およそ", furigana: "およそ", meaning_en: "approximation, roughly" },
      { word_id: "n2_2336", word_number: 2336, kanji: "ドーム", furigana: "どーむ", meaning_en: "dome" }
    ]
  },
  {
    is_story: true,
    story_number: 22,
    title: "Topic 23 環境・科学",
    page_story: "331_2",
    japanese_text: "2050年には地球上の人口が97億人になると言われ、その際に<u>食糧</u>不足が起きる恐れがある。これを乗り越える方法として、たんぱく質の豊富な昆虫食が注目されている。しかし、普及のためには、昆虫が苦手、<u>あるいは</u>、<u>生理的に</u>受け付けないという人がいるという問題を解決する必要がある。",
    english_translation: "Apparently, the population of the earth will reach 9.7 billion by 2050, and there are concerns that food shortages will occur at that time. As one way to overcome this, protein-rich insect diets are attracting attention. However, to spread this notion, certain problems need to be addressed—some people dislike insects, or else find them physiologically unacceptable.",
    annotated_words: [
      { word_id: "n2_2337", word_number: 2337, kanji: "食糧", furigana: "しょくりょう", meaning_en: "food" },
      { word_id: "n2_2338", word_number: 2338, kanji: "あるいは", furigana: "あるいは", meaning_en: "or else" },
      { word_id: "n2_2339", word_number: 2339, kanji: "生理的な", furigana: "せいりてきな", meaning_en: "physiological" }
    ]
  },
  {
    is_story: true,
    story_number: 23,
    title: "Topic 23 環境・科学",
    page_story: "332_1",
    japanese_text: "A：<u>学者</u>ってどうすればなれるの？新しい<u>理論</u>や<u>法則</u>を見つけ出すとかして有名になればいいのかな。\nB：安易な考えだなあ。まず<u>少なくとも</u> <u>博士</u>号は取っておきたいね。そして何より<u>批判</u>に負けない心を持つことが重要だよ。\nA：そうなんだ。<u>意志</u>が強くないと難しそう。",
    english_translation: "A: How can I become an academic? I just have to discover a new theory or principle or something and get famous.\nB: That's too simplistic. You should at least get a doctorate first. And more than anything, it's important to have a mindset that's not easily overcome by criticism.\nA: I see. It sounds difficult if you don't have a strong will.",
    annotated_words: [
      { word_id: "n2_2340", word_number: 2340, kanji: "学者", furigana: "がくしゃ", meaning_en: "academic, scholar" },
      { word_id: "n2_2341", word_number: 2341, kanji: "理論", furigana: "りろん", meaning_en: "theory" },
      { word_id: "n2_2342", word_number: 2342, kanji: "理論的な", furigana: "りろんてきな", meaning_en: "theoretical" },
      { word_id: "n2_2343", word_number: 2343, kanji: "法則", furigana: "ほうそく", meaning_en: "principle, law" },
      { word_id: "n2_2344", word_number: 2344, kanji: "少なくとも", furigana: "すくなくとも", meaning_en: "at least" },
      { word_id: "n2_2345", word_number: 2345, kanji: "博士", furigana: "はかせ", meaning_en: "doctorate" },
      { word_id: "n2_2346", word_number: 2346, kanji: "批判[する]", furigana: "ひはん", meaning_en: "criticism, criticize" },
      { word_id: "n2_2347", word_number: 2347, kanji: "意志", furigana: "いし", meaning_en: "will" }
    ]
  }
];

topic23StoriesPart3.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 23 story ${story.story_number}: ${story.page_story}.json`);
});
