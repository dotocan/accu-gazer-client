import React from "react";

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
             
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  id="download"
                >
                  Dominik <span className="caret" />
                </a>
                <div className="dropdown-menu" aria-labelledby="download">
                  <a
                    className="dropdown-item"
                    href="/"
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>

            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
