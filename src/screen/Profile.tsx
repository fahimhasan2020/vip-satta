import { Text, StyleSheet, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import {connect} from "react-redux"
class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StackHeader title='Profile' navigation={this.props.navigation} />
        <View style={styles.card}>
          <View style={styles.nameSection}>
            <EvilIcons name="user" size={150} color={'white'} />
            <Text style={{ fontSize: 30, color: '#ffffff', fontWeight: 'bold' }}>{this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}</Text>
          </View>
          <View style={styles.detailsSection}>

          </View>
        </View>
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
    loggedIn: state.auth.loggedIn
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


const styles = StyleSheet.create({
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
    justifyContent: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 20
  },
  detailsSection: {
    backgroundColor: '#ffffff',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  }
})