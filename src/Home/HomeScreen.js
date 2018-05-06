import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {observer, inject} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HomeStyle';
import { BarChart, Grid } from 'react-native-svg-charts';

@inject("homeState")
@observer
export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const fill = 'rgb(134, 65, 244)'
    return(
      <View style={styles.background}>
        <ScrollView style={styles.container} contentContainerStyle={styles.body}>
          <View style={styles.header}>
            <Text style={styles.text}>Hooray! Your blood sugar level has been consistently low recently. Keep up the good work!</Text>
          </View>

          <View>
            <BarChart
              style={{ height: 200, width: '100%' }}
              data={ [70, 80, 77, 60, 66, 90] }
              svg={{fill}}
              contentInset={{ top: 30, bottom: 30 }}
            >
              <Grid/>
            </BarChart>
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