// Single Device View - Buddies List Displayed & possibility to add a new Buddy or remove
import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, WebView} from 'react-native';
import {Header, Card, Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import NewBuddyOverlay from '../components/NewBuddyOverlay';
import BuddyItem from '../components/BuddyItem';
import {Buddy} from '../classes/buddy';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface IState {
    addingNewBuddy: boolean,
    buddies: Buddy[],
    _id: string,
    ip: string,
    deviceName: string,
    email: string
};

export default class Device extends Component {
    state: IState;

    constructor(props: any) {
        super(props);
        this.state = {
            addingNewBuddy: false,
            email: "",
            ip: "",
            buddies: [],
            _id: "",
            deviceName: ""
        }

        this.toggleBuddy = this.toggleBuddy.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount = () => {
      const { navigation } = this.props;
      this.setState({
        email: navigation.getParam('email'),
        _id: navigation.getParam('_id'),
        ip: navigation.getParam('ip'),
        deviceName: navigation.getParam('name')
      }, () =>  {
        // Invoke GET API to retrieve buddies list
        fetch('http://192.168.137.1:3000/api/users/' + this.state.email + '/' + this.state._id + '/buddies')
          .then((response) => response.json())
          .then(response => {
            this.setState({
              buddies: response.data
            });
            console.log(this.state.buddies)
        });
      });    
    }

    // Show New Buddy Overlay
    toggleBuddy = () : void => {
        this.setState({
            addingNewBuddy: !this.state.addingNewBuddy
        });
    }

    formatHtml = () : string => {
      return (`<html><body><img src="http://${this.state.ip}:8001/stream.mjpg" width="100%" style="background-color: white; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>`);
    }

    render() {
      console.log(this.state.ip);
      return (
        <View style={styles.container}>
          <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: this.state.deviceName, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress:() => this.props.navigation.navigate('MyDevices')}}
          containerStyle={{
              height: 75
          }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', top: 5, left: 10}}>
            <Icon 
              name='play-circle'
              size={25}
              style={styles.liveIcon} />
            <Text style={{left: 10, fontSize: 20,color: '#000'}}>
              Live Camera
            </Text>
          </View> 
          <View style={{height: 300, margin: 10, borderWidth: 2, borderColor: 'rgba(199, 199, 199, 0.5)'}}>
            <WebView
              source={{html: this.formatHtml(), baseUrl: '/'}}
              style={styles.streamContainer} />
            </View>
          <NewBuddyOverlay device_id={this.state._id} visibility={this.toggleBuddy} addingNewBuddy={this.state.addingNewBuddy} updateBuddies={this.componentDidMount} user={this.state.email} />
          <Card
              title='MANAGE DEVICE'
              >
              <Text style={{marginBottom: 10}}>
                  Manage and set your buddies list to start using Alarmade!
              </Text>
              <Button
                  icon={<Icon name='plus' color='#ffffff' />}
                  onPress={() => this.toggleBuddy()}
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='ADD BUDDY' />
          </Card>
          <ScrollView>
          {
            this.state.buddies.length > 0 ? (
              this.state.buddies.map((u, i) => {
                return(
                  <BuddyItem 
                    name={u.name} 
                    email={this.state.email}
                    _id={u._id} 
                    key={i} 
                    device_id={this.state._id} 
                    updateBuddies={this.componentDidMount}
                  />
                );
              })
            ) : (
              <View style={styles.addDevice}>
                <Text> No buddies added yet.</Text>
              </View>
            )
          }  
        </ ScrollView>
        </View>
      );
  }
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    streamContainer: {
      alignItems: 'center',
      flex: 1,
      margin: 2
    },
    liveIcon: {
      textAlignVertical: 'center',
      color: '#069910'
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
