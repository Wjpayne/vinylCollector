import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Components/Profile";
import Main from "./Components/Main";
import UserContext from "./Components/UserContext";
import SearchResults from "./Components/SearchResults";
import axios from "axios";

function App() {
  const [userData, setUserData] = React.useState({
    token: "",
    user: "",
  });

  // see if user is logged in already, if not set a token and userData

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
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

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={SearchResults} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
