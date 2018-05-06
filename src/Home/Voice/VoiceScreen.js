import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Voice from 'react-native-voice';
import styles from './VoiceStyle'
import CrossButton from "../../Main/components/CrossButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default class VoiceScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      stop: false
    }
    //Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  onSpeechResultsHandler = (e) => {
    //this.props.homeState.setName(e.value[0]);
  }

  /*componentDidMount = () => {
    //Voice.start();
  }*/

  render(){
    return(
      <View style={styles.background}>
        <View style={styles.header}>
          <CrossButton onPress={() => this.props.navigation.goBack()} />
        </View>
        <View style={styles.container} >
          <Animatable.View animation="pulse" iterationCount="infinite">
            <Icon name="microphone" size={100} color="#10B472"/>
          </Animatable.View>
          <Text style={styles.text}>{this.state.stop ? "Processing" : "Listening"}</Text>
        </View>
        <View style={styles.footer}>
        {this.state.stop
        ? <ActivityIndicator size="large" color="#10B472" />
        : <TouchableOpacity style={styles.button} onPress={() => { Voice.stop(); this.setState({ stop: true }); }}>
            <Icon name="stop" size={25} color="white"/>
          </TouchableOpacity>}
        </View>
      </View>
    )
  }
}