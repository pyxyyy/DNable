import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

/**
 * @param onPress: () => void
 * @param color: string
 * */
export default class CrossButton extends React.Component {
  render() {
    return(
        <TouchableOpacity style={styles.container}>
          <Icon name="cross" size={30} color="white" onPress={this.props.onPress} />
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B472',
    justifyContent: 'center',
    alignItems: 'center'
  }
})