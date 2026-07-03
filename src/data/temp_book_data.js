// src/data/book_data.jsx

module.exports = [
  {
    id: "genki-1",
    title: "Genki I: An Integrated Course in Elementary Japanese",
    description: "The classic textbook for beginners. Covers basic grammar, vocabulary, and Hiragana/Katakana.",
    coverUrl: "", // We can use CSS gradients for cover styling
    level: "N5",
    category: "Textbook",
    chapters: [
      {
        id: "ch-1-greetings",
        title: "Chapter 1: Greetings & Self-Introductions",
        type: "questions-only",
        description: "Basic greetings, numbers 1-100, and standard self-introduction patterns.",
        passages: [
          {
            title: "Grammar & Vocabulary Drill",
            passageText: "", // Empty for questions-only
            questions: [
              {
                questionText: "Which is the correct Japanese greeting for 'Good morning' (polite)?",
                options: [
                  "おはよう (ohayou)",
                  "おはようございます (ohayou gozaimasu)",
                  "こんにちは (konnichiwa)",
                  "こんばんは (konbanwa)"
                ],
                correctOption: {
                  index: 1,
                  text: "おはようございます (ohayou gozaimasu)"
                },
                explanation: "おはよう (ohayou) is casual, whereas おはようございます (ohayou gozaimasu) is the polite form."
              },
              {
                questionText: "Translate: 'I am a student.' (私 = watashi, 学生 = gakusei)",
                options: [
                  "私は学生です。 (Watashi wa gakusei desu.)",
                  "私は学生ではありません。 (Watashi wa gakusei dewa arimasen.)",
                  "学生は私です。 (Gakusei wa watashi desu.)",
                  "私は学生でした。 (Watashi wa gakusei deshita.)"
                ],
                correctOption: {
                  index: 0,
                  text: "私は学生です。 (Watashi wa gakusei desu.)"
                },
                explanation: "The particle 'wa' marks the subject. 'desu' is 'to be'."
              },
              {
                questionText: "What is the number 45 in Japanese?",
                options: [
                  "よんじゅうご (yon-juu-go)",
                  "ごじゅうよん (go-juu-yon)",
                  "しじゅう (shi-juu)",
                  "よんじゅう (yon-juu)"
                ],
                correctOption: {
                  index: 0,
                  text: "よんじゅうご (yon-juu-go)"
                },
                explanation: "45 is 4 (よん) * 10 (じゅう) + 5 (ご)."
              },
              {
                questionText: "How do you say 'Excuse me' / 'Sorry' in Japanese?",
                options: [
                  "ありがとう (arigatou)",
                  "すみません (sumimasen)",
                  "ごめんなさい (gomen nasai)",
                  "はじめまして (hajimemashite)"
                ],
                correctOption: {
                  index: 1,
                  text: "すみません (sumimasen)"
                },
                explanation: "すみません (sumimasen) is commonly used to say 'Excuse me' or apologize politely."
              },
              {
                questionText: "What particle is used to indicate a question at the end of a sentence?",
                options: [
                  "は (wa)",
                  "が (ga)",
                  "か (ka)",
                  "の (no)"
                ],
                correctOption: {
                  index: 2,
                  text: "か (ka)"
                },
                explanation: "The particle 'か' (ka) is the question marker in Japanese."
              }
            ]
          }
        ]
      },
      {
        id: "ch-2-shopping",
        title: "Chapter 2: Shopping & Directions",
        type: "short-passage",
        description: "Dialogue at a store, identifying items (kore, sore, are), and asking for prices.",
        passages: [
          {
            title: "Dialogue at the Watch Shop",
            passageText: "たなか：すみません、これはいくらですか。\n店員：それは三千円（さんぜんえん）です。\nたなか：そうですか。じゃあ、あの時計（とけい）はいくらですか。\n店員：あれは一万円（いちまんえん）です。\nたなか：うわぁ、高いですね。じゃあ、その時計をください。\n店員：ありがとうございます。",
            questions: [
              {
                questionText: "How much is the watch Tanaka-san ends up buying?",
                options: [
                  "1,000 yen",
                  "3,000 yen",
                  "10,000 yen",
                  "Free"
                ],
                correctOption: {
                  index: 1,
                  text: "3,000 yen"
                },
                explanation: "Tanaka-san buys 'that watch near you' (その時計), which the clerk said is 3,000 yen (三千円). The watch over there (あの時計) was 10,000 yen (一万円), which he thought was too expensive (高い)."
              },
              {
                questionText: "What does Tanaka-san think of the watch that costs 10,000 yen?",
                options: [
                  "It is cheap.",
                  "It is beautiful.",
                  "It is expensive.",
                  "It is small."
                ],
                correctOption: {
                  index: 2,
                  text: "It is expensive."
                },
                explanation: "Tanaka-san says '高いですね' (takai desu ne) which means 'It is expensive, isn't it?'"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sou-matome-n3-reading",
    title: "JLPT Sou Matome N3 Reading Comprehension",
    description: "Focuses on comprehension of short letters, advertisements, and medium-length essays for the N3 level.",
    coverUrl: "",
    level: "N3",
    category: "Reading",
    chapters: [
      {
        id: "day-1-short-passage",
        title: "Day 1: Information Search (Notice)",
        type: "short-passage",
        description: "Practice searching for details in a library notice or announcement.",
        passages: [
          {
            title: "Notice: Library Schedule Changes",
            passageText: "【中央図書館からのお知らせ】\n\n新しいうちの図書館システムへの移行のため、以下の期間は休館（きゅうかん）いたします。\n\n期間：７月１０日（月曜日）〜７月１４日（金曜日）\n\n※この期間は本の貸出（かしだし）と返却（へんきゃく）はできません。\n※返却ポストも使用できませんので、本は１５日以降にカウンターへお持ちください。\n※ご迷惑をおかけしますが、ご理解をお願いいたします。",
            questions: [
              {
                questionText: "When is the library closed?",
                options: [
                  "From Monday, July 10th to Friday, July 14th",
                  "Only on July 10th and 14th",
                  "Every Monday and Friday in July",
                  "Until July 15th starting from July 1st"
                ],
                correctOption: {
                  index: 0,
                  text: "From Monday, July 10th to Friday, July 14th"
                },
                explanation: "The notice states: 期間：７月１０日（月曜日）〜７月１４日（金曜日）休館いたします (During this period we will be closed)."
              },
              {
                questionText: "What should you do with a book you need to return during the closed period?",
                options: [
                  "Put it in the return post box.",
                  "Mail it to the library.",
                  "Bring it to the counter on or after July 15th.",
                  "Keep it forever."
                ],
                correctOption: {
                  index: 2,
                  text: "Bring it to the counter on or after July 15th."
                },
                explanation: "The notice says: 返却ポストも使用できませんので、本は１５日以降にカウンターへお持ちください (The return post is also unusable, so please bring books to the counter from the 15th onwards)."
              }
            ]
          }
        ]
      },
      {
        id: "day-2-long-passage",
        title: "Day 2: Long Essay (Modern Life)",
        type: "long-passage",
        description: "Read a multi-paragraph opinion piece on the balance between digital communication and face-to-face interaction.",
        passages: [
          {
            title: "The Changing Face of Communication",
            passageText: "最近、スマートフォンやSNSの普及によって、私たちのコミュニケーションの形は大きく変わりました。いつでも、どこでも、誰とでもすぐにつながることができるようになり、非常に便利になりました。しかし、その一方で、直接会って話す機会が減っていると感じる人も多いようです。\n\n文字だけのやり取りでは、相手の表情や声のトーンが分からないため、誤解が生じることもあります。例えば、冗談のつもりで送った言葉が、相手を怒らせてしまうことがあります。顔を見て話していれば、そのような誤解はすぐに解けるはずです。\n\nもちろん、SNSには良い点もたくさんあります。遠く離れた友人の近況を知ることができたり、共通の趣味を持つ人と簡単に出会えたりします。大切なのは、デジタルなコミュニケーションと、対面でのコミュニケーションのバランスを上手にとることではないでしょうか。",
            questions: [
              {
                questionText: "What is the main topic of the first paragraph?",
                options: [
                  "The history of smartphones",
                  "How SNS has made shopping easier",
                  "The change in communication styles and the decrease in face-to-face talk",
                  "The rules of using phones in school"
                ],
                correctOption: {
                  index: 2,
                  text: "The change in communication styles and the decrease in face-to-face talk"
                },
                explanation: "The first paragraph mentions: コミュニケーションの形は大きく変わりました...しかし...直接会って話す機会が減っている (Communication styles have changed... however, face-to-face talking has decreased)."
              },
              {
                questionText: "Why do misunderstandings occur in text-only communication according to the text?",
                options: [
                  "Because typing takes too long.",
                  "Because you cannot see the other person's expressions or hear their tone.",
                  "Because people use too many emojis.",
                  "Because internet connections are unstable."
                ],
                correctOption: {
                  index: 1,
                  text: "Because you cannot see the other person's expressions or hear their tone."
                },
                explanation: "Paragraph 2 states: 文字だけのやり取りでは、相手の表情や声のトーンが分からないため、誤解が生じることもあります (In text-only exchanges, because you don't know the expression or tone of voice, misunderstandings can occur)."
              },
              {
                questionText: "What does the author suggest is the most important thing?",
                options: [
                  "We should stop using smartphones completely.",
                  "We should only communicate via SNS.",
                  "Balancing digital and face-to-face communication.",
                  "We should write letters by hand."
                ],
                correctOption: {
                  index: 2,
                  text: "Balancing digital and face-to-face communication."
                },
                explanation: "The final sentence concludes: 大切なのは、デジタルなコミュニケーションと、対面でのコミュニケーションのバランスを上手にとること (The important thing is to balance digital and face-to-face communication well)."
              }
            ]
          }
        ]
      },
      {
        id: "day-3-drill-50",
        title: "Day 3: Vocabulary & Grammar Drill (10 Questions)",
        type: "day-challenge",
        description: "A fast-paced review of essential grammar particles and N3 vocabulary words.",
        passages: [
          {
            title: "Quick Drill",
            passageText: "", // Empty for drill
            questions: [
              {
                questionText: "部屋に入るときは、靴を（　　）ください。",
                options: [
                  "はいて",
                  "ぬいで",
                  "きせて",
                  "かけて"
                ],
                correctOption: {
                  index: 1,
                  text: "ぬいで"
                },
                explanation: "靴を脱ぐ (くつをぬぐ) means to take off shoes. When entering a room (部屋に入るとき), you take off your shoes."
              },
              {
                questionText: "山田さんは、明日雨が（　　）ハイキングに行かないと言っていました。",
                options: [
                  "ふれば",
                  "ふったら",
                  "ふるなら",
                  "ふると"
                ],
                correctOption: {
                  index: 1,
                  text: "ふったら"
                },
                explanation: "雨が降ったら (ame ga futtara) is the conditional 'if it rains'. It fits natural dialogue best here."
              },
              {
                questionText: "日本語がもっと上手に（　　）ために、毎日練習しています。",
                options: [
                  "なる",
                  "なす",
                  "はなす",
                  "いう"
                ],
                correctOption: {
                  index: 0,
                  text: "なる"
                },
                explanation: "～になる (ni naru) is 'to become'. 上手になるために (jouzu ni naru tame ni) means 'in order to become good at'."
              },
              {
                questionText: "この本は（　　）やすくて、一日で全部読んでしまいました。",
                options: [
                  "読み",
                  "読んで",
                  "読もう",
                  "読む"
                ],
                correctOption: {
                  index: 0,
                  text: "読み"
                },
                explanation: "Verb Stem + やすい (yasui) means 'easy to do verb'. 読みやすい (yomiyasui) means 'easy to read'."
              },
              {
                questionText: "先生、この漢字の読み方を（　　）いただけませんか。",
                options: [
                  "教えて",
                  "教えられて",
                  "教えてくれて",
                  "教えさせて"
                ],
                correctOption: {
                  index: 0,
                  text: "教えて"
                },
                explanation: "～ていただけませんか (~te itadakemasen ka) is a polite request. 教えていただけませんか = 'Could you please teach/tell me?'"
              },
              {
                questionText: "宿題を（　　）から、遊びに行きます。",
                options: [
                  "する",
                  "してしまって",
                  "おわって",
                  "おわらせて"
                ],
                correctOption: {
                  index: 3,
                  text: "おわらせて"
                },
                explanation: "おわらせる is transitive/causative 'to finish'. おわらせてから (owaransete kara) means 'after finishing'."
              },
              {
                questionText: "彼は日本に１０年も住んでいる（　　）、日本語が全然話せない。",
                options: [
                  "ので",
                  "から",
                  "のに",
                  "ため"
                ],
                correctOption: {
                  index: 2,
                  text: "のに"
                },
                explanation: "のに (noni) is used for 'despite' or 'although'. 'Although he lived in Japan for 10 years, he can't speak Japanese at all.'"
              },
              {
                questionText: "私の趣味は、映画を（　　）ことです。",
                options: [
                  "見る",
                  "見ている",
                  "見せる",
                  "見られた"
                ],
                correctOption: {
                  index: 0,
                  text: "見る"
                },
                explanation: "Verb (dictionary form) + ことです (~ koto desu) is used to nominalize the verb to express a hobby (趣味)."
              },
              {
                questionText: "明日、大切な会議がある（　　）、早く寝なければならない。",
                options: [
                  "が",
                  "ので",
                  "けれど",
                  "と"
                ],
                correctOption: {
                  index: 1,
                  text: "ので"
                },
                explanation: "ので (node) indicates reason/cause: 'Because there is an important meeting tomorrow...'"
              },
              {
                questionText: "ちょっと買い物の（　　）、ポストに手紙を出してきて。",
                options: [
                  "ついでに",
                  "ながら",
                  "あいだに",
                  "かわりに"
                ],
                correctOption: {
                  index: 0,
                  text: "ついでに"
                },
                explanation: "～ついでに (tsuide ni) means 'while doing A, take the opportunity to also do B'."
              }
            ]
          }
        ]
      }
    ]
  }
,
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
              "questionText": "郵便局の近くに引っ越したので便利です。",
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
              "questionText": "荷物が届きましたが、それは私が注文したのと ______ 。",
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
              "questionText": "子供のころ、この公園で遊んだ ______ 。",
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
              "questionText": "初めまして。リンと申します。",
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
              "questionText": "夫とは大学のとき ______ 、卒業後すぐに結婚した。",
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
              "questionText": "ゲームを ______ ばかりいないで、自然に親しんだらどうですか。",
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
              "questionText": "財布が落ちていたので、交番に届けた。",
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
              "questionText": "うそを ______ はいけません。",
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
              "questionText": "______ ありがとう。",
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
              "questionText": "向こうの和室でお茶とお菓子をいただきましょう。",
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
              "questionText": "これからそちらに ______ から、3時までには着くと思います。",
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
              "questionText": "A「ここは写真を ______ いけないんだよ。」 B「あ、そうなんだ。」",
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
              "questionText": "昔は、車の代わりに馬や牛が荷物を運んだりした。",
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
              "questionText": "A「ごめんね。本当にごめん。」 B「そんなに ______ いいよ。」",
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
              "questionText": "A「全部 ______ ちゃおうか。」 B「明日の分、とっとこうよ。」",
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
              "questionText": "次の信号を左に曲がってください。",
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
              "questionText": "鉛筆に消しゴムをつけたのは、良い ______ だと思う。",
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
              "questionText": "あんなやり方ではうまく ______ だろうと思う。",
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
              "questionText": "まもなく電車がまいります。危ないですから、黄色い線まで下がってお待ちください。",
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
              "questionText": "A「試験はできた？」 B「うん、 ______ わからなかったけど、だいたいできたよ。」",
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
              "questionText": "今年は、日本語能力試験のN3を ______ と思います。",
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
              "questionText": "やり方は簡単です。心配は要りません。",
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
              "questionText": "ぼくは英語は苦手だが、数学は ______ だ。",
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
              "questionText": "A「君、昨日来なかったね。」 B「 ______ が…。」",
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
              "questionText": "このざっしは、辞書があれば読める。",
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
              "questionText": "隣の席が ______ ので、荷物をそこに置いた。",
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
              "questionText": "図書館の本を返す ______ 忘れていた。",
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
              "questionText": "宿題を机の上に置いてきてしまった。",
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
              "questionText": "A「すみません、コーヒーのおかわりをお願いします。」 B「はい、 ______ 。」",
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
              "questionText": "明日の面接試験 ______ 気になって眠れない。",
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
              "questionText": "これは夫がかいた港の絵です。",
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
              "questionText": "では、また ______ お電話いたします。",
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
              "questionText": "______ 練習は休みません。",
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
              "questionText": "電車が事故でおくれました。",
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
              "questionText": "昨日、運動しすぎて、体の ______ が痛いです。",
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
              "questionText": "準備運動を ______ 泳ぐと危険です。",
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
              "questionText": "彼は卒業式に出ませんでした。",
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
              "questionText": "緊張しないで、______ 話しましょう。",
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
              "questionText": "A「なんて書いてあるの？」 B「危ない！ ______ って書いてあるんだよ。」",
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
              "questionText": "紹介します。つまと息子です。",
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
              "questionText": "よくわかりません。もう少し ______ 説明してくれませんか。",
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
              "questionText": "A「宝くじ ______ かなあ。」 B「お金のむだだよ。」",
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
              "questionText": "授業の予定が変わった。",
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
              "questionText": "スキーで ______ 足の骨を折ってしまった。",
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
              "questionText": "国へ帰っても、私達のことを ______ ほしい。",
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
              "questionText": "彼女と結婚の約束をした。",
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
              "questionText": "ぼくは ______ で、姉が一人、兄が二人います。",
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
              "questionText": "風邪がうつらない ______ 、マスクをします。",
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
              "questionText": "船よりひこうきのほうが速い。",
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
              "questionText": "この野菜は ______ 食べられません。ゆでるか焼くかしてください。",
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
              "questionText": "忙しくて寝る時間 ______ ないのに、遊びに行けるわけがない。",
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
              "questionText": "大学で美術を勉強しています。",
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
              "questionText": "A「スニーカーのひもがほどけているよ。」 B「ほんとだ。 ______ から待って。」",
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
              "questionText": "A「ちょっとお茶でも飲んで休もうか。」 B「お茶なんか要らない。 ______ なんかいられないよ。」",
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
              "questionText": "橋をわたって、二つ目の角を右へ曲がると郵便局があります。",
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
              "questionText": "車の事故にあったが、 ______ よかった。",
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
              "questionText": "考えてもどうにもならない。忘れる ______ 。",
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
              "questionText": "残念ですが、パーティーに出席できません。",
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
              "questionText": "______ が、どうぞお入りください。",
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
              "questionText": "A「浅草 ______ 、何を思い浮かべますか。」 B「雷門、神輿、そしてスカイツリーかな。」",
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
              "questionText": "自動販売機を使いたいので、1万円札を細かくしてくれませんか。",
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
              "questionText": "この店の一日の ______ は、約10万円です。",
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
              "questionText": "隅田川 ______ 花火大会が行われるため、交通機関は混雑するでしょう。",
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
              "questionText": "うちは普通の家ですが、世界各国からいろんな人がとまりにきます。",
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
              "questionText": "______ 、たくさん召し上がってください。",
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
              "questionText": "地震 ______ ニュースをお伝えいたします。",
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
              "questionText": "店をきれいにしたら、以前に比べて、女性客が増えた。",
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
              "questionText": "ぼくは、毎朝、風呂場で ______ をそります。",
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
              "questionText": "お盆休みのラッシュ ______ 事故まで起こり、高速道路はひどい渋滞になった。",
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
              "questionText": "彼女はいつも助けてくれるやさしい人です。",
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
              "questionText": "7月 ______ には、梅雨も明けるでしょう。",
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
              "questionText": "ご主人様に、どうぞよろしく ______ ください。",
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
              "questionText": "再来週、面接試験を受けます。",
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
              "questionText": "一度できなくても ______ いけません。もう一度やってみましょう。",
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
              "questionText": "あいさつの仕方は、時と場所、相手 ______ 違います。",
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
              "questionText": "君は熱心な学生だから、きっと試験に合格するでしょう。",
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
              "questionText": "あの人とは同じクラスなんですが、口を ______ ことがありません。",
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
              "questionText": "A「おかしいなあ、10個 ______ はずなのに。」 B「あ、ごめん、1個食べちゃった。」",
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
              "questionText": "石けんが 12こ、入っています。",
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
              "questionText": "田中さんは、よく笑う ______ 人です。",
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
              "questionText": "A「あのう、すみませんが、道を教えて ______ 。」 B「いいですよ。」",
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
              "questionText": "あのお寺の庭は、みどりが多くて静かです。",
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
              "questionText": "新幹線は、乗車 ______ だけでなく、特急 ______ が必要だ。",
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
              "questionText": "こちらで ______ お待ちください。",
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
              "questionText": "皆様によろしくお伝えください。",
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
              "questionText": "ご注文の品物は、明日 ______ お届けいたします。",
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
              "questionText": "A「お客様、何に ______ 。」 B「Aランチ、お願いします。」",
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
              "questionText": "公園でこどもと遊んだ。",
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
              "questionText": "この先、道が二つに分かれていますが、どっちの ______ に行けばいいですか。",
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
              "questionText": "戦争が ______ ように。",
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
              "questionText": "バスで空港へ行く。",
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
              "questionText": "午後はじゆうに行動して下さい。",
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
              "questionText": "昨日の会議では、よいアイデアが ______ 発表された。",
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
              "questionText": "まだゲームをしているの？ ______ しなさい。",
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
              "questionText": "昨年の試験問題は、一昨年 ______ 少し易しくなった。",
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
              "questionText": "今朝は大事な会議がある。遅れない ______ 、いつもより早く家を出よう。",
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
              "questionText": "授業に遅れないようにしてください。",
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
              "questionText": "こんな事があるなんて、しんじられない。",
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
              "questionText": "田中先生は、______ こわいけれど、とてもいい先生です。",
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
              "questionText": "弟は小学生のころ、______ 友だちも少なかったです。",
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
              "questionText": "A「怒らないで。」 B「怒って ______ いないよ、心配しているんだ。」",
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
              "questionText": "いつも助けて ______ ありがとう。",
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
              "questionText": "果物が好きです。",
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
              "questionText": "このきょくを聞くと国を思い出す。",
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
              "questionText": "______ が良い食事を心がけましょう。",
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
              "questionText": "そんな易しい計算もできないなんて、本当に ______ ね。",
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
              "questionText": "電話もメールも通じないなら、遠くても行く ______ 。",
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
              "questionText": "割れない ______ 、そっと置いてください。",
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
              "questionText": "ここはお年寄りのための優先席です。",
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
              "questionText": "お皿をわってしまった。",
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
              "questionText": "A「 ______ 。」 B「気をつけて。また遊びに来てください。」",
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
              "questionText": "彼の言い方に ______ が、何も言えなかった。",
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
              "questionText": "日本の春 ______ 、サクラですね。",
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
              "questionText": "私は夫に危険な仕事を ______ 。",
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
              "questionText": "夫婦で旅行に行く。",
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
              "questionText": "鳥がとんでいる。",
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
              "questionText": "田舎に広い ______ があるが、そこに家を建てるつもりはない。",
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
              "questionText": "A「今度の試験いつ知ってる？」 B「 ______ 来月の10日だったと思うけれど…。」",
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
              "questionText": "A「あ、リーさんだ。」 B「え、リーさんの ______ よ。国に帰ったんだから。」",
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
              "questionText": "お正月料理も地方や家 ______ 違う。",
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
              "questionText": "紙を三角におります。",
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
              "questionText": "旅館にとまる。",
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
              "questionText": "おなかがすきすぎて、______ 。",
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
              "questionText": "お金を使いすぎて、帰る電車 ______ もなくなった。",
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
              "questionText": "神様、お願い。今年はすてきな人と出会えます ______ 。",
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
              "questionText": "毎日続けて練習すれば覚えられます。",
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
              "questionText": "髪、切ったんだね。ずいぶん ______ が変わったね。",
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
              "questionText": "しぼり ______ の牛乳はいかがですか。",
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
              "questionText": "今はかんご婦を、「かんご師」とよびます。",
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
              "questionText": "時間があるから、ちょっとその辺を ______ しましょう。",
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
              "questionText": "友人を亡くした ______ を歌にしました。",
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
              "questionText": "暖かくなったら、両親を呼んでこの町を案内したい。",
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
              "questionText": "朝から何も食べていないから、おなかが ______ だ。",
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
              "questionText": "A「あれから、彼女に会いましたか。」 B「いえ、あれ ______ です。」",
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
              "questionText": "今年の正月は、久しぶりに家族をつれて神社へ行った。",
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
              "questionText": "貧しかった少年が、社会で成功するという ______ の映画を見た。",
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
              "questionText": "彼女はピンク色が好きで、髪 ______ ピンクにしてしまった。",
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
              "questionText": "私が育った町の美しい川は、今は汚れて、もう泳げない。",
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
              "questionText": "この子、熱が高くてすごく ______ だよ。すぐ医者に連れていこう。",
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
              "questionText": "この石けんはおもしろい ______ 汚れがよく落ちる。",
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
              "questionText": "輸出の反対は輸入です。",
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
              "questionText": "娘のけがが軽くて、______ しました。",
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
              "questionText": "息子 ______ をして老人からお金をとる事件が増えている。",
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
              "questionText": "A「ちょっとにがいね。」 B「お茶の葉を入れすぎたかな。」",
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
              "questionText": "毎日何回も自分の体重を ______ というダイエット方法があるそうです。",
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
              "questionText": "使ったら ______ っぱなしにしないで、片付けなさい。",
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
              "questionText": "最近、忙しそうだけど、無理をしないで。",
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
              "questionText": "毎日レストランで食事をするなんて、お金が ______ できません。",
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
              "questionText": "母が ______ 、みんなで心配しています。",
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
              "questionText": "きれいなかいでしょう。先週末、南の島でひろったの。",
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
              "questionText": "またこんなに部屋を散らかして…。 ______ ね。",
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
              "questionText": "A「今週の土曜日、お花見ですね。」 B「ええ、雨が ______ ですが。」",
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
              "questionText": "歯医者で歯をぬいた日、血がなかなか止まらなくて困った。",
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
              "questionText": "中学から高校の6年間、田中先生に英語を ______ 。",
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
              "questionText": "寒いと思ったら、窓が ______ いた。",
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
              "questionText": "この本の第一課から、復習しましょう。",
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
              "questionText": "まず、今日の ______ ニュースからお伝えいたします。",
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
              "questionText": "A「一郎の試験、どうだったのかなあ。」 B「発表は明日だけれど、 ______ よ。」",
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
              "questionText": "A社は原料を輸入して、せいひんを輸出している。",
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
              "questionText": "新宿へ行くなら、向こうのホームから東京 ______ の電車に乗らないとだめですよ。",
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
              "questionText": "家を ______ 、急に雨が降ってきた。",
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
              "questionText": "アンケート調査にご協力をお願いします。",
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
              "questionText": "3時から会議室で、新しい企画の ______ をします。",
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
              "questionText": "いいにおいが ______ が、何のにおいでしょうか。",
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
              "questionText": "窓を開けると、すずしい風が入ってくる。",
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
              "questionText": "今からだと映画に間に合うかどうかわからないが、______ 行ってみよう。",
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
              "questionText": "この辺の小学生は、______ かわいいですね。",
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
              "questionText": "ランチには飲み物が付いております。温かいのも冷たいのもございます。",
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
              "questionText": "タベ、久しぶりに会った高校時代の友人と、遅くまで楽しく ______ 。",
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
              "questionText": "しっぽを引っ張るのはやめなさい。猫が ______ でしょ。",
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
              "questionText": "昨日の晩は雪が降ったが、今朝は晴れている。",
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
              "questionText": "リンさんはもう一週間も学校を休んでいますね。だれか、彼の ______ を知りませんか。",
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
              "questionText": "うちの犬は、夕方の5時になると散歩に ______ 。",
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
              "questionText": "石油ストーブを消し忘れると、火事のげんいんになります。",
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
              "questionText": "料理の仕方を ______ 、カロリーの低い食事を作りましょう。",
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
              "questionText": "あ、もう8時だ。早く ______ 。",
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
              "questionText": "検査の前は、飲食もタバコも禁止です。",
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
              "questionText": "そんな ______ ホテルには泊まったことがない。",
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
              "questionText": "毎日練習しているのに、______ 上手になりません。",
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
              "questionText": "オリンピック選手に選ばれて、夢がじつげんした。",
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
              "questionText": "A「新しい仕事はどう？」 B「まあまあ ______ よ。」",
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
              "questionText": "失敗してもあきらめないで、もう一度 ______ 。",
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
              "questionText": "日本の歴史について論文を書いています。",
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
              "questionText": "両親が日本に来るけれど、仕事があるので空港まで ______ 行けない。",
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
              "questionText": "私の名前は、______ 書きます。",
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
              "questionText": "ファイルを作成し、保存しましょう。",
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
              "questionText": "忘れるといけないから、手帳に ______ をしておこう。",
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
              "questionText": "日曜日は、家でDVDを ______ 過ごしています。",
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
              "questionText": "しゅしょうは消費税を上げると言った。",
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
              "questionText": "けんかでもしているのか、外がとても ______ 。",
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
              "questionText": "中国で大きな地震があったというニュースが ______ 。",
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
              "questionText": "規則を守りましょう。",
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
              "questionText": "仕事が忙しいので、人をもう一人 ______ ことにした。",
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
              "questionText": "友達の赤ちゃんを預かったのですが、______ 困りました。",
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
              "questionText": "この書類は機械に読ませますから、おり曲げないでください。",
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
              "questionText": "A「田中さんは、フランス語が ______ だそうだね。」 B「ああ、留学していたんだって。」",
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
              "questionText": "田中さん、社長が今すぐ部屋に ______ と言っていますよ。",
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
              "questionText": "紙の表とうらを間違えないように確かめてください。",
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
              "questionText": "台風の影響で、今日の大学の授業はすべて ______ になった。",
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
              "questionText": "ゼミの資料を一晩で ______ 上げた。",
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
              "questionText": "『幸福な王子』という物語を読んだ。",
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
              "questionText": "部屋がなかなか ______ ね。エアコンが壊れているのかな。",
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
              "questionText": "車で空港まで ______ と頼まれました。",
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
              "questionText": "この機械を使うには、画面のしじ通りにしてください。",
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
              "questionText": "牛乳を買ってくるように言われていたが、______ して忘れてしまった。",
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
              "questionText": "友達の結婚のお祝いを一緒に選んで ______ 。",
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
              "questionText": "支払い期限はいつですか。",
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
              "questionText": "きれいで頭のいい田中さんが ______ 。",
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
              "questionText": "A「京都へは ______ ことがありますか。」 B「ええ、何度も行きました。」",
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
              "questionText": "試験にしっぱいしてしまった。",
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
              "questionText": "食器は ______ その棚にしまってください。",
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
              "questionText": "A「あの方をご存じですか。」 B「いいえ、______ 。」",
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
              "questionText": "その友人は独身で、趣味は登山です。",
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
              "questionText": "田中さんの結婚式には、なんとか ______ 出席したいと思っています。",
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
              "questionText": "駐車は ______ ください。",
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
              "questionText": "ビールが冷えています。",
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
              "questionText": "久しぶりに両親と会った。",
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
              "questionText": "この子が ______ のは、2歳になってからです。",
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
              "questionText": "彼とは会話の ______ が合わない。",
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
              "questionText": "妹は、私の持っているものをいつも ______ 。",
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
              "questionText": "工事の音は耳が痛くなる ______ 大きい。",
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
              "questionText": "荷物をお届けに参りましたが、お留守でした。",
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
              "questionText": "ここはむりょうで車が止められます。",
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
              "questionText": "田中さんはお子さんの ______ が悪いらしくて、もう帰りましたよ。",
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
              "questionText": "今日の面接の結果が ______ 、眠れない。",
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
              "questionText": "会社が移転する ______ 。",
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
              "questionText": "秘書に急に ______ 。",
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
              "questionText": "汚いからさわらないで。",
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
              "questionText": "おもしろい場所におつれしましょう。",
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
              "questionText": "A「どんな ______ ですか。」 B「のどが痛くてせきが出るんです。」",
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
              "questionText": "______ ことはないんですが、今、父は入院しているんです。",
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
              "questionText": "明日早いんだから、早く ______ 。",
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
              "questionText": "なんか変な ______ ね。何だろう。",
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
              "questionText": "忘年会で飲みすぎた。",
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
              "questionText": "かみさま、どうかお願いします。",
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
              "questionText": "逃げても逃げても犬が ______ 追いかけてきて怖かった。",
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
              "questionText": "試験まであと1週間しかない。ああ。時間が ______ 過ぎていく。",
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
              "questionText": "ずる休みをするなんて、______ 。",
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
              "questionText": "そのベンチはペンキ ______ だから、座らないで。",
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
              "questionText": "教育について考える。",
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
              "questionText": "ねんまつは忙しい。",
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
              "questionText": "パソコンが壊れた。 ______ のは時間もお金もかかるらしい。",
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
              "questionText": "結婚式に ______ けれど、何を着て行ったらよいかわからない。",
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
              "questionText": "ひまなときは音楽を聞いたり ______ 。",
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
              "questionText": "A「もう会えないかも。」 B「え、______ 意味ですか。」",
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
              "questionText": "言葉の意味を調べる。",
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
              "questionText": "かなしい小説を読んだ。",
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
              "questionText": "セーターを家で洗ったら、______ 。",
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
              "questionText": "田中さんは、だまって人の物を使うような ______ 人ではない。",
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
              "questionText": "先生に、毎日30分は ______ と言われています。",
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
              "questionText": "地下鉄の入り口はあの交差点にありますよ。",
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
              "questionText": "若いときは、いくらお酒を飲んでも ______ だったが、最近はすぐに酔ってしまう。",
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
              "questionText": "病気に ______ 健康の大切さを知りました。",
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
              "questionText": "ご不在でしたので、資料は中村様におおずけしました。",
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
              "questionText": "A「奥さん、女優さんみたいにきれいですね。」 B「いやあ、______ です。妻ももう年ですよ。」",
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
              "questionText": "もっとうまく英語が ______ なあ。",
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
              "questionText": "申込書は例を参考に記入してください。",
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
              "questionText": "明日からしばらく留守にします。荷物が来たら ______ おいてください。",
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
              "questionText": "A「それ、高かったでしょう。」 B「 ______ でもありませんよ。」",
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
              "questionText": "あの団体は国際的なかつどうをしている。",
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
              "questionText": "私は、殺人犯がまだこの近くにいるような ______ 。",
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
              "questionText": "田中さんは仕事が終わっても、なかなか ______ 。",
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
              "questionText": "観光で海外へ行くので、準備をしているところです。",
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
              "questionText": "その俳優は雑誌の ______ に応じた後、テレビ局に向かった。",
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
              "questionText": "病気に ______ 、食事に気をつけましょう。",
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
              "questionText": "この求人広告は仕事の内容がよくわからない。",
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
              "questionText": "今日の授業で習ったことをノートに ________ みた。",
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
              "questionText": "危なかった。もう少しで事故になる ________ 。",
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
              "questionText": "虫歯をなおす方法について医師から説明してもらった。",
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
              "questionText": "A「電車、混んでいた？」\nB「ううん、________ だったよ。」",
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
              "questionText": "A「映画、おもしろかったよ。」\nB「へえー。私も一緒に ________ 。」",
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
              "questionText": "二十歳未満の方への販売をお断りしております。",
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
              "questionText": "映画は、________ 映画館で見ることもありますが、たいていは DVD を借りて家で見ます。",
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
              "questionText": "電話くれたらすぐ手伝いに ________ 、どうして言わなかったの？",
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
              "questionText": "体重がふえたので、食べる量を減らしています。",
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
              "questionText": "急に ________ と車にひかれるから、気をつけて。",
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
              "questionText": "田中さんの妹さんは、美人 ________ 、かわいい女性です。",
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
              "questionText": "何か問題が起こったら、必ず連絡して相談してください。",
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
              "questionText": "桜の花が ________ 後の道は、まるでピンクのじゅうたんみたいだ。",
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
              "questionText": "私は留学生 ________ 日本に来ましたが、日本で就職をして、結婚もしました。",
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
              "questionText": "地震情報です。今日午前 7 時 13 分に地震がありました。",
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
              "questionText": "洗濯物は、乾いたら ________ たたんで、しまいましょう。",
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
              "questionText": "もし休みが ________ 、旅行には行かずに家でのんびりしたいです。",
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
              "questionText": "この植物は葉のかたちがかわいいので、インテリアとして人気がある。",
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
              "questionText": "おみやげを買いすぎて、スーツケースに全部 ________ ことができない。",
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
              "questionText": "学校を辞めました。 ________ 、父が亡くなって働かなければならないからです。",
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
              "questionText": "係員に整理券をもらえば、並んで待たなくてもいいそうです。",
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
              "questionText": "今の仕事は、内容は気に入っているが、給料については ________ だ。",
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
              "questionText": "________ 、この手紙を出してきてくれませんか。",
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
              "questionText": "投手はよく投げたが、最後にホームランを打たれてまけてしまった。",
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
              "questionText": "上司の私に向かって、そんな失礼なことを言うのは ________ だ。",
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
              "questionText": "今朝、牛乳を ________ 気持ちが悪くなって吐いた。",
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
              "questionText": "私は経済に関する記事をよく読みます。",
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
              "questionText": "田中さんに結婚を申し込まれたけれど、はっきり ________ つもりです。",
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
              "questionText": "A「Bさんは泳げますか。」 B「 ________ が、ぜんぜん速くないです。」",
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
              "questionText": "A「この毛糸のセーター、いい香りがするね。」\nB「うん、これで洗ったの。」",
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
              "questionText": "隣の家のテレビがうるさいので、 ________ を言いに行った。",
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
              "questionText": "その学生は、漢字 ________ 、ひらがなもカタカナも書けません。",
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
              "questionText": "畑にたねをまく。",
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
              "questionText": "田舎の母に電話したが、 ________ 。心配だ。",
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
              "questionText": "一年生は全員、この授業を受ける ________ 。",
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
              "questionText": "非常階段はあそこです。",
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
              "questionText": "停電なのか、電気が消えて ________ 何も見えない。",
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
              "questionText": "気に入った靴があったけど、買えなかったよ。 ________ 。",
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
              "questionText": "勝ったチームだけでなく、どのチームもよくたたかった。",
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
              "questionText": "夜中に起きて水を飲むのが ________ しまった。",
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
              "questionText": "今日のコンサート、何時から ________ ？",
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
              "questionText": "この会社は家具や食器を製造している。",
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
              "questionText": "今日は暑かった。早くシャワーを浴びて ________ したい。",
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
              "questionText": "私は 1995 年 a ________ 2000 年 b ________ 、ニューヨークに住んでいました。",
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
              "questionText": "国際会議で決まったことを報告する。",
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
              "questionText": "早く仕事を ________ 、飲みに行こう。",
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
              "questionText": "________ 、私は彼と結婚します。",
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
              "questionText": "トイレを使ったら、ここを押して水をながしてください。",
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
              "questionText": "もう、5 時だ。夕飯の ________ をしなくちゃ。",
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
              "questionText": "その学生は、講義を最後まで聞かない ________ 教室を出て行った。",
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
              "questionText": "科学技術の発達とともに、解決すべき問題も生じている。",
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
              "questionText": "勉強しろ、勉強しろって、あんまり ________ 言われると、やる気がなくなるよ。",
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
              "questionText": "そんなに夜遅く、子どもを ________ 。",
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
              "questionText": "すみません、しおを取ってください。",
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
              "questionText": "A「今、お茶をお持ちします。」\nB「どうぞ ________ 。」",
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
              "questionText": "明日は一年に一回の試験だから、 ________ 。",
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
              "questionText": "地球温暖化を防ぐ方法を話し合った。",
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
              "questionText": "さあ、あとはねぎを細かく ________ 、のせるだけです。",
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
              "questionText": "英語は ________ ですが、発音も悪いし下手なんです。",
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
              "questionText": "たいていの冷蔵庫には冷凍庫が付いている。",
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
              "questionText": "そんなぜいたくなものは、自分で ________ ようになってから買いなさい。",
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
              "questionText": "先生の ________ 、日本語の勉強が楽しくなりました。",
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
              "questionText": "このラベルには値段やその他、しょうひんに関する情報が書いてあります。",
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
              "questionText": "A「田中さん、格好いいから女の子がたくさん寄ってくるでしょう。」\nB「とんでもない。まったく ________ んですよ。」",
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
              "questionText": "ぼくが東大を受けても落ちる ________ 。",
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
              "questionText": "修理が完了したら、営業を再開します。",
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
              "questionText": "A「大きい犬なのに、下を見て ________ いるよ。」\nB「人間が怖いんじゃない？」",
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
              "questionText": "熱が高いので病院に行った ________ 、インフルエンザだと言われた。",
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
              "questionText": "笑っているようになく鳥がいる。",
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
              "questionText": "そんなに目を ________ だめよ。アレルギーの薬、ちゃんと飲んでる？",
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
              "questionText": "今日の新聞 ________ 、今年の夏はいつもより暑いそうです。",
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
              "questionText": "その 2 倍くらいの厚さに切って焼いてください。",
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
              "questionText": "今日は、先輩におごってもらったし、くじ引きで 2 等が当たったし、 ________ なあ。",
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
              "questionText": "このレストラン、有名な店 ________ 、あんまりおいしくないですね。",
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
              "questionText": "誕生日に人形をもらいました。",
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
              "questionText": "土産にこうすいを買ってきた。",
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
              "questionText": "果物はビタミン C を多く ________ 。",
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
              "questionText": "そんな仕事をだれも引き受けないのは、 ________ と思いますよ。",
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
              "questionText": "リンさんは、クラスで一番よくできる。だから、試験に落ちる ________ 。",
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
              "questionText": "中級の問題 ________ 、そんなに難しくありませんよ。",
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
              "questionText": "店員には元気な人を求めます。",
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
              "questionText": "せんそうがなくなってほしい。",
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
              "questionText": "この辺りは、雪が降っても ________ ことはほとんどありません。",
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
              "questionText": "もう少し、塩か何かを入れたらどう？ ちょっと ________ しすぎているように思うよ。",
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
              "questionText": "すごく楽しかったよ。あなたも一緒に ________ 。",
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
              "questionText": "________ 、子供のことを心配するのは当然です。",
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
              "questionText": "断水のお知らせです。",
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
              "questionText": "みらい社会を予想する。",
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
              "questionText": "今日買えば 3 割引だったのに、昨日買って ________ よ。",
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
              "questionText": "みかんもむいてほしいって、ずいぶん ________ なご主人ね。",
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
              "questionText": "駅に着いた ________ 忘れ物に気がついて、取りにもどった。",
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
              "questionText": "もし、私の言うことが本当だった ________ 、あなたはどうしますか。",
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
              "questionText": "植木に水をやる。",
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
              "questionText": "宿題がすんだら、テレビを見る。",
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
              "questionText": "まだ全員が ________ から、もう少し待ちましょう。",
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
              "questionText": "A「お茶、まだ？」\nB「まだお湯が ________ いないから、ちょっと待って。」",
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
              "questionText": "A「田中さん、40 歳だって。」\nB「 ________ 若く見えるね。」",
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
              "questionText": "母はデパートに行く ________ 、ケーキを買ってくる。",
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
              "questionText": "必要なものは全部そろえた。",
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
              "questionText": "何しゅるいありますか。",
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
              "questionText": "________ ので、寄ってみました。",
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
              "questionText": "A「どう？まだ頭が痛い？」\nB「さっきより ________ けど、まだ少しね。」",
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
              "questionText": "A「来年試験を受けます。」\nB「 ________ 、今年は受けないということですね。」",
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
              "questionText": "この国の人々に ________ 一番の問題は、水が不足しているということだ。",
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
              "questionText": "資料をコピーする。",
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
              "questionText": "となりの席にうつる。",
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
              "questionText": "そんなにしょんぼりしてどうしたの？彼女に ________ の？",
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
              "questionText": "A「知っていたけれど、田中さんには教えなかった。」\nB「 ________ ねえ。」",
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
              "questionText": "みなさんの応援の ________ 優勝できました。",
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
              "questionText": "雲が広がり、風が吹いてきた。",
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
              "questionText": "ダイエットが成功したのか、彼女はとても ______ になったね。",
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
              "questionText": "先生 ______ あんな言い方をしたら失礼だよ。あやまったほうがいいよ。",
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
              "questionText": "80円の切手を10枚ください。",
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
              "questionText": "最近、お年寄りに席を ______ 若者が多いと思う。",
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
              "questionText": "明日、休んでいいですよ。 ______ 、あさっては必ず来てください。",
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
              "questionText": "混んでいる通勤電車で、足を組んだり通路に荷物を置いたりすると、じゃまになる。",
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
              "questionText": "東京での生活は、家賃も高いし、 ______ です。",
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
              "questionText": "こんなにたくさんの料理、いくらぼくでも食べ ______ よ。",
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
              "questionText": "あの件についての感想をお聞かせください。",
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
              "questionText": "A「車、混んでいるね。」 B「うん、全然進まないね。 ______ するよ。」",
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
              "questionText": "日本では、北へ行けば行く ______ 寒くなります。",
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
              "questionText": "うちでは娘も息子も一日に2回シャワーを浴びる。",
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
              "questionText": "ちょっと、この椅子を ______ くれる？ 掃除機かけるから。",
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
              "questionText": "このパソコンは修理しても直らないのだから、捨てるより ______ 。",
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
              "questionText": "資料を配りますから、参加者の人数を数えてください。",
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
              "questionText": "にきびは、無理やり ______ とあとが残るから、さわらないように。",
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
              "questionText": "料理の本に ______ 作ったのに、おいしくなかった。",
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
              "questionText": "このくらいの計算なら、 ______ 慣れているので、まかせてください。",
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
              "questionText": "このごろすごく肩がこる。 ______ がたまっているせいかもしれない。",
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
              "questionText": "ニュースによると、中国で大地震があった ______ 。",
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
              "questionText": "高い場所の掃除は危険ですから、注意してください。",
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
              "questionText": "海外旅行に行くから、だれかに猫を ______ もらわないといけない。",
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
              "questionText": "さっき雨が ______ 、もうやんでいます。",
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
              "questionText": "紹介します。つまと息子です。",
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
              "questionText": "よくわかりません。もう少し ______ 説明してくれませんか。",
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
              "questionText": "A「宝くじ ______ かなあ。」 B「お金のむだだよ。」",
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
              "questionText": "授業の予定が変わった。",
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
              "questionText": "スキーで ______ 足の骨を折ってしまった。",
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
              "questionText": "国へ帰っても、私達のことを ______ ほしい。",
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
              "questionText": "彼女と結婚の約束をした。",
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
              "questionText": "ぼくは ______ で、姉が一人、兄が二人います。",
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
              "questionText": "風邪がうつらない ______ 、マスクをします。",
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
              "questionText": "船よりひこうきのほうが速い。",
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
              "questionText": "この野菜は ______ 食べられません。ゆでるか焼くかしてください。",
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
              "questionText": "忙しくて寝る時間 ______ ないのに、遊びに行けるわけがない。",
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
              "questionText": "大学で美術を勉強しています。",
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
              "questionText": "A「スニーカーのひもがほどけているよ。」 B「ほんとだ。 ______ から待って。」",
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
              "questionText": "A「ちょっとお茶でも飲んで休もうか。」 B「お茶なんか要らない。 ______ なんかいられないよ。」",
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
              "questionText": "橋をわたって、二つ目の角を右へ曲がると郵便局があります。",
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
              "questionText": "車の事故にあったが、 ______ よかった。",
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
              "questionText": "考えてもどうにもならない。忘れる ______ 。",
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
              "questionText": "残念ですが、パーティーに出席できません。",
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
              "questionText": "______ が、どうぞお入りください。",
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
              "questionText": "A「浅草 ______ 、何を思い浮かべますか。」 B「雷門、神輿、そしてスカイツリーかな。」",
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
              "questionText": "自動販売機を使いたいので、1万円札を細かくしてくれませんか。",
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
              "questionText": "この店の一日の ______ は、約10万円です。",
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
              "questionText": "隅田川 ______ 花火大会が行われるため、交通機関は混雑するでしょう。",
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
              "questionText": "「本当に申しわけないが、今月は給料がはらえない。」",
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
              "questionText": "毎日体操をしないといけないのに、このごろ ______ 一週間もしないこともある。",
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
              "questionText": "すみません、電車が遅れた ______ 、遅くなってしまいました。",
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
              "questionText": "この辺は自然がゆたかで、星もよく見えます。",
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
              "questionText": "セーターはハンガーに ______ 、ネットの上で広げて乾かしてください。",
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
              "questionText": "ここは桜の花がとても ______ ことから、桜が丘と呼ばれるようになった。",
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
              "questionText": "農家の人から、卵やはたけでとれた野菜をもらった。",
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
              "questionText": "彼は性格がいいだけでなく、礼儀 ______ からみんなに好かれている。",
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
              "questionText": "忘れ物をしないように、私はいつも前の日に準備しておく ______ 。",
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
              "questionText": "この学校の生徒たちは政治について深い関心を持っている。",
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
              "questionText": "ああ、大変！お風呂が ______ いるよ。",
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
              "questionText": "A「今度、プールに行かない？」 B「ごめん、ぼく、______ 泳げないんだよ。」",
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
              "questionText": "日本語能力試験の N3 というのは、日常の会話や読み書きが可能なレベルです。",
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
              "questionText": "雨にぬれないように、自転車にカバーを ______ 。",
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
              "questionText": "A「もう食べないの？」 B「 ______ 、おなかがいっぱいなんだもん。」",
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
              "questionText": "しつれいですが、年齢や職業も書いていただけませんか。（失礼）",
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
              "questionText": "子供は親の ______ 育ちます。",
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
              "questionText": "今晩、家で食べる？ ______ レストランへ行く？",
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
              "questionText": "この電車は快速です。次の駅で各駅停車に乗り換えましょう。",
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
              "questionText": "A「パトカーが止まっていますが、あの店で何かあったんですか。」 B「客が店で ______ らしいですよ。」",
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
              "questionText": "田中さんは、______ 旅館のような大きい家に住んでいます。",
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
              "questionText": "改札口の近くに精算機があって、IC カードにお金の追加ができます。",
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
              "questionText": "______ チーズに野菜をつけて食べてください。",
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
              "questionText": "雨がひどくなってきた。 ______ 、雷も鳴り始めている。",
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
              "questionText": "あれは消防署で、その向こうが警察署です。",
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
              "questionText": "A「またこわしたの？」 B「ごめんなさい。でも、______ じゃないよ。」",
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
              "questionText": "係員の指示通りに並んで待った。 ______ 、チケット販売は突然中止された。",
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
              "questionText": "いろいろなサインがありますね。「禁煙」「駐車禁止」「両替」…。",
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
              "questionText": "3年ほどタイで生活をしましたが、なかなか ______ 経験でした。",
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
              "questionText": "りんごをください。それと、みかんも。 ______ 、バナナも。",
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
              "questionText": "海岸のゴミ拾いを一緒にしませんか。",
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
              "questionText": "彼のアドバイスのおかげで、悩みが ______ 解決した。",
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
              "questionText": "美人が必ずしも幸せになれる ______ 。",
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
              "questionText": "カレーのルーには甘いのと辛いのがあります。うちでは両方を混ぜて使います。",
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
              "questionText": "彼は上司にどんなにひどいことを言われても、______ がまんをした。",
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
              "questionText": "新聞やテレビの言うことなど、______ 信じられない。",
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
              "questionText": "国がこいしい。",
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
              "questionText": "日本語の学習者が増えている。これから日本語能力試験の受験者も ______ 増えるだろう。",
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
              "questionText": "たとえ家を ______ 、健康なら生きていける。",
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
              "questionText": "家族を空港に迎えに行きますので、早退させていただけませんか。",
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
              "questionText": "______ 言うと、私はあんまり英語ができません。",
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
              "questionText": "______ ほめない人にほめられるとうれしい。",
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
              "questionText": "本を3さつ読みました。",
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
              "questionText": "今夜、おもしろいテレビばんぐみがある。",
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
              "questionText": "1万円札、______ くれませんか。",
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
              "questionText": "A「あれ、いつものゲーム、していないの？」 B「やりすぎて、もう ______ よ。」",
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
              "questionText": "じゅうぶん間に合うから、あわてる ______ 。",
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
              "questionText": "漢字は勉強すればする ______ おもしろい。",
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
              "questionText": "泳ぐ前と後にシャワーをあびる。",
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
              "questionText": "そうじと洗濯が終わったら買い物に行く。",
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
              "questionText": "______ いない犬が多くて困る。",
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
              "questionText": "おとなしくしていて、______ 子供だね。",
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
              "questionText": "昨日、騒いで声を出しすぎた ______ 、のどが痛い。",
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
              "questionText": "ここまできたら ______ から、とにかくやってみよう。",
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
              "questionText": "危険ですから、入ってはいけません。",
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
              "questionText": "歯医者を予約する。",
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
              "questionText": "長い間使っていた掃除機だったが、______ 壊れてしまった。",
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
              "questionText": "A「今日、遅刻したんじゃない？」 B「 ______ だったけれど、間に合ったよ。」",
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
              "questionText": "田中さんから電話があったのは、私が夕飯を ______ ときだった。",
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
              "questionText": "この小説は短いので、一日で ______ でしょう。",
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
              "questionText": "むすこを育てる。",
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
              "questionText": "最後に塩を加えます。",
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
              "questionText": "いくらかせいでも、お金は ______ 。",
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
              "questionText": "テレビが見えないから、そこ、 ______ よ。",
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
              "questionText": "どこへ行っていたの？どんなにさがした ______ 。",
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
              "questionText": "さっきは電話に出られなくてごめんなさい。ちょっと手が離せなかった ______ 。",
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
              "questionText": "数を数えます。",
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
              "questionText": "国によってしゅうかんが違う。",
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
              "questionText": "外にまでお客さんが ______ けれど、特別なセールなのかな。",
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
              "questionText": "間違いは ______ 認めたほうがいいよ。",
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
              "questionText": "あの人から返信がないなんて、______ 、メールを読んでいないのかもしれない。",
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
              "questionText": "彼は動物にくわしくて、______ 学者のようだ。",
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
              "questionText": "彼は正直な人だ。",
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
              "questionText": "毛布を洗う。",
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
              "questionText": "______ 車で迎えに来てくださりありがとうございます。",
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
              "questionText": "さっきから、あの人に ______ 見られていて嫌だ。",
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
              "questionText": "しめきりに間に合う ______ 必死でレポートを書き上げた。",
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
      "id": "shinkanzen-ch-1-short",
      "title": "Short Passages",
      "type": "short-passage",
      "description": "Short reading passages with 1 question each.",
      "passages": [
        {
          "title": "第1部 問題1",
          "passageText": "私たちは、いろいろな場面に合わせて服を着替える。たとえばふだんはTシャツにジーンズの人も、パーティーのときはスーツやきれいな服を着るのではないだろうか。言葉も同じで、それぞれの場面などによって使いわける。\n\nたとえば、日本語は、話すときと書くときで文体が違う。また、書き言葉の中には「です・ます体」「だ体」「である体」などの文体がある。初級では、話し言葉の日本語を中心に勉強してきた。中級では書き言葉を学ぶことも増えてくる。「だ体」「である体」という文体も知っておけば、文章が読みやすくなるだろう。",
          "questions": [
            {
              "questionText": "この文章の内容と合っているものはどれか。",
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
              "explanation": "Question 1. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題2",
          "passageText": "リサイクルセンター見学実施報告書\n\n6月20日(土)教師2名が留学生12名を連れ、谷町にあるリサイクルセンターの見学を行った。\n\n谷町駅前に9時集合。リサイクルセンターまで徒歩で行く。9時10分到着。リサイクルセンター3階の会議室で、センター長にあいさつする。センターの職員からリサイクルについての説明があり、その後、質疑応答。ごみの分別クイズなども行う。\n\n職員の案内で施設見学。ペットボトルの再利用の説明を受ける。センターの祭りの日であったため、大型家具の引き取り(注1)や展示・販売、壊れたおもちゃの修理、フリーマーケットなどが行われていた。20分の自由時間で留学生は買い物を楽しむことができた。\n\n11時に見学終了。センターの出口で解散。\n\n(注1) 引き取り：いらなくなった物を受け取ること",
          "questions": [
            {
              "questionText": "この文章の内容と合っているものはどれか。",
              "options": [
                "センターに着いて、まず施設の見学を行った。",
                "センターでは家具を直してくれる。",
                "留学生が買い物をする時間があった。",
                "留学生はセンターの前に9時に集まった。"
              ],
              "correctOption": {
                "index": 0,
                "text": "センターに着いて、まず施設の見学を行った。"
              },
              "explanation": "Question 2. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題3",
          "passageText": "日本人はまじめでよく働くと言われる。そして日本の技術力は世界的にも高く評価されている。まじめで高い技術力を持つようになったのはなぜだろう。それは日本の資源の少なさに関係がある。\n\n日本は石油や鉄鉱石など製品の原材料となる資源が少ない。そのために原材料を輸出して利益を得ることができないのだ。その代わりに海外からそれらを輸入し、自動車や電気製品などの製品を作り、それを輸出することによって利益を得ている。つまり、まじめに働き、技術力を高め、よい製品を作ることが、日本が利益を得るためには必要なのである。\n\n資源が少ないことは、国にとってはマイナスであるように見えるが、必ずしもそうとは言えない。日本においては、少ない資源のおかげでまじめな国民性が生まれ、高い技術力が育ったとも言えるからだ。",
          "questions": [
            {
              "questionText": "この文章の内容と合っているものはどれか。",
              "options": [
                "日本はよい製品を輸入している。",
                "資源が少ないから日本人は不幸だ。",
                "資源が少ないから日本人はまじめになった。",
                "日本は資源を輸出している。"
              ],
              "correctOption": {
                "index": 0,
                "text": "日本はよい製品を輸入している。"
              },
              "explanation": "Question 3. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題4",
          "passageText": "今朝は最悪だった。かけておいたはずの目覚まし時計が鳴らず、1時間も寝坊をしてしまったのだ。いつもは駅までウォーキングのつもりで30分歩いているのだが、もうそんな時間はない。バスを使うことにして、バス停に並んだ。しかし、今度はバスがなかなか来ない。時刻表には5分間隔と書いてあるのに、なんと20分も待たされてしまった。このままでは2時間近く遅刻してしまいそうだ。この前上司(注1)から「余裕を持って来るように。」と言われたばかりなのに、ちっとも進歩しない。ああ、自分が怒られている様子が目に浮かぶ(注2)。\n\n駅で大事なことに気がついた。今日は日曜日だったのだ。目覚まし時計が鳴らなかったのも、バスが平日の時刻表通りに来なかったのも、今日が日曜日だからだったのだ。よかった。怒られないで済む。しかし、ずいぶん無駄な心配をしてしまった。私は得をしたような、損をしたような複雑な気持ちで家までの道を30分歩いて帰った。\n\n[Pasted Text: 12 lines]\n\n(注1) 上司: 会社で自分よりも地位が上の人\n\n(注2) 目に浮かぶ: その様子が簡単に想像できる",
          "questions": [
            {
              "questionText": "「損をしたような」とあるが、なぜか。",
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
          ]
        },
        {
          "title": "第1部 問題5",
          "passageText": "犬、猫、小鳥など、ペットにはさまざまな種類があるが、今では家族の一員として扱われることが多い。たとえば、以前、犬は家の外で飼われていたが、今では家の中で飼われることが多くなった。また、寒いときは服を着せたり、おもちゃを買ってやったり、病気になれば病院に連れて行ったりと、子どものように大切にされるようになっている。マンションでもペットが飼えるところが人気だ。\n\nこれが人間の子どもなら、大きくなるにつれてだんだん親に反抗することもあり、親が思うようにならないこともある。しかし、ペットはいつまでも小さな子どものような純粋な心のままで、飼う人をしたって(注1)くる。それがかわいくてしかたがない存在になっているのではないだろうか。\n\n(注1) したう：相手のことが好きで、離れずについてくる",
          "questions": [
            {
              "questionText": "この文章の内容と合っているものはどれか。",
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
          ]
        },
        {
          "title": "第1部 問題6",
          "passageText": "電車やバスに乗っていると、お年寄りや体の不自由な人に席を譲らない若者を見かけます。しかし、席を譲らない若者に聞いてみると、以前は譲ろうとしたことがあるが、断られてしまって、その後はもう譲ろうという気持ちをなくしてしまったという人も多いのです。\n\n若い人にとって、知らない人に声をかけるのは少し緊張します。人に席を譲るのは少し勇気がいります。「どうぞ」と声をかけたときに、感謝のことばと笑顔が返ってくれば、次もまた譲ろうという気持ちになります。だから、もし席を譲られたら、「その必要はない」と思っても、素直に座り、笑って「ありがとう」と答えてあげてほしいと思います。",
          "questions": [
            {
              "questionText": "「答えてあげてほしい」と思っているのはだれか。",
              "options": [
                "お年寄りや体の不自由な人",
                "席を譲らない若者",
                "若い人",
                "この文を書いた人"
              ],
              "correctOption": {
                "index": 0,
                "text": "お年寄りや体の不自由な人"
              },
              "explanation": "Question 6. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題7",
          "passageText": "漢字は5万字ほどもあると言われているが、これを全部使うのは大変だ。そこで、日本では1981年にふだん使う漢字を1945字に決め、これを常用漢字と呼んでいた。そして、なるべくこの範囲で漢字を使うようにした。この常用漢字の数が2010年に1945字から2136字に増えた。どうしてだろうか。 それは、パソコンや携帯電話などの情報機器の発達により、手で書くのが難しかった漢字が簡単に表記(注1)できるようになり、漢字の使用が増えたためである。たとえば、気分が沈んだ状態である「ゆううつ」ということばをメールで使う場合、「憂鬱」と漢字で表記する人が増えている。この「憂鬱」は新しく常用漢字になった漢字である。 しかし、日本に外国人が増加して、漢字が苦手な人もいるため、常用漢字を減らすべきだという意見もある。どのような漢字表記がよいのか、いつどこでどんな表記を使うのがいいか、さまざまな点から考えていかなければならないだろう。\n\n(注1) 表記：文字などを使って、ことばを書き表すこと",
          "questions": [
            {
              "questionText": "常用漢字の数が増えた理由は何か。",
              "options": [
                "日本で生活したり、働いたりする外国人が増えているから。",
                "漢字で書いたほうがわかりやすいから。",
                "メールを使う人が増えたから。",
                "情報機器が発達し、漢字の使用が増えたから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "日本で生活したり、働いたりする外国人が増えているから。"
              },
              "explanation": "Question 7. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題8",
          "passageText": "あなたの部屋はきちんと片づいていますか。ものが増えてくると、片づけに悩まされる人が多いと思いますが、片づけの専門家の小松さんは、片づけは、「整理」と「整頓」であると言っています。\n\n整理はいらないものを捨てること、整頓は使いやすいように置く、配置することを意味します。\n\n整理は「出す」「分ける」「減らす」「しまう」という4つの動作に分けられます。例えば机の下の段の引き出しをきれいにしようと決めたら、そこに入っているものを全部「出す」。次に、出したものを必要か、必要ではないかに「分ける」。さらに、必要ではないものを処分し「減らす」。最後に、元にあった場所にものを「しまう」の4つです。\n\n片づけは「整理8割(注2)、整頓2割」。「整理」に徹底的に取り組めば(注3)、8割が終了していると言えます。\n\n(注1)処分する: いらなくなったものなどを捨てたり、売ったりする\n\n(注2)8割: 80%\n\n(注3)取り組む: 問題を解決するために熱心に何かをする",
          "questions": [
            {
              "questionText": "この文章を書いた人は、片づけをするのに何が一番大切だと言っているか。",
              "options": [
                "引き出しをきれいにしておくこと",
                "使ったものを元の場所にしまうこと",
                "いらないものを減らすこと",
                "ものを使いやすいように置くこと"
              ],
              "correctOption": {
                "index": 0,
                "text": "引き出しをきれいにしておくこと"
              },
              "explanation": "Question 8. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題9",
          "passageText": "「よい買い物をした」と思うのはどんなときでしょうか。安くてよいものが買えたとき、と答える人が多いかもしれません。\n\n確かに、よい品物を安く買えたとき、私たちはとてもうれしい気持ちになります。「安さ」「よさ」が買い物を満足させるとても大切な要素であることは間違いないでしょう。しかし、これ以外の理由で「よい買い物をした」と思える商品があります。寄付金つきの商品といって、その売り上げの一部がボランティア組織などへ寄付されるというものです。値段は安くはないですが、それを買うことで「困っている人の助けになる」ことができます。自分の好きなものが手に入り、同時に困っている人の助けになる。このときも「よい買い物をした」と思えるものです。\n\n(注1) 寄付: 困っている人などにお金や品物をあげること\n\n(注2) ボランティア: お金のためではなく、社会に役立つことを進んでする人",
          "questions": [
            {
              "questionText": "この文章で一番言いたいことは何か。",
              "options": [
                "安くてよいものを買ったときだけ、よい買い物をしたと思える。",
                "品物がよかったときだけ、よい買い物をしたと思える。",
                "安くなくてもだれかの役に立つと、よい買い物をしたと思える。",
                "品物が悪くてもだれかの役に立つと、よい買い物をしたと思える"
              ],
              "correctOption": {
                "index": 0,
                "text": "安くてよいものを買ったときだけ、よい買い物をしたと思える。"
              },
              "explanation": "Question 9. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題10",
          "passageText": "1か月ぐらい前の夕方、ちょっと大きな地震がありました。そのとき、私も、一緒に住んでいる母も外出をしていて、家にはいませんでした。\n\nその晩のことです。私は何だかよく眠れなくて、ベッドでラジオを小さい音で聞きながらうとうとしていました。夜中に何回か古い柱時計が鳴るのを聞いたように思いました。私はラジオの中で時計が鳴っているんだと思いました。\n\nところが、次の朝、別の部屋で寝ていた母が言いました。「きのうの晩、柱時計が鳴る音が聞こえなかった？」「まさか。うちのは何年も使っていないんだもの。鳴るはずがないよ。」亡くなった父の部屋には古い柱時計があるのですが、ずっと動かしていませんでした。でも、母も時計の音を聞いたのです。私は不思議に思いました。\n\nそこで、二人で時計のある部屋に行ってみると、時計はほんとうに動いていました。私たちはびっくりしましたが、すぐにわかりました。前の日の地震で家が揺れたとき、時計のふりこも揺れ、自然に動き出して、時計が鳴ったのです。\n\n母は、父がこの時計を大切に使っていたことを思い出し、「この時計はまだ動くんだって伝えたかったのかもしれないね」と言って笑いました。それからは、またこの時計を動かして使っています。父も喜んでいるかもしれません。\n\n--------------------------------------------------",
          "questions": [
            {
              "questionText": "「私は不思議に思いました。」とあるが、なぜか。",
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
          ]
        },
        {
          "title": "第1部 問題11",
          "passageText": "コーヒーを多く飲む人ほど、肌のしみ(注1)ができにくいという研究結果がある。なぜコーヒーにそのような効果があるのだろうか。\n\nその仕組みは、こうである。\n\n太陽の光にあたると、人間の体内で「活性酸素」と呼ばれる物質ができる。これは、しみの原因となる物質「メラニン」を増やしてしまう。しかし、コーヒーにたくさん含まれる「ポリフェノール」という物質は活性酸素の働きを小さくしてくれるという。それで、コーヒーを飲む人はしみができにくいというわけだ。\n\nポリフェノールをたくさん含むコーヒーは、美容にいい飲み物だと言えそうだ。\n\n==================================================\n\n(注1)しみ：顔や手などにできる茶色い点",
          "questions": [
            {
              "questionText": "この文章によると、活性酸素とはどんな物質か。",
              "options": [
                "しみをできにくくする物質",
                "ポリフェノールを増やす物質",
                "メラニンを増やす物質",
                "コーヒーの中に多く含まれる物質"
              ],
              "correctOption": {
                "index": 0,
                "text": "しみをできにくくする物質"
              },
              "explanation": "Question 11. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題12",
          "passageText": "A: 冷房という技術は非常に素晴らしく、私たちは暑い夏に冷房のおかげでいろいろ助けられている。例えば、勉強でも仕事でも、暑い中、汗をかきながらやるよりも、涼しいところでやったほうがずっと快適だ。\n\nB: しかし、よいことばかりではない。実は、人の体温を調節する神経は5℃以上の急な変化を繰り返すことに弱いそうだ。夏の室外と室内の温度差は10℃以上になることもよくあり、そこを出たり入ったりしているうちに、この体温を調節する神経がうまく働かなくなることがあるのだ。その結果、疲れやすい、頭が痛いなど、さまざまな症状があらわれる。\n\nC: そうなると、さらに悪いことが起きる。どこへ行っても冷房があるために、どんどん具合が悪くなったり、夏が終わるまで治らないということもあるのだ。それでは仕事や勉強どころか、遊びも楽しめないだろう。\n\nD: このように、冷房は暑い夏を快適に過ごすための優れた技術ではあるが、思わぬ体調不良の原因にもなりうる。冷房の技術はありがたいものだが、大事なことは、その技術を上手に使うということだろう。\n\n==================================================",
          "questions": [
            {
              "questionText": "この文章で一番言いたいことは何か。",
              "options": [
                "冷房は素晴らしい技術なのでどんどん使用するべきだ。",
                "室外と室内の温度差が10℃以上あると、快適でほっとする。",
                "冷房で体をこわしてしまうこともあるので、うまく使う必要がある。",
                "冷房を使うと体温を調節することができなくなるので、使わないほうがいい。"
              ],
              "correctOption": {
                "index": 0,
                "text": "冷房は素晴らしい技術なのでどんどん使用するべきだ。"
              },
              "explanation": "Question 12. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第1部 問題13",
          "passageText": "うちのそばに小さいレストランができたので、さっそく行ってみた。外には小さく店の名前が書いてあるだけ。派手なかざりは一つもなく、落ち着いた雰囲気だ。入ってみると3つほどテーブルがあり、汚れ一つない真っ白なテーブルクロスがかけられていた。私は窓のそばの席に座り、メニューを開いた。どれもとてもおいしそうで、期待がふくらんだ。\n\nその時、10人ほどの集団が入ってきて、レストランは満席になった。彼らはこの店によく来るらしく、メニューも見ないでどんどん注文をし始めた。私は自分の注文が後になってしまうと少し心配になりながら、一番人気があるというAセットを注文した。\n\n私の方が先に店に入ったのに、やはり私の料理は彼らの料理の後に運ばれてきた。彼らに先に注文されたからだ。その上、料理を待っている間ずっと、彼らがおいしそうに料理を食べながら、大声で話をするのを聞かされた。料理が来たときにはもう疲れてしまい、味はどうでもよくなってしまった。",
          "questions": [
            {
              "questionText": "この文章を書いた人の気持ちを説明しているのはどれか。",
              "options": [
                "レストランはきれいだし、料理がおいしかったので満足している。",
                "集団のせいでなかなか料理を食べられなかったので、楽しめなかった。",
                "レストランはかざりがなくてよくなかったが、集団の話は楽しめた。",
                "集団と話をしながら料理を食べたので、料理の味はどうでもよかった。"
              ],
              "correctOption": {
                "index": 0,
                "text": "レストランはきれいだし、料理がおいしかったので満足している。"
              },
              "explanation": "Question 13. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題27 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "ある大学の大学生を対象に、アルバイトについてアンケート調査した。その結果、この大学の場合、全体の約8割がアルバイトしていることがわかった。男女別にみると、男子学生のうちの79.4%がアルバイトをしているのに対して、女子学生は83.4%であり、女子学生の割合のほうが、男子学生を上回っている(注1)。\n\n下のグラフはアルバイトの目的について調査した結果を表している。アルバイトの目的は、「生活費を稼ぐため」(32.8%)と「学生生活を楽しむため」(32.4%)がほぼ(注2)同数で、次に「社会経験のため」(24.2%)となる。「学生生活を楽しむため」とは、旅行や遊び、クラブ活動など、生活を楽しむお金を稼ぐためという意味だ。「勉学費」も含め、「お金を稼ぐため」が6割以上を占めてはいるが、アルバイトの目的がお金を稼ぐためだけでないことも注目すべきことだ。\n\n[アルバイトの目的]\n\n目的: 割合 (%)\n\n生活費を稼ぐため: 32.8%\n\n学生生活を楽しむため: 32.4%\n\n社会経験のため: 24.2%\n\n無回答: 5.1%\n\nその他: 4.5%\n\n勉学費を稼ぐため: 1.0%\n\n問 この調査について述べているもので最も正しいものはどれか。\n\n1 アルバイトをしている男子学生の割合はアルバイトをしている女子学生の割合より多い。\n\n2 学生生活を楽しむためにアルバイトをしている学生は全体の約3分の2を占める。\n\n3 アルバイトの目的は、お金を稼ぐためだけではない。\n\n4 ほとんどの学生がお金を稼ぐためにアルバイトをしている。\n\n30日本人は集団主義だとよく言われる。つまり、個人よりもみんなで行動することや、みんなのために行動することを大切にするというのだ。\n\nそれにはさまざまな原因があるが、その一つに日本人が昔から「稲作(注1)」を行ってきたことがあると言われている。稲作では田植えや収穫など、みんなで一度に行う作業が多い。また、より多くの稲を上手に育てるには、稲作で使う水を個人の田んぼだけではなく、地域全体を考えて管理する必要がある。\n\nこのような稲作を何千年も続ける中で、日本社会では「みんな」がとても重要な基準になっていったのだろう。\n\n4. Question and Options\n\n問：どうして日本人は集団主義になったと書かれているか。\n\n(Question: Why is it written that Japanese people became collectivist?)\n\n何千年も米を食べ続けているから。\n\n(Because they have continued to eat rice for thousands of years.)\n\n昔から協力して飲み水を管理してきたから。\n\n(Because they have cooperated to manage drinking water since ancient times.)\n\n自分の田んぼで上手に稲を作ろうと競争してきたから。\n\n(Because they have competed to grow rice well in their own fields.)\n\nみんなでする作業が多い稲作を続けてきたから。\n\n(Because they have continued rice cultivation, which involves many tasks done by everyone together.)\n\n31使用方法\n\n右側のハンドルを引き出します。\n\nハンドルを矢印の方向にくり返し回すことで、発電ができます。1分間の発電で、約10分の使用が可能です。\n\nライトスイッチを押すと、ライトがつきます。\n\nライトスイッチを押してから、白いボタンを押すと、ライトを点滅させることができます。\n\n使用上の注意\n\n・長時間ご使用の場合、ライトが暗くなることがあります。\n\n暗くなりましたら、発電用ハンドルを回してください。\n\n・故障の原因となりますので、中を開けて分解しないでください。\n\n・本製品は防水性ではありませんので、ぬらさないでください。\n\n4. Questions and Options\n\n(注1) 上回る：ものごとがある数や量や程度より多くなる\n\n(注2) ほぼ：だいたい\n\n(注1) 稲作：お米を作ること\n\n(注1)点滅:ライトがついたり消えたりすること",
          "questions": [
            {
              "questionText": "本文の内容と合っているものはどれか。",
              "options": [
                "ライトがつかなくなったら、電池を取り替えればよい。",
                "ライトが暗くなったら、ハンドルを回して発電すればよい。",
                "ライトスイッチを押せば、ライトを点滅させることができる。",
                "長時間使うとライトが暗くなるので、短い時間だけ使うようにする。"
              ],
              "correctOption": {
                "index": 0,
                "text": "ライトがつかなくなったら、電池を取り替えればよい。"
              },
              "explanation": "Question 27. Answer will be updated soon."
            }
          ]
        }
      ]
    },
    {
      "id": "shinkanzen-ch-2-medium",
      "title": "Medium Passages",
      "type": "medium-passage",
      "description": "Medium-length reading passages with 2 questions each.",
      "passages": [
        {
          "title": "19",
          "passageText": "日本では幼稚園や小学校で「おかしも」という言葉を習います。「おかしも」とはどのような意味でしょうか。「お菓子も」と書いて「肉や野菜だけでなく『お菓子も』食べましょう。」という意味でしょうか。実は、これは災害(注1)や事故などが起きたときに、安全に避難するための注意を一つにした言葉です。「押さない、駆けない(注2)、しゃべらない(注3)、戻らない」という四つの言葉の初めのひらがなを並べたものです。小学校で一年に何度も行われる避難訓練では、教室を出て校庭に逃げる練習をするのですが、そのとき子どもたちが素早く避難できるように、先生は「『おかしも』ですよ。」と何度も声をかけます。一年に何度も、避難訓練のたびにこの言葉を耳にするので、日本の子どもたちで「おかしも」の意味を知らない子どもはいないほどです。本当に何かがあったときには、この訓練で「おかしも」を身につけたおかげで子どもたちはこわがったりあわてたりせずに冷静に避難できるというわけです。「おかしも」は子どもたちを安全に避難させるために考えられた工夫なのです。(注1)災害：地震・台風などの大きな被害が出る出来事(注2)駆ける：走る(注3)しゃべる：話す",
          "questions": [
            {
              "questionText": "「おかしも」とは何か。",
              "options": [
                "肉や野菜だけでなくお菓子も食べようと勧める言葉",
                "避難するときの注意を短くした言葉",
                "避難訓練のとき、教室を出て校庭に素早く避難すること",
                "避難訓練のとき、子どもたちが冷静に行動すること"
              ],
              "correctOption": {
                "index": 0,
                "text": "肉や野菜だけでなくお菓子も食べようと勧める言葉"
              },
              "explanation": "Question 19. Answer will be updated soon."
            },
            {
              "questionText": "「日本の子どもたちで「おかしも」の意味を知らない子どもはいないほどです。」とあるが、それはなぜか。",
              "options": [
                "毎日学校で先生から説明してもらうから。",
                "避難訓練をするときにはいつもその言葉を聞くから。",
                "大人たちが工夫して考えた言葉だから。",
                "お菓子に似ている言葉だから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "毎日学校で先生から説明してもらうから。"
              },
              "explanation": "Question 19. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題26 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "下は薬の入った袋である。右のページの質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n[内用薬]\n\n田中 マリア 様\n\nピンクの錠剤 1回 2(錠)・包(注2) ずつ 1日 2回\n\n(あさ ・ ひる ・ 夕方 ・ 寝る前)\n\n4日分 ・ 食前 ・ 食間 ・ 食後\n\n白のカプセル 1回 1(錠)・包 ずつ 1日 3回\n\n(あさ ・ ひる ・ 夕方 ・ 寝る前)\n\n4日分 ・ 食前 ・ 食間 ・ 食後\n\nわたなべ医院\n\n〇〇区××町1-2-3\n\n電話 03-3333-2222\n\n(注1) 内用薬：飲む薬。 参考：外用薬(皮膚につける薬)、塗り薬\n\n(注2) 包：こな薬の数え方",
          "questions": [
            {
              "questionText": "ピンクの錠剤と白のカプセルの飲み方で正しいものはどれか。",
              "options": [
                "朝食・昼食・夕食を食べた後、それぞれ1錠ずつ飲む。",
                "朝食・昼食・夕食を食べた後、それぞれ2錠ずつ飲む。",
                "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に3錠飲む。",
                "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に1錠飲む。"
              ],
              "correctOption": {
                "index": 0,
                "text": "朝食・昼食・夕食を食べた後、それぞれ1錠ずつ飲む。"
              },
              "explanation": "Question 26. Answer will be updated soon."
            },
            {
              "questionText": "マリアさんは朝食後、薬を飲んだ。次にいつどんな薬を飲めばよいか。",
              "options": [
                "錠剤とカプセルを昼食後に飲む。",
                "錠剤を昼食後に飲む。",
                "カプセルを昼食後に飲む。",
                "錠剤とカプセルを夕食後に飲む。"
              ],
              "correctOption": {
                "index": 0,
                "text": "錠剤とカプセルを昼食後に飲む。"
              },
              "explanation": "Question 26. Answer will be updated soon."
            }
          ]
        }
      ]
    },
    {
      "id": "shinkanzen-ch-3-long",
      "title": "Long Passages",
      "type": "long-passage",
      "description": "Long reading passages with 3 or more questions each.",
      "passages": [
        {
          "title": "20",
          "passageText": "日本では季節が生活のいろいろな面に影響している。外国から来た自分にとってそれはとても①おもしろい。\n\nいつも使う駅のそばに、有名な和菓子のお店がある。2月のある寒い日、ちょっと入ってみると、いろいろな形や色をした美しい生菓子(注1)が並んでいた。値段は高かったが、アルバイト代が入ったばかりだったので、一番かわいいのを一つ買って帰ることにした。私は「寒椿」というお菓子を選んだ。いつも公園で見ている赤い椿の花を表現したお菓子だ。そのままテーブルにかざっておきたいぐらい美しい上に、食べると味も素晴らしく、感激した。それ以来、「寒椿」のことが忘れられなくなった。でも、次にアルバイト代が入るまでがまんすることにした。月に一度あのかわいい姿と味が楽しめれば幸せだ。\n\nさて3月のアルバイト代が入り、私はわくわくしながらその和菓子屋に入っていった。しかし、②あの赤い花はどこにもなかった。お店の人にたずねておどろいた。「寒椿」は冬のお菓子なので、春には売らないのだそうだ。今度あの「寒椿」を楽しむには一年待たなければならない。\n\n本当にがっかりしたが、そこにピンク色の「桜」というお菓子があることに気づいた。私はこの「桜」を買って帰った。これもまたとても美しく、おいしかった。そうか、もう春なのだ。そういえば公園の桜がもうすぐ咲きそうだ。この時、③日本人の季節の楽しみ方が少しわかった気がした。\n\n4. Questions and Options\n\n(注1)生菓子：水分を多く含んだお菓子",
          "questions": [
            {
              "questionText": "①おもしろいとあるが、何がおもしろいのか。",
              "options": [
                "日本の季節は春、夏、秋、冬の四つであること",
                "駅のそばに有名な和菓子のお店があること",
                "日本の生活には季節が表されたものがたくさんあること",
                "日本には美しい形をしたお菓子がいろいろあること"
              ],
              "correctOption": {
                "index": 0,
                "text": "日本の季節は春、夏、秋、冬の四つであること"
              },
              "explanation": "Question 20. Answer will be updated soon."
            },
            {
              "questionText": "②あの赤い花とは、何を指しているか。",
              "options": [
                "公園に咲いている椿の花",
                "椿という和菓子",
                "公園でもうすぐ咲きそうな桜",
                "桜という和菓子"
              ],
              "correctOption": {
                "index": 0,
                "text": "公園に咲いている椿の花"
              },
              "explanation": "Question 20. Answer will be updated soon."
            },
            {
              "questionText": "③日本人の季節の楽しみ方とはどんなことか。",
              "options": [
                "色や美しさを大切にして美しい食べ物を作る。",
                "毎月一回和菓子を食べる。",
                "前の季節のものをなつかしいと思う。",
                "季節に合ったものを楽しむ。"
              ],
              "correctOption": {
                "index": 0,
                "text": "色や美しさを大切にして美しい食べ物を作る。"
              },
              "explanation": "Question 20. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "33",
          "passageText": "3億円が当たる宝くじ(注1)がある。それが当たったのにお金を受け取らなかった人がいる。彼は70代の一人暮らしの男性で、受け取らない理由は「どう使えばいいかわからないから。」だそうだ。\n\n今は静かに生活をしていて、それに何の不満もない。彼が宝くじを買ったのは、亡くなった妻が宝くじを楽しんでいたためで、お金が欲しいからではなかった。3億円を受け取っても、それを分けるような子どもや親せきもいないし、高級車や大きな家を買う必要もない。それよりも、もし3億円を受け取ったら、その金を目的に人が寄ってきていろいろな問題が起きるかもしれない。楽しい事より大変な事が多いと考えたのだろう。\n\n何人もの人が受け取るようにすすめたが、彼の気持ちは変わらなかった。当たらない者から見たらもったいない話だが、彼はかしこい判断をしたのかもしれない。(注1)宝くじ：番号などのついた券を買い、当たれば賞金がもらえる。\n\n[Questions & Options]\n\n子どもや親せきと分けようと思った。高級車を買おうと思った。大きな家を買おうと思った。受け取らないことにしようと思った。",
          "questions": [
            {
              "questionText": "：彼はどうして3億円の宝くじを買ったのか。",
              "options": [
                "億円を何かに使う夢を見たかったから。",
                "亡くなった妻が宝くじが好きだったから。",
                "お金が欲しいと思ったから。",
                "楽しいことがあると思ったから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "億円を何かに使う夢を見たかったから。"
              },
              "explanation": "Question 33. Answer will be updated soon."
            },
            {
              "questionText": "：3億円が当たった後で彼はどうしようと思ったか。",
              "options": [
                "選択肢 1",
                "選択肢 2",
                "選択肢 3",
                "選択肢 4"
              ],
              "correctOption": {
                "index": 0,
                "text": "選択肢 1"
              },
              "explanation": "Question 33. Answer will be updated soon."
            },
            {
              "questionText": "：「彼はかしこい判断をしたのかもしれない。」とあるが、それはなぜか。何人もの人に相談して意見を聞いたから。面倒な問題が起きる可能性がなくなったから。お金を役立つように使おうとしたから。車や家を買って周りの人にあげようと思ったから。",
              "options": [
                "人間関係のこと、勉強や仕事のことなど、いろいろなストレスが原因で病気になることは少なくない。ストレスなど全くない生活をしてみたいものだが、なかなかそうはいかない。",
                "どうせストレスから逃げられないのならば、大きなストレスよりも、がまんできるぐらいの小さなストレスのほうがまだいいと思うだろう。しかし、専門家に言わせると、このがまんできるぐらいのストレスが一番問題なのだという。なぜなら、受けたストレスをがまんできると思うと、人はそれを解決せずそのままにしてしまうからだ。そして、そうしているうちに、心や体をこわしてしまうというのだ。反対に、大きなストレスはつらいものだが、何とかそれを解決しようという力を起こさせ、人が成長するきっかけになることも多いという。",
                "ストレスが心や体をこわす原因になるかどうかは、その大小ではなく、乗り越えようとする気持ちと関係があるようだ。",
                "[Questions & Options]"
              ],
              "correctOption": {
                "index": 0,
                "text": "人間関係のこと、勉強や仕事のことなど、いろいろなストレスが原因で病気になることは少なくない。ストレスなど全くない生活をしてみたいものだが、なかなかそうはいかない。"
              },
              "explanation": "Question 33. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題34",
          "passageText": "人間関係のこと、勉強や仕事のことなど、いろいろなストレスが原因で病気になることは少なくない。ストレスなど全くない生活をしてみたいものだが、なかなかそうはいかない。",
          "questions": [
            {
              "questionText": "：専門家はストレスについてどう言っているか。",
              "options": [
                "人間関係や勉強や仕事のことなどがストレスになる。",
                "ストレスが原因で体をこわすこともある。",
                "小さなストレスが一番困る。",
                "ストレスが全くない生活をするべきだ。"
              ],
              "correctOption": {
                "index": 0,
                "text": "人間関係や勉強や仕事のことなどがストレスになる。"
              },
              "explanation": "Question 34. Answer will be updated soon."
            },
            {
              "questionText": "：そうしているうちにとあるが、これは何を指しているのか。",
              "options": [
                "大きなストレスをがまんしているうちに",
                "大きなストレスを解決しようとしているうちに",
                "小さなストレスをそのままにしているうちに",
                "ストレスが全然ない生活をしているうちに"
              ],
              "correctOption": {
                "index": 0,
                "text": "大きなストレスをがまんしているうちに"
              },
              "explanation": "Question 34. Answer will be updated soon."
            },
            {
              "questionText": "：本文の内容と合っているものはどれか。",
              "options": [
                "小さくてがまんできるストレスならば何も心配はいらない。",
                "ストレスが大きいと必ず心や体をこわしてしまう。",
                "小さなストレスでも解決しなければ心や体をこわす原因になる。",
                "大きなストレスは成長するきっかけになるから辛くない。"
              ],
              "correctOption": {
                "index": 0,
                "text": "小さくてがまんできるストレスならば何も心配はいらない。"
              },
              "explanation": "Question 34. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題35つぎの文章を読んで質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。(Reading Passage)",
          "passageText": "トキは大きくて美しい鳥である。体の大きさは75センチほどで、羽を広げると140センチにもなる。体の色は白っぽく見えるが、羽を広げると、うすい赤い色をしている。これはトキ色と呼ばれ、人々に好まれた。昔は日本中どこでもトキを見ることができたが、100年ほど前から を取るために捕まえられ、少しずつ を減らしていった。 化が進むと、トキが暮らす田んぼや が減ったり、環境が汚染されたりして、その数は非常に少なくなった。そして1981年、ついに日本のトキは絶滅した(1) 現在は、中国にいた同じ種類のトキを輸入し、佐渡という島で てている。そして、 が増えてきたら自然に戻すという計画が立てられている。トキを複居(2)させるため、多くの金を使い、多くの人々が努力している。自然は簡箪に笑われるが、一度笑われたら元に戻すのは簡単ではない。(注1)絶滅する:ある種類の生物がすっかりいなくなる (注2)複居:なくなってしまったものが、また元に戻ること\n\nQuestions",
          "questions": [
            {
              "questionText": "日本のトキの説明について、本文と言っているものはどれか。",
              "options": [
                "は日本中にいたが、 を減らし、今は に数争いるだけである。",
                "日本各地の田んぼや にいたが、絶滅し、今は輸入されたトキを着てている。",
                "化が進むにしたがって数が減ってしまったが、現在はまた増えている。",
                "絶滅してしまったため、トキに似た中国の鳥を輸入し、育てている。"
              ],
              "correctOption": {
                "index": 0,
                "text": "は日本中にいたが、 を減らし、今は に数争いるだけである。"
              },
              "explanation": "Question 35. Answer will be updated soon."
            },
            {
              "questionText": "日本のトキはなぜ、数が減ったのか。",
              "options": [
                "トキが田んぼや森の生き物を食べすぎて、痛まえられたから。",
                "捕まえられた上に、トキの住む環境も無化したから。",
                "トキの生きられる場所が減り、中国などの国に行ってしまったから。",
                "きれいなトキを飼いたいと思った人が多く、捕まえられたから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "トキが田んぼや森の生き物を食べすぎて、痛まえられたから。"
              },
              "explanation": "Question 35. Answer will be updated soon."
            },
            {
              "questionText": "この文章を書いた人が言いたいことは何か。",
              "options": [
                "非常にきれいな日本のトキが絶滅してしまったのは残念なことだ。",
                "美しい生き物は、経済的に大変でも、び増やして自然にしたほうがいい。",
                "白熱は、復活させるのが非常に難しいので、大切にしなければならない。",
                "自然が笑われかけても、さまざまな方法により復活させることができる。"
              ],
              "correctOption": {
                "index": 0,
                "text": "非常にきれいな日本のトキが絶滅してしまったのは残念なことだ。"
              },
              "explanation": "Question 35. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題36 (Copy-Paste Friendly Format)",
          "passageText": "つぎの文章を読んで質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n町やビルで見かける飲み物の自動販売機は便利だが、夜、だれも使っていないのに、明かりがついているのを見ると、電気代をむだ使いしているように感じられる。\n\nしかし、実は、自動販売機はエネルギーを節約する技術が非常に進んでいる機械である。そこには、どのような工夫があるのだろうか。\n\nまず、冷たい飲み物は、全部を冷やすのではなく、売る直前の分だけ冷やすようになっている。自動販売機の中にあるコンピューターが、曜日や時間による売れ方の変化を見て、最小限の数だけを冷やすのである。だから、電気代が少なくてすむ。\n\nまた、冷たい飲み物と温かい飲み物を同時に売る自動販売機の場合、冷たい飲み物を冷やしたときに出る熱を使って、温かい飲み物を温めることができるようになっている。\n\n以上のようなさまざまな技術によって、自動販売機は電力の消費を減らすことができたのである。",
          "questions": [
            {
              "questionText": "自動販売機が電気をむだ使いしているように見えるのはなぜか。",
              "options": [
                "自動販売機のエネルギーを節約する技術がなかなか進まないから。",
                "だれも使っていないときも、明かりがついているから.",
                "昼だけでなく、夜になっても使う人がいるから。",
                "町やビルなどさまざまな場所にたくさん置いてあるから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "自動販売機のエネルギーを節約する技術がなかなか進まないから。"
              },
              "explanation": "Question 36. Answer will be updated soon."
            },
            {
              "questionText": "自動販売機の飲み物の冷やし方として、正しいものはどれか。",
              "options": [
                "急に冷やすのではなく、コンピューターで管理しながらゆっくり冷やす。",
                "コンピューターによって、売る直前に短い時間で冷やす。",
                "コンピューターが外の温度の変化を調べて、冷やす。",
                "コンピューターでいつどのぐらい売れるかがわかるので、その分だけ冷やす。"
              ],
              "correctOption": {
                "index": 0,
                "text": "急に冷やすのではなく、コンピューターで管理しながらゆっくり冷やす。"
              },
              "explanation": "Question 36. Answer will be updated soon."
            },
            {
              "questionText": "自動販売機のエネルギーの節約方法として、正しいものはどれか。",
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
          "passageText": "日本語で話し合いをしているとき、なかなか話に入れないことがある。どうしたら、参加できるようになるだろうか。\n\nまずは、だれかが話しているとき、首を縦に振って「うなずく」ことである。1対1の話し合いならうなずいている人でも、大勢での話し合いでは、何もしないでじっとしていることがある。しかし、これでは話している人は、不安になってしまう。うなずきは、相手の意見に同意するときだけでなく、同意できないときでも「あなたの話を聞いています」という合図なので、小さくうなずくだけで話し合いに参加できていることになる。そうすると、話し手は安心して先に進める。うなずくとき、「はい」や「そうですね」と相づちを打ってもいい。\n\nさらに、共感できる(注1)ところで「本当にそうですね」と言うことが大切である。このようにしていると、会話に入りやすくなる。\n\n（今井登茂子「うなずいて共感を表現」日本経済新聞朝刊2011年9月24日より）\n\n(注1)共感する：相手の気持ちや意見を自分も同じように感じたり、理解したりする。",
          "questions": [
            {
              "questionText": "「そうすると」とあるが、どのようにすることか。",
              "options": [
                "相手に「あなたの話を聞いています」と言う。",
                "相手の意見に同意できるときにだけ、首を縦に振る。",
                "相手が話しているときは、何もしないでじっとしている。",
                "相手の意見に同意できるときもできないときも首を縦に振る。"
              ],
              "correctOption": {
                "index": 0,
                "text": "相手に「あなたの話を聞いています」と言う。"
              },
              "explanation": "Question 37. Answer will be updated soon."
            },
            {
              "questionText": "うなずくことは、どのような役割があるか。",
              "options": [
                "相手の話を早く先に進ませる役割",
                "相手の話を聞いていることを示す役割",
                "相手の意見に共感していることを伝える役割",
                "自分がこれから話し始めたいことを表す役割"
              ],
              "correctOption": {
                "index": 0,
                "text": "相手の話を早く先に進ませる役割"
              },
              "explanation": "Question 37. Answer will be updated soon."
            },
            {
              "questionText": "この文章では、どうすれば上手に話を始められると言っているか。",
              "options": [
                "1対1の話し合いではうなずくこと、大勢では相づちを打つこと",
                "だれかが話しているときにうなずいたり、相づちを打ったりすること",
                "相手が話している間はじっと聞き、終わってから「そうですね」と言うこと",
                "相手の話に共感できなくても、「本当にそうですね」と相づちを打つこと"
              ],
              "correctOption": {
                "index": 0,
                "text": "1対1の話し合いではうなずくこと、大勢では相づちを打つこと"
              },
              "explanation": "Question 37. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題38 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "科学技術の進歩によって、私たちの生活はより快適で便利になっている。しかし、便利になるということは、昔の人間の能力が失われることだとも言われている。\n\nたとえば、重いものを持ち上げて運ぶとき、機械がなかった時代には人が行っていた。昔の武術(注1)を研究している人の話によると、これはそのころの人が今よりずっと力があったというわけではなく、どのように体を使えば重いものを運べるかがわかっていたので、できたのだという。だが、今は、それが伝えられることもなくなりつつある。\n\nまた、文字を持たない社会には、非常に長い物語や詩などでも、覚えて伝えられる人がいた。しかし、今、そのような人は非常に少なくなっている。こうしたことを考えると、自分たちがなくしたものの存在に気づかされる。\n\nこれから、私たちはどのような能力を失うのだろうか。\n\n目的 | 割合 (%)\n生活費を稼ぐため | 32.8%\n学生生活を楽しむため | 32.4%\n社会経験のため | 24.2%\n無回答 | 5.1%\nその他 | 4.5%\n勉学費を稼ぐため | 1.0%\n\n\n(注1)武術：武士が戦いのために身につけなければならない技術や精神",
          "questions": [
            {
              "questionText": "なぜ人間の能力が失われるのか。",
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
              "questionText": "「それ」とは何を指すか。",
              "options": [
                "機械",
                "力のある体",
                "体の使い方",
                "昔の人々の協力"
              ],
              "correctOption": {
                "index": 0,
                "text": "機械"
              },
              "explanation": "Question 38. Answer will be updated soon."
            },
            {
              "questionText": "この文章では科学技術の進歩について、どう言っているか。",
              "options": [
                "進歩によってよりよい生活が送れるが、人がやっていた仕事がなくなる。",
                "進歩はすばらしいが、それによって人と人とのつながりが失われていく。",
                "進歩すると、機械や道具に頼って、さまざまなことが自分でできなくなる。",
                "進歩するにしたがって、昔のことは伝えられず、どんどん忘れられてしまう。"
              ],
              "correctOption": {
                "index": 0,
                "text": "進歩によってよりよい生活が送れるが、人がやっていた仕事がなくなる。"
              },
              "explanation": "Question 38. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題39 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "日本では1960年代ごろから車が増加し、道路が整備される(注1)とともに、地方都市が都市の外側へと広がった。郊外に住む人が増え、大きなスーパーや病院のような施設(注2)も郊外に造られるようになったのである。そうした所へは歩いて行けないが、車で行けるようになった。しかし、それで困るのが高齢者である。高齢者は車を運転する人が多くないため、郊外まで買い物や病院に行くのが難しい。\n\n一方、都市の中心部の店には客が来なくなって、閉店するところも増えてしまった。そこで、最近、いくつかの都市はさまざまな施設を再び都市の中心に戻し、人々も中心部に集まって住めるようにしようとしている。このような都市はコンパクトシティと言われており、お年寄りも気軽にいろいろな場所へ行くことができる。高齢化が進み、人口が減少している現在、こうした都市が注目されている。\n\n(注1)整備する：使えるような状態にする\n\n(注2)施設：ある目的のために造られた建物",
          "questions": [
            {
              "questionText": "「外側へと広がった」とは、どのような意味か。",
              "options": [
                "都市の外側に新しく別の都市ができた。",
                "道路が造られて、ほかの街へも行きやすくなった。",
                "都市の郊外にも家や施設ができた。",
                "都市の面積が広くなって、施設や家も広くなった。"
              ],
              "correctOption": {
                "index": 0,
                "text": "都市の外側に新しく別の都市ができた。"
              },
              "explanation": "Question 39. Answer will be updated soon."
            },
            {
              "questionText": "コンパクトシティとは、本文によるとどのような意味か。",
              "options": [
                "中心部の多くの店が閉店してしまう都市",
                "お年寄りが買い物に行ったりするのが難しい都市",
                "お年寄りが車を運転して買い物などに行ける都市",
                "施設などを中心部に戻し、人々もそこに住めるようにした都市"
              ],
              "correctOption": {
                "index": 0,
                "text": "中心部の多くの店が閉店してしまう都市"
              },
              "explanation": "Question 39. Answer will be updated soon."
            },
            {
              "questionText": "こうした都市が注目されているとあるが、なぜ注目されているか。",
              "options": [
                "車を呼ぶと、お年寄りをいろいろな店や施設に連れて行ってくれるから。",
                "都市の中心にある店や施設に、お年寄りが簡単に行けるようになったから。",
                "都市の中心に人々が集まって、にぎやかになっているから。",
                "高齢化が進み、人口が減る中で、この都市は人口が増えると思われるから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "車を呼ぶと、お年寄りをいろいろな店や施設に連れて行ってくれるから。"
              },
              "explanation": "Question 39. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題40 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "「スキーが好きです。」「この肉、食べにくい。」のように、同じ音、同じような音を使う言葉の遊びをダジャレと言う。日本語には似た発音でも意味が違う言葉が多いので、ダジャレを作りやすい。小学生や中高年のおじさんたちなどはダジャレが大好きだ。ただ、おじさんが言うと、たいてい冷たい目で見られる。つまらなかったり、同じダジャレを何度も言ったりするからだ。\n\nそれでも、ダジャレは役に立つこともある。だれにでも作れ、うまいダジャレなら人を笑わせて気持ちを明るくすることができる。\n\nまた、ある脳の研究者によると、ふだんからおもしろいダジャレを作ろうとしていれば、脳を鍛える(注1)ことにもなり、ボケ防止(注2)にも役立つらしい。\n\n簡単な言葉遊びで緊張がとけたり、笑い合って明るい気持ちになったり、脳のトレーニングにもなるなら、それはすばらしいことではないだろうか。\n\n(注1)鍛える：練習などを繰り返して、体や心や技術をしっかりさせる\n\n(注2)ボケ防止：脳の働きが悪くなるのを防ぐこと",
          "questions": [
            {
              "questionText": "冷たい目で見られるのはだれか。",
              "options": [
                "ダジャレを聞いた人",
                "ダジャレを言ったおじさん",
                "ダジャレを言った小学生",
                "この文を書いた人"
              ],
              "correctOption": {
                "index": 0,
                "text": "ダジャレを聞いた人"
              },
              "explanation": "Question 40. Answer will be updated soon."
            },
            {
              "questionText": "この文章によると、ダジャレのよい点は何か。",
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
              "questionText": "この文章を書いた人が一番言いたいことはどれか。",
              "options": [
                "中高年の男性はおもしろいダジャレを言うが、まわりの人は理解できない。",
                "中高年の男性はダジャレを言う人が多く、よくみんなを楽しませている。",
                "ダジャレはだれにでも作れるが、まわりの人に言うのはよいことではない。",
                "ダジャレは簡単に作れ、緊張をなくしたり、気持ちを明るくすることもできる。"
              ],
              "correctOption": {
                "index": 0,
                "text": "中高年の男性はおもしろいダジャレを言うが、まわりの人は理解できない。"
              },
              "explanation": "Question 40. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題41 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "拝啓\n\n桜が満開になり、すっかり春らしくなりました。\n\nいかがお過ごしでしょうか。\n\nさて、このたび、私が習っているギターの先生のコンサートが六月十日に開かれることになりました。今回は、先生のお友達であるプロのギタリスト、南ゆかりさんが特別ゲストとして出演されます。詳細(注1)は同封のチラシをごらんください。\n\nお忙しいことと思いますが、ご来場いただければ幸いです。なお、席が限られていますので、来ていただけるのでしたら、私あてに前日までにメールかお電話で人数をご連絡いただけますか。入場券を受付に用意しておきます。代金は結構です。\n\nまた、気温の変化が大きい日々が続きます。どうぞお体にお気をつけて過ごされますように。\n\n敬具\n\n二〇一三年四月三日\n\n大山春樹\n\nヘンドラ・ミラン様\n\n(注1)詳細：くわしいこと",
          "questions": [
            {
              "questionText": "このコンサートに出演するのはだれか。",
              "options": [
                "大山さんと南ゆかりさん",
                "大山さんと先生と南ゆかりさん",
                "先生と南ゆかりさん",
                "南ゆかりさんと特別ゲスト"
              ],
              "correctOption": {
                "index": 0,
                "text": "大山さんと南ゆかりさん"
              },
              "explanation": "Question 41. Answer will be updated soon."
            },
            {
              "questionText": "ヘンドラさんは、妻とこのコンサートに行きたい。どうしたらよいか。",
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
              "questionText": "行く連絡は、いつまでにしなければならないか。",
              "options": [
                "4月2日",
                "4月3日",
                "6月9日",
                "6月10日"
              ],
              "correctOption": {
                "index": 0,
                "text": "4月2日"
              },
              "explanation": "Question 41. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題42 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "日本語では「する」という言い方よりも「なる」という言い方のほうが好んで使われる。「する」を使うと話し手の意志があることが伝わり、「なる」を使うと話し手の意志ではなく自然に起きた、そのような状態にあるということが伝わる。\n\n例えば、禁煙のレストランで一人の客がタバコを吸っている場面で、店側は何と言ってタバコをやめてもらうだろうか。このレストランを禁煙と決めたのは店の人だ。店の人の意志でそのレストランを禁煙にしたはずだ。それならば、「ここは禁煙にしております。」と言うのが自然に思える。しかし、この「〜にする」は、上に書いたとおり、話し手の意志が強く伝わる。この場面では、相手の「たばこを吸う」という行動に対立する(注1)意志が強く表現されてしまう。その結果、相手を怒らせてしまうかもしれない。一方、「ここは禁煙になっております。」と言うと、自分の意志とは関係なく、単にレストランの決まりを伝えているという形になり、相手と対立するような形にはならずに言いたいことを伝えられる。\n\nこのように日本人は「なる」をうまく使うことで人と対立しないようにしているのだ。「する」と「なる」は文字で見るとたった一文字の小さい違いだが、コミュニケーションの上では大きな違いなのである。\n\n(注1)対立する：二つのものが反対の立場に立つ",
          "questions": [
            {
              "questionText": "「話し手の意志がある」とあるが、どういうことか。",
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
              "questionText": "「上に書いた」とおりとあるが、どこを指しているか。",
              "options": [
                "日本語では「する」という言い方よりも「なる」という言い方が好まれる。",
                "日本語では「する」を使うと話し手の意志があることが伝わる。",
                "店の人の意志でそのレストランを禁煙にしたはずだ。",
                "「ここは禁煙にしております。」と言うのが自然に思える。"
              ],
              "correctOption": {
                "index": 0,
                "text": "日本語では「する」という言い方よりも「なる」という言い方が好まれる。"
              },
              "explanation": "Question 42. Answer will be updated soon."
            },
            {
              "questionText": "この場合の店の人の一番の目的は何か。",
              "options": [
                "タバコを吸っている客にレストランの決まりを伝えたい。",
                "レストランでタバコを吸っている客にタバコをやめさせたい。",
                "タバコを吸っている客を叱りたい。",
                "タバコを吸っている客を傷つけたくない。"
              ],
              "correctOption": {
                "index": 0,
                "text": "タバコを吸っている客にレストランの決まりを伝えたい。"
              },
              "explanation": "Question 42. Answer will be updated soon."
            },
            {
              "questionText": "この文章の内容として正しいものはどれか。",
              "options": [
                "「する」は相手の意志を強く伝えるもので、対立することがある。",
                "「なる」を使うと対立をさけることができる。",
                "「する」は単に決まりを教える言い方である。",
                "「なる」を使うと相手と対立してしまう。"
              ],
              "correctOption": {
                "index": 0,
                "text": "「する」は相手の意志を強く伝えるもので、対立することがある。"
              },
              "explanation": "Question 42. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題43 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "日本人にとって桜は特別な木である。春になると桜の花の美しさを求めて、家族や仲間が集まって花見を楽しむ。桜で有名な場所は各地にあるが、近所の公園や並木(注1)などにも、桜が楽しめるところは数多くある。\n\n桜はとても手がかかる木である。花は春の1週間ほどはきれいだが、すぐに散り始め、小さな花びらがあちこちに飛んで行き、何日も掃除しなければならない。葉は秋に赤や黄色に変わり、再び私たちの目を楽しませてくれるが、すぐに落ちて、大量の落ち葉を片付けるのがまた大変である。\n\nしかし、美しい花や紅葉を見せてくれるのだから、その掃除ぐらいで文句を言ってはいけないだろう。\n\n桜で最も手がかかるのは、長生きさせることである。放っておく(注2)と60～70年ぐらいで木が弱り、枯れてしまうと言われている。このため、不要な枝を切ったり、重くて下がってきた枝を支えたり、度々世話をする必要があるのだ。このような作業はとても面倒だが、桜を大切に思う人々により全国で行われていて、樹齢100年を超える桜も珍しくない。\n\n古くからある桜を大事にするだけでなく、新しい桜を植えることもさかんだ。新しい公園や学校ができると必ず若い桜の木が植えられる。手がかかると分かっていても、日本人は身近なところに桜の木があってほしいと思うのだ。日本人にとってこれほど特別な木は桜のほかにはないだろう。\n\n(注1)並木：何十メートルも、両側に木が植えてある道\n\n(注2)放っておく：世話などを何もしない",
          "questions": [
            {
              "questionText": "桜の花は開いてからどうなるか。",
              "options": [
                "翌日には散り始める。",
                "花の色が変わっていく。",
                "何週間も咲いている。",
                "7日間ぐらいは咲いている。"
              ],
              "correctOption": {
                "index": 0,
                "text": "翌日には散り始める。"
              },
              "explanation": "Question 43. Answer will be updated soon."
            },
            {
              "questionText": "「掃除ぐらいで文句を言ってはいけないだろう。」とあるが、どういうことか。",
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
              "questionText": "「最も手がかかるのは、長生きさせることである。」とあるが、どうすればよいか。",
              "options": [
                "何もしないほうがいい。",
                "重くなった枝を切る。",
                "花びらや葉を掃除する。",
                "いらない枝を切る。"
              ],
              "correctOption": {
                "index": 0,
                "text": "何もしないほうがいい。"
              },
              "explanation": "Question 43. Answer will be updated soon."
            },
            {
              "questionText": "この文章を書いた人が一番言いたいことは何か。",
              "options": [
                "桜は手をかけても70年ぐらいで枯れてしまう。",
                "今ある桜が枯れたら日本には桜がなくなってしまう。",
                "手がかかっても日本人は桜の木を特別に大切にしている。",
                "桜を長生きさせるためには花びらや葉を掃除しなければいけない。"
              ],
              "correctOption": {
                "index": 0,
                "text": "桜は手をかけても70年ぐらいで枯れてしまう。"
              },
              "explanation": "Question 43. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題44 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "今、一つの家で家族以外の人と一緒に暮らす、シェアハウスという住宅が増えている。シェアハウスとは、アパートのように自分用のかぎ付きの部屋はあるが、台所や居間、シャワー、トイレなどは共同で使う住宅である。\n\n家賃は周りのアパートなどと同じ程度だが、共同部分があるため、部屋に冷蔵庫などを置く必要がなく、自分の部屋を広く使える。また、一人暮らしの自由を楽しめるだけでなく、共同部分でほかの住人と交流ができるため、さびしさや不安も少なくなる。仕事も国籍も年齢も違う人と一緒に過ごせば、おもしろい発見があるかもしれない。\n\nただし、快適に生活するためにはいくつか注意点がある。入る前に、必ず見学をして、そこに住んでいる人と自分の生活のしかたが合うかどうかを確認することだ。年齢や職業もチェックしたほうがいい。共同部分の使い方についても、どのような決まりになっているかを知っておきたい。掃除、音などで問題が起きることもあるからだ。また、ベッドなどの家具や洗濯機等の電気製品が付いているかどうかも確認したほうがいい。付いている場合は、入るときにこれまで持っていたものを手放さなければならず、出たあとは、買う必要がある。入る前に、以上の点に注意しておけば、失敗が少ないだろう。",
          "questions": [
            {
              "questionText": "この文章のシェアハウスの説明と合っているものはどれか。",
              "options": [
                "家賃が周りのアパートより安い。",
                "一人一人が独立した部屋を持っている。",
                "一人一人に専用のトイレとシャワーがある。",
                "一人の部屋の広さがふつうのアパートより広い。"
              ],
              "correctOption": {
                "index": 0,
                "text": "家賃が周りのアパートより安い。"
              },
              "explanation": "Question 44. Answer will be updated soon."
            },
            {
              "questionText": "シェアハウスのよい点はどんなところだと言っているか。",
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
              "questionText": "シェアハウスに入るときの注意点で本文と合っているのはどれか。",
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
              "questionText": "この文章を書いた人が伝えたいことは何か。",
              "options": [
                "シェアハウスは気をつけるべき点があり、住んでみて後悔する人が多い。",
                "シェアハウスは経済的で、住人同士の交流もあるので、増やすべきだ。",
                "シェアハウスはよい点が多いが、注意点を確認してから決めたほうがいい。",
                "シェアハウスでは一人の自由な時間がないが、ほかの住人と安心して住める。"
              ],
              "correctOption": {
                "index": 0,
                "text": "シェアハウスは気をつけるべき点があり、住んでみて後悔する人が多い。"
              },
              "explanation": "Question 44. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題45",
          "passageText": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n日本の鉄道は時間が正確なことで有名だ。それには鉄道に関係する人々の努力が欠かせない(注1)。列車の掃除もその一つである。\n\n新幹線の場合を見てみよう。16両の新幹線ならゴミ出しやトイレの掃除なども入れて55人が担当する。1両(63～100席)は普通、2人で担当する。時間は10～12分。遅れると乗客に迷惑をかけ、出発時刻も遅らせてしまう。\n\n担当者は車内に入ると、まず空いたペットボトル(注2)や缶を集め、座席の背もたれ(注3)にかかっている白い布を取り外す。次に座席を元の位置に戻し、新しい布をつける。ほうきで座席をきれいにし、ひじかけ(注4)をふく。鏡を使って、たなに忘れ物がないか確認する。最後に床を掃く。これを時間内で終わらせなければならない。\n\nこの仕事を12年前にパート(注5)仕事で始めた安喰さんは、それまで主婦をしていたが、家の掃除とはまったく違うことに気づかされた。そのため、休日に自宅の居間にいすを並べて、時間を計って練習したそうだ。2年たつと、時計を見なくても残り時間がわかるようになった。その後、仕事が認められて社員となり、8年目は作業長に、今は550人を指導する管理職になった。\n\n以前、台風のため新幹線が遅れて掃除時間が4分しかないことがあった。最低限必要な作業をどうするか、不安な気持ちをおさえ、担当者を集めて細かく指示した。決められた時間に出発したときのうれしさは忘れられなかったという。\n\nこのようにさまざまな人々のおかげで日本の鉄道は正確な時間に走れるのである。\n\n(注1)欠かせない：必要である。なくてはならない。\n\n(注2)ペットボトル：飲み物を入れるプラスチックの入れもの\n\n(注3)背もたれ：座る人の背をささえる部分(イラスト参照)\n\n(注4)ひじかけ：座る人の腕を休めることができる部分(イラスト参照)\n\n(注5)パート：普通よりも短い時間だけ働くこと",
          "questions": [
            {
              "questionText": "新幹線の掃除について、本文と合っているものはどれか。",
              "options": [
                "10～12分以内に、1人が1つの車両の掃除をする。",
                "10～12分の間に、ゴミ出し、トイレや車両の掃除を終わらせる。",
                "車両では、はじめに忘れ物がないか確認して、床を掃除する。",
                "車両の座席をきれいにしてから、背もたれの布を取り替える。"
              ],
              "correctOption": {
                "index": 0,
                "text": "10～12分以内に、1人が1つの車両の掃除をする。"
              },
              "explanation": "Question 45. Answer will be updated soon."
            },
            {
              "questionText": "安喰さんは、どうして仕事がうまくできるようになったか。",
              "options": [
                "主婦をしていて、その経験が新幹線の掃除に役に立ったから。",
                "家の掃除とは違うのに気づき、休みの日に家で練習したから。",
                "一緒に働く人たちのやり方を見て仕事をしていたから。",
                "早く終わらせるために、時計を見ないで仕事をしたから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "主婦をしていて、その経験が新幹線の掃除に役に立ったから。"
              },
              "explanation": "Question 45. Answer will be updated soon."
            },
            {
              "questionText": "「うれしさ」とあるが、何がうれしかったのか。",
              "options": [
                "いつもほど長く掃除をしなくてもよかったこと",
                "短い時間で仕事を終わらせ、時間どおりに発車できたこと",
                "時間が短くても、いつもと同じ作業が全部できたこと",
                "台風でも新幹線がいつもどおり動いていて、掃除ができたこと"
              ],
              "correctOption": {
                "index": 0,
                "text": "いつもほど長く掃除をしなくてもよかったこと"
              },
              "explanation": "Question 45. Answer will be updated soon."
            },
            {
              "questionText": "「鉄道が正確な時間に走れる」とあるが、その理由は何か。",
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
          ]
        },
        {
          "title": "問題46 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "最近、大学だけではなく小中学校でも、成績が悪く授業についていけない生徒は上の学年に進ませずに、もう一度同じ学年で勉強させようという意見が出ている。これは本当に子どもにとってよいことなのだろうか。\n\nまず、一つ目の問題は、クラスの中のつながりが非常に強い小中学校で、自分一人が進級できないと、大変なショックを受ける(注1)ということだ。その上、下の学年の生徒が自分より勉強ができるようになってきたら、やる気も自信もなくしてしまうかもしれない。\n\nもう一つは、同じ内容をくり返し勉強しても、成績は必ずしも上がらないと思われることだ。成績が悪いのは、勉強をする習慣がない、勉強のやり方がわからない、基礎的なことがわかっていないなどが原因であることが多い。これを何とかしなければ、その結果は変わらないだろう。\n\nもちろん今の学年の内容がわからないままで上の学年に上がってしまったら、今より難しい内容についていくことはできない。だが、その生徒に対して、ボランティア(注2)が特別に指導をしたりすれば、この問題は改善すると考えられる。\n\nたとえば、授業が終わったあとに、教師になりたい大学生や、退職した(注3)教師が学校に来て、その生徒の問題を知り、その子どもに合った指導をするのである。このようなことをしていけば、やる気をなくすこともなく、上の学年にいても勉強についていくことができるのではないだろうか。\n\n(注1)ショックを受ける：ある原因でとても不安になる\n\n(注2)ボランティア：お金のためではなく、社会に役立つことをすすんでする人\n\n(注3)退職する：仕事をやめる",
          "questions": [
            {
              "questionText": "一つ目の問題とあるが、このような問題が起こる理由は何か。",
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
              "questionText": "「その結果は変わらないだろう」とあるが、どういう意味か。",
              "options": [
                "勉強ができない生徒が上の学年に上がるだろう。",
                "勉強ができない生徒が上の学年に上がらないだろう。",
                "勉強ができない生徒が勉強がわかるようになるだろう。",
                "勉強ができない生徒が勉強がわかるようにならないだろう。"
              ],
              "correctOption": {
                "index": 0,
                "text": "勉強ができない生徒が上の学年に上がるだろう。"
              },
              "explanation": "Question 46. Answer will be updated soon."
            },
            {
              "questionText": "「この問題」とは何か。",
              "options": [
                "小学校や中学校で上の学年の勉強の内容が今より難しくなること",
                "勉強ができない生徒が上の学年に上がったときに授業を理解できないこと",
                "勉強ができない生徒が授業についていけないので上の学年に上がれないこと",
                "勉強ができない生徒にボランティアなどが特別な指導をしないこと"
              ],
              "correctOption": {
                "index": 0,
                "text": "小学校や中学校で上の学年の勉強の内容が今より難しくなること"
              },
              "explanation": "Question 46. Answer will be updated soon."
            },
            {
              "questionText": "上の学年の勉強内容についていくために、この文章を書いた人はどうするべきだと言っているか。",
              "options": [
                "教師がボランティアといっしょに授業のあとに特別な指導をする。",
                "ボランティアとクラスのほかの生徒がわからないところを教える。",
                "勉強の苦手な生徒に合った内容をボランティアが指導する。",
                "授業中にボランティアがわからないところについて教える。"
              ],
              "correctOption": {
                "index": 0,
                "text": "教師がボランティアといっしょに授業のあとに特別な指導をする。"
              },
              "explanation": "Question 46. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題47 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "恋人や結婚相手の考えていることがわからないと言う人がときどきいる。しかし、相手に自分と同じような考えを期待するほうが間違っているのではないだろうか。\n\n先日、男女の違いについておもしろい話を聞いた。それによると、いくつかの場面で、男性と女性の考え方や行動のしかたが大きく違うようだ。a)とb)のどちらが男性でどちらが女性のことを言っているか、考えながら読んでほしい。\n\n買い物について\n\na) いつも200円のものが100円になっていると、必要がなくても買う。\n\nb) いつも100円のものが200円になっていても、必要ならば買う。\n\n将来について\n\na) 結婚するまでは将来について心配をしている。\n\nb) 結婚するまでは将来について何も心配していない。\n\n結婚について\n\na) 相手に変わってほしいと期待しているが、相手は変わらない。\n\nb) 相手に変わらないでほしいと期待しているが、相手は変わる。\n\nさて、a)とb)、どちらが男性で、どちらが女性か、すぐにわかっただろうか。a)が女性で、b)が男性なのだそうだ。確かに自分や自分の周りの人を見ていると、当たっているようにも思える。男女はもともと違うものだと考えたほうがよさそうだ。\n\n相手は自分と違うのだから、違いを埋めていくための努力がなければ、よい関係を作ることはできないと思ったほうがいいだろう。",
          "questions": [
            {
              "questionText": "買い物について男性はどうだと言っているか。",
              "options": [
                "いつも値段が安いものを探して買ってしまう。",
                "値段が高いほうがよいものだと思って買ってしまう。",
                "買わなくてもいいものでも値段が安いと買ってしまう。",
                "買わなければならないものなら値段のことは考えずに買ってしまう。"
              ],
              "correctOption": {
                "index": 0,
                "text": "いつも値段が安いものを探して買ってしまう。"
              },
              "explanation": "Question 47. Answer will be updated soon."
            },
            {
              "questionText": "将来について女性はどうだと言っているか。",
              "options": [
                "夫ができると、将来について心配し始める。",
                "夫ができると、将来について心配しなくなる。",
                "夫ができる前は、将来について心配はしない。",
                "夫ができてから、将来について心配になる。"
              ],
              "correctOption": {
                "index": 0,
                "text": "夫ができると、将来について心配し始める。"
              },
              "explanation": "Question 47. Answer will be updated soon."
            },
            {
              "questionText": "結婚について男性はどうだと言っているか。",
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
              "questionText": "この文章で一番言いたいことは何か。",
              "options": [
                "男性と女性は考えや行動が異なっているから、絶対に分かり合えない。",
                "男性と女性の考え方や行動は異なっているが、それは科学では証明されていない。",
                "この話の男性と女性の考えや行動の比較は当たっている。",
                "男性と女性は違うのだから、分かり合おうと努力することが大切だ"
              ],
              "correctOption": {
                "index": 0,
                "text": "男性と女性は考えや行動が異なっているから、絶対に分かり合えない。"
              },
              "explanation": "Question 47. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題48 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "富士山は標高3,776メートルの日本一高い山で、世界文化遺産でもある。登山道が整備されているため、毎年何十万人もの人が山頂(注1)を目指すそうだ。私もツアーに参加して登ることにした。\n\n登りはじめは楽だった。でも、3時間ぐらいすると、だんだん岩が多くなり、登りにくくなってきた。その上天気も悪くなり、前も後ろも真っ白で周りがほとんど見えなくなってしまった。そこはちょうど雲の中だったのだそうだ。何も見えずに、ただ一歩ずつ前に進むしかなく、この時は不安でつらかった。しばらくすると、急に天気がよくなった。雲が移動したのではない。私たちが雲の上に出たのだ。足の下には雲が海のように広がっていた。素晴らしい景色を見たら元気が出てきて、目標の山小屋(注2)に予定時間に着くことができた。私たちはそこで一泊した。\n\n次の朝、まだ暗いうちに山小屋を出発して山頂まで登ったが、そこでは大勢の人が太陽を待っていた。やがて、薄暗かった空が次第に明るい青色になって、そして空の下の部分だけがオレンジ色に変わってきた。そして、太陽が静かに昇り始め、まぶしい光が伸びてきた。光はどんどん強くなり、私たちを照らした。山頂はとても寒かったが、太陽の光が当たって身体が温かくなるのを感じた。\n\n富士山に登るのは大変だったが、登らなければできない素晴らしい経験がいくつもできた。毎年登る人もいると聞くが、その人たちの気持ちがよくわかる。\n\n(注1)山頂：山の一番上\n\n(注2)山小屋：山にある宿泊や休憩や避難などができる施設",
          "questions": [
            {
              "questionText": "「ほとんど見えなくなってしまった。」とあるが、どういうことか。",
              "options": [
                "大勢の人がいたので、前が見えなかった。",
                "雨が激しく降って前がよく見えなかった。",
                "雲の中に入ってしまい、よく見えなかった。",
                "夕方になったので暗くてよく見えなかった。"
              ],
              "correctOption": {
                "index": 0,
                "text": "大勢の人がいたので、前が見えなかった。"
              },
              "explanation": "Question 48. Answer will be updated soon."
            },
            {
              "questionText": "「そこ」とあるが、どこか。",
              "options": [
                "富士山の登山道全体",
                "富士山の山小屋を出たところ",
                "富士山を3時間ぐらい登ったところ",
                "(テキスト欠落)"
              ],
              "correctOption": {
                "index": 0,
                "text": "富士山の登山道全体"
              },
              "explanation": "Question 48. Answer will be updated soon."
            },
            {
              "questionText": "富士山から見た、太陽が昇る様子について正しいものはどれか。",
              "options": [
                "空全体が青い色からオレンジ色に変わって太陽が昇る。",
                "オレンジ色の空から太陽が昇ると、空が青くなる。",
                "空が明るい青色になってから下の方がオレンジ色になり、太陽が昇る。",
                "空がまぶしくなってからオレンジ色の太陽が昇り始める。"
              ],
              "correctOption": {
                "index": 0,
                "text": "空全体が青い色からオレンジ色に変わって太陽が昇る。"
              },
              "explanation": "Question 48. Answer will be updated soon."
            },
            {
              "questionText": "この文章を書いた人は富士山登山についてどう思っているか。",
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
          ]
        },
        {
          "title": "問題49 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "評論家という仕事がある。ある分野について深い知識を持ち、人々が参考にできるような解説や評価などをする仕事である。今では、政治評論家、経済評論家からラーメン評論家まで、あらゆる分野の評論家がテレビや雑誌などで活躍をしている。しかし、医者や学校の先生のように、評論家になるための資格試験があるわけではない。彼らは一体どうやって評論家になったのだろうか。\n\n彼らの多くは必ずしも評論をするために深い知識を得たのではない。若いころからある分野に対して人並み外れた(注1)知識や興味を持っており、好きでそれを学ぶうちに、いつの間にかそれを仕事にすることになったという人も多い。好きな分野を仕事にできるとはうらやましい話だが、ただ人並み外れた深い知識があれば評論家になれるというものでもないだろう。評論家として収入を得るためには、新聞や雑誌、テレビなどのマスメディア(注2)に取り上げられなければならない。\n\nマスメディアに取り上げられるためには、人々が納得し、話を聞きたくなるような説得力や魅力があること、さらに、マスメディアに登場するチャンスを得る運の強さも必要だろう。\n\n人並み外れた知識、人々が言うことを聞きたくなるような説得力や魅力、そしてチャンスをつかむ運がそろって初めて評論家になれるのかもしれない。\n\n(注1)人並み外れた：普通の人と比べて大きく違う\n\n(注2)マスメディア：新聞・雑誌・テレビ・ラジオなどの大勢の人に向けての情報伝達の手段",
          "questions": [
            {
              "questionText": "評論家と医者や先生はどこが違うと書かれているか。",
              "options": [
                "評論家はある分野について説明や評価をするが、医者や先生はそうではない。",
                "評論家はある分野についての資格が必要だが、医者や先生はそうではない。",
                "評論家はある分野についての資格は必要ないが、医者や先生はそうではない。",
                "評論家はある分野の知識が必要だが、医者や先生はそうではない。"
              ],
              "correctOption": {
                "index": 0,
                "text": "評論家はある分野について説明や評価をするが、医者や先生はそうではない。"
              },
              "explanation": "Question 49. Answer will be updated soon."
            },
            {
              "questionText": "評論家の多くはどんなことが仕事につながったとあるか。",
              "options": [
                "評論家になるためにある分野について特別な興味を持とうとしたこと",
                "ある分野について解説や評論をするために、一生懸命学んだこと",
                "若いころにある分野についての資格試験を人よりもたくさん受けたこと",
                "ずっとある分野に特別な知識を持ち、興味を持って勉強を続けたこと"
              ],
              "correctOption": {
                "index": 0,
                "text": "評論家になるためにある分野について特別な興味を持とうとしたこと"
              },
              "explanation": "Question 49. Answer will be updated soon."
            },
            {
              "questionText": "「ただ人並み外れた深い知識があれば評論家になれるというものでもない」とあるが、どういうことか。",
              "options": [
                "深い知識を持つことが、評論家になるためのただ一つの必要なことだ。",
                "深い知識を持つことが必要ではないこともたくさんある。",
                "深い知識を持つことは必要だが、ほかにも必要なことがある。",
                "深い知識を持つことは必要ではなく、ほかに必要なことがある。"
              ],
              "correctOption": {
                "index": 0,
                "text": "深い知識を持つことが、評論家になるためのただ一つの必要なことだ。"
              },
              "explanation": "Question 49. Answer will be updated soon."
            },
            {
              "questionText": "本文によると、マスメディアに取り上げられるためには何が必要か。",
              "options": [
                "新聞やテレビ関係の会社で働いてマスメディアに出た経験",
                "人々を説得しひきつける力があり、マスメディアに出る機会に恵まれる運の強さ",
                "マスメディアに出て、人々をひきつけた経験",
                "人並み外れた深い知識 and、人々を納得させる説得力や魅力"
              ],
              "correctOption": {
                "index": 0,
                "text": "新聞やテレビ関係の会社で働いてマスメディアに出た経験"
              },
              "explanation": "Question 49. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題50 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "夏休みに私はある町を旅行した。そこは私が学生時代に大好きだった作家が生まれ、活躍した町である。いつかはそこをこの目で見てみたいと思っていたのが、やっと実現したのだった。\n\nもう彼が亡くなって何十年も経っているため、様子はすっかり変わってしまったはずである。それでも彼の小説の舞台となった、緑の美しい町を歩くのは楽しかった。だが、私が社会人になってからは、彼の書いたものをほとんど読まなくなったせいか、それ以上の感激はなく、正直に言うと、少し物足りない気持ちだった。\n\nところが、ある記念館に入ったときのことである。そこでは、彼の書いた原稿(注1)や手紙の展示(注2)をしていた。それを見ているうちに、しだいに昔読んだ小説や詩の内容が思い出されてきた。特に、彼の妹が亡くなったときに書かれた、詩の原稿を読んだときには、彼の悲しみが痛いほど近くに感じられたのである。手書きの文字というのは、時間がどんなに流れていても、その人がどんな人だったのか、その人が何を感じていたかを強く表していることに気がついた。\n\n字の下手な私は、できるだけパソコンを使っていた。だが、それ以来、時には下手でも心をこめて字を書くことで、何かが伝わるのではないかと思いはじめている。\n\n(注1)原稿：本を出したり、発表をしたりするために文章を書いた紙\n\n(注2)展示：ものを並べて見せること",
          "questions": [
            {
              "questionText": "この文章を書いた人はある町を歩いて、どのような気持ちになったか。",
              "options": [
                "町に緑が多くてきれいなので、楽しく、満足していた。",
                "作家の書いた小説を次々に思い出して、満足していた。",
                "作家の小説を読んでから時間が経ち、思ったほど感動しなかった。",
                "今は作家のいたころの町と大きく変わってしまい、少し不満だった。"
              ],
              "correctOption": {
                "index": 0,
                "text": "町に緑が多くてきれいなので、楽しく、満足していた。"
              },
              "explanation": "Question 50. Answer will be updated soon."
            },
            {
              "questionText": "この文章によると、この人は記念館で何を見たか。",
              "options": [
                "作家の書いた詩の本や小説の本",
                "作家自身が書いた小説の原稿や手紙",
                "いろいろな人がこの作家について書いた原稿や手紙",
                "作家の妹が書いた詩"
              ],
              "correctOption": {
                "index": 0,
                "text": "作家の書いた詩の本や小説の本"
              },
              "explanation": "Question 50. Answer will be updated soon."
            },
            {
              "questionText": "「それ以来」とあるが、どのようなことか。",
              "options": [
                "記念館に入ったときから",
                "彼の手書きの原稿を見たときから",
                "作家の生まれた町に着いたときから",
                "パソコンで字を書いていたときから"
              ],
              "correctOption": {
                "index": 0,
                "text": "記念館に入ったときから"
              },
              "explanation": "Question 50. Answer will be updated soon."
            },
            {
              "questionText": "この文章を書いた人が一番伝えたいことは何か。",
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
          ]
        },
        {
          "title": "問題51 つぎの文章は『花屋ダイヤリー』という小説についての紹介である。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "passageText": "『花屋ダイヤリー』は一軒の花屋が舞台の小説です。花屋のアルバイト店員と、花を買いに来るさまざまな客との関わりが、ていねいに描かれています。\n\n作者の山口しずかは2012年に『一人』で小説最優秀賞を取った注目の女性作家です。若者の純粋さを、愛情を持って表現するところに人気があります。\n\n『花屋ダイヤリー』では、学校にも行かず仕事もしない17歳のユウが主人公(注1)です。何にも興味を持てなかったユウは、小さな花屋でアルバイトを始めます。そこには毎日、1輪だけ花を買いに来るおばあさんや、ゲーム機と交換に花を買いたいと言う小学生など、少し変わった客が次々と現れます。客はみなユウに花を選んでほしいと言います。困ったユウは、どうしてその花を買いたいのか、だれのための花なのかなど、その事情を客にたずねます。\n\n客と話をするうちに、ユウは人との関係の大切さや働く意味など、いろいろなことを考え、変わりはじめます。何の喜びもない日々を送っていたユウが、働いて人の役に立つ中で明るく強くなっていく様子に、読者は元気づけられるでしょう。それは作者から読者へのエール(注2)でもあります。また、たくさんの花の名前と花言葉(注3)が紹介されているので、だれかに花を贈るときに役に立つ知識も得られます。\n\n人間関係に少し疲れているときや目標が見つけられないときに読むと、人が好きになり心が元気になる一冊です。ユウと同年代の人にぜひ読んでほしいです。\n\n(注1)主人公：物語などの中心人物\n\n(注2)エール：スポーツなどの試合で選手を応援するときの声・言葉\n\n(注3)花言葉：一つ一つの花に意味を持たせたもの。バラは「愛」など",
          "questions": [
            {
              "questionText": "本文によると、山口しずかはどんな人だと言われているか。",
              "options": [
                "若い女性の作家",
                "自分のことを小説に書いた人",
                "若者に人気がある作家",
                "賞を受けたことのある人気の作家"
              ],
              "correctOption": {
                "index": 0,
                "text": "若い女性の作家"
              },
              "explanation": "Question 51. Answer will be updated soon."
            },
            {
              "questionText": "「その事情を客にたずねます。」とあるが、なぜか。",
              "options": [
                "何にも興味を持てなかったから。",
                "1輪だけ花を選ぶのは難しいから。",
                "ゲーム機と同じ値段の花がわからないから。",
                "客がどの花がいいか選んでほしいと言うから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "何にも興味を持てなかったから。"
              },
              "explanation": "Question 51. Answer will be updated soon."
            },
            {
              "questionText": "「元気づけられる」とあるが、なぜか。",
              "options": [
                "学校にも行かず仕事もしなかったユウが変わったことをしたから。",
                "学校に行かなかったユウが学校に行くようになったから。",
                "何事にも無関心だったユウが明るく強く変わっていったから。",
                "仕事をしなかったユウがアルバイトを始めたから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "学校にも行かず仕事もしなかったユウが変わったことをしたから。"
              },
              "explanation": "Question 51. Answer will be updated soon."
            },
            {
              "questionText": "『花屋ダイヤリー』で作者が読者に一番伝えたいことは何か。",
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
          ]
        }
      ]
    },
    {
      "id": "shinkanzen-ch-4-email",
      "title": "Email & Information Retrieval",
      "type": "email-type",
      "description": "Comprehension of letters, emails, advertisements, and notices.",
      "passages": [
        {
          "title": "第2部 問題16",
          "passageText": "職場でコピーを取ろうとしたら、コピー機に以下のようなメモが貼ってあった。\n\nこのコピー機は故障中です。 修理の人が11時ごろ来ます。 修理が問題なく終われば、午後から使えるようになります。 お急ぎの方は、5階の第一事務室か、5階の第二事務室か、4階の資料準備室のものをお使いください。 ただし第一事務室は、混んでいるので、20枚以上のコピーはご遠慮ください。 第二事務室のコピー機はA3サイズが取れません。 また、4階の資料準備室はカギがかかっていますので、となりの資料管理室でカギを借りてください。",
          "questions": [
            {
              "questionText": "今、9時45分で、10時の会議のためにA3サイズのコピーを40枚取りたい。間に合うようにコピーを取るには、どうすれば一番よいか。(It is now 9:45, and you want to make 40 copies of A3 size for a 10:00 meeting. What is the best thing to do to get the copies in time?)",
              "options": [
                "5階の第一事務室に行き、コピーを取る。",
                "5階の第二事務室に行き、コピーを取る。",
                "4階の資料管理室でカギを借り、資料準備室でコピーを取る。",
                "修理の後、このコピー機を使う。"
              ],
              "correctOption": {
                "index": 0,
                "text": "5階の第一事務室に行き、コピーを取る。"
              },
              "explanation": "Question 16. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第2部 問題17",
          "passageText": "親子丼の作り方\n\n材料(2人分)\n\nごはん・・・どんぶり2杯分\n\nとり肉・・・1枚(約150g)\n\nたまねぎ・・・1/4コ\n\nたまご・・・4コ\n\n調味料\n\nみりん・・・大さじ2\n\nしょうゆ・・・大さじ2\n\nさとう・・・大さじ1\n\nだし汁・・・カップ1杯(200cc)\n\n作り方\n\nまず、とり肉を一口大(注1)に切り、たまねぎをうす切りにします。ボールにたまごを割って混ぜておきます。\n\nなべにだし汁(注2)、みりん、しょうゆ、さとうを入れて火にかけます。\n\n沸騰したら、たまねぎ、とり肉を入れて、中火~弱火で煮ます。\n\nとり肉が煮えたら、たまごを回し入れます(注3)。固まり始めたら、火をとめます。\n\nごはんの上にのせて、出来あがり!\n\nここに注意!\n\n最後にたまごを入れたら、あまり混ぜないこと。そして長く煮ないこと。\n\n(注1)一口大:口に入るくらいの大きさ\n\n(注2) だし汁: こんぶやかつおぶしで作ったスープ\n\n(注3) 回し入れる:まるをかくようにして入れる",
          "questions": [
            {
              "questionText": "親子丼の作り方の順番で、正しいものはどれか。 (Which of the following is the correct order for making Oyakodon?)",
              "options": [
                "なべにだし汁、とり肉、たまねぎ、たまごを入れてから火にかける。",
                "なべにだし汁、調味料、とり肉を入れ、沸騰したら、たまねぎとたまごを入れる。",
                "なべにだし汁、調味料を入れ、沸騰したら、はじめにたまごを入れる。",
                "なべにだし汁、調味料を入れ、沸騰したら、とり肉とたまねぎを入れる。"
              ],
              "correctOption": {
                "index": 0,
                "text": "なべにだし汁、とり肉、たまねぎ、たまごを入れてから火にかける。"
              },
              "explanation": "Question 17. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "第2部 問題18",
          "passageText": "電車に乗ると、化粧をしている女性をときどき見かける。彼女たちは、「時間がないんだし、他人に迷惑をかけているわけじゃないんだから、別にいいでしょ」と思っているらしい。確かに忙しい毎日の中、少しでも時間を節約したい気持ちもわかるが、私はそれを見ると、不快な気持ちになる。化粧は人に会うための準備なので、家でするものであり、電車ですべきではない。\n\n電車で化粧をする人たちに、これから会う人の前でもそうやって化粧をするのかと聞くと、しないと言う。一方、自分とは全然関係ない周りの乗客には、化粧する姿を見られても別に構わないと言う。\n\nこれは、彼女たちが周りの人たちを風景の一部、壁や座席などと同じだと考えているように私には感じられる。これは大変失礼ではないだろうか。電車で化粧をするということは、そういう印象を周りの人に与えていることに気づいてほしい。",
          "questions": [
            {
              "questionText": "この文章を書いた人は電車の中で化粧をすべきではないと言っているが、その理由は何か。(The person who wrote this passage says you should not put on makeup in the train. What is the reason?)",
              "options": [
                "周りの人が人として見られていないように感じるから。",
                "化粧をするのは周りの人に迷惑をかける行動だから。",
                "これから会う人に対して大変失礼なことだから。",
                "化粧する時間を節約するのは女性としてはずかしいことだから。"
              ],
              "correctOption": {
                "index": 0,
                "text": "周りの人が人として見られていないように感じるから。"
              },
              "explanation": "Question 18. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題21)",
          "passageText": "バス1日乗車券と共通入場券のお得なセット！ 「○○市バス」1日乗車券 700円 + 共通入場券 ○○市歴史博物館 1,000円 現代美術館 900円 あわせて 2,600円 ⇒ セットで買うと 2,200円 400円もお得です！ 発売期間 4月1日~6月30日 発売場所 ○○市バスの切符売り場（8:00~20:00） ○○市歴史博物館、現代美術館の窓口（開館時間内） 有効期間 4月1日~6月30日のうち乗車券、入場券ともに購入日当日1日限り有効 （お問い合わせ） ○○市観光課 0120-888888\n\n4. Questions and Options",
          "questions": [
            {
              "questionText": "アンさんは○○市でバス1日乗車券を使って歴史博物館と現代美術館を見たい。安く見るにはどこでいくらの券を買えばよいか。",
              "options": [
                "バスの切符売り場 1,100円",
                "○○市観光課 1,900円",
                "バスの切符売り場 2,200円",
                "○○市観光課 2,600円"
              ],
              "correctOption": {
                "index": 0,
                "text": "バスの切符売り場 1,100円"
              },
              "explanation": "Question 21. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題22)",
          "passageText": "テニス教室、生徒募集! 一緒にテニスをしませんか? 対象:20歳以上。A市在住・在勤・在学 期間:4月~7月(各コース全15回) 場所:さくらテニスコート 各クラス14人まで(定員になったらしめきり) 費用:3,000円 申し込み:往復はがき(1人1枚)に希望するクラス名、曜日、時間、住所、名前、電話番号を書いて、2月15日(水)までに下記までお送りください。結果は返信はがきで、3月中旬頃までに発送します。 はがきの宛て先:〒101-2222 A市山田町2-2-2 さくらテニスクラブ 問い合わせ先:033-111-2222\n\nクラス表: a: 月 19:00-20:20 中上級 b: 火 10:40-12:00 上級 c: 水 15:00-16:20 中級 d: 木 17:00-18:20 初級 e: 金 19:00-20:20 初級 f: 土 10:40-12:00 初級 g: 土 15:00-16:20 初中級 h: 日 10:40-12:00 初中級 i: 日 17:00-18:20 中級\n\n4. Questions and Options\n\n(注1) 在勤: そこで働いていること (注2) 在学: そこで学校に通っていること",
          "questions": [
            {
              "questionText": "ローラさんはテニスをしたことがないが、テニスを習いたいと思っている。月・水・木は9:30から16:00まで語学学校で勉強している。学校からテニスクラブは歩いて5分である。ローラさんがとることができるクラスはどれか。",
              "options": [
                "aとc",
                "aとd",
                "dとf",
                "cとg"
              ],
              "correctOption": {
                "index": 0,
                "text": "aとc"
              },
              "explanation": "Question 22. Answer will be updated soon."
            },
            {
              "questionText": "申し込みについて、正しいものはどれか。",
              "options": [
                "A市に住んでいる人しか申し込めない。",
                "2月15日までに往復はがきを送れば、必ず入会できる。",
                "申し込み人数が定員以上になった場合は、抽選で決められる。",
                "兄弟で入りたい場合もそれぞれ往復はがきを送らなければならない。"
              ],
              "correctOption": {
                "index": 0,
                "text": "A市に住んでいる人しか申し込めない。"
              },
              "explanation": "Question 22. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "23",
          "passageText": "南みなと図書館 映画上映会 南みなと図書館では、なつかしい映画や子どもを対象とした映画を無料で上映しています。ぜひみなさんでお越しください。\n\n名称：①ラストダンスは君と 日時・場所：3月2日 午後2時~ 3階多目的ホール 対象・定員・申込方法：一般50名(申込必要：ネットかはがきで。先着順) 内容：大学生の康太は無理やりダンス部に入れられて、先輩と大会に出ることに。爆笑恋愛コメディ。出演：三未来、中田真美\n\n名称：②ドキドキマシンをさがせ 日時・場所：3月9日 午後2時~ 2階集会室 対象・定員・申込方法：児童、保護者 先着30名(申込不要) 内容：人間の心がわかるという機械を発明した少年と悪の大王との戦い。出演：小林ゆうき・森雪菜。\n\n名称：③トモばあちゃんの涙 日時・場所：3月16日 午後3時~ 3階多目的ホール 対象・定員・申込方法：一般50名(申込必要：ネットかはがきで。先着順) 内容：一人暮らしのトモばあちゃんの家の前に赤ちゃんが。家族とは何かを問う問題作。出演：黒沢美香子、中村寿男\n\n名称：④ホヨヨンと楽しいおともだち 日時・場所：3月23日 午後3時~ 2階集会室 対象・定員・申込方法：児童、保護者 先着30名(申込不要) 内容：世界的な人気者のクマ、ホヨヨンと元気な友だちのほのぼのアニメ。\n\n4. Questions and Options",
          "questions": [
            {
              "questionText": "エバさんは5歳の子どもといっしょに子ども向けのアニメを見たい。どれがよいか。",
              "options": [
                "「ラストダンスは君と」",
                "「ドキドキマシンをさがせ」",
                "「トモばあちゃんの涙」",
                "「ホヨヨンと楽しいおともだち"
              ],
              "correctOption": {
                "index": 0,
                "text": "「ラストダンスは君と」"
              },
              "explanation": "Question 23. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "24",
          "passageText": "ミニ・コンサートのご案内\n\n秋も日一日と深まり、紅葉も美しくなり始めました。\n\n私たち「さくら合唱クラブ」は日本の歌を愛する社会人混声合唱のクラブです。このたび秋の歌を集めて、ミニ・コンサートを開催することになりました。\n\nどうぞ日本の歌の美しさをお楽しみください。ご来場をお待ちしています。\n\n平成XX年10月25日\n\nさくら合唱クラブ発表会実行委員\n\n日時：\n\n11月12日(土)\n\n開場15:00\n\n開演15:30\n\n場所：\n\n○○市民ホール\n\n入場料：300円\n\n☆お願い☆\n\n・自転車・車でのご来場はご遠慮ください。\n\n・上演中のフラッシュ撮影はご遠慮ください。\n\n・ビデオ撮影はビデオ席でお願いします。\n\n・小さいお子様をお連れの方は、他のお客様のご迷惑にならないようにご注意ください。\n\n・携帯電話等の電源はお切りください。\n\n☆メンバー募集☆ 私たちと一緒に歌いませんか?\n\n参加ご希望の方は山田 (tel:090-9387-○○○○)までご連絡ください。\n\n4. Questions and Options",
          "questions": [
            {
              "questionText": "：このコンサートで、してはいけないことは何か。",
              "options": [
                "ビデオを撮る。 2 写真を撮る。 3 子どもと一緒に行く。 4 携帯電話でメールをする。",
                "選択肢 2",
                "選択肢 3",
                "選択肢 4"
              ],
              "correctOption": {
                "index": 0,
                "text": "ビデオを撮る。 2 写真を撮る。 3 子どもと一緒に行く。 4 携帯電話でメールをする。"
              },
              "explanation": "Question 24. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "25",
          "passageText": "国際ビルご利用の皆様\n\nエレベーター運転停止のお知らせ\n\n平成○○年7月1日\n\n8月1日より8月7日までの下記の時間、国際ビルの北館、東館、西館では、エレベーターの点検を行います。点検中はエレベーターの利用ができませんので、ご注意ください。ご迷惑をおかけしますが、よろしくお願いいたします。\n\n点検予定日時\n\n・○が点検予定日\n\n・時間は、各館8:00~10:00、22:00~24:00\n\n・△の日は講演会のため、8:00から10:00の点検は行いません。\n\n(点検表)\n\n日付： 1 2 3 4 5 6 7\n\n東館： ○ ○ ○\n\n西館：      ○ △ ○ ○\n\n北館：      ○ △ ○ ○\n\nご注意\n\n・点検中はエスカレーターまたは階段をご利用ください。\n\n・東館と西館の5階は連絡通路で移動することができます。\n\n・南館については、9月に点検予定です。\n\n問い合わせ先\n\n国際ビル管理部\n\nTEL: 03-1111-2222",
          "questions": []
        },
        {
          "title": "32",
          "passageText": "○×大学のサラさんは山田先生の研究室に月曜日に行く約束をしていたが、山田先生から下のようなメールが届いた。\n\nあて先: 1234abc@lits.ac.jp\n\n件名: 月曜日の約束\n\n本文: > サラさん、こんにちは、山田です。\n\n来週の月曜日に研究室に来てくれるという約束でしたが、実は急に会議が入ってしまい、都合が悪くなってしまいました。\n\n申し訳ないけれど、日時を変更させてください。\n\nもし早いほうがよければ明日、17日の5:00以降、月曜日よりも後でよければ、水、木なら10時からOKです。\n\nサラさんの都合を教えてください。\n\n○×大学外国語学部\n\n山田はな\n\nyamadahana@marubatsu.ac.jp\n\n[Question & Options]",
          "questions": [
            {
              "questionText": "：このメールを読んだ後、サラさんは山田先生にどんなメールを出せばよいか。",
              "options": [
                "もう一度先生の都合を聞くメール",
                "自分の都合を教えるメール",
                "約束を延期したことをあやまるメール",
                "都合が悪くなったことをあやまるメール"
              ],
              "correctOption": {
                "index": 0,
                "text": "もう一度先生の都合を聞くメール"
              },
              "explanation": "Question 32. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題52 (Visual Layout Format)",
          "passageText": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "questions": [
            {
              "questionText": "アリさんは6月18日午後10時頃、この広告を1枚持ってコンビニに行った。アイスクリームを2個買った。アイスクリームは100円と書いてあった。いくら払ったか。",
              "options": [
                "200円",
                "180円",
                "160円",
                "140円"
              ],
              "correctOption": {
                "index": 0,
                "text": "200円"
              },
              "explanation": "Question 52. Answer will be updated soon."
            },
            {
              "questionText": "ドーナッツを安く買いたい。この広告を持って、いつ買いに行けばよいか。",
              "options": [
                "6月10日 午前10時ごろ",
                "6月12日 午後10時ごろ",
                "6月16日 午前8時ごろ",
                "6月20日 午後8時ごろ"
              ],
              "correctOption": {
                "index": 0,
                "text": "6月10日 午前10時ごろ"
              },
              "explanation": "Question 52. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題53 (Visual Layout Format)",
          "passageText": "つぎの文章は求人募集広告である。右の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n(注1) 職種：仕事の種類\n\n(注2) 考慮：よく考えること",
          "questions": [
            {
              "questionText": "ホンさんは、火・木・金曜日に夕方5時から夜10時まで働くことになった。1週間で給料がいくらもらえるか。",
              "options": [
                "9,000円",
                "9,500円",
                "13,500円",
                "15,000円"
              ],
              "correctOption": {
                "index": 0,
                "text": "9,000円"
              },
              "explanation": "Question 53. Answer will be updated soon."
            },
            {
              "questionText": "このすし屋で働ける人はだれか。",
              "options": [
                "経験がある主婦。月曜日と火曜日に9時から12時まで働ける。",
                "経験がない大学生。水曜日に午後6時から午後11時まで働ける。",
                "経験がある高校生。火曜日と木曜日に午後3時から午後9時まで働ける。",
                "経験がない大学生。水曜日と土曜日に午後5時から夜10時まで働ける。"
              ],
              "correctOption": {
                "index": 0,
                "text": "経験がある主婦。月曜日と火曜日に9時から12時まで働ける。"
              },
              "explanation": "Question 53. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題54 (Visual Layout Format)",
          "passageText": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nアパート情報サイト「マイハウスネット」 (20XX年3月現在)\n\n(注1) 敷金：アパートを契約するときに、保証金として大家さんに預けるお金\n\n(注2) 礼金：アパートを契約するときに、お礼として大家さんに支払うお金",
          "questions": [
            {
              "questionText": "契約するときにいくら必要か。",
              "options": [
                "3万円",
                "3万5千円",
                "9万円",
                "9万5千円"
              ],
              "correctOption": {
                "index": 0,
                "text": "3万円"
              },
              "explanation": "Question 54. Answer will be updated soon."
            },
            {
              "questionText": "このアパートの説明として本文の内容と合っているものはどれか。",
              "options": [
                "部屋は5階にある。",
                "ベランダは南側にある。",
                "犬を飼うことはできない。",
                "部屋にお風呂がない。"
              ],
              "correctOption": {
                "index": 0,
                "text": "部屋は5階にある。"
              },
              "explanation": "Question 54. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題55 (Visual Layout Format)",
          "passageText": "つぎの文章は文化講座の案内パンフレットである。これを読んで下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
          "questions": [
            {
              "questionText": "上の案内の中の「京都クラス」に、「文化カフェ」の会員が参加する場合、1回の料金はいくらか。",
              "options": [
                "500円",
                "1,000円",
                "1,500円",
                "2,000円"
              ],
              "correctOption": {
                "index": 0,
                "text": "500円"
              },
              "explanation": "Question 55. Answer will be updated soon."
            },
            {
              "questionText": "リーさんは4月9日(水)のアラビア語クラスに参加したい。何をすればよいか。",
              "options": [
                "4月6日までに、電話して予約する。",
                "4月6日までに、ネットで予約する。",
                "4月8日までに、みなと市民会館に行って予約する。",
                "4月9日に、教室に行って申し込む。"
              ],
              "correctOption": {
                "index": 0,
                "text": "4月6日までに、電話して予約する。"
              },
              "explanation": "Question 55. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題56 (Visual Layout Format)",
          "passageText": "つぎのページはレストランの案内である。これを読んで、下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nひがし町 レストラン案内\n\n① オリーブの風\n南ヨーロッパのさまざまな国の料理が楽しめる。パーティーにもよい。\n【昼】800〜1,500円 【夜】2,000〜5,000円\n時間：11:00〜14:00 / 18:00〜24:00\n休み：木 | ② 山海\n新鮮な魚と野菜を使った日本のふるさとの味。さしみが最高。\n【昼】950〜1,500円 【夜】3,500〜8,000円\n時間：11:30〜14:30 / 18:00〜22:00\n休み：火\n③ よねやま\nてんぷら、すしなど日本料理のメニューが豊富。個室あり。\n【昼】1,000〜2,300円 【夜】3,800〜8,800円\n時間：12:00〜14:00 / 17:30〜21:30\n休み：年中無休 | ④ 長安\nカニ料理が有名な中華料理店。食べ放題メニューもあり。\n【昼】1,000〜1,800円 【夜】2,500〜12,000円\n時間：11:00〜15:00 / 17:00〜23:00\n休み：火\n\n\n1 ① | 2 ②\n3 ③ | 4 ④\n\n\n1 11時 | 2 11時30分\n3 12時 | 4 12時30分\n",
          "questions": [
            {
              "questionText": "。",
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
              "questionText": "サムさんは、木曜日の昼のできるだけ早い時間に友達と和食が食べたい。何時から食べることができるか。",
              "options": [
                "選択肢 1",
                "選択肢 2",
                "選択肢 3",
                "選択肢 4"
              ],
              "correctOption": {
                "index": 0,
                "text": "選択肢 1"
              },
              "explanation": "Question 56. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題57 (Visual Layout Format)",
          "passageText": "つぎの文章は宅配用のメニューである。右の質問に答え(注1) 宅配：商品を家に配達すること",
          "questions": [
            {
              "questionText": "シンさんはカレーライスとコーラを宅配で注文した。全部でいくら払わなければならないか。",
              "options": [
                "550円 ＋ 100円 ＝ 650円",
                "550円 ＋ 150円 ＝ 700円",
                "550円 ＋ 100円 ＋ 200円 ＝ 850円",
                "550円 ＋ 150円 ＋ 200円 ＝ 900円"
              ],
              "correctOption": {
                "index": 0,
                "text": "550円 ＋ 100円 ＝ 650円"
              },
              "explanation": "Question 57. Answer will be updated soon."
            },
            {
              "questionText": "ホルへさんは4月13日(日)の昼12時半にお弁当が20個必要である。いつ注文すればよいか。",
              "options": [
                "4月11日(金)の午後9時ごろ",
                "4月12日(土)の午後6時ごろ",
                "4月12日(土)の午後8時ごろ",
                "4月13日(日)の午前9時ごろ。答えは、1・2・3・4から最もよいものを一つえらびなさい。"
              ],
              "correctOption": {
                "index": 0,
                "text": "4月11日(金)の午後9時ごろ"
              },
              "explanation": "Question 57. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題58 (Visual Layout Format)",
          "passageText": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nカンさんは左のページの手紙を郵便でもらった。銀行の口座を作ったが、郵便局の口座はない。まだクレジットカードも持っていない。\n\n(注1) 切り取る：切ってその部分を取る。\n\n(注2) 振替：口座から自動的にお金が支払われること。",
          "questions": [
            {
              "questionText": "カンさんは何をしなければならないか。",
              "options": [
                "NATに電話をする。",
                "郵便局に行って、口座を作る。",
                "コンビニに行って、クレジットカードで払う。",
                "銀行かコンビニに行って、現金で払う。"
              ],
              "correctOption": {
                "index": 0,
                "text": "NATに電話をする。"
              },
              "explanation": "Question 58. Answer will be updated soon."
            },
            {
              "questionText": "支払いはいつまでにしなければならないか。",
              "options": [
                "5月31日",
                "6月3日",
                "6月26日",
                "6月30日"
              ],
              "correctOption": {
                "index": 0,
                "text": "5月31日"
              },
              "explanation": "Question 58. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題59 (Visual Layout Format)",
          "passageText": "右のページの文章は保証書(注1)である。下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nメイさんはテニスのラケットを買いにお店に行った。買った時、お店の人から、ラケットと一緒に右の保証書をもらった。\n\n(注1) 保証書：買った品物に問題があったら、修理したり、新しいものにとりかえると書いてある紙\n\n(注2) 購入：買うこと\n\n(注3) 破損：こわれたり傷ついたりすること\n\n(注4) 水害：雨や波によって被害を受けること",
          "questions": [
            {
              "questionText": "メイさんのラケットの保証期間はいつまでか。",
              "options": [
                "2014年7月31日",
                "2014年10月30日",
                "2015年1月31日",
                "2015年5月31日"
              ],
              "correctOption": {
                "index": 0,
                "text": "2014年7月31日"
              },
              "explanation": "Question 59. Answer will be updated soon."
            },
            {
              "questionText": "保証期間中に以下のことをしたら、ラケットがこわれた。保証してもらえるのはどれか。",
              "options": [
                "シャワールームに2日間置いてしまった。",
                "テニスコートに忘れたら、その後大雨が降って、ぬれてしまった。",
                "弟がラケットの上に座ってしまった。",
                "暑い中8時間ボールを打ち続けた。"
              ],
              "correctOption": {
                "index": 0,
                "text": "シャワールームに2日間置いてしまった。"
              },
              "explanation": "Question 59. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題60 (Visual Layout Format)",
          "passageText": "つぎの文章は、映画館のホームページである。右のページの質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nA ≪上映時間≫\n\nB ≪映画紹介≫\n\n「大きな食卓」 ･･････ 15人家族の日常生活。笑いと涙の3年間を追った記録映画。\n\n「猫と一郎」 ･･････ 一郎は7歳の少年。メガネをかけると猫と会話ができる!?\n\n「風の忍者」 ･･････ 風のように移動する忍者ハンゾー。人気マンガを映画化。\n\n「オハナ♡」 ･･････ ダンスチームの5人が世界のトップを目指す中で、いつしか家族のような関係に。オハナとはハワイの言葉で「家族」の意味。",
          "questions": [
            {
              "questionText": "グェンさんは動物が出てくる映画が見たい。午前中はアルバイトがあるが、午後は時間がある。何時から始まる映画が見られるか。",
              "options": [
                "12:25",
                "14:00",
                "14:30",
                "15:15"
              ],
              "correctOption": {
                "index": 0,
                "text": "12:25"
              },
              "explanation": "Question 60. Answer will be updated soon."
            },
            {
              "questionText": "タンさんは、午後時間ができたので映画を見ることにした。映画館にいられる時間は午後3時から午後6時までの3時間だけである。今日タンさんが、初めから終わりまで見ることができる映画は次のうちどれか。",
              "options": [
                "大きな食卓",
                "猫と一郎",
                "風の忍者",
                "オハナ♡"
              ],
              "correctOption": {
                "index": 0,
                "text": "大きな食卓"
              },
              "explanation": "Question 60. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題61 (Visual Layout Format)",
          "passageText": "つぎの文章と右のページのメールを見て、下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nウェンさんはある会社に就職したいと思い、その会社の会社説明会にホームページから申し込みをした。その後、右のページのような添付ファイルがついた確認のメールが届いた。",
          "questions": [
            {
              "questionText": "説明会に行く際、○×駅に何時に着くのが一番よいか。",
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
              "questionText": "ウェンさんは説明会の日に具合が悪くなり開始の時間に行けなくなった。どうすればよいか。",
              "options": [
                "連絡はせず、参加もしない。",
                "会社のホームページの採用案内ページからキャンセルをする。",
                "連絡はせず、遅れて参加する。",
                "会社の採用担当者に電話をする。"
              ],
              "correctOption": {
                "index": 0,
                "text": "連絡はせず、参加もしない。"
              },
              "explanation": "Question 61. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題62 (Visual Layout Format)",
          "passageText": "つぎの文章はメールマガジンである。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n注1) メールマガジン：メールで送られてくる雑誌のようなもの",
          "questions": [
            {
              "questionText": "新年会に参加したい場合、どうすればよいと書いてあるか。",
              "options": [
                "連絡はしないで、直接1月15日に○○市民会館集会室へ行く。",
                "①のURLをクリックして手続きをする。",
                "②のURLをクリックして手続きをする。",
                "④のメールアドレスにメールを送る。"
              ],
              "correctOption": {
                "index": 0,
                "text": "連絡はしないで、直接1月15日に○○市民会館集会室へ行く。"
              },
              "explanation": "Question 62. Answer will be updated soon."
            },
            {
              "questionText": "このメールマガジンをもう受け取りたくない。どうすればよいと書いてあるか。",
              "options": [
                "このメールマガジンに返信をして伝える。",
                "②のURLをクリックして手続きをする。",
                "③のURLをクリックして手続きをする。",
                "④のメールアドレスにメールを送る。"
              ],
              "correctOption": {
                "index": 0,
                "text": "このメールマガジンに返信をして伝える。"
              },
              "explanation": "Question 62. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題63 (Visual Layout Format)",
          "passageText": "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\nインターネットで買った商品が不良品だったので、チンさんが返品(注1)の希望をメールで連絡したら、以下のような返事が来た。\n\n(注1) 返品：買った品物を返すこと\n\n(注2) 不備：よくない、不十分なこと\n\n(注3) 着払い：配達の料金を、荷物などを受け取った方が払うこと\n\n(注4) 返金：お金を返すこと",
          "questions": [
            {
              "questionText": "買った商品をどうしてほしいと言っているか。",
              "options": [
                "そのまま直して使う。",
                "使わないで捨てる。",
                "○×ショップに送り、払った送料をメールで連絡する。",
                "着払いで、○×ショップに送る。"
              ],
              "correctOption": {
                "index": 0,
                "text": "そのまま直して使う。"
              },
              "explanation": "Question 63. Answer will be updated soon."
            },
            {
              "questionText": "お金はどのように戻ってくるか。",
              "options": [
                "商品を送り返さなくても、銀行の口座情報を教えるとお金が振り込まれる。",
                "商品を送ったことをメールすると、お金が振り込まれる。",
                "商品が○×ショップに届いたら、お金が現金で送られてくる。",
                "商品が○×ショップに届いたら、教えておいた口座にお金が振り込まれる。"
              ],
              "correctOption": {
                "index": 0,
                "text": "商品を送り返さなくても、銀行の口座情報を教えるとお金が振り込まれる。"
              },
              "explanation": "Question 63. Answer will be updated soon."
            }
          ]
        },
        {
          "title": "問題64 (Visual Layout Format)",
          "passageText": "つぎの文章と右のページのグラフを見て、下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。\n\n右のグラフは、好きな動物について日本人3,600人を対象に行った調査の結果である。1983年と2007年の調査結果のうち、上位1位から8位までを示している。",
          "questions": [
            {
              "questionText": "1983年と2007年で一番大きな差があらわれた動物はどれか。",
              "options": [
                "犬 (いぬ)",
                "パンダ",
                "萬 (Note: This is likely a scanning error for a kanji like 鳥 (bird), 馬 (horse), or 猫 (cat))",
                "リス"
              ],
              "correctOption": {
                "index": 0,
                "text": "犬 (いぬ)"
              },
              "explanation": "Question 64. Answer will be updated soon."
            },
            {
              "questionText": "グラフについて正しく述べているのはどれか。",
              "options": [
                "ねこは1983年と2007年で大きな差がある。",
                "うさぎは2007年の調査では3位である。",
                "パンダは1983年の調査では1位である。",
                "コアラは2007年の調査では1983年より減少している。"
              ],
              "correctOption": {
                "index": 0,
                "text": "ねこは1983年と2007年で大きな差がある。"
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
