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

  render() {
    return(
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={styles.cross}>
              <CrossButton onPress={() => this.props.navigation.goBack()} color="black" />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
              <Icon name="photo-camera" size={35} color="#10B472"/>
            </TouchableOpacity>
          </Camera>
        </View>
      )
  }
}