import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import { DashBoard } from "./containers/DashBoard/DashBoard";
import Login from "./containers/Login/Login";

const AppRoutes = () => (
  <Router>
    <Route path="/" exact component={Login} />
    <Route path="/chat" exact component={DashBoard} />
  </Router>
);

export default AppRoutes;
