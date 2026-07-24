import urllib.request
import re

url = "https://www.yuhebuilding.com/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
except Exception as e:
    import urllib.error
    if hasattr(e, 'partial'):
        html = e.partial.decode('utf-8')

urls = set(re.findall(r'https://static\.wixstatic\.com/media/[a-zA-Z0-9_]+~mv2\.(?:jpg|png)', html))
for u in urls:
    print(u)
