import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';

import { Header, Button, Overlay, Divider, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Device } from '../classes/device';
import DeviceListItem from '../components/DeviceItem';

interface IState {
  devices: Device[],
  addingNewDevice: boolean,
  name: String,
  ip: String
};

interface Props {}
export default class Devices extends Component<Props> {
  state: IState;

  constructor(props: any) {
    super(props);
    this.state = {
      devices: [],
      addingNewDevice: false,
      name: "Camera",
      ip: ""
    }
  }


  setNewDevice = (): void => {
    this.setState({
      addingNewDevice: true
    })
  };

  addNewDevice = () : void => {
    if(this.state.ip !== "" && this.state.ip.length > 14) {
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
        this.componentDidMount();
        this.setState({
          addingNewDevice: false
        })
      });
    } else {
      Alert.alert(
        'Inserisci un IP corretto!'
      )
    }
  }

  componentDidMount = () => {
    fetch('http://10.150.147.46:3000/api/users/gallo/devices')
      .then((response) => response.json())
      .then(response => {
        this.setState({
          devices: response.data
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'I MIEI DISPOSITIVI', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('MyDevices')}}
          containerStyle={{
            height: 75
          }}
        />
        <ScrollView>
          {
            this.state.devices.length > 0 ? (
              this.state.devices.map((u, i) => {
                return(
                  <DeviceListItem name={u.name} ip={u.ip} key={i}/>
                );
              })
            ) : (
              <View style={styles.addDevice}>
                <Text> Ancora nessun dispositivo associato.</Text>
              </View>
            )
          }  
        </ ScrollView>
        <Overlay
            isVisible={this.state.addingNewDevice}
            onBackdropPress={() => this.setState({ addingNewDevice: false })}
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
              defaultValue="Camera"
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
        <View style={styles.addDeviceContainer}>
          <Button
            buttonStyle={{marginTop: 30, width: '50%', height: 50}}
            title="Aggiungi dispositivo"
            onPress={() => this.setNewDevice()}
          />
        </ View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  device: {
    borderRadius: 50
  },
  addDeviceContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  addDevice: {
    marginTop: 20,
    alignItems: 'center'
  },
  addDeviceTitle: {
    textAlign: 'center',
    color: "#0f0f0f"
  },
  addDeviceButton: {
    marginTop: 30
  }
});
