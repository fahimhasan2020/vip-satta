import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Lottie from 'lottie-react-native';

export default class Loader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Lottie source={require('../assets/animation2.json')} autoPlay loop style={{ width: 250, height: 250 }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        zIndex: 100,
        position: 'absolute',
        top: 200,
        left: '9%',
        width: 300,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})