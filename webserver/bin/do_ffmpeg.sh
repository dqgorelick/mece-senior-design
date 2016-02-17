#!/bin/sh

~/../../bin/ffmpeg/ffmpeg \
-s 320x240 -f video4linux2 -f dshow -i /dev/video0 -f mpeg1video -b 800k -r 30 http://127.0.0.1:8082 \
-s 320x240 -r 0.5 image.jpg



