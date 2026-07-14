const fs = require('fs');

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');

  let m28Index = ch3.passages.findIndex(p => p.title.includes("28"));
  if (m28Index !== -1) {
    let m28 = ch3.passages[m28Index];
    
    // Update header
    m28.mondaiHeader = "問題28　ソウさんは友人の中村花子さんの誕生日にチョコレートを贈ろうと思い、インターネットで注文した。その後、右のページのメールを受け取った。これを読んで下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // Update questions
    m28.questions = [
      {
        "id": "q28-1",
        "questionText": "問い 品物が中村さんの家に届けられたかどうかを知りたいが、どうしたらよいか。",
        "options": [
          "8月1日ごろに届くことはわかるが、それ以上は調べられない。",
          "このメールに返信をして、いつ届くかを問い合わせる。",
          "○×ショップのホームページへ行き、調べる。",
          "このメールの画面の「お客様情報」の部分をクリックして調べる。"
        ],
        "correctOption": {
          "text": "このメールの画面の「お客様情報」の部分をクリックして調べる。",
          "explanation": "メール本文に「※ご注文の配送状況は右の（ お客様情報 ）からご確認いただけます。」とあるため、配送状況（届けられたかどうか）を知るには「お客様情報」をクリックします。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Updated Mondai 28 with the actual questions and answers!");
  } else {
    console.log("Could not find Mondai 28 in Chapter 3!");
  }
}
