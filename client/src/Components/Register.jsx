import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";

const registerFormStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  modal: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paperRegister: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40vh",
    maxHeight: "60vh",
    left: "50%",
    position: "absolute",
    outline: "none",
    transform: "translateX(-50%)",
  },

  container: {
    position: "absolute",
    minHeight: "50vh",
    top: "250px",
    width: "100%",
  },

  cancelButton: {
    float: "right",
  },

  avatar: {
    bakckgroundColor: "black",
  },
}));

export default function Register({ registerFormOpen, closeRegisterForm }) {
  const classes = registerFormStyles();

  //set State for register form
  
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordCheck, setPasswordCheck] = React.useState();
  const [displayName, setDisplayName] = React.useState();
  const [error, setError] = React.useState();

  //get context and history

  const { setUserData } = React.useContext(UserContext);
  const history = useHistory();

  //handle submit register

  const registerSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await axios.post("/users/register", newUser);
      const loginRes = await axios.post("/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/profile");
      window.location.reload();
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={registerFormOpen || false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={registerFormOpen}>
          <div className={classes.paperRegister}>
            <CssBaseline />

            <IconButton
              color="inherit"
              aria-label="close modal"
              edge="start"
              onClick={closeRegisterForm}
              className={classes.cancelButton}
            >
              <CancelIcon />
            </IconButton>
            <Typography component="h1" variant="h4">
              Register
            </Typography>

            <form className={classes.form} noValidate onSubmit={registerSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="current-email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Re-enter password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>

              <Grid container>
                <Grid item xs></Grid>
              </Grid>
              {error && (
                <ErrorNotice
                  showError={error}
                  clearError={() => setError(undefined)}
                />
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
