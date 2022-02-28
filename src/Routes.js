import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ChatDashBoard } from "./containers/ChatDashBoard/ChatDashBoard";
import Login from "./containers/Login/Login";

const AppRoutes = () => (
  <Router>

      <Route path="/login" exact component={Login} />
      <Route path="/chat" exact component={ChatDashBoard} />
  </Router>
);

export default AppRoutes;
