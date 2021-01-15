import {  Grid, makeStyles} from "@material-ui/core";
import React from "react";
import NewReleases from "./NewReleases";

const newReleaseStyles = makeStyles(() => ({
  main: {
    backgroundColor: "black",
  },
}));

export default function Articles() {
  const classes = newReleaseStyles();
  return (
    <div className={classes.main}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        spacing={8}
      >
        <Grid item xs={12} sm = {10} md = {7} lg = {5} xl = {4} justify="center">
          <NewReleases />
        </Grid>

      </Grid>
    </div>
  );
}
