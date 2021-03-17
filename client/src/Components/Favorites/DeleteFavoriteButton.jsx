import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { authToken } from "../utils/AuthToken";
import axios from "axios";

const buttonStyles = makeStyles((theme) => ({
remove: {
  color: "black",
  backgroundColor: "white",
  float: "right",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
  bottom: "-160px",
}
}));

export default function FavoriteButton( {title, favoriteRecords, setFavoriteRecords} ) {

  const url = "http://localhost:5000";

    const deleteFavorite = async () => {
        axios.delete(url + "/favorite/delete", {
          data: { title: title },
          authToken,
        }).then((result) => { const refresh = favoriteRecords.filter((result) => result.title !== title)
        setFavoriteRecords(refresh)
        })
      };


  


  const classes = buttonStyles();

  return (
    <div>
      <Button onClick = {deleteFavorite} className = {classes.remove}>REMOVE</Button>
    </div>
  );
}
