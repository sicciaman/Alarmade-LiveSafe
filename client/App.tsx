import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Registration from './src/routes/registration';
import Login from './src/routes/login';
import MyDevices from './src/routes/devices';
import Device from './src/routes/device';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});*/

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Login,
      navigationOptions:({ navigation }) => ({
        header: null
      })
    },
    Registration: {
      screen: Registration,
      navigationOptions:({ navigation }) => ({
        header: null
      })
    },
    MyDevices: {
      screen: MyDevices,
      navigationOptions:({ navigation }) => ({
        header: null
      })
    },
    Device: {
      screen: Device,
      navigationOptions:({ navigation }) => ({
        header: null
      })
    },
    initialRouteName: "MyDevices"
  }
);

const AppContainer = createAppContainer(AppNavigator);

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}




/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/
