import {
  Card,
  Grid,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import axios from "axios";
import { authToken } from "./AuthToken";
import { CssBaseline } from "@material-ui/core";
import DeleteFavoriteButton from "./DeleteFavoriteButton";

const favoriteStyles = makeStyles((theme) => ({
  root: {
    height: "225px",
    color: "white",
    backgroundColor: "black",
    width: "300px",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      left: "50%",
      transform: "translateX(-45%)",
    },
    [theme.breakpoints.down("lg")]: {
      position: "relative",
      left: "50%",
      transform: "translateX(-45%)",
    },

    [theme.breakpoints.down("md")]: {
      position: "relative",
      left: "50%",
      transform: "translateX(-45%)",
    },

    [theme.breakpoints.down("xl")]: {
      position: "relative",
      left: "50%",
      transform: "translateX(-45%)",
    },
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100vh",
    height: "60vh",
    left: "50%",
    position: "absolute",
    outline: "none",
    transform: "translateX(-50%)",
    top: "20%",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
      width: "50vh",
    },
  },

  cancelButton: {
    float: "right",
  },

  favorite: {
    position: "absolute",
    fontSize: "50px",
    top: "0%",
  },
}));

export default function Favorites({ drawerClose, favoriteIsOpen, handleOpen }) {
  const classes = favoriteStyles();

  //state for favorites

  const [favoriteRecords, setFavoriteRecords] = React.useState([]);

  //handle modal close

  const handleModalClose = () => {
    handleOpen(false);
    drawerClose(false);
  };

  //get favorites on render

  const fetchData = async () => {
    const result = await axios.get(
      "/favorite/get",
      authToken
    );
    setFavoriteRecords(result.data);
    console.log(result);
  };

  React.useEffect(() => {
    fetchData();

    console.log("data");
  }, [favoriteIsOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={favoriteIsOpen || false}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus={true}
    >
      <Fade in={favoriteIsOpen}>
        <div className={classes.paper}>
          <CssBaseline />
          <IconButton
            color="inherit"
            aria-label="close modal"
            edge="start"
            onClick={handleModalClose}
            className={classes.cancelButton}
          >
            <CancelIcon />
          </IconButton>

          <Grid spacing={10} container justify="center">
            <Typography className={classes.favorite}>Favorites</Typography>
            {favoriteRecords.length > 0 &&
              favoriteRecords.map((element) => (
                <Grid
                  key={element._id}
                  item
                  xs={12}
                  md={6}
                  sm={8}
                  lg={6}
                  xl={5}
                >
                  <Card className={classes.root}>
                    <CardContent className={classes.card}>
                      <>
                        <DeleteFavoriteButton
                          title={element.title}
                          favoriteRecords={favoriteRecords}
                          setFavoriteRecords={setFavoriteRecords}
                        />
                      </>

                      <>
                        <Typography gutterBottom variant="h6">
                          {element.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="inherit"
                          component="p"
                        >
                          Artist: {element.artist}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="inherit"
                          component="p"
                        >
                          Label: {element.rating}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="inherit"
                          component="p"
                        >
                          Genre: {element.genre}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="inherit"
                          component="p"
                        >
                          Description: {element.description}
                        </Typography>
                      </>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}
