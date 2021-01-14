import React from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/styles";
import ShowRecords from "./ShowRecords";
import UserContext from "./UserContext";
import axios from "axios"

const profileStyles = makeStyles((theme) => ({
  addButton: {
    color: "white",
    position: "absolute",
    left: "50%",
    top: "25%",
    transform: "translateX(-50%)",
    fontSize: "2em",
  },

  container: {
    width: "100%",
    margin: "auto",
    backgroundColor: "black",
    height: "1400px",
  },
}));

export default function Profile() {
  const classes = profileStyles();

  const [ setUserData ] = React.useContext(UserContext)

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
    <div>
      <NavBar />
      <div className={classes.container}>
        <ShowRecords />
      </div>
    </div>
  );
}
