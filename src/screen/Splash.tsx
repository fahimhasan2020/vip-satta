import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Image,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import {connect} from "react-redux"
import {hide} from "react-native-bootsplash"

interface AppProps {

}

interface AppState {
  message: string;
  translateY: Animated.Value;
  bar: Boolean;
}

class Splash extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      message: '',
      translateY: new Animated.Value(200),
      bar: false
    };
  }

  componentDidMount = async() => {
    hide();
    hideNavigationBar();
    setTimeout(() => {
      this.setState({ bar: true });
    }, 800)
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
   
    const loggedValue = await AsyncStorage.getItem("loggedIn");
    if(loggedValue !== null || loggedValue !== ''){
      if(loggedValue === 'true'){
       
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        fetch(this.props.host+'get-user-details',{
          method:'GET',
          headers:{
            "Access-Token":token
          }
        }).then((response)=>response.json()).then(async(responseJson)=>{
          console.log(responseJson);
          if(responseJson.status === 1){
            this.props.changeUser(responseJson.data);
            this.props.changeLogged(true);
          }else{
            ToastAndroid.show("Token expired. Login now",ToastAndroid.SHORT);
            await AsyncStorage.setItem("loggedIn",'false');
            this.props.navigation.navigate('Login');
          }
        }).catch(error=>{
          ToastAndroid.show("Unable to connect to internet",ToastAndroid.SHORT);
          this.props.navigation.navigate('Login');
        });
      }else{
        this.props.navigation.navigate('Login');
      }
    }else{
      await AsyncStorage.setItem("loggedIn",'false');
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.bar ? <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} /> : null}
        <Image source={require('../assets/logoicontr.png')} style={styles.logo} />
        <Animated.Text
          style={[styles.text, { transform: [{ translateY: this.state.translateY }] }]}
        >
          VIP SATTA
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7e07a6'
  },
  text: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 35
  },
  logo: {
    height: 160,
    width: 160
  }
});

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


export default connect(mapStateToProps,mapDispatchToProps)(Splash);
