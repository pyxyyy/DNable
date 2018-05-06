import React from 'react'
import {View, TouchableOpacity, ActivityIndicator} from 'react-native'
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './CameraStyle'
import CrossButton from '../../Main/components/CrossButton'
import ImageResizer from 'react-native-image-resizer';
import Voice from "react-native-voice";

export default class CameraScreen extends React.Component {
  camera = null;
  constructor(props) {
    super(props);
  }

  takePicture() {
    this.camera.capture({})
      .then((path) => {
        console.log(path.path);
        ImageResizer.createResizedImage(path.path, 544, 544, 'JPEG', 100, 0, null).then((response) => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          console.log(response.uri);
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
          this.props.navigation.navigate("AddFood", {uri: response.uri});
        }).catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
          console.log(err);
        });
      })
      .catch(err => console.error(err));
  }

  onBarCodeRead(e) {
    console.log(
      "Barcode Found!",
      "Type: " + e.type + "\nData: " + e.data
    );
    this.props.navigation.navigate("AddFood");
  }

  render() {
    return(
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            captureTarget={Camera.constants.CaptureTarget.temp}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={styles.header}>
              <CrossButton onPress={() => this.props.navigation.goBack()} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.takePicture()}>
              <Icon name="photo-camera" size={35} color="white"/>
            </TouchableOpacity>
          </Camera>
        </View>
      )
  }
}