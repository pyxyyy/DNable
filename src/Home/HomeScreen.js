import React from 'react';
import {View, Text, Button} from 'react-native';
import {observer, inject} from 'mobx-react';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
let audioPath = AudioUtils.MusicDirectoryPath + '/test.amr_wb';
import Voice from 'react-native-voice';
import styles from './HomeStyle'

@inject("homeState")
@observer
export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 16000,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "amr_wb"
    });

    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);

    this.state = {
      partial: [],
      speech: []
    }
  }

  onSpeechStartHandler = () => {
    console.log("start");
  }

  onSpeechEndHandler = () => {
    console.log("end");
  }

  onSpeechResultsHandler = (e) => {
    this.props.homeState.setName(e.value[0]);
  }

  onSpeechPartialResults = (e) => {
    this.setState = {
      partial: e.value
    }
    console.log(e.value);
  }

  render() {
    return(
      <View style={styles.background}>
        <Text>{this.props.homeState.name}</Text>
        <Button onPress={() => Voice.start('en-US')} title="Start"/>
        <Button onPress={() => Voice.stop()} title="Stop"/>
      </View>
    );
  }
}