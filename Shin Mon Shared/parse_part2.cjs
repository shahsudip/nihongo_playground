const fs = require('fs');

const p16Text = `職場でコピーを取ろうとしたら、コピー機に以下のようなメモが貼ってあった。\n\nこのコピー機は故障中です。 修理の人が11時ごろ来ます。 修理が問題なく終われば、午後から使えるようになります。 お急ぎの方は、5階の第一事務室か、5階の第二事務室か、4階の資料準備室のものをお使いください。 ただし第一事務室は、混んでいるので、20枚以上のコピーはご遠慮ください。 第二事務室のコピー機はA3サイズが取れません。 また、4階の資料準備室はカギがかかっていますので、となりの資料管理室でカギを借りてください。`;
const p16Q = {
  questionText: `今、9時45分で、10時の会議のためにA3サイズのコピーを40枚取りたい。間に合うようにコピーを取るには、どうすれば一番よいか。(It is now 9:45, and you want to make 40 copies of A3 size for a 10:00 meeting. What is the best thing to do to get the copies in time?)`,
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
  questionText: `親子丼の作り方の順番で、正しいものはどれか。 (Which of the following is the correct order for making Oyakodon?)`,
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
  questionText: `この文章を書いた人は電車の中で化粧をすべきではないと言っているが、その理由は何か。(The person who wrote this passage says you should not put on makeup in the train. What is the reason?)`,
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

// A safer way to inject this is to use a direct string replacement on the passages array for chapter 2.
// First, we extract the array string for chapter 2 passages.
let matchStart = data.indexOf('        "id": "shinkanzen-ch-2-medium",');
if (matchStart !== -1) {
  let passagesStart = data.indexOf('"passages": [', matchStart);
  let passagesEnd = data.indexOf('        ]\n      },\n      {\n        "id": "shinkanzen-ch-3-long"', passagesStart);
  
  if (passagesStart !== -1 && passagesEnd !== -1) {
    let newPassages = `"passages": [\n          {\n            "title": "第2部 問題16",\n            "passageText": ${JSON.stringify(p16Text)},\n            "questions": [${JSON.stringify(p16Q, null, 2)}]\n          },\n          {\n            "title": "第2部 問題17",\n            "passageText": ${JSON.stringify(p17Text)},\n            "questions": [${JSON.stringify(p17Q, null, 2)}]\n          },\n          {\n            "title": "第2部 問題18",\n            "passageText": ${JSON.stringify(p18Text)},\n            "questions": [${JSON.stringify(p18Q, null, 2)}]\n          },\n          {\n            "title": "第2部 問題19",\n            "passageText": ${JSON.stringify(p19Text)},\n            "questions": [${JSON.stringify(p19Q1, null, 2)}, ${JSON.stringify(p19Q2, null, 2)}]\n          },\n          {\n            "title": "第2部 問題20",\n            "passageText": ${JSON.stringify(p20Text)},\n            "questions": [${JSON.stringify(p20Q1, null, 2)}, ${JSON.stringify(p20Q2, null, 2)}, ${JSON.stringify(p20Q3, null, 2)}]\n          }\n`;
    
    // Quick fix for the keys because JSON.stringify quotes them
    newPassages = newPassages.replace(/"questionText":/g, 'questionText:');
    newPassages = newPassages.replace(/"options":/g, 'options:');
    newPassages = newPassages.replace(/"correctOption":/g, 'correctOption:');
    newPassages = newPassages.replace(/"index":/g, 'index:');
    newPassages = newPassages.replace(/"text":/g, 'text:');
    newPassages = newPassages.replace(/"explanation":/g, 'explanation:');
    
    data = data.substring(0, passagesStart) + newPassages + data.substring(passagesEnd);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Successfully rebuilt Chapter 2 (Part 2) with questions 16-20 and full answer key!");
  }
}
