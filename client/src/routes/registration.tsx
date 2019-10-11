import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import Header from '../../components/Logo';
import validate from '../utils/validate';


interface IState {
  email: string,
  emailError: boolean,
  passwordValidation: boolean,
  psw: string,
  pswError: boolean,
  confirmPsw: string
};

export default class Registration extends Component {
  state: IState;

  constructor (props: any) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      passwordValidation: false,
      psw: "",
      pswError: false,
      confirmPsw: ""
    };
  }

  checkPsw = (psw: string): void => {
    this.setState({psw: psw},
      () => this.state.psw === this.state.confirmPsw ? this.setValidationPsw(true) : this.setValidationPsw(false)
    );
  }

  checkConfirmPsw = (psw: string): void => {
    // callback setValidationPsw after async setState is done.
    this.setState({confirmPsw: psw},
      () => this.state.psw === this.state.confirmPsw ? this.setValidationPsw(true) : this.setValidationPsw(false)
    );
  }

  setValidationPsw = (state: Boolean): void => {
    this.setState({passwordValidation: state});
  }

  register = (): void => {
    if(this.state.email && this.state.psw && this.state.confirmPsw && this.state.passwordValidation) {
      const emailError = validate("email", this.state.email);
      const pswError = validate("psw", this.state.psw);

      this.setState({
        emailError: emailError,
        pswError: pswError
      });


      if(!emailError || !pswError) {
        console.log("Input data ok!");
          fetch('http://192.168.137.1:3000/api/users', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.email,
              password: this.state.psw,
            }),
          })
          .then(response => response.json()) //Promise
          .then(response => {
            console.log(response);
            this.props.navigation.navigate('Home');
          })
      }
    } else {
      console.log("Data missing or confirm password doesn't match")
    }
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
          <Text style={styles.title}>Registration</Text>
          <Input
            placeholder='Email'
            onChangeText={(text) => this.setState({email: text})}
            errorMessage={this.state.emailError ? "Valid Email address is required" : ""}
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
            secureTextEntry={true}
            onChangeText={(text) => this.checkPsw(text)}
            errorMessage={this.state.pswError ? "Password must have at least 8 characters" : ""}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />
          <Input
            placeholder='Conferma Password'
            secureTextEntry={true}
            onChangeText={(text) => this.checkConfirmPsw(text)}
            errorMessage={this.state.confirmPsw !== "" ? (this.state.passwordValidation ? "" : "Passwords don't match") : "" }
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />
          <Text
            style={styles.loginlink}
            onPress={() => this.props.navigation.navigate('Home')}
            >
            Already registered? Go to login.
          </Text>
        </ScrollView>
        <View style={styles.submitview}>
          <Button
            title="Submit"
            buttonStyle={styles.submitbutton}
            onPress={() => this.register()}
          />
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    width: '80%'
  },
  inputfields: {
    width: '80%',
  },
  title: {
    fontSize: 25,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center'
  },
  loginlink: {
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
