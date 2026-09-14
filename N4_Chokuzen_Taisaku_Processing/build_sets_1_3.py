# -*- coding: utf-8 -*-
import json
import os

def build_data():
    sets_data = []

    # =========================================================================
    # SET 1
    # =========================================================================
    set1_vocab = [
        # Mondai 1 (Q1-Q9)
        {
            "id": 1,
            "questionText": "山川さんは <u>会社</u>の 人と 旅行へ 行きました。",
            "options": ["がっこう", "こうば", "かいしゃ", "きょうかい"],
            "correctIndex": 2, # 3
            "sectionType": "vocabulary-kanji",
            "instruction": "もんだい1 <u>　　</u>の ことばは ひらがなで どう かきますか。1・2・3・4から いちばん いい ものを ひとつ えらんで ください。"
        },
        {
            "id": 2,
            "questionText": "子どもの とき、<u>西洋</u>の 文学を たくさん 読みました。",
            "options": ["とうよう", "せいよう", "とうよ", "せいよ"],
            "correctIndex": 3, # 4 -> wait! In answer_key: ans is 4 -> wait! Let's check options order
            # Options from page: 1: とうよう, 2: せいよう (wait, let's check page 8 options order for Q2)
        }
    ]

if __name__ == '__main__':
    pass
