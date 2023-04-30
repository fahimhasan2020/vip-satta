import { Text, View, Pressable, StyleSheet,Dimensions } from 'react-native'
import React, { Component } from 'react'
import StackHeader from '../component/StackHeader'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import CustomTable from '../component/CustomTable';
import YouTube from 'react-native-youtube';
interface props {

}

interface states {

  tableHead: string[];
  tableData: string[];
  sortDate: Date;
  selectedGame: string;
  isReady:boolean;
}

export default class HowToPlay extends Component<props, states> {
  constructor(props: props) {
    super(props);
    this.state = {
      tableHead: ['Date', 'Ref PlayGame', 'Commision'],
      tableData: [

      ],
      sortDate: new Date(),
      selectedGame: '',
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      playerWidth: Dimensions.get('window').width,
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
        <StackHeader title='How to play' navigation={this.props.navigation} />
        <View style={{ margin: 20 }}>
        <YouTube
          videoId="KVZ-P-ZI6W4"
          apiKey="650057854720-l1et9ja2184fr7otm4pnu8bqsv41mgcb.apps.googleusercontent.com"
          play // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: 300 }}
      />
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