import React from 'react';
import {observable, action, ObservableMap} from 'mobx';

export default class StaticState{
  constructor(props) {

  }

  postUserData = (data) => {
    console.log(JSON.stringify(data));
    let body = [];
    body.push(JSON.stringify(data));
    fetch('http://test.hackhealth102436.tk/foodlog', {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(res => {return res.json()}).then(data => console.log(data));
  }
}