import React, { Component } from 'react';
import { View, Text, StyleSheet, Share, Linking, Image } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Loader from '../component/Loader';
import { Home, Games, GamesSingle, Login, Register, Support, Splash, Wallet, GamesHistory, Forget, Profile, EditProfile, HowToPlay, Commision, Result, TransectionHistory, TermsAndConditions } from './Src'
import { connect } from "react-redux"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import CustomDrawerContent from './CustomDrawerComponent';
import store from "../store/store"
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const shareWithFriends = async (msg) => {
  const result = await Share.share({
    message: "Refer your friends and receive 5% commission amount lifetime on every loss bidding (booking) of your friends  user Referral code " + msg.toString() + " https://playvipmember.in/pvm.apk",
  });
}
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
      <Stack.Screen name="Support" component={Support} />
    </Stack.Navigator>
  );
}

interface Props {
  loggedIn: Boolean
}

interface State {

}

function HomeDrawer({ user }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent user={user} navigation={props.navigation} />}
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
  fetchData = async () => {
    try {
      const [preferencesResponse, todayGameResponse, allGamesResponse] = await Promise.all([
        fetch(this.props.host + "get-preferences"),
        fetch(this.props.host + "today-game"),
        fetch(this.props.host + "get-all-games"),
      ]);
      const preferences = await preferencesResponse.json();
      const todayGame = await todayGameResponse.json();
      const allGame = await allGamesResponse.json();
      this.props.changePreference(preferences);
      if (todayGame.hasOwnProperty("data")) {
        this.props.changeTodayGame(todayGame.data);
      }
      if (allGame.hasOwnProperty("data")) {
        this.props.changeAllGame(allGame.data);
      }
    } catch (error) {
      console.log("no data fetched", error);
    }
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <NavigationContainer>
        {!this.props.loggedIn ? <NonUserStack /> : <HomeDrawer user={this.props.user} />}
        {this.props.loader ? <Loader /> : null}
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
    changeAllGame: (value) => { dispatch({ type: 'GAME_SET', logged: value }) },
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn,
    preference: state.auth.preference,
    loader: state.auth.loader,
    user: state.auth.user
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
  header: {
    height: 280,
    backgroundColor: '#7e07a6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ccc',
    zIndex: 10, marginTop: 210
  },
  drawerStyle: {
    backgroundColor: '#7e07a6',
    width: 240,
  },
});


