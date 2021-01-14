import React from "react";
import Carousel from 'react-material-ui-carousel';
import {makeStyles, Paper} from '@material-ui/core';

const newReleaseStyles = makeStyles(() => ({

    paper: {
        backgroundColor: "white",
        height: "350px",
        minWidth: "300px"
      },

}))

export default function NewReleases() {

    


  var items = [
    { 
      
      artist: "Touchè Amorè",
      album: "Lament",
      
    },
    {
      artist: "Random Name #2",
      album: "Hello World!",
    },
  ];
  return (
    <Carousel autoPlay = {false} swipe = {true}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
    const classes = newReleaseStyles()
  return (
    <Paper className  = {classes.paper}>
      <h2>{props.item.artist}</h2>
      <p>{props.item.album}</p>

     
    </Paper>
  );
}
