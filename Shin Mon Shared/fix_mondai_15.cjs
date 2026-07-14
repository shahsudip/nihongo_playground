const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題15')) {
          p.passageText = `<div class="bg-gray-200 dark:bg-gray-800 p-6 border border-gray-400 border-dashed rounded font-serif" style="writing-mode: vertical-rl; text-orientation: upright; height: 450px; overflow-x: auto; max-width: 100%;">
  <p class="mb-4">拝啓</p>
  <p class="mb-4 indent-4">紅葉がきれいな季節になってきました。皆さま、お元気でお過ごしのことと思います。</p>
  <p class="mb-4 indent-4">先日は久しぶりにチャンさんにお会いすることができて、とてもうれしかったです。仕事も順調に進んでいるとうかがい、安心しました。また、ソナちゃんがかわいい小学生になっていてびっくりしました。</p>
  <p class="mb-4 indent-4">さて、その時にお話しした本を別便<span class="text-xs">(注1)</span>でお送りしました。これは、私にはもう必要ないので、さしあげます。どうぞ受け取ってください。チャンさんのお仕事の役に立てばうれしいです。</p>
  <p class="mb-4 indent-4">これから寒くなってきますが、どうぞお体にお気をつけてお過ごしください。</p>
  <p class="text-right mb-6">敬具</p>
  <p class="mb-4 mt-8">二〇二四年十月二十五日</p>
  <p class="mb-4 text-right">高木まなみ</p>
  <p class="mt-8 font-bold">チャン・ジヨン様</p>
</div>`;
          p.passageNotes = `<p>(注1)別便：手紙とは別の郵便や小包</p>`;
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Fixed Mondai 15!');
}
