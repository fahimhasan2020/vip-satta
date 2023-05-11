import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import {connect} from "react-redux"
import CustomTable from '../component/CustomTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface props {

}

interface states {
    tableHead: string[];
    tableData: string[];
    sortDate: Date;
    selectedGame: string;
}

class GamesHistory extends Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            tableHead: ['Game', 'AH', 'BH', 'NO', 'Amt', 'WinAmt'],
            tableData: [

            ],
            sortDate: new Date(),
            selectedGame: '',
        };
    }

    componentDidMount =async()=> {
        const token =await  AsyncStorage.getItem("token");
        fetch(this.props.host+'get-my-game-history',{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
                "Access-Token":token
            }
        }).then((response)=>response.json()).then((responseJson)=>{
            console.log(responseJson);
        })
    }

    showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: this.state.sortDate,
            onChange: (event, selectedDate) => {
                const currentDate = selectedDate;
                this.setState({ sortDate: selectedDate });
            },
            mode: 'date',
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StackHeader title='Games History' navigation={this.props.navigation} />
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <Pressable onPress={() => {
                        this.showDatePicker();
                    }} style={{ padding: 10, backgroundColor: '#ccc', width: 100, borderRadius: 5, marginRight: 10 }}><Text>{this.state.sortDate.toLocaleDateString()}</Text></Pressable>
                    <Pressable onPress={() => {
                        this.showDatePicker();
                    }} style={{ padding: 10, backgroundColor: '#ccc', width: 100, borderRadius: 5, marginRight: 10 }}><Text>Select Game</Text></Pressable>
                    <Pressable onPress={() => {
                        this.showDatePicker();
                    }} style={{ padding: 10, backgroundColor: 'blue', width: 40, borderRadius: 5, marginRight: 10 }}><AntDesign name="search1" color="white" size={20} /></Pressable>

                </View>
                <View style={{ margin: 20 }}>
                <CustomTable tableHead={this.state.tableHead} tableData={this.state.tableData} />
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
      user: state.auth.user
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(GamesHistory);


const styles = StyleSheet.create({
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        weight: 'bold',
        marginLeft: 5
    },
    buttonOutlinedLeft: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    buttonOutlinedRight: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'white',
        paddingBottom: 1500,
    },
    addMoneyContainer: {
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7e07a6',
        borderRadius: 10,
        elevation: 10,
        height: 250
    },
    regularFonts: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10
    },
    regularFontsDark: {
        color: '#5f5461',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    todaysGames: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#7e07a6',
        letterSpacing: 1,
        marginBottom: 20
    },
    head: { height: 40, backgroundColor: '#c5d8e0', textAlign: 'center' },
    text: { margin: 6, alignSelf: 'center' }
});