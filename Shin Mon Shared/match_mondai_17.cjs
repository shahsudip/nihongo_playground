const fs = require('fs');

const p17Html = `
<div class="font-sans text-sm md:text-base text-gray-800 dark:text-gray-200 leading-loose">
  
  <!-- Top Shaded Box -->
  <div class="bg-gray-200 dark:bg-gray-800 border border-gray-500 p-4 mb-6 relative">
    <h3 class="text-xl font-bold text-center mb-4 tracking-widest">親子丼の作り方</h3>
    
    <div class="flex flex-col md:flex-row justify-between relative z-10">
      <!-- Left Column: Ingredients -->
      <div class="mb-4 md:mb-0 md:w-1/2">
        <h4 class="font-bold mb-2">材料(2人分)</h4>
        <ul class="space-y-1">
          <li>ごはん・・・どんぶり2杯分</li>
          <li>とり肉・・・1枚(約150g)</li>
          <li>たまご・・・4コ</li>
          <li>たまねぎ・・・1/4コ</li>
          <li>だし汁・・・カップ1杯(200cc)</li>
        </ul>
      </div>
      
      <!-- Right Column: Seasonings -->
      <div class="md:w-1/2">
        <h4 class="font-bold mb-2 invisible md:visible">調味料</h4>
        <div class="md:-mt-8">
          <h4 class="font-bold mb-2 md:hidden">調味料</h4>
          <ul class="space-y-1 relative">
            <li>みりん・・・大さじ2</li>
            <li>酒・・・大さじ1</li>
            <li>しょうゆ・・・大さじ2</li>
            <li>さとう・・・大さじ1</li>
            <!-- Rice Bowl Emoji as illustration -->
            <div class="absolute right-0 top-0 text-5xl md:text-6xl opacity-80" style="transform: translateY(-20%);">
              🍚
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Instructions Section -->
  <div class="mb-4">
    <div class="inline-block border border-gray-600 dark:border-gray-400 px-3 py-1 mb-4 font-bold bg-white dark:bg-gray-900">
      作り方
    </div>
    
    <div class="flex justify-between items-start mb-6">
      <div class="flex-grow pr-4 space-y-4">
        <div class="flex"><span class="mr-2">1.</span><p>まず、とり肉を一口大(注1)に切り、たまねぎをうす切りにします。<br/>ボールにたまごを割って混ぜておきます。</p></div>
        <div class="flex"><span class="mr-2">2.</span><p>なべにだし汁(注2)、みりん、酒、しょうゆ、<br/>さとうを入れて火にかけます。</p></div>
        <div class="flex"><span class="mr-2">3.</span><p>沸騰したら、たまねぎ、とり肉を入れて、<br/>中火～弱火で煮ます。</p></div>
        <div class="flex"><span class="mr-2">4.</span><p>とり肉が煮えたら、たまごを回し入れます(注3)。<br/>固まり始めたら、火をとめます。</p></div>
        <div class="flex"><span class="mr-2">5.</span><p>ごはんの上にのせて、出来あがり！</p></div>
      </div>
      
      <!-- Right side emoji illustrations -->
      <div class="hidden sm:flex flex-col space-y-8 text-4xl opacity-80 pt-2 items-center min-w-[60px]">
        <div>🔪🧅</div>
        <div>🍳</div>
        <div class="mt-8">🥚</div>
      </div>
    </div>
  </div>

  <!-- Caution Section -->
  <div class="mb-6">
    <div class="inline-block border border-gray-600 dark:border-gray-400 px-3 py-1 mb-2 font-bold bg-white dark:bg-gray-900">
      ここに注意！
    </div>
    <p>最後にたまごを入れたら、あまり混ぜないこと。そして長く煮ないこと。</p>
  </div>

  <!-- Notes Section -->
  <div class="text-sm">
    <p>(注1) 一口大：口に入るくらいの大きさ</p>
    <p>(注2) だし汁：こんぶやかつおぶしで作ったスープ</p>
    <p>(注3) 回し入れる：まるをかくようにして入れる</p>
  </div>

</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  let ch2 = books.find(b => b.id === 'shinkanzen-master-n3-reading').chapters.find(c => c.id === 'shinkanzen-ch-2-medium');

  let m17 = ch2.passages.find(p => p.title === "第2部 問題17");
  if (m17) {
    m17.passageText = p17Html.trim();
    m17.passageLayout = "html";
    
    // Also fix Question 17 text
    m17.questions[0].options = [
      "なべにだし汁、とり肉、たまねぎ、たまごを入れてから火にかける。",
      "なべにだし汁、調味料、とり肉を入れ、沸騰したら、たまねぎとたまごを入れる。",
      "なべにだし汁、調味料を入れ、沸騰したら、はじめにたまごを入れる。",
      "なべにだし汁、調味料を入れ、沸騰したら、とり肉とたまねぎを入れる。"
    ];
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Mondai 17 upgraded to exact screenshot layout!");
  }
}
