import { COLOR, ThemeProvider } from 'react-native-material-ui';
import React, { Component } from 'react';
import Main from './Components/Main.js'

const uiTheme = {
  palette: {
      primaryColor: COLOR.green500,
  }
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Main />
      </ThemeProvider>
    )
  }
}