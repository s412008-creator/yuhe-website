import re

filepath = 'generate.js'
with open(filepath, 'r') as f:
    content = f.read()

images = {
    'Sika Latex®-700 Protect': 'https://static.wixstatic.com/media/13d483_7caf9b67ad4b4cb39ee834f6c1eaee6c~mv2.jpg',
    'SikaCeram®-252 StarFlex': 'https://static.wixstatic.com/media/13d483_9706aa16a95a44fb89778eb01a4d1f8e~mv2.jpg',
    'Sikaflex®-11 FC+': 'https://static.wixstatic.com/media/13d483_5ffd7fae088a4349a107155f17cc42bf~mv2.jpg',
    'SikaCeram®-650Classic': 'https://static.wixstatic.com/media/13d483_016dc30ef99b4069af03248c0a653347~mv2.jpg',
    'SikaTop®-109 Elasto': 'https://static.wixstatic.com/media/13d483_85a0bbcd800b42ae867a7d2fc0bfa25a~mv2.jpg',
    'SikaTop®-50': 'https://static.wixstatic.com/media/13d483_f34d1cf9584a4eb18dc21833a1cb0de6~mv2.jpg',
    'SikaTop®-10': 'https://static.wixstatic.com/media/13d483_54cf1e6c34ba44dc9c349e0423d26b68~mv2.jpg',
    'SikaCeram®-260 StarFlex': 'https://static.wixstatic.com/media/13d483_e1111090360947a4a35e7bb7c7d68cc3~mv2.jpg',
    'SikaCeram®-288 MY': 'https://static.wixstatic.com/media/13d483_55b636a0bf224dc798c392885abbc623~mv2.jpg'
}

for name, url in images.items():
    # Find the span with class product-category that is just before the h3 containing 'name'
    # and insert the img tag before the span.
    pattern = r'(<span class="product-category">[^<]+</span>\s*<h3 class="product-title"[^>]*>' + re.escape(name) + r')'
    replacement = f'<div style="text-align: center;"><img src="{url}" loading="lazy" style="width: 100%; height: 220px; object-fit: contain; margin-bottom: 24px;"></div>\\n              \\1'
    content = re.sub(pattern, replacement, content)

# Add lazy loading to iframe
content = content.replace('<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?', '<iframe loading="lazy" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?')

# Remove hero.png preload if any
content = content.replace('<img src="hero.png"', '<img src="hero.png" loading="lazy"')

with open(filepath, 'w') as f:
    f.write(content)
