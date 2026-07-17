import json

db_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_n1_data.json"

def number_to_circle(num):
    circles = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫']
    return circles[num - 1]

trainings_data = [
    {
        "num": 9,
        "sub_title": "擬音語・擬態語（３）",
        "questions": [
            {"text": "つい（　　）なって、机をたたいてしまった。", "options": ["はっと", "かっと"], "answer": "2"},
            {"text": "その子は怒ったような顔で（　　）私をにらんだ。", "options": ["きっと", "ざっと"], "answer": "1"},
            {"text": "涙が出そうになるのを（　　）こらえた。", "options": ["ぐっと", "ぱっと"], "answer": "1"},
            {"text": "彼女は私が隣に座ると、（　　）席を立ってしまった。", "options": ["ほっと", "さっと"], "answer": "2"},
            {"text": "セール初日とあって、開店と同時に客が（　　）押し寄せた。", "options": ["じっと", "どっと"], "answer": "2"},
            {"text": "その人は何も言わず（　　）メモを差し出した。", "options": ["すっと", "わっと"], "answer": "1"},
            {"text": "一人で考えたいので（　　）しておいてください。", "options": ["そっと", "ふっと"], "answer": "1"},
            {"text": "もし今、大地震が来たらと思うと、（　　）する。", "options": ["ぞっと", "ほっと"], "answer": "1"},
            {"text": "プレゼントを見た彼女は（　　）表情を明るくした。", "options": ["ぱっと", "ぺっと"], "answer": "1"},
            {"text": "彼の冗談があまりにおかしくて、先生も（　　）吹き出した。", "options": ["ほっと", "ぷっと"], "answer": "2"},
        ]
    },
    {
        "num": 10,
        "sub_title": "パソコン関係のことば",
        "questions": [
            {"text": "個人情報にかかわるデータは（　　）で保護されています。", "options": ["キーワード", "パスワード"], "answer": "2"},
            {"text": "まず、スタートボタンを1回（　　）してください。", "options": ["クリック", "クリップ"], "answer": "1"},
            {"text": "退社する時は、パソコンを（　　）するのを忘れないようにしてください。", "options": ["ダウンロード", "シャットダウン"], "answer": "2"},
            {"text": "社内のパソコンは（　　）で結ばれている。", "options": ["チームワーク", "ネットワーク"], "answer": "2"},
            {"text": "念のため、データは必ず（　　）をとっておいてください。", "options": ["バックアップ", "セットアップ"], "answer": "1"},
            {"text": "出席者は、メールで送った資料を（　　）して持ってくること。", "options": ["ハンドアウト", "プリントアウト"], "answer": "2"},
            {"text": "この図書館のパソコンは、会員登録をしないと（　　）できません。", "options": ["ログイン", "ログアウト"], "answer": "1"},
            {"text": "ファイルに新しい情報を入力して、（　　）保存した。", "options": ["上書き", "下書き"], "answer": "1"},
            {"text": "メールに資料を（　　）してお送りしましたので、ご覧ください。", "options": ["添加", "添付"], "answer": "2"},
            {"text": "先生から来たメールをクラス全員に（　　）した。", "options": ["転送", "移転"], "answer": "1"},
        ]
    },
    {
        "num": 11,
        "sub_title": "大学生活で使うことば",
        "questions": [
            {"text": "先生が学会参加のため、授業が（　　）になった。", "options": ["休業", "休講"], "answer": "2"},
            {"text": "この大学では、2年生までに40単位とらないと、（　　）してしまう。", "options": ["停学", "留年"], "answer": "2"},
            {"text": "学園祭も無事に終わり、みんなで（　　）をした。", "options": ["打ち上げ", "打ち合わせ"], "answer": "1"},
            {"text": "4月下旬までに、どの講義を（　　）するか、決めなければならない。", "options": ["履修", "修得"], "answer": "1"},
            {"text": "経済学や経営学は、（　　）と呼ばれている。", "options": ["自然科学", "社会科学"], "answer": "2"},
            {"text": "卒業論文を書くために、図書館で（　　）を探している。", "options": ["参考文献", "推薦図書"], "answer": "1"},
            {"text": "理系の学生でも、文学や政治などの（　　）の科目を勉強する。", "options": ["一般教養", "教職課程"], "answer": "1"},
            {"text": "私は入学してすぐに、茶道の（　　）に入った。", "options": ["サイクル", "サークル"], "answer": "2"},
            {"text": "3年生になったら、加藤教授の（　　）に入ろうと思っている。", "options": ["ゼミ", "セミナー"], "answer": "1"},
            {"text": "2年生のうちから、就職（　　）に出ておいたほうがいい。", "options": ["ガイド", "ガイダンス"], "answer": "2"},
        ]
    },
    {
        "num": 12,
        "sub_title": "ビジネスで使うことば",
        "questions": [
            {"text": "今度A社の坂本部長を（　　）することになったんだが、どこかいい店を知らないか。", "options": ["応対", "接待"], "answer": "2"},
            {"text": "B社は、ここ数年で急激に（　　）を伸ばしている。", "options": ["業績", "経営"], "answer": "1"},
            {"text": "では、明日の2時に、（　　）にお伺いいたします。", "options": ["弊社", "御社"], "answer": "2"},
            {"text": "発注先を決める前に、2,3社から（　　）書を取った。", "options": ["見込み", "見積もり"], "answer": "2"},
            {"text": "仕事で必要な（　　）を支払ったときは、必ず領収書をもらっておいてください。", "options": ["経費", "実費"], "answer": "1"},
            {"text": "会議の前に、企画を関係部署に説明し、（　　）を得ておいた。", "options": ["コンセプト", "コンセンサス"], "answer": "2"},
            {"text": "彼女は入社後、係長、課長、部長と、順調に（　　）を重ねてきた。", "options": ["スキル", "キャリア"], "answer": "2"},
            {"text": "お客様からの（　　）には、誠実な対応が求められる。", "options": ["クレーム", "ストレス"], "answer": "1"},
            {"text": "当社はこの業界において、世界最大の（　　）を誇っております。", "options": ["シェア", "マーケット"], "answer": "1"},
            {"text": "この計画は（　　）がかかりすぎるので、もっと低予算でできるやり方を考えてください。", "options": ["コスト", "リスク"], "answer": "1"},
        ]
    },
]

def build_chapter(t_data):
    num = t_data["num"]
    sub_title = t_data["sub_title"]
    questions = []
    for i, q in enumerate(t_data["questions"]):
        questions.append({
            "number": str(i + 1),
            "text": q["text"],
            "options": q["options"],
            "answer": q["answer"],
            "explanation": ""
        })

    return {
        "id": f"vocab-training-{num}",
        "title": f"集中トレーニング {number_to_circle(num)}",
        "type": "vocab",
        "description": f"N1文字・語彙ドリル 集中トレーニング {number_to_circle(num)} {sub_title}",
        "group": "Group 1",
        "sections": [
            {
                "title": sub_title,
                "mondaiHeader": "（　　）の中のaとbのうち、文に合うほうを選びましょう。",
                "questions": questions
            }
        ]
    }

def main():
    with open(db_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    chapters = data.get("chapters", [])

    def get_index(ch_id):
        for idx, ch in enumerate(chapters):
            if ch["id"] == ch_id:
                return idx
        return -1

    # Training 9, 10 after vocab-25
    # Training 11, 12 after vocab-30
    insert_map = {
        9: "vocab-25",
        10: "vocab-25",
        11: "vocab-30",
        12: "vocab-30",
    }

    for t_data in trainings_data:
        ch = build_chapter(t_data)
        num = t_data["num"]

        # Check if already exists
        idx = get_index(ch["id"])
        if idx != -1:
            print(f"{ch['id']} already exists, replacing it")
            chapters[idx] = ch
        else:
            anchor = insert_map[num]
            anchor_idx = get_index(anchor)
            if anchor_idx != -1:
                if num % 2 == 0:
                    # Even: insert after the odd training we just inserted
                    prev_id = f"vocab-training-{num - 1}"
                    prev_idx = get_index(prev_id)
                    if prev_idx != -1:
                        chapters.insert(prev_idx + 1, ch)
                    else:
                        chapters.insert(anchor_idx + 2, ch)
                else:
                    chapters.insert(anchor_idx + 1, ch)
            else:
                chapters.append(ch)
            print(f"Inserted {ch['id']}")

    data["chapters"] = chapters

    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nTotal chapters now: {len(chapters)}")
    print("Successfully inserted trainings 9-12 into N1 JSON.")

if __name__ == "__main__":
    main()
