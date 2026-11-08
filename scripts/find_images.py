import urllib.request
import re

url = 'https://www.spot.uz/uz/2022/11/17/anvar-abduqayum/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        images = re.findall(r'https?://[^\s\"\'<>]+\.(?:jpg|jpeg|png|webp)', html)
        for img in set(images):
            if any(k in img.lower() for k in ['spot', 'upload', 'anvar', 'media']):
                print(img)
except Exception as e:
    print('Error:', e)
