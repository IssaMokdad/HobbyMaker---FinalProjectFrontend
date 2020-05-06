import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRequest, api } from "./Apis";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { Alert } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));
export default function ConfirmRegistration() {
  const classes = useStyles();
  const { token } = useParams();
  const [registerConfirm, setRegisterConfirm] = useState(null);

  useEffect(() => {
    fetchRequest(api + `api/auth/signup/activate/${token}`, "get").then(
      (response) => {
        if (response.email) {
          setRegisterConfirm(true);
        }
      }
    );
  }, []);
  if (registerConfirm === null) {
    return (
      <div className={classes.root}>
        <LinearProgress variant="query" />
        <LinearProgress variant="query" color="secondary" />
      </div>
    );
  }
  if (registerConfirm) {
    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Alert variant="filled" severity="success">
            You have confirmed your registration, now you can{" "}
            <Link style={{ color: "blue" }} to="/">
              login{" "}
            </Link>
          </Alert>
        </div>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Alert variant="filled" severity="warning">
            Maybe you have confirmed your registration, try to{" "}
            <Link style={{ color: "blue" }} to="/">
              login{" "}
            </Link>{" "}
            or{" "}
            <Link style={{ color: "blue" }} to="/signup">
              signup{" "}
            </Link>
            if you don't have an account!
          </Alert>
        </div>
      </Container>
    );
  }
}
