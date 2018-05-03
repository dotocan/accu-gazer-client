import React from "react";
import axios from "axios";

class Settings extends React.Component {
  state = {
    settings: []
  };

  componentDidMount() {
    const instance = axios.create({
      baseURL: "http://localhost:8080/api/",
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" }
    });

    instance
      .get("settings")
      .then(res => this.setState({ settings: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ul>
        {this.state.settings.map(setting => (
          <React.Fragment>
            <li>Number of tests: {setting.numberOfTests}</li>
            <li>Shuffle: {setting.shuffle.toString()}</li>
            <li>Test duration in seconds: {setting.testDurationInSeconds}</li>
          </React.Fragment>
        ))}
      </ul>
    );
  }
}

export default Settings;
