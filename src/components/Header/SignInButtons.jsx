import React from "react";

const SignInButtons = () => {
  return (
    <ul className="navbar-nav ml-auto">
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
  );
};

export default SignInButtons;