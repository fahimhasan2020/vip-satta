import { Text, View, Pressable, StyleSheet, Dimensions, Image, Modal } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntDesign from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import CustomTable from '../component/CustomTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface props {

}

interface states {
    tableHead: string[];
    tableData: string[];
    sortDate: Date;
    selectedGame: string;
    selectedGameLabel: string;
    allGames: string[];
    gamesModal: boolean;
}

class GamesHistory extends Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            tableHead: ['Game', 'AH', 'BH', 'NO', 'Amt', 'Win Amt'],
            tableData: [

            ],
            sortDate: new Date(),
            selectedGame: '1',
            allGames: [],
            selectedGameLabel: '',
            gamesModal: false
        };
    }

    pickerControl = (value: string) => {
        if (value === 'close') {
            this.setState({ gamesModal: false });
        } else {
            this.setState({ gamesModal: true });
        }
    }

    componentDidMount = async () => {


        fetch(this.props.host + 'get-all-games').then((response) => response.json()).then((responseJson) => {
            if (responseJson.status === 1) {
                this.setState({ allGames: responseJson.data });
            }
        }).catch((error) => console.log(error));
    }

    search = async () => {
        const formattedDate = new Date(this.state.sortDate).toISOString().slice(0, 10);
        console.log('date is:', formattedDate, 'game is:', this.state.selectedGame);
        const token = await AsyncStorage.getItem("token");
        fetch(this.props.host + 'get-result-history?filter_date=' + formattedDate + '&filter_game=' + this.state.selectedGame, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Access-Token": token
            }
        }).then((response) => response.json()).then((responseJson) => {
            let formattedResponse = [];

            for (let i = 0; i < responseJson.data.length; i++) {
                let row = [];
                let data = responseJson.data[i];

                row.push(data['game_name']);

                if (data['type'] === 'number') {
                    row.push('');
                    row.push('');
                    row.push(data['bid_amount']);
                } else if (data['type'] === 'andar') {
                    row.push(data['bid_amount']);
                    row.push('');
                    row.push('');
                } else if (data['type'] === 'bahar') {
                    row.push('');
                    row.push(data['bid_amount']);
                    row.push('');
                }
                row.push(data['bid_amount']);
                row.push(data['winning_amount']);

                formattedResponse.push(row);
            }

            console.log(formattedResponse);
            this.setState({ tableData: formattedResponse });
        }).catch((error) => {
            console.log(error);
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
                <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height + 100, top: 0, left: 0, opacity: 0.2 }} />
                <StackHeader title='Games History' navigation={this.props.navigation} />
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <Pressable onPress={() => {
                        this.showDatePicker();
                    }} style={{ padding: 10, backgroundColor: 'blueviolet', width: 100, borderRadius: 5, marginRight: 10 }}><Text style={{ color: '#fff' }}>{this.state.sortDate.toLocaleDateString()}</Text></Pressable>
                    <Pressable onPress={() => {
                        this.pickerControl('open');
                        //this.showDatePicker();
                    }} style={{ padding: 10, backgroundColor: 'blueviolet', width: 100, borderRadius: 5, marginRight: 10 }}>
                        {this.state.selectedGameLabel !== '' ? <Text style={{ color: '#fff' }}>{this.state.selectedGameLabel}</Text> : <Text style={{ color: '#fff' }}>Select games</Text>}
                    </Pressable>
                    <Pressable onPress={() => {
                        this.search();
                    }} style={{ padding: 10, backgroundColor: 'blueviolet', width: 40, borderRadius: 5, marginRight: 10 }}><AntDesign name="search1" color="white" size={20} /></Pressable>

                </View>

                <View style={{ margin: 20 }}>

                    <CustomTable tableHead={this.state.tableHead} tableData={this.state.tableData} />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.gamesModal}
                    onRequestClose={() => {
                        this.setState({ gamesModal: false });
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {this.state.allGames.length > 0 ? this.state.allGames.map((item, index) => (
                                <Pressable
                                    style={{
                                        width: 250, padding: 20,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        backgroundColor: 'blueviolet',
                                        marginBottom: 5
                                    }}
                                    key={index}
                                    onPress={() => {
                                        this.setState({ gamesModal: false });
                                        this.setState({ selectedGame: item.id, selectedGameLabel: item.name });
                                    }}
                                >
                                    <Text style={{ color: '#fff' }}>{item.name}</Text>
                                </Pressable>
                            )) : null}


                        </View>
                    </View>
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
    text: { margin: 6, alignSelf: 'center' },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 7,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});