import { View, Text, StyleSheet, Share, Linking, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import { whatsapp, whatsappMsg } from '../constants/Index';
import { useState, useEffect } from "react"
import store from "../store/store"
const shareWithFriends = async (msg) => {
  const result = await Share.share({
    message: "Refer your friends and receive 5% commission amount lifetime on every loss bidding (booking) of your friends  user Referral code " + msg.toString() + " https://playvipmember.in/pvm.apk",
  });
}

const logoutAction = {
  type: 'LOGOUT',
  payload: {
    logged: false,
  },
};
const CustomDrawerContent = ({ user, navigation }) => {
  const [socialClosed, setSocialClosed] = useState(false);
  return (
    <DrawerContentScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={require('../assets/bg.png')} style={{ position: 'absolute', top: 0, left: 0, flex: 1, zIndex: 1, opacity: 0.3 }} />
        <Image source={require('../assets/bg2.jpg')} style={{ height: 200, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
        <Image source={require('../assets/user.png')} style={{ height: 70, width: 70, zIndex: 3, position: 'absolute', top: 160, left: '40%' }} />
        <Text style={styles.headerText}>
          {user !== null ? user.first_name + ' ' + user.last_name : ''}
        </Text>
      </View>
      <DrawerItem
        label="My Profile"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('Profile')}
        icon={() => <MaterialIcons name="account-box" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="My PlayGame"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('GamesHistory')}
        icon={() => <MaterialIcons name="videogame-asset" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Commision"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('Commision')}
        icon={() => <MaterialIcons name="room-preferences" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="How to Play"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('HowToPlay')}
        icon={() => <MaterialIcons name="info" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Result History"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('Result')}
        icon={() => <MaterialIcons name="history" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Add/Withdrow List"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('TransectionHistory')}
        icon={() => <MaterialIcons name="add" size={30} color={'#fff'} />}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <DrawerItem
          style={{ width: 200 }}
          label="Help"
          labelStyle={{ color: 'white' }}
          onPress={() => {
            if (socialClosed) {
              setSocialClosed(false);
            } else {
              setSocialClosed(true);
            }

          }}
          icon={() => <Entypo name="help" size={30} color={'#fff'} />}
        />
        {socialClosed ? <TouchableOpacity onPress={() => { setSocialClosed(false) }}><MaterialIcons name="remove" size={30} color={'#fff'} /></TouchableOpacity> : <TouchableOpacity onPress={() => { setSocialClosed(true) }}><MaterialIcons name="add" size={30} color={'#fff'} /></TouchableOpacity>}

      </View>

      {socialClosed ? <View style={{ paddingLeft: 20 }}>
        <DrawerItem
          label="WhatsApp"
          labelStyle={{ color: 'white' }}
          onPress={() => Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${whatsappMsg}`)}
          icon={() => <FontAwesome name="whatsapp" size={30} color={'#fff'} />}
        />
        <DrawerItem
          label="Youtube"
          labelStyle={{ color: 'white' }}
          onPress={() => Linking.openURL(`https://youtube.com`)}
          icon={() => <FontAwesome name="youtube" size={30} color={'#fff'} />}
        />
        <DrawerItem
          label="Telegram"
          labelStyle={{ color: 'white' }}
          onPress={() => Linking.openURL(`https://t.me/8801979585912
          `)}
          icon={() => <FontAwesome name="telegram" size={30} color={'#fff'} />}

        />
        <DrawerItem
          label="Skype"
          labelStyle={{ color: 'white' }}
          onPress={() => Linking.openURL(`http://skype.com`)}
          icon={() => <FontAwesome name="skype" size={30} color={'#fff'} />}
        />
      </View> : null}


      <DrawerItem
        label="Share & Earn"
        labelStyle={{ color: 'white' }}
        onPress={() => shareWithFriends(user.account_id)}
        icon={() => <MaterialIcons name="share" size={30} color={'#fff'} />}
      />
      <DrawerItem
        label="Terms & Condition"
        labelStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('TermsAndConditions')}
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

export default CustomDrawerContent;

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
