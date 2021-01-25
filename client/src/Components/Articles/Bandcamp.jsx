import { Divider, makeStyles, Paper, Grid } from "@material-ui/core";
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


  bold: {
    fontSize: "17px",
  },

  div: {
    overflow: "auto",
    borderRadius: "5px",
    height: "1300px",
    marginRight: "30px",
    
  },

  scroll: {
    overflowY: "hidden !important",
    "&:hover": {
    overflowY: "auto !important"
  },

  title: {
    color: "black",
    textAlign: "center",
    marginTop: "1px"
  },

  titleDiv: {
    color: "grey",
    borderTop: "10px",
    position: "relative",
  },


  divider: {
    borderTop: "2px solid",
    width: "80%",
    position: "relative",
    left: "10%",
    top: "-21px"
  },

  grid: {
    marginTop: "54px"
  }
}));

export default function Bandcamp() {
  const classes = bandCampStyles();
  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
      <h1 className={classes.title}>Staff Favorites</h1>
      <Divider className={classes.divider} />
        <Grid container direction = "row" justify = "center" spacing = {8}> 
        <div className={classes.scroll}>
          <div className = {classes.grid}>
          <Grid item>
         
            <BandcampPlayer
              album="3240541995"
              size="large"
              artwork="big"
              height="300px"
            />
         
          </Grid>
            <Grid item>
            <BandcampPlayer
              album="4150343011"
              size="large"
              artwork="big"
              height="300px"
            />
            </Grid>
        
            <Grid item>
            <BandcampPlayer
              album="1250670259"
              size="large"
              artwork="big"
              height="300px"
            />
            </Grid>
            <Grid item>
       
            <BandcampPlayer
              album="2079579668"
              size="large"
              artwork="big"
              height="300px"
            />
            </Grid>
            <Grid item>
     
            <BandcampPlayer
              album="2636761936"
              size="large"
              artwork="big"
              height="300px"
            />
            </Grid>
            <Grid item>
            <BandcampPlayer
              album="14353457"
              size="large"
              artwork="big"
              height="300px"
            />
            </Grid>
            </div>
       
        </div>
        </Grid>
      </Paper>
    </div>
  );
}
