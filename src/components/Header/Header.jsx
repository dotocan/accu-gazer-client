import React from "react";
import SignOutDropdown from "./SignOutDropdown";
import SignInButtons from "./SignInButtons";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a href="/" className="navbar-brand">
            AccuGazer
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="navbar-collapse collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/settings">
                  Settings
                </a>
              </li>
            </ul>

            {this.props.auth.auth.signedIn ? (
              <SignOutDropdown name={this.props.auth.auth.user.firstName} />
            ) : (
              <SignInButtons />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
