class Color:
    def __init__(self, pin, name):
   	    self.name = name
   	    self.pin  = pin

colorRed = Color( 12 , "red")
colorBlue = Color(13,  "blue")
colorGreen = Color(16, "green")
colors = [colorRed,colorBlue,colorGreen]

colorSelect = sys.argv[1]
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

for color in colors:
    GPIO.setup(color.pin,GPIO.OUT)
    if color.name==colorSelect:
   	 GPIO.output(color.pin,GPIO.HIGH)
    else:
   	 GPIO.output(color.pin,GPIO.LOW)
