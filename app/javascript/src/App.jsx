import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";

import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import PrivateRoute from "./Common/PrivateRoute";
import { getFromLocalStorage } from "./helpers/storage";
import { setAuthHeaders, resetAuthTokens } from "./apis/axios";
import PollForm from "./Poll/PollForm";
import ShowPolls from "./Poll/ShowPolls";
import Poll from "./Poll/Poll";
import Header from "./Common/Header";
import { clearLocalStorage } from "./helpers/storage";
import authApi from "./apis/auth";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    // initializeLogger();
    setAuthHeaders();
    setLoading(false)
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearLocalStorage();
      resetAuthTokens();
      window.location.href = "/";
    } catch (e) {
      console.log(e, "error from logout");
    }
  };

  if (loading) {
    return (
      <div className="h-screen">
        <h1>Loading.....</h1>
      </div>
    );
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={ShowPolls} />
        <Route
          exact
          path="/show/polls/:id"
          render={(props) => <Poll {...props} isLoggedIn={isLoggedIn} />}
        />
        <PrivateRoute
          path="/create"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={PollForm}
        />
      </Switch>
    </Router>
  );
};

export default App;
