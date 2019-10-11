import RPi.GPIO as GPIO
import time
from lightsensor import lightlevel
from yeelight import Bulb
from picamera import PiCamera
from provacamera import startrec, stoprec

bulb = Bulb("10.150.147.61")
pir_sensor = 11


def detectmotion():
    current_state = 0
    while (not current_state):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(pir_sensor, GPIO.IN)
        time.sleep(0.3)
        current_state = GPIO.input(pir_sensor)
        if current_state == 1:
            GPIO.cleanup()
            if not lightlevel():
                bulb.turn_on()
            return(current_state)
            
            
print(detectmotion())
