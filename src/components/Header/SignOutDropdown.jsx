import React from "react";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";
import { Link } from "react-router-dom";

class SignOutDropdown extends React.Component {
  handleClick = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            Settings
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            id="download"
          >
            {this.props.name} <span className="caret" />
          </a>
          <div className="dropdown-menu" aria-labelledby="download">
            <a className="dropdown-item" onClick={this.handleClick}>
              Logout
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { onLogout: () => dispatch(authActions.logout()) };
};

export default connect(
  null,
  mapDispatchToProps
)(SignOutDropdown);
