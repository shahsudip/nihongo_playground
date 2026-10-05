const t="zenkamoku-n2-best-workbook",e="w08-d04",l=8,o=4,n="第8週",b="4日目",r="情報検索",d="Information retrieval",s="右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",a=[{type:"information_retrieval",title:"情報検索",titleEn:"Information retrieval",instruction:"右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",questions:[{number:1,stem:"北田さんは、この店で2時間半、パソコンでオンラインゲームをしたり、マンガを読んだりしようと思っている。最も安い方法で利用した場合、いくらになるか",options:["1. 1,150円","2. 1,170円","3. 1,200円","4. 1,350円"],correct:2,correctOption:"2. 1,170円",explanation:"<b>【正解】2. 1,170円</b><br/>2時間半の利用料金（最初の基本料金＋延長料金）の計算から、1,170円となり2が正解です。"},{number:2,stem:"中野さんは、課題のレポートを書くために、6時間パソコンを利用したいと思っている。課題が早く終わったら、マンガも読みたいと思っているが、ゲームをするつもりはない。中野さんが最も安く利用するには、次のうち、どの方法がいいか。",options:["1. ゲーム席の3時間コースを利用し、超過分の延長料金を払う。","2. ビジネス席の5時間コースを利用し、超過分の延長料金を払う。","3. ゲーム席の5時間コースを利用して、超過分の延長料金を払う。","4. ビジネス席の10時間コースを利用する。"],correct:2,correctOption:"2. ビジネス席の5時間コースを利用し、超過分の延長料金を払う。",explanation:"<b>【正解】2. ビジネス席の5時間コースを利用し、超過分の延長料金を払う。</b><br/>ビジネス席の5時間パックを利用し、超過分を延長料金で支払うのが最も安く確実なため、2が正解です。"}],passage:`<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
  <div class="text-center pb-2 mb-3">
    <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">インターネット・マンガ喫茶　わくわく</h2>
    <div class="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 mt-1">❖ 利用案内 ❖</div>
  </div>
  <p class="mb-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">当店では3種類のお席をご用意しております。どちらの席でもマンガ読み放題、ドリンク飲み放題となっております。</p>

  <div class="border border-slate-300 dark:border-slate-600 rounded-lg p-3 sm:p-4 mb-5 bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm space-y-3">
    <div>
      <div class="font-bold text-slate-900 dark:text-white">□ ゲーム席　充実した環境で思いきりゲームに熱中したい方におすすめ！</div>
      <div class="pl-4 text-slate-700 dark:text-slate-300 mt-0.5">・個室に大画面テレビと各種ゲーム機、パソコンがそれぞれ1台ずつございます。</div>
    </div>
    <div>
      <div class="font-bold text-slate-900 dark:text-white">□ ビジネス席　静かな環境で集中して仕事や勉強をしたい方におすすめ！</div>
      <div class="pl-4 text-slate-700 dark:text-slate-300 mt-0.5 space-y-0.5">
        <div>・各個室にパソコンが1台ずつございます。</div>
        <div>・このお席のパソコンはオンラインゲームにアクセスできないよう設定されています。</div>
      </div>
    </div>
    <div>
      <div class="font-bold text-slate-900 dark:text-white">□ オープン席　マンガを読みたい方やちょっと<ruby>休憩<rt>きゅうけい</rt></ruby>したい方におすすめ！</div>
      <div class="pl-4 text-slate-700 dark:text-slate-300 mt-0.5 space-y-0.5">
        <div>・こちらのお席は個室ではございません。</div>
        <div>・パソコンやテレビはございません。ご希望のお客様は他の席をご利用ください。</div>
      </div>
    </div>
  </div>

  <div class="mb-5">
    <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">料金表</h3>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm text-center">
        <thead>
          <tr class="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
            <th class="border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4">ご利用コース</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4">ゲーム席</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4">ビジネス席</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4">オープン席</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium bg-slate-50 dark:bg-slate-800/40">1時間コース</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">540円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">470円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">420円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium bg-slate-50 dark:bg-slate-800/40">3時間コース</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,350円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,200円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,150円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium bg-slate-50 dark:bg-slate-800/40">5時間コース</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,650円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,500円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-slate-400">―</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium bg-slate-50 dark:bg-slate-800/40">10時間コース</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">2,300円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">2,100円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 text-slate-400">―</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-semibold bg-slate-100 dark:bg-slate-800">延長 10分ごと</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">70円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">80円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">90円</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div>
    <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5">ご利用上の注意</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
      <li>店内へのパソコンの持ち込みは禁止とさせていただいております。</li>
      <li>入店時にお席の種類とご利用コースを1つ選択し、料金をお支払いください。時間超過の場合はお帰りの際に延長料金をお支払いください。</li>
      <li>入店時に選択した席やご利用コースを変更したり、ご利用コースを2つ以上組み合わせたりすることはできません。</li>
      <li>1時間未満のご利用の場合でも、1時間コースの料金をお支払いください。また、ご利用コースの時間内に退店された場合の返金はできません。</li>
      <li>オープン席を3時間以上ご利用いただくことも可能です。その場合は3時間コースの料金と超過した時間分の延長料金をお支払いください。</li>
    </ul>
  </div>
</div>`}],i={bookId:t,chapterId:e,week:8,day:4,weekTitle:"第8週",dayTitle:"4日目",sectionTitle:r,sectionTitleEn:d,instruction:s,sections:a};export{t as bookId,e as chapterId,o as day,b as dayTitle,i as default,s as instruction,r as sectionTitle,d as sectionTitleEn,a as sections,l as week,n as weekTitle};
