import json
import re

db_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_n1_data.json"

def number_to_circle(num):
    circles = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
    return circles[num - 1]

def process_training(t_id_num, file_data):
    # file_data format: 
    # {"title": "集中トレーニング ① 動詞（１）", "questions": [ { "id": "q1", "text": "...", "options": ["...", "..."], "correctAnswer": "..." } ] }
    title_raw = file_data["title"]
    # Extract sub title e.g. "動詞（１）"
    sub_title = title_raw.split(" ", 2)[-1].strip()
    
    questions = []
    for i, q in enumerate(file_data["questions"]):
        # q["text"]: "風邪を（a ひいて b もって）いるので、今日は早く帰ります。"
        # we need to replace （a ひいて b もって） with （　　）
        text = re.sub(r'（\s*a.*?b.*?）', '（　　）', q["text"])
        
        opt1 = q["options"][0]
        opt2 = q["options"][1]
        
        if q["correctAnswer"] == opt1:
            ans = "1"
        else:
            ans = "2"
            
        questions.append({
            "number": str(i + 1),
            "text": text,
            "options": [opt1, opt2],
            "answer": ans,
            "explanation": ""
        })
        
    return {
        "id": f"vocab-training-{t_id_num}",
        "title": f"集中トレーニング {number_to_circle(t_id_num)}",
        "type": "vocab",
        "description": f"N1文字・語彙ドリル {title_raw}",
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
    
    # Remove existing trainings
    chapters = [ch for ch in chapters if not ch["id"].startswith("vocab-training-")]
    
    trainings = []
    for i in range(1, 9):
        with open(f"scripts/data/N1_vocab/n1_training_{i}.json", "r", encoding="utf-8") as f:
            t_data = json.load(f)
            trainings.append(process_training(i, t_data))
            
    # Insert mappings
    # training 1, 2 after vocab-5
    # training 3, 4 after vocab-10
    # training 5, 6 after vocab-15
    # training 7, 8 after vocab-20
    
    def get_index(ch_id):
        for idx, ch in enumerate(chapters):
            if ch["id"] == ch_id:
                return idx
        return -1
        
    insert_map = {
        1: "vocab-5",
        2: "vocab-5",
        3: "vocab-10",
        4: "vocab-10",
        5: "vocab-15",
        6: "vocab-15",
        7: "vocab-20",
        8: "vocab-20"
    }
    
    for i in range(1, 9):
        t = trainings[i-1]
        anchor = insert_map[i]
        idx = get_index(anchor)
        if idx != -1:
            if i % 2 == 0:
                # even training goes after odd training
                # odd training was inserted at idx + 1, so this goes to idx + 2
                chapters.insert(idx + 2, t)
            else:
                chapters.insert(idx + 1, t)
        else:
            chapters.append(t)
            
    data["chapters"] = chapters
    
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print("Successfully inserted 8 training chapters into N1 JSON.")

if __name__ == "__main__":
    main()
