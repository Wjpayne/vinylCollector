import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./Components/Profile";
import Main from "./Components/Main";
import UserContext from "./Components/UserContext";
import SearchResults from "./Components/SearchResults";


function App() {
  const [userData, setUserData] = React.useState({
    token: "",
    user: "",
  });



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
