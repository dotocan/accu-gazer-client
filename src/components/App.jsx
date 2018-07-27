import React, { Component } from "react";
import Router from "./Router";
import Header from "./Header/Header";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Router />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
