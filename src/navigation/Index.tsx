import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Home,Games,GamesSingle,Login,Register,Splash,Wallet} from './Src'
import {connect} from "react-redux"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IonIcons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function NonUserStack() {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false, 
        gestureEnabled:true,
        gestureDirection:'horizontal',
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} /> 
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator 
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#7e07a6",
      tabBarInactiveTintColor: "gray",
      tabBarShowLabel:false,
      tabBarStyle: { position: 'absolute',bottom:40,left:20,right:20,borderRadius:20,height:80 },
    }}
    >
     
      <Tab.Screen 
      name="Games" 
      component={Games}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Entypo name="game-controller" color={color} size={size} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Games</Text>
          </View>
          
        ),
      }}
      />
       <Tab.Screen 
      name="Home" 
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="home" color={color} size={size} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Home</Text>
          </View>
          
        ),
      }}
       />
      <Tab.Screen 
      name="Wallet" 
      component={Wallet}
      options={{
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ color, size }) => (
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Entypo name="wallet" color={color} size={size} />
            <Text style={{color:color,fontSize:10,fontWeight:'bold',textTransform:'uppercase'}}>Wallet</Text>
          </View>
          
        ),
      }}
      />
    </Tab.Navigator>
  );
}


function UserStack() {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false, 
        gestureEnabled:true,
       
        gestureDirection:'horizontal',
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
      }}>
      <Stack.Screen name="MyTabs" children={MyTabs} />
      <Stack.Screen name="GamesSingle" component={GamesSingle} />
    </Stack.Navigator>
  );
}

interface Props {
loggedIn:Boolean
}

interface State {

}



class Index extends Component <Props,State>{
  render() {
    return (
      <NavigationContainer>
        {!this.props.loggedIn?<NonUserStack />:<UserStack />}
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
      changeAccessToken : (value) => {dispatch({type:'CHANGE_TOKEN',token: value})},
      changeLogged : (value) => {dispatch({type:'LOGIN',logged: value})},
  };

};
const mapStateToProps = state => {
  return {
      accessToken : state.auth.accessToken,
      host: state.auth.host,
      loggedIn:state.auth.loggedIn
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(Index);
