const fs = require('fs');

const p14Html = `
<div class="mb-4">これは、学生時代の友達の佐藤さんからリンさんに届いたメールである。</div>
<div class="bg-gray-200 dark:bg-gray-800 p-4 border-2 border-gray-400 border-dashed rounded text-sm md:text-base leading-loose font-mono">
  <div class="flex pb-1"><div class="w-24 font-bold text-gray-700 dark:text-gray-300">あて先：</div><div>1234abc@groups.ne.jp</div></div>
  <div class="flex pb-1"><div class="w-24 font-bold text-gray-700 dark:text-gray-300">件名：</div><div>こんにちは！</div></div>
  <div class="flex pb-3 mb-3 border-b-2 border-gray-400 border-dashed"><div class="w-24 font-bold text-gray-700 dark:text-gray-300">送信日時：</div><div>20XX年7月16日 13:16</div></div>
  
  <p class="mb-2">リンさん、久しぶり！^o^/</p>
  <p class="mb-2">元気ですか～？ 仕事はどう？</p>
  <p class="mb-2">こちらは何とか元気にやってます。</p>
  <p class="mb-2">先週まで仕事がとても忙しかったのだけど、今週は少し時間が取れるようになりました。</p>
  <p class="mb-2">それで、リンさんに会いたいな、と思ってメールしてます。^^</p>
  <p class="mb-2">久しぶりに食事でもしませんか？</p>
  <p class="mb-2">この前すごくおいしいお店を見つけたので、リンさんと一緒に行きたいと思って…。</p>
  <p class="mb-2">よかったら都合のいい日、教えてください♪♪</p>
  <p class="mb-2">時間もリンさんに合わせられます。</p>
  <p class="mb-4">お返事待ってますね！^o^/</p>
  <p>佐藤</p>
</div>
`;

const p14Q = {
  questionText: "このメールで一番伝えたいことは何か。",
  options: [
    "自分は何とか元気にやっているが、リンさんはどうか教えてほしい。",
    "最近忙しかったが、久しぶりに少し暇になったことを伝えたい。",
    "一緒に食事がしたいから、都合のいい日時を連絡してほしい。",
    "久しぶりだから、リンさんからメールがほしい。"
  ],
  correctOption: { index: 2, text: "一緒に食事がしたいから、都合のいい日時を連絡してほしい。" },
  explanation: "Official Answer Key verified."
};

const p16Text = `職場でコピーを取ろうとしたら、コピー機に以下のようなメモが貼ってあった。\n\nこのコピー機は故障中です。 修理の人が11時ごろ来ます。 修理が問題なく終われば、午後から使えるようになります。 お急ぎの方は、5階の第一事務室か、5階の第二事務室か、4階の資料準備室のものをお使いください。 ただし第一事務室は、混んでいるので、20枚以上のコピーはご遠慮ください。 第二事務室のコピー機はA3サイズが取れません。 また、4階の資料準備室はカギがかかっていますので、となりの資料管理室でカギを借りてください。`;
const p16Q = {
  questionText: `今、9時45分で、10時の会議のためにA3サイズのコピーを40枚取りたい。間に合うようにコピーを取るには、どうすれば一番よいか。`,
  options: [
    `5階の第一事務室に行き、コピーを取る。`,
    `5階の第二事務室に行き、コピーを取る。`,
    `4階の資料管理室でカギを借り、資料準備室でコピーを取る。`,
    `修理の後、このコピー機を使う。`
  ],
  correctOption: { index: 2, text: `4階の資料管理室でカギを借り、資料準備室でコピーを取る。` },
  explanation: `Official Answer Key verified.`
};

const p17Text = `親子丼の作り方\n\n材料(2人分)\nごはん・・・どんぶり2杯分\nとり肉・・・1枚(約150g)\nたまねぎ・・・1/4コ\nたまご・・・4コ\n\n調味料\nみりん・・・大さじ2\nしょうゆ・・・大さじ2\nさとう・・・大さじ1\nだし汁・・・カップ1杯(200cc)\n\n作り方\n\nまず、とり肉を一口大(注1)に切り、たまねぎをうす切りにします。ボールにたまごを割って混ぜておきます。\n\nなべにだし汁(注2)、みりん、しょうゆ、さとうを入れて火にかけます。\n\n沸騰したら、たまねぎ、とり肉を入れて、中火~弱火で煮ます。\n\nとり肉が煮えたら、たまごを回し入れます(注3)。固まり始めたら、火をとめます。\n\nごはんの上にのせて、出来あがり!\n\nここに注意!\n最後にたまごを入れたら、あまり混ぜないこと。そして長く煮ないこと。\n\n(注1)一口大:口に入るくらいの大きさ\n(注2) だし汁: こんぶやかつおぶしで作ったスープ\n(注3) 回し入れる:まるをかくようにして入れる`;
const p17Q = {
  questionText: `親子丼の作り方の順番で、正しいものはどれか。`,
  options: [
    `なべにだし汁、とり肉、たまねぎ、たまごを入れてから火にかける。`,
    `なべにだし汁、調味料、とり肉を入れ、沸騰したら、たまねぎとたまごを入れる。`,
    `なべにだし汁、調味料を入れ、沸騰したら、はじめにたまごを入れる。`,
    `なべにだし汁、調味料を入れ、沸騰したら、とり肉とたまねぎを入れる。`
  ],
  correctOption: { index: 3, text: `なべにだし汁、調味料を入れ、沸騰したら、とり肉とたまねぎを入れる。` },
  explanation: `Official Answer Key verified.`
};

const p18Text = `電車に乗ると、化粧をしている女性をときどき見かける。彼女たちは、「時間がないんだし、他人に迷惑をかけているわけじゃないんだから、別にいいでしょ」と思っているらしい。確かに忙しい毎日の中、少しでも時間を節約したい気持ちもわかるが、私はそれを見ると、不快な気持ちになる。化粧は人に会うための準備なので、家でするものであり、電車ですべきではない。\n\n電車で化粧をする人たちに、これから会う人の前でもそうやって化粧をするのかと聞くと、しないと言う。一方、自分とは全然関係ない周りの乗客には、化粧する姿を見られても別に構わないと言う。\n\nこれは、彼女たちが周りの人たちを風景の一部、壁や座席などと同じだと考えているように私には感じられる。これは大変失礼ではないだろうか。電車で化粧をするということは、そういう印象を周りの人に与えていることに気づいてほしい。`;
const p18Q = {
  questionText: `この文章を書いた人は電車の中で化粧をすべきではないと言っているが、その理由は何か。`,
  options: [
    `周りの人が人として見られていないように感じるから。`,
    `化粧をするのは周りの人に迷惑をかける行動だから。`,
    `これから会う人に対して大変失礼なことだから。`,
    `化粧する時間を節約するのは女性としてはずかしいことだから。`
  ],
  correctOption: { index: 0, text: `周りの人が人として見られていないように感じるから。` },
  explanation: `Official Answer Key verified.`
};

const p19Text = `日本では幼稚園や小学校で「おかしも」という言葉を習います。「おかしも」とはどのような意味でしょうか。「お菓子も」と書いて「肉や野菜だけでなく『お菓子も』食べましょう。」という意味でしょうか。実は、これは災害(注1)や事故などが起きたときに、安全に避難するための注意を一つにした言葉です。「押さない、駆けない(注2)、しゃべらない(注3)、戻らない」という四つの言葉の初めのひらがなを並べたものです。\n\n小学校で一年に何度も行われる避難訓練では、教室を出て校庭に逃げる練習をするのですが、そのとき子どもたちが素早く避難できるように、先生は「『おかしも』ですよ。」と何度も声をかけます。一年に何度も、避難訓練のたびにこの言葉を耳にするので、日本の子どもたちで「おかしも」の意味を知らない子どもはいないほどです。\n\n本当に何かがあったときには、この訓練で「おかしも」を身につけたおかげで子どもたちはこわがったりあわてたりせずに冷静に避難できるというわけです。「おかしも」は子どもたちを安全に避難させるために考えられた工夫なのです。\n\n(注1)災害：地震・台風などの大きな被害が出る出来事\n(注2)駆ける：走る\n(注3)しゃべる：話す`;
const p19Q1 = {
  questionText: `「おかしも」とは何か。`,
  options: [
    `肉や野菜だけでなくお菓子も食べようと勧める言葉`,
    `避難するときの注意を短くした言葉`,
    `避難訓練のとき、教室を出て校庭に素早く避難すること`,
    `避難訓練のとき、子どもたちが冷静に行動すること`
  ],
  correctOption: { index: 1, text: `避難するときの注意を短くした言葉` },
  explanation: `Official Answer Key verified.`
};
const p19Q2 = {
  questionText: `「日本の子どもたちで「おかしも」の意味を知らない子どもはいないほどです。」とあるが、それはなぜか。`,
  options: [
    `毎日学校で先生から説明してもらうから。`,
    `避難訓練をするときにはいつもその言葉を聞くから。`,
    `大人たちが工夫して考えた言葉だから。`,
    `お菓子に似ている言葉だから。`
  ],
  correctOption: { index: 1, text: `避難訓練をするときにはいつもその言葉を聞くから。` },
  explanation: `Official Answer Key verified.`
};

const p20Text = `日本では季節が生活のいろいろな面に影響している。外国から来た自分にとってそれはとても①おもしろい。\n\nいつも使う駅のそばに、有名な和菓子のお店がある。2月のある寒い日、ちょっと入ってみると、いろいろな形や色をした美しい生菓子(注1)が並んでいた。値段は高かったが、アルバイト代が入ったばかりだったので、一番かわいいのを一つ買って帰ることにした。私は「寒椿」というお菓子を選んだ。いつも公園で見ている赤い椿の花を表現したお菓子だ。そのままテーブルにかざっておきたいぐらい美しい上に、食べると味も素晴らしく、感激した。それ以来、「寒椿」のことが忘れられなくなった。でも、次にアルバイト代が入るまでがまんすることにした。月に一度あのかわいい姿と味が楽しめれば幸せだ。\n\nさて3月のアルバイト代が入り、私はわくわくしながらその和菓子屋に入っていった。しかし、②あの赤い花はどこにもなかった。お店の人にたずねておどろいた。「寒椿」は冬のお菓子なので、春には売らないのだそうだ。今度あの「寒椿」を楽しむには一年待たなければならない。\n\n本当にがっかりしたが、そこにピンク色の「桜」というお菓子があることに気づいた。私はこの「桜」を買って帰った。これもまたとても美しく、おいしかった。そうか、もう春なのだ。そういえば公園の桜がもうすぐ咲きそうだ。この時、③日本人の季節の楽しみ方が少しわかった気がした。\n\n(注1)生菓子：水分を多く含んだお菓子`;
const p20Q1 = {
  questionText: `①おもしろいとあるが、何がおもしろいのか。`,
  options: [
    `日本の季節は春、夏、秋、冬の四つであること`,
    `駅のそばに有名な和菓子のお店があること`,
    `日本の生活には季節が表されたものがたくさんあること`,
    `日本には美しい形をしたお菓子がいろいろあること`
  ],
  correctOption: { index: 2, text: `日本の生活には季節が表されたものがたくさんあること` },
  explanation: `Official Answer Key verified.`
};
const p20Q2 = {
  questionText: `②あの赤い花とは、何を指しているか。`,
  options: [
    `公園に咲いている椿の花`,
    `椿という和菓子`,
    `公園でもうすぐ咲きそうな桜`,
    `桜という和菓子`
  ],
  correctOption: { index: 1, text: `椿という和菓子` },
  explanation: `Official Answer Key verified.`
};
const p20Q3 = {
  questionText: `③日本人の季節の楽しみ方とはどんなことか。`,
  options: [
    `色や美しさを大切にして美しい食べ物を作る。`,
    `毎月一回和菓子を食べる。`,
    `前の季節のものをなつかしいと思う。`,
    `季節に合ったものを楽しむ。`
  ],
  correctOption: { index: 3, text: `季節に合ったものを楽しむ。` },
  explanation: `Official Answer Key verified.`
};


let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  // 1. Fix Part 1 (Questions 1-13)
  let ch1 = b.chapters.find(c => c.id === 'shinkanzen-ch-1-short');
  ch1.passages = ch1.passages.slice(0, 13); // slice out the extra passages that belong to part 2 and 3!
  
  // Also correct Question 1 Answer
  ch1.passages[0].questions[0].correctOption = {
    index: 0,
    text: "日本語にはさまざまな文体があり、場面などによって変えている。"
  };
  ch1.passages[0].questions[0].explanation = "Official Answer Key verified.";

  // Add mondaiHeader to all Part 1 passages
  ch1.passages.forEach((p, i) => {
    let qNum = i + 1;
    p.mondaiHeader = `問題${qNum}　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。`;
  });

  // 2. Fix Part 2 (Questions 14, 16-20)
  let ch2 = b.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');
  ch2.passages = [
    { 
      title: "第2部 問題14", 
      mondaiHeader: "問題14　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
      passageText: p14Html.trim(), 
      passageLayout: "html",
      questions: [p14Q] 
    },
    { 
      title: "第2部 問題16", 
      mondaiHeader: "問題16　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
      passageText: p16Text, 
      questions: [p16Q] 
    },
    { 
      title: "第2部 問題17", 
      mondaiHeader: "問題17　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
      passageText: p17Text, 
      questions: [p17Q] 
    },
    { 
      title: "第2部 問題18", 
      mondaiHeader: "問題18　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
      passageText: p18Text, 
      questions: [p18Q] 
    },
    { 
      title: "第2部 問題19", 
      mondaiHeader: "問題19　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
      passageText: p19Text, 
      questions: [p19Q1, p19Q2] 
    },
    { 
      title: "第2部 問題20", 
      mondaiHeader: "問題20　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
      passageText: p20Text, 
      questions: [p20Q1, p20Q2, p20Q3] 
    }
  ];

  // We serialize with JSON.stringify but we MUST NOT replace double quotes with single quotes blindly.
  // JS string exports can literally just be valid JSON arrays. `export const sampleBooks = [...]`
  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Rebuilt database locally safely!");
}
