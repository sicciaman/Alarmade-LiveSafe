import RPi.GPIO as GPIO
import time



def lightlevel():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(4,GPIO.IN)
    time.sleep(0.5)
    return GPIO.input(4)


