import {observable, action} from 'mobx';

export default class AddFoodState {
  @observable data;
  //@observable images;

  constructor(){
    this.data = null;
    //this.images = [];
  }

  @action fetchDataFromCamera = (res) => {
    let body = new FormData();
    body.append('image', {uri: res.uri, name: "image.jpeg", fileName: res.name ,type: 'image/jpeg'});

    fetch('http://test.hackhealth102436.tk/image',{
      method: 'POST',
      headers:{
        "Content-Type": "multipart/form-data"
      } ,
      body :body
    }).then((res) => {return res.json()}).then(data => {
      console.log(data);
      this.data = data[0];
      //this.fetchImages();
    });
  }

  @action fetchDataFromBarcode = (barcode) => {
    fetch('http://test.hackhealth102436.tk/barcode', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({barcode: barcode})
    }).then(res => {return res.json()}).then(data => {
      console.log(data);
      this.data = data[0];
      //this.fetchImages();
    });
  }

  @action fetchDataFromSpeech = (speech) => {
    fetch('https://test.hackhealth102436.tk/voice', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({food: speech[0]})
    }).then(res => {return res.json()}).then(data => {
      console.log(data);
      this.data = data[0];
      //this.fetchImages();
    });
  }

  /*@action fetchImages = () => {
    console.log(this.data);
    fetch('https://api.shutterstock.com/v2/images/search?query=' + this.data.Item, {
      headers: {
        authorization: 'Bearer 1/eyJjbGllbnRfaWQiOiIyMGFhMWMwYjM2ZGM4NmEyZjliMyIsInJlYWxtIjoiY3VzdG9tZXIiLCJzY29wZSI6InVzZXIudmlldyBjb2xsZWN0aW9ucy52aWV3IGNvbGxlY3Rpb25zLmVkaXQgbGljZW5zZXMudmlldyBsaWNlbnNlcy5jcmVhdGUgZWFybmluZ3MudmlldyBtZWRpYS5zdWJtaXQgbWVkaWEuZWRpdCIsInV0diI6InIwV0QiLCJ1c2VybmFtZSI6ImRldmlsX21hbl9yZWQyNDMyNjQiLCJ1c2VyX2lkIjoxOTkwMDUzMzIsIm9yZ2FuaXphdGlvbl9pZCI6bnVsbCwib3JnYW5pemF0aW9uX3VzZXJfaWQiOm51bGwsInBhcmVudF9vcmdhbml6YXRpb25faWRzIjpbXSwiY3VzdG9tZXJfaWQiOjE5OTAwNTMzMiwiZXhwIjoxNTI1NjA1NzI0fQ.JqrbL1ogl0ZzniTDNBSpkXwy-vKjB3EJATLv74SdZ7EoobZ03zKzeajEbLEg64GhVaLlwJU6mPnZTCqTEY6qGQ'
      }
    }).then(res => { return res.json() }).then(data => {
      console.log(data);
      this.images.push(data.data[0].assets.preview.url);
    });
  };

    /*Object.keys(this.data).map((key) => {
      const data = this.data[key];
      console.log(data);
      fetch('https://api.shutterstock.com/v2/images/search?query=' + data.Item, {
        headers: {
          authorization: 'Bearer 1/eyJjbGllbnRfaWQiOiIyMGFhMWMwYjM2ZGM4NmEyZjliMyIsInJlYWxtIjoiY3VzdG9tZXIiLCJzY29wZSI6InVzZXIudmlldyBjb2xsZWN0aW9ucy52aWV3IGNvbGxlY3Rpb25zLmVkaXQgbGljZW5zZXMudmlldyBsaWNlbnNlcy5jcmVhdGUgZWFybmluZ3MudmlldyBtZWRpYS5zdWJtaXQgbWVkaWEuZWRpdCIsInV0diI6InIwV0QiLCJ1c2VybmFtZSI6ImRldmlsX21hbl9yZWQyNDMyNjQiLCJ1c2VyX2lkIjoxOTkwMDUzMzIsIm9yZ2FuaXphdGlvbl9pZCI6bnVsbCwib3JnYW5pemF0aW9uX3VzZXJfaWQiOm51bGwsInBhcmVudF9vcmdhbml6YXRpb25faWRzIjpbXSwiY3VzdG9tZXJfaWQiOjE5OTAwNTMzMiwiZXhwIjoxNTI1NjA1NzI0fQ.JqrbL1ogl0ZzniTDNBSpkXwy-vKjB3EJATLv74SdZ7EoobZ03zKzeajEbLEg64GhVaLlwJU6mPnZTCqTEY6qGQ'
        }
      }).then(res => { return res.json() }).then(data => {
        this.images.push(data.data[0].assets.preview.url);
      });
    })*/

}