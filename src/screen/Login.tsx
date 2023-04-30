import React, { Component } from 'react';
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, TouchableOpacity, ToastAndroid, Pressable } from 'react-native';
import { PrimaryInput, PrimaryPassword } from "../component/Inputs"
import { PrimaryButton, WarningButton } from "../component/Buttons"
import { MainTitle } from '../component/Title';
import CheckBox from '@react-native-community/checkbox';
import { connect } from "react-redux"
interface Props {
}

interface State {
  username: string;
  password: string;
  loading: boolean;
  remember: boolean;
}




class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      remember: false
    };
    this.setDataUsername = this.setDataUsername.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
  }

  login = () => {
    this.setState({ loading: true })
    fetch(this.props.host + 'login', {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        phone: this.state.username,
        password: this.state.password,
      })
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status == 0) {
        this.setState({ loading: false });
        ToastAndroid.show("Wrong credential", ToastAndroid.SHORT);
      } else {

        ToastAndroid.show("Welcome back", ToastAndroid.SHORT);
        this.props.changeAccessToken(responseJson.data.auth_token);
        this.props.changeUser(responseJson.data.user);
        this.setState({ loading: false });
        this.props.changeLogged(true);

      }
    }).catch(error => {
      this.setState({ loading: false });
      console.log(error);
      ToastAndroid.show("Network errors", ToastAndroid.SHORT);
    })



  }

  setDataUsername(username: string) {
    this.setState({ username });
  }
  setDataPassword(password: string) {
    this.setState({ password });
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <MainTitle title="VIP SATTA" colors={['#8B4513', '#b3946d']} />
        <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
        <PrimaryPassword data={this.state.password} width={106} setData={this.setDataPassword} background={'red'} label={'Enter Password'} />
        <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 30, paddingRight: 30, paddingBottom: 20, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              disabled={false}
              value={this.state.remember}
              tintColors={{true: 'orange',false:'#ffffff'}}
              onValueChange={(newValue) => this.setState({ remember: newValue })}
            /><Text style={{ color: 'white' }}>Remember me</Text>
          </View>

          <Pressable onPress={() => { this.props.navigation.navigate('Forget') }}><Text style={{ color: 'white',marginTop:6 }}>Forget password?</Text></Pressable>
        </View>
        <WarningButton onPress={() => { this.login() }} loading={this.state.loading} label={"SIGN IN"} />

        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20 }}>
          <Text style={{ margin: 0, padding: 0, color: 'white' }}>Don't have any account? </Text><TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
            style={{ margin: 0, padding: 0 }}><Text style={{ color: 'orange', fontWeight: 'bold', padding: 0 }}>Register</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7e07a6'
  },
  logo: {
    height: 100,
    width: 100
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40
  }
})

const mapDispatchToProps = dispatch => {
  return {
    changeAccessToken: (value) => { dispatch({ type: 'CHANGE_TOKEN', token: value }) },
    changeLogged: (value) => { dispatch({ type: 'LOGIN', logged: value }) },
    changeUser: (value) => { dispatch({ type: 'CHANGE_USER', user: value }) },
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
