const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function renderMondai62() {
  console.log("Rendering Mondai 62...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let p62 = skm.chapters.flatMap(c => c.passages).find(p => p.title.includes('62'));
  if (p62) {
    p62.passageLayout = 'html';
    p62.passageText = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg border border-gray-300 dark:border-gray-600 font-sans shadow-md mx-auto max-w-3xl text-gray-800 dark:text-gray-100">
  <div class="text-center font-bold mb-6 text-lg md:text-xl tracking-wider">
    ★留学生の生活応援メールマガジン ★<br>
    ★ 20XX年1月号 ★
  </div>

  <div class="text-center mb-6 font-medium">
    新年あけましておめでとうございます！<br>
    日本のお正月はいかがですか？ 留学生の生活応援メルマガは、今年もみなさんの役に立つ情報をどんどん紹介しますので、どうぞよろしくお願いいたします！
  </div>

  <div class="mb-6 ml-4">
    <div class="flex"><span class="w-16">目次</span><span>1. ニュース・・・・・・・・新年会・不用品交換</span></div>
    <div class="flex"><span class="w-16"></span><span>2. 特集・・・・・・・・・・・・「みんなの節約方法」</span></div>
  </div>

  <div class="mb-6">
    <h3 class="font-bold text-lg mb-2">◆1. ニュース</h3>
    <div class="ml-4 mb-4">
      <div class="font-bold mb-1">新年会</div>
      <div class="ml-4 mb-2">餅つき、おせち料理など、日本のお正月を楽しみましょう。</div>
      <div class="ml-8 mb-2">
        <div class="flex"><span class="w-16">日時：</span><span>1月15日(土) 13:00～17:00</span></div>
        <div class="flex"><span class="w-16">場所：</span><span>〇〇市民会館集会室</span></div>
        <div class="mt-1">参加申し込みはこちら <a href="#" class="text-blue-600 hover:underline">http://ryugakuoen.or.jp/shinnen.htm</a></div>
      </div>
    </div>
    <div class="ml-4">
      <div class="font-bold mb-1">不用品交換</div>
      <div class="ml-4 mb-2">家具、電気製品など、欲しいものやいらないものを書いておくと、だれかと交換できるかもしれません。</div>
      <div class="ml-4">交換ページはこちら <a href="#" class="text-blue-600 hover:underline">http://ryugakuoen.or.jp/koukan.htm</a></div>
    </div>
  </div>

  <div class="mb-8">
    <h3 class="font-bold text-lg mb-2">◆2. 特集「みんなの節約方法」</h3>
    <div class="ml-4 mb-2">
      電気代を30%カットする方法、安いお店の情報など、上手に節約しながら日本の生活を楽しむ留学生のアイディアがたくさん！ぜひ参考にしてください！
    </div>
    <div class="ml-4">特集ページはこちら <a href="#" class="text-blue-600 hover:underline">http://ryugakuoen.or.jp/tokushu.htm</a></div>
  </div>

  <hr class="border-t-2 border-dashed border-gray-400 dark:border-gray-500 mb-4" />

  <div class="mb-4 space-y-2">
    <div>◆バックナンバーはこちら <a href="#" class="text-blue-600 hover:underline">http://ryugakuoen.or.jp/menu-mmag.htm</a></div>
    <div>◆このメルマガは配信専用です。このアドレスに返信はできません。</div>
    <div class="ml-4">ご意見、お問い合わせはこちら <a href="#" class="text-blue-600 hover:underline">http://ryugakuoen.or.jp/ad/mail.htm</a></div>
    <div>◆配信停止はこちら <a href="#" class="text-blue-600 hover:underline">http://ryugakuoen.or.jp/mmag_resign.htm</a></div>
  </div>

  <hr class="border-t-2 border-dashed border-gray-400 dark:border-gray-500 mb-6" />

  <div class="space-y-1">
    <div class="flex"><span class="w-20">発行人：</span><span>NPO留学生の生活応援グループ</span></div>
    <div class="flex items-center"><span class="w-20">編集人：</span><span class="mr-4">メルマガ委員会</span> <span>e-mail: <a href="#" class="text-blue-600 hover:underline">XXX@ryuugakuoen.or.jp</a></span></div>
  </div>
</div>
`;
    // clear imageSrc if it was there since we don't need the image anymore!
    delete p62.imageSrc;

    let c = skm.chapters.find(ch => ch.passages.includes(p62));
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    await bookDocRef.collection('chapters').doc(c.id).update({ passages: c.passages });
    console.log(`Pushed fix to Firebase for chapter ${c.id}`);
  }
}

renderMondai62();
