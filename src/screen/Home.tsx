import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Dimensions, Image } from 'react-native';
import Head from "../component/Head"
import Lottie from 'lottie-react-native';
import RNBootSplash from "react-native-bootsplash";
import ScrollingText from '../component/ScrollText';
import TodaysGames from '../component/TodaysGames';
import { connect } from "react-redux"
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

  componentDidMount = () => {
    RNBootSplash.hide({ fade: true, duration: 500 });
  }

  render() {
    return (<View style={{ flex: 1 }}><Head navigation={this.props.navigation} /><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height + 100, top: 0, left: 0, opacity: 0.2 }} />

      <View style={{
        backgroundColor: '#7e07a6', width: '90%', alignSelf: 'center', margin: 10, borderRadius: 30, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}>

        <View style={{ width: '100%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
          <ScrollingText text={this.props.preference !== null ? this.props.preference.data[4].notice : ''} />
        </View>
        <View style={{ alignItems: 'center', padding: 5, margin: 5 }}>
          <Text style={styles.regularFonts}>
            {this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}
          </Text>
          <Text style={styles.regularFonts}>RS. {this.props.user !== null ? Math.ceil(this.props.user.balance).toLocaleString('en-US') : ''}</Text>
          <Text style={styles.regularFonts}>Wallet Balance</Text>
        </View>
        <View style={{ width: '100%', backgroundColor: 'white', alignItems: 'center', height: 120, justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          <Lottie source={require('../assets/animation.json')} autoPlay loop style={{ width: '100%' }} />
          {this.props.closestEndGame !== null ? <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', width: '100%', zIndex: 2 }}>
            <Text style={styles.regularFontsDark}>{this.props.closestEndGame.name}</Text>
            <Text style={styles.regularFontsDarkSmall}>Closing Time</Text>
            <Text style={styles.regularFontsDark}>{this.props.closestEndGame.closing_time}</Text>
          </View> : null}
        </View>
        <View style={{ width: '100%', height: 30 }}>

        </View>
      </View>
      <View style={{ width: '100%', padding: 15 }}>
        <Text style={styles.todaysGames}>Todays Result</Text>
        <TodaysGames games={this.props.todaysGames} />

      </View>
    </ScrollView></View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 200,
  },
  regularFonts: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10
  },
  regularFontsDark: {
    color: '#5f5461',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  regularFontsDarkSmall: {
    color: '#5f5461',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10
  },
  todaysGames: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#7e07a6',
    letterSpacing: 1,
    marginBottom: 20
  }
});

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
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    preference: state.auth.preference,
    todaysGames: state.auth.todaysGames,
    closestEndGame: state.auth.closestEndGame
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
