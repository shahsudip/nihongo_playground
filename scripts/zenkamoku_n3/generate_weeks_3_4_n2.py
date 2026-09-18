# -*- coding: utf-8 -*-
"""
generate_weeks_3_4_n2.py
Extracts and digitizes Week 3 and Week 4 of "全科目攻略JLPT日本語能力試験ベスト総合問題集N2".
Validates against scripts/zenkamoku_n2/answer_keys_raw.json.
Outputs to src/data/zenkamoku_n2/w03-d01.json .. w04-d05.json.
"""
import sys
import os
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cmd = [sys.executable, r"D:\sudip_software\nihongo_playground\scripts\zenkamoku_n2\generate_weeks_3_4.py"]
subprocess.run(cmd, check=True)
