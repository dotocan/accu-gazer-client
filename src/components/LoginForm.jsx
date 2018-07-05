import React from "react";
import instance from "../config/axios";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    let data = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    });

    instance
      .post("auth/login", data, {
        headers: { "content-type": "application/json" }
      })
      .then(res => this.handleResponse(res))
      .catch(err => console.log(err));
  };

  handleResponse = res => {
    const jwtToken = res.data.tokenString;
    localStorage.setItem("jwtToken", jwtToken);
  };

  handleEmailChange = event => {
    const email = event.target.value;
    this.setState({ email });
  };

  handlePasswordChange = event => {
    const password = event.target.value;
    this.setState({ password });
  };

  render() {
    return (
      <div className="text-center container h-100">
        <div className="row justify-content-md-center h-100">
          <form
            className="col col-sm-10 col-lg-6 my-auto"
            onSubmit={this.handleSubmit}
          >
            <h1 className="h3 mb-4 font-weight-normal">Log in to your account</h1>
            <input
              className="form-control my-2"
              type="text"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <input
              className="form-control my-2"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <button
              className="btn btn-lg btn-primary btn-block my-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
