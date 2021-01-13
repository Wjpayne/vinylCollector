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
import UserContext from "./UserContext";

const recordFormStyles = makeStyles((theme) => ({
  root: {
    height: "225px",
    "&:hover": {
      cursor: "pointer",
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

  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40vh",
    height: "45vh",
    left: "50%",
    position: "absolute",
    outline: "none",
    transform: "translateX(-50%)",
    top: "20%",
  },

  cancelButton: {
    float: "right",
  },
}));

export default function ShowRecords() {
  const classes = recordFormStyles();
  const url = " http://localhost:5000/record";

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

  const { setUserData } = React.useContext(UserContext);

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

  // see if user is logged in already, if not set a token and userData

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = null;
    }
    const tokenRes = await axios.post("/users/tokenIsValid", null, {
      headers: { "x-auth-token": token },
    });
    if (tokenRes.data) {
      const userRes = axios.get("/users", {
        headers: { "x-auth-token": token },
      });
      setUserData({
        token: userRes.data.token,
        user: userRes.data.user
      });
      console.log(userRes.data)
    }
  };

  //fetch record data

  const fetchData = async () => {
    const result = await axios.get("record/get", authToken);
    newRecordData(result.data);
    console.log(result.data.userId);
  };

  React.useEffect(() => {
    checkLoggedIn();
    fetchData();

    console.log("data");
  }, []);

  // delete records

  const deleteRecord = async (_id) => {
    const deleteRecords = {
      _id: newRecords._id,
      title: newRecords.title,
      artist: newRecords.artist,
      rating: newRecords.rating,
      genre: newRecords.genre,
      description: newRecords.description,
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

  return (
    <div>
      {/* set props */}
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
                <Card className={classes.root} key={element.userId}>
                  <CardContent className={classes.card}>
                    <Typography gutterBottom variant="h6">
                      {element.title}
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Artist: {element.artist}
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Rating: {element.rating}
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Genre: {element.genre}
                    </Typography>
                    <Typography variant="body2" color="inherit" component="p">
                      Description: {element.description}
                    </Typography>
                  </CardContent>

                  <CardActions>
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
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteRecord(element._id)}
                      size="small"
                      color="inherit"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}
