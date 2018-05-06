import HomeState from '../Home/HomeState';
import FeedState from "../Community/Feed/FeedState";

const homeState = new HomeState();
const feedState = new FeedState();

export default{
  homeState: homeState,
  feedState: feedState
}