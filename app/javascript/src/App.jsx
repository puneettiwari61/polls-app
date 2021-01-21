import React, { useEffect, useState } from "react";
import Signup from "./Authentication/Signup";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // initializeLogger();
    // setAuthHeaders(setLoading);
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
      </Switch>
    </Router>
  );
};

export default App;