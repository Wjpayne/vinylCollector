import { Grid, makeStyles, Hidden } from "@material-ui/core";
import React from "react";
import Bandcamp from "./Bandcamp";
import Featured from "./Featured";
import NewReleases from "./NewReleases";
import BandCampCarousel from "./BandCampCarousel";

const articleStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "black",
    width: "100%",
  },

  newReleases: {
    marginTop: "100px",
  },

  grid: {},
}));

export default function Articles() {
  const classes = articleStyles();
  return (
    <div className={classes.main}>
      <Grid
        className={classes.grid}
        container
        alignItems="center"
        justify="center"
      >
        <Hidden smDown>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <Bandcamp />
          </Grid>
        </Hidden>

        <Hidden smDown>
          <Grid item xs={12} sm = {10} md = {7} lg = {5} xl = {4}>
            <Featured />
            <div className={classes.newReleases}>
              <NewReleases />
            </div>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
            <Featured />
            <NewReleases />
            <BandCampCarousel />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
