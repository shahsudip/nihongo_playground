import urllib.request
import json
import re

# Fetch raw page from AnkiWeb
req = urllib.request.Request(
    'https://ankiweb.net/shared/info/716786929',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        print(f"HTML length: {len(html)}")
        # Look for SvelteKit data or embedded json
        data_matches = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
        for m in data_matches:
            if 'deck' in m.lower() or 'japanese' in m.lower() or 'card' in m.lower() or 'sample' in m.lower():
                print("Found match in script:", m[:500])
except Exception as e:
    print("Error:", e)
