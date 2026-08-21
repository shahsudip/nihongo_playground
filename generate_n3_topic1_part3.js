import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

const stories = [
  // Story 20 (🔊20) - Page 28
  {
    id: "28_1",
    title: "Topic 1",
    japanese_text: "この<ruby>店<rt>みせ</rt></ruby>の<span class='annotated-word' data-word='スイーツ'>スイーツ</span>は<span class='annotated-word' data-word='クリーム'>クリーム</span>をたくさん<ruby>使<rt>つか</rt></ruby>っていて、<ruby>食<rt>た</rt></ruby>べるといつも<span class='annotated-word' data-word='幸せな'><ruby>幸<rt>しあわ</rt></ruby>せな</span><ruby>気分<rt>きぶん</rt></ruby>になる。<ruby>問題<rt>もんだい</rt></ruby>は、すぐに<span class='annotated-word' data-word='売り切れる'><ruby>売<rt>う</rt></ruby>り<ruby>切<rt>き</rt></ruby>れる</span>ことと、<ruby>大<rt>おお</rt></ruby>きいので、<span class='annotated-word' data-word='おやつ'>おやつ</span>に<ruby>食<rt>た</rt></ruby>べると<ruby>夕食<rt>ゆうしょく</rt></ruby>があまり<ruby>食<rt>た</rt></ruby>べられなくなることだ。",
    english_translation: "The sweets in this shop use a lot of cream, and I always feel happy when I eat them. The problem is that they sell out quickly, and they're so big that you won't be able to eat much dinner after you eat one as a snack.",
    annotated_words: [
      { meaning_en: "sweets", furigana: "", kanji: "スイーツ" },
      { meaning_en: "cream", furigana: "", kanji: "クリーム" },
      { meaning_en: "happy, joy", furigana: "しあわせ", kanji: "幸せな" },
      { meaning_en: "be sold out", furigana: "うりきれる", kanji: "売り切れる" },
      { meaning_en: "sold out", furigana: "うりきれ", kanji: "売り切れ" },
      { meaning_en: "snack", furigana: "", kanji: "おやつ" }
    ]
  },
  // Story 21 (🔊21) - Pages 28-29
  {
    id: "28_2",
    title: "Topic 1",
    japanese_text: "<ruby>国際<rt>こくさい</rt></ruby><ruby>交流<rt>こうりゅう</rt></ruby>のサークルで<ruby>知<rt>し</rt></ruby>り<ruby>合<rt>あ</rt></ruby>った<span class='annotated-word' data-word='方'><ruby>方<rt>かた</rt></ruby></span>に、<span class='annotated-word' data-word='ランチ'>ランチ</span>をおごってもらった。そのときは2<ruby>人<rt>ふたり</rt></ruby>だけだったが、<ruby>冬<rt>ふゆ</rt></ruby>に<span class='annotated-word' data-word='機会'><ruby>機会<rt>きかい</rt></ruby></span>があったら、<ruby>他<rt>ほか</rt></ruby>のメンバーも<ruby>一緒<rt>いっしょ</rt></ruby>に<span class='annotated-word' data-word='鍋'><ruby>鍋<rt>なべ</rt></ruby></span>を<ruby>食<rt>た</rt></ruby>べる<span class='annotated-word' data-word='会'><ruby>会<rt>かい</rt></ruby></span>を<ruby>開<rt>ひら</rt></ruby>きたい。",
    english_translation: "A person I met in an international exchange club bought me lunch. At that time, there were only two people, but if I have a chance in winter, I would like to hold a hot pot eating party with other members.",
    annotated_words: [
      { meaning_en: "person (honorific)", furigana: "かた", kanji: "方" },
      { meaning_en: "lunch", furigana: "", kanji: "ランチ" },
      { meaning_en: "breakfast", furigana: "", kanji: "モーニング" },
      { meaning_en: "dinner", furigana: "", kanji: "ディナー" },
      { meaning_en: "treat someone (to a meal)", furigana: "", kanji: "おごる" },
      { meaning_en: "opportunity", furigana: "きかい", kanji: "機会" },
      { meaning_en: "pot", furigana: "なべ", kanji: "鍋" },
      { meaning_en: "party, meeting", furigana: "かい", kanji: "会" }
    ]
  },
  // Story 22 (🔊22) - Page 29
  {
    id: "29_1",
    title: "Topic 1",
    japanese_text: "<span class='annotated-word' data-word='餅'><ruby>餅<rt>もち</rt></ruby></span>は、「もち<ruby>米<rt>ごめ</rt></ruby>」という<ruby>特別<rt>とくべつ</rt></ruby>な<ruby>米<rt>こめ</rt></ruby>を<span class='annotated-word' data-word='蒸す'><ruby>蒸<rt>む</rt></ruby>した</span><ruby>後<rt>あと</rt></ruby>、うすときねでついて<ruby>作<rt>つく</rt></ruby>る。<ruby>焼<rt>や</rt></ruby>いたり<ruby>茹<rt>ゆ</rt></ruby>でたりするほか、<span class='annotated-word' data-word='あんこ'>あんこ</span>を<span class='annotated-word' data-word='くるむ'>くるんで</span>お<ruby>菓子<rt>かし</rt></ruby>としても<ruby>食<rt>た</rt></ruby>べられる。また、もち<ruby>米<rt>ごめ</rt></ruby>は<ruby>普通<rt>ふつう</rt></ruby>のお<ruby>米<rt>こめ</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じように<span class='annotated-word' data-word='炊く'><ruby>炊<rt>た</rt></ruby>く</span>こともできる。<ruby>赤飯<rt>せきはん</rt></ruby>はもち<ruby>米<rt>ごめ</rt></ruby>を<ruby>炊<rt>た</rt></ruby>いて<ruby>作<rt>つく</rt></ruby>る。",
    english_translation: "Mochi is made by steaming a special type of rice called mochigome and then using mortar and pestle. In addition to baking or boiling it, you can also wrap it in sweet bean paste and eat it as sweets. In addition, mochigome can be cooked in the same way as ordinary rice. Red rice is made by cooking mochigome.",
    annotated_words: [
      { meaning_en: "mochi, pounded rice cake", furigana: "もち", kanji: "餅" },
      { meaning_en: "steam", furigana: "むす", kanji: "蒸す" },
      { meaning_en: "anko, sweet bean paste", furigana: "", kanji: "あんこ" },
      { meaning_en: "wrap", furigana: "", kanji: "くるむ" },
      { meaning_en: "cook", furigana: "たく", kanji: "炊く" }
    ]
  },
  // Story 23 (🔊23) - Page 30
  {
    id: "30_1",
    title: "Topic 1",
    japanese_text: "A：あ、<ruby>私<rt>わたし</rt></ruby>は<span class='annotated-word' data-word='ノンアルコール'>ノンアルコール</span>ビールで。<br>B：え、<ruby>飲<rt>の</rt></ruby>まないの？<br>A：うん、ちょっと<ruby>医者<rt>いしゃ</rt></ruby>に<span class='annotated-word' data-word='肝臓'><ruby>肝臓<rt>かんぞう</rt></ruby></span>が<ruby>悪<rt>わる</rt></ruby>いと<ruby>言<rt>い</rt></ruby>われて。<span class='annotated-word' data-word='飲酒'><ruby>飲酒<rt>いんしゅ</rt></ruby></span>は<ruby>週<rt>しゅう</rt></ruby>2<ruby>回<rt>かい</rt></ruby>に<ruby>制限<rt>せいげん</rt></ruby>してるんだ。",
    english_translation: "A: Oh, I'll have the non-alcoholic beer. B: Huh, don't you drink? A: Yeah, my doctor said that my liver is a little bad. So, I only drink twice a week.",
    annotated_words: [
      { meaning_en: "non-alcoholic (drink)", furigana: "", kanji: "ノンアルコール" },
      { meaning_en: "liver", furigana: "かんぞう", kanji: "肝臓" },
      { meaning_en: "drinking alcohol, drink alcohol", furigana: "いんしゅ", kanji: "飲酒[する]" }
    ]
  },
  // Story 24 (🔊24) - Page 30
  {
    id: "30_2",
    title: "Topic 1",
    japanese_text: "<ruby>塩<rt>しお</rt></ruby>は<ruby>人間<rt>にんげん</rt></ruby>にとって、<ruby>最<rt>もっと</rt></ruby>も<ruby>基本的<rt>きほんてき</rt></ruby>な<span class='annotated-word' data-word='調味料'><ruby>調味料<rt>ちょうみりょう</rt></ruby></span>の1つだ。<ruby>塩<rt>しお</rt></ruby>は<span class='annotated-word' data-word='海水'><ruby>海水<rt>かいすい</rt></ruby></span>から<ruby>作<rt>つく</rt></ruby>られる。だから、<ruby>海水<rt>かいすい</rt></ruby>を<span class='annotated-word' data-word='舌'><ruby>舌<rt>した</rt></ruby></span>で<span class='annotated-word' data-word='なめる'>なめる</span>と、<span class='annotated-word' data-word='塩辛い'><ruby>塩辛<rt>しおから</rt></ruby>い</span><ruby>味<rt>あじ</rt></ruby>がする。",
    english_translation: "Salt is one of the most basic seasonings for humans. Salt is made from seawater. So, if you lick seawater with your tongue, it tastes salty.",
    annotated_words: [
      { meaning_en: "seasoning", furigana: "ちょうみりょう", kanji: "調味料" },
      { meaning_en: "seawater", furigana: "かいすい", kanji: "海水" },
      { meaning_en: "tongue", furigana: "した", kanji: "舌" },
      { meaning_en: "lick", furigana: "", kanji: "なめる" },
      { meaning_en: "salty", furigana: "しおからい", kanji: "塩辛い" },
      { meaning_en: "salty", furigana: "", kanji: "しょっぱい" }
    ]
  }
];

// Write each story to a JSON file
for (const story of stories) {
  const filePath = path.join(outDir, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Generated ${story.id}.json`);
}
console.log(`\nDone! Generated ${stories.length} stories for Topic 1 (Part 3).`);
