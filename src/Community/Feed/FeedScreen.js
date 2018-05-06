import React from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import styles from "./FeedStyle";
import {inject, observer} from "mobx-react";
import Icon from 'react-native-vector-icons/Entypo'

@inject("feedState")
@observer
export default class FeedScreen extends React.Component {
  constructor(props){
    super(props);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render(){
    const list = this.props.feedState.profiles.map((data, index) => {
      //console.log(data);
      return(
          <View key={index} style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Image source={{uri: data.picture.medium}} style={styles.cardPicture}/>
              <Text style={styles.cardName}>{this.capitalizeFirstLetter(data.name.first) + " " + this.capitalizeFirstLetter(data.name.last)}</Text>
              <Icon style={{position: 'absolute', top: 0, right: 0, flex: 1}} name={this.props.feedState.loves.get(data.id.value) ? "heart" : "heart-outlined"} size={30} color={this.props.feedState.loves.get(data.id.value) ? "red" : "black"} onPress={() => this.props.feedState.toggleLove(data.id.value)}/>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.text}>{this.props.feedState.posts.get(data.id.value)}</Text>
            </View>
          </View>
        )
    })

    return(
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {list}
      </ScrollView>
    )

  }
}