import React from "react";
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    let loginData = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    });
    

    this.props.onLogin(loginData);
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

const mapStateToProps = (state) => {
  return { data: state.auth } 
}

const mapDispatchToProps = dispatch => {
  return { onLogin: loginData => dispatch(authActions.login(loginData)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
 