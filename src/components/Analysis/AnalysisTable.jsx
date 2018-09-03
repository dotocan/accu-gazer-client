import React from "react";
import AnalysisRow from "./AnalysisRow";

const AnalysisTable = props => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">RectX</th>
          <th scope="col">RectY</th>
          <th scope="col">RectWidth</th>
          <th scope="col">RectHeight</th>
          <th scope="col">GazeX</th>
          <th scope="col">GazeY</th>
          <th scope="col">IsHit</th>
        </tr>
      </thead>
      <tbody>
        {props.measurements.map(measurement => (
          <AnalysisRow measurement={measurement} key={measurement.measuredAt} />
        ))}
      </tbody>
    </table>
  );
};

export default AnalysisTable;
