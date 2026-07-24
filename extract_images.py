import urllib.request
import urllib.parse
import re

url = "https://www.yuhebuilding.com/" + urllib.parse.quote("所有商品")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

urls = set(re.findall(r'https://static\.wixstatic\.com/media/[a-zA-Z0-9_]+~mv2\.jpg', html))
for u in urls:
    print(u)
