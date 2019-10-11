// New Buddy Window Component
import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import { Button, Overlay, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IState {
    name: string,
};

interface Props {
  device_id: string,
  visibility: () => void,
  updateBuddies: () => void,
  addingNewBuddy: boolean,
  user: string
}
export default class NewDeviceOverlay extends Component<Props> {
    state: IState;
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
        }
    }

    // Invoke after user press submit button
    addNewBuddy = () : void => {
        // Call PUT API for update buddies of current device
        if(this.state.name !== "") {
          fetch('http://192.168.137.1:3000/api/users/' + this.props.user + '/' + this.props.device_id + '/buddies', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.name,
            }),
          })
          .then(response => response.json()) //Promise
          .then(response => {
            console.log("New Buddy!");
            // Update buddies list
            this.props.updateBuddies();
            // Hidden add Buddy window
            this.props.visibility();
          });
        } else {
          // Alert user to insert a valid name field
          Alert.alert(
            'Insert name for your buddy!'
          )
        }
      }

    render() {
        return(
            <Overlay
            isVisible={this.props.addingNewBuddy}
            onBackdropPress={this.props.visibility}
            height="auto"
            > 
                <View>  
                    <Text 
                    h4
                    h4Style={styles.addBuddyTitle}
                    >
                        Buddy
                    </Text>
                    <Input
                    placeholder='Name'
                    onChangeText={(text) => this.setState({name: text})}
                    leftIcon={
                        <Icon
                        name='user'
                        size={24}
                        color='black'
                        style={{marginRight: 15}}
                        />
                    }
                    />
                    <View style={styles.addBuddyButton}>
                        <Button
                        title="Add"
                        onPress={() => this.addNewBuddy()}
                        />
                    </View>     
                </View>
            </Overlay>
        )
    }
}  


const styles = StyleSheet.create({
    addBuddyTitle: {
      textAlign: 'center',
      color: "#0f0f0f"
    },
    addBuddyButton: {
      marginTop: 30
    }
  });