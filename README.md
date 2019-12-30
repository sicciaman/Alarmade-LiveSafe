# Alarmade-LiveSafe
**A security system application working w/ Raspberry Pi**

*Note: you need these components to integrate all functions:* **PIR motion sensor**, **brightness-sensor**, **Yeelight Smart RGB Bulb** and **PiCamera module**. 

I'm doing this little DIY project to experiment app development with React Native and communication of IoT devices in Raspberry field.

**This app (at this moment) is composed by these modules:**
- **Login**
- **Register**
- **Home**
- **Device**

## Login
The Login view, where a registered user can insert his personal **access informations**, with the possibility to show/hidden password field.
After he press submit button, the data entered are compared to db users and eventually (if corrected) redirected to his **Homepage**.

![Login](https://imgur.com/q0GsdUi.png)

*Future possible implementation: a solid authentication system*

## Registration
If the user isn't registered yet, can click on link in Login screen and navigate to Registration section where he need to insert **3 fields**:
- Email 
- Password
- Confirm Password
The system check if email contains **special characters** like '@' or '.', while password length need to be at least 8.

![Registration](https://imgur.com/E00w3EP.png)

*Future possible implementation: check that email is unique data in DB to confirm registration*

## Home
The homepage screen is where are showed user **associated devices**. If he haven't devices yet, he can add one with an **Overlay** that appears if he press 'Add View'.
To add a new device he must insert a **name and the device IP**.

So the user can **check/set devices status** through a switch button, **delete** or enter **selecting** a specific device.
Turning on a device, the system call API in device server that start a script that send back a response only if motion sensor **notices** something.
If the event listener is triggered by a message, a **push notification** is displayed to the user. In addition, the script on Raspberry, if motion is caught by the sensor, **check environment brightness**, **turns on the Smart Bulb** if it's dark, and **start recording** a video with PICamera module. 

If user **turns off** the device, the **smart bulb turns off and close the event listeners**.

![Devices Homepage](https://imgur.com/ewVYgxA.png)

*Future possible implementation: edit device informations - Human recognition to avoid pets detection*

## Device
*Work in progress*

This section is, at the moment, open for future developments. In this section, the user can see buddies(familiars, friends, etc.) of the selected device. The idea is to develop a facial recognition part that allow to the system to track, if alarm is triggered, that the cause was only a buddy maybe because he forgot keys inside or you are in vacation and your best friend must water the plants.
So, to work, user needs to upload buddies photo or directly through the Raspberry create a dataset to train the facial recognition alghoritm. 

In the last update, I've added a **live video streaming** of the selected camera to have a complete control of the situation.

![Buddies](https://imgur.com/QZBpCsx.png)


