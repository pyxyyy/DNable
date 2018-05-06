import React from 'react';
import {View, Text, ActivityIndicator, BackHandler, Image, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react'
import styles from './AddFoodStyle';
import Header from '../../Main/components/Header'
import Icon from "react-native-vector-icons/Foundation";

@inject('addFoodState', 'staticState')
@observer
export default class AddFoodScreen extends React.Component {
  constructor(props) {
    super(props);

    let cameraData = this.props.navigation.getParam("res", null);
    if(cameraData != null) this.props.addFoodState.fetchDataFromCamera(cameraData);

    let barcode = this.props.navigation.getParam("barcode", null);
    if(barcode != null) this.props.addFoodState.fetchDataFromBarcode(barcode);

    let speech = this.props.navigation.getParam("speech", null);
    if(speech != null) this.props.addFoodState.fetchDataFromSpeech(speech);
  }

  /*fetchDataFromCamera = (res) => {
    let body = new FormData();
    body.append('image', {uri: res.uri, name: "image.jpeg", fileName: res.name ,type: 'image/jpeg'});

    fetch('http://test.hackhealth102436.tk/image',{
      method: 'POST',
      headers:{
        "Content-Type": "multipart/form-data"
      } ,
      body :body
    }).then((res) => {return res.json()}).then(data => {
      this.setState({data: data});
      this.fetchImages();
    });
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

  fetchImages = () => {
    this.state.data.forEach(data => {
      fetch('https://api.shutterstock.com/v2/images/search?query=' + data.Item, {
        headers: {
          authorization: 'Bearer 1/eyJjbGllbnRfaWQiOiIyMGFhMWMwYjM2ZGM4NmEyZjliMyIsInJlYWxtIjoiY3VzdG9tZXIiLCJzY29wZSI6InVzZXIudmlldyBjb2xsZWN0aW9ucy52aWV3IGNvbGxlY3Rpb25zLmVkaXQgbGljZW5zZXMudmlldyBsaWNlbnNlcy5jcmVhdGUgZWFybmluZ3MudmlldyBtZWRpYS5zdWJtaXQgbWVkaWEuZWRpdCIsInV0diI6InIwV0QiLCJ1c2VybmFtZSI6ImRldmlsX21hbl9yZWQyNDMyNjQiLCJ1c2VyX2lkIjoxOTkwMDUzMzIsIm9yZ2FuaXphdGlvbl9pZCI6bnVsbCwib3JnYW5pemF0aW9uX3VzZXJfaWQiOm51bGwsInBhcmVudF9vcmdhbml6YXRpb25faWRzIjpbXSwiY3VzdG9tZXJfaWQiOjE5OTAwNTMzMiwiZXhwIjoxNTI1NjA1NzI0fQ.JqrbL1ogl0ZzniTDNBSpkXwy-vKjB3EJATLv74SdZ7EoobZ03zKzeajEbLEg64GhVaLlwJU6mPnZTCqTEY6qGQ'
        }
      }).then(res => { return res.json() }).then(data => {
        let images = this.state.images;
        images.push(data.data[0].assets.preview.url);
        this.setState({images: images});
      });
    })

  }*/

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
    console.log(this.props.addFoodState.data);
    return(
      <View style={styles.background}>
        <Header onBack={() => this.props.navigation.popToTop()} title="Add Food"/>
        <View style={styles.content}>
          {this.props.addFoodState.data != null
            ? <View style={styles.itemBox}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{this.props.addFoodState.data.Item}</Text>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}>
                      <Text style={styles.text}>Serving:</Text>
                    </View>
                    <View style={styles.tableCellRight}>
                      <Text style={styles.text}>{this.props.addFoodState.data['Serving size']}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}>
                      <Text style={styles.text}>Calories:</Text>
                    </View>
                    <View style={styles.tableCellRight}>
                      <Text style={styles.text}>{this.props.addFoodState.data['Calories']}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}>
                      <Text style={styles.text}>Carbohydrate:</Text>
                    </View>
                    <View style={styles.tableCellRight}>
                      <Text style={styles.text}>{this.props.addFoodState.data['Carbohydrate'] + "g"}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}>
                      <Text style={styles.text}>Protein:</Text>
                    </View>
                    <View style={styles.tableCellRight}>
                      <Text style={styles.text}>{this.props.addFoodState.data['Protein'] + "g"}</Text>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCellLeft}>
                      <Text style={styles.text}>Fat:</Text>
                    </View>
                    <View style={styles.tableCellRight}>
                      <Text style={styles.text}>{this.props.addFoodState.data['Fat'] + "g"}</Text>
                    </View>
                  </View>
                </View>
              <TouchableOpacity style={styles.button} onPress={() => this.props.staticState.postUserData(this.props.addFoodState.data)}>
                <Icon name="check" size={28} color="white"/>
              </TouchableOpacity>
              </View>
            : <ActivityIndicator size="large" color="#10B472" />}
        </View>
      </View>
    )
  }
}