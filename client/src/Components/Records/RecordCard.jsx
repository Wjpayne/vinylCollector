import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";


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

  favoriteOn: {
    float: "right",
    top: "238px",
    right: "20px",
  },
}));

export default function RecordCard(props) {
  const classes = recordCardStyles();
  const {
    element,
    editRecord,
    deleteRecord,
    addFavorites,
  } = props;

  const { _id, title, artist, rating, genre, description } = element;

  return (
    <Grid key={element._id} item xs={12} sm={8} md={5} lg={4} xl={2} >
      <Card className={classes.root}>
        <>
          <Button
            onClick={() =>
              addFavorites(_id, title, artist, rating, genre, description)
            }
            className={classes.favoriteOn}
          >
            ADD FAVORITE
          </Button>
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
            {element.title}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Artist: {element.artist}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Label: {element.rating}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Genre: {element.genre}
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Description: {element.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
