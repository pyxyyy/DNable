// code for handling server side notifications
// this pulls from a REST endpoint in order to get notifications from a server backend.

import  * as messaging from "messaging";
import { vibration } from "haptics";
import { display } from "display";
import document from "document";

var notification_message="";

// returns the current notification message 
export function get_notification_message() { return notification_message; }

// used to initialize the notifications module
export function setupNotifications() {
  
  console.log("intializing notification module");

  // set up handler to dismiss notification
  var notify_message = document.getElementById("notification");
  notify_message.onclick=function(evt) {
    notify_message.text="";
    vibration.stop();
  }
  var date_widget = document.getElementById("date");
  date_widget.onclick=function(evt) {
    notify_message.text="";
    vibration.stop();
  }
  var time_widget = document.getElementById("time");
  time_widget.onclick=function(evt) {
    notify_message.text="";
    vibration.stop();
  }
  
  
  // send a message to the companion app when the peer connection is established
  messaging.peerSocket.onopen = function() {
     // messaging.peerSocket.send("Hi!");
  }

  // Listen for incoming messages from companion app event
  messaging.peerSocket.onmessage = function(evt) {

    console.log("data type: " + evt.data['type']);
    if (evt.data['type']=="notify") {
      // 
      var message=evt.data['text'];
      console.log("notify the user that: " +message);
      // add code to update the UI
    
      notification_message=message;
      var notify_message = document.getElementById("notification");
      notify_message.text = notification_message;
      notify_message.state = "enabled";

      vibration.start("ring");
      display.poke();
    }

    console.log("device received message"+ evt.data);
  }

  // Handle and log errors 
  messaging.peerSocket.onerror = function(err) {
    console.log("error:" + err);
  }
}