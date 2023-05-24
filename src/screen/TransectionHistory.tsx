import { Text, View, Pressable, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackHeader from '../component/StackHeader'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import { connect } from "react-redux"
import CustomTable from '../component/CustomTable';
interface props {

}

interface states {

  tableHead: string[];
  tableData: string[];
  sortDate: Date;
  selectedGame: string;
  history: string[];
}

class TransectionHistory extends Component<props, states> {
  constructor(props: props) {
    super(props);
    this.state = {
      tableHead: ['DATE', 'DESCRIPTION', 'AMOUNT'],
      tableData: [

      ],
      sortDate: new Date(),
      selectedGame: '',
      history: []
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

  convertDate = (date: number) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  componentDidMount = async () => {
    this.props.changeLoader(true);
    try {
      const token = await AsyncStorage.getItem("token");
      fetch(this.props.host + 'get-user-balance-history', {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Access-Token": token
        }
      }).then((response) => response.json()).then(async (responseJson) => {
        await this.setState({ history: responseJson.data });
        const newData = this.state.tableData;
        if (this.state.history.length > 0) {
          await this.state.history.map(async (item, index) => {
            await newData.push([this.convertDate(item.created_at), item.descriptions, item.amount]);
          });
          this.setState({ tableData: newData });
        }
        this.props.changeLoader(false);

      });
    } catch (error) {
      console.log(error);
      this.props.changeLoader(false);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StackHeader title='Add / Withdraw History' navigation={this.props.navigation} />
        <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height + 100, top: 0, left: 0, opacity: 0.2 }} />
        <ScrollView  contentContainerStyle={{ margin: 20 }}>
          <CustomTable tableHead={this.state.tableHead} tableData={this.state.tableData} />
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(TransectionHistory);