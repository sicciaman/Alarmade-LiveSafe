import React, {Component, useState} from 'react';
import { StyleSheet, Animated, Easing, Alert, Switch, View } from 'react-native';

import { Card, ListItem, Tooltip, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native-gesture-handler';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);


interface Props {
  name: string,
  ip: string,
  _id: string,
  status: boolean,
  members: [],
  updateDevices: () => void
}

interface IState {
  showDeleteIcon: boolean,
  active: boolean
}

const motionAnim = new Animated.Value(0);


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
      active: this.props.status
    }

  }

  deleteDevice = () : void => {
    fetch('http://192.168.137.1:3000/api/users/gallo/devices/' + this.props._id, {
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
            this.props.updateDevices();
          });
  }

  leftSpinDelete = () : void => {
    if (!this.state.showDeleteIcon) {
      this.setState({
        showDeleteIcon: true
      }, () => {
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

  setActive = () => {
    fetch('http://192.168.137.1:3000/api/users/gallo/' + this.props._id + '/setStatus', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: !this.state.active,
            }),
        })
        .then(response => response.json()) //Promise
        .then(response => {
          console.log("Status updated!");
          this.setState({
            active: !this.state.active
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
