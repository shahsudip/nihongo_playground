import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const topic5Stories = [
  {
    "id": "67_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "68",
    "japanese_text": "A：新しいパソコン、どう？\nB：うん。<u>旧</u>モデルに比べて<u>多少</u>大きくなったけど、<u>反応</u>も速いから、<u>重たい</u>データ使った作業も<u>スムーズに</u>できるよ。",
    "english_text": "A: How do you like your new computer? B: Hmm., It's a little bigger than the previous model, but it also responds faster, so it can handle heavy amounts of data smoothly.",
    "words": [
      { "id": "339", "kanji": "旧～", "furigana": "きゅう～", "english": "former ~, previous ~" },
      { "id": "340", "kanji": "多少", "furigana": "たしょう", "english": "slightly, a little" },
      { "id": "341", "kanji": "反応[する]", "furigana": "はんのう", "english": "response, respond, handle" },
      { "id": "342", "kanji": "重たい", "furigana": "おもたい", "english": "heavy, weighty" },
      { "id": "343", "kanji": "スムーズな", "furigana": "スムーズな", "english": "smooth" }
    ]
  },
  {
    "id": "68_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "69",
    "japanese_text": "A：授業の資料をダウンロードしたんだけど、開けなかったの。\nB：圧縮<u>フォルダ</u>だからじゃない？ <u>解凍すれ</u>ばいいよ。\nA：あ、そっか。あと、ここに書いてある漢字って何て読むの？ 読み方が分からないから<u>入力できなくて</u>…。\nB：ええと…難しいね。こういうときは<u>手書き</u><u>機能</u>を<u>活用しよう</u>。",
    "english_text": "A: I downloaded the class materials, but I couldn't open them. B: Maybe that's because it's a compressed folder. Just unzip it. A: Oh, I see. Also, how do you read the kanji characters written here? I don't know how to read them, so I can't input them... B: Well... that's more difficult. In this case, let's use the handwriting function.",
    "words": [
      { "id": "344", "kanji": "フォルダ", "furigana": "フォルダ", "english": "folder" },
      { "id": "345", "kanji": "解凍[する]", "furigana": "かいとう", "english": "decompression, unzip" },
      { "id": "346", "kanji": "入力[する]", "furigana": "にゅうりょく", "english": "input, enter" },
      { "id": "347", "kanji": "出力[する]", "furigana": "しゅつりょく", "english": "output" },
      { "id": "348", "kanji": "手書き[する]", "furigana": "てがき", "english": "handwriting, write by hand" },
      { "id": "349", "kanji": "機能[する]", "furigana": "きのう", "english": "function" },
      { "id": "350", "kanji": "機能的な", "furigana": "きのうてきな", "english": "functional" },
      { "id": "351", "kanji": "活用[する]", "furigana": "かつよう", "english": "utilization, use, apply" }
    ]
  },
  {
    "id": "68_2",
    "title": "Topic 5 テクノロジー",
    "audio_id": "70",
    "japanese_text": "インターネットを通して、世界中の情報が<u>手軽に</u>手に入れられるようになった。それによって社会・経済に大きな革命が起きたことを<u>ＩＴ革命</u>という。",
    "english_text": "Through the Internet, information from all over the world has become readily available. This has led to a major social and economic revolution, known as the IT revolution.",
    "words": [
      { "id": "352", "kanji": "手軽な", "furigana": "てがるな", "english": "easily, readily" },
      { "id": "353", "kanji": "ＩＴ", "furigana": "アイティー", "english": "IT (information technology)" },
      { "id": "354", "kanji": "革命", "furigana": "かくめい", "english": "revolution" }
    ]
  },
  {
    "id": "69_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "71",
    "japanese_text": "「<u>リモートワーク</u>しなきゃいけないんだけどパソコンが苦手」「ソフトの使い方がよく分からないから、<u>常に</u><u>電卓</u>を使っている」「作業の無駄を<u>省きたい</u>けど、何をしたらいいか分からない」その<u>コンプレックス</u>、パソコン市民講座で解消しませんか？",
    "english_text": "\"I need to work remotely, but I'm not good with computers,\" or \"I don't know how to use software, so I'm constantly using calculators\" or \"I want to eliminate work-related waste, but I don't know how\" - if you have concerns like this, why not solve it by taking a community computer class?",
    "words": [
      { "id": "355", "kanji": "リモートワーク[する]", "furigana": "リモートワーク", "english": "remote work, work remotely" },
      { "id": "356", "kanji": "リモート", "furigana": "リモート", "english": "remote" },
      { "id": "357", "kanji": "常に", "furigana": "つねに", "english": "constantly" },
      { "id": "358", "kanji": "電卓", "furigana": "でんたく", "english": "calculator" },
      { "id": "359", "kanji": "省く", "furigana": "はぶく", "english": "omit, eliminate" },
      { "id": "360", "kanji": "コンプレックス", "furigana": "コンプレックス", "english": "complex, concern" }
    ]
  },
  {
    "id": "70_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "72",
    "japanese_text": "A：ねえ見て、メールで先生に課題を提出したら「欲で汚いようです」って<u>コメント</u>がついてて…。\nB：それ、「よくできた内容です」っていう<u>メッセージ</u>じゃない？あの先生、漢字の<u>変換</u>ミスが多いよね。",
    "english_text": "A: Hey, look. I submitted an assignment to my teacher via email and she left the comment \"This seems greedy and dirty\"... B: But isn't her message actually saying \"This is well written content\"? She makes a lot of kanji conversion errors, doesn't she?",
    "words": [
      { "id": "361", "kanji": "コメント[する]", "furigana": "コメント", "english": "comment, leave a comment" },
      { "id": "362", "kanji": "メッセージ", "furigana": "メッセージ", "english": "message" },
      { "id": "363", "kanji": "変換[する]", "furigana": "へんかん", "english": "conversion, convert" }
    ]
  },
  {
    "id": "70_2",
    "title": "Topic 5 テクノロジー",
    "audio_id": "73",
    "japanese_text": "A：こないだＣさんがＳＮＳに上司の悪口書いてたのって見た？\nB：うん、見たよ。\nA：あの<u>投稿</u>、Ｃさんの後輩が<u>シェアして</u>、上司の<u>本名</u>ばらしちゃったんだって。それでＣさんのアカウントが会社から<u>特定された</u>らしくて…Ｃさん、近々会社やめるらしいよ。\nB：それは、<u>不運だった</u>ね…。",
    "english_text": "A: Did you see that Mr. C wrote some awful things about his boss on social media the other day? B: Yes, I saw. A: His junior colleague shared the post and revealed his boss's real name. It seems that Mr. C's account was identified by the company... and it looks like Mr. C will be quitting the company soon. B: Well, that's unfortunate...",
    "words": [
      { "id": "364", "kanji": "投稿[する]", "furigana": "とうこう", "english": "post" },
      { "id": "365", "kanji": "シェア[する]", "furigana": "シェア", "english": "sharing, share" },
      { "id": "366", "kanji": "本名", "furigana": "ほんみょう", "english": "actual name, real name" },
      { "id": "367", "kanji": "特定[する]", "furigana": "とくてい", "english": "identification, identify, specify" },
      { "id": "368", "kanji": "不運な", "furigana": "ふうんな", "english": "unfortunate" }
    ]
  },
  {
    "id": "71_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "74",
    "japanese_text": "A：パソコンの充電器、壊れちゃったんだけど、充電器は修理の対象<u>外</u>だから、こういう<u>ケース</u>は買い替えるしかないんだって。<u>電圧</u>とか<u>電力</u>とかよく分からないんだけど、どれ買えばいいかな？\nB：えっと…60Wだね。パソコンと同じメーカーのがいいよ。<u>ただ</u>、高いけどね。",
    "english_text": "A: The charger for my computer broke, but chargers aren't included in repairs, so in this case I just have to buy a new one. I don't know much about voltage or power. Which one should I buy? B: Let's see... it's 60W. You should get one from the same manufacturer as your computer. But they're expensive.",
    "words": [
      { "id": "369", "kanji": "～外", "furigana": "～がい", "english": "not included in ~, outside the scope of ~" },
      { "id": "370", "kanji": "ケース", "furigana": "ケース", "english": "case" },
      { "id": "371", "kanji": "電圧", "furigana": "でんあつ", "english": "voltage" },
      { "id": "372", "kanji": "電力", "furigana": "でんりょく", "english": "electrical power" },
      { "id": "373", "kanji": "ただ", "furigana": "ただ", "english": "but, however" }
    ]
  },
  {
    "id": "72_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "75",
    "japanese_text": "A：オンラインで、他の人と同時にファイルを<u>編集できる</u>方法ないかな。\nB：ウェブアプリを使えば、ファイルを<u>共有する</u>だけで<u>やりとりし</u>ながら共同作業ができるよ。データが<u>修正されたら</u>、リアルタイムで保存されるんだ。\nA：<u>要するに</u>、内容が<u>上書きされ</u>ていくってことだね。",
    "english_text": "A: Is there any way I can edit a file online with another person at the same time? B: If you use a web app, you can collaborate just by sharing files to exchange them. Whenever data is modified, it's saved in real time. A: So in short, the content is overwritten.",
    "words": [
      { "id": "374", "kanji": "編集[する]", "furigana": "へんしゅう", "english": "editing, edit" },
      { "id": "375", "kanji": "共有[する]", "furigana": "きょうゆう", "english": "sharing, share" },
      { "id": "376", "kanji": "やりとり[する]", "furigana": "やりとり", "english": "exchange" },
      { "id": "377", "kanji": "修正[する]", "furigana": "しゅうせい", "english": "amendment, modify, correct" },
      { "id": "378", "kanji": "要するに", "furigana": "ようするに", "english": "in short, to sum up" },
      { "id": "379", "kanji": "上書き[する]", "furigana": "うわがき", "english": "overwriting, overwrite" }
    ]
  },
  {
    "id": "72_2",
    "title": "Topic 5 テクノロジー",
    "audio_id": "76",
    "japanese_text": "年齢別のパソコン<u>普及率</u>を<u>探った</u>研究によると、人口の多数を<u>占める</u>30～59歳と60歳以上の普及率は60%以上で、前年に比べて大きく増加したそうだ。テレワークやオンライン学習が進んでいるため、<u>さらに</u>パソコンやタブレットの<u>需要</u>は増えていくと思われる。",
    "english_text": "According to a study that explored penetration rates for computers by age, the penetration rates for the 30-59 and 60+ age groups, which account for the majority of the population, were over 60%, a significant increase over the previous year. Demand for PCs and tablets is expected to increase further due to remote working and online learning.",
    "words": [
      { "id": "380", "kanji": "普及[する]", "furigana": "ふきゅう", "english": "uptake, penetration" },
      { "id": "381", "kanji": "探る", "furigana": "さぐる", "english": "explore, seek" },
      { "id": "382", "kanji": "占める", "furigana": "しめる", "english": "account for, comprise" },
      { "id": "383", "kanji": "さらに", "furigana": "さらに", "english": "further" },
      { "id": "384", "kanji": "需要", "furigana": "じゅよう", "english": "demand" }
    ]
  },
  {
    "id": "73_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "77",
    "japanese_text": "A：もし<u>ハードウェア</u>に不具合があった場合、<u>一旦</u>店舗にお持ちください。<u>分解</u>等されますと、<u>保証</u>が受けられなくなります。\nB：はい、分かりました。",
    "english_text": "A: If you have any hardware problems, just bring it back to the store for the moment. If you disassemble it, etc., you will lose your warranty. B: Yes, I understand.",
    "words": [
      { "id": "385", "kanji": "ハードウェア", "furigana": "ハードウェア", "english": "hardware" },
      { "id": "386", "kanji": "一旦", "furigana": "いったん", "english": "once, for now, for the moment" },
      { "id": "387", "kanji": "分解[する]", "furigana": "ぶんかい", "english": "disassembly, disassemble" },
      { "id": "388", "kanji": "保証[する]", "furigana": "ほしょう", "english": "warranty, guarantee" }
    ]
  },
  {
    "id": "74_1",
    "title": "Topic 5 テクノロジー",
    "audio_id": "78",
    "japanese_text": "A：期末試験の<u>採点</u>結果を<u>リスト</u>にしたんだけど、ファイルが見つからなくて…。\nB：保存せずに終了したとか？\nA：そうかも…また<u>作成する</u>しかないかな。\nB：自動保存をオンにしておくといいよ。そうすれば、<u>改行</u>でも<u>挿入</u>でも<u>削除</u>でも、<u>更新する</u>たびに<u>勝手に</u>保存されるよ。",
    "english_text": "A: I made a list of the final exam scores, but I can't find the file... B: Did you exit without saving it or something? A: Maybe... I'll have to create it again. B: You should turn on auto-save. That way, every time you update, whether it's a line break, insertion, or deletion, it will save automatically.",
    "words": [
      { "id": "389", "kanji": "採点[する]", "furigana": "さいてん", "english": "score, grade" },
      { "id": "390", "kanji": "リスト", "furigana": "リスト", "english": "list" },
      { "id": "391", "kanji": "作成[する]", "furigana": "さくせい", "english": "creation, prepare" },
      { "id": "392", "kanji": "改行[する]", "furigana": "かいぎょう", "english": "line break, create line break" },
      { "id": "393", "kanji": "挿入[する]", "furigana": "そうにゅう", "english": "insertion, insert" },
      { "id": "394", "kanji": "削除[する]", "furigana": "さくじょ", "english": "deletion, delete" },
      { "id": "395", "kanji": "更新[する]", "furigana": "こうしん", "english": "update, renew" },
      { "id": "396", "kanji": "勝手な", "furigana": "かってな", "english": "automatic, selfish, for oneself" }
    ]
  },
  {
    "id": "74_2",
    "title": "Topic 5 テクノロジー",
    "audio_id": "79",
    "japanese_text": "この<u>システム</u>の<u>設定</u>の変更を<u>反映させる</u>ためには、パソコンを<u>再起動する</u>必要がある。",
    "english_text": "In order to apply the changes to the settings of this system, you need to restart the computer.",
    "words": [
      { "id": "397", "kanji": "システム", "furigana": "システム", "english": "system" },
      { "id": "398", "kanji": "設定[する]", "furigana": "せってい", "english": "setting, configure" },
      { "id": "399", "kanji": "反映[する]", "furigana": "はんえい", "english": "reflection, apply" },
      { "id": "400", "kanji": "再起動[する]", "furigana": "さいきどう", "english": "restart, reboot" }
    ]
  }
];

topic5Stories.forEach(story => {
  const filePath = path.join(OUTPUT_DIR, `${story.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
  console.log(`Saved Topic 5 story: ${story.id}.json`);
});
console.log(`Done! ${topic5Stories.length} stories saved for Topic 5.`);
