

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Index from './src/navigation/Index'
import store from "./src/store/store";
import { enableFreeze } from 'react-native-screens';

export default class App extends Component {
  componentDidMount(): void {
    enableFreeze();
  }
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}