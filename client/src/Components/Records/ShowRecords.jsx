import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EditRecords from "./EditRecords";
import AddRecord from "./AddRecord";
import { authToken } from "../utils/AuthToken";
import Favorites from "../Favorites/Favorites";
import RecordCard from "./RecordCard";
import NavBar from "../Pages/NavBar";

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
    top: "220px",
    left: "30px",
  },
}));

export default function ShowRecords() {
  const classes = recordFormStyles();
  // const url = " http://localhost:5000";

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

  //set Search state and seach functions

  const [search, setSearch] = React.useState("")

  const [filter, setFilter] = React.useState([])

  React.useEffect(() => {
    setFilter(
      newRecords.filter((element) =>
        element.artist.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, newRecords]);



  const handleSearch = (e) => {
    setSearch(e.target.value)
  }



  // add favorite functions



  const addFavorites = async (
    _id,
    title,
    artist,
    rating,
    genre,
    description,
    isFavorite
  ) => {
    const favorites = {
      userId: _id,
      title,
      artist,
      rating,
      genre,
      description,
      isFavorite,
    };

      await axios.post(
      "/favorite/add",
      favorites,
      authToken
    );

 
  };

  const deleteFavorite = async (title) => {
    await axios.delete("/favorite/delete", {
      data: { title: title },
      authToken,
    });
  };

  //functions to control state of modals

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
    const result = await axios.get("/record/get", authToken);

    const sorted = result.data.sort((a, b) => a.artist.localeCompare(b.artist));
    newRecordData(sorted);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // delete records

  const deleteRecord = async (_id) => {
    const deleteRecords = {
      _id: _id,
    };

    await axios.delete("/record/" + _id, deleteRecords).then((result) => {
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
  };

  //functions for setting favorite state and color and post request to add favorite

  return (
    <div>
      {/* set props */}

      <NavBar 
      handleSearch = {handleSearch}
      />

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
        // editUrl={url}
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
        <Grid container spacing={8} style={{ padding: 80 }} justify="center">
          {filter.length > 0 &&
            filter.map((element) => (
              <RecordCard
                key={element._id}
                element={element}
                editRecord={editRecord}
                deleteRecord={deleteRecord}
                addFavorites={addFavorites}
                deleteFavorite={deleteFavorite}
              />
            ))}
        </Grid>
      </div>
    </div>
  );
}
