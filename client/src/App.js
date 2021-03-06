import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Components/Pages/Main";
import UserContext from "./Components/UserContext";
import axios from "axios";
import ShowRecords from './Components/Records/ShowRecords';

function App() {
  const [userData, setUserData] = React.useState({
    token: undefined,
    user: undefined,
    
  });

  // see if user is logged in already, if not set a token and userData

  const url = "http://localhost:5000";

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === undefined) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post( 
        url +  "/users/tokenIsValid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(url + "/users/get", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, [userData.token]);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/profile" component={ShowRecords} />
            
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
