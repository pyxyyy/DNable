import HomeState from '../Home/HomeState';
import FeedState from "../Community/Feed/FeedState";
import AddFoodState from "../Home/AddFood/AddFoodState";
import StaticState from "./StaticState";

const staticState = new StaticState();
const homeState = new HomeState();
const feedState = new FeedState();
const addFoodState = new AddFoodState();

export default{
  staticState: staticState,
  homeState: homeState,
  feedState: feedState,
  addFoodState: addFoodState
}