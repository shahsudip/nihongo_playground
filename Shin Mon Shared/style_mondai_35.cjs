const fs = require('fs');

const p35Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>トキは大きくて美しい鳥である。体の大きさは75センチほどで、羽を広げると140センチにもなる。体の色は白っぽく見えるが、羽を広げると、うすい赤い色をしている。これはトキ色と呼ばれ、人々に好まれた。昔は日本中どこでもトキを見ることができたが、100年ほど前から羽を取るために捕まえられ、少しずつ数を減らしていった。工業化が進むと、トキが暮らす田んぼや森が減ったり、環境が汚染されたりして、その数は非常に少なくなった。そして1981年、ついに日本のトキは絶滅した<span class="text-xs">(注1)</span>。</p>
    <p>現在は、中国にいた同じ種類のトキを輸入し、佐渡という島で育てている。そして、数が増えてきたら自然に戻すという計画が立てられている。トキを復活<span class="text-xs">(注2)</span>させるため、多くの金を使い、多くの人々が努力している。</p>
    <p>自然は簡単に失われるが、一度失われたら元に戻すのは簡単ではない。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m35Index = ch4.passages.findIndex(p => p.title.includes("35"));
  
  if (m35Index !== -1) {
    let m35 = ch4.passages[m35Index];
    m35.title = "第4部 問題35";
    m35.passageText = p35Html.trim();
    m35.passageLayout = "html";
    m35.mondaiHeader = "問題35　つぎの文章を読んで質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m35.passageNotes = "<p>(注1)絶滅する：ある種類の生物がすっかりいなくなる</p><p>(注2)復活：なくなってしまったものが、また元に戻ること</p>";
    
    m35.questions = [
      {
        "id": "q35-1",
        "questionText": "問1 日本のトキの説明について、本文と言っているものはどれか。",
        "options": [
          "昔は日本中にいたが、数を減らし、今は佐渡に数羽いるだけである。",
          "日本各地の田んぼや森にいたが、絶滅し、今は輸入されたトキを育てている。",
          "工業化が進むにしたがって数が減ってしまったが、現在はまた増えている。",
          "絶滅してしまったため、トキに似た中国の鳥を輸入し、育てている。"
        ],
        "correctOption": {
          "text": "日本各地の田んぼや森にいたが、絶滅し、今は輸入されたトキを育てている。",
          "explanation": "「昔は日本中どこでもトキを見ることができた」「1981年、ついに日本のトキは絶滅した」「現在は、中国にいた同じ種類のトキを輸入し、佐渡という島で育てている」と書かれています。"
        }
      },
      {
        "id": "q35-2",
        "questionText": "問2 日本のトキはなぜ、数が減ったのか。",
        "options": [
          "トキが田んぼや森の生き物を食べすぎて、捕まえられたから。",
          "捕まえられた上に、トキの住む環境も悪化したから。",
          "トキの生きられる場所が減り、中国などの国に行ってしまったから。",
          "きれいなトキを飼いたいと思った人が多く、捕まえられたから。"
        ],
        "correctOption": {
          "text": "捕まえられた上に、トキの住む環境も悪化したから。",
          "explanation": "「100年ほど前から羽を取るために捕まえられ... 工業化が進むと、トキが暮らす田んぼや森が減ったり、環境が汚染されたりして...」と書かれています。"
        }
      },
      {
        "id": "q35-3",
        "questionText": "問3 この文章を書いた人が言いたいことは何か。",
        "options": [
          "非常にきれいな日本のトキが絶滅してしまったのは残念なことだ。",
          "美しい生き物は、経済的に大変でも、再び増やして自然に返したほうがいい。",
          "自然は、復活させるのが非常に難しいので、大切にしなければならない。",
          "自然が失われかけても、さまざまな方法により復活させることができる。"
        ],
        "correctOption": {
          "text": "自然は、復活させるのが非常に難しいので、大切にしなければならない。",
          "explanation": "最後の文「自然は簡単に失われるが、一度失われたら元に戻すのは簡単ではない。」が筆者の最も言いたいこと（主張）です。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 35, fixing all OCR errors and mapping correct answers!");
  }
}
