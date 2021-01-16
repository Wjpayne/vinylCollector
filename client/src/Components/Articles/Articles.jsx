import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Bandcamp from "./Bandcamp";
import Featured from "./Featured";
import NewReleases from "./NewReleases";

const articleStyles = makeStyles(() => ({
  main: {
    backgroundColor: "black",
    margin: "0",
  },

  newReleases: {
    marginTop: "100px",
  },
}));

export default function Articles() {
  const classes = articleStyles();
  return (
    <div className={classes.main}>
      <Grid container justify = "center" spacing={8}>
        <Grid item xs={4} lg = {3} xl ={3}>
          <Bandcamp />
        </Grid>
        
        
        <Grid item xs={6} >
          <Featured />
          <div className={classes.newReleases}>
          <NewReleases />
          </div>
        </Grid>

        </Grid>
     
      
    </div>
  );
}
