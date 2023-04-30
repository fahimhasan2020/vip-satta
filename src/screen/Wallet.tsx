import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable } from 'react-native';
import Head from "../component/Head"
import AntDesign from "react-native-vector-icons/AntDesign"
import CustomTable from '../component/CustomTable';
import { connect } from "react-redux"

interface WalletProps {

}

interface WalletState {
  tableHead: string[];
  tableData: string[];
}

class Wallet extends Component<WalletProps, WalletState> {
  constructor(props: WalletProps) {
    super(props);
    this.state = {
      tableHead: ['DATE', 'DESCRIPTION', 'AMOUNT'],
      tableData: [
        ["4/27/2023", "Deposit", "500"],
        ["4/15/2023", "Deposit", "500"],
        ["4/13/2023", "Deposit", "500"],
        ["4/9/2023", "Withdrow", "500"],
        ["4/9/2023", "Withdrow", "500"],
        ["4/9/2023", "Withdrow", "500"],
        ["4/9/2023", "Withdrow", "500"],
        ["4/9/2023", "Withdrow", "500"],
        ["4/9/2023", "Withdrow", "500"],
        ["4/9/2023", "Withdrow", "500"],
      ],
    };
  }

  componentDidMount = () => {


  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Head navigation={this.props.navigation} />

        <View style={styles.addMoneyContainer}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>{this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}</Text>
          <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>Rs.{this.props.user !== null ? this.props.user.balance : ''}</Text>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Wallet Balance</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Pressable onPress={() => { }} style={styles.buttonOutlinedLeft}><AntDesign name="plus" size={10} color="white" /><Text style={styles.buttonText}>ADD MONEY</Text></Pressable>
            <Pressable onPress={() => { }} style={styles.buttonOutlinedRight}><AntDesign name="minus" size={10} color="white" /><Text style={styles.buttonText}>WITHDROW MONEY</Text></Pressable>
          </View>
        </View>
        <Text style={{ color: '#09a3e6', alignSelf: 'center', fontSize: 16 }}>Statement</Text>
        <View style={{ margin: 20 }}>
          <CustomTable tableHead={this.state.tableHead} tableData={this.state.tableData} />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 5
  },
  buttonOutlinedLeft: {
    padding: 10,
    borderWidth: 2,
    width: 140,
    borderColor: 'white',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  buttonOutlinedRight: {
    padding: 10,
    width: 140,
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
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
