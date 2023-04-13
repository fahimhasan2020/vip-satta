import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RegisterProps {
  username: string;
}

interface RegisterState {
  message: string;
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
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
       <Text>Register</Text>
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

export default Register;
