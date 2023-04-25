import React, { Component } from 'react';
import { View, Text, TextInput, Button,StatusBar,StyleSheet,Image,TouchableOpacity,ScrollView,ToastAndroid,SafeAreaView } from 'react-native';
import {PrimaryInput,PrimaryPassword,PrimaryInputOtp} from "../component/Inputs"
import {WarningButton} from "../component/Buttons"
import { MainTitle } from '../component/Title';
import OTPInput from "react-native-otp";
import auth from '@react-native-firebase/auth';
interface Props {
}

interface State {
  username: string;
  password: string;
  confirmPassword:String;
  referelId:String;
  firstName:String;
  lastName:String;
  otpRunning:Boolean;
  otp:String,
  handleRegister:()=>void;
  verifyOtp:()=>void;
  confirmation:object;
  
}

class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      confirmPassword:'',
      referelId:'',
      firstName:'',
      lastName:'',
      otpRunning:false,
      otp:'',
      confirmation:{},
    };
    this.setDataUsername = this.setDataUsername.bind(this);
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

  onAuthStateChanged(user:object) {
    if (user) {
      //console.log(user)
    }
  }

  handleOTPChange = (otp:String) => {
    this.setState({ otp })
  }

  

  handleRegister = async() => {
   const confirmation = await auth().signInWithPhoneNumber('+88'+this.state.username);
   console.log(confirmation);
   this.setState({confirmation:confirmation});
   const subscriber = await auth().onAuthStateChanged(this.onAuthStateChanged);
   this.setState({otpRunning:true});
  };
  verifyOtp = async() => {
    try {
      await this.state.confirmation.confirm(this.state.otp);
      ToastAndroid.show("Registration completed. Login now.",ToastAndroid.SHORT);
      setTimeout(()=>{
        this.setState({otpRunning:false});
        this.props.navigation.navigate('Login');
      },3000);
    } catch (error) {
      ToastAndroid.show("Registration failed. Try again later",ToastAndroid.SHORT);
      console.log('Invalid code.');
    }
    // this.setState({otpRunning:false});
  };


  render() {
    return (<SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <MainTitle title="VIP SATTA" colors={['#8B4513', '#b3946d']} />
        {!this.state.otpRunning?<View><PrimaryInput data={this.state.referelId} width={106} setData={this.setDatareferelId} background={'red'} label={'Referel Id'} />
        <PrimaryInput data={this.state.firstName} width={106} setData={this.setDataFirstName} background={'red'} label={'First Name'} />
        <PrimaryInput data={this.state.lastName} width={106} setData={this.setDataLastName} background={'red'} label={'Last Name'} />
        <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
        <PrimaryPassword data={this.state.password} width={106} setData={this.setDataPassword} background={'red'} label={'Enter Password'} />
        <PrimaryPassword data={this.state.confirmPassword} width={106} setData={this.setDataConfirmPassword} background={'red'} label={'Confirm Password'} />
        <WarningButton onPress={()=>{this.handleRegister()}} label={"SIGN UP"}/></View>:<View><OTPInput
          value={this.state.otp}
          onChange={this.handleOTPChange}
          tintColor="#FFFFFF"
          offTintColor="#FFFFFF"
          otpLength={6}
        /><View style={{marginTop:15}}></View><WarningButton onPress={()=>{this.verifyOtp()}} label={"ENTER OTP"}/></View>}
        
        <View style={{flexDirection:'row',position:'absolute',bottom:20}}>
          <Text style={{margin:0,padding:0,color:'white'}}>Already have account? </Text><TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('Login');
          }}
          style={{margin:0,padding:0}}><Text style={{color:'orange', fontWeight:'bold',padding:0}}>Login</Text></TouchableOpacity>
        </View>
      </ScrollView></SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#7e07a6'
  },
  logo:{
    height:100,
    width:100
  },
  text:{
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    marginTop:20,
    marginBottom:40
  }
})

export default Register;
