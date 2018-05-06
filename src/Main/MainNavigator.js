import React from 'react'
import {Dimensions} from 'react-native'
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import SettingScreen from '../Setting/SettingScreen'
import Drawer from './components/Drawer/Drawer'
import {HomeNavigator} from "../Home/HomeNavigator";

const DrawerNav = DrawerNavigator(
  {
    HomeNav: {screen: HomeNavigator},
    Setting: {screen: SettingScreen}
  },
  {
    drawerWidth: Dimensions.get('window').width*0.6,
    contentComponent: Drawer
  }
)

export const MainNavigator = StackNavigator(
  {
    DrawerNav: {screen: DrawerNav}
  },
  {
    headerMode: 'none'
  }
);