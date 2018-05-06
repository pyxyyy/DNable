

// setupPeerSocket(messaging.peerSocket)

import  * as messaging from "messaging";
import { vibration } from "haptics";
import document from "document";

var notification_message="";

export function get_notification_message() { return notification_message; }


export function setupNotifications() {
  
console.log("intializing notification module");

  
  
// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  //ui.updateUI("loading");

  messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {

  console.log("data type: " + evt.data['type']);
  if (evt.data['type']=="notify") {
      // 
      var message=evt.data['text'];
      console.log("notify the user that: " +message);
      // add code to update the UI
    
      notification_message=message;
      //this.notify_message = document.getElementById("notification");

      //this.notify_message.text = message;
      vibration.start("nudge-max");

  }

  console.log("device received message"+ evt.data);
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  ui.updateUI("error");
}

}