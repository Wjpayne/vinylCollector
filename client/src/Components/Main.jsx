import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Svg from "./SVG/EqualizerSVG";
import Svg2 from "./SVG/EqualizerSVG2";
import NavBar from "./NavBar";
import Login from "./Login";
import Articles from "./Articles/Articles";

const mainStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto",
    backgroundColor: "black",
    height: "1000px",
  },

  title: {
    color: "white",
    textAlign: "center",
    paddingTop: "20vh",
    fontSize: "5em",
    cursor: "default"
  },

  titleDivider: {
    background: "white",
    width: "50%",
    margin: "auto",
  },

  description: {
    color: "white",
    textAlign: "center",
    paddingTop: "5vh",
    fontSize: "2em",
  },

  addLink: {
    backgroundColor: "white",
    left: "50%",
    transform: "translateX(-50%)",
    position: "relative",
    top: "30%",

    "&:hover": {
      backgroundColor: fade(theme.palette.common.black),
      color: "white",
    },
    [theme.breakpoints.down("xs")]: {
      top: "20%",
      position: "absolute"
    },
  },

  articles: {
    backgroundColor: "black",
    height: "1300px"
  }
}));

export default function Main() {
  const classes = mainStyles();

  const [isOpen, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
    <div className={classes.container}>
      <NavBar isModalOpen={isOpen} setModalOpen={() => setOpen(true)} />
      <Svg />
      <Typography className={classes.title}>THE BLAST BEAT</Typography>
      <Divider className={classes.titleDivider} />
      <Typography className={classes.description}>
        A place to curate and share your record collection
      </Typography>

      <Button onClick={() => handleOpen()} className={classes.addLink}>
        Start making your profile{" "}
      </Button>
      <Svg2 />
      <Login isLoginOpen={isOpen} handleCloseModal={() => setOpen(false)} />
     
    </div>
    <div className = {classes.articles}>
    <Articles />
    </div>
    </div>
    
  );
}
