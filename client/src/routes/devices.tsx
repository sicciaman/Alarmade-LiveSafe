// User Devices View - Possibility to add a new Device or remove
import React, {Component, useLayoutEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert, Switch, TouchableWithoutFeedback} from 'react-native';

import { Header, Button, Overlay, Divider, Text, Input, Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Device } from '../classes/device';
import DeviceListItem from '../components/DeviceItem';
import NewDeviceOverlay from '../components/NewDeviceOverlay';
import Hoc from '../utils/hoc';


interface IState {
  devices: Device[],
  addingNewDevice: boolean,
  email: string
};

interface Props {}
export default class Devices extends Component<Props> {
  state: IState;

  constructor(props: any) {
    super(props);
    this.state = {
      devices: [],
      addingNewDevice: false,
      email: ""
    }

    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // Show new Device overlay
  toggleOverlay = () : void => {
    this.setState({
      addingNewDevice: !this.state.addingNewDevice
    });
  }

  // Invoke GET API for devices of logged user
  componentDidMount = () => {
    const { navigation } = this.props;
      this.setState({
        email: navigation.getParam('email'),
      }, () =>  {
      fetch('http://192.168.137.1:3000/api/users/' + this.state.email + '/devices')
        .then((response) => response.json())
        .then(response => {
          this.setState({
            devices: response.data
          });
          console.log(this.state.devices)
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY DEVICES', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('MyDevices')}}
          containerStyle={{
            height: 75
          }}
        />
        {
            this.state.devices.length > 0 ? (
              <Hoc>
                <ScrollView style={{flex: 1, flexDirection: 'row'}}>
                  { this.state.devices.map((u, i) => {
                    return(
                      <DeviceListItem 
                        name={u.name} 
                        email={this.state.email}
                        ip={u.ip} 
                        status={u.status}
                        members={u.members} 
                        _id={u._id}    
                        key={i}       
                        updateDevices={this.componentDidMount}
                        style={{flex:0.9, height: 50}} 
                      />
                    );
                  })
                  }
                </ ScrollView>
                <View style={styles.addDeviceContainer}>
                  <Button
                    buttonStyle={{marginTop: 30, width: '50%', height: 50}}
                    title="Aggiungi dispositivo"
                    onPress={() => this.toggleOverlay()}
                  />
                </ View>
              </Hoc>
        ) : (
          <View style={{alignItems: 'center', flex: 1}}>
            <ScrollView
              style={{width: '80%', marginTop: 25}}
            >
              <TouchableWithoutFeedback
                onPress={() => this.toggleOverlay()}
              >
                <View
                  style={{   
                    height: 200, 
                    borderWidth: 2, 
                    borderColor:'rgba(0,0,0,0.7)',
                    justifyContent: 'center',
                    alignItems: 'center' 
                  }}
                >
                  <Icon
                  name='plus-circle'
                  size={50}  
                  style={{color: '#000'}}        
                />
                <Text>Add Device</Text>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
            <View style={styles.addDevice}>
              <Text> No associated devices yet.</Text>
            </View>
          </View>
        )
        }
        <NewDeviceOverlay visibility={this.toggleOverlay} addingNewDevice={this.state.addingNewDevice} updateDevices={this.componentDidMount} user={this.state.email} />
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
    bottom: 20,
  },
  addDeviceTitle: {
    textAlign: 'center',
    color: "#0f0f0f",
  },
  addDeviceButton: {
    marginTop: 30
  }
});
