export const sampleBooks = [
  {
    "id": "sou-matome-n3-reading",
    "title": "JLPT Sou Matome N3 Reading Comprehension",
    "description": "Focuses on comprehension of short letters, advertisements, and medium-length essays for the N3 level.",
    "coverUrl": "",
    "level": "N3",
    "category": "Reading",
    "chapters": [
      {
        "id": "day-1-short-passage",
        "title": "Day 1: Information Search (Notice)",
        "type": "short-passage",
        "description": "Practice searching for details in a library notice or announcement.",
        "passages": [
          {
            "title": "Notice: Library Schedule Changes",
            "passageText": "【中央図書館からのお知らせ】\n\n新しいうちの図書館システムへの移行のため、以下の期間は休館（きゅうかん）いたします。\n\n期間：７月１０日（月曜日）〜７月１４日（金曜日）\n\n※この期間は本の貸出（かしだし）と返却（へんきゃく）はできません。\n※返却ポストも使用できませんので、本は１５日以降にカウンターへお持ちください。\n※ご迷惑をおかけしますが、ご理解をお願いいたします。",
            "questions": [
              {
                "questionText": "問1 When is the library closed?",
                "options": [
                  "From Monday, July 10th to Friday, July 14th",
                  "Only on July 10th and 14th",
                  "Every Monday and Friday in July",
                  "Until July 15th starting from July 1st"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "From Monday, July 10th to Friday, July 14th"
                },
                "explanation": "The notice states: 期間：７月１０日（月曜日）〜７月１４日（金曜日）休館いたします (During this period we will be closed)."
              },
              {
                "questionText": "問2 What should you do with a book you need to return during the closed period?",
                "options": [
                  "Put it in the return post box.",
                  "Mail it to the library.",
                  "Bring it to the counter on or after July 15th.",
                  "Keep it forever."
                ],
                "correctOption": {
                  "index": 2,
                  "text": "Bring it to the counter on or after July 15th."
                },
                "explanation": "The notice says: 返却ポストも使用できませんので、本は１５日以降にカウンターへお持ちください (The return post is also unusable, so please bring books to the counter from the 15th onwards)."
              }
            ]
          }
        ]
      },
      {
        "id": "day-2-long-passage",
        "title": "Day 2: Long Essay (Modern Life)",
        "type": "long-passage",
        "description": "Read a multi-paragraph opinion piece on the balance between digital communication and face-to-face interaction.",
        "passages": [
          {
            "title": "The Changing Face of Communication",
            "passageText": "最近、スマートフォンやSNSの普及によって、私たちのコミュニケーションの形は大きく変わりました。いつでも、どこでも、誰とでもすぐにつながることができるようになり、非常に便利になりました。しかし、その一方で、直接会って話す機会が減っていると感じる人も多いようです。\n\n文字だけのやり取りでは、相手の表情や声のトーンが分からないため、誤解が生じることもあります。例えば、冗談のつもりで送った言葉が、相手を怒らせてしまうことがあります。顔を見て話していれば、そのような誤解はすぐに解けるはずです。\n\nもちろん、SNSには良い点もたくさんあります。遠く離れた友人の近況を知ることができたり、共通の趣味を持つ人と簡単に出会えたりします。大切なのは、デジタルなコミュニケーションと、対面でのコミュニケーションのバランスを上手にとることではないでしょうか。",
            "questions": [
              {
                "questionText": "問1 What is the main topic of the first paragraph?",
                "options": [
                  "The history of smartphones",
                  "How SNS has made shopping easier",
                  "The change in communication styles and the decrease in face-to-face talk",
                  "The rules of using phones in school"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "The change in communication styles and the decrease in face-to-face talk"
                },
                "explanation": "The first paragraph mentions: コミュニケーションの形は大きく変わりました...しかし...直接会って話す機会が減っている (Communication styles have changed... however, face-to-face talking has decreased)."
              },
              {
                "questionText": "問2 Why do misunderstandings occur in text-only communication according to the text?",
                "options": [
                  "Because typing takes too long.",
                  "Because you cannot see the other person's expressions or hear their tone.",
                  "Because people use too many emojis.",
                  "Because internet connections are unstable."
                ],
                "correctOption": {
                  "index": 1,
                  "text": "Because you cannot see the other person's expressions or hear their tone."
                },
                "explanation": "Paragraph 2 states: 文字だけのやり取りでは、相手の表情や声のトーンが分からないため、誤解が生じることもあります (In text-only exchanges, because you don't know the expression or tone of voice, misunderstandings can occur)."
              },
              {
                "questionText": "問3 What does the author suggest is the most important thing?",
                "options": [
                  "We should stop using smartphones completely.",
                  "We should only communicate via SNS.",
                  "Balancing digital and face-to-face communication.",
                  "We should write letters by hand."
                ],
                "correctOption": {
                  "index": 2,
                  "text": "Balancing digital and face-to-face communication."
                },
                "explanation": "The final sentence concludes: 大切なのは、デジタルなコミュニケーションと、対面でのコミュニケーションのバランスを上手にとること (The important thing is to balance digital and face-to-face communication well)."
              }
            ]
          }
        ]
      },
      {
        "id": "day-3-drill-50",
        "title": "Day 3: Vocabulary & Grammar Drill (10 Questions)",
        "type": "day-challenge",
        "description": "A fast-paced review of essential grammar particles and N3 vocabulary words.",
        "passages": [
          {
            "title": "Quick Drill",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 部屋に入るときは、靴を（　　）ください。",
                "options": [
                  "はいて",
                  "ぬいで",
                  "きせて",
                  "かけて"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "ぬいで"
                },
                "explanation": "靴を脱ぐ (くつをぬぐ) means to take off shoes. When entering a room (部屋に入るとき), you take off your shoes."
              },
              {
                "questionText": "問2 山田さんは、明日雨が（　　）ハイキングに行かないと言っていました。",
                "options": [
                  "ふれば",
                  "ふったら",
                  "ふるなら",
                  "ふると"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "ふったら"
                },
                "explanation": "雨が降ったら (ame ga futtara) is the conditional 'if it rains'. It fits natural dialogue best here."
              },
              {
                "questionText": "問3 日本語がもっと上手に（　　）ために、毎日練習しています。",
                "options": [
                  "なる",
                  "なす",
                  "はなす",
                  "いう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なる"
                },
                "explanation": "～になる (ni naru) is 'to become'. 上手になるために (jouzu ni naru tame ni) means 'in order to become good at'."
              },
              {
                "questionText": "問4 この本は（　　）やすくて、一日で全部読んでしまいました。",
                "options": [
                  "読み",
                  "読んで",
                  "読もう",
                  "読む"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "読み"
                },
                "explanation": "Verb Stem + やすい (yasui) means 'easy to do verb'. 読みやすい (yomiyasui) means 'easy to read'."
              },
              {
                "questionText": "問5 先生、この漢字の読み方を（　　）いただけませんか。",
                "options": [
                  "教えて",
                  "教えられて",
                  "教えてくれて",
                  "教えさせて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "教えて"
                },
                "explanation": "～ていただけませんか (~te itadakemasen ka) is a polite request. 教えていただけませんか = 'Could you please teach/tell me?'"
              },
              {
                "questionText": "問6 宿題を（　　）から、遊びに行きます。",
                "options": [
                  "する",
                  "してしまって",
                  "おわって",
                  "おわらせて"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "おわらせて"
                },
                "explanation": "おわらせる is transitive/causative 'to finish'. おわらせてから (owaransete kara) means 'after finishing'."
              },
              {
                "questionText": "問7 彼は日本に１０年も住んでいる（　　）、日本語が全然話せない。",
                "options": [
                  "ので",
                  "から",
                  "のに",
                  "ため"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "のに"
                },
                "explanation": "のに (noni) is used for 'despite' or 'although'. 'Although he lived in Japan for 10 years, he can't speak Japanese at all.'"
              },
              {
                "questionText": "問8 私の趣味は、映画を（　　）ことです。",
                "options": [
                  "見る",
                  "見ている",
                  "見せる",
                  "見られた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "見る"
                },
                "explanation": "Verb (dictionary form) + ことです (~ koto desu) is used to nominalize the verb to express a hobby (趣味)."
              },
              {
                "questionText": "問9 明日、大切な会議がある（　　）、早く寝なければならない。",
                "options": [
                  "が",
                  "ので",
                  "けれど",
                  "と"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "ので"
                },
                "explanation": "ので (node) indicates reason/cause: 'Because there is an important meeting tomorrow...'"
              },
              {
                "questionText": "問10 ちょっと買い物の（　　）、ポストに手紙を出してきて。",
                "options": [
                  "ついでに",
                  "ながら",
                  "あいだに",
                  "かわりに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ついでに"
                },
                "explanation": "～ついでに (tsuide ni) means 'while doing A, take the opportunity to also do B'."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "shin-nihongo-500-n3",
    "title": "Shin Nihongo 500 Mon N3",
    "description": "Improve your vocabulary, kanji, and grammar for the JLPT N3. Features a structured 4-week daily challenge program.",
    "coverUrl": "",
    "level": "N3",
    "category": "Drill",
    "chapters": [
      {
        "id": "w1-d1",
        "title": "Week 1 - Day 1",
        "type": "questions-only",
        "description": "Week 1 Day 1: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 1 - Day 1",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 郵便局の近くに引っ越したので便利です。",
                "options": [
                  "ゆうびんきょく",
                  "ゆびんきょく",
                  "ようべんきょく",
                  "よべんきょく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ゆうびんきょく"
                },
                "explanation": "Question 1 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 荷物が届きましたが、それは私が注文したのと ______ 。",
                "options": [
                  "ちがかったです",
                  "まちがったです",
                  "ちがっていました",
                  "まちがえていました"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ちがかったです"
                },
                "explanation": "Question 2 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 子供のころ、この公園で遊んだ ______ 。",
                "options": [
                  "ことか",
                  "ことだ",
                  "ものか",
                  "ものだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ことか"
                },
                "explanation": "Question 3 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 初めまして。リンと申します。",
                "options": [
                  "由します",
                  "曲します",
                  "申します",
                  "直します"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "由します"
                },
                "explanation": "Question 4 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 夫とは大学のとき ______ 、卒業後すぐに結婚した。",
                "options": [
                  "出会って",
                  "出会いして",
                  "出会いで",
                  "出会いにして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "出会って"
                },
                "explanation": "Question 5 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 ゲームを ______ ばかりいないで、自然に親しんだらどうですか。",
                "options": [
                  "し",
                  "して",
                  "した",
                  "する"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "し"
                },
                "explanation": "Question 6 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 財布が落ちていたので、交番に届けた。",
                "options": [
                  "つづけた",
                  "あずけた",
                  "とどけた",
                  "ほどけた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "つづけた"
                },
                "explanation": "Question 7 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 うそを ______ はいけません。",
                "options": [
                  "ひいて",
                  "とって",
                  "うつして",
                  "ついて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひいて"
                },
                "explanation": "Question 8 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 ______ ありがとう。",
                "options": [
                  "手伝って",
                  "手伝う",
                  "手伝ったのは",
                  "手伝ってくれて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "手伝って"
                },
                "explanation": "Question 9 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 向こうの和室でお茶とお菓子をいただきましょう。",
                "options": [
                  "お菓子",
                  "お果物",
                  "お果子",
                  "お菓物"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "お菓子"
                },
                "explanation": "Question 10 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 これからそちらに ______ から、3時までには着くと思います。",
                "options": [
                  "むかえます",
                  "とどきます",
                  "まにあいます",
                  "むかいます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "むかえます"
                },
                "explanation": "Question 11 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 A「ここは写真を ______ いけないんだよ。」 B「あ、そうなんだ。」",
                "options": [
                  "とっちゃ",
                  "とるんじゃ",
                  "とんじゃ",
                  "とっちゃって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とっちゃ"
                },
                "explanation": "Question 12 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 昔は、車の代わりに馬や牛が荷物を運んだりした。",
                "options": [
                  "みもつ",
                  "かもつ",
                  "にもつ",
                  "いもつ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "みもつ"
                },
                "explanation": "Question 13 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 A「ごめんね。本当にごめん。」 B「そんなに ______ いいよ。」",
                "options": [
                  "あいさつしなくても",
                  "あやまらなくても",
                  "ちゅういしなくても",
                  "おこらなくても"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あいさつしなくても"
                },
                "explanation": "Question 14 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 A「全部 ______ ちゃおうか。」 B「明日の分、とっとこうよ。」",
                "options": [
                  "食べる",
                  "食べて",
                  "食べ",
                  "食べた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "食べる"
                },
                "explanation": "Question 15 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w1-d2",
        "title": "Week 1 - Day 2",
        "type": "questions-only",
        "description": "Week 1 Day 2: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 1 - Day 2",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 次の信号を左に曲がってください。",
                "options": [
                  "もがって",
                  "みがって",
                  "むがって",
                  "まがって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "もがって"
                },
                "explanation": "Question 16 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 鉛筆に消しゴムをつけたのは、良い ______ だと思う。",
                "options": [
                  "アイデア",
                  "チャンス",
                  "バランス",
                  "テーマ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "アイデア"
                },
                "explanation": "Question 17 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 あんなやり方ではうまく ______ だろうと思う。",
                "options": [
                  "いく",
                  "いかない",
                  "いこう",
                  "いくまい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いく"
                },
                "explanation": "Question 18 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 まもなく電車がまいります。危ないですから、黄色い線まで下がってお待ちください。",
                "options": [
                  "入ります",
                  "参ります",
                  "着きます",
                  "回ります"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "入ります"
                },
                "explanation": "Question 19 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 A「試験はできた？」 B「うん、 ______ わからなかったけど、だいたいできたよ。」",
                "options": [
                  "すべて",
                  "まあまあ",
                  "つぎつぎに",
                  "ところどころ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "すべて"
                },
                "explanation": "Question 20 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 今年は、日本語能力試験のN3を ______ と思います。",
                "options": [
                  "受けよう",
                  "受けろう",
                  "受けるよう",
                  "受こう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "受けよう"
                },
                "explanation": "Question 21 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 やり方は簡単です。心配は要りません。",
                "options": [
                  "ありません",
                  "おりません",
                  "たりません",
                  "いりません"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ありません"
                },
                "explanation": "Question 22 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 ぼくは英語は苦手だが、数学は ______ だ。",
                "options": [
                  "上手",
                  "得意",
                  "上等",
                  "高級"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "上手"
                },
                "explanation": "Question 23 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「君、昨日来なかったね。」 B「 ______ が…。」",
                "options": [
                  "行くつもりです",
                  "行くつもりません",
                  "行ったつもり",
                  "行くつもりでした"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "行くつもりです"
                },
                "explanation": "Question 24 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 このざっしは、辞書があれば読める。",
                "options": [
                  "冊子",
                  "雑誌",
                  "冊誌",
                  "雑子"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "冊子"
                },
                "explanation": "Question 25 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 隣の席が ______ ので、荷物をそこに置いた。",
                "options": [
                  "あいていた",
                  "のこっていた",
                  "すいていた",
                  "あまっていた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あいていた"
                },
                "explanation": "Question 26 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 図書館の本を返す ______ 忘れていた。",
                "options": [
                  "には",
                  "のに",
                  "のを",
                  "もの"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "には"
                },
                "explanation": "Question 27 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 宿題を机の上に置いてきてしまった。",
                "options": [
                  "すくだい",
                  "しょくだい",
                  "しゅくだい",
                  "しくだい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "すくだい"
                },
                "explanation": "Question 28 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 A「すみません、コーヒーのおかわりをお願いします。」 B「はい、 ______ 。」",
                "options": [
                  "りょうかいいたします",
                  "おじゃまいたしました",
                  "しょうちいたしました",
                  "かしこまりました"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "りょうかいいたします"
                },
                "explanation": "Question 29 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 明日の面接試験 ______ 気になって眠れない。",
                "options": [
                  "については",
                  "のことが",
                  "によって",
                  "だから"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "については"
                },
                "explanation": "Question 30 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w1-d3",
        "title": "Week 1 - Day 3",
        "type": "questions-only",
        "description": "Week 1 Day 3: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 1 - Day 3",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 これは夫がかいた港の絵です。",
                "options": [
                  "やまと",
                  "みやこ",
                  "ちまた",
                  "みなと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "やまと"
                },
                "explanation": "Question 31 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 では、また ______ お電話いたします。",
                "options": [
                  "まもなく",
                  "のちほど",
                  "しばらく",
                  "さきに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まもなく"
                },
                "explanation": "Question 32 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 ______ 練習は休みません。",
                "options": [
                  "疲れていても",
                  "疲れていては",
                  "疲れていると",
                  "疲れているから"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "疲れていても"
                },
                "explanation": "Question 33 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 電車が事故でおくれました。",
                "options": [
                  "割れました",
                  "送れました",
                  "遅れました",
                  "別れました"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "割れました"
                },
                "explanation": "Question 34 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 昨日、運動しすぎて、体の ______ が痛いです。",
                "options": [
                  "あのへん",
                  "どこでも",
                  "あちこち",
                  "どこか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あのへん"
                },
                "explanation": "Question 35 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 準備運動を ______ 泳ぐと危険です。",
                "options": [
                  "さずに",
                  "しずに",
                  "されずに",
                  "せずに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さずに"
                },
                "explanation": "Question 36 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 彼は卒業式に出ませんでした。",
                "options": [
                  "そっぎょうしき",
                  "そちぎょうしき",
                  "そつぎょうしき",
                  "そうぎょうしき"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そっぎょうしき"
                },
                "explanation": "Question 37 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 緊張しないで、______ 話しましょう。",
                "options": [
                  "おもいついて",
                  "はりきって",
                  "おちついて",
                  "みなおして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おもいついて"
                },
                "explanation": "Question 38 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「なんて書いてあるの？」 B「危ない！ ______ って書いてあるんだよ。」",
                "options": [
                  "飛び出せ",
                  "飛び出して",
                  "飛び出そう",
                  "飛び出すな"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "飛び出せ"
                },
                "explanation": "Question 39 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 紹介します。つまと息子です。",
                "options": [
                  "夫",
                  "妻",
                  "主人",
                  "家内"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "夫"
                },
                "explanation": "Question 40 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 よくわかりません。もう少し ______ 説明してくれませんか。",
                "options": [
                  "くわしく",
                  "きびしく",
                  "けわしく",
                  "よろしく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くわしく"
                },
                "explanation": "Question 41 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 A「宝くじ ______ かなあ。」 B「お金のむだだよ。」",
                "options": [
                  "買うもの",
                  "買うこと",
                  "買おう",
                  "買うよう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "買うもの"
                },
                "explanation": "Question 42 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 授業の予定が変わった。",
                "options": [
                  "じぎょう",
                  "ずぎょう",
                  "じゅうぎょう",
                  "じゅぎょう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "じぎょう"
                },
                "explanation": "Question 43 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 スキーで ______ 足の骨を折ってしまった。",
                "options": [
                  "おちて",
                  "たおれて",
                  "ころんで",
                  "つぶれて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おちて"
                },
                "explanation": "Question 44 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 国へ帰っても、私達のことを ______ ほしい。",
                "options": [
                  "覚えて",
                  "覚えないで",
                  "忘れて",
                  "忘れないで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "覚えて"
                },
                "explanation": "Question 45 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w1-d4",
        "title": "Week 1 - Day 4",
        "type": "questions-only",
        "description": "Week 1 Day 4: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 1 - Day 4",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 彼女と結婚の約束をした。",
                "options": [
                  "よくそく",
                  "よっそく",
                  "やくそく",
                  "やっそく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "よくそく"
                },
                "explanation": "Question 46 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 ぼくは ______ で、姉が一人、兄が二人います。",
                "options": [
                  "ひとりっこ",
                  "すえっこ",
                  "ちょうなん",
                  "じなん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひとりっこ"
                },
                "explanation": "Question 47 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 風邪がうつらない ______ 、マスクをします。",
                "options": [
                  "ために",
                  "ように",
                  "のそうに",
                  "とおりに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ために"
                },
                "explanation": "Question 48 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 船よりひこうきのほうが速い。",
                "options": [
                  "飛高機",
                  "飛行機",
                  "引行機",
                  "引高機"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "飛高機"
                },
                "explanation": "Question 49 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 この野菜は ______ 食べられません。ゆでるか焼くかしてください。",
                "options": [
                  "むいては",
                  "ままでは",
                  "なまでは",
                  "にては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "むいては"
                },
                "explanation": "Question 50 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 忙しくて寝る時間 ______ ないのに、遊びに行けるわけがない。",
                "options": [
                  "でも",
                  "ほど",
                  "さえ",
                  "だけ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "でも"
                },
                "explanation": "Question 51 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 大学で美術を勉強しています。",
                "options": [
                  "ぎじつ",
                  "ぎじゅつ",
                  "びじつ",
                  "びじゅつ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぎじつ"
                },
                "explanation": "Question 52 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 A「スニーカーのひもがほどけているよ。」 B「ほんとだ。 ______ から待って。」",
                "options": [
                  "ぬく",
                  "くっつける",
                  "むすぶ",
                  "ぬう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぬく"
                },
                "explanation": "Question 53 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「ちょっとお茶でも飲んで休もうか。」 B「お茶なんか要らない。 ______ なんかいられないよ。」",
                "options": [
                  "休んで",
                  "休む",
                  "休み",
                  "休んだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "休んで"
                },
                "explanation": "Question 54 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 橋をわたって、二つ目の角を右へ曲がると郵便局があります。",
                "options": [
                  "渡って",
                  "通って",
                  "進んで",
                  "沿って"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "渡って"
                },
                "explanation": "Question 55 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 車の事故にあったが、 ______ よかった。",
                "options": [
                  "気をつけて",
                  "いいかげんで",
                  "お気の毒で",
                  "大したことがなくて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "気をつけて"
                },
                "explanation": "Question 56 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 考えてもどうにもならない。忘れる ______ 。",
                "options": [
                  "しかない",
                  "だけない",
                  "からない",
                  "こそない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しかない"
                },
                "explanation": "Question 57 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 残念ですが、パーティーに出席できません。",
                "options": [
                  "さんれん",
                  "ざんれん",
                  "ざっねん",
                  "ざんねん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さんれん"
                },
                "explanation": "Question 58 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 ______ が、どうぞお入りください。",
                "options": [
                  "片付けられません",
                  "散らかっています",
                  "きれいにしません",
                  "汚れてきます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "片付けられません"
                },
                "explanation": "Question 59 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 A「浅草 ______ 、何を思い浮かべますか。」 B「雷門、神輿、そしてスカイツリーかな。」",
                "options": [
                  "として",
                  "というと",
                  "といっても",
                  "といっては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "として"
                },
                "explanation": "Question 60 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w1-d5",
        "title": "Week 1 - Day 5",
        "type": "questions-only",
        "description": "Week 1 Day 5: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 1 - Day 5",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 自動販売機を使いたいので、1万円札を細かくしてくれませんか。",
                "options": [
                  "こまかく",
                  "みじかく",
                  "ほそかく",
                  "やわらかく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こまかく"
                },
                "explanation": "Question 61 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 この店の一日の ______ は、約10万円です。",
                "options": [
                  "売り場",
                  "売り上げ",
                  "売り切れ",
                  "売り出し"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "売り場"
                },
                "explanation": "Question 62 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 隅田川 ______ 花火大会が行われるため、交通機関は混雑するでしょう。",
                "options": [
                  "について",
                  "によって",
                  "にあたって",
                  "において"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "について"
                },
                "explanation": "Question 63 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 うちは普通の家ですが、世界各国からいろんな人がとまりにきます。",
                "options": [
                  "足まり",
                  "泊まり",
                  "通まり",
                  "止まり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "足まり"
                },
                "explanation": "Question 64 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 ______ 、たくさん召し上がってください。",
                "options": [
                  "失礼して",
                  "遠慮せずに",
                  "謙そんせずに",
                  "承知して"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "失礼して"
                },
                "explanation": "Question 65 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 地震 ______ ニュースをお伝えいたします。",
                "options": [
                  "に関する",
                  "に対する",
                  "に反する",
                  "に先立つ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "に関する"
                },
                "explanation": "Question 66 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 店をきれいにしたら、以前に比べて、女性客が増えた。",
                "options": [
                  "ひらべて",
                  "くらべて",
                  "ならべて",
                  "こらべて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひらべて"
                },
                "explanation": "Question 67 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 ぼくは、毎朝、風呂場で ______ をそります。",
                "options": [
                  "ひじ",
                  "はげ",
                  "かび",
                  "ひげ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひじ"
                },
                "explanation": "Question 68 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 お盆休みのラッシュ ______ 事故まで起こり、高速道路はひどい渋滞になった。",
                "options": [
                  "にくらべて",
                  "にくわえて",
                  "にかけて",
                  "にさいして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にくらべて"
                },
                "explanation": "Question 69 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 彼女はいつも助けてくれるやさしい人です。",
                "options": [
                  "難しい",
                  "易しい",
                  "優しい",
                  "美しい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "難しい"
                },
                "explanation": "Question 70 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 7月 ______ には、梅雨も明けるでしょう。",
                "options": [
                  "中旬",
                  "中間",
                  "中心",
                  "中央"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "中旬"
                },
                "explanation": "Question 71 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 ご主人様に、どうぞよろしく ______ ください。",
                "options": [
                  "お伝え",
                  "お伝えて",
                  "お伝えして",
                  "お伝えられ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "お伝え"
                },
                "explanation": "Question 72 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 再来週、面接試験を受けます。",
                "options": [
                  "さらいしゅう",
                  "さいらいしゅう",
                  "せらいしゅう",
                  "せいらいしゅう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さらいしゅう"
                },
                "explanation": "Question 73 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 一度できなくても ______ いけません。もう一度やってみましょう。",
                "options": [
                  "あきては",
                  "あきれては",
                  "あきらめては",
                  "あきられては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あきては"
                },
                "explanation": "Question 74 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 あいさつの仕方は、時と場所、相手 ______ 違います。",
                "options": [
                  "によって",
                  "にとって",
                  "において",
                  "について"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "によって"
                },
                "explanation": "Question 75 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w1-d6",
        "title": "Week 1 - Day 6",
        "type": "questions-only",
        "description": "Week 1 Day 6: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 1 - Day 6",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 君は熱心な学生だから、きっと試験に合格するでしょう。",
                "options": [
                  "くん",
                  "あなた",
                  "かみ",
                  "きみ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くん"
                },
                "explanation": "Question 76 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 あの人とは同じクラスなんですが、口を ______ ことがありません。",
                "options": [
                  "かけた",
                  "だした",
                  "きいた",
                  "さげた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かけた"
                },
                "explanation": "Question 77 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 A「おかしいなあ、10個 ______ はずなのに。」 B「あ、ごめん、1個食べちゃった。」",
                "options": [
                  "買う",
                  "買わない",
                  "買った",
                  "買わなかった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "買う"
                },
                "explanation": "Question 78 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 石けんが 12こ、入っています。",
                "options": [
                  "個",
                  "台",
                  "枚",
                  "故"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "個"
                },
                "explanation": "Question 79 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 田中さんは、よく笑う ______ 人です。",
                "options": [
                  "あわただしい",
                  "おとなしい",
                  "まぶしい",
                  "ほがらか（な）"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あわただしい"
                },
                "explanation": "Question 80 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 A「あのう、すみませんが、道を教えて ______ 。」 B「いいですよ。」",
                "options": [
                  "いただけませんか",
                  "いただきませんか",
                  "いただきでしょうか",
                  "いただいてでしょうか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いただけませんか"
                },
                "explanation": "Question 81 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 あのお寺の庭は、みどりが多くて静かです。",
                "options": [
                  "にぎやか",
                  "ゆたか",
                  "しずか",
                  "のどか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にぎやか"
                },
                "explanation": "Question 82 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 新幹線は、乗車 ______ だけでなく、特急 ______ が必要だ。",
                "options": [
                  "券 / 券",
                  "札 / 札",
                  "紙 / 紙",
                  "賃 / 賃"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "券 / 券"
                },
                "explanation": "Question 83 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 こちらで ______ お待ちください。",
                "options": [
                  "おかけして",
                  "おかけになって",
                  "おかけて",
                  "おかけされて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おかけして"
                },
                "explanation": "Question 84 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 皆様によろしくお伝えください。",
                "options": [
                  "おつだえ",
                  "おつたえ",
                  "おだつえ",
                  "おたつえ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おつだえ"
                },
                "explanation": "Question 85 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 ご注文の品物は、明日 ______ お届けいたします。",
                "options": [
                  "確かに",
                  "確か",
                  "急ぎに",
                  "急に"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "確かに"
                },
                "explanation": "Question 86 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 A「お客様、何に ______ 。」 B「Aランチ、お願いします。」",
                "options": [
                  "いたしますか",
                  "なさいまか",
                  "お食べになりますか",
                  "いただきますか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いたしますか"
                },
                "explanation": "Question 87 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 公園でこどもと遊んだ。",
                "options": [
                  "子達",
                  "子供",
                  "小児",
                  "小人"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "子達"
                },
                "explanation": "Question 88 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 この先、道が二つに分かれていますが、どっちの ______ に行けばいいですか。",
                "options": [
                  "土地",
                  "向き",
                  "地方",
                  "方向"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "土地"
                },
                "explanation": "Question 89 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 戦争が ______ ように。",
                "options": [
                  "なくなる",
                  "なくなって",
                  "なくなった",
                  "なくなります"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なくなる"
                },
                "explanation": "Question 90 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w1-d7",
        "title": "Week 1 - Day 7 Review",
        "type": "day-challenge",
        "description": "Week 1 Day 7: Comprehensive review of the week's exercises (35 questions).",
        "passages": [
          {
            "title": "Week 1 - Day 7 Review",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 バスで空港へ行く。",
                "options": [
                  "くうこう",
                  "こうくう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くうこう"
                },
                "explanation": "Question 91 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 午後はじゆうに行動して下さい。",
                "options": [
                  "自由",
                  "理由"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "自由"
                },
                "explanation": "Question 92 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問3 昨日の会議では、よいアイデアが ______ 発表された。",
                "options": [
                  "ところどころ",
                  "つぎつぎに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ところどころ"
                },
                "explanation": "Question 93 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問4 まだゲームをしているの？ ______ しなさい。",
                "options": [
                  "えんりょ",
                  "いいかげんに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "えんりょ"
                },
                "explanation": "Question 94 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問5 昨年の試験問題は、一昨年 ______ 少し易しくなった。",
                "options": [
                  "にくらべて",
                  "にくわえて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にくらべて"
                },
                "explanation": "Question 95 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問6 今朝は大事な会議がある。遅れない ______ 、いつもより早く家を出よう。",
                "options": [
                  "ために",
                  "ように"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ために"
                },
                "explanation": "Question 96 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 授業に遅れないようにしてください。",
                "options": [
                  "おそれない",
                  "おくれない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おそれない"
                },
                "explanation": "Question 97 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 こんな事があるなんて、しんじられない。",
                "options": [
                  "信じられない",
                  "真じられない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "信じられない"
                },
                "explanation": "Question 98 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問9 田中先生は、______ こわいけれど、とてもいい先生です。",
                "options": [
                  "きびしくて",
                  "けわしくて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きびしくて"
                },
                "explanation": "Question 99 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問10 弟は小学生のころ、______ 友だちも少なかったです。",
                "options": [
                  "ほがらかで",
                  "おとなしくて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ほがらかで"
                },
                "explanation": "Question 100 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問11 A「怒らないで。」 B「怒って ______ いないよ、心配しているんだ。」",
                "options": [
                  "なんか",
                  "ばかり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なんか"
                },
                "explanation": "Question 101 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問12 いつも助けて ______ ありがとう。",
                "options": [
                  "もらえて",
                  "くれて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "もらえて"
                },
                "explanation": "Question 102 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 果物が好きです。",
                "options": [
                  "くだもの",
                  "こどもの"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くだもの"
                },
                "explanation": "Question 103 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 このきょくを聞くと国を思い出す。",
                "options": [
                  "局",
                  "曲"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "局"
                },
                "explanation": "Question 104 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問15 ______ が良い食事を心がけましょう。",
                "options": [
                  "テーマ",
                  "バランス"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "テーマ"
                },
                "explanation": "Question 105 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問16 そんな易しい計算もできないなんて、本当に ______ ね。",
                "options": [
                  "あきられる",
                  "あきれる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あきられる"
                },
                "explanation": "Question 106 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問17 電話もメールも通じないなら、遠くても行く ______ 。",
                "options": [
                  "しかない",
                  "だけある"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しかない"
                },
                "explanation": "Question 107 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問18 割れない ______ 、そっと置いてください。",
                "options": [
                  "ように",
                  "ために"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ように"
                },
                "explanation": "Question 108 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問19 ここはお年寄りのための優先席です。",
                "options": [
                  "ようせんせき",
                  "ゆうせんせき"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ようせんせき"
                },
                "explanation": "Question 109 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問20 お皿をわってしまった。",
                "options": [
                  "割って",
                  "折って"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "割って"
                },
                "explanation": "Question 110 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問21 A「 ______ 。」 B「気をつけて。また遊びに来てください。」",
                "options": [
                  "おじゃましました",
                  "しょうちしました"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おじゃましました"
                },
                "explanation": "Question 111 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問22 彼の言い方に ______ が、何も言えなかった。",
                "options": [
                  "腹にきた",
                  "頭にきた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "腹にきた"
                },
                "explanation": "Question 112 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問23 日本の春 ______ 、サクラですね。",
                "options": [
                  "というより",
                  "といえば"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "というより"
                },
                "explanation": "Question 113 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問24 私は夫に危険な仕事を ______ 。",
                "options": [
                  "してほしくない",
                  "しなくてほしい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "してほしくない"
                },
                "explanation": "Question 114 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問25 夫婦で旅行に行く。",
                "options": [
                  "ふさい",
                  "ふうふ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ふさい"
                },
                "explanation": "Question 115 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問26 鳥がとんでいる。",
                "options": [
                  "込んで",
                  "飛んで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "込んで"
                },
                "explanation": "Question 116 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問27 田舎に広い ______ があるが、そこに家を建てるつもりはない。",
                "options": [
                  "土地",
                  "地方"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "土地"
                },
                "explanation": "Question 117 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問28 A「今度の試験いつ知ってる？」 B「 ______ 来月の10日だったと思うけれど…。」",
                "options": [
                  "確かに",
                  "確か"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "確かに"
                },
                "explanation": "Question 118 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問29 A「あ、リーさんだ。」 B「え、リーさんの ______ よ。国に帰ったんだから。」",
                "options": [
                  "はずない",
                  "はずじゃない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "はずない"
                },
                "explanation": "Question 119 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問30 お正月料理も地方や家 ______ 違う。",
                "options": [
                  "にそって",
                  "によって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にそって"
                },
                "explanation": "Question 120 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問31 紙を三角におります。",
                "options": [
                  "さんかく",
                  "みつかど"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さんかく"
                },
                "explanation": "Question 121 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問32 旅館にとまる。",
                "options": [
                  "泊まる",
                  "宿まる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "泊まる"
                },
                "explanation": "Question 122 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問33 おなかがすきすぎて、______ 。",
                "options": [
                  "ころびそうだ",
                  "たおれそうだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ころびそうだ"
                },
                "explanation": "Question 123 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問34 お金を使いすぎて、帰る電車 ______ もなくなった。",
                "options": [
                  "賃",
                  "券"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "賃"
                },
                "explanation": "Question 124 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問35 神様、お願い。今年はすてきな人と出会えます ______ 。",
                "options": [
                  "ように",
                  "かなあ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ように"
                },
                "explanation": "Question 125 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d1",
        "title": "Week 2 - Day 1",
        "type": "questions-only",
        "description": "Week 2 Day 1: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 2 - Day 1",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 毎日続けて練習すれば覚えられます。",
                "options": [
                  "つるけて",
                  "つむけて",
                  "つぬけて",
                  "つづけて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "つるけて"
                },
                "explanation": "Question 126 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 髪、切ったんだね。ずいぶん ______ が変わったね。",
                "options": [
                  "レベル",
                  "テンポ",
                  "イメージ",
                  "サイン"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "レベル"
                },
                "explanation": "Question 127 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 しぼり ______ の牛乳はいかがですか。",
                "options": [
                  "あげ",
                  "たて",
                  "すぎ",
                  "きり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あげ"
                },
                "explanation": "Question 128 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 今はかんご婦を、「かんご師」とよびます。",
                "options": [
                  "浴びます",
                  "呼びます",
                  "飛びます",
                  "遊びます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "浴びます"
                },
                "explanation": "Question 129 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 時間があるから、ちょっとその辺を ______ しましょう。",
                "options": [
                  "そろそろ",
                  "のろのろ",
                  "ぶらぶら",
                  "どんどん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そろそろ"
                },
                "explanation": "Question 130 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 友人を亡くした ______ を歌にしました。",
                "options": [
                  "悲しい",
                  "悲しいさ",
                  "悲しみ",
                  "悲しむ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "悲しい"
                },
                "explanation": "Question 131 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 暖かくなったら、両親を呼んでこの町を案内したい。",
                "options": [
                  "みじかく",
                  "やわらかく",
                  "こまかく",
                  "あたたかく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "みじかく"
                },
                "explanation": "Question 132 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 朝から何も食べていないから、おなかが ______ だ。",
                "options": [
                  "ふらふら",
                  "ぴかぴか",
                  "ぺらぺら",
                  "ぺこぺこ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ふらふら"
                },
                "explanation": "Question 133 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「あれから、彼女に会いましたか。」 B「いえ、あれ ______ です。」",
                "options": [
                  "っきり",
                  "っぽっち",
                  "だけ",
                  "ほど"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "っきり"
                },
                "explanation": "Question 134 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 今年の正月は、久しぶりに家族をつれて神社へ行った。",
                "options": [
                  "遅れて",
                  "連れて",
                  "晴れて",
                  "取れて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "遅れて"
                },
                "explanation": "Question 135 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 貧しかった少年が、社会で成功するという ______ の映画を見た。",
                "options": [
                  "文学",
                  "作文",
                  "書物",
                  "物語"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "文学"
                },
                "explanation": "Question 136 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 彼女はピンク色が好きで、髪 ______ ピンクにしてしまった。",
                "options": [
                  "こそ",
                  "だけ",
                  "まで",
                  "ほど"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こそ"
                },
                "explanation": "Question 137 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 私が育った町の美しい川は、今は汚れて、もう泳げない。",
                "options": [
                  "よごれて",
                  "よばれて",
                  "おごれて",
                  "おぼれて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "よごれて"
                },
                "explanation": "Question 138 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 この子、熱が高くてすごく ______ だよ。すぐ医者に連れていこう。",
                "options": [
                  "つらそう",
                  "みにくそう",
                  "にがそう",
                  "くるしみそう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "つらそう"
                },
                "explanation": "Question 139 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 この石けんはおもしろい ______ 汚れがよく落ちる。",
                "options": [
                  "だけ",
                  "ほど",
                  "まで",
                  "ばかり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だけ"
                },
                "explanation": "Question 140 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d2",
        "title": "Week 2 - Day 2",
        "type": "questions-only",
        "description": "Week 2 Day 2: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 2 - Day 2",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 輸出の反対は輸入です。",
                "options": [
                  "はんだい",
                  "へんだい",
                  "はんたい",
                  "へんたい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "はんだい"
                },
                "explanation": "Question 141 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 娘のけがが軽くて、______ しました。",
                "options": [
                  "そっと",
                  "じっと",
                  "さっと",
                  "ほっと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そっと"
                },
                "explanation": "Question 142 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 息子 ______ をして老人からお金をとる事件が増えている。",
                "options": [
                  "ぶり",
                  "のふり",
                  "にふり",
                  "っぷり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぶり"
                },
                "explanation": "Question 143 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 A「ちょっとにがいね。」 B「お茶の葉を入れすぎたかな。」",
                "options": [
                  "若い",
                  "苦い",
                  "強い",
                  "厚い"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "若い"
                },
                "explanation": "Question 144 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 毎日何回も自分の体重を ______ というダイエット方法があるそうです。",
                "options": [
                  "量る",
                  "減らす",
                  "増やす",
                  "落とす"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "量る"
                },
                "explanation": "Question 145 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 使ったら ______ っぱなしにしないで、片付けなさい。",
                "options": [
                  "出す",
                  "出し",
                  "出して",
                  "出した"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "出す"
                },
                "explanation": "Question 146 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 最近、忙しそうだけど、無理をしないで。",
                "options": [
                  "ちかごろ",
                  "このごろ",
                  "せいきん",
                  "さいきん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ちかごろ"
                },
                "explanation": "Question 147 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 毎日レストランで食事をするなんて、お金が ______ できません。",
                "options": [
                  "かからなくて",
                  "もったいなくて",
                  "ぜいたくで",
                  "びんぼうで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かからなくて"
                },
                "explanation": "Question 148 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 母が ______ 、みんなで心配しています。",
                "options": [
                  "入院したことがあって",
                  "入院したことにして",
                  "入院することになって",
                  "入院することにして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "入院したことがあって"
                },
                "explanation": "Question 149 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 きれいなかいでしょう。先週末、南の島でひろったの。",
                "options": [
                  "買",
                  "見",
                  "員",
                  "貝"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "買"
                },
                "explanation": "Question 150 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 またこんなに部屋を散らかして…。 ______ ね。",
                "options": [
                  "だらしない",
                  "あやしい",
                  "くだらない",
                  "しつこい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だらしない"
                },
                "explanation": "Question 151 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 A「今週の土曜日、お花見ですね。」 B「ええ、雨が ______ ですが。」",
                "options": [
                  "降らなくてもいい",
                  "降らないといい",
                  "降りにくい",
                  "降らないでいい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "降らなくてもいい"
                },
                "explanation": "Question 152 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 歯医者で歯をぬいた日、血がなかなか止まらなくて困った。",
                "options": [
                  "こまった",
                  "まいった",
                  "あせった",
                  "つまった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こまった"
                },
                "explanation": "Question 153 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 中学から高校の6年間、田中先生に英語を ______ 。",
                "options": [
                  "おそわれました",
                  "まなばれました",
                  "おそわりました",
                  "まなばされました"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おそわれました"
                },
                "explanation": "Question 154 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 寒いと思ったら、窓が ______ いた。",
                "options": [
                  "開けて",
                  "閉めて",
                  "開いて",
                  "閉まって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "開けて"
                },
                "explanation": "Question 155 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d3",
        "title": "Week 2 - Day 3",
        "type": "questions-only",
        "description": "Week 2 Day 3: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 2 - Day 3",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 この本の第一課から、復習しましょう。",
                "options": [
                  "ふくしい",
                  "ふうしい",
                  "ふくしゅう",
                  "ふうしゅう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ふくしい"
                },
                "explanation": "Question 156 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 まず、今日の ______ ニュースからお伝えいたします。",
                "options": [
                  "おもな",
                  "かなりの",
                  "たいした",
                  "たいへん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おもな"
                },
                "explanation": "Question 157 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 A「一郎の試験、どうだったのかなあ。」 B「発表は明日だけれど、 ______ よ。」",
                "options": [
                  "だめだった",
                  "だめらしい",
                  "だめようだ",
                  "だめなみたいだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だめだった"
                },
                "explanation": "Question 158 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 A社は原料を輸入して、せいひんを輸出している。",
                "options": [
                  "制品",
                  "製品",
                  "商品",
                  "正品"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "制品"
                },
                "explanation": "Question 159 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 新宿へ行くなら、向こうのホームから東京 ______ の電車に乗らないとだめですよ。",
                "options": [
                  "止まり",
                  "行き",
                  "発",
                  "先"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "止まり"
                },
                "explanation": "Question 160 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 家を ______ 、急に雨が降ってきた。",
                "options": [
                  "出たままで",
                  "出られたのに",
                  "出ようと思って",
                  "出ようとしたときに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "出たままで"
                },
                "explanation": "Question 161 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 アンケート調査にご協力をお願いします。",
                "options": [
                  "ちょうさ",
                  "ちゅうさ",
                  "ちょうしゃ",
                  "ちゅうしゃ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ちょうさ"
                },
                "explanation": "Question 162 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 3時から会議室で、新しい企画の ______ をします。",
                "options": [
                  "待ち合わせ",
                  "組み合わせ",
                  "問い合わせ",
                  "打ち合わせ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "待ち合わせ"
                },
                "explanation": "Question 163 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 いいにおいが ______ が、何のにおいでしょうか。",
                "options": [
                  "きます",
                  "なります",
                  "あります",
                  "します"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きます"
                },
                "explanation": "Question 164 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 窓を開けると、すずしい風が入ってくる。",
                "options": [
                  "忙しい",
                  "涼しい",
                  "楽しい",
                  "悲しい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "忙しい"
                },
                "explanation": "Question 165 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 今からだと映画に間に合うかどうかわからないが、______ 行ってみよう。",
                "options": [
                  "とにかく",
                  "いきなり",
                  "せっかく",
                  "どうか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とにかく"
                },
                "explanation": "Question 166 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 この辺の小学生は、______ かわいいですね。",
                "options": [
                  "子供らしくて",
                  "子供のようで",
                  "子供のままで",
                  "子供みたいで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "子供らしくて"
                },
                "explanation": "Question 167 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 ランチには飲み物が付いております。温かいのも冷たいのもございます。",
                "options": [
                  "ひえたい",
                  "ひやたい",
                  "つめたい",
                  "すめたい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひえたい"
                },
                "explanation": "Question 168 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 タベ、久しぶりに会った高校時代の友人と、遅くまで楽しく ______ 。",
                "options": [
                  "しゃべり出した",
                  "語り合った",
                  "言い合った",
                  "話しかけた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しゃべり出した"
                },
                "explanation": "Question 169 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 しっぽを引っ張るのはやめなさい。猫が ______ でしょ。",
                "options": [
                  "いやがっている",
                  "いやだらしい",
                  "いやなはずがない",
                  "いやにしたい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いやがっている"
                },
                "explanation": "Question 170 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d4",
        "title": "Week 2 - Day 4",
        "type": "questions-only",
        "description": "Week 2 Day 4: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 2 - Day 4",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 昨日の晩は雪が降ったが、今朝は晴れている。",
                "options": [
                  "あれいて",
                  "なれて",
                  "はれて",
                  "かれて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あれいて"
                },
                "explanation": "Question 171 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 リンさんはもう一週間も学校を休んでいますね。だれか、彼の ______ を知りませんか。",
                "options": [
                  "様子",
                  "態度",
                  "格好",
                  "症状"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "様子"
                },
                "explanation": "Question 172 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 うちの犬は、夕方の5時になると散歩に ______ 。",
                "options": [
                  "行きがります",
                  "行きたがります",
                  "行きほしがります",
                  "行きたいがります"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "行きがります"
                },
                "explanation": "Question 173 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 石油ストーブを消し忘れると、火事のげんいんになります。",
                "options": [
                  "原因",
                  "原因",
                  "原団",
                  "原回"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "原因"
                },
                "explanation": "Question 174 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 料理の仕方を ______ 、カロリーの低い食事を作りましょう。",
                "options": [
                  "使用して",
                  "解決して",
                  "工夫して",
                  "修理して"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "使用して"
                },
                "explanation": "Question 175 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 あ、もう8時だ。早く ______ 。",
                "options": [
                  "出かけなかったら",
                  "出かけないなら",
                  "出かけなくても",
                  "出かけないと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "出かけなかったら"
                },
                "explanation": "Question 176 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 検査の前は、飲食もタバコも禁止です。",
                "options": [
                  "ちゅうし",
                  "ていし",
                  "きんえん",
                  "きんし"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ちゅうし"
                },
                "explanation": "Question 177 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 そんな ______ ホテルには泊まったことがない。",
                "options": [
                  "本物の",
                  "人気な",
                  "上級の",
                  "高級な"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "本物の"
                },
                "explanation": "Question 178 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 毎日練習しているのに、______ 上手になりません。",
                "options": [
                  "ちっとも",
                  "少しだけ",
                  "めったに",
                  "おそらく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ちっとも"
                },
                "explanation": "Question 179 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 オリンピック選手に選ばれて、夢がじつげんした。",
                "options": [
                  "事実",
                  "実験",
                  "現実",
                  "実現"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "事実"
                },
                "explanation": "Question 180 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 A「新しい仕事はどう？」 B「まあまあ ______ よ。」",
                "options": [
                  "気にしている",
                  "気になっている",
                  "気に入っている",
                  "気にかけている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "気にしている"
                },
                "explanation": "Question 181 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 失敗してもあきらめないで、もう一度 ______ 。",
                "options": [
                  "やってみれ",
                  "やってごらん",
                  "やってなさい",
                  "やってなされ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "やってみれ"
                },
                "explanation": "Question 182 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 日本の歴史について論文を書いています。",
                "options": [
                  "ろんぶん",
                  "るんぶん",
                  "らんぶん",
                  "りんぶん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ろんぶん"
                },
                "explanation": "Question 183 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 両親が日本に来るけれど、仕事があるので空港まで ______ 行けない。",
                "options": [
                  "みおくりに",
                  "むかえに",
                  "たすけに",
                  "まねきに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "みおくりに"
                },
                "explanation": "Question 184 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 私の名前は、______ 書きます。",
                "options": [
                  "こんなに",
                  "こう",
                  "こういう",
                  "こういうふう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こんなに"
                },
                "explanation": "Question 185 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d5",
        "title": "Week 2 - Day 5",
        "type": "questions-only",
        "description": "Week 2 Day 5: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 2 - Day 5",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 ファイルを作成し、保存しましょう。",
                "options": [
                  "ほそん",
                  "ほぞん",
                  "ほぜん",
                  "ほじょん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ほそん"
                },
                "explanation": "Question 186 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 忘れるといけないから、手帳に ______ をしておこう。",
                "options": [
                  "プリント",
                  "メモ",
                  "レポート",
                  "ノート"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "プリント"
                },
                "explanation": "Question 187 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 日曜日は、家でDVDを ______ 過ごしています。",
                "options": [
                  "見ようとして",
                  "見たりして",
                  "見るために",
                  "見るままで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "見ようとして"
                },
                "explanation": "Question 188 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 しゅしょうは消費税を上げると言った。",
                "options": [
                  "首相",
                  "主相",
                  "首長",
                  "主長"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "首相"
                },
                "explanation": "Question 189 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 けんかでもしているのか、外がとても ______ 。",
                "options": [
                  "はげしい",
                  "ずうずうしい",
                  "さわがしい",
                  "にぎやかしい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "はげしい"
                },
                "explanation": "Question 190 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 中国で大きな地震があったというニュースが ______ 。",
                "options": [
                  "伝えられました",
                  "伝わってきました",
                  "伝えてきました",
                  "伝わられました"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "伝えられました"
                },
                "explanation": "Question 191 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 規則を守りましょう。",
                "options": [
                  "なのりましょう",
                  "ともりましょう",
                  "まもりましょう",
                  "たよりましょう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なのりましょう"
                },
                "explanation": "Question 192 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 仕事が忙しいので、人をもう一人 ______ ことにした。",
                "options": [
                  "やとう",
                  "つとめる",
                  "まぜる",
                  "あずける"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "やとう"
                },
                "explanation": "Question 193 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 友達の赤ちゃんを預かったのですが、______ 困りました。",
                "options": [
                  "泣けば",
                  "泣かせて",
                  "泣かれて",
                  "泣いてられて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "泣けば"
                },
                "explanation": "Question 194 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 この書類は機械に読ませますから、おり曲げないでください。",
                "options": [
                  "祈り",
                  "折り",
                  "税り",
                  "祝い"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "祈り"
                },
                "explanation": "Question 195 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 A「田中さんは、フランス語が ______ だそうだね。」 B「ああ、留学していたんだって。」",
                "options": [
                  "はきはき",
                  "ぺらぺら",
                  "ぶつぶつ",
                  "ぶらぶら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "はきはき"
                },
                "explanation": "Question 196 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 田中さん、社長が今すぐ部屋に ______ と言っていますよ。",
                "options": [
                  "こい",
                  "こよう",
                  "きろ",
                  "きよう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こい"
                },
                "explanation": "Question 197 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 紙の表とうらを間違えないように確かめてください。",
                "options": [
                  "ひょう",
                  "びょう",
                  "おもて",
                  "あらわ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひょう"
                },
                "explanation": "Question 198 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 台風の影響で、今日の大学の授業はすべて ______ になった。",
                "options": [
                  "休業",
                  "休",
                  "休憩",
                  "休講"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "休業"
                },
                "explanation": "Question 199 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 ゼミの資料を一晩で ______ 上げた。",
                "options": [
                  "まとめ",
                  "まとめて",
                  "まとめる",
                  "まとめた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まとめ"
                },
                "explanation": "Question 200 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d6",
        "title": "Week 2 - Day 6",
        "type": "questions-only",
        "description": "Week 2 Day 6: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 2 - Day 6",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 『幸福な王子』という物語を読んだ。",
                "options": [
                  "おうじ",
                  "おおおじ",
                  "おうし",
                  "おおし"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おうじ"
                },
                "explanation": "Question 201 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 部屋がなかなか ______ ね。エアコンが壊れているのかな。",
                "options": [
                  "ひえない",
                  "さめない",
                  "こおらない",
                  "ひやさない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひえない"
                },
                "explanation": "Question 202 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 車で空港まで ______ と頼まれました。",
                "options": [
                  "送ろう",
                  "送るよう",
                  "送ってくれ",
                  "送ってくれる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "送ろう"
                },
                "explanation": "Question 203 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 この機械を使うには、画面のしじ通りにしてください。",
                "options": [
                  "指示",
                  "支持",
                  "指事",
                  "私事"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "指示"
                },
                "explanation": "Question 204 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 牛乳を買ってくるように言われていたが、______ して忘れてしまった。",
                "options": [
                  "がっかり",
                  "すっかり",
                  "うっかり",
                  "しっかり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "がっかり"
                },
                "explanation": "Question 205 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 友達の結婚のお祝いを一緒に選んで ______ 。",
                "options": [
                  "くださいませんか",
                  "いただきませんか",
                  "くださってもいいですか",
                  "いただけてもいいですか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くださいませんか"
                },
                "explanation": "Question 206 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 支払い期限はいつですか。",
                "options": [
                  "きかん",
                  "きがん",
                  "きじつ",
                  "きげん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きかん"
                },
                "explanation": "Question 207 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 きれいで頭のいい田中さんが ______ 。",
                "options": [
                  "くやしい",
                  "おしい",
                  "うらやましい",
                  "ずるい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くやしい"
                },
                "explanation": "Question 208 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「京都へは ______ ことがありますか。」 B「ええ、何度も行きました。」",
                "options": [
                  "行けた",
                  "行かれた",
                  "行かせた",
                  "行けられた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "行けた"
                },
                "explanation": "Question 209 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 試験にしっぱいしてしまった。",
                "options": [
                  "矢敗",
                  "失敗",
                  "欠敗",
                  "失敗"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "矢敗"
                },
                "explanation": "Question 210 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 食器は ______ その棚にしまってください。",
                "options": [
                  "かさねて",
                  "ひろげて",
                  "たたんで",
                  "ちぢめて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かさねて"
                },
                "explanation": "Question 211 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 A「あの方をご存じですか。」 B「いいえ、______ 。」",
                "options": [
                  "存じじゃありません",
                  "存じません",
                  "存じてません",
                  "存じないです"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "存じじゃありません"
                },
                "explanation": "Question 212 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 その友人は独身で、趣味は登山です。",
                "options": [
                  "とさん",
                  "とざん",
                  "とうざん",
                  "とうさん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とさん"
                },
                "explanation": "Question 213 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 田中さんの結婚式には、なんとか ______ 出席したいと思っています。",
                "options": [
                  "都合をつけて",
                  "具合がよくて",
                  "事情をとって",
                  "連絡があって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "都合をつけて"
                },
                "explanation": "Question 214 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 駐車は ______ ください。",
                "options": [
                  "ご遠慮",
                  "ご遠慮して",
                  "ご遠慮いただけて",
                  "ご遠慮申し上げて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ご遠慮"
                },
                "explanation": "Question 215 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w2-d7",
        "title": "Week 2 - Day 7 Review",
        "type": "day-challenge",
        "description": "Week 2 Day 7: Comprehensive review of the week's exercises (35 questions).",
        "passages": [
          {
            "title": "Week 2 - Day 7 Review",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 ビールが冷えています。",
                "options": [
                  "ふえて",
                  "ひえて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ふえて"
                },
                "explanation": "Question 216 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 久しぶりに両親と会った。",
                "options": [
                  "欠しぶり",
                  "久しぶり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "欠しぶり"
                },
                "explanation": "Question 217 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問3 この子が ______ のは、2歳になってからです。",
                "options": [
                  "しゃべり出した",
                  "話しかけた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しゃべり出した"
                },
                "explanation": "Question 218 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問4 彼とは会話の ______ が合わない。",
                "options": [
                  "チャンス",
                  "テンポ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "チャンス"
                },
                "explanation": "Question 219 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問5 妹は、私の持っているものをいつも ______ 。",
                "options": [
                  "ほしがります",
                  "ほしいはずです"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ほしがります"
                },
                "explanation": "Question 220 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問6 工事の音は耳が痛くなる ______ 大きい。",
                "options": [
                  "ばかり",
                  "ほど"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ばかり"
                },
                "explanation": "Question 221 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 荷物をお届けに参りましたが、お留守でした。",
                "options": [
                  "るしゅ",
                  "るす"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "るしゅ"
                },
                "explanation": "Question 222 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 ここはむりょうで車が止められます。",
                "options": [
                  "無料",
                  "無両"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "無料"
                },
                "explanation": "Question 223 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問9 田中さんはお子さんの ______ が悪いらしくて、もう帰りましたよ。",
                "options": [
                  "事情",
                  "具合"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "事情"
                },
                "explanation": "Question 224 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問10 今日の面接の結果が ______ 、眠れない。",
                "options": [
                  "気にして",
                  "気になって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "気にして"
                },
                "explanation": "Question 225 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問11 会社が移転する ______ 。",
                "options": [
                  "ことにした",
                  "ことになった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ことにした"
                },
                "explanation": "Question 226 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問12 秘書に急に ______ 。",
                "options": [
                  "辞められた",
                  "辞めさせた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "辞められた"
                },
                "explanation": "Question 227 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 汚いからさわらないで。",
                "options": [
                  "きたない",
                  "よごれいい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きたない"
                },
                "explanation": "Question 228 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 おもしろい場所におつれしましょう。",
                "options": [
                  "お連れ",
                  "お練れ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "お連れ"
                },
                "explanation": "Question 229 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問15 A「どんな ______ ですか。」 B「のどが痛くてせきが出るんです。」",
                "options": [
                  "しょうじょう",
                  "たいど"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しょうじょう"
                },
                "explanation": "Question 230 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問16 ______ ことはないんですが、今、父は入院しているんです。",
                "options": [
                  "おもな",
                  "たいした"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おもな"
                },
                "explanation": "Question 231 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問17 明日早いんだから、早く ______ 。",
                "options": [
                  "寝ると",
                  "寝ないと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "寝ると"
                },
                "explanation": "Question 232 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問18 なんか変な ______ ね。何だろう。",
                "options": [
                  "音がする",
                  "音がきく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "音がする"
                },
                "explanation": "Question 233 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問19 忘年会で飲みすぎた。",
                "options": [
                  "ぼうねんかい",
                  "もうねんかい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぼうねんかい"
                },
                "explanation": "Question 234 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問20 かみさま、どうかお願いします。",
                "options": [
                  "上様",
                  "神様"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "上様"
                },
                "explanation": "Question 235 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問21 逃げても逃げても犬が ______ 追いかけてきて怖かった。",
                "options": [
                  "しつこく",
                  "あやしく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しつこく"
                },
                "explanation": "Question 236 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問22 試験まであと1週間しかない。ああ。時間が ______ 過ぎていく。",
                "options": [
                  "どんどん",
                  "のろのろ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "どんどん"
                },
                "explanation": "Question 237 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問23 ずる休みをするなんて、______ 。",
                "options": [
                  "あなたらしくない",
                  "あなたっぽくない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あなたらしくない"
                },
                "explanation": "Question 238 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問24 そのベンチはペンキ ______ だから、座らないで。",
                "options": [
                  "ぬりたて",
                  "ぬりっぱなし"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぬりたて"
                },
                "explanation": "Question 239 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問25 教育について考える。",
                "options": [
                  "きょういく",
                  "きょうよう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きょういく"
                },
                "explanation": "Question 240 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問26 ねんまつは忙しい。",
                "options": [
                  "年末",
                  "年末"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "年末"
                },
                "explanation": "Question 241 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問27 パソコンが壊れた。 ______ のは時間もお金もかかるらしい。",
                "options": [
                  "修理する",
                  "解決する"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "修理する"
                },
                "explanation": "Question 242 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問28 結婚式に ______ けれど、何を着て行ったらよいかわからない。",
                "options": [
                  "むかえられた",
                  "まねかれた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "むかえられた"
                },
                "explanation": "Question 243 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問29 ひまなときは音楽を聞いたり ______ 。",
                "options": [
                  "しています",
                  "なっています"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しています"
                },
                "explanation": "Question 244 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問30 A「もう会えないかも。」 B「え、______ 意味ですか。」",
                "options": [
                  "どんな",
                  "どういう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "どんな"
                },
                "explanation": "Question 245 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問31 言葉の意味を調べる。",
                "options": [
                  "げんご",
                  "ことば"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "げんご"
                },
                "explanation": "Question 246 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問32 かなしい小説を読んだ。",
                "options": [
                  "苦しい",
                  "悲しい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "苦しい"
                },
                "explanation": "Question 247 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問33 セーターを家で洗ったら、______ 。",
                "options": [
                  "縮んじゃった",
                  "縮めちゃった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "縮んじゃった"
                },
                "explanation": "Question 248 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問34 田中さんは、だまって人の物を使うような ______ 人ではない。",
                "options": [
                  "さわがしい",
                  "ずうずうしい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さわがしい"
                },
                "explanation": "Question 249 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問35 先生に、毎日30分は ______ と言われています。",
                "options": [
                  "勉強するよう",
                  "勉強しろ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "勉強するよう"
                },
                "explanation": "Question 250 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d1",
        "title": "Week 3 - Day 1",
        "type": "questions-only",
        "description": "Week 3 Day 1: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 3 - Day 1",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 地下鉄の入り口はあの交差点にありますよ。",
                "options": [
                  "こさてん",
                  "こうさてん",
                  "こしゃてん",
                  "こうしゃてん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こさてん"
                },
                "explanation": "Question 251 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 若いときは、いくらお酒を飲んでも ______ だったが、最近はすぐに酔ってしまう。",
                "options": [
                  "平気",
                  "健康",
                  "まじめ",
                  "無事"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "平気"
                },
                "explanation": "Question 252 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 病気に ______ 健康の大切さを知りました。",
                "options": [
                  "なってからでないと",
                  "ならないことには",
                  "なってはじめて",
                  "なってからでは"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なってからでないと"
                },
                "explanation": "Question 253 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 ご不在でしたので、資料は中村様におおずけしました。",
                "options": [
                  "お届け",
                  "お頂け",
                  "お授け",
                  "お預け"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "お届け"
                },
                "explanation": "Question 254 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 A「奥さん、女優さんみたいにきれいですね。」 B「いやあ、______ です。妻ももう年ですよ。」",
                "options": [
                  "しょうがない",
                  "おかげさま",
                  "とんでもない",
                  "もうしわけない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しょうがない"
                },
                "explanation": "Question 255 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 もっとうまく英語が ______ なあ。",
                "options": [
                  "話せない",
                  "話そうか",
                  "話せたら",
                  "話しても"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "話せない"
                },
                "explanation": "Question 256 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 申込書は例を参考に記入してください。",
                "options": [
                  "しんこくしょ",
                  "しんせいしょ",
                  "もしこみしょ",
                  "もうしこみしょ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しんこくしょ"
                },
                "explanation": "Question 257 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 明日からしばらく留守にします。荷物が来たら ______ おいてください。",
                "options": [
                  "受け持って",
                  "受け取って",
                  "受け入れて",
                  "受け付けて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "受け持って"
                },
                "explanation": "Question 258 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「それ、高かったでしょう。」 B「 ______ でもありませんよ。」",
                "options": [
                  "それ",
                  "それほど",
                  "それより",
                  "それくらい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "それ"
                },
                "explanation": "Question 259 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 あの団体は国際的なかつどうをしている。",
                "options": [
                  "運動",
                  "行動",
                  "活動",
                  "自動"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "運動"
                },
                "explanation": "Question 260 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 私は、殺人犯がまだこの近くにいるような ______ 。",
                "options": [
                  "気がする",
                  "考えがある",
                  "感じになる",
                  "心を持っている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "気がする"
                },
                "explanation": "Question 261 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 田中さんは仕事が終わっても、なかなか ______ 。",
                "options": [
                  "帰るようにしていない",
                  "帰れないつもりだ",
                  "帰ってられない",
                  "帰ろうとしない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "帰るようにしていない"
                },
                "explanation": "Question 262 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 観光で海外へ行くので、準備をしているところです。",
                "options": [
                  "けんこう",
                  "けんこん",
                  "かんこう",
                  "かんこん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "けんこう"
                },
                "explanation": "Question 263 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 その俳優は雑誌の ______ に応じた後、テレビ局に向かった。",
                "options": [
                  "レポート",
                  "インタビュー",
                  "スピーチ",
                  "アナウンス"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "レポート"
                },
                "explanation": "Question 264 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 病気に ______ 、食事に気をつけましょう。",
                "options": [
                  "ならないように",
                  "なることがなくて",
                  "ならないみたいに",
                  "なってはいけなくてHere are the questions and options extracted from the provided images, organized by page and question number, formatted for a document."
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ならないように"
                },
                "explanation": "Question 265 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d2",
        "title": "Week 3 - Day 2",
        "type": "questions-only",
        "description": "Week 3 Day 2: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 3 - Day 2",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 この求人広告は仕事の内容がよくわからない。",
                "options": [
                  "きゅうじんこうこく",
                  "きゅうにんこうこく",
                  "きゅうじんこうかく",
                  "きゅうにんこうかく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きゅうじんこうこく"
                },
                "explanation": "Question 266 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問2 今日の授業で習ったことをノートに ________ みた。",
                "options": [
                  "あつめて",
                  "うめて",
                  "まとめて",
                  "ふくめて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あつめて"
                },
                "explanation": "Question 267 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問3 危なかった。もう少しで事故になる ________ 。",
                "options": [
                  "らしかった",
                  "そうだった",
                  "ところだった",
                  "途中だった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "らしかった"
                },
                "explanation": "Question 268 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問4 虫歯をなおす方法について医師から説明してもらった。",
                "options": [
                  "消す",
                  "移す",
                  "正す",
                  "治す"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "消す"
                },
                "explanation": "Question 269 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問5 A「電車、混んでいた？」\nB「ううん、________ だったよ。」",
                "options": [
                  "のろのろ",
                  "うろうろ",
                  "そろそろ",
                  "がらがら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "のろのろ"
                },
                "explanation": "Question 270 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問6 A「映画、おもしろかったよ。」\nB「へえー。私も一緒に ________ 。」",
                "options": [
                  "行きたがっていた",
                  "行けなくてよかった",
                  "行こうとしたかった",
                  "行けばよかった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "行きたがっていた"
                },
                "explanation": "Question 271 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問7 二十歳未満の方への販売をお断りしております。",
                "options": [
                  "おとこわり",
                  "おことわり",
                  "おこだわり",
                  "おだこだわり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おとこわり"
                },
                "explanation": "Question 272 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問8 映画は、________ 映画館で見ることもありますが、たいていは DVD を借りて家で見ます。",
                "options": [
                  "たまに",
                  "ついに",
                  "わりに",
                  "まず"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "たまに"
                },
                "explanation": "Question 273 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問9 電話くれたらすぐ手伝いに ________ 、どうして言わなかったの？",
                "options": [
                  "行ったのに",
                  "行くつもりなので",
                  "行きたかったけれど",
                  "行けないだろうが"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "行ったのに"
                },
                "explanation": "Question 274 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問10 体重がふえたので、食べる量を減らしています。",
                "options": [
                  "太えた",
                  "多えた",
                  "過えた",
                  "増えた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "太えた"
                },
                "explanation": "Question 275 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問11 急に ________ と車にひかれるから、気をつけて。",
                "options": [
                  "飛び込む",
                  "通り過ぎる",
                  "飛び出す",
                  "通りかかる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "飛び込む"
                },
                "explanation": "Question 276 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問12 田中さんの妹さんは、美人 ________ 、かわいい女性です。",
                "options": [
                  "というけれど",
                  "といっても",
                  "というより",
                  "といったら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "というけれど"
                },
                "explanation": "Question 277 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問13 何か問題が起こったら、必ず連絡して相談してください。",
                "options": [
                  "かならず",
                  "からなず",
                  "とれあいず",
                  "とりあえず"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かならず"
                },
                "explanation": "Question 278 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問14 桜の花が ________ 後の道は、まるでピンクのじゅうたんみたいだ。",
                "options": [
                  "ちった",
                  "かれた",
                  "さいた",
                  "ひらいた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ちった"
                },
                "explanation": "Question 279 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問15 私は留学生 ________ 日本に来ましたが、日本で就職をして、結婚もしました。",
                "options": [
                  "として",
                  "としたら",
                  "としては",
                  "としても"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "として"
                },
                "explanation": "Question 280 (GENERAL). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d3",
        "title": "Week 3 - Day 3",
        "type": "questions-only",
        "description": "Week 3 Day 3: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 3 - Day 3",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 地震情報です。今日午前 7 時 13 分に地震がありました。",
                "options": [
                  "じんしん",
                  "じしん",
                  "じっしん",
                  "ちしん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "じんしん"
                },
                "explanation": "Question 281 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問2 洗濯物は、乾いたら ________ たたんで、しまいましょう。",
                "options": [
                  "しいんと",
                  "わざと",
                  "きちんと",
                  "そっと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しいんと"
                },
                "explanation": "Question 282 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問3 もし休みが ________ 、旅行には行かずに家でのんびりしたいです。",
                "options": [
                  "取れたにしたら",
                  "取れたとしても",
                  "取れたにすれば",
                  "取れたとしては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "取れたにしたら"
                },
                "explanation": "Question 283 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問4 この植物は葉のかたちがかわいいので、インテリアとして人気がある。",
                "options": [
                  "形",
                  "型",
                  "刑",
                  "列"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "形"
                },
                "explanation": "Question 284 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問5 おみやげを買いすぎて、スーツケースに全部 ________ ことができない。",
                "options": [
                  "つめる",
                  "つまる",
                  "つつむ",
                  "つもる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "つめる"
                },
                "explanation": "Question 285 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問6 学校を辞めました。 ________ 、父が亡くなって働かなければならないからです。",
                "options": [
                  "というと",
                  "というのは",
                  "というならば",
                  "ということは"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "というと"
                },
                "explanation": "Question 286 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問7 係員に整理券をもらえば、並んで待たなくてもいいそうです。",
                "options": [
                  "えらんで",
                  "まなんで",
                  "ならんで",
                  "にらんで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "えらんで"
                },
                "explanation": "Question 287 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問8 今の仕事は、内容は気に入っているが、給料については ________ だ。",
                "options": [
                  "不要",
                  "不幸",
                  "不平",
                  "不満"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "不要"
                },
                "explanation": "Question 288 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問9 ________ 、この手紙を出してきてくれませんか。",
                "options": [
                  "散歩のままで",
                  "散歩した最中に",
                  "散歩のついでに",
                  "散歩している中"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "散歩のままで"
                },
                "explanation": "Question 289 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問10 投手はよく投げたが、最後にホームランを打たれてまけてしまった。",
                "options": [
                  "負けて",
                  "無けて",
                  "失けて",
                  "欠けて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "負けて"
                },
                "explanation": "Question 290 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問11 上司の私に向かって、そんな失礼なことを言うのは ________ だ。",
                "options": [
                  "いじわる",
                  "げひん",
                  "なまいき",
                  "のんき"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いじわる"
                },
                "explanation": "Question 291 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問12 今朝、牛乳を ________ 気持ちが悪くなって吐いた。",
                "options": [
                  "飲むところに",
                  "飲むたびに",
                  "飲んだとたんに",
                  "飲んだながら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "飲むところに"
                },
                "explanation": "Question 292 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問13 私は経済に関する記事をよく読みます。",
                "options": [
                  "かいざい",
                  "かいさい",
                  "けいざい",
                  "けいさい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かいざい"
                },
                "explanation": "Question 293 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問14 田中さんに結婚を申し込まれたけれど、はっきり ________ つもりです。",
                "options": [
                  "ことわる",
                  "きらう",
                  "いやがる",
                  "つきあえない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ことわる"
                },
                "explanation": "Question 294 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問15 A「Bさんは泳げますか。」 B「 ________ が、ぜんぜん速くないです。」",
                "options": [
                  "泳げるつもりです",
                  "泳げることは泳げます",
                  "泳げるかもしれません",
                  "泳げるかどうか知りません"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "泳げるつもりです"
                },
                "explanation": "Question 295 (GENERAL). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d4",
        "title": "Week 3 - Day 4",
        "type": "questions-only",
        "description": "Week 3 Day 4: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 3 - Day 4",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 A「この毛糸のセーター、いい香りがするね。」\nB「うん、これで洗ったの。」",
                "options": [
                  "もうふ",
                  "もうし",
                  "けえと",
                  "けいと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "もうふ"
                },
                "explanation": "Question 296 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問2 隣の家のテレビがうるさいので、 ________ を言いに行った。",
                "options": [
                  "文句",
                  "わがまま",
                  "不平",
                  "話し合い"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "文句"
                },
                "explanation": "Question 297 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問3 その学生は、漢字 ________ 、ひらがなもカタカナも書けません。",
                "options": [
                  "だけで",
                  "もちろん",
                  "ぐらいでなく",
                  "ばかりか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だけで"
                },
                "explanation": "Question 298 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問4 畑にたねをまく。",
                "options": [
                  "草",
                  "種",
                  "根",
                  "豆"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "草"
                },
                "explanation": "Question 299 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問5 田舎の母に電話したが、 ________ 。心配だ。",
                "options": [
                  "とどかない",
                  "つながらない",
                  "もどらない",
                  "そろわない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とどかない"
                },
                "explanation": "Question 300 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問6 一年生は全員、この授業を受ける ________ 。",
                "options": [
                  "ことらしい",
                  "ことのようだ",
                  "ことをしている",
                  "ことになっている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ことらしい"
                },
                "explanation": "Question 301 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問7 非常階段はあそこです。",
                "options": [
                  "ひじょうかいだん",
                  "いじょうかいだん",
                  "ひじょうけいだん",
                  "いじょうけいだん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひじょうかいだん"
                },
                "explanation": "Question 302 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問8 停電なのか、電気が消えて ________ 何も見えない。",
                "options": [
                  "まっくろで",
                  "うすくらくて",
                  "まっくらで",
                  "うすぐろくて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まっくろで"
                },
                "explanation": "Question 303 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問9 気に入った靴があったけど、買えなかったよ。 ________ 。",
                "options": [
                  "高かっただけ",
                  "高かったんだって",
                  "高かったとか",
                  "高かったんだもん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "高かっただけ"
                },
                "explanation": "Question 304 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問10 勝ったチームだけでなく、どのチームもよくたたかった。",
                "options": [
                  "戦った",
                  "争った",
                  "競った",
                  "健った"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "戦った"
                },
                "explanation": "Question 305 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問11 夜中に起きて水を飲むのが ________ しまった。",
                "options": [
                  "くりかえして",
                  "ためになって",
                  "くせになって",
                  "あたりまえにして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くりかえして"
                },
                "explanation": "Question 306 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問12 今日のコンサート、何時から ________ ？",
                "options": [
                  "だっけ",
                  "とか",
                  "っぽい",
                  "なあ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だっけ"
                },
                "explanation": "Question 307 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問13 この会社は家具や食器を製造している。",
                "options": [
                  "せいぞう",
                  "せいじょう",
                  "そうぞう",
                  "そうじょう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "せいぞう"
                },
                "explanation": "Question 308 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問14 今日は暑かった。早くシャワーを浴びて ________ したい。",
                "options": [
                  "あっさり",
                  "こっそり",
                  "さっぱり",
                  "すっかり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あっさり"
                },
                "explanation": "Question 309 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問15 私は 1995 年 a ________ 2000 年 b ________ 、ニューヨークに住んでいました。",
                "options": [
                  "a. いじょう　b. にかけて",
                  "a. にわたり　b. まで",
                  "a. から　b. にかけて",
                  "a. より　b. わたり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "a. いじょう　b. にかけて"
                },
                "explanation": "Question 310 (GENERAL). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d5",
        "title": "Week 3 - Day 5",
        "type": "questions-only",
        "description": "Week 3 Day 5: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 3 - Day 5",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 国際会議で決まったことを報告する。",
                "options": [
                  "こくせい",
                  "こくぜい",
                  "こくさつ",
                  "こくさい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こくせい"
                },
                "explanation": "Question 311 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問2 早く仕事を ________ 、飲みに行こう。",
                "options": [
                  "終わられて",
                  "済ませて",
                  "仕上がらせて",
                  "できあげて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "終わられて"
                },
                "explanation": "Question 312 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問3 ________ 、私は彼と結婚します。",
                "options": [
                  "たとえ親が反対したら",
                  "たとえば親に反対したら",
                  "たとえ親に反対されても",
                  "たとえ親が反対されても"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "たとえ親が反対したら"
                },
                "explanation": "Question 313 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問4 トイレを使ったら、ここを押して水をながしてください。",
                "options": [
                  "流して",
                  "移して",
                  "過して",
                  "汚して"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "流して"
                },
                "explanation": "Question 314 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問5 もう、5 時だ。夕飯の ________ をしなくちゃ。",
                "options": [
                  "しあがり",
                  "かたづけ",
                  "ようじ",
                  "したく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しあがり"
                },
                "explanation": "Question 315 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問6 その学生は、講義を最後まで聞かない ________ 教室を出て行った。",
                "options": [
                  "あいだに",
                  "うちに",
                  "までに",
                  "最中に\nHere are the extracted questions and options from the final set of images, organized by page for your document."
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あいだに"
                },
                "explanation": "Question 316 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問7 科学技術の発達とともに、解決すべき問題も生じている。",
                "options": [
                  "はいたつ",
                  "はったつ",
                  "はたつ",
                  "はだつ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "はいたつ"
                },
                "explanation": "Question 317 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問8 勉強しろ、勉強しろって、あんまり ________ 言われると、やる気がなくなるよ。",
                "options": [
                  "くわしく",
                  "うるさく",
                  "けわしく",
                  "ばからしく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くわしく"
                },
                "explanation": "Question 318 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問9 そんなに夜遅く、子どもを ________ 。",
                "options": [
                  "外出させないわけだ",
                  "外出させるわけではない",
                  "外出させないべきだ",
                  "外出させるべきではない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "外出させないわけだ"
                },
                "explanation": "Question 319 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問10 すみません、しおを取ってください。",
                "options": [
                  "砂",
                  "油",
                  "塩",
                  "乳"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "砂"
                },
                "explanation": "Question 320 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問11 A「今、お茶をお持ちします。」\nB「どうぞ ________ 。」",
                "options": [
                  "おかまいなく",
                  "ごえんりょなく",
                  "けっこうです",
                  "ご苦労様です"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おかまいなく"
                },
                "explanation": "Question 321 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問12 明日は一年に一回の試験だから、 ________ 。",
                "options": [
                  "休むわけではない",
                  "休まないわけはない",
                  "休むわけにはいかない",
                  "休まないわけではない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "休むわけではない"
                },
                "explanation": "Question 322 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問13 地球温暖化を防ぐ方法を話し合った。",
                "options": [
                  "いそぐ",
                  "あおぐ",
                  "ふせぐ",
                  "かつぐ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いそぐ"
                },
                "explanation": "Question 323 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問14 さあ、あとはねぎを細かく ________ 、のせるだけです。",
                "options": [
                  "いためて",
                  "むいて",
                  "むして",
                  "きざんで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いためて"
                },
                "explanation": "Question 324 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問15 英語は ________ ですが、発音も悪いし下手なんです。",
                "options": [
                  "話せえる",
                  "話せえない",
                  "話せることもない",
                  "話せないことはない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "話せえる"
                },
                "explanation": "Question 325 (GENERAL). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d6",
        "title": "Week 3 - Day 6",
        "type": "questions-only",
        "description": "Week 3 Day 6: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 3 - Day 6",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 たいていの冷蔵庫には冷凍庫が付いている。",
                "options": [
                  "でいとうこ",
                  "れいとうこ",
                  "でいぞうこ",
                  "れいぞうこ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "でいとうこ"
                },
                "explanation": "Question 326 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問2 そんなぜいたくなものは、自分で ________ ようになってから買いなさい。",
                "options": [
                  "かせぐ",
                  "もうかる",
                  "とくをする",
                  "おごる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かせぐ"
                },
                "explanation": "Question 327 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問3 先生の ________ 、日本語の勉強が楽しくなりました。",
                "options": [
                  "おかげで",
                  "せいで",
                  "ためで",
                  "くせに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おかげで"
                },
                "explanation": "Question 328 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問4 このラベルには値段やその他、しょうひんに関する情報が書いてあります。",
                "options": [
                  "賞品",
                  "製品",
                  "食品",
                  "商品"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "賞品"
                },
                "explanation": "Question 329 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問5 A「田中さん、格好いいから女の子がたくさん寄ってくるでしょう。」\nB「とんでもない。まったく ________ んですよ。」",
                "options": [
                  "気がない",
                  "ふられる",
                  "もてない",
                  "いやがられる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "気がない"
                },
                "explanation": "Question 330 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問6 ぼくが東大を受けても落ちる ________ 。",
                "options": [
                  "にちがいない",
                  "にきまっている",
                  "ことがちがいない",
                  "ようきまっている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にちがいない"
                },
                "explanation": "Question 331 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問7 修理が完了したら、営業を再開します。",
                "options": [
                  "しょり",
                  "しゅり",
                  "しゅうり",
                  "しょうり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しょり"
                },
                "explanation": "Question 332 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問8 A「大きい犬なのに、下を見て ________ いるよ。」\nB「人間が怖いんじゃない？」",
                "options": [
                  "ゆれて",
                  "なでて",
                  "ふるえて",
                  "なめて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ゆれて"
                },
                "explanation": "Question 333 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問9 熱が高いので病院に行った ________ 、インフルエンザだと言われた。",
                "options": [
                  "ところ",
                  "ところに",
                  "ところへ",
                  "ところを"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ところ"
                },
                "explanation": "Question 334 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問10 笑っているようになく鳥がいる。",
                "options": [
                  "泣く",
                  "拉く",
                  "鳴く",
                  "嶋く"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "泣く"
                },
                "explanation": "Question 335 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問11 そんなに目を ________ だめよ。アレルギーの薬、ちゃんと飲んでる？",
                "options": [
                  "こすっちゃ",
                  "ひねっちゃ",
                  "ほどいちゃ",
                  "つまっちゃ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こすっちゃ"
                },
                "explanation": "Question 336 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問12 今日の新聞 ________ 、今年の夏はいつもより暑いそうです。",
                "options": [
                  "によって",
                  "について",
                  "にとって",
                  "によると"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "によって"
                },
                "explanation": "Question 337 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問13 その 2 倍くらいの厚さに切って焼いてください。",
                "options": [
                  "あつさ",
                  "ひろさ",
                  "ふかさ",
                  "おもさ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あつさ"
                },
                "explanation": "Question 338 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問14 今日は、先輩におごってもらったし、くじ引きで 2 等が当たったし、 ________ なあ。",
                "options": [
                  "ましになった",
                  "ついてた",
                  "おしかった",
                  "うけてた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ましになった"
                },
                "explanation": "Question 339 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問15 このレストラン、有名な店 ________ 、あんまりおいしくないですね。",
                "options": [
                  "にしても",
                  "によっても",
                  "にしては",
                  "にとっては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にしても"
                },
                "explanation": "Question 340 (GENERAL). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w3-d7",
        "title": "Week 3 - Day 7 Review",
        "type": "day-challenge",
        "description": "Week 3 Day 7: Comprehensive review of the week's exercises (35 questions).",
        "passages": [
          {
            "title": "Week 3 - Day 7 Review",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 誕生日に人形をもらいました。",
                "options": [
                  "にんぎょ",
                  "にんぎょう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にんぎょ"
                },
                "explanation": "Question 341 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問2 土産にこうすいを買ってきた。",
                "options": [
                  "香水",
                  "幸水"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "香水"
                },
                "explanation": "Question 342 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問3 果物はビタミン C を多く ________ 。",
                "options": [
                  "集める",
                  "含む"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "集める"
                },
                "explanation": "Question 343 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問4 そんな仕事をだれも引き受けないのは、 ________ と思いますよ。",
                "options": [
                  "あたりまえだ",
                  "もうしわけない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あたりまえだ"
                },
                "explanation": "Question 344 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問5 リンさんは、クラスで一番よくできる。だから、試験に落ちる ________ 。",
                "options": [
                  "わけがない",
                  "わけにはいかない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "わけがない"
                },
                "explanation": "Question 345 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問6 中級の問題 ________ 、そんなに難しくありませんよ。",
                "options": [
                  "といっても",
                  "というより"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "といっても"
                },
                "explanation": "Question 346 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問7 店員には元気な人を求めます。",
                "options": [
                  "まとめます",
                  "もとめます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まとめます"
                },
                "explanation": "Question 347 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問8 せんそうがなくなってほしい。",
                "options": [
                  "競争",
                  "戦争"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "競争"
                },
                "explanation": "Question 348 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問9 この辺りは、雪が降っても ________ ことはほとんどありません。",
                "options": [
                  "つつむ",
                  "つもる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "つつむ"
                },
                "explanation": "Question 349 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問10 もう少し、塩か何かを入れたらどう？ ちょっと ________ しすぎているように思うよ。",
                "options": [
                  "あっさり",
                  "こっそり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あっさり"
                },
                "explanation": "Question 350 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問11 すごく楽しかったよ。あなたも一緒に ________ 。",
                "options": [
                  "来たらいいのに",
                  "来ればよかったのに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "来たらいいのに"
                },
                "explanation": "Question 351 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問12 ________ 、子供のことを心配するのは当然です。",
                "options": [
                  "親として",
                  "親ばかりか\nHere are the extracted questions and options from the remaining images, formatted for your document."
                ],
                "correctOption": {
                  "index": 0,
                  "text": "親として"
                },
                "explanation": "Question 352 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問13 断水のお知らせです。",
                "options": [
                  "だんすい",
                  "せっすい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だんすい"
                },
                "explanation": "Question 353 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問14 みらい社会を予想する。",
                "options": [
                  "未来",
                  "来未"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "未来"
                },
                "explanation": "Question 354 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問15 今日買えば 3 割引だったのに、昨日買って ________ よ。",
                "options": [
                  "そんしちゃった",
                  "そんになっちゃった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そんしちゃった"
                },
                "explanation": "Question 355 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問16 みかんもむいてほしいって、ずいぶん ________ なご主人ね。",
                "options": [
                  "なまいき",
                  "わがまま"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なまいき"
                },
                "explanation": "Question 356 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問17 駅に着いた ________ 忘れ物に気がついて、取りにもどった。",
                "options": [
                  "とちゅうに",
                  "とたんに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とちゅうに"
                },
                "explanation": "Question 357 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問18 もし、私の言うことが本当だった ________ 、あなたはどうしますか。",
                "options": [
                  "としても",
                  "としたら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "としても"
                },
                "explanation": "Question 358 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問19 植木に水をやる。",
                "options": [
                  "うえき",
                  "しょくもく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "うえき"
                },
                "explanation": "Question 359 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問20 宿題がすんだら、テレビを見る。",
                "options": [
                  "住んだ",
                  "済んだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "住んだ"
                },
                "explanation": "Question 360 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問21 まだ全員が ________ から、もう少し待ちましょう。",
                "options": [
                  "そろわない",
                  "まとまらない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そろわない"
                },
                "explanation": "Question 361 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問22 A「お茶、まだ？」\nB「まだお湯が ________ いないから、ちょっと待って。」",
                "options": [
                  "たいて",
                  "わいて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "たいて"
                },
                "explanation": "Question 362 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問23 A「田中さん、40 歳だって。」\nB「 ________ 若く見えるね。」",
                "options": [
                  "それにしては",
                  "それだけに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "それにしては"
                },
                "explanation": "Question 363 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問24 母はデパートに行く ________ 、ケーキを買ってくる。",
                "options": [
                  "たびに",
                  "最中に"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "たびに"
                },
                "explanation": "Question 364 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問25 必要なものは全部そろえた。",
                "options": [
                  "ひつよう",
                  "しつよう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひつよう"
                },
                "explanation": "Question 365 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問26 何しゅるいありますか。",
                "options": [
                  "書類",
                  "種類"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "書類"
                },
                "explanation": "Question 366 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問27 ________ ので、寄ってみました。",
                "options": [
                  "通り過ぎた",
                  "通りかかった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "通り過ぎた"
                },
                "explanation": "Question 367 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問28 A「どう？まだ頭が痛い？」\nB「さっきより ________ けど、まだ少しね。」",
                "options": [
                  "さっぱりした",
                  "ましになった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さっぱりした"
                },
                "explanation": "Question 368 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問29 A「来年試験を受けます。」\nB「 ________ 、今年は受けないということですね。」",
                "options": [
                  "というより",
                  "ということは"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "というより"
                },
                "explanation": "Question 369 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問30 この国の人々に ________ 一番の問題は、水が不足しているということだ。",
                "options": [
                  "とっての",
                  "対しての"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とっての"
                },
                "explanation": "Question 370 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問31 資料をコピーする。",
                "options": [
                  "しょるい",
                  "しりょう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しょるい"
                },
                "explanation": "Question 371 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問32 となりの席にうつる。",
                "options": [
                  "移る",
                  "写る"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "移る"
                },
                "explanation": "Question 372 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問33 そんなにしょんぼりしてどうしたの？彼女に ________ の？",
                "options": [
                  "ふられた",
                  "なめられた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ふられた"
                },
                "explanation": "Question 373 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問34 A「知っていたけれど、田中さんには教えなかった。」\nB「 ________ ねえ。」",
                "options": [
                  "いじわるだ",
                  "いやがる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いじわるだ"
                },
                "explanation": "Question 374 (GENERAL). Answer will be updated soon."
              },
              {
                "questionText": "問35 みなさんの応援の ________ 優勝できました。",
                "options": [
                  "おかげで",
                  "せいで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おかげで"
                },
                "explanation": "Question 375 (GENERAL). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d1",
        "title": "Week 4 - Day 1",
        "type": "questions-only",
        "description": "Week 4 Day 1: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 4 - Day 1",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 雲が広がり、風が吹いてきた。",
                "options": [
                  "ひいて",
                  "ふいて",
                  "すいて",
                  "はいて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひいて"
                },
                "explanation": "Question 376 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 ダイエットが成功したのか、彼女はとても ______ になったね。",
                "options": [
                  "ハンサム",
                  "ユニーク",
                  "ファッション",
                  "スマート"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ハンサム"
                },
                "explanation": "Question 377 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 先生 ______ あんな言い方をしたら失礼だよ。あやまったほうがいいよ。",
                "options": [
                  "にくらべて",
                  "にたいして",
                  "にしたら",
                  "にとって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "にくらべて"
                },
                "explanation": "Question 378 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 80円の切手を10枚ください。",
                "options": [
                  "箱",
                  "杯",
                  "冊",
                  "枚"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "箱"
                },
                "explanation": "Question 379 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 最近、お年寄りに席を ______ 若者が多いと思う。",
                "options": [
                  "まわさない",
                  "わたさない",
                  "ゆずらない",
                  "つながない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まわさない"
                },
                "explanation": "Question 380 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 明日、休んでいいですよ。 ______ 、あさっては必ず来てください。",
                "options": [
                  "そのかわりに",
                  "それにかんして",
                  "それにくわえて",
                  "それにたいして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そのかわりに"
                },
                "explanation": "Question 381 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 混んでいる通勤電車で、足を組んだり通路に荷物を置いたりすると、じゃまになる。",
                "options": [
                  "くんだり",
                  "ふんだり",
                  "うんだり",
                  "もんだり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くんだり"
                },
                "explanation": "Question 382 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 東京での生活は、家賃も高いし、 ______ です。",
                "options": [
                  "らく",
                  "きつい",
                  "はげしい",
                  "もったいない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "らく"
                },
                "explanation": "Question 383 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 こんなにたくさんの料理、いくらぼくでも食べ ______ よ。",
                "options": [
                  "かけない",
                  "たてない",
                  "きれない",
                  "おえない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かけない"
                },
                "explanation": "Question 384 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 あの件についての感想をお聞かせください。",
                "options": [
                  "案",
                  "事",
                  "件",
                  "題"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "案"
                },
                "explanation": "Question 385 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 A「車、混んでいるね。」 B「うん、全然進まないね。 ______ するよ。」",
                "options": [
                  "のろのろ",
                  "どきどき",
                  "ぎりぎり",
                  "いらいら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "のろのろ"
                },
                "explanation": "Question 386 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 日本では、北へ行けば行く ______ 寒くなります。",
                "options": [
                  "ほど",
                  "くらい",
                  "せいか",
                  "からか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ほど"
                },
                "explanation": "Question 387 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 うちでは娘も息子も一日に2回シャワーを浴びる。",
                "options": [
                  "おびる",
                  "わびる",
                  "なびる",
                  "あびる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おびる"
                },
                "explanation": "Question 388 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 ちょっと、この椅子を ______ くれる？ 掃除機かけるから。",
                "options": [
                  "どけて",
                  "かたづけて",
                  "はずして",
                  "くずして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "どけて"
                },
                "explanation": "Question 389 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 このパソコンは修理しても直らないのだから、捨てるより ______ 。",
                "options": [
                  "こそない",
                  "だけない",
                  "しかない",
                  "ほかない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こそない"
                },
                "explanation": "Question 390 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d2",
        "title": "Week 4 - Day 2",
        "type": "questions-only",
        "description": "Week 4 Day 2: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 4 - Day 2",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 資料を配りますから、参加者の人数を数えてください。",
                "options": [
                  "こばります",
                  "くばります",
                  "めくります",
                  "まくります"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こばります"
                },
                "explanation": "Question 391 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 にきびは、無理やり ______ とあとが残るから、さわらないように。",
                "options": [
                  "とかす",
                  "しぼる",
                  "つぶす",
                  "ひねる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "とかす"
                },
                "explanation": "Question 392 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 料理の本に ______ 作ったのに、おいしくなかった。",
                "options": [
                  "書いてあるとおりに",
                  "書いてあったどおりに",
                  "書くことをとおして",
                  "書くことをつうじて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "書いてあるとおりに"
                },
                "explanation": "Question 393 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 このくらいの計算なら、 ______ 慣れているので、まかせてください。",
                "options": [
                  "件せて",
                  "仕せて",
                  "任せて",
                  "在せて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "件せて"
                },
                "explanation": "Question 394 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 このごろすごく肩がこる。 ______ がたまっているせいかもしれない。",
                "options": [
                  "はやっている",
                  "たまっている",
                  "あつまっている",
                  "つもっている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "はやっている"
                },
                "explanation": "Question 395 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 ニュースによると、中国で大地震があった ______ 。",
                "options": [
                  "ものだ",
                  "ことだ",
                  "ということだ",
                  "というものだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ものだ"
                },
                "explanation": "Question 396 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 高い場所の掃除は危険ですから、注意してください。",
                "options": [
                  "しょうじ",
                  "そうじ",
                  "せいそう",
                  "さくじょ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しょうじ"
                },
                "explanation": "Question 397 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 海外旅行に行くから、だれかに猫を ______ もらわないといけない。",
                "options": [
                  "世話になって",
                  "そだてて",
                  "あたえて",
                  "あずかって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "世話になって"
                },
                "explanation": "Question 398 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 さっき雨が ______ 、もうやんでいます。",
                "options": [
                  "降ったかのようで",
                  "降ったかと思ったら",
                  "降っていると思うと",
                  "降ってないかのようで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "降ったかのようで"
                },
                "explanation": "Question 399 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 紹介します。つまと息子です。",
                "options": [
                  "夫人",
                  "妻",
                  "主人",
                  "家内"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "夫人"
                },
                "explanation": "Question 400 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 よくわかりません。もう少し ______ 説明してくれませんか。",
                "options": [
                  "くわしく",
                  "きびしく",
                  "けわしく",
                  "よろしく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くわしく"
                },
                "explanation": "Question 401 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 A「宝くじ ______ かなあ。」 B「お金のむだだよ。」",
                "options": [
                  "買うもの",
                  "買うこと",
                  "買おう",
                  "買うよう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "買うもの"
                },
                "explanation": "Question 402 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 授業の予定が変わった。",
                "options": [
                  "じぎょう",
                  "ずぎょう",
                  "じゅうぎょう",
                  "じゅぎょう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "じぎょう"
                },
                "explanation": "Question 403 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 スキーで ______ 足の骨を折ってしまった。",
                "options": [
                  "おちて",
                  "たおれて",
                  "ころんで",
                  "つぶれて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "おちて"
                },
                "explanation": "Question 404 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 国へ帰っても、私達のことを ______ ほしい。",
                "options": [
                  "覚えて",
                  "覚えないで",
                  "忘れて",
                  "忘れないで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "覚えて"
                },
                "explanation": "Question 405 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d3",
        "title": "Week 4 - Day 3",
        "type": "questions-only",
        "description": "Week 4 Day 3: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 4 - Day 3",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 彼女と結婚の約束をした。",
                "options": [
                  "よくそく",
                  "よっそく",
                  "やくそく",
                  "やっそく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "よくそく"
                },
                "explanation": "Question 406 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 ぼくは ______ で、姉が一人、兄が二人います。",
                "options": [
                  "ひとりっこ",
                  "すえっこ",
                  "ちょうなん",
                  "じなん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ひとりっこ"
                },
                "explanation": "Question 407 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 風邪がうつらない ______ 、マスクをします。",
                "options": [
                  "ために",
                  "ように",
                  "のそうに",
                  "とおりに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ために"
                },
                "explanation": "Question 408 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 船よりひこうきのほうが速い。",
                "options": [
                  "飛高機",
                  "飛行機",
                  "引行機",
                  "引高機"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "飛高機"
                },
                "explanation": "Question 409 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 この野菜は ______ 食べられません。ゆでるか焼くかしてください。",
                "options": [
                  "むいては",
                  "ままでは",
                  "なまでは",
                  "にては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "むいては"
                },
                "explanation": "Question 410 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 忙しくて寝る時間 ______ ないのに、遊びに行けるわけがない。",
                "options": [
                  "でも",
                  "ほど",
                  "さえ",
                  "だけ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "でも"
                },
                "explanation": "Question 411 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 大学で美術を勉強しています。",
                "options": [
                  "ぎじつ",
                  "ぎじゅつ",
                  "びじつ",
                  "びじゅつ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぎじつ"
                },
                "explanation": "Question 412 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 A「スニーカーのひもがほどけているよ。」 B「ほんとだ。 ______ から待って。」",
                "options": [
                  "ぬく",
                  "くっつける",
                  "むすぶ",
                  "ぬう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぬく"
                },
                "explanation": "Question 413 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 A「ちょっとお茶でも飲んで休もうか。」 B「お茶なんか要らない。 ______ なんかいられないよ。」",
                "options": [
                  "休んで",
                  "休む",
                  "休み",
                  "休んだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "休んで"
                },
                "explanation": "Question 414 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 橋をわたって、二つ目の角を右へ曲がると郵便局があります。",
                "options": [
                  "渡って",
                  "通って",
                  "進んで",
                  "沿って"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "渡って"
                },
                "explanation": "Question 415 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 車の事故にあったが、 ______ よかった。",
                "options": [
                  "気をつけて",
                  "いいかげんで",
                  "お気の毒で",
                  "大したことがなくて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "気をつけて"
                },
                "explanation": "Question 416 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 考えてもどうにもならない。忘れる ______ 。",
                "options": [
                  "しかない",
                  "だけない",
                  "からない",
                  "こそない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しかない"
                },
                "explanation": "Question 417 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 残念ですが、パーティーに出席できません。",
                "options": [
                  "さんれん",
                  "ざんれん",
                  "ざっねん",
                  "ざんねん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "さんれん"
                },
                "explanation": "Question 418 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 ______ が、どうぞお入りください。",
                "options": [
                  "片付けられません",
                  "散らかっています",
                  "きれいにしません",
                  "汚れてきます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "片付けられません"
                },
                "explanation": "Question 419 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 A「浅草 ______ 、何を思い浮かべますか。」 B「雷門、神輿、そしてスカイツリーかな。」",
                "options": [
                  "として",
                  "というと",
                  "といっても",
                  "といっては"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "として"
                },
                "explanation": "Question 420 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d4",
        "title": "Week 4 - Day 4",
        "type": "questions-only",
        "description": "Week 4 Day 4: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 4 - Day 4",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 自動販売機を使いたいので、1万円札を細かくしてくれませんか。",
                "options": [
                  "こまかく",
                  "みじかく",
                  "ほそかく",
                  "やわらかく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こまかく"
                },
                "explanation": "Question 421 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 この店の一日の ______ は、約10万円です。",
                "options": [
                  "売り場",
                  "売り上げ",
                  "売り切れ",
                  "売り出し"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "売り場"
                },
                "explanation": "Question 422 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 隅田川 ______ 花火大会が行われるため、交通機関は混雑するでしょう。",
                "options": [
                  "について",
                  "によって",
                  "にあたって",
                  "において"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "について"
                },
                "explanation": "Question 423 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 「本当に申しわけないが、今月は給料がはらえない。」",
                "options": [
                  "貰えない",
                  "払えない",
                  "賃えない",
                  "与えない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "貰えない"
                },
                "explanation": "Question 424 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 毎日体操をしないといけないのに、このごろ ______ 一週間もしないこともある。",
                "options": [
                  "へらして",
                  "あきれて",
                  "はぶいて",
                  "なまけて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "へらして"
                },
                "explanation": "Question 425 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 すみません、電車が遅れた ______ 、遅くなってしまいました。",
                "options": [
                  "ものですから",
                  "ことですから",
                  "んですから",
                  "わけですから"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ものですから"
                },
                "explanation": "Question 426 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 この辺は自然がゆたかで、星もよく見えます。",
                "options": [
                  "しせん",
                  "じぜん",
                  "しぜん",
                  "じせん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しせん"
                },
                "explanation": "Question 427 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 セーターはハンガーに ______ 、ネットの上で広げて乾かしてください。",
                "options": [
                  "まとめないで",
                  "つるさないで",
                  "たたまないで",
                  "かためないで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まとめないで"
                },
                "explanation": "Question 428 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 ここは桜の花がとても ______ ことから、桜が丘と呼ばれるようになった。",
                "options": [
                  "きれい",
                  "きれいな",
                  "きれいだ",
                  "きれいの"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きれい"
                },
                "explanation": "Question 429 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 農家の人から、卵やはたけでとれた野菜をもらった。",
                "options": [
                  "畑",
                  "田",
                  "苗",
                  "細"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "畑"
                },
                "explanation": "Question 430 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 彼は性格がいいだけでなく、礼儀 ______ からみんなに好かれている。",
                "options": [
                  "いい",
                  "ある",
                  "ただしい",
                  "おおい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "いい"
                },
                "explanation": "Question 431 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 忘れ物をしないように、私はいつも前の日に準備しておく ______ 。",
                "options": [
                  "べきます",
                  "わけにはいかない",
                  "ことです",
                  "ようにしている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "べきます"
                },
                "explanation": "Question 432 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 この学校の生徒たちは政治について深い関心を持っている。",
                "options": [
                  "せいち",
                  "せいじ",
                  "しょうち",
                  "しょうじ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "せいち"
                },
                "explanation": "Question 433 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 ああ、大変！お風呂が ______ いるよ。",
                "options": [
                  "こぼれて",
                  "あふれて",
                  "わいて",
                  "たまって"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "こぼれて"
                },
                "explanation": "Question 434 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 A「今度、プールに行かない？」 B「ごめん、ぼく、______ 泳げないんだよ。」",
                "options": [
                  "まったく",
                  "けっして",
                  "めったに",
                  "ぜったいに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まったく"
                },
                "explanation": "Question 435 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d5",
        "title": "Week 4 - Day 5",
        "type": "questions-only",
        "description": "Week 4 Day 5: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 4 - Day 5",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 日本語能力試験の N3 というのは、日常の会話や読み書きが可能なレベルです。",
                "options": [
                  "かのう",
                  "くのう",
                  "かのん",
                  "くのん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かのう"
                },
                "explanation": "Question 436 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 雨にぬれないように、自転車にカバーを ______ 。",
                "options": [
                  "かさねた",
                  "つつんだ",
                  "ほした",
                  "かぶせた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かさねた"
                },
                "explanation": "Question 437 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 A「もう食べないの？」 B「 ______ 、おなかがいっぱいなんだもん。」",
                "options": [
                  "だって",
                  "それで",
                  "ただし",
                  "つまり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "だって"
                },
                "explanation": "Question 438 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 しつれいですが、年齢や職業も書いていただけませんか。（失礼）",
                "options": [
                  "欠礼",
                  "無礼",
                  "失礼",
                  "非礼"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "欠礼"
                },
                "explanation": "Question 439 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 子供は親の ______ 育ちます。",
                "options": [
                  "ふりをして",
                  "まねをして",
                  "世話をして",
                  "あとについて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ふりをして"
                },
                "explanation": "Question 440 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 今晩、家で食べる？ ______ レストランへ行く？",
                "options": [
                  "それなら",
                  "それに",
                  "それとも",
                  "そういえば"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "それなら"
                },
                "explanation": "Question 441 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 この電車は快速です。次の駅で各駅停車に乗り換えましょう。",
                "options": [
                  "けいそく",
                  "こうそく",
                  "けっそく",
                  "かいそく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "けいそく"
                },
                "explanation": "Question 442 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 A「パトカーが止まっていますが、あの店で何かあったんですか。」 B「客が店で ______ らしいですよ。」",
                "options": [
                  "よっぱらった",
                  "もりあがった",
                  "あふれている",
                  "あばれている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "よっぱらった"
                },
                "explanation": "Question 443 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 田中さんは、______ 旅館のような大きい家に住んでいます。",
                "options": [
                  "たとえ",
                  "必ず",
                  "まるで",
                  "もしかすると"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "たとえ"
                },
                "explanation": "Question 444 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 改札口の近くに精算機があって、IC カードにお金の追加ができます。",
                "options": [
                  "改礼口",
                  "改札口",
                  "政札口",
                  "政礼口"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "改礼口"
                },
                "explanation": "Question 445 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 ______ チーズに野菜をつけて食べてください。",
                "options": [
                  "といた",
                  "とかした",
                  "くずした",
                  "くずれた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "といた"
                },
                "explanation": "Question 446 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 雨がひどくなってきた。 ______ 、雷も鳴り始めている。",
                "options": [
                  "そのため",
                  "そのうえ",
                  "それなのに",
                  "それでも"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そのため"
                },
                "explanation": "Question 447 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 あれは消防署で、その向こうが警察署です。",
                "options": [
                  "けいさい",
                  "かいさつ",
                  "けいさつ",
                  "かいさい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "けいさい"
                },
                "explanation": "Question 448 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 A「またこわしたの？」 B「ごめんなさい。でも、______ じゃないよ。」",
                "options": [
                  "わざと",
                  "わざわざ",
                  "わりと",
                  "わりに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "わざと"
                },
                "explanation": "Question 449 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 係員の指示通りに並んで待った。 ______ 、チケット販売は突然中止された。",
                "options": [
                  "ところが",
                  "ところに",
                  "ところで",
                  "ところを"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ところが"
                },
                "explanation": "Question 450 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d6",
        "title": "Week 4 - Day 6",
        "type": "questions-only",
        "description": "Week 4 Day 6: 15 vocabulary and grammar exercises.",
        "passages": [
          {
            "title": "Week 4 - Day 6",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 いろいろなサインがありますね。「禁煙」「駐車禁止」「両替」…。",
                "options": [
                  "きんえん",
                  "きんねん",
                  "きえん",
                  "きねん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きんえん"
                },
                "explanation": "Question 451 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 3年ほどタイで生活をしましたが、なかなか ______ 経験でした。",
                "options": [
                  "えられない",
                  "手に入らない",
                  "すごせない",
                  "なれない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "えられない"
                },
                "explanation": "Question 452 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問3 りんごをください。それと、みかんも。 ______ 、バナナも。",
                "options": [
                  "もう",
                  "さらに",
                  "それで",
                  "あと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "もう"
                },
                "explanation": "Question 453 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問4 海岸のゴミ拾いを一緒にしませんか。",
                "options": [
                  "すくい",
                  "ひろい",
                  "せまい",
                  "おおい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "すくい"
                },
                "explanation": "Question 454 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問5 彼のアドバイスのおかげで、悩みが ______ 解決した。",
                "options": [
                  "そっくり",
                  "ふと",
                  "ものすごく",
                  "いっぺんに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そっくり"
                },
                "explanation": "Question 455 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問6 美人が必ずしも幸せになれる ______ 。",
                "options": [
                  "に限る",
                  "限りだ",
                  "とは限らない",
                  "には限りがある"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "に限る"
                },
                "explanation": "Question 456 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 カレーのルーには甘いのと辛いのがあります。うちでは両方を混ぜて使います。",
                "options": [
                  "まぜて",
                  "なぜて",
                  "のぜて",
                  "もぜて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "まぜて"
                },
                "explanation": "Question 457 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 彼は上司にどんなにひどいことを言われても、______ がまんをした。",
                "options": [
                  "じっと",
                  "そっと",
                  "ざっと",
                  "きっと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "じっと"
                },
                "explanation": "Question 458 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問9 新聞やテレビの言うことなど、______ 信じられない。",
                "options": [
                  "少しは",
                  "少しも",
                  "少しでも",
                  "少しぐらい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "少しは"
                },
                "explanation": "Question 459 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問10 国がこいしい。",
                "options": [
                  "久しい",
                  "愛しい",
                  "等しい",
                  "恋しい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "久しい"
                },
                "explanation": "Question 460 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問11 日本語の学習者が増えている。これから日本語能力試験の受験者も ______ 増えるだろう。",
                "options": [
                  "そろそろ",
                  "ますます",
                  "まあまあ",
                  "のろのろ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そろそろ"
                },
                "explanation": "Question 461 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問12 たとえ家を ______ 、健康なら生きていける。",
                "options": [
                  "なくしても",
                  "なくしては",
                  "なくしたら",
                  "なくしながら"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "なくしても"
                },
                "explanation": "Question 462 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 家族を空港に迎えに行きますので、早退させていただけませんか。",
                "options": [
                  "むかえ",
                  "うかえ",
                  "ぬかえ",
                  "もかえ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "むかえ"
                },
                "explanation": "Question 463 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 ______ 言うと、私はあんまり英語ができません。",
                "options": [
                  "すなおに",
                  "まじめに",
                  "てきとうに",
                  "しょうじきに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "すなおに"
                },
                "explanation": "Question 464 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問15 ______ ほめない人にほめられるとうれしい。",
                "options": [
                  "めったに",
                  "たまに",
                  "けっして",
                  "かなりに"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "めったに"
                },
                "explanation": "Question 465 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      },
      {
        "id": "w4-d7",
        "title": "Week 4 - Day 7 Review",
        "type": "day-challenge",
        "description": "Week 4 Day 7: Comprehensive review of the week's exercises (35 questions).",
        "passages": [
          {
            "title": "Week 4 - Day 7 Review",
            "passageText": "",
            "questions": [
              {
                "questionText": "問1 本を3さつ読みました。",
                "options": [
                  "冊",
                  "枚"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "冊"
                },
                "explanation": "Question 466 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問2 今夜、おもしろいテレビばんぐみがある。",
                "options": [
                  "晩組",
                  "番組"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "晩組"
                },
                "explanation": "Question 467 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問3 1万円札、______ くれませんか。",
                "options": [
                  "くずれて",
                  "くずして"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くずれて"
                },
                "explanation": "Question 468 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問4 A「あれ、いつものゲーム、していないの？」 B「やりすぎて、もう ______ よ。」",
                "options": [
                  "あきちゃった",
                  "あきれちゃった"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あきちゃった"
                },
                "explanation": "Question 469 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問5 じゅうぶん間に合うから、あわてる ______ 。",
                "options": [
                  "ことだ",
                  "ことはない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ことだ"
                },
                "explanation": "Question 470 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問6 漢字は勉強すればする ______ おもしろい。",
                "options": [
                  "ほど",
                  "くらい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ほど"
                },
                "explanation": "Question 471 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問7 泳ぐ前と後にシャワーをあびる。",
                "options": [
                  "涼びる",
                  "浴びる"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "涼びる"
                },
                "explanation": "Question 472 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問8 そうじと洗濯が終わったら買い物に行く。",
                "options": [
                  "掃除",
                  "婦除"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "掃除"
                },
                "explanation": "Question 473 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問9 ______ いない犬が多くて困る。",
                "options": [
                  "そだてられて",
                  "しつけられて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "そだてられて"
                },
                "explanation": "Question 474 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問10 おとなしくしていて、______ 子供だね。",
                "options": [
                  "行儀のいい",
                  "行儀正しい"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "行儀のいい"
                },
                "explanation": "Question 475 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問11 昨日、騒いで声を出しすぎた ______ 、のどが痛い。",
                "options": [
                  "くせに",
                  "せいか"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くせに"
                },
                "explanation": "Question 476 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問12 ここまできたら ______ から、とにかくやってみよう。",
                "options": [
                  "やるしかない",
                  "やってもしかたない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "やるしかない"
                },
                "explanation": "Question 477 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問13 危険ですから、入ってはいけません。",
                "options": [
                  "きけん",
                  "きげん"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "きけん"
                },
                "explanation": "Question 478 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問14 歯医者を予約する。",
                "options": [
                  "よやく",
                  "ようやく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "よやく"
                },
                "explanation": "Question 479 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問15 長い間使っていた掃除機だったが、______ 壊れてしまった。",
                "options": [
                  "やっと",
                  "とうとう"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "やっと"
                },
                "explanation": "Question 480 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問16 A「今日、遅刻したんじゃない？」 B「 ______ だったけれど、間に合ったよ。」",
                "options": [
                  "ぎりぎり",
                  "どきどき"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ぎりぎり"
                },
                "explanation": "Question 481 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問17 田中さんから電話があったのは、私が夕飯を ______ ときだった。",
                "options": [
                  "食べようとする",
                  "食べかけた"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "食べようとする"
                },
                "explanation": "Question 482 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問18 この小説は短いので、一日で ______ でしょう。",
                "options": [
                  "読みきれる",
                  "読みっきり"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "読みきれる"
                },
                "explanation": "Question 483 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問19 むすこを育てる。",
                "options": [
                  "息子",
                  "島子"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "息子"
                },
                "explanation": "Question 484 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問20 最後に塩を加えます。",
                "options": [
                  "くわえます",
                  "こわえます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "くわえます"
                },
                "explanation": "Question 485 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問21 いくらかせいでも、お金は ______ 。",
                "options": [
                  "つもらない",
                  "たまらない"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "つもらない"
                },
                "explanation": "Question 486 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問22 テレビが見えないから、そこ、 ______ よ。",
                "options": [
                  "ゆずって",
                  "どいて"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ゆずって"
                },
                "explanation": "Question 487 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問23 どこへ行っていたの？どんなにさがした ______ 。",
                "options": [
                  "ことか",
                  "ことだ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ことか"
                },
                "explanation": "Question 488 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問24 さっきは電話に出られなくてごめんなさい。ちょっと手が離せなかった ______ 。",
                "options": [
                  "んだもん",
                  "ものだから"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "んだもん"
                },
                "explanation": "Question 489 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問25 数を数えます。",
                "options": [
                  "かずえます",
                  "かぞえます"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "かずえます"
                },
                "explanation": "Question 490 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問26 国によってしゅうかんが違う。",
                "options": [
                  "習慣",
                  "週刊"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "習慣"
                },
                "explanation": "Question 491 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問27 外にまでお客さんが ______ けれど、特別なセールなのかな。",
                "options": [
                  "あふれている",
                  "もりあがっている"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "あふれている"
                },
                "explanation": "Question 492 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問28 間違いは ______ 認めたほうがいいよ。",
                "options": [
                  "素直に",
                  "真面目に"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "素直に"
                },
                "explanation": "Question 493 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問29 あの人から返信がないなんて、______ 、メールを読んでいないのかもしれない。",
                "options": [
                  "もしかすると",
                  "かならずしも"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "もしかすると"
                },
                "explanation": "Question 494 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問30 彼は動物にくわしくて、______ 学者のようだ。",
                "options": [
                  "わりに",
                  "まるで"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "わりに"
                },
                "explanation": "Question 495 (BUNPOU). Answer will be updated soon."
              },
              {
                "questionText": "問31 彼は正直な人だ。",
                "options": [
                  "しょうじき",
                  "そっちょく"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "しょうじき"
                },
                "explanation": "Question 496 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問32 毛布を洗う。",
                "options": [
                  "もうふ",
                  "まおふ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "もうふ"
                },
                "explanation": "Question 497 (MOJI). Answer will be updated soon."
              },
              {
                "questionText": "問33 ______ 車で迎えに来てくださりありがとうございます。",
                "options": [
                  "わざと",
                  "わざわざ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "わざと"
                },
                "explanation": "Question 498 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問34 さっきから、あの人に ______ 見られていて嫌だ。",
                "options": [
                  "じっと",
                  "ざっと"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "じっと"
                },
                "explanation": "Question 499 (GOI). Answer will be updated soon."
              },
              {
                "questionText": "問35 しめきりに間に合う ______ 必死でレポートを書き上げた。",
                "options": [
                  "ために",
                  "ように"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ために"
                },
                "explanation": "Question 500 (BUNPOU). Answer will be updated soon."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "shinkanzen-master-n3-reading",
    "title": "JLPT Shinkanzen Master N3 Reading",
    "description": "Improve your Japanese reading comprehension. Practice short, medium, and long passages along with email/information retrieval layouts.",
    "coverUrl": "",
    "level": "N3",
    "category": "Reading",
    "chapters": [
      {
        "id": "part-1",
        "title": "第1部 基礎力をつけよう",
        "type": "short-passage",
        "description": "Mastering the basics",
        "passages": [
          {
            "title": "第1部 問題1",
            "passageText": "私たちは、いろいろな場面に合わせて服を着替える。たとえばふだんはTシャツにジーンズの人も、パーティーのときはスーツやきれいな服を<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">①</span>着るのではないだろうか。</span>言葉も同じで、それぞれの場面などによって<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">②</span>使いわける。</span>\n\nたとえば、日本語は、話すときと書くときで文体が違う。また、書き言葉の中には「です・ます体」「だ体」「である体」などの文体がある。初級では、話し言葉の日本語を中心に<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">③</span>勉強してきた。</span>中級では書き言葉を学ぶことも増えてくる。「だ体」「である体」という文体も知っておけば、文章が<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">④</span>読みやすくなるだろう。</span>",
            "questions": [
              {
                "questionText": "問い この文章の内容と合っているものはどれか。",
                "options": [
                  "日本語にはさまざまな文体があり、場面などによって変えている。",
                  "中級の日本語では、書き言葉より話し言葉を中心に勉強する。",
                  "日本語では、書き言葉と話し言葉の文体がよく似ている。",
                  "日本語の話し言葉には、「です・ます体」「だ体」「である体」の文体がある。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "日本語にはさまざまな文体があり、場面などによって変えている。"
                },
                "explanation": "Official Answer Key verified."
              }
            ],
            "mondaiHeader": "問題1　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "第1部 問題2",
            "passageText": "リサイクルセンター見学実施報告書\n\n6月20日(土)教師2名が留学生12名を連れ、谷町にあるリサイクルセンターの見学を行った。\n\n谷町駅前に9時集合。リサイクルセンターまで<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">A</span>徒歩</span>で行く。9時10分<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">B</span>到着</span>。リサイクルセンター3階の会議室で、センター長にあいさつする。センターの職員からリサイクルについての説明があり、その後、質疑応答。ごみの分別クイズなども行う。\n\n職員の案内で施設見学。ペットボトルの再利用の説明を受ける。センターの祭りの日であったため、大型家具の引き取り<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>や展示・<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">C</span>販売</span>、壊れたおもちゃの<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">D</span>修理</span>、フリーマーケットなどが行われていた。20分の自由時間で留学生は買い物を楽しむことができた。\n\n11時に見学終了。センターの出口で解散。",
            "questions": [
              {
                "questionText": "問い この文章の内容と合っているものはどれか。",
                "options": [
                  "センターに着いて、まず施設の見学を行った。",
                  "センターでは家具を直してくれる。",
                  "留学生が買い物をする時間があった。",
                  "留学生はセンターの前に9時に集まった。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "留学生が買い物をする時間があった。"
                },
                "explanation": "Question 2. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題2　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1) 引き取り：いらなくなった物を受け取ること</p>"
          },
          {
            "title": "第1部 問題3",
            "passageText": "日本人はまじめでよく働くと言われる。そして日本の技術力は世界的にも高く評価されている。まじめで高い技術力を持つようになったのはなぜだろう。それは日本の資源の少なさに関係がある。\n\n日本は石油や鉄鉱石<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>など製品の原材料となる資源が少ない。そのために原材料を輸出して利益を得ることができないのだ。その代わりに海外からそれらを輸入し、自動車や電気製品などの製品を作り、それを輸出することによって利益を得ている。つまり、まじめに働き、技術力を高め、よい製品を作ることが、日本が利益を得るためには必要なのである。\n\n資源が少ないことは、国にとってはマイナスであるように見えるが、必ずしもそうとは言えない。日本においては、少ない資源のおかげでまじめな国民性が生まれ、高い技術力が育ったとも言えるからだ。",
            "questions": [
              {
                "questionText": "問い この文章の内容と合っているものはどれか。",
                "options": [
                  "日本はよい製品を輸入している。",
                  "資源が少ないから日本人は不幸だ。",
                  "資源が少ないから日本人はまじめになった。",
                  "日本は資源を輸出している。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "資源が少ないから日本人はまじめになった。"
                },
                "explanation": "Question 3. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題3　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1)鉄鉱石：鉄の原料となる石</p>"
          },
          {
            "title": "第1部 問題4",
            "passageText": "今朝は最悪だった。かけておいたはずの目覚まし時計が鳴らず、1時間も寝坊をしてしまったのだ。いつもは駅までウォーキングのつもりで30分歩いているのだが、もうそんな時間はない。バスを使うことにして、バス停に並んだ。しかし、今度はバスがなかなか来ない。時刻表には5分間隔と書いてあるのに、なんと20分も待たされてしまった。このままでは2時間近く遅刻してしまいそうだ。この前上司<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>から「余裕を持って来るように。」と言われたばかりなのに、ちっとも進歩しない。ああ、自分が怒られている様子が目に浮かぶ<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>。\n\n駅で大事なことに気がついた。今日は日曜日だったのだ。目覚まし時計が鳴らなかったのも、バスが平日の時刻表通りに来なかったのも、今日が日曜日だからだったのだ。よかった。怒られないで済む。しかし、ずいぶん無駄な心配をしてしまった。私は得をしたような、損をしたような複雑な気持ちで家までの道を30分歩いて帰った。",
            "questions": [
              {
                "questionText": "問い 「損をしたような」とあるが、なぜか。",
                "options": [
                  "急がなくてもいいのに急いでいろいろ心配してしまったから。",
                  "平日なのに日曜日だと思って寝坊をしてしまったから。",
                  "余裕をもって会社に着けなくて上司から怒られてしまったから。",
                  "急いだのにバスも電車も来なくて会社に遅れてしまったから。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "急がなくてもいいのに急いでいろいろ心配してしまったから。"
                },
                "explanation": "Question 4. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題4　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1) 上司: 会社で自分よりも地位が上の人</p><p>(注2) 目に浮かぶ: その様子が簡単に想像できる</p>"
          },
          {
            "title": "第1部 問題5",
            "passageText": "犬、猫、小鳥など、ペットにはさまざまな種類があるが、今では家族の一員として扱われることが多い。たとえば、以前、犬は家の外で飼われていたが、今では家の中で飼われることが多くなった。また、寒いときは服を着せたり、おもちゃを買ってやったり、病気になれば病院に連れて行ったりと、子どものように大切にされるようになっている。マンションでもペットが飼えるところが人気だ。\n\nこれが人間の子どもなら、大きくなるにつれてだんだん親に反抗することもあり、親が思うようにならないこともある。しかし、ペットはいつまでも小さな子どものような純粋な心のままで、飼う人をしたって<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>くる。それがかわいくてしかたがない存在になっているのではないだろうか。",
            "questions": [
              {
                "questionText": "問い この文章の内容と合っているものはどれか。",
                "options": [
                  "ペットが愛されるのは、小さな子どものような存在だからだ。",
                  "ペットは、家族の一員のように大切にしなければならない。",
                  "最近、ペットは人間の子ども以上に大切にされている。",
                  "ペットを子どものようにかわいがるのは、やめたほうがいい。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ペットが愛されるのは、小さな子どものような存在だからだ。"
                },
                "explanation": "Question 5. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題5　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1) したう：相手のことが好きで、離れずについてくる</p>"
          },
          {
            "title": "第1部 問題6",
            "passageText": "電車やバスに乗っていると、お年寄りや体の不自由な人に席を譲らない若者を見かけます。しかし、席を譲らない若者に<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">A</span>聞いてみると</span>、以前は譲ろうとしたことがあるが、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">B</span>断られてしまって</span>、その後はもう譲ろうという気持ちをなくしてしまったという人も多いのです。\n\n若い人にとって、知らない人に声をかけるのは少し緊張します。人に席を譲るのは少し勇気がいります。「どうぞ」と声をかけたときに、感謝のことばと笑顔が返ってくれば、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">C</span>次もまた譲ろう</span>という気持ちになります。だから、もし席を譲られたら、「その必要はない」と思っても、素直に座り、笑って「ありがとう」と<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">①</span>答えてあげてほしい</span>と思います。",
            "questions": [
              {
                "questionText": "問い ①答えてあげてほしいと思っているのはだれか。",
                "options": [
                  "お年寄りや体の不自由な人",
                  "席を譲らない若者",
                  "若い人",
                  "この文を書いた人"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "この文を書いた人"
                },
                "explanation": "Question 6. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題6　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "第1部 問題7",
            "passageText": "漢字は5万字ほどもあると言われているが、これを全部使うのは大変だ。そこで、日本では1981年にふだん使う漢字を1945字に決め、これを常用漢字と呼んでいた。そして、なるべくこの範囲で漢字を使うようにした。この常用漢字の数が2010年に1945字から2136字に増えた。どうしてだろうか。 それは、パソコンや携帯電話などの情報機器の発達により、手で書くのが難しかった漢字が簡単に表記<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>できるようになり、漢字の使用が増えたためである。たとえば、気分が沈んだ状態である「ゆううつ」ということばをメールで使う場合、「憂鬱」と漢字で表記する人が増えている。この「憂鬱」は新しく常用漢字になった漢字である。 しかし、日本に外国人が増加して、漢字が苦手な人もいるため、常用漢字を減らすべきだという意見もある。どのような漢字表記がよいのか、いつどこでどんな表記を使うのがいいか、さまざまな点から考えていかなければならないだろう。",
            "questions": [
              {
                "questionText": "問い 常用漢字の数が増えた理由は何か。",
                "options": [
                  "日本で生活したり、働いたりする外国人が増えているから。",
                  "漢字で書いたほうがわかりやすいから。",
                  "メールを使う人が増えたから。",
                  "情報機器が発達し、漢字の使用が増えたから。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "情報機器が発達し、漢字の使用が増えたから。"
                },
                "explanation": "Question 7. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題7　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1) 表記：文字などを使って、ことばを書き表すこと</p>"
          },
          {
            "title": "第1部 問題8",
            "passageText": "あなたの部屋はきちんと片づいていますか。ものが増えてくると、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">A</span>片づけ</span>に悩まされる人が多いと思いますが、片づけの専門家の小松さんは、片づけは、「<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">B</span>整理</span>」と「<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">C</span>整頓</span>」であると言っています。\n\n整理はいらないものを捨てること、整頓は使いやすいように置く、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">D</span>配置する</span>ことを意味します。\n\n整理は「出す」「分ける」「減らす」「しまう」という4つの動作に分けられます。例えば机の下の段の引き出しをきれいにしようと決めたら、そこに入っているものを全部「出す」。次に、出したものを必要か、必要ではないかに「分ける」。さらに、必要ではないものを処分し<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>「減らす」。最後に、元にあった場所にものを「しまう」の4つです。\n\n片づけは「整理8割<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>、整頓2割」。「整理」に徹底的に取り組めば<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注3)</span>、8割が<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">E</span>終了している</span>と言えます。\\n\\n<div class=\"text-right text-sm text-gray-600 dark:text-gray-400 mt-4\">(小松易『3秒でやる気にスイッチ！仕事が変わる「ひとこと片づけ術」』日本能率協会マネジメントセンターより)</div>",
            "questions": [
              {
                "questionText": "問い この文章を書いた人は、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\">片づけをするのに何が一番大切だと言っているか</span>。",
                "options": [
                  "引き出しをきれいにしておくこと",
                  "使ったものを元の場所にしまうこと",
                  "いらないものを減らすこと",
                  "ものを使いやすいように置くこと"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "いらないものを減らすこと"
                },
                "explanation": "Question 8. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題8　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1)処分する: いらなくなったものなどを捨てたり、売ったりする</p><p>(注2)8割: 80%</p><p>(注3)取り組む: 問題を解決するために熱心に何かをする</p>"
          },
          {
            "title": "第1部 問題9",
            "passageText": "「よい買い物をした」と思うのはどんなときでしょうか。安くてよいものが買えたとき、と答える人が多いかもしれません。\n\n確かに、よい品物を安く買えたとき、私たちはとてもうれしい気持ちになります。「安さ」「よさ」が買い物を満足させるとても大切な要素であることは間違いないでしょう。しかし、これ以外の理由で「よい買い物をした」と思える商品があります。寄付金つきの商品といって、その売り上げの一部がボランティア組織などへ寄付されるというものです。値段は安くはないですが、それを買うことで「困っている人の助けになる」ことができます。自分の好きなものが手に入り、同時に困っている人の助けになる。このときも「よい買い物をした」と思えるものです。",
            "questions": [
              {
                "questionText": "問い この文章で一番言いたいことは何か。",
                "options": [
                  "安くてよいものを買ったときだけ、よい買い物をしたと思える。",
                  "品物がよかったときだけ、よい買い物をしたと思える。",
                  "安くなくてもだれかの役に立つと、よい買い物をしたと思える。",
                  "品物が悪くてもだれかの役に立つと、よい買い物をしたと思える"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "安くなくてもだれかの役に立つと、よい買い物をしたと思える。"
                },
                "explanation": "Question 9. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題9　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1) 寄付: 困っている人などにお金や品物をあげること</p><p>(注2) ボランティア: お金のためではなく、社会に役立つことを進んでする人</p>"
          },
          {
            "title": "第1部 問題10",
            "passageText": "<div class=\"leading-relaxed whitespace-pre-wrap\">\n<div class=\"float-right ml-6 mb-4 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-40 flex flex-col items-center\">\n  <svg width=\"100\" height=\"180\" viewBox=\"0 0 100 180\" xmlns=\"http://www.w3.org/2000/svg\">\n    <!-- Top decorative piece -->\n    <path d=\"M 30 20 L 50 5 L 70 20 Z\" fill=\"#8B4513\" stroke=\"#5C2E0B\" stroke-width=\"2\"/>\n    <circle cx=\"50\" cy=\"5\" r=\"4\" fill=\"#D2B48C\"/>\n    \n    <!-- Main Clock Body -->\n    <path d=\"M 20 20 L 80 20 L 90 70 L 70 160 L 30 160 L 10 70 Z\" fill=\"#A0522D\" stroke=\"#5C2E0B\" stroke-width=\"3\"/>\n    \n    <!-- Inner face rim -->\n    <circle cx=\"50\" cy=\"55\" r=\"28\" fill=\"#FDF5E6\" stroke=\"#DAA520\" stroke-width=\"4\"/>\n    \n    <!-- Clock Hands & Center -->\n    <circle cx=\"50\" cy=\"55\" r=\"3\" fill=\"#333\"/>\n    <line x1=\"50\" y1=\"55\" x2=\"50\" y2=\"35\" stroke=\"#333\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n    <line x1=\"50\" y1=\"55\" x2=\"65\" y2=\"55\" stroke=\"#333\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n    \n    <!-- Clock Numbers (simplified markers) -->\n    <line x1=\"50\" y1=\"30\" x2=\"50\" y2=\"35\" stroke=\"#333\" stroke-width=\"2\"/>\n    <line x1=\"50\" y1=\"80\" x2=\"50\" y2=\"75\" stroke=\"#333\" stroke-width=\"2\"/>\n    <line x1=\"25\" y1=\"55\" x2=\"30\" y2=\"55\" stroke=\"#333\" stroke-width=\"2\"/>\n    <line x1=\"75\" y1=\"55\" x2=\"70\" y2=\"55\" stroke=\"#333\" stroke-width=\"2\"/>\n    \n    <!-- Pendulum Window -->\n    <rect x=\"35\" y=\"100\" width=\"30\" height=\"50\" rx=\"5\" fill=\"#2C1809\" stroke=\"#5C2E0B\" stroke-width=\"2\"/>\n    \n    <!-- Pendulum Rod & Bob -->\n    <line x1=\"50\" y1=\"90\" x2=\"50\" y2=\"135\" stroke=\"#DAA520\" stroke-width=\"2\"/>\n    <circle cx=\"50\" cy=\"135\" r=\"8\" fill=\"#DAA520\"/>\n  </svg>\n  <div class=\"mt-2 text-sm text-gray-700 dark:text-gray-300 flex items-center\">\n    <span class=\"mr-1\">⬅</span> ふりこ\n  </div>\n</div>\n1か月ぐらい前の夕方、ちょっと大きな地震がありました。そのとき、私も、一緒に住んでいる母も外出をしていて、家にはいませんでした。\n\nその晩のことです。私は何だかよく眠れなくて、ベッドでラジオを小さい音で聞きながらうとうと<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>していました。夜中に何回か古い柱時計<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>が鳴るのを聞いたように思いました。私はラジオの中で時計が鳴っているんだと思いました。\n\n<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">A</span>ところが</span>、次の朝、別の部屋で寝ていた母が言いました。「きのうの晩、柱時計が鳴る音が聞こえなかった？」「<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">B</span>まさか</span>。うちのは何年も使っていないんだもの。鳴るはずがないよ。」亡くなった父の部屋には古い柱時計があるのですが、ずっと動かしていませんでした。でも、母も時計の音を聞いたのです。<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\">私は不思議に思いました。</span>\n\n<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">C</span>そこで</span>、二人で時計のある部屋に行ってみると、時計はほんとうに動いていました。私たちはびっくりしましたが、すぐにわかりました。前の日の地震で家が揺れたとき、時計のふりこ<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注3)</span>も揺れ、自然に動き出して、時計が鳴ったのです。\n\n母は、父がこの時計を大切に使っていたことを思い出し、「この時計はまだ動くんだって伝えたかったのかもしれないね」と言って笑いました。それからは、またこの時計を動かして使っています。父も喜んでいるかもしれません。</div>",
            "questions": [
              {
                "questionText": "問い 私は不思議に思いました。とあるが、なぜか。",
                "options": [
                  "動いていないはずの時計の音が聞こえたから。",
                  "別の部屋にいた母がラジオの時計의音を聞いていたから。",
                  "母が父の使っていた時計を動かしていたから。",
                  "亡くなった父の時計が止まっていたから。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "動いていないはずの時計の音が聞こえたから。"
                },
                "explanation": "Question 10. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題10　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "imageSrc": "/images/image10.jpg",
            "passageLayout": "html",
            "passageNotes": "<p>(注1)うとうと：眠りが浅い様子</p><p>(注2)柱時計：イラスト参照</p><p>(注3)ふりこ：イラスト参照</p>"
          },
          {
            "title": "第1部 問題11",
            "passageText": "コーヒーを多く飲む人ほど、肌のしみ<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>ができにくいという研究結果がある。なぜコーヒーにそのような効果があるのだろうか。\n\nその仕組みは、こうである。\n\n太陽の光にあたると、人間の体内で「活性酸素」と呼ばれる物質ができる。これは、しみの原因となる物質「メラニン」を増やしてしまう。しかし、コーヒーにたくさん含まれる「ポリフェノール」という物質は活性酸素の働きを小さくしてくれるという。それで、コーヒーを飲む人はしみができにくいというわけだ。\n\nポリフェノールをたくさん含むコーヒーは、美容にいい飲み物だと言えそうだ。",
            "questions": [
              {
                "questionText": "問い この文章によると、活性酸素とはどんな物質か。",
                "options": [
                  "しみをできにくくする物質",
                  "ポリフェノールを増やす物質",
                  "メラニンを増やす物質",
                  "コーヒーの中に多く含まれる物質"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "メラニンを増やす物質"
                },
                "explanation": "Question 11. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題11　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1)しみ：顔や手などにできる茶色い点</p>",
            "imageSrc": "/images/image11.jpg"
          },
          {
            "title": "第1部 問題12",
            "passageText": "A: 冷房という技術は非常に素晴らしく、私たちは暑い夏に冷房のおかげでいろいろ助けられている。例えば、勉強でも仕事でも、暑い中、汗をかきながらやるよりも、涼しいところでやったほうがずっと快適だ。\n\nB: しかし、よいことばかりではない。実は、人の体温を調節する神経は5℃以上の急な変化を繰り返すことに弱いそうだ。夏の室外と室内の温度差は10℃以上になることもよくあり、そこを出たり入ったりしているうちに、この体温を調節する神経がうまく働かなくなることがあるのだ。その結果、疲れやすい、頭が痛いなど、さまざまな症状があらわれる。\n\nC: そうなると、さらに悪いことが起きる。どこへ行っても冷房があるために、どんどん具合が悪くなったり、夏が終わるまで治らないということもあるのだ。それでは仕事や勉強どころか、遊びも楽しめないだろう。\n\nD: このように、冷房は暑い夏を快適に過ごすための優れた技術ではあるが、思わぬ体調不良の原因にもなりうる。冷房の技術はありがたいものだが、大事なことは、その技術を上手に使うということだろう。",
            "questions": [
              {
                "questionText": "問い この文章で一番言いたいことは何か。",
                "options": [
                  "冷房は素晴らしい技術なのでどんどん使用するべきだ。",
                  "室外と室内の温度差が10℃以上あると、快適でほっとする。",
                  "冷房で体をこわしてしまうこともあるので、うまく使う必要がある。",
                  "冷房を使うと体温を調節することができなくなるので、使わないほうがいい。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "冷房で体をこわしてしまうこともあるので、うまく使う必要がある。"
                },
                "explanation": "Question 12. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題12　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "第1部 問題13",
            "passageText": "うちのそばに小さいレストランができたので、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">A</span>さっそく</span>行ってみた。外には小さく店の名前が書いてあるだけ。派手なかざりは一つもなく、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">B</span>落ち着いた雰囲気だ</span>。入ってみると3つほどテーブルがあり、汚れ一つない真っ白なテーブルクロスがかけられていた。私は窓のそばの席に座り、メニューを開いた。どれもとてもおいしそうで、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">C</span>期待がふくらんだ</span>。\n\nその時、10人ほどの集団が入ってきて、レストランは満員になった。彼らはこの店によく来るらしく、メニューも見ないでどんどん注文をし始めた。私は自分の注文が後になってしまうと少し心配になりながら、一番人気があるというAセットを注文した。\n\n私の方が先に店に入ったのに、<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">D</span>やはり私の料理は彼らの料理の後に運ばれてきた</span>。<span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\"><span class=\"text-[0.8em] mr-0.5 inline-block -translate-y-[1px]\">E</span>彼らに先に注文されたからだ</span>。その上、料理を待っている間ずっと、彼らがおいしそうに料理を食べながら、大声で話をするのを聞かされた。料理が来たときにはもう疲れてしまい、味はどうでもよくなってしまった。",
            "questions": [
              {
                "questionText": "問い <span class=\"underline underline-offset-[6px] decoration-[1.5px] decoration-gray-600 dark:decoration-gray-400\">この文章を書いた人の気持ち</span>を説明しているのはどれか。",
                "options": [
                  "レストランはきれいだし、料理がおいしかったので満足している。",
                  "集団のせいでなかなか料理を食べられなかったので、楽しめなかった。",
                  "レストランはかざりがなくてよくなかったが、集団の話は楽しめた。",
                  "集団と話をしながら料理を食べたので、料理の味はどうでもよかった。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "集団のせいでなかなか料理を食べられなかったので、楽しめなかった。"
                },
                "explanation": "Question 13. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題13　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          }
        ]
      },
      {
        "id": "part-2",
        "title": "第2部 いろいろな文章を読もう",
        "type": "medium-passage",
        "description": "Reading different kinds of text",
        "passages": [
          {
            "title": "第2部 問題14",
            "mondaiHeader": "問題14　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageText": "<div class=\"mb-4\">これは、学生時代の<ruby>友達<rt>ともだち</rt></ruby>の<ruby>佐藤<rt>さとう</rt></ruby>さんからリンさんに<ruby>届<rt>とど</rt></ruby>いたメールである。</div>\n<div class=\"bg-gray-200 dark:bg-gray-800 p-4 border-2 border-gray-400 border-dashed rounded text-sm md:text-base leading-loose font-mono\">\n  <div class=\"flex pb-1\"><div class=\"w-24 font-bold text-gray-700 dark:text-gray-300\">あて先：</div><div>1234abc@groups.ne.jp</div></div>\n  <div class=\"flex pb-1\"><div class=\"w-24 font-bold text-gray-700 dark:text-gray-300\"><ruby>件名<rt>けんめい</rt></ruby>：</div><div>こんにちは！</div></div>\n  <div class=\"flex pb-3 mb-3 border-b-2 border-gray-400 border-dashed\"><div class=\"w-24 font-bold text-gray-700 dark:text-gray-300\"><ruby>送信<rt>そうしん</rt></ruby>日時：</div><div>20XX年7月16日 13:16</div></div>\n\n  <p class=\"mb-2\">リンさん、<ruby>久<rt>ひさ</rt></ruby>しぶり！^o^/</p>\n  <p class=\"mb-2\"><ruby>元気<rt>げんき</rt></ruby>ですか～？ 仕事はどう？</p>\n  <p class=\"mb-2\">こちらは何とか<ruby>元気<rt>げんき</rt></ruby>にやってます。</p>\n  <p class=\"mb-2\">先週まで仕事がとても<ruby>忙<rt>いそが</rt></ruby>しかったのだけど、今週は少し時間が<ruby>取<rt>と</rt></ruby>れるようになりました。</p>\n  <p class=\"mb-2\">それで、リンさんに<ruby>会<rt>あ</rt></ruby>いたいな、と<ruby>思<rt>おも</rt></ruby>ってメールしてます。^^</p>\n  <p class=\"mb-2\"><ruby>久<rt>ひさ</rt></ruby>しぶりに<ruby>食事<rt>しょくじ</rt></ruby>でもしませんか？</p>\n  <p class=\"mb-2\">この前すごくおいしいお<ruby>店<rt>みせ</rt></ruby>を<ruby>見<rt>み</rt></ruby>つけたので、リンさんと<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>行<rt>い</rt></ruby>きたいと<ruby>思<rt>おも</rt></ruby>って…。</p>\n  <p class=\"mb-2\">よかったら<ruby>都合<rt>つごう</rt></ruby>のいい日、<ruby>教<rt>おし</rt></ruby>えてください♪♪</p>\n  <p class=\"mb-2\">時間もリンさんに<ruby>合<rt>あ</rt></ruby>わせられます。</p>\n  <p class=\"mb-4\">お<ruby>返事<rt>へんじ</rt></ruby><ruby>待<rt>ま</rt></ruby>ってますね！^o^/</p>\n  <p><ruby>佐藤<rt>さとう</rt></ruby></p>\n</div>",
            "passageLayout": "html",
            "questions": [
              {
                "questionText": "問い このメールで<ruby>一番伝<rt>いちばんつた</rt></ruby>えたいことは何か。",
                "options": [
                  "自分は何とか<ruby>元気<rt>げんき</rt></ruby>にやっているが、リンさんはどうか<ruby>教<rt>おし</rt></ruby>えてほしい。",
                  "<ruby>最近忙<rt>さいきんいそが</rt></ruby>しかったが、<ruby>久<rt>ひさ</rt></ruby>しぶりに少し<ruby>暇<rt>ひま</rt></ruby>になったことを<ruby>伝<rt>つた</rt></ruby>えたい。",
                  "<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>食事<rt>しょくじ</rt></ruby>がしたいから、<ruby>都合<rt>つごう</rt></ruby>のいい<ruby>日時<rt>にちじ</rt></ruby>を<ruby>連絡<rt>れんらく</rt></ruby>してほしい。",
                  "<ruby>久<rt>ひさ</rt></ruby>しぶりだから、リンさんからメールがほしい。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>食事<rt>しょくじ</rt></ruby>がしたいから、<ruby>都合<rt>つごう</rt></ruby>のいい<ruby>日時<rt>にちじ</rt></ruby>を<ruby>連絡<rt>れんらく</rt></ruby>してほしい。"
                },
                "explanation": "Official Answer Key verified."
              }
            ]
          },
          {
            "title": "第2部 問題15",
            "passageText": "\n<div class=\"flex justify-center my-6 w-full overflow-x-auto pb-8 pt-4\">\n  <div class=\"relative\" style=\"writing-mode: vertical-rl; font-family: serif;\">\n    \n    <!-- The Grey Box -->\n    <div class=\"bg-[#dcdcdc] dark:bg-gray-700 border border-gray-600 dark:border-gray-400 p-4 shadow-sm\" style=\"height: 520px; line-height: 2.2; letter-spacing: 0.05em; font-size: 1.1rem;\">\n      \n      <!-- Line 1 -->\n      <div><ruby>拝啓<rt>はいけい</rt></ruby></div>\n      <!-- Line 2 -->\n      <div>　<ruby>紅葉<rt>こうよう</rt></ruby><span class=\"text-[0.75em] opacity-80\">(注1)</span>がきれいな<ruby>季節<rt>きせつ</rt></ruby>になってきました。<ruby>皆<rt>みな</rt></ruby>さ</div>\n      <!-- Line 3 -->\n      <div>ま、お元気でお過ごしのことと思います。</div>\n      <!-- Line 4 -->\n      <div>　先日は久しぶりにチャンさんにお会いすること</div>\n      <!-- Line 5 -->\n      <div>ができて、とてもうれしかったです。仕事も<ruby>順調<rt>じゅんちょう</rt></ruby></div>\n      <!-- Line 6 -->\n      <div>に進んでいるとうかがい、安心しました。また、</div>\n      <!-- Line 7 -->\n      <div>ソナちゃんがかわいい小学生になっていてびっく</div>\n      <!-- Line 8 -->\n      <div>りしました。</div>\n      <!-- Line 9 -->\n      <div>　さて、その時にお話しした本を<ruby>別便<rt>べつびん</rt></ruby><span class=\"text-[0.75em] opacity-80\">(注2)</span>でお送り</div>\n      <!-- Line 10 -->\n      <div>しました。これは、私にはもう<ruby>必要<rt>ひつよう</rt></ruby>ないので、さ</div>\n      <!-- Line 11 -->\n      <div>しあげます。どうぞ受け取ってください。チャン</div>\n      <!-- Line 12 -->\n      <div>さんのお仕事の<ruby>役<rt>やく</rt></ruby>に立てばうれしいです。</div>\n      <!-- Line 13 -->\n      <div>　これから寒くなってきますが、どうぞお体にお</div>\n      <!-- Line 14 -->\n      <div>気をつけてお過ごしください。</div>\n      <!-- Line 15 -->\n      <div class=\"text-right pb-2\"><ruby>敬具<rt>けいぐ</rt></ruby></div>\n      <!-- Line 16 -->\n      <div class=\"pt-4\">二〇一四年十月二十五日</div>\n      <!-- Line 17 -->\n      <div class=\"text-right pb-4\">高木まなみ</div>\n      <!-- Line 18 -->\n      <div class=\"pt-2\">チャン・ジユン<ruby>様<rt>さま</rt></ruby></div>\n      \n    </div>\n\n    \n\n  </div>\n</div>\n",
            "passageLayout": "html",
            "passageNotes": "<p>(注1)紅葉：秋になって木の葉が赤くなること</p><p>(注2)別便：別に送ったもの</p>",
            "questions": [
              {
                "questionText": "問い この手紙の<ruby>内容<rt>ないよう</rt></ruby>について、正しいのはどれか。",
                "options": [
                  "高木さんはチャンさんに、自分の本をあげると言っている。",
                  "高木さんはチャンさんに、自分の本を貸してあげると言っている。",
                  "高木さんはチャンさんの<ruby>子<rt>こ</rt></ruby>どもに、本を受け取ってほしいと言っている。",
                  "高木さんはチャンさんに、本を<ruby>受<rt>う</rt></ruby>け取りに<ruby>来<rt>き</rt></ruby>てほしいと言っている。"
                ],
                "explanation": "「これは、私にはもう必要ないので、さしあげます」と書いてあるため、1が正解。",
                "correctOption": {
                  "index": 0,
                  "text": "高木さんはチャンさんに、自分の本をあげると言っている。"
                }
              }
            ]
          },
          {
            "title": "第2部 問題16",
            "mondaiHeader": "問題16　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageText": "\n<div class=\"mb-4 text-lg\"><ruby>職場<rt>しょくば</rt></ruby>でコピーを<ruby>取<rt>と</rt></ruby>ろうとしたら、コピー<ruby>機<rt>き</rt></ruby>に以下のようなメモが<ruby>貼<rt>は</rt></ruby>ってあった。</div>\n\n<div class=\"flex my-6 w-full max-w-3xl mx-auto\">\n  <!-- The Grey Box -->\n  <div class=\"bg-[#dcdcdc] dark:bg-gray-700 border border-gray-600 dark:border-gray-400 p-6 md:p-10 shadow-sm flex-1 font-serif text-lg leading-[2.2] tracking-wide relative\">\n    \n    <div class=\"flex items-center mb-2\"><div class=\"text-[1.35rem] font-bold border-b-[2.5px] border-black dark:border-white inline-block pb-1 tracking-wider\">このコピー<ruby>機<rt>き</rt></ruby>は<ruby>故障中<rt>こしょうちゅう</rt></ruby>です。</div></div>\n    <div class=\"flex items-center\"><div><ruby>修理<rt>しゅうり</rt></ruby>の人が11時ごろ来ます。</div></div>\n    <div class=\"flex items-center\"><div><ruby>修理<rt>しゅうり</rt></ruby>が問題なく終われば、午後から使えるようになります。</div></div>\n    \n    <div class=\"h-4\"></div> <!-- Gap -->\n    \n    <div class=\"flex items-center\"><div>お急ぎの方は、5<ruby>階<rt>かい</rt></ruby>の<ruby>第一事務室<rt>だいいちじむしつ</rt></ruby>か、5<ruby>階<rt>かい</rt></ruby>の<ruby>第二事務室<rt>だいにじむしつ</rt></ruby>か、</div></div>\n    <div class=\"flex items-center relative\">\n      <div>4<ruby>階<rt>かい</rt></ruby>の<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>のものをお<ruby>使<rt>つか</rt></ruby>いください。</div>\n    </div>\n    <div class=\"flex items-center\"><div>ただし、5<ruby>階<rt>かい</rt></ruby>の<ruby>第一事務室<rt>だいいちじむしつ</rt></ruby>は、<ruby>混<rt>こ</rt></ruby>んでいるので、20<ruby>枚<rt>まい</rt></ruby>以上のコピー</div></div>\n    <div class=\"flex items-center\"><div>は</div></div>\n    <div class=\"flex items-center\"><div>ご<ruby>遠慮<rt>えんりょ</rt></ruby>ください。</div></div>\n    <div class=\"flex items-center\"><div><ruby>第二事務室<rt>だいにじむしつ</rt></ruby>のコピー<ruby>機<rt>き</rt></ruby>はA3サイズが<ruby>取<rt>と</rt></ruby>れません。</div></div>\n    <div class=\"flex items-center relative\">\n      <div>また、4<ruby>階<rt>かい</rt></ruby>の<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>はカギがかかっていますので、</div>\n    </div>\n    <div class=\"flex items-center\"><div>となりの<ruby>資料管理室<rt>しりょうかんりしつ</rt></ruby>でカギを<ruby>借<rt>か</rt></ruby>りてください。</div></div>\n\n  </div>\n</div>\n",
            "questions": [
              {
                "questionText": "問い 今、9時45分で、10時の<ruby>会議<rt>かいぎ</rt></ruby>のためにA3サイズのコピーを40<ruby>枚取<rt>まいと</rt></ruby>りたい。<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>うようにコピーを<ruby>取<rt>と</rt></ruby>るには、どうすれば<ruby>一番<rt>いちばん</rt></ruby>よいか。",
                "options": [
                  "5<ruby>階<rt>かい</rt></ruby>の<ruby>第一事務室<rt>だいいちじむしつ</rt></ruby>に行き、コピーを<ruby>取<rt>と</rt></ruby>る。",
                  "5<ruby>階<rt>かい</rt></ruby>の<ruby>第二事務室<rt>だいにじむしつ</rt></ruby>に行き、コピーを<ruby>取<rt>と</rt></ruby>る。",
                  "4<ruby>階<rt>かい</rt></ruby>の<ruby>資料管理室<rt>しりょうかんりしつ</rt></ruby>でカギを借り、<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>でコピーを<ruby>取<rt>と</rt></ruby>る。",
                  "<ruby>修理<rt>しゅうり</rt></ruby>の後、このコピー<ruby>機<rt>き</rt></ruby>を使う。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "4<ruby>階<rt>かい</rt></ruby>の<ruby>資料管理室<rt>しりょうかんりしつ</rt></ruby>でカギを借り、<ruby>資料準備室<rt>しりょうじゅんびしつ</rt></ruby>でコピーを<ruby>取<rt>と</rt></ruby>る。"
                },
                "explanation": "Official Answer Key verified."
              }
            ],
            "passageLayout": "html"
          },
          {
            "title": "第2部 問題17",
            "mondaiHeader": "問題17　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageText": "\n<div class=\"font-serif text-lg leading-loose tracking-wide\">\n\n  <!-- Top Grey Box -->\n  <div class=\"bg-[#dcdcdc] dark:bg-gray-700 border border-gray-500 p-6 mb-8 relative\">\n    <h3 class=\"text-2xl font-bold text-center mb-6\"><ruby>親子丼<rt>おやこどん</rt></ruby>の作り方</h3>\n\n    <div class=\"flex flex-col md:flex-row justify-between pl-4 md:pl-12\">\n      <!-- Left Column: Ingredients -->\n      <div class=\"mb-6 md:mb-0 md:w-1/2\">\n        <h4 class=\"font-bold mb-4\">材料(2人分)</h4>\n        <ul class=\"space-y-2\">\n          <li>ごはん・・・どんぶり2<ruby>杯分<rt>はいぶん</rt></ruby></li>\n          <li>とり<ruby>肉<rt>にく</rt></ruby>・・・1枚(<ruby>約<rt>やく</rt></ruby>150g)</li>\n          <li>たまご・・・4コ</li>\n          <li>たまねぎ・・・1/4コ</li>\n          <li>だし<ruby>汁<rt>じる</rt></ruby>・・・カップ1杯(200cc)</li>\n        </ul>\n      </div>\n\n      <!-- Right Column: Seasonings -->\n      <div class=\"md:w-1/2 relative\">\n        <h4 class=\"font-bold mb-4\"><ruby>調味料<rt>ちょうみりょう</rt></ruby></h4>\n        <ul class=\"space-y-2 relative z-10\">\n          <li>みりん・・・大さじ2</li>\n          <li><ruby>酒<rt>さけ</rt></ruby>・・・大さじ1</li>\n          <li>しょうゆ・・・大さじ2</li>\n          <li>さとう・・・大さじ1</li>\n        </ul>\n        <!-- Illustration -->\n        <div class=\"absolute -right-4 top-4 text-7xl md:text-8xl opacity-90 select-none\">🍚</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Instructions Section -->\n  <div class=\"mb-6\">\n    <div class=\"inline-block border border-gray-600 dark:border-gray-400 px-4 py-1 mb-6 font-bold bg-white dark:bg-gray-900 shadow-sm\">\n      作り方\n    </div>\n\n    <!-- Step 1 -->\n    <div class=\"flex justify-between items-start mb-6\">\n      <div class=\"flex-grow pr-4\">\n        <span class=\"mr-2\">1.</span>まず、とり肉を<ruby>一口大<rt>ひとくちだい</rt></ruby><span class=\"text-sm\">(注1)</span>に切り、たまねぎをうす切りにします。<br/>\n        <span class=\"ml-6\">ボールにたまごを<ruby>割<rt>わ</rt></ruby>って混ぜておきます。</span>\n      </div>\n      <div class=\"text-5xl select-none flex space-x-2\">🧅🔪</div>\n    </div>\n\n    <!-- Step 2 -->\n    <div class=\"flex justify-between items-start mb-6\">\n      <div class=\"flex-grow pr-4\">\n        <span class=\"mr-2\">2.</span>なべにだし<ruby>汁<rt>じる</rt></ruby><span class=\"text-sm\">(注2)</span>、みりん、<ruby>酒<rt>さけ</rt></ruby>、しょうゆ、<br/>\n        <span class=\"ml-6\">さとうを入れて火にかけます。</span>\n      </div>\n      <div class=\"text-5xl select-none flex space-x-2\">🥘🥄</div>\n    </div>\n\n    <!-- Step 3 -->\n    <div class=\"flex justify-between items-start mb-6\">\n      <div class=\"flex-grow pr-4\">\n        <span class=\"mr-2\">3.</span><ruby>沸騰<rt>ふっとう</rt></ruby>したら、たまねぎ、とり肉を入れて、<br/>\n        <span class=\"ml-6\"><ruby>中火<rt>ちゅうび</rt></ruby>～<ruby>弱火<rt>よわび</rt></ruby>で<ruby>煮<rt>に</rt></ruby>ます。</span>\n      </div>\n      <div class=\"text-5xl select-none\">♨️🥘</div>\n    </div>\n\n    <!-- Step 4 -->\n    <div class=\"flex justify-between items-start mb-6\">\n      <div class=\"flex-grow pr-4\">\n        <span class=\"mr-2\">4.</span>とり肉が<ruby>煮<rt>に</rt></ruby>えたら、たまごを<ruby>回<rt>まわ</rt></ruby>し入れます<span class=\"text-sm\">(注3)</span>。<br/>\n        <span class=\"ml-6\"><ruby>固<rt>かた</rt></ruby>まり始めたら、火をとめます。</span>\n      </div>\n      <div class=\"text-5xl select-none\">🥣🍳</div>\n    </div>\n\n    <!-- Step 5 -->\n    <div class=\"flex justify-between items-start mb-6\">\n      <div class=\"flex-grow pr-4\">\n        <span class=\"mr-2\">5.</span>ごはんの上にのせて、出来あがり！\n      </div>\n    </div>\n  </div>\n\n  <!-- Note Box -->\n  <div class=\"inline-block border border-gray-600 dark:border-gray-400 px-4 py-1 font-bold bg-white dark:bg-gray-900 shadow-sm mb-4 mt-2\">\n    ここに注意！\n  </div>\n  <div class=\"mb-8\">\n    <ruby>最後<rt>さいご</rt></ruby>にたまごを入れたら、あまり混ぜないこと。そして長く<ruby>煮<rt>に</rt></ruby>ないこと。\n  </div>\n\n</div>\n",
            "questions": [
              {
                "questionText": "問い 親子丼の作り方の<ruby>順番<rt>じゅんばん</rt></ruby>で、<ruby>正<rt>ただ</rt></ruby>しいものはどれか。",
                "options": [
                  "なべにだし<ruby>汁<rt>じる</rt></ruby>、とり<ruby>肉<rt>にく</rt></ruby>、たまねぎ、たまごを入れてから<ruby>火<rt>ひ</rt></ruby>にかける。",
                  "なべにだし<ruby>汁<rt>じる</rt></ruby>、<ruby>調味料<rt>ちょうみりょう</rt></ruby>、とり<ruby>肉<rt>にく</rt></ruby>を入れ、<ruby>沸騰<rt>ふっとう</rt></ruby>したら、たまねぎとたまごを入れる。",
                  "なべにだし<ruby>汁<rt>じる</rt></ruby>、<ruby>調味料<rt>ちょうみりょう</rt></ruby>を入れ、<ruby>沸騰<rt>ふっとう</rt></ruby>したら、はじめにたまごを入れる。",
                  "なべにだし<ruby>汁<rt>じる</rt></ruby>、<ruby>調味料<rt>ちょうみりょう</rt></ruby>を入れ、<ruby>沸騰<rt>ふっとう</rt></ruby>したら、とり<ruby>肉<rt>にく</rt></ruby>とたまねぎを入れる。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "なべにだし<ruby>汁<rt>じる</rt></ruby>、<ruby>調味料<rt>ちょうみりょう</rt></ruby>を入れ、<ruby>沸騰<rt>ふっとう</rt></ruby>したら、とり<ruby>肉<rt>にく</rt></ruby>とたまねぎを入れる。"
                },
                "explanation": "Official Answer Key verified."
              }
            ],
            "passageLayout": "html",
            "passageNotes": "\n<div class=\"space-y-2\">\n  <p>(注1)<ruby>一口大<rt>ひとくちだい</rt></ruby>：口に入るくらいの大きさ</p>\n  <p>(注2)だし<ruby>汁<rt>じる</rt></ruby>：こんぶやかつおぶしで作ったスープ</p>\n  <p>(注3)<ruby>回<rt>まわ</rt></ruby>し入れる：まるをかくようにして入れる</p>\n</div>\n"
          },
          {
            "title": "第2部 問題18",
            "mondaiHeader": "問題18　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageText": "電車に<ruby>乗<rt>の</rt></ruby>ると、<ruby>化粧<rt>けしょう</rt></ruby>をしている<ruby>女性<rt>じょせい</rt></ruby>をときどき見かける。<ruby>彼女<rt>かのじょ</rt></ruby>たちは、「時間がないんだし、<ruby>他人<rt>たにん</rt></ruby>に<ruby>迷惑<rt>めいわく</rt></ruby>をかけているわけじゃないんだから、別にいいでしょ」と思っているらしい。<ruby>確<rt>たし</rt></ruby>かに<ruby>忙<rt>いそが</rt></ruby>しい毎日の中、少しでも時間を<ruby>節約<rt>せつやく</rt></ruby>したい気持ちもわかるが、私はそれを見ると、<ruby>不快<rt>ふかい</rt></ruby>な気持ちになる。<ruby>化粧<rt>けしょう</rt></ruby>は人に会うための<ruby>準備<rt>じゅんび</rt></ruby>なので、家でするものであり、電車ですべきではない。\n\n電車で<ruby>化粧<rt>けしょう</rt></ruby>をする人たちに、これから会う人の前でもそうやって<ruby>化粧<rt>けしょう</rt></ruby>をするのかと聞くと、しないと言う。<ruby>一方<rt>いっぽう</rt></ruby>、自分とは<ruby>全然関係<rt>ぜんぜんかんけい</rt></ruby>ない<ruby>周<rt>まわ</rt></ruby>りの<ruby>乗客<rt>じょうきゃく</rt></ruby>には、<ruby>化粧<rt>けしょう</rt></ruby>する<ruby>姿<rt>すがた</rt></ruby>を見られても別に<ruby>構<rt>かま</rt></ruby>わないと言う。\n\nこれは、<ruby>彼女<rt>かのじょ</rt></ruby>たちが<ruby>周<rt>まわ</rt></ruby>りの人たちを<ruby>風景<rt>ふうけい</rt></ruby>の<ruby>一部<rt>いちぶ</rt></ruby>、<ruby>壁<rt>かべ</rt></ruby>や<ruby>座席<rt>ざせき</rt></ruby>などと同じだと考えているように私には<ruby>感<rt>かん</rt></ruby>じられる。これは<ruby>大変失礼<rt>たいへんしつれい</rt></ruby>ではないだろうか。電車で<ruby>化粧<rt>けしょう</rt></ruby>をするということは、そういう<ruby>印象<rt>いんしょう</rt></ruby>を<ruby>周<rt>まわ</rt></ruby>りの人に<ruby>与<rt>あた</rt></ruby>えていることに気づいてほしい。",
            "questions": [
              {
                "questionText": "問い この<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>書<rt>か</rt></ruby>いた人は<ruby>電車<rt>でんしゃ</rt></ruby>の中で<ruby>化粧<rt>けしょう</rt></ruby>をすべきではないと言っているが、その<ruby>理由<rt>りゆう</rt></ruby>は何か。",
                "options": [
                  "<ruby>周<rt>まわ</rt></ruby>りの人が人として見られていないように<ruby>感<rt>かん</rt></ruby>じるから。",
                  "<ruby>化粧<rt>けしょう</rt></ruby>をするのは<ruby>周<rt>まわ</rt></ruby>りの人に<ruby>迷惑<rt>めいわく</rt></ruby>をかける行動だから。",
                  "これから会う人に<ruby>対<rt>たい</rt></ruby>して<ruby>大変失礼<rt>たいへんしつれい</rt></ruby>なことだから。",
                  "<ruby>化粧<rt>けしょう</rt></ruby>する時間を<ruby>節約<rt>せつやく</rt></ruby>するのは<ruby>女性<rt>じょせい</rt></ruby>としてはずかしいことだから。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "<ruby>周<rt>まわ</rt></ruby>りの人が人として見られていないように<ruby>感<rt>かん</rt></ruby>じるから。"
                },
                "explanation": "Official Answer Key verified."
              }
            ]
          },
          {
            "title": "第2部 問題19",
            "mondaiHeader": "問題19　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageText": "\n<div class=\"font-serif text-lg leading-loose tracking-wide\">\n  <p class=\"mb-4 indent-4\">日本では<ruby>幼稚園<rt>ようちえん</rt></ruby>や小学校で「おかしも」という<ruby>言葉<rt>ことば</rt></ruby>を習います。「おかしも」とはどのような意味でしょうか。「お<ruby>菓子<rt>かし</rt></ruby>も」と書いて「肉や<ruby>野菜<rt>やさい</rt></ruby>だけでなく『お<ruby>菓子<rt>かし</rt></ruby>も』食べましょう。」という意味でしょうか。<ruby>実<rt>じつ</rt></ruby>は、これは<ruby>災害<rt>さいがい</rt></ruby><span class=\"text-sm\">(注1)</u>や<ruby>事故<rt>じこ</rt></ruby>などが起きたときに、<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>するための注意を一つにした<ruby>言葉<rt>ことば</rt></ruby>です。「<ruby>押<rt>お</rt></ruby>さない、<ruby>駆<rt>か</rt></ruby>けない<span class=\"text-sm\">(注2)</u>、しゃべらない<span class=\"text-sm\">(注3)</u>、<ruby>戻<rt>もど</rt></ruby>らない」という四つの<ruby>言葉<rt>ことば</rt></ruby>の<ruby>初<rt>はじ</rt></ruby>めのひらがなを<ruby>並<rt>なら</rt></ruby>べたものです。</p>\n\n  <p class=\"mb-4 indent-4\">小学校で一年に何度も行われる<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>では、教室を出て<ruby>校庭<rt>こうてい</rt></ruby>に<ruby>逃<rt>に</rt></ruby>げる<ruby>練習<rt>れんしゅう</rt></ruby>をするのですが、そのとき<ruby>子<rt>こ</rt></ruby>どもたちが<ruby>素早<rt>すばや</rt></ruby>く<ruby>避難<rt>ひなん</rt></ruby>できるように、先生は「『おかしも』ですよ。」と何度も声をかけます。一年に何度も、<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>のたびにこの<ruby>言葉<rt>ことば</rt></ruby>を<ruby>耳<rt>みみ</rt></ruby>にするので、<u style=\"text-underline-offset: 4px; text-decoration-thickness: 1.5px;\">日本の子どもたちで「おかしも」の意<br/>味を知らない<ruby>子<rt>こ</rt></ruby>どもはいないほどです。</u></p>\n\n  <p class=\"mb-8 indent-4\"><ruby>本当<rt>ほんとう</rt></ruby>に何かがあったときには、この<ruby>訓練<rt>くんれん</rt></ruby>で「おかしも」を身につけたおかげで<ruby>子<rt>こ</rt></ruby>どもたちはこわがったりあわてたりせずに<ruby>冷静<rt>れいせい</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>できるというわけです。「おかしも」は<ruby>子<rt>こ</rt></ruby>どもたちを<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>避難<rt>ひなん</rt></ruby>させるために考えられた<ruby>工夫<rt>くふう</rt></ruby>なのです。</p>\n</div>\n",
            "questions": [
              {
                "questionText": "問1 「おかしも」とは何か。",
                "options": [
                  "肉や<ruby>野菜<rt>やさい</rt></ruby>だけでなくお<ruby>菓子<rt>かし</rt></ruby>も食べようと<ruby>勧<rt>すす</rt></ruby>める<ruby>言葉<rt>ことば</rt></ruby>",
                  "<ruby>避難<rt>ひなん</rt></ruby>するときの注意を<ruby>短<rt>みじか</rt></ruby>くした<ruby>言葉<rt>ことば</rt></ruby>",
                  "<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>のとき、教室を出て<ruby>校庭<rt>こうてい</rt></ruby>に<ruby>素早<rt>すばや</rt></ruby>く<ruby>避難<rt>ひなん</rt></ruby>すること",
                  "<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>のとき、<ruby>子<rt>こ</rt></ruby>どもたちが<ruby>冷静<rt>れいせい</rt></ruby>に行動すること"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "<ruby>避難<rt>ひなん</rt></ruby>するときの注意を<ruby>短<rt>みじか</rt></ruby>くした<ruby>言葉<rt>ことば</rt></ruby>"
                },
                "explanation": "Official Answer Key verified."
              },
              {
                "questionText": "問2 <u style=\"text-underline-offset: 4px; text-decoration-thickness: 1.5px;\">「日本の子どもたちで「おかしも」の意味を知らない<ruby>子<rt>こ</rt></ruby>どもはいないほどです。」</u>とあるが、それはなぜか。",
                "options": [
                  "毎日学校で先生から<ruby>説明<rt>せつめい</rt></ruby>してもらうから。",
                  "<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>をするときにはいつもその<ruby>言葉<rt>ことば</rt></ruby>を聞くから。",
                  "大人たちが<ruby>工夫<rt>くふう</rt></ruby>して考えた<ruby>言葉<rt>ことば</rt></ruby>だから。",
                  "お<ruby>菓子<rt>かし</rt></ruby>に<ruby>似<rt>に</rt></ruby>ている<ruby>言葉<rt>ことば</rt></ruby>だから。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "<ruby>避難訓練<rt>ひなんくんれん</rt></ruby>をするときにはいつもその<ruby>言葉<rt>ことば</rt></ruby>を聞くから。"
                },
                "explanation": "Official Answer Key verified."
              }
            ],
            "passageNotes": "\n<div class=\"space-y-2 mt-8 text-sm text-gray-700 dark:text-gray-300\">\n  <p>(注1)<ruby>災害<rt>さいがい</rt></ruby>：<ruby>地震<rt>じしん</rt></ruby>・<ruby>台風<rt>たいふう</rt></ruby>などの大きな<ruby>被害<rt>ひがい</rt></ruby>が出る出来事</p>\n  <p>(注2)<ruby>駆<rt>か</rt></ruby>ける：走る</p>\n  <p>(注3)しゃべる：話す</p>\n</div>\n",
            "passageLayout": "html"
          },
          {
            "title": "第2部 問題20",
            "mondaiHeader": "問題20　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageText": "日本では季節が生活のいろいろな面に影響している。外国から来た自分にとってそれはとても①おもしろい。\n\nいつも使う駅のそばに、有名な和菓子のお店がある。2月のある寒い日、ちょっと入ってみると、いろいろな形や色をした美しい生菓子<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>が並んでいた。値段は高かったが、アルバイト代が入ったばかりだったので、一番かわいいのを一つ買って帰ることにした。私は「寒椿」というお菓子を選んだ。いつも公園で見ている赤い椿の花を表現したお菓子だ。そのままテーブルにかざっておきたいぐらい美しい上に、食べると味も素晴らしく、感激した。それ以来、「寒椿」のことが忘れられなくなった。でも、次にアルバイト代が入るまでがまんすることにした。月に一度あのかわいい姿と味が楽しめれば幸せだ。",
            "questions": [
              {
                "questionText": "問1 ①おもしろいとあるが、何がおもしろいのか。",
                "options": [
                  "日本の季節は春、夏、秋、冬の四つであること",
                  "駅のそばに有名な和菓子のお店があること",
                  "日本の生活には季節が表されたものがたくさんあること",
                  "日本には美しい形をしたお菓子がいろいろあること"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "日本の生活には季節が表されたものがたくさんあること"
                },
                "explanation": "Official Answer Key verified."
              },
              {
                "questionText": "問2 ②あの赤い花とは、何を指しているか。",
                "options": [
                  "公園に咲いている椿の花",
                  "椿という和菓子",
                  "公園でもうすぐ咲きそうな桜",
                  "桜という和菓子"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "椿という和菓子"
                },
                "explanation": "Official Answer Key verified."
              },
              {
                "questionText": "問3 ③日本人の季節の楽しみ方とはどんなことか。",
                "options": [
                  "色や美しさを大切にして美しい食べ物を作る。",
                  "毎月一回和菓子を食べる。",
                  "前の季節のものをなつかしいと思う。",
                  "季節に合ったものを楽しむ。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "季節に合ったものを楽しむ。"
                },
                "explanation": "Official Answer Key verified."
              }
            ],
            "passageNotes": "<p>さて3月のアルバイト代が入り、私はわくわくしながらその和菓子屋に入っていった。しかし、②あの赤い花はどこにもなかった。お店の人にたずねておどろいた。「寒椿」は冬のお菓子なので、春には売らないのだそうだ。今度あの「寒椿」を楽しむには一年待たなければならない。</p><p>本当にがっかりしたが、そこにピンク色の「桜」というお菓子があることに気づいた。私はこの「桜」を買って帰った。これもまたとても美しく、おいしかった。そうか、もう春なのだ。そういえば公園の桜がもうすぐ咲きそうだ。この時、③日本人の季節の楽しみ方が少しわかった気がした。</p><p>(注1)生菓子：水分を多く含んだお菓子</p>"
          }
        ]
      },
      {
        "id": "part-3",
        "title": "第3部 広告・お知らせなどから情報を探そう",
        "type": "long-passage",
        "description": "Finding out what you need to know from advertising, public notices and similar texts",
        "passages": [
          {
            "title": "第3部 問題21",
            "passageText": "<div class=\"bg-gray-100 dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-md\">\n  <div class=\"text-center mb-8\">\n    <h2 class=\"text-lg md:text-xl font-bold tracking-widest mb-2\">バス1日乗車券と共通入場券の</h2>\n    <div class=\"flex justify-center items-center gap-2\">\n      <span class=\"inline-block border-2 border-gray-800 dark:border-gray-200 px-4 py-1 text-xl md:text-2xl font-black bg-white dark:bg-gray-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]\">お得な</span>\n      <span class=\"text-xl md:text-2xl font-black\">セット！</span>\n    </div>\n  </div>\n\n  <div class=\"flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8\">\n    <!-- Left Ticket -->\n    <div class=\"bg-white dark:bg-gray-700 p-4 border border-dashed border-gray-500 rounded text-center w-full md:w-auto relative\">\n      <div class=\"absolute -left-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2\"></div>\n      <div class=\"absolute -right-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2\"></div>\n      <p class=\"text-lg mb-1\">○○市バス</p>\n      <p class=\"text-xl font-bold mb-3\">1日乗車券</p>\n      <p class=\"text-2xl font-black text-right\">700円</p>\n    </div>\n\n    <!-- Plus sign -->\n    <div class=\"text-3xl font-black text-gray-500\">+</div>\n\n    <!-- Right Ticket -->\n    <div class=\"bg-white dark:bg-gray-700 p-4 border border-dashed border-gray-500 rounded w-full md:w-auto relative\">\n      <div class=\"absolute -left-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2\"></div>\n      <div class=\"absolute -right-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2\"></div>\n      <p class=\"text-lg font-bold mb-2 text-center border-b border-gray-300 pb-1\">共通入場券</p>\n      <div class=\"flex justify-between items-end gap-6 mb-1\">\n        <span>○○市歴史博物館</span>\n        <span class=\"text-xl font-black\">1,000円</span>\n      </div>\n      <div class=\"flex justify-between items-end gap-6\">\n        <span>現代美術館</span>\n        <span class=\"text-xl font-black\">900円</span>\n      </div>\n    </div>\n  </div>\n\n  <!-- Equation area -->\n  <div class=\"flex flex-col md:flex-row justify-center items-center gap-4 mb-12 relative\">\n    <p class=\"text-lg\">あわせて <span class=\"font-bold line-through decoration-2 decoration-gray-500\">2,600円</span></p>\n    <p class=\"text-xl font-black\">⇒ セットで買うと</p>\n    <div class=\"relative\">\n      <div class=\"text-white bg-black dark:bg-white dark:text-black font-black text-2xl px-6 py-3\" style=\"clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);\">2,200円</div>\n      <!-- Speech bubble -->\n      <div class=\"absolute -bottom-10 -right-8 md:-right-16 bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-200 p-2 rounded-lg text-sm font-bold shadow-md z-10\">\n        400円<br/>もおトクです！\n      </div>\n    </div>\n  </div>\n\n  <!-- Bottom Details -->\n  <div class=\"border-t-2 border-gray-400 dark:border-gray-500 pt-6 space-y-4\">\n    <div class=\"flex flex-col md:flex-row\">\n      <span class=\"font-bold md:w-32 flex-shrink-0\">発売期間</span>\n      <span>4月1日～6月30日</span>\n    </div>\n    <div class=\"flex flex-col md:flex-row\">\n      <span class=\"font-bold md:w-32 flex-shrink-0\">発売場所</span>\n      <div>\n        <p>○○市バスの切符売り場（8:00～20:00）</p>\n        <p>○○市歴史博物館、現代美術館の窓口（開館時間内）</p>\n      </div>\n    </div>\n    <div class=\"flex flex-col md:flex-row\">\n      <span class=\"font-bold md:w-32 flex-shrink-0\">有効期間</span>\n      <span>4月1日～6月30日のうち乗車券、入場券ともに購入日当日1日限り有効</span>\n    </div>\n    <div class=\"flex flex-col md:flex-row mt-4 pt-4 border-t border-gray-300 dark:border-gray-600\">\n      <span class=\"font-bold md:w-32 flex-shrink-0\">〔お問い合わせ〕</span>\n      <span>○○市観光課　0120-888888</span>\n    </div>\n  </div>\n</div>",
            "questions": [
              {
                "questionText": "問い アンさんは○○市でバス1日乗車券を使って歴史博物館と現代美術館を見たい。安く見るにはどこでいくらの券を買えばよいか。",
                "options": [
                  "バスの切符売り場 1,100円",
                  "○○市観光課 1,900円",
                  "バスの切符売り場 2,200円",
                  "○○市観光課 2,600円"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "バスの切符売り場 2,200円"
                },
                "explanation": "Question 21. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題21　つぎの文章は、駅に貼ってある割引の案内である。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "第3部 問題22",
            "passageText": "<div class=\"bg-gray-200 dark:bg-gray-800 p-4 md:p-8 rounded border-2 border-gray-400 font-sans shadow-md relative\">\n  <!-- Header -->\n  <div class=\"text-center mb-6\">\n    <h2 class=\"text-xl md:text-2xl font-bold tracking-widest mb-1 text-gray-800 dark:text-gray-100\">テニス教室 生徒募集！</h2>\n    <p class=\"text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300\">一緒にテニスをしませんか？</p>\n  </div>\n\n  <!-- Illustration -->\n  <div class=\"absolute top-12 right-6 md:right-12 text-6xl md:text-8xl opacity-80\" style=\"transform: rotate(15deg);\">\n    🎾\n  </div>\n\n  <!-- Information Details -->\n  <div class=\"space-y-2 mb-8 text-sm md:text-base pr-20 md:pr-40 relative z-10 leading-relaxed\">\n    <div><span class=\"font-bold w-20 md:w-28 inline-block\">対象</span><span>：20歳以上。A市在住・在勤",
            "questions": [
              {
                "questionText": "問1 ローラさんはテニスをしたことがないが、テニスを習いたいと思っている。月・水・木は9:30から16:00まで語学学校で勉強している。学校からテニスクラブは歩いて5分である。ローラさんがとることができるクラスはどれか。",
                "options": [
                  "aとc",
                  "aとd",
                  "dとf",
                  "cとg"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "dとf"
                },
                "explanation": "Question 22. Answer will be updated soon."
              },
              {
                "questionText": "問2 申し込みについて、正しいものはどれか。",
                "options": [
                  "A市に住んでいる人しか申し込めない。",
                  "2月15日までに往復はがきを送れば、必ず入会できる。",
                  "申し込み人数が定員以上になった場合は、抽選で決められる。",
                  "兄弟で入りたい場合もそれぞれ往復はがきを送らなければならない。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "兄弟で入りたい場合もそれぞれ往復はがきを送らなければならない。"
                },
                "explanation": "Question 22. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題22　つぎの文章は教室の募集広告である。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1)・在学(注2)</span></div></p><p><div><span class=\"font-bold w-20 md:w-28 inline-block\">期間</span><span>：4月～7月（各コース全15回）</span></div></p><p><div><span class=\"font-bold w-20 md:w-28 inline-block\">場所</span><span>：さくらテニスコート</span></div></p><p><div><span class=\"font-bold w-20 md:w-28 inline-block\">定員</span><span>：各クラス14人まで（定員になったらしめきり）</span></div></p><p><div><span class=\"font-bold w-20 md:w-28 inline-block\">費用</span><span>：3,000円</span></div></p><p><div class=\"flex\"></p><p><span class=\"font-bold w-20 md:w-28 flex-shrink-0\">申し込み方法</span></p><p><span>：往復はがき（1人1枚）に希望するクラス名、曜日、時間、住所、名前、電話番号を書いて、2月15日(水)までに下記までお送りください。結果は返信はがきで、3月中旬頃までに発送します。</span></p><p></div></p><p></div></p><p><!-- Contact Info --></p><p><div class=\"mb-8 space-y-1 text-sm md:text-base relative z-10\"></p><p><p><span class=\"font-bold w-28 inline-block\">はがきの宛て先</span>：〒101-2222　A市山田町2-2-2　さくらテニスクラブ</p></p><p><p><span class=\"font-bold w-28 inline-block flex items-center gap-1\">問い合わせ先</span>：☎ 033-111-2222</p></p><p></div></p><p><!-- Table Schedule --></p><p><div class=\"overflow-x-auto relative z-10\"></p><p><table class=\"w-full border-collapse border border-gray-400 dark:border-gray-500 text-center text-sm md:text-base\"></p><p><thead></p><p><tr class=\"bg-gray-300 dark:bg-gray-700\"></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\"></th></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\">時間</th></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\">月</th></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\">火</th></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\">水</th></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\">木</th></p><p><th class=\"border border-gray-400 dark:border-gray-500 p-2\">金</th></p><p></tr></p><p></thead></p><p><tbody></p><p><tr></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">1</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">9:00-10:20</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">初級 a</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">中上級</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\"></td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">初級 e</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">初級 f</td></p><p></tr></p><p><tr></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">2</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">10:40-12:00</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\"></td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">上級</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">初中級</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\"></td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">上級</td></p><p></tr></p><p><tr></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">3</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">15:00-16:20</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">中上級</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\"></td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\"></td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">初中級</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\"></td></p><p></tr></p><p><tr></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">4</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">17:00-18:20</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">中級 b</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">中級 c</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">初級 d</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">上級</td></p><p><td class=\"border border-gray-400 dark:border-gray-500 p-2\">中上級 g</td></p><p></tr></p><p></tbody></p><p></table></p><p></div></p><p></div></p>"
          },
          {
            "title": "第3部 問題23",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm\">\n  <h2 class=\"text-xl md:text-2xl font-bold text-center mb-4 tracking-widest text-gray-800 dark:text-gray-100\">南みなと図書館　映画上映会</h2>\n\n  <p class=\"mb-6 text-sm md:text-base leading-loose\">\n    南みなと図書館では、なつかしい映画や子どもを対象とした映画を無料で上映しています。ぜひみなさんでお越しください。\n  </p>\n\n  <div class=\"overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-gray-400 dark:border-gray-500 text-sm md:text-base\">\n      <thead>\n        <tr class=\"bg-gray-200 dark:bg-gray-700\">\n          <th class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-1/6\">名称</th>\n          <th class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-1/6\">日時・場所</th>\n          <th class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-1/4\">対象・定員・申込方法</th>\n          <th class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-5/12\">内容</th>\n        </tr>\n      </thead>\n      <tbody>\n        <!-- Row 1 -->\n        <tr>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            ①ラストダンスは君と\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            3月2日<br/>午後2時～<br/>3階多目的<br/>ホール\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            一般50名(申込必要：<br/>ネットかはがきで。先<br/>着順)\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            大学生の康太は無理やりダンス部に入<br/>れられて、先輩と大会に出ることに。<br/>爆笑恋愛コメディ。<br/><span class=\"font-bold\">出演：大木健、中田真美</span>\n          </td>\n        </tr>\n\n        <!-- Row 2 -->\n        <tr>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            ②ドキドキ<br/>マシンをさ<br/>がせ\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            3月9日<br/>午後2時～<br/>2階集会室\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            児童、保護者<br/>先着30名(申込不要)\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            人間の心がわかるという機械を発明し<br/>た少年と悪の大王との戦い。<br/><span class=\"font-bold\">出演：小林ゆうき・森雪菜。</span>\n          </td>\n        </tr>\n\n        <!-- Row 3 -->\n        <tr>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            ③トモばあ<br/>ちゃんの涙\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            3月16日<br/>午後3時～<br/>3階多目的<br/>ホール\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            一般50名(申込必要：<br/>ネットかはがきで。先<br/>着順)\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            一人暮らしのトモばあちゃんの家の前<br/>に赤ちゃんが。家族とは何かを問う問<br/>題作。<br/><span class=\"font-bold\">出演：黒沢美香子、中村利男</span>\n          </td>\n        </tr>\n\n        <!-- Row 4 -->\n        <tr>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            ④ホヨヨン<br/>と楽しいお<br/>ともだち\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            3月23日<br/>午後3時～<br/>2階集会室\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            児童、保護者<br/>先着30名(申込不要)\n          </td>\n          <td class=\"border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed\">\n            世界的な人気者のクマ、ホヨヨンと元<br/>気な友だちのほのぼのアニメ。\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>",
            "questions": [
              {
                "questionText": "問い エバさんは5歳の子どもといっしょに子ども向けのアニメを見たい。どれがよいか。",
                "options": [
                  "「ラストダンスは君と」",
                  "「ドキドキマシンをさがせ」",
                  "「トモばあちゃんの涙」",
                  "「ホヨヨンと楽しいおともだち"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "「ホヨヨンと楽しいおともだち"
                },
                "explanation": "Question 23. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題23　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "第3部 問題24",
            "passageText": "<div class=\"bg-[var(--color-bg-secondary)] dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-md\">\n  <h2 class=\"text-xl md:text-2xl font-bold text-center mb-8 tracking-widest text-gray-800 dark:text-gray-100\">ミニ・コンサートのご案内</h2>\n\n  <div class=\"space-y-4 mb-6 text-sm md:text-base leading-loose text-gray-800 dark:text-gray-200\">\n    <p>秋も日一日と深まり、紅葉も美しくなり始めました。</p>\n    <p>私たち「さくら合唱<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>クラブ」は日本の歌を愛する社会人混声(注2)合唱のクラブです。このたび秋の歌を集めて、ミニ・コンサートを開催することになりました。",
            "questions": [
              {
                "questionText": "問い このコンサートで、してはいけないことは何か。",
                "options": [
                  "ビデオを撮る。 2 写真を撮る。 3 子どもと一緒に行く。 4 携帯電話でメールをする。",
                  "選択肢 2",
                  "選択肢 3",
                  "選択肢 4"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "選択肢 4"
                },
                "explanation": "Question 24. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題24　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "</p><p><p>どうぞ日本の歌の美しさをお楽しみください。ご来場をお待ちしています。</p></p><p></div></p><p><div class=\"text-right mb-10 text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed\"></p><p><p>平成XX年　10月25日</p></p><p><p>さくら合唱クラブ発表会実行委員</p></p><p></div></p><p><div class=\"space-y-3 mb-8 text-sm md:text-base text-gray-800 dark:text-gray-200 ml-4 md:ml-8\"></p><p><div class=\"flex\"></p><p><span class=\"w-20 md:w-24 inline-block font-bold\">日時：</span></p><p><div></p><p><p>11月12日（土）</p></p><p><div class=\"flex gap-4 mt-1\"></p><p><span>開場 15:00</span></p><p><span>開演 15:30</span></p><p></div></p><p></div></p><p></div></p><p><div class=\"flex\"></p><p><span class=\"w-20 md:w-24 inline-block font-bold\">場所：</span></p><p><span>○○市民ホール</span></p><p></div></p><p><div class=\"flex\"></p><p><span class=\"w-20 md:w-24 inline-block font-bold\">入場料：</span></p><p><span>300円</span></p><p></div></p><p></div></p><p><div class=\"mb-8 text-sm md:text-base text-gray-800 dark:text-gray-200\"></p><p><p class=\"font-bold mb-2\">☆お願い☆</p></p><p><ul class=\"list-none space-y-1 ml-2\"></p><p><li>・自転車・車でのご来場はご遠慮ください。</li></p><p><li>・上演中のフラッシュ撮影はご遠慮ください。</li></p><p><li>・ビデオ撮影はビデオ席でお願いします。</li></p><p><li>・小さいお子様をお連れの方は、他のお客様のご迷惑にならないようにご注意ください。</li></p><p><li>・携帯電話等の電源はお切りください。</li></p><p></ul></p><p></div></p><p><div class=\"border-t border-gray-400 dark:border-gray-500 pt-6 text-sm md:text-base text-gray-800 dark:text-gray-200\"></p><p><p class=\"font-bold mb-2\">☆メンバー募集☆　私たちと一緒に歌いませんか？</p></p><p><p class=\"ml-4\">参加ご希望の方は山田（tel:090-9387-○○○○）までご連絡ください。</p></p><p></div></p><p></div></p>"
          },
          {
            "title": "第3部 問題25",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-400 font-sans shadow-md\">\n  <div class=\"flex justify-between items-start mb-6\">\n    <p class=\"text-sm md:text-base border-b border-gray-800 dark:border-gray-200 pb-1\">国際ビルご利用の皆様</p>\n    <p class=\"text-sm md:text-base text-gray-700 dark:text-gray-300\">平成○○年7月1日</p>\n  </div>\n\n  <h2 class=\"text-xl md:text-2xl font-bold text-center mb-8 tracking-wide\">エレベーター運転停止のお知らせ</h2>\n\n  <p class=\"mb-8 text-sm md:text-base leading-loose indent-4\">\n    8月1日より8月7日までの下記の時間、国際ビルの北館、東館、西館では、エレベーターの点検を行います。点検中はエレベーターの利用ができませんので、ご注意ください。ご迷惑をおかけしますが、よろしくお願いいたします。\n  </p>\n\n  <!-- Section 1 -->\n  <div class=\"mb-8 text-sm md:text-base\">\n    <h3 class=\"font-bold text-lg mb-2\">１．点検予定日時</h3>\n    <ul class=\"list-none space-y-1 ml-4 mb-4\">\n      <li>・○が点検予定日</li>\n      <li>・時間は、各館8:00～10:00、22:00～24:00</li>\n      <li>・△の日は講演会のため、8:00から10:00の点検は行いません。</li>\n    </ul>\n\n    <!-- Table -->\n    <div class=\"overflow-x-auto ml-2 md:ml-8\">\n      <table class=\"border-collapse border border-gray-500 text-center text-sm md:text-base bg-[var(--color-bg-tertiary)] dark:bg-gray-700\">\n        <thead>\n          <tr>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\"></th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">8/1</th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">2</th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">3</th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">4</th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">5</th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">6</th>\n            <th class=\"border border-gray-500 p-2 md:p-3 min-w-[3rem]\">7</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td class=\"border border-gray-500 p-2 md:p-3 font-bold\">東館</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n          </tr>\n          <tr>\n            <td class=\"border border-gray-500 p-2 md:p-3 font-bold\">西館</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">△</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n          </tr>\n          <tr>\n            <td class=\"border border-gray-500 p-2 md:p-3 font-bold\">北館</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\"></td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">△</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n            <td class=\"border border-gray-500 p-2 md:p-3\">○</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Section 2 -->\n  <div class=\"mb-8 text-sm md:text-base\">\n    <h3 class=\"font-bold text-lg mb-2\">２．ご注意</h3>\n    <ul class=\"list-none space-y-1 ml-4\">\n      <li>・点検中はエスカレーターまたは階段をご利用ください。</li>\n      <li>・東館と西館の5階は連絡通路で移動することができます。</li>\n      <li>・南館については、9月に点検予定です。</li>\n    </ul>\n  </div>\n\n  <!-- Section 3 -->\n  <div class=\"text-sm md:text-base\">\n    <h3 class=\"font-bold text-lg mb-2\">３．問い合わせ先</h3>\n    <div class=\"flex gap-4 ml-4\">\n      <span class=\"w-32\">国際ビル管理部</span>\n      <span>TEL: 03-1111-2222</span>\n    </div>\n  </div>\n</div>",
            "questions": [],
            "passageLayout": "html",
            "mondaiHeader": "問題25　つぎの文章は、エレベーター運転停止のお知らせである。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "第3部 問題26",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-400 font-sans shadow-md mx-auto max-w-2xl bg-opacity-90 dark:bg-opacity-90\" style=\"background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px);\">\n\n  <h2 class=\"text-xl md:text-2xl font-bold text-center tracking-widest text-gray-800 dark:text-gray-100 mb-2 border-b-2 border-gray-800 dark:border-gray-200 pb-2 inline-block mx-auto\">内 用 薬 <span class=\"text-sm font-normal\">",
            "passageLayout": "html",
            "mondaiHeader": "問題26　下は薬の入った袋である。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1)</span></h2></p><p><div class=\"text-right mt-6 mb-8 border-b border-gray-400 pb-2 flex justify-end items-end gap-4\"></p><p><span class=\"text-xl md:text-2xl font-bold tracking-wider\">田中　マリア</span></p><p><span class=\"text-lg\">様</span></p><p></div></p><p><!-- Medicine 1 --></p><p><div class=\"mb-6 space-y-3\"></p><p><div class=\"flex flex-wrap items-end gap-2 md:gap-4 text-sm md:text-base font-bold\"></p><p><span class=\"text-lg\">ピンクの錠剤</span></p><p><span>1回</span></p><p><span class=\"text-lg\">2</span></p><p><span>（</span></p><p><span class=\"border-2 border-red-500 text-red-500 rounded-full px-2 py-0.5\">錠</span></p><p><span>・</span></p><p><span>包<span class=\"text-xs\">(注2)</span></span></p><p><span>）ずつ</span></p><p><span class=\"ml-4\">1日</span></p><p><span class=\"text-lg\">2</span></p><p><span>回</span></p><p></div></p><p><div class=\"flex flex-wrap items-center justify-center gap-4 text-sm md:text-base font-bold ml-4\"></p><p><span>（</span></p><p><span class=\"border-2 border-red-500 text-red-500 rounded-full px-3 py-1\">あさ</span></p><p><span>・</span></p><p><span>ひる</span></p><p><span>・</span></p><p><span class=\"border-2 border-red-500 text-red-500 rounded-full px-3 py-1\">夕方</span></p><p><span>・</span></p><p><span>寝る前</span></p><p><span>）</span></p><p></div></p><p><div class=\"flex flex-wrap items-center justify-end gap-4 text-sm md:text-base font-bold\"></p><p><span class=\"mr-6\">4日分</span></p><p><span>食前</span></p><p><span>・</span></p><p><span>食間</span></p><p><span>・</span></p><p><span class=\"border-2 border-red-500 text-red-500 rounded-full px-3 py-1\">食後</span></p><p></div></p><p></div></p><p><div class=\"border-b-2 border-dashed border-gray-400 dark:border-gray-500 mb-6 w-full\"></div></p><p><!-- Medicine 2 --></p><p><div class=\"mb-10 space-y-3\"></p><p><div class=\"flex flex-wrap items-end gap-2 md:gap-4 text-sm md:text-base font-bold\"></p><p><span class=\"text-lg\">白のカプセル</span></p><p><span>1回</span></p><p><span class=\"text-lg\">1</span></p><p><span>（</span></p><p><span class=\"border-2 border-blue-500 text-blue-500 rounded-full px-2 py-0.5\">錠</span></p><p><span>・</span></p><p><span>包</span></p><p><span>）ずつ</span></p><p><span class=\"ml-4\">1日</span></p><p><span class=\"text-lg\">3</span></p><p><span>回</span></p><p></div></p><p><div class=\"flex flex-wrap items-center justify-center gap-4 text-sm md:text-base font-bold ml-4\"></p><p><span>（</span></p><p><span class=\"border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1\">あさ</span></p><p><span>・</span></p><p><span class=\"border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1\">ひる</span></p><p><span>・</span></p><p><span class=\"border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1\">夕方</span></p><p><span>・</span></p><p><span>寝る前</span></p><p><span>）</span></p><p></div></p><p><div class=\"flex flex-wrap items-center justify-end gap-4 text-sm md:text-base font-bold\"></p><p><span class=\"mr-6\">4日分</span></p><p><span>食前</span></p><p><span>・</span></p><p><span>食間</span></p><p><span>・</span></p><p><span class=\"border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1\">食後</span></p><p></div></p><p></div></p><p><!-- Hospital Info --></p><p><div class=\"flex justify-end relative\"></p><p><div class=\"border border-gray-400 p-4 rounded bg-white dark:bg-gray-800 text-sm md:text-base z-10 text-center\"></p><p><p class=\"font-bold mb-1\">わたなべ医院</p></p><p><p class=\"mb-1\">○○区××町1－2－3</p></p><p><p>電話 03-3333-2222</p></p><p></div></p><p><div class=\"absolute -right-8 -bottom-8 text-6xl opacity-70 transform rotate-12\"></p><p>💊</p><p></div></p><p></div></p><p></div></p>",
            "questions": [
              {
                "id": "q26-1",
                "questionText": "問1 ピンクの錠剤と白のカプセルの飲み方で正しいものはどれか。",
                "options": [
                  "朝食・昼食・夕食を食べた後、それぞれ1錠ずつ飲む。",
                  "朝食・昼食・夕食を食べた後、それぞれ2錠ずつ飲む。",
                  "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に3錠飲む。",
                  "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に1錠飲む。"
                ],
                "correctOption": {
                  "text": "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に1錠飲む。",
                  "explanation": "ピンクの錠剤は1回2錠で1日2回（あさ・夕方）、食後です。白のカプセルは1回1錠で1日3回（あさ・ひる・夕方）、食後です。"
                }
              },
              {
                "id": "q26-2",
                "questionText": "問2 マリアさんは朝食後、薬を飲んだ。次にいつどんな薬を飲めばよいか。",
                "options": [
                  "錠剤とカプセルを昼食後に飲む。",
                  "錠剤を昼食後に飲む。",
                  "カプセルを昼食後に飲む。",
                  "錠剤とカプセルを夕食後に飲む。"
                ],
                "correctOption": {
                  "text": "カプセルを昼食後に飲む。",
                  "explanation": "錠剤は朝・夕方のみですが、カプセルは朝・昼・夕方です。したがって朝の次は、昼にカプセルだけを飲みます。"
                }
              }
            ]
          },
          {
            "title": "第3部 問題27",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-6 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm\">\n  <p class=\"mb-4 text-sm md:text-base leading-loose indent-4\">\n    ある大学の大学生を対象に、アルバイトについてアンケート調査した。その結果、この大学の場合、全体の約8割がアルバイトしていることがわかった。男女別にみると、男子学生のうちの79.4%がアルバイトをしているのに対して、女子学生は83.4%であり、女子学生の割合のほうが、男子学生を上回って<span class=\"text-xs\"><span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span></span>いる。",
            "passageLayout": "html",
            "mondaiHeader": "問題27　下の文章を読み、下の質問に答えなさい。答えは１、２、３、４の中から最もよいものを一つえらびなさい。",
            "passageNotes": "<p></p></p><p><p class=\"mb-8 text-sm md:text-base leading-loose indent-4\"></p><p>下のグラフはアルバイトの目的について調査した結果を表している。アルバイトの目的は、「生活費を稼ぐため」(32.8%)と「学生生活を楽しむため」(32.4%)がほぼ<span class=\"text-xs\">(注2)</span>同数で、次に「社会経験のため」(24.2%)となる。「学生生活を楽しむため」とは、旅行や遊び、クラブ活動など、生活を楽しむお金を稼ぐためという意味だ。「勉学費」も含め、「お金を稼ぐため」が6割以上を占めてはいるが、アルバイトの目的がお金を稼ぐためだけでないことも注目すべきことだ。</p><p></p></p><p><!-- Pie Chart Container --></p><p><div class=\"border-2 border-gray-400 p-6 mb-2 max-w-lg mx-auto bg-white relative h-[360px] md:h-[420px] flex items-center justify-center text-black\"></p><p><h3 class=\"absolute top-4 w-full text-center font-bold text-lg tracking-widest text-black\">アルバイトの目的</h3></p><p><!-- SVG Pie Chart for perfect borders and shading --></p><p><svg viewBox=\"-100 -100 200 200\" class=\"w-48 h-48 md:w-56 md:h-56 transform -rotate-90\"></p><p><circle r=\"100\" cx=\"0\" cy=\"0\" fill=\"white\" stroke=\"black\" stroke-width=\"1\"></circle></p><p><!-- Slice 3: 社会経験 --></p><p><circle r=\"50\" cx=\"0\" cy=\"0\" fill=\"transparent\" stroke=\"#9ca3af\" stroke-width=\"100\" stroke-dasharray=\"76.0 314.2\" stroke-dashoffset=\"-204.8\"></circle></p><p><!-- その他: 4.5% --></p><p><circle r=\"50\" cx=\"0\" cy=\"0\" fill=\"transparent\" stroke=\"#6b7280\" stroke-width=\"100\" stroke-dasharray=\"14.1 314.2\" stroke-dashoffset=\"-280.9\"></circle></p><p><!-- 勉学費: 1.0% --></p><p><circle r=\"50\" cx=\"0\" cy=\"0\" fill=\"transparent\" stroke=\"black\" stroke-width=\"100\" stroke-dasharray=\"3.1 314.2\" stroke-dashoffset=\"-295.0\"></circle></p><p><!-- Lines between slices --></p><p><line x1=\"0\" y1=\"0\" x2=\"-88.3\" y2=\"46.8\" stroke=\"black\" stroke-width=\"1.5\"></line></p><p><line x1=\"0\" y1=\"0\" x2=\"-57.7\" y2=\"-81.6\" stroke=\"black\" stroke-width=\"1.5\"></line></p><p><line x1=\"0\" y1=\"0\" x2=\"78.6\" y2=\"-61.8\" stroke=\"black\" stroke-width=\"1.5\"></line></p><p><line x1=\"0\" y1=\"0\" x2=\"92.7\" y2=\"-37.4\" stroke=\"black\" stroke-width=\"1.5\"></line></p><p><line x1=\"0\" y1=\"0\" x2=\"94.9\" y2=\"-31.5\" stroke=\"black\" stroke-width=\"1.5\"></line></p><p><line x1=\"0\" y1=\"0\" x2=\"100\" y2=\"0\" stroke=\"black\" stroke-width=\"1.5\"></line></p><p><circle r=\"100\" cx=\"0\" cy=\"0\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"></circle></p><p></svg></p><p><!-- Absolutely positioned text labels to match image perfectly --></p><p><!-- Inside labels --></p><p><div class=\"absolute font-bold text-xs md:text-sm text-center text-black\" style=\"top: 45%; left: 63%;\">生活費を稼<br/>ぐため<br/>32.8%</div></p><p><div class=\"absolute font-bold text-xs md:text-sm text-center text-black\" style=\"top: 70%; left: 45%;\">学生生活を<br/>楽しむため<br/>32.4%</div></p><p><div class=\"absolute font-bold text-xs md:text-sm text-center text-black\" style=\"top: 55%; left: 25%; text-shadow: 1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white;\">社会経験<br/>のため<br/>24.2%</div></p><p><!-- Outside labels with drawing lines --></p><p><!-- 無回答 --></p><p><div class=\"absolute font-bold text-xs md:text-sm text-center text-black\" style=\"top: 15%; left: 15%;\">無回答<br/>5.1%</div></p><p><div class=\"absolute border-t border-black w-12\" style=\"top: 25%; left: 25%; transform: rotate(20deg);\"></div></p><p><!-- その他 --></p><p><div class=\"absolute font-bold text-xs md:text-sm text-center text-black\" style=\"top: 25%; left: 40%;\">その他<br/>4.5%</div></p><p><div class=\"absolute border-t border-black w-8\" style=\"top: 32%; left: 46%; transform: rotate(70deg);\"></div></p><p><!-- 勉学費 --></p><p><div class=\"absolute font-bold text-xs md:text-sm text-center text-black\" style=\"top: 32%; left: 10%;\">勉学費を稼<br/>ぐため<br/>1.0%</div></p><p><div class=\"absolute border-t border-black w-12\" style=\"top: 40%; left: 30%; transform: rotate(-20deg);\"></div></p><p></div></p><p><div class=\"text-right text-xs text-gray-500 mb-2 mr-4\">東京大学2008年（第58回）学生生活実態調査より引用</div></p><p></div></p>",
            "questions": [
              {
                "id": "q27-1",
                "questionText": "問い この調査について述べているもので最も正しいものはどれか。",
                "options": [
                  "アルバイトをしている男子学生の割合はアルバイトをしている女子学生の割合より多い。",
                  "学生生活を楽しむためにアルバイトをしている学生は全体の約3分の2を占める。",
                  "アルバイトの目的は、お金を稼ぐためだけではない。",
                  "ほとんどの学生がお金を稼ぐためにアルバイトをしている。"
                ],
                "correctOption": {
                  "text": "アルバイトの目的は、お金を稼ぐためだけではない。",
                  "explanation": "本文の最後に「アルバイトの目的がお金を稼ぐためだけでないことも注目すべきことだ。」とはっきり書かれています。"
                }
              }
            ]
          },
          {
            "title": "第3部 問題28",
            "passageText": "<div class=\"bg-gray-200 dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-400 font-sans shadow-md text-sm md:text-base leading-relaxed\">\n\n  <!-- Email Headers -->\n  <div class=\"mb-6 space-y-1\">\n    <div class=\"flex\">\n      <span class=\"font-bold w-16 md:w-20\">差出人：</span>\n      <span>○×ショップ [×××@marubatsu.co.jp]</span>\n    </div>\n    <div class=\"flex\">\n      <span class=\"font-bold w-16 md:w-20\">宛先：</span>\n      <span>1234@○○○○.ne.jp</span>\n    </div>\n    <div class=\"flex\">\n      <span class=\"font-bold w-16 md:w-20\">件名：</span>\n      <span>ご注文内容の確認</span>\n    </div>\n  </div>\n\n  <!-- Email Body -->\n  <div class=\"bg-white dark:bg-gray-700 p-4 md:p-6 border border-gray-300 dark:border-gray-600 rounded\">\n    <p class=\"font-bold mb-4 text-lg\">ソウ　シューイー　様 <span class=\"font-normal text-sm md:text-base\">（お客様番号：123456）</span></p>\n\n    <p>このたびは○×ショップをご利用いただき、誠にありがとうございます。</p>\n    <p>お申し込みの受付手続きが完了いたしましたので、お知らせ致します。</p>\n    <p class=\"mb-4\">下記のご注文内容をご確認ください。</p>\n\n    <div class=\"border-t border-dashed border-gray-400 my-4\"></div>\n\n    <div class=\"space-y-2 mb-4 ml-2\">\n      <p><span class=\"font-bold\">[ご注文番号]</span> 1234-5678</p>\n      <p><span class=\"font-bold\">[ご注文日]</span> 20XX-07-16 10:34:19</p>\n      <p><span class=\"font-bold\">[商品番号]</span> 900-800-700</p>\n      <div class=\"flex flex-wrap gap-4\">\n        <p><span class=\"font-bold\">[商品名]</span> \"チョコレート　セットA\"</p>\n        <p>価格 2,900円</p>\n      </div>\n      <p><span class=\"font-bold\">[小計]</span> 2,900円</p>\n      <p><span class=\"font-bold\">[お支払方法]</span> コンビニ払い</p>\n    </div>\n\n    <div class=\"flex justify-end mb-4 pr-4 md:pr-10\">\n      <div class=\"w-48 space-y-1\">\n        <div class=\"flex justify-between\">\n          <span>商品金額：</span>\n          <span>2,900円</span>\n        </div>\n        <div class=\"flex justify-between\">\n          <span>送料：</span>\n          <span>600円</span>\n        </div>\n        <div class=\"flex justify-between font-bold border-t border-gray-300 dark:border-gray-500 pt-1 mt-1\">\n          <span>ご請求金額：</span>\n          <span>3,500円</span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"border-t border-dashed border-gray-400 my-4\"></div>\n\n    <div class=\"space-y-2 mb-4 ml-2\">\n      <div class=\"flex\">\n        <span class=\"font-bold w-24\">[お届け先]</span>\n        <div class=\"font-bold text-lg\">中村花子　様</div>\n      </div>\n      <div class=\"flex flex-wrap gap-x-4 ml-24\">\n        <span>〒XXX-XXXX</span>\n        <span>東京都○○市　X-X-X</span>\n        <span>TEL XX-XXXX-XXXX</span>\n      </div>\n      <div class=\"flex mt-2\">\n        <span class=\"font-bold w-24\">[お届け予定]</span>\n        <span>20XX年08月01日ごろ　　9時～14時</span>\n      </div>\n    </div>\n\n    <div class=\"border-t border-dashed border-gray-400 my-4\"></div>\n\n    <div class=\"space-y-2 text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-6\">\n      <p class=\"flex items-start\">\n        <span class=\"mr-1\">※</span>\n        <span>ご注文の配送状況は右の<span class=\"inline-block border border-gray-400 rounded-full px-2 mx-1 bg-gray-100 dark:bg-gray-600 text-black dark:text-white\">お客様情報</span>からご確認いただけます。</span>\n      </p>\n      <p class=\"flex items-start\">\n        <span class=\"mr-1\">※</span>\n        <span>このメールは送信専用アドレスより自動的に送信されています。ご返信いただいてもお答えできません。</span>\n      </p>\n      <p class=\"flex items-start\">\n        <span class=\"mr-1\">※</span>\n        <span>ご注文内容を確認・変更する場合は、○×ショップのホームページ（http://www.marubatsu.co.jp）の右上にある「アカウントサービス」をクリックしてください。</span>\n      </p>\n    </div>\n\n    <div class=\"text-xs md:text-sm text-gray-700 dark:text-gray-300\">\n      <p class=\"mb-2\">またのご利用を心よりお待ちしております。</p>\n      <p class=\"font-bold\">(株)○×ショップ　　<span class=\"font-normal\">http://www.marubatsu.co.jp</span></p>\n      <p>　〒XXX-XXXX　　東京都○○市××　1－1－1</p>\n    </div>\n  </div>\n</div>",
            "passageLayout": "html",
            "mondaiHeader": "問題28　つぎの文章は、注文内容の確認メールである。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "",
            "questions": [
              {
                "id": "q28-dummy",
                "questionText": "問い （※質問テキストがありません。正しい質問と選択肢を後で追加してください。）",
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
          }
        ]
      },
      {
        "id": "part-4",
        "title": "第4部 実戦問題",
        "type": "email-type",
        "description": "Practical Exercises",
        "passages": [
          {
            "title": "第4部 問題29",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]\">\n\n  <div class=\"space-y-4 text-sm md:text-base leading-loose indent-4 mb-8\">\n    <p>おにぎり<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>は簡単に食べられるので、とても人気がある。</p></p><p><p>このおにぎり、ただご飯を丸くしただけのように見えるが、上手に作るのは簡単ではない。ぎゅうぎゅうと力を込めて固くにぎっては、おいしいおにぎりにならない。けれどもあまり力を入れないと、食べるときにぼろぼろとくずれてしまう。食べるときにお米と具<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>の味が混ざるようにふわふわと、でも、くずれない程度に力を込めてにぎらなければならない。</p></p><p><p>自分の作ったおにぎりがあまりおいしくないと思っているなら、くずれない程度に強く、味が混ざるように優しくにぎってみることをすすめる。</p></p><p></div></p><p><!-- Onigiri & Sushi Icons --></p><p><div class=\"absolute bottom-4 right-4 text-6xl opacity-90 transform rotate-12 flex items-end\"></p><p><span class=\"text-5xl -mr-4 z-10\">🍙</span></p><p><span class=\"text-7xl\">🍣</span></p><p><span class=\"text-5xl -ml-2 -mb-2 transform rotate-45\">🍙</span></p><p></div></p><p></div>",
            "passageLayout": "html",
            "mondaiHeader": "問題29　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "questions": [
              {
                "id": "q29-1",
                "questionText": "問い 上手なおにぎりの作り方として正しいのはどれか。",
                "options": [
                  "食べるときにこわれてしまわないようにご飯を固くまとめる。",
                  "形が丸くなるように力を込めて何度もにぎる。",
                  "食べるときに形がこわれるぐらいやわらかくにぎる。",
                  "くずれないけれども食べるときにはやわらかいと感じるようににぎる。"
                ],
                "correctOption": {
                  "text": "くずれないけれども食べるときにはやわらかいと感じるようににぎる。",
                  "explanation": "「食べるときにお米と具の味が混ざるようにふわふわと、でも、くずれない程度に力を込めてにぎらなければならない。」と書いてあります。"
                }
              }
            ]
          },
          {
            "title": "第4部 問題30",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]\">\n\n  <div class=\"space-y-4 text-sm md:text-base leading-loose indent-4 mb-8\">\n    <p>日本人は集団主義だとよく言われる。つまり、個人よりもみんなで行動することや、みんなのために行動することを大切にするというのだ。</p>\n    <p>それにはさまざまな原因があるが、その一つに日本人が昔から「稲作<span class=\"text-xs\">\n</span>」を行ってきたことがあると言われている。稲作では田植えや収穫など、みんなで一度に行う作業が多い。また、より多くの稲を上手に育てるには、稲作で使う水を個人の田んぼだけではなく、地域全体を考えて管理する必要がある。</p></p><p><p>このような稲作を何千年も続ける中で、日本社会では「みんな」がとても重要な基準になっていったのだろう。</p></p><p></div></p><p><!-- Rice plant illustration hint --></p><p><div class=\"absolute bottom-4 right-4 text-6xl opacity-80 transform rotate-12 flex items-end\"></p><p><span class=\"text-7xl text-yellow-600\">🌾</span></p><p></div></p><p></div>",
            "passageLayout": "html",
            "mondaiHeader": "問題30　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "questions": [
              {
                "id": "q30-1",
                "questionText": "問い どうして日本人は集団主義になったと書かれているか。",
                "options": [
                  "何千年も米を食べ続けているから。",
                  "昔から協力して飲み水を管理してきたから。",
                  "自分の田んぼで上手に稲を作ろうと競争してきたから。",
                  "みんなでする作業が多い稲作を続けてきたから。"
                ],
                "correctOption": {
                  "text": "みんなでする作業が多い稲作を続けてきたから。",
                  "explanation": "「稲作では田植えや収穫など、みんなで一度に行う作業が多い。」「このような稲作を何千年も続ける中で、日本社会では『みんな』がとても重要な基準になっていったのだろう。」と書かれています。"
                }
              }
            ]
          },
          {
            "title": "第3部 問題31",
            "passageText": "<div class=\"bg-[var(--color-bg-secondary)] dark:bg-gray-800 p-6 md:p-8 rounded border-2 border-gray-400 font-sans shadow-md relative overflow-hidden\">\n\n  <h3 class=\"font-bold text-lg border-b border-gray-400 pb-2 mb-4\">使用方法</h3>\n  <ul class=\"space-y-3 mb-8 text-sm md:text-base leading-relaxed\">\n    <li>①右側のハンドルを引き出します。</li>\n    <li>②ハンドルを矢印の方向にくり返し回すことで、発電ができます。1分間の発電で、約10分の使用が可能です。</li>\n    <li>③ライトスイッチを押すと、ライトがつきます。</li>\n    <li>④ライトスイッチを押してから、白いボタンを押すと、ライトを点滅<span class=\"text-xs\">",
            "passageLayout": "html",
            "mondaiHeader": "問題31　つぎの文章は手動発電式ライトの説明書である。本文を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1)</span>させることができます。</li></p><p></ul></p><p><h3 class=\"font-bold text-lg border-b border-gray-400 pb-2 mb-4 mt-8\">使用上の注意</h3></p><p><ul class=\"space-y-3 mb-4 text-sm md:text-base leading-relaxed ml-2\"></p><p><li>・長時間ご使用の場合、ライトが暗くなることがあります。<br/>　暗くなりましたら、発電用ハンドルを回してください。</li></p><p><li>・故障の原因となりますので、中を開けて分解しないでください。</li></p><p><li>・本製品は防水性ではありませんので、ぬらさないでください。</li></p><p></ul></p><p><!-- Flashlight Icon --></p><p><div class=\"absolute bottom-4 right-4 text-6xl opacity-80 transform -rotate-12\"></p><p>🔦</p><p></div></p><p></div></p>",
            "questions": [
              {
                "id": "q31-1",
                "questionText": "問い 本文の内容と合っているものはどれか。",
                "options": [
                  "ライトがつかなくなったら、電池を取り替えればよい。",
                  "ライトが暗くなったら、ハンドルを回して発電すればよい。",
                  "ライトスイッチを押せば、ライトを点滅させることができる。",
                  "長時間使うとライトが暗くなるので、短い時間だけ使うようにする。"
                ],
                "correctOption": {
                  "text": "ライトが暗くなったら、ハンドルを回して発電すればよい。",
                  "explanation": "「使用上の注意」に、「長時間ご使用の場合、ライトが暗くなることがあります。暗くなりましたら、発電用ハンドルを回してください。」と書かれています。"
                }
              }
            ]
          },
          {
            "title": "第4部 問題32",
            "passageText": "<div class=\"bg-gray-100 dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-400 font-sans shadow-md text-sm md:text-base leading-loose max-w-2xl mx-auto relative\">\n\n  <!-- Email Headers -->\n  <div class=\"mb-6 space-y-1 pb-4 border-b border-dashed border-gray-500\">\n    <div class=\"flex\">\n      <span class=\"font-bold w-20 tracking-widest\">あて先</span>\n      <span>： 1234abc@lits.ac.jp</span>\n    </div>\n    <div class=\"flex\">\n      <span class=\"font-bold w-20 tracking-widest\">件名</span>\n      <span>： 月曜日の約束</span>\n    </div>\n    <div class=\"flex\">\n      <span class=\"font-bold w-20 tracking-widest\">送信日時</span>\n      <span>： 20XX年7月16日 13:16</span>\n    </div>\n  </div>\n\n  <!-- Email Body -->\n  <div class=\"space-y-4\">\n    <p>サラさん</p>\n    <p>こんにちは、山田です。</p>\n    <p>来週の月曜日に研究室に来てくれるという約束でしたが、<br/>実は急に会議が入ってしまい、都合が悪くなってしまいました。</p>\n    <p>申し訳ないけれど、日時を変更させてください。</p>\n    <p>もし早いほうがよければ明日、17日の5:00以降、<br/>月曜日よりも後でよければ、水、木なら10時からOKです。</p>\n    <p>サラさんの都合を教えてください。</p>\n  </div>\n\n  <div class=\"mt-8 border-t border-dashed border-gray-500 pt-4\">\n    <p>○×大学 外国語学部</p>\n    <p class=\"font-bold text-lg\">山田 はな</p>\n    <p class=\"text-gray-600 dark:text-gray-400\">e-mail： yamadahana@marubatsu.ac.jp</p>\n  </div>\n\n  <!-- Subtle Envelope Icon -->\n  <div class=\"absolute top-4 right-4 text-4xl opacity-10\">✉️</div>\n</div>",
            "questions": [
              {
                "id": "q32-1",
                "questionText": "問い このメールを読んだ後、サラさんは山田先生にどんなメールを出せばよいか。",
                "options": [
                  "もう一度先生の都合を聞くメール",
                  "自分の都合を教えるメール",
                  "約束を延期したことをあやまるメール",
                  "都合が悪くなったことをあやまるメール"
                ],
                "correctOption": {
                  "text": "自分の都合を教えるメール",
                  "explanation": "メールの最後に「サラさんの都合を教えてください。」と山田先生からお願いされているので、サラさんは自分の都合を返信します。"
                }
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題32　○×大学のサラさんは山田先生の研究室に月曜日に行く約束をしていたが、山田先生から下のようなメールが届いた。これを読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"
          },
          {
            "title": "33",
            "passageText": "3億円が当たる宝くじ<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>がある。それが当たったのにお金を受け取らなかった人がいる。彼は70代の一人暮らしの男性で、受け取らない理由は「どう使えばいいかわからないから。」だそうだ。",
            "questions": [
              {
                "questionText": "問1 ：彼はどうして3億円の宝くじを買ったのか。",
                "options": [
                  "億円を何かに使う夢を見たかったから。",
                  "亡くなった妻が宝くじが好きだったから。",
                  "お金が欲しいと思ったから。",
                  "楽しいことがあると思ったから。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "亡くなった妻が宝くじが好きだったから。"
                },
                "explanation": "Question 33. Answer will be updated soon."
              },
              {
                "questionText": "問2 ：3億円が当たった後で彼はどうしようと思ったか。",
                "options": [
                  "選択肢 1",
                  "選択肢 2",
                  "選択肢 3",
                  "選択肢 4"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "選択肢 4"
                },
                "explanation": "Question 33. Answer will be updated soon."
              },
              {
                "questionText": "問3 ：「彼はかしこい判断をしたのかもしれない。」とあるが、それはなぜか。何人もの人に相談して意見を聞いたから。面倒な問題が起きる可能性がなくなったから。お金を役立つように使おうとしたから。車や家を買って周りの人にあげようと思ったから。",
                "options": [
                  "人間関係のこと、勉強や仕事のことなど、いろいろなストレスが原因で病気になることは少なくない。ストレスなど全くない生活をしてみたいものだが、なかなかそうはいかない。",
                  "どうせストレスから逃げられないのならば、大きなストレスよりも、がまんできるぐらいの小さなストレスのほうがまだいいと思うだろう。しかし、専門家に言わせると、このがまんできるぐらいのストレスが一番問題なのだという。なぜなら、受けたストレスをがまんできると思うと、人はそれを解決せずそのままにしてしまうからだ。そして、そうしているうちに、心や体をこわしてしまうというのだ。反対に、大きなストレスはつらいものだが、何とかそれを解決しようという力を起こさせ、人が成長するきっかけになることも多いという。",
                  "ストレスが心や体をこわす原因になるかどうかは、その大小ではなく、乗り越えようとする気持ちと関係があるようだ。",
                  "[Questions & Options]"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "どうせストレスから逃げられないのならば、大きなストレスよりも、がまんできるぐらいの小さなストレスのほうがまだいいと思うだろう。しかし、専門家に言わせると、このがまんできるぐらいのストレスが一番問題なのだという。なぜなら、受けたストレスをがまんできると思うと、人はそれを解決せずそのままにしてしまうからだ。そして、そうしているうちに、心や体をこわしてしまうというのだ。反対に、大きなストレスはつらいものだが、何とかそれを解決しようという力を起こさせ、人が成長するきっかけになることも多いという。"
                },
                "explanation": "Question 33. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>今は静かに生活をしていて、それに何の不満もない。彼が宝くじを買ったのは、亡くなった妻が宝くじを楽しんでいたためで、お金が欲しいからではなかった。3億円を受け取っても、それを分けるような子どもや親せきもいないし、高級車や大きな家を買う必要もない。それよりも、もし3億円を受け取ったら、その金を目的に人が寄ってきていろいろな問題が起きるかもしれない。楽しい事より大変な事が多いと考えたのだろう。</p><p>何人もの人が受け取るようにすすめたが、彼の気持ちは変わらなかった。当たらない者から見たらもったいない話だが、彼はかしこい判断をしたのかもしれない。(注1)宝くじ：番号などのついた券を買い、当たれば賞金がもらえる。</p><p>[Questions & Options]</p><p>子どもや親せきと分けようと思った。高級車を買おうと思った。大きな家を買おうと思った。受け取らないことにしようと思った。</p>"
          },
          {
            "title": "第4部 問題33",
            "passageText": "<div class=\"bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]\">\n\n  <div class=\"space-y-4 text-sm md:text-base leading-loose indent-4 mb-8\">\n    <p>3億円が当たる宝くじ<span class=\"text-xs\">\n</span>がある。それが当たったのにお金を受け取らなかった人がいる。彼は70代の一人暮らしの男性で、受け取らない理由は「どう使えばいいかわからないから。」だそうだ。</p></p><p><p>今は静かに生活をしていて、それに何の不満もない。彼が宝くじを買ったのは、亡くなった妻が宝くじを楽しんでいたためで、お金が欲しいからではなかった。3億円を受け取っても、それを分けるような子どもや親せきもいないし、高級車や大きな家を買う必要もない。それよりも、もし3億円を受け取ったら、その金を目的に人が寄ってきていろいろな問題が起きるかもしれない。楽しい事より大変な事が多いと考えたのだろう。</p></p><p><p>何人もの人が受け取るようにすすめたが、彼の気持ちは変わらなかった。当たらない者から見たらもったいない話だが、彼はかしこい判断をしたのかもしれない。</p></p><p></div></p><p><!-- Lottery icon hint --></p><p><div class=\"absolute bottom-4 right-4 text-6xl opacity-80 transform rotate-12 flex items-end\"></p><p><span class=\"text-7xl\">🎫</span></p><p><span class=\"text-5xl -ml-4 -mb-2\">💴</span></p><p></div></p><p></div>",
            "passageLayout": "html",
            "mondaiHeader": "問題33　つぎの文章を読んで質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
            "questions": [
              {
                "id": "q33-1",
                "questionText": "問1 彼はどうして3億円の宝くじを買ったのか。",
                "options": [
                  "3億円を何かに使う夢を見たかったから。",
                  "亡くなった妻が宝くじが好きだったから。",
                  "お金が欲しいと思ったから。",
                  "楽しいことがあると思ったから。"
                ],
                "correctOption": {
                  "text": "亡くなった妻が宝くじが好きだったから。",
                  "explanation": "「彼が宝くじを買ったのは、亡くなった妻が宝くじを楽しんでいたためで、お金が欲しいからではなかった。」とはっきり書かれています。"
                }
              },
              {
                "id": "q33-2",
                "questionText": "問2 3億円が当たった後で彼はどうしようと思ったか。",
                "options": [
                  "子どもや親せきと分けようと思った。",
                  "高級車を買おうと思った。",
                  "大きな家を買おうと思った。",
                  "受け取らないことにしようと思った。"
                ],
                "correctOption": {
                  "text": "受け取らないことにしようと思った。",
                  "explanation": "最初の段落に「それが当たったのにお金を受け取らなかった人がいる」とあります。"
                }
              },
              {
                "id": "q33-3",
                "questionText": "問3 「彼はかしこい判断をしたのかもしれない。」とあるが、それはなぜか。",
                "options": [
                  "何人もの人に相談して意見を聞いたから。",
                  "面倒な問題が起きる可能性がなくなったから。",
                  "お金を役立つように使おうとしたから。",
                  "車や家を買って周りの人にあげようと思ったから。"
                ],
                "correctOption": {
                  "text": "面倒な問題が起きる可能性がなくなったから。",
                  "explanation": "「もし3億円を受け取ったら、その金を目的に人が寄ってきていろいろな問題が起きるかもしれない。楽しい事より大変な事が多いと考えたのだろう。」とあり、受け取らないことでその問題を回避できたため賢いと評価されています。"
                }
              }
            ]
          },
          {
            "title": "問題34",
            "passageText": "人間関係のこと、勉強や仕事のことなど、いろいろなストレスが原因で病気になることは少なくない。ストレスなど全くない生活をしてみたいものだが、なかなかそうはいかない。",
            "questions": [
              {
                "questionText": "問1 ：専門家はストレスについてどう言っているか。",
                "options": [
                  "人間関係や勉強や仕事のことなどがストレスになる。",
                  "ストレスが原因で体をこわすこともある。",
                  "小さなストレスが一番困る。",
                  "ストレスが全くない生活をするべきだ。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "小さなストレスが一番困る。"
                },
                "explanation": "Question 34. Answer will be updated soon."
              },
              {
                "questionText": "問2 ：そうしているうちにとあるが、これは何を指しているのか。",
                "options": [
                  "大きなストレスをがまんしているうちに",
                  "大きなストレスを解決しようとしているうちに",
                  "小さなストレスをそのままにしているうちに",
                  "ストレスが全然ない生活をしているうちに"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "小さなストレスをそのままにしているうちに"
                },
                "explanation": "Question 34. Answer will be updated soon."
              },
              {
                "questionText": "問3 ：本文の内容と合っているものはどれか。",
                "options": [
                  "小さくてがまんできるストレスならば何も心配はいらない。",
                  "ストレスが大きいと必ず心や体をこわしてしまう。",
                  "小さなストレスでも解決しなければ心や体をこわす原因になる。",
                  "大きなストレスは成長するきっかけになるから辛くない。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "小さなストレスでも解決しなければ心や体をこわす原因になる。"
                },
                "explanation": "Question 34. Answer will be updated soon."
              }
            ]
          },
          {
            "title": "問題35つぎの文章を読んで質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。(Reading Passage)",
            "passageText": "トキは大きくて美しい鳥である。体の大きさは75センチほどで、羽を広げると140センチにもなる。体の色は白っぽく見えるが、羽を広げると、うすい赤い色をしている。これはトキ色と呼ばれ、人々に好まれた。昔は日本中どこでもトキを見ることができたが、100年ほど前から を取るために捕まえられ、少しずつ を減らしていった。 化が進むと、トキが暮らす田んぼや が減ったり、環境が汚染されたりして、その数は非常に少なくなった。そして1981年、ついに日本のトキは絶滅した(1) 現在は、中国にいた同じ種類のトキを輸入し、佐渡という島で てている。そして、 が増えてきたら自然に戻すという計画が立てられている。トキを複居(2)させるため、多くの金を使い、多くの人々が努力している。自然は簡箪に笑われるが、一度笑われたら元に戻すのは簡単ではない。",
            "questions": [
              {
                "questionText": "問1 日本のトキの説明について、本文と言っているものはどれか。",
                "options": [
                  "は日本中にいたが、 を減らし、今は に数争いるだけである。",
                  "日本各地の田んぼや にいたが、絶滅し、今は輸入されたトキを着てている。",
                  "化が進むにしたがって数が減ってしまったが、現在はまた増えている。",
                  "絶滅してしまったため、トキに似た中国の鳥を輸入し、育てている。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "日本各地の田んぼや にいたが、絶滅し、今は輸入されたトキを着てている。"
                },
                "explanation": "Question 35. Answer will be updated soon."
              },
              {
                "questionText": "問2 日本のトキはなぜ、数が減ったのか。",
                "options": [
                  "トキが田んぼや森の生き物を食べすぎて、痛まえられたから。",
                  "捕まえられた上に、トキの住む環境も無化したから。",
                  "トキの生きられる場所が減り、中国などの国に行ってしまったから。",
                  "きれいなトキを飼いたいと思った人が多く、捕まえられたから。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "捕まえられた上に、トキの住む環境も無化したから。"
                },
                "explanation": "Question 35. Answer will be updated soon."
              },
              {
                "questionText": "問3 この文章を書いた人が言いたいことは何か。",
                "options": [
                  "非常にきれいな日本のトキが絶滅してしまったのは残念なことだ。",
                  "美しい生き物は、経済的に大変でも、び増やして自然にしたほうがいい。",
                  "白熱は、復活させるのが非常に難しいので、大切にしなければならない。",
                  "自然が笑われかけても、さまざまな方法により復活させることができる。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "白熱は、復活させるのが非常に難しいので、大切にしなければならない。"
                },
                "explanation": "Question 35. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>(注1)絶滅する:ある種類の生物がすっかりいなくなる (注2)複居:なくなってしまったものが、また元に戻ること</p><p>Questions</p>"
          },
          {
            "title": "問題36 (Copy-Paste Friendly Format)",
            "passageText": "つぎの文章を読んで質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n町やビルで見かける飲み物の自動販売機は便利だが、夜、だれも使っていないのに、明かりがついているのを見ると、電気代をむだ使いしているように感じられる。\n\nしかし、実は、自動販売機はエネルギーを節約する技術が非常に進んでいる機械である。そこには、どのような工夫があるのだろうか。\n\nまず、冷たい飲み物は、全部を冷やすのではなく、売る直前の分だけ冷やすようになっている。自動販売機の中にあるコンピューターが、曜日や時間による売れ方の変化を見て、最小限の数だけを冷やすのである。だから、電気代が少なくてすむ。\n\nまた、冷たい飲み物と温かい飲み物を同時に売る自動販売機の場合、冷たい飲み物を冷やしたときに出る熱を使って、温かい飲み物を温めることができるようになっている。\n\n以上のようなさまざまな技術によって、自動販売機は電力の消費を減らすことができたのである。",
            "questions": [
              {
                "questionText": "問1 自動販売機が電気をむだ使いしているように見えるのはなぜか。",
                "options": [
                  "自動販売機のエネルギーを節約する技術がなかなか進まないから。",
                  "だれも使っていないときも、明かりがついているから.",
                  "昼だけでなく、夜になっても使う人がいるから。",
                  "町やビルなどさまざまな場所にたくさん置いてあるから。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "だれも使っていないときも、明かりがついているから."
                },
                "explanation": "Question 36. Answer will be updated soon."
              },
              {
                "questionText": "問2 自動販売機の飲み物の冷やし方として、正しいものはどれか。",
                "options": [
                  "急に冷やすのではなく、コンピューターで管理しながらゆっくり冷やす。",
                  "コンピューターによって、売る直前に短い時間で冷やす。",
                  "コンピューターが外の温度の変化を調べて、冷やす。",
                  "コンピューターでいつどのぐらい売れるかがわかるので、その分だけ冷やす。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "コンピューターでいつどのぐらい売れるかがわかるので、その分だけ冷やす。"
                },
                "explanation": "Question 36. Answer will be updated soon."
              },
              {
                "questionText": "問3 自動販売機のエネルギーの節約方法として、正しいものはどれか。",
                "options": [
                  "冷たい飲み物を冷やすと熱が出るので、それで温かい飲み物を温める。",
                  "温かい飲み物から出た熱を利用して、冷たい飲み物を冷やす。",
                  "温かい飲み物は、冷たい飲み物と同じ自動販売機で売らない。",
                  "温かい飲み物は自動販売機の明かりの熱で温める。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "冷たい飲み物を冷やすと熱が出るので、それで温かい飲み物を温める。"
                },
                "explanation": "Question 36. Answer will be updated soon."
              }
            ]
          },
          {
            "title": "問題37 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "日本語で話し合いをしているとき、なかなか話に入れないことがある。どうしたら、参加できるようになるだろうか。\n\nまずは、だれかが話しているとき、首を縦に振って「うなずく」ことである。1対1の話し合いならうなずいている人でも、大勢での話し合いでは、何もしないでじっとしていることがある。しかし、これでは話している人は、不安になってしまう。うなずきは、相手の意見に同意するときだけでなく、同意できないときでも「あなたの話を聞いています」という合図なので、小さくうなずくだけで話し合いに参加できていることになる。そうすると、話し手は安心して先に進める。うなずくとき、「はい」や「そうですね」と相づちを打ってもいい。\n\nさらに、共感できる<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>ところで「本当にそうですね」と言うことが大切である。このようにしていると、会話に入りやすくなる。",
            "questions": [
              {
                "questionText": "問1 「そうすると」とあるが、どのようにすることか。",
                "options": [
                  "相手に「あなたの話を聞いています」と言う。",
                  "相手の意見に同意できるときにだけ、首を縦に振る。",
                  "相手が話しているときは、何もしないでじっとしている。",
                  "相手の意見に同意できるときもできないときも首を縦に振る。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "相手の意見に同意できるときもできないときも首を縦に振る。"
                },
                "explanation": "Question 37. Answer will be updated soon."
              },
              {
                "questionText": "問2 うなずくことは、どのような役割があるか。",
                "options": [
                  "相手の話を早く先に進ませる役割",
                  "相手の話を聞いていることを示す役割",
                  "相手の意見に共感していることを伝える役割",
                  "自分がこれから話し始めたいことを表す役割"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "相手の話を聞いていることを示す役割"
                },
                "explanation": "Question 37. Answer will be updated soon."
              },
              {
                "questionText": "問3 この文章では、どうすれば上手に話を始められると言っているか。",
                "options": [
                  "1対1の話し合いではうなずくこと、大勢では相づちを打つこと",
                  "だれかが話しているときにうなずいたり、相づちを打ったりすること",
                  "相手が話している間はじっと聞き、終わってから「そうですね」と言うこと",
                  "相手の話に共感できなくても、「本当にそうですね」と相づちを打つこと"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "だれかが話しているときにうなずいたり、相づちを打ったりすること"
                },
                "explanation": "Question 37. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>（今井登茂子「うなずいて共感を表現」日本経済新聞朝刊2011年9月24日より）</p><p>(注1)共感する：相手の気持ちや意見を自分も同じように感じたり、理解したりする。</p>"
          },
          {
            "title": "問題38 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "科学技術の進歩によって、私たちの生活はより快適で便利になっている。しかし、便利になるということは、昔の人間の能力が失われることだとも言われている。\n\nたとえば、重いものを持ち上げて運ぶとき、機械がなかった時代には人が行っていた。昔の武術<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>を研究している人の話によると、これはそのころの人が今よりずっと力があったというわけではなく、どのように体を使えば重いものを運べるかがわかっていたので、できたのだという。だが、今は、それが伝えられることもなくなりつつある。",
            "questions": [
              {
                "questionText": "問1 なぜ人間の能力が失われるのか。",
                "options": [
                  "今は、昔よりも生活に役立つ機械や道具が増えてきたから。",
                  "今の人々は昔のことを思い出そうとしなくなったから。",
                  "昔の人々はいつも能力を高めようとしていたが、今はしないから。",
                  "昔と違い、今の人々は快適で便利な生活を求めなくなったから。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "今は、昔よりも生活に役立つ機械や道具が増えてきたから。"
                },
                "explanation": "Question 38. Answer will be updated soon."
              },
              {
                "questionText": "問2 「それ」とは何を指すか。",
                "options": [
                  "機械",
                  "力のある体",
                  "体の使い方",
                  "昔の人々の協力"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "体の使い方"
                },
                "explanation": "Question 38. Answer will be updated soon."
              },
              {
                "questionText": "問3 この文章では科学技術の進歩について、どう言っているか。",
                "options": [
                  "進歩によってよりよい生活が送れるが、人がやっていた仕事がなくなる。",
                  "進歩はすばらしいが、それによって人と人とのつながりが失われていく。",
                  "進歩すると、機械や道具に頼って、さまざまなことが自分でできなくなる。",
                  "進歩するにしたがって、昔のことは伝えられず、どんどん忘れられてしまう。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "進歩すると、機械や道具に頼って、さまざまなことが自分でできなくなる。"
                },
                "explanation": "Question 38. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>また、文字を持たない社会には、非常に長い物語や詩などでも、覚えて伝えられる人がいた。しかし、今、そのような人は非常に少なくなっている。こうしたことを考えると、自分たちがなくしたものの存在に気づかされる。</p><p>これから、私たちはどのような能力を失うのだろうか。</p><p>目的 | 割合 (%)</p><p>生活費を稼ぐため | 32.8%</p><p>学生生活を楽しむため | 32.4%</p><p>社会経験のため | 24.2%</p><p>無回答 | 5.1%</p><p>その他 | 4.5%</p><p>勉学費を稼ぐため | 1.0%</p><p>(注1)武術：武士が戦いのために身につけなければならない技術や精神</p>"
          },
          {
            "title": "問題39 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "日本では1960年代ごろから車が増加し、道路が整備される<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>とともに、地方都市が都市の外側へと広がった。郊外に住む人が増え、大きなスーパーや病院のような施設(注2)も郊外に造られるようになったのである。そうした所へは歩いて行けないが、車で行けるようになった。しかし、それで困るのが高齢者である。高齢者は車を運転する人が多くないため、郊外まで買い物や病院に行くのが難しい。",
            "questions": [
              {
                "questionText": "問1 「外側へと広がった」とは、どのような意味か。",
                "options": [
                  "都市の外側に新しく別の都市ができた。",
                  "道路が造られて、ほかの街へも行きやすくなった。",
                  "都市の郊外にも家や施設ができた。",
                  "都市の面積が広くなって、施設や家も広くなった。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "都市の郊外にも家や施設ができた。"
                },
                "explanation": "Question 39. Answer will be updated soon."
              },
              {
                "questionText": "問2 コンパクトシティとは、本文によるとどのような意味か。",
                "options": [
                  "中心部の多くの店が閉店してしまう都市",
                  "お年寄りが買い物に行ったりするのが難しい都市",
                  "お年寄りが車を運転して買い物などに行ける都市",
                  "施設などを中心部に戻し、人々もそこに住めるようにした都市"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "施設などを中心部に戻し、人々もそこに住めるようにした都市"
                },
                "explanation": "Question 39. Answer will be updated soon."
              },
              {
                "questionText": "問3 こうした都市が注目されているとあるが、なぜ注目されているか。",
                "options": [
                  "車を呼ぶと、お年寄りをいろいろな店や施設に連れて行ってくれるから。",
                  "都市の中心にある店や施設に、お年寄りが簡単に行けるようになったから。",
                  "都市の中心に人々が集まって、にぎやかになっているから。",
                  "高齢化が進み、人口が減る中で、この都市は人口が増えると思われるから。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "都市の中心にある店や施設に、お年寄りが簡単に行けるようになったから。"
                },
                "explanation": "Question 39. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>一方、都市の中心部の店には客が来なくなって、閉店するところも増えてしまった。そこで、最近、いくつかの都市はさまざまな施設を再び都市の中心に戻し、人々も中心部に集まって住めるようにしようとしている。このような都市はコンパクトシティと言われており、お年寄りも気軽にいろいろな場所へ行くことができる。高齢化が進み、人口が減少している現在、こうした都市が注目されている。</p><p>(注1)整備する：使えるような状態にする</p><p>(注2)施設：ある目的のために造られた建物</p>"
          },
          {
            "title": "問題40 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "「スキーが好きです。」「この肉、食べにくい。」のように、同じ音、同じような音を使う言葉の遊びをダジャレと言う。日本語には似た発音でも意味が違う言葉が多いので、ダジャレを作りやすい。小学生や中高年のおじさんたちなどはダジャレが大好きだ。ただ、おじさんが言うと、たいてい冷たい目で見られる。つまらなかったり、同じダジャレを何度も言ったりするからだ。\n\nそれでも、ダジャレは役に立つこともある。だれにでも作れ、うまいダジャレなら人を笑わせて気持ちを明るくすることができる。\n\nまた、ある脳の研究者によると、ふだんからおもしろいダジャレを作ろうとしていれば、脳を鍛える<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>ことにもなり、ボケ防止(注2)にも役立つらしい。",
            "questions": [
              {
                "questionText": "問1 冷たい目で見られるのはだれか。",
                "options": [
                  "ダジャレを聞いた人",
                  "ダジャレを言ったおじさん",
                  "ダジャレを言った小学生",
                  "この文を書いた人"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "ダジャレを言ったおじさん"
                },
                "explanation": "Question 40. Answer will be updated soon."
              },
              {
                "questionText": "問2 この文章によると、ダジャレのよい点は何か。",
                "options": [
                  "ダジャレを作ろうとすると、脳のトレーニングになる。",
                  "ダジャレを作るために、いろいろなことを調べる。",
                  "ダジャレを聞いて笑うと、脳の働きがよくなる。",
                  "ダジャレを聞くと、似たような音の言葉をたくさん覚える。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "ダジャレを作ろうとすると、脳のトレーニングになる。"
                },
                "explanation": "Question 40. Answer will be updated soon."
              },
              {
                "questionText": "問3 この文章を書いた人が一番言いたいことはどれか。",
                "options": [
                  "中高年の男性はおもしろいダジャレを言うが、まわりの人は理解できない。",
                  "中高年の男性はダジャレを言う人が多く、よくみんなを楽しませている。",
                  "ダジャレはだれにでも作れるが、まわりの人に言うのはよいことではない。",
                  "ダジャレは簡単に作れ、緊張をなくしたり、気持ちを明るくすることもできる。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "ダジャレは簡単に作れ、緊張をなくしたり、気持ちを明るくすることもできる。"
                },
                "explanation": "Question 40. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>簡単な言葉遊びで緊張がとけたり、笑い合って明るい気持ちになったり、脳のトレーニングにもなるなら、それはすばらしいことではないだろうか。</p><p>(注1)鍛える：練習などを繰り返して、体や心や技術をしっかりさせる</p><p>(注2)ボケ防止：脳の働きが悪くなるのを防ぐこと</p>"
          },
          {
            "title": "問題41 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "<div class=\"relative w-full max-w-3xl mx-auto border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-sm my-6 overflow-x-auto shadow-inner\">\n  <div style=\"writing-mode: vertical-rl; height: 380px; font-family: 'Noto Serif JP', serif;\" class=\"mx-auto text-base md:text-lg leading-[2.5] text-gray-900 dark:text-gray-100\">\n    <p>拝啓</p>\n    <p style=\"margin-top: 1em;\">桜が満開になり、すっかり春らしくなりました。いかがお過ごしでしょうか。</p>\n    <p style=\"margin-top: 1em;\">さて、このたび、私が習っているギターの先生のコンサートが六月十日に開かれることになりました。今回は、先生のお友達であるプロのギタリスト、南ゆかりさんが特別ゲストとして出演されます。<span style=\"text-decoration: underline; text-underline-offset: 4px;\">詳細</span><span style=\"font-size: 0.75em; text-orientation: mixed;\"><span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span></span>は同封のチラシをごらんください。",
            "questions": [
              {
                "questionText": "問1 このコンサートに出演するのはだれか。",
                "options": [
                  "大山さんと南ゆかりさん",
                  "大山さんと先生と南ゆかりさん",
                  "先生と南ゆかりさん",
                  "南ゆかりさんと特別ゲスト"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "先生と南ゆかりさん"
                },
                "explanation": "Question 41. Answer will be updated soon."
              },
              {
                "questionText": "問2 ヘンドラさんは、妻とこのコンサートに行きたい。どうしたらよいか。",
                "options": [
                  "大山さんにメールで2人分の券をお願いする。",
                  "大山さんにメールで2人分の券をお願いし、受付にお金を送る。",
                  "会場にメールで2人分の券をお願いする。",
                  "会場にメールで2人分の券をお願いし、当日、受付でお金を払う。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "大山さんにメールで2人分の券をお願いする。"
                },
                "explanation": "Question 41. Answer will be updated soon."
              },
              {
                "questionText": "問3 行く連絡は、いつまでにしなければならないか。",
                "options": [
                  "4月2日",
                  "4月3日",
                  "6月9日",
                  "6月10日"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "6月9日"
                },
                "explanation": "Question 41. Answer will be updated soon."
              }
            ],
            "passageNotes": "</p><p><p style=\"margin-top: 1em;\">お忙しいことと思いますが、ご来場いただければ幸いです。なお、席が限られていますので、来ていただけるのでしたら、私あてに前日までにメールかお電話で人数をご連絡いただけますか。入場券を受付に用意しておきます。代金は結構です。</p></p><p><p style=\"margin-top: 1em;\">まだ、気温の変化が大きい日々が続きます。どうぞお体にお気をつけて過ごされますように。</p></p><p><p style=\"text-align: right; margin-top: 1em;\">敬具</p></p><p><p style=\"text-align: right; margin-top: 1em;\">二〇一三年四月三日</p></p><p><p style=\"text-align: right; margin-bottom: 2em;\">大山春暖</p></p><p><p style=\"margin-top: 2em;\">ヘンドラ・ミラン様</p></p><p></div></p><p></div></p>"
          },
          {
            "title": "問題42 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "日本語では「する」という言い方よりも「なる」という言い方のほうが好んで使われる。「する」を使うと話し手の意志があることが伝わり、「なる」を使うと話し手の意志ではなく自然に起きた、そのような状態にあるということが伝わる。\n\n例えば、禁煙のレストランで一人の客がタバコを吸っている場面で、店側は何と言ってタバコをやめてもらうだろうか。このレストランを禁煙と決めたのは店の人だ。店の人の意志でそのレストランを禁煙にしたはずだ。それならば、「ここは禁煙にしております。」と言うのが自然に思える。しかし、この「〜にする」は、上に書いたとおり、話し手の意志が強く伝わる。この場面では、相手の「たばこを吸う」という行動に対立する<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>意志が強く表現されてしまう。その結果、相手を怒らせてしまうかもしれない。一方、「ここは禁煙になっております。」と言うと、自分の意志とは関係なく、単にレストランの決まりを伝えているという形になり、相手と対立するような形にはならずに言いたいことを伝えられる。",
            "questions": [
              {
                "questionText": "問1 「話し手の意志がある」とあるが、どういうことか。",
                "options": [
                  "話し手がそうしたいと思ってやっている。",
                  "話し手が自然にそうしている。",
                  "話し手はやりたくないのにやっている。",
                  "話し手はどちらでもいいが聞き手がそうしたいと思っている。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "話し手がそうしたいと思ってやっている。"
                },
                "explanation": "Question 42. Answer will be updated soon."
              },
              {
                "questionText": "問2 「上に書いた」とおりとあるが、どこを指しているか。",
                "options": [
                  "日本語では「する」という言い方よりも「なる」という言い方が好まれる。",
                  "日本語では「する」を使うと話し手の意志があることが伝わる。",
                  "店の人の意志でそのレストランを禁煙にしたはずだ。",
                  "「ここは禁煙にしております。」と言うのが自然に思える。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "日本語では「する」を使うと話し手の意志があることが伝わる。"
                },
                "explanation": "Question 42. Answer will be updated soon."
              },
              {
                "questionText": "問3 この場合の店の人の一番の目的は何か。",
                "options": [
                  "タバコを吸っている客にレストランの決まりを伝えたい。",
                  "レストランでタバコを吸っている客にタバコをやめさせたい。",
                  "タバコを吸っている客を叱りたい。",
                  "タバコを吸っている客を傷つけたくない。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "レストランでタバコを吸っている客にタバコをやめさせたい。"
                },
                "explanation": "Question 42. Answer will be updated soon."
              },
              {
                "questionText": "問4 この文章の内容として正しいものはどれか。",
                "options": [
                  "「する」は相手の意志を強く伝えるもので、対立することがある。",
                  "「なる」を使うと対立をさけることができる。",
                  "「する」は単に決まりを教える言い方である。",
                  "「なる」を使うと相手と対立してしまう。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "「なる」を使うと対立をさけることができる。"
                },
                "explanation": "Question 42. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>このように日本人は「なる」をうまく使うことで人と対立しないようにしているのだ。「する」と「なる」は文字で見るとたった一文字の小さい違いだが、コミュニケーションの上では大きな違いなのである。</p><p>(注1)対立する：二つのものが反対の立場に立つ</p>"
          },
          {
            "title": "問題43 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "日本人にとって桜は特別な木である。春になると桜の花の美しさを求めて、家族や仲間が集まって花見を楽しむ。桜で有名な場所は各地にあるが、近所の公園や並木<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>などにも、桜が楽しめるところは数多くある。",
            "questions": [
              {
                "questionText": "問1 桜の花は開いてからどうなるか。",
                "options": [
                  "翌日には散り始める。",
                  "花の色が変わっていく。",
                  "何週間も咲いている。",
                  "7日間ぐらいは咲いている。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "7日間ぐらいは咲いている。"
                },
                "explanation": "Question 43. Answer will be updated soon."
              },
              {
                "questionText": "問2 「掃除ぐらいで文句を言ってはいけないだろう。」とあるが、どういうことか。",
                "options": [
                  "花や葉で楽しませてくれることに比べたら、掃除の大変さは小さいことだ。",
                  "掃除はいいことなので、文句を言わずに進んでやらなければならない。",
                  "落ち葉の掃除は花びらの掃除ほど大変ではないので文句を言ってはいけない。",
                  "掃除はとても大変なので、やりたくないのはあたりまえだ。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "花や葉で楽しませてくれることに比べたら、掃除の大変さは小さいことだ。"
                },
                "explanation": "Question 43. Answer will be updated soon."
              },
              {
                "questionText": "問3 「最も手がかかるのは、長生きさせることである。」とあるが、どうすればよいか。",
                "options": [
                  "何もしないほうがいい。",
                  "重くなった枝を切る。",
                  "花びらや葉を掃除する。",
                  "いらない枝を切る。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "いらない枝を切る。"
                },
                "explanation": "Question 43. Answer will be updated soon."
              },
              {
                "questionText": "問4 この文章を書いた人が一番言いたいことは何か。",
                "options": [
                  "桜は手をかけても70年ぐらいで枯れてしまう。",
                  "今ある桜が枯れたら日本には桜がなくなってしまう。",
                  "手がかかっても日本人は桜の木を特別に大切にしている。",
                  "桜を長生きさせるためには花びらや葉を掃除しなければいけない。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "手がかかっても日本人は桜の木を特別に大切にしている。"
                },
                "explanation": "Question 43. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>桜はとても手がかかる木である。花は春の1週間ほどはきれいだが、すぐに散り始め、小さな花びらがあちこちに飛んで行き、何日も掃除しなければならない。葉は秋に赤や黄色に変わり、再び私たちの目を楽しませてくれるが、すぐに落ちて、大量の落ち葉を片付けるのがまた大変である。</p><p>しかし、美しい花や紅葉を見せてくれるのだから、その掃除ぐらいで文句を言ってはいけないだろう。</p><p>桜で最も手がかかるのは、長生きさせることである。放っておく(注2)と60～70年ぐらいで木が弱り、枯れてしまうと言われている。このため、不要な枝を切ったり、重くて下がってきた枝を支えたり、度々世話をする必要があるのだ。このような作業はとても面倒だが、桜を大切に思う人々により全国で行われていて、樹齢100年を超える桜も珍しくない。</p><p>古くからある桜を大事にするだけでなく、新しい桜を植えることもさかんだ。新しい公園や学校ができると必ず若い桜の木が植えられる。手がかかると分かっていても、日本人は身近なところに桜の木があってほしいと思うのだ。日本人にとってこれほど特別な木は桜のほかにはないだろう。</p><p>(注1)並木：何十メートルも、両側に木が植えてある道</p><p>(注2)放っておく：世話などを何もしない</p>"
          },
          {
            "title": "問題44 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "今、一つの家で家族以外の人と一緒に暮らす、シェアハウスという住宅が増えている。シェアハウスとは、アパートのように自分用のかぎ付きの部屋はあるが、台所や居間、シャワー、トイレなどは共同で使う住宅である。\n\n家賃は周りのアパートなどと同じ程度だが、共同部分があるため、部屋に冷蔵庫などを置く必要がなく、自分の部屋を広く使える。また、一人暮らしの自由を楽しめるだけでなく、共同部分でほかの住人と交流ができるため、さびしさや不安も少なくなる。仕事も国籍も年齢も違う人と一緒に過ごせば、おもしろい発見があるかもしれない。\n\nただし、快適に生活するためにはいくつか注意点がある。入る前に、必ず見学をして、そこに住んでいる人と自分の生活のしかたが合うかどうかを確認することだ。年齢や職業もチェックしたほうがいい。共同部分の使い方についても、どのような決まりになっているかを知っておきたい。掃除、音などで問題が起きることもあるからだ。また、ベッドなどの家具や洗濯機等の電気製品が付いているかどうかも確認したほうがいい。付いている場合は、入るときにこれまで持っていたものを手放さなければならず、出たあとは、買う必要がある。入る前に、以上の点に注意しておけば、失敗が少ないだろう。",
            "questions": [
              {
                "questionText": "問1 この文章のシェアハウスの説明と合っているものはどれか。",
                "options": [
                  "家賃が周りのアパートより安い。",
                  "一人一人が独立した部屋を持っている。",
                  "一人一人に専用のトイレとシャワーがある。",
                  "一人の部屋の広さがふつうのアパートより広い。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "一人一人が独立した部屋を持っている。"
                },
                "explanation": "Question 44. Answer will be updated soon."
              },
              {
                "questionText": "問2 シェアハウスのよい点はどんなところだと言っているか。",
                "options": [
                  "共同部分では他の人と話ができるので、さびしくない。",
                  "自分で掃除をしたり、ご飯を作ったりする必要がない。",
                  "どのシェアハウスにも家具や電気製品がついている。",
                  "同じような年齢や仕事の人と気を遣わずに住むことができる。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "共同部分では他の人と話ができるので、さびしくない。"
                },
                "explanation": "Question 44. Answer will be updated soon."
              },
              {
                "questionText": "問3 シェアハウスに入るときの注意点で本文と合っているのはどれか。",
                "options": [
                  "自分の生活のしかたが住んでいる人と合うかどうか、見学をして調べる。",
                  "年齢や仕事が違う人が住んでいたら、そこには住まないほうがいい。",
                  "共同部分の使い方について、自分で決まりを作らなければならない。",
                  "ベッドや電気製品を持っていたら、必ず手放さなければならない。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "自分の生活のしかたが住んでいる人と合うかどうか、見学をして調べる。"
                },
                "explanation": "Question 44. Answer will be updated soon."
              },
              {
                "questionText": "問4 この文章を書いた人が伝えたいことは何か。",
                "options": [
                  "シェアハウスは気をつけるべき点があり、住んでみて後悔する人が多い。",
                  "シェアハウスは経済的で、住人同士の交流もあるので、増やすべきだ。",
                  "シェアハウスはよい点が多いが、注意点を確認してから決めたほうがいい。",
                  "シェアハウスでは一人の自由な時間がないが、ほかの住人と安心して住める。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "シェアハウスはよい点が多いが、注意点を確認してから決めたほうがいい。"
                },
                "explanation": "Question 44. Answer will be updated soon."
              }
            ]
          },
          {
            "title": "問題45",
            "passageText": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n日本の鉄道は時間が正確なことで有名だ。それには鉄道に関係する人々の努力が欠かせない<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>。列車の掃除もその一つである。",
            "questions": [
              {
                "questionText": "問1 新幹線の掃除について、本文と合っているものはどれか。",
                "options": [
                  "10～12分以内に、1人が1つの車両の掃除をする。",
                  "10～12分の間に、ゴミ出し、トイレや車両の掃除を終わらせる。",
                  "車両では、はじめに忘れ物がないか確認して、床を掃除する。",
                  "車両の座席をきれいにしてから、背もたれの布を取り替える。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "10～12分の間に、ゴミ出し、トイレや車両の掃除を終わらせる。"
                },
                "explanation": "Question 45. Answer will be updated soon."
              },
              {
                "questionText": "問2 安喰さんは、どうして仕事がうまくできるようになったか。",
                "options": [
                  "主婦をしていて、その経験が新幹線の掃除に役に立ったから。",
                  "家の掃除とは違うのに気づき、休みの日に家で練習したから。",
                  "一緒に働く人たちのやり方を見て仕事をしていたから。",
                  "早く終わらせるために、時計を見ないで仕事をしたから。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "家の掃除とは違うのに気づき、休みの日に家で練習したから。"
                },
                "explanation": "Question 45. Answer will be updated soon."
              },
              {
                "questionText": "問3 「うれしさ」とあるが、何がうれしかったのか。",
                "options": [
                  "いつもほど長く掃除をしなくてもよかったこと",
                  "短い時間で仕事を終わらせ、時間どおりに発車できたこと",
                  "時間が短くても、いつもと同じ作業が全部できたこと",
                  "台風でも新幹線がいつもどおり動いていて、掃除ができたこと"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "短い時間で仕事を終わらせ、時間どおりに発車できたこと"
                },
                "explanation": "Question 45. Answer will be updated soon."
              },
              {
                "questionText": "問4 「鉄道が正確な時間に走れる」とあるが、その理由は何か。",
                "options": [
                  "列車が遅れないように各担当者が仕事をきちんとやろうとしているから。",
                  "それぞれの仕事が非常に多くの人々によって行われているから。",
                  "仕事のやり方が細かく決められていて、だれでも問題なくできるから。",
                  "質のいい管理職が担当者をうまく指導し、管理しているから。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "列車が遅れないように各担当者が仕事をきちんとやろうとしているから。"
                },
                "explanation": "Question 45. Answer will be updated soon."
              }
            ],
            "passageNotes": "<p>新幹線の場合を見てみよう。16両の新幹線ならゴミ出しやトイレの掃除なども入れて55人が担当する。1両(63～100席)は普通、2人で担当する。時間は10～12分。遅れると乗客に迷惑をかけ、出発時刻も遅らせてしまう。</p><p>担当者は車内に入ると、まず空いたペットボトル(注2)や缶を集め、座席の背もたれ(注3)にかかっている白い布を取り外す。次に座席を元の位置に戻し、新しい布をつける。ほうきで座席をきれいにし、ひじかけ(注4)をふく。鏡を使って、たなに忘れ物がないか確認する。最後に床を掃く。これを時間内で終わらせなければならない。</p><p>この仕事を12年前にパート(注5)仕事で始めた安喰さんは、それまで主婦をしていたが、家の掃除とはまったく違うことに気づかされた。そのため、休日に自宅の居間にいすを並べて、時間を計って練習したそうだ。2年たつと、時計を見なくても残り時間がわかるようになった。その後、仕事が認められて社員となり、8年目は作業長に、今は550人を指導する管理職になった。</p><p>以前、台風のため新幹線が遅れて掃除時間が4分しかないことがあった。最低限必要な作業をどうするか、不安な気持ちをおさえ、担当者を集めて細かく指示した。決められた時間に出発したときのうれしさは忘れられなかったという。</p><p>このようにさまざまな人々のおかげで日本の鉄道は正確な時間に走れるのである。</p><p>(注1)欠かせない：必要である。なくてはならない。</p><p>(注2)ペットボトル：飲み物を入れるプラスチックの入れもの</p><p>(注3)背もたれ：座る人の背をささえる部分(イラスト参照)</p><p>(注4)ひじかけ：座る人の腕を休めることができる部分(イラスト参照)</p><p>(注5)パート：普通よりも短い時間だけ働くこと</p>"
          },
          {
            "title": "問題46 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "最近、大学だけではなく小中学校でも、成績が悪く授業についていけない生徒は上の学年に進ませずに、もう一度同じ学年で勉強させようという意見が出ている。これは本当に子どもにとってよいことなのだろうか。\n\nまず、一つ目の問題は、クラスの中のつながりが非常に強い小中学校で、自分一人が進級できないと、大変なショックを受ける<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>ということだ。その上、下の学年の生徒が自分より勉強ができるようになってきたら、やる気も自信もなくしてしまうかもしれない。",
            "questions": [
              {
                "questionText": "問1 一つ目の問題とあるが、このような問題が起こる理由は何か。",
                "options": [
                  "元のクラスの生徒といっしょに上の学年に行けないから",
                  "一人だけ授業が終わってから残らなければならないから",
                  "自分がクラスの中で一番勉強をしなかったから",
                  "自分だけが元のクラスの生徒と遊べないから"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "元のクラスの生徒といっしょに上の学年に行けないから"
                },
                "explanation": "Question 46. Answer will be updated soon."
              },
              {
                "questionText": "問2 「その結果は変わらないだろう」とあるが、どういう意味か。",
                "options": [
                  "勉強ができない生徒が上の学年に上がるだろう。",
                  "勉強ができない生徒が上の学年に上がらないだろう。",
                  "勉強ができない生徒が勉強がわかるようになるだろう。",
                  "勉強ができない生徒が勉強がわかるようにならないだろう。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "勉強ができない生徒が勉強がわかるようにならないだろう。"
                },
                "explanation": "Question 46. Answer will be updated soon."
              },
              {
                "questionText": "問3 「この問題」とは何か。",
                "options": [
                  "小学校や中学校で上の学年の勉強の内容が今より難しくなること",
                  "勉強ができない生徒が上の学年に上がったときに授業を理解できないこと",
                  "勉強ができない生徒が授業についていけないので上の学年に上がれないこと",
                  "勉強ができない生徒にボランティアなどが特別な指導をしないこと"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "勉強ができない生徒が上の学年に上がったときに授業を理解できないこと"
                },
                "explanation": "Question 46. Answer will be updated soon."
              },
              {
                "questionText": "問4 上の学年の勉強内容についていくために、この文章を書いた人はどうするべきだと言っているか。",
                "options": [
                  "教師がボランティアといっしょに授業のあとに特別な指導をする。",
                  "ボランティアとクラスのほかの生徒がわからないところを教える。",
                  "勉強の苦手な生徒に合った内容をボランティアが指導する。",
                  "授業中にボランティアがわからないところについて教える。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "勉強の苦手な生徒に合った内容をボランティアが指導する。"
                },
                "explanation": "Question 46. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題46 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>もう一つは、同じ内容をくり返し勉強しても、成績は必ずしも上がらないと思われることだ。成績が悪いのは、勉強をする習慣がない、勉強のやり方がわからない、基礎的なことがわかっていないなどが原因であることが多い。これを何とかしなければ、その結果は変わらないだろう。</p><p>もちろん今の学年の内容がわからないままで上の学年に上がってしまったら、今より難しい内容についていくことはできない。だが、その生徒に対して、ボランティア(注2)が特別に指導をしたりすれば、この問題は改善すると考えられる。</p><p>たとえば、授業が終わったあとに、教師になりたい大学生や、退職した(注3)教師が学校に来て、その生徒の問題を知り、その子どもに合った指導をするのである。このようなことをしていけば、やる気をなくすこともなく、上の学年にいても勉強についていくことができるのではないだろうか。</p><p>(注1)ショックを受ける：ある原因でとても不安になる</p><p>(注2)ボランティア：お金のためではなく、社会に役立つことをすすんでする人</p><p>(注3)退職する：仕事をやめる</p>"
          },
          {
            "title": "問題47 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "恋人や結婚相手の考えていることがわからないと言う人がときどきいる。しかし、相手に自分と同じような考えを期待するほうが間違っているのではないだろうか。\n\n先日、男女の違いについておもしろい話を聞いた。それによると、いくつかの場面で、男性と女性の考え方や行動のしかたが大きく違うようだ。a)とb)のどちらが男性でどちらが女性のことを言っているか、考えながら読んでほしい。\n\n1．買い物について\na) いつも200円のものが100円になっていると、必要がなくても買う。\nb) いつも100円のものが200円になっていても、必要ならば買う。\n\n2．将来について\na) 結婚するまでは将来について心配をしている。\nb) 結婚するまでは将来について何も心配していない。\n\n3．結婚について\na) 相手に変わってほしいと期待しているが、相手は変わらない。\nb) 相手に変わらないでほしいと期待しているが、相手は変わる。\n\nさて、a)とb)、どちらが男性で、どちらが女性か、すぐにわかっただろうか。a)が女性で、b)が男性なのだそうだ。確かに自分や自分の周りの人を見ていると、当たっているようにも思える。男女はもともと違うものだと考えたほうがよさそうだ。\n\n相手は自分と違うのだから、違いを埋めていくための努力がなければ、よい関係を作ることはできないと思ったほうがいいだろう。",
            "questions": [
              {
                "questionText": "問1 買い物について男性はどうだと言っているか。",
                "options": [
                  "いつも値段が安いものを探して買ってしまう。",
                  "値段が高いほうがよいものだと思って買ってしまう。",
                  "買わなくてもいいものでも値段が安いと買ってしまう。",
                  "買わなければならないものなら値段のことは考えずに買ってしまう。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "買わなければならないものなら値段のことは考えずに買ってしまう。"
                },
                "explanation": "Question 47. Answer will be updated soon."
              },
              {
                "questionText": "問2 将来について女性はどうだと言っているか。",
                "options": [
                  "夫ができると、将来について心配し始める。",
                  "夫ができると、将来について心配しなくなる。",
                  "夫ができる前は、将来について心配はしない。",
                  "夫ができてから、将来について心配になる。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "夫ができると、将来について心配しなくなる。"
                },
                "explanation": "Question 47. Answer will be updated soon."
              },
              {
                "questionText": "問3 結婚について男性はどうだと言っているか。",
                "options": [
                  "妻に今のままでいてほしいと願っているが、妻は変わってしまう。",
                  "自分は変わらないと思っているが、いつの間にか変わってしまう。",
                  "妻にもっとよくなってほしいと願っているが、妻はあまり変わらない。",
                  "自分は今のままでいようと思っているが、妻はそうは思っていない。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "妻に今のままでいてほしいと願っているが、妻は変わってしまう。"
                },
                "explanation": "Question 47. Answer will be updated soon."
              },
              {
                "questionText": "問4 この文章で一番言いたいことは何か。",
                "options": [
                  "男性と女性は考えや行動が異なっているから、絶対に分かり合えない。",
                  "男性と女性の考え方や行動は異なっているが、それは科学では証明されていない。",
                  "この話の男性と女性の考えや行動の比較は当たっている。",
                  "男性と女性は違うのだから、分かり合おうと努力することが大切だ"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "男性と女性は違うのだから、分かり合おうと努力することが大切だ"
                },
                "explanation": "Question 47. Answer will be updated soon."
              }
            ],
            "mondaiHeader": "問題47 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
          },
          {
            "title": "問題48 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "<p class=\"mb-4 indent-4\">富士山は標高\n3,776メートルの日本一高い山で、世界文化遺産でもある。登山道が整備されているため、毎年何十万人もの人が山頂<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span>を目指すそうだ。私もツアーに参加して登ることにした。</p></p><p><p class=\"mb-4 indent-4\">登りはじめは楽だった。でも、3時間ぐらいすると、だんだん岩が多くなり、登りにくくなってきた。その上天気も悪くなり、前も後ろも真っ白で<span class=\"underline underline-offset-4 decoration-gray-500\">①ほとんど見えなくなってしまった。</span>そこはちょうど雲の中だったのだそうだ。何も見えずに、ただ一歩ずつ前に進むしかなく、この時は不安でつらかった。しばらくすると、急に天気がよくなった。雲が移動したのではない。私たちが雲の上に出たのだ。足の下には雲が海のように広がっていた。素晴らしい景色を見たら元気が出てきて、目標の山小屋<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>に予定時間に着くことができた。私たちはそこで一泊した。</p></p><p><p class=\"mb-4 indent-4\">次の朝、まだ暗いうちに山小屋を出発して山頂まで登ったが、<span class=\"underline underline-offset-4 decoration-gray-500\">②そこ</span>では大勢の人が太陽を待っていた。やがて、薄暗かった空が次第に明るい青色になって、そして空の下の部分だけがオレンジ色に変わってきた。そして、太陽が静かに昇り始め、まぶしい光が伸びてきた。光はどんどん強くなり、私たちを照らした。山頂はとても寒かったが、太陽の光が当たって身体が温かくなるのを感じた。</p></p><p><p class=\"indent-4\">富士山に登るのは大変だったが、登らなければできない素晴らしい経験がいくつもできた。毎年登る人もいると聞くが、その人たちの気持ちがよくわかる。</p>",
            "questions": [
              {
                "questionText": "問1 <span class=\"underline underline-offset-4 decoration-gray-500\">①ほとんど見えなくなってしまった。</span>とあるが、どういうことか。",
                "options": [
                  "大勢の人がいたので、前が見えなかった。",
                  "雨が激しく降って前がよく見えなかった。",
                  "雲の中に入ってしまい、よく見えなかった。",
                  "夕方になったので暗くてよく見えなかった。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "雲の中に入ってしまい、よく見えなかった。"
                },
                "explanation": "Question 48. Answer will be updated soon."
              },
              {
                "questionText": "問2 <span class=\"underline underline-offset-4 decoration-gray-500\">②そこ</span>とあるが、どこか。",
                "options": [
                  "富士山の登山道全体",
                  "富士山の山小屋を出たところ",
                  "富士山を3時間ぐらい登ったところ",
                  "富士山の一番上"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "(テキスト欠落)"
                },
                "explanation": "Question 48. Answer will be updated soon."
              },
              {
                "questionText": "問3 富士山から見た、太陽が昇る様子について正しいものはどれか。",
                "options": [
                  "空全体が青い色からオレンジ色に変わって太陽が昇る。",
                  "オレンジ色の空から太陽が昇ると、空が青くなる。",
                  "空が明るい青色になってから下の方がオレンジ色になり、太陽が昇る。",
                  "空がまぶしくなってからオレンジ色の太陽が昇り始める。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "空が明るい青色になってから下の方がオレンジ色になり、太陽が昇る。"
                },
                "explanation": "Question 48. Answer will be updated soon."
              },
              {
                "questionText": "問4 この文章を書いた人は富士山登山についてどう思っているか。",
                "options": [
                  "また登りたくなるぐらい、素晴らしい経験ができる。",
                  "つらくて不安なものなので、一度登れば十分だ。",
                  "登山道が整備されていて楽なので、また行きたい。",
                  "富士山に登るなら、ツアーに参加するのがいい。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "また登りたくなるぐらい、素晴らしい経験ができる。"
                },
                "explanation": "Question 48. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題48 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
          },
          {
            "title": "問題49 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "<p class=\"mb-4 indent-4\">評論家という仕事がある。ある分野について深い知識を持ち、人々が参考にできるような解説や評価などをする仕事である。今では、政治評論家、経済評論家からラーメン評論家まで、あらゆる分野の評論家がテレビや雑誌などで活躍をしている。しかし、医者や学校の先生のように、評論家になるための資格試験があるわけではない。彼らは一体どうやって評論家になったのだろうか。</p>\n<p class=\"mb-4 indent-4\">彼らの多くは必ずしも評論をするために深い知識を得たのではない。若いころからある分野に対して人並み外れた\n知識や興味を持っており、夢中でそれを学ぶうちに、いつの間にかそれを仕事にすることになったという人も多い。好きな分野を仕事にできるとはうらやましい話だが、<span class=\"underline underline-offset-4 decoration-gray-500\">①ただ人並み外れた深い知識があれば評論家になれるというものでもない</span>だろう。評論家として収入を得るためには、新聞や雑誌、テレビなどのマスメディア<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>に取り上げられなければならない。</p></p><p><p class=\"mb-4 indent-4\"><span class=\"underline underline-offset-4 decoration-gray-500\">②マスメディアに取り上げられる</span>ためには、人々が納得し、話を聞きたくなるような説得力や魅力があること、さらに、マスメディアに登場するチャンスを得る運の強さも必要だろう。</p></p><p><p class=\"indent-4\">人並み外れた知識、人々が言うことを聞きたくなるような説得力や魅力、そしてチャンスをつかむ運がそろって初めて評論家になれるのかもしれない。</p>",
            "questions": [
              {
                "questionText": "問1 評論家と医者や先生はどこが違うと書かれているか。",
                "options": [
                  "評論家はある分野について説明や評価をするが、医者や先生はそうではない。",
                  "評論家はある分野についての資格が必要だが、医者や先生はそうではない。",
                  "評論家はある分野についての資格は必要ないが、医者や先生はそうではない。",
                  "評論家はある分野の知識が必要だが、医者や先生はそうではない。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "評論家はある分野についての資格は必要ないが、医者や先生はそうではない。"
                },
                "explanation": "Question 49. Answer will be updated soon."
              },
              {
                "questionText": "問2 評論家の多くはどんなことが仕事につながったとあるか。",
                "options": [
                  "評論家になるためにある分野について特別な興味を持とうとしたこと",
                  "ある分野について解説や評論をするために、一生懸命学んだこと",
                  "若いころにある分野についての資格試験を人よりもたくさん受けたこと",
                  "ずっとある分野に特別な知識を持ち、興味を持って勉強を続けたこと"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "ずっとある分野に特別な知識を持ち、興味を持って勉強を続けたこと"
                },
                "explanation": "Question 49. Answer will be updated soon."
              },
              {
                "questionText": "問3 ①ただ人並み外れた深い知識があれば評論家になれるというものでもないとあるが、どういうことか。",
                "options": [
                  "深い知識を持つことが、評論家になるためのただ一つの必要なことだ。",
                  "深い知識を持つことが必要ではないこともたくさんある。",
                  "深い知識を持つことは必要だが、ほかにも必要なことがある。",
                  "深い知識を持つことは必要ではなく、ほかに必要なことがある。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "深い知識を持つことは必要だが、ほかにも必要なことがある。"
                },
                "explanation": "Question 49. Answer will be updated soon."
              },
              {
                "questionText": "問4 本文によると、②マスメディアに取り上げられるためには何が必要か。",
                "options": [
                  "新聞やテレビ関係の会社で働いてマスメディアに出た経験",
                  "人々を説得しひきつける力があり、マスメディアに出る機会に恵まれる運の強さ",
                  "マスメディアに出て、人々をひきつけた経験",
                  "人並み外れた深い知識 and、人々を納得させる説得力や魅力"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "人々を説得しひきつける力があり、マスメディアに出る機会に恵まれる運の強さ"
                },
                "explanation": "Question 49. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題49 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
          },
          {
            "title": "問題50 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "<p class=\"mb-4 indent-4\">夏休みに私はある町を旅行した。そこは私が学生時代に大好きだった作家が生まれ、活躍した町である。いつかはそこをこの目で見てみたいと思っていたのが、やっと実現したのだった。</p>\n<p class=\"mb-4 indent-4\">もう彼が亡くなって何十年も経っているため、様子はすっかり変わってしまったはずである。それでも彼の小説の舞台となった、緑の美しい町を歩くのは楽しかった。だが、私が社会人になってからは、彼の書いたものをほとんど読まなくなったせいか、<span class=\"underline underline-offset-4 decoration-gray-500\">それ以上の感激はなく、正直に言うと、少し物足りない気持ち</span>だった。</p>\n<p class=\"mb-4 indent-4\">ところが、ある記念館に入ったときのことである。そこでは、彼の書いた原稿\nや手紙の展示をしていた。それを見ているうちに、しだいに昔読んだ小説や詩の内容が思い出されてきた。特に、彼の妹が亡くなったときに書かれた、詩の原稿を読んだときには、彼の悲しみが痛いほど近くに感じられたのである。手書きの文字というのは、時間がどんなに流れていても、その人がどんな人だったのか、その人が何を感じていたかを強く表していることに気がついた。</p></p><p><p class=\"indent-4\">字の下手な私は、できるだけパソコンを使っていた。だが、<span class=\"underline underline-offset-4 decoration-gray-500\">それ以来</span>、時には下手でも心をこめて字を書くことで、何かが伝わるのではないかと思いはじめている。</p>",
            "questions": [
              {
                "questionText": "問1 この文章を書いた人はある町を歩いて、どのような気持ちになったか。",
                "options": [
                  "町に緑が多くてきれいなので、楽しく、満足していた。",
                  "作家の書いた小説を次々に思い出して、満足していた。",
                  "作家の小説を読んでから時間が経ち、思ったほど感動しなかった。",
                  "今は作家のいたころの町と大きく変わってしまい、少し不満だった。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "作家の小説を読んでから時間が経ち、思ったほど感動しなかった。"
                },
                "explanation": "Question 50. Answer will be updated soon."
              },
              {
                "questionText": "問2 この文章によると、この人は記念館で何を見たか。",
                "options": [
                  "作家の書いた詩の本や小説の本",
                  "作家自身が書いた小説の原稿や手紙",
                  "いろいろな人がこの作家について書いた原稿や手紙",
                  "作家の妹が書いた詩"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "作家自身が書いた小説の原稿や手紙"
                },
                "explanation": "Question 50. Answer will be updated soon."
              },
              {
                "questionText": "問3 <span class=\"underline underline-offset-4 decoration-gray-500\">それ以来</span>とあるが、どのようなことか。",
                "options": [
                  "記念館に入ったときから",
                  "彼の手書きの原稿を見たときから",
                  "作家の生まれた町に着いたときから",
                  "パソコンで字を書いていたときから"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "彼の手書きの原稿を見たときから"
                },
                "explanation": "Question 50. Answer will be updated soon."
              },
              {
                "questionText": "問4 この文章を書いた人が一番伝えたいことは何か。",
                "options": [
                  "手書きの文字から伝わるもの",
                  "字をきれいに書くことの大切さ",
                  "好きな作家の文章のすばらしさ",
                  "好きな作家のいた町へ旅行する意味"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "手書きの文字から伝わるもの"
                },
                "explanation": "Question 50. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題50 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
          },
          {
            "title": "問題51 つぎの文章は『花屋ダイヤリー』という小説についての紹介である。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageText": "<p class=\"mb-4 indent-4\">『花屋ダイヤリー』は一軒の花屋が舞台の小説です。花屋のアルバイト店員と、花を買いに来るさまざまな客との関わりが、ていねいに描かれています。</p>\n<p class=\"mb-4 indent-4\">作者の山口しずかは2012年に『一人』で小説最優秀賞を取った注目の女性作家です。若者の純粋さを、愛情を持って表現するところに人気があります。</p>\n<p class=\"mb-4 indent-4\">『花屋ダイヤリー』では、学校にも行かず仕事もしない17歳のユウが主人公\nです。何にも興味を持てなかったユウは、小さな花屋でアルバイトを始めます。そこには毎日、1輪だけ花を買いに来るおばあさんや、ゲーム機と交換に花を買いたいと言う小学生など、少し変わった客が次々と現れます。客はみなユウに花を選んでほしいと言います。困ったユウは、どうしてその花を買いたいのか、だれのための花なのかなど、<span class=\"underline underline-offset-4 decoration-gray-500\">①事情を客にたずねます。</span></p></p><p><p class=\"mb-4 indent-4\">客と話をするうちに、ユウは人との関係の大切さや働く意味など、いろいろなことを考え、変わりはじめます。何の喜びもない日々を送っていたユウが、働いて人の役に立つ中で明るく強くなっていく様子に、読者は<span class=\"underline underline-offset-4 decoration-gray-500\">②元気づけられる</span>でしょう。それは作者から読者へのエール<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>でもあります。また、たくさんの花の名前と花言葉<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注3)</span>が紹介されているので、だれかに花を贈るときに役に立つ知識も得られます。</p></p><p><p class=\"indent-4\">人間関係に少し疲れているときや目標が見つけられないときに読むと、人が好きになり心が元気になる一冊です。ユウと同年代の人にぜひ読んでほしいです。</p>",
            "questions": [
              {
                "questionText": "問1 本文によると、山口しずかはどんな人だと書かれているか。",
                "options": [
                  "若い女性の作家",
                  "自分のことを小説に書いた人",
                  "若者に人気がある作家",
                  "賞を受けたことのある人気の作家"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "賞を受けたことのある人気の作家"
                },
                "explanation": "Question 51. Answer will be updated soon."
              },
              {
                "questionText": "問2 <span class=\"underline underline-offset-4 decoration-gray-500\">①事情を客にたずねます。</span>とあるが、なぜか。",
                "options": [
                  "何にも興味を持てなかったから。",
                  "1輪だけ花を選ぶのは難しいから。",
                  "ゲーム機と同じ値段の花がわからないから。",
                  "客がどの花がいいか選んでほしいと言うから。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "客がどの花がいいか選んでほしいと言うから。"
                },
                "explanation": "Question 51. Answer will be updated soon."
              },
              {
                "questionText": "問3 <span class=\"underline underline-offset-4 decoration-gray-500\">②元気づけられる</span>とあるが、なぜか。",
                "options": [
                  "学校にも行かず仕事もしなかったユウが変わったことをしたから。",
                  "学校に行かなかったユウが学校に行くようになったから。",
                  "何事にも無関心だったユウが明るく強く変わっていったから。",
                  "仕事をしなかったユウがアルバイトを始めたから。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "何事にも無関心だったユウが明るく強く変わっていったから。"
                },
                "explanation": "Question 51. Answer will be updated soon."
              },
              {
                "questionText": "問4 『花屋ダイヤリー』で作者が読者に一番伝えたいことは何か。",
                "options": [
                  "人は人の中で働いて変わっていけるということ",
                  "たくさんの花には花言葉があるということ",
                  "ユウが何の喜びもない日々を送っていること",
                  "だれかに花を贈るときに役に立つということ"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "人は人の中で働いて変わっていけるということ"
                },
                "explanation": "Question 51. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題51 つぎの文章は『花屋ダイヤリー』という小説についての紹介である。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
          },
          {
            "title": "問題52 (Visual Layout Format)",
            "passageText": "<p class=\"mb-8 font-bold text-lg\">問題52 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</p><div class=\"border-2 border-gray-400 p-2 max-w-3xl mx-auto font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden relative\">\n  <!-- Header -->\n  <div class=\"bg-gray-300 dark:bg-gray-700 py-3 px-4 text-center text-lg md:text-xl font-bold tracking-wider\">\n    Sマート（24hオープン）は近くて便利！\n  </div>\n\n  <div class=\"relative mt-8 mb-4 h-24\">\n    <!-- Left Speech Bubble -->\n    <div class=\"absolute left-12 top-0\">\n      <div class=\"relative border-[3px] border-gray-500 rounded-full px-8 py-3 bg-white dark:bg-gray-800 font-bold text-lg inline-block\">\n        6月の\n        <div class=\"absolute -bottom-4 right-4 w-4 h-6 border-l-[3px] border-b-[3px] border-gray-500 bg-white dark:bg-gray-800 transform rotate-[-30deg] skew-x-[30deg]\"></div>\n      </div>\n    </div>\n\n    <!-- Right Tag -->\n    <div class=\"absolute right-12 top-0\">\n      <!-- Tape/Pin -->\n      <div class=\"absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-400 opacity-80 rotate-[-5deg]\"></div>\n      <div class=\"border-2 border-gray-500 px-6 py-3 font-bold text-lg bg-white dark:bg-gray-800 shadow-sm relative\">\n        <div class=\"absolute left-2 top-2 w-2 h-2 rounded-full border border-gray-500\"></div>\n        <div class=\"absolute right-2 top-2 w-2 h-2 rounded-full border border-gray-500\"></div>\n        18時～24時だけ！\n      </div>\n    </div>\n  </div>\n\n  <div class=\"text-center text-3xl font-black tracking-widest my-8\">\n    お得な割引セール！\n  </div>\n\n  <div class=\"border-2 border-gray-500 p-3 text-center mx-auto w-3/4 mb-10 font-bold text-lg bg-white dark:bg-gray-800\">\n    セール期間： 2014年 6月2日(月)～6月28日(土)\n  </div>\n\n  <div class=\"text-base md:text-lg space-y-2 mb-10 px-8 font-medium\">\n    <p>＊下の割引券は切って、かならず商品と一緒にレジにお出しください！</p>\n    <p>＊この広告はお一人様１枚限りとさせていただきます。</p>\n    <p>＊割引券１枚につき商品１個が割引となります。</p>\n    <p>＊お店によっては、商品がない場合もあります。</p>\n    <p>＊割引券が利用できるのは、18時～24時です。</p>\n  </div>\n\n  <!-- Dashed Table -->\n  <table class=\"w-full border-collapse text-center text-sm md:text-base border-t-2 border-b-2 border-gray-500 table-fixed\">\n    <thead>\n      <tr class=\"border-b-2 border-gray-500 border-dashed\">\n        <th class=\"p-3 font-medium border-r-2 border-gray-500 border-dashed\">2日(月)～14日(土)</th>\n        <th class=\"p-3 font-medium border-r-2 border-gray-500 border-dashed\">2日(月)～14日(土)</th>\n        <th class=\"p-3 font-medium border-r-2 border-gray-500 border-dashed\">15日(日)～28日(土)</th>\n        <th class=\"p-3 font-medium\">15日(日)～28日(土)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class=\"p-4 align-top border-r-2 border-gray-500 border-dashed\">\n          <div class=\"font-bold text-lg\">チョコレート</div>\n          <div class=\"text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest\">書かれた価格より</div>\n          <div class=\"font-bold text-xl md:text-2xl\">30円引き</div>\n        </td>\n        <td class=\"p-4 align-top border-r-2 border-gray-500 border-dashed\">\n          <div class=\"font-bold text-lg\">ドーナッツ</div>\n          <div class=\"text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest\">書かれた価格より</div>\n          <div class=\"font-bold text-xl md:text-2xl\">20円引き</div>\n        </td>\n        <td class=\"p-4 align-top border-r-2 border-gray-500 border-dashed\">\n          <div class=\"font-bold text-lg\">アイスクリーム</div>\n          <div class=\"text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest\">書かれた価格より</div>\n          <div class=\"font-bold text-xl md:text-2xl\">20円引き</div>\n        </td>\n        <td class=\"p-4 align-top\">\n          <div class=\"font-bold text-lg\">ホットコーヒー</div>\n          <div class=\"text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest\">書かれた価格より</div>\n          <div class=\"font-bold text-xl md:text-2xl\">30円引き</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
            "questions": [
              {
                "questionText": "問1 アリさんは6月18日午後10時頃、この広告を1枚持ってコンビニに行った。アイスクリームを2個買った。アイスクリームは100円と書いてあった。いくら払ったか。",
                "options": [
                  "200円",
                  "180円",
                  "160円",
                  "140円"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "180円"
                },
                "explanation": "Question 52. Answer will be updated soon."
              },
              {
                "questionText": "問2 ドーナッツを安く買いたい。この広告を持って、いつ買いに行けばよいか。",
                "options": [
                  "6月10日 午前10時ごろ",
                  "6月12日 午後10時ごろ",
                  "6月16日 午前8時ごろ",
                  "6月20日 午後8時ごろ"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "6月12日 午後10時ごろ"
                },
                "explanation": "Question 52. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題52 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
          },
          {
            "title": "問題53 (Visual Layout Format)",
            "passageText": "<p class=\"mb-8 font-bold text-lg\">問題53 つぎの文章は求人募集広告である。右の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</p><div class=\"border-[3px] border-gray-500 p-8 max-w-3xl mx-auto font-sans bg-[#e5e7eb] dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative\">\n  <div class=\"mb-8\">\n    <div class=\"text-xl md:text-2xl font-bold tracking-widest\">一緒にすし屋で働きませんか！</div>\n    <div class=\"text-4xl md:text-5xl font-black text-center mt-6 tracking-widest relative\">\n      アルバイト大募集！\n      <div class=\"absolute right-0 -top-8 text-6xl transform rotate-12 opacity-80\" style=\"text-shadow: 2px 2px 4px rgba(0,0,0,0.2);\">🍣🍱</div>\n    </div>\n  </div>\n\n  <div class=\"space-y-6 text-lg md:text-xl font-medium mt-12\">\n    <div class=\"flex\">\n      <div class=\"font-bold w-40 flex-shrink-0 tracking-widest\">職種<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注1)</span></div>",
            "questions": [
              {
                "questionText": "問1 ホンさんは、火・木・金曜日に夕方5時から夜10時まで働くことになった。1週間で給料がいくらもらえるか。",
                "options": [
                  "9,000円",
                  "9,500円",
                  "13,500円",
                  "15,000円"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "15,000円"
                },
                "explanation": "Question 53. Answer will be updated soon."
              },
              {
                "questionText": "問2 このすし屋で働ける人はだれか。",
                "options": [
                  "経験がある主婦。月曜日と火曜日に9時から12時まで働ける。",
                  "経験がない大学生。水曜日に午後6時から午後11時まで働ける。",
                  "経験がある高校生。火曜日と木曜日に午後3時から午後9時まで働ける。",
                  "経験がない大学生。水曜日と土曜日に午後5時から夜10時まで働ける。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "経験がない大学生。水曜日と土曜日に午後5時から夜10時まで働ける。"
                },
                "explanation": "Question 53. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題53 つぎの文章は求人募集広告である。右の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageNotes": "<p><div>：調理の手伝い</div></p><p></div></p><p><div class=\"flex\"></p><p><div class=\"font-bold w-40 flex-shrink-0 tracking-widest\">勤務時間・給与</div></p><p><div></p><p><div>：① 8:00 - 15:00 時給900円</div></p><p><div class=\"ml-4 md:ml-6 mt-2\">② 15:00 - 24:00 時給1,000円（時給は経験を考慮(注2)）</div></p><p></div></p><p></div></p><p><div class=\"ml-4 md:ml-20 space-y-3 mt-8 relative\"></p><p><div>＊週2日、1日5時間以上働ける方。</div></p><p><div>＊曜日、時間は相談に応じます。</div></p><p><div>＊経験のない方もOK！</div></p><p><div>＊主婦・学生の方歓迎。（高校生は不可）</div></p><p><!-- Pointing Speech Bubble --></p><p><div class=\"hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2\"></p><p><div class=\"relative border-[3px] border-gray-500 rounded-[50%] px-10 py-8 bg-white dark:bg-gray-700 text-base font-bold text-center shadow-md rotate-[-5deg] tracking-widest\"></p><p>少しでも興味ある方<br />はお電話ください！</p><p><div class=\"absolute -left-6 top-1/2 transform -translate-y-1/2 w-8 h-8 border-t-[3px] border-b-[3px] border-l-[3px] border-gray-500 bg-white dark:bg-gray-700 skew-y-[20deg] rotate-[20deg] rounded-bl-xl\"></div></p><p></div></p><p></div></p><p></div></p><p><div class=\"flex mt-12 pt-4\"></p><p><div class=\"font-bold w-40 flex-shrink-0 tracking-widest\">応募方法</div></p><p><div>：お電話の上、履歴書（写真付）を持って面接にお越しください。</div></p><p></div></p><p><div class=\"flex mt-4\"></p><p><div class=\"font-bold w-40 flex-shrink-0 tracking-widest\">勤務地・連絡先</div></p><p><div></p><p><div>：A市山田町 2-2-1</div></p><p><div class=\"text-center font-black text-2xl mt-6 tracking-widest\">すしの吉野（山田店） TEL: 1111-3333</div></p><p></div></p><p></div></p><p></div></p><p></div></p>"
          },
          {
            "title": "問題54 (Visual Layout Format)",
            "passageText": "<div class=\"max-w-[850px] mx-auto font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2 relative p-4\">\n  <div class=\"text-lg md:text-xl font-bold tracking-widest mb-6\">\n    アパート情報サイト「マイハウスネット」(20XX年3月現在)\n  </div>\n\n  <div class=\"flex flex-col md:flex-row justify-between gap-8 md:gap-12\">\n    <!-- Left Column: Details Box -->\n    <div class=\"flex-1 bg-gray-200 dark:bg-gray-700 border-2 border-gray-400 p-5 md:p-8 text-base md:text-lg font-medium leading-relaxed shadow-sm\">\n      <div class=\"grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-x-2 gap-y-3 mb-8\">\n        <div></div><div class=\"text-xl md:text-2xl font-bold tracking-widest mb-2\">中山田駅 徒歩3分</div>\n        <div class=\"tracking-widest\">アパート</div><div class=\"tracking-widest\">築10年</div>\n        <div class=\"tracking-widest\">家賃</div><div class=\"text-xl font-bold\">30,000円</div>\n        <div class=\"tracking-tighter\">敷金",
            "questions": [
              {
                "questionText": "問1 契約するときにいくら必要か。",
                "options": [
                  "3万円",
                  "3万5千円",
                  "9万円",
                  "9万5千円"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "9万円"
                },
                "explanation": "Question 54. Answer will be updated soon."
              },
              {
                "questionText": "問2 このアパートの説明として本文の内容と合っているものはどれか。",
                "options": [
                  "部屋は5階にある。",
                  "ベランダは南側にある。",
                  "犬を飼うことはできない。",
                  "部屋にお風呂がない。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "ベランダは南側にある。"
                },
                "explanation": "Question 54. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "mondaiHeader": "問題54 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "passageNotes": "<p>(注1) / 礼金(注2)</div><div>1か月 / 1か月</div></p><p></div></p><p><div class=\"font-bold text-xl md:text-2xl mb-6 tracking-wider\">ワンルーム 19.84m²</div></p><p><div class=\"space-y-4 relative z-10 pl-2\"></p><p><div class=\"flex items-start\"><span class=\"mr-2\">・</span>南向き</div></p><p><div class=\"flex items-start\"><span class=\"mr-2\">・</span>5階建ての2階</div></p><p><div class=\"flex items-start\"><span class=\"mr-2\">・</span>スーパーまで400m</div></p><p><div class=\"flex items-start\"></p><p><span class=\"mr-2\">・</span></p><p><div>手数料無料！契約時には家賃1か月分と<br/>敷金・礼金各1か月分だけでOK！</div></p><p></div></p><p><div class=\"flex items-start\"><span class=\"mr-2\">・</span>ペットは相談可！</div></p><p></div></p><p></div></p><p><!-- Right Column: Floor Plan --></p><p><div class=\"w-full md:w-72 flex justify-center items-start pt-6 md:pt-10 relative\"></p><p><!-- Compass --></p><p><div class=\"absolute right-8 md:-right-4 top-0 text-xl font-bold font-serif flex flex-col items-center text-black dark:text-white\"></p><p><div>N</div></p><p><div class=\"relative w-6 h-6 mt-1\"></p><p><div class=\"absolute left-1/2 top-0 bottom-0 w-[2px] bg-black dark:bg-white transform -translate-x-1/2\"></div></p><p><div class=\"absolute top-1/2 left-0 right-0 h-[2px] bg-black dark:bg-white transform -translate-y-1/2\"></div></p><p></div></p><p></div></p><p><!-- Floor Plan Box --></p><p><div class=\"border-[3px] border-black dark:border-white w-52 bg-white flex flex-col mt-4 text-black\"></p><p><!-- Top row --></p><p><div class=\"flex border-b-2 border-black dark:border-white h-40\"></p><p><div class=\"w-1/2 border-r-2 border-black dark:border-white flex flex-col\"></p><p><div class=\"h-[45%] border-b-2 border-black dark:border-white flex items-center justify-center bg-gray-400 bg-opacity-60 text-sm font-bold tracking-widest\" style=\"background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);\">浴室</div></p><p><div class=\"h-[30%] border-b-2 border-black dark:border-white flex items-center justify-center text-sm font-bold tracking-widest\">トイレ</div></p><p><div class=\"h-[25%] flex items-center justify-center text-sm font-bold tracking-widest bg-gray-300\">収納</div></p><p></div></p><p><div class=\"w-1/2 flex flex-col\"></p><p><div class=\"h-[30%] border-b-2 border-black dark:border-white flex items-center justify-center text-sm font-bold tracking-widest bg-gray-200 relative\"></p><p>玄関</p><p><div class=\"absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-4 border-2 border-black dark:border-white rounded-t-full border-b-0\"></div></p><p></div></p><p><div class=\"h-[25%] border-b-2 border-black dark:border-white flex items-center justify-center text-sm font-bold tracking-widest bg-gray-100\">洗濯</div></p><p><div class=\"flex-1 relative\"></p><p><div class=\"absolute bottom-0 -left-[14px] w-6 h-6 border-r-2 border-black dark:border-white transform -rotate-45\"></div></p><p></div></p><p></div></p><p></div></p><p><!-- Main Room --></p><p><div class=\"h-48 flex flex-col items-center justify-center bg-white relative\"></p><p><div class=\"text-2xl font-bold tracking-widest mb-1\">洋室</div></p><p><div class=\"text-lg font-bold\">19.84m²</div></p><p></div></p><p><!-- Balcony --></p><p><div class=\"h-12 border-t-2 border-black dark:border-white flex items-center justify-center text-base font-bold tracking-widest bg-white\"></p><p>ベランダ</p><p></div></p><p></div></p><p></div></p><p></div></p><p></div></p>"
          },
          {
            "title": "問題55 (Visual Layout Format)",
            "passageText": "つぎの文章は文化講座の案内パンフレットである。これを読んで下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
            "questions": [
              {
                "questionText": "問1 上の案内の中の「京都クラス」に、「文化カフェ」の会員が参加する場合、1回の料金はいくらか。",
                "options": [
                  "500円",
                  "1,000円",
                  "1,500円",
                  "2,000円"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "1,000円"
                },
                "explanation": "Question 55. Answer will be updated soon."
              },
              {
                "questionText": "問2 リーさんは4月9日(水)のアラビア語クラスに参加したい。何をすればよいか。",
                "options": [
                  "4月6日までに、電話して予約する。",
                  "4月6日までに、ネットで予約する。",
                  "4月8日までに、みなと市民会館に行って予約する。",
                  "4月9日に、教室に行って申し込む。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "4月6日までに、ネットで予約する。"
                },
                "explanation": "Question 55. Answer will be updated soon."
              }
            ]
          },
          {
            "title": "問題56 (Visual Layout Format)",
            "passageText": "<div style=\"margin-bottom:15px; font-weight:bold; font-size:16px;\">問題56 つぎの文章は、市役所からのお知らせである。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</div><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 520\" width=\"100%\" style=\"max-width:700px;display:block;margin:0 auto;font-family:sans-serif;\">  <defs>    <filter id=\"f56\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">      <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" result=\"noise\" />      <feColorMatrix type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0\" in=\"noise\" result=\"coloredNoise\" />      <feComposite operator=\"over\" in=\"coloredNoise\" in2=\"SourceGraphic\" result=\"composite\" />    </filter>  </defs>  <rect width=\"700\" height=\"520\" fill=\"#fcfcfc\" filter=\"url(#f56)\"/>  <text x=\"350\" y=\"45\" text-anchor=\"middle\" font-size=\"16\" fill=\"#333\">ひがし町　レストラン案内</text>    <rect x=\"50\" y=\"75\" width=\"290\" height=\"190\" fill=\"#e3e5e4\" stroke=\"#666\" stroke-width=\"1.5\" />  <text x=\"65\" y=\"105\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">①オリーブの風</text>  <text x=\"65\" y=\"135\" font-size=\"13\" fill=\"#222\">南ヨーロッパのさまざまな国の料理が楽し</text>  <text x=\"65\" y=\"155\" font-size=\"13\" fill=\"#222\">める。パーティーにもよい。</text>  <text x=\"65\" y=\"190\" font-size=\"13\" fill=\"#222\">[昼]800～1,500円 [夜]2,000～5,000円</text>  <text x=\"65\" y=\"220\" font-size=\"13\" fill=\"#222\">時間：11:00～14:00 18:00～24:00</text>  <text x=\"65\" y=\"245\" font-size=\"13\" fill=\"#222\">休み：木</text>  <rect x=\"360\" y=\"75\" width=\"290\" height=\"190\" fill=\"#e0e2e1\" stroke=\"#666\" stroke-width=\"1.5\" />  <text x=\"375\" y=\"105\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">②山海</text>  <text x=\"375\" y=\"135\" font-size=\"13\" fill=\"#222\">新鮮な魚と野菜を使った日本のふるさとの</text>  <text x=\"375\" y=\"155\" font-size=\"13\" fill=\"#222\">味。さしみが最高。</text>  <text x=\"375\" y=\"190\" font-size=\"13\" fill=\"#222\">[昼]950～1,500円 [夜]3,500～8,000円</text>  <text x=\"375\" y=\"220\" font-size=\"13\" fill=\"#222\">時間：11:30～14:30 18:00～22:00</text>  <text x=\"375\" y=\"245\" font-size=\"13\" fill=\"#222\">休み：火</text>  <rect x=\"50\" y=\"285\" width=\"290\" height=\"190\" fill=\"#e6e8e7\" stroke=\"#666\" stroke-width=\"1.5\" />  <text x=\"65\" y=\"315\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">③よねやま</text>  <text x=\"65\" y=\"345\" font-size=\"13\" fill=\"#222\">てんぷら、すしなど日本料理のメニューが</text>  <text x=\"65\" y=\"365\" font-size=\"13\" fill=\"#222\">豊富。個室あり。</text>  <text x=\"65\" y=\"400\" font-size=\"13\" fill=\"#222\">[昼]1,000～2,300円 [夜]3,800～8,800円</text>  <text x=\"65\" y=\"430\" font-size=\"13\" fill=\"#222\">時間：12:00～14:00 17:30～21:30</text>  <text x=\"65\" y=\"455\" font-size=\"13\" fill=\"#222\">年中無休</text>  <rect x=\"360\" y=\"285\" width=\"205\" fill=\"#e5e5e5\" stroke=\"#666\" stroke-width=\"1.5\" />  <text x=\"375\" y=\"315\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">④平安</text>  <text x=\"375\" y=\"345\" font-size=\"13\" fill=\"#222\">カニ料理が有名な中華料理店。食べ放題メ</text>  <text x=\"375\" y=\"365\" font-size=\"13\" fill=\"#222\">ニューもあり。</text>  <text x=\"375\" y=\"400\" font-size=\"13\" fill=\"#222\">[昼]1,000～1,800円 [夜]2,500～12,000円</text>  <text x=\"375\" y=\"430\" font-size=\"13\" fill=\"#222\">時間：11:00～22:00 17:00～23:00</text>  <text x=\"375\" y=\"455\" font-size=\"13\" fill=\"#222\">休み：火</text>  <text x=\"375\" y=\"475\" font-size=\"13\" fill=\"#222\">個室あり。</text></svg>",
            "questions": [
              {
                "questionText": "問1 。",
                "options": [
                  "チョウさんは、友達と夕食が食べられる店を探している。",
                  "予算は3,000円以内である。",
                  "日時は来週の火曜日の19時からである。",
                  "どの店がよいか。"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "チョウさんは、友達と夕食が食べられる店を探している。"
                },
                "explanation": "Question 56. Answer will be updated soon."
              },
              {
                "questionText": "問2 サムさんは、木曜日の昼のできるだけ早い時間に友達と和食が食べたい。何時から食べることができるか。",
                "options": [
                  "選択肢 1",
                  "選択肢 2",
                  "選択肢 3",
                  "選択肢 4"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "選択肢 2"
                },
                "explanation": "Question 56. Answer will be updated soon."
              }
            ],
            "passageLayout": "html"
          },
          {
            "title": "問題57 (Visual Layout Format)",
            "passageText": "<div style=\"margin-bottom:15px; font-weight:bold; font-size:16px;\">問題57 つぎの文章は、レストランのチラシである。右のページの質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</div><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 560\" width=\"100%\" style=\"max-width:700px;display:block;margin:0 auto;font-family:sans-serif;\">  <defs>    <filter id=\"f57\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">      <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" result=\"noise\" />      <feColorMatrix type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0\" in=\"noise\" result=\"coloredNoise\" />      <feComposite operator=\"over\" in=\"coloredNoise\" in2=\"SourceGraphic\" result=\"composite\" />    </filter>  </defs>  <rect width=\"700\" height=\"560\" fill=\"#fefefe\" filter=\"url(#f57)\"/>    <rect x=\"20\" y=\"20\" width=\"660\" height=\"490\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\"/>    <text x=\"100\" y=\"60\" font-size=\"20\" font-weight=\"bold\" fill=\"#333\">レストラン　さくら</text>  <text x=\"320\" y=\"60\" font-size=\"20\" font-weight=\"bold\" fill=\"#333\">宅配メニュー</text>    <rect x=\"490\" y=\"35\" width=\"130\" height=\"30\" fill=\"none\" stroke=\"#444\" stroke-width=\"1.5\"/>  <rect x=\"480\" y=\"35\" width=\"10\" height=\"30\" fill=\"#ddd\" stroke=\"#444\" stroke-width=\"1.5\"/>  <text x=\"555\" y=\"56\" text-anchor=\"middle\" font-size=\"18\" font-weight=\"bold\" fill=\"#333\">年中無休</text>    <!-- Left Column -->  <rect x=\"50\" y=\"100\" width=\"230\" height=\"150\" rx=\"15\" fill=\"#e2e4e3\" stroke=\"#888\" stroke-width=\"1.5\"/>  <text x=\"65\" y=\"125\" font-size=\"15\" font-weight=\"bold\" fill=\"#333\">日替わり弁当</text>  <text x=\"65\" y=\"145\" font-size=\"13\" fill=\"#333\">(全て600円、みそ汁付)</text>  <text x=\"75\" y=\"175\" font-size=\"14\" fill=\"#222\">月：ハンバーグ弁当</text>  <text x=\"75\" y=\"195\" font-size=\"14\" fill=\"#222\">火：とんかつ弁当</text>  <text x=\"75\" y=\"215\" font-size=\"14\" fill=\"#222\">水：からあげ弁当</text>  <text x=\"75\" y=\"235\" font-size=\"14\" fill=\"#222\">木：コロッケ弁当</text>  <text x=\"75\" y=\"255\" font-size=\"14\" fill=\"#222\">金：焼肉弁当</text>  <rect x=\"50\" y=\"270\" width=\"230\" height=\"90\" rx=\"15\" fill=\"#e2e4e3\" stroke=\"#888\" stroke-width=\"1.5\"/>  <text x=\"65\" y=\"295\" font-size=\"15\" font-weight=\"bold\" fill=\"#333\">飲み物</text>  <text x=\"75\" y=\"325\" font-size=\"14\" fill=\"#222\">コーラ</text><text x=\"260\" y=\"325\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">150円</text>  <text x=\"75\" y=\"345\" font-size=\"14\" fill=\"#222\">オレンジジュース</text><text x=\"260\" y=\"345\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">150円</text>  <text x=\"75\" y=\"365\" font-size=\"14\" fill=\"#222\">緑茶</text><text x=\"260\" y=\"365\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">120円</text>  <!-- Right Column -->  <rect x=\"360\" y=\"100\" width=\"230\" height=\"110\" rx=\"15\" fill=\"#eaeceb\" stroke=\"#888\" stroke-width=\"1.5\"/>  <text x=\"375\" y=\"125\" font-size=\"15\" font-weight=\"bold\" fill=\"#333\">ごはん</text>  <text x=\"385\" y=\"155\" font-size=\"14\" fill=\"#222\">カレーライス</text><text x=\"570\" y=\"155\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">550円</text>  <text x=\"385\" y=\"175\" font-size=\"14\" fill=\"#222\">オムライス</text><text x=\"570\" y=\"175\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">600円</text>  <text x=\"385\" y=\"195\" font-size=\"14\" fill=\"#222\">親子丼</text><text x=\"570\" y=\"195\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">720円</text>  <text x=\"385\" y=\"215\" font-size=\"14\" fill=\"#222\">かつ丼</text><text x=\"570\" y=\"215\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">800円</text>  <rect x=\"360\" y=\"230\" width=\"230\" height=\"70\" rx=\"15\" fill=\"#eaeceb\" stroke=\"#888\" stroke-width=\"1.5\"/>  <text x=\"375\" y=\"255\" font-size=\"15\" font-weight=\"bold\" fill=\"#333\">サラダ</text>  <text x=\"385\" y=\"285\" font-size=\"14\" fill=\"#222\">コーンサラダ</text><text x=\"570\" y=\"285\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">200円</text>  <text x=\"385\" y=\"305\" font-size=\"14\" fill=\"#222\">ポテトサラダ</text><text x=\"570\" y=\"305\" text-anchor=\"end\" font-size=\"14\" fill=\"#222\">230円</text>  <!-- Speech bubble -->  <polygon points=\"280,315 320,335 320,310\" fill=\"#fff\" stroke=\"#444\" stroke-width=\"1.5\"/>  <rect x=\"320\" y=\"310\" width=\"250\" height=\"40\" rx=\"8\" fill=\"#fff\" stroke=\"#444\" stroke-width=\"1.5\"/>  <text x=\"330\" y=\"328\" font-size=\"11\" fill=\"#111\">お食事と一緒(いっしょ)にご注文の場合ばあい、</text>  <text x=\"330\" y=\"342\" font-size=\"11\" fill=\"#111\">お飲物は100円！</text>  <!-- Bottom Details -->  <text x=\"40\" y=\"400\" font-size=\"20\" font-weight=\"bold\" fill=\"#333\" letter-spacing=\"2\">TEL：5555-8888</text>  <text x=\"40\" y=\"425\" font-size=\"14\" fill=\"#333\">受付時間： 9:00～20:30　土日祝は19:30で終了</text>  <text x=\"40\" y=\"445\" font-size=\"14\" fill=\"#333\">配達時間：10:30～21:00（14:00～17:00を除く） 土日祝は20:00で終了</text>    <text x=\"40\" y=\"475\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">＊お食事お一つでも注文できます！</text>  <text x=\"60\" y=\"495\" font-size=\"13\" fill=\"#333\">1,000円未満のご注文は、1回のお届けにつき、200円いただきます。</text>  <text x=\"40\" y=\"520\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">＊10個以上の注文は前の日までにご注文ください。</text>  <text x=\"40\" y=\"545\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">＊インターネットでも注文できます。 http://www.aaa.ccc</text>  </svg>",
            "questions": [
              {
                "questionText": "問1 シンさんはカレーライスとコーラを宅配で注文した。全部でいくら払わなければならないか。",
                "options": [
                  "550円 ＋ 100円 ＝ 650円",
                  "550円 ＋ 150円 ＝ 700円",
                  "550円 ＋ 100円 ＋ 200円 ＝ 850円",
                  "550円 ＋ 150円 ＋ 200円 ＝ 900円"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "550円 ＋ 100円 ＋ 200円 ＝ 850円"
                },
                "explanation": "Question 57. Answer will be updated soon."
              },
              {
                "questionText": "問2 ホルへさんは4月13日(日)の昼12時半にお弁当が20個必要である。いつ注文すればよいか。",
                "options": [
                  "4月11日(金)の午後9時ごろ",
                  "4月12日(土)の午後6時ごろ",
                  "4月12日(土)の午後8時ごろ",
                  "4月13日(日)の午前9時ごろ。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "4月12日(土)の午後6時ごろ"
                },
                "explanation": "Question 57. Answer will be updated soon."
              }
            ],
            "passageLayout": "html"
          },
          {
            "title": "問題58 (Visual Layout Format)",
            "passageText": "<div style=\"margin-bottom:15px; font-weight:bold; font-size:16px;\">問題58 つぎの文章は、携帯電話の料金の請求書である。右のページの質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</div><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 420\" width=\"100%\" style=\"max-width:700px;display:block;margin:0 auto;font-family:sans-serif;\">  <defs>    <filter id=\"f58\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">      <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" result=\"noise\" />      <feColorMatrix type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0\" in=\"noise\" result=\"coloredNoise\" />      <feComposite operator=\"over\" in=\"coloredNoise\" in2=\"SourceGraphic\" result=\"composite\" />    </filter>  </defs>  <rect width=\"700\" height=\"420\" fill=\"#fcfcfc\" filter=\"url(#f58)\"/>    <rect x=\"20\" y=\"20\" width=\"660\" height=\"340\" fill=\"#e8e9e8\" stroke=\"#555\" stroke-width=\"2\"/>  <rect x=\"20\" y=\"20\" width=\"660\" height=\"40\" fill=\"#dadddb\" stroke=\"#555\" stroke-width=\"2\"/>    <text x=\"35\" y=\"48\" font-size=\"20\" font-weight=\"bold\" fill=\"#333\" letter-spacing=\"2\">NAT携帯電話料金請求書</text>    <line x1=\"330\" y1=\"60\" x2=\"330\" y2=\"360\" stroke=\"#555\" stroke-width=\"2\"/>  <!-- Left Panel -->  <rect x=\"35\" y=\"80\" width=\"280\" height=\"60\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <text x=\"45\" y=\"105\" font-size=\"14\" fill=\"#222\">東京都○○市××町３－５－２</text>  <text x=\"45\" y=\"130\" font-size=\"16\" fill=\"#222\">カン ヘミ様</text>  <rect x=\"35\" y=\"160\" width=\"110\" height=\"30\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <rect x=\"145\" y=\"160\" width=\"170\" height=\"30\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <text x=\"45\" y=\"181\" font-size=\"14\" fill=\"#222\">ご利用期間</text>  <text x=\"155\" y=\"181\" font-size=\"14\" fill=\"#222\">2014年5月1日～5月31日</text>  <rect x=\"35\" y=\"190\" width=\"110\" height=\"30\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <rect x=\"145\" y=\"190\" width=\"170\" height=\"30\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <text x=\"45\" y=\"211\" font-size=\"14\" fill=\"#222\">ご請求額</text>  <text x=\"155\" y=\"211\" font-size=\"14\" fill=\"#222\">7,800円</text>  <rect x=\"35\" y=\"220\" width=\"110\" height=\"30\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <rect x=\"145\" y=\"220\" width=\"170\" height=\"30\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <text x=\"45\" y=\"241\" font-size=\"14\" fill=\"#222\">お支払い期限</text>  <text x=\"155\" y=\"241\" font-size=\"14\" fill=\"#222\">2014年6月30日(月)</text>  <text x=\"35\" y=\"280\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">お問い合わせ先 ＊＊＊＊＊＊＊＊＊＊＊</text>  <text x=\"35\" y=\"305\" font-size=\"14\" fill=\"#222\">NAT : 0800-222-3333</text>  <text x=\"100\" y=\"325\" font-size=\"13\" fill=\"#222\">月～日 (年中無休) 9:00 - 20:00</text>  <text x=\"150\" y=\"345\" font-size=\"13\" fill=\"#222\">発行日 2014年 6月3日</text>  <!-- Right Panel -->  <text x=\"350\" y=\"90\" font-size=\"16\" font-weight=\"bold\" fill=\"#333\">お支払い方法のご案内 ＊＊＊＊＊＊＊＊</text>    <text x=\"350\" y=\"130\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●現金でのお支払いの場合</text>  <text x=\"370\" y=\"155\" font-size=\"14\" fill=\"#222\">「振込用紙」を切り取り(注1)、お近くのコンビニま</text>  <text x=\"370\" y=\"175\" font-size=\"14\" fill=\"#222\">たは銀行・郵便局でお支払いください。</text>  <text x=\"350\" y=\"215\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●クレジットカードでのお支払いの場合</text>  <text x=\"370\" y=\"240\" font-size=\"14\" fill=\"#222\">NATのウェブサイトからお支払いください。</text>  <text x=\"350\" y=\"280\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●銀行口座の振替(注2)手続きをすると、毎月26日に</text>  <text x=\"370\" y=\"305\" font-size=\"14\" fill=\"#222\">自動的にお振替になります。</text></svg>",
            "questions": [
              {
                "questionText": "問1 カンさんは何をしなければならないか。",
                "options": [
                  "NATに電話をする。",
                  "郵便局に行って、口座を作る。",
                  "コンビニに行って、クレジットカードで払う。",
                  "銀行かコンビニに行って、現金で払う。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "銀行かコンビニに行って、現金で払う。"
                },
                "explanation": "Question 58. Answer will be updated soon."
              },
              {
                "questionText": "問2 支払いはいつまでにしなければならないか。",
                "options": [
                  "5月31日",
                  "6月3日",
                  "6月26日",
                  "6月30日"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "6月30日"
                },
                "explanation": "Question 58. Answer will be updated soon."
              }
            ],
            "passageLayout": "html"
          },
          {
            "title": "問題59 (Visual Layout Format)",
            "passageText": "<div style=\"margin-bottom:15px; font-weight:bold; font-size:16px;\">問題59 つぎの文章は、ラケットの保証書である。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</div><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 680\" width=\"100%\" style=\"max-width:700px;display:block;margin:0 auto;font-family:sans-serif;\">  <defs>    <filter id=\"f59\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">      <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" result=\"noise\" />      <feColorMatrix type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0\" in=\"noise\" result=\"coloredNoise\" />      <feComposite operator=\"over\" in=\"coloredNoise\" in2=\"SourceGraphic\" result=\"composite\" />    </filter>  </defs>  <rect width=\"700\" height=\"680\" fill=\"#fcfcfc\" filter=\"url(#f59)\"/>    <rect x=\"20\" y=\"20\" width=\"660\" height=\"500\" fill=\"#e8e9e8\" stroke=\"#555\" stroke-width=\"2\"/>    <!-- Header -->  <rect x=\"20\" y=\"20\" width=\"660\" height=\"30\" fill=\"#d0d3d1\" stroke=\"#555\" stroke-width=\"2\"/>  <text x=\"350\" y=\"42\" text-anchor=\"middle\" font-size=\"18\" font-weight=\"bold\" fill=\"#333\" letter-spacing=\"4\">保証書</text>  <!-- Table -->  <rect x=\"100\" y=\"70\" width=\"500\" height=\"120\" fill=\"none\" stroke=\"#555\" stroke-width=\"1.5\"/>  <line x1=\"100\" y1=\"100\" x2=\"600\" y2=\"100\" stroke=\"#555\" stroke-width=\"1.5\"/>  <line x1=\"100\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#555\" stroke-width=\"1.5\"/>  <line x1=\"100\" y1=\"160\" x2=\"600\" y2=\"160\" stroke=\"#555\" stroke-width=\"1.5\"/>  <line x1=\"250\" y1=\"70\" x2=\"250\" y2=\"190\" stroke=\"#555\" stroke-width=\"1.5\"/>  <text x=\"110\" y=\"90\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">ご購入",
            "questions": [
              {
                "questionText": "問1 メイさんのラケットの保証期間はいつまでか。",
                "options": [
                  "2014年7月31日",
                  "2014年10月30日",
                  "2015年1月31日",
                  "2015年5月31日"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "2015年1月31日"
                },
                "explanation": "Question 59. Answer will be updated soon."
              },
              {
                "questionText": "問2 保証期間中に以下のことをしたら、ラケットがこわれた。保証してもらえるのはどれか。",
                "options": [
                  "シャワールームに2日間置いてしまった。",
                  "テニスコートに忘れたら、その後大雨が降って、ぬれてしまった。",
                  "弟がラケットの上に座ってしまった。",
                  "暑い中8時間ボールを打ち続けた。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "暑い中8時間ボールを打ち続けた。"
                },
                "explanation": "Question 59. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "passageNotes": "<p>(注2)日</text>  <text x=\"270\" y=\"90\" font-size=\"15\" fill=\"#222\">2014年　　5月　　1日</text>  <text x=\"110\" y=\"120\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">メーカー</text>  <text x=\"270\" y=\"120\" font-size=\"15\" fill=\"#222\">プリンセス</text>  <text x=\"110\" y=\"150\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">ラケット名</text>  <text x=\"270\" y=\"150\" font-size=\"15\" fill=\"#222\">ショット３５</text>  <text x=\"110\" y=\"180\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">カラー</text>  <text x=\"270\" y=\"180\" font-size=\"15\" fill=\"#222\">青</text>  <!-- Body Text -->  <text x=\"30\" y=\"220\" font-size=\"14\" fill=\"#222\">１．普通の使用状態において破損(注3)などがあった場合は、お買い上げ日から下に書いてある</text>  <text x=\"50\" y=\"240\" font-size=\"14\" fill=\"#222\">期限(保証期間)の間、無料で修理または交換します。</text>  <text x=\"50\" y=\"265\" font-size=\"14\" fill=\"#222\">・ピンポンラケット：お買い上げの日から６か月。ただし子ども用は１年間。</text>  <text x=\"50\" y=\"285\" font-size=\"14\" fill=\"#222\">・バドミントンラケット：お買い上げの日から３か月。ただし子ども用は半年。</text>  <text x=\"50\" y=\"305\" font-size=\"14\" fill=\"#222\">・テニスラケット：お買い上げの日から９か月。</text>  <text x=\"50\" y=\"325\" font-size=\"14\" fill=\"#222\">＊日本国内でお買い上げのお客様に限ります。</text>  <text x=\"30\" y=\"355\" font-size=\"14\" fill=\"#222\">２．次の場合は保証期間中でも修理または交換ができません。</text>  <text x=\"50\" y=\"375\" font-size=\"14\" fill=\"#222\">・火災、地震、水害(注4)などによる破損。</text>  <text x=\"50\" y=\"395\" font-size=\"14\" fill=\"#222\">・次のような使用方法による破損。（ラケットの上に重い物をのせる。ラケットを投げたり</text>  <text x=\"64\" y=\"415\" font-size=\"14\" fill=\"#222\">物をたたいたりする。ボールや羽根を打つこと以外のことへ使用するなど）</text>  <text x=\"50\" y=\"435\" font-size=\"14\" fill=\"#222\">・次のような状態で置いておいたことによる破損。（日光の当たるところや、湿気の多いと</text>  <text x=\"64\" y=\"455\" font-size=\"14\" fill=\"#222\">ころに長時間置くなど）</text>  <text x=\"30\" y=\"485\" font-size=\"14\" fill=\"#222\">３．保証書をなくした場合は、修理または交換できないことがあります。</text>  <!-- Shop Stamp Area -->  <text x=\"460\" y=\"460\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">ラケットショップ ふじ</text>  <text x=\"460\" y=\"480\" font-size=\"13\" fill=\"#222\">東京都○○市××町１－２－３</text>  <text x=\"460\" y=\"500\" font-size=\"13\" fill=\"#222\">Tel: 03-8888-7777</text>  <rect x=\"615\" y=\"435\" width=\"55\" height=\"70\" fill=\"none\" stroke=\"#222\" stroke-width=\"2\" rx=\"3\"/>  <text x=\"642\" y=\"452\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#222\">ラケット</text>  <text x=\"642\" y=\"472\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#222\">ショップ</text>  <text x=\"642\" y=\"492\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#222\">ふじ</text></svg></p>"
          },
          {
            "title": "問題60 (Visual Layout Format)",
            "passageText": "<div style=\"margin-bottom:15px; font-weight:bold; font-size:16px;\">問題60 つぎの文章は、映画館のホームページである。右のページの質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</div><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 800\" width=\"100%\" style=\"max-width:700px;display:block;margin:0 auto;font-family:sans-serif;\">  <defs>    <filter id=\"f60\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">      <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" result=\"noise\" />      <feColorMatrix type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0\" in=\"noise\" result=\"coloredNoise\" />      <feComposite operator=\"over\" in=\"coloredNoise\" in2=\"SourceGraphic\" result=\"composite\" />    </filter>  </defs>  <rect width=\"700\" height=\"800\" fill=\"#fcfcfc\" filter=\"url(#f60)\"/>    <text x=\"20\" y=\"40\" font-size=\"16\" font-weight=\"bold\" fill=\"#333\" letter-spacing=\"2\">A≪上映時間≫</text>    <g transform=\"translate(20, 60)\">    <!-- Main Table Border -->    <rect x=\"0\" y=\"0\" width=\"660\" height=\"520\" fill=\"#e4e6e5\" stroke=\"#444\" stroke-width=\"2\"/>        <!-- Headers Background -->    <rect x=\"0\" y=\"0\" width=\"660\" height=\"40\" fill=\"#cdd1d0\" stroke=\"#444\" stroke-width=\"1.5\"/>    <rect x=\"0\" y=\"0\" width=\"60\" height=\"520\" fill=\"#cdd1d0\" stroke=\"#444\" stroke-width=\"1.5\"/>        <!-- Vertical Lines -->    <line x1=\"260\" y1=\"0\" x2=\"260\" y2=\"520\" stroke=\"#444\" stroke-width=\"1.5\"/>    <line x1=\"460\" y1=\"0\" x2=\"460\" y2=\"520\" stroke=\"#444\" stroke-width=\"1.5\"/>        <!-- Header Text -->    <text x=\"160\" y=\"25\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">シネマ１(50席)</text>    <text x=\"360\" y=\"25\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">シネマ２(150席)</text>    <text x=\"560\" y=\"25\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">シネマ３(300席)</text>        <!-- Time Axis -->    <text x=\"30\" y=\"75\" text-anchor=\"middle\" font-size=\"14\" fill=\"#222\">10:00</text>    <text x=\"30\" y=\"155\" text-anchor=\"middle\" font-size=\"14\" fill=\"#222\">12:00</text>    <text x=\"30\" y=\"235\" text-anchor=\"middle\" font-size=\"14\" fill=\"#222\">14:00</text>    <text x=\"30\" y=\"315\" text-anchor=\"middle\" font-size=\"14\" fill=\"#222\">16:00</text>    <text x=\"30\" y=\"395\" text-anchor=\"middle\" font-size=\"14\" fill=\"#222\">18:00</text>    <text x=\"30\" y=\"475\" text-anchor=\"middle\" font-size=\"14\" fill=\"#222\">20:00</text>    <!-- Grid Lines for time -->    <line x1=\"0\" y1=\"150\" x2=\"660\" y2=\"150\" stroke=\"#999\" stroke-width=\"1\" stroke-dasharray=\"4\"/>    <line x1=\"0\" y1=\"230\" x2=\"660\" y2=\"230\" stroke=\"#999\" stroke-width=\"1\" stroke-dasharray=\"4\"/>    <line x1=\"0\" y1=\"310\" x2=\"660\" y2=\"310\" stroke=\"#999\" stroke-width=\"1\" stroke-dasharray=\"4\"/>    <line x1=\"0\" y1=\"390\" x2=\"660\" y2=\"390\" stroke=\"#999\" stroke-width=\"1\" stroke-dasharray=\"4\"/>    <line x1=\"0\" y1=\"470\" x2=\"660\" y2=\"470\" stroke=\"#999\" stroke-width=\"1\" stroke-dasharray=\"4\"/>    <!-- Cinema 1 Blocks -->    <rect x=\"70\" y=\"80\" width=\"180\" height=\"86\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"80\" y=\"105\" font-size=\"15\" fill=\"#222\">10:15</text>    <text x=\"130\" y=\"105\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">大きな食卓</text>    <text x=\"80\" y=\"130\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"80\" y=\"150\" font-size=\"15\" fill=\"#222\">12:25</text>    <rect x=\"70\" y=\"230\" width=\"180\" height=\"86\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"80\" y=\"255\" font-size=\"15\" fill=\"#222\">14:00</text>    <text x=\"130\" y=\"255\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">大きな食卓</text>    <text x=\"80\" y=\"280\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"80\" y=\"300\" font-size=\"15\" fill=\"#222\">16:10</text>    <rect x=\"70\" y=\"360\" width=\"180\" height=\"86\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"80\" y=\"385\" font-size=\"15\" fill=\"#222\">17:15</text>    <text x=\"130\" y=\"385\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">大きな食卓</text>    <text x=\"80\" y=\"410\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"80\" y=\"430\" font-size=\"15\" fill=\"#222\">19:25</text>    <!-- Cinema 2 Blocks -->    <rect x=\"270\" y=\"140\" width=\"180\" height=\"70\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"280\" y=\"165\" font-size=\"15\" fill=\"#222\">11:45</text>    <text x=\"330\" y=\"165\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">猫と一郎</text>    <text x=\"280\" y=\"185\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"280\" y=\"200\" font-size=\"15\" fill=\"#222\">13:30</text>    <rect x=\"270\" y=\"280\" width=\"180\" height=\"70\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"280\" y=\"305\" font-size=\"15\" fill=\"#222\">15:15</text>    <text x=\"330\" y=\"305\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">猫と一郎</text>    <text x=\"280\" y=\"325\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"280\" y=\"340\" font-size=\"15\" fill=\"#222\">17:00</text>    <rect x=\"270\" y=\"440\" width=\"180\" height=\"70\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"280\" y=\"465\" font-size=\"15\" fill=\"#222\">19:15</text>    <text x=\"330\" y=\"465\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">オハナ♡</text>    <text x=\"280\" y=\"485\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"280\" y=\"500\" font-size=\"15\" fill=\"#222\">21:35</text>    <!-- Cinema 3 Blocks -->    <rect x=\"470\" y=\"120\" width=\"180\" height=\"120\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"480\" y=\"145\" font-size=\"15\" fill=\"#222\">11:15</text>    <text x=\"530\" y=\"145\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">風の忍者</text>    <text x=\"480\" y=\"180\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"480\" y=\"215\" font-size=\"15\" fill=\"#222\">14:15</text>    <rect x=\"470\" y=\"250\" width=\"180\" height=\"120\" fill=\"#f4f5f4\" stroke=\"#555\" stroke-width=\"1.5\"/>    <text x=\"480\" y=\"275\" font-size=\"15\" fill=\"#222\">14:30</text>    <text x=\"530\" y=\"275\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">風の忍者</text>    <text x=\"480\" y=\"310\" font-size=\"15\" fill=\"#222\">　 ≀</text>    <text x=\"480\" y=\"345\" font-size=\"15\" fill=\"#222\">17:30</text>  </g>  <!-- Bottom Section B -->  <text x=\"20\" y=\"620\" font-size=\"16\" font-weight=\"bold\" fill=\"#333\" letter-spacing=\"2\">B≪映画紹介≫</text>    <text x=\"20\" y=\"650\" font-size=\"14\" fill=\"#222\">＊「大きな食卓」……15人家族の日常生活。笑いと涙の3年間を追った記録映画。</text>  <text x=\"20\" y=\"680\" font-size=\"14\" fill=\"#222\">＊「猫と一郎」……一郎は7歳の少年。メガネをかけると猫と会話ができる！？</text>  <text x=\"20\" y=\"710\" font-size=\"14\" fill=\"#222\">＊「風の忍者」……風のように移動する忍者ハンゾー。人気マンガを映画化。</text>  <text x=\"20\" y=\"740\" font-size=\"14\" fill=\"#222\">＊「オハナ♡」……ダンスチームの5人が世界のトップを目指す中で、いつしか家族のような関係</text>  <text x=\"145\" y=\"765\" font-size=\"14\" fill=\"#222\">に。オハナとはハワイの言葉で「家族」の意味。</text></svg>",
            "questions": [
              {
                "questionText": "問1 グェンさんは動物が出てくる映画が見たい。午前中はアルバイトがあるが、午後は時間がある。何時から始まる映画が見られるか。",
                "options": [
                  "12:25",
                  "14:00",
                  "14:30",
                  "15:15"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "15:15"
                },
                "explanation": "Question 60. Answer will be updated soon."
              },
              {
                "questionText": "問2 タンさんは、午後時間ができたので映画を見ることにした。映画館にいられる時間は午後3時から午後6時までの3時間だけである。今日タンさんが、初めから終わりまで見ることができる映画は次のうちどれか。",
                "options": [
                  "大きな食卓",
                  "猫と一郎",
                  "風の忍者",
                  "オハナ♡"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "猫と一郎"
                },
                "explanation": "Question 60. Answer will be updated soon."
              }
            ],
            "passageLayout": "html"
          },
          {
            "title": "問題61 (Visual Layout Format)",
            "passageText": "<div style=\"margin-bottom:15px; font-weight:bold; font-size:16px;\">問題61 つぎの文章は、会社からのメールである。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。</div><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 700 850\" width=\"100%\" style=\"max-width:700px;display:block;margin:0 auto;font-family:sans-serif;\">  <defs>    <filter id=\"f61\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">      <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" result=\"noise\" />      <feColorMatrix type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0\" in=\"noise\" result=\"coloredNoise\" />      <feComposite operator=\"over\" in=\"coloredNoise\" in2=\"SourceGraphic\" result=\"composite\" />    </filter>  </defs>  <rect width=\"700\" height=\"850\" fill=\"#fcfcfc\" filter=\"url(#f61)\"/>    <rect x=\"20\" y=\"20\" width=\"660\" height=\"800\" fill=\"#eeefee\" stroke=\"#888\" stroke-width=\"2\"/>    <rect x=\"20\" y=\"20\" width=\"660\" height=\"60\" fill=\"#d2d4d3\" stroke=\"#888\" stroke-width=\"2\"/>  <text x=\"350\" y=\"45\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"bold\" fill=\"#333\" letter-spacing=\"1\">（株）△△社　会社説明会　予約完了メール</text>  <text x=\"350\" y=\"65\" text-anchor=\"middle\" font-size=\"14\" fill=\"#333\">【開催日時】 20xx年12月1日 13:00～14:30</text>    <text x=\"40\" y=\"110\" font-size=\"16\" font-weight=\"bold\" fill=\"#222\">ウェン・モーリー　様</text>    <text x=\"40\" y=\"145\" font-size=\"14\" fill=\"#222\">株式会社△△社、採用担当です。このたびは、説明会にお申し込みいただきありがとうござい</text>  <text x=\"40\" y=\"170\" font-size=\"14\" fill=\"#222\">ました。日時や持ち物をもう一度ご確認いただき、ご参加くださいますよう、お願いいたしま</text>  <text x=\"40\" y=\"195\" font-size=\"14\" fill=\"#222\">す。</text>    <text x=\"40\" y=\"240\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">「会社説明会」</text>    <text x=\"40\" y=\"280\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●持ち物</text>  <text x=\"60\" y=\"305\" font-size=\"14\" fill=\"#222\">・筆記用具</text>  <text x=\"60\" y=\"330\" font-size=\"14\" fill=\"#222\">・履歴書（写真をはってください。）</text>  <text x=\"60\" y=\"355\" font-size=\"14\" fill=\"#222\">・この予約完了メールをプリントアウトしたもの</text>  <text x=\"40\" y=\"390\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●服装</text>  <text x=\"60\" y=\"415\" font-size=\"14\" fill=\"#222\">スーツ</text>  <text x=\"40\" y=\"450\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●会場</text>  <text x=\"60\" y=\"475\" font-size=\"14\" fill=\"#222\">△△社本社 〒111-2222 東京都○○市□□２－３－４ (株)△△社第一ビル</text>  <text x=\"40\" y=\"510\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●交通機関</text>  <text x=\"60\" y=\"535\" font-size=\"14\" fill=\"#222\">JR中央線・総武線、東京メトロ東西線 「〇×駅」徒歩10分</text>  <text x=\"40\" y=\"570\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●受付場所</text>  <text x=\"60\" y=\"595\" font-size=\"14\" fill=\"#222\">ビル１階の（株）△△社本社受付</text>  <text x=\"40\" y=\"630\" font-size=\"15\" font-weight=\"bold\" fill=\"#222\">●受付開始時間</text>  <text x=\"60\" y=\"655\" font-size=\"14\" fill=\"#222\">開始時間の10分前～</text>  <text x=\"60\" y=\"680\" font-size=\"14\" fill=\"#222\">＊早くご来社いただいてもご案内ができません。</text>  <text x=\"75\" y=\"705\" font-size=\"14\" fill=\"#222\">また、開始時刻を過ぎてからの参加はできません。</text>  <text x=\"40\" y=\"745\" font-size=\"14\" font-weight=\"bold\" fill=\"#222\">＜注意事項＞</text>  <text x=\"40\" y=\"765\" font-size=\"14\" fill=\"#222\">＊当日は時間厳守でお願いいたします。</text>  <text x=\"40\" y=\"785\" font-size=\"14\" fill=\"#222\">＊前日までに参加日の変更がある場合は、当社ホームページの採用案内ページからキャンセル</text>  <text x=\"55\" y=\"805\" font-size=\"14\" fill=\"#222\">の手続きをして、あらためて申し込みをしてください。</text>  <text x=\"40\" y=\"825\" font-size=\"14\" fill=\"#222\">＊当日の遅刻や欠席は直接当社にご連絡ください。(採用担当：03-4567-8901)</text>  <line x1=\"20\" y1=\"840\" x2=\"680\" y2=\"840\" stroke=\"#888\" stroke-width=\"1\" stroke-dasharray=\"4\"/>  </svg>",
            "questions": [
              {
                "questionText": "問1 説明会に行く際、○×駅に何時に着くのが一番よいか。",
                "options": [
                  "12時35分",
                  "12時50分",
                  "13時ちょうど",
                  "14時半"
                ],
                "correctOption": {
                  "index": 0,
                  "text": "12時35分"
                },
                "explanation": "Question 61. Answer will be updated soon."
              },
              {
                "questionText": "問2 ウェンさんは説明会の日に具合が悪くなり開始の時間に行けなくなった。どうすればよいか。",
                "options": [
                  "連絡はせず、参加もしない。",
                  "会社のホームページの採用案内ページからキャンセルをする。",
                  "連絡はせず、遅れて参加する。",
                  "会社の採用担当者に電話をする。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "会社の採用担当者に電話をする。"
                },
                "explanation": "Question 61. Answer will be updated soon."
              }
            ],
            "passageLayout": "html"
          },
          {
            "title": "問題62 (Visual Layout Format)",
            "passageText": "\n<div class=\"bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg border border-gray-300 dark:border-gray-600 font-sans shadow-md mx-auto max-w-3xl text-gray-800 dark:text-gray-100\">\n  <div class=\"text-center font-bold mb-6 text-lg md:text-xl tracking-wider\">\n    ★留学生の生活応援メールマガジン ★<br>\n    ★ 20XX年1月号 ★\n  </div>\n\n  <div class=\"text-center mb-6 font-medium\">\n    新年あけましておめでとうございます！<br>\n    日本のお正月はいかがですか？ 留学生の生活応援メルマガは、今年もみなさんの役に立つ情報をどんどん紹介しますので、どうぞよろしくお願いいたします！\n  </div>\n\n  <div class=\"mb-6 ml-4\">\n    <div class=\"flex\"><span class=\"w-16\">目次</span><span>1. ニュース・・・・・・・・新年会・不用品交換</span></div>\n    <div class=\"flex\"><span class=\"w-16\"></span><span>2. 特集・・・・・・・・・・・・「みんなの節約方法」</span></div>\n  </div>\n\n  <div class=\"mb-6\">\n    <h3 class=\"font-bold text-lg mb-2\">◆1. ニュース</h3>\n    <div class=\"ml-4 mb-4\">\n      <div class=\"font-bold mb-1\">新年会</div>\n      <div class=\"ml-4 mb-2\">餅つき、おせち料理など、日本のお正月を楽しみましょう。</div>\n      <div class=\"ml-8 mb-2\">\n        <div class=\"flex\"><span class=\"w-16\">日時：</span><span>1月15日(土) 13:00～17:00</span></div>\n        <div class=\"flex\"><span class=\"w-16\">場所：</span><span>〇〇市民会館集会室</span></div>\n        <div class=\"mt-1\">参加申し込みはこちら <a href=\"#\" class=\"text-blue-600 hover:underline\">http://ryugakuoen.or.jp/shinnen.htm</a></div>\n      </div>\n    </div>\n    <div class=\"ml-4\">\n      <div class=\"font-bold mb-1\">不用品交換</div>\n      <div class=\"ml-4 mb-2\">家具、電気製品など、欲しいものやいらないものを書いておくと、だれかと交換できるかもしれません。</div>\n      <div class=\"ml-4\">交換ページはこちら <a href=\"#\" class=\"text-blue-600 hover:underline\">http://ryugakuoen.or.jp/koukan.htm</a></div>\n    </div>\n  </div>\n\n  <div class=\"mb-8\">\n    <h3 class=\"font-bold text-lg mb-2\">◆2. 特集「みんなの節約方法」</h3>\n    <div class=\"ml-4 mb-2\">\n      電気代を30%カットする方法、安いお店の情報など、上手に節約しながら日本の生活を楽しむ留学生のアイディアがたくさん！ぜひ参考にしてください！\n    </div>\n    <div class=\"ml-4\">特集ページはこちら <a href=\"#\" class=\"text-blue-600 hover:underline\">http://ryugakuoen.or.jp/tokushu.htm</a></div>\n  </div>\n\n  <hr class=\"border-t-2 border-dashed border-gray-400 dark:border-gray-500 mb-4\" />\n\n  <div class=\"mb-4 space-y-2\">\n    <div>◆バックナンバーはこちら <a href=\"#\" class=\"text-blue-600 hover:underline\">http://ryugakuoen.or.jp/menu-mmag.htm</a></div>\n    <div>◆このメルマガは配信専用です。このアドレスに返信はできません。</div>\n    <div class=\"ml-4\">ご意見、お問い合わせはこちら <a href=\"#\" class=\"text-blue-600 hover:underline\">http://ryugakuoen.or.jp/ad/mail.htm</a></div>\n    <div>◆配信停止はこちら <a href=\"#\" class=\"text-blue-600 hover:underline\">http://ryugakuoen.or.jp/mmag_resign.htm</a></div>\n  </div>\n\n  <hr class=\"border-t-2 border-dashed border-gray-400 dark:border-gray-500 mb-6\" />\n\n  <div class=\"space-y-1\">\n    <div class=\"flex\"><span class=\"w-20\">発行人：</span><span>NPO留学生の生活応援グループ</span></div>\n    <div class=\"flex items-center\"><span class=\"w-20\">編集人：</span><span class=\"mr-4\">メルマガ委員会</span> <span>e-mail: <a href=\"#\" class=\"text-blue-600 hover:underline\">XXX@ryuugakuoen.or.jp</a></span></div>\n  </div>\n</div>\n",
            "questions": [
              {
                "questionText": "問1 新年会に参加したい場合、どうすればよいと書いてあるか。",
                "options": [
                  "連絡はしないで、直接1月15日に○○市民会館集会室へ行く。",
                  "①のURLをクリックして手続きをする。",
                  "②のURLをクリックして手続きをする。",
                  "④のメールアドレスにメールを送る。"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "①のURLをクリックして手続きをする。"
                },
                "explanation": "Question 62. Answer will be updated soon."
              },
              {
                "questionText": "問2 このメールマガジンをもう受け取りたくない。どうすればよいと書いてあるか。",
                "options": [
                  "このメールマガジンに返信をして伝える。",
                  "②のURLをクリックして手続きをする。",
                  "③のURLをクリックして手続きをする。",
                  "④のメールアドレスにメールを送る。"
                ],
                "correctOption": {
                  "index": 2,
                  "text": "③のURLをクリックして手続きをする。"
                },
                "explanation": "Question 62. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "passageNotes": "<p>(注1)メールマガジン：メールで送られてくる情報</text></svg></p>"
          },
          {
            "title": "問題63 (Visual Layout Format)",
            "passageText": "\n<div class=\"bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg border-2 border-gray-400 dark:border-gray-500 font-sans shadow-sm mx-auto max-w-3xl text-gray-800 dark:text-gray-100\">\n  \n  <div class=\"mb-6 font-bold text-lg md:text-xl border-b border-gray-300 dark:border-gray-600 pb-2\">\n    チン・ヌーチー様\n  </div>\n\n  <div class=\"mb-4 leading-loose indent-4\">\n    <p>いつも〇✕ショップをご利用いただきまして、ありがとうございます。担当の木村と申します。</p>\n    <p>このたびは、先日ご購入いただきました商品【ABC電気ポット】に不備<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注2)</span>がございましたこと、大変申し訳ありませんでした。大変ご面倒ではございますが、商品【ABC電気ポット】を、着払い<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注3)</span>にて、ご返送くださいますようお願いいたします。</p>\n  </div>\n\n  <div class=\"border border-gray-400 dark:border-gray-500 p-4 mb-6 ml-4 max-w-md bg-gray-50 dark:bg-gray-700/50\">\n    <div class=\"flex\"><span class=\"font-bold w-32 shrink-0\">●ご返送先住所</span>\n      <div>\n        〒123-4567 東京都〇〇区〇〇町1-2-3<br>\n        株式会社 〇✕ショップ<br>\n        Tel: 03-1234-5678\n      </div>\n    </div>\n  </div>\n\n  <hr class=\"border-t border-gray-400 dark:border-gray-500 mb-6\" />\n\n  <div class=\"mb-4 leading-loose\">\n    <p>商品が到着いたしましたら返金<span class=\"text-[0.75em] opacity-80 font-normal align-baseline\">(注4)</span>の対応をさせていただきます。</p>\n    <p>つきましては、お客様のお振込先口座を教えていただけますでしょうか。次の項目にご入力の上、このメールにご返信いただきますようお願いいたします。</p>\n  </div>\n\n  <hr class=\"border-t border-dashed border-gray-400 dark:border-gray-500 mb-4\" />\n\n  <div class=\"flex flex-col md:flex-row justify-around mb-4 space-y-2 md:space-y-0\">\n    <div class=\"space-y-2\">\n      <div class=\"flex items-center\"><span class=\"font-bold mr-2 w-24\">●銀行名 :</span><span class=\"border-b border-gray-400 w-32 inline-block\"></span></div>\n      <div class=\"flex items-center\"><span class=\"font-bold mr-2 w-24\">●口座番号:</span><span class=\"border-b border-gray-400 w-32 inline-block\"></span></div>\n    </div>\n    <div class=\"space-y-2\">\n      <div class=\"flex items-center\"><span class=\"font-bold mr-2 w-24\">●支店名:</span><span class=\"border-b border-gray-400 w-32 inline-block\"></span></div>\n      <div class=\"flex items-center\"><span class=\"font-bold mr-2 w-24\">●ご名義人様:</span><span class=\"border-b border-gray-400 w-32 inline-block\"></span></div>\n    </div>\n  </div>\n\n  <hr class=\"border-t border-dashed border-gray-400 dark:border-gray-500 mb-4\" />\n\n  <div class=\"mb-6 leading-loose\">\n    <p>このたびはお客様にご迷惑をおかけしてしまい、大変申し訳ありませんでした。</p>\n    <p>またのご利用を心よりお待ちしております。</p>\n  </div>\n\n  <hr class=\"border-t border-dashed border-gray-400 dark:border-gray-500 mb-6\" />\n\n  <div class=\"leading-loose\">\n    <div class=\"mb-2\">〇✕ショップ<span class=\"mx-8\"></span>木村 〇〇</div>\n    <div>URL: <a href=\"#\" class=\"text-blue-600 hover:underline\">http://shop.marubatsu.com</a></div>\n    <div>Tel: 03-1234-5678</div>\n    <div>e-mail: <a href=\"#\" class=\"text-blue-600 hover:underline\">XXX@marubatsu.com</a></div>\n  </div>\n</div>\n",
            "questions": [
              {
                "questionText": "問1 買った商品をどうしてほしいと言っているか。",
                "options": [
                  "そのまま直して使う。",
                  "使わないで捨てる。",
                  "○×ショップに送り、払った送料をメールで連絡する。",
                  "着払いで、○×ショップに送る。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "着払いで、○×ショップに送る。"
                },
                "explanation": "Question 63. Answer will be updated soon."
              },
              {
                "questionText": "問2 お金はどのように戻ってくるか。",
                "options": [
                  "商品を送り返さなくても、銀行の口座情報を教えるとお金が振り込まれる。",
                  "商品を送ったことをメールすると、お金が振り込まれる。",
                  "商品が○×ショップに届いたら、お金が現金で送られてくる。",
                  "商品が○×ショップに届いたら、教えておいた口座にお金が振り込まれる。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "商品が○×ショップに届いたら、教えておいた口座にお金が振り込まれる。"
                },
                "explanation": "Question 63. Answer will be updated soon."
              }
            ],
            "passageLayout": "html",
            "passageNotes": "<p>(注1)不良品：傷や欠点などがある商品</p><p>(注2)不備がある：足りないことや完全でないことがある</p><p>(注3)着払い：荷物などを受け取る人が料金を払うこと</p><p>(注4)返金：お金を返すこと</p>"
          },
          {
            "title": "問題64 (Visual Layout Format)",
            "passageText": "つぎの文章と右のページのグラフを見て、下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n右のグラフは、好きな動物について日本人3,600人を対象に行った調査の結果である。1983年と2007年の調査結果のうち、上位1位から8位までを示している。",
            "questions": [
              {
                "questionText": "問1 1983年と2007年で一番大きな差があらわれた動物はどれか。",
                "options": [
                  "犬 (いぬ)",
                  "パンダ",
                  "萬 (Note: This is likely a scanning error for a kanji like 鳥 (bird), 馬 (horse), or 猫 (cat))",
                  "リス"
                ],
                "correctOption": {
                  "index": 1,
                  "text": "パンダ"
                },
                "explanation": "Question 64. Answer will be updated soon."
              },
              {
                "questionText": "問2 グラフについて正しく述べているのはどれか。",
                "options": [
                  "ねこは1983年と2007年で大きな差がある。",
                  "うさぎは2007年の調査では3位である。",
                  "パンダは1983年の調査では1位である。",
                  "コアラは2007年の調査では1983年より減少している。"
                ],
                "correctOption": {
                  "index": 3,
                  "text": "コアラは2007年の調査では1983年より減少している。"
                },
                "explanation": "Question 64. Answer will be updated soon."
              }
            ]
          }
        ]
      }
    ]
  }
];
