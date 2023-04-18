import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,StatusBar,Image } from 'react-native';
import RNBootSplash from "react-native-bootsplash";

interface AppProps {
  
}

interface AppState {
  message: string;
  translateY: Animated.Value;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      message: '',
      translateY: new Animated.Value(200),
    };
  }

  componentDidMount = () => {
    RNBootSplash.hide({ fade: true, duration: 500 });
    Animated.timing(this.state.translateY, {
      toValue: 0, // animate translateY to 0
      duration: 1000, // animation duration in milliseconds
      useNativeDriver: true, // use native driver for performance
    }).start(); // start the animation
    setTimeout(()=>{
        this.props.navigation.navigate('Login');
    },3000);
  };

  render() {
    return (
      <View style={styles.container}>
        
        
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
    backgroundColor:'red'
  },
  text:{
    color:'white',
    fontWeight:'bold',
    fontSize:28
  },
  logo:{
    height:100,
    width:100
  }
});

export default App;
