import winocr
import asyncio
import sys
import os
import re
import json
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = r"D:\sudip_software\nihongo_playground"
IN_DIR = os.path.join(PROJECT_ROOT, "tmp_inspect", "zenkamoku_n2")
KEY_FILE = os.path.join(PROJECT_ROOT, "scripts", "zenkamoku_n2", "answer_keys_raw.json")
OUT_DATA_DIR = os.path.join(PROJECT_ROOT, "src", "data", "zenkamoku_n2")
os.makedirs(OUT_DATA_DIR, exist_ok=True)

with open(KEY_FILE, "r", encoding="utf-8") as f:
    ANSWER_KEYS = json.load(f)

# Helper: group words into lines
def group_words_into_lines(words, y_thresh=16):
    sorted_words = sorted(words, key=lambda w: (w['y'], w['x']))
    lines = []
    for w in sorted_words:
        matched = False
        for line in lines:
            if abs(line['y'] - w['y']) <= y_thresh:
                line['words'].append(w)
                line['y'] = sum(x['y'] for x in line['words']) / len(line['words'])
                matched = True
                break
        if not matched:
            lines.append({'y': w['y'], 'words': [w]})
    for line in lines:
        line['words'].sort(key=lambda w: w['x'])
        text = "".join(w['text'].strip() for w in line['words'] if w['text'].strip())
        line['text'] = text
        line['x'] = line['words'][0]['x']
    lines.sort(key=lambda l: l['y'])
    return lines

async def get_page_lines(p):
    im_path = os.path.join(IN_DIR, f"page_{p:03d}.jpg")
    if not os.path.exists(im_path):
        return []
    im = Image.open(im_path)
    res = await winocr.recognize_pil(im, lang='ja')
    words = []
    for l in res.lines:
        for w in l.words:
            # Exclude side tabs
            if w.bounding_rect.x < 50 or w.bounding_rect.x > 1180:
                continue
            # Exclude footer page number
            if w.bounding_rect.y > 1650:
                continue
            words.append({
                'text': w.text,
                'x': w.bounding_rect.x,
                'y': w.bounding_rect.y,
                'w': w.bounding_rect.width,
                'h': w.bounding_rect.height
            })
    return group_words_into_lines(words)

def clean_japanese_ocr_errors(text):
    fixes = [
        ("就し村職しよく率", "就職率"),
        ("就し一う職し:(率", "就職率"),
        ("い就う職し以", "就職"),
        ("せ請三一求", "請求"),
        ("せ請いき求物う", "請求"),
        ("か開いさ催いにーっし、て", "開催について"),
        ("ど同う僚り", "同僚"),
        ("診しんさ察つ室", "診察室"),
        ("お黄うご金ん期き", "黄金期"),
        ("固こら着せ性い", "固着性"),
        ("繰くりか返えし", "繰り返し"),
        ("い挑うせ戦んと", "挑戦と"),
        ("お抑さえない", "抑えない"),
        ("お抑さえる", "抑える"),
        ("立りつ派は", "立派"),
        ("好きさ嫌らい", "好き嫌い"),
        ("糖とうぶ分ん", "糖分"),
        ("え栄い養よう", "栄養"),
        ("嫌きらわれる", "嫌われる"),
        ("暗くらや闇み", "暗闇"),
        ("暗くらや闇", "暗闇"),
        ("衝しと突っ", "衝突"),
        ("視しい聴らし者ゃ", "視聴者"),
        ("栃とち木ぎけ県んあ足しか利が市し", "栃木県足利市"),
        ("目玉模も様よう", "目玉模様"),
        ("お雄す", "雄"),
        ("た誰れか", "誰か"),
        ("か感ん謝しゃ", "感謝"),
        ("購こうに入物う", "購入"),
        ("こ購うに入宿う", "購入"),
        ("ナピトさん", "ナビトさん"),
        ("ピジネス席", "ビジネス席"),
        ("いし、。", "いい。"),
        ("につし、て", "について"),
        ("にーっし、て", "について"),
        ("持っとよい", "持つとよい"),
        ("育っこと", "育つこと"),
        ("入すること", "購入すること"),
        ("企き業う", "企業"),
        ("て提いき供よう", "提供"),
        ("好このみ", "好み"),
        ("隙すき間ま", "隙間"),
        ("変へん革かく", "変革"),
        ("変へん貌ぼう", "変貌"),
    ]
    for src, dst in fixes:
        text = text.replace(src, dst)
    return text

def clean_stem(raw):
    s = re.sub(r'^[\[［【]\s*[^\]］】]*\s*[\]］】]\s*', '', raw)
    s = re.sub(r'^\d+[\s\.\、]+', '', s)
    s = re.sub(r'^[・ー\s]+', '', s)
    s = clean_japanese_ocr_errors(s)
    s = s.strip()
    return s

def clean_opt_text(raw, num):
    s = re.sub(r'^\s*' + str(num) + r'[\s\.\、]*', '', raw)
    s = clean_japanese_ocr_errors(s)
    s = s.strip()
    return f"{num}. {s}"

# Fallback clean stems for any question that was clipped
STEM_OVERRIDES = {
    # Week 6 Day 1
    ("w06", "d01", 1): "「これ」とは何か。",
    # Week 6 Day 2
    ("w06", "d02", 9): "この文章からわかることは何か。",
    # Week 6 Day 3
    ("w06", "d03", 1): "「黄金期」とはどんな時期か。",
    ("w06", "d03", 7): "「答えようがないかもしれません」とあるが、なぜか。",
    # Week 6 Day 4
    ("w06", "d04", 4): "「これ」とは何を指しているのか。",
    ("w06", "d04", 7): "「そんな時代」とは、具体的にどんな時代か。",
    # Week 6 Day 5
    ("w06", "d05", 4): "「笑う気にはなれない」とあるが、なぜか。",
    # Week 7 Day 1
    ("w07", "d01", 1): "マンションを購入することについて、AとBはどのように考えているか。",
    # Week 7 Day 2
    ("w07", "d02", 2): "SNSの利用について、AとBの考えに合っているものはどれか。",
    ("w07", "d02", 3): "筆者が、結婚するまでは、家庭環境の前提の違いに気づくのは難しいと述べているのはなぜか。",
    # Week 7 Day 3
    ("w07", "d03", 2): "女性の活躍について、AとBはどのように考えているか。",
    # Week 7 Day 4
    ("w07", "d04", 2): "外国語を学ぶことについて、AとBはどのように考えているか。",
    ("w07", "d04", 3): "「コミュニケーションしないでいることの方が難しいくらいである」とはどういうことか。",
    # Week 8 Day 1
    ("w08", "d01", 1): "シェーンさんは大学で心理学を勉強している留学生である。日本語能力試験N1に合格しており、英語が話せる。週に2日夕方6時ごろから3時間アルバイトをしたいと思っている。シェーンさんが応募できる会社はいくつあるか。",
    # Week 8 Day 3
    ("w08", "d03", 1): "市川さん夫婦は、小学生の子ども2人を連れて、7月1日から1泊2日で「にこにこキャンプ場」に宿泊する。テントを1つだけ借りて、全員温泉に1回ずつ入る予定だ。会議室と駐車場は使用しない。料金は全部でいくらか。",
    ("w08", "d03", 2): "「にこにこキャンプ場」でできることはどれか。",
}

EXPLANATIONS = {
    # Week 5 Day 1
    ("w05", "d01", 1): "「自分の人生を生きるには、他人をどうするかではなく、自分をどうするかを常に考えないといけない」「まずは自分の変えられる範囲のことから変えていく」とあることから、3が正解です。",
    ("w05", "d01", 2): "「さて、来月予定しておりました〜下記の通り会場が変更となりますことをお知らせいたします」とあることから、4が正解です。",
    ("w05", "d01", 3): "「私は欲を持つことこそが成長への近道になると信じている」とあることから、2が正解です。",
    ("w05", "d01", 4): "「子どもが言いつけ通りにしているときよりも、言いつけに背いたときに親が大きな関心を向けていると、子どもは言いつけに背くようになります」とあることから、3が正解です。",
    ("w05", "d01", 5): "「目的を決めるときは『不快からの逃避』ではなく、『快の追求』をもとに考えるのがポイントです」とあり、早起きの目的は楽しめるものがよいと述べているため、3が正解です。",

    # Week 5 Day 2
    ("w05", "d02", 1): "「津波てんでんこ」という教育により、それぞれが自分で考えて高台へ逃げたことから、3が正解です。",
    ("w05", "d02", 2): "受診申込用紙は9月15日までに提出する必要があり、期限までに提出しないと希望日に受けられない可能性があるため、3が正解です。",
    ("w05", "d02", 3): "冒頭の「文学は〜隙間を読者の『好み』によって埋めさせる娯楽なのである」から、1が正解です。",
    ("w05", "d02", 4): "「少数派の人間は、意見が違っても敵だとは考えない」「違う意見をぶつけることで、もっと良い結果になると知っている」とあることから、2が正解です。",
    ("w05", "d02", 5): "「創造力の土台には、知識の詰め込みがある」とあり、創造力には知識が必要であると述べているため、3が正解です。",

    # Week 5 Day 3
    ("w05", "d03", 1): "「提供するモノやサービスにどれだけ意味をもたせられるかを考えるべき」とあり、2が正解です。",
    ("w05", "d03", 2): "アリ植物の枝の中に住み、アリ植物を守っていることから、4が正解です。",
    ("w05", "d03", 3): "感情を抑えることが常に正解ではないと述べているため、4が正解です。",
    ("w05", "d03", 4): "ゲームが芸術のひとつとして認められるかという議論について述べているため、2が正解です。",
    ("w05", "d03", 5): "クレジットカード会社から利用料金が請求されることを知らせているため、1が正解です。",

    # Week 5 Day 4
    ("w05", "d04", 1): "「負けるのが嫌い」という意味なのに「負けず嫌い（負けないことが嫌い）」という言葉になっている不思議さを述べているため、3が正解です。",
    ("w05", "d04", 2): "ノートパソコンではなく周辺機器のセール開催を知らせているため、2が正解です。",
    ("w05", "d04", 3): "言葉の選び方ひとつで相手の受ける印象や行動が変わることを述べているため、4が正解です。",
    ("w05", "d04", 4): "就職率が高いからといって本当に就職に強い大学とは限らないことを論じているため、4が正解です。",
    ("w05", "d04", 5): "目玉模様の数が多い雄ほど生存力・生命力が強いと述べているため、4が正解です。",

    # Week 5 Day 5
    ("w05", "d05", 1): "誰かを許せないでいると、その人のことばかり考えて余計な労力を使うため、3が正解です。",
    ("w05", "d05", 2): "事前にどんなことが起きるかイメージしておくことで、新しい環境でも落ち着いて適応できるため、1が正解です。",
    ("w05", "d05", 3): "「地球に優しく」という言葉には人間が自然の上に立っているような傲慢さが感じられるため、2が正解です。",
    ("w05", "d05", 4): "時代が変わればことわざの表現も受け入れやすい形に変えていく必要があると述べているため、4が正解です。",
    ("w05", "d05", 5): "宮部さんが同僚たちに向けて退職の挨拶と感謝を伝えているメールであるため、3が正解です。",

    # Week 8 Day 1
    ("w08", "d01", 1): "シェーンさんの条件（週2日、夕方18時以降、1回3時間、英語可、N1）に当てはまる会社は2社（トークハート、居酒屋わいわい）なので、2が正解です。",
    ("w08", "d01", 2): "サラさんの条件（9:00〜15:00、未経験可、PC操作可、N2）で時給を比較すると日之国屋スーパーが最も収入が高くなるため、2が正解です。",

    # Week 8 Day 2
    ("w08", "d02", 1): "月曜または水曜の午後、未経験2名で受講できる日本文化講座は「茶道入門」の1つのみなので、1が正解です。",
    ("w08", "d02", 2): "会員の受講申込期限と受講料、必要書類の記載から、1が正解です。",

    # Week 8 Day 3
    ("w08", "d03", 1): "大人2名＋小学生2名、7月1日（通常料金）のテントサイト宿泊料と利用料の合計は18,600円となるため、3が正解です。",
    ("w08", "d03", 2): "キャンプ場の施設利用規定およびサービス内容から、4が正解です。",

    # Week 8 Day 4
    ("w08", "d04", 1): "2時間半の利用料金（最初の基本料金＋延長料金）の計算から、1,170円となり2が正解です。",
    ("w08", "d04", 2): "ビジネス席の5時間パックを利用し、超過分を延長料金で支払うのが最も安く確実なため、2が正解です。",

    # Week 8 Day 5
    ("w08", "d05", 1): "海外旅行傷害保険が手厚く付帯しているプレミアムカードが目的に合致するため、3が正解です。",
    ("w08", "d05", 2): "学生・20歳で年会費永年無料の条件に当てはまるカードは1種類のみであるため、1が正解です。",
}

def parse_single_q(lines, y_min, y_max, q_num):
    q_lines = [l for l in lines if y_min <= l['y'] <= y_max]
    stem_parts = []
    opts = {1: [], 2: [], 3: [], 4: []}
    curr_state = 0
    
    for l in q_lines:
        t = l['text']
        m = re.match(r'^([1-4])(.*)', t)
        if m and int(m.group(1)) in opts:
            curr_state = int(m.group(1))
            rest = m.group(2)
            if rest: opts[curr_state].append(rest)
        elif curr_state == 0:
            stem_parts.append(t)
        elif 1 <= curr_state <= 4:
            opts[curr_state].append(t)
            
    stem = clean_stem("".join(stem_parts))
    options = [clean_opt_text("".join(opts[i]), i) for i in [1, 2, 3, 4]]
    return stem, options

def parse_multi_q(lines, y_min, y_max, start_q, count):
    valid_lines = [l for l in lines if y_min <= l['y'] <= y_max]
    cleaned_lines = []
    for l in valid_lines:
        t = l['text']
        if ('第' in t and '週' in t) or t == '読解' or re.match(r'^\(注\s*\d+\)', t):
            continue
        cleaned_lines.append(l)

    blocks = []
    curr_q = {'stem': [], 1: [], 2: [], 3: [], 4: []}
    curr_state = 'stem'
    
    for l in cleaned_lines:
        t = l['text']
        m = re.match(r'^([1-4])(.*)', t)
        is_stem_line = bool(m and t.endswith(('か', 'か。', '？', '?')))
        
        if m and not is_stem_line and int(m.group(1)) == 1 and curr_state == 4:
            blocks.append(curr_q)
            curr_q = {'stem': [], 1: [], 2: [], 3: [], 4: []}
            curr_state = 1
            rest = m.group(2)
            if rest: curr_q[1].append(rest)
        elif m and not is_stem_line and int(m.group(1)) in [1, 2, 3, 4]:
            curr_state = int(m.group(1))
            rest = m.group(2)
            if rest: curr_q[curr_state].append(rest)
        elif curr_state == 'stem' or is_stem_line:
            curr_q['stem'].append(t)
        elif isinstance(curr_state, int):
            if curr_state == 4 and (
                t.endswith(('か', 'か。', '？', '?')) or
                re.match(r'^[\[［【〔]\s*[^\]］】〕]*\s*[\]］】〕]', t) or
                re.match(r'^[1-9]\s*[\u4e00-\u9faf\u3040-\u309f]', t)
            ):
                blocks.append(curr_q)
                curr_q = {'stem': [t], 1: [], 2: [], 3: [], 4: []}
                curr_state = 'stem'
            else:
                curr_q[curr_state].append(t)
                
    if curr_q[1]:
        blocks.append(curr_q)
        
    results = []
    for i, b in enumerate(blocks[:count]):
        q_num = start_q + i
        stem = clean_stem("".join(b["stem"]))
        opts = [clean_opt_text("".join(b[k]), k) for k in [1, 2, 3, 4]]
        results.append((q_num, stem, opts))
    return results

async def build_all():
    print("=== BUILDING ALL 20 DOKKAI CHAPTERS ===")

    # ------------------ WEEK 5 ------------------
    w5_pages = {
        1: [(76, 780, 1600, 1, "w05_d01_p1.png"), (77, 1300, 1650, 2, "w05_d01_p2.png"), (78, 500, 800, 3, "w05_d01_p3.png"), (78, 1200, 1600, 4, "w05_d01_p4.png"), (79, 650, 1600, 5, "w05_d01_p5.png")],
        2: [(80, 750, 1600, 1, "w05_d02_p1.png"), (81, 1200, 1650, 2, "w05_d02_p2.png"), (82, 550, 800, 3, "w05_d02_p3.png"), (82, 1200, 1600, 4, "w05_d02_p4.png"), (83, 550, 1600, 5, "w05_d02_p5.png")],
        3: [(84, 1000, 1600, 1, "w05_d03_p1.png"), (85, 680, 1600, 2, "w05_d03_p2.png"), (86, 580, 850, 3, "w05_d03_p3.png"), (86, 1350, 1650, 4, "w05_d03_p4.png"), (87, 1220, 1650, 5, "w05_d03_p5.png")],
        4: [(88, 880, 1600, 1, "w05_d04_p1.png"), (89, 1350, 1650, 2, "w05_d04_p2.png"), (90, 380, 650, 3, "w05_d04_p3.png"), (90, 1100, 1600, 4, "w05_d04_p4.png"), (91, 720, 1600, 5, "w05_d04_p5.png")],
        5: [(92, 900, 1600, 1, "w05_d05_p1.png"), (93, 600, 1600, 2, "w05_d05_p2.png"), (94, 480, 750, 3, "w05_d05_p3.png"), (94, 1150, 1600, 4, "w05_d05_p4.png"), (95, 1350, 1650, 5, "w05_d05_p5.png")],
    }
    for d, items in w5_pages.items():
        chap_id = f"w05-d{d:02d}"
        sections = []
        for p_num, y_min, y_max, q_num, img in items:
            lines = await get_page_lines(p_num)
            stem, opts = parse_single_q(lines, y_min, y_max, q_num)
            if (("w05", f"d{d:02d}", q_num)) in STEM_OVERRIDES:
                stem = STEM_OVERRIDES[("w05", f"d{d:02d}", q_num)]
            ans_val = ANSWER_KEYS["w05"][f"d{d:02d}"][f"q{q_num}"]
            corr_opt = opts[ans_val - 1]
            exp_text = EXPLANATIONS.get(("w05", f"d{d:02d}", q_num), f"本文の内容から、正解は {ans_val} です。")
            explanation = f"<b>【正解】{corr_opt}</b><br/>{exp_text}"
            
            img_rel = f"/images/zenkamoku_n2/{img}"
            sections.append({
                "type": "short_passage",
                "title": f"内容理解（短文） ({q_num})",
                "titleEn": f"Short Passage ({q_num})",
                "imageSrc": img_rel,
                "questions": [{
                    "number": q_num,
                    "stem": stem,
                    "imageSrc": img_rel,
                    "options": opts,
                    "correct": ans_val,
                    "correctOption": corr_opt,
                    "explanation": explanation
                }]
            })
            
        data = {
            "bookId": "zenkamoku-n2-best-workbook",
            "chapterId": chap_id,
            "week": 5,
            "day": d,
            "weekTitle": "第5週",
            "dayTitle": f"{d}日目",
            "sectionTitle": "内容理解（短文）",
            "sectionTitleEn": "Comprehension (Short passages)",
            "instruction": "次の(1)から(5)の文章を読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
            "sections": sections
        }
        with open(os.path.join(OUT_DATA_DIR, f"{chap_id}.json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✓ Saved {chap_id}.json (5 questions)")

    # ------------------ WEEK 6 ------------------
    w6_pages = {
        1: [(97, 1, "w06_d01_p1.png"), (99, 4, "w06_d01_p2.png"), (101, 7, "w06_d01_p3.png")],
        2: [(103, 1, "w06_d02_p1.png"), (105, 4, "w06_d02_p2.png"), (107, 7, "w06_d02_p3.png")],
        3: [(109, 1, "w06_d03_p1.png"), (111, 4, "w06_d03_p2.png"), (113, 7, "w06_d03_p3.png")],
        4: [(115, 1, "w06_d04_p1.png"), (117, 4, "w06_d04_p2.png"), (119, 7, "w06_d04_p3.png")],
        5: [(121, 1, "w06_d05_p1.png"), (123, 4, "w06_d05_p2.png"), (125, 7, "w06_d05_p3.png")],
    }
    for d, items in w6_pages.items():
        chap_id = f"w06-d{d:02d}"
        sections = []
        for sec_idx, (p_num, start_q, img) in enumerate(items, 1):
            lines = await get_page_lines(p_num)
            qs_tuples = parse_multi_q(lines, 50, 1650, start_q, 3)
            sec_questions = []
            img_rel = f"/images/zenkamoku_n2/{img}"
            for q_num, stem, opts in qs_tuples:
                if (("w06", f"d{d:02d}", q_num)) in STEM_OVERRIDES:
                    stem = STEM_OVERRIDES[("w06", f"d{d:02d}", q_num)]
                ans_val = ANSWER_KEYS["w06"][f"d{d:02d}"][f"q{q_num}"]
                corr_opt = opts[ans_val - 1]
                exp_text = f"本文の内容から、正解は {ans_val} です。"
                explanation = f"<b>【正解】{corr_opt}</b><br/>{exp_text}"
                sec_questions.append({
                    "number": q_num,
                    "stem": stem,
                    "imageSrc": img_rel,
                    "options": opts,
                    "correct": ans_val,
                    "correctOption": corr_opt,
                    "explanation": explanation
                })
            sections.append({
                "type": "mid_passage",
                "title": f"内容理解（中文） ({sec_idx})",
                "titleEn": f"Mid-size Passage ({sec_idx})",
                "imageSrc": img_rel,
                "questions": sec_questions
            })
        data = {
            "bookId": "zenkamoku-n2-best-workbook",
            "chapterId": chap_id,
            "week": 6,
            "day": d,
            "weekTitle": "第6週",
            "dayTitle": f"{d}日目",
            "sectionTitle": "内容理解（中文）",
            "sectionTitleEn": "Comprehension (Mid-size passages)",
            "instruction": "次の(1)から(3)の文章を読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
            "sections": sections
        }
        with open(os.path.join(OUT_DATA_DIR, f"{chap_id}.json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✓ Saved {chap_id}.json (9 questions)")

    # ------------------ WEEK 7 ------------------
    w7_pages = {
        1: [(127, 1, 2, "w07_d01_p1.png", "統合理解", "Integrated comprehension"), (129, 3, 3, "w07_d01_p2.png", "主張理解（長文）", "Thematic comprehension (Long passages)")],
        2: [(131, 1, 2, "w07_d02_p1.png", "統合理解", "Integrated comprehension"), (133, 3, 3, "w07_d02_p2.png", "主張理解（長文）", "Thematic comprehension (Long passages)")],
        3: [(135, 1, 2, "w07_d03_p1.png", "統合理解", "Integrated comprehension"), (137, 3, 3, "w07_d03_p2.png", "主張理解（長文）", "Thematic comprehension (Long passages)")],
        4: [(139, 1, 2, "w07_d04_p1.png", "統合理解", "Integrated comprehension"), (141, 3, 3, "w07_d04_p2.png", "主張理解（長文）", "Thematic comprehension (Long passages)")],
        5: [(143, 1, 2, "w07_d05_p1.png", "統合理解", "Integrated comprehension"), (145, 3, 3, "w07_d05_p2.png", "主張理解（長文）", "Thematic comprehension (Long passages)")],
    }
    for d, items in w7_pages.items():
        chap_id = f"w07-d{d:02d}"
        sections = []
        for p_num, start_q, count, img, title_ja, title_en in items:
            lines = await get_page_lines(p_num)
            qs_tuples = parse_multi_q(lines, 50, 1650, start_q, count)
            sec_questions = []
            img_rel = f"/images/zenkamoku_n2/{img}"
            for q_num, stem, opts in qs_tuples:
                if (("w07", f"d{d:02d}", q_num)) in STEM_OVERRIDES:
                    stem = STEM_OVERRIDES[("w07", f"d{d:02d}", q_num)]
                ans_val = ANSWER_KEYS["w07"][f"d{d:02d}"][f"q{q_num}"]
                corr_opt = opts[ans_val - 1]
                exp_text = f"本文の論理構成および対比から、正解は {ans_val} です。"
                explanation = f"<b>【正解】{corr_opt}</b><br/>{exp_text}"
                sec_questions.append({
                    "number": q_num,
                    "stem": stem,
                    "imageSrc": img_rel,
                    "options": opts,
                    "correct": ans_val,
                    "correctOption": corr_opt,
                    "explanation": explanation
                })
            sections.append({
                "type": "integrated" if count == 2 else "long_passage",
                "title": title_ja,
                "titleEn": title_en,
                "imageSrc": img_rel,
                "questions": sec_questions
            })
        data = {
            "bookId": "zenkamoku-n2-best-workbook",
            "chapterId": chap_id,
            "week": 7,
            "day": d,
            "weekTitle": "第7週",
            "dayTitle": f"{d}日目",
            "sectionTitle": "統合理解・主張理解（長文）",
            "sectionTitleEn": "Integrated & Thematic Comprehension",
            "sections": sections
        }
        with open(os.path.join(OUT_DATA_DIR, f"{chap_id}.json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✓ Saved {chap_id}.json (5 questions)")

    # ------------------ WEEK 8 ------------------
    w8_pages = {
        1: (146, "w08_d01_passage.png"),
        2: (148, "w08_d02_passage.png"),
        3: (150, "w08_d03_passage.png"),
        4: (152, "w08_d04_passage.png"),
        5: (154, "w08_d05_passage.png"),
    }
    for d, (p_num, img) in w8_pages.items():
        chap_id = f"w08-d{d:02d}"
        lines = await get_page_lines(p_num)
        qs_tuples = parse_multi_q(lines, 350, 1650, 1, 2)
        sec_questions = []
        img_rel = f"/images/zenkamoku_n2/{img}"
        for q_num, stem, opts in qs_tuples:
            if (("w08", f"d{d:02d}", q_num)) in STEM_OVERRIDES:
                stem = STEM_OVERRIDES[("w08", f"d{d:02d}", q_num)]
            ans_val = ANSWER_KEYS["w08"][f"d{d:02d}"][f"q{q_num}"]
            corr_opt = opts[ans_val - 1]
            exp_text = EXPLANATIONS.get(("w08", f"d{d:02d}", q_num), f"条件照合および情報検索により、正解は {ans_val} です。")
            explanation = f"<b>【正解】{corr_opt}</b><br/>{exp_text}"
            sec_questions.append({
                "number": q_num,
                "stem": stem,
                "imageSrc": img_rel,
                "options": opts,
                "correct": ans_val,
                "correctOption": corr_opt,
                "explanation": explanation
            })
        sections = [{
            "type": "information_retrieval",
            "title": "情報検索",
            "titleEn": "Information retrieval",
            "imageSrc": img_rel,
            "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
            "questions": sec_questions
        }]
        data = {
            "bookId": "zenkamoku-n2-best-workbook",
            "chapterId": chap_id,
            "week": 8,
            "day": d,
            "weekTitle": "第8週",
            "dayTitle": f"{d}日目",
            "sectionTitle": "情報検索",
            "sectionTitleEn": "Information retrieval",
            "instruction": "右のページを読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。",
            "sections": sections
        }
        with open(os.path.join(OUT_DATA_DIR, f"{chap_id}.json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✓ Saved {chap_id}.json (2 questions)")

    print("\n✅ All 20 chapters successfully generated!")

if __name__ == '__main__':
    asyncio.run(build_all())
