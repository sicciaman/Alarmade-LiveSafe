import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';

import { Card, ListItem, Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Device } from '../classes/device';
import DeviceListItem from '../components/DeviceItem';


interface IState {
  devices: Device[],
};

interface Props {}
export default class Devices extends Component<Props> {
  state: IState;

  constructor(props: any) {
    super(props);
    this.state = {
      devices: [],
    }
  }


  setNewDevice = (): void => {
    const device: Device[] = this.state.devices;
    device.push({id:3, name:"RaspberryPi"})
    this.setState({
      devices: device
    })

  };

  componentDidMount = () => {
    fetch('http://10.150.147.46:3000/api/devices')
      .then((response) => response.json())
      .then(response => {
        this.setState({
          devices: response.data
        })
      })
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
                  <DeviceListItem name={u.name} key={i}/>
                );
              })
            ) : (
              <View style={styles.addDevice}>
                <Text> Ancora nessun dispositivo associato.</Text>
              </View>
            )
          }
        </ ScrollView>
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
  }
});
