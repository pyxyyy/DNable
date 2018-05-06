import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './CameraStyle'
import CrossButton from '../../Main/components/CrossButton'

export default class CameraScreen extends React.Component {
  camera = null;

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  onBarCodeRead(e) {
    console.log(
      "Barcode Found!",
      "Type: " + e.type + "\nData: " + e.data
    );
  }

  render() {
    return(
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={styles.header}>
              <CrossButton onPress={() => this.props.navigation.goBack()} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
              <Icon name="photo-camera" size={35} color="white"/>
            </TouchableOpacity>
          </Camera>
        </View>
      )
  }
}