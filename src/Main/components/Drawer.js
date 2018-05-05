import React from 'react'
import {ScrollView, Button} from 'react-native'

export default class Drawer extends React.Component{
  render(){
    return(
      <ScrollView>
        <Button title="Home" onPress={() => this.props.navigation.navigate("TabNav")} />
        <Button title="Setting" onPress={() => this.props.navigation.navigate("Setting")} />
      </ScrollView>
    )
  }
}