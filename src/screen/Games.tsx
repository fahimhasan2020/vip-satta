import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GamesProps {
  username: string;
}

interface GamesState {
  message: string;
}

class Games extends Component<GamesProps, GamesState> {
  constructor(props: GamesProps) {
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
       <Text>Games</Text>
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

export default Games;
