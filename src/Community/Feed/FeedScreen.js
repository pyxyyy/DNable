import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import styles from "./FeedStyle";
import {inject, observer} from "mobx-react";

@inject("feedState")
@observer
export default class FeedScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const list = this.props.feedState.profiles.map((data, index) => {
      return(
          <View key={index} style={styles.cardContainer}>
            <Text>Hi</Text>
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