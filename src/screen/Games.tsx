import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable,FlatList } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto"
import Head from "../component/Head"
interface HomeProps {

}

interface HomeState {
  message: string;
  games:String[];
}


class Games extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      message: '',
      games:[
        { id: 1, game: 'VIP DIAMOND', result: 'hold', time: '6:30 - 11: 19 PM' },
        { id: 2, game: 'Taj', result: 'hold', time: '6:30 - 11: 19 PM' },
        { id: 3, game: 'VIP SATTA', result: 'hold', time: '6:30 - 11: 19 PM' },
        { id: 4, game: 'Taj', result: 'hold', time: '6:30 - 11: 19 PM' },
        { id: 5, game: 'AH', result: 'running', time: '6:30 - 11: 19 PM' },
      ]
    };
  }

  componentDidMount = () => {


  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Head navigation={this.props.navigation} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text>All Game</Text>
          <Pressable onPress={()=>{this.props.navigation.navigate('GamesHistory')}} style={{ backgroundColor: 'orange', padding: 10, elevation: 10, width: 130, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}><AntDesign name="caretright" size={20} color="white" /><Text style={{ color: 'white', marginLeft: 5 }}>My Play Game</Text></Pressable>
        </View>
        <View style={styles.gamesCard}>
        <FlatList
        showsHorizontalScrollIndicator={false}
        data={this.state.games}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.gamesCardText}>{item.game}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Fontisto name="clock" size={20} color="black" />
              <Text style={[styles.gamesCardText, { marginLeft: 5 }]}>{item.time}</Text>
            </View>
          </View>
          {item.result === "hold"?<Pressable style={styles.warningButton}><Text style={{ color: 'white' }}>Timeout</Text></Pressable>:<Pressable style={styles.primaryButton}><Text style={{ color: 'white' }}>Play games</Text></Pressable>}
          
        </View>
        )}
        keyExtractor={item => item.id}
      />
          
        </View>

      </ScrollView>
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

export default Games;
