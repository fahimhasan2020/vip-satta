import { Text, StyleSheet, View, ScrollView, StatusBar } from 'react-native'
import React, { Component } from 'react'
import { connect } from "react-redux"
import StackHeader from '../component/StackHeader'

class TermsAndConditions extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.containers}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <StackHeader navigation={this.props.navigation} title={'Terms & Conditions'} />
        <Text style={{ textAlign: 'center', padding: 20 }}>{this.props.preference.data[11].terms}</Text>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccessToken: (value) => { dispatch({ type: 'CHANGE_TOKEN', token: value }) },
    changeLogged: (value) => { dispatch({ type: 'LOGIN', logged: value }) },
    changePreference: (value) => { dispatch({ type: 'PREERENCE_SET', logged: value }) },
  };

};
const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    host: state.auth.host,
    loggedIn: state.auth.loggedIn,
    preference: state.auth.preference
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditions);

const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#ffffff',
  }
})