import React from 'react';
import {Image, View} from "react-native";

export default class MapScreen extends React.Component{
  render(){
    return(
        <View>
          <Image style={{width: '100%', height: '100%'}} source={require('./recc.png')} resizeMode="cover"/>
        </View>
      )

  }
}