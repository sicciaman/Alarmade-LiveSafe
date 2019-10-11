from picamera import PiCamera
import time 
from datetime import datetime, timedelta

camera = PiCamera()

def startRec():
    timeend = datetime.now()
    timestamp = str(datetime.now())
    camera.resolution = (640, 480)
    camera.start_recording("../recordedVideos/video_sec_" + timestamp + ".h264")
    while(datetime.now() < timeend + timedelta(seconds=30)):
        time.sleep(1)
    camera.stop_recording()
    return 200
    
print(startRec())
