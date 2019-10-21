// BuddyItem component displayed when user select a Device
import React, {Component, useState} from 'react';
import { StyleSheet, Animated, Easing, Alert, Switch, View, Vibration } from 'react-native';

import { Card, ListItem, Tooltip, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import RNEventSource from 'react-native-event-source';
import PushNotification from 'react-native-push-notification';

import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native-gesture-handler';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

// Parameters of Device
interface Props {
  name: string,
  email: string,
  ip: string,
  _id: string,
  status: boolean,
  members: [],
  updateDevices: () => void
}

interface IState {
  showDeleteIcon: boolean,
  active: boolean,
  eventSourceMotion:RNEventSource,
  eventSourceVideo: RNEventSource
}

// Variable for deleteIcon animation
const motionAnim = new Animated.Value(0);

// Animation parameters
const spin = motionAnim.interpolate({
  inputRange: [0,1],
  outputRange: ['-38deg', '38deg']
})


class DeviceItem extends Component<Props> {
  state: IState;

  constructor(props: Props) {
    super(props);

    this.state = {
      showDeleteIcon: false,
      active: this.props.status,
      eventSourceMotion: null,
      eventSourceVideo: null
    }
    this.sendNotification = this.sendNotification.bind(this);
  }

  // Push Notification if motion sensor return 1
  sendNotification() {
    PushNotification.localNotification({
      id: '1',
      title: 'Caution!',
      message: "Alarmade has detected an infringement!",
      visibility: 'public',
      vibrate: true,
      repeateType: 'minute',
    });
  };

   // Invoke after press deleteIcon of a device element -> invoke delete API
  deleteDevice = () : void => {
    fetch('http://192.168.137.1:3000/api/users/' + this.props.email + '/devices/' + this.props._id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(response => response.json()) //Promise
          .then(response => {
            console.log("Device deleted!");
            this.setState({
              showDeleteIcon: false
            });
            // Update Devices list 
            this.props.updateDevices();
          });
  }

  // DeleteIcon animation 
  leftSpinDelete = () : void => {
    if (!this.state.showDeleteIcon) {
      this.setState({
        showDeleteIcon: true
      }, () => {
        // Show a window alert to confirm action
        Alert.alert(
          'Deleting device',
          'Are you sure? This is a permanent action!',
          [
            { 
              text: 'Cancel',
              onPress: () => this.setState({showDeleteIcon: false}),
              style: 'cancel'
            },
            {
              text: 'Confirm',
              onPress: () => this.deleteDevice()
            }
          ],
          {
            onDismiss: () => this.setState({showDeleteIcon: false})
          }
        )
      });     
    } 
    motionAnim.setValue(0);
    Animated.timing(motionAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease
    }).start(() => {
        this.rightSpinDelete();
    })
  }

  // DeleteIcon animation
  rightSpinDelete = () : void => {
    motionAnim.setValue(1);
    Animated.timing(motionAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease
    }).start(() => {
      if(this.state.showDeleteIcon)
        this.leftSpinDelete();
    })
  }

  // Invoke when press switch button of a Device
  setActive = () => {
    // Set status field in DB
    fetch('http://192.168.137.1:3000/api/users/' + this.props.email + '/' + this.props._id + '/setStatus', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Send !status of current device
        status: !this.state.active,
      }),
    })
    .then(response => response.json()) //Promise
    .then(response => {
      console.log("Status updated!");
      this.setState({
        // update component state
        active: !this.state.active
      }, () => {
        console.log(this.state.active)
        // If device is active
        if (this.state.active) {    
          this.setState({
            // Invoke motion sensor API and wait for an event
            eventSourceMotion: new RNEventSource('http://' + this.props.ip + ':8000/api/detectMotion')
          }, () => {
            // Motion sensor respond only if capture motion
            this.state.eventSourceMotion.addEventListener('message', (e) => {
              console.log(e.data);
              // After API send a response, we close communication
              this.state.eventSourceMotion.removeAllListeners();
              this.state.eventSourceMotion.close();
              // Push an Alert notification 
              this.sendNotification();
              this.setState({
                // Invoke Camera API to start registration
                eventSourceVideo: new RNEventSource('http://' + this.props.ip + ':8000/api/startRec')
              }, () => {
                this.state.eventSourceVideo.addEventListener('message', (e) => {
                  console.log(e.data);
                  // When camera stop recording, send a response e stop listen for an event
                  this.state.eventSourceVideo.removeAllListeners();
                  this.state.eventSourceVideo.close();
                });
              });
            });
          });        
        } else {
          // if event Sources are activated and user turn off the device stop the communication with API on Raspberry
          if(this.state.eventSourceMotion != null) {
            this.state.eventSourceMotion.removeAllListeners();
            this.state.eventSourceMotion.close();
          }
          if(this.state.eventSourceVideo != null) {
            this.state.eventSourceVideo.removeAllListeners();
            this.state.eventSourceVideo.close();
          }
          // Cancel Notification 
          PushNotification.cancelLocalNotifications({id: '1'});
          // Turn off light 
          fetch('http://' + this.props.ip + ':8000/api/turnLightOff')
          .then(response => response.json()) //Promise
          .then(response => {
            console.log(response.data);
          });
        }
      });  
    })
  }

  render() {  
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Switch 
          onValueChange={this.setActive} 
          value={this.state.active} 
          style={{marginLeft: 18}} 
          //containerStyle={this.state.active ? [styles.device, animatedStyle] : styles.device}   
        />  
        <Card
          containerStyle={this.state.active ? [styles.device, styles.deviceOn] : [styles.device, styles.deviceOff]}   
        >
          <ListItem
            //key={this.props.key}
            onPress={() => this.props.navigation.navigate('Device', {
              _id: this.props._id,
              email: this.props.email,
              name: this.props.name,
              ip: this.props.ip,
              members: this.props.members,
            })}
            leftAvatar={ <Icon name='video-camera' size={30} />}
            title={this.props.name}
            subtitle={this.props.ip}
            containerStyle={styles.listItem} 
          />
        </Card>       
        <AnimatedIcon 
          onPress={this.leftSpinDelete}
          style={this.state.showDeleteIcon ? [styles.animatedIcon, {transform: [{rotate: spin}]}] : styles.deleteIcon} 
          name='trash' 
          size={25} 
        />
      </View>
    )
  }
}

export default withNavigation(DeviceItem);

const styles = StyleSheet.create({
  device: {
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    minWidth: 250,
    width: '60%',
    
  },
  deviceOn: {
    borderColor: '#00cc99',
    backgroundColor: 'rgba(0, 204, 153, 0.3)'
  },
  deviceOff: {
    borderColor: "#ff6666",
    backgroundColor: 'rgba(255, 102, 102, 0.2)'
  },
  deleteIcon: {
    textAlignVertical: 'center',
    paddingRight: 5
  },
  animatedIcon: {
    color: "red", 
    textAlignVertical: 'center',
    paddingRight: 5
  },
  listItem: {
    height: 70,
    overflow: 'hidden',
  
  }
});
