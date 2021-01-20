import React from "react";
// import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { Button, makeStyles } from "@material-ui/core";
// import StarRateIcon from "@material-ui/icons/StarRate";
import { authToken } from "./AuthToken";
import axios from "axios";

const buttonStyles = makeStyles((theme) => ({
  favoriteOff: {
    float: "right",
    bottom: "-150px"
    
  },

  favoriteOn: {
    float: "right",
    bottom: "-206px"
    
  },

  favoriteYellow: {
    fontSize: "40px",
    color: "#ffb81c",
  },

  favoriteGrey: {
    fontSize: "40px",
    color: "grey",
  },
}));

export default function FavoriteButton({
  _id,
  title,
  artist,
  rating,
  genre,
  description,
}) {
  //state for favorites
  // const [click, handleClick] = React.useState(false);

  const [favorite, setFavorite] = React.useState([]);

  //get favorites

  const fetchData = async () => {
    const result = await axios.get(
      "/get",
      authToken
    );

    setFavorite(result);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  //add favorites
  const addFavorites = () => {
    const favorites = {
      userId: _id,
      title,
      artist,
      rating,
      genre,
      description,
    };

    axios
      .post("/add", favorites, authToken)
      .then((response) => {
        setFavorite(response);
      });

    fetchData();
    localStorage.setItem("favorite", JSON.stringify(favorite));

    // handleClick(true);
  };

  // delete favorite

  // const deleteFavorite = async () => {
  //  await axios.delete("http://localhost:5000/favorite/delete", {
  //     data: { title: title },
  //     authToken,
  //   });

  //   handleClick(false);
  // };

  const classes = buttonStyles();

  return (
    <div>
      {/* {click === false ? (
        <IconButton onClick={addFavorites} className={classes.favoriteOff}>
          {" "}
          <StarOutlineIcon className={classes.favoriteGrey} />{" "}
        </IconButton>
      ) : (
        <IconButton onClick={deleteFavorite} className={classes.favoriteOn}>
          {" "}
          <StarRateIcon className={classes.favoriteYellow} />
        </IconButton>
      )} */}

      <Button onClick={addFavorites} className = {classes.favoriteOn}>ADD FAVORITE</Button>


    </div>
  );
}
