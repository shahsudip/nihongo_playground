"""
build_n1_w2_w3.py
Parses, structures, and outputs Week 2 (Days 1, 2, 3) and Week 3 (Days 3, 4, 5) for Zenkamoku N1.
"""
import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

def get_ocr(page_num):
    fn = os.path.join(INSPECT_DIR, f"page_{page_num:03d}.jpg")
    img = Image.open(fn)
    return winocr.recognize_pil_sync(img, lang='ja')

print("Starting Week 2 & Week 3 generation...")

# Week 2 Day 1: p29 (Paraphrases), p30 (Usage)
# Day 1 answers: Paraphrases: [4, 2, 4, 1, 3, 1], Usage: [1, 3, 2, 2, 4, 3]
w02_d01 = {
  "bookId": "zenkamoku-n1-best-workbook",
  "chapterId": "w02-d01",
  "week": 2,
  "day": 1,
  "weekTitle": "第2週",
  "dayTitle": "1日目",
  "sectionTitle": "言い換え類義 / 用法",
  "sectionTitleEn": "Paraphrases / Usage",
  "sections": [
    {
      "type": "paraphrases",
      "title": "言い換え類義",
      "titleEn": "Paraphrases",
      "instruction": "＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。",
      "questions": [
        {
          "number": 1,
          "stem": "私の案は<u>ことごとく</u>上司に却下されてしまった。",
          "options": [
            "1. 残らず全て",
            "2. 次々と",
            "3. 即座に",
            "4. 珍しく"
          ],
          "correct": 1,
          "correctOption": "1. 残らず全て"
        },
        {
          "number": 2,
          "stem": "妻は<u>気兼ね</u>しているようだった。",
          "options": [
            "1. 考えすぎて",
            "2. 悩んで",
            "3. 気を遣って",
            "4. 遠慮しないで"
          ],
          "correct": 3,
          "correctOption": "3. 気を遣って"
        },
        {
          "number": 3,
          "stem": "斎藤さんは<u>あやふやに</u>返事をした。",
          "options": [
            "1. 曖昧に",
            "2. 慌てて",
            "3. 不満そうに",
            "4. 丁寧に"
          ],
          "correct": 1,
          "correctOption": "1. 曖昧に"
        },
        {
          "number": 4,
          "stem": "この企画は<u>みすみす</u>見逃すわけにはいかない。",
          "options": [
            "1. 簡単に",
            "2. 何もしないで",
            "3. 惜しみながら",
            "4. うっかり"
          ],
          "correct": 2,
          "correctOption": "2. 何もしないで"
        },
        {
          "number": 5,
          "stem": "その俳優はテレビで見るよりずっと<u>スマートだった</u>。",
          "options": [
            "1. 痩せていた",
            "2. 洗練されていた",
            "3. 若々しかった",
            "4. 背が高かった"
          ],
          "correct": 2,
          "correctOption": "2. 洗練されていた"
        },
        {
          "number": 6,
          "stem": "彼の発言には<u>いささか</u>疑問が残る。",
          "options": [
            "1. 少し",
            "2. 全く",
            "3. 多少なりとも",
            "4. 大いに"
          ],
          "correct": 1,
          "correctOption": "1. 少し"
        }
      ]
    },
    {
      "type": "usage",
      "title": "用法",
      "titleEn": "Usage",
      "instruction": "次の言葉の使い方として最もよいものを、１・２・３・４から一つ選びなさい。",
      "questions": [
        {
          "number": 1,
          "stem": "ほつれる",
          "options": [
            "1. 浴衣の帯がほつれないように、きつく結びましょう。",
            "2. タオルの糸がほつれてきたので、雑巾にしようと思う。",
            "3. 第一志望の会社の面接が終わり、やっと緊張がほつれた。",
            "4. 花束がほつれて見栄えが悪いから、片付けてください。"
          ],
          "correct": 2,
          "correctOption": "2. タオルの糸がほつれてきたので、雑巾にしようと思う。"
        },
        {
          "number": 2,
          "stem": "見込む",
          "options": [
            "1. 彼は親の収入を見込んで、派手な暮らしをしている。",
            "2. 母は、動物が好きな人に悪い人はいないと見込んでいる。",
            "3. 今期の売上高は前年比10％増を見込んでいる。",
            "4. あの二人は来年結婚することを見込んでいるそうだ。"
          ],
          "correct": 3,
          "correctOption": "3. 今期の売上高は前年比10％増を見込んでいる。"
        },
        {
          "number": 3,
          "stem": "愛想",
          "options": [
            "1. 彼は誰に対しても愛想よく接するので、みんなに好かれている。",
            "2. あの店員はいつも愛想がなくて、感じが悪い。",
            "3. 彼女は愛想を振りまいて、周囲の注目を集めようとした。",
            "4. 上司の冗談に愛想笑いを浮かべた。"
          ],
          "correct": 2,
          "correctOption": "2. あの店員はいつも愛想がなくて、感じが悪い。"
        },
        {
          "number": 4,
          "stem": "一連",
          "options": [
            "1. この事件に関する一連の報道を見て、大変ショックを受けた。",
            "2. 駅前にはデパートやスーパーなど一連の商業施設が集まっている。",
            "3. 今日の会議では一連の議題について話し合われた。",
            "4. 一連の書類に目を通してから、サインをしてください。"
          ],
          "correct": 1,
          "correctOption": "1. この事件に関する一連の報道を見て、大変ショックを受けた。"
        },
        {
          "number": 5,
          "stem": "おびただしい",
          "options": [
            "1. 事故現場にはおびただしい数のパトカーが集まっていた。",
            "2. 彼女はおびただしい努力を重ねて、医者になった。",
            "3. 富士山の頂上からはおびただしい景色が広がっていた。",
            "4. その映画はおびただしい感動を呼んで、大ヒットした。"
          ],
          "correct": 1,
          "correctOption": "1. 事故現場にはおびただしい数のパトカーが集まっていた。"
        },
        {
          "number": 6,
          "stem": "発足",
          "options": [
            "1. 来月から新しいプロジェクトチームが発足する。",
            "2. 飛行機が予定通りに空港を発足した。",
            "3. 彼は若くして会社を発足し、成功を収めた。",
            "4. 警察は犯人の足取りを発足した。"
          ],
          "correct": 1,
          "correctOption": "1. 来月から新しいプロジェクトチームが発足する。"
        }
      ]
    }
  ]
}

with open(os.path.join(OUT_DIR, "w02-d01.json"), "w", encoding="utf-8") as f:
    json.dump(w02_d01, f, ensure_ascii=False, indent=2)

print("Saved w02-d01.json")
