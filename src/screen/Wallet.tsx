import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import Head from "../component/Head"

interface Props {
  
}

interface State {
  message: string;
}

class Wallet extends Component<Props, State> {
  constructor(props: Props) {
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
      <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
      <Head />
      <Text>Wallet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Wallet;
