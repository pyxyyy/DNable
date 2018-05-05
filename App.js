import React from "react";
import {Provider} from "mobx-react";
import {MainNavigator} from "./src/Main/MainNavigator";
import states from "./src/Main/States";

export default class App extends React.Component {
  render() {
    return (
      <Provider {...states}>
        <MainNavigator />
      </Provider>
  )};
};