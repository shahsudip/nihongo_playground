import os, sys
from PIL import Image
import numpy as np

# Let's inspect page 107 layout
p107 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0107.jpg')
W, H = p107.size
# Let's crop the main passage box (y: 10% to 90%)
p107.crop((int(W*0.08), int(H*0.12), int(W*0.92), int(H*0.92))).save('tmp_inspect/individual_checks/p107_route_map.jpg')

# Let's inspect page 126 (mock exam Mondai 5)
p126 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0126.jpg')
p126.crop((int(W*0.08), int(H*0.10), int(W*0.92), int(H*0.92))).save('tmp_inspect/individual_checks/p126_passage_box.jpg')

# Let's inspect page 127 (mock exam Mondai 5 questions / diagram choices)
p127 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0127.jpg')
p127.crop((int(W*0.08), int(H*0.08), int(W*0.92), int(H*0.92))).save('tmp_inspect/individual_checks/p127_questions.jpg')

print("Saved p107, p126, p127 crops")
