import { Component } from "react"
import { View, Text, Image, StatusBar, StyleSheet, Dimensions, Pressable } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

interface props {
    navigation: any;
}

interface state {

}

const { height, width } = Dimensions.get("window");
class Head extends Component<props, state>{
    render() {
        const { navigation } = this.props;
        return (<View style={styles.container}>
            <Pressable onPress={() => { navigation.toggleDrawer(); }} ><Feather name="align-left" size={30} color="#7e07a6" /></Pressable>
            <Image source={require('../assets/logo.png')} style={{ height: 30, width: 30 }} />
            <Pressable onPress={() => { navigation.navigate("Support") }} style={{ backgroundColor: '#7e07a6', padding: 6, borderRadius: 6 }}>
                <MaterialIcons name="support-agent" size={20} color={'#ffffff'} />
            </Pressable>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        padding: 10,
        backgroundColor: 'white',
        height: 60,
        elevation: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 10
    }
})

export default Head;