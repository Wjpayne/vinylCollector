import React from "react";
import Carousel from "react-material-ui-carousel";
import { Divider, Grid, makeStyles, Paper } from "@material-ui/core";

const newReleaseStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "white",
    height: "520px",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      height: "550px",
      
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
  },

  h2: {
    textAlign: "center",
    marginTop: "0",
    marginBottom: "0",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },

  h3: {
    margin: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14.5px",
    },
  },

  div: {
    width: "250px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },
  },

  divDesc: {
    position: "relative",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    marginTop: "0",
    marginBottom: "0",
  },

  divider: {
    borderTop: "2px solid",
    width: "80%",
    position: "relative",
    left: "10%",
  },
}));

export default function NewReleases() {
  var items = [
    {
      image:
        "https://www.angryyoungandpoor.com/store/pc/catalog/products/lp/EPT877191BLUlp.jpg",
      artist: "Touchè Amorè",
      album: "Lament",
      description:
        "Touché Amoré has been burrowing through angst, alienation, cancer, and death throughout four adored studio albums. After over a decade of working through darkness, the band’s gorgeously gruff fifth album, Lament, finds the light at the end of the tunnel. Through 11 songs, Touché Amoré looks back at its past and uses hard-won optimism to point its fans toward light, and love.",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0635/1427/products/IMG_7981_540x.jpg?v=1604610464",
      artist: "SOUL GLO",
      album: "Songs to Yeet At The Sun",
      description:
        "Songs to Yeet at the Sun is destructive and abrasive hardcore that nonetheless feels utopian. Yeet rushes forward as if written in real time, slices of life that give voice to the marginalized—Black, queer, trans, musicians, “non-essential workers”—and make them feel accessible to anyone who doesn’t immediately identify.",
    },

    {
      image:
        "http://www.earsplitcompound.com/site/wp-content/uploads/2018/08/GULCH_4559-photo-by-Gabe-Becerra-1024x745.jpg",
      artist: "Gulch",
      album: "Impenetrable Cerebral Fortress",
      description:
        "There is so much happening in this wild 16-minute ride of an album. Mysterious Santa Cruz berserkers Gulch bring the icy grandeur of Mayhem, the erratic bloodthirst of Nails, the adrenalized speed of Infest, and a whole lot else. Gulch find strength in anxiety and anger in fear, twisting generations of punk and hardcore and metal into one idiosyncratic personal blur.",
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
  const classes = newReleaseStyles();
  return (
    <Paper className={classes.paper}>
      <h1 className={classes.title}>Featured Records</h1>
      <Divider className={classes.divider} />
      <Grid container>
        <Grid item sm={5} xs={5} md = {5} lg = {5}>
          <img alt = "vinyl or album cover" className={classes.image} src={props.item.image}></img>
          <div className={classes.div}>
            <h1 className={classes.h1}>{props.item.artist}</h1>
            <h2 className={classes.h2}>{props.item.album}</h2>
          </div>
        </Grid>
        <Grid item sm={7} xs={7} md= {7} lg ={7}>
          <div className={classes.divDesc}>
            <h3 className={classes.h3}>{props.item.description}</h3>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
