const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題41')) {
          p.passageText = `
<div class="relative w-full max-w-3xl mx-auto border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-sm my-6 overflow-x-auto shadow-inner">
  <div style="writing-mode: vertical-rl; height: 380px; font-family: 'Noto Serif JP', serif;" class="mx-auto text-base md:text-lg leading-[2.5] text-gray-900 dark:text-gray-100">
    <p>拝啓</p>
    <p style="margin-top: 1em;">桜が満開になり、すっかり春らしくなりました。いかがお過ごしでしょうか。</p>
    <p style="margin-top: 1em;">さて、このたび、私が習っているギターの先生のコンサートが六月十日に開かれることになりました。今回は、先生のお友達であるプロのギタリスト、南ゆかりさんが特別ゲストとして出演されます。<span style="text-decoration: underline; text-underline-offset: 4px;">詳細</span><span style="font-size: 0.75em; text-orientation: mixed;">(注1)</span>は同封のチラシをごらんください。</p>
    <p style="margin-top: 1em;">お忙しいことと思いますが、ご来場いただければ幸いです。なお、席が限られていますので、来ていただけるのでしたら、私あてに前日までにメールかお電話で人数をご連絡いただけますか。入場券を受付に用意しておきます。代金は結構です。</p>
    <p style="margin-top: 1em;">まだ、気温の変化が大きい日々が続きます。どうぞお体にお気をつけて過ごされますように。</p>
    <p style="text-align: right; margin-top: 1em;">敬具</p>
    <p style="text-align: right; margin-top: 1em;">二〇一三年四月三日</p>
    <p style="text-align: right; margin-bottom: 2em;">大山春暖</p>
    <p style="margin-top: 2em;">ヘンドラ・ミラン様</p>
  </div>
</div>`.trim();
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully styled Mondai 41 vertically!');
  }
}
