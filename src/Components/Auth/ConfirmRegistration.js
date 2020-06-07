import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRequest, api } from "../Apis";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
    width: "100%", 
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
        else{
          setRegisterConfirm(false);
        }
      }
    );
  // eslint-disable-next-line
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
