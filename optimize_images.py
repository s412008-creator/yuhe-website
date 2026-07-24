import re

filepath = 'generate.js'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('~mv2.jpg"', '~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg"')

with open(filepath, 'w') as f:
    f.write(content)
