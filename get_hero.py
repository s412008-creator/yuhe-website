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

# The hero section usually has the image URL near "Architectural" or in the first few images
idx = html.find("Architectural")
if idx != -1:
    context = html[max(0, idx-2000):idx+2000]
    urls = re.findall(r'13d483_[a-zA-Z0-9]+~mv2\.jpg', context)
    print("Found near 'Architectural':", list(set(urls)))
