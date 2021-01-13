import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Components/Profile";
import Main from "./Components/Main";
import UserContext from "./Components/UserContext";
import axios from "axios";
import SearchResults from "./Components/SearchResults";

function App() {
  const [userData, setUserData] = React.useState({
    token: false,
    user: null,
  });

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === false) {
        localStorage.setItem("auth-token", "");
        token = false;
      }
      const tokenRes = await axios.post(
        "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    console.log("check")

    checkLoggedIn();
  }, [userData.token]);
  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/profile" component={Profile} />
            <Route path = "/search" component = {SearchResults} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
