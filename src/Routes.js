import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, NotFound, Login, Signup, SingleItem, ResetPassword } from "./containers";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./components";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/items/:id">
        <SingleItem />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
