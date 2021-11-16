import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import UserAccount from "./pages/UserAccount";


// Création des différentes routes
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/account" exact component={UserAccount} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
