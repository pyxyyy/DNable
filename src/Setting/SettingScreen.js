import React from 'react';
import {View, Text, WebView} from 'react-native';
import {observer, inject} from 'mobx-react';

@observer
export default class SettingScreen extends React.Component{

  render() {
    return(
        <WebView
          source={{uri: 'https://github.com/facebook/react-native'}}
          style={{marginTop: 20}}
        />
    );
  }
}