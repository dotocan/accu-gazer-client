/* eslint-disable no-undef */
import { ClearCanvas } from "./canvasManager";
import { ClearCalibration } from "./calibrationManager";
import { RestartCalibration } from "./main";

export const ShowMeasurementInstructionAlert = confirmCallback => {
  swal({
    title: "Measurement",
    text: "Don't move your mouse and stare at the middle of black rectangles.",
    closeOnEsc: false,
    allowOutsideClick: false,
    closeModal: true,
    buttons: {
        confirm: "Start"
    }
  }).then(isConfirm => {
    confirmCallback();
  });
};

export const ShowCompletedMeasurementAlert = () => {
  swal({
    title:
      "Your measurement is completed. Do you want to send data to the server or repeat the test?",
    allowOutsideClick: false,
    buttons: {
      cancel: "Repeat",
      confirm: "Send"
    }
  }).then(isConfirm => {
    if (isConfirm) {
      ClearCanvas();
    } else {
      ClearCalibration();
      ClearCanvas();
      RestartCalibration();
    }
  });
};

export const ShowCalibrationInstructionAlert = confirmCallback => {
  swal({
    title: "Calibration",
    text:
      "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
    buttons: {
      cancel: false,
      confirm: true
    }
  }).then(isConfirm => {
    confirmCallback();
  });
};
