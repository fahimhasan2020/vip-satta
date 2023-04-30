import React, { Component } from 'react';
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, TouchableOpacity,ToastAndroid, Pressable } from 'react-native';
import { PrimaryInput, PrimaryPassword } from "../component/Inputs"
import { PrimaryButton, WarningButton } from "../component/Buttons"
import { MainTitle } from '../component/Title';
import auth from '@react-native-firebase/auth';
import OTPInput from "react-native-otp";
import {connect} from "react-redux"
interface Props {
}

interface State {
  username: string;
  password: string;
  loading:boolean;
  resetState:number;
  otp:string;
  newPassword:string;
  confirmNewPassword:string;
  confirmation:object;
}




class Forget extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading:false,
      resetState:0,
      otp:'',
      newPassword:'',
      confirmation: {},
      confirmNewPassword:''
    };
    this.setDataUsername = this.setDataUsername.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
    this.setDataNewPassword = this.setDataNewPassword.bind(this);
    this.setDataConfirmNewPassword = this.setDataConfirmNewPassword.bind(this);
  }
  onAuthStateChanged(user: object) {
    if (user) {
      //console.log(user)
    }
  }
  login = async() =>{
    this.setState({loading:true})
    fetch(this.props.host+'check-user',{
        method:"POST",
        headers:{
          "Content-type":'application/json',
          "Accept":"application/json"
        },
        body:JSON.stringify({  
          phone:this.state.username,
          password:this.state.password,
        })
      }).then(async (response) => {
        const responseJson = await response.json();
        console.log(responseJson);
        if(responseJson.status == 0){
          this.setState({loading:false});
          ToastAndroid.show("Account does not exist", ToastAndroid.SHORT);
        } else {
            try{
                const confirmation = await auth().signInWithPhoneNumber('+88' + this.state.username);
                console.log(confirmation);
                this.setState({ confirmation: confirmation });
                const subscriber = await auth().onAuthStateChanged(this.onAuthStateChanged);
                ToastAndroid.show("OTP has been sent to your number", ToastAndroid.SHORT);
                this.setState({resetState:1, loading:false});
            }catch(error){
                this.setState({loading:false});
                console.log(error);
                ToastAndroid.show("Firebase error", ToastAndroid.SHORT);
            }
          
        }
      }).catch(error=>{
        this.setState({loading:false});
        console.log(error);
        ToastAndroid.show("Network errors", ToastAndroid.SHORT);
      })
      

    

  }

  verifyOtp = async() =>{
    this.setState({loading:true});
    try {
        ToastAndroid.show("OTP matched", ToastAndroid.SHORT);
        await this.state.confirmation.confirm(this.state.otp);
        this.setState({resetState:2});
      } catch (error) {
        ToastAndroid.show("Wrong otp", ToastAndroid.SHORT);
        console.log('Invalid code.');
        this.setState({loading:false});
      }

  }

  resetPassword = () =>{
    if(this.state.newPassword !== this.state.confirmNewPassword){
      ToastAndroid.show("Password not matched",ToastAndroid.SHORT);
    }else if(this.state.newPassword === '' || this.state.confirmNewPassword === ''){
      ToastAndroid.show("Password field required",ToastAndroid.SHORT);
    }else if(this.state.newPassword.length <5 && this.state.newPassword !== ''){
      ToastAndroid.show("Password field lenth should be longer then 5 charracter",ToastAndroid.SHORT);
    }else{
      fetch(this.props.host+'update-password',{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify({
          phone:this.state.username,
          password:this.state.newPassword
        })
      }).then((response)=>response.json()).then((responseJson)=>{
        ToastAndroid.show("Password changed. Login now",ToastAndroid.SHORT);
        setTimeout(()=>{
        this.props.navigation.navigate('Login');
        },2000);
      })
    }
  }

  setDataUsername(username: string) {
    this.setState({ username });
  }
  setDataPassword(password: string) {
    this.setState({ password });
  }
  setDataNewPassword(newPassword: string) {
    this.setState({ newPassword });
  }
  setDataConfirmNewPassword(confirmNewPassword: string) {
    this.setState({ confirmNewPassword });
  }

  handleOTPChange = (otp: String) => {
    this.setState({ otp })
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <MainTitle title="VIP SATTA" colors={['#8B4513', '#b3946d']} />
        { this.state.resetState === 0
    ? <View>
    <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
<WarningButton onPress={()=>{this.login()}} loading={this.state.loading} label={"Send OTP"} />
</View>
    : this.state.resetState === 1
      ? <View>
      <OTPInput
            value={this.state.otp}
            onChange={this.handleOTPChange}
            tintColor="#FFFFFF"
            offTintColor="#FFFFFF"
            otpLength={6}
          />
  <WarningButton onPress={()=>{this.verifyOtp()}} loading={this.state.loading} label={"Enter OTP"} />
  </View>
      : <View>
         <PrimaryInput data={this.state.newPassword} width={110} setData={this.setDataNewPassword} background={'red'} label={'New password'} />
         <PrimaryInput data={this.state.confirmNewPassword} width={150} setData={this.setDataConfirmNewPassword} background={'red'} label={'Confirm New password'} />
         <WarningButton onPress={()=>{this.resetPassword()}} loading={this.state.loading} label={"Reset password"} />
        </View>}
        
        

        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20 }}>
          <Text style={{ margin: 0, padding: 0, color: 'white' }}>Login different account? </Text><TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
            style={{ margin: 0, padding: 0 }}><Text style={{ color: 'orange', fontWeight: 'bold', padding: 0 }}>Login</Text></TouchableOpacity>
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
  return{
      changeAccessToken : (value) => {dispatch({type:'CHANGE_TOKEN',token: value})},
      changeLogged : (value) => {dispatch({type:'LOGIN',logged: value})},
      changeUser : (value) => {dispatch({type:'CHANGE_USER',user: value})},
  };

};
const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      loggedIn:state.auth.loggedIn
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Forget);
