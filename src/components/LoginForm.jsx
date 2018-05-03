import React from "react";

class LoginForm extends React.Component {
  render() {
    return (
      <form action="">
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
