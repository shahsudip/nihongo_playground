import urllib.request
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

urls = [
    ('N1_Audio', 'https://bookclub2.japantimes.co.jp/download/files/The_Best_Complete_Workbook_for_JLPT_N1.zip', 'tmp_inspect/zenkamoku_n1/audio.zip'),
    ('N2_Audio', 'https://bookclub2.japantimes.co.jp/download/files/The_Best_Complete_Workbook_for_JLPT_N2.zip', 'tmp_inspect/zenkamoku_n2/audio.zip'),
    ('N2_Kaisetsu', 'https://bookclub2.japantimes.co.jp/download/files/Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N2.zip', 'tmp_inspect/zenkamoku_n2/kaisetsu.zip'),
    ('N1_Kaisetsu', 'https://bookclub2.japantimes.co.jp/download/files/Kaisetsu_The_Best_Complete_Workbook_for_JLPT_N1.zip', 'tmp_inspect/zenkamoku_n1/kaisetsu.zip'),
]

for label, url, dest in urls:
    print(f'Testing {label}: {url}...')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            cl = resp.headers.get('Content-Length')
            print(f'SUCCESS ({resp.status}): {url} -> Content-Length: {cl} bytes')
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            if not os.path.exists(dest) or os.path.getsize(dest) == 0:
                print(f'Downloading to {dest}...')
                with open(dest, 'wb') as f:
                    while True:
                        chunk = resp.read(1024 * 1024)
                        if not chunk:
                            break
                        f.write(chunk)
                print(f'Downloaded {dest}, size: {os.path.getsize(dest)} bytes')
            else:
                print(f'{dest} already exists ({os.path.getsize(dest)} bytes).')
    except Exception as e:
        print(f'FAILED: {url} -> {e}')
