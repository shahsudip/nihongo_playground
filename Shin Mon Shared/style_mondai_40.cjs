const fs = require('fs');

const p40Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>「スキーが好きです。」「この肉、食べにくい。」のように、同じ音、同じような音を使う言葉の遊びを<span class="underline underline-offset-4">ダジャレ</span>と言う。日本語には似た発音でも意味が違う言葉が多いので、ダジャレを作りやすい。小学生や中高年のおじさんたちなどはダジャレが大好きだ。ただ、おじさんが言うと、たいてい<span class="underline underline-offset-4">①冷たい目で見られる</span>。つまらなかったり、同じダジャレを何度も言ったりするからだ。</p>
    <p>それでも、ダジャレは役に立つこともある。だれにでも作れ、うまいダジャレなら人を笑わせて気持ちを明るくすることができる。</p>
    <p>また、ある脳の研究者によると、ふだんからおもしろいダジャレを作ろうとしていれば、脳を鍛える<span class="text-xs">(注1)</span>ことにもなり、ボケ防止<span class="text-xs">(注2)</span>にも役立つらしい。</p>
    <p>簡単な言葉選びで緊張がとけたり、笑い合って明るい気持ちになったり、脳のトレーニングにもなるなら、それはすばらしいことではないだろうか。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m40Index = ch4.passages.findIndex(p => p.title.includes("40"));
  
  if (m40Index !== -1) {
    let m40 = ch4.passages[m40Index];
    m40.title = "第4部 問題40";
    m40.passageText = p40Html.trim();
    m40.passageLayout = "html";
    m40.mondaiHeader = "問題40　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m40.passageNotes = "<p>(注1)鍛える：練習などを繰り返して、体や脳や技術をしっかりさせる</p><p>(注2)ボケ防止：脳の働きが悪くなるのを防ぐこと</p>";
    
    m40.questions = [
      {
        "id": "q40-1",
        "questionText": "問1 「①冷たい目で見られる」のはだれか。",
        "options": [
          "ダジャレを聞いた人",
          "ダジャレを言ったおじさん",
          "ダジャレを言った小学生",
          "この文を書いた人"
        ],
        "correctOption": {
          "text": "ダジャレを言ったおじさん",
          "explanation": "「おじさんが言うと、たいてい冷たい目で見られる」とあり、冷たい目で見られる対象は「おじさん」です。"
        }
      },
      {
        "id": "q40-2",
        "questionText": "問2 この文章によると、ダジャレのよい点は何か。",
        "options": [
          "ダジャレを作ろうとすると、脳のトレーニングになる。",
          "ダジャレを作るために、いろいろなことを調べる。",
          "ダジャレを聞いて笑うと、脳の働きがよくなる。",
          "ダジャレを聞くと、似たような音の言葉をたくさん覚える。"
        ],
        "correctOption": {
          "text": "ダジャレを作ろうとすると、脳のトレーニングになる。",
          "explanation": "「おもしろいダジャレを作ろうとしていれば、脳を鍛えることにもなり」とあるので、1が正解です。"
        }
      },
      {
        "id": "q40-3",
        "questionText": "問3 この文章を書いた人が一番言いたいことはどれか。",
        "options": [
          "中高年の男性はおもしろいダジャレを言うが、まわりの人は理解できない。",
          "中高年の男性はダジャレを言う人が多く、よくみんなを楽しませている。",
          "ダジャレはだれにでも作れるが、まわりの人に言うのはよいことではない。",
          "ダジャレは簡単に作れ、緊張をなくしたり、気持ちを明るくすることもできる。"
        ],
        "correctOption": {
          "text": "ダジャレは簡単に作れ、緊張をなくしたり、気持ちを明るくすることもできる。",
          "explanation": "最終段落の「簡単な言葉選びで緊張がとけたり、笑い合って明るい気持ちになったり、脳のトレーニングにもなるなら、それはすばらしいことではないだろうか」という筆者の意見に最も近い4が正解です。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 40!");
  } else {
    console.log("Could not find Mondai 40");
  }
}
