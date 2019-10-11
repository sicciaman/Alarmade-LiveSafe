import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Registration from './src/routes/registration';
import Login from './src/routes/login';
import MyDevices from './src/routes/devices';
import Device from './src/routes/device';

// Router for screen navigation between components
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
