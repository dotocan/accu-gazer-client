/* eslint-disable no-undef */
import screen from "./screenData";
import { Context, ClearCanvas } from "./canvasManager";
import { ShowCompletedMeasurementAlert } from './alerts';
import { GetResults } from './results';
import { Test } from './test';

let numberOfTests = 5;
let testDurationInSeconds = 5;
let divisionFactor = 1;

let interval;
let secondsLeft = testDurationInSeconds;
let loopPasses = 0;

// Rect data
let rectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}

let measurements = [];

export const RunTest = () => {
  // Calculate first rect data outside loop
  updateRectData();
  // Draw first rect outside loop
  drawRect();

  // Save test start time
  Test.startTime = new Date().getTime();

  // Save test screen width and height
  Test.testResult.screenWidth = screen.width;
  Test.testResult.screenHeight = screen.height;

  interval = setInterval(() => {
    runTestLoop();
  }, 500);
};

// Runs every half seond
function runTestLoop() {

  loopPasses++;

  // Every half second save measurement
  saveMeasurement();

  // Every full second 
  if(loopPasses % 2 === 0) {
    secondsLeft = secondsLeft - 1;

    if (secondsLeft === 0) {
      // When timer reaches zero reduce number of tests and reset timer
      numberOfTests = numberOfTests - 1;
      divisionFactor = divisionFactor + 1;
      secondsLeft = testDurationInSeconds;
  
      // Draw new rect every time timer reaches zero
      updateRectData();
      drawRect();

      console.log(Test);
  
      if (numberOfTests === 0) {
        // Save test end time
        Test.endTime = new Date().getTime();

        Test.testResult.measurements = GetResults(measurements);

        clearInterval(interval);
        console.log("Test finished, results: " + JSON.stringify(Test));
        ShowCompletedMeasurementAlert();
      }
    }
  }
}

function saveMeasurement() {
  let gazer = webgazer.getCurrentPrediction();

  let gazerX = 0;
  let gazerY = 0;

  if(gazer == null) {
    gazerX = gazer.x;
    gazerY = gazer.y;
  }

  let gazePoint = {
    x: gazerX,
    y: gazerY
  }

  let measuredAt = new Date().getTime();

  let measurement = { 
    measuredAt,
    rectangle,
    gazePoint
  };

  measurements.push(measurement);
}

function drawRect() {
  ClearCanvas();
  Context().fillStyle = "black";
  Context().fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}

function updateRectData() {
  calculateRectWidth();
  calculateRectHeight();
  calculateRectX();
  calculateRectY();
}

function calculateRectWidth() {
  rectangle.width = screen.width / divisionFactor;
}

function calculateRectHeight() {
  rectangle.height = screen.height / divisionFactor;
}

function getRectOffset(min, max, dimension) {
  return Math.floor(Math.random() * max + min) / dimension;
}

function calculateRectX() {
  const minX = 0;
  const maxX = screen.width - rectangle.width;

  const rectXOffset = getRectOffset(minX, maxX, screen.width);

  rectangle.x = screen.width * rectXOffset;
}

function calculateRectY() {
  const minY = 0;
  const maxY = screen.height - rectangle.height;

  const rectYOffset = getRectOffset(minY, maxY, screen.height);

  rectangle.y = screen.height * rectYOffset;
}
