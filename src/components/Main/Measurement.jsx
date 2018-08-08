/* eslint-disable no-undef */
import './Measurement.css';
import React from "react";
import { canvas } from './measurement/canvasManager';
import { SetupCalibration, RestartCalibration } from "./measurement/main";
import { InitButtonListener } from "./measurement/calibrationManager";

class Measurement extends React.Component {
  componentDidMount() {
    SetupCalibration();
    RestartCalibration();
    InitButtonListener();
  }

  render() {
    return (
      <div className="h-100">
        <canvas id="plotting_canvas" />

        <div className="calibrationDiv h-100">
          <input type="button" className="Calibration" id="Pt1" />
          <input type="button" className="Calibration" id="Pt2" />
          <input type="button" className="Calibration" id="Pt3" />
          <input type="button" className="Calibration" id="Pt4" />
          <input type="button" className="Calibration" id="Pt5" />
          <input type="button" className="Calibration" id="Pt6" />
          <input type="button" className="Calibration" id="Pt7" />
          <input type="button" className="Calibration" id="Pt8" />
          <input type="button" className="Calibration" id="Pt9" />
        </div>
      </div>
    );
  }
}

export default Measurement;
