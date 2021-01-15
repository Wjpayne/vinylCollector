import {  Grid, makeStyles} from "@material-ui/core";
import React from "react";
import Featured from "./Featured";
import NewReleases from "./NewReleases";

const articleStyles = makeStyles(() => ({
  main: {
    backgroundColor: "black",
    margin: "0"
  },

  newReleases: {
    marginTop: "100px"
  }
}));

export default function Articles() {
  const classes = articleStyles();
  return (
    <div className={classes.main}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        spacing={8}
      >
        <Grid item xs={12} sm = {10} md = {7} lg = {6} xl = {5} justify="center">
          <Featured />
          <div className = {classes.newReleases}>
          <NewReleases />
          </div>
        </Grid>



      </Grid>
    </div>
  );
}
