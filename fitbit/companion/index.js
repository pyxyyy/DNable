import { me } from "companion"
import * as messaging from "messaging";

const MILLISECONDS_PER_MINUTE = 1000 * 60

/* NB: wakeInterval API is limited to 5 mins wakeup calls, so cannot be used to do real time notification.
me.wakeInterval= 5* MILLISECONDS_PER_MINUTE;

me.onwakeinterval = function(evt) {
   console.log("wake interval function called");
}*/

var sent=false;

var notification_promise=null;
var notify_url_callback = function(response) {
  console.log("fetched data from url" + response.json);
  notification_promise=null;
}

var failed_notify_url_callback = function(response) {
  console.log("ffailed to get url" + response);
  notification_promise=null;
}

var poll_messages=function(evt) {
   var notification_pull_url="http://ec2-13-57-254-109.us-west-1.compute.amazonaws.com/fitbit_message";
   if (notification_promise == null) {
     
   console.log("polling for incoming notifications");
     notification_promise = fetch(notification_pull_url).then(notify_url_callback,failed_notify_url_callback);
   }
  
 /*  console.log(x);
   if (!sent) {
      sendMessage("text message");
      sent=true;
   }*/
}

//
setInterval(poll_messages,2000);

console.log("companion index.js running")
// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  console.log("peer socket opened")
  sendMessage("Diabetes Manager");
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

