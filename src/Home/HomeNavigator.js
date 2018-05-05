import React from 'react'
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./HomeScreen";
import VoiceScreen from './Voice/VoiceScreen'
import CameraScreen from './Camera/CameraScreen'

export const HomeNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Voice: { screen: VoiceScreen },
    Camera: { screen: CameraScreen }
  },
  {
    headerMode: 'none'
  }
)