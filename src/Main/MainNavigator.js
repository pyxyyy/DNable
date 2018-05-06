import React from 'react'
import {Dimensions} from 'react-native'
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import SettingScreen from '../Setting/SettingScreen'
import Drawer from './components/Drawer/Drawer'
import {HomeNavigator} from "../Home/HomeNavigator";
import {CommunityNavigator} from "../Community/CommunityNavigator";

const DrawerNav = DrawerNavigator(
  {
    HomeNav: {screen: HomeNavigator},
    Community: {screen: CommunityNavigator},
    Setting: {screen: SettingScreen}
  },
  {
    drawerWidth: Dimensions.get('window').width*0.6,
    contentComponent: Drawer,
    initialRouteName: "Community"
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