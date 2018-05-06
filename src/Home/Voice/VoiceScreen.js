import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import Voice from 'react-native-voice';
import styles from './VoiceStyle'
import CrossButton from "../../Main/components/CrossButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
//import * as ToastAndroid from "react-native";

export default class VoiceScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      stop: false
    }
    //Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
  }

  onSpeechError = (e) => {
    switch(e.error.message) {
      case "6/No speech input":
      case "5/Client side error":
        ToastAndroid.show('No speech detected!', ToastAndroid.SHORT);
        this.props.navigation.goBack();
    }
  }

  onSpeechResultsHandler = (e) => {
    this.setState({ stop: true });
    // Send e.value to backend with a Promise. On resolve, navigate
    this.props.navigation.navigate("AddFood", {speech: e.value});
  }

  componentDidMount = () => {
    Voice.start();
  }

  render(){
    return(
      <View style={styles.background}>
        <View style={styles.header}>
          <CrossButton onPress={() => { Voice.cancel(); this.props.navigation.goBack(); }} />
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