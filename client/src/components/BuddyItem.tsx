import React, {Component} from 'react';
import {StyleSheet, Animated, Easing, Alert} from 'react-native';

import {Card, ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface Props {
    name: string,
    _id: string,
    device_id: string
    updateBuddies: () => void
}

interface IState {
  showDeleteIcon: boolean
}

const motionAnim = new Animated.Value(0);

class BuddyItem extends Component<Props> {
  state: IState;

  constructor(props: Props) {
      super(props);

      this.state = {
        showDeleteIcon: false
      }
  } 

  deleteBuddy = () : void => {
    fetch('http://10.150.147.71:3000/api/users/gallo/' + this.props.device_id + '/' + this.props._id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(response => response.json()) //Promise
          .then(response => {
            console.log("Buddy deleted!");
            this.setState({
              showDeleteIcon: false
            });
            this.props.updateBuddies();
          });
  }

  leftSpinDelete = () : void => {
    if (!this.state.showDeleteIcon) {
      this.setState({
        showDeleteIcon: true
      }, () => {
        Alert.alert(
          'Deleting buddy',
          'Are you sure? This is a permanent action!',
          [
            { 
              text: 'Cancel',
              onPress: () => this.setState({showDeleteIcon: false}),
              style: 'cancel'
            },
            {
              text: 'Confirm',
              onPress: () => this.deleteBuddy()
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

  render() {
    const spin = motionAnim.interpolate({
      inputRange: [0,1],
      outputRange: ['-38deg', '38deg']
    })
      return (
          <Card containerStyle={styles.buddy}>
            <ListItem
              //key={this.props.key}
              /*onPress={() => this.props.navigation.navigate('Device', {
                _id: this.props._id,
                name: this.props.name,
                ip: this.props.ip,
                members: this.props.members,
              })}*/
              onLongPress={this.leftSpinDelete}
              leftAvatar={ <Icon name='user' size={30} />}
              title={this.props.name}
              rightIcon={this.state.showDeleteIcon? (<AnimatedIcon style={{
                color: "red",
                transform: [{rotate: spin}]
              }} name='trash' size={25} />): (null) }  
            />
          </Card>
      );
  }
}

export default BuddyItem;

const styles = StyleSheet.create({
    buddy: {
      borderRadius: 50
    }
  });