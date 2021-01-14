import React from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/styles";
import ShowRecords from "./ShowRecords";

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

  
  return (
    <div>
      <NavBar />
      <div className={classes.container}>
        <ShowRecords />
      </div>
    </div>
  );
}
