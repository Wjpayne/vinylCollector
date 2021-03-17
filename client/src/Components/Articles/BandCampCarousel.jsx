import React from "react";
import Carousel from "react-material-ui-carousel";
import { Divider, Grid, Hidden, makeStyles, Paper } from "@material-ui/core";
import BandcampPlayer from "react-bandcamp";

const featuredStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "white",
    height: "540px",
    overflow: "hidden",

    [theme.breakpoints.down("xs")]: {
      height: "600px",
    },
    marginTop: "150px",
  },

  image: {
    height: "250px",
    margin: "15px",
    width: "250px",
    objectFit: "cover",
    marginTop: "33px",
    [theme.breakpoints.down("sm")]: {
      height: "150px",
      width: "150px",
    },
  },

  h1: {
    textAlign: "center",
    marginTop: "0",
    marginBottom: "0",
    textDecoration: "underline",
    [theme.breakpoints.down("sm")]: {
      fontSize: "23px",
    },
    cursor: "default",
  },

  h2: {
    textAlign: "center",
    marginTop: "0",
    marginBottom: "0",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
    cursor: "default",
  },

  h3: {
    margin: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14.5px",
    },
    cursor: "default",
  },

  div: {
    width: "290px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "190px",
    },
  },

  divDesc: {
    position: "relative",
    justifyContent: "center",
    overflow: "scroll",
    height: "500px",
  },

  title: {
    textAlign: "center",
    marginTop: "0",
    marginBottom: "0",
    cursor: "default",
  },

  divider: {
    borderTop: "2px solid",
    width: "80%",
    position: "relative",
    left: "10%",
  },

  bandcampLeft: {
    float: "left",
    marginTop: "20px",
    marginLeft: "20px",
  },

  bandcampRight: {
    float: "right",
    marginTop: "20px",
    marginRight: "20px",
  },

  bandcampMobile: {
    marginTop: "20px",
  },
}));

export default function Featured() {
  var items = [
    {
      album: "3240541995",
    },

    {
      album: "4150343011",
    },
    {
      album: "1250670259",
    },
    {
      album: "2079579668",
    },
    {
      album: "2636761936",
    },
    {
      album: "14353457",
    },
  ];

  return (
    <Carousel autoPlay={false} swipe={true}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const classes = featuredStyles();
  return (
    <Paper className={classes.paper}>
      <h1 className={classes.title}>Staff Favorites</h1>
      <Divider className={classes.divider} />
      <Grid container justify="center">
        <Hidden xsDown>
          <Grid item xs={6}>
            <div className={classes.bandcampLeft}>
              <BandcampPlayer
                album={props.item.album}
                size="large"
                artwork="big"
                height="300px"
              />
            </div>
          </Grid>
        </Hidden>

        <Hidden smUp>
          <div className={classes.bandcampMobile}>
            <BandcampPlayer
              album={props.item.album}
           
              artwork="big"
              height="500px"
              width="250px"
            />
          </div>
        </Hidden>
      </Grid>
    </Paper>
  );
}
