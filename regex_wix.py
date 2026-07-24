import urllib.request
import urllib.parse
import re

url = "https://www.yuhebuilding.com/" + urllib.parse.quote("所有商品")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# The JSON contains items like "name":"SikaTop®-10...","currency":"TWD","media":[{"url":"13d483_54cf...~mv2.jpg"
pattern = r'"name":"([^"]+)","currency":"[^"]+","media":\[{"url":"([^"]+)"'
matches = re.findall(pattern, html)

for name, img in matches:
    print(f"{name} === https://static.wixstatic.com/media/{img}")
