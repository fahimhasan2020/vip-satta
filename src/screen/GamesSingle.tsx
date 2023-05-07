import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, StatusBar, Pressable } from 'react-native';
import StackHeader from '../component/StackHeader';

interface GamesSingleProps {
}

interface GamesSingleState {
  message: string;
  condition: Number;
  odds: Number;
}

class GamesSingle extends Component<GamesSingleProps, GamesSingleState> {
  constructor(props: GamesSingleProps) {
    super(props);
    this.state = {
      message: '',
      condition: 0,
      odds: 0
    };
  }

  componentDidMount = () => {

  }

  changePress = (value) => {
    this.setState({ condition: value });
  }

  render() {
    const { params } = this.props.route;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <StackHeader navigation={this.props.navigation} title={params.title} />
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
          <TouchableHighlight underlayColor="#ff263d" onPress={() => { this.changePress(0) }} style={[styles.navButtons, { backgroundColor: (this.state.condition !== 0 ? '#ff263d' : '#f87583') }]}><Text style={styles.btnText}>JANTRI</Text></TouchableHighlight>
          <TouchableHighlight underlayColor="$ff263d" onPress={() => { this.changePress(1) }} style={[styles.navButtons, { backgroundColor: (this.state.condition !== 1 ? '#ff263d' : '#f87583') }]}><Text style={styles.btnText}>CROSSING</Text></TouchableHighlight>
          <TouchableHighlight underlayColor="#ff263d" onPress={() => { this.changePress(2) }} style={[styles.navButtons, { backgroundColor: (this.state.condition !== 2 ? '#ff263d' : '#f87583') }]}><Text style={styles.btnText}>NO TO NO</Text></TouchableHighlight>
        </View>

        <View style={styles.bottomContent}>
          <Text style={styles.paymentText}>₹ {this.state.odds} /-</Text>
          <Pressable style={styles.gameButton}><Text style={styles.gameButtonText}>Play</Text></Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameButtonText: {
    color: '#fff'
  },
  gameButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue'
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 30,
    zIndex: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120
  },
  paymentText: {
    fontSize: 33,
    color: '#000',
    fontWeight: 'bold'
  },
  btnText: {
    color: '#fff',
    fontSize: 14
  },
  navButtons: {
    padding: 10,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    marginBottom: 10,
    elevation: 10
  }
});

export default GamesSingle;
