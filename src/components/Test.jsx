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

    screenWidth: 0,
    screenHeight: 0,
    gazerX: 0,
    gazerY: 0,

    rectData: {
      rectX: 0,
      rectY: 0,
      rectWidth: 0,
      rectHeight: 0
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
    const measurement = {
      rectData: this.state.rectData,
      gazer: webgazer.getCurrentPrediction(),
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
      newState.rectData = this.calculateRectData(newState);

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
      if (measurement.gazer !== null) {
        const {x: gazerX, y: gazerY} = measurement.gazer;
        const {rectWidth, rectHeight, rectX, rectY} = measurement.rectData;

        const rectStartX = rectX;
        const rectEndX = rectX + rectWidth;
        const rectStartY = rectY;
        const rectEndY = rectY + rectHeight;

        const gazerIsInXBounds = (gazerX >= rectStartX) && (gazerX <= rectEndX);
        const gazerIsInYBounds = (gazerY >= rectStartY) && (gazerY <= rectEndY);
        if (gazerIsInXBounds && gazerIsInYBounds) console.log("True");
        else console.log("False");
      }
    }
  }

  calculateRectData = newState => {
    newState.rectData.rectWidth = this.calculateRectangleWidth(newState);
    newState.rectData.rectHeight = this.calculateRectangleHeight(newState);
    newState.rectData.rectX = this.calculateRectangleX(newState);
    newState.rectData.rectY = this.calculateRectangleY(newState);

    return newState.rectData;
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
    const maxX = newState.screenWidth - newState.rectData.rectWidth;

    const rectXOffset = this.calculateRectangleOffset(
      minX,
      maxX,
      newState.screenWidth
    );

    return newState.screenWidth * rectXOffset;
  }

  calculateRectangleY(newState) {
    const minY = 0;
    const maxY = newState.screenHeight - newState.rectData.rectHeight;

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
          width={this.state.rectData.rectWidth}
          height={this.state.rectData.rectHeight}
          x={this.state.rectData.rectX}
          y={this.state.rectData.rectY}
        />
      </React.Fragment>
    );
  }
}

export default Test;
