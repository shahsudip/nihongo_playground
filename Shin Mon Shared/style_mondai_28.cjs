const fs = require('fs');

const p28Html = `
<div class="bg-gray-200 dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-400 font-sans shadow-md text-sm md:text-base leading-relaxed">
  
  <!-- Email Headers -->
  <div class="mb-6 space-y-1">
    <div class="flex">
      <span class="font-bold w-16 md:w-20">差出人：</span>
      <span>○×ショップ [×××@marubatsu.co.jp]</span>
    </div>
    <div class="flex">
      <span class="font-bold w-16 md:w-20">宛先：</span>
      <span>1234@○○○○.ne.jp</span>
    </div>
    <div class="flex">
      <span class="font-bold w-16 md:w-20">件名：</span>
      <span>ご注文内容の確認</span>
    </div>
  </div>
  
  <!-- Email Body -->
  <div class="bg-white dark:bg-gray-700 p-4 md:p-6 border border-gray-300 dark:border-gray-600 rounded">
    <p class="font-bold mb-4 text-lg">ソウ　シューイー　様 <span class="font-normal text-sm md:text-base">（お客様番号：123456）</span></p>
    
    <p>このたびは○×ショップをご利用いただき、誠にありがとうございます。</p>
    <p>お申し込みの受付手続きが完了いたしましたので、お知らせ致します。</p>
    <p class="mb-4">下記のご注文内容をご確認ください。</p>
    
    <div class="border-t border-dashed border-gray-400 my-4"></div>
    
    <div class="space-y-2 mb-4 ml-2">
      <p><span class="font-bold">[ご注文番号]</span> 1234-5678</p>
      <p><span class="font-bold">[ご注文日]</span> 20XX-07-16 10:34:19</p>
      <p><span class="font-bold">[商品番号]</span> 900-800-700</p>
      <div class="flex flex-wrap gap-4">
        <p><span class="font-bold">[商品名]</span> "チョコレート　セットA"</p>
        <p>価格 2,900円</p>
      </div>
      <p><span class="font-bold">[小計]</span> 2,900円</p>
      <p><span class="font-bold">[お支払方法]</span> コンビニ払い</p>
    </div>
    
    <div class="flex justify-end mb-4 pr-4 md:pr-10">
      <div class="w-48 space-y-1">
        <div class="flex justify-between">
          <span>商品金額：</span>
          <span>2,900円</span>
        </div>
        <div class="flex justify-between">
          <span>送料：</span>
          <span>600円</span>
        </div>
        <div class="flex justify-between font-bold border-t border-gray-300 dark:border-gray-500 pt-1 mt-1">
          <span>ご請求金額：</span>
          <span>3,500円</span>
        </div>
      </div>
    </div>
    
    <div class="border-t border-dashed border-gray-400 my-4"></div>
    
    <div class="space-y-2 mb-4 ml-2">
      <div class="flex">
        <span class="font-bold w-24">[お届け先]</span>
        <div class="font-bold text-lg">中村花子　様</div>
      </div>
      <div class="flex flex-wrap gap-x-4 ml-24">
        <span>〒XXX-XXXX</span>
        <span>東京都○○市　X-X-X</span>
        <span>TEL XX-XXXX-XXXX</span>
      </div>
      <div class="flex mt-2">
        <span class="font-bold w-24">[お届け予定]</span>
        <span>20XX年08月01日ごろ　　9時～14時</span>
      </div>
    </div>
    
    <div class="border-t border-dashed border-gray-400 my-4"></div>
    
    <div class="space-y-2 text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-6">
      <p class="flex items-start">
        <span class="mr-1">※</span>
        <span>ご注文の配送状況は右の<span class="inline-block border border-gray-400 rounded-full px-2 mx-1 bg-gray-100 dark:bg-gray-600 text-black dark:text-white">お客様情報</span>からご確認いただけます。</span>
      </p>
      <p class="flex items-start">
        <span class="mr-1">※</span>
        <span>このメールは送信専用アドレスより自動的に送信されています。ご返信いただいてもお答えできません。</span>
      </p>
      <p class="flex items-start">
        <span class="mr-1">※</span>
        <span>ご注文内容を確認・変更する場合は、○×ショップのホームページ（http://www.marubatsu.co.jp）の右上にある「アカウントサービス」をクリックしてください。</span>
      </p>
    </div>
    
    <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300">
      <p class="mb-2">またのご利用を心よりお待ちしております。</p>
      <p class="font-bold">(株)○×ショップ　　<span class="font-normal">http://www.marubatsu.co.jp</span></p>
      <p>　〒XXX-XXXX　　東京都○○市××　1－1－1</p>
    </div>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');

  let m28 = {
    "title": "第3部 問題28",
    "passageText": p28Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題28　つぎの文章は、注文内容の確認メールである。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "passageNotes": "",
    "questions": [
      {
        "id": "q28-dummy",
        "questionText": "問1 （※質問テキストがありません。正しい質問と選択肢を後で追加してください。）",
        "options": [
          "選択肢 1",
          "選択肢 2",
          "選択肢 3",
          "選択肢 4"
        ],
        "correctOption": {
          "text": "選択肢 1",
          "explanation": "解説テキスト"
        }
      }
    ]
  };

  // Insert m28 right after m26 in Chapter 3
  ch3.passages.splice(6, 0, m28);

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Reconstructed Mondai 28 and appended it to Chapter 3!");
}
