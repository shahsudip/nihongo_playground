import re
import json
import sys

# Ensure stdout uses UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# 1. Parse all questions
def parse_all_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    questions = []
    current_q = None
    state = "seeking"
    
    line_start_num_re = re.compile(r'^(\d+)(?:\s+\[(Moji|Goi|Bunpou|Moji/Goi|Moji/Bunpou|Moji/Goi/Bunpou)\])?\s*(.*)$', re.IGNORECASE)
    option_line_re = re.compile(r'^([1234]|[１２３４])[\s　.．、)）](.*)$')
    inline_options_re = re.compile(r'([1234]|[１２３４])[\s　.．、)）](.+?)(?=\s+[1234１２３４][\s　.．、)）]|\s*$)')

    for line_idx, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("Week") or "Questions" in line or "Here is the continuation" in line or line.startswith("Page"):
            continue
            
        match = line_start_num_re.match(line)
        if match:
            num = int(match.group(1))
            q_type = match.group(2).lower() if match.group(2) else "general"
            rest_of_line = match.group(3).strip()
            
            expected_next = (current_q["number"] + 1) if current_q else 1
            is_question = False
            
            if num > 4:
                is_question = True
            elif num == expected_next:
                is_question = True
                
            if is_question:
                if current_q:
                    questions.append(current_q)
                    
                inline_opts = inline_options_re.findall(rest_of_line)
                has_inline = False
                if inline_opts:
                    num_map = {'１': '1', '２': '2', '３': '3', '４': '4'}
                    mapped_nums = [int(num_map.get(o[0], o[0])) for o in inline_opts]
                    if 1 in mapped_nums:
                        has_inline = True
                        
                if has_inline:
                    options = []
                    first_opt_match = re.search(r'(?:^|\s)([1１])[\s　.．、)）]', rest_of_line)
                    if first_opt_match:
                        q_text_only = rest_of_line[:first_opt_match.start()].strip()
                    else:
                        q_text_only = rest_of_line
                        
                    for opt_num_char, opt_text in inline_opts:
                        options.append(opt_text.strip())
                        
                    current_q = {
                        "number": num,
                        "type": q_type,
                        "questionText": q_text_only,
                        "options": options,
                        "line_num": line_idx + 1
                    }
                    state = "options"
                else:
                    current_q = {
                        "number": num,
                        "type": q_type,
                        "questionText": rest_of_line,
                        "options": [],
                        "line_num": line_idx + 1
                    }
                    state = "question_text"
                continue
                
        opt_match = option_line_re.match(line)
        if opt_match and current_q:
            opt_text = opt_match.group(2).strip()
            current_q["options"].append(opt_text)
            state = "options"
            continue
            
        if current_q:
            if current_q["number"] <= 265:
                if len(current_q["options"]) < 4:
                    current_q["options"].append(line)
                    state = "options"
                else:
                    current_q["options"][-1] += "\n" + line
            else:
                if state == "question_text":
                    current_q["questionText"] += "\n" + line
                elif state == "options":
                    if current_q["options"]:
                        current_q["options"][-1] += "\n" + line
                    else:
                        current_q["options"].append(line)

    if current_q:
        questions.append(current_q)
        
    return questions

# 2. Filter duplicates
parsed = parse_all_questions("extracted_text.txt")
unique = {}
for q in parsed:
    num = q["number"]
    if num not in unique:
        unique[num] = q
        
sorted_nums = sorted(unique.keys())
final_questions = [unique[n] for n in sorted_nums]
print(f"Parsed {len(final_questions)} unique questions.")

# 3. Create Week-Day segments
book_chapters = []

for week in range(1, 5):
    # Determine the index range in final_questions for this week
    # Week 1: 0 - 124
    # Week 2: 125 - 249
    # Week 3: 250 - 374
    # Week 4: 375 - 499
    week_start_idx = (week - 1) * 125
    week_questions = final_questions[week_start_idx : week_start_idx + 125]
    
    for day in range(1, 8):
        # Determine day slices inside the week questions (which is 125 questions)
        # Day 1: 0-14 (15 qs)
        # Day 2: 15-29 (15 qs)
        # Day 3: 30-44 (15 qs)
        # Day 4: 45-59 (15 qs)
        # Day 5: 60-74 (15 qs)
        # Day 6: 75-89 (15 qs)
        # Day 7: 90-124 (35 qs)
        if day < 7:
            day_start = (day - 1) * 15
            day_end = day_start + 15
            q_slice = week_questions[day_start:day_end]
            chap_type = "questions-only"
            desc = f"Week {week} Day {day}: 15 vocabulary and grammar exercises."
        else:
            q_slice = week_questions[90:125]
            chap_type = "day-challenge"
            desc = f"Week {week} Day 7: Comprehensive review of the week's exercises (35 questions)."
            
        # Format the questions for JS
        formatted_qs = []
        for q in q_slice:
            opts = q["options"]
            # Fallback placeholder answer
            ans_text = opts[0] if opts else "Option 1"
            formatted_qs.append({
                "questionText": q["questionText"],
                "options": opts,
                "correctOption": {
                    "index": 0,
                    "text": ans_text
                },
                "explanation": f"Question {q['number']} ({q['type'].upper()}). Answer will be updated soon."
            })
            
        chap_id = f"w{week}-d{day}"
        chap_title = f"Week {week} - Day {day}" if day < 7 else f"Week {week} - Day 7 Review"
        
        book_chapters.append({
            "id": chap_id,
            "title": chap_title,
            "type": chap_type,
            "description": desc,
            "passages": [
                {
                    "title": chap_title,
                    "passageText": "",
                    "questions": formatted_qs
                }
            ]
        })

# 4. Generate Book Object
shin_book = {
    "id": "shin-nihongo-500-n3",
    "title": "Shin Nihongo 500 Mon N3",
    "description": "Improve your vocabulary, kanji, and grammar for the JLPT N3. Features a structured 4-week daily challenge program.",
    "coverUrl": "",
    "level": "N3",
    "category": "Drill",
    "chapters": book_chapters
}

# 5. Load original book data
original_books_str = """// src/data/book_data.jsx

export const sampleBooks = [
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
            passageText: "たなか：すみません、これはいくらですか。\\n店員：それは三千円（さんぜんえん）です。\\nたなか：そうですか。じゃあ、あの時計（とけい）はいくらですか。\\n店員：あれは一万円（いちまんえん）です。\\nたなか：うわぁ、高いですね。じゃあ、その時計をください。\\n店員：ありがとうございます。",
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
            passageText: "【中央図書館からのお知らせ】\\n\\n新しいうちの図書館システムへの移行のため、以下の期間は休館（きゅうかん）いたします。\\n\\n期間：７月１０日（月曜日）〜７月１４日（金曜日）\\n\\n※この期間は本の貸出（かしだし）と返却（へんきゃく）はできません。\\n※返却ポストも使用できませんので、本は１５日以降にカウンターへお持ちください。\\n※ご迷惑をおかけしますが、ご理解をお願いいたします。",
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
            passageText: "最近、スマートフォンやSNSの普及によって、私たちのコミュニケーションの形は大きく変わりました。いつでも、どこでも、誰とでもすぐにつながることができるようになり、非常に便利になりました。しかし、その一方で、直接会って話す機会が減っていると感じる人も多いようです。\\n\\n文字だけのやり取りでは、相手の表情や声のトーンが分からないため、誤解が生じることもあります。例えば、冗談のつもりで送った言葉が、相手を怒らせてしまうことがあります。顔を見て話していれば、そのような誤解はすぐに解けるはずです。\\n\\nもちろん、SNSには良い点もたくさんあります。遠く離れた友人の近況を知ることができたり、共通の趣味を持つ人と簡単に出会えたりします。大切なのは、デジタルなコミュニケーションと、対面でのコミュニケーションのバランスを上手にとることではないでしょうか。",
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
];
"""

# Let's read the original books from JS string and parse it, but we can also just format the new book as JS code
new_book_js = json.dumps(shin_book, ensure_ascii=False, indent=2)

# We will combine them by replacing the end of the array `];` of original books with:
# `, \n` + new_book_js + `\n];`
full_js_content = original_books_str.strip()
if full_js_content.endswith("];"):
    full_js_content = full_js_content[:-2] + ",\n" + new_book_js + "\n];\n"
else:
    # Fallback just in case
    full_js_content += "\n// Error parsing ending, appended manual\nexport const shin500 = " + new_book_js + ";"

with open("src/data/book_data.jsx", "w", encoding="utf-8") as f:
    f.write(full_js_content)

print("Generated src/data/book_data.jsx successfully!")
