const e="zenkamoku-n2-best-workbook",t="w08-d02",l=8,n=2,o="第8週",b="2日目",r="情報検索",d="Information retrieval",a="右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",s=[{type:"information_retrieval",title:"情報検索",titleEn:"Information retrieval",instruction:"右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",questions:[{number:1,stem:"大学生のリンさんは、授業がない月曜日か水曜日の午後に、友達と二人で日本文化が学べる講座を受講したいと考えている。4月20日現在、リンさんたちが申し込める講座はいくつあるか",options:["1. 1つ","2. 2つ","3. 3つ","4. 4つ"],correct:1,correctOption:"1. 1つ",explanation:"<b>【正解】1. 1つ</b><br/>月曜または水曜の午後、未経験2名で受講できる日本文化講座は「茶道入門」の1つのみなので、1が正解です。"},{number:2,stem:"会員証を持っているサリーさんは5月の講座の「イギリス式庭づくり」を受講したいと考えている。受講するには、受付カウンターにいつ何を持っていけばいいか。",options:["1. 4月25日までに会員証と5,000円と受講申込用紙を持っていく。","2. 4月25日までに会員証と10,000円と受講申込用紙を持っていく。","3. 4月25日までに入会金と運転免許証と5,000円と受講申込用紙を持っていく。","4. 受講初日に会員証と5,000円と受講申込用紙を持っていく。"],correct:1,correctOption:"1. 4月25日までに会員証と5,000円と受講申込用紙を持っていく。",explanation:"<b>【正解】1. 4月25日までに会員証と5,000円と受講申込用紙を持っていく。</b><br/>会員の受講申込期限と受講料、必要書類の記載から、1が正解です。"}],passage:`<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
  <div class="text-center pb-3 mb-4 border-b border-slate-300 dark:border-slate-600">
    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">🌿 🌿 🌿</div>
    <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-wide">さくら市民カルチャーセンター</h2>
    <div class="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 mt-1">〜5月開講講座のお知らせ〜</div>
  </div>

  <div class="mb-5 space-y-3 text-xs sm:text-sm">
    <div>
      <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">■入会と受講のご案内</h3>
      <div class="pl-2">
        <div class="font-semibold text-slate-800 dark:text-slate-200 mb-1">〜入会の手続きについて〜</div>
        <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
          <li>講座を受講するためには、さくら市民カルチャーセンターの会員になる必要があります。入会申込書にご記入の上、入会金1,000円とともに受付カウンターまでお持ちください。その場で会員証を発行いたします。本人確認のため、身分証明書<sup>※</sup>をお持ちください。<br/><span class="text-slate-500 dark:text-slate-400">(身分証明書…パスポート、運転免許証、顔写真付きの学生証または社員証など)</span></li>
        </ul>
      </div>
    </div>

    <div class="pl-2">
      <div class="font-semibold text-slate-800 dark:text-slate-200 mb-1">〜各講座の受講申し込みについて〜</div>
      <ul class="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
        <li>当センターの講座は<ruby>月謝制<rt>げっしゃせい</rt></ruby>ですので、各講座の受講料、回数などをご確認の上、受講申込用紙に記入し、講座が始まる前の月の25日までに受付カウンターでお申し込みください。会員証のご提示と受講料のお支払いもその際にお願いいたします。</li>
        <li>各講座とも定員になり次第<ruby>締め切り<rt>し　き</rt></ruby>ます。</li>
      </ul>
    </div>
  </div>

  <div>
    <div class="flex justify-between items-baseline mb-2">
      <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">■5月の開講講座</h3>
      <span class="text-xs text-slate-500 dark:text-slate-400">4月20日現在</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm">
        <thead>
          <tr class="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
            <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">講座名</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">曜日・時間</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">受講料・教材費<sup>※1</sup></th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">定員<br/>(残席<sup>※2</sup>)</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">講座の特徴</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">社交ダンス</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">月・水（8回）<br/>16:00-17:30</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：16,000円<br/>教材費：なし</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">20名<br/>(6名)</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">ラテンのリズムに合わせて、楽しく体を動かしましょう。</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">生け花</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">水（4回）<br/>19:00-20:00</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：5,000円<br/>教材費：8,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">10名<br/>(1名)</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">日本の<ruby>伝統<rt>でんとう</rt></ruby>文化。初心者でも安心して学べます。</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">イギリス式<br/>庭づくり</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">水（4回）<br/>14:00-15:00</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：5,000円<br/>教材費：5,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">なし</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">日本の花を使ってできるイギリス式庭づくりをご紹介します。</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">料理教室</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">月（4回）<br/>10:00-11:30</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：4,000円<br/>教材費：5,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">20名<br/>(3名)</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">今月のテーマは「日本の味—京都」です。食材から日本を学びましょう。</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">着付け教室</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">月（4回）<br/>15:30-17:00</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：5,000円<br/>教材費：3,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">10名<br/>(2名)</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">着付けの基本を学び、気軽に着物でお出かけを楽しみましょう。</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">テコンドー</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">火・木（8回）<br/>10:00-11:30</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：8,000円<br/>教材費：なし</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">なし</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle"><ruby>韓国<rt>かんこく</rt></ruby>生まれの武術です。楽しく無理なく学べます。</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-bold text-center align-middle">茶道</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-center">金（5回）<br/>14:30-15:30</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">受講料：5,000円<br/>教材費：2,500円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">10名<br/>(4名)</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">お茶を通して、日本の<ruby>伝統<rt>でんとう</rt></ruby>や<ruby>礼儀<rt>れいぎ</rt></ruby>が身につきます。</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <p>※1…教材費は講座の初日の日に担当講師にお支払いください。</p>
      <p>※2…申し込みがあり次第、残り定員数を更新しておりますので、申し込みの際はご確認ください。</p>
    </div>
  </div>
</div>`}],i={bookId:e,chapterId:t,week:8,day:2,weekTitle:"第8週",dayTitle:"2日目",sectionTitle:r,sectionTitleEn:d,instruction:a,sections:s};export{e as bookId,t as chapterId,n as day,b as dayTitle,i as default,a as instruction,r as sectionTitle,d as sectionTitleEn,s as sections,l as week,o as weekTitle};
