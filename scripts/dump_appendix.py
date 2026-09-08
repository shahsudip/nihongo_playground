import sys
import os
from PIL import Image

os.makedirs('tmp_vocab', exist_ok=True)

# Let's crop page 154 into multiple sections and save them
p154 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0154.jpg')
p155 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0155.jpg')
p158 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0158.jpg')

# We can crop by vertical columns or horizontal bands
# Let's see dimensions: 1884 x 2669
p154.save('tmp_vocab/p154.jpg')
p155.save('tmp_vocab/p155.jpg')
p158.save('tmp_vocab/p158.jpg')
print("Saved full appendix pages.")
