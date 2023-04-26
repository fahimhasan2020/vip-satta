import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable } from 'react-native';
import Head from "../component/Head"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Table, Row, Rows } from 'react-native-table-component';

interface HomeProps {

}

interface HomeState {
  message: string;
  tableHead: string[];
  tableData: string[];
}

class Wallet extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      message: '',
      tableHead: ['Date', 'Description', 'Amount'],
      tableData: [
        ['1/8/23', 'Diposit', '30'],
        ['1/8/23', 'Diposit', '600'],
        ['1/8/23', 'Diposit', '1000'],
        ['1/8/23', 'Withdrow', '500']
      ]
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
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>username</Text>
          <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>Rs.0</Text>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Wallet Balance</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Pressable style={styles.buttonOutlinedLeft}><AntDesign name="plus" size={15} color="white" /><Text style={styles.buttonText}>ADD MONEY</Text></Pressable>
            <Pressable style={styles.buttonOutlinedRight}><AntDesign name="plus" size={15} color="white" /><Text style={styles.buttonText}>ADD MONEY</Text></Pressable>
          </View>
        </View>
        <Text style={{ color: '#09a3e6', alignSelf: 'center', fontSize: 16}}>Statement</Text>
        <View style={{margin:20}}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={this.state.tableData} textStyle={styles.text} />
        </Table>
        </View>
      </ScrollView>
    );
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

export default Wallet;
