import os
import json

BASE_DIR = r"D:\sudip_software\nihongo_playground"
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n2")
os.makedirs(OUT_DIR, exist_ok=True)

DATA = {
  "w07-d02": {
    "bookId": "zenkamoku-n2-best-workbook",
    "chapterId": "w07-d02",
    "week": 7,
    "day": 2,
    "weekTitle": "第7週",
    "dayTitle": "2日目",
    "sectionTitle": "統合理解・主張理解（長文）",
    "sectionTitleEn": "Integrated & Thematic Comprehension",
    "sections": [
      {
        "type": "integrated",
        "title": "統合理解",
        "titleEn": "Integrated comprehension",
        "imageSrc": "/images/zenkamoku_n2/w07_d02_p1.png",
        "questions": [
          {
            "number": 1,
            "stem": "SNSから情報を得ることについて、AとBはどのよう立場を取っているか",
            "imageSrc": "/images/zenkamoku_n2/w07_d02_p1.png",
            "options": [
              "1. AもBも積極的に肯定している。",
              "2. AもBも完全に否定している。",
              "3. Aは否定しているが、Bは否定的でありながら、プラスの面も認めている。",
              "4. Aは否定しているが、Bはプラスの面を挙げ、積極的に肯定している。"
            ],
            "correct": 3,
            "correctOption": "3. Aは否定しているが、Bは否定的でありながら、プラスの面も認めている。",
            "explanation": "<b>【正解】3. Aは否定しているが、Bは否定的でありながら、プラスの面も認めている。</b><br/>本文の論理構成および対比から、正解は 3 です。"
          },
          {
            "number": 2,
            "stem": "SNSの利用について、AとBの考えに合っているものはどれか。",
            "imageSrc": "/images/zenkamoku_n2/w07_d02_p1.png",
            "options": [
              "1. AもBも、発信者が明らかなところから情報を得たほうがいいと述べている。",
              "2. AもBも、一つの方法で情報を得るのではなく、新聞やテレビ、SNSなど様々な方法で情報を得るべきだと述べている。",
              "3. Aは発信者が明らかなところから情報を得るべきだと述べているが、Bは情報をいかに早く手に入れるかが重要だと述べている。",
              "4. Aは発信者が明らかなところから情報を得るべきだと述べているが、Bは発信者が明らかでなくてもSNSから情報を取ってもよいと述べている。"
            ],
            "correct": 1,
            "correctOption": "1. AもBも、発信者が明らかなところから情報を得たほうがいいと述べている。",
            "explanation": "<b>【正解】1. AもBも、発信者が明らかなところから情報を得たほうがいいと述べている。</b><br/>本文の論理構成および対比から、正解は 1 です。"
          }
        ]
      },
      {
        "type": "long_passage",
        "title": "主張理解（長文）",
        "titleEn": "Thematic comprehension (Long passages)",
        "imageSrc": "/images/zenkamoku_n2/w07_d02_p2.png",
        "questions": [
          {
            "number": 3,
            "stem": "筆者が、結婚するまでは、家庭環境の前提の違いに気づくのは難しいと述べているのはなぜか。",
            "imageSrc": "/images/zenkamoku_n2/w07_d02_p2.png",
            "options": [
              "1. 相手とはいつか必ずわかり合えるということ",
              "2. 衝突は絶対に避けられないものだということ",
              "3. 自分のやり方や考え方は、相手と同じではないということ",
              "4. 自分のやり方や考え方は、相手に否定されるということ"
            ],
            "correct": 3,
            "correctOption": "3. 自分のやり方や考え方は、相手と同じではないということ",
            "explanation": "<b>【正解】3. 自分のやり方や考え方は、相手と同じではないということ</b><br/>本文の論理構成および対比から、正解は 3 です。"
          },
          {
            "number": 4,
            "stem": "結婚したカップルの間で起こる衝突について、筆者はどのように述べているか",
            "imageSrc": "/images/zenkamoku_n2/w07_d02_p2.png",
            "options": [
              "1. 衝突は悪いものなので、なるべく避けて生活するべきである。",
              "2. 衝突を避けたければ、どちらかのやり方に合わせるべきである。",
              "3. 日々の衝突はストレスになるので、衝突しない相手を選んで結婚したほうがいい。",
              "4. 日々の衝突を避けるより、きちんと話し合ったほうが将来的には幸せになる。"
            ],
            "correct": 4,
            "correctOption": "4. 日々の衝突を避けるより、きちんと話し合ったほうが将来的には幸せになる。",
            "explanation": "<b>【正解】4. 日々の衝突を避けるより、きちんと話し合ったほうが将来的には幸せになる。</b><br/>本文の論理構成および対比から、正解は 4 です。"
          },
          {
            "number": 5,
            "stem": "家庭科を学ぶということについて、筆者はどのように考えているか",
            "imageSrc": "/images/zenkamoku_n2/w07_d02_p2.png",
            "options": [
              "1. こうあるべきだという模範解答をみんなで作っていくことである。",
              "2. 自分と同じような価値観を持つ人間を見つけられる力を育てることである。",
              "3. 社会で自立して暮らしていける技術を身につけることである。",
              "4. 互いの違いを認め、様々な立場で物事を考える力を身につけることである。"
            ],
            "correct": 4,
            "correctOption": "4. 互いの違いを認め、様々な立場で物事を考える力を身につけることである。",
            "explanation": "<b>【正解】4. 互いの違いを認め、様々な立場で物事を考える力を身につけることである。</b><br/>本文の論理構成および対比から、正解は 4 です。"
          }
        ]
      }
    ]
  },
  "w08-d01": {
    "bookId": "zenkamoku-n2-best-workbook",
    "chapterId": "w08-d01",
    "week": 8,
    "day": 1,
    "weekTitle": "第8週",
    "dayTitle": "1日目",
    "sectionTitle": "情報検索",
    "sectionTitleEn": "Information retrieval",
    "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
    "sections": [
      {
        "type": "information_retrieval",
        "title": "情報検索",
        "titleEn": "Information retrieval",
        "imageSrc": "/images/zenkamoku_n2/w08_d01_passage.png",
        "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
        "questions": [
          {
            "number": 1,
            "stem": "シェーンさんは大学で心理学を勉強している留学生である。日本語能力試験N1に合格しており、英語が話せる。週に2日夕方6時ごろから3時間アルバイトをしたいと思っている。シェーンさんが応募できる会社はいくつあるか。",
            "imageSrc": "/images/zenkamoku_n2/w08_d01_passage.png",
            "options": [
              "1. 1つ",
              "2. 2つ",
              "3. 3つ",
              "4. 4つ"
            ],
            "correct": 2,
            "correctOption": "2. 2つ",
            "explanation": "<b>【正解】2. 2つ</b><br/>シェーンさんの条件（週2日、夕方18時以降、1回3時間、英語可、N1）に当てはまる会社は2社（トークハート、居酒屋わいわい）なので、2が正解です。"
          },
          {
            "number": 2,
            "stem": "英語が母語であるサラさんは、子どもが学校へ行っている間(9:00~15:00)に働きたいと考えている。基本的なパソコン操作ができ、日本語能力試験N2に合格している。今までアルバイトをしたことはない。サラさんにとって一番収入がいい仕事はどれか。ただし、交通費は収入に含めない。",
            "imageSrc": "/images/zenkamoku_n2/w08_d01_passage.png",
            "options": [
              "1. トークハート",
              "2. 日之国屋スーパー",
              "3. 居酒屋わいわい",
              "4. Goodjobサービス"
            ],
            "correct": 2,
            "correctOption": "2. 日之国屋スーパー",
            "explanation": "<b>【正解】2. 日之国屋スーパー</b><br/>サラさんの条件（9:00〜15:00、未経験可、PC操作可、N2）で時給を比較すると日之国屋スーパーが最も収入が高くなるため、2が正解です。"
          }
        ]
      }
    ]
  },
  "w08-d02": {
    "bookId": "zenkamoku-n2-best-workbook",
    "chapterId": "w08-d02",
    "week": 8,
    "day": 2,
    "weekTitle": "第8週",
    "dayTitle": "2日目",
    "sectionTitle": "情報検索",
    "sectionTitleEn": "Information retrieval",
    "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
    "sections": [
      {
        "type": "information_retrieval",
        "title": "情報検索",
        "titleEn": "Information retrieval",
        "imageSrc": "/images/zenkamoku_n2/w08_d02_passage.png",
        "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
        "questions": [
          {
            "number": 1,
            "stem": "大学生のリンさんは、授業がない月曜日か水曜日の午後に、友達と二人で日本文化が学べる講座を受講したいと考えている。4月20日現在、リンさんたちが申し込める講座はいくつあるか",
            "imageSrc": "/images/zenkamoku_n2/w08_d02_passage.png",
            "options": [
              "1. 1つ",
              "2. 2つ",
              "3. 3つ",
              "4. 4つ"
            ],
            "correct": 1,
            "correctOption": "1. 1つ",
            "explanation": "<b>【正解】1. 1つ</b><br/>月曜または水曜の午後、未経験2名で受講できる日本文化講座は「茶道入門」の1つのみなので、1が正解です。"
          },
          {
            "number": 2,
            "stem": "会員証を持っているサリーさんは5月の講座の「イギリス式庭づくり」を受講したいと考えている。受講するには、受付カウンターにいつ何を持っていけばいいか。",
            "imageSrc": "/images/zenkamoku_n2/w08_d02_passage.png",
            "options": [
              "1. 4月25日までに会員証と5,000円と受講申込用紙を持っていく。",
              "2. 4月25日までに会員証と10,000円と受講申込用紙を持っていく。",
              "3. 4月25日までに入会金と運転免許証と5,000円と受講申込用紙を持っていく。",
              "4. 受講初日に会員証と5,000円と受講申込用紙を持っていく。"
            ],
            "correct": 1,
            "correctOption": "1. 4月25日までに会員証と5,000円と受講申込用紙を持っていく。",
            "explanation": "<b>【正解】1. 4月25日までに会員証と5,000円と受講申込用紙を持っていく。</b><br/>会員の受講申込期限と受講料、必要書類の記載から、1が正解です。"
          }
        ]
      }
    ]
  },
  "w08-d03": {
    "bookId": "zenkamoku-n2-best-workbook",
    "chapterId": "w08-d03",
    "week": 8,
    "day": 3,
    "weekTitle": "第8週",
    "dayTitle": "3日目",
    "sectionTitle": "情報検索",
    "sectionTitleEn": "Information retrieval",
    "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
    "sections": [
      {
        "type": "information_retrieval",
        "title": "情報検索",
        "titleEn": "Information retrieval",
        "imageSrc": "/images/zenkamoku_n2/w08_d03_passage.png",
        "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
        "questions": [
          {
            "number": 1,
            "stem": "市川さん夫婦は、小学生の子ども2人を連れて、7月1日から1泊2日で「にこにこキャンプ場」に宿泊する。テントを1つだけ借りて、全員温泉に1回ずつ入る予定だ。会議室と駐車場は使用しない。料金は全部でいくらか。",
            "imageSrc": "/images/zenkamoku_n2/w08_d03_passage.png",
            "options": [
              "1. 2,000円",
              "2. 13,000円",
              "3. 18,600円",
              "4. 20,200円"
            ],
            "correct": 3,
            "correctOption": "3. 18,600円",
            "explanation": "<b>【正解】3. 18,600円</b><br/>大人2名＋小学生2名、7月1日（通常料金）のテントサイト宿泊料と利用料の合計は18,600円となるため、3が正解です。"
          },
          {
            "number": 2,
            "stem": "「にこにこキャンプ場」でできることはどれか。",
            "imageSrc": "/images/zenkamoku_n2/w08_d03_passage.png",
            "options": [
              "1. 夏休みに登山部の合宿として、14歳の中学生6人だけでテントに一泊する。",
              "2. 0時から1時間ほど温泉に入り、帰りに管理室で飲み物を買ってテントに戻る。",
              "3. 調理コーナーで夕飯を作って食べたあと、テントの前で花火をして遊ぶ。",
              "4. 会社の社員研修として10時から18時まで会議室で勉強し、夜はテントで寝る。"
            ],
            "correct": 4,
            "correctOption": "4. 会社の社員研修として10時から18時まで会議室で勉強し、夜はテントで寝る。",
            "explanation": "<b>【正解】4. 会社の社員研修として10時から18時まで会議室で勉強し、夜はテントで寝る。</b><br/>キャンプ場の施設利用規定およびサービス内容から、4が正解です。"
          }
        ]
      }
    ]
  },
  "w08-d04": {
    "bookId": "zenkamoku-n2-best-workbook",
    "chapterId": "w08-d04",
    "week": 8,
    "day": 4,
    "weekTitle": "第8週",
    "dayTitle": "4日目",
    "sectionTitle": "情報検索",
    "sectionTitleEn": "Information retrieval",
    "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
    "sections": [
      {
        "type": "information_retrieval",
        "title": "情報検索",
        "titleEn": "Information retrieval",
        "imageSrc": "/images/zenkamoku_n2/w08_d04_passage.png",
        "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
        "questions": [
          {
            "number": 1,
            "stem": "北田さんは、この店で2時間半、パソコンでオンラインゲームをしたり、マンガを読んだりしようと思っている。最も安い方法で利用した場合、いくらになるか",
            "imageSrc": "/images/zenkamoku_n2/w08_d04_passage.png",
            "options": [
              "1. 1,150円",
              "2. 1,170円",
              "3. 1,200円",
              "4. 1,350円"
            ],
            "correct": 2,
            "correctOption": "2. 1,170円",
            "explanation": "<b>【正解】2. 1,170円</b><br/>2時間半の利用料金（最初の基本料金＋延長料金）の計算から、1,170円となり2が正解です。"
          },
          {
            "number": 2,
            "stem": "中野さんは、課題のレポートを書くために、6時間パソコンを利用したいと思っている。課題が早く終わったら、マンガも読みたいと思っているが、ゲームをするつもりはない。中野さんが最も安く利用するには、次のうち、どの方法がいいか。",
            "imageSrc": "/images/zenkamoku_n2/w08_d04_passage.png",
            "options": [
              "1. ゲーム席の3時間コースを利用し、超過分の延長料金を払う。",
              "2. ビジネス席の5時間コースを利用し、超過分の延長料金を払う。",
              "3. ゲーム席の5時間コースを利用して、超過分の延長料金を払う。",
              "4. ビジネス席の10時間コースを利用する。"
            ],
            "correct": 2,
            "correctOption": "2. ビジネス席の5時間コースを利用し、超過分の延長料金を払う。",
            "explanation": "<b>【正解】2. ビジネス席の5時間コースを利用し、超過分の延長料金を払う。</b><br/>ビジネス席の5時間パックを利用し、超過分を延長料金で支払うのが最も安く確実なため、2が正解です。"
          }
        ]
      }
    ]
  },
  "w08-d05": {
    "bookId": "zenkamoku-n2-best-workbook",
    "chapterId": "w08-d05",
    "week": 8,
    "day": 5,
    "weekTitle": "第8週",
    "dayTitle": "5日目",
    "sectionTitle": "情報検索",
    "sectionTitleEn": "Information retrieval",
    "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
    "sections": [
      {
        "type": "information_retrieval",
        "title": "情報検索",
        "titleEn": "Information retrieval",
        "imageSrc": "/images/zenkamoku_n2/w08_d05_passage.png",
        "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
        "questions": [
          {
            "number": 1,
            "stem": "日本の会社で働いているナビトさんはクレジットカードを作ろうと思っている。海外旅行が好きなので、海外旅行の保険が充実していて、ポイントが高く付くものがいい。30歳のナビトさんことって一番いいカードはどれか",
            "imageSrc": "/images/zenkamoku_n2/w08_d05_passage.png",
            "options": [
              "1. BIZAカード",
              "2. デビューaカード",
              "3. プレミアムカード",
              "4. スタイルカード"
            ],
            "correct": 3,
            "correctOption": "3. プレミアムカード",
            "explanation": "<b>【正解】3. プレミアムカード</b><br/>海外旅行傷害保険が手厚く付帯しているプレミアムカードが目的に合致するため、3が正解です。"
          },
          {
            "number": 2,
            "stem": "20歳の留学生のミンさんは初めてクレジットカードを作る。年会費がずっとかからないものがいい。ミンさんが選べるカードはいくつあるか",
            "imageSrc": "/images/zenkamoku_n2/w08_d05_passage.png",
            "options": [
              "1. 1つ",
              "2. 2つ",
              "3. 3つ",
              "4. 4つ"
            ],
            "correct": 1,
            "correctOption": "1. 1つ",
            "explanation": "<b>【正解】1. 1つ</b><br/>学生・20歳で年会費永年無料の条件に当てはまるカードは1種類のみであるため、1が正解です。"
          }
        ]
      }
    ]
  }
}

for chapter_id, chapter_data in DATA.items():
    out_path = os.path.join(OUT_DIR, f"{chapter_id}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Generated {out_path}")
