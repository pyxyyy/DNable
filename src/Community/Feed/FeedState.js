import {observable, action} from 'mobx';

export default class FeedState {
  @observable profiles;

  constructor(){
    this.profiles = [];

    for(let i = 0; i < 20; i++) {
      fetch('https://randomuser.me/api/').then(res => {return res.json()}).then(data => {
        this.profiles.push(data.results[0]);
      });
    }
  }
}