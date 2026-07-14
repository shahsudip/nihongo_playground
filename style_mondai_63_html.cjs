const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function renderMondai63() {
  console.log("Rendering Mondai 63...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p63 = skm.chapters.flatMap(c => c.passages).find(p => p.title.includes('63'));
  if (p63) {
    p63.passageLayout = 'html';
    p63.passageText = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg border-2 border-gray-400 dark:border-gray-500 font-sans shadow-sm mx-auto max-w-3xl text-gray-800 dark:text-gray-100">
  
  <div class="mb-6 font-bold text-lg md:text-xl border-b border-gray-300 dark:border-gray-600 pb-2">
    チン・ヌーチー様
  </div>

  <div class="mb-4 leading-loose indent-4">
    <p>いつも〇✕ショップをご利用いただきまして、ありがとうございます。担当の木村と申します。</p>
    <p>このたびは、先日ご購入いただきました商品【ABC電気ポット】に不備<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注2)</span>がございましたこと、大変申し訳ありませんでした。大変ご面倒ではございますが、商品【ABC電気ポット】を、着払い<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注3)</span>にて、ご返送くださいますようお願いいたします。</p>
  </div>

  <div class="border border-gray-400 dark:border-gray-500 p-4 mb-6 ml-4 max-w-md bg-gray-50 dark:bg-gray-700/50">
    <div class="flex"><span class="font-bold w-32 shrink-0">●ご返送先住所</span>
      <div>
        〒123-4567 東京都〇〇区〇〇町1-2-3<br>
        株式会社 〇✕ショップ<br>
        Tel: 03-1234-5678
      </div>
    </div>
  </div>

  <hr class="border-t border-gray-400 dark:border-gray-500 mb-6" />

  <div class="mb-4 leading-loose">
    <p>商品が到着いたしましたら返金<span class="text-[0.75em] opacity-80 font-normal align-baseline">(注4)</span>の対応をさせていただきます。</p>
    <p>つきましては、お客様のお振込先口座を教えていただけますでしょうか。次の項目にご入力の上、このメールにご返信いただきますようお願いいたします。</p>
  </div>

  <hr class="border-t border-dashed border-gray-400 dark:border-gray-500 mb-4" />

  <div class="flex flex-col md:flex-row justify-around mb-4 space-y-2 md:space-y-0">
    <div class="space-y-2">
      <div class="flex items-center"><span class="font-bold mr-2 w-24">●銀行名 :</span><span class="border-b border-gray-400 w-32 inline-block"></span></div>
      <div class="flex items-center"><span class="font-bold mr-2 w-24">●口座番号:</span><span class="border-b border-gray-400 w-32 inline-block"></span></div>
    </div>
    <div class="space-y-2">
      <div class="flex items-center"><span class="font-bold mr-2 w-24">●支店名:</span><span class="border-b border-gray-400 w-32 inline-block"></span></div>
      <div class="flex items-center"><span class="font-bold mr-2 w-24">●ご名義人様:</span><span class="border-b border-gray-400 w-32 inline-block"></span></div>
    </div>
  </div>

  <hr class="border-t border-dashed border-gray-400 dark:border-gray-500 mb-4" />

  <div class="mb-6 leading-loose">
    <p>このたびはお客様にご迷惑をおかけしてしまい、大変申し訳ありませんでした。</p>
    <p>またのご利用を心よりお待ちしております。</p>
  </div>

  <hr class="border-t border-dashed border-gray-400 dark:border-gray-500 mb-6" />

  <div class="leading-loose">
    <div class="mb-2">〇✕ショップ<span class="mx-8"></span>木村 〇〇</div>
    <div>URL: <a href="#" class="text-blue-600 hover:underline">http://shop.marubatsu.com</a></div>
    <div>Tel: 03-1234-5678</div>
    <div>e-mail: <a href="#" class="text-blue-600 hover:underline">XXX@marubatsu.com</a></div>
  </div>
</div>
`;

    // Notes for Mondai 63 if any missing
    p63.passageNotes = `<p>(注1)不良品：傷や欠点などがある商品</p><p>(注2)不備がある：足りないことや完全でないことがある</p><p>(注3)着払い：荷物などを受け取る人が料金を払うこと</p><p>(注4)返金：お金を返すこと</p>`;

    // clear imageSrc if it was there
    delete p63.imageSrc;

    let c = skm.chapters.find(ch => ch.passages.includes(p63));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  }
}

renderMondai63();
