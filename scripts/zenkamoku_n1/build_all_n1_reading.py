"""
build_all_n1_reading.py
Systematically generates and updates all reading and remaining chapters for Zenkamoku N1:
- Week 5: Days 1 to 5 (Short reading)
- Week 6: Days 1 to 5 (Mid-size reading)
- Week 7: Day 3 (Long reading & Integrated)
- Week 8: Day 2 (Thematic Long reading & Info search)
- Week 9: Days 3, 4, 5 (Listening task & point)
"""
import sys, os, json, re

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

# =========================================================================
# WEEK 5: SHORT READING (短文読解 5 DAYS, 4 PASSAGES EACH = 20 QS)
# =========================================================================

w05_d01 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w05-d01",
  "week": 5,
  "day": 1,
  "weekTitle": "第5週",
  "dayTitle": "1日目",
  "sectionTitle": "内容理解（短文）",
  "sectionTitleEn": "Reading Comprehension (Short)",
  "instruction": "次の(1)から(4)の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。",
  "sections": [
    {
      "type": "short_passage",
      "title": "内容理解（短文） (1)",
      "titleEn": "Short Passage (1)",
      "pageRef": "p.66",
      "passage": "<div class=\"speed-master-lined-paper\">\n　人間のエネルギー源のひとつに、間違いなく「劣等感」があると私は考えている。すべての人がもっている「劣等感」。そしてそれを「優越感」に変えるための決意。\n　その決意をした瞬間に、エネルギーが発生する。そして今もっている「劣等感」と目指す「優越感」の距離が遠ければ遠いほど巨大なエネルギーが発生するのだ。\n　今まで数多く出会ってきた「社長」と呼ばれる人たちにも、強烈な「劣等感」をもっている人が多い。「社長」と呼ばれる人種は、世間で思われているほど優秀な人たちばかりではない。ただ、彼らの違うところは、劣等感を劣等感のままで置いておかなかったことである。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（安川雅生『採用の超プロが教える仕事の選び方・人生の選び方』サンマーク出版による）</div>\n</div>",
      "questions": [
        {
          "number": 1,
          "stem": "筆者の考えに合うものはどれか。",
          "options": [
            "1. 劣等感を強く感じたことがある人は社会的地位が高くなる。",
            "2. 劣等感を優越感に転化しようと決心することで力が出てくる。",
            "3. 劣等感を払拭しようとするのではなく、持ち続けることが成功につながる。",
            "4. 劣等感と優越感があればあるほどエネルギーは強くなっていく。"
          ],
          "correct": 2,
          "correctOption": "2. 劣等感を優越感に転化しようと決心することで力が出てくる。"
        }
      ]
    },
    {
      "type": "short_passage",
      "title": "内容理解（短文） (2)",
      "titleEn": "Short Passage (2)",
      "pageRef": "p.67",
      "passage": "<div class=\"speed-master-lined-paper\">\n　古来、人間の食事には、栄養の補給以外にも他者との関係の維持や調整という機能が付与されてきた。いやむしろ、他者といい関係をつくるために食事の場や調度<sup>(注)</sup>、食器、メニュー、調理法、服装からマナーにいたるまで、多様な技術が考案されてきたといっても過言ではない。どの文化でも社交の場として食事を機能させるために、莫大な時間と金を消費してきたのである。それは効率化とはむしろ逆行する特徴をもっている。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（山極寿一『ゴリラからの警告「人間社会、ここがおかしい」』毎日新聞出版による）</div>\n</div>",
      "passageNote": "(注) 調度：日常的に使う身の回りの道具類",
      "questions": [
        {
          "number": 2,
          "stem": "この文章で筆者が述べていることは何か。",
          "options": [
            "1. 人間の食事の仕方を見ると、効率的とは言えない。",
            "2. 栄養を補給するだけの食事は効率的とは言えない。",
            "3. 多様な技術を使わない食事は効率的とは言えない。",
            "4. 手間をかけずに食事するのは効率的とは言えない。"
          ],
          "correct": 1,
          "correctOption": "1. 人間の食事の仕方を見ると、効率的とは言えない。"
        }
      ]
    },
    {
      "type": "short_passage",
      "title": "内容理解（短文） (3)",
      "titleEn": "Short Passage (3)",
      "pageRef": "p.68",
      "passage": "<div class=\"speed-master-lined-paper\">\n　ただ何となく生きてきたのが児童期だとすると、青年期になると「こうありたい自分」というものを意識するようになる。それを「理想自己」という。現実の自分を「現実自己」という。児童期には現実自己をただひたすら生きていた。ところが、青年期になると、理想自己というものを思い描くようになり、現実自己を理想自己と比較するようになる。そこで、理想自己にまだまだ届かない現実の自分を意識せざるを得ないため、自分に満足しにくくなるというわけだ。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（榎本博明『<自分らしさ>って何だろう？自分と向き合う心理学』筑摩書房による）</div>\n</div>",
      "questions": [
        {
          "number": 3,
          "stem": "文章の内容に合うのはどれか。",
          "options": [
            "1. 青年期になると「こうありたい自分」が明確になり、その差を埋めようとする。",
            "2. 児童期は比較する自己がないため、自分は理想的な存在だという自信が持てる。",
            "3. 児童期は自己が一つしかないが、青年期は二つの自己のはざまで悩むことがある。",
            "4. 青年期は思い描く理想自己に現実自己を近づけていくことに満足感を感じる。"
          ],
          "correct": 3,
          "correctOption": "3. 児童期は自己が一つしかないが、青年期は二つの自己のはざまで悩むことがある。"
        }
      ]
    },
    {
      "type": "short_passage",
      "title": "内容理解（短文） (4)",
      "titleEn": "Short Passage (4)",
      "pageRef": "p.69",
      "passage": "<div class=\"speed-master-lined-paper\">\n　メキシコから来たＡさんは「私は地球人です。どこへ行ってもそこが故郷です」と言っています。彼の意識の中には、メキシコ人とそれ以外の国の人を区別するなどという考えは存在しないのです。私たち日本人の意識の中には、他国の人を分けて考えてしまうという傾向があるようです。しかし、日本が島国で、他国との交流が少なかったのはもう昔の話です。毎年海外へ出かける人が一千万人を超え、海外から日本へやってくる人が三千万人を超えているというのに、いつまでも「外人」「外国人」などという意識ではおかしいのではないでしょうか。\n<div class=\"text-right text-sm text-gray-500 mt-2\">（小林美恵子・高取恒・富谷玲子・石川克枝・中丸美都子『日本人にも外国人にも心地よい日本語――共生社会の日本語』明石書店による）</div>\n</div>",
      "questions": [
        {
          "number": 4,
          "stem": "筆者の考えに合うものはどれか。",
          "options": [
            "1. 日本人は、自国の人と他国の人を区別するという考えを変えるべきである。",
            "2. 「外人」「外国人」という意識を日本人が捨てないから、海外からの訪問客が伸び悩んでいる。",
            "3. メキシコ人の考えを取り入れれば、自国と他国を区別する意識が日本からなくなっていくだろう。",
            "4. 日本は島国であるため、他国との交流が少ないのは仕方がないことである。"
          ],
          "correct": 1,
          "correctOption": "1. 日本人は、自国の人と他国の人を区別するという考えを変えるべきである。"
        }
      ]
    }
  ]
}

with open(os.path.join(OUT_DIR, "w05-d01.json"), "w", encoding="utf-8") as f:
    json.dump(w05_d01, f, ensure_ascii=False, indent=2)

print("Saved w05-d01.json")
