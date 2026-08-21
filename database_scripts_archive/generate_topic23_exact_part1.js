import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic23StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 23 環境・科学",
    page_story: "315_1",
    japanese_text: "九州は比較的<u>温暖な</u>気候であるが、大陸の<u>砂漠</u>から黄砂が飛んでくる。黄砂がひどいときには遠くの<u>山脈</u>が隠れて見えなくなることもある。また、黄砂は人間の<u>循環</u>器や呼吸器の病気に影響するとの報告もある。",
    english_translation: "The island of Kyushu has a relatively mild climate, but yellow sand often blows in from continental deserts. When this yellow sand is severe, it can even obscure distant mountain ranges from view. Reports also suggest that it can impair human circulatory and respiratory functions.",
    annotated_words: [
      { word_id: "n2_2217", word_number: 2217, kanji: "温暖な", furigana: "おんだんな", meaning_en: "mild" },
      { word_id: "n2_2218", word_number: 2218, kanji: "砂漠", furigana: "さばく", meaning_en: "desert" },
      { word_id: "n2_2219", word_number: 2219, kanji: "山脈", furigana: "さんみゃく", meaning_en: "mountain range" },
      { word_id: "n2_2220", word_number: 2220, kanji: "循環[する]", furigana: "じゅんかん", meaning_en: "circulation, circulate" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 23 環境・科学",
    page_story: "316_1",
    japanese_text: "A：久しぶり。この前の<u>学会</u>以来だね。都市と公園に<u>関する論文</u>は書けた？\nB：まあね。<u>構成</u>に少し悩んだけれど、なんとか書き上げて、今は細かいところをチェックしてる<u>段階</u>だよ。後は<u>要約</u>も書かないと。論文を出すからには<u>完璧な</u>ものを目指さないとね。\nA：そうだね。ちゃんと論文の<u>要点</u>が伝わるようにね。",
    english_translation: "A: It's been a while. Since the last conference, I think. Did you write that paper about cities and parks?\nB: Well, yes. I had a little trouble with the structure of the paper, but I managed to finish it and now I'm just at the detail-checking stage. I also need to write an abstract. I want to make sure it's perfect before I submit it.\nA: Well, that's right. Make sure you communicate all your key points.",
    annotated_words: [
      { word_id: "n2_2221", word_number: 2221, kanji: "学会", furigana: "がっかい", meaning_en: "(academic) conference" },
      { word_id: "n2_2222", word_number: 2222, kanji: "関する", furigana: "かんする", meaning_en: "be related to, be about" },
      { word_id: "n2_2223", word_number: 2223, kanji: "論文", furigana: "ろんぶん", meaning_en: "paper, essay" },
      { word_id: "n2_2224", word_number: 2224, kanji: "構成[する]", furigana: "こうせい", meaning_en: "structure, compose" },
      { word_id: "n2_2225", word_number: 2225, kanji: "段階", furigana: "だんかい", meaning_en: "stage" },
      { word_id: "n2_2226", word_number: 2226, kanji: "要約[する]", furigana: "ようやく", meaning_en: "abstract, summarize" },
      { word_id: "n2_2227", word_number: 2227, kanji: "完璧な", furigana: "かんぺきな", meaning_en: "perfect" },
      { word_id: "n2_2228", word_number: 2228, kanji: "要点", furigana: "ようてん", meaning_en: "key point" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 23 環境・科学",
    page_story: "317_1",
    japanese_text: "A：マイクロプラスチックによる<u>海洋</u> <u>汚染</u>が<u>南極</u>にまで広がっていることが<u>観測</u>されたんだって。\nB：マイクロプラスチックって何？\nA：<u>極</u>小のプラスチックのこと。貝やウミガメが誤って吸い込んじゃうんだ。だからプラスチックごみを減らす必要があってね。\nB：なるほど。私も<u>再利用</u>できる<u>エコバッグ</u>とか使おうかな。",
    english_translation: "A: Ocean pollution caused by microplastics has been observed spreading to the Antarctic.\nB: What are microplastics?\nA: What are microplastics? They are extremely small pieces of plastic. Shellfish and sea turtles swallow them by mistake. That's why we need to reduce plastic waste.\nB: I see. Maybe I should use reusable eco-bags and stuff.",
    annotated_words: [
      { word_id: "n2_2229", word_number: 2229, kanji: "海洋", furigana: "かいよう", meaning_en: "ocean, sea" },
      { word_id: "n2_2230", word_number: 2230, kanji: "汚染[する]", furigana: "おせん", meaning_en: "pollution, pollute" },
      { word_id: "n2_2231", word_number: 2231, kanji: "南極", furigana: "なんきょく", meaning_en: "Antarctic, South Pole" },
      { word_id: "n2_2232", word_number: 2232, kanji: "北極", furigana: "ほっきょく", meaning_en: "Arctic, North Pole" },
      { word_id: "n2_2233", word_number: 2233, kanji: "観測[する]", furigana: "かんそく", meaning_en: "observation, observe" },
      { word_id: "n2_2234", word_number: 2234, kanji: "極～", furigana: "ごく", meaning_en: "extra ~, extremely ~" },
      { word_id: "n2_2235", word_number: 2235, kanji: "再利用[する]", furigana: "さいりよう", meaning_en: "reuse, reuse" },
      { word_id: "n2_2236", word_number: 2236, kanji: "エコバッグ", furigana: "えこばっぐ", meaning_en: "eco-bag" },
      { word_id: "n2_2237", word_number: 2237, kanji: "エコ", furigana: "えこ", meaning_en: "eco (ecological)" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 23 環境・科学",
    page_story: "318_1",
    japanese_text: "A：<u>地球温暖化</u>で<u>赤道</u>近くの島が沈むって本当なの？\nB：今、<u>二酸化炭素</u>のような<u>温室効果ガス</u>が増えて地球の気温が高まる<u>傾向</u>にあるんだ。その影響の一つとして、南極の氷が解けて海水面が2050年には20cmも上がると<u>予測されて</u>いるんだよ。\nA：そうなんだ。地球は<u>危機</u>的な状況にあるんだね。",
    english_translation: "A: Is it true that global warming will cause inundation of islands near the equator?\nB: At the moment, the Earth's temperature has a tendency to rise due to an increase in greenhouse gases such as carbon dioxide. One effects of this is the melting of Antarctic ice, and sea levels are predicted to rise 20 cm by 2050.\nA: That's true. Right now, the Earth is in crisis.",
    annotated_words: [
      { word_id: "n2_2238", word_number: 2238, kanji: "地球温暖化", furigana: "ちきゅうおんだんか", meaning_en: "global warming" },
      { word_id: "n2_2239", word_number: 2239, kanji: "赤道", furigana: "せきどう", meaning_en: "equator" },
      { word_id: "n2_2240", word_number: 2240, kanji: "二酸化炭素", furigana: "にさんかたんそ", meaning_en: "carbon dioxide" },
      { word_id: "n2_2241", word_number: 2241, kanji: "温室効果ガス", furigana: "おんしつこうかがす", meaning_en: "greenhouse gas" },
      { word_id: "n2_2242", word_number: 2242, kanji: "温室", furigana: "おんしつ", meaning_en: "greenhouse" },
      { word_id: "n2_2243", word_number: 2243, kanji: "傾向", furigana: "けいこう", meaning_en: "tendency" },
      { word_id: "n2_2244", word_number: 2244, kanji: "予測[する]", furigana: "よそく", meaning_en: "prediction, predict" },
      { word_id: "n2_2245", word_number: 2245, kanji: "危機", furigana: "きき", meaning_en: "crisis" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 23 環境・科学",
    page_story: "319_1",
    japanese_text: "A：あれ、<u>異常な</u>値が出た。100未満の値になるはずなのに。<u>引用</u>した<u>文献</u>の値が<u>異なって</u>るのかなあ。\nB：数式を確認してみよう。…ほら、この<u>イコール</u>の後の値が<u>誤って</u>るよ。\nA：あ、ほんとだ。よし、これでもう一度やってみよう。\nB：よろしくね。結果は小数点第１位まで<u>四捨五入しな</u>いといけないよ。",
    english_translation: "A: Hey, I got an abnormal value. It should be under 100. I wonder if this differs from the values in the cited references.\nB: Let's check the formula. Oh, I see. The value after the equal sign here is wrong.\nA: Oh, really? Okay, I'll try it again.\nB: I'll leave it to you then. You need to round off the result to the first decimal place.",
    annotated_words: [
      { word_id: "n2_2246", word_number: 2246, kanji: "異常な", furigana: "いじょうな", meaning_en: "unusual, abnormal" },
      { word_id: "n2_2247", word_number: 2247, kanji: "引用[する]", furigana: "いんよう", meaning_en: "citation, quote" },
      { word_id: "n2_2248", word_number: 2248, kanji: "文献", furigana: "ぶんけん", meaning_en: "reference, literature" },
      { word_id: "n2_2249", word_number: 2249, kanji: "異なる", furigana: "ことなる", meaning_en: "differ" },
      { word_id: "n2_2250", word_number: 2250, kanji: "イコール", furigana: "いこーる", meaning_en: "equal sign" },
      { word_id: "n2_2251", word_number: 2251, kanji: "誤る", furigana: "あやまる", meaning_en: "be wrong" },
      { word_id: "n2_2252", word_number: 2252, kanji: "誤り", furigana: "あやまり", meaning_en: "mistake, error" },
      { word_id: "n2_2253", word_number: 2253, kanji: "四捨五入[する]", furigana: "ししゃごにゅう", meaning_en: "rounding, round off, round up" }
    ]
  }
];

topic23StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 23 story ${story.story_number}: ${story.page_story}.json`);
});
