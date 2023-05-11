import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable, FlatList } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto"
import Head from "../component/Head"
import { connect } from "react-redux"
interface HomeProps {

}

interface HomeState {
  message: string;
}


class Games extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount = () => {
    console.log('Ahha:', this.props.allGames)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Head navigation={this.props.navigation} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text>All Game</Text>
          <Pressable onPress={() => { this.props.navigation.navigate('GamesHistory') }} style={{ backgroundColor: 'orange', padding: 10, elevation: 10, width: 130, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}><AntDesign name="caretright" size={20} color="white" /><Text style={{ color: 'white', marginLeft: 5 }}>My Play Game</Text></Pressable>
        </View>
        <View style={styles.gamesCard}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={this.props.allGames}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View>
                  <Text style={[styles.gamesCardText, { color: '#000' }]}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Fontisto name="clock" size={20} color="black" />
                    <Text style={[styles.gamesCardText, { marginLeft: 5, color: '#000' }]}>{item.closing_time}</Text>
                  </View>
                </View>
                {item.timeout === "Yes" ? <Pressable style={styles.warningButton}><Text style={{ color: 'white' }}>Timeout</Text></Pressable> : <Pressable onPress={() => { this.props.navigation.navigate('GamesSingle', { title: item.name, id: item.id }) }} style={styles.primaryButton}><Text style={{ color: 'white' }}>Play games</Text></Pressable>}

              </View>
            )}
            keyExtractor={item => item.id}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 1500,
  },
  warningButton: {
    padding: 5, backgroundColor: 'orange', elevation: 10, width: 110, alignItems: 'center', borderRadius: 10, justifyContent: 'center', height: 40
  },
  primaryButton: {
    padding: 5, backgroundColor: 'blue', elevation: 10, width: 110, alignItems: 'center', borderRadius: 10, justifyContent: 'center', height: 40
  },
  gamesCard: {
    padding: 10,
    margin: 20,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    height: 400
  },
  gamesCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
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
    allGames: state.auth.allGames
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Games);
