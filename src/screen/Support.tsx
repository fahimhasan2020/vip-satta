import { Text, StyleSheet, View, Image,Dimensions } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
export default class Support extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StackHeader title={'Support'} navigation={this.props.navigation} />
                <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height+100, top: 0, left: 0, opacity: 0.2 }} />
                <View style={{ margin: 10, width: '95%', borderRadius: 10, backgroundColor: 'white', padding: 20, elevation: 10 }}>
                    <Text style={{ fontSize: 25, letterSpacing: 1, fontWeight: 900, alignSelf: 'center', color: '#02c8fa' }}>SUPPORT US USING UPI</Text>
                    <Image source={require('../assets/qr.jpeg')} style={{ height: 250, width: 250, alignSelf: 'center', marginTop: 50 }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})