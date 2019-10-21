import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import Header from '../../components/Logo';


interface IState {
  email: string,
  psw: string,
  showPsw: boolean
}

export default class Registration extends Component {
  state: IState;

  constructor(props: any) {
    super(props)
    this.state = {
      email: "gallo",
      psw: "belotti",
      showPsw: true
    }
  };

  checkInputData = (): void => {
    let auth : boolean = false;
    fetch('http://192.168.137.1:3000/api/users')
      .then((response) => response.json())
      .then(response => {
        response.data.forEach(user => {
          if (user.username === this.state.email && user.password === this.state.psw) {
            this.props.navigation.navigate('MyDevices', {
              email: this.state.email
            });
            auth = true;
          }
        });
        if (!auth) {console.log("Incorrect data!")} 
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView
            style={styles.inputfields}
            contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}
            keyboardShouldPersistTaps={'handled'}
        >
          <Text style={styles.title}>Login</Text>
          <Input
            placeholder='Email'
            defaultValue='gallo'
            onChangeText={(text) => this.setState({email: text})}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
          />
          <Input
            placeholder='Password'
            defaultValue='belotti'
            secureTextEntry={this.state.showPsw}
            onChangeText={(text) => this.setState({psw: text})}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
            rightIcon={
              <Icon
                name={this.state.showPsw ? 'eye' : 'eye-slash'}
                size={24}
                color='black'
                onPress={() => this.setState({showPsw: !this.state.showPsw})}
              />
            }
          />
          <Text
            style={styles.registerlink}
            onPress={() => this.props.navigation.navigate('Registration')}
            >
            Sign in now!
          </Text>
        </ScrollView>
        <View style={styles.submitview}>
          <Button
            title="Submit"
            onPress={() => this.checkInputData()}
            buttonStyle={styles.submitbutton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    width: '80%'
  },
  title: {
    fontSize: 25,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputfields: {
    width: '80%',
  },
  registerlink: {
    color: 'blue',
    marginTop: 40,
    textAlign: 'center'
  },
  submitview: {
    alignSelf: 'stretch',
  },
  submitbutton: {
    height: 70
  }
});
