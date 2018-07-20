import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Test from "./Test";
import Settings from "./Settings";
import NotFound from "./NotFound";
import InternalServerError from './ErrorPages/InternalServerError';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/500" component={InternalServerError} />
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
