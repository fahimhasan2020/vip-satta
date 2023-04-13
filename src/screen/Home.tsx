import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HomeProps {
  username: string;
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
    
  }

  render() {
    return (
      <View style={styles.container}>
       <Text>Home</Text>
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

export default Home;
