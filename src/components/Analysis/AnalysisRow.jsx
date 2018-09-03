import React from 'react';

const AnalysisRow = (props) => {
  return (
    <tr>
      <td>{props.measurement.rectangle.x}</td>
      <td>{props.measurement.rectangle.y}</td>
      <td>{props.measurement.rectangle.width}</td>
      <td>{props.measurement.rectangle.height}</td>
      <td>{props.measurement.gazePoint.x}</td>
      <td>{props.measurement.gazePoint.y}</td>
      <td>{props.measurement.isHit ? "true" : "false"}</td>
    </tr>
  );
};

export default AnalysisRow;
