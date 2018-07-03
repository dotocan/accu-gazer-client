import React from "react";
import Rectangle from "./Rectangle";
import instance from "../config/axios";
/* eslint-disable no-undef */

class Test extends React.Component {
  state = {

    measurements: [],

    screenWidth: 0,
    screenHeight: 0,
    rectX: 0,
    rectY: 0,
    rectXOffset: 0,
    rectYOffset: 0,
    rectWidth: 0,
    rectHeight: 0,
    gazerX: 0,
    gazerY: 0,

    settings: {},
    secondsLeft: 10,
    divisionFactor: 2,

    blinked: false,
    firstBlinkLetter: null,
    firstBlinkTime: null,
  };

  componentWillMount() {
    this.updateWindowDimensions();
  }

  componentDidMount() {
    this.startWebGazer();

   // window.addEventListener("resize", this.updateWindowDimensions);

    this.getTestConfig();
  }

  getTestConfig() {
    instance
      .get("settings", {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJ0ZXN0QHRlc3QuY29tIiwibmJmIjoxNTMwNjA4NjcxLCJleHAiOjE1MzA2OTUwNzEsImlhdCI6MTUzMDYwODY3MX0._7DE_VQX9a2hm6ctqfdspGY_qskvIv4yFARkd0Uu8wlUQWILpVaPkEOvyHea16qsqnEDMISqFCxGNzXfQlhSjg'}})
      .then(res => this.handleResponse(res))
      .catch(err => console.log(err));
  }

  startWebGazer() {
    webgazer.showPredictionPoints(true);
    webgazer.begin();
    //webgazer.setGazeListener((data, elapsed) => {}).begin();
  }

  handleResponse = response => {
    console.log(response)
    this.setState({ settings: response.data })
    this.setState({ secondsLeft: this.state.settings.testDurationInSeconds })

    this.calculateRectData();

    this.interval = setInterval(() => this.runEverySecond(), 1000);
    this.interval = setInterval(() => this.runEveryHalfSecond(), 500);
  }

  runEveryHalfSecond() {
    console.log(webgazer.getCurrentPrediction());

    const measurements = this.state.measurements;
    const measurement = {
      rectX: this.state.rectX,
      rectY: this.state.rectY,
      rectXOffset: this.state.rectXOffset,
      rectYOffset: this.state.rectYOffset,
      rectWidth: this.state.rectWidth,
      rectHeight: this.state.rectHeight,
      gazer: webgazer.getCurrentPrediction(),
      date: new Date(),
    }

    measurements.push(measurement);
    console.log(measurements);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.settings.numberOfTests !== nextState.settings.numberOfTests) {
      this.calculateRectData();
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    console.log("Component did update");
  }

  runEverySecond() {

    this.setState ({
      secondsLeft: this.state.secondsLeft - 1
    });


    if (this.state.secondsLeft === 0) {

      if(this.state.settings.numberOfTests === 0) {
        clearInterval(this.interval);
        return
      }

      const settings = { ...this.state.settings };
      settings.numberOfTests -= 1;

      this.setState({
        secondsLeft: this.state.settings.testDurationInSeconds,
        settings,
        divisionFactor: this.state.divisionFactor + 1
      });
    }

  }



  calculateRectData = () => {
    this.calculateRectangleWidth();
    this.calculateRectangleHeight();
    this.calculateRectangleXOffset();
    this.calculateRectangleYOffset();
    this.calculateRectangleX();
    this.calculateRectangleY();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //window.removeEventListener("resize", this.updateWindowDimensions);
    webgazer.showPredictionPoints(false).clearGazeListener().pause();
  }

  updateWindowDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  };

  calculateRectangleWidth = () => {
    this.setState({rectWidth: this.state.screenWidth / this.state.divisionFactor});
  };

  calculateRectangleHeight = () => {
    this.setState({rectHeight: this.state.screenHeight / this.state.divisionFactor});
  };

  calculateRectangleXOffset = () => {
    // Avoid showing rectangle out of screen
    const min = 0;
    const max = this.state.screenWidth - this.state.rectWidth;

    // Show rectangle on random x coordinate within defined bounds
    const randomXOffset =
      Math.floor(Math.random() * max + min) / this.state.screenWidth;
    this.setState({ rectXOffset: randomXOffset });
  };

  calculateRectangleYOffset = () => {
     // Avoid showing rectangle out of screen
    const min = 0;
    const max = this.state.screenHeight - this.state.rectHeight;

    // Show rectangle on random y coordinate within defined bounds
    const randomYOffset =
      Math.floor(Math.random() * max + min) / this.state.screenHeight;
    this.setState({ rectYOffset: randomYOffset });
  };

  calculateRectangleX = () => {
    this.setState({rectX: this.state.screenWidth * this.state.rectXOffset});
  };

  calculateRectangleY = () => {
    this.setState({rectY: this.state.screenHeight * this.state.rectYOffset});
  };



  render() {
    return (
      <React.Fragment>
        <p>Number of tests left: {this.state.settings.numberOfTests}</p>
        <p>Seconds left: {this.state.secondsLeft}</p>
        <Rectangle
          width={this.state.rectWidth}
          height={this.state.rectHeight}
          x={this.state.rectX}
          y={this.state.rectY}
        />
      </React.Fragment>
    );
  }
}

export default Test;
