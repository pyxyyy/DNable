import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {observer, inject} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon name="camera" size={28} color="#10B472"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="microphone" size={30} color="#10B472"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}