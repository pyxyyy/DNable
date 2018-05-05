import {observable, action} from 'mobx';

export default class HomeState {
  @observable name;

  constructor(){
    this.name = '';
  }

  @action setName = (name) => {
    this.name = name;
  }
}