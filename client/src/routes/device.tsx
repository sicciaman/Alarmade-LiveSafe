import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Header, Card, Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import NewBuddyOverlay from '../components/NewBuddyOverlay';

interface IState {
    addingNewBuddy: boolean,
    buddies: [],
    _id: string,
    deviceName: string
};

export default class Device extends Component {
    state: IState;

    constructor(props: any) {
        super(props);
        this.state = {
            addingNewBuddy: false,
            buddies: [],
            _id: "",
            deviceName: ""
        }
    }
    
    componentDidMount() {
      const { navigation } = this.props;
      this.setState({
        _id: navigation.getParam('_id'),
        deviceName: navigation.getParam('name')
      });
      fetch('http://10.150.147.46:3000/api/users/gallo/' + this.state._id + '/buddies')
        .then((response) => response.json())
        .then(response => {
          this.setState({
            buddies: response.data
          });
          console.log(this.state.buddies)
      });
    }

    toggleBuddy = () : void => {
        this.setState({
            addingNewBuddy: !this.state.addingNewBuddy
        });
    }

    render() {

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
          <NewBuddyOverlay visibility={this.toggleBuddy} addingNewBuddy={this.state.addingNewBuddy} updateBuddies={this.componentDidMount} />
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
