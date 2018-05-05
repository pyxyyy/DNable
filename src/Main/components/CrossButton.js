import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

/**
 * @param onPress: () => void
 * @param color: string
 * */
export default class CrossButton extends React.Component {
  render() {
    return(
        <TouchableOpacity>
          <Icon name="cross" size={40} color={this.props.color} onPress={this.props.onPress} />
        </TouchableOpacity>
    )
  }
}