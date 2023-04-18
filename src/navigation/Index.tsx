import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Home,Games,GamesSingle,Login,Register,Splash} from './Src'

const Stack = createStackNavigator();

function NonUserStack() {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false, 
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} /> 
    </Stack.Navigator>
  );
}


class Index extends Component {
  render() {
    return (
      <NavigationContainer>
        <NonUserStack />
      </NavigationContainer>
    );
  }
}

export default Index;
