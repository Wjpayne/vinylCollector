import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { authToken }  from "./AuthToken"

const editFormStyles = makeStyles((theme) => ({

  addButton: {
    backgroundColor: "white",
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    }
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

export default function EditRecords({
  //props

  editModalOpen,
  handleCloseEditModal,
  editUserId,
  editTitle,
  editArtist,
  editRating,
  editGenre,
  editDescription,
  editTitleState,
  editArtistState,
  editRatingState,
  editGenreState,
  editDescriptionState,
  editNewRecordData,
}) {
  const classes = editFormStyles();

  //function to control submit/edit records

  const updateUser = async (e) => {
    e.preventDefault();
    const editUser = {
      _id: editUserId,
      title: editTitle,
      artist: editArtist,
      rating: editRating,
      genre: editGenre,
      description: editDescription,
    };
    await axios
      .post("/update/" + editUserId, editUser, authToken)
      .then((res) => console.log(res.data));

    const fetchData = async () => {
      const result = await axios.get("/record/get", {
        headers: { "x-auth-token": localStorage.getItem("auth-token")},
      });
      editNewRecordData(result.data);
    };

    fetchData();

    handleCloseEditModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editModalOpen || false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={editModalOpen}>
          <div className={classes.paper}>
            <CssBaseline />

            <IconButton
              color="inherit"
              aria-label="close modal"
              edge="start"
              onClick={handleCloseEditModal}
              className={classes.cancelButton}
            >
              <CancelIcon />
            </IconButton>
            <Typography component="h1" variant="h4">
              Edit Record
            </Typography>

            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="title "
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={editTitle}
                onChange={(e) => editTitleState(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="artist "
                label="Artist"
                name="artist"
                autoComplete="artist"
                autoFocus
                value={editArtist}
                onChange={(e) => editArtistState(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="rating "
                label="Label"
                name="rating"
                autoComplete="rating"
                autoFocus
                value={editRating}
                onChange={(e) => editRatingState(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="genre "
                label="Genre"
                name="genre"
                autoComplete="genre"
                autoFocus
                value={editGenre}
                onChange={(e) => editGenreState(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="description "
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={editDescription}
                onChange={(e) => editDescriptionState(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={updateUser}
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
