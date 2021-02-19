import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import UserContext from "../UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../utils/ErrorNotice";
import Register from "./Register";
import { authToken } from "../utils/AuthToken";

const loginFormStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  modal: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
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

  submit: {
    cursor: "pointer",
  },
}));

export default function LoginForm({ isLoginOpen, handleCloseModal }) {
  const classes = loginFormStyles();
  // const url = "http://localhost:5000/users/";
  const history = useHistory();

  //set state for login
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();

  //set state for registerModal
  const [registerOpen, registerIsOpen] = React.useState(false);

  //get Context and history

  const { setUserData } = React.useContext(UserContext);

  //functions to handle sumbit for login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await axios.post("/users/login", loginUser, authToken);
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

  const handleRegisterOpen = () => {
    registerIsOpen(true);

    handleCloseModal(false);
  };

  const handleClose = () => {
    handleCloseModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isLoginOpen || false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={isLoginOpen}>
          <div className={classes.paper}>
            <CssBaseline />

            <IconButton
              color="inherit"
              aria-label="close modal"
              edge="start"
              onClick={handleClose}
              className={classes.cancelButton}
            >
              <CancelIcon />
            </IconButton>
            <Typography component="h1" variant="h4">
              Login
            </Typography>

            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username "
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <p>Sign in with <strong>Email:</strong> user@user.com <strong>Password: </strong> password to see a demo</p>
              <Grid container>
                <Grid item xs>
                  <Button className={classes.signInButton}>
                    Forgot password?
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.signInButton}
                    onClick={handleRegisterOpen}
                  >
                    {"Sign Up"}
                  </Button>
                </Grid>
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
      <Register
        registerFormOpen={registerOpen}
        closeRegisterForm={() => registerIsOpen(false)}
      />
    </div>
  );
}
