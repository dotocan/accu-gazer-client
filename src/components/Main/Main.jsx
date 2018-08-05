import React from "react";
import Test from './Test';
import Calibration from './Calibration';

class Main extends React.Component {
  state = {
    isCalibrated: false
  };

  render() {
    return this.state.isCalibrated ? <Test /> : <Calibration />;
  }
}

export default Main;
