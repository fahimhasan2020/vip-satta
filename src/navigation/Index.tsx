import React, { Component } from 'react';
import { View, Text, StyleSheet, Share, Linking } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Games, GamesSingle, Login, Register, Splash, Wallet, GamesHistory, Forget, Profile, EditProfile, HowToPlay, Commision, Result, TransectionHistory, TermsAndConditions } from './Src'
import { connect } from "react-redux"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IonIcons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { whatsapp, whatsappMsg } from '../constants/Index';

import store from "../store/store"
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const shareWithFriends = async (msg) => {
  const result = await Share.share({
    message:"Refer your friends and receive 5% commission amount lifetime on every loss bidding (booking) of your friends  user Referral code "+msg.toString()+" https://playvipmember.in/pvm.apk",
  });
}

const currentState = store.getState();

const logoutAction = {
  type: 'LOGOUT',
  payload: {
    logged: false,
  },
};




const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom header */}
      <View style={styles.header}>
        <EvilIcons name="user" size={120} color={'#fff'} />
        <Text style={styles.headerText}>
          {currentState.auth.user !== null ? currentState.auth.user.first_name + ' ' + currentState.auth.user.last_name : ''}

        </Text>
      </View>
      {/* Your custom items */}
      <DrawerItem
        label="My Profile"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('Profile')}
        icon={() => <MaterialIcons name="account-box" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="My PlayGame"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('GamesHistory')}
        icon={() => <MaterialIcons name="videogame-asset" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Commision"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('Commision')}
        icon={() => <MaterialIcons name="room-preferences" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="How to Play"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('HowToPlay')}
        icon={() => <MaterialIcons name="info" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Result History"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('Result')}
        icon={() => <MaterialIcons name="history" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Add/Withdrow List"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('TransectionHistory')}
        icon={() => <MaterialIcons name="add" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Help"
        labelStyle={{ color: 'white' }}
        onPress={() => Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${whatsappMsg}`)}
        icon={() => <FontAwesome name="whatsapp" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Share & Earn"
        labelStyle={{ color: 'white' }}
        onPress={() => shareWithFriends(currentState.auth.user.account_id)}
        icon={() => <MaterialIcons name="share" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Terms & Condition"
        labelStyle={{ color: 'white' }}
        onPress={() => props.navigation.navigate('TermsAndConditions')}
        icon={() => <MaterialIcons name="file-copy" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{ color: 'white' }}
        onPress={() => store.dispatch(logoutAction)}
        icon={() => <MaterialIcons name="logout" size={30} color={'#fff'} />}
      />
    </DrawerContentScrollView>
  );
};
const Tab = createBottomTabNavigator();

function NonUserStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forget" component={Forget} />
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
        tabBarInactiveTintColor: "#958b99",
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute', bottom: 40, left: 20, right: 20, borderRadius: 20, height: 80 },
      }}
    >

      <Tab.Screen
        name="Games"
        component={Games}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="game-controller" color={color} size={size} />
              <Text style={{ color: color, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Games</Text>
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
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="home" color={color} size={size} />
              <Text style={{ color: color, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Home</Text>
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
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="wallet" color={color} size={size} />
              <Text style={{ color: color, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Wallet</Text>
            </View>

          ),
        }}
      />
    </Tab.Navigator>
  );
}


function UserStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: true,

      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}>
      <Stack.Screen name="MyTabs" children={MyTabs} />
      <Stack.Screen name="GamesSingle" component={GamesSingle} />
      <Stack.Screen name="GamesHistory" component={GamesHistory} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="TransectionHistory" component={TransectionHistory} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="HowToPlay" component={HowToPlay} />
      <Stack.Screen name="Commision" component={Commision} />
      <Stack.Screen name="Result" component={Result} />

    </Stack.Navigator>
  );
}

interface Props {
  loggedIn: Boolean
}

interface State {

}

function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerContentContainerStyle: { backgroundColor: '#7e07a6' },
        drawerContentStyle: { backgroundColor: '#7e07a6' },
        drawerItemStyle: { backgroundColor: 'white' },
        drawerStyle: {
          backgroundColor: '#7e07a6'
        },
        drawerActiveBackgroundColor: '#7e07a6',
        drawerActiveTintColor: '#ffffff',
        drawerLabelStyle: { color: 'white', fontSize: 25 }
      }}>
      <Drawer.Screen name="House" children={UserStack} />
    </Drawer.Navigator>
  )
}



class Index extends Component<Props, State>{
  componentDidMount(): void {
    fetch(this.props.host + 'get-preferences')
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.changePreference(responseJson);
      })
    fetch(this.props.host + 'today-game')
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.changeTodayGame(responseJson.data);
        console.log(responseJson);
      })
  }
  render() {
    return (
      <NavigationContainer>
        {!this.props.loggedIn ? <NonUserStack /> : <HomeDrawer />}
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccessToken: (value) => { dispatch({ type: 'CHANGE_TOKEN', token: value }) },
    changeLogged: (value) => { dispatch({ type: 'LOGIN', logged: value }) },
    changePreference: (value) => { dispatch({ type: 'PREERENCE_SET', logged: value }) },
    changeTodayGame: (value) => { dispatch({ type: 'TODAY_GAME_SET', logged: value }) },
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn,
    preference:state.auth.preference
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: '#7e07a6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  drawerStyle: {
    backgroundColor: '#7e07a6',
    width: 240,
  },
});


