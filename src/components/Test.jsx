import React from "react";
import Rectangle from "./Rectangle";
import axios from "axios";

/* eslint-disable no-undef */

class Test extends React.Component {
  state = {
    settings: {},
    secondsLeft: 10,
    divisionFactor: 2,
    screenWidth: 0,
    screenHeight: 0,
    xOffset: 0,
    yOffset: 0,

    blinked: false,
    firstBlinkLetter: null,
    firstBlinkTime: null,
  };

  componentWillMount() {
    this.updateWindowDimensions();
  }

  componentDidMount() {
    webgazer.showPredictionPoints(true).resume();
    webgazer.setGazeListener((data, elapsed) => {
      if (data != null) {
        console.log(elapsed);
      }
    }).begin();


    window.addEventListener("resize", this.updateWindowDimensions);

    const instance = axios.create({
      baseURL: "http://localhost:5000/api/",
      timeout: 1000,
      headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJ0ZXN0QHRlc3QuY29tIiwibmJmIjoxNTI1NzcwODkxLCJleHAiOjE1MjU4NTcyOTEsImlhdCI6MTUyNTc3MDg5MX0.jGX1WIOzJn-ocgmO8NfuLF8M9aO38Jdp8W5WT2p6YbLg2-zUB647_NKE8YBycvkh7h_D14liIyY22-4wAoCzcQ'}
    });

    instance
      .get("settings")
      .then(res => this.handleResponse(res))
      .catch(err => console.log(err));

    // Rectangle must be shown on random position, but once that position
    // is calculated, it must stay consistent during window resizing.
    // (If the rectangle is moved on x-axis by 50%, it must stay on 50% no
    // matter the screen size). So to avoid unnecessary calculation on every
    // window resize, we calculate the offset only once and not on every state
    this.calculateRectangleXOffset();
    this.calculateRectangleYOffset();
  }

  handleResponse = response => {
    this.setState({ settings: response.data })
    this.setState({ secondsLeft: this.state.settings.testDurationInSeconds })
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {



    this.setState ({
      secondsLeft: this.state.secondsLeft - 1
    });

    if (this.state.secondsLeft === 0) {

      if(this.state.settings.numberOfTests === 0) {
        clearInterval(this.interval);
        return
      }

      this.calculateRectangleXOffset();
      this.calculateRectangleYOffset();

      const settings = { ...this.state.settings };
      settings.numberOfTests -= 1;

      this.setState({
        secondsLeft: this.state.settings.testDurationInSeconds,
        settings,
        divisionFactor: this.state.divisionFactor + 1
      });
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("resize", this.updateWindowDimensions);
    webgazer.showPredictionPoints(false).clearGazeListener().pause();
  }

  updateWindowDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  };

  calculateRectangleWidth = () => {
    return this.state.screenWidth / this.state.divisionFactor;
  };

  calculateRectangleHeight = () => {
    return this.state.screenHeight / this.state.divisionFactor;
  };

  calculateRectangleXOffset = () => {
    // Avoid showing rectangle out of screen
    const min = 0;
    const max = this.state.screenWidth - this.calculateRectangleWidth();

    // Show rectangle on random x coordinate within defined bounds
    const randomXOffset =
      Math.floor(Math.random() * max + min) / this.state.screenWidth;
    this.setState({ xOffset: randomXOffset });
  };

  calculateRectangleYOffset = () => {
     // Avoid showing rectangle out of screen
    const min = 0;
    const max = this.state.screenHeight - this.calculateRectangleHeight();

    // Show rectangle on random y coordinate within defined bounds
    const randomYOffset =
      Math.floor(Math.random() * max + min) / this.state.screenHeight;
    this.setState({ yOffset: randomYOffset });
  };

  calculateRectangleX = () => {
    return this.state.screenWidth * this.state.xOffset;
  };

  calculateRectangleY = () => {
    return this.state.screenHeight * this.state.yOffset;
  };

  render() {
    return (
      <React.Fragment>
        <p>Number of tests left: {this.state.settings.numberOfTests}</p>
        <p>Seconds left: {this.state.secondsLeft}</p>
        <Rectangle
          width={this.calculateRectangleWidth()}
          height={this.calculateRectangleHeight()}
          x={this.calculateRectangleX()}
          y={this.calculateRectangleY()}
        />
      </React.Fragment>
    );
  }
}

export default Test;
