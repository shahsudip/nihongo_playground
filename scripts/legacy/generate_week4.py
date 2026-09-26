import json
import os

OUTPUT_DIR = r"D:\sudip_software\nihongo_playground\src\data\somatome"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ----------------- WEEK 4 DAY 1 -----------------
w4d1 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day1",
  "week": 4,
  "day": 1,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 1: 見出し",
  "learning_focus": {
    "title": "見出しによく使われる省略形に注意しよう！",
    "subtitle": "Pay attention to omissions commonly used in newspaper headlines!",
    "comic": {
      "text1": "昨夜ネコ、イヌとけんか",
      "text2": "「昨夜ネコがイヌとけんかした」ってことね。",
      "sign": "窓閉め切り眠れぬ一夜 タイヤ工場火災",
      "note": "見出しでは助詞（は、が、を、に等）や述語（〜した、〜がある等）が省略されることが多い。"
    }
  },
  "vocabulary": [
    { "word": "見出し", "reading": "みだし", "meaning": "headline / heading" },
    { "word": "閉め切る", "reading": "しめきる", "meaning": "to keep closed / shut tightly" },
    { "word": "眠れぬ", "reading": "ねむれぬ", "meaning": "sleepless (literary form of 眠れない)" },
    { "word": "一夜", "reading": "いちや", "meaning": "one night" },
    { "word": "火災", "reading": "かさい", "meaning": "fire / conflagration" },
    { "word": "延焼", "reading": "えんしょう", "meaning": "spread of fire" },
    { "word": "鎮火", "reading": "ちんか", "meaning": "extinguishing of fire" },
    { "word": "負傷者", "reading": "ふしょうしゃ", "meaning": "injured person(s)" }
  ],
  "grammar_notes": [
    "【見出しの省略ルール】助詞（が、を、に、で）や語尾（〜した、〜される）が省略されます。",
    "例：「タイヤ工場火災」＝「タイヤ工場で火災が発生した」"
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の見出しを読んで、後の文から正しい意味の文を選ぼう。(答えは別冊 p.4)",
    "conversation": [
      { "speaker": "見出しA", "text": "市役所 窓口業務 20時まで延長 来月から" },
      { "speaker": "見出しB", "text": "市内全域 断水のおそれ 水道管破裂で" }
    ],
    "question": "見出しの意味として正しいものを選ぼう。",
    "options": [
      "1 市役所は来月から夜8時まで開くようになる。",
      "2 市役所の窓口は今月から毎日休みになる。",
      "3 水道管が壊れたため、市全体で水が出なくなる可能性がある。",
      "4 水道管が破裂したが、断水の心配は全くない。"
    ],
    "correct_answers": [1, 3],
    "options_explanation": {
      "1": "Correct. '20時まで延長 来月から' means opening hours will be extended to 8pm starting next month.",
      "2": "Incorrect. The headline says extension of hours, not closure.",
      "3": "Correct. '断水のおそれ 水道管破裂で' means fear of water outage across the city due to broken water pipes.",
      "4": "Incorrect. '断水のおそれ' indicates a risk of water stoppage."
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の新聞記事の見出しと本文を読んで、後の問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "窓閉め切り眠れぬ一夜　タイヤ工場火災",
      "sections": [
        {
          "header": "記事内容",
          "rows": [
            {
              "label": "発生日時",
              "value": "昨夜午後8時ごろ、○○市にある自動車タイヤ工場から出火。"
            },
            {
              "label": "被害状況",
              "value": "倉庫約1000平方メートルが全焼し、約6時間後に鎮火した。けが人はいなかったが、黒煙と悪臭が周辺の住宅街に広がり、住民は窓を閉め切ったまま不安な一夜を過ごした。"
            }
          ]
        }
      ],
      "footer": "※出火原因については警察と消防で詳しく調べている。"
    },
    "notice_vocab": [
      { "word": "出火", "meaning": "outbreak of fire" },
      { "word": "全焼", "meaning": "burned to the ground" },
      { "word": "黒煙", "meaning": "black smoke" },
      { "word": "悪臭", "meaning": "bad smell / foul odor" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "記事の内容と合っているものはどれか。",
        "options": [
          "1 火災によって工場の作業員2名が負傷した。",
          "2 近隣の住民は煙やにおいのために窓を開けられなかった。",
          "3 火災は発生から24時間後にようやく消し止められた。",
          "4 工場の火災は住宅街にも燃え広がって全焼した。"
        ],
        "correct_answer": 2,
        "explanation": "The text states '黒煙と悪臭が周辺の住宅街に広がり、住民は窓を閉め切ったまま不安な一夜を過ごした' (residents kept windows shut due to black smoke and odor), which corresponds to Option 2."
      },
      {
        "id": "問2",
        "text": "見出しの「眠れぬ一夜」とはどういうことか。",
        "options": [
          "1 消防士が一晩中消火活動で眠れなかったこと。",
          "2 工場の社長がショックで眠れなかったこと。",
          "3 近所の人々が不安や煙のにおいなどで眠れなかったこと。",
          "4 警察の取り調べが長引いて寝られなかったこと。"
        ],
        "correct_answer": 3,
        "explanation": "Option 3 correctly describes the residents who spent a sleepless, anxious night with closed windows due to the smoke and fire."
      }
    ]
  }
}

# ----------------- WEEK 4 DAY 2 -----------------
w4d2 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day2",
  "week": 4,
  "day": 2,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 2: 記事①（出来事）",
  "learning_focus": {
    "title": "5W1H（いつ・どこで・だれが・なにを・なぜ・どのように）をつかもう！",
    "subtitle": "Grasp the 5W1H in news reporting!",
    "comic": {
      "text1": "どこで起きたの？",
      "text2": "いつ、だれが何をしたのか確認しよう。",
      "sign": "駅前広場でロボット清掃車 実験開始",
      "note": "記事の第1段落（リード文）に重要情報が要約されている。"
    }
  },
  "vocabulary": [
    { "word": "実証実験", "reading": "じっしょうじっけん", "meaning": "demonstration experiment / field test" },
    { "word": "導入する", "reading": "どうにゅうする", "meaning": "to introduce / adopt (system)" },
    { "word": "清掃", "reading": "せいそう", "meaning": "cleaning" },
    { "word": "障害物", "reading": "しょうがいぶつ", "meaning": "obstacle" },
    { "word": "感知する", "reading": "かんちする", "meaning": "to detect / sense" },
    { "word": "自動的に", "reading": "じどうてきに", "meaning": "automatically" }
  ],
  "grammar_notes": [
    "【〜によると／〜によれば】情報源を示す表現。(According to...)",
    "【〜ことが明らかになった】事実が判明したことを表す。(It was revealed that...)"
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の短文を読んで、正しいものを選ぼう。(答えは別冊 p.4)",
    "conversation": [
      { "speaker": "記事", "text": "市は2日、駅前広場においてAIを搭載した自動清掃ロボットの実験を開始したと発表した。夜間を中心に稼働し、人手不足の解消を目指す。" }
    ],
    "question": "この実験の目的として最も適当なものはどれか。",
    "options": [
      "1 新しい駅ビルを建設するため。",
      "2 清掃員の不足を補うため。",
      "3 昼間の観光客を増やすため。",
      "4 駅前広場の通行を禁止するため。"
    ],
    "correct_answers": [2],
    "options_explanation": {
      "2": "Correct. '人手不足の解消を目指す' means aiming to solve labor shortage (supplement lack of cleaning staff)."
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の記事を読んで、後の問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "商店街で無人配送ロボットの走行実験",
      "sections": [
        {
          "header": "記事本文",
          "rows": [
            {
              "label": "内容",
              "value": "○○市の中央商店街で15日、自動走行する無人ロボットを使った商品配送の実験が行われた。ロボットはセンサーで歩行者や障害物を避けながら、注文を受けたスーパーから指定のマンション前まで約500メートルを走行した。利用者はスマートフォンの暗証番号で扉を開け、商品を受け取った。"
            },
            {
              "label": "今後の予定",
              "value": "市と開発企業は、来年度の実用化を目指して安全性の検証を進めるとしている。"
            }
          ]
        }
      ],
      "footer": "※実験は通行人の少ない午前10時から午後2時までの間に実施された。"
    },
    "notice_vocab": [
      { "word": "無人配送", "meaning": "unmanned delivery" },
      { "word": "暗証番号", "meaning": "PIN / password code" },
      { "word": "実用化", "meaning": "commercialization / practical implementation" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "利用者はどのようにして商品を受け取ったか。",
        "options": [
          "1 ロボットに現金を支払って商品と交換した。",
          "2 配達員にサインをして荷物を受け取った。",
          "3 スマホの暗証番号を入力してロボットの扉を開けた。",
          "4 スーパーのレジに直接取りに行った。"
        ],
        "correct_answer": 3,
        "explanation": "The text states '利用者はスマートフォンの暗証番号で扉を開け、商品を受け取った' which matches Option 3."
      },
      {
        "id": "問2",
        "text": "この実験について合っているものはどれか。",
        "options": [
          "1 すでに今年から本格的な商業サービスが始まっている。",
          "2 ロボットは人が操縦しないと障害物を避けられない。",
          "3 来年度の実用化に向けて安全面の確認を行っている。",
          "4 実験は真夜中に行われた。"
        ],
        "correct_answer": 3,
        "explanation": "The article states '来年度の実用化を目指して安全性の検証を進める' (verifying safety aiming for commercial use next fiscal year), which matches Option 3."
      }
    ]
  }
}

# ----------------- WEEK 4 DAY 3 -----------------
w4d3 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day3",
  "week": 4,
  "day": 3,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 3: 記事②（社会・生活）",
  "learning_focus": {
    "title": "数字や変化を表す表現（増加・減少・横ばい）に注目しよう！",
    "subtitle": "Notice numerical trends and expressions of change!",
    "comic": {
      "text1": "増えているのかな？",
      "text2": "前年に比べて20%増加だって！",
      "sign": "電子書籍の利用率 初めて紙を上回る",
      "note": "〜割（1割＝10%）、前年同期比、〜に達するなどの表現を覚える。"
    }
  },
  "vocabulary": [
    { "word": "割合", "reading": "わりあい", "meaning": "ratio / percentage" },
    { "word": "増加する", "reading": "ぞうかする", "meaning": "to increase" },
    { "word": "減少する", "reading": "げんしょうする", "meaning": "to decrease" },
    { "word": "上回る", "reading": "うわまわる", "meaning": "to exceed / surpass" },
    { "word": "下回る", "reading": "したまわる", "meaning": "to fall below" },
    { "word": "推移する", "reading": "すいいする", "meaning": "to transition / change over time" }
  ],
  "grammar_notes": [
    "【〜に比べて／〜と比較して】〜と比べたとき。(Compared to...)",
    "【〜に達した／〜にのぼった】数字が特定の水準に届いたことを表す。(Reached / mounted to...)"
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の会話文を読んで、正しいものを選ぼう。(答えは別冊 p.4)",
    "conversation": [
      { "speaker": "調査員", "text": "読書習慣に関する調査では、月1冊以上本を読む人の割合が45%となり、前年の50%からやや減少しました。" },
      { "speaker": "記者", "text": "一方で、電子書籍を利用する人は30%から38%に増加していますね。" }
    ],
    "question": "調査結果について正しいものはどれか。",
    "options": [
      "1 紙の本を読む人と電子書籍を読む人の両方が増えた。",
      "2 月1冊以上本を読む人の割合は前年より増えた。",
      "3 電子書籍を利用する人の割合は前年より増えた。",
      "4 電子書籍の利用率は前年の半分に減った。"
    ],
    "correct_answers": [3],
    "options_explanation": {
      "3": "Correct. '電子書籍を利用する人は30%から38%に増加しています' (e-book users increased from 30% to 38%)."
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の調査記事を読んで、後の問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "若者のキャッシュレス決済利用 8割超に",
      "sections": [
        {
          "header": "調査結果概要",
          "rows": [
            {
              "label": "利用状況",
              "value": "20代の買い物におけるキャッシュレス決済（クレジットカード・QRコード・電子マネー等）の利用割合が82%に達したことが、民間シンクタンクの調査で分かった。前年調査（71%）から11ポイント上昇した。"
            },
            {
              "label": "理由",
              "value": "利用理由として最も多かったのは「ポイント還元でお得だから」（64%）で、次いで「支払いがスピーディーだから」（58%）、「財布を持ち歩かなくてよいから」（45%）が続いた。"
            }
          ]
        }
      ],
      "footer": "※対象：全国の20代男女1000名（複数回答可）"
    },
    "notice_vocab": [
      { "word": "決済", "meaning": "settlement / payment" },
      { "word": "上昇する", "meaning": "to rise / climb" },
      { "word": "ポイント還元", "meaning": "point rewards / cashback" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "キャッシュレス決済を利用する最大の理由は何ですか。",
        "options": [
          "1 財布を持ち歩きたくないから。",
          "2 ポイントがついてお得だから。",
          "3 現金を下ろす手数料が高いから。",
          "4 支払いが速くて便利だから。"
        ],
        "correct_answer": 2,
        "explanation": "The text states '最も多かったのは「ポイント還元でお得だから」（64%）' (the most frequent reason was 'economical with point rewards'), matching Option 2."
      },
      {
        "id": "問2",
        "text": "20代のキャッシュレス利用率の変化について合っているものはどれか。",
        "options": [
          "1 前年に比べて利用割合が低下した。",
          "2 前年の71%から82%へと増加した。",
          "3 昨年と全く同じ割合で横ばいだった。",
          "4 利用している人は全体の半数以下にとどまった。"
        ],
        "correct_answer": 2,
        "explanation": "The text notes it rose from 71% to 82% ('前年調査（71%）から11ポイント上昇した'), matching Option 2."
      }
    ]
  }
}

# ----------------- WEEK 4 DAY 4 -----------------
w4d4 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day4",
  "week": 4,
  "day": 4,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 4: 記事③（環境・自然）",
  "learning_focus": {
    "title": "原因と結果・影響の関係を読み解こう！",
    "subtitle": "Analyze cause, result, and environmental impact!",
    "comic": {
      "text1": "どうしてプラスチックごみを減らすの？",
      "text2": "海を汚して魚や鳥に影響が出るからだよ。",
      "sign": "海洋プラごみ削減へ マイボトルの普及推進",
      "note": "〜によって、〜の結果、〜につながる などの因果関係に注目する。"
    }
  },
  "vocabulary": [
    { "word": "排出量", "reading": "はいしゅつりょう", "meaning": "emission / discharge amount" },
    { "word": "削減する", "reading": "さくげんする", "meaning": "to cut down / reduce" },
    { "word": "生態系", "reading": "せいたいけい", "meaning": "ecosystem" },
    { "word": "影響を及ぼす", "reading": "えいきょうをおよぼす", "meaning": "to exert an influence on" },
    { "word": "深刻な", "reading": "しんこくな", "meaning": "serious / severe" },
    { "word": "リサイクル", "reading": "リサイクル", "meaning": "recycling" }
  ],
  "grammar_notes": [
    "【〜を通じて／〜を通して】手段や期間を表す。(Through...)",
    "【〜に伴い／〜に伴って】ある変化と一緒に別の変化が起きる。(Along with / as a consequence of...)"
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の文章を読んで、正しいものを選ぼう。(答えは別冊 p.4)",
    "conversation": [
      { "speaker": "解説", "text": "使い捨てプラスチック製品の使用削減に伴い、紙製ストローや木製スプーンを導入する飲食店が急増しています。" }
    ],
    "question": "飲食店の変化の理由として正しいものはどれか。",
    "options": [
      "1 紙や木の方がプラスチックより安価だから。",
      "2 プラスチックごみの削減を進めるため。",
      "3 お客さんがストローを使わなくなったから。",
      "4 スプーンの製造工場が閉鎖したから。"
    ],
    "correct_answers": [2],
    "options_explanation": {
      "2": "Correct. '使い捨てプラスチック製品の使用削減に伴い' indicates the motivation is reducing plastic waste."
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の記事を読んで、後の問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "食品ロス削減へ スーパーで「てまえどり」呼びかけ",
      "sections": [
        {
          "header": "記事本文",
          "rows": [
            {
              "label": "取り組み",
              "value": "スーパーなどの小売店で、賞味期限の近い手前の商品から優先的に購入する「てまえどり」を呼びかける運動が全国に広がっている。すぐに食べる商品であれば、奥にある日付の新しいものではなく手前のものを選ぶことで、廃棄される食品を大幅に減らすことができる。"
            },
            {
              "label": "効果",
              "value": "導入した店舗では、廃棄パンやおにぎりの量が前年比で約15%減少したという。"
            }
          ]
        }
      ],
      "footer": "※消費者庁・農林水産省・環境省の合同推進プロジェクト。"
    },
    "notice_vocab": [
      { "word": "食品ロス", "meaning": "food loss / food waste" },
      { "word": "賞味期限", "meaning": "best-before date" },
      { "word": "廃棄", "meaning": "disposal / throwing away" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "「てまえどり」とはどのような行動ですか。",
        "options": [
          "1 できるだけ奥にある賞味期限の長い商品を選ぶこと。",
          "2 買ったらすぐにその場で食べきること。",
          "3 すぐに食べるなら陳列棚の手前にある商品を買うこと。",
          "4 自分で作らずにスーパーの惣菜を買うこと。"
        ],
        "correct_answer": 3,
        "explanation": "Option 3 matches the definition: purchasing items from the front of the shelf if planning to consume soon."
      },
      {
        "id": "問2",
        "text": "「てまえどり」の取り組みによってどのような成果が得られたか。",
        "options": [
          "1 お店の売り上げが2倍になった。",
          "2 捨てられる食品の量が約15%減った。",
          "3 商品の値段が15%安くなった。",
          "4 店員の労働時間が15%削減された。"
        ],
        "correct_answer": 2,
        "explanation": "The text states '廃棄パンやおにぎりの量が前年比で約15%減少した' (wasted bread and onigiri decreased by ~15%), matching Option 2."
      }
    ]
  }
}

# ----------------- WEEK 4 DAY 5 -----------------
w4d5 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day5",
  "week": 4,
  "day": 5,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 5: 記事④（科学・文化）",
  "learning_focus": {
    "title": "発見や研究成果の要点をつかもう！",
    "subtitle": "Grasp the key findings of scientific and cultural research!",
    "comic": {
      "text1": "新しい遺跡が見つかったんだって！",
      "text2": "何千年前のものか調べているよ。",
      "sign": "古代の集落跡から大量の土器出土",
      "note": "研究者や専門家のコメント（〜と述べている、〜と分析している）に注目。"
    }
  },
  "vocabulary": [
    { "word": "遺跡", "reading": "いせき", "meaning": "historic ruins / archaeological site" },
    { "word": "発掘する", "reading": "はっくつする", "meaning": "to excavate / unearth" },
    { "word": "出土する", "reading": "しゅつどする", "meaning": "to be unearthed / excavated" },
    { "word": "専門家", "reading": "せんもんか", "meaning": "specialist / expert" },
    { "word": "貴重な", "reading": "きちょうな", "meaning": "precious / valuable" },
    { "word": "分析する", "reading": "ぶんせきする", "meaning": "to analyze" }
  ],
  "grammar_notes": [
    "【〜とみられている／〜と考えられる】客観的な推測。(It is considered/viewed that...)",
    "【〜にほかならない】まさに〜である。(Nothing other than...)"
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の文を読んで、正しいものを選ぼう。(答えは別冊 p.4)",
    "conversation": [
      { "speaker": "ニュース", "text": "山形県の山林で、約1200年前の平安時代のものとみられる製鉄所跡が見つかりました。当時の東北地方の産業構造を知る上で貴重な発見とされています。" }
    ],
    "question": "発見されたものについて合っているものはどれか。",
    "options": [
      "1 1200年前に作られた陶器の破片。",
      "2 平安時代の製鉄所の遺跡。",
      "3 江戸時代の城の石垣。",
      "4 現代の新しい製鉄工場。"
    ],
    "correct_answers": [2],
    "options_explanation": {
      "2": "Correct. '平安時代のものとみられる製鉄所跡' (ruins of an ironworks from the Heian period)."
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の記事を読んで、後の問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "睡眠中の脳が記憶を整理するメカニズムを解明",
      "sections": [
        {
          "header": "研究成果",
          "rows": [
            {
              "label": "発見",
              "value": "○○大学の研究チームは、人間が睡眠をとっている間に、脳が日中に得た記憶を重要なものと不要なものに選別する神経メカニズムを特定したと発表した。"
            },
            {
              "label": "意義",
              "value": "十分な睡眠をとることで記憶の定着が促進され、逆に睡眠不足が続くと学習効率が著しく低下することが実験で証明された。研究チームは「試験前の徹夜はかえって逆効果である」と指摘している。"
            }
          ]
        }
      ],
      "footer": "※米科学誌『サイエンス・ニューロ』に論文掲載。"
    },
    "notice_vocab": [
      { "word": "記憶の定着", "meaning": "retention / consolidation of memory" },
      { "word": "徹夜", "reading": "てつや", "meaning": "staying up all night" },
      { "word": "著しく", "reading": "いちじるしく", "meaning": "remarkably / significantly" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "研究チームが明らかにしたことは何か。",
        "options": [
          "1 睡眠をとらなくても学習効率は変わらないこと。",
          "2 睡眠中に脳が記憶を選別して整理していること。",
          "3 夜更かしをするほど記憶力が高まること。",
          "4 試験前は徹夜で勉強するのが一番効果的であること。"
        ],
        "correct_answer": 2,
        "explanation": "The text states that during sleep, the brain sorts important memories from unneeded ones ('睡眠をとっている間に、脳が日中に得た記憶を重要なものと不要なものに選別する'), matching Option 2."
      },
      {
        "id": "問2",
        "text": "研究チームの指摘として合っているものはどれか。",
        "options": [
          "1 毎日徹夜で勉強するべきである。",
          "2 勉強した後はしっかり睡眠をとることが大切である。",
          "3 睡眠時間は3時間あれば十分である。",
          "4 試験勉強は睡眠中に行うべきである。"
        ],
        "correct_answer": 2,
        "explanation": "The text explains sufficient sleep consolidates memory and staying up all night is counterproductive ('試験前の徹夜はかえって逆効果'), matching Option 2."
      }
    ]
  }
}

# ----------------- WEEK 4 DAY 6 -----------------
w4d6 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day6",
  "week": 4,
  "day": 6,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 6: 社説・コラム",
  "learning_focus": {
    "title": "筆者の主張やメッセージを読み取ろう！",
    "subtitle": "Understand the author's editorial thesis and message!",
    "comic": {
      "text1": "筆者は何を一番言いたいのかな？",
      "text2": "「〜べきだ」「〜ではないか」に注目しよう。",
      "sign": "コラム：言葉の移り変わりとマナー",
      "note": "文章の最後（結び）に筆者の強い主張が置かれることが多い。"
    }
  },
  "vocabulary": [
    { "word": "社説", "reading": "しゃせつ", "meaning": "editorial" },
    { "word": "コラム", "reading": "コラム", "meaning": "column / commentary" },
    { "word": "主張する", "reading": "しゅちょうする", "meaning": "to argue / assert / claim" },
    { "word": "配慮する", "reading": "はいりょする", "meaning": "to consider / show consideration" },
    { "word": "多様性", "reading": "たようせい", "meaning": "diversity" },
    { "word": "不可欠な", "reading": "ふかけつな", "meaning": "indispensable / essential" }
  ],
  "grammar_notes": [
    "【〜べきだ／〜べきではない】当然〜しなければならない。(Should / must...)",
    "【〜のではないだろうか】自分の意見を柔らかく主張する。(Isn't it the case that...)"
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の文を読んで、筆者の意見として正しいものを選ぼう。(答えは別冊 p.4)",
    "conversation": [
      { "speaker": "コラム", "text": "時代とともに新しい言葉が生まれるのは自然なことだ。しかし、相手を不快にさせない思いやりやマナーだけは、どんな時代でも失われてはならないのではないだろうか。" }
    ],
    "question": "筆者が最も言いたいことは何か。",
    "options": [
      "1 新しい言葉を一切使ってはいけない。",
      "2 昔の言葉だけを正しく使うべきだ。",
      "3 言葉が変わっても相手への思いやりやマナーが大切である。",
      "4 マナーよりも新しい流行語を早く覚えるべきだ。"
    ],
    "correct_answers": [3],
    "options_explanation": {
      "3": "Correct. The author emphasizes that consideration and manners toward others must not be lost despite changing language."
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次のコラムを読んで、後の問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "読書がもたらす心の余白",
      "sections": [
        {
          "header": "コラム本文",
          "rows": [
            {
              "label": "本文",
              "value": "現代人はスマートフォンから流れてくる大量の短い情報に追われ、立ち止まって物事を深く考える時間を失いがちである。速さと効率ばかりが求められる日常の中で、本を開いて活字の世界に没頭する時間は、私たちに「心の余白」を取り戻させてくれる。忙しい現代だからこそ、あえてゆっくりと1冊の本と向き合う時間を大切にしたいものである。"
            }
          ]
        }
      ],
      "footer": "※朝刊コラム『四季の風』より抜粋。"
    },
    "notice_vocab": [
      { "word": "活字", "meaning": "printed text / type" },
      { "word": "没頭する", "meaning": "to immerse oneself in" },
      { "word": "余白", "meaning": "margin / mental breathing room" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "筆者は現代人の生活についてどのように述べているか。",
        "options": [
          "1 情報が少なすぎて退屈している。",
          "2 速さや効率を優先し、深く考える時間が減っている。",
          "3 昔の人よりもたくさんの本を読んでいる。",
          "4 スマホを持たない生活を楽しんでいる。"
        ],
        "correct_answer": 2,
        "explanation": "The text states modern people are chased by short bits of info and lack time to think deeply ('速さと効率ばかりが求められる日常の中で、深く考える時間を失いがち'), matching Option 2."
      },
      {
        "id": "問2",
        "text": "筆者が最も伝えたいメッセージはどれか。",
        "options": [
          "1 スマホを今すぐ解約するべきだ。",
          "2 読書をやめて効率的な情報収集に専念すべきだ。",
          "3 忙しい時代だからこそ、本をゆっくり読む時間を大切にしよう。",
          "4 本は速読でできるだけ速く読むべきだ。"
        ],
        "correct_answer": 3,
        "explanation": "The author concludes: 'あえてゆっくりと1冊の本と向き合う時間を大切にしたいものである' (cherish time reading a book slowly especially in busy times), matching Option 3."
      }
    ]
  }
}

# ----------------- WEEK 4 DAY 7 -----------------
w4d7 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week4-day7",
  "week": 4,
  "day": 7,
  "theme": "新聞を読もう",
  "title": "Week 4 - Day 7: 実戦問題（まとめテスト）",
  "learning_focus": {
    "title": "第4週の総まとめ！新聞記事とコラムの実戦問題を解こう",
    "subtitle": "Week 4 Review Test: Complete newspaper and column reading comprehension test!",
    "comic": {
      "text1": "見出し、5W1H、数字、筆者の主張を総復習！",
      "text2": "制限時間は15分、100点満点を目指そう！",
      "sign": "実戦問題（第4週）",
      "note": "見出しと本文の関係、グラフや数値の読み取り、筆者の意見を的確につかもう。"
    }
  },
  "vocabulary": [
    { "word": "実戦問題", "reading": "じっせんもんだい", "meaning": "practical test / review questions" },
    { "word": "制限時間", "reading": "せいげんじかん", "meaning": "time limit" },
    { "word": "配点", "reading": "はいてん", "meaning": "point allocation" },
    { "word": "総合的に", "reading": "そうごうてきに", "meaning": "comprehensively" }
  ],
  "practice": {
    "title": "実戦問題について",
    "instruction": "制限時間：15分、配点：1問25点×4問＝100点。実際の試験形式で問題1・問題2の4問を解きましょう。(答えは別冊 p.4)",
    "conversation": [],
    "options": [],
    "correct_answers": [],
    "options_explanation": {}
  },
  "mondai": {
    "title": "実戦問題（第4週まとめ）",
    "instruction": "次の2つの文章を読んで、それぞれの問いに答えなさい。(答えは別冊 p.4)",
    "notice": {
      "title": "問題1：地元産野菜の学校給食導入が拡大",
      "sections": [
        {
          "header": "記事1",
          "rows": [
            {
              "label": "本文",
              "value": "○○市内の小中学校で、地元農家が栽培した旬の野菜を学校給食に取り入れる「地産地消」の取り組みが広がっている。新鮮で安全な食材を子どもたちに届けるとともに、地元の農業に関心を持ってもらう食育の効果も出ているという。農家側にとっても安定した出荷先が確保できるメリットがある。"
            }
          ]
        },
        {
          "header": "記事2：コラム（デジタル時代の学び）",
          "rows": [
            {
              "label": "本文",
              "value": "学校教育へのタブレット端末導入が進み、調べ学習やオンライン授業が容易になった。しかし、情報を簡単に検索できるからこそ、得られた情報が本当に正しいのか批判的に吟味する「メディアリテラシー」の重要性がますます高まっているのではないだろうか。"
            }
          ]
        }
      ],
      "footer": "※制限時間：15分。1問25点。"
    },
    "notice_vocab": [
      { "word": "地産地消", "meaning": "local production for local consumption" },
      { "word": "食育", "meaning": "food and nutrition education" },
      { "word": "吟味する", "meaning": "to examine closely / scrutinize" }
    ],
    "questions": [
      {
        "id": "問1",
        "text": "【記事1】学校給食に地元産野菜を使うメリットとして述べられていないものはどれか。",
        "options": [
          "1 新鮮で安全な野菜を子どもに提供できる。",
          "2 子どもたちが農業に関心を持つきっかけになる。",
          "3 農家にとって安定した出荷先になる。",
          "4 他の地域の農産物より価格が半額以下になる。"
        ],
        "correct_answer": 4,
        "explanation": "Options 1, 2, and 3 are explicitly cited in the text as benefits. Option 4 (half price) is not mentioned."
      },
      {
        "id": "問2",
        "text": "【記事1】「地産地消」とはどういうことか。",
        "options": [
          "1 地域で作られたものをその地域で消費すること。",
          "2 海外から安く輸入して安く食べること。",
          "3 自分で食べる分だけ庭で野菜を育てること。",
          "4 有名な高級食材だけを遠くから取り寄せること。"
        ],
        "correct_answer": 1,
        "explanation": "Option 1 correctly explains '地産地消' (locally produced and locally consumed)."
      },
      {
        "id": "問3",
        "text": "【記事2】タブレット端末の導入によって何ができるようになったか。",
        "options": [
          "1 給食の調理が自動化された。",
          "2 調べ学習やオンライン授業が容易になった。",
          "3 すべての教科書が不要になった。",
          "4 宿題をしなくてもよくなった。"
        ],
        "correct_answer": 2,
        "explanation": "The text states '調べ学習やオンライン授業が容易になった' (research learning and online classes became easier), matching Option 2."
      },
      {
        "id": "問4",
        "text": "【記事2】筆者が今後ますます重要になると考えていることは何か。",
        "options": [
          "1 検索スピードをできるだけ速くすること。",
          "2 最新型の高価なタブレットを購入すること。",
          "3 得られた情報が正しいかを吟味する力（メディアリテラシー）。",
          "4 インターネットを一切使わないようにすること。"
        ],
        "correct_answer": 3,
        "explanation": "The author concludes that '得られた情報が本当に正しいのか批判的に吟味するメディアリテラシーの重要性がますます高まっている', matching Option 3."
      }
    ]
  }
}

days = [w4d1, w4d2, w4d3, w4d4, w4d5, w4d6, w4d7]
for i, d in enumerate(days):
    file_path = os.path.join(OUTPUT_DIR, f"week4-day{i+1}.json")
    with open(file_path, "w", encoding="utf-8") as fp:
        json.dump(d, fp, ensure_ascii=False, indent=2)
    print(f"Saved {file_path}")

print("All Week 4 files generated successfully!")
