import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import CustomResponsiveTable from '../component/CustomResponsiveTable';
interface props {

}

interface states {

    tableHead: string[];
    tableData: string[];
    sortDate: Date;
    selectedGame: string;
}

export default class Result extends Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            tableHead: ['DATE', 'GALI', 'GHAZIABAD', 'FARIDABAD', 'DELHI BAZAR', 'SHRI GANESH','CIO GOLD','VIP DIAMOND','TAJ','DISHAWAR'],
            tableData: [
              ["4/27/2023", "20", "30","40","50","60","70","80","90","100"],
              ["4/27/2023", "20", "30","40","50","60","70","80","90","100"],
              ["4/27/2023", "20", "30","40","50","60","70","80","90","100"],
              ["4/27/2023", "20", "30","40","50","60","70","80","90","100"],
              ["4/27/2023", "20", "30","40","50","60","70","80","90","100"],
              ["4/27/2023", "20", "30","40","50","60","70","80","90","100"],
            ],
            sortDate: new Date(),
            selectedGame: '',
        };
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
                <StackHeader title='Result History' navigation={this.props.navigation} />
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
                <CustomResponsiveTable tableHead={this.state.tableHead} tableData={this.state.tableData} />
                </View>
            </View>
        )
    }
}


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