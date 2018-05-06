import React from 'react'
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./HomeScreen";
import VoiceScreen from './Voice/VoiceScreen'
import CameraScreen from './Camera/CameraScreen'
import AddFoodScreen from "./AddFood/AddFoodScreen";

export const HomeNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Voice: { screen: VoiceScreen },
    Camera: { screen: CameraScreen },
    AddFood: { screen: AddFoodScreen }
  },
  {
    headerMode: 'none'
  }
)