import json

with open('src/data/speed_master_n3_reading/mock-exam.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define sections
sections = [
    {
        'id': 'mock-sec-1',
        'sectionNumber': 1,
        'sectionType': '短文 1',
        'sectionTitle': '問題 1（短文 1）',
        'passageTitle': 'おいしい紅茶をいただくための注意点',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0122.jpg',
        'targetMinutes': 3,
        'questionIndices': [0],
        'passageText': '<div class="speed-master-memo-card space-y-3 leading-relaxed"><h3 class="font-bold text-center text-base mb-3 border-b border-slate-200/60 pb-2">おいしい紅茶をいただくための注意点</h3><div class="space-y-2.5"><p>1）紅茶の葉は<ruby>密閉<rt>みっぺい</rt></ruby><sup>（※1）</sup><ruby>容器<rt>ようき</rt></ruby>に<ruby>保存<rt>ほぞん</rt></ruby><sup>（※2）</sup>する。</p><p>2）紅茶の葉の<ruby>分量<rt>ぶんりょう</rt></ruby><sup>（※3）</sup>を正確に量る。<br>　○細かい葉の場合……紅茶用スプーンで1杯（約2.5グラム）<br>　○大きい葉の場合……紅茶用スプーンで1杯（約3グラム）</p><p>3）<ruby>新鮮<rt>しんせん</rt></ruby>な水道水を使い、よく<ruby>沸騰<rt>ふっとう</rt></ruby>させる<sup>（※4）</sup>。　＊日本の水道水は紅茶に<ruby>合<rt>あ</rt></ruby>う。</p><p>4）<ruby>沸騰<rt>ふっとう</rt></ruby>したお湯をポット<sup>（※5）</sup>に入れてからカップに移すまでの時間を計る。<br>　○細かい葉の場合……約2〜2.5分<br>　○大きい葉の場合……約3分</p></div></div>',
        'footnotes': data['footnotes'][0:5],
        'footnotesDiagramRight': '/speed_master_n3_pages/mock_exam_p122_pot.png'
    },
    {
        'id': 'mock-sec-2',
        'sectionNumber': 2,
        'sectionType': '短文 2',
        'sectionTitle': '問題 1（短文 2）',
        'passageTitle': '水泳教室に参加する皆様へ',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0123.jpg',
        'targetMinutes': 3,
        'questionIndices': [1],
        'passageText': '<div class="speed-master-memo-card space-y-3 leading-relaxed"><h3 class="font-bold text-center text-base mb-3 border-b border-slate-200/60 pb-2">水泳教室に参加する皆様へ</h3><p>水曜日14：00〜15：00、金曜日13：00〜14：00の山田ひろみ先生のクラスは、希望者が多すぎるため、以下の方法で参加者の数を制限します。ご理解とご協力をお願いします。</p><div class="speed-master-notice-inner p-3 rounded-lg border border-slate-200/80 space-y-1.5 my-2"><p>●クラス開始の15分前から受付で<ruby>整理券<rt>せいりけん</rt></ruby>を配ります。各クラス20人までとします。</p><p>●<ruby>整理券<rt>せいりけん</rt></ruby>は一人一枚です。ほかの人の分をもらうことはできません。</p><p>●<ruby>整理券<rt>せいりけん</rt></ruby>は、クラスが始まる時に山田先生に渡してください。</p></div><p class="text-right font-medium text-xs sm:text-sm text-slate-500">以上</p></div>',
        'footnotes': []
    },
    {
        'id': 'mock-sec-3',
        'sectionNumber': 3,
        'sectionType': '短文 3',
        'sectionTitle': '問題 1（短文 3）',
        'passageTitle': '普通のガラスと強化ガラス',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0124.jpg',
        'targetMinutes': 3,
        'questionIndices': [2],
        'passageText': '<div class="speed-master-memo-card space-y-3 leading-relaxed"><p>普通のガラスは、落としたり何か物がぶつかったりすると簡単に割れるが、車などに使われる強化ガラスはなかなか割れない。実は、二つのガラスの違いは作る方法にある。普通のガラスは、原料を<ruby>加熱<rt>かねつ</rt></ruby>した後ゆっくり冷やすので、その<ruby>過程<rt>かてい</rt></ruby><sup>（※6）</sup>で、表面に目に見えないたくさんの傷ができ、力を加えると傷が広がって割れる。一方、強化ガラスは<ruby>加熱<rt>かねつ</rt></ruby>後<ruby>急激<rt>きゅうげき</rt></ruby><sup>（※7）</sup>に冷やすので、ガラスの表面近くは<ruby>圧縮<rt>あっしゅく</rt></ruby><sup>（※8）</sup>された<ruby>層<rt>そう</rt></ruby><sup>（※9）</sup>となり、力が加わっても表面の傷が広がりにくく、割れにくい。</p></div>',
        'footnotes': data['footnotes'][5:9]
    },
    {
        'id': 'mock-sec-4',
        'sectionNumber': 4,
        'sectionType': '短文 4',
        'sectionTitle': '問題 1（短文 4）',
        'passageTitle': '「留学生通信」のスタッフ募集',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0125.jpg',
        'targetMinutes': 3,
        'questionIndices': [3],
        'passageText': '<div class="speed-master-memo-card space-y-3 leading-relaxed"><h3 class="font-bold text-center text-base mb-3 border-b border-slate-200/60 pb-2">「留学生通信」のスタッフ<ruby>募集<rt>ぼしゅう</rt></ruby></h3><p>〈<ruby>対象者<rt>たいしょうしゃ</rt></ruby>〉今年4月に大学生になる留学生で、パソコンのメールで連絡がとれる人。</p><div class="speed-master-notice-inner p-3 rounded-lg border border-slate-200/80 space-y-2 my-2"><p><strong>①スタッフA：</strong><br>関係者にインタビューをして記事を書いたり、月1回の土曜日の会議に出席して意見を述べたりする。</p><p><strong>②スタッフB：</strong><br>記事に関係する資料を集めたり、アンケートの結果をまとめたりする。</p></div><p>★<ruby>応募<rt>おうぼ</rt></ruby><sup>（※10）</sup>者は、メールで「スタッフA希望」または「スタッフB希望」と書いて、<ruby>当社<rt>とうしゃ</rt></ruby><sup>（※11）</sup>まで<ruby>送付<rt>そうふ</rt></ruby><sup>（※12）</sup>のこと。</p></div>',
        'footnotes': data['footnotes'][9:12]
    },
    {
        'id': 'mock-sec-5',
        'sectionNumber': 5,
        'sectionType': '中文 1',
        'sectionTitle': '問題 2（中文 1）',
        'passageTitle': 'サクラ歩数計 取扱説明',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0126.jpg',
        'targetMinutes': 7,
        'questionIndices': [4, 5, 6],
        'passageText': '<div class="speed-master-memo-card space-y-4 leading-relaxed"><p>このたびは、サクラ<ruby>歩数計<rt>ほすうけい</rt></ruby><sup>（※13）</sup>をお買いいただき、ありがとうございます。<br>以下の点をよく読んで、ご使用ください。</p><div class="space-y-3"><div class="speed-master-rule-item"><p class="font-bold text-blue-800 dark:text-blue-300">1）身につける方法は、次のどれかにする。　<span class="text-xs font-normal opacity-80">☆いつも同じでなくてもよい。</span></p><ul class="list-disc list-inside pl-3 space-y-1"><li>服のポケットに入れる。</li><li>かばんに入れる。　<span class="text-xs opacity-75">☆かばんのポケットに入れて、中であまり動かないようにする。</span></li><li>ひもをつけて、首から下げる。</li></ul></div><div class="speed-master-rule-item"><p class="font-bold text-blue-800 dark:text-blue-300">2）初めて使う時にすること。　<span class="text-xs font-normal opacity-80">☆これをしないと、正しい数字が<ruby>表示<rt>ひょうじ</rt></ruby><sup>（※14）</sup>されない。2回目からは不要。</span></p><ul class="list-disc list-inside pl-3 space-y-1"><li>時刻を合わせる（☞p.16に説明あり）。</li><li>体重(kg)を入れる（☞p.18に説明あり）。</li><li><ruby>歩幅<rt>ほはば</rt></ruby><sup>（※15）</sup>(cm)を入れる（☞p.19に説明あり）。　<span class="text-xs font-semibold text-amber-600 dark:text-amber-400">☆<ruby>歩幅<rt>ほはば</rt></ruby>の<ruby>測<rt>はか</rt></ruby>り方は正確に！</span></li><li>性別を選ぶ（☞p.20に説明あり）。</li></ul></div><div class="speed-master-rule-item"><p class="font-bold text-blue-800 dark:text-blue-300">3）操作と表示順</p><p class="pl-3"><ruby>歩数計<rt>ほすうけい</rt></ruby>を手に持つと、最初は［現在の時刻］と［<ruby>歩数<rt>ほすう</rt></ruby>］が表示されます。ボタンを押すごとに、［歩いた<ruby>距離<rt>きょり</rt></ruby>］→［時間］→［消費カロリー］の順で表示されます。</p></div></div></div>',
        'footnotes': data['footnotes'][12:15]
    },
    {
        'id': 'mock-sec-6',
        'sectionNumber': 6,
        'sectionType': '中文 2',
        'sectionTitle': '問題 2（中文 2）',
        'passageTitle': '自転車のカーナビについて',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0129.jpg',
        'targetMinutes': 7,
        'questionIndices': [7, 8, 9],
        'passageText': '<div class="speed-master-memo-card space-y-3 leading-relaxed"><p>ある会社が自転車のカーナビ<sup>（※16）</sup>を発売すると、友人から聞いた。広い道だけでなく、細い道の案内もでき、さらに、自転車置き場や自転車店などの情報も入っているそうだ。このカーナビの大きさは電子辞書ぐらいで、速度や走った距離、自転車をこぐ<sup>（※17）</sup>時に使った<ruby>消費<rt>しょうひ</rt></ruby><sup>（※18）</sup>カロリー<sup>（※19）</sup>も表せるという。雨の日でも使うことができ、色もいろいろあるそうだ。</p><p>このようなカーナビを自転車に付けたら、行きたいところにどんどん行けるようになるし、<ruby>環境<rt>かんきょう</rt></ruby>にもとてもいいと思う。しかし、<u>①問題は道路である</u>。今のように自動車と並んで走るのは危険だし、そうかといって、歩道を走るのも歩いている人に迷惑がかかる。自転車用のカーナビができれば、自動車のように自転車でいろいろなところに行けるようになるのだから、②<u>【　　　　】</u>。</p></div>',
        'footnotes': data['footnotes'][15:19]
    },
    {
        'id': 'mock-sec-7',
        'sectionNumber': 7,
        'sectionType': '長文',
        'sectionTitle': '問題 3（長文）',
        'passageTitle': 'みどり高校平成5年卒業生の皆様へ',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0132.jpg',
        'targetMinutes': 10,
        'questionIndices': [10, 11, 12, 13],
        'passageText': '<div class="speed-master-memo-card space-y-4 leading-relaxed"><h3 class="font-bold text-base mb-2 border-b border-slate-200/60 pb-2">みどり高校平成5年卒業生の皆様へ</h3><p>ごぶさたしています。<br>私たちがみどり高校を卒業して20年がたちました。皆様、お元気でしょうか。<br><ruby>故郷<rt>ふるさと</rt></ruby>を<ruby>離<rt>はな</rt></ruby>れている方、仕事や家事、育児にがんばっている方、皆、それぞれの場所でご<ruby>活躍<rt>かつやく</rt></ruby>のことと思います。</p><p>さて、<u>①このたび久しぶりに<ruby>同窓会<rt>どうそうかい</rt></ruby><sup>（※20）</sup>を計画しました</u>。高橋先生が4月に『英語教師として三十年』を<ruby>出版<rt>しゅっぱん</rt></ruby>されたところ、さっそく何人かの方から、先生のお話をぜひお聞きしたいという声が上がったからです。すでにお読みになった方もいらっしゃると思いますが、先生の30年を超える英語教育に関するお話や、学校生活<ruby>全般<rt>ぜんぱん</rt></ruby><sup>（※21）</sup>での生徒や同僚の先生方との<ruby>交流<rt>こうりゅう</rt></ruby>などが、親しみやすい文で書かれています。現在教師をされている方、親として子供の教育を考えている方には、大変興味深い内容だと思います。</p><p>秋の一日、おいしい料理をいただきながら、先生のお話と友人たちとのおしゃべりを楽しむというのはいかがでしょうか。</p><p>そして今回の会については、二通りの案を考えました。連絡用はがきに、まず<ruby>出欠<rt>しゅっけつ</rt></ruby>のお返事をいただき、ご出席の方は、よいほうの<ruby>案<rt>あん</rt></ruby>に○をつけてください。どちらでもいい場合は両方に○をつけてください。なお、ご欠席の方は記入なさらないでください。（以下略）</p><div class="speed-master-notice-inner p-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-sm leading-relaxed space-y-2"><p class="font-bold text-center">みどり高校第35期卒業生第3回<ruby>同窓会<rt>どうそうかい</rt></ruby>に</p><p class="text-center font-semibold">ご出席　・　ご欠席　（どちらかに○をつけてください）</p><p>お名前：<span class="border-b border-current inline-block w-48"></span></p><p>ご住所：<span class="border-b border-current inline-block w-48"></span></p><p class="font-semibold pt-1">☆二案のうち、よいと思うほうに○をつけてください。</p><p class="pl-2"><strong><ruby>案<rt>あん</rt></ruby>1</strong>　日時：10月25日(土) 午前11時〜午後3時<br>　　　「レストラン<ruby>富士<rt>ふじ</rt></ruby>」で昼食　参加費5,000円</p><p class="pl-2"><strong><ruby>案<rt>あん</rt></ruby>2</strong>　日時：10月25日(土) 午後3時集合<br>　　　「温泉旅館<ruby>玉屋<rt>たまや</rt></ruby>」に<ruby>一泊夕食<rt>いっぱくゆうしょく</rt></ruby>・<ruby>朝食<rt>ちょうしょく</rt></ruby>付き　参加費20,000円<br>　　　＊26日(日) 午前10時<ruby>解散<rt>かいさん</rt></ruby><sup>（※22）</sup></p></div></div>',
        'footnotes': data['footnotes'][19:22]
    },
    {
        'id': 'mock-sec-8',
        'sectionNumber': 8,
        'sectionType': '情報検索',
        'sectionTitle': '問題 4（情報検索）',
        'passageTitle': '毎朝就職説明会',
        'pageScan': '/speed_master_n3_pages/speed_master_n3_page-0136.jpg',
        'targetMinutes': 8,
        'questionIndices': [14, 15],
        'passageText': '<div class="speed-master-memo-card mb-4"><p>スーさんは、来年3月に専門学校を卒業の予定です。日本で<ruby>医療<rt>いりょう</rt></ruby><sup>（※23）</sup>関係の仕事をしたいと希望しています。新聞で、つぎのような合同企業説明会の案内を見ました。</p></div><div class="speed-master-flyer-card"><img src="/speed_master_n3_pages/mock_exam_p136_flyer_hd.png" alt="毎朝就職説明会" class="speed-master-flyer-img" /></div>',
        'footnotes': data['footnotes'][22:26]
    }
]

data['sections'] = sections

with open('src/data/speed_master_n3_reading/mock-exam.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Successfully added sections array to mock-exam.json')
