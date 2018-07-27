import React from "react";
import SignOutDropdown from "./SignOutDropdown";
import SignInButtons from "./SignInButtons";
import { connect } from "react-redux";
import Link from "../../../node_modules/react-router-dom/Link";

class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            AccuGazer
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="navbar-collapse collapse" id="navbarResponsive">
            {this.props.store.auth.signedIn ? (
              <SignOutDropdown name={this.props.store.auth.user.firstName} />
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
  return { store: state.auth };
};

export default connect(mapStateToProps)(Header);
