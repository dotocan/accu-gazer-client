import React from "react";
import { Link } from "../../../node_modules/react-router-dom";

const SignInButtons = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Sign in
        </Link>
      </li>
    </ul>
  );
};

export default SignInButtons;