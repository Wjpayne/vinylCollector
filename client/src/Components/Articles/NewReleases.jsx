import { Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";

import { releases } from "./ReleaseData";

const newReleaseStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "white",
    height: "540px",
    overflow: "hidden",
    backgroundColor: "white",
    [theme.breakpoints.down("xs")]: {
      height: "675px",
    },
  },

  date: {
    fontSize: "17px",
    color: "#989898",
    marginLeft: "30px",
  },
  divider: {
    borderTop: "1px solid",
    width: "100%",
    position: "relative",
  },

  bold: {
    fontSize: "17px",
  },

  div: {
    overflow: "scroll",
    borderRadius: "5px",
    height: "540px"
  }
}));

export default function NewReleases() {
  const classes = newReleaseStyles();

  return (
    <div className={classes.div}>
      {releases.map((item, i) => (
        <Paper>
          <div>
            <Grid key={i} container direction="row" spacing={2}>
              <Grid item xs={3}>
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
          </div>
        </Paper>
      ))}
    </div>
  );
}
