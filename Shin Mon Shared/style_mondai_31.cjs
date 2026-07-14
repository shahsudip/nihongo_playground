const fs = require('fs');

const p31Html = `
<div class="bg-[var(--color-bg-secondary)] dark:bg-gray-800 p-6 md:p-8 rounded border-2 border-gray-400 font-sans shadow-md relative overflow-hidden">
  
  <h3 class="font-bold text-lg border-b border-gray-400 pb-2 mb-4">使用方法</h3>
  <ul class="space-y-3 mb-8 text-sm md:text-base leading-relaxed">
    <li>①右側のハンドルを引き出します。</li>
    <li>②ハンドルを矢印の方向にくり返し回すことで、発電ができます。1分間の発電で、約10分の使用が可能です。</li>
    <li>③ライトスイッチを押すと、ライトがつきます。</li>
    <li>④ライトスイッチを押してから、白いボタンを押すと、ライトを点滅<span class="text-xs">(注1)</span>させることができます。</li>
  </ul>
  
  <h3 class="font-bold text-lg border-b border-gray-400 pb-2 mb-4 mt-8">使用上の注意</h3>
  <ul class="space-y-3 mb-4 text-sm md:text-base leading-relaxed ml-2">
    <li>・長時間ご使用の場合、ライトが暗くなることがあります。<br/>　暗くなりましたら、発電用ハンドルを回してください。</li>
    <li>・故障の原因となりますので、中を開けて分解しないでください。</li>
    <li>・本製品は防水性ではありませんので、ぬらさないでください。</li>
  </ul>
  
  <!-- Flashlight Icon -->
  <div class="absolute bottom-4 right-4 text-6xl opacity-80 transform -rotate-12">
    🔦
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long'); // Part 3: Information Retrieval

  let m31 = {
    "title": "第3部 問題31",
    "passageText": p31Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題31　つぎの文章は手動発電式ライトの説明書である。本文を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "passageNotes": "<p>(注1) 点滅：ライトがついたり消えたりすること</p>",
    "questions": [
      {
        "id": "q31-1",
        "questionText": "問い 本文の内容と合っているものはどれか。",
        "options": [
          "ライトがつかなくなったら、電池を取り替えればよい。",
          "ライトが暗くなったら、ハンドルを回して発電すればよい。",
          "ライトスイッチを押せば、ライトを点滅させることができる。",
          "長時間使うとライトが暗くなるので、短い時間だけ使うようにする。"
        ],
        "correctOption": {
          "text": "ライトが暗くなったら、ハンドルを回して発電すればよい。",
          "explanation": "「使用上の注意」に、「長時間ご使用の場合、ライトが暗くなることがあります。暗くなりましたら、発電用ハンドルを回してください。」と書かれています。"
        }
      }
    ]
  };

  // Insert m31 at the very end of Chapter 3 (Information Retrieval)
  ch3.passages.push(m31);

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Reconstructed Mondai 31 (Flashlight Manual) and appended it to Chapter 3!");
}
