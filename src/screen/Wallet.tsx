import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable, Linking, Modal, Dimensions, Platform, ToastAndroid, TextInput, Image } from 'react-native';
import Head from "../component/Head"
import AntDesign from "react-native-vector-icons/AntDesign"
import CustomDepositTable from '../component/CustomDepositTable';
import { connect } from "react-redux"

const uriString2 = 'upi://pay?pa=upi@id&am=100';
import { Picker } from '@react-native-picker/picker';
import { hide } from "react-native-bootsplash"
import Hr from '../component/Hr';


interface WalletProps {

}

interface WalletState {
  tableHead: string[];
  tableData: string[];
  
  addMoney: boolean;
  withdrowMoney: boolean;
  amount: string;
  wamount: string;
  platforms: string;
  account: string;
  history: string[];
}

class Wallet extends Component<WalletProps, WalletState> {
  constructor(props: WalletProps) {
    super(props);
    this.state = {
      withdrowMoney: false,
      account: '',
      tableHead: ['DATE', 'DESCRIPTION', 'AMOUNT'],
      platforms: 'paytm',
      tableData: [],
      addMoney: false,
      amount: '',
      wamount: '',
      history: []
    };

  }

  convertDate = (date: number) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  onScreenFocus = () => {
    this.geBlogData();
    this.refreshRedux();
  }

  refreshRedux = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(this.props.host + 'get-user-details', {
      method: 'GET',
      headers: {
        "Access-Token": token
      }
    }).then((response) => response.json()).then(async (responseJson) => {
      console.log(responseJson);
      this.props.changeUser(responseJson.data);
    }).catch(error => {
      ToastAndroid.show("Unable to connect to internet", ToastAndroid.SHORT);
    });
  }

  handleModalClose = () => {
    this.setState({ singlePost: false });
  }

  geBlogData = async () => {
    this.props.changeLoader(true);
    this.setState({ history: [], tableData: [] });
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
        console.log('data transection', responseJson.data)
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
  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', this.onScreenFocus);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  openUpi = async () => {
    this.setState({ addMoney: true });
  }
  requestAmount = async () => {
    const uriString = 'upi://pay?pa='+this.props.preference.data[4].upi_id+'&pn=vipsatta&cu=INR&am='+this.state.amount;
    const uri = encodeURI(uriString);

    if (parseInt(this.state.amount) < 50) {
      ToastAndroid.show("You cannot request below 50 rupees", ToastAndroid.SHORT);
    } else {
      if (Platform.OS === 'android') {
        Linking.canOpenURL(uri).then(async (supported) => {
          if (!supported) {
            console.log(supported);
            ToastAndroid.show("UPI payment apps are not available on this device", ToastAndroid.SHORT);
          } else {
            ToastAndroid.show("Processing", ToastAndroid.SHORT);
            Linking.openURL(uri);
            const token = await AsyncStorage.getItem("token");
            fetch(this.props.host + 'add-money-request', {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Access-Token": token
              },
              body: JSON.stringify({ amount: this.state.amount })
            }).then((response) => response.json()).then((responseJson) => {
              //ToastAndroid.show(responseJson.data, ToastAndroid.SHORT);
            });
          }
        });
      } else {
        Linking.openURL(uri);
      }
    }
  }


  requestWithdrowAmount = async () => {
    console.log('Initiated');
    const token = await AsyncStorage.getItem("token");
    fetch(this.props.host + 'withdraw-request', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Access-Token": token
      },
      body: JSON.stringify({ amount: this.state.wamount, payment_method: this.state.platforms, pay_account: this.state.account })
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
      ToastAndroid.show("Withdrow completed. Wait for approval", ToastAndroid.SHORT);
    }).catch((error) => {
      ToastAndroid.show("Failed to withdrow", ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#7e07a6'} />
        <Head navigation={this.props.navigation} />
        <Image source={require('../assets/bg.png')} style={{ position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("screen").height + 100, top: 0, left: 0, opacity: 0.2 }} />
        <View style={styles.addMoneyContainer}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>{this.props.user !== null ? this.props.user.first_name + ' ' + this.props.user.last_name : ''}</Text>
          <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>Rs.{this.props.user !== null ? Math.ceil(this.props.user.balance).toLocaleString('en-US') : ''}</Text>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Wallet Balance</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Pressable onPress={async () => { await this.openUpi(); hide() }} style={styles.buttonOutlinedLeft}><AntDesign name="plus" size={10} color="white" /><Text style={styles.buttonText}>ADD MONEY</Text></Pressable>
            <Pressable onPress={async () => { await this.setState({ withdrowMoney: true }); hide() }} style={styles.buttonOutlinedRight}><AntDesign name="minus" size={10} color="white" /><Text style={styles.buttonText}>WITHDRAW MONEY</Text></Pressable>
          </View>
        </View>
        <Text style={{ color: '#09a3e6', alignSelf: 'center', fontSize: 16 }}>Statement</Text>
        <View style={{ margin: 20 }}>
          <CustomDepositTable tableHead={this.state.tableHead} tableData={this.state.tableData} />
        </View>
        {/* Modal start */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addMoney}
          onRequestClose={() => {
            this.setState({ addMoney: false });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Money</Text>
              <Hr />
              <Text style={{ fontSize: 15, color: '#adadad', marginBottom: 5 }}>Enter Amount</Text>
              <TextInput value={this.state.amount} keyboardType='numeric' onChangeText={(value) => this.setState({ amount: value })} placeholder='Enter Amount' style={styles.amounts} />
              <Text style={{ fontSize: 10, color: '#adadad', marginBottom: 30 }}>Minimum amount is Rs.50 and Maximum amount is Rs.10000</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setState({ addMoney: false });
                  this.requestAmount()
                }}>
                <Text style={styles.textStyle}>ADD MONEY</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.withdrowMoney}
          onRequestClose={() => {
            this.setState({ withdrowMoney: false });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>WITHDRAW Money</Text>
              <Hr />
              <Text style={{ fontSize: 15, color: '#adadad', marginBottom: 5 }}>Enter Amount</Text>
              <TextInput value={this.state.wamount} keyboardType='numeric' onChangeText={(value) => this.setState({ wamount: value })} placeholder='Enter Amount' style={styles.amounts} />
              <Text style={{ fontSize: 10, color: '#adadad', marginBottom: 10 }}>Minimum amount is Rs.50 and Maximum amount is Rs.10000</Text>
              <Text style={{ fontSize: 15, color: '#adadad', marginBottom: 5 }}>PAYMET MODE </Text>
              <Picker
                selectedValue={this.state.platforms}
                style={{
                  borderWidth: 2,
                  borderColor: '#000',
                  backgroundColor: '#e8ebe9',
                  borderRadius: 15,
                  elevation: 5,
                  marginBottom: 20
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ platforms: itemValue })
                }>
                <Picker.Item label="PAYTM" value="paytm" />
                <Picker.Item label="GOOGLE PAY" value="googlepay" />
                <Picker.Item label="PHONE PAY" value="phonepay" />
              </Picker>
              <Text style={{ fontSize: 15, color: '#adadad', marginBottom: 5 }}>Enter Account Number</Text>
              <TextInput value={this.state.account} keyboardType='numeric' onChangeText={(value) => this.setState({ account: value })} placeholder='Enter Account Number' style={styles.amounts} />
              <Pressable
                style={[styles.buttons, styles.buttonClose]}
                onPress={() => {
                  this.setState({ withdrowMoney: false });
                  this.requestWithdrowAmount();
                }}>
                <Text style={styles.textStyle}>WITHDRAW MONEY</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Modal end */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  amounts: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000'
  },
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
    paddingBottom: 300,
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
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
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
    borderRadius: 5,
    padding: 10,
    width: 100,
    elevation: 2,
  },
  buttons: {
    borderRadius: 5,
    padding: 10,
    width: 150,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#01c652',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.3
  },
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
    user: state.auth.user,
    preference: state.auth.preference,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
