const fs = require('fs');

const p37Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>日本語で話し合いをしているとき、なかなか話に入れないことがある。どうしたら、参加できるようになるだろうか。</p>
    <p>まずは、だれかが話しているとき、首を縦に振って「うなずく」ことである。1対1の話し合いならうなずいている人でも、多くの人での話し合いでは、何もしないでじっとしていることがある。しかし、これでは話している人は、不安になってしまう。うなずきは、相手の意見に同意するときだけでなく、同意できないときでも「あなたの話を聞いています」という合図なので、小さくうなずくだけで話し合いに参加できていることになる。<span class="underline underline-offset-4">そうすると</span>、話し手は安心して先に進める。うなずくとき、「はい」や「そうですね」と相づちを打ってもいい。</p>
    <p>さらに、共感できる<span class="text-xs">(注1)</span>ところで「本当にそうですね」と言うことが大切である。このようにしていると、会話に入りやすくなる。</p>
    <div class="text-right text-xs text-gray-500 mt-2">（今井登茂子「うなずいて共感を表現」日本経済新聞朝刊2011年9月24日より）</div>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m37Index = ch4.passages.findIndex(p => p.title.includes("37"));
  
  if (m37Index !== -1) {
    let m37 = ch4.passages[m37Index];
    m37.title = "第4部 問題37";
    m37.passageText = p37Html.trim();
    m37.passageLayout = "html";
    m37.mondaiHeader = "問題37　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m37.passageNotes = "<p>(注1)共感する：相手の気持ちや意見を自分も同じように感じたり、理解したりする。</p>";
    
    m37.questions = [
      {
        "id": "q37-1",
        "questionText": "問1 「そうすると」とあるが、どのようにすることか。",
        "options": [
          "相手に「あなたの話を聞いています」と言う。",
          "相手の意見に同意できるときにだけ、首を縦に振る。",
          "相手が話しているときは、何もしないでじっとしている。",
          "相手の意見に同意できるときもできないときも首を縦に振る。"
        ],
        "correctOption": {
          "text": "相手の意見に同意できるときもできないときも首を縦に振る。",
          "explanation": "「そうする」は前の文「小さくうなずくだけ」を指しています。うなずくことは「首を縦に振る」ことであり、その前の文に「同意するときだけでなく、同意できないときでも…合図なので」とあるため、4が正解です。"
        }
      },
      {
        "id": "q37-2",
        "questionText": "問2 うなずくことは、どのような役割があるか。",
        "options": [
          "相手の話を早く先に進ませる役割",
          "相手の話を聞いていることを示す役割",
          "相手の意見に共感していることを伝える役割",
          "自分がこれから話し始めたいことを表す役割"
        ],
        "correctOption": {
          "text": "相手の話を聞いていることを示す役割",
          "explanation": "本文に「『あなたの話を聞いています』という合図なので」とはっきり書かれています。"
        }
      },
      {
        "id": "q37-3",
        "questionText": "問3 この文章では、どうすれば上手に会話に入れると言っているか。",
        "options": [
          "1対1の話し合いではうなずくこと、大勢では相づちを打つこと",
          "だれかが話しているときにうなずいたり、相づちを打ったりすること",
          "相手が話している間はじっと聞き、終わってから「そうですね」と言うこと",
          "相手の話に共感できなくても、「本当にそうですね」と相づちを打つこと"
        ],
        "correctOption": {
          "text": "だれかが話しているときにうなずいたり、相づちを打ったりすること",
          "explanation": "筆者は会話に入る方法として「うなずく」ことや「相づちを打つ」ことを勧めています。4は「共感できなくても」と言っているので本文（共感できるところで…）と合っていません。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 37, fixing all OCR errors and mapping correct answers!");
  } else {
    console.log("Could not find Mondai 37");
  }
}
