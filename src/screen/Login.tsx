import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoginProps {
  username: string;
}

interface LoginState {
  message: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
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
       <Text>Login</Text>
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

export default Login;
