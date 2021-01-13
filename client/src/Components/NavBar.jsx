import React from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import Login from "./Login";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useHistory} from "react-router-dom"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  title: {
    display: "none",
    color: "white",
    fontSize: "1.5em",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "15ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    backgroundColor: "black",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  drawerTitle: {
    textAlign: "center",
    fontSize: "20px",
  },

  login: {
    color: "white",
    margin: "20px",
  },

  go: {
    color: "white",
    marginLeft: "-30px",
  },
}));

export default function NavBar({ isModalOpen, setModalOpen }) {
  // set state
  const classes = useStyles();
  const theme = useTheme();
  const [open, drawerOpen] = React.useState(false);

  // handle functions for state

  const handleOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDrawerOpen = () => {
    drawerOpen(!open);
  };

  const handleDrawerClose = () => {
    drawerOpen(false);
  };

  // useContext for userData

  const { userData, setUserData } = React.useContext(UserContext);
  
  const history = useHistory()

  const logOut = () => {
  

    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/")

  };

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Button component={Link} to="/" className={classes.title}>
            THE BLAST BEAT
          </Button>
          {userData.user ? (
              <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />

              </div>

              <Button component = {Link} to = "/search"className={classes.go}>GO</Button>
              </>

              
          
          ) : (
            <div></div>
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userData.user ? (
              <Button
                button
                onClick={() => logOut()}
                className={classes.login}
              >
                Log out {userData.user.displayName}
              </Button>
            ) : (
              <>
                <Button className={classes.login} onClick={() => handleOpen()}>
                  Login/Signup
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Button className={classes.drawerTitle} component={Link} to="/">
          THE BLAST BEAT
        </Button>
        <Divider />
        <List>
          {userData.user ? (
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                {" "}
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          ) : (
            <ListItem button onClick={() => handleOpen(true)}>
              <ListItemIcon>
                {" "}
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Login/Signup</ListItemText>
            </ListItem>
          )}
          {userData.user ? (
            <ListItem button   onClick={() => logOut()}>
              <ListItemIcon>
                {" "}
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItem>
          ) : (
            <div></div>
          )}

          {userData.user ? (
            <ListItem button>
              <ListItemIcon>
                {" "}
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText>Favorites</ListItemText>
            </ListItem>
          ) : (
            <div></div>
          )}
        </List>
        <Divider />
      </Drawer>

      <Login handleCloseModal={() => setModalOpen(false)}></Login>
    </div>
  );
}
