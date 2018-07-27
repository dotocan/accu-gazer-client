import React from "react";
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settingsActions';

class Settings extends React.Component {
  componentDidMount() {
    this.props.onGetSettings();
  }

  render() {
    return (
      <React.Fragment>
        <p>Number of tests: {this.props.store.settings.data.numberOfTests}</p>
        <p>Shuffle: {this.props.store.settings.data.shuffle.toString()}</p>
        <p>Test duration in seconds: {this.props.store.settings.data.testDurationInSeconds}</p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.settings };
}

const mapDispatchToProps = dispatch => {
  return { onGetSettings: () => dispatch(settingsActions.getSettings()) };
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
