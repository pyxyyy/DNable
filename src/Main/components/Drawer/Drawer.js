import React from 'react'
import {ScrollView, TouchableOpacity, Text, View, Image} from 'react-native'
import styles from './DrawerStyle'

export default class Drawer extends React.Component{
  render(){
    return(
      <ScrollView style={styles.background} contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.login}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HomeNav')}>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Progress')}>
          <Text style={styles.text}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Recommendation')}>
          <Text style={styles.text}>Recommendations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Achievement')}>
          <Text style={styles.text}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Community')}>
          <Text style={styles.text}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Setting')}>
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}