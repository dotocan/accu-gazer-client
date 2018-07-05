import React from "react";
import instance from '../config/axios';

class RegistrationForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: 0,
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    let data = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      dateOfBirth: this.state.dateOfBirth,
      email: this.state.email,
      password: this.state.password
    });

    instance
      .post("auth/register", data, {
        headers: { "content-type": "application/json" }
      })
      .then(res => this.handleResponse(res))
      .catch(err => console.log(err));
  };

  handleResponse = res => {
    console.log(res);
  };

  handleFirstNameChange = event => {
    const firstName = event.target.value;
    this.setState({ firstName });
  };

  handleLastNameChange = event => {
    const lastName = event.target.value;
    this.setState({ lastName });
  };

  handleGenderChange = event => {
    const gender = event.target.value;
    this.setState({ gender });
  };

  handleDateOfBirthChange = event => {
    const dateOfBirth = event.target.value;
    this.setState({ dateOfBirth });
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
            <h1 className="h3 mb-4 font-weight-normal">Create account</h1>
            <input
              className="form-control my-2"
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
            <input
              className="form-control my-2"
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
            <input
              className="form-control my-2"
              type="text"
              placeholder="Gender"
              value={this.state.gender}
              onChange={this.handleGenderChange}
            />
            <input
              className="form-control my-2"
              type="text"
              placeholder="Date of Birth"
              value={this.state.dateOfBirth}
              onChange={this.handleDateOfBirthChange}
            />
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

export default RegistrationForm;
