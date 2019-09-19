import React, {Component, useLayoutEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';

import { Header, Button, Overlay, Divider, Text, Input, Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Device } from '../classes/device';
import DeviceListItem from '../components/DeviceItem';
import NewDeviceOverlay from '../components/NewDeviceOverlay';

interface IState {
  devices: Device[],
  addingNewDevice: boolean,
};

interface Props {}
export default class Devices extends Component<Props> {
  state: IState;

  constructor(props: any) {
    super(props);
    this.state = {
      devices: [],
      addingNewDevice: false,
    }

    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  toggleOverlay = () : void => {
    this.setState({
      addingNewDevice: !this.state.addingNewDevice
    });
  }

  componentDidMount = () => {
    fetch('http://192.168.137.176:3000/api/users/gallo/devices')
      .then((response) => response.json())
      .then(response => {
        this.setState({
          devices: response.data
        });
        console.log(this.state.devices)
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
                    <DeviceListItem 
                      name={u.name} 
                      ip={u.ip} 
                      members={u.members} 
                      _id={u._id} 
                      key={i} 
                      updateDevices={this.componentDidMount}
                      //onPress={() => this.props.navigation.navigate('Device')}   
                    />
                );
              })
            ) : (
              <View style={styles.addDevice}>
                <Text> Ancora nessun dispositivo associato.</Text>
              </View>
            )
          }  
        </ ScrollView>
        <NewDeviceOverlay visibility={this.toggleOverlay} addingNewDevice={this.state.addingNewDevice} updateDevices={this.componentDidMount}/>
        <View style={styles.addDeviceContainer}>
          <Button
            buttonStyle={{marginTop: 30, width: '50%', height: 50}}
            title="Aggiungi dispositivo"
            onPress={() => this.toggleOverlay()}
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
