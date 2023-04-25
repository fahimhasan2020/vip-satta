import {Component} from "react"
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Pressable} from "react-native"
import Feather from "react-native-vector-icons/Feather"

const {height,width} = Dimensions.get("window");
class Head extends Component{
    render(){
        return(<View style={styles.container}>
            <Pressable ><Feather name="align-left" size={30} color="#7e07a6" /></Pressable>
            <Image source={require('../assets/logo.png')} style={{height:30,width:30}} />
            <Pressable style={{backgroundColor:'#7e07a6',padding:6,borderRadius:3}}><Text style={{color:'#ffffff'}}>QR Code</Text></Pressable>
            </View>)
    }
}

const styles = StyleSheet.create({
    container:{
    marginTop:StatusBar.currentHeight,
    width:width,
    padding:10,
    backgroundColor:'white',
    height:60,
    elevation:10,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
    }
})

export default Head;