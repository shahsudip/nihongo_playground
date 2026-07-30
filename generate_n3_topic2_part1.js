import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const stories = [
  {
    id: "36_1",
    title: "Topic 2",
    japanese_text: "大<ruby>き<rt>おお</rt></ruby>くて<ruby>深<rt>ふか</rt></ruby>い<span class='annotated-word' data-word='フライパン'>フライパン</span>は、<ruby>材料<rt>ざいりょう</rt></ruby>を<ruby>焼<rt>や</rt></ruby>くだけでなく、<span class='annotated-word' data-word='ゆでる'>ゆでたり</span>、<span class='annotated-word' data-word='煮る'><ruby>煮<rt>に</rt></ruby>たり</span>するのにも<ruby>使<rt>つか</rt></ruby>える。ゆでる<ruby>場合<rt>ばあい</rt></ruby>には、<span class='annotated-word' data-word='ふた'>ふた</span>があるとよい。",
    english_translation: "A large and deep frying pan can be used to not only grill ingredients, but also to boil or cook things. When boiling something, it is best to have a lid.",
    annotated_words: [
      { meaning_en: "frying pan", furigana: "", kanji: "フライパン" },
      { meaning_en: "boil", furigana: "ゆでる", kanji: "ゆでる" },
      { meaning_en: "cook, simmer", furigana: "にる", kanji: "煮る" },
      { meaning_en: "boil", furigana: "にえる", kanji: "煮える" },
      { meaning_en: "lid", furigana: "ふた", kanji: "ふた" }
    ]
  },
  {
    id: "36_2",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='湯のみ'><ruby>湯<rt>ゆ</rt></ruby>のみ</span>や<span class='annotated-word' data-word='まな板'>まな<ruby>板<rt>いた</rt></ruby></span>についた<span class='annotated-word' data-word='汚れ'><ruby>汚<rt>よご</rt></ruby>れ</span>は、<ruby>水<rt>みず</rt></ruby>で<span class='annotated-word' data-word='流す'><ruby>流<rt>なが</rt></ruby>す</span>だけでは、なかなか<ruby>取<rt>と</rt></ruby>れない。<ruby>１時間<rt>じかん</rt></ruby>ほど<ruby>漂白剤<rt>ひょうはくざい</rt></ruby>に<span class='annotated-word' data-word='浸ける'><ruby>浸<rt>つ</rt></ruby>けて</span>おくと、<span class='annotated-word' data-word='ぴかぴかな'>ぴかぴかに</span>なる。",
    english_translation: "Dirt stuck on things like teacups and cutting boards is not easy to wash away with only water. If you immerse them in bleach for an hour, they will be sparkling clean.",
    annotated_words: [
      { meaning_en: "teacup", furigana: "ゆのみ", kanji: "湯のみ" },
      { meaning_en: "cutting board", furigana: "まないた", kanji: "まな板" },
      { meaning_en: "dirt", furigana: "よごれ", kanji: "汚れ" },
      { meaning_en: "wash away, flush", furigana: "ながす", kanji: "流す" },
      { meaning_en: "immerse", furigana: "つける", kanji: "浸ける" },
      { meaning_en: "sparkling, shiny", furigana: "", kanji: "ぴかぴかな" }
    ]
  },
  {
    id: "37_1",
    title: "Topic 2",
    japanese_text: "<ruby>使<rt>つか</rt></ruby>った<span class='annotated-word' data-word='食器'><ruby>食器<rt>しょっき</rt></ruby></span>は、<ruby>洗<rt>あら</rt></ruby>ってから、<span class='annotated-word' data-word='シンク'>シンク</span>の<ruby>上<rt>うえ</rt></ruby>の<span class='annotated-word' data-word='戸棚'><ruby>戸棚<rt>とだな</rt></ruby></span>に<span class='annotated-word' data-word='戻す'><ruby>戻<rt>もど</rt></ruby>して</span>ください。<br><span class='annotated-word' data-word='ポット'>ポット</span>はまたすぐに<ruby>使<rt>つか</rt></ruby>うので、<span class='annotated-word' data-word='しまう'>しまわなくて</span>いいです。",
    english_translation: "Wash your used tableware and return it to the cabinet on the sink. Since the pots will be used again soon, you don't have to put them away.",
    annotated_words: [
      { meaning_en: "tableware", furigana: "しょっき", kanji: "食器" },
      { meaning_en: "sink", furigana: "", kanji: "シンク" },
      { meaning_en: "sink", furigana: "ながし", kanji: "流し" },
      { meaning_en: "cabinet", furigana: "とだな", kanji: "戸棚" },
      { meaning_en: "return", furigana: "もどす", kanji: "戻す" },
      { meaning_en: "pot", furigana: "", kanji: "ポット" },
      { meaning_en: "put away", furigana: "しまう", kanji: "しまう" }
    ]
  },
  {
    id: "37_2",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='ほこり'>ほこり</span>は<ruby>部屋<rt>へや</rt></ruby>の<span class='annotated-word' data-word='隅'><ruby>隅<rt>すみ</rt></ruby></span>にたまります。<span class='annotated-word' data-word='床'><ruby>床<rt>ゆか</rt></ruby></span>をよく<ruby>掃除<rt>そうじ</rt></ruby>しましょう。",
    english_translation: "Dust can accumulate in the corners of rooms. Be sure to clean the floor well.",
    annotated_words: [
      { meaning_en: "dust", furigana: "", kanji: "ほこり" },
      { meaning_en: "corner", furigana: "すみ", kanji: "隅" },
      { meaning_en: "floor", furigana: "ゆか", kanji: "床" }
    ]
  },
  {
    id: "38_1",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='一人暮らし'><ruby>一人暮<rt>ひとりぐ</rt></ruby>らし</span>を<ruby>始<rt>はじ</rt></ruby>めたばかりなので、<ruby>家<rt>いえ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>はまだ<ruby>全然<rt>ぜんぜん</rt></ruby><span class='annotated-word' data-word='片付く'><ruby>片付<rt>かたづ</rt></ruby>いて</span>いない。<ruby>早<rt>はや</rt></ruby>く<ruby>必要<rt>ひつよう</rt></ruby>な<span class='annotated-word' data-word='家具'><ruby>家具<rt>かぐ</rt></ruby></span>をそろえて、<span class='annotated-word' data-word='家事'><ruby>家事<rt>かじ</rt></ruby></span>にも<ruby>慣<rt>な</rt></ruby>れたいと<ruby>思<rt>おも</rt></ruby>う。",
    english_translation: "Since I just started living alone, I haven't cleaned up my home at all yet. I want to hurry up and get all the furniture I need and get used to doing housework.",
    annotated_words: [
      { meaning_en: "living alone", furigana: "ひとりぐらし", kanji: "一人暮らし" },
      { meaning_en: "clean up, tidy up", furigana: "かたづく", kanji: "片付く" },
      { meaning_en: "furniture", furigana: "かぐ", kanji: "家具" },
      { meaning_en: "housework", furigana: "かじ", kanji: "家事" }
    ]
  },
  {
    id: "38_2",
    title: "Topic 2",
    japanese_text: "A：<ruby>忙<rt>いそが</rt></ruby>しそうだから、<ruby>何<rt>なに</rt></ruby>か<span class='annotated-word' data-word='手伝う'><ruby>手伝<rt>てつだ</rt></ruby>おう</span>か？<br>B：ありがとう。じゃあ、<ruby>部屋<rt>へや</rt></ruby>の<span class='annotated-word' data-word='後片付け'><ruby>後片付<rt>あとかたづ</rt></ruby>け</span>をしてくれない？<br>A：うん、<ruby>子<rt>こ</rt></ruby>どもが<span class='annotated-word' data-word='出す'><ruby>出<rt>だ</rt></ruby>した</span>おもちゃを<ruby>片付<rt>かたづ</rt></ruby>けるよ。<br>B：その<ruby>後<rt>あと</rt></ruby>、<ruby>玄関<rt>げんかん</rt></ruby>を<span class='annotated-word' data-word='掃く'><ruby>掃<rt>は</rt></ruby>いて</span>くれたらうれしいな。<br>A：わかった。",
    english_translation: "A: You look busy, so is there anything I can do to help? B: Thank you. Then, can you clean up this room after we're done? A: Yeah, I'll clean up the toys our kid took out. B: Also, I'd appreciate it if you could sweep the entrance. A: Okay.",
    annotated_words: [
      { meaning_en: "help", furigana: "てつだう", kanji: "手伝う" },
      { meaning_en: "cleaning up after, clean up after", furigana: "あとかたづけ", kanji: "後片付け" },
      { meaning_en: "put out", furigana: "だす", kanji: "出す" },
      { meaning_en: "sweep", furigana: "はく", kanji: "掃く" }
    ]
  },
  {
    id: "39_1",
    title: "Topic 2",
    japanese_text: "<ruby>私<rt>わたし</rt></ruby>の<ruby>趣味<rt>しゅみ</rt></ruby>は<ruby>洗濯<rt>せんたく</rt></ruby>です。<span class='annotated-word' data-word='洗濯物'><ruby>洗濯物<rt>せんたくもの</rt></ruby></span>を<span class='annotated-word' data-word='干す'><ruby>干<rt>ほ</rt></ruby>す</span>ときは、<ruby>濃<rt>こ</rt></ruby>い<ruby>色<rt>いろ</rt></ruby>の<ruby>服<rt>ふく</rt></ruby>は<span class='annotated-word' data-word='裏返す'><ruby>裏返<rt>うらがえ</rt></ruby>して</span>干すと<ruby>色<rt>いろ</rt></ruby>が<ruby>落<rt>お</rt></ruby>ちません。<span class='annotated-word' data-word='乾く'><ruby>乾<rt>かわ</rt></ruby>いた</span>洗濯物は、<ruby>日<rt>ひ</rt></ruby>が<ruby>暮<rt>く</rt></ruby>れるまでに<ruby>取<rt>と</rt></ruby>り<ruby>込<rt>こ</rt></ruby>みましょう。<ruby>太陽<rt>たいよう</rt></ruby>の<ruby>匂<rt>にお</rt></ruby>いのする洗濯物を<span class='annotated-word' data-word='畳む'><ruby>畳<rt>たた</rt></ruby>む</span>のは<ruby>幸<rt>しあわ</rt></ruby>せです。",
    english_translation: "My hobby is doing laundry. When hanging out the laundry to dry, I turn my dark-colored clothes inside-out so the colors don't run. Be sure to take in dry laundry by the time the sun goes down. Folding laundry that smells the sun makes me happy.",
    annotated_words: [
      { meaning_en: "laundry", furigana: "せんたくもの", kanji: "洗濯物" },
      { meaning_en: "dry", furigana: "ほす", kanji: "干す" },
      { meaning_en: "turn inside out, turn over", furigana: "うらがえす", kanji: "裏返す" },
      { meaning_en: "be dried", furigana: "かわく", kanji: "乾く" },
      { meaning_en: "dry", furigana: "かわかす", kanji: "乾かす" },
      { meaning_en: "fold", furigana: "たたむ", kanji: "畳む" }
    ]
  },
  {
    id: "39_2",
    title: "Topic 2",
    japanese_text: "<span class='annotated-word' data-word='掃除用具'><ruby>掃除用具<rt>そうじようぐ</rt></ruby></span>は<span class='annotated-word' data-word='まとめる'>まとめて</span><span class='annotated-word' data-word='洗面所'><ruby>洗面所<rt>せんめんじょ</rt></ruby></span>に<ruby>置<rt>お</rt></ruby>いてあります。",
    english_translation: "Cleaning equipment is all stored together in the washroom.",
    annotated_words: [
      { meaning_en: "cleaning equipment", furigana: "そうじようぐ", kanji: "掃除用具" },
      { meaning_en: "equipment, tool", furigana: "ようぐ", kanji: "用具" },
      { meaning_en: "put together, summarize", furigana: "まとめる", kanji: "まとめる" },
      { meaning_en: "be put together, be summarized", furigana: "まとまる", kanji: "まとまる" },
      { meaning_en: "washroom", furigana: "せんめんじょ", kanji: "洗面所" }
    ]
  },
  {
    id: "40_1",
    title: "Topic 2",
    japanese_text: "<ruby>古<rt>ふる</rt></ruby>くなった<span class='annotated-word' data-word='タオル'>タオル</span>は<span class='annotated-word' data-word='雑巾'><ruby>雑巾<rt>ぞうきん</rt></ruby></span>にします。タオルをミシンで<span class='annotated-word' data-word='縫う'><ruby>縫<rt>ぬ</rt></ruby>って</span>もいいし、<span class='annotated-word' data-word='針'><ruby>針<rt>はり</rt></ruby></span>と<ruby>糸<rt>いと</rt></ruby>を<ruby>使<rt>つか</rt></ruby>って<ruby>自分<rt>じぶん</rt></ruby>で<ruby>縫<rt>ぬ</rt></ruby>ってもいいです。雑巾は、<ruby>床<rt>ゆか</rt></ruby>を<span class='annotated-word' data-word='拭く'><ruby>拭<rt>ふ</rt></ruby>く</span>ときなどに<ruby>使<rt>つか</rt></ruby>うことができます。",
    english_translation: "I use old towels as rags. You can sew the towels with a sewing machine, or you can sew them by yourself using a needle and thread. These rags can be used to wipe the floor.",
    annotated_words: [
      { meaning_en: "towel", furigana: "", kanji: "タオル" },
      { meaning_en: "rag", furigana: "ぞうきん", kanji: "雑巾" },
      { meaning_en: "sew", furigana: "ぬう", kanji: "縫う" },
      { meaning_en: "needle", furigana: "はり", kanji: "針" },
      { meaning_en: "wipe", furigana: "ふく", kanji: "拭く" }
    ]
  },
  {
    id: "40_2",
    title: "Topic 2",
    japanese_text: "<ruby>仕事<rt>しごと</rt></ruby>が<ruby>忙<rt>いそが</rt></ruby>しくて<span class='annotated-word' data-word='不規則な'><ruby>不規則<rt>ふきそく</rt></ruby>な</span><ruby>生活<rt>せいかつ</rt></ruby>が<ruby>続<rt>つづ</rt></ruby>いた。<ruby>食事<rt>しょくじ</rt></ruby>は<span class='annotated-word' data-word='インスタント食品'>インスタント<ruby>食品<rt>しょくひん</rt></ruby></span>ばかりで、<ruby>部屋<rt>へや</rt></ruby>も<span class='annotated-word' data-word='散らかる'><ruby>散<rt>ち</rt></ruby>らかった</span>ままだ。",
    english_translation: "I was busy with work as my irregular life continued. All I eat is instant food, and my room stays messy.",
    annotated_words: [
      { meaning_en: "irregular, unsteadiness", furigana: "ふきそくな", kanji: "不規則な" },
      { meaning_en: "instant food", furigana: "インスタントしょくひん", kanji: "インスタント食品" },
      { meaning_en: "be scattered", furigana: "ちらかる", kanji: "散らかる" },
      { meaning_en: "scatter", furigana: "ちらかす", kanji: "散らかす" }
    ]
  },
  {
    id: "41_1",
    title: "Topic 2",
    japanese_text: "みそ<ruby>汁<rt>しる</rt></ruby>の<ruby>作<rt>つく</rt></ruby>り<ruby>方<rt>かた</rt></ruby>は<ruby>簡単<rt>かんたん</rt></ruby>です。だしを<ruby>取<rt>と</rt></ruby>って、<span class='annotated-word' data-word='材料'><ruby>材料<rt>ざいりょう</rt></ruby></span>を<ruby>入<rt>い</rt></ruby>れて<ruby>煮<rt>に</rt></ruby>ます。<ruby>最後<rt>さいご</rt></ruby>に<span class='annotated-word' data-word='おたま'>おたま</span>でみそを<span class='annotated-word' data-word='溶く'><ruby>溶<rt>と</rt></ruby>いたら</span><span class='annotated-word' data-word='でき上がり'>でき<ruby>上<rt>あ</rt></ruby>がり</span>です。",
    english_translation: "Making miso soup is easy. Take the stock, add the ingredients and then cook it. Lastly, dissolve the miso using a ladle, and it's finished.",
    annotated_words: [
      { meaning_en: "ingredients, materials", furigana: "ざいりょう", kanji: "材料" },
      { meaning_en: "ladle", furigana: "", kanji: "おたま" },
      { meaning_en: "melt", furigana: "とく", kanji: "溶く" },
      { meaning_en: "finished, complete", furigana: "できあがり", kanji: "でき上がり" },
      { meaning_en: "be finished", furigana: "できあがる", kanji: "でき上がる" }
    ]
  },
  {
    id: "41_2",
    title: "Topic 2",
    japanese_text: "A：<ruby>少<rt>すこ</rt></ruby>し<ruby>体<rt>からだ</rt></ruby>が<span class='annotated-word' data-word='だるい'>だるい</span>から、<ruby>今<rt>いま</rt></ruby>からちょっと<span class='annotated-word' data-word='昼寝'><ruby>昼寝<rt>ひるね</rt></ruby></span>するよ。<br>B：アルバイトはどうするの？<br>A：それは<ruby>行<rt>い</rt></ruby>くから、３<ruby>時<rt>じ</rt></ruby>に<ruby>起<rt>お</rt></ruby>こしてくれない？<br>B：<ruby>分<rt>わ</rt></ruby>かった。<br>A：<span class='annotated-word' data-word='ちゃんと'>ちゃんと</span><ruby>起<rt>お</rt></ruby>こしてね。",
    english_translation: "A: I'm feeling a little sluggish, so I'm going to take a short nap now. B: What are you going to do about your part-time job? A: I'll be going, so could you wake me up at 3 o'clock? B: Okay. A: Be sure to wake me up properly.",
    annotated_words: [
      { meaning_en: "sluggish", furigana: "", kanji: "だるい" },
      { meaning_en: "nap, take a nap", furigana: "ひるね", kanji: "昼寝" },
      { meaning_en: "properly", furigana: "", kanji: "ちゃんと" }
    ]
  }
];

for (const story of stories) {
  const filePath = path.join(outDir, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Generated ${story.id}.json`);
}
console.log(`\\nDone! Generated ${stories.length} stories.`);
