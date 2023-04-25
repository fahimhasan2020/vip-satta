import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import Head from "../component/Head"
import Lottie from 'lottie-react-native';
import RNBootSplash from "react-native-bootsplash";
import ScrollingText from '../component/ScrollText';
interface HomeProps {
  
}

interface HomeState {
  message: string;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount =()=> {
    
    RNBootSplash.hide({ fade: true, duration: 500 });
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <Head />
      <View style={{backgroundColor:'#7e07a6',width:'90%',alignSelf:'center',margin:10,borderRadius:30,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,}}>

        <View style={{width:'100%',paddingLeft:20,paddingRight:20,marginTop:20}}>
          <ScrollingText text="NEW HELPLINE NUMBER 999-999-999" />
        </View>
        <View style={{alignItems:'center',padding:10,margin:10}}>
          <Text style={styles.regularFonts}>username</Text>
          <Text style={styles.regularFonts}>RS.0</Text>
          <Text style={styles.regularFonts}>Wallet Balance</Text>
        </View>
        <View style={{width:'100%',backgroundColor:'white',alignItems:'center',height:150,justifyContent:'center',overflow:'hidden',position:'relative'}}>
        <Lottie source={require('../assets/animation.json')} autoPlay loop style={{width:'100%'}} />
        <View style={{position:'absolute',top:0,left:0,right:0,alignItems:'center',justifyContent:'center',width:'100%',zIndex:2}}>
        <Text style={styles.regularFontsDark}>Taj</Text>
          <Text style={styles.regularFontsDark}>50</Text>
          <Text style={styles.regularFontsDark}>3:20 PM</Text>
        </View>
        </View>
        <View style={{width:'100%',height:30}}></View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  regularFonts:{
    color:'white',
    fontSize:20,
    marginBottom:10
  },
  regularFontsDark:{
    color:'#5f5461',
    fontSize:20,
    fontWeight:'bold',
    marginBottom:10
  }
});

export default Home;
