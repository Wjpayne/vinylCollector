import {  Grid, makeStyles} from "@material-ui/core";
import React from "react";
import Featured from "./Featured";

const articleStyles = makeStyles(() => ({
  main: {
    backgroundColor: "black",
    margin: "0"
  },
}));

export default function Articles() {
  const classes = articleStyles();
  return (
    <div className={classes.main}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        spacing={8}
      >
        <Grid item xs={12} sm = {10} md = {7} lg = {6} xl = {5} justify="center">
          <Featured />
        </Grid>

      </Grid>
    </div>
  );
}
