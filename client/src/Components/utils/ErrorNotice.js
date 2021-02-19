import React from "react";

import { makeStyles, fade } from "@material-ui/core/styles";

const errStyles = makeStyles((theme) => ({
  center: {
    margin: "auto",
    textAlign: "center",
    marginTop: "20px",
    color: "white",
    backgroundColor: "red",
    borderRadius: "5px",
  },

  errButton: {
    background: "none",
    border: "none",
    marginLeft: "5px",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "15px",
    color: "white",
    position: "relative",
    top: "1.1px",
    outline: "none",
  },
}));

export default function ErrorNotice({ showError, clearError }) {
  const classes = errStyles();

  return (
    <div className={classes.center}>
      <span>{showError}</span>
      <button className={classes.errButton} onClick={clearError}>
        X
      </button>
    </div>
  );
}
