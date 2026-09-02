import json
import os

# Week 1 Day 2
day2 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week1-day2",
  "week": 1,
  "day": 2,
  "theme": "お知らせや案内を読もう①",
  "title": "Week 1 - Day 2: 案内②",
  "learning_focus": {
    "title": "場所や方向を正しく読もう！",
    "subtitle": "Try to read the places and directions correctly!",
    "comic": {
      "situation": "交差点と四つ角の違いや数え方について話している。",
      "dialogue": [
        {"speaker": "鳥", "text": "「四つ角」って四つ目の角のこと？"},
        {"speaker": "先生鳥", "text": "ここが四つ角"},
        {"speaker": "先生鳥", "text": "その四つ角を入れて数えて、ここが四つ目の角"}
      ]
    }
  },
  "vocabulary": [
    {"word": "向かい", "reading": "むかい", "meaning": "across from / opposite", "example": "スーパーの向かい"},
    {"word": "ななめ向かい", "reading": "ななめむかい", "meaning": "diagonally opposite", "example": "銀行のななめ向かい"},
    {"word": "向こう", "reading": "むこう", "meaning": "across from / opposite / beyond", "example": "川の向こう"},
    {"word": "手前", "reading": "てまえ", "meaning": "before", "example": "橋の手前"},
    {"word": "角", "reading": "かど", "meaning": "corner", "example": "二つ目の角"},
    {"word": "四つ角", "reading": "よつかど", "meaning": "crossroads", "example": "四つ角を曲がる"},
    {"word": "交差点", "reading": "こうさてん", "meaning": "intersection", "example": "大きな交差点"},
    {"word": "有料駐車場", "reading": "ゆうりょうちゅうしゃじょう", "meaning": "a pay parking lot", "example": "駅前の有料駐車場"},
    {"word": "つきあたり", "reading": "つきあたり", "meaning": "the end of", "example": "通りのつきあたり"},
    {"word": "前方", "reading": "ぜんぽう", "meaning": "ahead", "example": "前方に注意する"},
    {"word": "後方", "reading": "こうほう", "meaning": "behind", "example": "後方を確認する"},
    {"word": "右折する", "reading": "うせつする", "meaning": "to turn right", "example": "次の角を右折する"},
    {"word": "左折する", "reading": "させつする", "meaning": "to turn left", "example": "交差点を左折する"},
    {"word": "徒歩", "reading": "とほ", "meaning": "on foot", "example": "徒歩10分"},
    {"word": "面している", "reading": "めんしている", "meaning": "facing", "example": "大通りに面している"},
    {"word": "一方通行", "reading": "いっぽうつうこう", "meaning": "a one-way street", "example": "この道は一方通行だ"}
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の会話文を読んで、後の文から正しいものを二つ選ぼう。(答えは次のページ)",
    "conversation": [
      {"speaker": "女子学生", "text": "今日のゼミの会場、駅からちょっと遠いね。"},
      {"speaker": "男子学生", "text": "うん。でも、行き方は簡単だよ。駅の東口を出て、大通りをまっすぐ行って、4つ目の信号を右折するんだ。"},
      {"speaker": "女子学生", "text": "あ、その角にドラッグストアがあるところね。"},
      {"speaker": "男子学生", "text": "そう。その角を曲がって、100メートルくらい行くと、左側にあるんだ。"},
      {"speaker": "女子学生", "text": "分かった。じゃ、迷わずに行けそうね。"}
    ],
    "options": [
      "1 駅の東口を出て、4つ目の信号を右に曲がる。",
      "2 会場は駅から歩いてすぐのところにある。",
      "3 4つ目の信号の角にはスーパーがある。",
      "4 会場はドラッグストアの向かいにある。",
      "5 ドラッグストアの角を曲がって少し歩くと、左側に会場がある。"
    ],
    "correct_answers": [1, 5],
    "options_explanation": {
      "1": "正しい。男子学生が「駅の東口を出て、大通りをまっすぐ行って、4つ目の信号を右折するんだ」と言っています。",
      "2": "間違い。女子学生が「駅からちょっと遠いね」と言っており、すぐのところではありません。",
      "3": "間違い。4つ目の信号の角にあるのは「ドラッグストア」です。",
      "4": "間違い。会場はドラッグストアの角を曲がって100メートルほど進んだ左側にあります。",
      "5": "正しい。男子学生が「その角を曲がって、100メートルくらい行くと、左側にあるんだ」と言っています。"
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の案内図を読んで、後の問いに答えなさい。(答えは別冊 p.2)",
    "notice": {
      "heading": "会場の案内図",
      "subheading": "地下鉄さくら野駅より徒歩10分",
      "content": [
        "5番出口を出て、さくら野通りを直進してください。",
        "二つ目の交差点（さくら野交差点）を左折し、そのまま200m直進します。",
        "つきあたりの四つ角を右折すると、前方にさくらホールが見えます。",
        "※さくらホールの手前に有料駐車場がございます。",
        "※ホール前の道路は一方通行となっておりますので、お車でお越しの際はご注意ください。"
      ]
    },
    "notice_vocabulary": [
      {"word": "直進する", "reading": "ちょくしんする", "meaning": "to go straight"},
      {"word": "出口", "reading": "でぐち", "meaning": "exit"},
      {"word": "お越しの際", "reading": "おこしのさい", "meaning": "when coming / visiting"}
    ],
    "questions": [
      {
        "question_number": 1,
        "question": "さくらホールに行く道順として正しいものはどれか。",
        "options": [
          "1 5番出口を出て直進し、最初の交差点を左折する。",
          "2 5番出口を出て直進し、二つ目の交差点を左折してつきあたりを右折する。",
          "3 5番出口を出て左折し、突き当たりを右折する。",
          "4 5番出口を出て直進し、さくら野交差点を右折する。"
        ],
        "correct_answer": 2,
        "explanation": "案内文に「5番出口を出て、さくら野通りを直進」「二つ目の交差点（さくら野交差点）を左折」「つきあたりの四つ角を右折」と書かれているので、2が正しいです。"
      },
      {
        "question_number": 2,
        "question": "さくらホールについて、案内と合っているものはどれか。",
        "options": [
          "1 さくらホールの向かいに無料の駐車場がある。",
          "2 さくらホール前の道は両方向とも車が通れる。",
          "3 さくらホールの手前に有料の駐車場がある。",
          "4 駅からさくらホールまでは車で10分かかる。"
        ],
        "correct_answer": 3,
        "explanation": "注記に「※さくらホールの手前に有料駐車場がございます」とあるため、3が正しいです。"
      }
    ]
  }
}

# Week 1 Day 3
day3 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week1-day3",
  "week": 1,
  "day": 3,
  "theme": "お知らせや案内を読もう①",
  "title": "Week 1 - Day 3: 案内③",
  "learning_focus": {
    "title": "意味を間違えやすい言葉に注意しよう！",
    "subtitle": "Pay attention to tricky expressions!",
    "comic": {
      "situation": "「以上」「以下」「未満」などの違いについて説明している。",
      "dialogue": [
        {"speaker": "鳥", "text": "「以上」や「以下」はその数も入るの？"},
        {"speaker": "先生鳥", "text": "そう！「以上」「以下」「以内」「以前」「以後」はその数が入ります。"},
        {"speaker": "先生鳥", "text": "「未満」はその数が入らないよ（その数より下）。"}
      ]
    }
  },
  "vocabulary": [
    {"word": "チラシ", "reading": "チラシ", "meaning": "a leaflet / a flier", "example": "新聞のチラシ"},
    {"word": "〜以前", "reading": "〜いぜん", "meaning": "before / earlier than ~ (including the specified time)", "example": "2000年以前"},
    {"word": "〜以上", "reading": "〜いじょう", "meaning": "more than / not less than ~ (including the specified number)", "example": "4人以上のグループ"},
    {"word": "〜未満", "reading": "〜みまん", "meaning": "less than ~ (not including the specified number)", "example": "14歳未満の少年"},
    {"word": "〜以内", "reading": "〜いない", "meaning": "within ~ (including the limit)", "example": "5日以内"},
    {"word": "〜以後／以降", "reading": "〜いご／いこう", "meaning": "after / from ~ on (including the specified time)", "example": "10時以後／以降"},
    {"word": "〜以下", "reading": "〜いか", "meaning": "less than / not more than ~ (including the specified number)", "example": "30歳以下の女性"},
    {"word": "〜周年記念", "reading": "〜しゅうねんきねん", "meaning": "~th anniversary", "example": "10周年記念"}
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の会話文を読んで、後の文から正しいものを二つ選ぼう。(答えは次のページ)",
    "conversation": [
      {"speaker": "父", "text": "このチラシ見てごらん。「レストラン レオン 10周年記念サービス」だって。"},
      {"speaker": "娘", "text": "わあ、おいしそう！何て書いてあるの？"},
      {"speaker": "父", "text": "「4人以上でお食事されたお客様に、ワイン1本プレゼント」だって。うちも家族4人で行けばもらえるね。"},
      {"speaker": "娘", "text": "でも、私とお兄ちゃんはワイン飲めないよ。"},
      {"speaker": "父", "text": "大丈夫、「お酒が飲めない方や、20歳未満の方にはソフトドリンクをサービス」って書いてあるよ。"},
      {"speaker": "娘", "text": "やった！じゃあ今度の週末に行こうよ！"}
    ],
    "options": [
      "1 このレストランはオープンしてまだ1年以内である。",
      "2 家族4人でお店に行けば、ワインのサービスが受けられる。",
      "3 娘とお兄ちゃんもワインを飲むことができる。",
      "4 20歳の人はソフトドリンクしかもらえない。",
      "5 20歳未満の子どもにはソフトドリンクのサービスがある。"
    ],
    "correct_answers": [2, 5],
    "options_explanation": {
      "1": "間違い。「10周年記念」なので、オープンして10年です。",
      "2": "正しい。「4人以上でお食事されたお客様にワイン1本プレゼント」とあり、家族4人なら対象になります。",
      "3": "間違い。20歳未満の子どもはお酒（ワイン）を飲めません。",
      "4": "間違い。「20歳未満」はお酒が飲めないためソフトドリンクですが、20歳以上はワインの対象です。",
      "5": "正しい。「20歳未満の方にはソフトドリンクをサービス」と明記されています。"
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次のチラシを読んで、後の問いに答えなさい。(答えは別冊 p.2)",
    "notice": {
      "heading": "ワインがおいしいレストラン レオン 10周年記念サービス",
      "subheading": "期間：201X年4月1日〜4月30日",
      "content": [
        "【特典1】4名様以上でディナーをご予約・ご利用のお客様に、特選ワイン1本を無料でサービスいたします。",
        "（※お酒を召し上がらない方、20歳未満の方には、人数分のソフトドリンクをご用意いたします。）",
        "【特典2】ランチタイムにお食事をご注文のお客様全員に、自家製アイスクリームをサービス！",
        "（※お食事をご注文の方に限ります。お飲み物のみのご注文の場合は対象外となります。）",
        "【特典3】次回使える500円割引券を、お会計3,000円以上のお客様に進呈いたします。"
      ]
    },
    "notice_vocabulary": [
      {"word": "特典", "reading": "とくてん", "meaning": "special benefit / privilege"},
      {"word": "特選", "reading": "とくせん", "meaning": "specially selected"},
      {"word": "自家製", "reading": "じかせい", "meaning": "homemade"},
      {"word": "進呈", "reading": "しんてい", "meaning": "present / give as a gift"}
    ],
    "questions": [
      {
        "question_number": 1,
        "question": "このチラシの説明と合っているものはどれか。",
        "options": [
          "1 ランチでお食事を頼んだ人にはアイスクリームがもらえる。",
          "2 飲み物だけを頼んだ人にもアイスクリームがサービスされる。",
          "3 3人以下のグループでもワインが1本もらえる。",
          "4 20歳未満の人には何もサービスされない。"
        ],
        "correct_answer": 1,
        "explanation": "チラシに「ランチタイムにお食事をご注文のお客様全員に、自家製アイスクリームをサービス」とあり、飲み物のみは対象外と記載されているため、1が正しいです。"
      },
      {
        "question_number": 2,
        "question": "ディナーを予約してワインのプレゼントをもらうための条件として正しいものはどれか。",
        "options": [
          "1 お会計が3,000円未満であること。",
          "2 4人以上のグループでディナーを利用すること。",
          "3 全員が20歳未満であること。",
          "4 昼のランチタイムに来店すること。"
        ],
        "correct_answer": 2,
        "explanation": "「4名様以上でディナーをご予約・ご利用のお客様に、特選ワイン1本を無料でサービス」とあるため、2が正しいです。"
      }
    ]
  }
}

# Week 1 Day 4
day4 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week1-day4",
  "week": 1,
  "day": 4,
  "theme": "お知らせや案内を読もう①",
  "title": "Week 1 - Day 4: 試験要項",
  "learning_focus": {
    "title": "似ている言葉に注意しよう！",
    "subtitle": "Pay attention to similar words!",
    "comic": {
      "situation": "「〜まで」と「〜までに」の違いについて説明している。",
      "dialogue": [
        {"speaker": "鳥", "text": "「10日まで」と「10日までに」はどう違うの？"},
        {"speaker": "先生鳥", "text": "「10日まで受け付けます」は10日まで受付が続く（継続）。"},
        {"speaker": "先生鳥", "text": "「10日までに提出してください」は10日より前のどこかの時点で提出する（期限・完了）。"}
      ]
    }
  },
  "vocabulary": [
    {"word": "〜まで", "reading": "〜まで", "meaning": "until ~ (action continues up to that point)", "example": "10日まで受け付けます"},
    {"word": "〜までに", "reading": "〜までに", "meaning": "by / before ~ (deadline/action must be completed before or on that time)", "example": "10日までに提出してください"},
    {"word": "今回の〜", "reading": "こんかいの〜", "meaning": "this time's ~", "example": "今回の試験"},
    {"word": "今度", "reading": "こんど", "meaning": "next time / this time", "example": "今度（＝次回）のテストはがんばろう"},
    {"word": "今回／今度", "reading": "こんかい／こんど", "meaning": "this time", "example": "今回／今度のテストは難しかった"}
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の会話文を読んで、後の文から正しいものを二つ選ぼう。(答えは次のページ)",
    "conversation": [
      {"speaker": "男子学生", "text": "先週の日本語文法の授業、休んじゃったんだけど、試験について何か先生言ってた？"},
      {"speaker": "女子学生", "text": "うん、期末試験は来週の水曜日で、レポートの提出締め切りは今週の金曜日の午後5時までだって。"},
      {"speaker": "男子学生", "text": "えっ、金曜日までにレポート出さなきゃいけないの？大変だ！ノート見せてもらってもいい？"},
      {"speaker": "女子学生", "text": "いいよ。でも、レポートは窓口に直接提出しなきゃいけなくて、メールでの提出は不可だから気をつけてね。"},
      {"speaker": "男子学生", "text": "ありがとう、助かるよ！"}
    ],
    "options": [
      "1 レポートは今週の金曜日の午後5時までに提出しなければならない。",
      "2 レポートはメールで送って提出することができる。",
      "3 期末試験は今週の金曜日に行われる。",
      "4 男子学生は先週の授業を休んだのでノートを借りる。",
      "5 女子学生はレポートの提出期限を知らない。"
    ],
    "correct_answers": [1, 4],
    "options_explanation": {
      "1": "正しい。女子学生が「金曜日の午後5時まで」、男子学生が「金曜日までにレポート出さなきゃいけないの？」と確認しています。",
      "2": "間違い。女子学生が「メールでの提出は不可」と言っています。",
      "3": "間違い。期末試験は「来週の水曜日」です。",
      "4": "正しい。男子学生が「先週の授業休んじゃった」「ノート見せてもらってもいい？」と頼んでいます。",
      "5": "間違い。女子学生は期限を把握しており教えてあげています。"
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の案内を読んで、後の問いに答えなさい。(答えは別冊 p.2)",
    "notice": {
      "heading": "日本語文法Ⅱ 試験とレポートの提出について",
      "subheading": "担当：佐藤教授",
      "content": [
        "1. 期末試験について",
        "・日時：7月20日（水） 10:30〜12:00（3号館201教室）",
        "・持ち物：学生証、筆記用具（辞書や教科書の持ち込みは不可）",
        "2. レポートの提出について",
        "・提出期限：7月15日（金） 17:00厳守",
        "・提出場所：教務課窓口（レポート提出BOX）",
        "・注意：郵送やメールによる提出は一切受け付けません。期限を過ぎたレポートは無効となります。"
      ]
    },
    "notice_vocabulary": [
      {"word": "厳守", "reading": "げんしゅ", "meaning": "strict adherence / strictly observing (the deadline)"},
      {"word": "持ち込み", "reading": "もちこみ", "meaning": "bringing in (materials/items)"},
      {"word": "一切", "reading": "いっさい", "meaning": "absolutely / not at all (with negative)"},
      {"word": "無効", "reading": "むこう", "meaning": "invalid / void"}
    ],
    "questions": [
      {
        "question_number": 1,
        "question": "試験のときに持って入ってよいものはどれか。",
        "options": [
          "1 教科書とノート",
          "2 電子辞書と筆記用具",
          "3 学生証と筆記用具",
          "4 参考書と学生証"
        ],
        "correct_answer": 3,
        "explanation": "案内に「持ち物：学生証、筆記用具（辞書や教科書の持ち込みは不可）」とあるため、3が正しいです。"
      },
      {
        "question_number": 2,
        "question": "レポートの提出方法として正しいものはどれか。",
        "options": [
          "1 7月15日の17時以降に教務課へ持参する。",
          "2 佐藤教授宛てにメールで送付する。",
          "3 7月20日の試験当日に教室で先生に手渡す。",
          "4 7月15日の17:00までに教務課の提出BOXに入れる。"
        ],
        "correct_answer": 4,
        "explanation": "「提出期限：7月15日（金） 17:00厳守」「提出場所：教務課窓口（レポート提出BOX）」「メールや郵送は不可」とあるため、4が正しいです。"
      }
    ]
  }
}

# Week 1 Day 5
day5 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week1-day5",
  "week": 1,
  "day": 5,
  "theme": "お知らせや案内を読もう①",
  "title": "Week 1 - Day 5: 募集①",
  "learning_focus": {
    "title": "特別な表現方法に注意しよう！",
    "subtitle": "Pay attention to special expressions!",
    "comic": {
      "situation": "求人広告などで使われる省略表現や専門表現を学んでいる。",
      "dialogue": [
        {"speaker": "鳥", "text": "「要普免」や「時間応相談」ってどういう意味？"},
        {"speaker": "先生鳥", "text": "「要〜」は〜が必要ということ、「〜不可」は〜はダメということだよ。"},
        {"speaker": "先生鳥", "text": "「応相談」は相談して決めることができるという意味です。"}
      ]
    }
  },
  "vocabulary": [
    {"word": "要普通免許", "reading": "ようふつうめんきょ", "meaning": "a standard driver's license is required", "example": "要普免（要普通免許）"},
    {"word": "高校生不可", "reading": "こうこうせいふか", "meaning": "no high school students", "example": "高校生不可"},
    {"word": "時間応相談", "reading": "じかんおうそうだん", "meaning": "working hours are negotiable", "example": "勤務時間応相談"},
    {"word": "バイト", "reading": "バイト", "meaning": "part-time job", "example": "バイトを探す"},
    {"word": "時給", "reading": "じきゅう", "meaning": "hourly wage", "example": "時給1,100円"},
    {"word": "履歴書", "reading": "りれきしょ", "meaning": "resume / CV", "example": "履歴書持参"},
    {"word": "資格", "reading": "しかく", "meaning": "qualifications / certification", "example": "応募資格"},
    {"word": "全額支給", "reading": "ぜんがくしきゅう", "meaning": "full payment / fully paid (e.g. transportation expenses)", "example": "交通費全額支給"},
    {"word": "応募", "reading": "おうぼ", "meaning": "application / to apply", "example": "電話で応募する"}
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の会話文を読んで、後の文から正しいものを三つ選ぼう。(答えは次のページ)",
    "conversation": [
      {"speaker": "留学生A", "text": "スーパーまるみやのバイト募集のチラシを見たんだけど、私でも応募できるかな？"},
      {"speaker": "留学生B", "text": "どれどれ？「時給1,000円〜、交通費全額支給、週3日からOK、時間応相談」って書いてあるよ。"},
      {"speaker": "留学生A", "text": "車の運転免許は持ってないんだけど、大丈夫かな？"},
      {"speaker": "留学生B", "text": "「レジ・品出しスタッフ：資格不問（免許不要）」って書いてあるから、免許がなくても大丈夫だよ。高校生は不可だけど、大学生なら問題ないね。"},
      {"speaker": "留学生A", "text": "よかった！まずは電話して面接の予約をしてみるよ。履歴書も書いておかなきゃね。"}
    ],
    "options": [
      "1 このアルバイトは高校生でも応募できる。",
      "2 交通費は全額もらえる。",
      "3 運転免許を持っていなくても応募できる。",
      "4 働く曜日や時間は決まっていて相談できない。",
      "5 面接のときには履歴書が必要である。"
    ],
    "correct_answers": [2, 3, 5],
    "options_explanation": {
      "1": "間違い。「高校生不可」なので応募できません。",
      "2": "正しい。「交通費全額支給」と書かれています。",
      "3": "正しい。「資格不問（免許不要）」なので運転免許がなくても応募できます。",
      "4": "間違い。「時間応相談」なので勤務日や時間は相談できます。",
      "5": "正しい。面接には履歴書を準備して持参します（公式解説：面接のときに履歴書が必要である）。"
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の募集広告を読んで、後の問いに答えなさい。(答えは別冊 p.2)",
    "notice": {
      "heading": "アルバイト募集（スーパーまるみや）",
      "subheading": "明るく元気なスタッフ大募集！未経験者も大歓迎！",
      "content": [
        "【職種】レジ・品出しスタッフ（接客・商品陳列）",
        "【時給】1,000円〜（※22時以降は時給25％アップ）",
        "【時間】8:00〜23:00の間で1日4時間〜、週3日〜（※時間・曜日応相談）",
        "【待遇】交通費全額支給、制服貸与、社員割引あり",
        "【資格】高校生不可、要日本語日常会話レベル、未経験者歓迎",
        "【応募】まずはお気軽にお電話ください。面接時に写真付き履歴書をご持参ください。"
      ]
    },
    "notice_vocabulary": [
      {"word": "品出し", "reading": "しなだし", "meaning": "stocking shelves / displaying goods"},
      {"word": "貸与", "reading": "たいよ", "meaning": "lending / loaning (uniforms, etc.)"},
      {"word": "持参", "reading": "じさん", "meaning": "bringing with oneself"}
    ],
    "questions": [
      {
        "question_number": 1,
        "question": "この募集広告について、合っているものはどれか。",
        "options": [
          "1 面接のときに写真付きの履歴書を持っていく必要がある。",
          "2 高校生でもアルバイトに応募できる。",
          "3 交通費は一部しか支給されない。",
          "4 22時以降に働いても時給は変わらない。"
        ],
        "correct_answer": 1,
        "explanation": "「面接時に写真付き履歴書をご持参ください」とあるため、1が正しいです。"
      },
      {
        "question_number": 2,
        "question": "勤務条件について合っているものはどれか。",
        "options": [
          "1 週に1日だけ働くことができる。",
          "2 働く時間や曜日は相談して決めることができる。",
          "3 毎日必ず朝8時から23時まで働かなければならない。",
          "4 車の運転免許が必ず必要である。"
        ],
        "correct_answer": 2,
        "explanation": "「時間・曜日応相談」とあるため、2が正しいです。"
      }
    ]
  }
}

# Week 1 Day 6
day6 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week1-day6",
  "week": 1,
  "day": 6,
  "theme": "お知らせや案内を読もう①",
  "title": "Week 1 - Day 6: 募集②",
  "learning_focus": {
    "title": "家やアパートの案内で使われている特別な言葉を覚えよう！",
    "subtitle": "Let's look at some special language used in real estate advertisements!",
    "comic": {
      "situation": "間取りの記号や用語（K, D, L）について説明している。",
      "dialogue": [
        {"speaker": "鳥", "text": "1K・2LDK・3LDKって何のこと？"},
        {"speaker": "先生鳥", "text": "数字は部屋の数で、Kはキッチン、Dはダイニング（食事をする部屋）、Lはリビングルームのことです。読み方に注意しましょう。"}
      ]
    }
  },
  "vocabulary": [
    {"word": "マンション", "reading": "マンション", "meaning": "an apartment (well built / concrete building)", "example": "マンション 2LDK"},
    {"word": "間取り", "reading": "まどり", "meaning": "a floor plan", "example": "使いやすい間取り"},
    {"word": "和室", "reading": "わしつ", "meaning": "a Japanese style room", "example": "和室6畳"},
    {"word": "敷金", "reading": "しききん", "meaning": "security deposit (a one-time deposit to the owner when renting)", "example": "敷金／3ヵ月"},
    {"word": "礼金", "reading": "れいきん", "meaning": "key money (one-time non-refundable gratuity payment to owner)", "example": "礼金／なし"},
    {"word": "管理費", "reading": "かんりひ", "meaning": "a monthly management fee", "example": "管理費／月4,000円"},
    {"word": "専有面積", "reading": "せんゆうめんせき", "meaning": "floor space / exclusive private area", "example": "専有面積／52.05㎡"},
    {"word": "〜㎡", "reading": "へいほうメートル / へいべい", "meaning": "square meters", "example": "50㎡"},
    {"word": "一軒家", "reading": "いっけんや", "meaning": "a detached house", "example": "一軒家に住む"},
    {"word": "〜畳", "reading": "〜じょう", "meaning": "tatami mats (counter for room size)", "example": "洋室8畳"},
    {"word": "洋室", "reading": "ようしつ", "meaning": "a Western-style room", "example": "洋室8畳"},
    {"word": "エアコン", "reading": "エアコン", "meaning": "an air-conditioner", "example": "エアコン付"},
    {"word": "築〜年", "reading": "ちく〜ねん", "meaning": "built ~ years ago (building age)", "example": "築15年"}
  ],
  "practice": {
    "title": "れんしゅう",
    "instruction": "次の会話文を読んで、後の文から正しいものを三つ選ぼう。(答えは次のページ)",
    "conversation": [
      {"speaker": "妻", "text": "このマンションはどう？ 駅から徒歩5分って書いてあるし、広さもちょうどいいんじゃない？ 家賃もそんなに高くないし。"},
      {"speaker": "夫", "text": "そうだね。敷金は3ヵ月分だけれど、礼金はなしって書いてあるし、いいかもしれないね。でも、本当は一軒家のほうがいいんだけどなあ。"}
    ],
    "options": [
      "1 夫婦は住むところをさがしている。",
      "2 夫婦は今、マンションを見学している。",
      "3 このマンションを借りる場合、敷金は3ヵ月前に払わなければならない。",
      "4 このマンションを借りる場合、礼金を払わなくてもいい。",
      "5 夫はマンションより一軒家に住みたいと思っている。"
    ],
    "correct_answers": [1, 4, 5],
    "options_explanation": {
      "1": "正しい。夫婦が物件広告を見ながら住む部屋を探しています。",
      "2": "間違い。「書いてあるし」と言っており、広告を見ている段階で見学中ではありません。",
      "3": "間違い。「敷金3ヵ月」は家賃の3か月分の金額という意味であり、3か月前に払うことではありません。",
      "4": "正しい。夫が「礼金はなしって書いてある」と言っており、礼金は不要です。",
      "5": "正しい。夫が「本当は一軒家のほうがいいんだけどなあ」と言っています。"
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "次の募集広告を読んで、後の問いに答えなさい。(答えは別冊 p.2)",
    "notice": {
      "heading": "マンション 2K 中央線中野駅徒歩5分",
      "subheading": "使いやすい間取り！！ バス・トイレ別* エアコン付 ペット不可",
      "content": [
        "・家賃／9.6万円",
        "・敷金／3ヵ月",
        "・礼金／なし",
        "・管理費／月4,000円",
        "・専有面積／52.05㎡",
        "・4階建て3階",
        "・築15年",
        "・間取り詳細：和室6畳、洋室8畳、キッチン、バス・トイレ別、ベランダ",
        "※ * a separate bathroom and toilet"
      ]
    },
    "notice_vocabulary": [
      {"word": "中央線", "reading": "ちゅうおうせん", "meaning": "Chuo Line"},
      {"word": "中野駅", "reading": "なかのえき", "meaning": "Nakano Station"},
      {"word": "階建て", "reading": "かいだて", "meaning": "-story building"},
      {"word": "ペット不可", "reading": "ペットふか", "meaning": "no pets allowed"}
    ],
    "questions": [
      {
        "question_number": 1,
        "question": "この広告でわからないのはどれか。",
        "options": [
          "1 エアコンがいくつついてあるか。",
          "2 敷金をいくらはらえばいいか。",
          "3 この部屋が何階にあるか。",
          "4 このマンションが何年前に建てられたか。"
        ],
        "correct_answer": 1,
        "explanation": "広告には「エアコン付」と書かれていますが、エアコンが何台（いくつ）ついているかは書かれていません。敷金（9.6万×3）、階数（3階）、築年数（15年前）はすべて分かります。"
      },
      {
        "question_number": 2,
        "question": "この広告の内容と合っているものはどれか。",
        "options": [
          "1 毎月払うのは96,000円である。",
          "2 敷金は96,000円の3倍分を払わなければならない。",
          "3 エアコンの代金を払わなければならない。",
          "4 洋室より和室のほうが広い。"
        ],
        "correct_answer": 2,
        "explanation": "敷金は3ヵ月分なので「96,000円の3倍分」となります（公式解説：毎月払うのは家賃9.6万＋管理費4,000円＝100,000円。洋室8畳＞和室6畳）。したがって2が正しいです。"
      }
    ]
  }
}

# Week 1 Day 7 (Matome Test / 実戦問題)
day7 = {
  "bookId": "sou-matome-n3-reading",
  "chapterId": "week1-day7",
  "week": 1,
  "day": 7,
  "theme": "お知らせや案内を読もう①",
  "title": "Week 1 - Day 7: 実戦問題 (まとめテスト)",
  "learning_focus": {
    "title": "第1週の総まとめ！お知らせや案内の実戦問題を解こう",
    "subtitle": "Review Test: Try real-life notices and advertisements questions!",
    "comic": {
      "situation": "1週間のまとめテストに挑戦する。",
      "dialogue": [
        {"speaker": "先生鳥", "text": "第1週で学んだ案内や募集の表現をしっかり確認して、実戦問題に挑戦しよう！"},
        {"speaker": "鳥", "text": "制限時間15分、100点満点目指してがんばるぞ！"}
      ]
    }
  },
  "vocabulary": [
    {"word": "限定", "reading": "げんてい", "meaning": "limited to / exclusive to", "example": "インターネット予約限定"},
    {"word": "接続", "reading": "せつぞく", "meaning": "connection", "example": "インターネット接続無料"},
    {"word": "最適", "reading": "さいてき", "meaning": "optimal / best suited", "example": "チェックインに最適"},
    {"word": "到着", "reading": "とうちゃく", "meaning": "arrival", "example": "お早めにご到着のお客様"},
    {"word": "取り扱う", "reading": "とりあつかう", "meaning": "to treat / to handle as", "example": "キャンセルとして取り扱われる"},
    {"word": "特技", "reading": "とくぎ", "meaning": "special skill / talent", "example": "なにか特技があれば"},
    {"word": "体験", "reading": "たいけん", "meaning": "personal experience", "example": "いい体験になる"},
    {"word": "大歓迎", "reading": "だいかんげい", "meaning": "warmly welcomed", "example": "楽器ができる方は大歓迎"}
  ],
  "practice": {
    "title": "実戦問題について",
    "instruction": "制限時間：15分、配点：1問25点×4問＝100点。実際の試験形式で問題1・問題2の4問を解きましょう。",
    "conversation": [],
    "options": [],
    "correct_answers": [],
    "options_explanation": {}
  },
  "mondai": {
    "title": "実戦問題",
    "instruction": "各文章・案内を読んで、後の問いに答えなさい。(1・2・3・4から最もよいものを一つえらびなさい。答えは別冊 p.2)",
    "notice": {
      "heading": "問題1：ビジネスホテルの案内",
      "subheading": "〜インターネット予約限定(※1)〜 ◎チェックイン18：00からのお得なプラン",
      "content": [
        "【期間】201X年01月10日〜201X年03月31日",
        "★チェックインタイムが18：00からだから安いお得なプラン！",
        "★お荷物をフロントに預け、ご飯を食べたり、お酒を飲んでからのチェックインにも最適！！",
        "★チェックアウトタイムは12：00なので、のんびりできます！",
        "★週末も同料金！",
        "",
        "部屋のタイプ：140センチのセミダブルベッド、バス・トイレ付、禁煙ルーム",
        "料金：1名4000円（2名1室利用） 食事なし、インターネット接続無料(※2)",
        "　＊1名で1室利用の場合…7000円",
        "　＊子ども料金…6歳以下のみ10％割引",
        "",
        "○18時以前のチェックインはできませんので、お早めにご到着のお客様は手荷物をフロントにてお預かりいたします。",
        "○チェックイン予定時間を過ぎるとキャンセルとして取り扱われることがございますので、遅れる場合は必ず連絡してください。",
        "",
        "ビジネスホテル・ニュー東京イン",
        "東京都中央区○○2−1 ＜東京駅より徒歩7分＞",
        "TEL 03-○○○○-○○○○",
        "URL: http://www.newtokyo-inn.co.jp/",
        "",
        "(※1) インターネット予約限定：インターネットでの予約だけ",
        "(※2) インターネット接続無料：インターネットに無料でつなぐことができる"
      ]
    },
    "notice_vocabulary": [
      {"word": "手荷物", "reading": "てにもつ", "meaning": "hand luggage / baggage"},
      {"word": "預かる", "reading": "あずかる", "meaning": "to look after / to hold (luggage)"},
      {"word": "セミダブルベッド", "reading": "セミダブルベッド", "meaning": "semi-double bed (140cm width)"},
      {"word": "同料金", "reading": "どうりょうきん", "meaning": "the same rate / price"}
    ],
    "questions": [
      {
        "question_number": 1,
        "question": "この案内の内容と合っているものはどれか。",
        "options": [
          "1 この料金で泊まることができるのは、期間中の平日である。",
          "2 大人1名と8歳の子どもと二人で泊まる場合は、8000円である。",
          "3 前もって連絡を入れていれば、17:00にチェックインすることができる。",
          "4 一人でこの部屋に泊まる場合は、二人で泊まる場合の10％割引になる。"
        ],
        "correct_answer": 2,
        "explanation": "「料金：1名4000円（2名1室利用）」「子ども料金：6歳以下のみ10%割引」とあるため、8歳の子どもは割引対象外（大人と同額4,000円）となり、大人1名＋8歳子ども1名で合計8,000円となります（公式解答：2）。"
      },
      {
        "question_number": 2,
        "question": "山下さんは妻と二人で東京への旅行を計画している。201X年2月4日（金）から2泊でこのプランの予約をしたいと思っている。18時10分東京着の新幹線に乗り、東京駅に着いてから近くのレストランで食事をし、ホテルに向かうつもりだ。正しく申し込みをしているのはどれか。",
        "options": [
          "1 チェックイン日: 2月4日(金) / チェックアウト日: 2月5日(土) / 人数: 大人2名 / チェックイン予定時間: 20時ごろ",
          "2 チェックイン日: 2月4日(金) / チェックアウト日: 2月5日(土) / 人数: 大人2名 / チェックイン予定時間: 18時半ごろ",
          "3 チェックイン日: 2月4日(金) / チェックアウト日: 2月6日(日) / 人数: 大人2名 / チェックイン予定時間: 20時ごろ",
          "4 チェックイン日: 2月4日(金) / チェックアウト日: 2月6日(日) / 人数: 大人2名 / チェックイン予定時間: 18時半ごろ"
        ],
        "correct_answer": 3,
        "explanation": "2月4日(金)から2泊なのでチェックアウト日は「2月6日(日)」です。また、18:10東京駅着でその後レストランで食事をしてから向かうため、チェックイン予定時間は18時半では間に合わず「20時ごろ」が適切です（公式解答：3）。"
      },
      {
        "question_number": 3,
        "question": "【問題2】次の文書は、老人が暮らす施設のボランティアを募集するための案内である。この募集の内容と合っているものはどれか。\n\n「ボランティア募集\n『やすらぎホーム』ではお年寄りと一緒に遊んだり、歌を歌って下さるボランティアを募集しています。ピアノやバイオリンなどの楽器ができる方は特に大歓迎です。楽器でなくても、なにか特技があれば、ぜひそれを活用してください。お年寄りとの話は、興味深く、人生の勉強になることも多いです。きっとあなたにとっていい体験になるでしょう。たくさんのご応募をお待ちしています。\n・高校生以上ならどなたでもOKです。\n・月曜日から金曜日（週に何日でもかまいません。）\n・午後1時から5時までの間の可能な2時間ほど\nやすらぎホーム（たから市民病院となり） 0220-38-xxxx」",
        "options": [
          "1 歌だけでなく、楽器もできる音楽家だけを募集している。",
          "2 高校生のボランティアは受け付けていない。",
          "3 老人たちによる講演会に参加する人を募集している。",
          "4 曜日や時間は、決まった範囲内で相談して決めることができる。"
        ],
        "correct_answer": 4,
        "explanation": "案内文に「月曜日から金曜日（週に何日でもかまいません）」「午後1時から5時までの間の可能な2時間ほど」とあるため、決められた曜日・時間帯の範囲内で相談して決めることができます（公式解答：4）。"
      },
      {
        "question_number": 4,
        "question": "【問題2】何がいい体験になるか。",
        "options": [
          "1 ボランティアを募集すること",
          "2 やすらぎホームに応募すること",
          "3 やすらぎホームでボランティアをすること",
          "4 お年寄りと人生の勉強をすること"
        ],
        "correct_answer": 3,
        "explanation": "文章全体がやすらぎホームでのボランティア募集であり、「お年寄りと一緒に遊んだり歌を歌ったり、特技を活用してお年寄りと話をすることがあなたにとっていい体験になる」と述べているため、「やすらぎホームでボランティアをすること」が3の正解です（公式解答：3）。"
      }
    ]
  }
}

chapters = [
  ("week1-day2.json", day2),
  ("week1-day3.json", day3),
  ("week1-day4.json", day4),
  ("week1-day5.json", day5),
  ("week1-day6.json", day6),
  ("week1-day7.json", day7),
]

os.makedirs("src/data/somatome", exist_ok=True)

for fname, data in chapters:
  filepath = os.path.join("src/data/somatome", fname)
  with open(filepath, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
  print(f"Generated {filepath}")

print("All Somatome Week 1 chapters generated successfully!")
