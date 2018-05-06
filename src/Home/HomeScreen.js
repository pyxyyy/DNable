import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {observer, inject} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HomeStyle';
import BarChart from '../Main/components/BarChart'

@inject("homeState")
@observer
export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const data = [ 50, 40, 95, 85, 91, 35, 53 ];
    return(
      <View style={styles.background}>
        <ScrollView style={styles.container} contentContainerStyle={styles.body}>
          <View style={styles.header}>
            <Text style={styles.text}>Hooray! Your blood sugar level has been consistently low recently. Keep up the good work!</Text>
          </View>
          <View style={{width: '100%', marginTop: 20}}>
            <BarChart data={data} height={200} title="Your Blood Sugar Level"/>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon name="camera" size={28} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Voice')}>
            <Icon name="microphone" size={30} color="white"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}