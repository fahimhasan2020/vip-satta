import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Image } from 'react-native';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import {connect} from "react-redux"

interface AppProps {

}

interface AppState {
  message: string;
  translateY: Animated.Value;
  bar: Boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      message: '',
      translateY: new Animated.Value(200),
      bar: false
    };
  }

  componentDidMount = () => {
    hideNavigationBar();
    setTimeout(() => {
      this.setState({ bar: true });
    }, 800)
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      this.props.changeLogged(true);
      //this.props.navigation.navigate('Login');

    }, 3000);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.bar ? <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} /> : null}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
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
    height: 100,
    width: 100
  }
});

const mapDispatchToProps = dispatch => {
  return{
      changeAccessToken : (value) => {dispatch({type:'CHANGE_TOKEN',token: value})},
      changeLogged : (value) => {dispatch({type:'LOGIN',logged: value})},
  };

};
const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      loggedIn:state.auth.loggedIn
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(App);
