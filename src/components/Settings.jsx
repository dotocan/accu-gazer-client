import React from "react";
import instance from "../config/axios";

class Settings extends React.Component {
  state = {
    settings: {
      numberOfTests: 0,
      shuffle: false,
      testDurationInSeconds: 0
    }
  };

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    instance
      .get("settings", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => this.setState({ settings: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <p>Number of tests: {this.state.settings.numberOfTests}</p>
        <p>Shuffle: {this.state.settings.shuffle.toString()}</p>
        <p>Test duration in seconds: {this.state.settings.testDurationInSeconds}</p>
      </React.Fragment>
    );
  }
}

export default Settings;
