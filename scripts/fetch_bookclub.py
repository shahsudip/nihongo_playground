import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

urls = [
    'https://bookclub.japantimes.co.jp/jp/book/b593577.html', # N3
    'https://bookclub.japantimes.co.jp/jp/book/b491839.html', # N2 1
    'https://bookclub.japantimes.co.jp/jp/book/b588374.html', # N2 2
]

for url in urls:
    print(f'=== Fetching {url} ===')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            title = re.search(r'<title>(.*?)</title>', html)
            print('Title:', title.group(1) if title else 'No title')
            for line in html.splitlines():
                if any(ext in line.lower() for ext in ['.zip', '.mp3', 'download', 'oto', 'audio', '音声']):
                    print('Line:', line.strip()[:150])
    except Exception as e:
        print('Error:', e)
