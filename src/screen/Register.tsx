import React, { Component } from 'react';
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { PrimaryInput, PrimaryPassword, PrimaryInputOtp } from "../component/Inputs"
import { WarningButton } from "../component/Buttons"
import { MainTitle } from '../component/Title';
import { OTP } from "react-native-otp-form";
import auth from '@react-native-firebase/auth';
import { connect } from "react-redux"
interface Props {

}

interface State {
  username: string;
  password: string;
  confirmPassword: String;
  referelId: String;
  firstName: String;
  lastName: String;
  otpRunning: Boolean;
  otp: String,
  handleRegister: () => void;
  verifyOtp: () => void;
  confirmation: object;
  email: string;
  loading: boolean

}

class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      referelId: '',
      firstName: '',
      lastName: '',
      otpRunning: false,
      otp: '',
      confirmation: {},
      email: '',
      loading: false
    };
    this.setDataUsername = this.setDataUsername.bind(this);
    this.setDataEmail = this.setDataEmail.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
    this.setDataConfirmPassword = this.setDataConfirmPassword.bind(this);
    this.setDatareferelId = this.setDatareferelId.bind(this);
    this.setDataFirstName = this.setDataFirstName.bind(this);
    this.setDataLastName = this.setDataLastName.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
  }

  setDataUsername(username: string) {
    this.setState({ username });
  }
  setDataPassword(password: string) {
    this.setState({ password });
  }
  setDataConfirmPassword(confirmPassword: string) {
    this.setState({ confirmPassword });
  }
  setDatareferelId(referelId: string) {
    this.setState({ referelId });
  }
  setDataFirstName(firstName: string) {
    this.setState({ firstName });
  }
  setDataLastName(lastName: string) {
    this.setState({ lastName });
  }
  setDataEmail(email: string) {
    this.setState({ email });
  }

  onAuthStateChanged(user: object) {
    if (user) {
      //console.log(user)
    }
  }

  handleOTPChange = (otp: String) => {
    this.setState({ otp })
  }

  registration = () => {
    fetch(this.props.host + 'registration', {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        phone: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword,
        referral_id: this.state.referelId,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      })
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status == 0) {
        this.setState({ loading: false, otpRunning: false });
        ToastAndroid.show("Failed to register. Account exists", ToastAndroid.SHORT);
      } else {
        this.setState({ loading: false });
        ToastAndroid.show("Registration completed. Login now.", ToastAndroid.SHORT);
        setTimeout(() => {
          this.setState({ otpRunning: false });
          this.props.navigation.navigate('Login');
        }, 3000);
      }
    }).catch(error => {
      this.setState({ loading: false, otpRunning: false });
      console.log(error);
      ToastAndroid.show("Failed to register. Account exists", ToastAndroid.SHORT);
    })



  }

  componentDidMount(): void {
    console.log(this.props.host);
  }



  handleRegister = async () => {
    this.setState({ loading: true });
    const confirmation = await auth().signInWithPhoneNumber('+88' + this.state.username);
    console.log(confirmation);
    this.setState({ confirmation: confirmation });
    this.setState({ loading: false });
    const subscriber = await auth().onAuthStateChanged(this.onAuthStateChanged);
    this.setState({ otpRunning: true, loading: false });
  };
  verifyOtp = async () => {
    this.setState({ loading: true });
    try {
      await this.state.confirmation.confirm(this.state.otp);
      this.registration();
    } catch (error) {
      ToastAndroid.show("Registration failed. Try again later", ToastAndroid.SHORT);
      console.log('Invalid code.');
      this.setState({ loading: false });
    }
    // this.setState({otpRunning:false});
  };


  render() {
    return (<SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#7e07a6' }} behavior="padding"><ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <MainTitle title="VIP SATTA" colors={['#8B4513', '#b3946d']} />
        {!this.state.otpRunning ? <View><PrimaryInput data={this.state.referelId} width={70} setData={this.setDatareferelId} background={'red'} label={'Referel Id'} />
          <PrimaryInput data={this.state.firstName} width={78} setData={this.setDataFirstName} background={'red'} label={'First Name'} />
          <PrimaryInput data={this.state.lastName} width={78} setData={this.setDataLastName} background={'red'} label={'Last Name'} />
          <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
          <PrimaryInput data={this.state.email} width={80} setData={this.setDataEmail} background={'red'} label={'Enter Email'} />
          <PrimaryPassword data={this.state.password} width={108} setData={this.setDataPassword} background={'red'} label={'Enter Password'} />
          <PrimaryPassword data={this.state.confirmPassword} width={125} setData={this.setDataConfirmPassword} background={'red'} label={'Confirm Password'} />
          <WarningButton loading={this.state.loading} onPress={() => { this.handleRegister() }} label={"SIGN UP"} /></View> : <View><OTP
            codeCount={6}
            onFinish={(value) => this.setState({ otp: value })}
            containerStyle={{ marginTop: 50 }}
            otpStyles={{ backgroundColor: '#eee' }}
            keyboardType="number-pad"
          /><View style={{ marginTop: 15 }}></View><WarningButton loading={this.state.loading} onPress={() => { this.verifyOtp() }} label={"ENTER OTP"} /></View>}

        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Text style={{ margin: 0, padding: 0, color: 'white' }}>Already have account? </Text><TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
            style={{ margin: 0, padding: 0 }}><Text style={{ color: 'orange', fontWeight: 'bold', padding: 0 }}>Login</Text></TouchableOpacity>
        </View>
      </ScrollView></KeyboardAvoidingView>
    </SafeAreaView>
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
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
