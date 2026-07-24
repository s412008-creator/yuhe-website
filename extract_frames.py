import cv2
import os

vidcap = cv2.VideoCapture('/Users/zhuangzijin/Desktop/Screenshots/螢幕錄影 2026-07-24 晚上7.36.27.mov')
success, image = vidcap.read()
count = 0
fps = int(vidcap.get(cv2.CAP_PROP_FPS) or 30)
interval = fps # 1 frame per second

while success:
    if count % interval == 0:
        cv2.imwrite(f"frame_{count//interval}.jpg", image)
    success, image = vidcap.read()
    count += 1
    if count > fps * 10: # limit to 10 seconds
        break
