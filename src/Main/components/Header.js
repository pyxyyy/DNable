import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

/**
 * @param title: string
 * @param onBack: () => void
 */
export default class Header extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContent} onPress={this.props.onBack}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#10B472'
  },

  buttonContent: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
})