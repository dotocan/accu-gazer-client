import { Test } from './test';

export const AnalyzeResults = () => {
    let numOfMeasurements = Test.measurements.length;
    let numOfHits = 0;
    let accuracy = 0.0;
    
    for(let measurement of Test.measurements) {
        if (measurement.isHit) {
            numOfHits++;
        }
    }

    accuracy = numOfHits / numOfMeasurements;

    console.log("Number of measurements: " + numOfMeasurements);
    console.log("Number of hits: " + numOfHits);
    console.log("Accuracy: " + accuracy);
}