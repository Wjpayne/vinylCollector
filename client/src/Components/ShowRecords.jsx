import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditRecords from "./EditRecords";
import AddRecord from "./AddRecord";
import { authToken } from "./AuthToken";
import Favorites from "./Favorites";
import FavoriteButtonRecord from "./FavoriteButton";

const recordFormStyles = makeStyles((theme) => ({
  root: {
    height: "260px",
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
    float: "left",
    bottom: "-210px"
  }
}));

export default function ShowRecords() {
  const classes = recordFormStyles();
  const url = " http://localhost:5000/record";

  //get userData state to use in useEffect

  //set state for showing records in database and opening/closing modals

  const [newRecords, newRecordData] = React.useState([]);

  const [editOpen, handleEditModal] = React.useState(false);

  const [addModalOpen, handleAddModal] = React.useState(false);

  //set state for edit records

  const [title, setTitle] = React.useState("");

  const [artist, setArtist] = React.useState("");

  const [rating, setRating] = React.useState("");

  const [genre, setGenre] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [userId, setUserId] = React.useState("");

  //set state for favorite icon

  //functions to control state

  const handleAddModalOpen = () => {
    handleAddModal(true);
  };

  const handleCloseAddModal = () => {
    handleAddModal(false);
  };

  const handleIsEditModalClose = () => {
    handleEditModal();
  };

  //fetch record data

  const fetchData = async () => {
    const result = await axios.get(
      "/record/get",
      authToken
    );
    newRecordData(result.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // delete records

  const deleteRecord = async (_id) => {
    const deleteRecords = {
      _id: _id,
    };

    await axios
      .delete("/record/" + _id, deleteRecords)
      .then((result) => {
        const refresh = newRecords.filter((result) => result._id !== _id);
        newRecordData(refresh);
      });
  };

  //functions for controlling edit record state

  const editRecord = (_id, title, artist, rating, genre, description) => {
    setUserId(_id);
    setTitle(title);
    setArtist(artist);
    setRating(rating);
    setGenre(genre);
    setDescription(description);
    handleEditModal(true);

    console.log(title);
  };

  //functions for setting favorite state and color and post request to add favorite

  return (
    <div>
      {/* set props */}

      <Favorites />
      <AddRecord
        isAddModalOpen={addModalOpen}
        handleIsAddModalClose={handleCloseAddModal}
        addNewRecords={newRecords}
        handleIsAddModalOpen={handleAddModal}
        refreshRecordData={newRecordData}
      />
      <EditRecords
        editModalOpen={editOpen}
        handleCloseEditModal={handleIsEditModalClose}
        editUserId={userId}
        editTitle={title}
        editArtist={artist}
        editRating={rating}
        editGenre={genre}
        editDescription={description}
        editTitleState={setTitle}
        editArtistState={setArtist}
        editRatingState={setRating}
        editGenreState={setGenre}
        editDescriptionState={setDescription}
        editUrl={url}
        editFetchData={fetchData}
        editNewRecordData={newRecordData}
      />
      <Button
        className={classes.addButton}
        onClick={() => handleAddModalOpen(true)}
      >
        Add Record
      </Button>

      <div className={classes.cardsContainer}>
        <Grid container spacing={10} style={{ padding: "24px" }}>
          {newRecords.length > 0 &&
            newRecords.map((element) => (
              <Grid key={element._id} item xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card className={classes.root}>
                  <CardContent className={classes.content}>
                    <>
                      <Button
                        onClick={() =>
                          editRecord(
                            element._id,
                            element.title,
                            element.artist,
                            element.rating,
                            element.genre,
                            element.description
                          )
                        }
                        size="small"
                        color="inherit"
                        className={classes.button}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          deleteRecord(
                            element._id,
                            element.title,
                            element.artist,
                            element.rating,
                            element.genre,
                            element.description
                          )
                        }
                        size="small"
                        color="inherit"
                        className={classes.button}
                      >
                        Delete
                      </Button>
                      <FavoriteButtonRecord
                        key={element._id}
                        title={element.title}
                        artist={element.artist}
                        rating={element.rating}
                        genre={element.genre}
                        description={element.description}
                      />
                    </>
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

                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}
