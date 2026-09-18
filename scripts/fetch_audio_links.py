import urllib.request
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = 'https://bookclub.japantimes.co.jp/jp/book/b593577.html'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8', errors='ignore')
        print('Fetched length:', len(html))
        
        # Look for links
        links = re.findall(r'href=[\"\'](.*?)[\"\']', html)
        for l in links:
            if any(k in l.lower() for k in ['zip', 'mp3', 'pdf', 'download', 'audio', 'file', 'oto']):
                print('Found link:', l)
                
        # Also print sections mentioning ダウンロード or 音声
        for line in html.splitlines():
            if '音声' in line or 'ダウンロード' in line or 'OTO' in line or 'oto' in line:
                print('Text line:', line.strip())
except Exception as e:
    print('Error:', e)
