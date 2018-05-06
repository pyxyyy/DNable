import React from 'react';
import {View, Text, ActivityIndicator, BackHandler} from 'react-native';
import styles from './AddFoodStyle';
import Header from '../../Main/components/Header'

export default class AddFoodScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }

    let cameraData = this.props.navigation.getParam("res", null);
    if(cameraData != null) this.fetchDataFromCamera(cameraData);

    let barcode = this.props.navigation.getParam("barcode", null);
    if(barcode != null) this.fetchDataFromBarcode(barcode);

    let speech = this.props.navigation.getParam("speech", null);
    if(speech != null) this.fetchDataFromSpeech(speech);
  }

  fetchDataFromCamera = (res) => {
    let body = new FormData();
    body.append('image', {uri: res.uri, name: "image.jpeg", fileName: res.name ,type: 'image/jpeg'});

    fetch('http://test.hackhealth102436.tk/image',{
      method: 'POST',
      headers:{
        "Content-Type": "multipart/form-data"
      } ,
      body :body
    }).then((res) => {return res.json()}).then(data => this.setState({data: data}));
  }

  fetchDataFromBarcode = (barcode) => {
    fetch('http://test.hackhealth102436.tk/barcode', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({barcode: barcode})
    }).then(res => {return res.json()}).then(data => this.setState({data: data}));
  }

  fetchDataFromSpeech = (speech) => {
    fetch('https://test.hackhealth102436.tk/voice', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({food: speech[0]})
    }).then(res => {return res.json()}).then(data => this.setState({data: data}));
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.popToTop();
    return true;
  };

  render(){
    return(
      <View style={styles.background}>
        <Header onBack={() => this.props.navigation.popToTop()} title="Add Food"/>
        <View style={styles.content}>
          {this.state.data != null
            ? <View>
              <Text>{JSON.stringify(this.state.data, null, 2)}</Text>
            </View>
            : <ActivityIndicator size="large" color="#10B472" />}
        </View>
      </View>
    )
  }
}