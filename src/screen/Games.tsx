import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Head from "../component/Head"

interface GamesProps {
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
        <Head />
       <Text>Games</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Games;
