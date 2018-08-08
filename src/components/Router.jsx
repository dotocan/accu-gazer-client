import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Measurement from "./Main/Measurement";
import RegistrationForm from "./Auth/RegistrationForm";
import Settings from "./Settings";
import NotFound from "./ErrorPages/NotFound";
import InternalServerError from './ErrorPages/InternalServerError';
import LoginForm from "./Auth/LoginForm";

const Router  = (props) => (
    <Switch>
      <Route exact path="/signin" component={LoginForm} />
      <Route exact path="/signup" component={RegistrationForm} />
      {props.signedIn ? <Route exact path="/" component={Measurement} /> : <Redirect to="/signin" />} 
      {props.signedIn ? <Route exact path="/settings" component={Settings} /> : <Redirect to="/signin" />} 
      <Route exact path="/500" component={InternalServerError} />
      <Route component={NotFound}/>
    </Switch>
);

export default Router;
