"""
build_w08_clean.py
Rebuilds Zenkamoku N1 Week 8 (Days 1 to 5) with 100% textbook scan fidelity,
standardized schemas (thematic_passage + information_retrieval), verified rubies and footnotes,
and full explanations from Kaisetsu.
"""
import json
import os

OUT_DIR = "src/data/zenkamoku_n1"

w08_d01 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w08-d01",
  "week": 8,
  "day": 1,
  "weekTitle": "第8週",
  "dayTitle": "1日目",
  "sectionTitle": "主張理解（長文）・情報検索",
  "sectionTitleEn": "Thematic Comprehension (Long Passage) & Information Retrieval",
  "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
  "sections": [
    {
      "type": "thematic_passage",
      "title": "主張理解（長文）",
      "titleEn": "Thematic Comprehension (Long Passage)",
      "pageRef": "pp.136-137",
      "passage": "<div class=\"speed-master-text-box whitespace-pre-line font-serif leading-loose\">\n　昨年度、小中学校を30日以上欠席した児童・生徒の数は16万４千人を超え、98年度以降で最多となった。中学の場合、40人の学級に１人はいる計算だ。各校からの報告を文部科学省<sup>(注1)</sup>がまとめて、先日公表した。\n　増えたのは「無理に登校する必要はない」との考えが<ruby>浸透<rt>しんとう</rt></ruby><sup>(注2)</sup>してきた結果でもあろう。２年前に<ruby>教育機会確保法<rt>いくきかいかくほほう</rt></ruby>が施行され、民間のフリースクールなど、子どもの事情に応じた多様な学びの場を用意することの大切さが確認された。自治体も６割が公立の受け皿を設けている。\n　一方で、本当は学校に行きたいのに行けない子がいるのも事実だ。子どもを遠ざけている原因を探り、取り除く。国や教育委員会、各学校現場にはその責務がある。それは学校を良くする糸口にもなるはずだ。\n　不登校の理由（複数回答）は家庭の状況38％、いじめを除く友人関係28％、学業不振22％、教職員との関係、学校のきまり各３％などとなっている。\n　少子化による学校の小規模化に悩む地域は多く、子どもが日常的に接する友だちや先生が固定化する傾向にある。そこでうまく人間関係を築けなかった子どもにとって、学校は息が詰まる場所になってしまう。\n　学級、学年をこえた活動や交流行事を増やす。その学年を担当する全ての教員が、全ての生徒に目配りする「全員担任制」を試みる。そんな試みを重ねて、風通しのいい学校をつくることが求められる。\n　<ruby>解<rt>げ</rt></ruby>せない<sup>(注3)</sup>のは、同じ調査で「いじめ」が小中あわせて52万件を超え、やはり過去最多となったのに、不登校の理由では１％未満とされたことだ。学校側の認識が間違っている可能性はないか。子どもの側へのアプローチ<sup>(注4)</sup>も定期的におこない、実態に迫る必要がある。\n　「学業不振22％」という数字も、学校の存在意義にかかわる深刻な問題だ。休むと授業についていけなくなる。<ruby>疎外感<rt>そがいかん</rt></ruby><sup>(注5)</sup>を抱き、さらに足が遠のく。この悪循環を断つには、欠席期間中も独自に勉強を続けられるようにする工夫が欠かせない。\n　たとえば、校長の<ruby>裁量<rt>さいりょう</rt></ruby><sup>(注6)</sup>でIT教材を使った自宅学習を出席扱いにできる制度があるが、昨年度の利用者は小中あわせて115人にとどまった。学校によって対応に差があるとの指摘もある。文科省は改めて趣旨の<ruby>周知<rt>しゅうち</rt></ruby>を図ってほしい。\n　背景に貧困問題が隠れていることも多い。勉強の遅れを取り戻すにせよ、校外に学びの場を探すにせよ、家庭に経済的な余裕がないとなかなか思うようにならない。民間の無償の学習支援活動に<ruby>助成<rt>じょせい</rt></ruby><sup>(注7)</sup>するなど、格差を広げない施策の充実が必要だ。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（朝日新聞デジタル &lt; https://www.asahi.com/articles/DA3S14229220.html?iref=sp_rensai_long_16_article &gt; 2021年4月7日取得による）</div>\n</div>",
      "passageNote": "(注1) 文部科学省：教育の振興や生涯学習の推進などを見る国の行政機関の一つ。後述の「文科省」はその略<br/>(注2) 浸透：思想や雰囲気などが次第に広がること<br/>(注3) 解せない：納得できない　理解できない<br/>(注4) アプローチ：接触<br/>(注5) 疎外感：自分だけ仲間外れにされているような感覚<br/>(注6) 裁量：自分の考えで判断し、処理すること<br/>(注7) 助成：経済的な援助を行うこと",
      "questions": [
        {
          "number": 1,
          "stem": "この文章によると、学校を休む子どもが増えたのはなぜだと考えられるか。",
          "options": [
            "1. 学校以上に学びたいことが学べる施設が増えたから",
            "2. 家庭の事情を考慮した無料の民間学校ができたから",
            "3. 登校することに対する世間の考えが変わってきたから",
            "4. 学校から自分が遠ざけられていると感じる子どもが増えたから"
          ],
          "correct": 3,
          "correctOption": "3. 登校することに対する世間の考えが変わってきたから",
          "explanation": "<b>【正解】3. 登校することに対する世間の考えが変わってきたから</b><br/>「増えたのは『無理に登校する必要はない』との考えが浸透してきた結果でもあろう(4行目)」とある。"
        },
        {
          "number": 2,
          "stem": "この文章によると、国や教育機関にはどのような責任があるか。",
          "options": [
            "1. 子どもに学校以外にも受け入れてくれる施設があると知らせる責任",
            "2. 全ての子どもが不安なく学べるように多様な受け皿を増やす責任",
            "3. 子どもが学校を避ける原因を究明し、その不安要素をなくす責任",
            "4. 子どもがうまく人間関係を築けるように出会いの場を提供する責任"
          ],
          "correct": 3,
          "correctOption": "3. 子どもが学校を避ける原因を究明し、その不安要素をなくす責任",
          "explanation": "<b>【正解】3. 子どもが学校を避ける原因を究明し、その不安要素をなくす責任</b><br/>「各学校現場にはその責務がある(8行目)」とある。「その責務」とは、直前に書いてある「子どもを遠ざけている原因を探り、取り除く」ことである。"
        },
        {
          "number": 3,
          "stem": "筆者はこの調査のどのような点が納得できないと言っているか。",
          "options": [
            "1. 「いじめ」の件数のわりに、それが不登校の理由にほとんど挙がっていない点",
            "2. 学校が考える不登校の理由と子どもが思っている真の理由に全くずれがない点",
            "3. 学校が定期的に不登校の子どもに会って理由を聞いた結果だという点",
            "4. 不登校の理由で「学業不振」が予想以上に高い割合を占めている点"
          ],
          "correct": 1,
          "correctOption": "1. 「いじめ」の件数のわりに、それが不登校の理由にほとんど挙がっていない点",
          "explanation": "<b>【正解】1. 「いじめ」の件数のわりに、それが不登校の理由にほとんど挙がっていない点</b><br/>「解せないのは(18行目)」の直後を見る。「同じ調査で『いじめ』が小中あわせて52万件を超え、やはり過去最多となったのに、不登校の理由では１％未満とされたことだ」とある。"
        },
        {
          "number": 4,
          "stem": "筆者は、学業不振による不登校の問題を改善するにはどうすべきだと言っているか。",
          "options": [
            "1. 無理に登校する必要はないという考え方をもっと教育現場に浸透させ、子どものプレッシャーを取り除くべきだと言っている。",
            "2. 自宅学習を出席扱いにする制度のねらいを再度周知させるほか、経済的な心配をせずに学べる環境を整えるべきだと言っている。",
            "3. 「全員担任制」を導入し、誰もが教室や子どもを見渡せる開かれた教室作りを目指すべきだと言っている。",
            "4. 不登校の問題は親の経済状況が大いに影響するので、義務教育である小中学校は無償にするべきだと言っている。"
          ],
          "correct": 2,
          "correctOption": "2. 自宅学習を出席扱いにする制度のねらいを再度周知させるほか、経済的な心配をせずに学べる環境を整えるべきだと言っている。",
          "explanation": "<b>【正解】2. 自宅学習を出席扱いにする制度のねらいを再度周知させるほか、経済的な心配をせずに学べる環境を整えるべきだと言っている。</b><br/>答えは、21行目から29行目にかけて書かれている。<br/>選択肢１：無理に登校する必要はないという考え方を教育現場に浸透させ、子供のプレッシャーを取り除くべきだとは書かれていない。<br/>選択肢３：学校の風通しのいい学校を作るための対策であり、不登校の問題を改善するための対策ではない。<br/>選択肢４：小中学校を無償にするべきだとは言っていない。"
        }
      ]
    },
    {
      "type": "information_retrieval",
      "title": "情報検索",
      "titleEn": "Information Retrieval",
      "pageRef": "pp.138-139",
      "instruction": "右のページは、亀池公園保全利用促進部「緑と歩む会」のお知らせである。下の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
      "passage": "<div class=\"speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal\">\n  <div class=\"border-b-2 border-slate-700 dark:border-slate-400 pb-2 mb-4 text-center\">\n    <h2 class=\"text-xl sm:text-2xl font-extrabold tracking-widest text-slate-900 dark:text-white\">３月のイベント</h2>\n  </div>\n  <p class=\"mb-4 text-slate-700 dark:text-slate-300\">亀池公園自然観察グループ「緑と歩む会」ではお子様とその保護者を対象とした自然教室を開催しています。</p>\n  \n  <div class=\"overflow-x-auto mb-4\">\n    <table class=\"w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm\">\n      <tbody>\n        <tr class=\"border-b border-slate-300 dark:border-slate-700\">\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4 bg-slate-100 dark:bg-slate-800 align-top\">①３月４日（土）<br/>春の目覚め</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 align-top\">\n            <div class=\"font-bold mb-1\">活動の春だ！冬眠から目覚めよう</div>\n            <div><b>内　容</b>：園内を散歩しながら、地形や自然を利用した遊具で遊びます。</div>\n            <div><b>参加費</b>：１家族 200円</div>\n            <div><b>時　間</b>：13:00〜15:00</div>\n            <div><b>対　象</b>：６歳から13歳までの子どもとその保護者</div>\n            <div><b>定　員</b>：10家族程度</div>\n            <div><b>申し込み期間</b>：２月１日〜２月７日</div>\n          </td>\n        </tr>\n        <tr class=\"border-b border-slate-300 dark:border-slate-700\">\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4 bg-slate-100 dark:bg-slate-800 align-top\">②３月５日（日）<br/>春の足音</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 align-top\">\n            <div class=\"font-bold mb-1\">植物はどのように春が来るのを待っている？</div>\n            <div><b>内　容</b>：花のつぼみや樹木の観察。起伏の少ないコースと斜面コースを歩きます。</div>\n            <div><b>参加費</b>：１家族 200円</div>\n            <div><b>時　間</b>：10:00〜12:00</div>\n            <div><b>対　象</b>：４歳から13歳までの子どもとその保護者</div>\n            <div><b>定　員</b>：20家族程度</div>\n            <div><b>申し込み期間</b>：２月１日〜２月14日</div>\n          </td>\n        </tr>\n        <tr class=\"border-b border-slate-300 dark:border-slate-700\">\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4 bg-slate-100 dark:bg-slate-800 align-top\">③３月25日（土）<br/>春の味覚</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 align-top\">\n            <div class=\"font-bold mb-1\">タケノコってどこにあるの？</div>\n            <div><b>内　容</b>：竹林エリアで採れたタケノコを使ってタケノコ料理を作ります。</div>\n            <div><b>参加費</b>：１家族 200円</div>\n            <div><b>時　間</b>：10:00〜12:00</div>\n            <div><b>対　象</b>：５歳から13歳までの子どもとその保護者</div>\n            <div><b>定　員</b>：10家族程度</div>\n            <div><b>申し込み期間</b>：２月７日〜２月14日</div>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-bold w-1/4 bg-slate-100 dark:bg-slate-800 align-top\">④３月26日（日）<br/>春の色</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 align-top\">\n            <div class=\"font-bold mb-1\">どうして春の色はピンクと答える人が多いの？</div>\n            <div><b>内　容</b>：散歩しながら園内の動植物の説明を聞いた後、年輪や桜をスケッチします。</div>\n            <div><b>参加費</b>：１家族 300円</div>\n            <div><b>時　間</b>：9:00〜12:00</div>\n            <div><b>対　象</b>：４歳から13歳までの子どもとその保護者</div>\n            <div><b>定　員</b>：20家族程度</div>\n            <div><b>申し込み期間</b>：２月７日〜２月21日</div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"border-t border-slate-400 dark:border-slate-600 pt-3 text-xs sm:text-sm space-y-2\">\n    <div>\n      <span class=\"font-bold\">申し込み方法</span><br/>\n      メールまたはハガキに以下の項目を書いて、お申し込みください。（ハガキの場合は締め切り日の消印有効）<br/>\n      ①イベント名　②参加される方全員の氏名、年齢　③住所　④電話番号<br/>\n      <span class=\"text-xs text-slate-600 dark:text-slate-400\">※大丸区在住者と「亀池公園友の会」会員の方は優先的に各申し込み開始日の３日前からお申し込みいただけます。</span>\n    </div>\n    <div>\n      <span class=\"font-bold\">注意事項</span><br/>\n      ・申し込み期間中に応募いただいた方の中から抽選で決定いたします。当選者に関しましては申し込み期間終了後、数日以内にご連絡いたします。<br/>\n      ・対象年齢以外のお子様はご参加いただけません。<br/>\n      ・広報等のため参加者を写した写真をホームページに掲載することがございます。<br/>\n      ・安全で動きやすい服装でご参加ください。<br/>\n      ・「亀池公園友の会」会員の方が代表者の場合、すべてのイベントに200円引きでご参加いただけます。\n    </div>\n    <div class=\"pt-2\">\n      <span class=\"font-bold\">お申し込み・お問い合わせ先</span><br/>\n      亀池公園保全利用促進部「緑と歩む会」事務局\n    </div>\n  </div>\n</div>",
      "questions": [
        {
          "number": 1,
          "stem": "大丸区に住むユカさんは娘と「春の味覚」に参加したいと考えている。申し込み方法として正しいものはどれか。",
          "options": [
            "1. ハガキにイベント名・自分の名前・年齢・住所・電話番号を記入して、２月４日から２月14日の間に「緑と歩む会」事務局へ着くように出す。",
            "2. ハガキにイベント名・自分と娘の名前・年齢・住所・電話番号を記入して、２月７日から２月14日の間に参加費と一緒に「緑と歩む会」事務局に持って行く。",
            "3. メールでイベント名・自分の名前・年齢・住所・電話番号を記入して、２月７日から２月14日の間に「緑と歩む会」事務局へ申し込む。",
            "4. メールでイベント名・自分と娘の名前・年齢・住所・電話番号を記入して、２月４日から２月14日の間に「緑と歩む会」事務局へ申し込む。"
          ],
          "correct": 4,
          "correctOption": "4. メールでイベント名・自分と娘の名前・年齢・住所・電話番号を記入して、２月４日から２月14日の間に「緑と歩む会」事務局へ申し込む。",
          "explanation": "<b>【正解】4. メールでイベント名・自分と娘の名前・年齢・住所・電話番号を記入して、２月４日から２月14日の間に「緑と歩む会」事務局へ申し込む。</b><br/>「申し込み方法」を見る。<br/>選択肢１：娘の名前が足りない。また、ハガキなので14日必着ではなく消印有効。<br/>選択肢２：大丸区に住んでいるので２月４日から申し込みができる。<br/>選択肢３：娘の名前が足りない。また、大丸区に住んでいるので２月４日から申し込みができる。"
        },
        {
          "number": 2,
          "stem": "「亀池公園友の会」会員のサビーナさんは５歳の息子と園内を周りながら自然を探索したいと思っている。無料で参加できるイベントはいくつあるか。",
          "options": [
            "1. 1つ",
            "2. 2つ",
            "3. 3つ",
            "4. 4つ"
          ],
          "correct": 1,
          "correctOption": "1. 1つ",
          "explanation": "<b>【正解】1. 1つ</b><br/>「注意事項」に注意。亀池公園友の会の会員はすべてのイベント参加費が200円引きになる。<br/>①は息子が５歳なので参加できない。<br/>②は無料（参加費200円－割引200円＝0円、対象4歳から13歳、散策あり）で参加できる。<br/>③は料理を作るだけで、探索がない。<br/>④は参加費が100円かかるため、無料ではない（参加費300円－割引200円＝100円）。"
        }
      ]
    }
  ]
}

w08_d02 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w08-d02",
  "week": 8,
  "day": 2,
  "weekTitle": "第8週",
  "dayTitle": "2日目",
  "sectionTitle": "主張理解（長文）・情報検索",
  "sectionTitleEn": "Thematic Comprehension (Long Passage) & Information Retrieval",
  "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
  "sections": [
    {
      "type": "thematic_passage",
      "title": "主張理解（長文）",
      "titleEn": "Thematic Comprehension (Long Passage)",
      "pageRef": "pp.140-141",
      "passage": "<div class=\"speed-master-text-box whitespace-pre-line font-serif leading-loose\">\n　科学が対象とする現象は、いつでも、どこでも、誰でも、それが再現できねばならない。繰り返し実験で同じ現象が生じることが確かめられなければ、普遍性があるとは言いがたいのだ。科学の客観性は再現可能性で保証されるのである。しかし、一回きりの現象も扱わねばならない場合が多い。宇宙の<ruby>創成<rt>そうせい</rt></ruby><sup>(注1)</sup>と進化、地球の<ruby>生成<rt>せいせい</rt></ruby><sup>(注2)</sup>と進化、生物の誕生と進化など、（特に歴史性を問題とする場合）私たちは、一つの例しか知らないし、それを再現してやり直すわけにもいかない。だから、たまたまの偶然による<ruby>巧<rt>うま</rt></ruby>い組み合わせで生じた現象なのか、物理法則に従って必然的な道をたどったのかは明らかではない。だから、<u>①一回きりの現象が科学の対象になるのかならないのかの議論</u>は、これまで何度も繰り返されてきた。\n　しかしながら、現代では、一回きりであってもそれは必然的に生じた事象であり、研究するに値するという合意ができている。偶然のように見える事象であっても必然の過程から位置づけられるはずだから、徹底して必然性を追求すれば合理的に説明できるという考え方を採用しているためである。言い換えるなら、自然が歩んだ道は（一見偶然に見えるが）論理から外れた偶然はなく、すべて必然の<ruby>範疇<rt>はんちゅう</rt></ruby><sup>(注3)</sup>で説明できると信じているのだ。例えば、地球上における生命の誕生物語は、ある特殊な化学物質がたまたま偶然に出会って反応した結果としてではなく、さまざまな組み合わせが試された上での必然的な産物であるとみなし、それを調べ上げることに<ruby>傾注<rt>けいちゅう</rt></ruby><sup>(注4)</sup>する。そうすれば偶然も必然のひとつとなる。宇宙論におけるビッグバン<sup>(注5)</sup>や地球科学におけるプレートテクトニクス<sup>(注6)</sup>も、<u>②そのような方向</u>で研究され、現在では正統的理論として確立している。\n　そこに<ruby>底流<rt>ていりゅう</rt></ruby><sup>(注7)</sup>している信念は、「自然の一様性の原理」である。自然界の現象は一見するとバラバラに見え、たまたま例外事象が起こったかのようだが、そこには何らかの規則性があって筋をたどることができ、またそうすることによって<ruby>因果<rt>いんが</rt></ruby><sup>(注8)</sup>関係を明らかにできる、と考えるのだ。もちろん、これは<ruby>森羅万象<rt>しんらばんしょう</rt></ruby><sup>(注9)</sup>にわたって成立しているとは限らない。全く偶然に起こった事象が原因となって結果を変えてしまう場合もあり、それを解きほぐすのは簡単ではない。しかし、<ruby>果敢<rt>かかん</rt></ruby><sup>(注10)</sup>に挑戦して何らかの<ruby>辻褄<rt>つじつま</rt></ruby>を合わせていくのが科学の営みなのかもしれない。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（池内了『科学の限界』筑摩書房による）</div>\n</div>",
      "passageNote": "(注1) 創成：初めて作り上げること<br/>(注2) 生成：新たに作り出すこと<br/>(注3) 範疇：範囲<br/>(注4) 傾注：精神や力を一つのことに集中すること<br/>(注5) ビッグバン：宇宙の始めの大爆発<br/>(注6) プレートテクトニクス：地球表面の変動はプレートの境界で起こるという学説<br/>(注7) 底流：底にある思想、感情、勢いなど<br/>(注8) 因果：原因と結果<br/>(注9) 森羅万象：宇宙間に存在するすべてのもの<br/>(注10) 果敢：思い切って",
      "questions": [
        {
          "number": 1,
          "stem": "<u>①一回きりの現象が科学の対象になるのかならないのかの議論</u>とあるが、一回きりの現象が科学の対象にならないと考えるのはなぜか。",
          "options": [
            "1. 科学は繰り返されている現象のみを取り上げるものだから",
            "2. 再現ができないため、科学の客観性が保証されないから",
            "3. 一回きりの現象は必ず偶然であって、科学が入りこむ余地はないから",
            "4. 一回きりの現象では、将来、その証明が再び必要になるかが保証できないから"
          ],
          "correct": 2,
          "correctOption": "2. 再現ができないため、科学の客観性が保証されないから",
          "explanation": "<b>【正解】2. 再現ができないため、科学の客観性が保証されないから</b><br/>「科学が対象とする現象は、～再現できなければならない(1行目)」「科学の客観性は再現可能性で保証される(2-3行目)」とある。つまり、一回きりの現象が科学の対象にならないと考えるのは、再現不可能な現象は客観性が保証されないから、ということがわかる。"
        },
        {
          "number": 2,
          "stem": "<u>②そのような方向</u>とは何か。",
          "options": [
            "1. 偶然的な事象でも徹底して必然性を追求すれば合理的に説明できるという考え方",
            "2. 一回しか起こっていない現象でも科学の対象とするために、再現を試みようとする考え方",
            "3. 一回きりの偶然の事象はこの世に存在せず、すべて研究価値があるという考え方",
            "4. ビッグバンやプレートテクトニクスの仕組みを研究し、真理を解き明かすべきだという考え方"
          ],
          "correct": 1,
          "correctOption": "1. 偶然的な事象でも徹底して必然性を追求すれば合理的に説明できるという考え方",
          "explanation": "<b>【正解】1. 偶然的な事象でも徹底して必然性を追求すれば合理的に説明できるという考え方</b><br/>「偶然のように見える事象であっても～ためである(10-12行目)」と、「偶然も必然のひとつとなる(15-16行目)」から答えがわかる。"
        },
        {
          "number": 3,
          "stem": "現在の科学者たちについて、文章の内容に合うのはどれか。",
          "options": [
            "1. 一回きりの事象を研究する必要性を感じる科学者は少数派である。",
            "2. 多くの科学者は、地球上の生命は奇跡の積み重ねで生じたものだと考えている。",
            "3. 一つの例しかない事象は、再現可能かどうかに関わらず研究の対象にしている。",
            "4. 合理的な説明ができない事象の存在を科学者たちは認めている。"
          ],
          "correct": 3,
          "correctOption": "3. 一つの例しかない事象は、再現可能かどうかに関わらず研究の対象にしている。",
          "explanation": "<b>【正解】3. 一つの例しかない事象は、再現可能かどうかに関わらず研究の対象にしている。</b><br/>9-10行目の一文を読むと答えがわかる。"
        },
        {
          "number": 4,
          "stem": "筆者の考えに合うのはどれか。",
          "options": [
            "1. 偶然性の高い事象でも、徹底して必然性を追求すれば、再現可能性を保証できるという考え方を採用すべきである。",
            "2. 普遍性が認められなければ、必然的に生じた事象とは言えないため、再現可能性を実証していくのが科学の使命である。",
            "3. 自然界で起こる現象は、偶然に見えるものであってもすべて必然に起こるものであり、その普遍性を立証していくのが科学の営みである。",
            "4. 科学とは再現可能な事象ばかり取り上げるのではなく、一回きり、あるいは偶然に起こったと見える事象でさえ追求し、規則性を求めていくものである。"
          ],
          "correct": 4,
          "correctOption": "4. 科学とは再現可能な事象ばかり取り上げるのではなく、一回きり、あるいは偶然に起こったと見える事象でさえ追求し、規則性を求めていくものである。",
          "explanation": "<b>【正解】4. 科学とは再現可能な事象ばかり取り上げるのではなく、一回きり、あるいは偶然に起こったと見える事象でさえ追求し、規則性を求めていくものである。</b><br/>元来、科学は再現可能な事象だけ対象としてきたが、現代では一回きり、あるいは偶然の事象も扱っている、ということは17行目までに読み取れる。それを踏まえ、18行目以降は「何らかの規則性があり、～因果関係を明らかにできる(19-20行目)」「果敢に挑戦して何らかの辻褄を合わせていくのが科学の営み(22-23行目)」とあり、選択肢４のようにまとめられる。"
        }
      ]
    },
    {
      "type": "information_retrieval",
      "title": "情報検索",
      "titleEn": "Information Retrieval",
      "pageRef": "pp.142-143",
      "instruction": "右のページは、東北市にある駐輪場の案内である。下の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
      "passage": "<div class=\"speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal\">\n  <div class=\"border-b-4 border-double border-slate-700 dark:border-slate-400 pb-2 mb-4 text-center\">\n    <h2 class=\"text-xl sm:text-2xl font-extrabold tracking-widest text-slate-900 dark:text-white\"><ruby>東北市<rt>とうほくし</rt></ruby>　駐輪場案内</h2>\n  </div>\n  <p class=\"mb-4 text-slate-700 dark:text-slate-300\">東北市では市内中心部をはじめ、各駅周辺に駐輪場を整備しています。放置自転車は歩行者や緊急車両の通行の妨げになるばかりでなく、都市景観も損ないます。ルールを守って安全に利用しましょう。</p>\n  \n  <div class=\"font-bold mb-2\">利用可能車種および利用料金</div>\n  <div class=\"overflow-x-auto mb-2\">\n    <table class=\"w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm\">\n      <thead>\n        <tr class=\"bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100\">\n          <th class=\"border border-slate-400 dark:border-slate-600 p-2 text-center font-bold w-1/3\">区分</th>\n          <th class=\"border border-slate-400 dark:border-slate-600 p-2 text-center font-bold w-1/3\">自転車</th>\n          <th class=\"border border-slate-400 dark:border-slate-600 p-2 text-center font-bold w-1/3\">バイク</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-medium\">一時利用券</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">100 円</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">150 円</td>\n        </tr>\n        <tr>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-medium\">定期１か月</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">1,200 円（1,500 円）</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">1,800 円（2,200 円）</td>\n        </tr>\n        <tr>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-medium\">定期３か月</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">3,500 円（4,200 円）</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">5,300 円（6,300 円）</td>\n        </tr>\n        <tr>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-medium\">定期６か月</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">6,500 円（7,800 円）</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">9,800 円（12,000 円）</td>\n        </tr>\n        <tr>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 font-medium\">回数券（12枚）</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">1,000 円</td>\n          <td class=\"border border-slate-400 dark:border-slate-600 p-2 text-center\">1,500 円</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"text-xs text-slate-600 dark:text-slate-400 mb-4\">＊（　）内料金は東北市外在住の方の料金です。</div>\n\n  <div class=\"border-t border-slate-400 dark:border-slate-600 pt-3 text-xs sm:text-sm space-y-3\">\n    <div>\n      <span class=\"font-bold\">利用方法</span>　利用券は自転車やバイクの後部の見やすいところに<ruby>貼付<rt>ちょうふ</rt></ruby>してください。<br/>\n      <div class=\"mt-1\">\n        <b>１）一時利用</b><br/>\n        　券売機で一時利用券を購入の上、ご利用ください。なお、一時利用券は発券から24時間有効です。時間は利用券に印刷されています。２日以上連続で利用される方は、利用券の有効期限内に新しい券を再度購入して貼り替えてください。\n      </div>\n      <div class=\"mt-2\">\n        <b>２）回数券利用</b><br/>\n        　券売機で回数券（12枚）を購入し、利用時に管理室で日付印を押印の上、ご利用ください。回数券の払い戻しはできませんのでご了承の上ご購入願います。回数券１枚のご利用時間は一時利用券と同様です。２日以上連続で利用される方は管理室にその旨をお申し出になり、日数に応じて日付印押印の上で、並べて貼付してください。なお、回数券の使用期限は購入日から１年間です。\n      </div>\n      <div class=\"mt-2\">\n        <b>３）定期利用</b><br/>\n        　毎月25日〜翌月５日の間のみ各駐輪場で申し込むことができます。利用開始日からの定期期間ではなく、毎月１日から末日までの定期ですので、購入をお考えの際は申込期間にご注意ください。\n      </div>\n    </div>\n  </div>\n</div>",
      "questions": [
        {
          "number": 1,
          "stem": "<ruby>西南市<rt>せいなんし</rt></ruby>に住む大学生のリンさんは、<ruby>東北市<rt>とうほくし</rt></ruby>の駐輪場に９月26日から10月25日までの30日間、毎日、自転車を預けたいと思っている。リンさんが安く利用すると、全部でいくらかかるか。",
          "options": [
            "1. 1,500円",
            "2. 1,700円",
            "3. 2,000円",
            "4. 2,600円"
          ],
          "correct": 3,
          "correctOption": "3. 2,000円",
          "explanation": "<b>【正解】3. 2,000円</b><br/>定期券は毎月１日から末日までなので、9月と10月にまたがる場合は２か月分の定期券が必要になるため、定期券１か月分の選択肢１は選べない。<br/>したがって、選択肢３の9月26日～30日の５日間は一時利用券を、10月は定期券を利用するのが一番安い方法である。<br/>選択肢１：定期券１か月（市外）の1,500円で間違い。<br/>選択肢２：９月は一時利用券５枚 500円、10月は定期券１か月（市内）1,200円、合計1,700円で間違い（リンさんは西南市在住のため市外料金）。<br/>選択肢３：９月は一時利用券５枚 500円、10月は定期券１か月（市外）1,500円、合計2,000円で正しい。<br/>選択肢４：回数券24枚 2,000円と、一時利用券6枚 600円、合計2,600円で間違い。"
        },
        {
          "number": 2,
          "stem": "<ruby>木村<rt>きむら</rt></ruby>さんはバイクで<ruby>東北市<rt>とうほくし</rt></ruby>まで旅行する予定だ。金曜日の晩に到着して、日曜日の午前中には東北市を出発する。一昨年買ったバイク用の回数券がまだ５枚残っているので、できれば使いたいと思っている。新しい回数券を買うつもりはない。どのような手順で東北市の駐輪場を利用すればいいか。",
          "options": [
            "1. 到着日の晩に、管理室に断ってから以前購入した回数券に押印し、バイクに２枚貼る。",
            "2. 到着日の晩に、管理室に断ってから以前購入した回数券に押印し、バイクに３枚貼る。",
            "3. 到着日の晩に、一時利用券を日数分購入し、バイクに貼る。",
            "4. 到着日の晩と翌日の晩に、一時利用券を１枚ずつ購入し、バイクに貼る。"
          ],
          "correct": 4,
          "correctOption": "4. 到着日の晩と翌日の晩に、一時利用券を１枚ずつ購入し、バイクに貼る。",
          "explanation": "<b>【正解】4. 到着日の晩と翌日の晩に、一時利用券を１枚ずつ購入し、バイクに貼る。</b><br/>回数券の使用期限は購入日より１年間なので、一昨年買ったバイクの回数券は使えない。また、新しい回数券を買うつもりはないので、「回数券に押印」がある選択肢１と２は間違い。利用方法の１）を見ると、「２日以上連続で利用される方は、～貼り替えてください」とあるので、選択肢３は間違い。到着日（金曜日）の晩とその翌日（土曜日）の晩に一時利用券を購入して貼るのが正しい方法である。"
        }
      ]
    }
  ]
}

w08_d03 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w08-d03",
  "week": 8,
  "day": 3,
  "weekTitle": "第8週",
  "dayTitle": "3日目",
  "sectionTitle": "主張理解（長文）・情報検索",
  "sectionTitleEn": "Thematic Comprehension (Long Passage) & Information Retrieval",
  "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
  "sections": [
    {
      "type": "thematic_passage",
      "title": "主張理解（長文）",
      "titleEn": "Thematic Comprehension (Long Passage)",
      "pageRef": "pp.144-145",
      "passage": "<div class=\"speed-master-text-box whitespace-pre-line font-serif leading-loose\">\n　知識はすべて借りものである。頭のはたらきによる思考は自力による。知識は借金でも、知識の借金は、返済の必要がないから気が楽であり、自力で稼いだように<u>①錯覚する</u>こともできる。\n　読書家は、知識と思考が<ruby>相反<rt>あいはん</rt></ruby>する関係にあることに気がつくゆとりもなく、多忙である。知識の方が思考より体裁がいいから、もの知りになって、思考を圧倒する。知識をふりまわして知的作用をしているように誤解する。\n　本当にものを考える人は、いずれ、知識と思考が二者択一の関係になることを知る。つまり、もの知りは考えず、思考をするものは知識に弱い、ということに思い至るだろう。知識をとるか思考をとるか、大問題であるが、そんなことにかかずらわる<sup>(注1)</sup>には、現実はあまりに<ruby>多事<rt>たじ</rt></ruby>である。高等教育を受けた人間はほとんど例外なく、知識信仰になる。\n　本を読んでものを知り、賢くなったように見えても、本当の人間力がそなわっていないことが多い。年をとる前に、知的に無能になってしまうのは、独創力に欠けているためである。<u>②知識は、化石みたいなもの</u>。それに対して思考は生きている。\n　知識、そして、思考の根をおろしているべき大地は、人間の生活である。その生活を大切にしない知的作用は、知識の遊戯でしかない。いくら、量的に増大しても、生きていく力とのかかわりが小さい。\n　（中略）\n　知識は本によって伝承されてきたのだから、読書好きの人は知らず知らずのうちに、知識第一主義のとりこ<sup>(注2)</sup>になって“<ruby>遊民<rt>ゆうみん</rt></ruby>”<sup>(注3)</sup>になった。<ruby>高等遊民<rt>こうとうゆうみん</rt></ruby>ということばがかつて存在した。\n　いったん知識信仰に入ってしまうと、生活を復元することは容易ではない。めいめいの足もとを<ruby>照顧<rt>しょうこ</rt></ruby>する<sup>(注4)</sup>ことは<ruby>至難<rt>しなん</rt></ruby>のわざ<sup>(注5)</sup>である。\n　そう考えると、本を読むことが、かならずしもよいことではないということがはっきりする。\n　まったく本を読まないのがいいというのではない。いまの時代、完全に文字から絶縁した生き方を考えることはできない。\n　問題はどう見ても、生きる力とは結びつかない、知識のための知識を不当によろこぶ勘違いである。知識<ruby>メタボリック症候群<rt>しょうこうぐん</rt></ruby><sup>(注6)</sup>にかかっていては、健全な生き方をしていくことは叶わない。知識を捨てることによって健康をとりもどす可能性をさぐる人がもっと多くなくては、たくましい社会にならないだろう。\n　知識があると、本来は役に立たないものでありながら、それを借用したくなる。そしてそれを自分の知識だと思っている。\n　仲間うちなら、トリなき里のコウモリ<sup>(注7)</sup>、よろしく、知識でも<ruby>羽振り<rt>はぶ</rt></ruby>がいい<sup>(注8)</sup>かもしれないが、他流試合だと借りものの知識では役に立たない。まして、その知識が相手からの借り物である場合、いわば犯罪的になる。<u>③いまの日本は国際化に当たって、いろいろな面において苦しい立場におかれている</u>のもそのためである。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（外山滋比古『乱読のセレンディピティ ―思いがけないことを発見するための読書術』扶桑社による）</div>\n</div>",
      "passageNote": "(注1) かかずらわる：関わり合いを持つ<br/>(注2) とりこ：何かに心を奪われた人<br/>(注3) 遊民：何の仕事もしないで遊んで暮らしている人<br/>(注4) 照顧する：自分の行いを反省して確かめる<br/>(注5) 至難のわざ：とても難しいこと<br/>(注6) 知識メタボリック症候群：無駄な脂肪のように知識をつけること<br/>(注7) トリなき里のコウモリ：ある分野について大して優れているわけではないのに、周りに自分より優れた人がいないからといって、偉そうにする人のこと<br/>(注8) 羽振りがいい：地位や権力・金力に恵まれて、威勢のいい様子",
      "questions": [
        {
          "number": 1,
          "stem": "<u>①錯覚する</u>とあるが、どのような錯覚か。",
          "options": [
            "1. 得た知識を使って豊かな生活ができると思うこと",
            "2. 得た知識を人のために役立てる必要はないと思うこと",
            "3. 得た知識を自分で考えついたものだと思うこと",
            "4. 得た知識は自分の頭をよくするのに役立つと思うこと"
          ],
          "correct": 3,
          "correctOption": "3. 得た知識を自分で考えついたものだと思うこと",
          "explanation": "<b>【正解】3. 得た知識を自分で考えついたものだと思うこと</b><br/>ここでは知識をお金に例えている。「自力で稼いだように錯覚する(2行目)」は、「（「知識はすべて借りものである」にも関わらず）自分で考え付いたものだと思う」ということである。"
        },
        {
          "number": 2,
          "stem": "<u>②知識は、化石みたいなもの</u>とあるが、どういう意味か。",
          "options": [
            "1. 知識は過去の積み重ねであり、その上に現在の思考が成り立つということ",
            "2. 知識は過去の積み重ねであり、集めることにのみ価値があるということ",
            "3. 知識は過去の物であって、独創的な思考を支えるにすぎないということ",
            "4. 知識は過去の物であって、生きていく力にはなりにくいということ"
          ],
          "correct": 4,
          "correctOption": "4. 知識は過去の物であって、生きていく力にはなりにくいということ",
          "explanation": "<b>【正解】4. 知識は過去の物であって、生きていく力にはなりにくいということ</b><br/>「化石」とは、大昔の生物の遺骸や生活の痕跡が地中で石のようになったものである。現在の「人間の生活」を大切にしない知識は、化石のように「生きていく力とのかかわりが小さい(14-15行目)」のである。"
        },
        {
          "number": 3,
          "stem": "筆者は読書についてどのように述べているか。",
          "options": [
            "1. もっと読書をして、生きた思考を深めるべきだ。",
            "2. 思考を妨げるので、読書は一切するべきではない。",
            "3. もっと実際の生活に利益をもたらす本を選んで、読書するべきだ。",
            "4. 読書はほどほどにして、自分で考えることを大切にするべきだ。"
          ],
          "correct": 4,
          "correctOption": "4. 読書はほどほどにして、自分で考えることを大切にするべきだ。",
          "explanation": "<b>【正解】4. 読書はほどほどにして、自分で考えることを大切にするべきだ。</b><br/>筆者は「まったく本を読まないのがいいというのではない(22行目)」と述べながらも、「生きる力とは結びつかない、知識のための知識を不当によろこぶ(24行目)」ような読書を問題視している。そして生きる力につながる「思考」を推奨している。"
        },
        {
          "number": 4,
          "stem": "<u>③いまの日本は国際化に当たって、いろいろな面において苦しい立場におかれている</u>とあるが、それはなぜだと筆者は考えているか。",
          "options": [
            "1. 日本に根ざした思考ではなく、外国から得た知識を使っているだけだから",
            "2. 外国人に比べて、日本人は知識信仰に陥っているから",
            "3. 日本人は外国の本を読まず、外国に関する知識が足りないから",
            "4. 自分で思考して、日本に役に立つ知識がどれかを見極めていないから"
          ],
          "correct": 1,
          "correctOption": "1. 日本に根ざした思考ではなく、外国から得た知識を使っているだけだから",
          "explanation": "<b>【正解】1. 日本に根ざした思考ではなく、外国から得た知識を使っているだけだから</b><br/>「知識が相手（日本にとっては外国）からの借り物である(31行目)」ために、「いまの日本は国際化に当たって、いろいろな面において苦しい立場におかれている」のである。"
        }
      ]
    },
    {
      "type": "information_retrieval",
      "title": "情報検索",
      "titleEn": "Information Retrieval",
      "pageRef": "pp.146-147",
      "instruction": "右のページは、イロハ区の子育て支援制度の案内である。下の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
      "passage": "<div class=\"speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal\">\n  <div class=\"border-b-2 border-slate-700 dark:border-slate-400 pb-2 mb-4 text-center\">\n    <h2 class=\"text-xl sm:text-2xl font-extrabold tracking-widest text-slate-900 dark:text-white\">イロハ区　子育て支援制度</h2>\n  </div>\n  <p class=\"mb-3 text-slate-700 dark:text-slate-300\">育児の援助が必要な方（利用者）に対し、育児援助を行いたい方（協力者）をご紹介します。</p>\n  <div class=\"space-y-1 mb-4 text-xs sm:text-sm\">\n    <div>● <b>利用者</b>…生後６か月以降、12歳までのお子さんのいる区内在住の方</div>\n    <div>● <b>協力者</b>…区内および隣接区在住の方。区が定める研修を修了した方</div>\n  </div>\n\n  <div class=\"border-t border-slate-400 dark:border-slate-600 pt-3 text-xs sm:text-sm space-y-3\">\n    <div>\n      <div class=\"font-bold mb-1\">【支援内容】</div>\n      <div>・保育園、幼稚園、小学校への送迎</div>\n      <div>・保育園、幼稚園、小学校の放課後の一時預かり</div>\n      <div>・保護者不在時の一時預かり</div>\n      <div class=\"text-xs text-slate-600 dark:text-slate-400 mt-1\">※病児支援、区外の施設への送迎、習い事の送迎、調理・掃除等の家事援助は支援内容に含まれません。</div>\n    </div>\n\n    <div>\n      <div class=\"font-bold\">【利用可能時間】</div>\n      <div>７時から20時まで</div>\n    </div>\n\n    <div>\n      <div class=\"font-bold\">【利用可能回数】</div>\n      <div>一世帯、月に10回まで</div>\n    </div>\n\n    <div>\n      <div class=\"font-bold\">【預かり場所】</div>\n      <div>協力者宅・利用者宅および児童館など</div>\n    </div>\n\n    <div>\n      <div class=\"font-bold mb-1\">【料金】</div>\n      <table class=\"w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm mb-2\">\n        <thead>\n          <tr class=\"bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100\">\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1 text-center font-bold\">曜日</th>\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1 text-center font-bold\">時間</th>\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1 text-center font-bold\">金額</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1 text-center font-medium\">月〜金曜日</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1 text-center\">１時間</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1 text-center\">800 円</td>\n          </tr>\n          <tr>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1 text-center font-medium\">土・日・祝</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1 text-center\">１時間</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1 text-center\">1,000 円</td>\n          </tr>\n        </tbody>\n      </table>\n      <div class=\"text-xs text-slate-600 dark:text-slate-400 space-y-0.5\">\n        <div>※１時間未満の活動も、１時間とみなします。</div>\n        <div>※１日に朝・夕など２回活動を行った場合は、それぞれ１回の活動とみなします。</div>\n        <div>※兄弟姉妹を同時に預けた場合は、２人目から半額となります。</div>\n        <div>※交通費や子どもの食費等は利用者が負担します。</div>\n      </div>\n    </div>\n\n    <div>\n      <div class=\"font-bold mb-1\">【キャンセル料】</div>\n      <div class=\"space-y-1\">\n        <div>・前日17時までのキャンセル ……………… 無料</div>\n        <div>・前日17時以降のキャンセル ……………… 予定していた活動の料金１時間分</div>\n        <div>・無断キャンセル ……………………………… 予定していた活動の料金全額</div>\n      </div>\n    </div>\n\n    <div class=\"pt-2 border-t border-slate-400 dark:border-slate-600 text-center font-medium\">\n      お申し込み、お問い合わせは kosodate-shien@xxx.net まで\n    </div>\n  </div>\n</div>",
      "questions": [
        {
          "number": 1,
          "stem": "次のイロハ区民のうち、この制度を利用できるのは誰か。",
          "options": [
            "1. 自分が帰宅する19時まで、自宅で小学生２人を預かり、食事を作って食べさせてやってほしい<ruby>鈴木<rt>すずき</rt></ruby>さん",
            "2. 自分が仕事に行かなければならない９時から13時の間、自宅で熱のある３歳児の看護を頼みたい<ruby>川井<rt>かわい</rt></ruby>さん",
            "3. ５月20日から25日までの６日間、朝と夕に区内で小学生１人の送り迎えをしてほしい<ruby>佐々木<rt>ささき</rt></ruby>さん",
            "4. 放課後、ピアノ教室に寄って帰宅した小学生を、自分が帰宅する20時まで預かってほしい<ruby>渡辺<rt>わたなべ</rt></ruby>さん"
          ],
          "correct": 4,
          "correctOption": "4. 放課後、ピアノ教室に寄って帰宅した小学生を、自分が帰宅する20時まで預かってほしい<ruby>渡辺<rt>わたなべ</rt></ruby>さん",
          "explanation": "<b>【正解】4. 放課後、ピアノ教室に寄って帰宅した小学生を、自分が帰宅する20時まで預かってほしい渡辺さん</b><br/>「病児支援、区外の施設への送迎、習い事の送迎、調理・掃除等の家事援助」は支援内容に含まれないこと、利用可能回数が「一世帯、月に10回まで」であること、「１日に朝・夕など２回活動を行った場合は、それぞれ１回の活動とみなす」ことなどから答えを導き出す。なお、渡辺さんの子どもはピアノ教室から自力で帰宅するので、「習い事の送迎」は必要ない。"
        },
        {
          "number": 2,
          "stem": "<ruby>中井<rt>なかい</rt></ruby>さんには小学生の子どもが３人いる。この制度を利用して、今週の土曜日に３時間、３人の面倒を見てもらう予定だったが、急に予定が変更になり、前日の夜20時にキャンセルの連絡を入れた。キャンセル料はいくらかかるか。",
          "options": [
            "1. 1,600円",
            "2. 2,000円",
            "3. 2,400円",
            "4. 3,000円"
          ],
          "correct": 2,
          "correctOption": "2. 2,000円",
          "explanation": "<b>【正解】2. 2,000円</b><br/>「前日17時以降のキャンセル」に当たるので、キャンセル料は「予定していた活動の料金１時間分」であること、予定していた活動が土曜日であること、「兄弟姉妹を同時に預けた場合は、２人目から半額」であることから答えを導き出す（1人目1,000円＋2人目500円＋3人目500円＝2,000円）。"
        }
      ]
    }
  ]
}

w08_d04 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w08-d04",
  "week": 8,
  "day": 4,
  "weekTitle": "第8週",
  "dayTitle": "4日目",
  "sectionTitle": "主張理解（長文）・情報検索",
  "sectionTitleEn": "Thematic Comprehension (Long Passage) & Information Retrieval",
  "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
  "sections": [
    {
      "type": "thematic_passage",
      "title": "主張理解（長文）",
      "titleEn": "Thematic Comprehension (Long Passage)",
      "pageRef": "pp.148-149",
      "passage": "<div class=\"speed-master-text-box whitespace-pre-line font-serif leading-loose\">\n　世の中が変わって、<u>①言語コミュニケーションの経験を積むのが容易でなくなってきた</u>のは事実だ。習慣化されれば苦労することなく身につくが、経験したくとも、習慣自体が時代とともに消滅してしまうこともある。それは、電話でのやりとり一つとっても言えることだ。\n　（中略）\n　携帯電話が普及する前は、中学生や高校生が友達と電話で話したいと思ったときに、必ず通らなければならない関門のようなものがあって、そのための敬語を身につけざるを得なかった。最初に受話器を取る可能性のある、友達の家族、特に親、特に父親への口のきき方を学ぶという「通過儀礼」だ。\n　友達の母親とはある程度気心も知れていて、「タロウですけど」と言えば、「あら、タロウちゃん、元気？　ちょっと待ってね」とすぐ友達を呼んでもらえた。または、タロウの近況や家族の安否が話題になって、ひとしきり、言ってみれば世間話をしたものだ。親しい友達の母親でも、他人であることに変わりない。そのような存在と言葉を交わすことによって、他者とのコミュニケーション経験を積むことができたのだ。\n　母親ならまだ気が楽だ。友達の父親の場合、特に男子生徒が女子生徒の家に電話をかけたときに父親が出たりしたら、純情な高校生は緊張してしまう。「<ruby>山田<rt>やまだ</rt></ruby>さんのお宅でしょうか。Ａ高校の山下と申しますが、ハナコさん、いらっしゃいますか」とだけ言うのに、途中で三回ぐらい言葉に詰まるのだ。\n　昔の子供たちは、大方、こうした「プチ敬語」体験を積んで、大人になっていった。今の子供は、こういった経験ができなくなった。別の言い方をすれば、こんな気づまりな思いをしなくてもよくなった。このことだけをとって、今の子が幸せかそうでないか判断することはできない。ものごとの一面だけを見ても何もわからない。電話で用いる敬語を実地訓練で身につける機会は確かに減ったが、敬語に関してわからないことがあったら、インターネット上で気軽に質問して、たちまちのうちに回答を得ることができるようになった。\n　<u>②敬語を身につけるのも自己責任になった</u>ということか。方法はある。少なくなったとはいえ機会はあるのだから、それらを積極的に利用する。映画や小説で疑似体験を積む。周りの大人たちのコミュニケーション行動を観察する。そして、きちんと敬語の使えている大人を見つけて、その人が話しているのをよく聞いて、真似をする。\n　大人のすべきことは、手本となるように努めることだ。何度もやってみせる。繰り返し聞かせる。そして、やらせてみる。よい見本になる自信がなかったら、自信をつける。中高年は学習が好きだから、すぐに覚えるだろう。思い出すだろう。できるようになると自信がつく。その姿をまるごと、若い人に見せればいい。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（野口恵子『バカ丁寧化する日本語　敬語コミュニケーションの行方』光文社による）</div>\n</div>",
      "passageNote": "",
      "questions": [
        {
          "number": 1,
          "stem": "<u>①言語コミュニケーションの経験を積むのが容易でなくなってきた</u>とあるが、その要因としてあげられることは何か。",
          "options": [
            "1. 情報化社会への変化に伴い、言語コミュニケーションの重要性が疑問視され始めてきたこと",
            "2. 携帯電話を手に入れるために親を説得するという通過儀礼の必要性がなくなったこと",
            "3. 携帯電話の普及により、言葉遣いを意識せざるを得ない身近な大人と話す機会が失われたこと",
            "4. 昔は大人になるために敬語の勉強が必須だったが、時代の変化でそれが不要になったこと"
          ],
          "correct": 3,
          "correctOption": "3. 携帯電話の普及により、言葉遣いを意識せざるを得ない身近な大人と話す機会が失われたこと",
          "explanation": "<b>【正解】3. 携帯電話の普及により、言葉遣いを意識せざるを得ない身近な大人と話す機会が失われたこと</b><br/>この文章では「言語コミュニケーションの経験」の例として、携帯電話が普及する前の電話でのやり取りが挙げられている。5-7行目で具体的に述べられており、その内容から答えを選ぶ。"
        },
        {
          "number": 2,
          "stem": "筆者は「プチ敬語」体験とはどのようなものだと述べているか。",
          "options": [
            "1. 友人の親と親しくなれるもの",
            "2. 緊張して居心地が悪いと感じるもの",
            "3. 純情な高校生だけが体験できるもの",
            "4. インターネットを利用してできるもの"
          ],
          "correct": 2,
          "correctOption": "2. 緊張して居心地が悪いと感じるもの",
          "explanation": "<b>【正解】2. 緊張して居心地が悪いと感じるもの</b><br/>「別の言い方をすれば、こんな気づまりな思いをしなくてもよくなった(18-19行目)」とあるので、そこから答えを選ぶ。"
        },
        {
          "number": 3,
          "stem": "筆者が<u>②敬語を身につけるのも自己責任になった</u>と考えているのはなぜか。",
          "options": [
            "1. 敬語を身につけさせるために、以前は友達の親などを含め、みんなで敬語を教えていたが、現在では各家庭の責任においてなされるようになったから",
            "2. 敬語習得について、以前は教育機関がその責務を負っていたが、現在では、親が敬語を教えていかなければならなくなったから",
            "3. 敬語を身につけるために、以前はその習得を促す機会が多くあったが、現代では自らが行動していかないと習得できなくなったから",
            "4. 敬語の習得に関して、以前は大人が手取り足取り敬語について教えていたが、現在ではそれについて大人が何の責任も負わなくなったから"
          ],
          "correct": 3,
          "correctOption": "3. 敬語を身につけるために、以前はその習得を促す機会が多くあったが、現代では自らが行動していかないと習得できなくなったから",
          "explanation": "<b>【正解】3. 敬語を身につけるために、以前はその習得を促す機会が多くあったが、現代では自らが行動していかないと習得できなくなったから</b><br/>敬語の身につけ方が昔の子供と今の子供でどのように変化したのかを読み取る。昔は、敬語を実地訓練で身につける機会があったが、今はその機会が減り、わからないことがあったらインターネット上で自らが質問しなければなくなったと述べられている。"
        },
        {
          "number": 4,
          "stem": "敬語について、筆者が最も言いたいことは何か。",
          "options": [
            "1. 現代の若い人は敬語を使いこなせていないので、中学生や高校生のときから極力電話をかけさせ、日常的に敬語を使用する習慣をつけるべきだ。",
            "2. 情報化社会である現代では、インターネット上で敬語についての知識が簡単に得られるので、若い人こそすぐにマスターすることができる。",
            "3. 現代の若い人は、現実世界で敬語に親しむ機会が減少しており、それゆえ、映画や小説などの創作作品の世界の中から敬語を勉強するほかない。",
            "4. 大人は、若い人の敬語習得のために繰り返し学ぶ機会を与えるとともに、自らも学び、自信をつけていく過程を隠すことなく見せていくことが必要だ。"
          ],
          "correct": 4,
          "correctOption": "4. 大人は、若い人の敬語習得のために繰り返し学ぶ機会を与えるとともに、自らも学び、自信をつけていく過程を隠すことなく見せていくことが必要だ。",
          "explanation": "<b>【正解】4. 大人は、若い人の敬語習得のために繰り返し学ぶ機会を与えるとともに、自らも学び、自信をつけていく過程を隠すことなく見せていくことが必要だ。</b><br/>筆者が最も言いたいことは最終段落(27-30行目)に述べられている。そこには「大人がすべきこと」が具体的に述べられていることから、正解を選ぶ。"
        }
      ]
    },
    {
      "type": "information_retrieval",
      "title": "情報検索",
      "titleEn": "Information Retrieval",
      "pageRef": "pp.150-151",
      "instruction": "右のページは、ある映画館のホームページにある “シネマメイト” 入会案内である。下の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
      "passage": "<div class=\"speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal\">\n  <div class=\"bg-slate-800 text-white p-3 rounded-t-lg mb-4 flex justify-between items-center\">\n    <h2 class=\"text-lg sm:text-xl font-bold tracking-wider\">“シネマメイト” 入会案内</h2>\n    <span class=\"bg-white text-slate-900 px-3 py-1 rounded text-xs font-bold\">会員登録</span>\n  </div>\n\n  <div class=\"mb-4\">\n    <div class=\"font-bold text-base border-b border-slate-400 dark:border-slate-600 pb-1 mb-2\">“シネマメイト” 会員特典</div>\n    <ul class=\"list-disc pl-5 space-y-1.5 text-xs sm:text-sm\">\n      <li>当映画館のご利用に限り、何度でも平日1,000円、休日1,300円の割引料金で映画を見ることができます。</li>\n      <li>通常、３日前から予約を受け付けていますが、会員の方は１週間前からご予約いただけます。人気の映画も一足お先にお好みの座席を確保することができます。</li>\n      <li>当映画館では、年に数回、会員の方だけを対象とした映画の先行上映会を開催しております。話題作を無料で、いち早くご覧になることができます。（応募者多数の場合は抽選とさせていただきます。）</li>\n      <li>最新の映画情報に関する情報誌を隔月無料でお届けします。</li>\n      <li>館内のショップをご利用の際、カウンターでの会員証のご提示で５％の割引が受けられます。</li>\n    </ul>\n  </div>\n\n  <div class=\"mb-4\">\n    <div class=\"inline-block bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold mb-2\">入会方法</div>\n    <div class=\"text-xs sm:text-sm mb-2\">新規入会、継続入会ともに、下記のいずれかの方法でお申し込みください。</div>\n    <div class=\"space-y-2 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/60 p-3 rounded border border-slate-300 dark:border-slate-700\">\n      <div>\n        <span class=\"font-bold\">＜窓口＞</span><br/>\n        窓口に設置してあります入会申込書にご記入いただき、年会費をお支払いください。その場で会員証を発行いたします。発行したその日から、特典をご利用いただけます。\n      </div>\n      <div>\n        <span class=\"font-bold\">＜オンライン＞</span><br/>\n        このホームページ右上の「会員登録」をクリックし、必要事項をご入力ください。年会費のお支払いはクレジットカード決済のみになっております。年会費のお支払いが確認でき次第、会員証を発行し、ご自宅へ送付いたします。会員証の到着までには、１週間程度かかります。\n      </div>\n    </div>\n  </div>\n\n  <div class=\"border-t border-slate-400 dark:border-slate-600 pt-3 text-xs sm:text-sm\">\n    <div class=\"flex items-center gap-4 mb-2\">\n      <span class=\"font-bold\">年会費（１年間有効）</span>\n      <span>新規入会：1,000円</span>\n      <span>継続入会：800円</span>\n    </div>\n    <div class=\"text-xs text-slate-600 dark:text-slate-400 space-y-1\">\n      <div>※継続入会とは、会員証の有効期限日より１か月前から期限内に手続きをする場合を指します。会員証の有効期限が終了した場合は、再度、新規入会手続きを行ってください。</div>\n      <div>※入場の際、会員証をご提示いただきます。なお、理由によらず、会員証を確認できない場合、恐れ入りますが通常料金をお支払いいただきます。</div>\n    </div>\n  </div>\n</div>",
      "questions": [
        {
          "number": 1,
          "stem": "“シネマメイト” の会員になると受けることができるサービスはどれか。",
          "options": [
            "1. 全国の映画館で安く映画を見ることができる。",
            "2. 優先的に座席を予約することができる。",
            "3. 映画の先行上映会に必ず参加することができる。",
            "4. ショップの雑誌が毎月無料で読める。"
          ],
          "correct": 2,
          "correctOption": "2. 優先的に座席を予約することができる。",
          "explanation": "<b>【正解】2. 優先的に座席を予約することができる。</b><br/>「“シネマメイト” 会員特典」の部分を読めば、答えを出すことができる。<br/>選択肢１：「当映画館のご利用に限り」とある。この映画館でのみ有効であるので間違いである。<br/>選択肢３：「応募者多数の場合は抽選」とある。「必ず」参加できるわけではないので間違いである。<br/>選択肢４：「最新の映画情報に関する情報誌を隔月無料」とある。「ショップの雑誌」とは言っていないのと、「毎月」ではなく「隔月」であるので、間違いである。"
        },
        {
          "number": 2,
          "stem": "<ruby>橋本<rt>はしもと</rt></ruby>さんは、“シネマメイト” 会員である。あさって30日に、映画を見ようと思っているが、会員証の有効期限が明日29日で終了することに気がついた。30日に会員割引料金で映画が見られ、かつ年会費が安く済む方法はどれか。",
          "options": [
            "1. 29日までに窓口へ行き、継続入会の手続きをする。",
            "2. 29日までにオンラインで、継続入会の手続きをする。",
            "3. 30日に窓口へ行き、継続入会の手続きをする。",
            "4. 30日に窓口へ行き、新規入会の手続きをする。"
          ],
          "correct": 1,
          "correctOption": "1. 29日までに窓口へ行き、継続入会の手続きをする。",
          "explanation": "<b>【正解】1. 29日までに窓口へ行き、継続入会の手続きをする。</b><br/>新規入会をするより、継続入会のほうが安く済む。継続入会するためには、会員証の有効期限内（29日まで）に手続きをしなければならない。また、オンラインでの申し込みでは新しい会員証が手元に届くまで１週間程度かかってしまうため、窓口で申し込むしかない。"
        }
      ]
    }
  ]
}

w08_d05 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w08-d05",
  "week": 8,
  "day": 5,
  "weekTitle": "第8週",
  "dayTitle": "5日目",
  "sectionTitle": "主張理解（長文）・情報検索",
  "sectionTitleEn": "Thematic Comprehension (Long Passage) & Information Retrieval",
  "instruction": "次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
  "sections": [
    {
      "type": "thematic_passage",
      "title": "主張理解（長文）",
      "titleEn": "Thematic Comprehension (Long Passage)",
      "pageRef": "pp.152-153",
      "passage": "<div class=\"speed-master-text-box whitespace-pre-line font-serif leading-loose\">\n　現在、環境問題がさまざまに議論されています。一口に環境問題といっても、地球温暖化・オゾン層の破壊・熱帯林の減少・酸性雨・有機化合物や有毒金属による地球汚染など、多くの問題にわたっており、対策も個々の問題に応じて異なっています。逆に、原因はただ一つです。人間の諸活動が、環境問題を引き起こしているからです。地上に人類が現れて以来、地球環境は汚染され続けてきたと極論を言う人もいます。実際、人類の手で多くの種が絶滅させられました。しかし、人類も自然に生まれてきた生物の一つですから、その活動が環境に影響を与えるのは必然なのかもしれません。\n　ただ、人類は生産活動を行うという点で他の生物とは異なった存在であり、自然では作り得ない物質を生産し、その大量消費を行うようになったのも事実です。その結果、人類の活動が地球の環境が許容できる能力と匹敵するほどのレベルに達しており、自然では浄化しきれない人工化合物があふれ、新しい生命体を作る試みすら始めています。人類は、意識しているかどうかは別として、環境を根本的に変えかねない事態を招いているのです。\n　かつては「環境は無限」と考えられていました。つまり、環境の容量は人類の活動に比べて圧倒的に大きく、すべてを吸収処理してくれると思ってきたのです。だから、廃棄物を平気で海や空に捨て、森林を切り、海や湖を埋め立て、ダムを造ってきました。しかし、環境が無制限でないことを、さまざまな公害によって学んできました。また、陸にも海にも砂漠化が進み（海にも砂漠化が進み、<ruby>海藻<rt>かいそう</rt></ruby>が枯れています）、自然の生産力が落ち始めています。確かに、このままの消費生活を続けると、地球の許容能力を越え、カタストロフィー<sup>(注)</sup>が起こるかもしれません。人類の未来は、環境問題の危機をいかに乗り切るかにかかっていると言っても過言ではないでしょう。二一世紀は、まさにこの課題に直面する時代となるに違いありません。\n　（中略）\n　この地球環境の危機に対し、「原始時代のような生活に戻れ」という主張をする人がいます。大量消費が原因なのですから、それをやめればいいという単純な発想です。しかし、それは正しいのでしょうか。いったん獲得した知識や能力を捨てて、原始時代の不安な生活に戻れるものなのでしょうか。生産力の低い生活に戻れば、どれほど多くの<ruby>餓死<rt>がし</rt></ruby>者が出ることでしょう。はたして誰が、それを命じることができるのでしょうか。たぶん、答えは、そんな知恵のない単純なものではないと思います。なすべきことは、現在の私たちの生き方を振り返り、いかなる価値観の変更が必要で、そのためには、科学がいかなる役目を果たすべきかを考えることではないでしょうか。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（池内了『科学の考え方・学び方』岩波書店による）</div>\n</div>",
      "passageNote": "(注) カタストロフィー：破滅的な災害など自然界や人間社会における大変革",
      "questions": [
        {
          "number": 1,
          "stem": "この文章によると環境問題の原因は何か。",
          "options": [
            "1. 人間の生産と消費活動",
            "2. 地球の浄化能力の限界",
            "3. 多くの種の絶滅",
            "4. 人類の誕生と進化"
          ],
          "correct": 1,
          "correctOption": "1. 人間の生産と消費活動",
          "explanation": "<b>【正解】1. 人間の生産と消費活動</b><br/>「人間の諸活動が、環境問題を引き起こしている(3-4行目)」や、7行目から11行目を読み取る。"
        },
        {
          "number": 2,
          "stem": "筆者は、人間と他の動物が違うのは、どのような点だと述べているか。",
          "options": [
            "1. 人間は自然に生まれてきた生物であるという点",
            "2. 人間は自然にはない物質を生産するという点",
            "3. 人間は環境の限界を学ぶという点",
            "4. 人間は環境の破壊も創造もできるという点"
          ],
          "correct": 2,
          "correctOption": "2. 人間は自然にはない物質を生産するという点",
          "explanation": "<b>【正解】2. 人間は自然にはない物質を生産するという点</b><br/>「人類は生産活動を行うという点で他の生物とは異なった存在(7行目)」とある。"
        },
        {
          "number": 3,
          "stem": "知恵のない単純なものとはどんな考え方か。",
          "options": [
            "1. これまでに獲得した知識や能力を捨てようという考え方",
            "2. 現在の私たちの価値観を変更しようという考え方",
            "3. 科学が果たすべき役目を変更しようという考え方",
            "4. 原始時代のような生活に戻ろうという考え方"
          ],
          "correct": 4,
          "correctOption": "4. 原始時代のような生活に戻ろうという考え方",
          "explanation": "<b>【正解】4. 原始時代のような生活に戻ろうという考え方</b><br/>「この地球環境の危機に対し、『原始時代のような生活に戻れ』という主張をする人がいます。大量消費が原因なのですから、それをやめればいいという単純な発想です(21-22行目)」から、「答えは、そんな知恵のない単純なものではない(25行目)」につながる。"
        },
        {
          "number": 4,
          "stem": "筆者は環境問題に対して、どうすべきだと述べているか。",
          "options": [
            "1. すべての科学を捨て、原始時代に戻ることは不可能でも、できるところから科学に依存しない生活を始める努力が必要だ。",
            "2. 大量生産、大量消費という生活様式を捨て、生産性の低い生活に戻るために、科学がいかなる役目を果たすべきかを考えるべきだ。",
            "3. 人類の生活様式を内省し、環境保全のためにどんな価値観を持つべきか、そこで科学をどう生かせるかを考えるべきだ。",
            "4. 現状から「環境は無限」でないことを学び、環境問題の危機をいかに乗り切るかを真剣に考えるべきだ"
          ],
          "correct": 3,
          "correctOption": "3. 人類の生活様式を内省し、環境保全のためにどんな価値観を持つべきか、そこで科学をどう生かせるかを考えるべきだ。",
          "explanation": "<b>【正解】3. 人類の生活様式を内省し、環境保全のためにどんな価値観を持つべきか、そこで科学をどう生かせるかを考えるべきだ。</b><br/>「なすべきことは、現在の私たちの生き方を振り返り、いかなる価値観の変更が必要で、そのためには、科学がいかなる役目を果たすべきかを考えることではないでしょうか(26-27行目)」から答えを選ぶ。"
        }
      ]
    },
    {
      "type": "information_retrieval",
      "title": "情報検索",
      "titleEn": "Information Retrieval",
      "pageRef": "pp.154-155",
      "instruction": "右のページは、もみじ市の市民芸術祭の案内である。下の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
      "passage": "<div class=\"speed-master-flyer-card max-w-2xl mx-auto my-2 p-4 sm:p-6 bg-amber-50/20 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border-2 border-slate-700 dark:border-slate-400 rounded-xl shadow-sm font-sans text-sm sm:text-base leading-normal\">\n  <div class=\"border-b-2 border-slate-700 dark:border-slate-400 pb-2 mb-4 text-center\">\n    <h2 class=\"text-xl sm:text-2xl font-extrabold tracking-widest text-slate-900 dark:text-white\">もみじ市　市民芸術祭</h2>\n  </div>\n  <p class=\"mb-4 text-slate-700 dark:text-slate-300\">もみじ市では今年も恒例の「市民芸術祭」を開催いたします。応募数が展示予定数を超える場合がございますので、あらかじめ審査を行い、展示する作品を決定します。</p>\n\n  <div class=\"space-y-1 mb-3 text-xs sm:text-sm\">\n    <div>◆<b>参加条件</b>　もみじ市にお住まいの方、あるいは、もみじ市に通勤通学されている方</div>\n    <div>◆<b>募集期間</b>　９月15日（水）〜９月30日（木）</div>\n  </div>\n\n  <div class=\"mb-4\">\n    <div class=\"font-bold text-xs sm:text-sm mb-1\">◆展示期間とジャンル　<span class=\"font-normal\">いずれのジャンルも「秋」をテーマにしたもの。</span></div>\n    <div class=\"overflow-x-auto\">\n      <table class=\"w-full border-collapse border border-slate-400 dark:border-slate-600 text-xs sm:text-sm\">\n        <thead>\n          <tr class=\"bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100\">\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-bold\">展示期間</th>\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-bold\">ジャンル</th>\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-bold\">内容</th>\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-bold\">個人</th>\n            <th class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-bold\">団体<sup>※</sup></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td rowspan=\"3\" class=\"border border-slate-400 dark:border-slate-600 p-1.5 font-medium align-middle text-center\">\n              Ａ：<br/>10月15日（金）〜<br/>10月31日（日）\n            </td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-medium\">絵　画</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5\">油絵、水彩画など</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">不可</td>\n          </tr>\n          <tr>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-medium\">写　真</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5\">秋の植物が映っているもの</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">不可</td>\n          </tr>\n          <tr>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-medium\">動　画</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5\">秋の風景をテーマにしたもの（最長15分）</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">不可</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n          </tr>\n          <tr>\n            <td rowspan=\"3\" class=\"border border-slate-400 dark:border-slate-600 p-1.5 font-medium align-middle text-center\">\n              Ｂ：<br/>10月20日（水）〜<br/>10月31日（日）\n            </td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-medium\">服　飾</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5\">服、アクセサリーなど身に付けるもの</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">不可</td>\n          </tr>\n          <tr>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-medium\">オブジェ</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5\">金属、ガラス、粘土などで作った立体作品</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">不可</td>\n          </tr>\n          <tr>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center font-medium\">おもちゃ</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5\">木製のおもちゃ、カードゲーム、パズルなど</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n            <td class=\"border border-slate-400 dark:border-slate-600 p-1.5 text-center\">可</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"text-xs text-slate-600 dark:text-slate-400 mt-1\">※２人以上連名で応募する場合は「団体」の扱いとなります。</div>\n  </div>\n\n  <div class=\"border-t border-slate-400 dark:border-slate-600 pt-3 text-xs sm:text-sm space-y-3\">\n    <div>\n      <div class=\"font-bold mb-1\">◆応募方法</div>\n      <div>以下をもみじ市広報課（kouhou@momizy-city.jp）までメールでお送りください。</div>\n      <div class=\"pl-2 space-y-0.5 mt-1\">\n        <div>①応募シート</div>\n        <div>②居住、通勤通学の証明ができるもの（運転免許証、学生証、社員証など）のスキャン</div>\n        <div>③作品の全体がわかる写真（絵画・服飾・オブジェ・おもちゃに応募する方のみ）</div>\n        <div>④作品のデータ（写真・動画に応募する方のみ）</div>\n      </div>\n    </div>\n\n    <div>\n      <div class=\"font-bold mb-1\">◆注意事項</div>\n      <div>・<b>応募点数について</b><br/>１人で複数の作品を応募することは可能ですが、個人か団体かを問わず、１人が同じジャンルに２点以上応募することはできません。</div>\n      <div class=\"mt-1.5\">・<b>展示が決定した作品について</b><br/>審査結果はメールでお知らせします。展示が決定した方は、展示開始の３日前までに、作品を市民センターまでお持ちください。郵送は受け付けません。なお、動画の場合はデータを収めたDVDの提出をお願いします。</div>\n    </div>\n\n    <div class=\"space-y-1 pt-1\">\n      <div>◆<b>展示場所</b>　もみじ美術館１階「みんなの広場」</div>\n      <div>◆<b>主催</b>　もみじ市広報課（市民センター５階）</div>\n    </div>\n  </div>\n</div>",
      "questions": [
        {
          "number": 1,
          "stem": "もみじ市の大学に通う留学生のチンさんは、映画サークルの仲間と「秋の恵み」をテーマに動画を作り、展示が決定した。チンさんはこれからどのようにするか。",
          "options": [
            "1. ９月30日までに作品データと応募シートと学生証のスキャンを、もみじ市広報課へ送る。",
            "2. ９月30日までに作品データと応募シートと学生証のスキャンを、もみじ美術館へ送る。",
            "3. 10月12日までに作品のDVDを市民センターへ届けに行く。",
            "4. 10月17日までに作品のDVDを市民センターへ届けに行く。"
          ],
          "correct": 3,
          "correctOption": "3. 10月12日までに作品のDVDを市民センターへ届けに行く。",
          "explanation": "<b>【正解】3. 10月12日までに作品のDVDを市民センターへ届けに行く。</b><br/>チンさんの作品はすでに展示が決定しているので、◆注意事項の「展示が決定した作品について」から答えを導く。チンさんの作品は動画なので、展示期間はＡ：10月15日～10月31日である。展示開始の３日前の10月12日までに、作品を市民センターへ届けに行く。"
        },
        {
          "number": 2,
          "stem": "もみじ市に住んでいる<ruby>田中<rt>たなか</rt></ruby>さんは、娘と一緒に作った作品と自分の作品を出品しようと思っている。今のところ娘と一緒に作ったテーブルゲームを団体で、田中さんが一人で作ったセーターを個人で応募する予定である。このほかに田中さんが個人で応募できる作品はいくつあるか。",
          "options": [
            "1. 1つ",
            "2. 2つ",
            "3. 3つ",
            "4. 4つ"
          ],
          "correct": 3,
          "correctOption": "3. 3つ",
          "explanation": "<b>【正解】3. 3つ</b><br/>◆注意事項の「１人が同じジャンルに２点以上応募することはできません」がポイント。田中さんは「おもちゃ（テーブルゲーム）」と「服飾（セーター）」に応募する予定である。この２つ以外に◆展示期間とジャンルの表で「個人＝可」となっているものは「絵画」「写真」「オブジェ」の３つである。"
        }
      ]
    }
  ]
}

data_map = {
  "w08-d01.json": w08_d01,
  "w08-d02.json": w08_d02,
  "w08-d03.json": w08_d03,
  "w08-d04.json": w08_d04,
  "w08-d05.json": w08_d05
}

for fname, d in data_map.items():
    fp = os.path.join(OUT_DIR, fname)
    with open(fp, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f"Written: {fp}")
