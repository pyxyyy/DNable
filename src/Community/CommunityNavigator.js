import { TabNavigator } from 'react-navigation'
import FeedScreen from "./Feed/FeedScreen";
import ForumScreen from "./Forum/ForumScreen";

export const CommunityNavigator = new TabNavigator({
  Feed: {screen: FeedScreen},
  Forum: {screen: ForumScreen}
},{
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    style: {backgroundColor: '#10B472'},
    indicatorStyle: {backgroundColor: '#222222'},
    labelStyle: {fontSize: 15}
  }
})