import os
import json
import re

# N3 Week 3 accurate correctOrder mapping
N3_W3_ORDERS = {
    "w03-d01": {
        1: [2, 4, 3, 1],
        2: [1, 3, 4, 2],
        3: [2, 3, 4, 1],
        4: [3, 2, 1, 4],
        5: [2, 3, 1, 4]
    },
    "w03-d02": {
        1: [2, 3, 1, 4],
        2: [2, 4, 1, 3],
        3: [1, 3, 2, 4],
        4: [3, 2, 4, 1],
        5: [3, 2, 4, 1]
    },
    "w03-d03": {
        1: [2, 1, 4, 3],
        2: [4, 1, 3, 2],
        3: [2, 1, 4, 3],
        4: [1, 3, 2, 4],
        5: [2, 4, 3, 1]
    },
    "w03-d04": {
        1: [4, 3, 1, 2],
        2: [2, 1, 4, 3],
        3: [3, 1, 4, 2],
        4: [3, 2, 1, 4],
        5: [3, 2, 4, 1]
    },
    "w03-d05": {
        1: [2, 4, 3, 1],
        2: [4, 3, 2, 1],
        3: [2, 1, 4, 3],
        4: [4, 2, 1, 3],
        5: [4, 2, 3, 1]
    }
}

# N3 Week 3 explanations from official kaisetsu
N3_W3_EXPLANATIONS = {
    "w03-d01": {
        1: "<b>【正解】3</b><br/>【文の並び替え】彼女は将来 <u>歌手になるために</u> <u>子どものときから</u> <u>★歌とダンスの</u> <u>練習をしてきた</u> そうだ。<br/><b>～てきた</b>：過去から現在まで～し続けたことを表す have been doing ～ (for long time)",
        2: "<b>【正解】3</b><br/>【文の並び替え】夜遅くまで音楽を <u>聞いていたら</u> <u>★近所の人に</u> <u>静かにしろ</u> <u>と言われて</u> しまった。<br/><b>～しろ</b>：「する」の命令形 do ～ [command]",
        3: "<b>【正解】4</b><br/>【文の並び替え】江口「確かに、朝のバスは <u>遅れがちだ</u> <u>から</u> <u>★たまに心配になる</u> <u>けど</u>、早い時間に家を出ているから大丈夫だよ。」<br/><b>～がち</b>：よく～になる ～の状態になりやすい tending to ～",
        4: "<b>【正解】2</b><br/>【文の並び替え】手紙をする <u>といっても</u> <u>★５分で終わる</u> <u>とても</u> <u>簡単</u> なものらしい。<br/><b>～といっても</b>：～というけれど実際は… though ～, …",
        5: "<b>【正解】1</b><br/>【文の並び替え】先輩に今は日本語が <u>上手に話せなくても</u> <u>毎日勉強を</u> <u>★続けていれば</u> <u>上手に話せるようになる</u> と言われた。<br/><b>～ようになる</b>：以前とは違った状態に変わる become able to ～"
    },
    "w03-d02": {
        1: "<b>【正解】1</b><br/>【文の並び替え】先輩がインフルエンザで休むということなので、先輩 <u>にかわって</u> <u>私</u> <u>★が</u> <u>リーダー</u> となって会議の準備をします。<br/><b>～にかわって</b>：～と交代して ～の代理として on behalf of ～",
        2: "<b>【正解】4</b><br/>【文の並び替え】私の会社では社員の <u>交流を</u> <u>★目的として</u> <u>ゲームや</u> <u>カラオケが</u> できる部屋が食堂の隣にある。<br/><b>～を…として</b>：～が…だと考えて／決めて having ～ as its …",
        3: "<b>【正解】3</b><br/>【文の並び替え】この薬を飲むと <u>眠くなる</u> <u>★恐れがある</u> <u>ので</u> <u>運転はしない</u> ようにしてください。<br/><b>～恐れがある</b>：（よくない状態になる）かもしれない there is a risk of ～",
        4: "<b>【正解】2</b><br/>【文の並び替え】父は最近、<u>忘れ</u> <u>★っぽくて</u> <u>何か言い</u> <u>かけて</u> 「あっ、忘れた」と言うことが多くなった。<br/><b>～っぽい</b>：よく～する tending to ～",
        5: "<b>【正解】3</b><br/>【文の並び替え】今年はうすい <u>★青や緑</u> <u>といった</u> <u>涼しさを</u> <u>感じる色の</u> 服が人気だそうだ。<br/><b>～といった</b>：例を出すときに使う such as ～"
    },
    "w03-d03": {
        1: "<b>【正解】1</b><br/>【文の並び替え】ご飯を <u>食べ</u> <u>★終わったら</u> <u>お皿を</u> <u>洗って</u> おいてください。<br/><b>～終わる</b>：動作の終わりを表す finish ～",
        2: "<b>【正解】3</b><br/>【文の並び替え】私は彼 <u>ほど</u> <u>英語が</u> <u>★上手</u> <u>ではない</u> から、留学するのが不安なんです。<br/><b>～ほど…ない</b>：～に比べると…ではない not … as ～",
        3: "<b>【正解】4</b><br/>【文の並び替え】いつも仕事が大変で <u>疲れて</u> <u>いるから</u> <u>★寝て</u> <u>ばかり</u> いたよ。<br/><b>～てばかりいる</b>：同じことをずっとしている様子を表す always just ～",
        4: "<b>【正解】2</b><br/>【文の並び替え】お酒を飲んでもいい <u>年齢</u> <u>は</u> <u>★国</u> <u>によって</u> 違う。<br/><b>…は～によって違う</b>：～が違うと…も変わる … differs by ～",
        5: "<b>【正解】4</b><br/>【文の並び替え】あとで <u>買い物に行く</u> <u>★ついでに</u> <u>さっき書いた</u> <u>手紙を出して</u> きてくれませんか。<br/><b>～ついでに</b>：～するときに他の一緒にする while ～"
    },
    "w03-d04": {
        1: "<b>【正解】3</b><br/>【文の並び替え】ピアノは一生懸命 <u>練習すれば</u> <u>★練習する</u> <u>ほど</u> <u>上手に</u> なると思います。<br/><b>～ば～ほど</b>：～の程度が増すと、それと一緒に…も変化する the more ～, the more …",
        2: "<b>【正解】4</b><br/>【文の並び替え】大切な <u>友達に</u> <u>対して</u> <u>★うそを</u> <u>つく</u> ことはできません。<br/><b>～に対して</b>：行動の対象を表す to ～",
        3: "<b>【正解】4</b><br/>【文の並び替え】夜中に家の <u>近くで</u> <u>大きな</u> <u>★音が</u> <u>して</u> 目が覚めてしまった。<br/><b>～がする</b>：声や音、味、匂いなどを感じる ～ occurs",
        4: "<b>【正解】1</b><br/>【文の並び替え】娘が <u>今にも</u> <u>泣きそうな</u> <u>★顔を</u> <u>して</u> 学校から帰ってきた。<br/><b>今にも</b>：すぐ もう少しで (be) on the verge of",
        5: "<b>【正解】2</b><br/>【文の並び替え】このレストランは人気で、<u>予約して</u> <u>★からでない</u> <u>と</u> <u>店に入る</u> ことができない。<br/><b>～てからでないと</b>：～が終わってからでなければ unless ～ first"
    },
    "w03-d05": {
        1: "<b>【正解】3</b><br/>【文の並び替え】母親が自分の <u>子どもに食事を</u> <u>与えない</u> <u>★という</u> <u>信じがたい</u> ニュースを見た。<br/><b>～という…</b>：…の内容や名前を～で説明する … about ～",
        2: "<b>【正解】2</b><br/>【文の並び替え】小学校の <u>先生</u> <u>として</u> <u>★立派に</u> <u>仕事をしている</u> と聞いて安心した。<br/><b>～として</b>：役割や立場などを表す as ～",
        3: "<b>【正解】4</b><br/>【文の並び替え】このドアは壊れていて <u>閉めよう</u> <u>にも</u> <u>★閉まらない</u> <u>ので</u> 修理することにした。<br/><b>～ようにも～ない</b>：～したくても～できない even if try to ～, won't ～",
        4: "<b>【正解】2</b><br/>【文の並び替え】シンさんはアニメ <u>に関する</u> <u>★ことなら</u> <u>何でも知っているので</u> <u>友達から</u> 「アニメ先生」と呼ばれている。<br/><b>～に関する</b>：～に関係する about ～",
        5: "<b>【正解】3</b><br/>【文の並び替え】私が通っていた日本語学校では <u>日本語</u> <u>はもちろん</u> <u>★日本料理</u> <u>の作り方</u> まで教えてくれた。<br/><b>～はもちろん</b>：～は当然 of course ～; not only ～"
    }
}

def update_n3():
    for day in range(1, 6):
        cid = f"w03-d0{day}"
        fpath = f"src/data/zenkamoku_n3/{cid}.json"
        if not os.path.exists(fpath):
            continue
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        # Look in subSections
        for sec in data.get("subSections", []) + data.get("sections", []):
            if sec.get("title") == "文の組み立て" or sec.get("type") == "sentence_composition":
                for q in sec.get("questions", []):
                    q_num = q.get("number")
                    if cid in N3_W3_ORDERS and q_num in N3_W3_ORDERS[cid]:
                        order = N3_W3_ORDERS[cid][q_num]
                        q["correctOrder"] = order
                        # Find star position
                        correct_opt = q.get("correct")
                        star_pos = order.index(correct_opt) + 1
                        q["starPosition"] = star_pos
                        if cid in N3_W3_EXPLANATIONS and q_num in N3_W3_EXPLANATIONS[cid]:
                            q["explanation"] = N3_W3_EXPLANATIONS[cid][q_num]
        
        with open(fpath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated N3 {cid}")

def update_n2():
    for d in range(1, 6):
        fpath = f"src/data/zenkamoku_n2/w03-d0{d}.json"
        if not os.path.exists(fpath):
            continue
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        sc_section = None
        for sec in data.get("sections", []):
            if sec.get("type") == "sentence_composition":
                sc_section = sec
                break
        
        if not sc_section:
            continue
        
        for q in sc_section.get("questions", []):
            options = q.get("options", [])
            clean_opts = [re.sub(r"^\d+\.\s*", "", opt).strip() for opt in options]
            
            stem = q.get("stem", "")
            blanks_match = re.findall(r'(＿＿|★)', stem)
            if '★' in blanks_match:
                star_pos = blanks_match.index('★') + 1
                q['starPosition'] = star_pos
            
            exp = q.get("explanation", "")
            match = re.search(r'【文の並び替え】(.*?)<br/>', exp)
            if match:
                order_text = match.group(1)
                underlines = re.findall(r'<u>(.*?)</u>', order_text)
                if len(underlines) == 4:
                    order = []
                    for u in underlines:
                        u_clean = u.strip()
                        found_idx = -1
                        for opt_i, c_opt in enumerate(clean_opts):
                            if c_opt == u_clean or c_opt in u_clean or u_clean in c_opt:
                                found_idx = opt_i + 1
                                break
                        if found_idx != -1:
                            order.append(found_idx)
                    if len(order) == 4:
                        q['correctOrder'] = order
                        correct_opt = q.get('correct')
                        q['starPosition'] = order.index(correct_opt) + 1
        
        with open(fpath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated N2 w03-d0{d}")

update_n3()
update_n2()
