import cv2
import json

precise_data = [
  {
    'page': 6, 'book_page': 2, 'mondai': 1, 'track': 'A-01', 'audio': '01 Track 1.mp3',
    'headphone_badge': {'percent': {'x': 20.66, 'y': 30.41, 'width': 3.77, 'height': 2.14}, 'pixel': {'x': 444, 'y': 923, 'width': 81, 'height': 65}},
    'reidai_badge': {'percent': {'x': 8.33, 'y': 30.08, 'width': 9.40, 'height': 2.57}, 'pixel': {'x': 179, 'y': 913, 'width': 202, 'height': 78}},
    'full_header_hotspot': {'percent': {'x': 8.05, 'y': 29.88, 'width': 16.66, 'height': 2.97}, 'pixel': {'x': 173, 'y': 907, 'width': 358, 'height': 90}}
  },
  {
    'page': 8, 'book_page': 4, 'mondai': 2, 'track': 'A-02', 'audio': '02 Track 2.mp3',
    'headphone_badge': {'percent': {'x': 19.40, 'y': 30.71, 'width': 3.77, 'height': 2.11}, 'pixel': {'x': 417, 'y': 932, 'width': 81, 'height': 64}},
    'reidai_badge': {'percent': {'x': 7.12, 'y': 30.35, 'width': 9.82, 'height': 2.54}, 'pixel': {'x': 153, 'y': 921, 'width': 211, 'height': 77}},
    'full_header_hotspot': {'percent': {'x': 6.84, 'y': 30.15, 'width': 16.61, 'height': 2.93}, 'pixel': {'x': 147, 'y': 915, 'width': 357, 'height': 89}}
  },
  {
    'page': 10, 'book_page': 6, 'mondai': 3, 'track': 'A-03', 'audio': '03 Track 3.mp3',
    'headphone_badge': {'percent': {'x': 20.38, 'y': 27.61, 'width': 4.75, 'height': 2.70}, 'pixel': {'x': 438, 'y': 838, 'width': 102, 'height': 82}},
    'reidai_badge': {'percent': {'x': 8.10, 'y': 27.22, 'width': 9.77, 'height': 3.10}, 'pixel': {'x': 174, 'y': 826, 'width': 210, 'height': 94}},
    'full_header_hotspot': {'percent': {'x': 7.82, 'y': 27.02, 'width': 17.59, 'height': 3.49}, 'pixel': {'x': 168, 'y': 820, 'width': 378, 'height': 106}}
  },
  {
    'page': 12, 'book_page': 8, 'mondai': 4, 'track': 'A-04', 'audio': '04 Track 4.mp3',
    'headphone_badge': {'percent': {'x': 19.45, 'y': 27.61, 'width': 3.77, 'height': 2.17}, 'pixel': {'x': 418, 'y': 838, 'width': 81, 'height': 66}},
    'reidai_badge': {'percent': {'x': 7.17, 'y': 27.25, 'width': 9.91, 'height': 2.57}, 'pixel': {'x': 154, 'y': 827, 'width': 213, 'height': 78}},
    'full_header_hotspot': {'percent': {'x': 6.89, 'y': 27.05, 'width': 16.61, 'height': 2.97}, 'pixel': {'x': 148, 'y': 821, 'width': 357, 'height': 90}},
    'illustration_box': {'percent': {'x': 23.73, 'y': 48.40, 'width': 49.56, 'height': 27.38}, 'pixel': {'x': 510, 'y': 1469, 'width': 1065, 'height': 831}}
  },
  {
    'page': 14, 'book_page': 10, 'mondai': 5, 'track': 'A-05', 'audio': '05 Track 5.mp3',
    'headphone_badge': {'percent': {'x': 19.45, 'y': 27.18, 'width': 3.77, 'height': 2.14}, 'pixel': {'x': 418, 'y': 825, 'width': 81, 'height': 65}},
    'reidai_badge': {'percent': {'x': 7.17, 'y': 26.75, 'width': 9.82, 'height': 2.57}, 'pixel': {'x': 154, 'y': 812, 'width': 211, 'height': 78}},
    'full_header_hotspot': {'percent': {'x': 6.89, 'y': 26.56, 'width': 16.61, 'height': 2.97}, 'pixel': {'x': 148, 'y': 806, 'width': 357, 'height': 90}}
  }
]

for item in precise_data:
    p = item['page']
    img = cv2.imread(f'public/shinkanzen_listening_pages/page_{p:03d}.jpg')
    h, w, _ = img.shape
    
    # Draw full header hotspot (green)
    f_h = item['full_header_hotspot']['percent']
    fx, fy, fw, fh = int(f_h['x']*w/100), int(f_h['y']*h/100), int(f_h['width']*w/100), int(f_h['height']*h/100)
    cv2.rectangle(img, (fx, fy), (fx+fw, fy+fh), (0, 220, 0), 3)
    track_str = item['track']
    cv2.putText(img, f"AUDIO HOTSPOT: {track_str}", (fx, fy-8), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 200, 0), 2)
    
    # Draw headphone badge (magenta)
    hp = item['headphone_badge']['percent']
    hx, hy, hw, hh = int(hp['x']*w/100), int(hp['y']*h/100), int(hp['width']*w/100), int(hp['height']*h/100)
    cv2.rectangle(img, (hx, hy), (hx+hw, hy+hh), (255, 0, 255), 2)
    
    if 'illustration_box' in item:
        ill = item['illustration_box']['percent']
        ix, iy, iw, ih = int(ill['x']*w/100), int(ill['y']*h/100), int(ill['width']*w/100), int(ill['height']*h/100)
        cv2.rectangle(img, (ix, iy), (ix+iw, iy+ih), (0, 0, 255), 3)
        cv2.putText(img, 'ILLUSTRATION BOX', (ix, iy-8), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        
    cv2.imwrite(f'tmp_inspect/verify_p{p}.jpg', img)

with open('public/shinkanzen_listening_pages/part1_hotspots.json', 'w', encoding='utf-8') as f:
    json.dump(precise_data, f, ensure_ascii=False, indent=2)

print('Updated Part 1 hotspots and verification images.')
