import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const topic21StoriesPart2 = [
  {
    is_story: true,
    story_number: 10,
    title: "Topic 21 社会",
    page_story: "298_1",
    japanese_text: "アルバイトであっても、<u>一定の</u>基準に<u>達して</u>いれば、<u>有給休暇</u>を取ることができるが、それを知らない人も多い。",
    english_translation: "Even part-time workers can take paid leave if they meet certain requirements, but many people do not know this.",
    annotated_words: [
      { word_id: "n2_2081", word_number: 2081, kanji: "一定[する]", furigana: "いってい", meaning_en: "certain (something), standardize, fix" },
      { word_id: "n2_2082", word_number: 2082, kanji: "達する", furigana: "たっする", meaning_en: "reach, meet, achieve" },
      { word_id: "n2_2083", word_number: 2083, kanji: "有給休暇／有休", furigana: "ゆうきゅうきゅうか／ゆうきゅう", meaning_en: "paid leave" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 21 社会",
    page_story: "298_2",
    japanese_text: "この<u>キャンペーン</u>は、新型コロナウイルスの流行によって<u>激減し</u>た観光客の数を回復させる狙いがあった。<u>同</u>キャンペーンの<u>実施</u>によって、町の活気も<u>ほんの</u>少し戻りつつある。",
    english_translation: "This campaign was aimed at restoring the number of tourists, which had plummeted due to the outbreak of COVID-19. Running the same campaign has also helped the town regain just a little of its vitality.",
    annotated_words: [
      { word_id: "n2_2084", word_number: 2084, kanji: "キャンペーン", furigana: "きゃんぺーん", meaning_en: "campaign" },
      { word_id: "n2_2085", word_number: 2085, kanji: "激減[する]", furigana: "げきげん", meaning_en: "plummet, drop sharply" },
      { word_id: "n2_2086", word_number: 2086, kanji: "激増[する]", furigana: "げきぞう", meaning_en: "skyrocket, rise sharply" },
      { word_id: "n2_2087", word_number: 2087, kanji: "同～", furigana: "どう", meaning_en: "same ~" },
      { word_id: "n2_2088", word_number: 2088, kanji: "実施[する]", furigana: "じっし", meaning_en: "implementation, run" },
      { word_id: "n2_2089", word_number: 2089, kanji: "ほんの", furigana: "ほんの", meaning_en: "just, mere" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 21 社会",
    page_story: "299_1",
    japanese_text: "<u>正直な</u>ところ、サービスの質が落ちているのではないだろうか。お客様に<u>対して</u>の<u>真心</u>は忘れないでもらいたい。",
    english_translation: "Honestly, I think the quality of your service has declined. I hope you don't neglect your devotion in regard to your customers.",
    annotated_words: [
      { word_id: "n2_2090", word_number: 2090, kanji: "正直な", furigana: "しょうじきな", meaning_en: "honest" },
      { word_id: "n2_2091", word_number: 2091, kanji: "対する", furigana: "たいする", meaning_en: "be related to, in regard to" },
      { word_id: "n2_2092", word_number: 2092, kanji: "真心", furigana: "まごころ", meaning_en: "sincerity, devotion" },
      { word_id: "n2_2093", word_number: 2093, kanji: "真～", furigana: "ま", meaning_en: "true ~" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 21 社会",
    page_story: "299_2",
    japanese_text: "<u>少子化</u>対策に<u>重点</u>を置くなら、出産しやすくするだけでなく、産後<u>充実した</u>育児ができるように、社会の<u>構造</u>そのものを<u>大幅に改善して</u>いく必要がある。",
    english_translation: "Focusing on measures to combat the declining birth rate, we must not only make it easier to give birth, but also significantly improve the very structure of society itself to make raising children more fulfilling.",
    annotated_words: [
      { word_id: "n2_2094", word_number: 2094, kanji: "少子化", furigana: "しょうしか", meaning_en: "declining birth rate" },
      { word_id: "n2_2095", word_number: 2095, kanji: "重点", furigana: "じゅうてん", meaning_en: "focus" },
      { word_id: "n2_2096", word_number: 2096, kanji: "充実[する]", furigana: "じゅうじつ", meaning_en: "fullness, enhance, fulfill" },
      { word_id: "n2_2097", word_number: 2097, kanji: "構造", furigana: "こうぞう", meaning_en: "structure" },
      { word_id: "n2_2098", word_number: 2098, kanji: "大幅な", furigana: "おおはばな", meaning_en: "wide, significant" },
      { word_id: "n2_2099", word_number: 2099, kanji: "改善[する]", furigana: "かいぜん", meaning_en: "improvement, improve" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 21 社会",
    page_story: "300_1",
    japanese_text: "この国では、親や子の<u>介護</u>を家族一人で行うことがあるが、家族だけで<u>面倒をみる</u>ことを<u>当たり前</u>のことにしてはいけない。国は、一人で苦しむことがないように、介護<u>施設</u>や<u>サポート</u>を利用するよう<u>呼びかけて</u>いる。",
    english_translation: "In this country, a family member might be the sole caregiver for a parent or child, but it shouldn't be taken for granted that the family alone will look after the person. The government encourages people to use nursing care facilities and support so that they do not have to suffer alone.",
    annotated_words: [
      { word_id: "n2_2100", word_number: 2100, kanji: "介護[する]", furigana: "かいご", meaning_en: "nursing care, give care" },
      { word_id: "n2_2101", word_number: 2101, kanji: "介護士", furigana: "かいごし", meaning_en: "caregiver" },
      { word_id: "n2_2102", word_number: 2102, kanji: "面倒をみる", furigana: "めんどうをみる", meaning_en: "look after" },
      { word_id: "n2_2103", word_number: 2103, kanji: "面倒", furigana: "めんどう", meaning_en: "trouble" },
      { word_id: "n2_2104", word_number: 2104, kanji: "当たり前", furigana: "あたりまえ", meaning_en: "(something) taken for granted, a matter of course" },
      { word_id: "n2_2105", word_number: 2105, kanji: "施設", furigana: "しせつ", meaning_en: "facility" },
      { word_id: "n2_2106", word_number: 2106, kanji: "サポート[する]", furigana: "さぽーと", meaning_en: "support" },
      { word_id: "n2_2107", word_number: 2107, kanji: "呼びかける", furigana: "よびかける", meaning_en: "call out, encourage" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 21 社会",
    page_story: "300_2",
    japanese_text: "国内<u>輸送</u>の中心はトラックだ。ガソリンの価格が上がれば、それに<u>伴って</u>輸送<u>コスト</u>も上がってしまう。今から<u>案</u>を練っておく必要がある。",
    english_translation: "Trucks are at the very heart of domestic transportation. If the price of gasoline goes up, the cost of transportation will follow. We need to come up with a plan now.",
    annotated_words: [
      { word_id: "n2_2108", word_number: 2108, kanji: "輸送[する]", furigana: "ゆそう", meaning_en: "transportation, transport" },
      { word_id: "n2_2109", word_number: 2109, kanji: "伴う", furigana: "ともなう", meaning_en: "follow, accompany" },
      { word_id: "n2_2110", word_number: 2110, kanji: "コスト", furigana: "こすと", meaning_en: "cost" },
      { word_id: "n2_2111", word_number: 2111, kanji: "案", furigana: "あん", meaning_en: "plan, proposal" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 21 社会",
    page_story: "301_1",
    japanese_text: "子どもを<u>産み</u>たい、<u>子孫</u>を残したいと望み、それを<u>実現し</u>ようとすることも、<u>人権</u>の一つである。どんな理由があっても、その権利を<u>尊重す</u>べきで、<u>奪って</u>はならない。",
    english_translation: "The desire to bear children and leave behind offspring, and the ability to realize this desire, is a basic human right. We must respect this right and not deprive anyone of it, no matter the reason.",
    annotated_words: [
      { word_id: "n2_2112", word_number: 2112, kanji: "産む", furigana: "うむ", meaning_en: "bear, give birth" },
      { word_id: "n2_2113", word_number: 2113, kanji: "子孫", furigana: "しそん", meaning_en: "offspring, progeny" },
      { word_id: "n2_2114", word_number: 2114, kanji: "実現[する]", furigana: "じつげん", meaning_en: "achievement, realize" },
      { word_id: "n2_2115", word_number: 2115, kanji: "人権", furigana: "じんけん", meaning_en: "human right" },
      { word_id: "n2_2116", word_number: 2116, kanji: "尊重[する]", furigana: "そんちょう", meaning_en: "respect" },
      { word_id: "n2_2117", word_number: 2117, kanji: "奪う", furigana: "うばう", meaning_en: "deprive" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 21 社会",
    page_story: "302_1",
    japanese_text: "SNSを使っていると、<u>少数</u>の人に発信しているつもりでも、<u>一斉に</u>広まってしまうこともある。<u>ひょっとしたら</u>誰かを傷つけているかもしれないと<u>仮定して</u>、<u>慎重に</u>言葉を選ぶべきだ。",
    english_translation: "When you use social media, you may think you're sending a message to only a few people, but it could spread all at once. You should choose your words carefully with the assumption that you could possibly hurt someone.",
    annotated_words: [
      { word_id: "n2_2118", word_number: 2118, kanji: "少数", furigana: "しょうすう", meaning_en: "a few" },
      { word_id: "n2_2119", word_number: 2119, kanji: "一斉に", furigana: "いっせいに", meaning_en: "all at once" },
      { word_id: "n2_2120", word_number: 2120, kanji: "ひょっとしたら", furigana: "", meaning_en: "perhaps, possibly" },
      { word_id: "n2_2121", word_number: 2121, kanji: "仮定[する]", furigana: "かてい", meaning_en: "assumption, assume" },
      { word_id: "n2_2122", word_number: 2122, kanji: "慎重な", furigana: "しんちょうな", meaning_en: "careful" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 21 社会",
    page_story: "302_2",
    japanese_text: "危険薬物の使用や詐欺などの<u>罪</u>を犯す未成年が<u>急増し</u>ている。薬物の売買は、インターネットを用いて<u>間接的に</u>行われており、逮捕は難しいが、警察が全力を<u>尽くして</u>いる。",
    english_translation: "There's a rapid increase in minors committing crimes like using dangerous drugs and fraud. The buying and selling of drugs is done indirectly using the internet, making it difficult to make arrests, but the police are doing their best.",
    annotated_words: [
      { word_id: "n2_2123", word_number: 2123, kanji: "罪", furigana: "つみ", meaning_en: "crime, sin" },
      { word_id: "n2_2124", word_number: 2124, kanji: "急増[する]", furigana: "きゅうぞう", meaning_en: "rapid increase, increase rapidly" },
      { word_id: "n2_2125", word_number: 2125, kanji: "間接的な", furigana: "かんせつてきな", meaning_en: "indirect" },
      { word_id: "n2_2126", word_number: 2126, kanji: "直接的な", furigana: "ちょくせつてきな", meaning_en: "direct" },
      { word_id: "n2_2127", word_number: 2127, kanji: "尽くす", furigana: "つくす", meaning_en: "do one's best" }
    ]
  }
];

topic21StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 21 story ${story.story_number}: ${story.page_story}.json`);
});
