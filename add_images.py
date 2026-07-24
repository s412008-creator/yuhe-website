import re
import os

filepath = '/Users/zhuangzijin/.gemini/antigravity-ide/scratch/yuhe-website/generate.js'
with open(filepath, 'r') as f:
    content = f.read()

replacements = [
    (
        '<span class="product-category">Mortar Additives</span>\\n              <h3 class="product-title" style="font-size: 16px; min-height: 50px;">Sika Latex®-700 Protect<br>增強型耐水黏著劑和砂漿添加劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_7caf9b67ad4b4cb39ee834f6c1eaee6c~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Mortar Additives</span>\\n              <h3 class="product-title" style="font-size: 16px; min-height: 50px;">Sika Latex®-700 Protect<br>增強型耐水黏著劑和砂漿添加劑</h3>'
    ),
    (
        '<span class="product-category">Tile Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px; min-height: 50px;">SikaCeram®-252 StarFlex<br>西班牙進口高變型曲折彈性黏著劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_9706aa16a95a44fb89778eb01a4d1f8e~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Tile Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px; min-height: 50px;">SikaCeram®-252 StarFlex<br>西班牙進口高變型曲折彈性黏著劑</h3>'
    ),
    (
        '<span class="product-category">Sealants</span>\\n              <h3 class="product-title" style="font-size: 16px; min-height: 50px;">Sikaflex®-11 FC+<br>單組分聚氨酯彈性密封膠</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_5ffd7fae088a4349a107155f17cc42bf~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Sealants</span>\\n              <h3 class="product-title" style="font-size: 16px; min-height: 50px;">Sikaflex®-11 FC+<br>單組分聚氨酯彈性密封膠</h3>'
    ),
    (
        '<span class="product-category">Additives</span>\\n              <h3 class="product-title" style="font-size: 16px;">Sika Latex®-700 Protect<br>增強型耐水黏著劑和砂漿添加劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_7caf9b67ad4b4cb39ee834f6c1eaee6c~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Additives</span>\\n              <h3 class="product-title" style="font-size: 16px;">Sika Latex®-700 Protect<br>增強型耐水黏著劑和砂漿添加劑</h3>'
    ),
    (
        '<span class="product-category">Grouts</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-650Classic<br>抗菌防霉水泥填縫劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_016dc30ef99b4069af03248c0a653347~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Grouts</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-650Classic<br>抗菌防霉水泥填縫劑</h3>'
    ),
    (
        '<span class="product-category">Waterproofing</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaTop®-109 Elasto<br>抗裂型水泥系聚合物改質防水塗層</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_85a0bbcd800b42ae867a7d2fc0bfa25a~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Waterproofing</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaTop®-109 Elasto<br>抗裂型水泥系聚合物改質防水塗層</h3>'
    ),
    (
        '<span class="product-category">Primer</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaTop®-50<br>多孔系水性底漆</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_f34d1cf9584a4eb18dc21833a1cb0de6~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Primer</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaTop®-50<br>多孔系水性底漆</h3>'
    ),
    (
        '<span class="product-category">Primer</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaTop®-10<br>水泥基材專用水性底漆</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_54cf1e6c34ba44dc9c349e0423d26b68~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Primer</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaTop®-10<br>水泥基材專用水性底漆</h3>'
    ),
    (
        '<span class="product-category">Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-260 StarFlex<br>西班牙進口高曲折彈性黏著劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_e1111090360947a4a35e7bb7c7d68cc3~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-260 StarFlex<br>西班牙進口高曲折彈性黏著劑</h3>'
    ),
    (
        '<span class="product-category">Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-252 StarFlex<br>西班牙進口高變型曲折彈性黏著劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_9706aa16a95a44fb89778eb01a4d1f8e~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-252 StarFlex<br>西班牙進口高變型曲折彈性黏著劑</h3>'
    ),
    (
        '<span class="product-category">Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-288 MY<br>馬來西亞進口高性能磁磚黏著劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_55b636a0bf224dc798c392885abbc623~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Adhesives</span>\\n              <h3 class="product-title" style="font-size: 16px;">SikaCeram®-288 MY<br>馬來西亞進口高性能磁磚黏著劑</h3>'
    ),
    (
        '<span class="product-category">Sealants</span>\\n              <h3 class="product-title" style="font-size: 16px;">Sikaflex®-11 FC+<br>單組分聚氨酯彈性密封膠與多功能黏著劑</h3>',
        '<img src="https://static.wixstatic.com/media/13d483_5ffd7fae088a4349a107155f17cc42bf~mv2.jpg" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 24px;">\\n              <span class="product-category">Sealants</span>\\n              <h3 class="product-title" style="font-size: 16px;">Sikaflex®-11 FC+<br>單組分聚氨酯彈性密封膠與多功能黏著劑</h3>'
    )
]

for old, new in replacements:
    content = content.replace(old, new)

with open(filepath, 'w') as f:
    f.write(content)
