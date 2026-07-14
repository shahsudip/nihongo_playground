const fs = require('fs');

const p17Html = `
<div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg">
  <h3 class="text-xl font-bold text-center mb-6 text-yellow-800 dark:text-yellow-400 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2">親子丼の作り方</h3>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <h4 class="font-bold border-l-4 border-yellow-500 pl-2 mb-3">材料(2人分)</h4>
      <ul class="space-y-1 text-sm md:text-base">
        <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"><span>ごはん</span><span>どんぶり2杯分</span></li>
        <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"><span>とり肉</span><span>1枚(約150g)</span></li>
        <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"><span>たまねぎ</span><span>1/4コ</span></li>
        <li class="flex justify-between pb-1"><span>たまご</span><span>4コ</span></li>
      </ul>
    </div>
    
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
      <h4 class="font-bold border-l-4 border-yellow-500 pl-2 mb-3">調味料</h4>
      <ul class="space-y-1 text-sm md:text-base">
        <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"><span>みりん</span><span>大さじ2</span></li>
        <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"><span>しょうゆ</span><span>大さじ2</span></li>
        <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"><span>さとう</span><span>大さじ1</span></li>
        <li class="flex justify-between pb-1"><span>だし汁</span><span>カップ1杯(200cc)</span></li>
      </ul>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 p-5 rounded shadow-sm mb-6">
    <h4 class="font-bold border-b-2 border-yellow-500 mb-4 pb-1">作り方</h4>
    <ol class="list-decimal list-inside space-y-3 leading-relaxed text-sm md:text-base">
      <li>まず、とり肉を一口大(注1)に切り、たまねぎをうす切りにします。ボールにたまごを割って混ぜておきます。</li>
      <li>なべにだし汁(注2)、みりん、しょうゆ、さとうを入れて火にかけます。</li>
      <li>沸騰したら、たまねぎ、とり肉を入れて、中火～弱火で煮ます。</li>
      <li>とり肉が煮えたら、たまごを回し入れます(注3)。固まり始めたら、火をとめます。</li>
      <li>ごはんの上にのせて、出来あがり！</li>
    </ol>
  </div>

  <div class="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 p-4 rounded mb-6 text-sm md:text-base">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2 flex items-center">
      <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
      ここに注意！
    </h4>
    <p>最後にたまごを入れたら、あまり混ぜないこと。そして長く煮ないこと。</p>
  </div>

  <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400 space-y-1">
    <p>(注1)一口大：口に入るくらいの大きさ</p>
    <p>(注2) だし汁：こんぶやかつおぶしで作ったスープ</p>
    <p>(注3) 回し入れる：まるをかくようにして入れる</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch2 = b.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');

  let m17 = ch2.passages.find(p => p.title === "第2部 問題17");
  if (m17) {
    m17.passageText = p17Html.trim();
    m17.passageLayout = "html";
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Mondai 17 upgraded to custom recipe layout!");
  }
}
