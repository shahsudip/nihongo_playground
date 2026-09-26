const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

// Manually corrected Japanese text with <u> tags in the exact order of the annotated_words
const correctedTexts = {
  "128_1": "A：この<u><ruby>金属<rt>きんぞく</rt></ruby></u>の<ruby>棒<rt>ぼう</rt></ruby>は<ruby>何<rt>なに</rt></ruby>をするためのものですか。<br>B：ああ、これは<ruby>動物<rt>どうぶつ</rt></ruby>の<ruby>体重<rt>たいじゅう</rt></ruby>を<u><ruby>確認<rt>かくにん</rt></ruby>する</u>ためのものですよ。<br>A：へえ〜、これで<ruby>測<rt>はか</rt></ruby>るんですね。<br>B：あとで<ruby>園長<rt>えんちょう</rt></ruby>に<u><ruby>許可<rt>きょか</rt></ruby></u>をもらったら、<ruby>試<rt>ため</rt></ruby>しに<ruby>使<rt>つか</rt></ruby>ってみましょうか。",
  "128_2": "あのおじいさんは<ruby>毎朝<rt>まいあさ</rt></ruby><u><ruby>釣<rt>つ</rt></ruby>り</u>に<ruby>行<rt>い</rt></ruby>く<ruby>前<rt>まえ</rt></ruby>に<ruby>必<rt>かなら</rt></ruby>ずこの<ruby>公園<rt>こうえん</rt></ruby>に<ruby>来<rt>き</rt></ruby>て、７<u><ruby>羽<rt>わ</rt></ruby></u>の<ruby>鳩<rt>はと</rt></ruby>に<u>バケツ</u>いっぱいの<u><ruby>豆<rt>まめ</rt></ruby></u>を<u>やる</u>ことを<ruby>日課<rt>にっか</rt></ruby>にしている。", // "釣る" is in vocab but not in text. To keep index aligned, we must either remove "釣る" from vocab or add a dummy <u>. Wait! If "釣る" is not in text, and React matches sequentially, then "羽" will get the meaning of "釣る"! I must filter out unused vocab or insert dummy. Let's filter out unused vocab in the code below!
  "129_1": "A：<ruby>小動物<u>館<rt>かん</rt></ruby></u>が<ruby>休館<rt>きゅうかん</rt></ruby>になってましたが、<u>なんで</u>でしょうかね。<br>B：ああ、リスに<ruby>続<rt>つづ</rt></ruby>いて、<ruby>昨夜<rt>さくや</rt></ruby>、うさぎが<ruby>死<rt>し</rt></ruby>んでしまったみたいです。<br>A：そうですか。みんなで<u>かわいがって</u>いたのに、<ruby>残念<rt>ざんねん</rt></ruby>ですね。つらいことは<u><ruby>重<rt>かさ</rt></ruby>なる</u>ものですね。", // "重ねる" not in text
  "129_2": "A：<ruby>見<rt>み</rt></ruby>て<ruby>見<rt>み</rt></ruby>て、あの<u><ruby>猿<rt>さる</rt></ruby></u>、ちっちゃい<u><ruby>枕<rt>まくら</rt></ruby></u>を<u><ruby>抱<rt>だ</rt></ruby>いて</u>る。<br>B：そうそう、<ruby>寝<rt>ね</rt></ruby>るときに<ruby>枕<rt>まくら</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うから、「ピロー」って<ruby>名前<rt>なまえ</rt></ruby>らしいよ。", // 抱いて for 抱く
  "130_1": "A：あの<u>からす</u>、ずっとあの<u><ruby>枝<rt>えだ</rt></ruby></u>の<ruby>上<rt>うえ</rt></ruby>で<u>じっとして</u>いるね。<br>B：ははは、あれ<u><ruby>本物<rt>ほんもの</rt></ruby></u>じゃないよ。", // じっとして for じっとする
  "130_2": "A：<ruby>息子<rt>むすこ</rt></ruby>さん、<u><ruby>成長<rt>せいちょう</rt></ruby></u>したね。そのうち、お<ruby>父<rt>とう</rt></ruby>さんの<ruby>背<rt>せ</rt></ruby>も<u><ruby>追<rt>お</rt></ruby>い<ruby>越<rt>こ</rt></ruby>し</u>そうね。<br>B：そうなの。ちょっと<ruby>前<rt>まえ</rt></ruby>までは<ruby>子<rt>こ</rt></ruby>どもだったのに、そのうち<ruby>就職<rt>しゅうしょく</rt></ruby>や<ruby>結婚<rt>けっこん</rt></ruby>で<ruby>家<rt>いえ</rt></ruby>を<ruby>出<rt>で</rt></ruby>る<ruby>日<rt>ひ</rt></ruby>が<ruby>来<rt>く</rt></ruby>るなんて、<ruby>想像<rt>そうぞう</rt></ruby>するだけで<u><ruby>恐<rt>おそ</rt></ruby>ろしい</u>わ。<br>A：あはは。<u><ruby>冗談<rt>じょうだん</rt></ruby></u>でしょ。かわいい<ruby>子<rt>こ</rt></ruby>には<ruby>旅<rt>たび</rt></ruby>をさせろって<ruby>言<rt>い</rt></ruby>うじゃない。", // "ジョーク" not in text
  "131_1": "<u><ruby>生物<rt>せいぶつ</rt></ruby></u>の<ruby>授業<rt>じゅぎょう</rt></ruby>で、<u><ruby>真<rt>ま</rt></ruby>っ<ruby>赤<rt>か</rt></ruby>な</u><ruby>羽<rt>はね</rt></ruby>に<ruby>黒<rt>くろ</rt></ruby>い<u><ruby>模様<rt>もよう</rt></ruby></u>がある<u><ruby>虫<rt>むし</rt></ruby></u>の<ruby>観察<rt>かんさつ</rt></ruby>をした。<ruby>虫<rt>むし</rt></ruby>は<ruby>苦手<rt>にがて</rt></ruby>だったが、いろんな<u><ruby>特徴<rt>とくちょう</rt></ruby></u>をノートにまとめる<ruby>作業<rt>さぎょう</rt></ruby>が<ruby>面白<rt>おもしろ</rt></ruby>くて、いつの<ruby>間<rt>ま</rt></ruby>にか<ruby>好<rt>す</rt></ruby>きに<u>なって</u>いた。", // 真っ青な, 水玉模様 not in text. なる -> なって
  "132_1": "<ruby>私<rt>わたし</rt></ruby>は<u><ruby>植物<rt>しょくぶつ</rt></ruby></u>を<ruby>見<rt>み</rt></ruby>るのは<ruby>好<rt>す</rt></ruby>きだが<ruby>育<rt>そだ</rt></ruby>てるのは<ruby>苦手<rt>にがて</rt></ruby>だ。この<ruby>間<rt>あいだ</rt></ruby>も、<ruby>水<rt>みず</rt></ruby>をやるのを<ruby>忘<rt>わす</rt></ruby>れてしまって、<ruby>観葉植物<rt>かんようしょくぶつ</rt></ruby>がすっかり<u><ruby>枯<rt>か</rt></ruby>れて</u>しまった。<u>かわいそうな</u>ことをした。", // 枯れる -> 枯れて
  "132_2": "<ruby>動物<rt>どうぶつ</rt></ruby>を<u><ruby>飼<rt>か</rt></ruby>う</u>ことは<u><ruby>命<rt>いのち</rt></ruby></u>を<ruby>預<rt>あず</rt></ruby>かることである。<ruby>最後<rt>さいご</rt></ruby>まで<u><ruby>責任<rt>せきにん</rt></ruby></u>を<ruby>持<rt>も</rt></ruby>って<u><ruby>育<rt>そだ</rt></ruby>てる</u>ことができない<ruby>人<rt>ひと</rt></ruby>に<ruby>動物<rt>どうぶつ</rt></ruby>を<ruby>飼<rt>か</rt></ruby>う<ruby>資格<rt>しかく</rt></ruby>はない。", // 責任者, 育つ not in text
  "133_1": "<ruby>日本<rt>にほん</rt></ruby>は、<ruby>世界<rt>せかい</rt></ruby>の<ruby>中<rt>なか</rt></ruby>でも<u><ruby>水族館<rt>すいぞくかん</rt></ruby></u>が<ruby>多<rt>おお</rt></ruby>いことで<ruby>有名<rt>ゆうめい</rt></ruby>だ。<ruby>水族館<rt>すいぞくかん</rt></ruby>ではたくさんの<u><ruby>種類<rt>しゅるい</rt></ruby></u>の<ruby>魚<rt>さかな</rt></ruby>たちを<ruby>見<rt>み</rt></ruby>ることができるだけでなく、イルカのショーを<ruby>見<rt>み</rt></ruby>たり、ペンギンやサメに<u><ruby>餌<rt>えさ</rt></ruby></u>をやることもできる。",
  "133_2": "A：わあ、<ruby>部屋<rt>へや</rt></ruby>の<ruby>中<rt>なか</rt></ruby>にカメムシがいる。<br>B：つぶすと<u><ruby>臭<rt>くさ</rt></ruby>い</u>から、つぶさないように<u>ティッシュ</u>で<u><ruby>捕<rt>つか</rt></ruby>まえて</u><ruby>窓<rt>まど</rt></ruby>の<ruby>外<rt>そと</rt></ruby>へ<ruby>出<rt>だ</rt></ruby>して。", // トイレットペーパー, 捕まる not in text
  "134_1": "A：どうしたんですか。<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>ですか。<br>B：あ、すみません。<u><ruby>立<rt>た</rt></ruby>ち<ruby>上<rt>あ</rt></ruby>がろう</u>とした<u><ruby>際<rt>さい</rt></ruby></u>に、<u><ruby>突然<rt>とつぜん</rt></ruby></u><ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>が<ruby>真<rt>ま</rt></ruby>っ<ruby>暗<rt>くら</rt></ruby>になって…。<br>A：えっと、まずはこの<u><ruby>平<rt>たい</rt></ruby>らな</u>ところに<u>そっと</u><ruby>座<rt>すわ</rt></ruby>ってください。ゆっくりでいいですよ。<ruby>今<rt>いま</rt></ruby>、<ruby>救急車<rt>きゅうきゅうしゃ</rt></ruby><ruby>呼<rt>よ</rt></ruby>びますね。", // 立ち上げる not in text
  "134_2": "<u><ruby>天井<rt>てんじょう</rt></ruby></u>にカビが<u><ruby>生<rt>は</rt></ruby>えている</u>のを<u><ruby>発見<rt>はっけん</rt></ruby></u>して、<ruby>思<rt>おも</rt></ruby>わず<ruby>大<rt>おお</rt></ruby>きな<ruby>声<rt>こえ</rt></ruby>を<ruby>出<rt>だ</rt></ruby>してしまった。",
  "135_1": "<ruby>隣<rt>となり</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>の<ruby>子<rt>こ</rt></ruby>は<u>おとなしい</u><u><ruby>性格<rt>せいかく</rt></ruby></u>で、あまり<u><ruby>感情的<rt>かんじょうてき</rt></ruby>な</u>ところを<ruby>見<rt>み</rt></ruby>たことがない。だけど、<ruby>私<rt>わたし</rt></ruby>に<ruby>気<rt>き</rt></ruby>がつくといつも<u><ruby>立<rt>た</rt></ruby>ち<ruby>止<rt>ど</rt></ruby>まって</u><u>にっこりと</u><ruby>笑<rt>わら</rt></ruby>ってくれる。", // 感情 not in text
  "135_2": "A：<ruby>見<rt>み</rt></ruby>て<ruby>見<rt>み</rt></ruby>て。<u><ruby>象<rt>ぞう</rt></ruby></u>の<u><ruby>親子<rt>おやこ</rt></ruby></u>が<ruby>鼻<rt>はな</rt></ruby>を<ruby>合<rt>あ</rt></ruby>わせて<ruby>遊<rt>あそ</rt></ruby>んでる。<br>B：<ruby>本当<rt>ほんとう</rt></ruby>だ。<ruby>自由<rt>じゆう</rt></ruby>に<ruby>鼻<rt>はな</rt></ruby>を<ruby>動<rt>うご</rt></ruby>かせるんだね。<br>A：うん、<ruby>象<rt>ぞう</rt></ruby>の<ruby>鼻<rt>はな</rt></ruby>って<u><ruby>骨<rt>ほね</rt></ruby></u>がないらしいよ。",
  "136_1": "<ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>愛犬<rt>あいけん</rt></ruby>の<ruby>毛<rt>け</rt></ruby>を<u>ブラシ</u>でとかして、<u><ruby>爪<rt>つめ</rt></ruby></u>を<ruby>切<rt>き</rt></ruby>っている。しっぽを<u><ruby>振<rt>ふ</rt></ruby>って</u><ruby>喜<rt>よろこ</rt></ruby>んでくれる<ruby>姿<rt>すがた</rt></ruby>がとてもかわいく、<u><ruby>心<rt>こころ</rt></ruby></u>が<ruby>癒<rt>いや</rt></ruby>される。",
  "136_2": "<u><ruby>幼児<rt>ようじ</rt></ruby></u>は<ruby>集団生活<rt>しゅうだんせいかつ</rt></ruby>を<ruby>通<rt>とお</rt></ruby>して、<ruby>相手<rt>あいて</rt></ruby>の<ruby>気持<rt>きも</rt></ruby>ちを<u><ruby>理解<rt>りかい</rt></ruby></u>したり、<u><ruby>仲間<rt>なかま</rt></ruby></u>を<u><ruby>助<rt>たす</rt></ruby>ける</u>ことを<ruby>学<rt>まな</rt></ruby>ぶ。", // 助かる not in text
  "137_1": "A：<ruby>最近<rt>さいきん</rt></ruby>、<ruby>犬<rt>いぬ</rt></ruby>を<ruby>飼<rt>か</rt></ruby>いたいと<ruby>思<rt>おも</rt></ruby>ってるんだけど。<br>B：そうなんだ。<u><ruby>大型<rt>おおがた</rt></ruby></u><ruby>犬<rt>けん</rt></ruby>と<u><ruby>小型<rt>こがた</rt></ruby></u><ruby>犬<rt>けん</rt></ruby>、どっち？<br>A：うーん、<ruby>育<rt>そだ</rt></ruby>てやすい<ruby>方<rt>ほう</rt></ruby>がいいから<ruby>小型<rt>こがた</rt></ruby><ruby>犬<rt>けん</rt></ruby>かな。<br>B：<ruby>案外<rt>あんがい</rt></ruby>、<ruby>大型<rt>おおがた</rt></ruby><ruby>犬<rt>けん</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>がおとなしくて<ruby>育<rt>そだ</rt></ruby>てやすく、<ruby>小型<rt>こがた</rt></ruby><ruby>犬<rt>けん</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>がよく<u>ほえる</u>らしいよ。"
};

// Words that are in the vocab list but DO NOT actually appear in the text (so they shouldn't consume an <u> index)
const unusedVocab = [
  "釣る", "重ねる", "ジョーク", "真っ青な", "水玉模様", "責任者", "育つ", "トイレットペーパー", "捕まる", "立ち上げる", "感情", "助かる"
];

const topic9_content = fs.readFileSync(path.join(__dirname, 'generate_n3_topic9.cjs'), 'utf8');
const match = topic9_content.match(/const topic9_stories = (\[[\s\S]*?\]);/);
const originalStories = eval(match[1]);

let currentWordId = 883;

async function run() {
  for (let i = 0; i < originalStories.length; i++) {
    const story = originalStories[i];
    if (story.id === '138_1') continue; // skip colors
    
    story.title = "Topic 9 動物 Animals";
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    // Set the perfectly manually formatted Japanese text with <u> tags!
    story.japanese_text = correctedTexts[story.id];
    
    // Filter annotated words to remove unused ones so the sequentially mapped <u> tags line up perfectly!
    let filteredWords = story.annotated_words.filter(w => {
      // Sometimes it has ［する］, so strip it for checking
      const kanjiPlain = w.kanji.replace(/［する］/g, '');
      return !unusedVocab.includes(kanjiPlain) && !unusedVocab.includes(w.kanji);
    });

    story.annotated_words = filteredWords.map(w => {
      const newW = {
        word_id: `n3_${String(currentWordId).padStart(4, '0')}`,
        word_number: currentWordId,
        kanji: w.kanji,
        furigana: w.furigana,
        meaning_en: w.meaning
      };
      currentWordId++;
      return newW;
    });

    delete story.id;

    // Push to firebase
    const docId = story.page_story;
    const topicId = 'topic_09';

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });
      
    // Save locally
    fs.writeFileSync(path.join(__dirname, 'src', 'data', 'tango_n3_raw', `${docId}.json`), JSON.stringify(story, null, 2));
    console.log(`Pushed perfect version of ${docId}`);
  }
  console.log("All Topic 9 stories perfectly fixed and pushed!");
}

run().catch(console.error);
