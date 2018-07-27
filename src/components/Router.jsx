import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main/Main";
import RegistrationForm from "./Auth/RegistrationForm";
import Settings from "./Settings";
import NotFound from "./ErrorPages/NotFound";
import InternalServerError from './ErrorPages/InternalServerError';

const Router = () => (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/register" component={RegistrationForm} />
      <Route exact path="/test" component={Main} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/500" component={InternalServerError} />
      <Route component={NotFound}/>
    </Switch>
);

export default Router;
