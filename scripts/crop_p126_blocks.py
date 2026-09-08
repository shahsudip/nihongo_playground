from PIL import Image

img = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0126.jpg')
img.crop((1000, 1300, 1400, 1600)).save('tmp_inspect/individual_checks/p126_block1.jpg')
img.crop((300, 1700, 700, 2000)).save('tmp_inspect/individual_checks/p126_block2.jpg')
print("Saved p126 blocks")
