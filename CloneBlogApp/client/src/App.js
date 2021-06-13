import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/register">{user.user ? <Homepage /> : <Register />}</Route>
        <Route path="/login">{user.user ? <Homepage /> : <Login />}</Route>
        <Route path="/write">{user.user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user.user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
