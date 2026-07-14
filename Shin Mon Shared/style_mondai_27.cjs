const fs = require('fs');

const p27Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm">
  <p class="mb-4 text-sm md:text-base leading-loose indent-4">
    ある大学の大学生を対象に、アルバイトについてアンケート調査した。その結果、この大学の場合、全体の約8割がアルバイトしていることがわかった。男女別にみると、男子学生のうちの79.4%がアルバイトをしているのに対して、女子学生は83.4%であり、女子学生の割合のほうが、男子学生を上回って<span class="text-xs">(注1)</span>いる。
  </p>
  
  <p class="mb-8 text-sm md:text-base leading-loose indent-4">
    下のグラフはアルバイトの目的について調査した結果を表している。アルバイトの目的は、「生活費を稼ぐため」(32.8%)と「学生生活を楽しむため」(32.4%)がほぼ<span class="text-xs">(注2)</span>同数で、次に「社会経験のため」(24.2%)となる。「学生生活を楽しむため」とは、旅行や遊び、クラブ活動など、生活を楽しむお金を稼ぐためという意味だ。「勉学費」も含め、「お金を稼ぐため」が6割以上を占めてはいるが、アルバイトの目的がお金を稼ぐためだけでないことも注目すべきことだ。
  </p>
  
  <!-- Pie Chart Container -->
  <div class="border border-gray-400 p-6 mb-2 max-w-lg mx-auto bg-gray-50 dark:bg-gray-700">
    <h3 class="text-center font-bold text-lg mb-6">アルバイトの目的</h3>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-8">
      
      <!-- CSS Pie Chart -->
      <div class="relative w-48 h-48 rounded-full border-2 border-gray-800 dark:border-gray-300" 
           style="background: conic-gradient(
             #ffffff 0% 32.8%, 
             #e5e7eb 32.8% 65.2%, 
             #9ca3af 65.2% 89.4%, 
             #6b7280 89.4% 90.4%, 
             #4b5563 90.4% 94.9%, 
             #d1d5db 94.9% 100%
           );">
      </div>
      
      <!-- Legend -->
      <div class="text-sm space-y-2 font-medium">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border border-gray-800 bg-[#ffffff]"></div>
          <span>生活費を稼ぐため (32.8%)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border border-gray-800 bg-[#e5e7eb]"></div>
          <span>学生生活を楽しむため (32.4%)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border border-gray-800 bg-[#9ca3af]"></div>
          <span>社会経験のため (24.2%)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border border-gray-800 bg-[#6b7280]"></div>
          <span>勉学費を稼ぐため (1.0%)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border border-gray-800 bg-[#4b5563]"></div>
          <span>その他 (4.5%)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border border-gray-800 bg-[#d1d5db]"></div>
          <span>無回答 (5.1%)</span>
        </div>
      </div>
      
    </div>
  </div>
  
  <p class="text-right text-xs text-gray-500 mb-6">東京大学2008年（第58回）学生生活実態調査より引用</p>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');

  let m27 = {
    "title": "第3部 問題27",
    "passageText": p27Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題27　下の文章を読み、下の質問に答えなさい。答えは１、２、３、４の中から最もよいものを一つえらびなさい。",
    "passageNotes": "<p>(注1) 上回る：ものごとがある数や量や程度より多くなる</p><p>(注2) ほぼ：だいたい</p>",
    "questions": [
      {
        "id": "q27-1",
        "questionText": "問い この調査について述べているもので最も正しいものはどれか。",
        "options": [
          "アルバイトをしている男子学生の割合はアルバイトをしている女子学生の割合より多い。",
          "学生生活を楽しむためにアルバイトをしている学生は全体の約3分の2を占める。",
          "アルバイトの目的は、お金を稼ぐためだけではない。",
          "ほとんどの学生がお金を稼ぐためにアルバイトをしている。"
        ],
        "correctOption": {
          "text": "アルバイトの目的は、お金を稼ぐためだけではない。",
          "explanation": "本文の最後に「アルバイトの目的がお金を稼ぐためだけでないことも注目すべきことだ。」とはっきり書かれています。"
        }
      }
    ]
  };

  // Insert m27 right after m26 (which is at index 5). So m27 will be at index 6.
  ch3.passages.splice(6, 0, m27);

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Reconstructed Mondai 27 with Pie Chart and appended it to Chapter 3!");
}
