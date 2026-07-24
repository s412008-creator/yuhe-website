import urllib.request
import urllib.parse
import json
import re

url = "https://www.yuhebuilding.com/" + urllib.parse.quote("所有商品")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

match = re.search(r'wix-warmup-data="([^"]+)"', html)
if match:
    data = json.loads(match.group(1).replace('&quot;', '"'))
    products = data['appsWarmupData']['1380b703-ce81-ff05-f115-39571d94dfcd']['744853f3-8600-44bf-aebe-6271d02b1518']['catalog']['category']['products']
    for p in products:
        name = p['name']
        img_url = p['media'][0]['fullUrl']
        print(f"{name} || {img_url}")
