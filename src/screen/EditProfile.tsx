import { Text, StyleSheet, View, Pressable, Modal, ToastAndroid, ActivityIndicator,Dimensions,Image } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { PrimaryButton, WarningButton } from "../component/Buttons"
import { PrimaryInput, PrimaryPassword, SecondaryPassword, SecondaryInput } from "../component/Inputs"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { connect } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
class EditProfile extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      modalVisible: false,
      firstName: '',
      lastName: '',
      loading: false
    };
    this.setDataFirstName = this.setDataFirstName.bind(this);
    this.setDataLastName = this.setDataLastName.bind(this);
  }
  handleNameUpdate = async() => {
    this.setState({ loading: true });
    const token = await AsyncStorage.getItem("token");
    fetch(this.props.host + 'update-user-profile', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Append": "application/json",
        "Access-Token":token
      },
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      })
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
      this.setState({ loading: false });
      ToastAndroid.show("Prodile updaated", ToastAndroid.CENTER);
      fetch(this.props.host + 'get-user-details', {
        method: 'GET',
        headers: {
          "Access-Token": token
        }
      }).then((response) => response.json()).then(async (responseJson) => {
        console.log(responseJson);
        this.props.changeUser(responseJson.data);
      }).catch(error => {
        ToastAndroid.show("Unable to connect to internet", ToastAndroid.SHORT);
      });
    }).catch((error) => {
      console.log(error);
      ToastAndroid.show("Failed to update profile", ToastAndroid.CENTER);
      this.setState({ loading: false });
    })
  }

  componentDidMount(): void {
    this.props.user !== null ? this.setState({ firstName: this.props.user.first_name, lastName: this.props.user.last_name }) : ''
  }

  setDataFirstName(firstName: string) {
    this.setState({ firstName });
  }
  setDataLastName(lastName: string) {
    this.setState({ lastName });
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader title='Edit Profile' navigation={this.props.navigation} />
        <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height+100, top: 0, left: 0, opacity: 0.2 }} />
        <View style={styles.card}>
          <View style={styles.nameSection}>
            <EvilIcons name="user" size={150} color={'white'} />
            <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>{this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}</Text>
          </View>
          <View style={styles.detailsSection}>
            <View style={styles.viewSingle}>
              <View style={styles.labelSection}>
                <Entypo name="mail" size={25} color={'#06b795'} />
                <Text style={styles.label}>phone</Text>
              </View>
              <Text style={styles.labels}>{this.props.user !== null ? this.props.user.phone : ''}</Text>
            </View>
            <SecondaryInput data={this.state.firstName} width={116} setData={this.setDataFirstName} background={'red'} label={'Enter First Name'} />
            <SecondaryInput data={this.state.lastName} width={116} setData={this.setDataLastName} background={'red'} label={'Enter Last Name'} />

          </View>
        </View>
        <Pressable onPress={() => { this.handleNameUpdate() }} style={styles.button}>
          {this.state.loading ? <ActivityIndicator size={'small'} color={'#fff'} style={{}} /> : <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Entypo name="user" size={20} color={'#fff'} /><Text style={styles.buttonText}>UPDATE PROFILE</Text></View>}
        </Pressable>
      </View>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    changeAccessToken: (value) => { dispatch({ type: 'CHANGE_TOKEN', token: value }) },
    changeLogged: (value) => { dispatch({ type: 'LOGIN', logged: value }) },
    changeUser: (value) => { dispatch({ type: 'CHANGE_USER', user: value }) },
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10
  },
  button: {
    backgroundColor: '#35b4e7',
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 10,
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10
  },
  nameSection: {
    backgroundColor: '#feb100',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  detailsSection: {
    backgroundColor: '#ffffff',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 10,
    paddingTop: 30
  },
  viewSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 15
  },
  labels: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 120
  },
  labelSection: {
    flexDirection: 'row',
    marginBottom: 20
  },
  modalView: {
    margin: 20,
    marginTop: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#35b4e7',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})