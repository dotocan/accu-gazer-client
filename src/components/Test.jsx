import React from "react";
import Rectangle from "./Rectangle";
import instance from "../config/axios";
/* eslint-disable no-undef */
var counter = 0;

class Test extends React.Component {
  state = {
    testResult: {
      screenWidth: 0,
      screenHeight: 0,
      measurements: [],
    },

    rectangle: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },

    screenWidth: 0,
    screenHeight: 0,

    gazePoint: {
      x: 0,
      y: 0
    },

    settings: {
      numberOfTests: 0,
      shuffle: false,
      testDurationInSeconds: 0
    },

    testsLeft: 0,
    secondsLeft: 0,
    divisionFactor: 2,

    blinked: false,
    firstBlinkLetter: null,
    firstBlinkTime: null
  };

  componentWillMount() {
    this.updateWindowDimensions();
  }

  componentDidMount() {
    this.startWebGazer();
    this.getTestConfig();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.secondsLeft !== nextState.secondsLeft) {
      return true;
    }

    return false;
  }

  getTestConfig() {
    const token = localStorage.getItem('jwtToken');
    instance
      .get("settings", {
        headers: {
          Authorization:
            "Bearer " + token
        }
      })
      .then(res => this.handleResponse(res))
      .catch(err => console.log(err));
  }

  startWebGazer() {
    webgazer.showPredictionPoints(true);
    webgazer.begin();
  }

  handleResponse = response => {
    const newState = {...this.state};

    newState.settings = response.data;
    newState.secondsLeft = response.data.testDurationInSeconds;
    newState.testsLeft = response.data.numberOfTests;

    this.calculateRectData(newState);
    this.setState({ ...newState });

    this.interval = setInterval(() => this.runEveryHalfSecond(), 500);
  };

  runEveryHalfSecond() {
    // Save current measurement data
    const measurements = this.state.testResult.measurements;
    const gazePoint = this.state.gazePoint;
    gazePoint.x = webgazer.getCurrentPrediction().x;
    gazePoint.y = webgazer.getCurrentPrediction().y;

    const measurement = {
      rectangle: this.state.rectangle,
      gazePoint: gazePoint,
      date: new Date().getTime()
    };

    measurements.push(measurement);

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

        this.printResults();

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
    const result = {...this.state.testResult};
    result.screenWidth = this.state.screenWidth;
    result.screenHeight = this.state.screenHeight;

    for (let measurement of result.measurements) {
      if (measurement.gazePoint !== null) {
        const gazePoint = measurement.gazePoint;
        const {width, height, x, y} = measurement.rectangle;

        const rectStartX = x;
        const rectEndX = x + width;
        const rectStartY = y;
        const rectEndY = y + height;

        const gazerIsInXBounds = (gazePoint-x >= rectStartX) && (gazePoint.x <= rectEndX);
        const gazerIsInYBounds = (gazePoint.y >= rectStartY) && (gazePoint.y <= rectEndY);
        if (gazerIsInXBounds && gazerIsInYBounds) console.log("True");
        else console.log("False");
      }
    }
  }

  calculateRectData = newState => {
    newState.rectangle.width = this.calculateRectangleWidth(newState);
    newState.rectangle.height = this.calculateRectangleHeight(newState);
    newState.rectangle.x = this.calculateRectangleX(newState);
    newState.rectangle.x = this.calculateRectangleY(newState);

    return newState.rectangle;
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    webgazer
      .pause();
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
