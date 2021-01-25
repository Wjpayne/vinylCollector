import React from "react";
import Carousel from "react-material-ui-carousel";
import { Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import { items } from "./FeaturedData"

const featuredStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "white",
    height: "540px",
    overflow: "hidden",

    [theme.breakpoints.down("xs")]: {
      height: "675px",
    },
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
    overflow: "auto",
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
}));

export default function Featured() {

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
      <h1 className={classes.title}>Featured Records</h1>
      <Divider className={classes.divider} />
      <Grid container>
        <Grid item xs={6}>
          <img
            alt = "vinyl or album cover"
            className={classes.image}
            src={props.item.image}
          ></img>
          <div className={classes.div}>
            <h1 className={classes.h1}>{props.item.artist}</h1>
            <h2 className={classes.h2}>{props.item.album}</h2>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.divDesc}>
            <h3 className={classes.h3}>{props.item.description}</h3>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
