import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {observer, inject} from 'mobx-react';
import Voice from 'react-native-voice';
import styles from './HomeStyle'

@inject("homeState")
@observer
export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.background}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}/>
          <TouchableOpacity style={styles.button}/>
        </View>
      </View>
    );
  }
}