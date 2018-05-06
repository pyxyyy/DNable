import HomeState from '../Home/HomeState';
import FeedState from "../Community/Feed/FeedState";
import AddFoodState from "../Home/AddFood/AddFoodState";

const homeState = new HomeState();
const feedState = new FeedState();
const addFoodState = new AddFoodState();

export default{
  homeState: homeState,
  feedState: feedState,
  addFoodState: addFoodState
}