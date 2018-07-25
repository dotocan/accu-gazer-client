import React from "react";

const SignOutDropdown = (props) => {
    return(
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          id="download"
        >
          {props.name} <span className="caret" />
        </a>
        <div className="dropdown-menu" aria-labelledby="download">
          <a className="dropdown-item" href="/">
            Logout
          </a>
        </div>
      </li>
    </ul>);
}

export default SignOutDropdown;