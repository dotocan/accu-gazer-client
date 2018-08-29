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
        <p>Number of rectangles in test: {this.props.settings.data.numberOfRectanglesInTest}</p>
        <p>Shuffle: {this.props.settings.data.shuffle.toString()}</p>
        <p>Rectangle duration in seconds: {this.props.settings.data.rectangleDuration}</p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { settings: state.settings };
}

const mapDispatchToProps = dispatch => {
  return { onGetSettings: () => dispatch(settingsActions.getSettings()) };
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
