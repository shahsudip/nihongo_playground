const fs = require('fs');

const p45Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>日本の鉄道は時間が正確なことで有名だ。それには鉄道に関係する人々の努力が欠かせない<span class="text-xs">(注1)</span>。列車の掃除もその一つである。</p>
    <p>新幹線の場合を見てみよう。16両の新幹線ならゴミ出しやトイレの掃除なども入れて55人が担当する。1両(63〜100席)は普通、2人で担当する。時間は10〜12分。遅れると乗客に迷惑をかけ、出発時刻も遅らせてしまう。</p>
    <p>担当者は車内に入ると、まず空いたペットボトル<span class="text-xs">(注2)</span>や缶を集め、座席の背もたれ<span class="text-xs">(注3)</span>にかかっている白い布を取り外す。次に座席を元の位置に戻し、新しい布をつける。ほうきで座席をきれいにし、ひじかけ<span class="text-xs">(注4)</span>をふく。鏡を使って、たなに忘れ物がないか確認する。最後に床を掃く。これを時間内で終わらせなければならない。</p>
    <p>この仕事を12年前にパート<span class="text-xs">(注5)</span>仕事で始めた安喰さんは、それまで主婦をしていたが、家の掃除とはまったく違うことに気づかされた。そのため、休日に自宅の居間にいすを並べて、時間を計って練習したそうだ。2年たつと、時計を見なくても残り時間がわかるようになった。その後、仕事が認められて社員となり、8年目は作業長に、今は550人を指導する管理職になった。</p>
    <p>以前、台風のため新幹線が遅れて掃除時間が4分しかないことがあった。最低限必要な作業をどうするか、不安な気持ちをおさえ、担当者を集めて細かく指示した。決められた時間に出発したときの<span class="underline underline-offset-4">①うれしさ</span>は忘れられなかったという。</p>
    <p>このようにさまざまな人々のおかげで<span class="underline underline-offset-4">②鉄道は正確な時間に走れる</span>のである。</p>
    <p class="text-right text-xs mt-4">(朝日新聞夕刊2011年9月5日より)</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m45Index = ch4.passages.findIndex(p => p.title.includes("45"));
  
  if (m45Index !== -1) {
    let m45 = ch4.passages[m45Index];
    m45.title = "第4部 問題45";
    m45.passageText = p45Html.trim();
    m45.passageLayout = "html";
    m45.mondaiHeader = "問題45　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m45.passageNotes = "<p>(注1)欠かせない：必要である。なくてはならない。</p><p>(注2)ペットボトル：飲み物を入れるプラスチックの入れもの</p><p>(注3)背もたれ：座席の背中をささえる部分</p><p>(注4)ひじかけ：座席の腕を休めることができる部分</p><p>(注5)パート：普通よりも短い時間だけ働くこと</p>";
    
    m45.questions = [
      {
        "id": "q45-1",
        "questionText": "問1 新幹線の掃除について、本文と合っているものはどれか。",
        "options": [
          "10〜12分以内に、1人が1つの車両の掃除をする。",
          "10〜12分の間に、ゴミ出し、トイレや車両の掃除を終わらせる。",
          "車両では、はじめに忘れ物がないか確認して、床を掃除する。",
          "車両の座席をきれいにしてから、背もたれの布を取り替える。"
        ],
        "correctOption": {
          "text": "10〜12分の間に、ゴミ出し、トイレや車両の掃除を終わらせる。",
          "explanation": "第2段落に「ゴミ出しやトイレの掃除なども入れて…時間は10〜12分」とあるため、2が正解です。"
        }
      },
      {
        "id": "q45-2",
        "questionText": "問2 安喰さんは、どうして仕事がうまくできるようになったか。",
        "options": [
          "主婦をしていて、その経験が新幹線の掃除に役に立ったから。",
          "家の掃除とは違うのに気づき、休みの日に家で練習したから。",
          "一緒に働く人たちのやり方を見て仕事をしていたから。",
          "早く終わらせるために、時計を見ないで仕事をしたから。"
        ],
        "correctOption": {
          "text": "家の掃除とは違うのに気づき、休みの日に家で練習したから。",
          "explanation": "「家の掃除とはまったく違うことに気づかされた。そのため、休日に自宅の居間にいすを並べて、時間を計って練習したそうだ」とあるため、2が正解です。"
        }
      },
      {
        "id": "q45-3",
        "questionText": "問3 「①うれしさ」とあるが、何がうれしかったのか。",
        "options": [
          "いつもほど長く掃除をしなくてもよかったこと",
          "短い時間で仕事を終わらせ、時間どおりに発車できたこと",
          "時間が短くても、いつもと同じ作業が全部できたこと",
          "台風でも新幹線がいつもどおり動いていて、掃除ができたこと"
        ],
        "correctOption": {
          "text": "短い時間で仕事を終わらせ、時間どおりに発車できたこと",
          "explanation": "「掃除時間が4分しかないことがあった…決められた時間に出発したときのうれしさは…」とあるため、短い時間でも予定通りに出発させられたことがうれしかったとわかります。"
        }
      },
      {
        "id": "q45-4",
        "questionText": "問4 「②鉄道が正確な時間に走れる」とあるが、その理由は何か。",
        "options": [
          "列車が遅れないように各担当者が仕事をきちんとやろうとしているから。",
          "それぞれの仕事が非常に多くの人々によって行われているから。",
          "仕事のやり方が細かく決められていて、だれでも問題なくできるから。",
          "頭のいい管理職が担当者をうまく指導し、管理しているから。"
        ],
        "correctOption": {
          "text": "列車が遅れないように各担当者が仕事をきちんとやろうとしているから。",
          "explanation": "冒頭の「鉄道に関係する人々の努力が欠かせない」や、最後の「このようにさまざまな人々のおかげで」から、清掃スタッフを含む各担当者の努力のおかげであることがわかります。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 45!");
  } else {
    console.log("Could not find Mondai 45");
  }
}
