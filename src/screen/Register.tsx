import React, { Component } from 'react';
import { View, Text, TextInput, Button,StatusBar,StyleSheet,Image,TouchableOpacity,ScrollView } from 'react-native';
import {PrimaryInput,PrimaryPassword} from "../component/Inputs"
import {PrimaryButton,WarningButton} from "../component/Buttons"
interface Props {
}

interface State {
  username: string;
  password: string;
  confirmPassword:String;
  referelId:String;
  firstName:String;
  lastName:String;
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
      lastName:''
    };
    this.setDataUsername = this.setDataUsername.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
    this.setDataConfirmPassword = this.setDataConfirmPassword.bind(this);
    this.setDatareferelId = this.setDatareferelId.bind(this);
    this.setDataFirstName = this.setDataFirstName.bind(this);
    this.setDataLastName = this.setDataLastName.bind(this);
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


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'red'} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>VIP SATTA</Text>

        <PrimaryInput data={this.state.referelId} width={106} setData={this.setDatareferelId} background={'red'} label={'Referel Id'} />
        <PrimaryInput data={this.state.firstName} width={106} setData={this.setDataFirstName} background={'red'} label={'First Name'} />
        <PrimaryInput data={this.state.lastName} width={106} setData={this.setDataLastName} background={'red'} label={'Last Name'} />
        <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
        <PrimaryPassword data={this.state.password} width={106} setData={this.setDataPassword} background={'red'} label={'Enter Password'} />
        <PrimaryPassword data={this.state.confirmPassword} width={106} setData={this.setDataPassword} background={'red'} label={'Confirm Password'} />
        <WarningButton label={"SIGN IN"}/>
        <View style={{flexDirection:'row',position:'absolute',bottom:20}}>
          <Text style={{margin:0,padding:0,color:'white'}}>Already have account? </Text><TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('Login');
          }}
          style={{margin:0,padding:0}}><Text style={{color:'orange', fontWeight:'bold',padding:0}}>Login</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red'
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
