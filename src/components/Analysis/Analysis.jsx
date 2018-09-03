import React from "react";
import { connect } from "react-redux";
import * as testActions from "../../actions/testActions";
import AnalysisTable from "./AnalysisTable";
import AnalysisCard from "./AnalysisCard";

class Analysis extends React.Component {
  componentDidMount() {
    this.props.getTests();
  }

  render() {
    let tests = [];
    tests = this.props.tests.tests;

    return (
      <div>
        {tests.map(test => (
          <div>
            <AnalysisCard key={test.startTime} test={test} />

            <AnalysisTable
              key={test.startTime}
              measurements={test.measurements}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tests: state.tests };
};

const mapDispatchToProps = dispatch => {
  return { getTests: () => dispatch(testActions.getAllTestsForUser()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);
