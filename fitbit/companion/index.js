import { me } from "companion"
import * as messaging from "messaging";

const MILLISECONDS_PER_MINUTE = 1000 * 60

/* NB: wakeInterval API is limited to 5 mins wakeup calls, so cannot be used to do real time notification.
me.wakeInterval= 5* MILLISECONDS_PER_MINUTE;

me.onwakeinterval = function(evt) {
   console.log("wake interval function called");
}*/

var sent=false;
var curr_message=null;
var notification_promise=null;
/*var notify_url_callback = function(response) {
  console.log("fetched data from url" + response.json());
  notification_promise=null;
//  clearInterval();
}*/

var failed_notify_url_callback = function(response) {
  console.log("failed to get url" + response);
  notification_promise=null;
}

// call back used to poll for messages from a server REST endpoint
var poll_messages=function(evt) {
   var notification_pull_url="https://test.hackhealth102436.tk/fitbit_message";
   if (notification_promise == null) {
     
      console.log("polling for incoming notifications");
      notification_promise = fetch(notification_pull_url).then(function(response) {
       //console.log("received https response");
       return response.json();
    },failed_notify_url_callback).then(function (json) {
        //console.log("parse json response" + JSON.stringify(json));
        var message=json['message'];

        //console.log("message:" + message);
        if (message!="" && (curr_message == null || curr_message != message)) {
          console.log("new message device:" + message);
          curr_message=message;
          sendMessage(message);
        }
        notification_promise=null;
        return true;
     }
    )
   }
}

//
setInterval(poll_messages,2000);

console.log("companion index.js running")
// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  //console.log("peer socket opened")
  sendMessage("Welcome to DNable!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

function sendMessage(text) {
    console.log("peer socket send message")
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Limit results to the number of tiles available in firmware
      //departures.splice(TRAIN_COUNT, departures.length);
      messaging.peerSocket.send({'type':'notify','text':text});
    }
}


