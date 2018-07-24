import React, { Component } from "react";
import Router from "./Router";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Router />
      </React.Fragment>
    );
  }
}

export default App;
