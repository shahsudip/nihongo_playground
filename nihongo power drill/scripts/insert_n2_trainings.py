import json
import re

db_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_n2_data.json"

raw_data = """
=== 3
集中トレーニング③（カタカナ語１）
1. 日本語と英語を（ a マーク    b マスター ）して、３カ国語の通訳になりたい。 -> b
2. 商品を1,000円以上買うと、100円分の（ a クーポン    b バーゲン ）がもらえる。 -> a
3. 私はどんな（ a レベル    b ジャンル ）の映画でも好きです。 -> b
4. 仕事が（ a トライ    b ハード ）で、体を壊してしまった。 -> b
5. どの化粧品がいいかわからなかったので、とりあえず（ a サービス    b サンプル ）をもらった。 -> b
6. 公民館では、毎月いろいろな（ a イベント    b キャンペーン ）が行われている。 -> a
7. 汚れないように、本に（ a カバー    b シール ）をかけた。 -> a
8. 今日のコンサートも、いよいよ（ a エンド    b ラスト ）の曲になった。 -> b
9. この企業は、人気女優のCMによって（ a イメージアップ    b スキルアップ ）に成功し、売り上げを伸ばした。 -> a
10. この（ a ベース    b ペース ）で勉強を続ければ、日本語能力試験の合格は間違いない。 -> b
=== 4
集中トレーニング④（カタカナ語２）
1. 新製品の（ a アピール    b アイディア ）を、全社員から募集した。 -> b
2. このレストランでは、飲み物は（ a アフターサービス    b セルフサービス ）です。 -> b
3. （ a マスコミ    b メディア ）関係に就職を希望する学生は多い。 -> a
4. 特急電車に乗ると、空港まで（ a ノンストップ    b ステップアップ ）で行ける。 -> a
5. 優秀な社員が（ a ライブ    b ライバル ）会社に転職してしまった。 -> b
6. お客様の（ a リサイクル    b リクエスト ）にこたえて、メニューを増やした。 -> b
7. 山のきれいな空気を吸ったら、気分が（ a フレッシュ    b リフレッシュ ）できた。 -> b
8. 部長の言うことは、いつも（ a ワンタッチ    b ワンパターン ）だ。 -> b
9. 今日のパーティーの（ a メイン    b ベスト ）は、バイオリンの生演奏だ。 -> a
10. この映画は、今週の人気映画（ a リスト    b ランキング ）で１位の作品だ。 -> b
=== 5
集中トレーニング⑤（接続語１）
1. 突然、大きな音がした。（ a すると    b ところが ）、激しい雨が降りだした。 -> a
2. A社の今年の自動車の売れ行きは不調だ。（ a 一方    b さらに ）、B社は好調な売れ行きを見せている。 -> a
3. 申込書はペンで書くこと。（ a なお    b たとえば ）、インクの色は黒か青に限る。 -> a
4. 社長は会社を日本一の食品メーカーにする夢を持っていたが、（ a 結局    b つまり ）、その夢が実現することはなかった。 -> a
5. 新幹線の事故で到着が3時間も遅れた。（ a そこで    b それで ）、彼は会議に出られなかった。 -> b
6. テストが終わったら家に帰ってもいいです。（ a たった    b ただし ）、昨日休んだ学生は、教室に残ってください。 -> b
7. 台風が近づいているそうだ。（ a やはり    b むしろ ）出かけるのはやめておこう。 -> a
8. 新婚旅行はヨーロッパに行く？ （ a および    b それとも ）、アメリカにする？ -> b
9. 試験の答案用紙は、えんぴつ（ a および    b あるいは ）シャープペンシルで記入してください。 -> b
10. 父が急病で倒れた。（ a そこで    b それに ）、私が大学をやめて、父の会社を継ぐことにした。 -> a
=== 6
集中トレーニング⑥（接続語２）
1. 国内の主なニュースは以上です。（ a それでは    b したがって ）、次はスポーツニュースです。 -> a
2. 走る前には消化のよい食べ物、（ a いわば    b たとえば ）バナナなどがよいそうです。 -> b
3. A：どうして食べないの？ B：（ a だって    b なぜなら ）、これ、嫌いなんだもん。 -> a
4. 彼はすでに続けて３曲も歌った。（ a それに    b それなのに ）、もう１曲歌うつもりでいる。 -> b
5. すぐ戻ります。（ a それで    b ですから ）ちょっと待っていてください。 -> b
6. 遅れたのでタクシーに乗ったら、（ a かえって    b ところが ）時間がかかってしまった。 -> a
7. 賛成が多数です。（ a よって    b あるいは ）、この法案は可決されました。 -> a
8. FAX、（ a また    b または ）Eメールでお申し込みください。 -> b
9. 電気自動車は静かで、（ a しかし    b しかも ）スピードも結構出るらしい。 -> b
10. もう10年も住んでいるので、この国は（ a いわば    b ならば ）第二の故郷のようなものだ。 -> a
=== 7
集中トレーニング⑦（副詞）
1. 明日は健康診断があるので、（ a せめて    b なるべく ）休まないようにしてください。 -> b
2. （ a せっかく    b たびたび ）日本に来たのだから、日本人の友達をたくさん作りたい。 -> a
3. 申しわけありません。（ a あいにく    b ようやく ）明日のチケットは売り切れてしまいました。 -> a
4. この辺は（ a たえず    b しだいに ）人が集まり、にぎわっている。 -> a
5. 今月もらったアルバイト代は（ a たいてい    b ほとんど ）使ってしまった。 -> b
6. 10年間に及ぶ研究の結果、（ a まさに    b ついに ）新技術の開発に成功した。 -> b
7. もう帰りたかったが、今日中にレポートを提出するように言われ、（ a しぶしぶ    b どうしても ）レポートを書き始めた。 -> a
8. 4月になり、公園の桜の花が（ a いっこうに    b いっせいに ）咲き始めた。 -> b
9. 普段は（ a めったに    b しょっちゅう ）学校を休まない中川さんが、今日はめずらしく休んだ。 -> a
10. のどが痛くて熱もある。（ a どうやら    b どうにか ）風邪をひいたようだ。 -> a
=== 8
集中トレーニング⑧（慣用句１）
1. 彼にひどいことを言われて（ a 頭にきた    b 頭が下がった ）。 -> a
2. この問題は、もっと（ a 頭に入れて    b 頭を使って ）考えないと。 -> b
3. 彼には秘密を話さないほうがいい。（ a 口が軽い    b 口がうまい ）からすぐにしゃべってしまうよ。 -> a
4. あの人は（ a 口が悪い    b 口が重い ）から、話していて嫌な気分になる。 -> a
5. 彼からのメールが届くのを（ a 首を長くして    b 首をひねって ）待っている。 -> a
6. いま忙しくて（ a 手が届かない    b 手が離せない ）から、しばらく待ってください。 -> b
7. 駅で、困っている障害者の方に（ a 手を貸した    b 手を出した ）。 -> a
8. このダイヤモンドの指輪は、高すぎて（ a 手が出ない    b 手につかない ）。 -> a
9. 息子が司法試験に合格し、親である私も（ a 目が高い    b 鼻が高い ）。 -> b
10. 父は、（ a 開いた口がふさがらない    b 目の中に入れても痛くない ）ほど、孫をかわいがっている。 -> b
=== 9
集中トレーニング⑨（慣用句２）
1. 一人で資料を50人分コピーするのは、（ a 腕が鳴る    b 骨が折れる ）作業だ。 -> b
2. ドラマを見ているうちに、自然に日本語が（ a 身についた    b 目についた ）。 -> a
3. 祖母は最近ずいぶん（ a 耳が遠くなった    b 耳にしなくなった ）ようだ。 -> a
4. もうその話を知っているなんて、さすが本田さんは、（ a 耳が早い    b 耳が痛い ）。 -> a
5. 試験官は、受験者がカンニングをしないように、いつも（ a 目を光らせて    b 目を疑って ）いる。 -> a
6. 人気歌手が離婚したという噂を（ a 目にして    b 耳にして ）驚いた。 -> b
7. 資料の整理、書類の作成、来客の応対など、今日は（ a 目が回る    b 目をつぶる ）ほど忙しい。 -> a
8. 次の授業までに、この本にざっと（ a 目を引いて    b 目を通して ）おいてください。 -> b
9. 宝くじに当たったことを知って、（ a 口を出した    b 目を丸くした ）。 -> b
10. 岡崎さんは（ a 顔が広い    b 足が早い ）ので、どこに行っても知り合いがいる。 -> a
=== 10
集中トレーニング⑩（慣用句３）
1. A：夏休みの旅行、どこに行こうか。 B：ええっ。まだ1月なのに、（ a 気が早い    b 気が短い ）なあ。 -> a
2. テレビ、消してくれる？ （ a 気が散って    b 気が多くて ）勉強できないから。 -> a
3. ちょっと注意されたくらいでそんなに（ a 気を落とさない    b 気を回さない ）で、元気を出して！ -> a
4. A：今日、カラオケに行かない？ B：カラオケ？ あんまり（ a 気がない    b 気が進まない ）なあ。 -> b
5. 不満があったが、言いたいことを全部言ったら（ a 気が引けた    b 気が済んだ ）。 -> b
6. 嫌なことがあった時は、体を動かしたほうが（ a 気が抜ける    b 気がまぎれる ）。 -> b
7. A：明日、行けるかどうかわからないよ。忙しいし。 B：無理しなくていいから、（ a 気がついたら    b 気が向いたら ）来て。 -> b
8. 日本は1,000兆円以上の財政赤字があると聞いて、（ a 気が遠く    b 気が長く ）なった。 -> a
9. 先生はいつも私のことを（ a 気にかけて    b 気に入って ）、何かとアドバイスしてくれる。 -> a
10. A：先輩、水、どうぞ。 B：ちょうどのどが渇いていたんだよ。（ a 気がきく    b 気が立つ ）ね。 -> a
"""

def parse_blocks(raw):
    blocks = raw.strip().split("===")
    trainings = []
    for block in blocks:
        if not block.strip():
            continue
        lines = block.strip().split("\n")
        num = lines[0].strip()
        title = lines[1].strip()
        questions = []
        for line in lines[2:]:
            if "->" not in line:
                continue
            q_part, ans_part = line.split("->")
            q_text = q_part.split(".", 1)[1].strip()
            ans_key = ans_part.strip()
            
            # Extract options from q_text: （ a XXX    b YYY ）
            m = re.search(r'（\s*a\s+(.*?)\s+b\s+(.*?)\s*）', q_text)
            opt_a = "a " + m.group(1).strip()
            opt_b = "b " + m.group(2).strip()
            
            ans_idx = 0 if ans_key == "a" else 1
            ans_text = opt_a if ans_key == "a" else opt_b
            
            questions.append({
                "questionText": q_text,
                "options": [opt_a, opt_b],
                "correctOption": {
                    "index": ans_idx,
                    "text": ans_text
                },
                "explanation": ""
            })
            
        trainings.append({
            "id": f"training-{num}",
            "title": title,
            "type": "questions-only",
            "description": f"集中トレーニング{num}（a/b選択・10問）",
            "sections": [
                {
                    "title": title.replace("（", " ").replace("）", ""),
                    "mondaiHeader": "（　）の中のaとbのうち、文に合うほうを選びましょう。",
                    "passageText": "",
                    "questions": questions
                }
            ]
        })
    return trainings

def insert_trainings():
    with open(db_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    chapters = data.get("chapters", [])
        
    trainings = parse_blocks(raw_data)
    
    # vocab-10 is index 9, so training-3 and 4 should be inserted at index 10
    # Wait, we need to find the correct index dynamically.
    def get_index(ch_id):
        for i, ch in enumerate(chapters):
            if ch["id"] == ch_id:
                return i
        return -1
        
    t_map = {
        "training-3": "vocab-10",
        "training-4": "vocab-10",
        "training-5": "vocab-15",
        "training-6": "vocab-15",
        "training-7": "vocab-20",
        "training-8": "vocab-20",
        "training-9": "vocab-25",
        "training-10": "vocab-25"
    }
    
    for t in trainings:
        # Check if already exists
        idx = get_index(t["id"])
        if idx != -1:
            print(f"{t['id']} already exists, replacing it")
            chapters[idx] = t
        else:
            anchor = t_map[t["id"]]
            idx = get_index(anchor)
            if idx != -1:
                if t["id"] in ["training-4", "training-6", "training-8", "training-10"]:
                    prev_t_id = f"training-{int(t['id'].split('-')[1])-1}"
                    idx2 = get_index(prev_t_id)
                    if idx2 != -1:
                        chapters.insert(idx2 + 1, t)
                    else:
                        chapters.insert(idx + 1, t)
                else:
                    chapters.insert(idx + 1, t)
            else:
                chapters.append(t)
                
    data["chapters"] = chapters
                
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Successfully inserted 8 training chapters into JSON.")

if __name__ == "__main__":
    insert_trainings()
