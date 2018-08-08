/* eslint-disable no-undef */
import { SetupVideoFeed } from './videoFeedManager';
import { SetupCanvas } from "./canvasManager";
import { ClearCalibration, PopUpInstruction } from "./calibrationManager";

export const SetupCalibration = () => {
  //start the webgazer tracker
  webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    .setTracker("clmtrackr")
    .begin()
    .showPredictionPoints(true);

  //Set up the webgazer video feedback.
  var setup = function() {
    SetupVideoFeed();
    SetupCanvas();
  };

  function checkIfReady() {
    if (webgazer.isReady()) {
      setup();
    } else {
      setTimeout(checkIfReady, 100);
    }
  }
  setTimeout(checkIfReady, 100);
};

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
export const RestartCalibration = () => {
  ClearCalibration();
  PopUpInstruction();
};

export const Unload = () => {
  window.localStorage.clear(); //Comment out if you want to save data across different sessions
};
