import { Text, View, Pressable, StyleSheet, Image, Dimensions, ScrollView, Modal } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntDesign from "react-native-vector-icons/AntDesign"
import CustomResponsiveTable from '../component/CustomResponsiveTable';
import { connect } from 'react-redux';
interface props {

}

interface states {

    tableHead: string[];
    tableData: string[];
    sortDate: Date;
    selectedGame: string;
    month: string;
    year: string;
    months: string[];
    years: string[];
    modalMonth: boolean;
    modalYear: boolean;
    monthName: string;
}

class Result extends Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            tableHead: [],
            tableData: [],
            sortDate: new Date(),
            selectedGame: '',
            month: '',
            year: '2023',
            months: [
                {
                    id: "01",
                    name: "January",
                },
                {
                    id: "02",
                    name: "February",
                },
                {
                    id: "03",
                    name: "March",
                },
                {
                    id: "04",
                    name: "April",
                },
                {
                    id: "05",
                    name: "May",
                },
                {
                    id: "06",
                    name: "June",
                },
                {
                    id: "07",
                    name: "July",
                },
                {
                    id: "08",
                    name: "August",
                },
                {
                    id: "09",
                    name: "September",
                },
                {
                    id: "10",
                    name: "October",
                },
                {
                    id: "11",
                    name: "November",
                },
                {
                    id: "12",
                    name: "December",
                },
            ],
            years: [
                "1975",
                "1976",
                "1977",
                "1978",
                "1979",
                "1980",
                "1981",
                "1982",
                "1983",
                "1984",
                "1985",
                "1986",
                "1987",
                "1988",
                "1989",
                "1990",
                "1991",
                "1992",
                "1993",
                "1994",
                "1995",
                "1996",
                "1997",
                "1998",
                "1999",
                "2000",
                "2001",
                "2002",
                "2003",
                "2004",
                "2005",
                "2006",
                "2007",
                "2008",
                "2009",
                "2010",
                "2011",
                "2012",
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
            ],
            modalMonth: false,
            modalYear: false,
            monthName: ''
        };
    }
    componentDidMount(): void {
        this.allGames();
        this.allDatas();
        this.setCurrentMonth()
    }

    allGames = () => {
        fetch(this.props.host + 'get-all-games').then((response) => response.json()).then((responseJson) => {
            if (responseJson.status === 1) {
                let modifiedAllGames = [];
                modifiedAllGames.push("date");
                responseJson.data.map((item, index) => {
                    modifiedAllGames.push(item.name);
                });
                this.setState({ tableHead: modifiedAllGames });
            }
        })
    }

    allDatas = () => {
        fetch(this.props.host + 'get-my-game-history').then((response) => response.json()).then((responseJson) => {
            if (responseJson.status === 1) {
                let modifiedAllGames = [];
                for (let i = 0; i < responseJson.data.length; i += 2) {
                    const date = responseJson.data[i];
                    const games = responseJson.data[i + 1];
                    const gameNames = games.map(item => item.result);

                    modifiedAllGames.push([date, ...gameNames]);
                }

                this.setState({ tableData: modifiedAllGames });
            }
        })
    }

    setCurrentMonth = () => {
        const currentDate = new Date();
        const monthIndex = currentDate.getMonth();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthName = monthNames[monthIndex];
        let modifiedValue = '';
        if (monthIndex < 10) {
            modifiedValue = '0' + monthIndex.toString();
        } else {
            modifiedValue = monthIndex.toString();
        }
        this.setState({ month: modifiedValue, monthName: currentMonthName });
    }

    search = () => {
        this.setState({ tableData: [] });
        fetch(this.props.host + "get-my-game-history?year=" + this.state.year + "&month=" + this.state.month).then((response) => response.json()).then((responseJson) => {
            if (responseJson.status === 1) {
                let modifiedAllGames = [];
                for (let i = 0; i < responseJson.data.length; i += 2) {
                    const date = responseJson.data[i];
                    const games = responseJson.data[i + 1];
                    const gameNames = games.map(item => item.result);

                    modifiedAllGames.push([date, ...gameNames]);
                }

                this.setState({ tableData: modifiedAllGames });
            }
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
                <StackHeader title='Result History' navigation={this.props.navigation} />
                <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height + 100, top: 0, left: 0, opacity: 0.2 }} />
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <Pressable onPress={() => {
                        this.setState({ modalYear: true });
                    }} style={{ padding: 10, backgroundColor: '#ccc', width: 100, borderRadius: 5, marginRight: 10 }}><Text>{this.state.year}</Text></Pressable>
                    <Pressable onPress={() => {
                        this.setState({ modalMonth: true });
                        // this.showDatePicker();
                    }} style={{ padding: 10, backgroundColor: '#ccc', width: 100, borderRadius: 5, marginRight: 10 }}><Text>{this.state.monthName}</Text></Pressable>
                    <Pressable onPress={() => {
                        this.search();
                    }} style={{ padding: 10, backgroundColor: 'blue', width: 40, borderRadius: 5, marginRight: 10 }}><AntDesign name="search1" color="white" size={20} /></Pressable>

                </View>
                <ScrollView style={{ margin: 20 }}>
                    {this.state.tableData.length > 0 ? <CustomResponsiveTable tableHead={this.state.tableHead} tableData={this.state.tableData} /> : null}

                </ScrollView>
                <Modal animationType="slide" onRequestClose={() => {
                    this.setState({ modalYear: false });
                }} visible={this.state.modalYear}>
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>Select Year</Text>
                        {this.state.years.map((item, index) => (<Pressable onPress={() => { this.setState({ year: item, modalYear: false }) }} style={{ width: '95%', margin: 10, backgroundColor: '#fff', elevation: 10, padding: 10, borderRadius: 5 }}><Text key={index}>{item}</Text></Pressable>))}

                    </ScrollView>
                </Modal>
                <Modal animationType="slide" onRequestClose={() => {
                    this.setState({ modalMonth: false });
                }} visible={this.state.modalMonth}>
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>Select Month</Text>
                        {this.state.months.map((item, index) => (<Pressable onPress={() => { this.setState({ month: item.id, monthName: item.name, modalMonth: false }) }} style={{ width: '95%', margin: 10, backgroundColor: '#fff', elevation: 10, padding: 10, borderRadius: 5 }}><Text key={index}>{item.name}</Text></Pressable>))}

                    </ScrollView>
                </Modal>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAccessToken: (value) => { dispatch({ type: 'CHANGE_TOKEN', token: value }) },
        changeLogged: (value) => { dispatch({ type: 'LOGIN', logged: value }) },
        changeUser: (value) => { dispatch({ type: 'CHANGE_USER', user: value }) },
        changeLoader: (value) => { dispatch({ type: 'CHANGE_LOADER', loader: value }) },
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
export default connect(mapStateToProps, mapDispatchToProps)(Result);



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