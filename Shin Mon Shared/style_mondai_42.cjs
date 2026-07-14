const fs = require('fs');

const p42Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>日本語では「する」という言い方よりも「なる」という言い方のほうが好んで使われる。「する」を使うと<span class="underline underline-offset-4">話し手の意志がある</span>ことが伝わり、「なる」を使うと話し手の意志ではなく自然に起きた、そのような状態にあるということが伝わる。</p>
    <p>例えば、禁煙のレストランで一人の客がタバコを吸っている場面で、店側は何と言ってタバコをやめてもらうだろうか。このレストランを禁煙と決めたのは店の人だ。店の人の意志でそのレストランを禁煙にしたはずだ。それならば、「ここは禁煙にしております。」と言うのが自然に思える。しかし、この「〜にする」は<span class="underline underline-offset-4">上に書いたとおり</span>、話し手の意志が強く伝わる。この場面では、相手の「たばこを吸う」という行動に対立する<span class="text-xs">(注1)</span>意志が強く表現されてしまう。その結果、相手を怒らせてしまうかもしれない。一方、「ここは禁煙になっております。」と言うと、自分の意志とは関係なく、単にレストランの決まりを伝えているという形になり、相手と対立するような形にはならずに言いたいことを伝えられる。</p>
    <p>このように日本人は「なる」をうまく使うことで人と対立しないようにしているのだ。「する」と「なる」は文字で見るとたった一文字の小さい違いだが、コミュニケーションの上では大きな違いなのである。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m42Index = ch4.passages.findIndex(p => p.title.includes("42"));
  
  if (m42Index !== -1) {
    let m42 = ch4.passages[m42Index];
    m42.title = "第4部 問題42";
    m42.passageText = p42Html.trim();
    m42.passageLayout = "html";
    m42.mondaiHeader = "問題42　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m42.passageNotes = "<p>(注1)対立する：二つのものが反対の立場に立つ</p>";
    
    m42.questions = [
      {
        "id": "q42-1",
        "questionText": "問1 「話し手の意志がある」とあるが、どういうことか。",
        "options": [
          "話し手がそうしたいと思ってやっている。",
          "話し手が自然にそうしている。",
          "話し手はやりたくないのにやっている。",
          "話し手はどちらでもいいが聞き手がそうしたいと思っている。"
        ],
        "correctOption": {
          "text": "話し手がそうしたいと思ってやっている。",
          "explanation": "「意志」とは、自分がそうしようとする積極的な気持ちや考えのことなので、1が正解です。"
        }
      },
      {
        "id": "q42-2",
        "questionText": "問2 「上に書いたとおり」とあるが、どこを指しているか。",
        "options": [
          "日本語では「する」という言い方よりも「なる」という言い方が好まれる。",
          "日本語では「する」を使うと話し手の意志があることが伝わる。",
          "店の人の意志でそのレストランを禁煙にしたはずだ。",
          "「ここは禁煙にしております。」と言うのが自然に思える。"
        ],
        "correctOption": {
          "text": "日本語では「する」を使うと話し手の意志があることが伝わる。",
          "explanation": "「この『〜にする』は上に書いたとおり、話し手の意志が強く伝わる」とあるため、第1段落の「『する』を使うと話し手の意志があることが伝わり…」の部分を指しています。"
        }
      },
      {
        "id": "q42-3",
        "questionText": "問3 この場合の店の人の一番の目的は何か。",
        "options": [
          "タバコを吸っている客にレストランの決まりを伝えたい。",
          "レストランでタバコを吸っている客にタバコをやめさせたい。",
          "タバコを吸っている客を叱りたい。",
          "タバコを吸っている客を傷つけたくない。"
        ],
        "correctOption": {
          "text": "レストランでタバコを吸っている客にタバコをやめさせたい。",
          "explanation": "本文の「店側は何と言ってタバコをやめてもらうだろうか」という部分から、店員の最終的な一番の目的は「タバコをやめさせること」です。"
        }
      },
      {
        "id": "q42-4",
        "questionText": "問4 この文章の内容として正しいものはどれか。",
        "options": [
          "「する」は相手の意志を強く伝えるもので、対立することがある。",
          "「なる」を使うと対立をさけることができる。",
          "「する」は単に決まりを教える言い方である。",
          "「なる」を使うと相手と対立してしまう。"
        ],
        "correctOption": {
          "text": "「なる」を使うと対立をさけることができる。",
          "explanation": "本文に「『なる』をうまく使うことで人と対立しないようにしているのだ」とあるため、2が正解です。1は「相手の意志」ではなく「話し手の意志」なので間違いです。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 42!");
  } else {
    console.log("Could not find Mondai 42");
  }
}
