import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
import { battery } from "power";
import { charger } from "power";
import { goals } from "user-activity";
import { today } from "user-activity";
import { setupNotifications } from "notification";
import { get_notification_message } from "notification";

import * as util from "../common/utils";

clock.granularity = "seconds";
setupNotifications();


let elTime = document.getElementById("time");
let elDate = document.getElementById("date");

function updateClock() {
  let dtDate = new Date();
  let iHours = dtDate.getHours();
  let iMins = util.zeroPad(dtDate.getMinutes());
  
  iHours = iHours % 12;
  iHours = iHours ? iHours : 12;

  elTime.text = `${iHours}:${iMins}`;
  
  elDate.text = `${util.getDay3(dtDate.getDay())} ${dtDate.getDate()} ${util.getMonth3(dtDate.getMonth())}`;
  
  updateHorizontalBar('steps');
  updateHorizontalBar('distance');
  updateHorizontalBar('calories');
  updateVerticalBar('elevationGain');
  updateVerticalBar('activeMinutes');
  updateNotification();
  updateBattery();
}



clock.ontick = () => updateClock();

let oHeartRate = new HeartRateSensor();
let elHeart = document.getElementById("heart");
let elHRRest = document.getElementById("resting-heart");
oHeartRate.onreading = function() {
  let iHeartRate = oHeartRate.heartRate;
  let iHRFontSize = Math.min(Math.round(iHeartRate/190*80), 80)
  elHeart.text = iHeartRate;
  elHeart.style.fill = util.heartRateColour(iHeartRate);
  elHeart.style.fontSize = iHRFontSize;

  elHRRest.text = '('+user.restingHeartRate+')';

  elHRRest.y = elHeart.getBBox().y + elHRRest.getBBox().height+5;
  
  let iHRRestFontSize = iHRFontSize - (iHeartRate-user.restingHeartRate)/2;
  elHRRest.style.fontSize = iHRRestFontSize;
  elHRRest.style.fill = "fb-mint";

  if (iHRRestFontSize <=10)
  {
    elHRRest.style.display = "none";
  }
  else
  {
    elHRRest.style.display = "inline";
  }
}
oHeartRate.start();

function updateVerticalBar(sTodayStat)
{
  let iStat = (today.local[sTodayStat] || 0);
  let iGoal = (goals[sTodayStat] || 0);
  let iPercent = Math.floor(iStat/iGoal*100);
  
  var el = document.getElementById(sTodayStat);
  var elBG = document.getElementById("background");
  var iScreenHeight = elBG.getBBox().height;
  var iBarHeight = Math.floor(iPercent * (iScreenHeight/100));
  el.height = iBarHeight;
  el.y = iScreenHeight/2-iBarHeight/2;
  
  colourStat(el, iPercent);
}

function updateHorizontalBar(sTodayStat)
{
  let iStat = (today.local[sTodayStat] || 0);
  let iGoal = (goals[sTodayStat] || 0);
  let iPercent = Math.floor(iStat/iGoal*100);
  
  var el = document.getElementById(sTodayStat);
  var elBG = document.getElementById("background");
  var iScreenWidth = elBG.getBBox().width;
  var iBarWidth = Math.floor(iPercent * (iScreenWidth/100));
  el.width = iBarWidth;
  el.x = iScreenWidth/2-iBarWidth/2;
  
  colourStat(el, iPercent);
}

function colourStat(el, iPercentage)
{
  let dtDate = new Date();
  let iHours = dtDate.getHours();
  let iDayPercent = Math.floor(iHours/24*100);

  if (iPercentage > 100)
  {
    el.style.fill = "fb-mint";
  }
  else
  {
    let iPercentDiff = iDayPercent - iPercentage;
    if (iPercentDiff < 0)
    {
      el.style.fill = "fb-cyan";
    }
    else if (iPercentDiff < 10)
    {
      el.style.fill = "fb-yellow";
    }
    else if (iPercentDiff < 20)
    {
      el.style.fill = "fb-orange";
    }
    else
    {
      el.style.fill = "fb-red";
    }
  }
}

function updateBattery()
{
  let elBattery = document.getElementById("battery");
  if (battery.chargeLevel > 50)
  {
    elBattery.style.display = "none";
  }
  else
  {
    elBattery.text = Math.floor(battery.chargeLevel) + '%';
    elBattery.style.display = "inline";
  }
}

var scroll=0;
function updateNotification() {
    var notify_message = document.getElementById("notification");
    var message = get_notification_message();
    if (message.length>32) {
      console.log("message: update"+message);
       notify_message.text = message.substring(scroll,scroll+32)
       scroll+=2;
       if (scroll>message.length) scroll=0;
    } else {
       notify_message.text = message;
    }
}
