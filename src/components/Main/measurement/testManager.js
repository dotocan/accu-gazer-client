/* eslint-disable no-undef */
import screen from "./screenData";
import { Context, ClearCanvas } from "./canvasManager";
import { ShowCompletedMeasurementAlert } from './alerts';

let numberOfTests = 5;
let testDurationInSeconds = 5;
let divisionFactor = 1;

let interval;

export const RunTest = () => {
  // Draw first rect outside loop
  drawRect();

  interval = setInterval(() => {
    runTestLoop();
  }, 1000);
};

let secondsLeft = testDurationInSeconds;

function runTestLoop() {
  secondsLeft = secondsLeft - 1;
  console.log("Seconds left: " + secondsLeft);
  console.log(webgazer.getCurrentPrediction());

  if (secondsLeft === 0) {
    // When timer reaches zero, reduce number of tests and reset timer
    numberOfTests = numberOfTests - 1;
    divisionFactor = divisionFactor + 1;
    console.log("Number of tests: " + numberOfTests);
    secondsLeft = testDurationInSeconds;

    drawRect();

    if (numberOfTests === 0) {
      clearInterval(interval);
      console.log("Test finished");
      ShowCompletedMeasurementAlert();
    }
  }
}

function drawRect() {
  ClearCanvas();
  Context().fillStyle = "black";
  Context().fillRect(getRectX(), getRectY(), getRectWidth(), getRectHeight());
}

function getRectWidth() {
  return screen.width / divisionFactor;
}

function getRectHeight() {
  return screen.height / divisionFactor;
}

function getRectOffset(min, max, dimension) {
  return Math.floor(Math.random() * max + min) / dimension;
}

function getRectX(newState) {
  const minX = 0;
  const maxX = screen.width - getRectWidth();

  const rectXOffset = getRectOffset(minX, maxX, screen.width);

  return screen.width * rectXOffset;
}

function getRectY(newState) {
  const minY = 0;
  const maxY = screen.height - getRectHeight();

  const rectYOffset = getRectOffset(minY, maxY, screen.height);

  return screen.height * rectYOffset;
}
