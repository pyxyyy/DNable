import {observable, action, ObservableMap} from 'mobx';

export default class FeedState {
  @observable profiles;
  @observable loves;
  @observable posts;

  constructor(){
    this.profiles = [];
    this.loves = new ObservableMap();
    this.posts = new ObservableMap();

    for(let i = 0; i < 20; i++) {
      fetch('https://randomuser.me/api/').then(res => {return res.json()}).then(data => {
        this.profiles.push(data.results[0]);
        this.loves.set(data.results[0].id.value, false);
        fetch('https://talaikis.com/api/quotes/random/').then(res1 => {
          return res1.json()
        }).then(data1 => {
          this.posts.set(data.results[0].id.value, data1.quote.slice(0, 150));
        });
      });
    }
  }

  @action toggleLove = (id) => {
    this.loves.set(id, !this.loves.get(id));
  }
}