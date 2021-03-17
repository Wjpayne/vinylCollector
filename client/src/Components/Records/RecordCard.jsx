import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from '@material-ui/icons/Star';

const recordCardStyles = makeStyles((theme) => ({
  root: {
    height: "280px",
    width: "300px",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      left: "50%",
      transform: "translateX(-45%)",
    },
  },
  cardsContainer: {
    backgroundColor: "black",
    color: "black",
    paddingTop: "100px",
  },

  addButton: {
    backgroundColor: "white",
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },

  button: {
    top: "240px",
  },

  favoriteOff: {
    float: "right",
    top: "220px",
    right: "20px",
  },

  favoriteStarOff: {
    fontSize: "40px",
    color: "#FFc30b"
  },

  favoriteOn: {
    float: "right",
    top: "220px",
    right: "20px",
  },

  favoriteStarOn: {
    fontSize: "40px",
  },
}));

export default function RecordCard(props) {
  const classes = recordCardStyles();
  const {
    element,
    editRecord,
    deleteRecord,
    addFavorites,
    deleteFavorite,
  } = props;

  const { _id, title, artist, rating, genre, description, favorite } = element;

  return (
    <Grid key={element._id} item xs={12} sm={8} md={5} lg={4} xl={2}>
      <Card className={classes.root}>
        <>
          {favorite === "true" ? (
            <IconButton
              className={classes.favoriteOff}
              onClick={() =>
                deleteFavorite(_id, title, artist, rating, genre, description)
              }
            >
              <StarIcon className={classes.favoriteStarOff} />
            </IconButton>
          ) : (
            <IconButton
              className={classes.favoriteOn}
              onClick={() =>
                addFavorites(_id, title, artist, rating, genre, description)
              }
            >
              <StarBorderIcon className={classes.favoriteStarOn} />
            </IconButton>
          )}

          <Button
            onClick={() =>
              editRecord(_id, title, artist, rating, genre, description)
            }
            size="small"
            color="inherit"
            className={classes.button}
          >
            Edit
          </Button>
          <Button
            onClick={() =>
              deleteRecord(_id, title, artist, rating, genre, description)
            }
            size="small"
            color="inherit"
            className={classes.button}
          >
            Delete
          </Button>
        </>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Artist: {artist}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Label: {rating}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Genre: {genre}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Description: {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
