const fs = require('fs');

const p32Html = `
<div class="bg-gray-100 dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-400 font-sans shadow-md text-sm md:text-base leading-loose max-w-2xl mx-auto relative">
  
  <!-- Email Headers -->
  <div class="mb-6 space-y-1 pb-4 border-b border-dashed border-gray-500">
    <div class="flex">
      <span class="font-bold w-20 tracking-widest">あて先</span>
      <span>： 1234abc@lits.ac.jp</span>
    </div>
    <div class="flex">
      <span class="font-bold w-20 tracking-widest">件名</span>
      <span>： 月曜日の約束</span>
    </div>
    <div class="flex">
      <span class="font-bold w-20 tracking-widest">送信日時</span>
      <span>： 20XX年7月16日 13:16</span>
    </div>
  </div>
  
  <!-- Email Body -->
  <div class="space-y-4">
    <p>サラさん</p>
    <p>こんにちは、山田です。</p>
    <p>来週の月曜日に研究室に来てくれるという約束でしたが、<br/>実は急に会議が入ってしまい、都合が悪くなってしまいました。</p>
    <p>申し訳ないけれど、日時を変更させてください。</p>
    <p>もし早いほうがよければ明日、17日の5:00以降、<br/>月曜日よりも後でよければ、水、木なら10時からOKです。</p>
    <p>サラさんの都合を教えてください。</p>
  </div>
  
  <div class="mt-8 border-t border-dashed border-gray-500 pt-4">
    <p>○×大学 外国語学部</p>
    <p class="font-bold text-lg">山田 はな</p>
    <p class="text-gray-600 dark:text-gray-400">e-mail： yamadahana@marubatsu.ac.jp</p>
  </div>
  
  <!-- Subtle Envelope Icon -->
  <div class="absolute top-4 right-4 text-4xl opacity-10">✉️</div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m32Index = ch4.passages.findIndex(p => p.title.includes("32"));
  
  if (m32Index !== -1) {
    let m32 = ch4.passages[m32Index];
    m32.title = "第4部 問題32";
    m32.passageText = p32Html.trim();
    m32.passageLayout = "html";
    m32.mondaiHeader = "問題32　○×大学のサラさんは山田先生の研究室に月曜日に行く約束をしていたが、山田先生から下のようなメールが届いた。これを読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // The correct answer is 2, ensure it's explicitly set via object structure
    m32.questions = [
      {
        "id": "q32-1",
        "questionText": "問い このメールを読んだ後、サラさんは山田先生にどんなメールを出せばよいか。",
        "options": [
          "もう一度先生の都合を聞くメール",
          "自分の都合を教えるメール",
          "約束を延期したことをあやまるメール",
          "都合が悪くなったことをあやまるメール"
        ],
        "correctOption": {
          "text": "自分の都合を教えるメール",
          "explanation": "メールの最後に「サラさんの都合を教えてください。」と山田先生からお願いされているので、サラさんは自分の都合を返信します。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Restyled Mondai 32 as a proper email layout!");
  } else {
    console.log("Could not find Mondai 32!");
  }
}
