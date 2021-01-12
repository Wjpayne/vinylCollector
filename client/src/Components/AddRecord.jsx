import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";
import { authToken }  from "./AuthToken"

const recordFormStyles = makeStyles((theme) => ({
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
    maxHeight: "85vh",
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

export default function AddRecord({
  //props

  isAddModalOpen,
  handleIsAddModalClose,
  handleIsAddModalOpen,
  refreshRecordData,
}) {
  const classes = recordFormStyles();
  const url = "http://localhost:5000/record/add";

  //set intial state

  const initialState = {
    displayName: "",
    _id: "",
    title: "",
    artist: "",
    rating: "",
    genre: "",
    description: "",
  };

  //set state for adding records

  const [addRecord, addRecordData] = React.useState({ initialState });

  //functions for controlling onchange and submit/post request

  const handleChange = (e) => {
    addRecordData({ ...addRecord, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    handleIsAddModalOpen(false);
    e.preventDefault();

    const records = {
      userId: addRecord.userId,
      title: addRecord.title,
      artist: addRecord.artist,
      rating: addRecord.rating,
      genre: addRecord.genre,
      description: addRecord.description,
    };

    await axios
      .post("/record/add", records, authToken)
      .then((response) => {
        addRecordData({
          userId: "",
          title: "",
          artist: "",
          rating: "",
          genre: "",
          description: "",
        });
      });

    //refresh data

    const fetchData = async () => {
      const result = await axios.get("/record/get", authToken);
      refreshRecordData(result.data);
    };

    fetchData();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isAddModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={isAddModalOpen}>
          <div className={classes.paper}>
            <CssBaseline />

            <IconButton
              color="inherit"
              aria-label="close modal"
              edge="start"
              onClick={handleIsAddModalClose}
              className={classes.cancelButton}
            >
              <CancelIcon />
            </IconButton>
            <Typography component="h1" variant="h4">
              Add Record
            </Typography>

            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="title "
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={addRecord.title || ""}
              onChange={handleChange}
            />
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="artist "
              label="Artist"
              name="artist"
              autoComplete="artist"
              autoFocus
              value={addRecord.artist || ""}
              onChange={handleChange}
            />
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="rating "
              label="Rating"
              name="rating"
              autoComplete="rating"
              autoFocus
              value={addRecord.rating || ""}
              onChange={handleChange}
            />
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="genre "
              label="Genre"
              name="genre"
              autoComplete="genre"
              autoFocus
              value={addRecord.genre || ""}
              onChange={handleChange}
            />
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="description "
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
              value={addRecord.description || ""}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Add Record
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
