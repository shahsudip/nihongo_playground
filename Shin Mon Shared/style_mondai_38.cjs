const fs = require('fs');

const p38Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>科学技術の進歩によって、私たちの生活はより快適で便利になっている。しかし、便利になるということは、<span class="underline underline-offset-4">①人間の能力が失われる</span>ことだとも言われている。</p>
    <p>たとえば、重いものを持ち上げて運ぶとき、機械がなかった時代には人が行っていた。昔の武道<span class="text-xs">(注1)</span>を研究している人の話によると、これはそのころの人が今よりずっと力があったというわけではなく、どのように体を使えば重いものを運べるかがわかっていたので、できたのだという。だが、今は<span class="underline underline-offset-4">②それ</span>が伝えられることもなくなりつつある。</p>
    <p>また、文字を持たない社会には、非常に長い物語や詩などでも、覚えて伝えられる人がいた。しかし、今、そのような人は非常に少なくなっている。こうしたことを考えると、自分たちがなくしたものの存在に気づかされる。</p>
    <p>これから、私たちはどのような能力を失うのだろうか。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m38Index = ch4.passages.findIndex(p => p.title.includes("38"));
  
  if (m38Index !== -1) {
    let m38 = ch4.passages[m38Index];
    m38.title = "第4部 問題38";
    m38.passageText = p38Html.trim();
    m38.passageLayout = "html";
    m38.mondaiHeader = "問題38　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m38.passageNotes = "<p>(注1)武道：武士が戦いのために身につけなければならない技術や精神</p>";
    
    m38.questions = [
      {
        "id": "q38-1",
        "questionText": "問1 「①人間の能力が失われる」とあるが、なぜ人間の能力が失われるのか。",
        "options": [
          "今は、昔よりも生活に役立つ機械や道具が増えてきたから。",
          "今の人々は昔のことを思い出そうとしなくなったから。",
          "昔の人々はいつも能力を高めようとしていたが、今はしないから。",
          "昔と違い、今の人々は快適で便利な生活を求めなくなったから。"
        ],
        "correctOption": {
          "text": "今は、昔よりも生活に役立つ機械や道具が増えてきたから。",
          "explanation": "「科学技術の進歩によって、私たちの生活はより快適で便利になっている」＝機械などが増えたから、その代わりに人間の能力が失われる、ということです。"
        }
      },
      {
        "id": "q38-2",
        "questionText": "問2 「②それ」とは何を指すか。",
        "options": [
          "機械",
          "力のある体",
          "体の使い方",
          "人々の協力"
        ],
        "correctOption": {
          "text": "体の使い方",
          "explanation": "「それ」の直前にある「どのように体を使えば重いものを運べるかがわかっていたので…」の部分を指しているため、「体の使い方」が正解です。"
        }
      },
      {
        "id": "q38-3",
        "questionText": "問3 この文章では科学技術の進歩について、どう言っているか。",
        "options": [
          "進歩によってよりよい生活が送れるが、人がやっていた仕事がなくなる。",
          "進歩はすばらしいが、それによって人と人とのつながりが失われていく。",
          "進歩すると、機械や道具に頼って、さまざまなことが自分でできなくなる。",
          "進歩するにしたがって、昔のことは伝えられず、どんどん忘れられてしまう。"
        ],
        "correctOption": {
          "text": "進歩すると、機械や道具に頼って、さまざまなことが自分でできなくなる。",
          "explanation": "本文のテーマは「科学技術の進歩（機械などの発達）」によって「人間の能力（自分で重いものを運ぶ体の使い方、記憶力など）」が失われていくことへの危惧です。3が一番内容に合っています。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 38, fixing all OCR errors and mapping correct answers!");
  } else {
    console.log("Could not find Mondai 38");
  }
}
