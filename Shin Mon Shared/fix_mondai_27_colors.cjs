const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題27')) {
          p.passageText = `<div class="bg-white dark:bg-gray-800 p-6 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm">
  <p class="mb-4 text-sm md:text-base leading-loose indent-4">
    ある大学の大学生を対象に、アルバイトについてアンケート調査した。その結果、この大学の場合、全体の約8割がアルバイトしていることがわかった。男女別にみると、男子学生のうちの79.4%がアルバイトをしているのに対して、女子学生は83.4%であり、女子学生の割合のほうが、男子学生を上回って<span class="text-xs">(注1)</span>いる。
  </p>
  
  <p class="mb-8 text-sm md:text-base leading-loose indent-4">
    下のグラフはアルバイトの目的について調査した結果を表している。アルバイトの目的は、「生活費を稼ぐため」(32.8%)と「学生生活を楽しむため」(32.4%)がほぼ<span class="text-xs">(注2)</span>同数で、次に「社会経験のため」(24.2%)となる。「学生生活を楽しむため」とは、旅行や遊び、クラブ活動など、生活を楽しむお金を稼ぐためという意味だ。「勉学費」も含め、「お金を稼ぐため」が6割以上を占めてはいるが、アルバイトの目的がお金を稼ぐためだけでないことも注目すべきことだ。
  </p>
  
  <!-- Pie Chart Container -->
  <div class="border-2 border-gray-400 p-6 mb-2 max-w-lg mx-auto bg-white relative h-[360px] md:h-[420px] flex items-center justify-center text-black">
    <h3 class="absolute top-4 w-full text-center font-bold text-lg tracking-widest text-black">アルバイトの目的</h3>
    
    <!-- SVG Pie Chart for perfect borders and shading -->
    <svg viewBox="-100 -100 200 200" class="w-48 h-48 md:w-56 md:h-56 transform -rotate-90">
      <circle r="100" cx="0" cy="0" fill="white" stroke="black" stroke-width="1"></circle>
      
      <!-- Slice 3: 社会経験 -->
      <circle r="50" cx="0" cy="0" fill="transparent" stroke="#9ca3af" stroke-width="100" stroke-dasharray="76.0 314.2" stroke-dashoffset="-204.8"></circle> 
      
      <!-- その他: 4.5% -->
      <circle r="50" cx="0" cy="0" fill="transparent" stroke="#6b7280" stroke-width="100" stroke-dasharray="14.1 314.2" stroke-dashoffset="-280.9"></circle> 
      
      <!-- 勉学費: 1.0% -->
      <circle r="50" cx="0" cy="0" fill="transparent" stroke="black" stroke-width="100" stroke-dasharray="3.1 314.2" stroke-dashoffset="-295.0"></circle> 
      
      <!-- Lines between slices -->
      <line x1="0" y1="0" x2="-88.3" y2="46.8" stroke="black" stroke-width="1.5"></line>
      <line x1="0" y1="0" x2="-57.7" y2="-81.6" stroke="black" stroke-width="1.5"></line>
      <line x1="0" y1="0" x2="78.6" y2="-61.8" stroke="black" stroke-width="1.5"></line>
      <line x1="0" y1="0" x2="92.7" y2="-37.4" stroke="black" stroke-width="1.5"></line>
      <line x1="0" y1="0" x2="94.9" y2="-31.5" stroke="black" stroke-width="1.5"></line>
      <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-width="1.5"></line>
      
      <circle r="100" cx="0" cy="0" fill="none" stroke="black" stroke-width="2"></circle>
    </svg>
    
    <!-- Absolutely positioned text labels to match image perfectly -->
    <!-- Inside labels -->
    <div class="absolute font-bold text-xs md:text-sm text-center text-black" style="top: 45%; left: 63%;">生活費を稼<br/>ぐため<br/>32.8%</div>
    <div class="absolute font-bold text-xs md:text-sm text-center text-black" style="top: 70%; left: 45%;">学生生活を<br/>楽しむため<br/>32.4%</div>
    <div class="absolute font-bold text-xs md:text-sm text-center text-black" style="top: 55%; left: 25%; text-shadow: 1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white;">社会経験<br/>のため<br/>24.2%</div>
    
    <!-- Outside labels with drawing lines -->
    <!-- 無回答 -->
    <div class="absolute font-bold text-xs md:text-sm text-center text-black" style="top: 15%; left: 15%;">無回答<br/>5.1%</div>
    <div class="absolute border-t border-black w-12" style="top: 25%; left: 25%; transform: rotate(20deg);"></div>
    
    <!-- その他 -->
    <div class="absolute font-bold text-xs md:text-sm text-center text-black" style="top: 25%; left: 40%;">その他<br/>4.5%</div>
    <div class="absolute border-t border-black w-8" style="top: 32%; left: 46%; transform: rotate(70deg);"></div>
    
    <!-- 勉学費 -->
    <div class="absolute font-bold text-xs md:text-sm text-center text-black" style="top: 32%; left: 10%;">勉学費を稼<br/>ぐため<br/>1.0%</div>
    <div class="absolute border-t border-black w-12" style="top: 40%; left: 30%; transform: rotate(-20deg);"></div>
    
  </div>
  
  <div class="text-right text-xs text-gray-500 mb-2 mr-4">東京大学2008年（第58回）学生生活実態調査より引用</div>
</div>`;
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Fixed text visibility in Mondai 27 pie chart!');
}
