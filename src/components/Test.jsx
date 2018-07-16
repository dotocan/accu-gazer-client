import React from "react";
import Rectangle from "./Rectangle";
import instance from "../config/axios";
/* eslint-disable no-undef */

let counter = 0;

let testResult = {
  screenWidth: 0,
  screenHeight: 0,
  measurements: []
};

class Test extends React.Component {
  state = {
    rectangle: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },

    screenWidth: 0,
    screenHeight: 0,

    settings: {
      numberOfTests: 0,
      shuffle: false,
      testDurationInSeconds: 0
    },

    testsLeft: 0,
    secondsLeft: 0,
    divisionFactor: 2
  };

  componentWillMount() {
    this.updateWindowDimensions();
  }

  componentDidMount() {
   // this.startWebGazer();
    this.getTestConfig();
  }

  getTestConfig() {
    const token = localStorage.getItem("jwtToken");
    instance
      .get("settings", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => this.handleResponse(res))
      .catch(err => console.log(err));
  }

  startWebGazer() {
    webgazer
      .setRegression("ridge")
      .setTracker("clmtrackr")
      .showPredictionPoints(true)
      .begin();
  }

  handleResponse = response => {
    const newState = { ...this.state };

    newState.settings = response.data;
    newState.secondsLeft = response.data.testDurationInSeconds;
    newState.testsLeft = response.data.numberOfTests;

    this.calculateRectData(newState);
    this.setState({ ...newState });

    this.interval = setInterval(() => this.runEveryHalfSecond(), 500);
  };

  runEveryHalfSecond() {
    console.log("half second passed");
    // Save current measurement data
   /* let gazePoint = {
      x: 0,
      y: 0
    };

    if (webgazer.getCurrentPrediction()) {
      gazePoint.x = webgazer.getCurrentPrediction().x;
      gazePoint.y = webgazer.getCurrentPrediction().y;
    }

    let measurement = {
      rectangle: { ...this.state.rectangle },
      gazePoint: gazePoint,
      date: new Date().getTime()
    };

    // Save current measurement into test result
    testResult.measurements.push(measurement);*/

    counter++;
    if (counter % 2 === 0) {
      this.runEverySecond();
    }
  }

  runEverySecond() {
    const newState = { ...this.state };

    newState.secondsLeft = newState.secondsLeft - 1;

    if (newState.secondsLeft === 0) {
      newState.testsLeft = newState.testsLeft - 1;

      if (newState.testsLeft === 0) {
        clearInterval(this.interval);
        webgazer.pause();
   /*     this.printResults(); */
        return;
      }

      // Calculate new rect data only when seconds reach 0
      newState.rectangle = this.calculateRectData(newState);

      // Reset seconds counter and increment division factor
      newState.secondsLeft = this.state.settings.testDurationInSeconds;
      newState.divisionFactor = newState.divisionFactor + 1;
    }

    this.setState({ ...newState });
  }

  printResults() {
    testResult.screenWidth = this.state.screenWidth;
    testResult.screenHeight = this.state.screenHeight;

    for (let measurement of testResult.measurements) {
      if (measurement.gazePoint !== null) {
        let gazePoint = measurement.gazePoint;
        let { width, height, x, y } = measurement.rectangle;

        let rectStartX = x;
        let rectEndX = x + width;
        let rectStartY = y;
        let rectEndY = y + height;

        console.log(
          "Rect start x: " +
            rectStartX +
            "\n" +
            "Rect end x: " +
            rectEndX +
            "\n" +
            "Rect start y: " +
            rectStartY +
            "\n" +
            "Rect end y: " +
            rectEndY +
            "\n" +
            "Gaze x: " +
            gazePoint.x +
            "\n" +
            "Gaze y: " +
            gazePoint.y +
            "\n"
        );

        let gazerIsInXBounds =
          gazePoint.x >= rectStartX && gazePoint.x <= rectEndX;
        let gazerIsInYBounds =
          gazePoint.y >= rectStartY && gazePoint.y <= rectEndY;
        if (gazerIsInXBounds && gazerIsInYBounds) console.log("True");
        else console.log("False");
      }
    }
  }

  calculateRectData = newState => {
    newState.rectangle.width = this.calculateRectangleWidth(newState);
    newState.rectangle.height = this.calculateRectangleHeight(newState);
    newState.rectangle.x = this.calculateRectangleX(newState);
    newState.rectangle.y = this.calculateRectangleY(newState);

    return newState.rectangle;
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    webgazer.pause();
  }

  updateWindowDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  };

  calculateRectangleWidth(newState) {
    return newState.screenWidth / newState.divisionFactor;
  }

  calculateRectangleHeight(newState) {
    return newState.screenHeight / newState.divisionFactor;
  }

  calculateRectangleOffset = (min, max, dimension) => {
    return Math.floor(Math.random() * max + min) / dimension;
  };

  calculateRectangleX(newState) {
    const minX = 0;
    const maxX = newState.screenWidth - newState.rectangle.width;

    const rectXOffset = this.calculateRectangleOffset(
      minX,
      maxX,
      newState.screenWidth
    );

    return newState.screenWidth * rectXOffset;
  }

  calculateRectangleY(newState) {
    const minY = 0;
    const maxY = newState.screenHeight - newState.rectangle.height;

    const rectYOffset = this.calculateRectangleOffset(
      minY,
      maxY,
      newState.screenHeight
    );

    return newState.screenHeight * rectYOffset;
  }

  render() {
    return (
      <React.Fragment>
        <p>Number of tests left: {this.state.testsLeft}</p>
        <p>Seconds left: {this.state.secondsLeft}</p>
        <Rectangle
          width={this.state.rectangle.width}
          height={this.state.rectangle.height}
          x={this.state.rectangle.x}
          y={this.state.rectangle.y}
        />
      </React.Fragment>
    );
  }
}

export default Test;
