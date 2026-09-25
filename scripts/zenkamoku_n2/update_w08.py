import json
import os

BASE_DIR = r"D:\sudip_software\nihongo_playground"

passages = {}

# Day 1: 求人情報 (Job Listings)
passages['w08-d01'] = '''<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
  <div class="border-b-4 border-double border-slate-700 dark:border-slate-400 pb-2 mb-4 text-center">
    <h2 class="text-xl sm:text-2xl font-extrabold tracking-widest text-slate-900 dark:text-white">アルバイト求人情報</h2>
  </div>
  <p class="mb-4 text-slate-700 dark:text-slate-300">山川市では、以下の会社でアルバイトを募集しています。</p>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm">
      <thead>
        <tr class="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold w-1/4">会社名（業務内容）</th>
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold w-5/12">給与</th>
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold w-1/3">備考</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium align-top">
            <span class="font-bold text-slate-900 dark:text-white">東京グリーンサービス</span><br/>(<ruby>ビル清掃<rt>せいそう</rt></ruby>)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ① 7:30〜9:00 日給2,000円<br/>　(1時間半)<br/>② 22:00〜24:00 日給3,000円<br/>　(2時間)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ・週1日以上<br/>・日本語能力N4以上<br/>・交通費全額支給<br/>・未経験者OK
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium align-top">
            <span class="font-bold text-slate-900 dark:text-white">トークハート</span><br/>(通訳・<ruby>翻訳<rt>ほんやく</rt></ruby>)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ① 9:00〜17:00 日給8,000円<br/>　(8時間 ※休憩1時間含む)<br/>② 13:00〜21:00 日給10,000円<br/>　(8時間 ※休憩1時間含む)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ・週2日以上<br/>・日本語能力N2以上<br/>・英語、中国語、ベトナム語のいずれかが母語レベルであること<br/>・交通費1日1,000円まで<br/>・未経験者OK
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium align-top">
            <span class="font-bold text-slate-900 dark:text-white"><ruby>日之国屋<rt>ひのくにや</rt></ruby>スーパー</span><br/>(品出し)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ① 9:00〜12:00 時給1,300円<br/>② 12:00〜16:00 時給1,350円<br/>③ 16:00〜22:00 時給1,400円<br/>④ 22:00〜6:00 時給1,750円<br/><span class="text-xs text-slate-600 dark:text-slate-400">※時間自由<br/>　例：10:00〜18:00などOK</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ・1日3時間以上<br/>・日本語能力N3以上<br/>・交通費1日1,000円まで<br/>・未経験者OK
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium align-top">
            <span class="font-bold text-slate-900 dark:text-white">居酒屋わいわい</span><br/>(キッチン／ホール)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ① 12:00〜16:00<br/>　キッチン時給1,250円<br/>　ホール時給1,300円<br/>② 16:00〜22:00<br/>　キッチン時給1,300円<br/>　ホール時給1,350円<br/>③ 22:00〜24:00<br/>　キッチン時給1,600円<br/>　ホール時給1,700円<br/><span class="text-xs text-slate-600 dark:text-slate-400">※時間自由<br/>　例：12:00〜7:00などOK</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ・1日3時間以上<br/>・日本語能力<br/>　キッチン：N4以上<br/>　ホール：N3以上<br/>・交通費全額支給<br/>・食事付き<br/>・髪型・髪色・服装自由
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium align-top">
            <span class="font-bold text-slate-900 dark:text-white">Good job サービス</span><br/>(データ入力)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            9:00〜21:00 時給1,250円<br/><span class="text-xs text-slate-600 dark:text-slate-400">※アルバイト事務経験者＋100円</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ・1日4時間以上<br/>・日本語能力N2以上<br/>・基本的なパソコン操作<br/>・未経験者OK<br/>・交通費全額支給
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium align-top">
            <span class="font-bold text-slate-900 dark:text-white">ワンダーキッズ</span><br/>(学童保育スタッフ)
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            16:00〜21:00 時給3,000円
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-top">
            ・1日3時間以上<br/>・日本語能力N1以上<br/>・教育／心理学部を卒業していること<br/>・交通費なし
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-4 pt-3 border-t-2 border-slate-700 dark:border-slate-400 text-xs sm:text-sm">
    <div class="font-bold mb-1">【求人に関するお問い合わせ】</div>
    <div class="text-slate-700 dark:text-slate-300">
      Jスターズ人材センター　山川市宮下町5-4-1　☎ 03-1234-5678　✉ info@jstars.com
    </div>
  </div>
</div>'''

# Day 2: カルチャーセンター講座案内 (Culture Center Courses)
passages['w08-d02'] = '''<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
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
</div>'''

# Day 3: キャンプ場利用案内 (Campsite Guide)
passages['w08-d03'] = '''<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
  <div class="flex items-center justify-between border-b-2 border-dotted border-slate-400 dark:border-slate-500 pb-3 mb-4">
    <div>
      <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">にこにこキャンプ場</h2>
      <div class="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">利用案内</div>
    </div>
    <div class="text-3xl sm:text-4xl">🏕️ ☀️</div>
  </div>

  <div class="mb-5">
    <div class="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1">
      <span>◆</span><span>料金表</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm text-center">
        <thead>
          <tr class="bg-slate-700 text-white dark:bg-slate-800">
            <th colspan="2" class="border border-slate-400 dark:border-slate-600 p-2 font-bold">区分</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4">通常料金</th>
            <th class="border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4">割増料金</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
          <tr>
            <td rowspan="2" class="border border-slate-400 dark:border-slate-600 p-2 font-semibold bg-slate-50 dark:bg-slate-800/50 align-middle">入場料（1泊）</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">大人</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">2,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">3,000円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2">子ども（小学生まで）</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,500円</td>
          </tr>
          <tr>
            <td rowspan="2" class="border border-slate-400 dark:border-slate-600 p-2 font-semibold bg-slate-50 dark:bg-slate-800/50 align-middle">貸しテント（1泊）</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">3〜6人用</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">5,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">8,000円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2">1〜2人用</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">3,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">5,000円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-semibold bg-slate-50 dark:bg-slate-800/50">温泉（1回）</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">大人</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">500円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">800円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-semibold bg-slate-50 dark:bg-slate-800/50">会議室</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">1時間</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,500円</td>
          </tr>
          <tr>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-semibold bg-slate-50 dark:bg-slate-800/50">駐車場（1泊）</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2">1台</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,000円</td>
            <td class="border border-slate-400 dark:border-slate-600 p-2 font-medium">1,500円</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-2 space-y-0.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      <p>※7月〜9月は割増料金が適用されます（団体利用の場合を除く）。</p>
      <p>※団体利用とは以下の場合を指します。<br/>　・教育機関の行事（修学旅行、クラブの合宿など）<br/>　・20名以上でのご利用</p>
      <p>※チェックインの際に、代表者（18歳以上）の身分証を確認しています。顔写真と住所の確認できる書類（運転免許証、社員証など）をご提示ください。</p>
      <p>※代表者不在でのキャンプ場利用はできませんのでご了承ください。</p>
      <p>※子ども（小学生まで）の温泉のご利用は無料です。</p>
    </div>
  </div>

  <div>
    <div class="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1">
      <span>◆</span><span>「にこにこキャンプ場」のご利用にあたって</span>
    </div>
    <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
      <li>調理コーナーは他の利用客の方とゆずり合って使用しましょう。</li>
      <li>調理コーナー、喫煙コーナー以外、キャンプ場での火の使用はできません。</li>
      <li>ゴミは必ず指定の場所に捨てましょう。</li>
      <li>ペットを<ruby>伴<rt>ともな</rt></ruby>ってのご入場はお断りしています。</li>
      <li>11時から15時までは清掃時間のため、温泉の利用はできません。夜間のご利用は可能ですが、他のお客様の<ruby>迷惑<rt>めいわく</rt></ruby>にならないよう静かにご利用ください。</li>
      <li>22時以降は音楽などを消して、静かにお過ごしください。</li>
      <li>会議室は管理室の開室時間にのみ使用できます。</li>
      <li>お困りの際は管理室にご相談ください（開室時間 7時〜20時）。管理室では調理器具の貸し出し（無料）、飲み物と軽食の販売をしております。管理室の閉室中は、<ruby>緊急時<rt>きんきゅうじ</rt></ruby>に限り夜間窓口（012-3456-7890）にお電話ください。</li>
    </ul>
  </div>
</div>'''

# Day 4: マンガ喫茶利用案内 (Internet & Manga Cafe Guide)
passages['w08-d04'] = '''<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
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
</div>'''

# Day 5: クレジットカード案内 (Credit Card Comparison)
passages['w08-d05'] = '''<div class="speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal">
  <div class="text-center pb-2 mb-3 border-b-2 border-slate-300 dark:border-slate-600">
    <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-wide">最新おすすめクレジットカード</h2>
  </div>
  <p class="mb-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">当サイトの最新おすすめクレジットカードをご紹介します。カードのお申し込み・お問い合わせは、各クレジットカードの公式サイトへどうぞ。</p>

  <div class="overflow-x-auto">
    <table class="w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm">
      <thead>
        <tr class="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">カード名</th>
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">年会費</th>
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">ポイント率</th>
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">発行日数</th>
          <th class="border border-slate-400 dark:border-slate-600 p-2 text-center font-bold">備考</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-bold">
            <div>マックスカード</div>
            <span class="inline-block text-[10px] sm:text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 mt-1">公式サイト</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">
            初年度：無料<br/>2年目以降：無料
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-medium">0.5%</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">最短当日</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-xs">
            ・20歳以上、ただし学生不可<br/>・最短30分でカード発行
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-bold">
            <div>BIZAカード</div>
            <span class="inline-block text-[10px] sm:text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 mt-1">公式サイト</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">
            初年度：無料<br/>2年目以降：3,000円
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-medium">0.5〜1.0%</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">最短当日</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-xs">
            ・20歳以上<br/>・ショッピング保険付き<br/>・旅行保険付き<sup>※1</sup>
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-bold">
            <div>デビューαカード</div>
            <span class="inline-block text-[10px] sm:text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 mt-1">公式サイト</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">
            初年度：無料<br/>2年目以降：無料
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-medium">なし</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">最短当日</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-xs">
            ・18歳〜25歳限定<br/>・旅行保険付き<sup>※1</sup>
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-bold">
            <div>プレミアムカード</div>
            <span class="inline-block text-[10px] sm:text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 mt-1">公式サイト</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">
            初年度：6,000円<br/>2年目以降：6,000円
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-medium">2.0〜6.0%</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">最短3日</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-xs">
            ・20歳以上<br/>・ショッピング保険付き<br/>・旅行保険付き<sup>※1</sup><br/>・空港、ホテル優待サービスあり
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-bold">
            <div>スタイルカード</div>
            <span class="inline-block text-[10px] sm:text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 mt-1">公式サイト</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">
            初年度：3,000円<br/>2年目以降：3,000円
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-medium">0.5〜3.0%</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">最短3日</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-xs">
            ・20歳以上<br/>・加盟店優待サービスあり<br/>・旅行保険付き<sup>※2</sup>
          </td>
        </tr>
        <tr>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-bold">
            <div>JJBカードM</div>
            <span class="inline-block text-[10px] sm:text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 mt-1">公式サイト</span>
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle">
            初年度：無料<br/>2年目以降：無料
          </td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle font-medium">0.7〜5.0%</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 text-center align-middle">最短当日</td>
          <td class="border border-slate-400 dark:border-slate-600 p-2 align-middle text-xs">
            ・20歳以上<br/>・過去にカードを発行したことがある方のみ<br/>・最短5分でカード発行<br/>・<ruby>誕生月<rt>たんじょうづき</rt></ruby>ポイント5倍
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-3 text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
    <div>保険種類　※1 国内・海外旅行保険</div>
    <div class="pl-14">※2 国内旅行保険</div>
  </div>
</div>'''

for day_num in range(1, 6):
    file_id = f'w08-d{day_num:02d}'
    filepath = os.path.join(BASE_DIR, 'src', 'data', 'zenkamoku_n2', f'{file_id}.json')
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for sec in data.get('sections', []):
        sec['passage'] = passages[file_id]
        if 'imageSrc' in sec:
            del sec['imageSrc']
        for q in sec.get('questions', []):
            if 'imageSrc' in q:
                del q['imageSrc']
                
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'Updated {file_id}.json successfully')
