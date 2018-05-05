import React from 'react';
import { View } from 'react-native'
import Voice from 'react-native-voice';

export default class VoiceScreen extends React.Component{
  constructor(props) {
    super(props);

    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
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
      <View>

      </View>
    )
  }
}