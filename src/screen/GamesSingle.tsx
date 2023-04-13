import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GamesSingleProps {
  username: string;
}

interface GamesSingleState {
  message: string;
}

class GamesSingle extends Component<GamesSingleProps, GamesSingleState> {
  constructor(props: GamesSingleProps) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount =()=> {
    
  }

  render() {
    return (
      <View style={styles.container}>
       <Text>Games Single</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamesSingle;
