import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import { Button, Overlay, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IState {
    name: string,
    ip: string
  };

interface Props {}
export default class NewDeviceOverlay extends Component<Props> {
    state: IState;
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            ip: "",
          }
    }

    addNewDevice = () : void => {
        if(this.state.ip !== "" && this.state.ip.length > 14 && this.state.name !== "") {
          fetch('http://10.150.147.46:3000/api/users/gallo/devices', {
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
            this.props.updateDevices();
            this.props.visibility();
          });
        } else {
          Alert.alert(
            'Inserisci un nome e un IP corretto!'
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
                        onPress={() => this.addNewDevice()}//() => this.props.navigation.navigate('MyDevices')}
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