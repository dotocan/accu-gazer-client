import React from "react";

class AnalysisCard extends React.Component {
  analyzeResults = test => {
    let numOfMeasurements = test.measurements.length;
    let numOfHits = 0;
    let accuracy = 0.0;

    for (let measurement of test.measurements) {
      if (measurement.isHit) {
        numOfHits++;
      }
    }

    accuracy = numOfHits / numOfMeasurements;

    let summary = {
      numOfMeasurements: numOfMeasurements,
      numOfHits: numOfHits,
      accuracy: accuracy
    };

    return summary;
  };

  render() {
    let summary = this.analyzeResults(this.props.test);
    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Measurements: {summary.numOfMeasurements}</p>
          <p className="card-text">Hits: {summary.numOfHits}</p>
          <p className="card-text">Accuracy: {summary.accuracy}</p>
        </div>
      </div>
    );
  }
}

export default AnalysisCard;
