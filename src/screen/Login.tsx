import React, { Component } from 'react';
import { View, Text, TextInput, Button,StatusBar,StyleSheet,Image,TouchableOpacity } from 'react-native';
import {PrimaryInput,PrimaryPassword} from "../component/Inputs"
import {PrimaryButton,WarningButton} from "../component/Buttons"
interface Props {
}

interface State {
  username: string;
  password: string;
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password:''
    };
    this.setDataUsername = this.setDataUsername.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
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
        <StatusBar barStyle={'light-content'} backgroundColor={'red'} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>VIP SATTA</Text>
        <PrimaryInput data={this.state.username} width={86} setData={this.setDataUsername} background={'red'} label={'Enter Phone'} />
        <PrimaryPassword data={this.state.password} width={106} setData={this.setDataPassword} background={'red'} label={'Enter Password'} />
        <WarningButton label={"SIGN IN"}/>

        <View style={{flexDirection:'row',position:'absolute',bottom:20}}>
          <Text style={{margin:0,padding:0,color:'white'}}>Don't have any account? </Text><TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('Register');
          }}
          style={{margin:0,padding:0}}><Text style={{color:'orange', fontWeight:'bold',padding:0}}>Register</Text></TouchableOpacity>
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

export default Login;
