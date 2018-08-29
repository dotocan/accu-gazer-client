/* eslint-disable no-undef */
import { ClearCanvas } from "./canvasManager";
import { RunTest } from "./measurementManager";
import { ShowCalibrationInstructionAlert, ShowMeasurementInstructionAlert } from "./alerts";

let PointCalibrate = 0;
let CalibrationPoints = {};

export function HideCalibrationPoint() {
  $(".Calibration").hide();
}

function ShowCalibrationPoint() {
  $(".Calibration").show();
  $("#Pt5").hide(); // initially hides the middle button
}

/**
 * Show the instruction of using calibration at the start up screen.
 */
export const PopUpInstruction = () => {
  HideCalibrationPoint();
  ClearCanvas();
  ShowCalibrationInstructionAlert(ShowCalibrationPoint);
};


/**
 * Load this function when the Measurement component mounts.
 * This function listens for button clicks on the html page
 * checks that all buttons have been clicked 5 times each, and then goes on to measuring accuracy.
 */
export const InitButtonListener = () => {
  HideCalibrationPoint();
  ClearCanvas();

  $(".Calibration").click(function() {
    let id = $(this).attr("id");

    if (!CalibrationPoints[id]) {
      // initialises if not done
      CalibrationPoints[id] = 0;
    }
    CalibrationPoints[id]++; // increments values

    if (CalibrationPoints[id] === 5) {
      //only turn to yellow after 5 clicks
      $(this).css("background-color", "yellow");
      $(this).prop("disabled", true); //disables the button
      PointCalibrate++;
    } else if (CalibrationPoints[id] < 5) {
      //Gradually increase the opacity of calibration points when click to give some indication to user.
      var opacity = 0.2 * CalibrationPoints[id] + 0.2;
      $(this).css("opacity", opacity);
    }

    //Show the middle calibration point after all other points have been clicked.
    if (PointCalibrate === 8) {
      $("#Pt5").show();
    }

    if (PointCalibrate >= 9) {
      // After last point is calibrated, hide all of them
      HideCalibrationPoint();

      ClearCanvas();

      // notification for the measurement process
      ShowMeasurementInstructionAlert(RunTest);
    }
  });
};

/**
 * This function clears the calibration buttons memory
 */
export const ClearCalibration = () => {
  $(".Calibration").css("background-color", "red");
  $(".Calibration").css("opacity", 0.2);
  $(".Calibration").prop("disabled", false);

  CalibrationPoints = {};
  PointCalibrate = 0;
};
