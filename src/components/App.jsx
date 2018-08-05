import React from "react";
import Router from "./Router";
import Header from "./Header/Header";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Router signedIn={this.props.auth.signedIn}/>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
