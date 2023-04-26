import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Games, GamesSingle, Login, Register, Splash, Wallet, GamesHistory } from './Src'
import { connect } from "react-redux"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IonIcons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>VIP SATTA</Text>
      </View>
      {/* Your custom items */}
      <DrawerItem
        label="My Profile"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="account-box"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="My PlayGame"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="videogame-asset"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Commision"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="room-preferences"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="How to Play"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="info"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Result History"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="history"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Add/Withdrow List"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="add"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Help"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="help"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Share & Earn"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="share"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Terms & Condition"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Settings')}
        icon={() => <MaterialIcons name="file-copy"  size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{color: 'white'}}
        onPress={() => alert('Pressed Logout')}
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
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn
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


