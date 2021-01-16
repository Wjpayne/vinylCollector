import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import BandcampPlayer from "react-bandcamp";

const bandCampStyles = makeStyles((theme) => ({
  paper: {
    height: "2000px",
    overflow: "hidden",
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
    borderTop: ".5px solid",
    width: "98%",
    position: "relative",
    left: "1%",
    color: "lightgrey",
  },

  bold: {
    fontSize: "17px",
  },

  div: {
    overflow: "scroll",
    borderRadius: "5px",
    height: "1298px",
  },

  scroll: {
    overflow: "scroll",

  },

  title: {
    color: "white",
    textAlign: "center",
  },

  titleDiv: {
    color: "grey",
    borderTop: "10px",
    position: "relative",
  },

  bandcampLeft: {
    float: "left",
    marginTop: "20px",
    marginLeft: "20px"
  },

  bandcampRight: {
    float: "right",
    marginTop: "20px",
    marginRight: "20px"
  },
}));

export default function Bandcamp() {
  const classes = bandCampStyles();
  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
          <div className = {classes.scroll}>
        <div className={classes.bandcampLeft}>
          <BandcampPlayer
            album="3240541995"
            size="large"
            artwork="big"
            height="300px"
          />
        </div>
        <div className={classes.bandcampRight}>
          <BandcampPlayer
            album="4150343011"
            size="large"
            artwork="big"
            height="300px"
          />
        </div>
        <div className={classes.bandcampLeft}>
          <BandcampPlayer
            album="1250670259"
            size="large"
            artwork="big"
            height="300px"
          />
        </div>
        <div className={classes.bandcampRight}>
          <BandcampPlayer
            album="2079579668"
            size="large"
            artwork="big"
            height="300px"
          />
        </div>
        <div className={classes.bandcampLeft}>
          <BandcampPlayer
            album="2636761936"
            size="large"
            artwork="big"
            height="300px"
          />
        </div>

        <div className={classes.bandcampRight}>
          <BandcampPlayer
            album="14353457"
            size="large"
            artwork="big"
            height="300px"
          />
        </div>
        </div>
        


      </Paper>
    </div>
  );
}
