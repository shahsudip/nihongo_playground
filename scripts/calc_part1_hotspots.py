import cv2
import json
import os

pages_data = [
    {
        'page': 6,
        'book_page': 2,
        'mondai_num': 1,
        'mondai_title': '課題理解 (Task-Based Comprehension)',
        'reidai_label': '例題1',
        'track_code': 'A-01',
        'audio_filename': '01 Track 1.mp3',
        'crop_y_range': (900, 1100),
    },
    {
        'page': 8,
        'book_page': 4,
        'mondai_num': 2,
        'mondai_title': 'ポイント理解 (Key Point Comprehension)',
        'reidai_label': '例題2',
        'track_code': 'A-02',
        'audio_filename': '02 Track 2.mp3',
        'crop_y_range': (900, 1100),
    },
    {
        'page': 10,
        'book_page': 6,
        'mondai_num': 3,
        'mondai_title': '概要理解 (General / Gist Comprehension)',
        'reidai_label': '例題3',
        'track_code': 'A-03',
        'audio_filename': '03 Track 3.mp3',
        'crop_y_range': (780, 1000),
    },
    {
        'page': 12,
        'book_page': 8,
        'mondai_num': 4,
        'mondai_title': '発話表現 (Utterance Expressions)',
        'reidai_label': '例題4',
        'track_code': 'A-04',
        'audio_filename': '04 Track 4.mp3',
        'crop_y_range': (780, 1000),
    },
    {
        'page': 14,
        'book_page': 10,
        'mondai_num': 5,
        'mondai_title': '即時応答 (Quick Response)',
        'reidai_label': '例題5',
        'track_code': 'A-05',
        'audio_filename': '05 Track 5.mp3',
        'crop_y_range': (780, 1000),
    }
]

detailed_results = []
os.makedirs('tmp_inspect', exist_ok=True)

for item in pages_data:
    p = item['page']
    img_path = f'public/shinkanzen_listening_pages/page_{p:03d}.jpg'
    img = cv2.imread(img_path)
    h, w, _ = img.shape
    
    y1, y2 = item['crop_y_range']
    # Headphone badge region
    roi_hp = img[y1:y2, 330:460]
    gray_hp = cv2.cvtColor(roi_hp, cv2.COLOR_BGR2GRAY)
    _, th_hp = cv2.threshold(gray_hp, 220, 255, cv2.THRESH_BINARY_INV)
    cnts_hp, _ = cv2.findContours(th_hp, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    hx1, hy1, hx2, hy2 = 9999, 9999, 0, 0
    for c in cnts_hp:
        bx, by, bw, bh = cv2.boundingRect(c)
        if bw > 5 and bh > 5:
            hx1 = min(hx1, bx)
            hy1 = min(hy1, by)
            hx2 = max(hx2, bx + bw)
            hy2 = max(hy2, by + bh)
    hp_abs_x = 330 + hx1
    hp_abs_y = y1 + hy1
    hp_abs_w = hx2 - hx1
    hp_abs_h = hy2 - hy1
    
    # Reidai title region
    roi_rd = img[y1:y2, 160:330]
    gray_rd = cv2.cvtColor(roi_rd, cv2.COLOR_BGR2GRAY)
    _, th_rd = cv2.threshold(gray_rd, 220, 255, cv2.THRESH_BINARY_INV)
    cnts_rd, _ = cv2.findContours(th_rd, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    rx1, ry1, rx2, ry2 = 9999, 9999, 0, 0
    for c in cnts_rd:
        bx, by, bw, bh = cv2.boundingRect(c)
        if bw > 5 and bh > 5:
            rx1 = min(rx1, bx)
            ry1 = min(ry1, by)
            rx2 = max(rx2, bx + bw)
            ry2 = max(ry2, by + bh)
    rd_abs_x = 160 + rx1
    rd_abs_y = y1 + ry1
    rd_abs_w = rx2 - rx1
    rd_abs_h = ry2 - ry1
    
    pad = 8
    comb_x = max(0, min(rd_abs_x, hp_abs_x) - pad)
    comb_y = max(0, min(rd_abs_y, hp_abs_y) - pad)
    comb_w = min(w, max(rd_abs_x + rd_abs_w, hp_abs_x + hp_abs_w) + pad) - comb_x
    comb_h = min(h, max(rd_abs_y + rd_abs_h, hp_abs_y + hp_abs_h) + pad) - comb_y
    
    # Verification overlay
    vis = img.copy()
    cv2.rectangle(vis, (hp_abs_x, hp_abs_y), (hp_abs_x + hp_abs_w, hp_abs_y + hp_abs_h), (255, 0, 255), 2)
    cv2.rectangle(vis, (rd_abs_x, rd_abs_y), (rd_abs_x + rd_abs_w, rd_abs_y + rd_abs_h), (255, 255, 0), 2)
    cv2.rectangle(vis, (comb_x, comb_y), (comb_x + comb_w, comb_y + comb_h), (0, 255, 0), 3)
    track_str = item['track_code']
    cv2.putText(vis, f"Audio: {track_str}", (comb_x, comb_y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 200, 0), 2)
    
    res = {
        'page': p,
        'book_page': item['book_page'],
        'mondai_num': item['mondai_num'],
        'mondai_title': item['mondai_title'],
        'reidai_label': item['reidai_label'],
        'track_code': item['track_code'],
        'audio_filename': item['audio_filename'],
        'audio_path': f"/audio/shinkanzen_listening/CD1/{item['audio_filename']}",
        'page_image_path': f"/shinkanzen_listening_pages/page_{p:03d}.jpg",
        'headphone_badge_hotspot': {
            'percent': {
                'x': round(hp_abs_x / w * 100, 2),
                'y': round(hp_abs_y / h * 100, 2),
                'width': round(hp_abs_w / w * 100, 2),
                'height': round(hp_abs_h / h * 100, 2)
            },
            'pixel': {'x': hp_abs_x, 'y': hp_abs_y, 'width': hp_abs_w, 'height': hp_abs_h}
        },
        'reidai_title_hotspot': {
            'percent': {
                'x': round(rd_abs_x / w * 100, 2),
                'y': round(rd_abs_y / h * 100, 2),
                'width': round(rd_abs_w / w * 100, 2),
                'height': round(rd_abs_h / h * 100, 2)
            },
            'pixel': {'x': rd_abs_x, 'y': rd_abs_y, 'width': rd_abs_w, 'height': rd_abs_h}
        },
        'combined_header_hotspot': {
            'percent': {
                'x': round(comb_x / w * 100, 2),
                'y': round(comb_y / h * 100, 2),
                'width': round(comb_w / w * 100, 2),
                'height': round(comb_h / h * 100, 2)
            },
            'pixel': {'x': comb_x, 'y': comb_y, 'width': comb_w, 'height': comb_h}
        }
    }
    
    if p == 12:
        ill_x, ill_y, ill_w, ill_h = 510, 1469, 1065, 831
        cv2.rectangle(vis, (ill_x, ill_y), (ill_x + ill_w, ill_y + ill_h), (0, 0, 255), 3)
        cv2.putText(vis, 'Illustration Box', (ill_x, ill_y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        res['illustration_box'] = {
            'percent': {
                'x': round(ill_x / w * 100, 2),
                'y': round(ill_y / h * 100, 2),
                'width': round(ill_w / w * 100, 2),
                'height': round(ill_h / h * 100, 2)
            },
            'pixel': {'x': ill_x, 'y': ill_y, 'width': ill_w, 'height': ill_h}
        }
        
    cv2.imwrite(f'tmp_inspect/exact_vis_p{p}.jpg', vis)
    detailed_results.append(res)

with open('tmp_inspect/part1_hotspots.json', 'w', encoding='utf-8') as f:
    json.dump(detailed_results, f, ensure_ascii=False, indent=2)

print('Successfully generated part1_hotspots.json and visualization images.')
