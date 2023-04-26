import { Text, StyleSheet, View,StatusBar,Pressable } from 'react-native'
import React, { Component } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign" 

interface props {
    title:string;
    navigation:any
}

interface state {

}

export default class StackHeader extends Component<props,state> {
  
  render() {
    const {title,navigation} = this.props;
    return (
      <View style={{marginTop:StatusBar.currentHeight}}>
        <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Pressable onPress={()=>{navigation.goBack()}} style={{padding:10,marginLeft:10}}><AntDesign name="arrowleft" size={30} color={'black'} /></Pressable>
            <Text style={{padding:10,fontSize:20}}>{title}</Text>
            <View></View>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({})