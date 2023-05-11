import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, StatusBar, Pressable, TextInput, Dimensions, ScrollView, Modal, ToastAndroid } from 'react-native';
import StackHeader from '../component/StackHeader';
import { connect } from "react-redux"
import Hr from '../component/Hr';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface GamesSingleProps {
}

interface GamesSingleState {
  message: string;
  condition: Number;
  odds: Number;
  data1: string;
  inputData: string[],
  inputDataA: string[],
  inputDataB: string[],
  confirmOpen: boolean
}

class GamesSingle extends Component<GamesSingleProps, GamesSingleState> {
  constructor(props: GamesSingleProps) {
    super(props);
    this.state = {
      message: '',
      condition: 0,
      odds: 0,
      data1: '',
      inputData: Array(100).fill(''),
      inputDataA: Array(10).fill(''),
      inputDataB: Array(10).fill(''),
      confirmOpen: false
    };
  }

  componentDidMount = () => {
    const sum = this.state.inputData.reduce((acc, val) => {
      return acc + (val ? parseInt(val) : 0);
    }, 0);
    this.setState({ odds: sum });
  }

  handlePlay = () => {

    this.setState({ confirmOpen: true });
  }

  handleConfirm = async () => {
    if (parseInt(this.props.user.balance) < this.state.odds) {
      ToastAndroid.show("Insufficient balance", ToastAndroid.SHORT);
    } else {

      const token = await AsyncStorage.getItem("token");
      const today = new Date();
      console.log(today.toLocaleDateString());
      this.state.inputData.map((sata, i) => {
        if (sata !== '') {
          fetch(this.props.host + 'play-game', {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Token": token
            },
            body: JSON.stringify({
              "type": ['number'],
              date: today.toLocaleDateString(),
              game_id: this.props.route.params.id,
              "digit": [i + 1],
              "amount": [sata]
            })
          }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
          }).catch((error) => {
            console.log(error)
          })
        }
      })
      this.state.inputDataA.map((sata, i) => {
        if (sata !== '') {
          fetch(this.props.host + 'play-game', {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Token": token
            },
            body: JSON.stringify({
              "type": ['andar'],
              date: today.toLocaleDateString(),
              game_id: this.props.route.params.id,
              "digit": [i + 1],
              "amount": [sata]
            })
          }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
          }).catch((error) => {
            console.log(error)
          })
        }
      })
      this.state.inputDataB.map((sata, i) => {
        if (sata !== '') {
          fetch(this.props.host + 'play-game', {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Access-Token": token
            },
            body: JSON.stringify({
              "type": ['bahar'],
              date: today.toLocaleDateString(),
              game_id: this.props.route.params.id,
              "digit": [i + 1],
              "amount": [sata]
            })
          }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
          }).catch((error) => {
            console.log(error)
          })
        }
      })
      ToastAndroid.show("SATTA has been placed", ToastAndroid.SHORT);
      setTimeout(() => {
        fetch(this.props.host + 'get-user-details', {
          method: 'GET',
          headers: {
            "Access-Token": token
          }
        }).then((response) => response.json()).then(async (responseJson) => {
          console.log(responseJson);
          this.props.changeUser(responseJson.data);
          this.props.navigation.navigate("Home");
        }).catch(error => {
          ToastAndroid.show("Unable to connect to internet", ToastAndroid.SHORT);
        });
      }, 3000);

    }

  }

  changePress = (value) => {
    this.setState({ condition: value });
  }

  handleInputChange = (text, index) => {
    const newData = [...this.state.inputData];
    newData[index] = text;
    const sum = this.calculateSum(newData, this.state.inputDataA, this.state.inputDataB);
    this.setState({ inputData: newData, odds: sum });
  }

  handleInputChangeA = (text, index) => {
    const newData = [...this.state.inputDataA];
    newData[index] = text;
    const sum = this.calculateSum(this.state.inputData, newData, this.state.inputDataB);
    this.setState({ inputDataA: newData, odds: sum });
  }

  handleInputChangeB = (text, index) => {
    const newData = [...this.state.inputDataB];
    newData[index] = text;
    const sum = this.calculateSum(this.state.inputData, this.state.inputDataA, newData);
    this.setState({ inputDataB: newData, odds: sum });
  }

  calculateSum = (arr1, arr2, arr3) => {
    const sum1 = arr1.reduce((acc, val) => {
      return acc + (val ? parseInt(val) : 0);
    }, 0);
    const sum2 = arr2.reduce((acc, val) => {
      return acc + (val ? parseInt(val) : 0);
    }, 0);
    const sum3 = arr3.reduce((acc, val) => {
      return acc + (val ? parseInt(val) : 0);
    }, 0);
    return sum1 + sum2 + sum3;
  }

  render() {
    const { params } = this.props.route;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <StackHeader navigation={this.props.navigation} title={params.title} />
        <View style={{ width: '100%', paddingTop: 10, paddingLeft: 10 }}>
          <TouchableHighlight underlayColor="#ff263d" onPress={() => { this.changePress(0) }} style={[styles.navButtons, { backgroundColor: (this.state.condition !== 0 ? '#ff263d' : '#f87583') }]}><Text style={styles.btnText}>JANTRI</Text></TouchableHighlight>
          {/* <TouchableHighlight underlayColor="$ff263d" onPress={() => { this.changePress(1) }} style={[styles.navButtons, { backgroundColor: (this.state.condition !== 1 ? '#ff263d' : '#f87583') }]}><Text style={styles.btnText}>CROSSING</Text></TouchableHighlight>
          <TouchableHighlight underlayColor="#ff263d" onPress={() => { this.changePress(2) }} style={[styles.navButtons, { backgroundColor: (this.state.condition !== 2 ? '#ff263d' : '#f87583') }]}><Text style={styles.btnText}>NO TO NO</Text></TouchableHighlight> */}
        </View>
        <ScrollView contentContainerStyle={styles.scrollItems}>
          <View style={styles.allInputs}>
            {Array(100).fill().map((_, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.textContainerText}>{index + 1}</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.inputContainer}
                  value={this.state.inputData[index]}
                  onChangeText={(text) => this.handleInputChange(text, index)}
                />
              </View>
            ))}
          </View>
          <Text style={{ paddingLeft: 10, color: '#000' }}>Ander Haruf</Text>
          <View style={styles.subData}>
            {Array(10).fill().map((_, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.textContainerText}>{index + 1}</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.inputContainer}
                  value={this.state.inputDataA[index]}
                  onChangeText={(text) => this.handleInputChangeA(text, index)}
                />
              </View>
            ))}
          </View>
          <Text style={{ paddingLeft: 10, color: '#000' }}>Bahar Haruf</Text>
          <View style={styles.subData}>
            {Array(10).fill().map((_, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.textContainerText}>{index + 1}</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.inputContainer}
                  value={this.state.inputDataB[index]}
                  onChangeText={(text) => this.handleInputChangeB(text, index)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.confirmOpen}
          onRequestClose={() => {
            this.setState({ confirmOpen: false });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{params.title}</Text>
              <Hr />
              <Text style={{ fontSize: 20, color: '#adadad', marginBottom: 5 }}>Your Balance is: {this.props.user !== null ? this.props.user.balance : ''}</Text>
              <View style={{ flexDirection: 'row' }}><Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setState({ confirmOpen: false });
                  this.handleConfirm()
                }}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonCloseCancel]}
                  onPress={() => {
                    this.setState({ confirmOpen: false });
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable></View>

            </View>
          </View>
        </Modal>
        <View style={styles.bottomContent}>
          <Text style={styles.paymentText}>₹ {this.state.odds} /-</Text>
          <Pressable onPress={() => {
            this.handlePlay();
          }} style={styles.gameButton}><Text style={styles.gameButtonText}>Play</Text></Pressable>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  allInputs: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollItems: {
    paddingBottom: 200
  },
  textContainer: {
    height: 50,
    width: 33,
    borderWidth: 1,
    borderColor: '#7c8083',
    alignSelf: 'flex-start',
    color: '#000'

  },
  inputContainer: {
    height: 25,
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#7c8083',
    fontSize: 15,
    padding: 0,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000'

  },
  textContainerText: {
    height: 23,
    alignSelf: 'center',
    color: '#000'
  },
  container: {
    flex: 1
  },
  gameButtonText: {
    color: '#fff'
  },
  gameButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue'
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 30,
    zIndex: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120
  },
  paymentText: {
    fontSize: 33,
    color: '#000',
    fontWeight: 'bold'
  },
  btnText: {
    color: '#fff',
    fontSize: 14
  },
  navButtons: {
    padding: 10,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    marginBottom: 10,
    elevation: 10
  },
  subData: {
    width: Dimensions.get("window").width,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
    width: 90,
    elevation: 2,
    marginRight: 10,
    alignItems: 'center'
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
  buttonCloseCancel: {
    backgroundColor: 'red',
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
export default connect(mapStateToProps, mapDispatchToProps)(GamesSingle);
