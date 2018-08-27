export const GetResults = measurements => {
  let updatedMeasurements = [];

  for (let measurement of measurements) {
    
    let rectStartX = measurement.rectangle.x;
    let rectEndX = measurement.rectangle.x + measurement.rectangle.width;
    let rectStartY = measurement.rectangle.y;
    let rectEndY = measurement.rectangle.y + measurement.rectangle.height;

    let isGazePointWithinX =
      measurement.gazePoint.x >= rectStartX &&
      measurement.gazePoint.x <= rectEndX;
      
    let isGazePointWithinY =
      measurement.gazePoint.y >= rectStartY &&
      measurement.gazePoint.y <= rectEndY;

    let isHit = isGazePointWithinX && isGazePointWithinY;

    measurement.isHit = isHit;

    updatedMeasurements.push(measurement);
  }

  return updatedMeasurements;
};
