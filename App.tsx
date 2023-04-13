import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {PrimaryInput} from "./src/component/Inputs"

interface AppProps {
  username: string;
  data:String;
  item:String;
}

interface AppState {
  message: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      message: '',
      data:'',
    };
    this.setData = this.setData.bind(this);
  }

  componentDidMount =()=> {
    
  }

  setData(data: string) {
    this.setState({ data });
  }

  render() {
    return (
      <View style={styles.container}>
        <PrimaryInput data={this.state.data} width={86} setData={this.setData} background={'red'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
});

export default App;
