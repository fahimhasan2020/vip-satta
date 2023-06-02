import React, { Component } from 'react';
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, TouchableOpacity, ToastAndroid, Pressable, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions, Animated } from 'react-native';
import { PrimaryInput, PrimaryPassword } from "../component/Inputs"
import { PrimaryButton, WarningButton } from "../component/Buttons"
import { MainTitle } from '../component/Title';
import CheckBox from '@react-native-community/checkbox';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { connect } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      remember: false,
    };
    this.setDataUsername = this.setDataUsername.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
  }

  componentDidMount() {
    // this.props.navigation.addListener('focus', this.handleScreenFocus);
    // this.props.navigation.addListener('blur', this.handleScreenBlur);
  }

  componentWillUnmount() {
    // this.props.navigation.removeListener('focus', this.handleScreenFocus);
    // this.props.navigation.removeListener('blur', this.handleScreenBlur);
  }

  handleScreenFocus = () => {
    console.log('this component is now live');

  };

  handleScreenBlur = () => {
    console.log('this component is leaving');

  };

  login = async () => {
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
    }).then((response) => response.json()).then(async (responseJson) => {
      console.log(responseJson);
      if (responseJson.status == 0) {
        this.setState({ loading: false });
        ToastAndroid.show("Wrong credential", ToastAndroid.SHORT);
      } else {

        ToastAndroid.show("Welcome back", ToastAndroid.SHORT);
        await this.props.changeAccessToken(responseJson.data.auth_token);
        this.configureNotification();
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

  configureNotification = () => {
    PushNotification.configure({
      onRegister: async (token) => {
        const act = await AsyncStorage.getItem("token");
        console.log("TOKEN:", act);
        var myHeaders = new Headers();
        myHeaders.append("Access-Token", act);

        var formdata = new FormData();
        formdata.append("push_token", token.token);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch(this.props.host + "save-push-token", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      foreground: true,
      requestPermissions: true,
    });
  }

  setDataUsername(username: string) {
    this.setState({ username });
  }
  setDataPassword(password: string) {
    this.setState({ password });
  }


  render() {
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#7e07a6' }}>
      <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height + 100, top: 0, left: 0, opacity: 0.2 }} />
      <ScrollView contentContainerStyle={{ minHeight: Dimensions.get("window").height, zIndex: 2 }}><KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={60}>
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          {/* <MainTitle title="VIP SATTA" colors={['#f4fc03', '#fccf03', '#fc9003']} /> */}
          <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
          <PrimaryPassword data={this.state.password} width={106} setData={this.setDataPassword} background={'red'} label={'Enter Password'} />
          <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 30, paddingRight: 30, paddingBottom: 20, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={this.state.remember}
                tintColors={{ true: 'orange', false: '#ffffff' }}
                onValueChange={(newValue) => this.setState({ remember: newValue })}
              /><Text style={{ color: 'white' }}>Remember me</Text>
            </View>

            <Pressable onPress={() => { this.props.navigation.navigate('Forget') }}><Text style={{ color: 'white', marginTop: 6 }}>Forget password?</Text></Pressable>
          </View>
          <WarningButton onPress={() => { this.login() }} loading={this.state.loading} label={"SIGN IN"} />
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginTop: 40 }}>
            <Text style={{ margin: 0, padding: 0, color: 'white' }}>Don't have any account? </Text><TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}
              style={{ margin: 0, padding: 0 }}><Text style={{ color: 'orange', fontWeight: 'bold', padding: 0 }}>Register</Text></TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView></ScrollView>



    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  logo: {
    height: 180,
    width: 180,
    marginBottom: 20
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
