import React from 'react';
import {observable, action, ObservableMap} from 'mobx';
import {ToastAndroid} from "react-native";

export default class StaticState{
  @observable status;
  @observable low;

  constructor() {
    this.status = 0;
    this.low = false;
  }

  @action turnAmber = () => {
    this.status = 1;
  }

  @action turnGreen = () => {
    this.status = 0;
  }

  @action toggleLow = () => {
    this.low = !this.low;
  }

  @action change = () => {
    console.log(this.status + " " + this.low)
    if(this.status == 0 && !this.low) {
      this.status = 1;
    }
    else if(this.status == 1 && !this.low) {
      this.status = 0;
      this.low = true;
    }
    else if(this.status == 0 && this.low) {
      this.status = 1;
    } else {
      this.status = 0;
      this.low = false;
    }
  }

  postUserData = (data) => {
    fetch('http://test.hackhealth102436.tk/foodlog', {
      method: 'PUT',
      headers:{
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({item: data['Item'], size: data['Serving size']})
    }).then(res => {return res.json()}).then(data => {
      ToastAndroid.show('Food Added!', ToastAndroid.SHORT);
    });
  }
}