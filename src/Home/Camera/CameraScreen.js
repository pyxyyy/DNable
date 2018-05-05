import React from 'react'
import { View, Text } from 'react-native'
import Camera from 'react-native-camera';
import styles from './CameraStyle'

export default class CameraScreen extends React.Component {
  camera = null;

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return(
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </Camera>
        </View>
      )
  }
}