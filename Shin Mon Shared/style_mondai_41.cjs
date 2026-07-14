const fs = require('fs');

const p41Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="writing-vertical-rl font-serif mx-auto text-sm md:text-base leading-loose max-h-[400px] flex flex-wrap content-start">
    <p class="mb-4">拝啓</p>
    <p class="indent-4">桜が満開になり、すっかり春らしくなりました。</p>
    <p>いかがお過ごしでしょうか。</p>
    <p class="indent-4">さて、このたび、私が習っているギターの先生のコンサートが六月十日に開かれることになりました。今回は、先生のお友達であるプロのギタリスト、南ゆかりさんが特別ゲストとして出演されます。<span class="underline underline-offset-4">詳細</span><span class="text-xs">(注1)</span>は同封のチラシをごらんください。</p>
    <p class="indent-4">お忙しいことと思いますが、ご来場いただければ幸いです。なお、席が限られていますので、来ていただけるのでしたら、私あてに前日までにメールかお電話で人数をご連絡いただけますか。入場券を受付に用意しておきます。代金は結構です。</p>
    <p class="indent-4">まだ、気温の変化が大きい日々が続きます。どうぞお体にお気をつけて過ごされますように。</p>
    <p class="text-right mt-4">敬具</p>
    <p class="text-right mt-4">二〇一三年四月三日</p>
    <p class="text-right mt-2">大山春暖</p>
    <p class="mt-8">ヘンドラ・ミラン様</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m41Index = ch4.passages.findIndex(p => p.title.includes("41"));
  
  if (m41Index !== -1) {
    let m41 = ch4.passages[m41Index];
    m41.title = "第4部 問題41";
    m41.passageText = p41Html.trim();
    m41.passageLayout = "html";
    m41.mondaiHeader = "問題41　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m41.passageNotes = "<p>(注1)詳細：くわしいこと</p>";
    
    m41.questions = [
      {
        "id": "q41-1",
        "questionText": "問1 このコンサートに出演するのはだれか。",
        "options": [
          "大山さんと南ゆかりさん",
          "大山さんと先生と南ゆかりさん",
          "先生と南ゆかりさん",
          "南ゆかりさんと特別ゲスト"
        ],
        "correctOption": {
          "text": "先生と南ゆかりさん",
          "explanation": "手紙に「私が習っているギターの先生のコンサート」があり、「南ゆかりさんが特別ゲストとして出演されます」とあるため、3が正解です。"
        }
      },
      {
        "id": "q41-2",
        "questionText": "問2 ヘンドラさんは、妻とこのコンサートに行きたい。どうしたらよいか。",
        "options": [
          "大山さんにメールで2人分の券をお願いする。",
          "大山さんにメールで2人分の券をお願いし、受付にお金を送る。",
          "会場にメールで2人分の券をお願いする。",
          "会場にメールで2人分の券をお願いし、当日、受付でお金を払う。"
        ],
        "correctOption": {
          "text": "大山さんにメールで2人分の券をお願いする。",
          "explanation": "「私あて（大山さんあて）に…メールかお電話で人数をご連絡いただけますか」「代金は結構（無料）です」とあるため、お金は不要で大山さんに連絡する1が正解です。"
        }
      },
      {
        "id": "q41-3",
        "questionText": "問3 行く連絡は、いつまでにしなければならないか。",
        "options": [
          "4月2日",
          "4月3日",
          "6月9日",
          "6月10日"
        ],
        "correctOption": {
          "text": "6月9日",
          "explanation": "コンサートは「六月十日」であり、連絡は「前日までに」とあるため、6月10日の前日である6月9日が正解です。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 41!");
  } else {
    console.log("Could not find Mondai 41");
  }
}
