import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import NewReleases from "./NewReleases";

const newReleaseStyles = makeStyles(() => ({


  main: {
      backgroundColor: "black"
  }
}));

export default function Articles() {
  const classes = newReleaseStyles();
  return (
    <div className = {classes.main}>
      <Grid container justify="center" alignItems="center" direction="row" spacing={8}>
        <Grid  item xs={9} justify="center">
          <NewReleases />
        </Grid>
        <Grid  item xs={9} >
          <Paper className={classes.paper}>hey</Paper>
        </Grid>
        <Grid  item xs={9} >
          <Paper className={classes.paper}>hey</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
