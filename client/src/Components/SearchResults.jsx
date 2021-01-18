import React from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/styles";

const searchStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto",
    backgroundColor: "black",
    height: "1400px",
  },
}));

export default function SearchResults() {
  const classes = searchStyles();
  return (
    <div>
      <NavBar />
      <div className={classes.container}></div>
    </div>
  );
}