// New Device Window Component
import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import { Button, Overlay, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IState {
    name: string,
    ip: string
  };

interface Props {
  visibility: () => void,
  updateDevices: () => void,
  addingNewDevice: boolean,
  user: string
}
export default class NewDeviceOverlay extends Component<Props> {
    state: IState;
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            ip: "",
          }
    }

    // Invoke after user press submit button
    addNewDevice = () : void => {
      // Call PUT API for update devices of current user
        if(this.state.ip !== "" && this.state.ip.length > 14 && this.state.name !== "") {
          fetch('http://192.168.137.1:3000/api/users/' + this.props.user + '/devices', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.name,
              ip: this.state.ip,
            }),
          })
          .then(response => response.json()) //Promise
          .then(response => {
            console.log("Device aggiunto!");
            // Update devices list
            this.props.updateDevices();
            // Hidden add Device window
            this.props.visibility();
          });
        } else {
          // Alert user to insert valid fields
          Alert.alert(
            'Insert valid fields!'
          )
        }
      }

    render() {
        return(
            <Overlay
            isVisible={this.props.addingNewDevice}
            onBackdropPress={this.props.visibility}
            height="auto"
            > 
                <View>  
                    <Text 
                    h4
                    h4Style={styles.addDeviceTitle}
                    >
                        Device
                    </Text>
                    <Input
                    placeholder='Name'
                    onChangeText={(text) => this.setState({name: text})}
                    leftIcon={
                        <Icon
                        name='video-camera'
                        size={24}
                        color='black'
                        style={{marginRight: 15}}
                        />
                    }
                    />
                    <Input
                    placeholder='IP address'
                    onChangeText={(text) => this.setState({ip: text})}
                    leftIcon={
                        <Icon
                        name='location-arrow'
                        size={24}
                        color='black'
                        style={{marginRight: 15}}
                        />
                    }
                    />
                    <View style={styles.addDeviceButton}>
                        <Button
                        title="Add"
                        onPress={() => this.addNewDevice()}
                        />
                    </View>     
                </View>
            </Overlay>
        )
    }
}  


const styles = StyleSheet.create({
    addDeviceTitle: {
      textAlign: 'center',
      color: "#0f0f0f"
    },
    addDeviceButton: {
      marginTop: 30
    }
  });