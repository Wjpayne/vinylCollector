import { Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";

import { releases } from "./ReleaseData";

const newReleaseStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "white",
    height: "540px",
    overflow: "auto",

    [theme.breakpoints.down("xs")]: {
      height: "675px",
    },
    overflowX: "hidden"
  },

  date: {
    fontSize: "17px",
    color: "#989898",
    marginLeft: "30px",
    cursor: "default",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      marginLeft: "2px"
    },
  },
  divider: {
    borderTop: ".5px solid",
    width: "98%",
    position: "relative",
    left: "1%",
    color: "lightgrey",
  },

  div: {
    overflow: "auto",
    borderRadius: "5px",
    height: "540px",
  },

  title: {
    color: "white",
    textAlign: "center",
    cursor: "default",
  },

  titleDiv: {
    color: "grey",
    borderTop: "10px",
    position: "relative",
  },

  bold: {
    fontSize: "17px",
    cursor: "default",
  [theme.breakpoints.down("xs")]: {
    fontSize: "15px",
  },
  
  },

  
}));

export default function NewReleases() {
  const classes = newReleaseStyles();

  return (
    
    <div className = {classes.hide}>
      <h1 className={classes.title}>New Releases</h1>

      <div className={classes.div}>
        {releases.map((item, i) => (
          
          <Paper key = {i}>
            <div>
              <Grid key={i} container direction="row" spacing={2}>
                <Grid item xs={3} className={classes.grid}>
                  <h1 className={classes.date}>{item.date}</h1>
                </Grid>
                <Grid item xs={3}>
                  <h1 className={classes.bold}>{item.band}</h1>
                </Grid>
                <Grid item xs={3}>
                  <h1 className={classes.bold}>{item.album}</h1>
                </Grid>
                <Grid item xs={3}>
                  <h1 className={classes.date}>{item.label}</h1>
                </Grid>
              </Grid>
              <Divider className={classes.divider} varitant="middle" />
            </div>
          </Paper>
          
        ))}
      </div>
    </div>
    
  );
}
