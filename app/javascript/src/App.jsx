import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";

import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import PrivateRoute from "./Common/PrivateRoute";
import { getFromLocalStorage } from "./helpers/storage";
import { setAuthHeaders } from "./apis/axios";
import CreatePoll from "./Poll/CreatePoll";
import PollForm from "./Poll/PollForm"
import ShowPolls from "./Poll/ShowPolls";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    // initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <h1>Loading.....</h1> 
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={ShowPolls} /> 
        <PrivateRoute
          path="/polls/new"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={PollForm}
        />
      </Switch>
    </Router>
  );
};

export default App;