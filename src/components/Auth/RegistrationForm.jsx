import React from "react";
import instance from "../../config/axios";
import DatePicker from "react-datepicker";
import moment from "moment";

class RegistrationForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "male",
    startDate: moment(),
    dateOfBirth: moment(),
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    let data = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      dateOfBirth: this.state.dateOfBirth.unix(),
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

  handleDateOfBirthChange = date => {
    this.setState({ dateOfBirth: date });
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
      <div className="text-center container h-100 w-100 center-vertical">
        <form className="col col-sm-10 col-lg-6" onSubmit={this.handleSubmit}>
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

          <DatePicker
            className="form-control my-2"
            dateFormat="DD/MM/YYYY"
            selected={this.state.startDate}
            onChangeRaw={this.handleDateOfBirthChange}
          />

          <div className="custom-control custom-control-inline custom-radio">
            <input
              className="custom-control-input"
              type="radio"
              name="inlineRadioOptions"
              id="maleRadio"
              value="male"
              checked={this.state.gender === "male"}
              onChange={this.handleGenderChange}
            />
            <label className="custom-control-label" htmlFor="maleRadio">
              Male
            </label>
          </div>

          <div className="custom-control custom-control-inline custom-radio">
            <input
              className="custom-control-input"
              type="radio"
              name="inlineRadioOptions"
              id="femaleRadio"
              value="female"
              checked={this.state.gender === "female"}
              onChange={this.handleGenderChange}
            />
            <label className="custom-control-label" htmlFor="femaleRadio">
              Female
            </label>
          </div>

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
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
