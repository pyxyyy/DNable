import React from 'react'
import {Dimensions} from 'react-native'
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import HomeScreen from '../Home/HomeScreen'
import SettingScreen from '../Setting/SettingScreen'
import Drawer from './components/Drawer'

const TabNav = TabNavigator(
  {
    Home: {screen: HomeScreen},
    Profile: {screen: HomeScreen}
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    initialRouteName: 'Home'
  }
)

const DrawerNav = DrawerNavigator(
  {
    TabNav: {screen: TabNav},
    Setting: {screen: SettingScreen}
  },
  {
    drawerWidth: Dimensions.get('window').width*0.7,
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