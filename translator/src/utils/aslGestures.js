// src/utils/aslGestures.js
import * as fp from 'fingerpose';

// ================ LETTERS A-Z ================ //

// Common Words
const helloGesture = new fp.GestureDescription('hello');
for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  helloGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}

const yesGesture = new fp.GestureDescription('yes');
yesGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
yesGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
yesGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  yesGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

const noGesture = new fp.GestureDescription('no');
noGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
noGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
noGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
noGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
for (let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
  noGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

const thankYouGesture = new fp.GestureDescription('thank you');
thankYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thankYouGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thankYouGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

const iLoveYouGesture = new fp.GestureDescription('i love you');
iLoveYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
iLoveYouGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
iLoveYouGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring]) {
  iLoveYouGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

const helpGesture = new fp.GestureDescription('help');
helpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
helpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
helpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
helpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  helpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

// ================ COMMON WORDS ================ //

const eatGesture = new fp.GestureDescription('eat');
eatGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
eatGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
eatGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  eatGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
eatGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
eatGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);

const sleepGesture = new fp.GestureDescription('sleep');
for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  sleepGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
sleepGesture.addDirection(fp.Finger.Palm, fp.FingerDirection.VerticalDown, 1.0);

const drinkGesture = new fp.GestureDescription('drink');
drinkGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  drinkGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
drinkGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

const waterGesture = new fp.GestureDescription('water');
waterGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
waterGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
waterGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  waterGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

const homeGesture = new fp.GestureDescription('home');
homeGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
homeGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
homeGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  homeGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
homeGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
homeGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

const schoolGesture = new fp.GestureDescription('school');
schoolGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
schoolGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
schoolGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  schoolGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
schoolGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
schoolGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalRight, 1.0);

const workGesture = new fp.GestureDescription('work');
workGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
workGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  workGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
workGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

const playGesture = new fp.GestureDescription('play');
playGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
playGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
playGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  playGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
playGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
playGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

const friendGesture = new fp.GestureDescription('friend');
friendGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
friendGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
  friendGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
friendGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
friendGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);

const familyGesture = new fp.GestureDescription('family');
familyGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
familyGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
familyGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  familyGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
familyGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
familyGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

const happyGesture = new fp.GestureDescription('happy');
happyGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
happyGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  happyGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
happyGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

const sadGesture = new fp.GestureDescription('sad');
sadGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
sadGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  sadGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
sadGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);

const timeGesture = new fp.GestureDescription('time');
timeGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  timeGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
timeGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

const dayGesture = new fp.GestureDescription('day');
dayGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
dayGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  dayGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
dayGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

const nightGesture = new fp.GestureDescription('night');
nightGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
nightGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  nightGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
nightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);

const bathroomGesture = new fp.GestureDescription('bathroom');
bathroomGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
bathroomGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  bathroomGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
bathroomGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

const pleaseGesture = new fp.GestureDescription('please');
pleaseGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  pleaseGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
pleaseGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

const sorryGesture = new fp.GestureDescription('sorry');
sorryGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
for (let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  sorryGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}
sorryGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);


export const aslGestures = [
 
  
  // Common Words
  helloGesture, yesGesture, noGesture, 
  thankYouGesture, iLoveYouGesture, helpGesture,
  eatGesture, sleepGesture, drinkGesture, waterGesture,
  homeGesture, schoolGesture, workGesture, playGesture,
  friendGesture, familyGesture, happyGesture, sadGesture,
  timeGesture, dayGesture, nightGesture, bathroomGesture,
  pleaseGesture, sorryGesture
];