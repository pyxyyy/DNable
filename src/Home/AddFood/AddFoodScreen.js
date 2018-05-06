import React from 'react';
import { View, Image } from 'react-native';
import styles from './AddFoodStyle';
import Header from '../../Main/components/Header'

export default class AddFoodScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const path = this.props.navigation.getParam("uri", "none");
    console.log(path);
    return(
      <View style={styles.background}>
        <Header onBack={() => this.props.navigation.popToTop()} title="Add Food"/>
        <Image style={{width: 300, height: 300}} source={{uri: path}}/>
      </View>
    )
  }
}