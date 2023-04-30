import { Text, StyleSheet, View, Pressable, Modal, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { PrimaryButton, WarningButton } from "../component/Buttons"
import { PrimaryInput, PrimaryPassword, SecondaryPassword } from "../component/Inputs"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { connect } from "react-redux"
class Profile extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      modalVisible: false,
      password: '',
      confirmPassword: ''
    };
    this.setDataPassword = this.setDataPassword.bind(this);
    this.setDataConfirmPassword = this.setDataConfirmPassword.bind(this);
  }
  handleResetPassword = () => {
    if (this.state.password !== this.state.confirmPassword) {
      ToastAndroid.show("Password not matched", ToastAndroid.SHORT);
    } else if (this.state.password === '' || this.state.confirmPassword === '') {
      ToastAndroid.show("Password field required", ToastAndroid.SHORT);
    } else if (this.state.password.length < 5 && this.state.password !== '') {
      ToastAndroid.show("Password field lenth should be longer then 5 charracter", ToastAndroid.SHORT);
    } else {
      fetch(this.props.host + 'update-password', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          phone: this.props.user.phone,
          password: this.state.password
        })
      }).then((response) => response.json()).then((responseJson) => {
        ToastAndroid.show("Password changed", ToastAndroid.SHORT);
        setTimeout(() => {
          this.setState({ modalVisible: false });
        }, 2000);
      }).catch((error) => {
        this.setState({ modalVisible: false });
        ToastAndroid.show("Password reset failed", ToastAndroid.SHORT);
      })
    }
  }

  setDataPassword(password: string) {
    this.setState({ password });
  }
  setDataConfirmPassword(confirmPassword: string) {
    this.setState({ confirmPassword });
  }
  render() {
    return (
      <View style={styles.container}>
        <StackHeader title='Profile' navigation={this.props.navigation} />
        <View style={styles.card}>
          <View style={styles.nameSection}>
            <EvilIcons name="user" size={150} color={'white'} />
            <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>{this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}</Text>
          </View>
          <View style={styles.detailsSection}>
            <View style={styles.viewSingle}>
              <View style={styles.labelSection}>
                <Entypo name="mail" size={25} color={'#06b795'} />
                <Text style={styles.label}>Email</Text>
              </View>
              <Text style={styles.labels}>{this.props.user !== null ? this.props.user.email : ''}</Text>
            </View>
            <View style={styles.viewSingle}>
              <View style={styles.labelSection}>
                <Entypo name="user" size={25} color={'#06b795'} />
                <Text style={styles.label}>Full Name</Text>
              </View>
              <Text style={styles.labels}>{this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}</Text>
            </View>
            <View style={styles.viewSingle}>
              <View style={styles.labelSection}>
                <Feather name="phone" size={25} color={'#06b795'} />
                <Text style={styles.label}>Phone</Text>
              </View>
              <Text style={styles.labels}>{this.props.user !== null ? this.props.user.phone : ''}</Text>
            </View>
            <View style={styles.viewSingle}>
              <View style={styles.labelSection}>
                <MaterialIcons name="location-city" size={25} color={'#06b795'} />
                <Text style={styles.label}>City</Text>
              </View>
              <Text style={styles.labels}></Text>
            </View>
          </View>
        </View>
        <Pressable onPress={() => { this.setState({ modalVisible: true }) }} style={styles.button}><MaterialIcons name="vpn-key" size={20} color={'#fff'} /><Text style={styles.buttonText}>CHANGE PASSWORD</Text></Pressable>
        <Pressable onPress={() => { this.props.navigation.navigate('EditProfile') }} style={styles.button}><MaterialIcons name="vpn-key" size={20} color={'#fff'} /><Text style={styles.buttonText}>EDIT USER PROFILE</Text></Pressable>


        {/* modal section start*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <SecondaryPassword data={this.state.password} width={106} setData={this.setDataPassword} background={'white'} label={'Enter Password'} />
              <SecondaryPassword data={this.state.confirmPassword} width={125} setData={this.setDataConfirmPassword} background={'white'} label={'Confirm Password'} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.handleResetPassword()}>
                <Text style={styles.textStyle}>Reset Password</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* modal section  end*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


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
    flexDirection: 'row'
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