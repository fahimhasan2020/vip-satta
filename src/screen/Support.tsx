import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { connect } from "react-redux"
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
class Support extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StackHeader title={'Support'} navigation={this.props.navigation} />
                <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height + 100, top: 0, left: 0, opacity: 0.2 }} />
                <View style={{ margin: 10, width: '95%', borderRadius: 10, backgroundColor: 'white', padding: 20, elevation: 10 }}>
                    <Text style={{ fontSize: 25, letterSpacing: 1, fontWeight: 900, alignSelf: 'center', color: '#02c8fa' }}>{this.props.preference.data[24].signup_qr_code_help_text}</Text>
                    <Image source={{ uri: this.props.host + this.props.preference.data[25].signup_qr_code }} style={{ height: 250, width: 250, alignSelf: 'center', marginTop: 50 }} />
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
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        preference: state.auth.preference,
        todaysGames: state.auth.todaysGames,
        closestEndGame: state.auth.closestEndGame
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Support);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})