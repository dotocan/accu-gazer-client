export let Test = {
    startTime: 0,
    endTime: 0,
    screenWidth:0,
    screenHeight: 0,
    measurements: []
}

export const UpdateMeasurements = () => {
    let updatedMeasurements = [];
  
    for (let measurement of Test.measurements) {

      console.log("Currect rect in measurement before update: " + JSON.stringify(measurement.rectangle));

      
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
  
      console.log("Currect rect in measurement after update: " + JSON.stringify(measurement.rectangle));
      updatedMeasurements.push(measurement);
    }
  
    Test.measurements = updatedMeasurements;
};
  