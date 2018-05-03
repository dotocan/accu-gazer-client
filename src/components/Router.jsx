import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import Test from "./Test";
import Settings from "./Settings";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/settings" component={Settings} />
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
