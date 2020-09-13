import React from "react";
import { Switch, Route } from "react-router-dom";

//pages
import Home from "../pages/Home";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artists" exact>
        <h1> artistas</h1>
      </Route>
      <Route path="/settings" exact>
        <h1> settings...</h1>
      </Route>
    </Switch>
  );
}
